import usePageBackground from '../hooks/usePageBackground';
import { useCertificationFilters } from '../hooks/certifications/useCertificationFilters';
import { CertificationFilter } from '../components/skills/CertificationFilter';
import { CertificationCard } from '../components/skills/CertificationCard';
import { SkillsGrid } from '../components/skills/SkillsGrid';
import styles from '../styles/skills.module.css';

export default function Skills() {
  usePageBackground('skills', 'linear-gradient(120deg,#16213e,#1f4068)');

  const { filter, setFilter, filtered, allIssuers, allDomains, allTechnologies } =
    useCertificationFilters();

  return (
    <div className={styles.page}>
      {/* ── Section 1: Certifications ──────────────────────────── */}
      <h2
        className={`${styles.sectionHeading} text-effect text-reveal-up is-animated`}
        style={{ '--text-effect-speed': '0.6s' } as React.CSSProperties}
      >
        Certifications
      </h2>
      <p className={styles.sectionSub}>
        {filtered.length} certification{filtered.length !== 1 ? 's' : ''}
      </p>

      <CertificationFilter
        issuers={allIssuers}
        domains={allDomains}
        technologies={allTechnologies}
        filter={filter}
        onChange={setFilter}
      />

      <div className={styles.certGrid}>
        {filtered.length > 0 ? (
          filtered.map(cert => <CertificationCard key={cert.id} cert={cert} />)
        ) : (
          <p className={styles.empty}>No certifications match the selected filters.</p>
        )}
      </div>

      <hr className={styles.divider} />

      {/* ── Section 2: Skills ──────────────────────────────────── */}
      <h2
        className={`${styles.sectionHeading} text-effect text-reveal-up is-animated`}
        style={{ '--text-effect-speed': '0.6s', '--text-effect-delay': '0.1s' } as React.CSSProperties}
      >
        Technical Skills
      </h2>
      <p className={styles.sectionSub}>Technologies, tools, and platforms I work with</p>

      <SkillsGrid />
    </div>
  );
}

