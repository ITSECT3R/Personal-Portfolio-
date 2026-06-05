import type { CertificationDomain, CertificationIssuer } from '../../types/certification';
import type { CertificationFilterState } from '../../hooks/certifications/useCertificationFilters';
import type { SortOrder } from '../../utils/filterCertifications';
import { ISSUER_LABEL_MAP, DOMAIN_LABEL_MAP } from '../../utils/certificationLabels';
import { MultiSelectDropdown } from '../projects/MultiSelectDropdown';
import styles from '../../styles/skills/certificationFilter.module.css';

type Props = {
  issuers: CertificationIssuer[];
  domains: CertificationDomain[];
  technologies: string[];
  filter: CertificationFilterState;
  onChange: (next: CertificationFilterState) => void;
};

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
];

export function CertificationFilter({
  issuers,
  domains,
  technologies,
  filter,
  onChange,
}: Props) {
  const set = <K extends keyof CertificationFilterState>(
    key: K,
    value: CertificationFilterState[K],
  ) => onChange({ ...filter, [key]: value });

  return (
    <div className={styles.filterBar}>
      <MultiSelectDropdown
        label="Issuer"
        options={issuers}
        labelMap={ISSUER_LABEL_MAP}
        selected={filter.issuers}
        onChange={next => set('issuers', next as CertificationIssuer[])}
      />

      <MultiSelectDropdown
        label="Domain"
        options={domains}
        labelMap={DOMAIN_LABEL_MAP}
        selected={filter.domains}
        onChange={next => set('domains', next as CertificationDomain[])}
      />

      <MultiSelectDropdown
        label="Technologies"
        options={technologies}
        selected={filter.technologies}
        onChange={next => set('technologies', next)}
      />

      {/* Sort toggle */}
      <div className={styles.sortGroup}>
        {SORT_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`${styles.sortBtn} ${filter.sort === value ? styles.sortBtnActive : ''}`}
            onClick={() => set('sort', value)}
            aria-pressed={filter.sort === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
