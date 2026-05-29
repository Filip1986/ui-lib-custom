/** Design variant applied to the progress bar. */
export type ProgressBarVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token controlling bar height. */
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/** Display mode — determinate shows a fill, indeterminate shows an animation. */
export type ProgressBarMode = 'determinate' | 'indeterminate';

/**
 * Template context for the `#labelTemplate` content projection slot.
 *
 * ```html
 * <ui-lib-progress-bar [value]="75">
 *   <ng-template #labelTemplate let-value="value" let-label="displayLabel">
 *     {{ label }} complete
 *   </ng-template>
 * </ui-lib-progress-bar>
 * ```
 */
export interface ProgressBarLabelContext {
  /** Clamped progress value (0–100). Also available as `$implicit`. */
  $implicit: number;
  /** Alias for `$implicit`. */
  value: number;
  /** Pre-formatted label string, e.g. `"75%"` or the custom `label` input value. */
  displayLabel: string;
}
