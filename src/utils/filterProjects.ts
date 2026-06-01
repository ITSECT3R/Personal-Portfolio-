import type { Project, ProjectCategory, ProjectKind } from '../types/project';

/** Shape accepted by filterProjects — matches FilterState in useProjectFilters. */
type ProjectFilterInput = {
  kind: ProjectKind | 'all';
  category: ProjectCategory | 'all';
  /** OR logic — empty array means "no restriction" */
  languages: string[];
  /** OR logic — empty array means "no restriction" */
  technologies: string[];
};

/**
 * Pure function — no React, fully unit-testable.
 * Returns the subset of `projects` that satisfy every active filter.
 * Single-select filters (kind, category) use exact-match; 'all' skips the check.
 * Multi-select filters (languages, technologies) use OR: a project passes
 * if it contains at least one of the selected values.
 */
export function filterProjects(
  projects: Project[],
  filter: ProjectFilterInput,
): Project[] {
  return projects.filter(p => {
    if (filter.kind !== 'all' && p.kind !== filter.kind) return false;
    if (filter.category !== 'all' && p.category !== filter.category) return false;
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
