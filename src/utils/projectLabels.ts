import type { ProjectCategory, ProjectKind } from '../types/project';

/**
 * Display labels for ProjectKind values.
 * Add an entry here whenever a new kind is added to the union type.
 */
export const KIND_LABEL_MAP: Record<ProjectKind, string> = {
  demo: 'Demo',
  project: 'Project',
};

/**
 * Display labels for ProjectCategory values.
 * Add an entry here whenever a new category is added to the union type.
 * The dropdown options are derived from this map + the actual project data,
 * so only categories that appear in at least one project will show up.
 */
export const CATEGORY_LABEL_MAP: Record<ProjectCategory, string> = {
  frontend: 'Front-End',
  backend: 'Back-End',
  fullstack: 'Full Stack',
  devops: 'DevOps',
  testing: 'Testing',
  networking: 'Networking',
};
