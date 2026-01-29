## Code Quality & Tooling

#### Linting & Formatting

- **ESLint 9** (flat config) with plugins:
  - `@eslint/js` - Core JavaScript rules
  - `typescript-eslint` - TypeScript-specific rules
  - `eslint-plugin-react` - React best practices
  - `eslint-plugin-react-hooks` - React Hooks rules
  - `eslint-plugin-react-refresh` - Fast refresh support
  - `eslint-plugin-jsx-a11y` - Accessibility linting
  - `eslint-config-prettier` - Prettier integration
- **Prettier 3** - Opinionated code formatter
- **Type Checking:** TypeScript 5.9

#### Git Workflow

- **Husky** - Git hooks management
- **lint-staged** - Run linters on staged files only

## Architecture Patterns

##**Components:** PascalCase (e.g., `NavBar.tsx`, `ProjectCard.tsx`)

- **Custom Hooks:** camelCase with "use" prefix (e.g., `useAuth.ts`, `useWindowSize.ts`)
- **Utilities:** camelCase (e.g., `formatDate.ts`, `api.ts`, `helpers.ts`)
- **Types/Interfaces:** camelCase file, PascalCase inside (e.g., `project.ts` contains `interface Project`)
- **Styles:** Matching component name (e.g., `NavBar.css`)
- **Data files:** camelCase (e.g., `projects.ts`)
- **Config files:** lowercase with extensions (e.g., `vite.config.ts`, `.prettierrc`)
- **Directories:** lowercase or kebab-case (e.g., `components/`, `common/`, `user-profile/`)

### Code Quality Automation

#### Pre-commit Hooks

On every `git commit`, the following runs automatically via Husky + lint-staged:

**For TypeScript/TSX files:**

1. Prettier formats the code
2. ESLint checks and auto-fixes issues

**For other files (CSS, JSON, MD):**

1. Prettier formats the code

**Bypass when needed:**

```bash
git commit --no-verify   # Skip pre-commit hooks
```

- Code splitting with lazy-loaded routes
- Automated code quality checks (pre-commit hooks)
- Consistent code formatting (Prettier)
- Accessibility linting (jsx-a11y)
- Modern ESLint flat configuration

## Code Quality Philosophy

This project enforces high code quality standards through automation:

1. **Formatting is automated** - Prettier handles all style decisions
2. **Linting catches bugs** - ESLint enforces best practices and catches errors
3. **Accessibility is checked** - jsx-a11y ensures the site is accessible
4. **Quality is enforced** - Pre-commit hooks prevent bad code from being committed
5. **Consistency is guaranteed** - All team members follow the same standards

## Future Considerations

Potential additions for enhanced code quality:

- TypeScript strict mode for stronger type checking
- Commitlint for conventional commit messages
- Stylelint for advanced CSS linting
- GitHub Actions for CI/CD pipeline
- Vitest or Jest for unit testing

#### Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint on all files
npm run format         # Format all files with Prettier
npm run format:check   # Check if files are formatted
```

- `components/shared/` - Reusable utility components

### Styling Strategy

- Component-specific CSS files co-located with components (e.g., NavBar.css)
- Page-specific CSS files in styles/ directory (e.g., home.css, projects.css)
- Global styles in index.css
- App-level layout styles in App.css
- **Modular animation systems**: Border effects and text animations in dedicated directories
- **Reusable effect libraries**: Organized CSS effects with TypeScript barrel exports

### File Naming Conventions

- Components: PascalCase (e.g., NavBar.tsx)
- Styles: PascalCase for components, lowercase for pages (e.g., NavBar.css, home.css)
- Data/Types: camelCase (e.g., projects.ts)
- Config files: lowercase with extensions (e.g., vite.config.ts)

## Key Features

- Single Page Application (SPA) with client-side routing
- Type-safe TypeScript implementation
- Modular component architecture
- Clean separation of concerns (components, pages, data, types)
- **Reusable animation systems**: Border effects and text animations
- **Scroll-triggered animations**: Automatic viewport-based animation triggers
- **Modular styling architecture**: Organized CSS effects with TypeScript integration
- **CV download functionality**: Shared hook for PDF/text CV downloads
- **Interactive CV page**: Tabbed interface with professional layout
