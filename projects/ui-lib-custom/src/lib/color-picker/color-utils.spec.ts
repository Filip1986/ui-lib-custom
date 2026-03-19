import type { HsbColor, RgbColor } from './index';
import {
  formatColorValue,
  hexToHsb,
  hexToRgb,
  hsbToHex,
  hsbToRgb,
  normalizeHex,
  rgbToHex,
  rgbToHsb,
  toHsbColor,
} from './color-utils';

describe('color-utils', (): void => {
  describe('normalizeHex', (): void => {
    it('normalizes 6-char and 3-char hex values', (): void => {
      expect(normalizeHex('ff0000')).toBe('ff0000');
      expect(normalizeHex('#ff0000')).toBe('ff0000');
      expect(normalizeHex(' #abc ')).toBe('aabbcc');
    });

    it('returns null for invalid input', (): void => {
      expect(normalizeHex('')).toBeNull();
      expect(normalizeHex('xyz')).toBeNull();
      expect(normalizeHex('#12')).toBeNull();
      expect(normalizeHex('#12345z')).toBeNull();
    });
  });

  describe('hex <-> rgb conversion', (): void => {
    it('converts hex to rgb with and without # prefix', (): void => {
      expect(hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('converts rgb to hex', (): void => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('ff0000');
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('00ff00');
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('0000ff');
    });

    it('clamps out-of-range rgb values', (): void => {
      expect(rgbToHex({ r: -10, g: 300, b: 127.6 })).toBe('00ff80');
    });
  });

  describe('rgb <-> hsb conversion', (): void => {
    it('converts rgb to hsb', (): void => {
      const hsb: HsbColor = rgbToHsb({ r: 255, g: 0, b: 0 });
      expect(hsb).toEqual({ h: 0, s: 100, b: 100 });
    });

    it('converts hsb to rgb', (): void => {
      const rgb: RgbColor = hsbToRgb({ h: 240, s: 100, b: 100 });
      expect(rgb).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('clamps out-of-range hsb values', (): void => {
      const rgb: RgbColor = hsbToRgb({ h: 999, s: -20, b: 150 });
      expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
    });
  });

  describe('hex <-> hsb conversion', (): void => {
    it('converts hsb to hex', (): void => {
      expect(hsbToHex({ h: 0, s: 100, b: 100 })).toBe('ff0000');
      expect(hsbToHex({ h: 120, s: 100, b: 100 })).toBe('00ff00');
      expect(hsbToHex({ h: 240, s: 100, b: 100 })).toBe('0000ff');
    });

    it('converts hex to hsb', (): void => {
      expect(hexToHsb('ff0000')).toEqual({ h: 0, s: 100, b: 100 });
      expect(hexToHsb('000000')).toEqual({ h: 0, s: 0, b: 0 });
      expect(hexToHsb('ffffff')).toEqual({ h: 0, s: 0, b: 100 });
    });

    it('returns null for malformed hex in hexToHsb', (): void => {
      expect(hexToHsb('badhex')).toBeNull();
      expect(hexToHsb('')).toBeNull();
    });
  });

  describe('round-trip behavior', (): void => {
    it('keeps channel-level fidelity for hex -> hsb -> hex', (): void => {
      const source: string = '4a90e2';
      const hsb: HsbColor | null = hexToHsb(source);
      expect(hsb).toBeTruthy();
      const roundTrip: string = hsbToHex(hsb as HsbColor);
      const sourceRgb: RgbColor | null = hexToRgb(source);
      const roundTripRgb: RgbColor | null = hexToRgb(roundTrip);
      expect(sourceRgb).toBeTruthy();
      expect(roundTripRgb).toBeTruthy();
      expect(
        Math.abs((sourceRgb as RgbColor).r - (roundTripRgb as RgbColor).r)
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs((sourceRgb as RgbColor).g - (roundTripRgb as RgbColor).g)
      ).toBeLessThanOrEqual(2);
      expect(
        Math.abs((sourceRgb as RgbColor).b - (roundTripRgb as RgbColor).b)
      ).toBeLessThanOrEqual(2);
    });

    it('handles pure black, white, and red edge colors', (): void => {
      expect(hsbToHex(hexToHsb('000000') as HsbColor)).toBe('000000');
      expect(hsbToHex(hexToHsb('ffffff') as HsbColor)).toBe('ffffff');
      expect(hsbToHex(hexToHsb('ff0000') as HsbColor)).toBe('ff0000');
    });
  });

  describe('formatColorValue and toHsbColor', (): void => {
    it('formats to hex, rgb, and hsb', (): void => {
      const source: HsbColor = { h: 0, s: 100, b: 100 };

      expect(formatColorValue(source, 'hex')).toBe('ff0000');
      expect(formatColorValue(source, 'rgb')).toEqual({ r: 255, g: 0, b: 0 });
      expect(formatColorValue(source, 'hsb')).toEqual({ h: 0, s: 100, b: 100 });
    });

    it('returns null for invalid values', (): void => {
      expect(formatColorValue('badhex', 'hex')).toBeNull();
      expect(toHsbColor(null)).toBeNull();
      expect(toHsbColor('badhex')).toBeNull();
    });

    it('normalizes hsb and rgb object inputs', (): void => {
      expect(toHsbColor({ h: 420, s: 150, b: -10 })).toEqual({ h: 359, s: 100, b: 0 });
      expect(toHsbColor({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, b: 100 });
    });
  });
});
