import type { Certification } from '../../types/certification';

export const fccCertifications: Certification[] = [
  {
    id: 'fcc-responsive-web-design',
    title: 'Responsive Web Design',
    issuer: 'freecodecamp',
    issuedYear: 2021,
    domain: 'frontend',
    technologies: ['HTML', 'CSS'],
    description:
      'Certification covering HTML5 semantics, CSS Flexbox, CSS Grid, and responsive design techniques.',
    link: 'https://freecodecamp.org/certification/ITSECT3R/responsive-web-design',
  },
  {
    id: 'fcc-js-algorithms',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freecodecamp',
    issuedYear: 2021,
    domain: 'fullstack',
    technologies: ['JavaScript'],
    description:
      'Certification covering ES6+, regular expressions, debugging, data structures, OOP, and functional programming.',
    link: 'https://www.freecodecamp.org/certification/ITSECT3R/javascript-algorithms-and-data-structures-v8',
  },
  {
    id: 'fcc-fe-libraries',
    title: 'Front End Development Libraries',
    issuer: 'freecodecamp',
    issuedYear: 2022,
    domain: 'frontend',
    technologies: ['JavaScript', 'React', 'Redux', 'Sass'],
    description:
      'Certification covering React, Redux, Bootstrap, jQuery, and Sass for building interactive front-end applications.',
    link: 'https://www.freecodecamp.org/certification/ITSECT3R/front-end-development-libraries',
  },
  {
    id: 'fcc-data-visualization',
    title: 'Data Visualization',
    issuer: 'freecodecamp',
    issuedYear: 2022,
    domain: 'frontend',
    technologies: ['JavaScript', 'D3.js'],
    description:
      'Certification covering data visualisation with D3.js — charts, graphs, and dynamic SVG-based visual representations.',
    link: 'https://www.freecodecamp.org/certification/ITSECT3R/data-visualization',
  },
];
