import type { ProjectCategory, ProjectKind } from '../../types/project';
import type { FilterState } from '../../hooks/projects/useProjectFilters';
import { KIND_LABEL_MAP, CATEGORY_LABEL_MAP } from '../../utils/projectLabels';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import styles from '../../styles/projects/filter.module.css';

type Props = {
  kinds: ProjectKind[];
  categories: ProjectCategory[];
  languages: string[];
  technologies: string[];
  filter: FilterState;
  onChange: (next: FilterState) => void;
};

export function ProjectFilter({
  kinds,
  categories,
  languages,
  technologies,
  filter,
  onChange,
}: Props) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filter, [key]: value });

  return (
    <div className={styles.filterBar}>
      <MultiSelectDropdown
        label="Type"
        options={kinds}
        labelMap={KIND_LABEL_MAP}
        selected={filter.kinds}
        onChange={next => set('kinds', next as ProjectKind[])}
      />

      <MultiSelectDropdown
        label="Category"
        options={categories}
        labelMap={CATEGORY_LABEL_MAP}
        selected={filter.categories}
        onChange={next => set('categories', next as ProjectCategory[])}
      />

      <MultiSelectDropdown
        label="Languages"
        options={languages}
        selected={filter.languages}
        onChange={next => set('languages', next)}
      />

      <MultiSelectDropdown
        label="Technologies"
        options={technologies}
        selected={filter.technologies}
        onChange={next => set('technologies', next)}
      />
    </div>
  );
}
