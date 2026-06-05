import type { Certification, CertificationIssuer } from '../types/certification';
import type { CertificationIssuer as CvCertificationIssuer } from '../types/cv';
import { ISSUER_LABEL_MAP } from './certificationLabels';
import { ISSUER_ICON_MAP } from './issuerIcons';

/** Canonical display order for issuers — matches union ordering */
const ISSUER_ORDER: CertificationIssuer[] = ['epam', 'freecodecamp', 'aws'];

/**
 * Pure function — converts the canonical Certification[] (rich model) into the
 * grouped-by-issuer format the CV page's <Certifications> component expects.
 *
 * Single source of truth: certifications are defined once in
 * src/data/certifications/. Both the CV page and Skills page derive their
 * display data from the same canonical array.
 */
export function groupCertificationsByIssuer(
  certs: Certification[],
): CvCertificationIssuer[] {
  const groups = new Map<CertificationIssuer, Certification[]>();

  for (const cert of certs) {
    const existing = groups.get(cert.issuer);
    if (existing) {
      existing.push(cert);
    } else {
      groups.set(cert.issuer, [cert]);
    }
  }

  return ISSUER_ORDER
    .filter(issuer => groups.has(issuer))
    .map(issuer => {
      const group = groups.get(issuer)!;
      const IconComponent = ISSUER_ICON_MAP[issuer];

      return {
        issuer: ISSUER_LABEL_MAP[issuer],
        svg: <IconComponent />,
        certificates: group.map(c => ({
          name: c.title,
          link: c.link,
        })),
      };
    });
}
