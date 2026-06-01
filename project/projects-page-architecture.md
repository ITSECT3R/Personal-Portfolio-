# Projects Section — Architecture & Conventions

> Read this file when working on: project cards, filters, project data files,
> or adding new filter dimensions. Skip it for unrelated features.

---

## File Structure

```
src/
  data/projects/
    realProjects.ts       # Production / in-development apps (kind: 'project')
    personalProjects.ts   # Personal builds outside certifications (kind: 'demo')
    demoProjects.ts       # FreeCodeCamp certification projects (kind: 'demo')
    index.ts              # Barrel — combines all three, exports named arrays + projects[]
  data/projects.ts        # Backwards-compat re-export shim — do not add data here
  utils/filterProjects.ts # Pure filter function — no React, unit-testable
  hooks/projects/
    useProjectFilters.ts  # All filter state, derived lists, resetFilters()
  components/projects/
    ProjectCard.tsx        # Presentational card — no data imports
    ProjectFilter.tsx      # Thin wiring — passes state to pills + dropdowns
    MultiSelectDropdown.tsx # Generic reusable multi-select with checkboxes
  styles/projects/
    card.module.css
    filter.module.css
```

---

## Data Model — `Project` (see `src/types/project.ts`)

| Field          | Type               | Role                                                   |
| -------------- | ------------------ | ------------------------------------------------------ |
| `kind`         | `'demo'|'project'` | High-level bucket — drives card accent colour          |
| `category`     | `'frontend'|…`     | Architecture category — single-select pill filter      |
| `languages`    | `string[]`         | **Programming languages only**: `HTML`, `CSS`, `JS`, `TS`, future: `Java`, `C#`, `C++` |
| `technologies` | `string[]`         | **Frameworks / libraries / APIs / tools**: `React`, `D3.js`, `REST API`, `GraphQL`, etc. |

### `languages` vs `technologies` — the distinction matters

- `languages` = what you write (syntax, parsers, compilers)
- `technologies` = what you depend on (libraries, runtimes, APIs, tooling)
- `CSS` belongs in `languages`. `CSS Modules` is a build convention, not a language — do **not** add it to `technologies`; it would create a misleading filter entry.
- `Canvas API` and `REST API` belong in `technologies` (they are browser/runtime APIs, not languages)

---

## Data-Driven Filter Convention

Both the **Languages** and **Technologies** dropdowns are fully data-driven:

```ts
const allLanguages = useMemo(
  () => [...new Set(projects.flatMap(p => p.languages))].sort(),
  [],
);
```

**Consequence:** Adding or removing a value from any project's `languages` or
`technologies` array automatically adds or removes it from the corresponding
dropdown at runtime. **No filter code, component, or CSS ever needs to change
when the vocabulary grows.**

To add a new filter dimension in the future (e.g. `apiStyle: 'REST'|'GraphQL'`):
1. Add the field to the `Project` type in `src/types/project.ts`
2. Populate it in the data files
3. Derive `allX` from `useMemo` in `useProjectFilters.ts`
4. Add a `MultiSelectDropdown` (or pill group) in `ProjectFilter.tsx`
5. Add the filter predicate to `filterProjects.ts`

---

## Filter Logic

- **Kind / Category** — single-select pills; `'all'` means no restriction
- **Languages / Technologies** — multi-select dropdowns; **OR logic** — a project
  passes if it contains *at least one* of the selected values. Empty selection = no restriction.
- All filter logic lives exclusively in `src/utils/filterProjects.ts`

---

## Icon Map (`src/components/common/icons/tech.tsx`)

`TECH_ICON_MAP` maps technology/language name strings to Iconify icon components.
Keys must exactly match the strings used in `languages` / `technologies` arrays.
Technologies not present in the map render as a text fallback badge — no error thrown.
