# Text Animations Documentation

## Overview

The text animation system in this portfolio consists of three main components:

1. **React Hooks** (`src/hooks/useAnimateOnScroll.ts`) - Handle viewport detection and animation triggering
2. **CSS Effects** (`src/styles/text/`) - Define the actual animation styles
3. **Component Integration** - How components use the hooks and styles together

## How It Works

### 1. Animation Trigger System (React Hooks)

The system uses `IntersectionObserver` via the `useAnimateOnScroll` hook to detect when text elements enter the viewport. When an element becomes visible, the hook automatically adds the `is-animated` CSS class, which triggers the animations.

#### Key Hook Features:

- **Automatic Class Toggle**: Adds/removes `is-animated` class based on viewport intersection
- **Configurable Options**: Threshold, root margin, trigger once, delay
- **Multiple Elements**: `useAnimateOnScrollMany` for staggered animations on multiple elements
- **Reset Functionality**: Can manually reset animation state

#### Hook Usage Example:

```tsx
const { ref, isAnimated } = useAnimateOnScroll({
  threshold: 0.5, // Trigger when 50% visible
  delay: 200, // Wait 200ms before adding class
  triggerOnce: true, // Only animate once
});

return (
  <h1 ref={ref} className="text-effect text-typewriter">
    Animated Text
  </h1>
);
```

### 2. CSS Animation Effects

All animations are CSS-based and triggered by the `is-animated` class. The system includes:

#### Base Requirements:

- **Required Class**: `text-effect` (base styles and variables)
- **Trigger Class**: `is-animated` (added by hook when element enters viewport)
- **Effect Classes**: Specific animation types (see below)

#### Available Effects:

**Typewriter Effect** (`text-typewriter`)

- Simulates typing with blinking cursor
- Requires `--text-effect-chars` CSS variable (character count)
- Uses `ch` units for accurate character width
- Variants: `text-typewriter-no-cursor`, `text-typewriter-loop`

**Reveal Up Effect** (`text-reveal-up`)

- Text slides up from bottom with opacity fade-in
- Can animate entire blocks or individual words/letters
- Container class: `text-reveal-up-container` with `text-reveal-up-word` children
- Auto-stagger: Add `text-stagger-auto` for automatic delays

**Glitch Effect** (`text-glitch`)

- Digital distortion with color separation and position jitter
- Variants: `text-glitch-intense` (uses pseudo-elements), `text-glitch-subtle`
- Customizable colors via `--text-effect-glitch-color-1/2`

#### Modifiers (can combine with any effect):

**Glow** (`text-glow`)

- Adds text-shadow glow effect
- Variants: `text-glow-pulse` (animated), `text-glow-intense`
- Variables: `--text-effect-glow-color`, `--text-effect-glow-intensity`

**Gradient** (`text-gradient`)

- Applies linear gradient to text using `background-clip: text`
- Variants: `text-gradient-animated`, `text-gradient-rainbow`
- Variables: `--text-effect-gradient-start/end/angle`

**Timing Modifiers**:

- `text-slow` / `text-fast` - Adjust animation speed
- `text-delay-1` through `text-delay-5` - Preset delays

### 3. CSS Variables (Customization)

The system uses CSS custom properties for easy customization:

```css
/* Timing */
--text-effect-speed: 2s;
--text-effect-delay: 0s;

/* Colors */
--text-effect-color: inherit;
--text-effect-accent: #8b52fd;
--text-effect-glow-color: currentColor;

/* Effect-specific */
--text-effect-chars: 20; /* Typewriter */
--text-effect-glitch-intensity: 2px; /* Glitch */
--text-effect-glow-intensity: 10px; /* Glow */
--text-effect-gradient-start: #8b52fd; /* Gradient */
```

### 4. Component Integration Pattern

Components follow this pattern:

1. **Import Hook**: `import { useAnimateOnScroll } from '../hooks';`
2. **Import Styles**: `import '../styles/text';` (or specific effect files)
3. **Create Hook Instance**: Configure options per element
4. **Apply Classes**: Combine `text-effect` + effect class + modifiers
5. **Attach Ref**: Connect element to hook
6. **Set Variables**: Use inline styles for dynamic values

#### Complete Example:

```tsx
import { useAnimateOnScroll } from '../hooks';
import '../styles/text';

export default function MyComponent() {
  const { ref: titleRef } = useAnimateOnScroll({ threshold: 0.5 });
  const { ref: subtitleRef } = useAnimateOnScroll({
    threshold: 0.3,
    delay: 300,
  });

  return (
    <>
      <h1
        ref={titleRef}
        className="text-effect text-typewriter text-glow text-fast"
        style={
          {
            '--text-effect-chars': 15,
            '--text-effect-glow-color': '#00d4ff',
          } as React.CSSProperties
        }
      >
        Welcome to My Site
      </h1>

      <h2
        ref={subtitleRef}
        className="text-effect text-glitch text-gradient-animated"
      >
        Full Stack Developer
      </h2>
    </>
  );
}
```

### 5. Animation States

- **Before Animation**: Element has base classes but no `is-animated` → animations paused/hidden
- **During Animation**: Hook detects intersection → adds `is-animated` → CSS animations run
- **After Animation**: Element stays animated (unless `triggerOnce: false`)

### 6. Performance Considerations

- Uses `IntersectionObserver` (efficient, no polling)
- CSS-only animations (GPU accelerated)
- Lazy loading: animations only start when elements are visible
- Minimal JavaScript: hooks are lightweight wrappers around native APIs

### 7. Browser Support

- Modern browsers with CSS custom properties and IntersectionObserver
- Fallbacks: Elements remain readable even without animations
- Graceful degradation: Non-supporting browsers show static text

This system provides a flexible, performant way to add engaging text animations that enhance the user experience without compromising accessibility or performance.
