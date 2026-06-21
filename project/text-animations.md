# Text Animations Documentation

## Overview

Text animations are provided by the [`@itsect3r/bortx`](https://github.com/ITSECT3R/Bortx) open-source library.
The library ships compiled CSS and TypeScript, with optional React hooks for scroll-triggered animations.

- **CSS effects**: imported via `import '@itsect3r/bortx/text'` in `src/main.tsx`
- **React hooks**: imported via `import { useAnimateOnScroll } from '@itsect3r/bortx/react'`
- **Trigger system**: all text animations are paused by default — add `.is-animated` to start

## How It Works

### 1. Animation Trigger System

Text animations are paused/hidden by default. They activate when the `.is-animated` class is added.
There are three ways to trigger animations:

| Method                        | Usage                                                     |
| ----------------------------- | --------------------------------------------------------- |
| `useAnimateOnScroll` hook     | Scroll-triggered via `IntersectionObserver` (recommended) |
| `useAnimateOnScrollMany` hook | Staggered multi-element animation                         |
| Hardcoded `is-animated`       | Always-on, no viewport detection                          |

#### Hook Usage

```tsx
import { useAnimateOnScroll } from '@itsect3r/bortx/react';

const { ref, isAnimated } = useAnimateOnScroll<HTMLHeadingElement>({
  threshold: 0.5,
  delay: 200,
  triggerOnce: true,
});

return (
  <h1 ref={ref} className="text-effect text-typewriter">
    Animated Text
  </h1>
);
```

#### Static (Always-On)

```tsx
<h1 className="text-effect text-typewriter is-animated">
  Always animated on mount
</h1>
```

### 2. CSS Animation Effects

#### Base Requirements

- **Required class**: `text-effect`
- **Trigger class**: `is-animated`

#### Available Effects

| Effect                 | Class                       | Description                                              |
| ---------------------- | --------------------------- | -------------------------------------------------------- |
| Typewriter             | `text-typewriter`           | Typing with blinking cursor; needs `--text-effect-chars` |
| Typewriter (no cursor) | `text-typewriter-no-cursor` | Variant without cursor                                   |
| Typewriter (loop)      | `text-typewriter-loop`      | Infinite type/erase cycle                                |
| Reveal Up              | `text-reveal-up`            | Slides up from below                                     |
| Reveal Down            | `text-reveal-down`          | Slides down from above                                   |
| Reveal Left            | `text-reveal-left`          | Slides in from right                                     |
| Reveal Right           | `text-reveal-right`         | Slides in from left                                      |
| Glitch                 | `text-glitch`               | Digital distortion with color separation                 |
| Glitch Intense         | `text-glitch-intense`       | Pseudo-element slices (requires `data-text`)             |
| Glitch Subtle          | `text-glitch-subtle`        | Slow, subdued distortion                                 |

#### Modifiers

| Category | Class                            | Description                      |
| -------- | -------------------------------- | -------------------------------- |
| Glow     | `text-glow`                      | Static two-layer drop-shadow     |
| Glow     | `text-glow-pulse`                | Animated pulsing glow (2s cycle) |
| Glow     | `text-glow-intense`              | Four-layer static glow           |
| Gradient | `text-gradient`                  | Static two-color linear gradient |
| Gradient | `text-gradient-animated`         | Shifting gradient (3s cycle)     |
| Gradient | `text-gradient-rainbow`          | 8-color rainbow shift (5s cycle) |
| Speed    | `text-slow`                      | 4s duration                      |
| Speed    | `text-fast`                      | 1s duration                      |
| Delay    | `text-delay-1` to `text-delay-5` | 0.1s to 0.5s delay               |
| Depth    | `text-shadow-depth`              | 3-layer 3D drop-shadow           |

#### Color Presets

Bortx ships with drop-in CSS color preset classes. Combine with any gradient/glitch/glow modifier.

| Category | Available presets                                                                                                                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gradient | `text-colors-sunset`, `text-colors-ocean`, `text-colors-cyberpunk`, `text-colors-forest`, `text-colors-fire`, `text-colors-twilight`, `text-colors-neon`, `text-colors-candy`, `text-colors-midnight`, `text-colors-ember` |
| Glitch   | `text-glitch-colors-error`, `text-glitch-colors-neon`, `text-glitch-colors-matrix`, `text-glitch-colors-vaporwave`, `text-glitch-colors-cyber`, `text-glitch-colors-toxic`                                                 |
| Glow     | `text-glow-purple`, `text-glow-cyan`, `text-glow-orange`, `text-glow-pink`, `text-glow-green`, `text-glow-red`, `text-glow-gold`, `text-glow-white`                                                                        |

### 3. CSS Variables

```css
/* Timing */
--text-effect-speed: 2s;
--text-effect-delay: 0s;

/* Colors */
--text-effect-accent: #8b52fd;
--text-effect-glow-color: currentColor;
--text-effect-glow-intensity: 10px;

/* Typewriter */
--text-effect-chars: 20; /* Required: number of characters */
--text-effect-cursor-width: 3px;
--text-effect-cursor-color: currentColor;

/* Gradient */
--text-effect-gradient-start: #8b52fd;
--text-effect-gradient-end: #00ffff;
--text-effect-gradient-angle: 90deg;

/* Glitch */
--text-effect-glitch-color-1: #ff0000;
--text-effect-glitch-color-2: #00ffff;
--text-effect-glitch-intensity: 2px;
```

### 4. Component Integration Pattern

1. **Import CSS**: `import '@itsect3r/bortx/text'` (done once in `src/main.tsx`)
2. **Import hook**: `import { useAnimateOnScroll } from '@itsect3r/bortx/react'`
3. **Apply classes**: `text-effect` + effect class + optional modifiers/color presets
4. **Attach ref**: Connect the hook ref to the element
5. **Set `--text-effect-chars`**: Required for typewriter effect

#### Complete Example

```tsx
import { useAnimateOnScroll } from '@itsect3r/bortx/react';

export default function MyComponent() {
  const { ref: titleRef } = useAnimateOnScroll<HTMLHeadingElement>({
    threshold: 0.5,
    delay: 200,
  });

  return (
    <h1
      ref={titleRef}
      className="text-effect text-typewriter text-glow text-glow-purple"
      style={{ '--text-effect-chars': '15' } as React.CSSProperties}
    >
      Welcome to My Site
    </h1>
  );
}
```

### 5. Usage in This Project

| Page           | Element                    | Effect                                       | Trigger                                                    |
| -------------- | -------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Home           | "Full-Stack Developer"     | `text-glitch text-gradient`                  | Scroll hook                                                |
| Home           | Description paragraph      | `text-reveal-up`                             | Scroll hook                                                |
| Home           | "Luis A Marin"             | `text-typewriter`                            | Scroll hook, `--text-effect-chars: 13` (set in CSS module) |
| Projects       | "Projects" heading         | `text-typewriter text-glow text-glow-purple` | Always-on, `--text-effect-chars: 8`                        |
| Skills         | "Certifications" heading   | `text-reveal-up`                             | Always-on                                                  |
| Skills         | "Technical Skills" heading | `text-reveal-up`                             | Always-on                                                  |
| ProjectDetails | Title                      | `text-reveal-up`                             | Always-on                                                  |

### 6. Browser Support & Accessibility

- `@property` animations are Chromium-only (Chrome/Edge/Opera); Firefox/Safari degrade gracefully
- `prefers-reduced-motion: reduce` disables all animations and shows static text
- `forced-colors: active` strips gradient fills for readability
