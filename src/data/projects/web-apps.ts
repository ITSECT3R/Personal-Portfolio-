import type { Project } from '../../types/project';

export const webApps: Project[] = [
  {
    id: '1-web-app',
    slug: 'shadow',
    title: 'Shadow',
    description:
      'Shadow is a full-stack application currently in active development. It showcases modern architecture decisions including React 19, TypeScript strict mode, CSS Modules, and a Hexagonal Architecture approach for clean separation between UI and data concerns.',
    summary:
      'Full-stack app in active development. React 19, TypeScript, CSS Modules.',
    kind: 'project',
    category: 'fullstack',
    languages: ['TypeScript', 'JavaScript', 'CSS'],
    technologies: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
    imageUrl: [
      '/projects/web-apps/shadow/Shadow-main.webp',
      '/projects/web-apps/shadow/Shadow-cv-1.webp',
      '/projects/web-apps/shadow/Shadow-cv-2.webp',
      '/projects/web-apps/shadow/Shadow-cv-3.webp',
    ],
    githubUrl: 'https://github.com/ITSECT3R/Shadow',
    liveUrl: 'https://shadow-gilt-phi.vercel.app/',
  },
];
