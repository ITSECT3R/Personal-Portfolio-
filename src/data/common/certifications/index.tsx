import type { Certification } from '../../../types/certification';
import { epamCertifications } from './epamCertifications';
import { fccCertifications } from './fccCertifications';
import { awsCertifications } from './awsCertifications';
import { groupCertificationsByIssuer } from '../../../utils/groupCertificationsByIssuer';

// ── Raw arrays ──────────────────────────────────────────────────────────────
export { epamCertifications, fccCertifications, awsCertifications };

/** Flat list of all certifications — canonical source for both pages. */
export const certificationList: Certification[] = [
  ...epamCertifications,
  ...fccCertifications,
  ...awsCertifications,
];

// ── CV page format (grouped by issuer, with JSX icons) ──────────────────────
export const certifications = groupCertificationsByIssuer(certificationList);

// ── LinkedIn link ───────────────────────────────────────────────────────────
export const linkedin =
  'https://my-portfolio.itsect3r.workers.dev/details/certifications/';
