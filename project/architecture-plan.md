# Architecture Plan: Hexagonal Architecture (Ports & Adapters)

## Goal

Restructure `src/data` and `src/utils` so that:

1. Business logic depends on **interfaces (ports)**, not on concrete implementations.
2. You can swap hardcoded data → API calls → mock data for tests by changing one file.
3. The frontend can be tested in **total isolation from the backend**.

This follows the **Hexagonal Architecture** (also called Ports and Adapters) pattern,
which maps naturally onto DDD principles without requiring a full DDD folder structure.

---

## Mental Model

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│              (components/, pages/, styles/)              │
└───────────────────────┬─────────────────────────────────┘
                        │ uses hooks
┌───────────────────────▼─────────────────────────────────┐
│                   APPLICATION LAYER                      │
│              (hooks/ — use cases / orchestration)        │
│  useProjects()  useJobs()  useCertifications()           │
└───────────────────────┬─────────────────────────────────┘
                        │ depends on INTERFACE (port), not impl
┌───────────────────────▼─────────────────────────────────┐
│                     DOMAIN LAYER                         │
│    (domain/ — types, interfaces, pure business logic)    │
│  IProjectRepository  IJobRepository  Project  Job        │
└───────────────────────┬─────────────────────────────────┘
                        │ implemented by
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
  Hardcoded        API (future)     Mock (tests)
  Adapter          Adapter          Adapter
  (infra/)         (infra/)         (infra/)
```

**The key rule:** The domain layer has zero imports from React, Vite, or any infra.
Application layer (hooks) imports the interface. Infrastructure implements the interface.

---

## Target Directory Structure

```
src/
  domain/                          # CORE — zero framework dependencies
    projects/
      Project.ts                   # Entity type (moved from types/project.ts)
      IProjectRepository.ts        # Port (interface)
    cv/
      Job.ts                       # Entity type (moved from types/cv.ts)
      Certificate.ts
      IJobRepository.ts            # Port
      ICertificationRepository.ts  # Port
    home/
      ContactItem.ts               # Type
      IContactRepository.ts        # Port
    shared/
      SkillSet.ts                  # Shared type
      ISkillRepository.ts          # Port

  infrastructure/                  # ADAPTERS — implement the ports
    repositories/
      hardcoded/                   # Current: static in-memory data
        HardcodedProjectRepository.ts
        HardcodedJobRepository.ts
        HardcodedCertificationRepository.ts
        HardcodedSkillRepository.ts
        HardcodedContactRepository.ts
      api/                         # Future: REST API calls
        ApiProjectRepository.ts
        ApiJobRepository.ts
      mock/                        # Testing: deterministic, controllable data
        MockProjectRepository.ts
        MockJobRepository.ts
    config/
      repositories.ts              # Factory: returns correct adapter per env

  application/                     # USE CASES — hooks that consume ports
    projects/
      useProjects.ts
      useProjectById.ts
    cv/
      useJobs.ts
      useCertifications.ts
      useSkills.ts
      useContacts.ts
    home/
      useAnimateOnScroll.ts        # Pure UI concern — stays, no port needed
      useDownloadCV.ts             # Pure UI concern — stays
      calculateAge.ts              # Pure util — stays

  presentation/                    # COMPONENTS + PAGES (same as current)
    components/
    pages/
    styles/
```

> **Migration:** You don't need to do this all at once. Move one domain at a time.
> Start with `projects/` since it's empty — the easiest starting point.

---

## Step-by-Step Implementation

### Step 1: Define the Port (interface)

```ts
// src/domain/projects/IProjectRepository.ts
import type { Project } from './Project';

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
}
```

```ts
// src/domain/cv/IJobRepository.ts
import type { Job } from './Job';

export interface IJobRepository {
  getAll(): Promise<Job[]>;
}
```

### Step 2: Implement the Hardcoded Adapter

```ts
// src/infrastructure/repositories/hardcoded/HardcodedJobRepository.ts
import type { IJobRepository } from '../../../domain/cv/IJobRepository';
import type { Job } from '../../../domain/cv/Job';

// Static data lives here now — moved from src/data/experience.ts
const JOBS: Job[] = [
  {
    company: 'Nielsen',
    position: 'Full-Stack QA',
    displayDate: '8/25 - Present',
    location: 'Hybrid - Guadalajara, Jalisco',
    responsibilities: [...],
  },
  // ...
];

export class HardcodedJobRepository implements IJobRepository {
  async getAll(): Promise<Job[]> {
    // Simulate async so the hook signature matches the API version
    return Promise.resolve(JOBS);
  }
}
```

### Step 3: Create the Repository Factory

This is the single file you change to switch from hardcoded → API → mock:

```ts
// src/infrastructure/config/repositories.ts
import { HardcodedJobRepository } from '../repositories/hardcoded/HardcodedJobRepository';
import { HardcodedProjectRepository } from '../repositories/hardcoded/HardcodedProjectRepository';
import type { IJobRepository } from '../../domain/cv/IJobRepository';
import type { IProjectRepository } from '../../domain/projects/IProjectRepository';

// In test environments, replace these with MockJobRepository etc.
export const jobRepository: IJobRepository = new HardcodedJobRepository();
export const projectRepository: IProjectRepository =
  new HardcodedProjectRepository();
```

### Step 4: Write the Application Hook

The hook depends on the interface, not the implementation:

```ts
// src/application/cv/useJobs.ts
import { useState, useEffect } from 'react';
import type { IJobRepository } from '../../domain/cv/IJobRepository';
import type { Job } from '../../domain/cv/Job';
import { jobRepository } from '../../infrastructure/config/repositories';

export interface UseJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  error: Error | null;
}

// Default to the factory-provided repo; tests can inject a mock
export function useJobs(repo: IJobRepository = jobRepository): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    repo
      .getAll()
      .then(data => {
        if (!cancelled) setJobs(data);
      })
      .catch(err => {
        if (!cancelled)
          setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [repo]);

  return { jobs, isLoading, error };
}
```

### Step 5: Update the Page (Container)

```tsx
// src/pages/Experience.Page.tsx
import { useJobs } from '../application/cv/useJobs';
import { Experience } from '../components/cv/experience.Component';

export default function ExperiencePage() {
  const { jobs, isLoading, error } = useJobs();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load experience.</div>;

  return <Experience jobs={jobs} />;
}
```

The `Experience` component is now purely presentational — no data concern at all.

---

## Switching to the API Adapter (Future)

When the backend is ready, you only change **one file**:

```ts
// src/infrastructure/config/repositories.ts  (after backend is live)
import { ApiJobRepository } from '../repositories/api/ApiJobRepository';
import { ApiProjectRepository } from '../repositories/api/ApiProjectRepository';

export const jobRepository = new ApiJobRepository(
  'https://api.yourportfolio.com'
);
export const projectRepository = new ApiProjectRepository(
  'https://api.yourportfolio.com'
);
```

Zero changes to hooks, components, or pages.

---

## Switching to Mock for Tests

```ts
// In your test file
import { MockJobRepository } from '../../infrastructure/repositories/mock/MockJobRepository';
import { renderHook } from '@testing-library/react';
import { useJobs } from './useJobs';

const mockRepo = new MockJobRepository([
  {
    company: 'Test Corp',
    position: 'Engineer',
    displayDate: '2024',
    responsibilities: [],
  },
]);

const { result } = renderHook(() => useJobs(mockRepo));
// Test against predictable data — no network, no filesystem
```

---

## Migration Priority

| Priority | Domain         | Reason                                              |
| -------- | -------------- | --------------------------------------------------- |
| 1        | projects       | Empty now — zero migration cost, builds the pattern |
| 2        | cv/jobs        | Most complex type, good exercise                    |
| 3        | skills         | Simple list, straightforward                        |
| 4        | contacts       | Has ReactElement in type — requires care            |
| 5        | certifications | Has JSX in data file — needs decoupling first       |

> **Note on certifications:** `certifications.tsx` embeds `<EpamSystems />` JSX directly in the
> data source. The `svg` field should be replaced with a `brandId: string` key (e.g. `"epam"`),
> and the component layer maps `brandId` → the correct icon. This separates presentational
> JSX from domain data.
