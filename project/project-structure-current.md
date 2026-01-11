# Personal Portfolio - Current Project Structure

Last Updated: January 10, 2026

## Root Directory

```
Personal-Portfolio/
├── .git/                      # Git version control
├── .gitignore                 # Git ignore rules
├── README.md                  # Project documentation
├── package.json               # NPM dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── node_modules/              # Installed dependencies
│
├── index.html                 # Entry HTML file
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── tsconfig.json             # TypeScript base config
├── tsconfig.app.json         # TypeScript app config
├── tsconfig.node.json        # TypeScript node config
│
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
│
├── project/                   # Project documentation
│   ├── project-structure-current.md   # This file
│   └── project-structure-previous.md  # Previous structure reference
│
└── src/                       # Source code
    ├── main.tsx              # Application entry point
    ├── App.tsx               # Root component
    ├── App.css               # App-level styles
    ├── index.css             # Global styles
    ├── routes.tsx            # Route configuration
    │
    ├── assets/               # Static assets (images, fonts, etc.)
    │   └── react.svg         # React logo
    │
    ├── components/           # Reusable components
    │   ├── common/           # Common UI components
    │   │   ├── NavBar.tsx    # Navigation bar component
    │   │   └── NavBar.css    # NavBar styles
    │   │
    │   ├── projects/         # Project-specific components
    │   │   └── ProjectCard.tsx
    │   │
    │   └── shared/           # Shared components
    │       └── SkillBadge.tsx
    │
    ├── pages/                # Page components
    │   ├── Home.tsx
    │   ├── Experience.tsx
    │   ├── Projects.tsx
    │   ├── Skills.tsx
    │   ├── Cv.tsx
    │   └── projects/         # Nested project pages
    │       └── ProjectDetails.tsx
    │
    ├── data/                 # Static data/content
    │   └── projects.ts       # Project data
    │
    └── types/                # TypeScript type definitions
        └── project.ts        # Project type definitions
```

## Technology Stack

### Core

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router
- **Icons:** lucide-react, react-icons

### Code Quality

- **Linter:** ESLint
- **Type Checking:** TypeScript

## Architecture Patterns

### Component Organization

- `components/common/` - Shared UI components used across the app
- `components/projects/` - Project-specific components
- `components/shared/` - Reusable utility components

### Styling Strategy

- Component-specific CSS files co-located with components (e.g., NavBar.css)
- Global styles in index.css
- App-level layout styles in App.css

### File Naming Conventions

- Components: PascalCase (e.g., NavBar.tsx)
- Styles: PascalCase matching component (e.g., NavBar.css)
- Data/Types: camelCase (e.g., projects.ts)
- Config files: lowercase with extensions (e.g., vite.config.ts)

## Key Features

- Single Page Application (SPA) with client-side routing
- Type-safe TypeScript implementation
- Modular component architecture
- Clean separation of concerns (components, pages, data, types)
