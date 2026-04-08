import { NumberFormatService, type NumberFormatConfig } from './number-format.service';

describe('NumberFormatService', (): void => {
  const createService: (config: NumberFormatConfig) => NumberFormatService = (
    config: NumberFormatConfig
  ): NumberFormatService => {
    const service: NumberFormatService = new NumberFormatService();
    service.configure(config);
    return service;
  };

  describe('decimal mode formatting', (): void => {
    it.each([
      [0, '0'],
      [1, '1'],
      [12, '12'],
      [1234, '1,234'],
      [1234.5, '1,234.5'],
      [1234.567, '1,234.567'],
    ])('formats %p to %p in en-US', (value: number, expected: string): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.formatValue(value)).toBe(expected);
    });

    it('applies minFractionDigits and maxFractionDigits', (): void => {
      const service: NumberFormatService = createService({
        mode: 'decimal',
        locale: 'en-US',
        minFractionDigits: 2,
        maxFractionDigits: 2,
      });

      expect(service.formatValue(10)).toBe('10.00');
      expect(service.formatValue(10.1)).toBe('10.10');
      expect(service.formatValue(10.126)).toBe('10.13');
    });

    it('disables grouping when useGrouping is false', (): void => {
      const service: NumberFormatService = createService({
        mode: 'decimal',
        locale: 'en-US',
        useGrouping: false,
      });

      expect(service.formatValue(1234567.89)).toBe('1234567.89');
      expect(service.parseValue('1234567.89')).toBe(1234567.89);
    });
  });

  describe('currency mode formatting', (): void => {
    it.each([
      ['USD', 'en-US', 1234.56, /\$/],
      ['EUR', 'de-DE', 1234.56, /€/],
      ['JPY', 'ja-JP', 1234, /[￥¥]/],
      ['INR', 'en-IN', 1234567.89, /₹/],
    ] as const)(
      'formats currency %s in locale %s',
      (currency: string, locale: string, value: number, symbolPattern: RegExp): void => {
        const service: NumberFormatService = createService({
          mode: 'currency',
          locale,
          currency,
        });

        const formattedValue: string = service.formatValue(value);
        expect(formattedValue).toMatch(symbolPattern);
        expect(service.parseValue(formattedValue)).toBeCloseTo(value, 2);
      }
    );

    it('supports currencyDisplay code', (): void => {
      const service: NumberFormatService = createService({
        mode: 'currency',
        locale: 'en-US',
        currency: 'USD',
        currencyDisplay: 'code',
      });

      expect(service.formatValue(12)).toContain('USD');
    });

    it('supports currencyDisplay name', (): void => {
      const service: NumberFormatService = createService({
        mode: 'currency',
        locale: 'en-US',
        currency: 'USD',
        currencyDisplay: 'name',
      });

      expect(service.formatValue(12)).toContain('US dollars');
    });

    it('supports currencyDisplay narrowSymbol', (): void => {
      const service: NumberFormatService = createService({
        mode: 'currency',
        locale: 'en-US',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      });

      expect(service.formatValue(12)).toContain('$');
    });

    it('throws when currency mode is configured without currency code', (): void => {
      const service: NumberFormatService = new NumberFormatService();
      expect((): void => {
        service.configure({ mode: 'currency', locale: 'en-US' });
      }).toThrow('currency is required');
    });
  });

  describe('locale separators and parsing', (): void => {
    it.each([
      ['en-US', '.', ',', '1,234.56', 1234.56],
      ['de-DE', ',', '.', '1.234,56', 1234.56],
      ['en-IN', '.', ',', '12,34,567.89', 1234567.89],
    ] as const)(
      'extracts separators for %s and parses %s',
      (
        locale: string,
        expectedDecimalSeparator: string,
        expectedGroupSeparator: string,
        sample: string,
        expectedValue: number
      ): void => {
        const service: NumberFormatService = createService({ mode: 'decimal', locale });

        expect(service.getDecimalSeparator()).toBe(expectedDecimalSeparator);
        expect(service.getGroupSeparator()).toBe(expectedGroupSeparator);
        expect(service.parseValue(sample)).toBeCloseTo(expectedValue, 4);
      }
    );

    it('parses fr-FR values with locale-generated space grouping', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'fr-FR' });
      const formattedValue: string = service.formatValue(1234567.89);

      expect(formattedValue).toContain('1');
      expect(service.parseValue(formattedValue)).toBeCloseTo(1234567.89, 4);
    });

    it('parses localized minus sign values', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'de-DE' });
      expect(service.parseValue('-1.234,56')).toBeCloseTo(-1234.56, 4);
    });
  });

  describe('prefix and suffix behavior', (): void => {
    it('adds and strips prefix', (): void => {
      const service: NumberFormatService = createService({
        mode: 'decimal',
        locale: 'en-US',
        prefix: 'Qty: ',
      });

      expect(service.formatValue(125)).toBe('Qty: 125');
      expect(service.parseValue('Qty: 125')).toBe(125);
    });

    it('adds and strips suffix', (): void => {
      const service: NumberFormatService = createService({
        mode: 'decimal',
        locale: 'en-US',
        suffix: ' kg',
      });

      expect(service.formatValue(125)).toBe('125 kg');
      expect(service.parseValue('125 kg')).toBe(125);
    });

    it('supports prefix and suffix together', (): void => {
      const service: NumberFormatService = createService({
        mode: 'decimal',
        locale: 'en-US',
        prefix: '≈ ',
        suffix: ' units',
      });

      expect(service.formatValue(12.5)).toBe('≈ 12.5 units');
      expect(service.parseValue('≈ 12.5 units')).toBe(12.5);
    });

    it('supports custom prefix/suffix in currency mode', (): void => {
      const service: NumberFormatService = createService({
        mode: 'currency',
        locale: 'en-US',
        currency: 'USD',
        prefix: 'NET ',
        suffix: ' due',
      });

      const formattedValue: string = service.formatValue(99.99);
      expect(formattedValue.startsWith('NET ')).toBeTruthy();
      expect(formattedValue.endsWith(' due')).toBeTruthy();
      expect(service.parseValue(formattedValue)).toBeCloseTo(99.99, 2);
    });
  });

  describe('edge cases', (): void => {
    it.each(['', ' ', '   ', '-'])('returns null for empty-like value %p', (text: string): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.parseValue(text)).toBeNull();
    });

    it('returns null for non-numeric text', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.parseValue('abc')).toBeNull();
    });

    it('treats 0 as a valid value', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.parseValue('0')).toBe(0);
      expect(service.formatValue(0)).toBe('0');
    });

    it('returns empty string for null input in formatter', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.formatValue(null)).toBe('');
    });

    it('returns empty string for undefined input in formatter', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.formatValue(undefined as unknown as number)).toBe('');
    });

    it('returns empty string for NaN input in formatter', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      expect(service.formatValue(Number.NaN)).toBe('');
    });

    it('parses negative zero distinctly', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      const parsedValue: number | null = service.parseValue('-0');
      expect(parsedValue).not.toBeNull();
      expect(Object.is(parsedValue, -0)).toBeTruthy();
    });

    it('handles very large numbers', (): void => {
      const service: NumberFormatService = createService({ mode: 'decimal', locale: 'en-US' });
      const value: number = 987654321012.34;
      const formattedValue: string = service.formatValue(value);

      expect(service.parseValue(formattedValue)).toBeCloseTo(value, 2);
    });

    it('rounds at fraction boundaries', (): void => {
      const service: NumberFormatService = createService({
        mode: 'decimal',
        locale: 'en-US',
        maxFractionDigits: 2,
      });

      expect(service.formatValue(1.004)).toBe('1');
      expect(service.formatValue(1.005)).toBe('1.01');
      expect(service.formatValue(1.999)).toBe('2');
    });

    it('reconfigures separators and parsing when locale changes', (): void => {
      const service: NumberFormatService = new NumberFormatService();
      service.configure({ mode: 'decimal', locale: 'en-US' });

      expect(service.getDecimalSeparator()).toBe('.');
      expect(service.parseValue('1,234.56')).toBeCloseTo(1234.56, 4);

      service.configure({ mode: 'decimal', locale: 'de-DE' });

      expect(service.getDecimalSeparator()).toBe(',');
      expect(service.parseValue('1.234,56')).toBeCloseTo(1234.56, 4);
    });

    it('exposes resolved Intl options', (): void => {
      const service: NumberFormatService = createService({
        mode: 'currency',
        locale: 'en-US',
        currency: 'USD',
      });

      const options: Intl.ResolvedNumberFormatOptions = service.resolvedOptions();

      expect(options.style).toBe('currency');
      expect(options.currency).toBe('USD');
      expect(options.locale).toContain('en');
    });
  });

  describe('round-trip stability', (): void => {
    it.each([
      { locale: 'en-US', mode: 'decimal' as const, value: 0 },
      { locale: 'en-US', mode: 'decimal' as const, value: 1 },
      { locale: 'en-US', mode: 'decimal' as const, value: 12.5 },
      { locale: 'en-US', mode: 'decimal' as const, value: -999.25 },
      { locale: 'de-DE', mode: 'decimal' as const, value: 1234.56 },
      { locale: 'de-DE', mode: 'decimal' as const, value: -1234.56 },
      { locale: 'fr-FR', mode: 'decimal' as const, value: 1234567.89 },
      { locale: 'en-IN', mode: 'decimal' as const, value: 1234567.89 },
      { locale: 'en-US', mode: 'currency' as const, currency: 'USD', value: 1234.56 },
      { locale: 'de-DE', mode: 'currency' as const, currency: 'EUR', value: 1234.56 },
      { locale: 'ja-JP', mode: 'currency' as const, currency: 'JPY', value: 1234 },
      { locale: 'en-IN', mode: 'currency' as const, currency: 'INR', value: 1234567.89 },
      { locale: 'en-US', mode: 'decimal' as const, prefix: '~', suffix: ' u', value: 88.01 },
      {
        locale: 'en-US',
        mode: 'currency' as const,
        currency: 'USD',
        prefix: 'NET ',
        suffix: ' due',
        value: 65.5,
      },
      { locale: 'en-US', mode: 'decimal' as const, useGrouping: false, value: 1234567.89 },
      {
        locale: 'en-US',
        mode: 'decimal' as const,
        minFractionDigits: 3,
        maxFractionDigits: 3,
        value: 1.2,
      },
    ])(
      'stabilizes parse(format(value)) for %#',
      (scenario: {
        locale: string;
        mode: 'decimal' | 'currency';
        currency?: string;
        prefix?: string;
        suffix?: string;
        useGrouping?: boolean;
        minFractionDigits?: number;
        maxFractionDigits?: number;
        value: number;
      }): void => {
        const configuration: NumberFormatConfig = {
          mode: scenario.mode,
          locale: scenario.locale,
        };

        if (scenario.currency !== undefined) {
          configuration.currency = scenario.currency;
        }

        if (scenario.prefix !== undefined) {
          configuration.prefix = scenario.prefix;
        }

        if (scenario.suffix !== undefined) {
          configuration.suffix = scenario.suffix;
        }

        if (scenario.useGrouping !== undefined) {
          configuration.useGrouping = scenario.useGrouping;
        }

        if (scenario.minFractionDigits !== undefined) {
          configuration.minFractionDigits = scenario.minFractionDigits;
        }

        if (scenario.maxFractionDigits !== undefined) {
          configuration.maxFractionDigits = scenario.maxFractionDigits;
        }

        const service: NumberFormatService = createService(configuration);

        const formattedValue: string = service.formatValue(scenario.value);
        const parsedValue: number | null = service.parseValue(formattedValue);
        const reFormattedValue: string = service.formatValue(parsedValue);

        expect(parsedValue).not.toBeNull();
        expect(parsedValue as number).toBeCloseTo(scenario.value, 2);
        expect(reFormattedValue).toBe(formattedValue);
      }
    );
  });
});
