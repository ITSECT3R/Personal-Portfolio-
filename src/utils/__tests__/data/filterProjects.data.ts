/**
 * Test fixtures for filterProjects tests.
 *
 * Uses the ACTUAL project data from src/data/ — not fabricated mock data.
 * This ensures test assertions match reality: 22 projects (21 demos + 1 project).
 */

import type { ProjectKind, ProjectCategory } from '../../../types/project';
import { projects } from '../../../data/projects';

/** All projects from the real data source: 22 total (21 demos + 1 project) */
export const allProjects = projects;

/** Empty filter — no restrictions, returns all projects. */
export const emptyFilter = {
  kinds: [] as ProjectKind[],
  categories: [] as ProjectCategory[],
  languages: [] as string[],
  technologies: [] as string[],
};
