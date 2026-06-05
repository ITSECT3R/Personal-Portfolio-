import type { Certification } from '../../../types/certification';

export const epamCertifications: Certification[] = [
  {
    id: 'epam-fe-advanced',
    title: 'Front End Development Advanced',
    issuer: 'epam',
    issuedYear: 2023,
    domain: 'frontend',
    technologies: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS'],
    description:
      'Advanced front-end development program covering React architecture, TypeScript, performance optimisation, and modern web standards.',
    link: 'https://certificates.epam.com/certificates/a7e2ad55-80df-4196-a09d-ab329003ed45',
  },
  {
    id: 'epam-testing-spec',
    title: 'Automated Testing JavaScript Specialization',
    issuer: 'epam',
    issuedYear: 2023,
    domain: 'testing',
    technologies: ['JavaScript', 'TypeScript', 'Jest', 'Playwright', 'WebDriverIO'],
    description:
      'Specialisation track covering end-to-end, unit, and integration testing strategies using the JavaScript ecosystem.',
    link: 'https://certificates.epam.com/certificates/ce97b0ed-768c-4394-b36a-cc7ee7fec276',
  },
  {
    id: 'epam-testing-advanced',
    title: 'Automated Testing JavaScript Advanced',
    issuer: 'epam',
    issuedYear: 2023,
    domain: 'testing',
    technologies: ['JavaScript', 'TypeScript', 'Playwright', 'WebDriverIO', 'Cucumber'],
    description:
      'Advanced automated testing course: BDD with Cucumber, cross-browser testing with Playwright and WebDriverIO.',
    link: 'https://certificates.epam.com/certificates/11e97e15-d94e-4a88-afd8-27034d473d4d',
  },
  {
    id: 'epam-testing-js',
    title: 'Automated Testing JavaScript',
    issuer: 'epam',
    issuedYear: 2022,
    domain: 'testing',
    technologies: ['JavaScript', 'Jest', 'Mocha', 'Chai'],
    description:
      'Foundational automated testing course focused on unit and integration testing with Jest, Mocha, and Chai.',
    link: 'https://certificates.epam.com/certificates/d87bdff8-001e-42ab-9bf6-e9b620b22841',
  },
];
