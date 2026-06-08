import type { Project, ProjectCategory, ProjectKind } from '../types/project';

/** Shape accepted by filterProjects — matches FilterState in useProjectFilters. */
type ProjectFilterInput = {
  /** OR multi-select — empty array means "no restriction" */
  kinds: ProjectKind[];
  /** OR multi-select — empty array means "no restriction" */
  categories: ProjectCategory[];
  /** OR multi-select — empty array means "no restriction" */
  languages: string[];
  /** OR multi-select — empty array means "no restriction" */
  technologies: string[];
};

/**
 * Pure function — no React, fully unit-testable.
 * Returns the subset of `projects` that satisfy every active filter.
 * All filters use OR logic: a project passes a filter if it matches
 * at least one of the selected values. Empty selection = no restriction.
 */
export function filterProjects(
  projects: Project[],
  filter: ProjectFilterInput
): Project[] {
  return projects.filter(p => {
    if (filter.kinds.length > 0 && !filter.kinds.includes(p.kind)) return false;
    if (filter.categories.length > 0 && !filter.categories.includes(p.category))
      return false;
    if (
      filter.languages.length > 0 &&
      !filter.languages.some(l => p.languages.includes(l))
    )
      return false;
    if (
      filter.technologies.length > 0 &&
      !filter.technologies.some(t => p.technologies.includes(t))
    )
      return false;
    return true;
  });
}
