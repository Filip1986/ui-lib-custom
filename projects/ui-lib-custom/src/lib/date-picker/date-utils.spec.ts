import {
  addMonths,
  addYears,
  cloneDate,
  createDate,
  getDecadeBounds,
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonthDates,
  getYearRange,
  isDateAfter,
  isDateBefore,
  isDateBetween,
  isDateDisabled,
  isDateEqual,
  isToday,
} from './date-utils';

function findMetaByDay(
  monthGrid: ReturnType<typeof getMonthDates>,
  year: number,
  month: number,
  day: number
): (typeof monthGrid)[number] {
  const cell: (typeof monthGrid)[number] | undefined = monthGrid.find(
    (dateMeta: (typeof monthGrid)[number]): boolean =>
      dateMeta.year === year && dateMeta.month === month && dateMeta.day === day
  );

  if (!cell) {
    throw new Error(`Expected to find day ${day} in ${month + 1}/${year}.`);
  }

  return cell;
}

describe('date-utils', (): void => {
  describe('getDaysInMonth', (): void => {
    it('returns day counts for standard months', (): void => {
      expect(getDaysInMonth(0, 2024)).toBe(31);
      expect(getDaysInMonth(3, 2024)).toBe(30);
      expect(getDaysInMonth(6, 2024)).toBe(31);
      expect(getDaysInMonth(10, 2024)).toBe(30);
    });

    it('handles leap-year and non-leap-year February correctly', (): void => {
      expect(getDaysInMonth(1, 2024)).toBe(29);
      expect(getDaysInMonth(1, 2023)).toBe(28);
      expect(getDaysInMonth(1, 2000)).toBe(29);
      expect(getDaysInMonth(1, 1900)).toBe(28);
    });

    it('supports boundary-like years deterministically', (): void => {
      expect(getDaysInMonth(1, 1)).toBe(28);
      expect(getDaysInMonth(1, 2400)).toBe(29);
    });
  });

  describe('getFirstDayOfMonth', (): void => {
    it('returns expected first-day index for various months', (): void => {
      expect(getFirstDayOfMonth(0, 2024)).toBe(new Date(2024, 0, 1).getDay());
      expect(getFirstDayOfMonth(1, 2024)).toBe(new Date(2024, 1, 1).getDay());
      expect(getFirstDayOfMonth(2, 2024)).toBe(new Date(2024, 2, 1).getDay());
    });

    it('is locale-independent (weekday index unaffected by locale labels)', (): void => {
      const firstDay: number = getFirstDayOfMonth(11, 2026);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThanOrEqual(6);
      expect(firstDay).toBe(new Date(2026, 11, 1).getDay());
    });
  });

  describe('isDateEqual', (): void => {
    it('returns true for same calendar date with different times', (): void => {
      const morning: Date = new Date(2024, 2, 10, 9, 0, 0, 0);
      const evening: Date = new Date(2024, 2, 10, 18, 45, 0, 0);
      expect(isDateEqual(morning, evening)).toBe(true);
    });

    it('handles null comparisons', (): void => {
      expect(isDateEqual(null, null)).toBe(true);
      expect(isDateEqual(new Date(2024, 0, 1), null)).toBe(false);
      expect(isDateEqual(null, new Date(2024, 0, 1))).toBe(false);
    });

    it('handles undefined edge cases defensively', (): void => {
      const invalidLeft: Date | null = undefined as unknown as Date | null;
      const invalidRight: Date | null = undefined as unknown as Date | null;

      expect(isDateEqual(invalidLeft, new Date(2024, 0, 1))).toBe(false);
      expect(isDateEqual(new Date(2024, 0, 1), invalidRight)).toBe(false);
      expect(isDateEqual(invalidLeft, invalidRight)).toBe(false);
    });
  });

  describe('isDateBefore and isDateAfter', (): void => {
    it('treat same day with different times as neither before nor after', (): void => {
      const early: Date = new Date(2024, 5, 1, 0, 1, 0, 0);
      const late: Date = new Date(2024, 5, 1, 23, 59, 59, 999);

      expect(isDateBefore(early, late)).toBe(false);
      expect(isDateAfter(late, early)).toBe(false);
    });

    it('handles month and year boundaries', (): void => {
      expect(isDateBefore(new Date(2024, 11, 31), new Date(2025, 0, 1))).toBe(true);
      expect(isDateAfter(new Date(2025, 0, 1), new Date(2024, 11, 31))).toBe(true);
    });
  });

  describe('isDateBetween', (): void => {
    it('is inclusive for start and end boundaries', (): void => {
      const start: Date = createDate(2024, 2, 10);
      const end: Date = createDate(2024, 2, 20);

      expect(isDateBetween(createDate(2024, 2, 10), start, end)).toBe(true);
      expect(isDateBetween(createDate(2024, 2, 20), start, end)).toBe(true);
    });

    it('supports equal start and end as a single-day window', (): void => {
      const same: Date = createDate(2024, 2, 15);
      expect(isDateBetween(createDate(2024, 2, 15), same, same)).toBe(true);
      expect(isDateBetween(createDate(2024, 2, 14), same, same)).toBe(false);
    });

    it('returns false for dates outside range', (): void => {
      const start: Date = createDate(2024, 2, 10);
      const end: Date = createDate(2024, 2, 20);

      expect(isDateBetween(createDate(2024, 2, 9), start, end)).toBe(false);
      expect(isDateBetween(createDate(2024, 2, 21), start, end)).toBe(false);
    });
  });

  describe('isDateDisabled', (): void => {
    const target: Date = createDate(2024, 2, 15);

    it('handles minDate-only constraints', (): void => {
      expect(isDateDisabled(target, createDate(2024, 2, 16), null, null, null)).toBe(true);
      expect(isDateDisabled(target, createDate(2024, 2, 15), null, null, null)).toBe(false);
    });

    it('handles maxDate-only constraints', (): void => {
      expect(isDateDisabled(target, null, createDate(2024, 2, 14), null, null)).toBe(true);
      expect(isDateDisabled(target, null, createDate(2024, 2, 15), null, null)).toBe(false);
    });

    it('handles combined min and max boundaries', (): void => {
      expect(
        isDateDisabled(
          createDate(2024, 2, 9),
          createDate(2024, 2, 10),
          createDate(2024, 2, 20),
          null,
          null
        )
      ).toBe(true);
      expect(
        isDateDisabled(
          createDate(2024, 2, 21),
          createDate(2024, 2, 10),
          createDate(2024, 2, 20),
          null,
          null
        )
      ).toBe(true);
      expect(
        isDateDisabled(
          createDate(2024, 2, 12),
          createDate(2024, 2, 10),
          createDate(2024, 2, 20),
          null,
          null
        )
      ).toBe(false);
    });

    it('matches explicit disabledDates entries', (): void => {
      const disabledDates: Date[] = [createDate(2024, 2, 15), createDate(2024, 2, 30)];
      expect(isDateDisabled(target, null, null, disabledDates, null)).toBe(true);
      expect(isDateDisabled(createDate(2024, 2, 16), null, null, disabledDates, null)).toBe(false);
    });

    it('matches disabled weekday entries', (): void => {
      const saturday: Date = createDate(2024, 2, 16);
      expect(isDateDisabled(saturday, null, null, null, [6])).toBe(true);
      expect(isDateDisabled(target, null, null, null, [6])).toBe(false);
    });

    it('applies combined constraints', (): void => {
      const disabledDates: Date[] = [createDate(2024, 2, 18)];
      const disabledDays: number[] = [0];
      expect(
        isDateDisabled(
          createDate(2024, 2, 18),
          createDate(2024, 2, 10),
          createDate(2024, 2, 20),
          disabledDates,
          disabledDays
        )
      ).toBe(true);
      expect(
        isDateDisabled(
          createDate(2024, 2, 24),
          createDate(2024, 2, 10),
          createDate(2024, 2, 20),
          disabledDates,
          disabledDays
        )
      ).toBe(true);
    });
  });

  describe('isToday', (): void => {
    it('identifies today, yesterday, and tomorrow correctly', (): void => {
      const now: Date = new Date();
      const today: Date = createDate(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday: Date = createDate(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      const tomorrow: Date = createDate(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      expect(isToday(today)).toBe(true);
      expect(isToday(yesterday)).toBe(false);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('createDate and cloneDate', (): void => {
    it('creates start-of-day dates regardless of provided day values', (): void => {
      const created: Date = createDate(2024, 2, 15);
      expect(created.getHours()).toBe(0);
      expect(created.getMinutes()).toBe(0);
      expect(created.getSeconds()).toBe(0);
      expect(created.getMilliseconds()).toBe(0);
    });

    it('clones date without sharing object identity', (): void => {
      const source: Date = new Date(2024, 2, 15, 10, 30, 0, 0);
      const clone: Date = cloneDate(source);

      expect(clone).not.toBe(source);
      expect(clone.getTime()).toBe(source.getTime());

      clone.setDate(20);
      expect(source.getDate()).toBe(15);
    });
  });

  describe('addMonths', (): void => {
    it('supports positive and negative month shifts', (): void => {
      const base: Date = createDate(2024, 5, 10);
      expect(addMonths(base, 2)).toEqual(createDate(2024, 7, 10));
      expect(addMonths(base, -2)).toEqual(createDate(2024, 3, 10));
    });

    it('handles year rollover in both directions', (): void => {
      expect(addMonths(createDate(2024, 11, 15), 1)).toEqual(createDate(2025, 0, 15));
      expect(addMonths(createDate(2025, 0, 15), -1)).toEqual(createDate(2024, 11, 15));
    });

    it('applies Date end-of-month clamping behavior', (): void => {
      expect(addMonths(createDate(2024, 0, 31), 1)).toEqual(createDate(2024, 2, 2));
    });
  });

  describe('addYears', (): void => {
    it('supports positive and negative year shifts', (): void => {
      const base: Date = createDate(2024, 2, 10);
      expect(addYears(base, 2)).toEqual(createDate(2026, 2, 10));
      expect(addYears(base, -2)).toEqual(createDate(2022, 2, 10));
    });

    it('handles leap year edge case from Feb 29', (): void => {
      expect(addYears(createDate(2024, 1, 29), 1)).toEqual(createDate(2025, 2, 1));
    });
  });

  describe('getMonthDates', (): void => {
    it('returns a fixed 42-cell grid', (): void => {
      const grid: ReturnType<typeof getMonthDates> = getMonthDates(2, 2024, 0);
      expect(grid).toHaveLength(42);
    });

    it('aligns first-of-month index according to firstDayOfWeek', (): void => {
      const sundayStartGrid: ReturnType<typeof getMonthDates> = getMonthDates(2, 2024, 0);
      const mondayStartGrid: ReturnType<typeof getMonthDates> = getMonthDates(2, 2024, 1);

      const marchFirstSundayIndex: number = sundayStartGrid.findIndex(
        (dateMeta: (typeof sundayStartGrid)[number]): boolean =>
          dateMeta.year === 2024 && dateMeta.month === 2 && dateMeta.day === 1
      );
      const marchFirstMondayIndex: number = mondayStartGrid.findIndex(
        (dateMeta: (typeof mondayStartGrid)[number]): boolean =>
          dateMeta.year === 2024 && dateMeta.month === 2 && dateMeta.day === 1
      );

      expect(marchFirstSundayIndex).toBe(5);
      expect(marchFirstMondayIndex).toBe(4);
    });

    it('sets otherMonth flags for spillover days', (): void => {
      const grid: ReturnType<typeof getMonthDates> = getMonthDates(2, 2024, 0);
      expect(grid[0]?.otherMonth).toBe(true);

      const inMonthCell: (typeof grid)[number] = findMetaByDay(grid, 2024, 2, 10);
      expect(inMonthCell.otherMonth).toBe(false);
    });

    it('marks exactly one today cell for the current month grid', (): void => {
      const now: Date = new Date();
      const grid: ReturnType<typeof getMonthDates> = getMonthDates(
        now.getMonth(),
        now.getFullYear(),
        0
      );
      const todayCount: number = grid.filter(
        (dateMeta: (typeof grid)[number]): boolean => dateMeta.today
      ).length;
      expect(todayCount).toBe(1);
    });

    it('sets selectable and disabled flags using min/max and disabled lists', (): void => {
      const grid: ReturnType<typeof getMonthDates> = getMonthDates(
        2,
        2024,
        0,
        createDate(2024, 2, 5),
        createDate(2024, 2, 20),
        [createDate(2024, 2, 10)],
        [0]
      );

      const beforeRange: (typeof grid)[number] = findMetaByDay(grid, 2024, 2, 1);
      const insideRange: (typeof grid)[number] = findMetaByDay(grid, 2024, 2, 12);
      const explicitDisabled: (typeof grid)[number] = findMetaByDay(grid, 2024, 2, 10);
      const sundayDisabled: (typeof grid)[number] = findMetaByDay(grid, 2024, 2, 17);
      const afterRange: (typeof grid)[number] = findMetaByDay(grid, 2024, 2, 25);

      expect(beforeRange.disabled).toBe(true);
      expect(beforeRange.selectable).toBe(false);
      expect(insideRange.disabled).toBe(false);
      expect(insideRange.selectable).toBe(true);
      expect(explicitDisabled.disabled).toBe(true);
      expect(explicitDisabled.selectable).toBe(false);
      expect(sundayDisabled.disabled).toBe(true);
      expect(sundayDisabled.selectable).toBe(false);
      expect(afterRange.disabled).toBe(true);
      expect(afterRange.selectable).toBe(false);
    });
  });

  describe('getYearRange', (): void => {
    it('parses standard ascending range', (): void => {
      expect(getYearRange(2024, '2020:2023')).toEqual([2020, 2021, 2022, 2023]);
    });

    it('parses reversed range into ascending output', (): void => {
      expect(getYearRange(2024, '2023:2020')).toEqual([2020, 2021, 2022, 2023]);
    });

    it('parses single-year range', (): void => {
      expect(getYearRange(2024, '2026')).toEqual([2026]);
    });
  });

  describe('getDecadeBounds', (): void => {
    it('returns bounds for mid-decade years', (): void => {
      expect(getDecadeBounds(2026)).toEqual([2020, 2029]);
    });

    it('returns bounds for decade start and end years', (): void => {
      expect(getDecadeBounds(2030)).toEqual([2030, 2039]);
      expect(getDecadeBounds(2039)).toEqual([2030, 2039]);
    });
  });
});
