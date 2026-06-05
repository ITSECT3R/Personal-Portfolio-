# Projects Section — Architecture & Conventions

> Read this file when working on: project cards, filters, project data files,
> or adding new filter dimensions. Skip it for unrelated features.

---

## File Structure

```
src/
  data/projects/
    realProjects.ts       # Production / in-development apps (kind: 'project')
    personalProjects.ts   # Personal builds outside certifications (kind: 'project')
    demoProjects.ts       # FreeCodeCamp certification projects (kind: 'demo')
    filterLabels.ts       # DEPRECATED — label maps moved to src/utils/projectLabels.ts
    index.ts              # Barrel — combines all three, exports named arrays + projects[]
  data/projects.ts        # Backwards-compat re-export shim — do not add data here
  utils/
    filterProjects.ts     # Pure filter function — no React, unit-testable
    projectLabels.ts      # KIND_LABEL_MAP + CATEGORY_LABEL_MAP (keyed to type unions)
  hooks/projects/
    useProjectFilters.ts  # All filter state, derived option lists, resetFilters()
  components/projects/
    ProjectCard.tsx        # Presentational card — no data imports
    ProjectFilter.tsx      # Thin wiring — four MultiSelectDropdown instances
    MultiSelectDropdown.tsx # Generic reusable multi-select with checkboxes + optional labelMap
  pages/projects/
    ProjectDetails.tsx     # Full detail view — hero carousel + content panel
  styles/projects/
    card.module.css
    filter.module.css
    details.module.css
```

---

## Data Model — `Project` (see `src/types/project.ts`)

| Field          | Type               | Role                                                   |
| -------------- | ------------------ | ------------------------------------------------------ |
| `kind`         | `'demo'|'project'` | High-level bucket — drives card accent colour          |
| `category`     | `'frontend'\|…`     | Architecture category — multi-select dropdown filter (see `ProjectCategory` union) |
| `languages`    | `string[]`         | **Programming languages only**: `HTML`, `CSS`, `JS`, `TS`, future: `Java`, `C#`, `C++` |
| `technologies` | `string[]`         | **Frameworks / libraries / APIs / tools**: `React`, `D3.js`, `REST API`, `GraphQL`, etc. |

### `languages` vs `technologies` — the distinction matters

- `languages` = what you write (syntax, parsers, compilers)
- `technologies` = what you depend on (libraries, runtimes, APIs, tooling)
- `CSS` belongs in `languages`. `CSS Modules` is a build convention, not a language — do **not** add it to `technologies`; it would create a misleading filter entry.
- `Canvas API` and `REST API` belong in `technologies` (they are browser/runtime APIs, not languages)

---

## Data-Driven Filter Convention

All four filters (kind, category, languages, technologies) are fully data-driven:

```ts
// Kinds + categories — derived from data, sorted by display label
const allKinds = useMemo(
  () =>
    ([...new Set(projects.map(p => p.kind))] as ProjectKind[]).sort((a, b) =>
      KIND_LABEL_MAP[a].localeCompare(KIND_LABEL_MAP[b]),
    ),
  [],
);

// Languages + technologies — derived from data, sorted alphabetically
const allLanguages = useMemo(
  () => [...new Set(projects.flatMap(p => p.languages))].sort(),
  [],
);
```

**Consequence:** Adding or removing a value from any project's arrays automatically
adds or removes it from the corresponding dropdown at runtime.
**No filter code, component, or CSS ever needs to change when the vocabulary grows.**

### Adding a new `ProjectCategory` value (e.g. `'devops'`)
1. Add `'devops'` to the `ProjectCategory` union in `src/types/project.ts`
2. Add `devops: 'DevOps'` to `CATEGORY_LABEL_MAP` in `src/utils/projectLabels.ts`
3. Tag at least one project with `category: 'devops'`
4. The dropdown entry appears automatically — no other changes needed

To add a new filter dimension in the future (e.g. `apiStyle: 'REST'|'GraphQL'`):
1. Add the field to the `Project` type in `src/types/project.ts`
2. Populate it in the data files
3. Derive `allX` from `useMemo` in `useProjectFilters.ts`
4. Add a `MultiSelectDropdown` in `ProjectFilter.tsx`
5. Add the filter predicate to `filterProjects.ts`

---

## Filter Logic

- **All four filters** (kind, category, languages, technologies) — multi-select dropdowns; **OR logic** — a project passes if it matches *at least one* of the selected values. Empty selection = no restriction.
- `kind` and `category` display human-readable labels via `KIND_LABEL_MAP` / `CATEGORY_LABEL_MAP` in `src/utils/projectLabels.ts`, while the raw type union values are used internally.
- All filter logic lives exclusively in `src/utils/filterProjects.ts`

## Border Convention (ProjectCard + ProjectDetails)

| `kind`      | Card border         | Hero border         |
| ----------- | ------------------- | ------------------- |
| `'project'` | `border-rainbow`    | `border-rainbow`    |
| `'demo'`    | `border-dual-spin`  | `border-shimmer`    |

Content panel on the details page always uses `border-gradient border-slow`.

---

## Icon Map (`src/components/common/icons/tech.tsx`)

`TECH_ICON_MAP` maps technology/language name strings to Iconify icon components.
Keys must exactly match the strings used in `languages` / `technologies` arrays.
Technologies not present in the map render as a text fallback badge — no error thrown.
