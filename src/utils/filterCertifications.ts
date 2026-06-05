import type { Certification, CertificationDomain, CertificationIssuer } from '../types/certification';

export type SortOrder = 'newest' | 'oldest';

export type CertificationFilterInput = {
  /** OR multi-select — empty array means "no restriction" */
  issuers: CertificationIssuer[];
  /** OR multi-select — empty array means "no restriction" */
  domains: CertificationDomain[];
  /** OR multi-select — empty array means "no restriction" */
  technologies: string[];
  sort: SortOrder;
};

/**
 * Pure function — no React, fully unit-testable.
 * Returns the subset of certifications matching all active filters,
 * sorted by issuedYear according to the sort order.
 */
export function filterCertifications(
  certifications: Certification[],
  filter: CertificationFilterInput,
): Certification[] {
  const result = certifications.filter(c => {
    if (filter.issuers.length > 0 && !filter.issuers.includes(c.issuer)) return false;
    if (filter.domains.length > 0 && !filter.domains.includes(c.domain)) return false;
    if (
      filter.technologies.length > 0 &&
      !filter.technologies.some(t => c.technologies.includes(t))
    )
      return false;
    return true;
  });

  return result.sort((a, b) =>
    filter.sort === 'newest' ? b.issuedYear - a.issuedYear : a.issuedYear - b.issuedYear,
  );
}
