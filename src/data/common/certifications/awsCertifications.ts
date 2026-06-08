import type { Certification } from '../../../types/certification';

export const awsCertifications: Certification[] = [
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    issuer: 'aws',
    issuedYear: 2024,
    domain: 'cloud',
    technologies: ['AWS'],
    description:
      'Foundational certification validating cloud fluency and AWS core services: compute, storage, databases, networking, security, and pricing.',
    link: 'https://www.credly.com/badges/41e411cb-ea32-47c5-8ec9-1258517f4963/linked_in_profile',
  },
  {
    id: 'aws-ai-practitioner',
    title: 'AWS Artificial Intelligence Practitioner',
    issuer: 'aws',
    issuedYear: 2025,
    domain: 'cloud',
    technologies: ['AWS'],
    description:
      'Certification covering AWS AI/ML services: SageMaker, Rekognition, Bedrock, and foundational generative AI concepts.',
    link: 'https://www.linkedin.com/in/luis-angel-m-084449165/details/certifications/',
  },
];
