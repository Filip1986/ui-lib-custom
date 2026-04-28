/** Default configuration values for the Password component. */
export const PASSWORD_DEFAULTS: Readonly<{
  feedback: true;
  toggleMask: false;
  showClear: false;
  promptLabel: 'Enter a password';
  weakLabel: 'Weak';
  mediumLabel: 'Medium';
  strongLabel: 'Strong';
  mediumRegex: string;
  strongRegex: string;
}> = {
  feedback: true,
  toggleMask: false,
  showClear: false,
  promptLabel: 'Enter a password',
  weakLabel: 'Weak',
  mediumLabel: 'Medium',
  strongLabel: 'Strong',
  mediumRegex:
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
} as const;

/** Supported size tokens for Password. */
export type PasswordSize = 'sm' | 'md' | 'lg';

/** Supported design variants for Password. */
export type PasswordVariant = 'material' | 'bootstrap' | 'minimal';

/** Password strength level. */
export type PasswordStrength = 'weak' | 'medium' | 'strong';
