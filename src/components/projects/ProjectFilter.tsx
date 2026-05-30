import type { ProjectCategory, ProjectKind } from '../../types/project';
import styles from '../../styles/projects/filter.module.css';

export type FilterState = {
  kind: ProjectKind | 'all';
  category: ProjectCategory | 'all';
  language: string | 'all';
};

type Props = {
  languages: string[];
  filter: FilterState;
  onChange: (next: FilterState) => void;
};

export function ProjectFilter({ languages, filter, onChange }: Props) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filter, [key]: value });

  return (
    <div className={styles.filterBar}>
      {/* Kind */}
      <div className={styles.group}>
        {(
          [
            { value: 'all', label: 'All' },
            { value: 'demo', label: 'Demos' },
            { value: 'project', label: 'Projects' },
          ] as const
        ).map(({ value, label }) => {
          const isActive = filter.kind === value;
          const kindStyle =
            value === 'demo'
              ? styles.pillDemo
              : value === 'project'
                ? styles.pillProject
                : '';
          return (
            <button
              key={value}
              className={`${styles.pill} ${kindStyle} ${isActive ? styles.pillActive : ''}`}
              onClick={() => set('kind', value)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Category */}
      <div className={styles.group}>
        {(
          [
            { value: 'all', label: 'All' },
            { value: 'frontend', label: 'Front-End' },
            { value: 'backend', label: 'Back-End' },
            { value: 'fullstack', label: 'Full Stack' },
          ] as const
        ).map(({ value, label }) => {
          const isActive = filter.category === value;
          return (
            <button
              key={value}
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => set('category', value)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Language */}
      <div className={styles.group}>
        {(['all', ...languages] as const).map(lang => {
          const isActive = filter.language === lang;
          return (
            <button
              key={lang}
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => set('language', lang)}
              aria-pressed={isActive}
            >
              {lang === 'all' ? 'All Languages' : lang}
            </button>
          );
        })}
      </div>
    </div>
  );
}
