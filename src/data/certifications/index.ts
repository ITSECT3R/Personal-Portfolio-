import type { Certification } from '../../types/certification';
import { epamCertifications } from './epamCertifications';
import { fccCertifications } from './fccCertifications';
import { awsCertifications } from './awsCertifications';

export { epamCertifications, fccCertifications, awsCertifications };

export const certificationList: Certification[] = [
  ...epamCertifications,
  ...fccCertifications,
  ...awsCertifications,
];
