import type { ButtonSeverity } from './button';

export const BUTTON_SEVERITIES: readonly ButtonSeverity[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'help',
  'danger',
  'contrast',
] as const;
