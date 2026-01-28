import { EpamSystems, FreeCodeCamp, AWS } from '../components/common/icons';

export const certifications = [
  {
    issuer: 'EPAM Systems',
    svg: <EpamSystems />,
    certificates: [
      {
        name: 'Front End Development Advanced',
        link: 'https://certificates.epam.com/certificates/a7e2ad55-80df-4196-a09d-ab329003ed45',
      },
      {
        name: 'Automated Testing JavaScript Specialization',
        link: 'https://certificates.epam.com/certificates/ce97b0ed-768c-4394-b36a-cc7ee7fec276',
      },
      {
        name: 'Automated Testing JavaScript Advanced',
        link: 'https://certificates.epam.com/certificates/11e97e15-d94e-4a88-afd8-27034d473d4d',
      },
      {
        name: 'Automated Testing JavaScript',
        link: 'https://certificates.epam.com/certificates/d87bdff8-001e-42ab-9bf6-e9b620b22841',
      },
    ],
  },
  {
    issuer: 'FreeCodeCamp',
    svg: <FreeCodeCamp />,
    certificates: [
      {
        name: 'Responsive Web Design',
        link: 'https://freecodecamp.org/certification/ITSECT3R/responsive-web-design',
      },
      {
        name: 'JavaScript Algorithms and Data Structures',
        link: 'https://www.freecodecamp.org/certification/ITSECT3R/javascript-algorithms-and-data-structures-v8',
      },
      {
        name: 'Front End Development Libraries',
        link: 'https://www.freecodecamp.org/certification/ITSECT3R/front-end-development-libraries',
      },
      {
        name: 'Data Visualization',
        link: 'https://www.freecodecamp.org/certification/ITSECT3R/data-visualization',
      },
    ],
  },
  {
    issuer: 'AWS',
    svg: <AWS />,
    certificates: [
      {
        name: 'AWS Cloud Practitioner',
        link: 'https://www.credly.com/badges/41e411cb-ea32-47c5-8ec9-1258517f4963/linked_in_profile',
      },
      {
        name: 'AWS Artificial Intelligence Practitioner',
        link: 'https://www.linkedin.com/in/luis-angel-m-084449165/',
      },
    ],
  },
];
