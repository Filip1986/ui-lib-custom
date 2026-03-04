import type { ButtonColor } from './button';

/**
 * Shared button color/severity options.
 */
export const BUTTON_COLORS: readonly ButtonColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'help',
  'danger',
  'contrast',
] as const;
