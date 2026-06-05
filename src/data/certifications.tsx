import { certificationList } from './common/certifications';
import { groupCertificationsByIssuer } from '../utils/groupCertificationsByIssuer';

export const linkedin =
  'https://www.linkedin.com/in/luis-angel-m-084449165/details/certifications/';

/**
 * Derived data — the canonical certification definitions live in
 * src/data/certifications/ (epamCertifications.ts, fccCertifications.ts,
 * awsCertifications.ts). This file derives the grouped-by-issuer format
 * that the CV page's <Certifications> component expects.
 *
 * To add a new certification, add it to the appropriate file under
 * src/data/certifications/ — both the CV page and Skills page will
 * pick it up automatically.
 */
export const certifications = groupCertificationsByIssuer(certificationList);


