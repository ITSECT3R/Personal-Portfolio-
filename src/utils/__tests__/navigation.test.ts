/**
 * Tests for navigation utility functions.
 *
 * These are PURE UNIT tests — no React, no DOM, no mocking.
 * Vitest runs them in Node.js with zero setup overhead.
 *
 * Key Vitest features demonstrated here:
 *  - describe/it blocks (specification-style structure)
 *  - it.each() for parameterized tests (run same logic with different data)
 *  - expect().toBe() for strict equality
 *  - globals: true means no imports needed for describe/it/expect
 */

import { getActiveClass } from '../navigation';

// ─── getActiveClass ────────────────────────────────────────────

describe('getActiveClass', () => {
  // ── /projects special case ──
  // /projects is special because it's a PARENT route.
  // Sub-routes like /projects/my-app should also highlight the Projects nav item.

  describe('for /projects (parent route with sub-routes)', () => {
    it('returns "active" when on /projects exactly', () => {
      expect(getActiveClass('/projects', '/projects')).toBe('active');
    });

    it('returns "active" when on a sub-route like /projects/my-app', () => {
      // This is the KEY behavior: detail pages keep the nav highlighted
      expect(getActiveClass('/projects/my-app', '/projects')).toBe('active');
    });

    it('returns "" when on an unrelated route like /skills', () => {
      expect(getActiveClass('/skills', '/projects')).toBe('');
    });

    it('returns "" when on the home page', () => {
      expect(getActiveClass('/', '/projects')).toBe('');
    });
  });

  // ── Exact match routes (/, /skills, etc.) ──
  // These are terminal routes — only highlighted on exact match.

  describe('for non-project routes (exact match)', () => {
    it('returns "active" when on / exactly', () => {
      expect(getActiveClass('/', '/')).toBe('active');
    });

    it('returns "" when on /skills while targeting /', () => {
      expect(getActiveClass('/skills', '/')).toBe('');
    });

    it('returns "active" when on /skills exactly', () => {
      expect(getActiveClass('/skills', '/skills')).toBe('active');
    });

    it('returns "" when on a sub-route of /skills', () => {
      // Unlike /projects, /skills has NO sub-routes so exact match is correct
      expect(getActiveClass('/skills/certification', '/skills')).toBe('');
    });
  });

  // ── Edge cases ──

  describe('edge cases', () => {
    it('returns "" when paths are completely different', () => {
      expect(getActiveClass('/home', '/about')).toBe('');
    });

    it('is case-sensitive (URLs are case-sensitive)', () => {
      expect(getActiveClass('/Projects', '/projects')).toBe('');
    });

    it('matches any path that starts with /projects (startsWith behavior)', () => {
      // NOTE: startsWith('/projects') is a prefix match.
      // '/projectsss' starts with '/projects', so it returns 'active'.
      // This is acceptable for a personal portfolio — no real route would
      // start with '/projectsss'. If this ever matters, add a trailing-slash
      // check: startsWith('/projects/') || currentPath === '/projects'
      expect(getActiveClass('/projectsss', '/projects')).toBe('active');
    });
  });
});

// ─── ROUTES constant ───────────────────────────────────────────
// NOTE: ROUTES is configuration data (not logic), guarded by `as const`
// at compile time. It doesn't need runtime tests — getActiveClass tests
// already verify the ROUTES values work correctly in the function that
// consumes them. Adding a new route shouldn't require test changes.
