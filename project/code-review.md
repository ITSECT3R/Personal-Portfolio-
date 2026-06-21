# Code Review: Core Components & Hooks

Date: May 18, 2026 (updated June 2026)
Files reviewed: `useDownloadCV.ts`, `Home.Page.tsx`,
`experience.Component.tsx`, `sideBar.Component.tsx`, `data/experience.ts`

> **June 2026 update**: `useAnimateOnScroll.ts` replaced by `@itsect3r/bortx/react`.
> Several issues below have been resolved; see annotations.

---

## `useDownloadCV.ts`

### Issue 1: `try/catch` wraps un-throwable code [MEDIUM]

The `try` block only contains DOM manipulation (`createElement`, `appendChild`, `click`, `removeChild`).
None of these throw. The `catch` block will never fire, creating false confidence.
The real risk point would be a future `fetch()` call for the PDF — that's when you'd add error handling.

```ts
// ❌ Current — misleading, the catch is dead code
const downloadCV = async (): Promise<void> => {
  setIsDownloading(true);
  try {
    const link = document.createElement('a');
    // ...DOM work that never throws
    link.click();
  } catch (error) {
    console.error('Error downloading CV:', error); // never reached
    throw error; // never reached
  } finally {
    setIsDownloading(false);
  }
};

// ✅ Fix — straightforward, no false safety net
const downloadCV = useCallback(async (): Promise<void> => {
  setIsDownloading(true);

  const link = document.createElement('a');
  link.href = '/CV-Luis-Angel-Marin-Rodriguez_compressed.pdf';
  link.download = 'CV-Luis-Angel-Marin-Rodriguez_compressed.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setIsDownloading(false);
}, []);
```

### Issue 2: `link.target = '_blank'` conflicts with `link.download` [LOW]

The `download` attribute tells the browser to save the file. `target="_blank"` tells it to open a new
tab. These conflict — behavior varies by browser. Remove `target="_blank"`.

### Issue 3: `downloadCV` should be `useCallback` [LOW]

The function is recreated on every render. Since it's in a hook and passed to event handlers,
wrap it in `useCallback` with an empty dependency array.

---

## `Home.Page.tsx`

### Issue 1: ~~`new Date()` and `calculateAge` on every render~~ [RESOLVED — June 2026]

### Issue 2: Three separate `useAnimateOnScroll` calls are fine [NOTE — not an issue]

This is readable and explicit. A config-array pattern would be over-engineering here.
Keep it as is.

### Issue 3: Missing `aria-label` on the download button (in SideBar) [LOW — Accessibility]

`<button id="download-btn">Download CV</button>` — the text is the label, so this is fine as is.
But `id="download-btn"` is a global DOM id — if this component were rendered twice, the id would
duplicate. Prefer a `data-testid` for testing purposes and remove the `id`.

---

## `experience.Component.tsx`

### Issue 1: ~~Inline date fallback logic should be extracted~~ [RESOLVED — June 2026]

`Job` type normalized to `displayDate: string`. The complex date fallback is no longer needed — components use `job.displayDate` directly.

### Positive Notes

- Component is correctly presentational — it only renders, doesn't fetch.
- Stable key generation `job.id ?? \`${job.company}-${job.position}-${date}\`` is good.
- `import type { Job }` is correctly used.

---

## `sideBar.Component.tsx`

### Issue 1: `import React from 'react'` is unnecessary [LOW]

With `react-jsx` transform (already configured in `tsconfig.app.json`), you don't need to import
React for JSX. The import is only needed here for `React.Fragment` (with `key=`).
You can use the named import instead:

```tsx
// ❌ Unnecessary default import
import React from 'react';
// ...
<React.Fragment key={skillSet.category}>

// ✅ Named import only
import { Fragment } from 'react';
// ...
<Fragment key={skillSet.category}>
```

### Issue 2: No loading/disabled state feedback on CV download [LOW]

The button correctly disables during download but only changes text. This is fine for a portfolio.
If you want better UX, a spinner icon would be a clean improvement — but not required.

### Positive Notes

- `rel="noopener noreferrer"` on all external `<a>` tags is correct.
- Props-driven design is correct — data comes in from the parent page.
- CSS Modules usage is consistent.

---

## `data/experience.ts`

### Issue 1: ~~No `Job[]` type annotation~~ [RESOLVED — June 2026]

`export const jobs: Job[] = [...]` — annotation added with `import type`.

### Issue 2: ~~Inconsistent date field usage~~ [RESOLVED — June 2026]

`Job` type normalized to single `displayDate: string` field.

---

## Summary by Priority

| Priority   | File                           | Issue                                         | Status                                 |
| ---------- | ------------------------------ | --------------------------------------------- | -------------------------------------- |
| ~~HIGH~~   | ~~`data/experience.ts`~~       | ~~Missing `Job[]` annotation~~                | Resolved — June 2026                   |
| ~~MEDIUM~~ | ~~`types/cv.ts`~~              | ~~4 overlapping date fields on `Job`~~        | Resolved — normalized to `displayDate` |
| MEDIUM     | `useDownloadCV.ts`             | Dead try/catch, `target="_blank"` conflict    | Open                                   |
| ~~MEDIUM~~ | ~~`useAnimateOnScroll.ts`~~    | ~~setTimeout not cleared on unmount~~         | Replaced by `@itsect3r/bortx/react`    |
| ~~MEDIUM~~ | ~~`Home.Page.tsx`~~            | ~~`new Date()` recomputed on every render~~   | Resolved — June 2026                   |
| LOW        | `sideBar.Component.tsx`        | `import React` unnecessary                    | Open                                   |
| ~~LOW~~    | ~~`experience.Component.tsx`~~ | ~~Inline date fallback logic~~                | Resolved — `displayDate` field         |
| LOW        | `sideBar.Component.tsx`        | `id="download-btn"` duplicates if rendered 2x | Open                                   |
