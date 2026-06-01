import type { FilterState } from '../../hooks/projects/useProjectFilters';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import styles from '../../styles/projects/filter.module.css';

const KIND_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'demo', label: 'Demos' },
  { value: 'project', label: 'Projects' },
] as const;

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'frontend', label: 'Front-End' },
  { value: 'backend', label: 'Back-End' },
  { value: 'fullstack', label: 'Full Stack' },
] as const;

type Props = {
  languages: string[];
  technologies: string[];
  filter: FilterState;
  onChange: (next: FilterState) => void;
};

export function ProjectFilter({ languages, technologies, filter, onChange }: Props) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filter, [key]: value });

  return (
    <div className={styles.filterBar}>
      {/* Kind — single-select pills */}
      <div className={styles.group}>
        {KIND_OPTIONS.map(({ value, label }) => {
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
              type="button"
              className={`${styles.pill} ${kindStyle} ${isActive ? styles.pillActive : ''}`}
              onClick={() => set('kind', value)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Category — single-select pills */}
      <div className={styles.group}>
        {CATEGORY_OPTIONS.map(({ value, label }) => {
          const isActive = filter.category === value;
          return (
            <button
              key={value}
              type="button"
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => set('category', value)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Languages — multi-select dropdown */}
      <MultiSelectDropdown
        label="Languages"
        options={languages}
        selected={filter.languages}
        onChange={next => set('languages', next)}
      />

      {/* Technologies — multi-select dropdown */}
      <MultiSelectDropdown
        label="Technologies"
        options={technologies}
        selected={filter.technologies}
        onChange={next => set('technologies', next)}
      />
    </div>
  );
}
