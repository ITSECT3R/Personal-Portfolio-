import type { Project } from '../../types/project';

export const libraries: Project[] = [
  {
    id: '1-lib',
    slug: 'bortx',
    title: 'Bortx',
    description:
      'Bortx is a lightweight CSS library with stunning text and border animations. Built to easily apply cool animation effects and color presets to bring your projects to life. Pure CSS with zero dependencies — one import, infinite compositions.',
    summary:
      'Lightweight CSS library for beautiful text and border animations. Zero dependencies, pure CSS.',
    kind: 'library',
    category: 'frontend',
    languages: ['TypeScript', 'CSS'],
    technologies: ['Vitepress', 'Vue', 'React', 'CSS Modules', 'Vitest', 'Bun'],
    imageUrl: [
      '/projects/libraries/bortx/bortx-main.webp',
      '/projects/libraries/bortx/bortx-text-demo-1.webp',
      '/projects/libraries/bortx/bortx-text-demo-2.webp',
      '/projects/libraries/bortx/bortx-borders-demo-1.webp',
    ],
    githubUrl: 'https://github.com/ITSECT3R/Bortx',
    liveUrl: 'https://itsect3r.github.io/Bortx/',
  },
];
