/** Supported size tokens for InputOtp. */
export type InputOtpSize = 'sm' | 'md' | 'lg';

/** Supported design variants for InputOtp. */
export type InputOtpVariant = 'material' | 'bootstrap' | 'minimal';

/** Payload emitted when the OTP value changes. */
export interface InputOtpChangeEvent {
  /** Browser event that triggered the change. */
  originalEvent: Event;
  /** Current full OTP string value. */
  value: string;
}

/** Default configuration values for InputOtp. */
export const INPUT_OTP_DEFAULTS: Readonly<{
  length: 4;
  mask: false;
  integerOnly: false;
  filled: false;
  disabled: false;
  readonly: false;
  invalid: false;
  size: 'md';
}> = {
  length: 4,
  mask: false,
  integerOnly: false,
  filled: false,
  disabled: false,
  readonly: false,
  invalid: false,
  size: 'md',
} as const;
