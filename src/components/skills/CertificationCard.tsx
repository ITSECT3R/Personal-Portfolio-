import type { Certification } from '../../types/certification';
import type { CertificationIssuer } from '../../types/certification';
import {
  ISSUER_LABEL_MAP,
  DOMAIN_LABEL_MAP,
} from '../../utils/certificationLabels';
import { ISSUER_ICON_MAP } from '../../utils/issuerIcons';
import { TECH_ICON_MAP } from '../common/icons/tech';
import styles from '../../styles/skills/certificationCard.module.css';

type Props = {
  cert: Certification;
};

/** Border effect per issuer — gives each issuer a distinct visual identity. */
const ISSUER_BORDER_MAP: Record<CertificationIssuer, string> = {
  epam: 'border-effect border-dual-spin border-hover-only',
  freecodecamp: 'border-effect border-rainbow border-hover-only',
  aws: 'border-effect border-corner-highlight border-hover-only',
};

export function CertificationCard({ cert }: Props) {
  const IssuerIcon = ISSUER_ICON_MAP[cert.issuer];
  const borderClass = ISSUER_BORDER_MAP[cert.issuer];

  return (
    <article className={`${styles.card} ${borderClass}`}>
      <div className={styles.inner}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className={styles.header}>
          <span className={styles.issuerIcon} aria-hidden="true">
            <IssuerIcon width={22} height={22} />
          </span>
          <div className={styles.headerText}>
            <span className={styles.issuerName}>
              {ISSUER_LABEL_MAP[cert.issuer]}
            </span>
            <span className={styles.year}>{cert.issuedYear}</span>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────── */}
        <div className={styles.body}>
          <h3 className={styles.title}>{cert.title}</h3>

          <div className={styles.chips}>
            <span className={styles.domainChip}>
              {DOMAIN_LABEL_MAP[cert.domain]}
            </span>
          </div>

          <p className={styles.description}>{cert.description}</p>

          {cert.technologies.length > 0 && (
            <div className={styles.techRow}>
              {cert.technologies.map(tech => {
                const Icon = TECH_ICON_MAP[tech];
                return (
                  <span key={tech} className={styles.techBadge}>
                    {Icon && <Icon width={14} height={14} />}
                    {tech}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className={styles.footer}>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewLink}
          >
            View Certificate →
          </a>
        </div>
      </div>
    </article>
  );
}
