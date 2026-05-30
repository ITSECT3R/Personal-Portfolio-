import { realProjects } from './realProjects';
import { personalProjects } from './personalProjects';
import { demoProjects } from './demoProjects';
import type { Project } from '../../types/project';

export { realProjects } from './realProjects';
export { personalProjects } from './personalProjects';
export { demoProjects } from './demoProjects';

export const projects: Project[] = [...realProjects, ...personalProjects, ...demoProjects];
