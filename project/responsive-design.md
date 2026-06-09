# Responsive Design Documentation

## Overview

The portfolio uses a **mobile-first** responsive strategy with CSS breakpoints, a centralized scroll chain, and a dynamic zoom approach for the CV page. All responsive behavior is handled via CSS media queries + one JavaScript hook — no CSS frameworks or utility libraries.

---

## Breakpoint Strategy

Three standard breakpoints are used across the project:

| Breakpoint  | Target                  | Usage                                             |
| ----------- | ----------------------- | ------------------------------------------------- |
| **≤ 420px** | Small phones (SE)       | Extra-tight layouts, stacked link buttons         |
| **≤ 560px** | Phones                  | Single-column grids, reduced padding/fonts        |
| **≤ 768px** | Tablets / small screens | NavBar moves to bottom; scroll behavior activates |
| **≤ 900px** | Tablets (landscape)     | 2-column grids, flex stacking                     |

> The canonical "mobile" threshold for layout changes is **560px**. The **768px** breakpoint is used exclusively for NavBar repositioning.

---

## Scroll Chain Architecture

**Location:** `src/index.css` + `src/App.css`

To avoid double scrollbars (a common pitfall), the project enforces a **single-scroll-container** rule:

```
html        ← ONLY element allowed to handle vertical scrolling
  body      ← overflow: visible (never a scroll container)
    #root   ← overflow: visible (never a scroll container)
      .app  ← overflow: visible (never a scroll container)
        [page content]
```

### Key Rules

| File        | Selector | Property                    | Purpose                                   |
| ----------- | -------- | --------------------------- | ----------------------------------------- |
| `index.css` | `html`   | `overflow-y: auto`          | Owns the one-and-only vertical scrollbar  |
| `index.css` | `html`   | `overflow-x: hidden`        | Prevents horizontal scroll from border FX |
| `index.css` | `body`   | `overflow: visible`         | Explicitly prevents body scroll context   |
| `App.css`   | `#root`  | `width: 100%` + `max-width` | Fluid but capped; no overflow set         |

### Why `overflow-x: hidden` on `body` caused double scrollbars

Setting ANY `overflow` value on `body` (even `overflow-x: hidden` alone) makes `body` a **scroll container** in most browsers. Combined with `min-height: 100vh`, both `html` and `body` ended up owning their own vertical scrollbars. The fix: move all overflow control to `html` and explicitly set `body { overflow: visible }`.

---

## NavBar Responsive Behavior

**Files:** `src/components/common/NavBar.tsx`, `NavBar.css`, `src/hooks/useScrollDirection.ts`

### Desktop ( > 768px )

- Fixed to the **right side** of the viewport, vertically centered
- Always visible — no scroll-based hiding
- Stacks icons vertically

### Mobile ( ≤ 768px )

- Moves to **bottom center** of the viewport
- Stacks icons horizontally
- **Scroll-aware**: hides when scrolling **down**, shows when scrolling **up**
- Smooth slide animation: `transform: translateY()` with `0.35s cubic-bezier(0.4, 0, 0.2, 1)`
- At the very top of the page (≤ 8px scroll), navbar is always visible
- Ignores tiny scrolls (< 8px) to prevent iOS momentum-bounce glitches

### How `useScrollDirection` Works

```ts
// src/hooks/useScrollDirection.ts
// Returns 'up' | 'down'
// - 'up'   → navbar visible (scrolling up OR at top OR on desktop)
// - 'down'  → navbar hidden  (scrolling down past threshold, mobile only)
// Uses requestAnimationFrame-throttled scroll listener
```

### CSS Animation

```css
/* Visible state (default) */
.navbar {
  transform: translateX(-50%) translateY(0);
}

/* Hidden — slides below viewport */
.navbar.navbar-hidden {
  transform: translateX(-50%) translateY(calc(100% + 2rem));
}
```

---

## CV Page — Zoom Approach

**Files:** `src/pages/Cv.Page.tsx`, `src/hooks/cv/useCvScale.ts`, `src/styles/cv/cvPage.module.css`

The CV page is designed as a fixed-width A4-like layout (210px sidebar + 1fr content, max 850px). On narrow viewports, the entire CV is **zoomed out** to preserve the exact desktop proportions.

### Why `zoom` instead of `transform: scale()`

| Property           | Visual size | Layout space    | Scrollbar impact                                              |
| ------------------ | ----------- | --------------- | ------------------------------------------------------------- |
| `transform: scale` | Shrinks     | **Unchanged**   | Page stays tall; navbar pushed off-screen; border gaps appear |
| `zoom`             | Shrinks     | **Shrinks too** | Layout matches visual; no overflow; navbar stays accessible   |

`zoom` is a standard CSS property (supported in all modern browsers) that scales both the visual rendering AND the layout box. This avoids the green border gap and navbar visibility bugs that `transform: scale()` caused.

### Hook Logic

```ts
// src/hooks/cv/useCvScale.ts
const CV_NATIVE_WIDTH = 850;
const zoom = Math.max(window.innerWidth / CV_NATIVE_WIDTH, 0.45);
// Clamped: never zooms below 0.45 (text remains semi-legible on 375px phones)
```

### CSS Application

```css
.cvPage {
  max-width: 850px;
  zoom: var(--cv-zoom, 1); /* injected via React inline style */
}
```

---

## Page-Specific Responsive Patterns

### Home Page

**File:** `src/styles/home.module.css`

| Breakpoint | Changes                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| ≤ 900px    | `contentWrapper` → `flex-direction: column`; description centers; image → 320px |
| ≤ 560px    | Image → 240px; all fonts, icons, buttons shrink; h1 subtitle → `2em`            |

The profile picture and CTA buttons stack below the description text on mobile.

### Projects Page

**Files:** `src/styles/projects.module.css`, `src/styles/projects/filter.module.css`

| Breakpoint | Changes                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| ≤ 900px    | Project grid → 2 columns                                                                              |
| ≤ 560px    | Project grid → 1 column; `.page` padding → `1rem 0.5rem`; heading → `1.5rem`; filter bar gap tightens |

### Skills Page

**Files:** `src/styles/skills.module.css`, `src/styles/skills/certificationFilter.module.css`

| Breakpoint | Changes                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| ≤ 900px    | Cert grid & skills grid → 2 columns                                                                       |
| ≤ 560px    | Both grids → 1 column; `.page` padding → `1rem 0.5rem 3rem`; heading → `1.35rem`; filter bar gap tightens |

### Project Details Page

**File:** `src/styles/projects/details.module.css`

| Breakpoint | Changes                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| ≤ 640px    | Hero → 240px height; title → `1.65rem`; badge sections → 1 column               |
| ≤ 420px    | Hero → 200px; title → `1.35rem`; link buttons stack vertically; tighter padding |

---

## Shared Component Responsiveness

### Filter Bar & MultiSelectDropdown

**Files:** `src/styles/projects/filter.module.css`, `src/styles/skills/certificationFilter.module.css`

- `.filterBar` uses `flex-wrap: wrap` — dropdowns naturally wrap on narrow screens
- `gap` reduces from `0.75rem 2rem` → `0.5rem 1rem` at ≤ 560px
- `.dropdownPanel` has `max-width: calc(100vw - 2rem)` to prevent horizontal overflow on small phones
- `MultiSelectDropdown` is shared between Projects and Skills pages

### Root Container

**File:** `src/App.css`

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem; /* desktop */
  width: 100%;
}

@media (max-width: 560px) {
  #root {
    padding: 1rem 0.75rem;
  } /* mobile: more breathing room */
}
```

---

## How to Add Responsive Styles for a New Page

1. Use the existing breakpoints: **900px** → **560px** → **420px**
2. Stack layouts vertically (grid columns → 1, flex rows → column)
3. Reduce `padding` and `font-size` at each step
4. Set `width: 100%` on the page wrapper to prevent overflow
5. **Never** set `overflow` on `body`, `#root`, or `.app` — let `html` own the scroll
6. Test on 375px width (iPhone SE) as the narrowest target

### Sizing Cheat Sheet

| Element         | Desktop       | ≤ 560px        |
| --------------- | ------------- | -------------- |
| Page padding    | `2rem 1.5rem` | `1rem 0.5rem`  |
| Section heading | `1.75–2rem`   | `1.35–1.5rem`  |
| Body text       | `1rem`        | `0.85–0.9rem`  |
| Root padding    | `2rem`        | `1rem 0.75rem` |

---

## Common Pitfalls

| Symptom                             | Likely Cause                                             | Fix                                                     |
| ----------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| Double scrollbar                    | `overflow-*` set on `body` or inner container            | Move to `html`; set `body { overflow: visible }`        |
| Content shifted right on mobile     | Padding too large; no `width: 100%` on wrapper           | Reduce padding; add `width: 100%`                       |
| Navbar invisible / hard to find     | `transform: scale()` making layout taller than viewport  | Use `zoom` instead of `transform: scale()`              |
| Green border gap on CV page         | Same as above (`transform: scale` doesn't shrink layout) | Use `zoom`                                              |
| Dropdown panel cut off horizontally | `min-width` exceeds viewport                             | Add `max-width: calc(100vw - 2rem)`                     |
| Navbar glitches on scroll           | No dead-zone; iOS momentum bounce                        | Ignore scroll deltas < 8px; use `requestAnimationFrame` |
