# Personal Portfolio — AI Agent Context File

> This file provides the authoritative context for any AI agent working in this repository.
> Read this before touching any file. It is the source of truth for conventions, architecture, and intent.

---

## Project Overview

**Type:** Personal portfolio web application
**Owner:** Luis Angel Marin Rodriguez
**Purpose:** Showcase professional experience, skills, certifications, and demo projects.
**Current Status:** SPA — static/hardcoded data. Actively being refactored toward a Hexagonal Architecture in preparation for a real backend API + database.

---

## Tech Stack

| Concern           | Tool                                            |
| ----------------- | ----------------------------------------------- |
| Framework         | React 19 (functional components)                |
| Language          | TypeScript (strict mode ON)                     |
| Build tool        | Vite 6 + @vitejs/plugin-react-swc               |
| Routing           | React Router v7                                 |
| Styling           | CSS Modules + global CSS classes                |
| Icons             | @iconify/react + custom SVG components          |
| Linting           | ESLint 9 (flat config) + eslint-plugin-jsx-a11y |
| Formatting        | Prettier                                        |
| Git hooks         | Husky + lint-staged                             |
| Package manager   | Bun                                             |
| Testing (planned) | Vitest + @testing-library/react                 |

---

## Key Commands

```bash
bun run dev              # Start dev server (localhost:5173)
bun run build            # Type-check + production build
bun run lint             # ESLint check
bun run format           # Prettier write
bun run format:check     # Prettier check (CI)
bun run generate-structure  # Regenerate project-structure.md
```

---

## Directory Structure & Conventions

```
src/
  components/       # Presentational components only — no direct data imports
    common/         # App-wide: NavBar, icons
    cv/             # CV section components
    projects/       # Project card/list components
    shared/         # Reusable across domains (SkillBadge, etc.)
  data/             # TEMPORARY: hardcoded static data
                    # Will be replaced by src/infrastructure/repositories/hardcoded/
    common/         # Shared data used by multiple pages (certifications)
    projects/       # Project-specific data (split by kind)
  hooks/            # Custom React hooks (application layer)
    home/           # Home-page-specific hooks
    projects/       # Project filter hooks
    certifications/ # Certification filter hooks
  pages/            # Route-level components — one file per route
    projects/       # Sub-routes under /projects
  styles/           # CSS Modules + global animation classes
    borders/        # Border animation system
    text/           # Text animation system
    cv/             # CV-specific module CSS
    projects/       # Project-specific module CSS
    skills/         # Skills-specific module CSS
  types/            # Shared TypeScript types
  utils/            # Pure utility functions (no React)
```

### File Naming Conventions

| Pattern              | Usage                               |
| -------------------- | ----------------------------------- |
| `PascalCase.tsx`     | React components                    |
| `camelCase.ts`       | Hooks, utils, plain TS              |
| `Name.Page.tsx`      | Route-level page components         |
| `name.Component.tsx` | Non-page components in `cv/` domain |
| `name.module.css`    | CSS Modules files                   |
| `index.ts`           | Barrel exports only — no logic      |

---

## Component Patterns

1. **Container → Presentational**: Pages are containers that own data; components receive data via props.
2. **CSS Modules** for component-scoped styles: `import styles from './Name.module.css'`
3. **Global animation classes** applied via `className`: `text-effect text-glitch`, `border-effect border-dual-spin`
4. **Lazy-loaded pages** via `React.lazy` + `Suspense` in `src/routes.tsx`
5. **Barrel exports** via `index.ts` for `components/cv/` and `hooks/`
6. **No direct data imports inside components** — data flows down from pages as props

---

## TypeScript Rules (see `project/typescript-strategy.md`)

- `strict: true` is already enabled in `tsconfig.app.json`
- All data arrays MUST have explicit type annotations: `export const jobs: Job[] = [...]`
- No implicit `any` — ever
- Domain types live in `src/types/`; after refactor they move to `src/domain/`
- API response types must be validated at runtime with Zod (future)

---

## CSS Architecture

### Text Animations

- Apply with `text-effect` base class + modifier (`text-glitch`, `text-typewriter`, `text-reveal-up`)
- Animations trigger via JS adding `is-animated` class (driven by `useAnimateOnScroll` hook)
- See `project/text-animations.md`

### Border Animations

- Apply with `border-effect` base class + modifier (`border-dual-spin`, `border-gradient`, etc.)
- Modifiers: `border-thick`, `border-hover-only`
- See `project/border-animations.md`

---

## Architectural Direction (Current → Target)

The app is being refactored from a coupled SPA to **Hexagonal Architecture (Ports & Adapters)**.
See `project/architecture-plan.md` for the full plan.

```
CURRENT:  components → data/ (static arrays)
TARGET:   components → hooks → IRepository (port) ← HardcodedRepository / ApiRepository / MockRepository
```

The refactor is **incremental** — new code goes into the new structure; old `src/data/` is migrated gradually.

---

## Planned Backend (not yet implemented)

- **API:** Node.js / AWS Lambda (REST)
- **Database:** PostgreSQL (project metadata, CV data)
- **File storage:** AWS S3 (project demo files: React/HTML/CSS/JS/TS)
- **Auth:** None planned for public portfolio; admin panel TBD
- See `project/api-architecture.md` for the full decision

---

## Projects Section

- Data split across `src/data/projects/` — `realProjects.ts`, `personalProjects.ts`, `demoProjects.ts`
- All four filters (kind, category, languages, technologies) are data-driven multi-select dropdowns — adding a value to any project's arrays updates the dropdowns automatically
- Display labels for `kind` and `category` live in `src/utils/projectLabels.ts` (`KIND_LABEL_MAP`, `CATEGORY_LABEL_MAP`)
- `languages` = programming languages only; `technologies` = frameworks, libraries, APIs, tools
- Details page (`src/pages/projects/ProjectDetails.tsx`) — hero carousel + content panel with badges, chips, and external links
- See `project/projects-page-architecture.md` for full conventions, data model, border convention, and how to extend filters

---

## Skills Section

- Two independent sections: **Certifications** (filterable cards) and **Technical Skills** (category grid)
- Certification data lives in `src/data/common/certifications/` — shared canonical source for both CV page and Skills page
  - `src/data/common/certifications/index.tsx` exports `certificationList` (flat), `certifications` (grouped for CV), and `linkedin`
- Skills data lives in `src/data/skills.ts` — shared between CV sidebar and Skills grid
- Filters (issuer, domain, technologies) are data-driven multi-select dropdowns + a Newest/Oldest sort toggle — mirrors `useProjectFilters` pattern
- `MultiSelectDropdown` is reused from projects (no code duplication)
- `TECH_ICON_MAP` in `src/components/common/icons/tech.tsx` is the single icon registry — keys must match the exact strings used in `skills.ts` and certification `technologies[]` arrays
- `ISSUER_ICON_MAP` in `src/utils/issuerIcons.tsx` is the single issuer-brand icon registry — used by `groupCertificationsByIssuer` and `CertificationCard`
- See `project/skills-page-architecture.md` for full conventions, data model, and how to extend

---

## Testing Strategy (not yet implemented)

- **Unit tests:** Vitest — domain types, util functions, hooks in isolation
- **Component tests:** @testing-library/react — components with mock repositories
- **Integration tests:** top-level `tests/` directory
- See `project/testing-strategy.md`

---

## Current Known Issues / Tech Debt

1. `src/data/experience.ts` exports `jobs` without `Job[]` annotation
2. `Job` interface has 4 overlapping optional date fields — needs normalization
3. `calculateAge()` is recomputed on every render in `Home.Page.tsx`
4. Components in `cv/` still import data directly (partially fixed) — finish container pattern
5. No tests exist yet

---

## Do / Do Not

| Do                                                                     | Do Not                                             |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| Use CSS Modules for component styles                                   | Add inline styles except for dynamic CSS variables |
| Type every prop explicitly                                             | Use `any` or `unknown` without a type guard        |
| Use `React.Fragment` with `key` for keyed fragment lists               | Use array index as React `key`                     |
| Use `<a target="_blank" rel="noopener noreferrer">` for external links | Use `<Link>` for external URLs                     |
| Import types with `import type`                                        | Mix value and type imports without `import type`   |
| Keep pages as data containers; components as presentational            | Let components import from `src/data` directly     |
