/**
 * Test fixtures for filterProjects tests.
 *
 * Uses the ACTUAL project data from src/data/ — not fabricated mock data.
 * This ensures test assertions match reality: 23 projects (21 demos + 1 web app + 1 library).
 */

import type { ProjectKind, ProjectCategory } from '../../../types/project';
import { projects } from '../../../data/projects';

/** All projects from the real data source: 23 total (21 demos + 1 web app + 1 library) */
export const allProjects = projects;

/** Empty filter — no restrictions, returns all projects. */
export const emptyFilter = {
  kinds: [] as ProjectKind[],
  categories: [] as ProjectCategory[],
  languages: [] as string[],
  technologies: [] as string[],
};
