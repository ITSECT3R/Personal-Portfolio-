import type {
  CertificationDomain,
  CertificationIssuer,
} from '../types/certification';

export const ISSUER_LABEL_MAP: Record<CertificationIssuer, string> = {
  epam: 'EPAM Systems',
  freecodecamp: 'freeCodeCamp',
  aws: 'AWS',
};

export const DOMAIN_LABEL_MAP: Record<CertificationDomain, string> = {
  frontend: 'Front-End',
  backend: 'Back-End',
  fullstack: 'Full Stack',
  testing: 'Testing',
  devops: 'DevOps',
  cloud: 'Cloud',
};
