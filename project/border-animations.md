# Border Effects Documentation

## Overview

Border effects are provided by the [`@itsect3r/bortx`](https://github.com/ITSECT3R/Bortx) open-source library.
All effects use the `.border-effect` base class plus an effect class and optional modifiers.

- **Import**: `import '@itsect3r/bortx/borders'` in `src/main.tsx`
- **Pattern**: `border-effect` + effect class + modifiers
- **Default**: all effects animate continuously; use `border-hover-only` to pause until hover
- **Customization**: via CSS custom properties (`--border-effect-accent`, `--border-effect-radius`, etc.)

## Available Effects

| Effect           | Class                     | Description                           |
| ---------------- | ------------------------- | ------------------------------------- |
| Rainbow          | `border-rainbow`          | Rotating full-spectrum conic gradient |
| Light Trail      | `border-light-trail`      | Single chasing light                  |
| Pulse            | `border-pulse`            | Breathing glow                        |
| Gradient         | `border-gradient`         | Shifting diagonal gradient            |
| Shimmer          | `border-shimmer`          | Silver streak passing through         |
| Dots             | `border-dots`             | Marching ants                         |
| Dual Spin        | `border-dual-spin`        | Two-color chase                       |
| Neon             | `border-neon`             | Neon tube flicker                     |
| Ripple           | `border-ripple`           | Three rotating waves                  |
| Corner Highlight | `border-corner-highlight` | Cyberpunk corner glow                 |
| Dash Chase       | `border-dash-chase`       | Racing stripe dashes                  |

## Available Modifiers

| Modifier   | Class               | Description                       |
| ---------- | ------------------- | --------------------------------- |
| Hover Only | `border-hover-only` | Pause animation until hover       |
| Glow       | `border-glow`       | Add box-shadow glow               |
| Slow       | `border-slow`       | Slower animation (5s)             |
| Fast       | `border-fast`       | Faster animation (1.5s)           |
| Thick      | `border-thick`      | Thicker border (4px, default 2px) |
| Reverse    | `border-reverse`    | Reverse animation direction       |

## Usage Examples

```html
<!-- Basic -->
<div class="border-effect border-rainbow">Content</div>

<!-- Hover-only with glow -->
<nav class="border-effect border-rainbow border-hover-only border-glow">
  Navigation
</nav>

<!-- Custom radius -->
<div class="border-effect border-rainbow" style="--border-effect-radius: 50px">
  Rounded
</div>
```

## CSS Variables

```css
/* Timing */
--border-effect-speed: 3s;
--border-effect-speed-slow: 5s;
--border-effect-speed-fast: 1.5s;

/* Dimensions */
--border-effect-thickness: 2px;
--border-effect-radius: 12px;

/* Colors */
--border-effect-color: rgba(255, 255, 255, 0.5);
--border-effect-accent: #8b52fd;
--border-effect-accent-secondary: #00ffff;

/* Intensity */
--border-effect-intensity: 6px;
```

## Usage in This Project

| Component             | Border Effect                                                     | Modifiers                        | Notes                          |
| --------------------- | ----------------------------------------------------------------- | -------------------------------- | ------------------------------ |
| NavBar                | `border-rainbow`                                                  | `border-hover-only`              | `--border-effect-radius: 30px` |
| Home profile image    | `border-shimmer`                                                  | `border-hover-only border-thick` |                                |
| Home CV button        | `border-pulse`                                                    | `border-hover-only`              |                                |
| Home CV link          | `border-shimmer`                                                  | `border-hover-only`              |                                |
| ProjectCard (project) | `border-rainbow`                                                  | `border-hover-only`              | `--border-effect-radius: 12px` |
| ProjectCard (demo)    | `border-dual-spin`                                                | `border-hover-only`              | `--border-effect-radius: 12px` |
| ProjectDetails hero   | `border-rainbow` or `border-shimmer`                              | (always on)                      | `--border-effect-radius: 14px` |
| ProjectDetails panel  | `border-gradient`                                                 | `border-slow` (always on)        | `--border-effect-radius: 14px` |
| SkillsGrid cards      | All 11 effects cycled                                             | `border-hover-only`              | `--border-effect-radius: 14px` |
| CertificationCard     | `border-dual-spin` / `border-rainbow` / `border-corner-highlight` | `border-hover-only`              | Per-issuer mapping             |

## Technical Implementation

- Uses `::before` and `::after` pseudo-elements with CSS `mask` for border-only rendering
- `::before` provides the static border layer
- `::after` provides the animated effect layer
- `@property` enables smooth CSS custom property animations (Chromium only; Firefox/Safari degrade gracefully)
- Effects use GPU-accelerated CSS animations

## Browser Support

- Chromium-based browsers (Chrome/Edge/Opera): full `@property` support
- Firefox/Safari: effects render but `@property`-driven animations jump instead of interpolate
