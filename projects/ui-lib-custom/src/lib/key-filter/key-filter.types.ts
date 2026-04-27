/** Built-in filter preset identifiers for KeyFilter. */
export type KeyFilterPreset =
  | 'pint'
  | 'int'
  | 'pnum'
  | 'num'
  | 'hex'
  | 'alpha'
  | 'alphanum'
  | 'money'
  | 'email';

/**
 * Regular-expression patterns for each built-in preset.
 * Each pattern is tested against a single character.
 */
export const KEY_FILTER_PRESET_PATTERNS: Readonly<Record<KeyFilterPreset, RegExp>> = {
  /** Positive integers: digits only. */
  pint: /[\d]/,
  /** Integers: digits and minus sign. */
  int: /[\d\-]/,
  /** Positive numbers: digits and decimal point. */
  pnum: /[\d.]/,
  /** Numbers: digits, minus sign, and decimal point. */
  num: /[\d\-.]/,
  /** Hexadecimal: 0-9 and a-f (case-insensitive). */
  hex: /[0-9a-fA-F]/,
  /** Alphabetic characters only. */
  alpha: /[a-zA-Z]/,
  /** Alphanumeric characters. */
  alphanum: /[a-zA-Z0-9]/,
  /**
   * Money values: digits, minus sign, decimal point, and thousands comma.
   */
  money: /[\d\-.,]/,
  /**
   * Common email characters (per RFC 5321 local-part + domain rules).
   */
  email: /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.@\-]/,
} as const;

/** Default configuration for the KeyFilter directive. */
export const KEY_FILTER_DEFAULTS: Readonly<{
  bypass: false;
}> = {
  bypass: false,
} as const;
