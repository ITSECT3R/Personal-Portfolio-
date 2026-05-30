# TypeScript Strict Typing Strategy

**Status:** `strict: true` is already enabled in `tsconfig.app.json` — the compiler enforces this.
**Goal:** Eliminate all implicit types in data files, add Zod validation for future API responses, and tighten domain types.

---

## 1. Issues Found in Current Codebase

### 1a. Data arrays have no explicit type annotations

`src/data/experience.ts` exports `jobs` without annotation. TypeScript infers a complex
union literal instead of `Job[]`, meaning adding a field in the wrong shape silently compiles.

```ts
// ❌ Current — TS infers a messy literal union
export const jobs = [
  { company: 'Nielsen', dates: '8/25 - Present', ... }
];

// ✅ Fix — explicit annotation catches shape mismatches at the source
import type { Job } from '../types/cv';

export const jobs: Job[] = [
  { company: 'Nielsen', dates: '8/25 - Present', ... }
];
```

Same fix applies to: `certifications.tsx`, `contacts.tsx`, `skills.ts`.

### 1b. `projects.ts` is completely untyped

```ts
// ❌ Current
export const projects = [];

// ✅ Fix
import type { Project } from '../types/project';

export const projects: Project[] = [];
```

### 1c. `Job` interface has 4 overlapping optional date fields

```ts
// ❌ Current — ambiguous, any combination is valid
export interface Job {
  date?: string;
  dates?: string;
  startDate?: string;
  endDate?: string;
}
```

This makes render code defensive and ugly (`job.dates ?? job.date ?? ...`).
**Fix: normalize to a single `displayDate` field** since the value is purely presentational:

```ts
// ✅ Normalized — simple, unambiguous
export interface Job {
  id?: string;
  company: string;
  position: string;
  displayDate: string; // e.g. "8/25 - Present" or "2/23 - 2/25"
  location?: string;
  responsibilities: string[];
}
```

Update `src/data/experience.ts` to use `displayDate` and update `experience.Component.tsx`:

```tsx
// Before (defensive fallback chain)
const date =
  job.dates ??
  job.date ??
  (job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : '');

// After (single read)
const date = job.displayDate;
```

---

## 2. Strict Typing for Custom Hooks

### Pattern: always export a named return type interface

```ts
// ✅ Already done correctly in useDownloadCV.ts — this is the pattern to follow everywhere

export interface UseDownloadCVReturn {
  downloadCV: () => Promise<void>;
  isDownloading: boolean;
}

export function useDownloadCV(): UseDownloadCVReturn { ... }
```

Apply the same pattern to `useAnimateOnScroll`:

```ts
export interface UseAnimateOnScrollReturn<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isAnimated: boolean;
  reset: () => void;
}

export function useAnimateOnScroll<T extends HTMLElement = HTMLElement>(
  options: AnimateOnScrollOptions = {}
): UseAnimateOnScrollReturn<T> { ... }
```

---

## 3. Component Props Typing

### Pattern: inline `type Props` per component (already used — keep this)

```tsx
// ✅ Current pattern — correct
type Props = {
  jobs: Job[];
};

export const Experience = ({ jobs }: Props) => { ... };
```

### For components wrapping HTML elements, extend the native props:

```tsx
// Example: SkillBadge wraps a <span> — should accept standard span attributes
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'span'> & {
  skill: string;
  category?: string;
};

export const SkillBadge = ({ skill, category, className, ...rest }: Props) => (
  <span className={`skill-badge ${className ?? ''}`} {...rest}>
    {skill}
  </span>
);
```

---

## 4. Future: API Response Typing with Zod

When the backend is connected, **do not trust raw API responses**. Validate at the boundary.

### Install Zod

```bash
bun add zod
```

### Define schemas in `src/domain/` (after refactor)

```ts
// src/domain/projects/project.schema.ts
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  technologies: z.array(z.string()),
  imageUrl: z.string().url(),
  s3Key: z.string().optional(),
  externalUrl: z.string().url().optional(),
  route: z.string().optional(),
});

// Type is derived FROM the schema — single source of truth
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectListSchema = z.array(ProjectSchema);
```

### Use at the API adapter boundary

```ts
// src/infrastructure/repositories/api/ApiProjectRepository.ts
import { ProjectListSchema } from '../../../domain/projects/project.schema';

export class ApiProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    const response = await fetch('/api/projects');
    const json = await response.json();

    // Parse validates AND infers the correct type. Throws if shape is wrong.
    return ProjectListSchema.parse(json);
  }
}
```

### Why Zod at the boundary?

- Runtime validation catches backend contract violations immediately
- No silent `undefined` bugs from missing fields
- The TypeScript type and the runtime validator are always in sync
- Makes the fake/mock adapters easy to write (same schema, different data)

---

## 5. `satisfies` Operator for Configuration Objects

Use `satisfies` when you want type-checking without widening:

```ts
// Navigation config — checked against the type, but keeps literal types for autocomplete
import type { RouteConfig } from './types';

export const routes = [
  { path: '/', label: 'Home' },
  { path: '/cv', label: 'CV' },
  { path: '/projects', label: 'Projects' },
] satisfies RouteConfig[];
```

---

## 6. `import type` Discipline

TypeScript 5 + `verbatimModuleSyntax` (already enabled) **requires** `import type` for type-only imports.
The compiler will error if you forget, but be explicit as a habit:

```ts
// ✅ Correct
import type { Job } from '../../types/cv';
import { useDownloadCV } from '../../hooks/home/useDownloadCV';

// ❌ Will error with verbatimModuleSyntax
import { Job } from '../../types/cv';
```

---

## Summary Checklist

- [ ] Add `Job[]` annotation to `src/data/experience.ts`
- [ ] Add `CertificationIssuer[]` annotation to `src/data/certifications.tsx`
- [ ] Add `ContactItem[]` annotation to `src/data/contacts.tsx`
- [ ] Add `SkillSet[]` annotation to skill objects in `src/data/skills.ts`
- [ ] Add `Project[]` annotation + fix empty array in `src/data/projects.ts`
- [ ] Normalize `Job` date fields to `displayDate: string`
- [ ] Export named return types from all custom hooks
- [ ] Add Zod (when backend is connected)
- [ ] Replace inferred `Project` type with `z.infer<typeof ProjectSchema>`
