# Code Review: Core Components & Hooks

Date: May 18, 2026
Files reviewed: `useDownloadCV.ts`, `useAnimateOnScroll.ts`, `Home.Page.tsx`,
`experience.Component.tsx`, `sideBar.Component.tsx`, `data/experience.ts`

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

## `useAnimateOnScroll.ts`

### Issue 1: `setTimeout` inside `IntersectionObserver` can fire after unmount [MEDIUM]

If `triggerOnce = false` and `delay > 0`, the `setTimeout` callback can fire after the component
unmounts, causing a state update on an unmounted component. The `observer.disconnect()` cleanup
does not cancel pending timeouts.

```ts
// ❌ Current — timeout can fire after component unmounts
if (delay > 0) {
  setTimeout(() => {
    setIsAnimated(true); // may fire after unmount
    element.classList.add('is-animated');
  }, delay);
}

// ✅ Fix — collect timer ids and clear them in the cleanup
useEffect(() => {
  const element = ref.current;
  if (!element) return;

  const timers: ReturnType<typeof setTimeout>[] = [];

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const id = setTimeout(() => {
              setIsAnimated(true);
              element.classList.add('is-animated');
            }, delay);
            timers.push(id);
          } else {
            setIsAnimated(true);
            element.classList.add('is-animated');
          }
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsAnimated(false);
          element.classList.remove('is-animated');
        }
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(element);

  return () => {
    observer.disconnect();
    timers.forEach(clearTimeout); // ← cancel any pending animations
  };
}, [threshold, rootMargin, triggerOnce, delay]);
```

### Issue 2: `reset` callback mutates DOM directly [LOW]

The `reset` function calls `ref.current.classList.remove(...)` outside a `useEffect`.
While not an error in practice, DOM mutations outside effects are harder to reason about.
This is acceptable here since `reset` is imperative by design — just document it.

### Positive Notes

- Generic `<T extends HTMLElement>` is correct and flexible.
- Options with defaults pattern is clean and easy to extend.
- `triggerOnce = true` default is the right choice for performance.
- `observer.disconnect()` in cleanup is correct.

---

## `Home.Page.tsx`

### Issue 1: `new Date()` and `calculateAge` on every render [MEDIUM]

`birthDate` and `age` are recomputed on every render. Since they are constants, move them outside
the component:

```tsx
// ❌ Current — recomputed every render
export default function Home() {
  const birthDate = new Date(2000, 6, 27);
  const age = calculateAge(birthDate);
  ...
}

// ✅ Fix — computed once at module load
const BIRTH_DATE = new Date(2000, 6, 27);

export default function Home() {
  const age = calculateAge(BIRTH_DATE);
  // age still needs to be inside the component if you want it
  // to re-check at the new year ... but for a static portfolio,
  // module-level is fine and runs only once.
  ...
}
```

### Issue 2: Three separate `useAnimateOnScroll` calls are fine [NOTE — not an issue]

This is readable and explicit. A config-array pattern would be over-engineering here.
Keep it as is.

### Issue 3: Missing `aria-label` on the download button (in SideBar) [LOW — Accessibility]

`<button id="download-btn">Download CV</button>` — the text is the label, so this is fine as is.
But `id="download-btn"` is a global DOM id — if this component were rendered twice, the id would
duplicate. Prefer a `data-testid` for testing purposes and remove the `id`.

---

## `experience.Component.tsx`

### Issue 1: Inline date fallback logic should be extracted [LOW]

```tsx
// ❌ Current — complex ternary inline in JSX map
const date =
  job.dates ??
  job.date ??
  (job.startDate && job.endDate
    ? `${job.startDate} - ${job.endDate}`
    : (job.startDate ?? job.endDate ?? ''));

// ✅ Fix 1 (best): Normalize the Job type to use displayDate (see typescript-strategy.md)
// Then this just becomes:
const date = job.displayDate;

// ✅ Fix 2 (interim): Extract to a pure function in utils/
export function resolveJobDate(job: Job): string {
  if (job.dates) return job.dates;
  if (job.date) return job.date;
  if (job.startDate && job.endDate) return `${job.startDate} - ${job.endDate}`;
  return job.startDate ?? job.endDate ?? '';
}
```

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

### Issue 1: No `Job[]` type annotation [HIGH]

```ts
// ❌ Current — TS infers a messy structural type, not Job[]
export const jobs = [ ... ];

// ✅ Fix
import type { Job } from '../types/cv';

export const jobs: Job[] = [ ... ];
```

This immediately surfaces the fact that none of the jobs have an `id` field — which is fine since
`Job.id` is optional, but the annotation makes the intent clear.

### Issue 2: Inconsistent date field usage [MEDIUM]

Some jobs use `dates`, some could use `date`. Once `Job` type is updated to use `displayDate`,
update each job entry to use `displayDate` as the single field.

---

## Summary by Priority

| Priority | File                       | Issue                                         | Action                     |
| -------- | -------------------------- | --------------------------------------------- | -------------------------- |
| HIGH     | `data/experience.ts`       | Missing `Job[]` annotation                    | Add annotation             |
| HIGH     | `data/projects.ts`         | Empty array, no type                          | Add `Project[]`            |
| MEDIUM   | `types/cv.ts`              | 4 overlapping date fields on `Job`            | Normalize to `displayDate` |
| MEDIUM   | `useDownloadCV.ts`         | Dead try/catch, `target="_blank"` conflict    | Simplify + fix             |
| MEDIUM   | `useAnimateOnScroll.ts`    | setTimeout not cleared on unmount             | Track and clear            |
| MEDIUM   | `Home.Page.tsx`            | `new Date()` recomputed on every render       | Move outside component     |
| LOW      | `sideBar.Component.tsx`    | `import React` unnecessary                    | Use `{ Fragment }`         |
| LOW      | `experience.Component.tsx` | Inline date fallback logic                    | Extract to util            |
| LOW      | `sideBar.Component.tsx`    | `id="download-btn"` duplicates if rendered 2x | Remove or use data-testid  |
