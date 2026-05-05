/** Design variant for the ProgressSpinner component. */
export type ProgressSpinnerVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the ProgressSpinner component. */
export type ProgressSpinnerSize = 'sm' | 'md' | 'lg';

/** Default values for ProgressSpinner inputs. */
export const PROGRESS_SPINNER_DEFAULTS: {
  readonly strokeWidth: string;
  readonly fill: string;
  readonly animationDuration: string;
  readonly size: ProgressSpinnerSize;
} = {
  strokeWidth: '2',
  fill: 'none',
  animationDuration: '2s',
  size: 'md',
} as const;
