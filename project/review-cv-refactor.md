# CV Refactor Review

Date: 2026-05-14

## Summary

- Reviewed `Cv.Page.tsx` and `src/components/cv/*` after your DDR-style refactor.
- Strong points: clear component separation (`SideBar`, `Experience`, `Certifications`), CSS Modules adoption, centralized `src/data/*`, and small hooks (`usePageBackground`, `useDownloadCV`).

## Changes I made while fixing crashes

- Fixed incorrect default import in `experience.Component.tsx` to use the named export: `import { jobs } from '../../data'`.
- Fixed `src/data/index.ts` to export the correct filename: `export * from './experience.ts'`.
- Copied section comments from `src/styles/cv.css` into `src/styles/cv.module.css` and restored the right-side `h2` rule.

## Code smells & issues found

- Data shape mismatch
  - `experience.Component.tsx` previously referenced `job.dates`, but `src/data/experience.ts` uses `startDate` and `endDate` (you later changed this to `date`). Keep the canonical field names consistent between source data and render code.

- Fragile keys
  - Mapping lists using `index` as `key`. Prefer stable identifiers (id, slug, or combination like `${company}-${startDate}`).
  - In `Certifications`, fragments use a non-unique key (`"Certification"`) — leads to reconciliation bugs.

- Tight coupling to data source
  - Components import data directly from `src/data`. This reduces reusability and makes testing harder. Passing data via props (container → presentational) is recommended.

- Typos and naming
  - CSS classname `contatInfo` is misspelled (should be `contactInfo`) — leads to confusion when searching.
  - Class names like `ulSkills1` are non-semantic; prefer `certListCompact` or `certList`.

- Incorrect use of `Link`
  - `Certifications` used `Link` from `react-router-dom` for external URL. Use `<a href=...>` for external links (or ensure router config supports external navigation).

- Accessibility / semantics
  - Anchors wrapping block elements like `<p>` might produce invalid HTML depending on structure. Prefer inline elements like `<span>` for labels inside links, ensure `aria-label`/role as needed for icon links.

- Repeated inline SVGs
  - Several identical inline SVGs are repeated. Move them to `components/common/icons` and reuse to reduce bundle size and duplication.

## High-priority fixes (apply now)

1. Fix data rendering to match your data shape.
   - If your data uses `date` (single string), change the renderer to use `job.date`.
   - If you prefer `startDate`/`endDate`, update the data array to include them and render as `${job.startDate} - ${job.endDate}`.

2. Use stable keys instead of indices.
   - Example: `key={`${job.company}-${job.date || job.startDate}`}`.

3. Fix unique keys in `Certifications`.
   - Use `certification.issuer` or an `id`.

4. Replace `Link` used for external link with `<a href=... target="_blank" rel="noreferrer">`.

5. Rename `contatInfo` → `contactInfo` in `src/styles/cv.module.css` and update references in components.

## Medium / structural suggestions

- Props / DDR (Data-Driven React) pattern — explanation and benefits

  What it means:
  - Container (page) components import or fetch data and pass it into presentational components as props.
  - Presentational components receive props and render them without importing data directly.

  Why it helps:
  - Reusability: same presentational component can render different data sets.
  - Testability: components can be unit-tested by passing small fixture props.
  - Clear single source of truth: the page controls the data flow and can transform/normalize data before passing it down.
  - Easier server-side rendering / data fetching: containers handle async logic and loading states.

  Small example (before → after):

  Before (current):

  ```tsx
  // src/components/cv/experience.Component.tsx
  import { jobs } from '../../data';

  export const Experience = () => (
    <div>
      {jobs.map(j => (
        <JobItem job={j} />
      ))}
    </div>
  );
  ```

  After (props-driven / DDR):

  ```tsx
  // src/pages/Cv.Page.tsx (container)
  import { jobs } from '../data';
  import { Experience } from '../components/cv/experience.Component';

  export default function Cv() {
    return <Experience jobs={jobs} />;
  }
  ```

  ```tsx
  // src/components/cv/experience.Component.tsx
  export const Experience = ({ jobs }: { jobs: Job[] }) => (
    <div>
      {jobs.map(job => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
  ```

  Notes:
  - Add `Job` interfaces in `src/types/` and use them across data and components.
  - If you later fetch data from an API, only the container needs to change.

- Extract small / focused components
  - `JobItem` (renders one job), `SkillsList`, `ContactItem`, `CertList`.
  - Keep components small and single-responsibility.

- Centralize icons
  - Move SVGs to `components/common/icons.tsx` and export named icons.

- Use semantic/meaningful class names
  - e.g., `certListCompact`, `sectionTitle`, `jobEntry` instead of `ulSkills1`, `divRight`.

## Hard / advanced suggestions

- Introduce TypeScript models and stricter configs
  - Add `src/types/cv.ts` with `Job`, `Certification`, `Contact` interfaces and enable `noImplicitAny` / `strict` in `tsconfig` gradually.

- Container-presentational + hooks
  - Move data fetching and side effects into custom hooks (e.g., `useCvData`) used by container pages.

- Add testing
  - Unit tests for presentational components with React Testing Library.

- Performance
  - For large lists, virtualize or memoize components. Use `React.memo` for `JobItem` if props are stable.

## Notes about your `date` change

- You mentioned you replaced `startDate`/`endDate` with a single `date` string. That's fine — just ensure the renderer uses the same field.

  Options:
  - If `date` is a single string (e.g., `"2/23 - 2/25"`), render `job.date` directly.
  - If you want to compute ranges, prefer storing `startDate`/`endDate` as ISO strings and format in UI (using `date-fns` or `Intl.DateTimeFormat`). This avoids inconsistent formats and makes sorting possible.

## Next steps I can take (pick one)

1. Apply high-priority fixes automatically (keys, `job.date` rendering, `Link` → `a`, typo rename `contatInfo`).
2. Convert `Experience`/`Certifications` to props-driven components and add TypeScript interfaces.
3. Create small components (`JobItem`, `SkillsList`, `ContactItem`) and centralize icons.

If you'd like me to apply (1) now, say "Apply fixes" and I'll patch the codebase. If you prefer (2) or (3), tell me which and I'll add a brief plan and start.

--
Generated by code review run on your workspace.
