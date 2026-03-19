/** Color format for value binding. */
export type ColorFormat = 'hex' | 'rgb' | 'hsb';

/** Color picker display mode. */
export type ColorPickerMode = 'popup' | 'inline';

/** Design variant. */
export type ColorPickerVariant = 'material' | 'bootstrap' | 'minimal';

/** RGB color object. */
export interface RgbColor {
  /** Red channel in range 0-255. */
  r: number;
  /** Green channel in range 0-255. */
  g: number;
  /** Blue channel in range 0-255. */
  b: number;
}

/** HSB color object. */
export interface HsbColor {
  /** Hue channel in range 0-359. */
  h: number;
  /** Saturation channel in range 0-100. */
  s: number;
  /** Brightness channel in range 0-100. */
  b: number;
}

/** Value type depends on format. */
export type ColorPickerValue = string | RgbColor | HsbColor | null;

/** Popup mount target for future appendTo support. */
export type ColorPickerAppendTo = string | HTMLElement;

/** Change event payload. */
export interface ColorPickerChangeEvent {
  originalEvent: Event;
  value: ColorPickerValue;
}
