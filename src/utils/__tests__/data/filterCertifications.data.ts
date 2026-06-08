/**
 * Test fixtures for filterCertifications tests.
 *
 * Uses the ACTUAL certification data from src/data/ — not fabricated mock data.
 * Reality: 10 total (4 EPAM, 4 freeCodeCamp, 2 AWS), 2 cloud, 4 frontend, 1 fullstack, 3 testing.
 */

import type {
  CertificationDomain,
  CertificationIssuer,
} from '../../../types/certification';
import { certificationList } from '../../../data/common/certifications';

/** All certifications from the real data source: 10 total */
export const allCerts = certificationList;

/** Empty filter — no restrictions, sort by newest first. */
export const emptyFilter = {
  issuers: [] as CertificationIssuer[],
  domains: [] as CertificationDomain[],
  technologies: [] as string[],
  sort: 'newest' as const,
};
