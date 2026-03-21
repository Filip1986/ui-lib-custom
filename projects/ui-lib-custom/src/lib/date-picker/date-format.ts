import { DATE_PICKER_FORMAT_TOKENS } from './date-picker.constants';
import type { DatePickerLocale } from './date-picker.types';
import { createDate, getDayOfYearNumber, getDaysInMonth } from './date-utils';

function padNumber(value: number, targetLength: number): string {
  return `${value}`.padStart(targetLength, '0');
}

function sortNamesByLength(names: string[]): Array<{ index: number; value: string }> {
  return names
    .map((name: string, index: number): { index: number; value: string } => ({
      index,
      value: name,
    }))
    .sort(
      (
        leftName: { index: number; value: string },
        rightName: { index: number; value: string }
      ): number => rightName.value.length - leftName.value.length
    );
}

/** Formats a date according to PrimeNG-compatible token grammar. */
export function formatDate(date: Date, format: string, locale: DatePickerLocale): string {
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const day: number = date.getDate();
  const dayOfYear: number = getDayOfYearNumber(date);
  const dayOfWeek: number = date.getDay();
  const monthIndex: number = date.getMonth();
  const monthNumber: number = monthIndex + 1;
  const year: number = date.getFullYear();

  let output: string = '';
  let literalMode: boolean = false;

  for (let index: number = 0; index < format.length; index += 1) {
    const character: string = format.charAt(index);
    const hasLookAhead: boolean =
      index + 1 < format.length && format.charAt(index + 1) === character;

    if (literalMode) {
      if (character === DATE_PICKER_FORMAT_TOKENS.LiteralQuote && !hasLookAhead) {
        literalMode = false;
      } else {
        output += character;
        if (character === DATE_PICKER_FORMAT_TOKENS.LiteralQuote && hasLookAhead) {
          index += 1;
        }
      }
      continue;
    }

    switch (character) {
      case DATE_PICKER_FORMAT_TOKENS.DayNumeric:
        if (hasLookAhead) {
          output += padNumber(day, 2);
          index += 1;
        } else {
          output += `${day}`;
        }
        break;
      case DATE_PICKER_FORMAT_TOKENS.DayOfYearNumeric:
        if (hasLookAhead) {
          output += padNumber(dayOfYear, 3);
          index += 1;
        } else {
          output += `${dayOfYear}`;
        }
        break;
      case DATE_PICKER_FORMAT_TOKENS.DayNameShort:
        if (hasLookAhead) {
          output += locale.dayNames[dayOfWeek] ?? '';
          index += 1;
        } else {
          output += locale.dayNamesShort[dayOfWeek] ?? '';
        }
        break;
      case DATE_PICKER_FORMAT_TOKENS.MonthNumeric:
        if (hasLookAhead) {
          output += padNumber(monthNumber, 2);
          index += 1;
        } else {
          output += `${monthNumber}`;
        }
        break;
      case DATE_PICKER_FORMAT_TOKENS.MonthNameShort:
        if (hasLookAhead) {
          output += locale.monthNames[monthIndex] ?? '';
          index += 1;
        } else {
          output += locale.monthNamesShort[monthIndex] ?? '';
        }
        break;
      case DATE_PICKER_FORMAT_TOKENS.YearShort:
        if (hasLookAhead) {
          output += `${year}`;
          index += 1;
        } else {
          output += padNumber(year % 100, 2);
        }
        break;
      case DATE_PICKER_FORMAT_TOKENS.UnixTimestampMs:
        output += `${date.getTime()}`;
        break;
      case DATE_PICKER_FORMAT_TOKENS.DotNetTicks:
        output += `${date.getTime() * 10000 + DATE_PICKER_FORMAT_TOKENS.DotNetTicksTo1970}`;
        break;
      case DATE_PICKER_FORMAT_TOKENS.LiteralQuote:
        if (hasLookAhead) {
          output += DATE_PICKER_FORMAT_TOKENS.LiteralQuote;
          index += 1;
        } else {
          literalMode = true;
        }
        break;
      default:
        output += character;
        break;
    }
  }

  return output;
}

/** Parses a string according to PrimeNG-compatible token grammar. */
export function parseDate(
  dateString: string,
  format: string,
  locale: DatePickerLocale
): Date | null {
  const normalizedInput: string = dateString.trim();
  if (!normalizedInput || !format) {
    return null;
  }

  let inputIndex: number = 0;
  let literalMode: boolean = false;

  let year: number = -1;
  let month: number = -1;
  let day: number = -1;
  let dayOfYear: number = -1;

  const readNumericValue: (minimumLength: number, maximumLength: number) => number | null = (
    minimumLength: number,
    maximumLength: number
  ): number | null => {
    const source: string = normalizedInput.slice(inputIndex);
    const matcher: RegExp = new RegExp(`^\\d{${minimumLength},${maximumLength}}`);
    const match: RegExpMatchArray | null = source.match(matcher);
    if (!match) {
      return null;
    }

    inputIndex += match[0].length;
    return Number.parseInt(match[0], 10);
  };

  const readNamedValue: (shortNames: string[], longNames: string[]) => number | null = (
    shortNames: string[],
    longNames: string[]
  ): number | null => {
    const useLongNames: boolean =
      format.charAt(formatIndex + 1) === format.charAt(formatIndex) &&
      (format.charAt(formatIndex) === DATE_PICKER_FORMAT_TOKENS.DayNameShort ||
        format.charAt(formatIndex) === DATE_PICKER_FORMAT_TOKENS.MonthNameShort);

    const orderedNames: Array<{ index: number; value: string }> = sortNamesByLength(
      useLongNames ? longNames : shortNames
    );

    for (const nameOption of orderedNames) {
      const candidateName: string = nameOption.value;
      const source: string = normalizedInput.slice(inputIndex, inputIndex + candidateName.length);
      if (source.toLowerCase() === candidateName.toLowerCase()) {
        inputIndex += candidateName.length;
        return nameOption.index + 1;
      }
    }

    return null;
  };

  for (var formatIndex: number = 0; formatIndex < format.length; formatIndex += 1) {
    const character: string = format.charAt(formatIndex);
    const hasLookAhead: boolean =
      formatIndex + 1 < format.length && format.charAt(formatIndex + 1) === character;

    if (literalMode) {
      if (character === DATE_PICKER_FORMAT_TOKENS.LiteralQuote && !hasLookAhead) {
        literalMode = false;
        continue;
      }

      if (normalizedInput.charAt(inputIndex) !== character) {
        return null;
      }

      inputIndex += 1;
      if (character === DATE_PICKER_FORMAT_TOKENS.LiteralQuote && hasLookAhead) {
        formatIndex += 1;
      }
      continue;
    }

    switch (character) {
      case DATE_PICKER_FORMAT_TOKENS.DayNumeric: {
        const parsedDay: number | null = readNumericValue(1, hasLookAhead ? 2 : 2);
        if (parsedDay === null) {
          return null;
        }
        day = parsedDay;
        if (hasLookAhead) {
          formatIndex += 1;
        }
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.DayOfYearNumeric: {
        const parsedDayOfYear: number | null = readNumericValue(1, hasLookAhead ? 3 : 3);
        if (parsedDayOfYear === null) {
          return null;
        }
        dayOfYear = parsedDayOfYear;
        if (hasLookAhead) {
          formatIndex += 1;
        }
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.DayNameShort: {
        const parsedDayName: number | null = readNamedValue(locale.dayNamesShort, locale.dayNames);
        if (parsedDayName === null) {
          return null;
        }
        if (hasLookAhead) {
          formatIndex += 1;
        }
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.MonthNumeric: {
        const parsedMonth: number | null = readNumericValue(1, hasLookAhead ? 2 : 2);
        if (parsedMonth === null) {
          return null;
        }
        month = parsedMonth;
        if (hasLookAhead) {
          formatIndex += 1;
        }
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.MonthNameShort: {
        const parsedMonthName: number | null = readNamedValue(
          locale.monthNamesShort,
          locale.monthNames
        );
        if (parsedMonthName === null) {
          return null;
        }
        month = parsedMonthName;
        if (hasLookAhead) {
          formatIndex += 1;
        }
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.YearShort: {
        const parsedYear: number | null = readNumericValue(1, hasLookAhead ? 4 : 2);
        if (parsedYear === null) {
          return null;
        }
        year = parsedYear;
        if (hasLookAhead) {
          formatIndex += 1;
        }
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.UnixTimestampMs: {
        const parsedUnixTime: number | null = readNumericValue(1, 14);
        if (parsedUnixTime === null) {
          return null;
        }

        const unixDate: Date = new Date(parsedUnixTime);
        if (Number.isNaN(unixDate.getTime())) {
          return null;
        }

        year = unixDate.getFullYear();
        month = unixDate.getMonth() + 1;
        day = unixDate.getDate();
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.DotNetTicks: {
        const parsedTicks: number | null = readNumericValue(1, 20);
        if (parsedTicks === null) {
          return null;
        }

        const unixMilliseconds: number =
          (parsedTicks - DATE_PICKER_FORMAT_TOKENS.DotNetTicksTo1970) / 10000;
        const ticksDate: Date = new Date(unixMilliseconds);
        if (Number.isNaN(ticksDate.getTime())) {
          return null;
        }

        year = ticksDate.getFullYear();
        month = ticksDate.getMonth() + 1;
        day = ticksDate.getDate();
        break;
      }
      case DATE_PICKER_FORMAT_TOKENS.LiteralQuote:
        if (hasLookAhead) {
          if (normalizedInput.charAt(inputIndex) !== DATE_PICKER_FORMAT_TOKENS.LiteralQuote) {
            return null;
          }
          inputIndex += 1;
          formatIndex += 1;
        } else {
          literalMode = true;
        }
        break;
      default:
        if (normalizedInput.charAt(inputIndex) !== character) {
          return null;
        }
        inputIndex += 1;
        break;
    }
  }

  const trailingText: string = normalizedInput.slice(inputIndex);
  if (trailingText.trim().length > 0) {
    return null;
  }

  const resolvedYear: number =
    year === -1 ? new Date().getFullYear() : year < 100 ? toFourDigitYear(year) : year;

  if (dayOfYear > -1) {
    const dayOfYearDate: Date = createDate(resolvedYear, 0, dayOfYear);
    month = dayOfYearDate.getMonth() + 1;
    day = dayOfYearDate.getDate();
  }

  const resolvedMonth: number = month === -1 ? 1 : month;
  const resolvedDay: number = day === -1 ? 1 : day;

  const daysInResolvedMonth: number = getDaysInMonth(resolvedMonth - 1, resolvedYear);
  if (
    resolvedMonth < 1 ||
    resolvedMonth > 12 ||
    resolvedDay < 1 ||
    resolvedDay > daysInResolvedMonth
  ) {
    return null;
  }

  return createDate(resolvedYear, resolvedMonth - 1, resolvedDay);
}

function toFourDigitYear(twoDigitYear: number): number {
  const currentYear: number = new Date().getFullYear();
  const currentCentury: number = currentYear - (currentYear % 100);
  const cutoff: number = 50;
  return currentCentury + (twoDigitYear <= cutoff ? twoDigitYear : twoDigitYear - 100);
}
