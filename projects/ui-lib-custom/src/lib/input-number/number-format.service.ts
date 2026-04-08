import {
  INPUT_NUMBER_DEFAULTS,
  type InputNumberCurrencyDisplay,
  type InputNumberLocaleMatcher,
  type InputNumberMode,
} from './input-number.types';

/** Configuration used to build formatter and parser behavior. */
export interface NumberFormatConfig {
  mode: InputNumberMode;
  locale?: string;
  currency?: string;
  currencyDisplay?: InputNumberCurrencyDisplay;
  localeMatcher?: InputNumberLocaleMatcher;
  useGrouping?: boolean;
  minFractionDigits?: number | null;
  maxFractionDigits?: number | null;
  prefix?: string;
  suffix?: string;
}

/**
 * Pure number format/parse utility for InputNumber.
 *
 * This class intentionally has zero Angular dependencies.
 */
export class NumberFormatService {
  private formatter: Intl.NumberFormat;

  private config: NumberFormatConfig;

  private groupSeparator: string;

  private decimalSeparator: string;

  private numeralExpression: RegExp;

  private groupExpression: RegExp;

  private decimalExpression: RegExp;

  private minusExpression: RegExp;

  private currencyExpression: RegExp;

  private prefixExpression: RegExp;

  private suffixExpression: RegExp;

  private readonly spaceExpression: RegExp;

  private readonly nonNumericExpression: RegExp;

  private digitIndex: Map<string, string>;

  constructor() {
    this.config = { mode: INPUT_NUMBER_DEFAULTS.mode };
    this.formatter = new Intl.NumberFormat(undefined, { style: INPUT_NUMBER_DEFAULTS.mode });
    this.groupSeparator = ',';
    this.decimalSeparator = '.';
    this.numeralExpression = /[0-9]/g;
    this.groupExpression = /,/g;
    this.decimalExpression = /\./g;
    this.minusExpression = /-/g;
    this.currencyExpression = /(?!)/g;
    this.prefixExpression = /(?!)/g;
    this.suffixExpression = /(?!)/g;
    this.spaceExpression = /[\s\u00A0\u202F]/g;
    this.nonNumericExpression = /[^0-9.-]/g;
    this.digitIndex = new Map<string, string>();

    this.configure({ mode: INPUT_NUMBER_DEFAULTS.mode });
  }

  /** Rebuilds Intl.NumberFormat and parser regexes for the provided options. */
  public configure(options: NumberFormatConfig): void {
    const normalizedConfig: NumberFormatConfig = { mode: options.mode };

    if (options.locale !== undefined) {
      normalizedConfig.locale = options.locale;
    }

    if (options.currency !== undefined) {
      normalizedConfig.currency = options.currency;
    }

    normalizedConfig.currencyDisplay =
      options.currencyDisplay ?? INPUT_NUMBER_DEFAULTS.currencyDisplay;
    normalizedConfig.localeMatcher = options.localeMatcher ?? INPUT_NUMBER_DEFAULTS.localeMatcher;
    normalizedConfig.useGrouping = options.useGrouping ?? INPUT_NUMBER_DEFAULTS.useGrouping;
    normalizedConfig.minFractionDigits =
      options.minFractionDigits ?? INPUT_NUMBER_DEFAULTS.minFractionDigits;
    normalizedConfig.maxFractionDigits =
      options.maxFractionDigits ?? INPUT_NUMBER_DEFAULTS.maxFractionDigits;

    if (options.prefix !== undefined) {
      normalizedConfig.prefix = options.prefix;
    }

    if (options.suffix !== undefined) {
      normalizedConfig.suffix = options.suffix;
    }

    this.config = normalizedConfig;

    const intlOptions: Intl.NumberFormatOptions = {
      style: this.config.mode,
      localeMatcher: this.config.localeMatcher,
      useGrouping: this.config.useGrouping,
      minimumFractionDigits: this.config.minFractionDigits ?? undefined,
      maximumFractionDigits: this.config.maxFractionDigits ?? undefined,
    };

    if (this.config.mode === 'currency') {
      if (!this.config.currency) {
        throw new Error('NumberFormatService: currency is required when mode is "currency".');
      }

      intlOptions.currency = this.config.currency;
      intlOptions.currencyDisplay = this.config.currencyDisplay;
    }

    this.formatter = new Intl.NumberFormat(this.config.locale, intlOptions);

    const numberParts: Intl.NumberFormatPart[] = this.formatter.formatToParts(1234567.89);
    this.groupSeparator = this.firstPartValue(numberParts, 'group') ?? ',';
    this.decimalSeparator = this.firstPartValue(numberParts, 'decimal') ?? '.';

    const minusParts: Intl.NumberFormatPart[] = this.formatter.formatToParts(-1);
    const minusSigns: string[] = minusParts
      .filter((part: Intl.NumberFormatPart): boolean => part.type === 'minusSign')
      .map((part: Intl.NumberFormatPart): string => part.value)
      .filter((token: string): boolean => token.length > 0);

    const currencyParts: Intl.NumberFormatPart[] = this.formatter.formatToParts(1);
    const currencyTokens: string[] = currencyParts
      .filter((part: Intl.NumberFormatPart): boolean => part.type === 'currency')
      .map((part: Intl.NumberFormatPart): string => part.value)
      .filter((token: string): boolean => token.length > 0);

    const numerals: string[] = [
      ...new Intl.NumberFormat(this.config.locale, { useGrouping: false }).format(9876543210),
    ].reverse();

    this.digitIndex = new Map<string, string>(
      numerals.map((digit: string, index: number): [string, string] => [digit, String(index)])
    );

    this.numeralExpression = this.createCharacterClassExpression(numerals);
    this.groupExpression = this.createGlobalExpression([this.groupSeparator]);
    this.decimalExpression = this.createGlobalExpression([this.decimalSeparator]);
    this.minusExpression = this.createGlobalExpression([...minusSigns, '-']);
    this.currencyExpression = this.createGlobalExpression(currencyTokens);
    this.prefixExpression = this.createBoundaryExpression(this.config.prefix, true);
    this.suffixExpression = this.createBoundaryExpression(this.config.suffix, false);
  }

  /** Formats numeric values to locale-aware display text. */
  public formatValue(value: number | null): string {
    if (value === null || Number.isNaN(value) || !Number.isFinite(value)) {
      return '';
    }

    let formattedValue: string = this.formatter.format(value);

    if (this.config.prefix) {
      formattedValue = `${this.config.prefix}${formattedValue}`;
    }

    if (this.config.suffix) {
      formattedValue = `${formattedValue}${this.config.suffix}`;
    }

    return formattedValue;
  }

  /** Parses display text into a JavaScript number. */
  public parseValue(text: string): number | null {
    let normalizedText: string = text.trim();

    if (normalizedText.length === 0 || normalizedText === '-') {
      return null;
    }

    normalizedText = normalizedText
      .replace(this.prefixExpression, '')
      .replace(this.suffixExpression, '')
      .replace(this.spaceExpression, '')
      .replace(this.currencyExpression, '')
      .replace(this.groupExpression, '')
      .replace(this.minusExpression, '-')
      .replace(this.decimalExpression, '.')
      .replace(
        this.numeralExpression,
        (digit: string): string => this.digitIndex.get(digit) ?? digit
      )
      .replace(this.nonNumericExpression, '');

    const sanitizedText: string = this.normalizeNumericText(normalizedText);
    if (sanitizedText.length === 0 || sanitizedText === '-') {
      return null;
    }

    const parsedValue: number = Number.parseFloat(sanitizedText);
    return Number.isNaN(parsedValue) ? null : parsedValue;
  }

  /** Returns the locale-aware decimal separator. */
  public getDecimalSeparator(): string {
    return this.decimalSeparator;
  }

  /** Returns the locale-aware grouping separator. */
  public getGroupSeparator(): string {
    return this.groupSeparator;
  }

  /** Exposes resolved Intl options for debugging and tests. */
  public resolvedOptions(): Intl.ResolvedNumberFormatOptions {
    return this.formatter.resolvedOptions();
  }

  private createCharacterClassExpression(tokens: string[]): RegExp {
    if (tokens.length === 0) {
      return /(?!)/g;
    }

    return new RegExp(
      `[${tokens.map((token: string): string => this.escapeRegExp(token)).join('')}]`,
      'g'
    );
  }

  private createGlobalExpression(tokens: string[]): RegExp {
    const cleanTokens: string[] = tokens.filter((token: string): boolean => token.length > 0);

    if (cleanTokens.length === 0) {
      return /(?!)/g;
    }

    const expression: string = cleanTokens
      .map((token: string): string => this.escapeRegExp(token))
      .sort((left: string, right: string): number => right.length - left.length)
      .join('|');

    return new RegExp(expression, 'g');
  }

  private createBoundaryExpression(token: string | undefined, isPrefix: boolean): RegExp {
    if (!token || token.length === 0) {
      return /(?!)/g;
    }

    const escapedToken: string = this.escapeRegExp(token);
    return isPrefix ? new RegExp(`^${escapedToken}`) : new RegExp(`${escapedToken}$`);
  }

  private normalizeNumericText(value: string): string {
    if (value.length === 0) {
      return '';
    }

    const hasNegativeSign: boolean = value.includes('-');
    const unsignedValue: string = value.replace(/-/g, '');
    const decimalParts: string[] = unsignedValue.split('.');

    const integerPartRaw: string = decimalParts.shift() ?? '';
    const fractionPart: string = decimalParts.join('');
    const integerPart: string = integerPartRaw.length > 0 ? integerPartRaw : '0';

    const normalizedValue: string =
      fractionPart.length > 0 ? `${integerPart}.${fractionPart}` : integerPart;

    return hasNegativeSign ? `-${normalizedValue}` : normalizedValue;
  }

  private firstPartValue(
    parts: Intl.NumberFormatPart[],
    type: Intl.NumberFormatPartTypes
  ): string | null {
    const matchedPart: Intl.NumberFormatPart | undefined = parts.find(
      (part: Intl.NumberFormatPart): boolean => part.type === type
    );

    return matchedPart?.value ?? null;
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
