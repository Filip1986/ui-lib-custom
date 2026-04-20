import { COLOR_PICKER_LIMITS } from './color-picker.constants';
import type { ColorFormat, ColorPickerValue, HsbColor, RgbColor } from './color-picker.types';

/** Clamps a numeric value to the provided inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Returns true when the value is a valid RGB color object. */
function isRgbColor(value: unknown): value is RgbColor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const recordValue: Record<string, unknown> = value as Record<string, unknown>;
  return (
    Number.isFinite(recordValue['r']) &&
    Number.isFinite(recordValue['g']) &&
    Number.isFinite(recordValue['b'])
  );
}

/** Returns true when the value is a valid HSB color object. */
function isHsbColor(value: unknown): value is HsbColor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const recordValue: Record<string, unknown> = value as Record<string, unknown>;
  return (
    Number.isFinite(recordValue['h']) &&
    Number.isFinite(recordValue['s']) &&
    Number.isFinite(recordValue['b'])
  );
}

/** Normalizes a hex value to lowercase 6-char form without '#'. */
export function normalizeHex(value: string): string | null {
  const normalizedValue: string = value.trim().toLowerCase();
  if (!normalizedValue) {
    return null;
  }

  const strippedValue: string = normalizedValue.startsWith('#')
    ? normalizedValue.slice(1)
    : normalizedValue;

  if (strippedValue.length === 3 && /^[0-9a-f]{3}$/.test(strippedValue)) {
    return strippedValue
      .split('')
      .map((char: string): string => `${char}${char}`)
      .join('');
  }

  if (strippedValue.length === 6 && /^[0-9a-f]{6}$/.test(strippedValue)) {
    return strippedValue;
  }

  return null;
}

/** Converts an RGB object to canonical HSB range values. */
export function rgbToHsb(color: RgbColor): HsbColor {
  const red: number = clamp(
    Math.round(color.r),
    COLOR_PICKER_LIMITS.RedMin,
    COLOR_PICKER_LIMITS.RedMax
  );
  const green: number = clamp(
    Math.round(color.g),
    COLOR_PICKER_LIMITS.GreenMin,
    COLOR_PICKER_LIMITS.GreenMax
  );
  const blue: number = clamp(
    Math.round(color.b),
    COLOR_PICKER_LIMITS.BlueMin,
    COLOR_PICKER_LIMITS.BlueMax
  );

  const redNormalized: number = red / 255;
  const greenNormalized: number = green / 255;
  const blueNormalized: number = blue / 255;

  const max: number = Math.max(redNormalized, greenNormalized, blueNormalized);
  const min: number = Math.min(redNormalized, greenNormalized, blueNormalized);
  const delta: number = max - min;

  let hue: number = 0;
  if (delta !== 0) {
    if (max === redNormalized) {
      hue = ((greenNormalized - blueNormalized) / delta) % 6;
    } else if (max === greenNormalized) {
      hue = (blueNormalized - redNormalized) / delta + 2;
    } else {
      hue = (redNormalized - greenNormalized) / delta + 4;
    }

    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }

  const saturation: number = max === 0 ? 0 : (delta / max) * 100;
  const brightness: number = max * 100;

  return {
    h: clamp(Math.round(hue), COLOR_PICKER_LIMITS.HueMin, COLOR_PICKER_LIMITS.HueMax),
    s: clamp(
      Math.round(saturation),
      COLOR_PICKER_LIMITS.SaturationMin,
      COLOR_PICKER_LIMITS.SaturationMax
    ),
    b: clamp(
      Math.round(brightness),
      COLOR_PICKER_LIMITS.BrightnessMin,
      COLOR_PICKER_LIMITS.BrightnessMax
    ),
  };
}

/** Converts HSB values to RGB values. */
export function hsbToRgb(color: HsbColor): RgbColor {
  const hue: number = clamp(
    Math.round(color.h),
    COLOR_PICKER_LIMITS.HueMin,
    COLOR_PICKER_LIMITS.HueMax
  );
  const saturationNormalized: number =
    clamp(
      Math.round(color.s),
      COLOR_PICKER_LIMITS.SaturationMin,
      COLOR_PICKER_LIMITS.SaturationMax
    ) / 100;
  const brightnessNormalized: number =
    clamp(
      Math.round(color.b),
      COLOR_PICKER_LIMITS.BrightnessMin,
      COLOR_PICKER_LIMITS.BrightnessMax
    ) / 100;

  const chroma: number = brightnessNormalized * saturationNormalized;
  const huePrime: number = hue / 60;
  const x: number = chroma * (1 - Math.abs((huePrime % 2) - 1));

  let redPrime: number = 0;
  let greenPrime: number = 0;
  let bluePrime: number = 0;

  if (huePrime >= 0 && huePrime < 1) {
    redPrime = chroma;
    greenPrime = x;
  } else if (huePrime >= 1 && huePrime < 2) {
    redPrime = x;
    greenPrime = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    greenPrime = chroma;
    bluePrime = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    greenPrime = x;
    bluePrime = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    redPrime = x;
    bluePrime = chroma;
  } else {
    redPrime = chroma;
    bluePrime = x;
  }

  const match: number = brightnessNormalized - chroma;

  return {
    r: clamp(
      Math.round((redPrime + match) * 255),
      COLOR_PICKER_LIMITS.RedMin,
      COLOR_PICKER_LIMITS.RedMax
    ),
    g: clamp(
      Math.round((greenPrime + match) * 255),
      COLOR_PICKER_LIMITS.GreenMin,
      COLOR_PICKER_LIMITS.GreenMax
    ),
    b: clamp(
      Math.round((bluePrime + match) * 255),
      COLOR_PICKER_LIMITS.BlueMin,
      COLOR_PICKER_LIMITS.BlueMax
    ),
  };
}

/** Converts RGB values to a 6-char lowercase hex string without '#'. */
export function rgbToHex(color: RgbColor): string {
  const red: number = clamp(
    Math.round(color.r),
    COLOR_PICKER_LIMITS.RedMin,
    COLOR_PICKER_LIMITS.RedMax
  );
  const green: number = clamp(
    Math.round(color.g),
    COLOR_PICKER_LIMITS.GreenMin,
    COLOR_PICKER_LIMITS.GreenMax
  );
  const blue: number = clamp(
    Math.round(color.b),
    COLOR_PICKER_LIMITS.BlueMin,
    COLOR_PICKER_LIMITS.BlueMax
  );

  const toHexPair: (channel: number) => string = (channel: number): string =>
    channel.toString(16).padStart(2, '0');

  return `${toHexPair(red)}${toHexPair(green)}${toHexPair(blue)}`;
}

/** Converts a hex string to an RGB object. */
export function hexToRgb(value: string): RgbColor | null {
  const normalizedHex: string | null = normalizeHex(value);
  if (!normalizedHex) {
    return null;
  }

  return {
    r: Number.parseInt(normalizedHex.slice(0, 2), 16),
    g: Number.parseInt(normalizedHex.slice(2, 4), 16),
    b: Number.parseInt(normalizedHex.slice(4, 6), 16),
  };
}

/** Converts a hex string directly to HSB values. */
export function hexToHsb(value: string): HsbColor | null {
  const rgbColor: RgbColor | null = hexToRgb(value);
  if (!rgbColor) {
    return null;
  }

  return rgbToHsb(rgbColor);
}

/** Converts HSB values directly to a 6-char lowercase hex string. */
export function hsbToHex(value: HsbColor): string {
  return rgbToHex(hsbToRgb(value));
}

/** Converts any supported color value into canonical HSB. */
export function toHsbColor(value: ColorPickerValue): HsbColor | null {
  if (value === null) {
    return null;
  }

  if (typeof value === 'string') {
    return hexToHsb(value);
  }

  if (isRgbColor(value)) {
    return rgbToHsb(value);
  }

  if (isHsbColor(value)) {
    return {
      h: clamp(Math.round(value.h), COLOR_PICKER_LIMITS.HueMin, COLOR_PICKER_LIMITS.HueMax),
      s: clamp(
        Math.round(value.s),
        COLOR_PICKER_LIMITS.SaturationMin,
        COLOR_PICKER_LIMITS.SaturationMax
      ),
      b: clamp(
        Math.round(value.b),
        COLOR_PICKER_LIMITS.BrightnessMin,
        COLOR_PICKER_LIMITS.BrightnessMax
      ),
    };
  }

  return null;
}

/** Converts a color value into the requested output format. */
export function formatColorValue(value: ColorPickerValue, format: ColorFormat): ColorPickerValue {
  const hsbColor: HsbColor | null = toHsbColor(value);
  if (!hsbColor) {
    return null;
  }

  if (format === 'hsb') {
    return hsbColor;
  }

  if (format === 'rgb') {
    return hsbToRgb(hsbColor);
  }

  return hsbToHex(hsbColor);
}
