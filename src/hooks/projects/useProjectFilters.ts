import { useMemo, useState } from 'react';
import type { ProjectCategory, ProjectKind } from '../../types/project';
import { projects } from '../../data/projects';
import { filterProjects } from '../../utils/filterProjects';
import { KIND_LABEL_MAP, CATEGORY_LABEL_MAP } from '../../utils/projectLabels';

export type FilterState = {
  /** OR multi-select — empty means "no kind filter applied" */
  kinds: ProjectKind[];
  /** OR multi-select — empty means "no category filter applied" */
  categories: ProjectCategory[];
  /** OR multi-select — empty means "no language filter applied" */
  languages: string[];
  /** OR multi-select — empty means "no technology filter applied" */
  technologies: string[];
};

export const DEFAULT_FILTER: FilterState = {
  kinds: [],
  categories: [],
  languages: [],
  technologies: [],
};

export function useProjectFilters() {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  // Derive available options from actual data — only values present in at least
  // one project appear in the dropdowns. Sort by label for consistent ordering.
  const allKinds = useMemo(
    () =>
      ([...new Set(projects.map(p => p.kind))] as ProjectKind[]).sort((a, b) =>
        KIND_LABEL_MAP[a].localeCompare(KIND_LABEL_MAP[b])
      ),
    []
  );

  const allCategories = useMemo(
    () =>
      ([...new Set(projects.map(p => p.category))] as ProjectCategory[]).sort(
        (a, b) => CATEGORY_LABEL_MAP[a].localeCompare(CATEGORY_LABEL_MAP[b])
      ),
    []
  );

  const allLanguages = useMemo(
    () => [...new Set(projects.flatMap(p => p.languages))].sort(),
    []
  );

  const allTechnologies = useMemo(
    () => [...new Set(projects.flatMap(p => p.technologies))].sort(),
    []
  );

  const filtered = useMemo(() => filterProjects(projects, filter), [filter]);

  const resetFilters = () => setFilter(DEFAULT_FILTER);

  return {
    filter,
    setFilter,
    filtered,
    allKinds,
    allCategories,
    allLanguages,
    allTechnologies,
    resetFilters,
  };
}
