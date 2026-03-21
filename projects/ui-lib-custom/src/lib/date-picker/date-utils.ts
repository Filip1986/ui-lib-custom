import { DATE_PICKER_FORMAT_TOKENS } from './date-picker.constants';
import type { DatePickerDateMeta } from './date-picker.types';

function normalizeToStartOfDay(date: Date): Date {
  const nextDate: Date = new Date(date.getTime());
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function normalizeMonth(month: number): number {
  const normalizedMonth: number = Math.trunc(month);
  return ((normalizedMonth % 12) + 12) % 12;
}

function normalizeFirstDayOfWeek(firstDayOfWeek: number): number {
  const normalizedDay: number = Math.trunc(firstDayOfWeek);
  return ((normalizedDay % 7) + 7) % 7;
}

function getDayOfYear(date: Date): number {
  const startOfYear: Date = createDate(date.getFullYear(), 0, 1);
  const normalizedDate: Date = normalizeToStartOfDay(date);
  const differenceInMilliseconds: number = normalizedDate.getTime() - startOfYear.getTime();
  return Math.floor(differenceInMilliseconds / 86400000) + 1;
}

/** Returns the number of days in a month. */
export function getDaysInMonth(month: number, year: number): number {
  const normalizedYear: number = Math.trunc(year);
  const normalizedMonth: number = normalizeMonth(month);
  return new Date(normalizedYear, normalizedMonth + 1, 0).getDate();
}

/** Returns the day-of-week index (0..6) for the first day of a month. */
export function getFirstDayOfMonth(month: number, year: number): number {
  const normalizedYear: number = Math.trunc(year);
  const normalizedMonth: number = normalizeMonth(month);
  return new Date(normalizedYear, normalizedMonth, 1).getDay();
}

/** Compares two dates at day precision. */
export function isDateEqual(date1: Date | null, date2: Date | null): boolean {
  if (date1 === null && date2 === null) {
    return true;
  }

  if (date1 === null || date2 === null) {
    return false;
  }

  if (!isValidDate(date1) || !isValidDate(date2)) {
    return false;
  }

  return normalizeToStartOfDay(date1).getTime() === normalizeToStartOfDay(date2).getTime();
}

/** Returns true when date1 is before date2 at day precision. */
export function isDateBefore(date1: Date, date2: Date): boolean {
  return normalizeToStartOfDay(date1).getTime() < normalizeToStartOfDay(date2).getTime();
}

/** Returns true when date1 is after date2 at day precision. */
export function isDateAfter(date1: Date, date2: Date): boolean {
  return normalizeToStartOfDay(date1).getTime() > normalizeToStartOfDay(date2).getTime();
}

/** Returns true when date is inside [start, end] inclusive at day precision. */
export function isDateBetween(date: Date, start: Date, end: Date): boolean {
  const normalizedDate: Date = normalizeToStartOfDay(date);
  const normalizedStart: Date = normalizeToStartOfDay(start);
  const normalizedEnd: Date = normalizeToStartOfDay(end);

  if (normalizedStart.getTime() <= normalizedEnd.getTime()) {
    return (
      normalizedDate.getTime() >= normalizedStart.getTime() &&
      normalizedDate.getTime() <= normalizedEnd.getTime()
    );
  }

  return (
    normalizedDate.getTime() >= normalizedEnd.getTime() &&
    normalizedDate.getTime() <= normalizedStart.getTime()
  );
}

/** Returns true when date is disabled by min/max, disabled dates, or disabled weekdays. */
export function isDateDisabled(
  date: Date,
  minDate: Date | null,
  maxDate: Date | null,
  disabledDates: Date[] | null,
  disabledDays: number[] | null
): boolean {
  if (minDate !== null && isDateBefore(date, minDate)) {
    return true;
  }

  if (maxDate !== null && isDateAfter(date, maxDate)) {
    return true;
  }

  if (disabledDates !== null) {
    const hasDateMatch: boolean = disabledDates.some((disabledDate: Date): boolean =>
      isDateEqual(disabledDate, date)
    );
    if (hasDateMatch) {
      return true;
    }
  }

  if (disabledDays !== null) {
    const normalizedDisabledDays: number[] = disabledDays.map((disabledDay: number): number =>
      normalizeFirstDayOfWeek(disabledDay)
    );
    if (normalizedDisabledDays.includes(date.getDay())) {
      return true;
    }
  }

  return false;
}

/** Returns true when date matches the current local date at day precision. */
export function isToday(date: Date): boolean {
  const today: Date = new Date();
  return isDateEqual(today, date);
}

/** Creates a local Date instance at start of day for provided y/m/d. */
export function createDate(year: number, month: number, day: number): Date {
  const createdDate: Date = new Date(Math.trunc(year), Math.trunc(month), Math.trunc(day));
  createdDate.setHours(0, 0, 0, 0);
  return createdDate;
}

/** Returns a cloned Date instance preserving timestamp. */
export function cloneDate(date: Date): Date {
  return new Date(date.getTime());
}

/** Returns a new Date shifted by a number of months. */
export function addMonths(date: Date, months: number): Date {
  const normalizedDate: Date = cloneDate(date);
  normalizedDate.setMonth(normalizedDate.getMonth() + Math.trunc(months));
  return normalizedDate;
}

/** Returns a new Date shifted by a number of years. */
export function addYears(date: Date, years: number): Date {
  const normalizedDate: Date = cloneDate(date);
  normalizedDate.setFullYear(normalizedDate.getFullYear() + Math.trunc(years));
  return normalizedDate;
}

/**
 * Returns a fixed 6-week calendar grid for a month, including spillover days.
 * Metadata values for `selected` and `disabled` are placeholders and should be
 * enriched by component state/constraints when rendering.
 */
export function getMonthDates(
  month: number,
  year: number,
  firstDayOfWeek: number,
  minDate: Date | null = null,
  maxDate: Date | null = null,
  disabledDates: Date[] | null = null,
  disabledDays: number[] | null = null
): DatePickerDateMeta[] {
  const normalizedMonth: number = normalizeMonth(month);
  const normalizedYear: number = Math.trunc(year);
  const normalizedFirstDayOfWeek: number = normalizeFirstDayOfWeek(firstDayOfWeek);

  const firstOfMonth: Date = createDate(normalizedYear, normalizedMonth, 1);
  const firstWeekday: number = firstOfMonth.getDay();
  const offsetToGridStart: number = (firstWeekday - normalizedFirstDayOfWeek + 7) % 7;

  const gridStartDate: Date = createDate(normalizedYear, normalizedMonth, 1 - offsetToGridStart);
  const gridDates: DatePickerDateMeta[] = [];

  for (let dayIndex: number = 0; dayIndex < 42; dayIndex += 1) {
    const currentDate: Date = createDate(
      gridStartDate.getFullYear(),
      gridStartDate.getMonth(),
      gridStartDate.getDate() + dayIndex
    );
    const disabled: boolean = isDateDisabled(
      currentDate,
      minDate,
      maxDate,
      disabledDates,
      disabledDays
    );

    gridDates.push({
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      today: isToday(currentDate),
      selectable: !disabled,
      selected: false,
      disabled,
      otherMonth: currentDate.getMonth() !== normalizedMonth,
    });
  }

  return gridDates;
}

/** Parses a `start:end` year range string and returns inclusive values. */
export function getYearRange(currentYear: number, yearRange: string): number[] {
  const fallbackYear: number = Math.trunc(currentYear);
  const trimmedRange: string = yearRange.trim();
  if (!trimmedRange) {
    return [fallbackYear];
  }

  const tokens: string[] = trimmedRange
    .split(DATE_PICKER_FORMAT_TOKENS.YearRangeSeparator)
    .map((token: string): string => token.trim())
    .filter((token: string): boolean => token.length > 0);

  if (tokens.length === 1) {
    const parsedYear: number = Number.parseInt(tokens[0] ?? '', 10);
    return Number.isFinite(parsedYear) ? [parsedYear] : [fallbackYear];
  }

  if (tokens.length !== 2) {
    return [fallbackYear];
  }

  const startToken: string | undefined = tokens[0];
  const endToken: string | undefined = tokens[1];

  if (startToken === undefined || endToken === undefined) {
    return [fallbackYear];
  }

  const startYear: number = Number.parseInt(startToken, 10);
  const endYear: number = Number.parseInt(endToken, 10);

  if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
    return [fallbackYear];
  }

  const minimumYear: number = Math.min(startYear, endYear);
  const maximumYear: number = Math.max(startYear, endYear);
  const years: number[] = [];

  for (let yearValue: number = minimumYear; yearValue <= maximumYear; yearValue += 1) {
    years.push(yearValue);
  }

  return years;
}

/** Returns inclusive decade bounds for a given year. */
export function getDecadeBounds(year: number): [number, number] {
  const normalizedYear: number = Math.trunc(year);
  const decadeStart: number = normalizedYear - (normalizedYear % 10);
  const decadeEnd: number = decadeStart + 9;
  return [decadeStart, decadeEnd];
}

/** Returns day-of-year number in local time zone. */
export function getDayOfYearNumber(date: Date): number {
  return getDayOfYear(date);
}
