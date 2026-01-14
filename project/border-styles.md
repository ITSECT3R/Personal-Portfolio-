Border Effects - src/styles/..

![Border Styles table](border-styles.png)

// Rainbow on hover with glow (navbar uses this now)

<nav className="card border-effect border-rainbow border-hover-only border-glow">

// Light trail always running

<div className="card border-effect border-light-trail">

// Pulse effect, fast, on hover
<button className="btn border-effect border-pulse border-hover-only border-fast">

// Custom radius via inline style

<div 
  className="border-effect border-rainbow" 
  style={{ '--border-effect-radius': '50px' } as React.CSSProperties}
>
