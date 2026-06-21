/**
 * Tests for filterProjects using REAL project data.
 *
 * Reality: 23 total — 21 demos (19 freeCodeCamp + 2 personal) + 1 real project + 1 library.
 * All filters use OR logic within a type, AND logic between types.
 */

import { filterProjects } from '../filterProjects';
import { allProjects, emptyFilter } from './data/filterProjects.data';

describe('filterProjects', () => {
  it('returns all projects when no filters are active', () => {
    expect(filterProjects(allProjects, emptyFilter)).toHaveLength(23);
  });

  // ── Kind filter ──

  describe('kind', () => {
    it('filters to only demos (21)', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        kinds: ['demo'],
      });
      expect(result).toHaveLength(21);
      expect(result.every(p => p.kind === 'demo')).toBe(true);
    });

    it('filters to only real projects (1)', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        kinds: ['project'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].kind).toBe('project');
    });

    it('returns all when both kinds selected (OR logic)', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        kinds: ['demo', 'project'],
      });
      expect(result).toHaveLength(22);
    });

    it('includes library kind', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        kinds: ['library'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].kind).toBe('library');
    });
  });

  // ── Category filter ──

  describe('category', () => {
    it('filters by frontend category', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        categories: ['frontend'],
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(p => p.category === 'frontend')).toBe(true);
    });

    it('filters by fullstack category (1 project)', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        categories: ['fullstack'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('fullstack');
    });
  });

  // ── Language filter ──

  describe('language', () => {
    it('finds all projects using JavaScript', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        languages: ['JavaScript'],
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(p => p.languages.includes('JavaScript'))).toBe(true);
    });

    it('finds projects using TypeScript (Shadow + Bortx)', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        languages: ['TypeScript'],
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(p => p.languages.includes('TypeScript'))).toBe(true);
    });

    it('returns empty for a language no project uses', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        languages: ['Rust'],
      });
      expect(result).toHaveLength(0);
    });
  });

  // ── Technology filter ──

  describe('technology', () => {
    it('finds projects using React', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        technologies: ['React'],
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(p => p.technologies.includes('React'))).toBe(true);
    });

    it('returns empty for a technology no project uses', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        technologies: ['NonexistentTech'],
      });
      expect(result).toHaveLength(0);
    });
  });

  // ── Combined filters ──

  describe('combined', () => {
    it('AND between kind + category narrows results', () => {
      const allDemos = filterProjects(allProjects, {
        ...emptyFilter,
        kinds: ['demo'],
      });
      const fullstackDemos = filterProjects(allProjects, {
        kinds: ['demo'],
        categories: ['fullstack'],
        languages: [],
        technologies: [],
      });
      // fullstackDemos should be fewer than allDemos
      expect(fullstackDemos.length).toBeLessThan(allDemos.length);
    });

    it('returns empty when no project matches all filters', () => {
      const result = filterProjects(allProjects, {
        ...emptyFilter,
        kinds: ['project'],
        categories: ['testing'], // no project has testing category
      });
      expect(result).toHaveLength(0);
    });
  });

  // ── Edge cases ──

  describe('edge cases', () => {
    it('handles empty projects array', () => {
      expect(filterProjects([], emptyFilter)).toHaveLength(0);
    });

    it('does not mutate the original array', () => {
      const original = [...allProjects];
      filterProjects(allProjects, { ...emptyFilter, kinds: ['demo'] });
      expect(allProjects).toEqual(original);
    });
  });
});
