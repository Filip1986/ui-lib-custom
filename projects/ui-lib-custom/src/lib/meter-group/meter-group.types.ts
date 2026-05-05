/** A single segment in a MeterGroup bar. */
export interface MeterItem {
  /** Display label for the segment. */
  label: string;
  /** Numeric value (measured against `min`/`max`). */
  value: number;
  /** CSS color string for the segment fill (hex, rgb, hsl, named, etc.). */
  color: string;
  /** Optional PrimeIcons class (e.g. `"pi pi-star"`) shown in the legend. */
  icon?: string;
}

/** Internal computed segment — extends MeterItem with a resolved percentage width/height. */
export interface MeterSegment extends MeterItem {
  percentage: number;
}

export type MeterGroupVariant = 'material' | 'bootstrap' | 'minimal';
export type MeterGroupSize = 'sm' | 'md' | 'lg';
export type MeterGroupOrientation = 'horizontal' | 'vertical';
export type MeterGroupLabelPosition = 'start' | 'end';
