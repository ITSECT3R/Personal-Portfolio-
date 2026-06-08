# Personal Portfolio - Current Project Structure

Last Updated: June 8, 2026

## Root Directory

```
Personal-Portfolio/
├── project/
│   ├── api-architecture.md
│   ├── architecture-plan.md
│   ├── border-animations.md            # Border styling documentation
│   ├── ci-cd-pipeline.md
│   ├── code-review.md
│   ├── project-structure.md            # This file
│   ├── projects-page-architecture.md
│   ├── review-cv-refactor.md
│   ├── skills-page-architecture.md
│   ├── testing-strategy.md
│   ├── text-animations.md              # Text animation documentation
│   └── typescript-strategy.md
│
├── public/
│   ├── freeCodeCamp-pictures/
│   │   ├── Picture-1-freeCodeCamp.webp
│   │   ├── Picture-10-freeCodeCamp.webp
│   │   ├── Picture-11-freeCodeCamp.webp
│   │   ├── Picture-12-freeCodeCamp.webp
│   │   ├── Picture-13-freeCodeCamp.webp
│   │   ├── Picture-14-freeCodeCamp.webp
│   │   ├── Picture-15-freeCodeCamp.webp
│   │   ├── Picture-16-freeCodeCamp.webp
│   │   ├── Picture-17-freeCodeCamp.webp
│   │   ├── Picture-18-freeCodeCamp.webp
│   │   ├── Picture-19-freeCodeCamp.webp
│   │   ├── Picture-2-freeCodeCamp.webp
│   │   ├── Picture-3-freeCodeCamp.webp
│   │   ├── Picture-4-freeCodeCamp.webp
│   │   ├── Picture-5-freeCodeCamp.webp
│   │   ├── Picture-6-freeCodeCamp.webp
│   │   ├── Picture-7-freeCodeCamp.webp
│   │   ├── Picture-8-freeCodeCamp.webp
│   │   └── Picture-9-freeCodeCamp.webp
│   │
│   ├── personal-pictures/
│   │   ├── Picture-1-portfolio.webp
│   │   └── Picture-2-portfolio.webp
│   │
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
│   │   │   ├── certifications.Component.tsx
│   │   │   ├── experience.Component.tsx
│   │   │   ├── index.ts                       # Barrel export
│   │   │   ├── JobItem.tsx
│   │   │   └── sideBar.Component.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── MultiSelectDropdown.tsx
│   │   │   ├── ProjectCard.tsx           # Project card component
│   │   │   └── ProjectFilter.tsx
│   │   │
│   │   ├── shared/
│   │   │   └── SkillBadge.tsx   # Skill badge component
│   │   │
│   │   └── skills/
│   │       ├── CertificationCard.tsx
│   │       ├── CertificationFilter.tsx
│   │       └── SkillsGrid.tsx
│   │
│   ├── data/
│   │   ├── common/
│   │   │   └── certifications/
│   │   │       ├── awsCertifications.ts
│   │   │       ├── epamCertifications.ts
│   │   │       ├── fccCertifications.ts
│   │   │       └── index.tsx               # Barrel export for components
│   │   │
│   │   ├── projects/
│   │   │   ├── demoProjects.ts
│   │   │   ├── index.ts              # Barrel export
│   │   │   ├── personalProjects.ts
│   │   │   └── realProjects.ts
│   │   │
│   │   ├── contacts.tsx
│   │   ├── experience.ts
│   │   ├── index.ts        # Barrel export
│   │   ├── projects.ts     # Project data
│   │   └── skills.ts
│   │
│   ├── hooks/
│   │   ├── certifications/
│   │   │   └── useCertificationFilters.ts
│   │   │
│   │   ├── home/
│   │   │   ├── calculateAge.ts
│   │   │   ├── useAnimateOnScroll.ts
│   │   │   └── useDownloadCV.ts
│   │   │
│   │   ├── projects/
│   │   │   └── useProjectFilters.ts
│   │   │
│   │   ├── index.ts               # Barrel export
│   │   └── usePageBackground.ts
│   │
│   ├── pages/
│   │   ├── projects/
│   │   │   └── ProjectDetails.tsx
│   │   │
│   │   ├── Cv.Page.tsx
│   │   ├── Experience.Page.tsx
│   │   ├── Home.Page.tsx
│   │   ├── Projects.Page.tsx
│   │   └── Skills.Page.tsx
│   │
│   ├── styles/
│   │   ├── borders/
│   │   │   ├── effects/
│   │   │   │   ├── corner-highlight.css
│   │   │   │   ├── dash-chase.css
│   │   │   │   ├── dots.css
│   │   │   │   ├── dual-spin.css
│   │   │   │   ├── gradient.css
│   │   │   │   ├── index.css              # Barrel import for styles
│   │   │   │   ├── index.ts               # Barrel export
│   │   │   │   ├── light-trail.css
│   │   │   │   ├── neon.css
│   │   │   │   ├── pulse.css
│   │   │   │   ├── rainbow.css
│   │   │   │   ├── ripple.css
│   │   │   │   └── shimmer.css
│   │   │   │
│   │   │   ├── modifiers/
│   │   │   │   ├── index.css   # Barrel import for styles
│   │   │   │   └── index.ts    # Barrel export
│   │   │   │
│   │   │   ├── base.css
│   │   │   └── index.ts     # Barrel export
│   │   │
│   │   ├── cv/
│   │   │   ├── certifications.module.css
│   │   │   ├── cvPage.module.css
│   │   │   ├── experience.module.css
│   │   │   └── sidebar.module.css
│   │   │
│   │   ├── projects/
│   │   │   ├── card.module.css
│   │   │   ├── details.module.css
│   │   │   └── filter.module.css
│   │   │
│   │   ├── skills/
│   │   │   ├── certificationCard.module.css
│   │   │   ├── certificationFilter.module.css
│   │   │   └── skillsGrid.module.css
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
│   │   ├── experience.module.css
│   │   ├── home.module.css
│   │   ├── projects.module.css
│   │   └── skills.module.css
│   │
│   ├── test/
│   │   └── setup.ts
│   │
│   ├── types/
│   │   ├── certification.ts
│   │   ├── cv.ts
│   │   └── project.ts
│   │
│   ├── utils/
│   │   ├── __tests__/
│   │   │   └── navigation.test.ts
│   │   │
│   │   ├── certificationLabels.ts
│   │   ├── filterCertifications.ts
│   │   ├── filterProjects.ts
│   │   ├── groupCertificationsByIssuer.tsx
│   │   ├── issuerIcons.tsx
│   │   ├── navigation.ts
│   │   └── projectLabels.ts
│   │
│   ├── App.css       # App-level styles
│   ├── App.tsx       # Root component
│   ├── index.css     # Global styles
│   ├── main.tsx      # Application entry point
│   └── routes.tsx    # Route configuration (lazy loading)
│
├── CLAUDE.md
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
