import { webApps } from './web-apps';
import { personalProjects } from './personalProjects';
import { demoProjects } from './demoProjects';
import { libraries } from './libraries';
import type { Project } from '../../types/project';

export { webApps } from './web-apps';
export { personalProjects } from './personalProjects';
export { demoProjects } from './demoProjects';
export { libraries } from './libraries';

export const projects: Project[] = [
  ...webApps,
  ...libraries,
  ...personalProjects,
  ...demoProjects,
];
