# Testing Strategy

## Stack

| Tool                            | Purpose                                         |
| ------------------------------- | ----------------------------------------------- |
| **Vitest**                      | Test runner (Vite-native, zero config overhead) |
| **@testing-library/react**      | Component rendering + user-event simulation     |
| **@testing-library/user-event** | Realistic user interactions                     |
| **jsdom**                       | DOM environment for Vitest                      |
| **msw** (Mock Service Worker)   | API mocking for integration tests (future)      |

### Install

```bash
bun add -d vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

---

## Vitest Configuration

Add to `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // no need to import expect/it/describe
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['src/test/**', 'src/main.tsx', 'src/routes.tsx'],
    },
  },
});
```

Add `"types": ["vitest/globals"]` to `tsconfig.app.json` compilerOptions.

### Setup file

```ts
// src/test/setup.ts
import '@testing-library/jest-dom';
```

---

## Directory Structure

```
src/
  domain/
    projects/
      __tests__/
        Project.test.ts                  # Unit: type guards, pure domain logic
    cv/
      __tests__/
        Job.test.ts

  application/
    projects/
      __tests__/
        useProjects.test.tsx             # Unit: hook with MockProjectRepository injected
    cv/
      __tests__/
        useJobs.test.tsx                 # Unit: hook with MockJobRepository injected
    home/
      __tests__/
        useAnimateOnScroll.test.tsx      # Unit: IntersectionObserver mock
        useDownloadCV.test.ts            # Unit: DOM click simulation

  infrastructure/
    repositories/
      mock/
        MockProjectRepository.ts        # Shared test double (NOT a test file)
        MockJobRepository.ts

  components/
    cv/
      __tests__/
        experience.Component.test.tsx   # Component: renders jobs correctly
        sideBar.Component.test.tsx
    projects/
      __tests__/
        ProjectCard.test.tsx
    shared/
      __tests__/
        SkillBadge.test.tsx

  pages/
    __tests__/
      Home.Page.test.tsx                # Component: integration of page with hooks

  utils/
    __tests__/
      navigation.test.ts                # Unit: pure function tests

  test/
    setup.ts                            # Global test setup (jest-dom matchers)
    renderWithRouter.tsx                 # Helper: wraps component in BrowserRouter

tests/                                  # Top-level: integration tests
  integration/
    projects.integration.test.tsx       # Integration: full flow from hook → component
```

---

## Test Levels & Examples

### Level 1: Unit — Pure Functions

```ts
// src/utils/__tests__/navigation.test.ts
import { describe, it, expect } from 'vitest';
import { getActiveClass } from '../navigation';

describe('getActiveClass', () => {
  it('returns "active" for exact match', () => {
    expect(getActiveClass('/projects', '/projects')).toBe('active');
  });

  it('returns "active" for sub-routes of /projects', () => {
    expect(getActiveClass('/projects/my-app', '/projects')).toBe('active');
  });

  it('returns "" for unrelated paths', () => {
    expect(getActiveClass('/skills', '/projects')).toBe('');
  });
});
```

### Level 2: Unit — Hooks with Injected Repository

```tsx
// src/application/cv/__tests__/useJobs.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useJobs } from '../useJobs';
import { MockJobRepository } from '../../../infrastructure/repositories/mock/MockJobRepository';
import type { Job } from '../../../domain/cv/Job';

const MOCK_JOBS: Job[] = [
  {
    company: 'Acme Corp',
    position: 'Engineer',
    displayDate: '2024',
    responsibilities: ['Built things'],
  },
];

describe('useJobs', () => {
  it('returns jobs from the repository', async () => {
    const repo = new MockJobRepository(MOCK_JOBS);
    const { result } = renderHook(() => useJobs(repo));

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // After async resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.jobs).toHaveLength(1);
    expect(result.current.jobs[0].company).toBe('Acme Corp');
    expect(result.current.error).toBeNull();
  });

  it('surfaces repository errors', async () => {
    const repo = new MockJobRepository([], new Error('Network failure'));
    const { result } = renderHook(() => useJobs(repo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error?.message).toBe('Network failure');
    expect(result.current.jobs).toHaveLength(0);
  });
});
```

### Level 3: Component Tests

```tsx
// src/components/cv/__tests__/experience.Component.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Experience } from '../experience.Component';
import type { Job } from '../../../domain/cv/Job';

const jobs: Job[] = [
  {
    company: 'Nielsen',
    position: 'Full-Stack QA',
    displayDate: '8/25 - Present',
    responsibilities: ['Verify data quality'],
  },
];

describe('Experience component', () => {
  it('renders all job companies', () => {
    render(<Experience jobs={jobs} />);
    expect(screen.getByText('Nielsen')).toBeInTheDocument();
  });

  it('renders responsibilities', () => {
    render(<Experience jobs={jobs} />);
    expect(screen.getByText('Verify data quality')).toBeInTheDocument();
  });

  it('renders nothing when jobs array is empty', () => {
    const { container } = render(<Experience jobs={[]} />);
    expect(
      container.querySelector('[class*="workHistory"]')?.children
    ).toHaveLength(0);
  });
});
```

### Level 4: Router-Dependent Components

```tsx
// src/test/renderWithRouter.tsx
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { render } from '@testing-library/react';

export function renderWithRouter(ui: ReactNode, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
```

---

## Mock Repository Pattern

```ts
// src/infrastructure/repositories/mock/MockJobRepository.ts
import type { IJobRepository } from '../../../domain/cv/IJobRepository';
import type { Job } from '../../../domain/cv/Job';

export class MockJobRepository implements IJobRepository {
  constructor(
    private readonly data: Job[] = [],
    private readonly error?: Error
  ) {}

  async getAll(): Promise<Job[]> {
    if (this.error) return Promise.reject(this.error);
    return Promise.resolve(this.data);
  }
}
```

This is a **test double**, not a test file. It lives in `infrastructure/repositories/mock/`
so it can be imported by both unit tests and integration tests.

---

## What to Test (Priority Order)

| Priority | What                      | Why                                         |
| -------- | ------------------------- | ------------------------------------------- |
| 1        | Pure utility functions    | Zero setup, highest confidence per line     |
| 2        | Application hooks         | Core logic; mock repo removes all flakiness |
| 3        | Presentational components | Verify render output and accessibility      |
| 4        | Page components           | Smoke test that page wires up correctly     |
| 5        | Integration (full flow)   | After the architecture refactor is done     |

## What NOT to Test

- CSS class names — fragile, not behavior
- Implementation details of hooks (internal `useState` values)
- The hardcoded data itself (test the repo contract, not the specific company name)
- Third-party libraries (`react-router-dom`, `@iconify/react`)
