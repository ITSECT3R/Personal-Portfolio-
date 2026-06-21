import type { Project } from '../../types/project';

export const personalProjects: Project[] = [
  {
    id: '1-personal',
    slug: 'ecommerce-artes-sacro',
    title: 'Ecommerce — Artes Sacro',
    description:
      'A responsive e-commerce page for a fictional sacred art store. Features a product catalogue, category navigation, and a shopping cart interface — all built with vanilla HTML, CSS, and JavaScript.',
    summary:
      'Responsive e-commerce page with product cards, cart, and navigation.',
    kind: 'demo',
    category: 'frontend',
    languages: ['JavaScript', 'CSS', 'HTML'],
    technologies: ['React'],
    imageUrl: ['/projects/personal/Picture-2-portfolio.webp'],
    githubUrl: 'https://github.com/ITSECT3R/E-commerce-Artes-Sacro',
    liveUrl: 'https://itsect3r.github.io/E-commerce-Artes-Sacro/',
  },
  {
    id: '2-personal',
    slug: 'snake-game',
    title: 'Snake Game',
    description:
      'A classic Snake game built with the HTML Canvas API, CSS, and JavaScript. Includes score tracking, increasing speed as the snake grows, boundary collision, and game-over detection.',
    summary:
      'Classic snake game on HTML Canvas with score tracking and speed scaling.',
    kind: 'demo',
    category: 'frontend',
    languages: ['JavaScript', 'CSS', 'HTML'],
    technologies: ['Canvas API'],
    imageUrl: ['/projects/personal/Picture-1-portfolio.webp'],
    githubUrl: 'https://github.com/ITSECT3R/Snake-ITSECT3R',
    liveUrl: 'https://itsect3r.github.io/Snake-ITSECT3R/',
  },
];
