/**
 * Tests for calculateAge utility.
 *
 * Key technique: vi.useFakeTimers() freezes Date.now() so the test
 * is deterministic regardless of when it runs. Without this, the
 * "today" inside calculateAge() would change every day.
 */

import { calculateAge } from '../calculateAge';

describe('calculateAge - deterministic tests with fake timers', () => {
  beforeEach(() => {
    // Freeze time to June 15, 2026 so tests always produce the same results
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns correct age when birthday has already passed this year', () => {
    // Born May 15, 2000 — already had birthday in 2026 → 26 years old
    expect(calculateAge(new Date('2000-05-15'))).toBe(26);
  });

  it('returns correct age when birthday is later this year', () => {
    // Born October 1, 2000 — birthday hasn't come yet in 2026 → 25 years old
    expect(calculateAge(new Date('2000-10-01'))).toBe(25);
  });

  it('returns correct age when birthday is today', () => {
    // Born June 15, 2000 — today IS the birthday → 26 years old
    expect(calculateAge(new Date('2000-06-15'))).toBe(26);
  });
});

// ─── Real-world age test (no fake timers) ─────────────────────
// This test verifies calculateAge works against the REAL current date.
// The expected value is hardcoded — it MUST be updated once a year
// on July 27th (the birthdate used below).

describe('calculateAge — real clock (no mocking)', () => {
  it('returns the correct age for 2000-07-27 against the real date', () => {
    const actual = calculateAge(new Date('2000-07-27'));
    expect(actual).toBe(25);
  });
});
