import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime, formatRelativeTime, getTodayDateInputString } from '../utils/date';

describe('Date Utilities', () => {
  it('formatDate formats ISO string properly', () => {
    const formatted = formatDate('2026-10-13T00:00:00.000Z');
    expect(formatted).toContain('2026');
  });

  it('formatDate returns original string on invalid date', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
  });

  it('getTodayDateInputString returns YYYY-MM-DD pattern', () => {
    const today = getTodayDateInputString();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('formatRelativeTime returns accurate relative representation', () => {
    const past = new Date(Date.now() - 120000).toISOString(); // 2 mins ago
    expect(formatRelativeTime(past)).toBe('2m ago');

    const future = new Date(Date.now() + 180000).toISOString(); // 3 mins future
    expect(formatRelativeTime(future)).toBe('in 3m');
  });
});
