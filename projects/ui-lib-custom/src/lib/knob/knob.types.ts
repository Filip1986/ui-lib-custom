/** Public size options for the Knob component. */
export type KnobSize = 'sm' | 'md' | 'lg';

/**
 * Template context for the `#valueLabel` slot.
 * Provides the current value, formatted string, and normalized (0–1) position.
 *
 * Usage:
 * ```html
 * <ui-lib-knob [value]="vol">
 *   <ng-template #valueLabel let-v let-f="formattedValue">
 *     <tspan class="unit">{{ f }}</tspan>
 *   </ng-template>
 * </ui-lib-knob>
 * ```
 */
export interface KnobValueContext {
  /** The raw numeric value (clamped within [min, max]). */
  $implicit: number;
  /** The formatted value string (respects the `valueTemplate` input). */
  formattedValue: string;
  /** The normalized value in the 0–1 range. */
  normalized: number;
}

/** Public design variant options for the Knob component. */
export type KnobVariant = 'material' | 'bootstrap' | 'minimal';

/** Payload emitted on every value change. */
export interface KnobChangeEvent {
  /** The updated numeric value. */
  value: number;
}

/** Default values shared by the Knob component API. */
export const KNOB_DEFAULTS: Readonly<{
  min: 0;
  max: 100;
  step: 1;
  size: 'md';
  strokeWidth: 14;
  showValue: true;
  disabled: false;
  readonly: false;
  tabindex: 0;
}> = {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  strokeWidth: 14,
  showValue: true,
  disabled: false,
  readonly: false,
  tabindex: 0,
} as const;

/** SVG geometry constants used by the Knob renderer. */
export const KNOB_SVG: Readonly<{
  center: 50;
  radius: 40;
  startAngleDeg: 225;
  totalArcDeg: 270;
}> = {
  center: 50,
  radius: 40,
  startAngleDeg: 225,
  totalArcDeg: 270,
} as const;
