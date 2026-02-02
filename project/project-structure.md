# Personal Portfolio - Current Project Structure

Last Updated: February 1, 2026

## Root Directory

```
Personal-Portfolio/
├── project/
│   ├── border-animations.md   # Border styling documentation
│   ├── project-structure.md   # This file
│   └── text-animations.md     # Text animation documentation
│
├── public/
│   ├── CV-Luis-Angel-Marin-Rodriguez_compressed.pdf
│   ├── profile-picture.jpg
│   └── vite.svg                                       # Vite logo
│
├── scripts/
│   └── generate-structure.js
│
├── src/
│   ├── assets/
│   │   └── react.svg   # React logo
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── icons/
│   │   │   │   ├── about-me.tsx
│   │   │   │   ├── brands.tsx
│   │   │   │   ├── contact.tsx
│   │   │   │   ├── index.tsx        # Barrel export for components
│   │   │   │   ├── navigation.tsx
│   │   │   │   └── tech.tsx
│   │   │   │
│   │   │   ├── NavBar.css   # NavBar styles
│   │   │   └── NavBar.tsx   # Navigation bar component
│   │   │
│   │   ├── cv/
│   │   │   └── sideBar.tsx
│   │   │
│   │   ├── projects/
│   │   │   └── ProjectCard.tsx   # Project card component
│   │   │
│   │   └── shared/
│   │       └── SkillBadge.tsx   # Skill badge component
│   │
│   ├── data/
│   │   ├── certifications.tsx
│   │   ├── contacts.tsx
│   │   ├── experience.ts
│   │   ├── index.ts             # Barrel export
│   │   ├── projects.ts          # Project data
│   │   └── skills.ts
│   │
│   ├── hooks/
│   │   ├── cv/
│   │   ├── home/
│   │   │   ├── calculateAge.ts
│   │   │   ├── useAnimateOnScroll.ts
│   │   │   └── useDownloadCV.ts
│   │   │
│   │   └── index.ts   # Barrel export
│   │
│   ├── pages/
│   │   ├── projects/
│   │   │   └── ProjectDetails.tsx
│   │   │
│   │   ├── Cv.tsx           # CV page component
│   │   ├── Experience.tsx   # Experience page component
│   │   ├── Home.tsx         # Home page component
│   │   ├── Projects.tsx     # Projects page component
│   │   └── Skills.tsx       # Skills page component
│   │
│   ├── styles/
│   │   ├── borders/
│   │   │   ├── effects/
│   │   │   │   ├── dots.css
│   │   │   │   ├── dual-spin.css
│   │   │   │   ├── gradient.css
│   │   │   │   ├── index.css         # Barrel import for styles
│   │   │   │   ├── index.ts          # Barrel export
│   │   │   │   ├── light-trail.css
│   │   │   │   ├── pulse.css
│   │   │   │   ├── rainbow.css
│   │   │   │   └── shimmer.css
│   │   │   │
│   │   │   ├── modifiers/
│   │   │   │   ├── index.css   # Barrel import for styles
│   │   │   │   └── index.ts    # Barrel export
│   │   │   │
│   │   │   ├── base.css
│   │   │   └── index.ts     # Barrel export
│   │   │
│   │   ├── text/
│   │   │   ├── effects/
│   │   │   │   ├── glitch.css
│   │   │   │   ├── index.css        # Barrel import for styles
│   │   │   │   ├── index.ts         # Barrel export
│   │   │   │   ├── reveal-up.css
│   │   │   │   └── typewriter.css
│   │   │   │
│   │   │   ├── modifiers/
│   │   │   │   ├── index.css   # Barrel import for styles
│   │   │   │   └── index.ts    # Barrel export
│   │   │   │
│   │   │   ├── base.css
│   │   │   └── index.ts     # Barrel export
│   │   │
│   │   ├── cv.css           # CV page styles
│   │   ├── experience.css   # Experience page styles
│   │   ├── home.css         # Home page styles
│   │   ├── projects.css     # Projects page styles
│   │   └── skills.css       # Skills page styles
│   │
│   ├── types/
│   │   └── project.ts
│   │
│   ├── utils/
│   │   └── navigation.ts
│   │
│   ├── App.css       # App-level styles
│   ├── App.tsx       # Root component
│   ├── index.css     # Global styles
│   ├── main.tsx      # Application entry point
│   └── routes.tsx    # Route configuration (lazy loading)
│
├── eslint.config.js     # ESLint configuration (flat config)
├── index.html           # Entry HTML file
├── package.json         # NPM dependencies and scripts
├── README.md            # Project documentation
├── tsconfig.app.json    # TypeScript app config
├── tsconfig.json        # TypeScript base config
├── tsconfig.node.json   # TypeScript node config
└── vite.config.ts       # Vite configuration
```

## Directory Explanations

### Root Level

- **src/**: Source code directory containing all React components, hooks, styles, and data
- **public/**: Static assets served directly by the web server
- **project/**: Project documentation and configuration files
- **node_modules/**: Installed npm dependencies (auto-generated)

### Source Structure (src/)

- **components/**: Reusable React components organized by feature
  - **common/**: Shared components used across multiple pages
  - **projects/**: Components specific to project display
  - **shared/**: Utility components used throughout the app
- **pages/**: Top-level page components for routing
- **hooks/**: Custom React hooks for shared logic
- **styles/**: Page-specific CSS files and modular style systems
- **data/**: Static data files and content
- **assets/**: Images, fonts, and other media assets
- **types/**: TypeScript type definitions
- **utils/**: Utility functions and helpers

### Style Organization (src/styles/)

- **borders/**: Modular border animation system with effects and modifiers
- **text/**: Text animation effects and styling utilities
- Page-specific CSS files for component styling

---

_This file is auto-generated. To update, run: `npm run generate-structure`_
