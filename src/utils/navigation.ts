/**
 * Navigation utility functions
 */

/**
 * Determines if a given path should have the active state
 * @param currentPath - The current pathname from useLocation() (e.g., "/projects/project1")
 * @param targetPath - The path to check against (e.g., "/projects")
 * @returns 'active' if the path matches, empty string otherwise
 *
 * @example
 * // currentPath = "/projects/project1"
 * getActiveClass("/projects/project1", "/projects") // returns "active"
 * getActiveClass("/projects/project1", "/skills")   // returns ""
 */
export function getActiveClass(
  currentPath: string,
  targetPath: string
): string {
  // Special case for projects - match all /projects/* routes
  // This ensures the Projects button stays active on detail pages
  if (targetPath === '/projects') {
    return currentPath.startsWith('/projects') ? 'active' : '';
  }

  // Exact match for other routes
  return currentPath === targetPath ? 'active' : '';
}

/**
 * Type-safe route paths
 */
export const ROUTES = {
  HOME: '/',
  EXPERIENCE: '/experience',
  PROJECTS: '/projects',
  SKILLS: '/skills',
} as const;
