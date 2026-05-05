/** Visual design variant for the Tag component. */
export type TagVariant = 'material' | 'bootstrap' | 'minimal';

/** Size of the Tag component. */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Severity of the Tag component — controls the colour palette.
 * Mirrors PrimeNG's severity options plus a `contrast` option.
 */
export type TagSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'contrast';
