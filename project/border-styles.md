# Border Effects Documentation

## Overview

The border effects system provides reusable CSS-based animated border effects that can be applied to any element across the application. These effects are built using CSS custom properties, pseudo-elements, and modern CSS features like `mask` and `@property`.

## Directory Structure

```
src/styles/borders/
├── base.css          # Core border effect system and CSS variables
├── effects/          # Individual effect implementations
│   ├── index.css     # Imports all effects and defines animations
│   ├── index.ts      # TypeScript imports for effects
│   ├── rainbow.css   # Rainbow rotating gradient effect
│   ├── light-trail.css # Single light trail effect
│   ├── pulse.css     # Pulsing glow effect
│   ├── gradient.css  # Static gradient with shifting animation
│   ├── shimmer.css   # Silver streak passing through
│   ├── dots.css      # Moving dotted border effect
│   └── dual-spin.css # Two colors chasing each other
└── modifiers/        # Effect modifiers and variants
    ├── index.css     # Modifier implementations
    └── index.ts      # TypeScript imports for modifiers
```

## Available Effects

### Base Class

All border effects require the `.border-effect` class as the foundation.

### Effect Types

#### Rainbow (`border-rainbow`)

A rotating conic gradient with full spectrum colors (red, orange, yellow, green, cyan, blue, magenta).

#### Light Trail (`border-light-trail`)

A single bright light that moves around the border perimeter, creating a "chasing light" effect.

#### Pulse (`border-pulse`)

A breathing glow effect that pulses in intensity and blur radius.

#### Gradient (`border-gradient`)

A static diagonal gradient that shifts position over time.

#### Shimmer (`border-shimmer`)

A subtle silver/white streak that passes through the border like a light reflection on metal.

#### Dots (`border-dots`)

A moving dotted/dashed border effect that creates the illusion of marching ants.

#### Dual Spin (`border-dual-spin`)

Two colors chasing each other around the border, creating a dynamic dual-tone rotating effect.

## Available Modifiers

### Animation Triggers

#### Always Animate (default)

Effects animate continuously without user interaction.

#### Hover Only (`border-hover-only`)

Effects only animate when the element is hovered.

### Visual Enhancements

#### Glow (`border-glow`)

Adds a blur effect to create a glowing appearance on hover.

### Speed Variants

#### Slow (`border-slow`)

Animation duration: 5 seconds

#### Fast (`border-fast`)

Animation duration: 1.5 seconds

#### Default Speed

Animation duration: 3 seconds

### Border Variants

#### Thick (`border-thick`)

Increases border thickness to 4px (default: 2px)

### Animation Direction

#### Reverse (`border-reverse`)

Reverses the direction of rotating effects.

## Usage Examples

### Basic Rainbow Border

```html
<div className="card border-effect border-rainbow">Content here</div>
```

### Rainbow on Hover with Glow

```html
<nav
  className="card border-effect border-rainbow border-hover-only border-glow"
>
  Navigation content
</nav>
```

### Light Trail Always Running

```html
<div className="card border-effect border-light-trail">
  Content with continuous light trail
</div>
```

### Pulse Effect on Hover, Fast Speed

```html
<button
  className="btn border-effect border-pulse border-hover-only border-fast"
>
  Click me
</button>
```

### Shimmer Effect with Reverse Direction

```html
<div className="card border-effect border-shimmer border-reverse">
  Shimmering border
</div>
```

### Marching Ants Effect

```html
<div className="card border-effect border-dots border-hover-only">
  Dotted border animation
</div>
```

### Dual Color Spin with Thick Border

```html
<div className="card border-effect border-dual-spin border-thick">
  Two colors spinning
</div>
```

### Custom Border Radius

```html
<div
  className="border-effect border-rainbow"
  style={{ '--border-effect-radius': '50px' } as React.CSSProperties}
>
  Rounded corners
</div>
```

## CSS Variables for Customization

The system uses CSS custom properties for easy customization:

```css
:root {
  /* Timing */
  --border-effect-speed: 3s; /* Default animation speed */
  --border-effect-speed-slow: 5s; /* Slow variant speed */
  --border-effect-speed-fast: 1.5s; /* Fast variant speed */

  /* Dimensions */
  --border-effect-thickness: 2px; /* Border thickness */
  --border-effect-radius: 12px; /* Border radius */

  /* Colors */
  --border-effect-color: rgba(255, 255, 255, 0.5); /* Static border color */
  --border-effect-accent: #8b52fd; /* Primary effect color */
  --border-effect-accent-secondary: #00ffff; /* Secondary effect color */

  /* Intensity */
  --border-effect-intensity: 6px; /* Glow blur radius */
}
```

### Customizing Colors

Override the accent color for theme consistency:

```css
.my-component {
  --border-effect-accent: #ff6b6b; /* Custom red accent */
}
```

### Customizing Speed

```css
.slow-animation {
  --border-effect-speed: 8s;
}
```

### Customizing Thickness

```css
.thick-borders {
  --border-effect-thickness: 6px;
}
```

## Technical Implementation

### How It Works

- Uses `::before` and `::after` pseudo-elements
- `::before` provides the static border layer
- `::after` provides the animated effect layer
- CSS `mask` property creates the border-only appearance
- `@property` enables smooth CSS custom property animations

### Browser Support

- Modern browsers with CSS `mask` and `@property` support
- Chrome 78+, Firefox 72+, Safari 13.1+

### Performance Notes

- Effects use GPU-accelerated CSS animations
- Minimal impact on performance when used sparingly
- Avoid applying to many elements simultaneously

## Integration

Import the styles in your main CSS file:

```css
@import './styles/borders/base.css';
@import './styles/borders/effects/index.css';
@import './styles/borders/modifiers/index.css';
```

Or import via TypeScript for bundler optimization:

```typescript
import './styles/borders/effects/index';
import './styles/borders/modifiers/index';
```
