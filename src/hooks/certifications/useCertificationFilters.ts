import { useMemo, useState } from 'react';
import type {
  CertificationDomain,
  CertificationIssuer,
} from '../../types/certification';
import { certificationList } from '../../data/common/certifications';
import { filterCertifications } from '../../utils/filterCertifications';
import type { SortOrder } from '../../utils/filterCertifications';
import {
  ISSUER_LABEL_MAP,
  DOMAIN_LABEL_MAP,
} from '../../utils/certificationLabels';

export type CertificationFilterState = {
  /** OR multi-select — empty means "no restriction" */
  issuers: CertificationIssuer[];
  /** OR multi-select — empty means "no restriction" */
  domains: CertificationDomain[];
  /** OR multi-select — empty means "no restriction" */
  technologies: string[];
  sort: SortOrder;
};

export const DEFAULT_CERT_FILTER: CertificationFilterState = {
  issuers: [],
  domains: [],
  technologies: [],
  sort: 'newest',
};

export function useCertificationFilters() {
  const [filter, setFilter] =
    useState<CertificationFilterState>(DEFAULT_CERT_FILTER);

  const allIssuers = useMemo(
    () =>
      (
        [
          ...new Set(certificationList.map(c => c.issuer)),
        ] as CertificationIssuer[]
      ).sort((a, b) => ISSUER_LABEL_MAP[a].localeCompare(ISSUER_LABEL_MAP[b])),
    []
  );

  const allDomains = useMemo(
    () =>
      (
        [
          ...new Set(certificationList.map(c => c.domain)),
        ] as CertificationDomain[]
      ).sort((a, b) => DOMAIN_LABEL_MAP[a].localeCompare(DOMAIN_LABEL_MAP[b])),
    []
  );

  const allTechnologies = useMemo(
    (): string[] =>
      [...new Set(certificationList.flatMap(c => c.technologies))].sort(),
    []
  );

  const filtered = useMemo(
    () => filterCertifications(certificationList, filter),
    [filter]
  );

  const resetFilters = () => setFilter(DEFAULT_CERT_FILTER);

  return {
    filter,
    setFilter,
    filtered,
    allIssuers,
    allDomains,
    allTechnologies,
    resetFilters,
  };
}
