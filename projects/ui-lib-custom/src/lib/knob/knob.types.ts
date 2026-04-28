/** Public size options for the Knob component. */
export type KnobSize = 'sm' | 'md' | 'lg';

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
