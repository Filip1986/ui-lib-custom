import { DEFAULT_LOCALE, DATE_PICKER_FORMAT_TOKENS } from './date-picker.constants';
import { formatDate, parseDate } from './date-format';
import type { DatePickerLocale } from './date-picker.types';
import { createDate } from './date-utils';

function toDaySignature(date: Date | null): string {
  if (date === null) {
    return 'null';
  }

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

describe('date-format', (): void => {
  const baseDate: Date = createDate(2024, 2, 14);

  describe('formatDate token coverage', (): void => {
    it('formats day tokens d and dd', (): void => {
      expect(formatDate(baseDate, 'd', DEFAULT_LOCALE)).toBe('14');
      expect(formatDate(baseDate, 'dd', DEFAULT_LOCALE)).toBe('14');

      const firstDay: Date = createDate(2024, 2, 1);
      expect(formatDate(firstDay, 'd', DEFAULT_LOCALE)).toBe('1');
      expect(formatDate(firstDay, 'dd', DEFAULT_LOCALE)).toBe('01');
    });

    it('formats day-of-year tokens o and oo', (): void => {
      expect(formatDate(baseDate, 'o', DEFAULT_LOCALE)).toBe('74');
      expect(formatDate(baseDate, 'oo', DEFAULT_LOCALE)).toBe('074');
    });

    it('formats day-name tokens D and DD', (): void => {
      expect(formatDate(baseDate, 'D', DEFAULT_LOCALE)).toBe('Thu');
      expect(formatDate(baseDate, 'DD', DEFAULT_LOCALE)).toBe('Thursday');
    });

    it('formats month tokens m and mm', (): void => {
      expect(formatDate(baseDate, 'm', DEFAULT_LOCALE)).toBe('3');
      expect(formatDate(baseDate, 'mm', DEFAULT_LOCALE)).toBe('03');
    });

    it('formats month-name tokens M and MM', (): void => {
      expect(formatDate(baseDate, 'M', DEFAULT_LOCALE)).toBe('Mar');
      expect(formatDate(baseDate, 'MM', DEFAULT_LOCALE)).toBe('March');
    });

    it('formats year tokens y and yy', (): void => {
      expect(formatDate(baseDate, 'y', DEFAULT_LOCALE)).toBe('24');
      expect(formatDate(baseDate, 'yy', DEFAULT_LOCALE)).toBe('2024');
    });

    it('formats timestamp tokens @ and !', (): void => {
      expect(formatDate(baseDate, '@', DEFAULT_LOCALE)).toBe(`${baseDate.getTime()}`);
      expect(formatDate(baseDate, '!', DEFAULT_LOCALE)).toBe(
        `${baseDate.getTime() * 10000 + DATE_PICKER_FORMAT_TOKENS.DotNetTicksTo1970}`
      );
    });
  });

  describe('formatDate composed formats', (): void => {
    it('formats standard combined layouts', (): void => {
      expect(formatDate(baseDate, 'mm/dd/yy', DEFAULT_LOCALE)).toBe('03/14/2024');
      expect(formatDate(baseDate, 'DD, MM d, yy', DEFAULT_LOCALE)).toBe('Thursday, March 14, 2024');
      expect(formatDate(baseDate, 'yy-mm-dd', DEFAULT_LOCALE)).toBe('2024-03-14');
    });

    it('supports literal text wrapped in single quotes', (): void => {
      expect(formatDate(baseDate, "'Date:' mm/dd/yy", DEFAULT_LOCALE)).toBe('Date: 03/14/2024');
    });

    it('supports escaped single quotes in output', (): void => {
      expect(formatDate(baseDate, "mm/dd/yy ''at'' HH:mm", DEFAULT_LOCALE)).toBe(
        "03/14/2024 'at' HH:03"
      );
    });
  });

  describe('parseDate', (): void => {
    it('round-trips formatted values back to equivalent day values', (): void => {
      const formats: string[] = ['mm/dd/yy', 'DD, MM d, yy', 'yy-mm-dd', 'M d, yy'];

      formats.forEach((formatPattern: string): void => {
        const formatted: string = formatDate(baseDate, formatPattern, DEFAULT_LOCALE);
        const parsed: Date | null = parseDate(formatted, formatPattern, DEFAULT_LOCALE);
        expect(toDaySignature(parsed)).toBe(toDaySignature(baseDate));
      });
    });

    it('parses timestamp-based formats', (): void => {
      const unixFormatted: string = formatDate(baseDate, '@', DEFAULT_LOCALE);
      const ticksFormatted: string = formatDate(baseDate, '!', DEFAULT_LOCALE);

      expect(toDaySignature(parseDate(unixFormatted, '@', DEFAULT_LOCALE))).toBe(
        toDaySignature(baseDate)
      );
      expect(toDaySignature(parseDate(ticksFormatted, '!', DEFAULT_LOCALE))).toBe(
        toDaySignature(baseDate)
      );
    });

    it('returns null for invalid input values', (): void => {
      expect(parseDate('13/40/2024', 'mm/dd/yy', DEFAULT_LOCALE)).toBeNull();
      expect(parseDate('not-a-date', 'mm/dd/yy', DEFAULT_LOCALE)).toBeNull();
      expect(parseDate('2024-02-30', 'yy-mm-dd', DEFAULT_LOCALE)).toBeNull();
      expect(parseDate('', 'mm/dd/yy', DEFAULT_LOCALE)).toBeNull();
    });

    it('handles partial input gracefully by returning null', (): void => {
      expect(parseDate('03/2024', 'mm/dd/yy', DEFAULT_LOCALE)).toBeNull();
      expect(parseDate('March 14', 'MM d, yy', DEFAULT_LOCALE)).toBeNull();
    });

    it('supports locale-aware month and day names', (): void => {
      const customLocale: DatePickerLocale = {
        dayNames: ['SunX', 'MonX', 'TueX', 'WedX', 'ThuX', 'FriX', 'SatX'],
        dayNamesShort: ['SuX', 'MoX', 'TuX', 'WeX', 'ThX', 'FrX', 'SaX'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: [
          'JanX',
          'FebX',
          'MarX',
          'AprX',
          'MayX',
          'JunX',
          'JulX',
          'AugX',
          'SepX',
          'OctX',
          'NovX',
          'DecX',
        ],
        monthNamesShort: ['Jx', 'Fx', 'Mx', 'Ax', 'My', 'Jn', 'Jl', 'Ag', 'Sp', 'Oc', 'Nv', 'Dc'],
        firstDayOfWeek: 1,
        today: 'TodayX',
        clear: 'ClearX',
        am: 'am',
        pm: 'pm',
      };

      const longNamed: string = formatDate(baseDate, 'DD, MM d, yy', customLocale);
      const shortNamed: string = formatDate(baseDate, 'D M d, yy', customLocale);

      expect(longNamed).toBe('ThuX, MarX 14, 2024');
      expect(shortNamed).toBe('ThX Mx 14, 2024');

      expect(toDaySignature(parseDate(longNamed, 'DD, MM d, yy', customLocale))).toBe(
        toDaySignature(baseDate)
      );
      expect(toDaySignature(parseDate(shortNamed, 'D M d, yy', customLocale))).toBe(
        toDaySignature(baseDate)
      );
    });
  });
});
