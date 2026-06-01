import { useMemo, useState } from 'react';
import type { ProjectCategory, ProjectKind } from '../../types/project';
import { projects } from '../../data/projects';
import { filterProjects } from '../../utils/filterProjects';

export type FilterState = {
  kind: ProjectKind | 'all';
  category: ProjectCategory | 'all';
  /** OR multi-select — empty means "no language filter applied" */
  languages: string[];
  /** OR multi-select — empty means "no technology filter applied" */
  technologies: string[];
};

export const DEFAULT_FILTER: FilterState = {
  kind: 'all',
  category: 'all',
  languages: [],
  technologies: [],
};

export function useProjectFilters() {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const allLanguages = useMemo(
    () => [...new Set(projects.flatMap(p => p.languages))].sort(),
    [],
  );

  const allTechnologies = useMemo(
    () => [...new Set(projects.flatMap(p => p.technologies))].sort(),
    [],
  );

  const filtered = useMemo(() => filterProjects(projects, filter), [filter]);

  const resetFilters = () => setFilter(DEFAULT_FILTER);

  return {
    filter,
    setFilter,
    filtered,
    allLanguages,
    allTechnologies,
    resetFilters,
  };
}
