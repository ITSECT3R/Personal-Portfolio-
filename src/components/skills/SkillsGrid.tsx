import {
  programmingSkills,
  frontendSkills,
  backendAndDatabase,
  testingAndQA,
  devOpsAndCICD,
  cloudPlatforms,
  developmentTools,
  softSkills,
} from '../../data/skills';
import type { SkillSet } from '../../types/cv';
import { TECH_ICON_MAP } from '../common/icons/tech';
import styles from '../../styles/skills/skillsGrid.module.css';

const TECH_SKILL_GROUPS: SkillSet[] = [
  programmingSkills,
  frontendSkills,
  backendAndDatabase,
  testingAndQA,
  devOpsAndCICD,
  cloudPlatforms,
  developmentTools,
];

// Border effect per category — cycles through the library palette
const CARD_BORDER_EFFECTS = [
  'border-effect border-dual-spin border-hover-only',
  'border-effect border-rainbow border-hover-only',
  'border-effect border-gradient border-hover-only',
  'border-effect border-shimmer border-hover-only',
  'border-effect border-pulse border-hover-only',
  'border-effect border-light-trail border-hover-only',
  'border-effect border-neon border-hover-only',
  'border-effect border-ripple border-hover-only',
  'border-effect border-corner-highlight border-hover-only',
  'border-effect border-dash-chase border-hover-only',
  'border-effect border-dots border-hover-only',
];

export function SkillsGrid() {
  return (
    <section>
      <div className={styles.grid}>
        {TECH_SKILL_GROUPS.map((group, groupIdx) => {
          const borderClass =
            CARD_BORDER_EFFECTS[groupIdx % CARD_BORDER_EFFECTS.length];
          return (
            <div
              key={group.category}
              className={`${styles.categoryCard} ${borderClass}`}
            >
              <div className={styles.categoryHeader}>
                <p className={styles.categoryTitle}>{group.category}</p>
              </div>

              <div className={styles.badgeRow}>
                {group.skills.map(skill => {
                  const Icon = TECH_ICON_MAP[skill];
                  return Icon ? (
                    <span key={skill} className={styles.badge} title={skill}>
                      <Icon width={18} height={18} />
                      {skill}
                    </span>
                  ) : (
                    <span
                      key={skill}
                      className={`${styles.badge} ${styles.badgeText}`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Soft skills — shown separately as a chip list */}
      <div className={styles.softSkillsSection}>
        <p className={styles.softSkillsLabel}>{softSkills.category}</p>
        <div className={styles.softSkillsRow}>
          {softSkills.skills.map(skill => (
            <span key={skill} className={styles.softChip}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
