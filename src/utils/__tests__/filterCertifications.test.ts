/**
 * Tests for filterCertifications using REAL certification data.
 *
 * Reality: 10 total — 4 EPAM, 4 freeCodeCamp, 2 AWS.
 * Domains: 2 cloud, 4 frontend, 1 fullstack, 3 testing.
 * Sort: newest (descending year) or oldest (ascending year).
 */

import { filterCertifications } from '../filterCertifications';
import { allCerts, emptyFilter } from './data/filterCertifications.data';

describe('filterCertifications', () => {
  it('returns all 10 certifications when no filters are active', () => {
    expect(filterCertifications(allCerts, emptyFilter)).toHaveLength(10);
  });

  // ── Issuer filter ──

  describe('issuer', () => {
    it('filters AWS certs (2)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        issuers: ['aws'],
      });
      expect(result).toHaveLength(2);
      expect(result.every(c => c.issuer === 'aws')).toBe(true);
    });

    it('filters EPAM certs (4)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        issuers: ['epam'],
      });
      expect(result).toHaveLength(4);
    });

    it('filters freeCodeCamp certs (4)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        issuers: ['freecodecamp'],
      });
      expect(result).toHaveLength(4);
    });

    it('combines issuers with OR logic (AWS + EPAM = 6)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        issuers: ['aws', 'epam'],
      });
      expect(result).toHaveLength(6);
    });
  });

  // ── Domain filter ──

  describe('domain', () => {
    it('filters cloud certifications (2)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        domains: ['cloud'],
      });
      expect(result).toHaveLength(2);
      expect(result.every(c => c.domain === 'cloud')).toBe(true);
    });

    it('filters frontend certifications (4)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        domains: ['frontend'],
      });
      expect(result).toHaveLength(4);
    });
  });

  // ── Technology filter ──

  describe('technology', () => {
    it('finds certifications mentioning AWS', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        technologies: ['AWS'],
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(c => c.technologies.includes('AWS'))).toBe(true);
    });

    it('returns empty for a technology no cert uses', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        technologies: ['NonexistentTech'],
      });
      expect(result).toHaveLength(0);
    });
  });

  // ── Combined filters ──

  describe('combined', () => {
    it('AND between issuer + domain narrows results', () => {
      const result = filterCertifications(allCerts, {
        issuers: ['aws'],
        domains: ['cloud'],
        technologies: [],
        sort: 'newest',
      });
      expect(result).toHaveLength(2);
      expect(
        result.every(c => c.issuer === 'aws' && c.domain === 'cloud')
      ).toBe(true);
    });

    it('returns empty when no cert matches all filters', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        issuers: ['aws'],
        domains: ['frontend'],
      });
      expect(result).toHaveLength(0);
    });
  });

  // ── Sort order ──

  describe('sort', () => {
    it('sorts newest first (descending year)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        sort: 'newest',
      });
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].issuedYear).toBeGreaterThanOrEqual(
          result[i + 1].issuedYear
        );
      }
    });

    it('sorts oldest first (ascending year)', () => {
      const result = filterCertifications(allCerts, {
        ...emptyFilter,
        sort: 'oldest',
      });
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].issuedYear).toBeLessThanOrEqual(
          result[i + 1].issuedYear
        );
      }
    });
  });

  // ── Edge cases ──

  describe('edge cases', () => {
    it('handles empty certifications array', () => {
      expect(filterCertifications([], emptyFilter)).toHaveLength(0);
    });

    it('does not mutate the original array', () => {
      const original = [...allCerts];
      filterCertifications(allCerts, { ...emptyFilter, issuers: ['aws'] });
      expect(allCerts).toEqual(original);
    });
  });
});
