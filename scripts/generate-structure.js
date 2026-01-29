#!/usr/bin/env node

/**
 * Project Structure Generator
 * Generates markdown documentation of the project structure
 * Usage: node scripts/generate-structure.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProjectStructureGenerator {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
    this.ignorePatterns = [
      /^\./, // Hidden files/directories
      /^node_modules$/,
      /^dist$/,
      /^build$/,
      /^\.git$/,
      /^\.vscode$/,
      /^\.idea$/,
      /^coverage$/,
      /^\.DS_Store$/,
      /^Thumbs\.db$/,
      /^\*.log$/,
      /^bun\.lock$/,
      /^package-lock\.json$/,
      /^yarn\.lock$/,
    ];
  }

  shouldIgnore(item) {
    return this.ignorePatterns.some(pattern => pattern.test(item));
  }

  getFileDescription(filePath) {
    const descriptions = {
      // Root files
      'package.json': 'NPM dependencies and scripts',
      'package-lock.json': 'Locked dependency versions',
      'bun.lock': 'Bun package manager lock file',
      'README.md': 'Project documentation',
      'index.html': 'Entry HTML file',
      'vite.config.ts': 'Vite configuration',
      'eslint.config.js': 'ESLint configuration (flat config)',
      'tsconfig.json': 'TypeScript base config',
      'tsconfig.app.json': 'TypeScript app config',
      'tsconfig.node.json': 'TypeScript node config',
      '.prettierrc': 'Prettier configuration',
      '.prettierignore': 'Prettier ignore rules',
      '.gitignore': 'Git ignore rules',

      // Source files
      'src/main.tsx': 'Application entry point',
      'src/App.tsx': 'Root component',
      'src/App.css': 'App-level styles',
      'src/index.css': 'Global styles',
      'src/routes.tsx': 'Route configuration (lazy loading)',

      // Common descriptions for patterns
      'index.ts': 'Barrel export',
      'index.tsx': 'Barrel export for components',
      'index.css': 'Barrel import for styles',

      // Page components
      'src/pages/Home.tsx': 'Home page component',
      'src/pages/Experience.tsx': 'Experience page component',
      'src/pages/Projects.tsx': 'Projects page component',
      'src/pages/Skills.tsx': 'Skills page component',
      'src/pages/Cv.tsx': 'CV page component',

      // Hooks
      'src/hooks/useAnimateOnScroll.ts': 'Scroll-based animation trigger hook',
      'src/hooks/useDownloadCV.ts': 'CV download functionality hook',

      // Components
      'src/components/common/NavBar.tsx': 'Navigation bar component',
      'src/components/common/NavBar.css': 'NavBar styles',
      'src/components/projects/ProjectCard.tsx': 'Project card component',
      'src/components/shared/SkillBadge.tsx': 'Skill badge component',

      // Styles
      'src/styles/cv.css': 'CV page styles',
      'src/styles/experience.css': 'Experience page styles',
      'src/styles/home.css': 'Home page styles',
      'src/styles/projects.css': 'Projects page styles',
      'src/styles/skills.css': 'Skills page styles',

      // Data
      'src/data/projects.ts': 'Project data',

      // Assets
      'src/assets/react.svg': 'React logo',
      'public/vite.svg': 'Vite logo',

      // Project documentation
      'project/project-structure.md': 'This file',
      'project/border-animations.md': 'Border styling documentation',
      'project/text-animations.md': 'Text animation documentation',
    };

    return (
      descriptions[filePath] || descriptions[path.basename(filePath)] || ''
    );
  }

  generateTree(dir, prefix = '', isLast = true) {
    const items = fs
      .readdirSync(dir)
      .filter(item => !this.shouldIgnore(item))
      .sort((a, b) => {
        // Sort directories first, then files
        const aPath = path.join(dir, a);
        const bPath = path.join(dir, b);
        const aIsDir = fs.statSync(aPath).isDirectory();
        const bIsDir = fs.statSync(bPath).isDirectory();

        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

    // Calculate the longest item name for alignment
    const maxLength = Math.max(
      ...items.map(item => {
        const isDirectory = fs.statSync(path.join(dir, item)).isDirectory();
        return item.length + (isDirectory ? 1 : 0); // +1 for trailing slash on directories
      })
    );

    let result = '';

    items.forEach((item, index) => {
      const isLastItem = index === items.length - 1;
      const itemPath = path.join(dir, item);
      const relativePath = path.relative(this.rootDir, itemPath);
      const isDirectory = fs.statSync(itemPath).isDirectory();

      // Tree characters
      const connector = isLastItem ? '└── ' : '├── ';
      const extension = isLastItem ? '    ' : '│   ';

      // Format item name with trailing slash for directories
      const itemName = item + (isDirectory ? '/' : '');

      // Description
      const description = this.getFileDescription(relativePath);
      const descText = description ? ` # ${description}` : '';

      // Calculate padding for alignment (minimum 2 spaces after item name)
      const padding = Math.max(2, maxLength - itemName.length + 2);
      const spaces = ' '.repeat(padding);

      result += `${prefix}${connector}${itemName}${spaces}${descText}\n`;

      if (isDirectory) {
        // Add subtree
        const subTree = this.generateTree(
          itemPath,
          prefix + extension,
          isLastItem
        );
        result += subTree;
        // Add separator line with tree character for better visual separation
        if (subTree.trim() && !isLastItem) {
          result += `${prefix}│\n`;
        }
      }
    });

    return result;
  }

  generateMarkdown() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let markdown = `# Personal Portfolio - Current Project Structure

Last Updated: ${dateString}

## Root Directory

\`\`\`
Personal-Portfolio/
${this.generateTree(this.rootDir)}\`\`\`

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

*This file is auto-generated. To update, run: \`npm run generate-structure\`*
`;

    return markdown;
  }

  writeToFile(outputPath) {
    const content = this.generateMarkdown();
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Project structure written to: ${outputPath}`);
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new ProjectStructureGenerator();
  const outputPath = path.join(
    __dirname,
    '..',
    'project',
    'project-structure.md'
  );
  generator.writeToFile(outputPath);
}
