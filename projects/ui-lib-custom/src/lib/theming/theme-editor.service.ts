import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import type { ThemePreset } from './theme-preset.interface';
import { ThemePresetService } from './theme-preset.service';

const COLOR_VAR_MAP: Record<string, string[]> = {
  primary: [
    '--uilib-color-primary-100',
    '--uilib-color-primary-500',
    '--uilib-color-primary-600',
    '--uilib-color-primary-700',
    '--uilib-button-primary-bg',
    '--uilib-button-primary-bg-hover',
    '--uilib-button-primary-bg-active',
    '--uilib-button-primary-border',
    '--uilib-topbar-accent',
    '--uilib-button-focus-color',
    '--uilib-button-focus-ring-color',
    '--uilib-select-button-material-selected-bg',
    '--uilib-select-button-bootstrap-selected-bg',
  ],
  secondary: [
    '--uilib-color-secondary-50',
    '--uilib-color-secondary-100',
    '--uilib-color-secondary-600',
    '--uilib-color-secondary-700',
    '--uilib-button-secondary-bg',
    '--uilib-button-secondary-bg-hover',
    '--uilib-button-secondary-bg-active',
    '--uilib-button-secondary-border',
  ],
  success: [
    '--uilib-color-success-50',
    '--uilib-color-success-600',
    '--uilib-color-success-700',
    '--uilib-button-success-bg',
    '--uilib-button-success-bg-hover',
    '--uilib-button-success-bg-active',
    '--uilib-button-success-border',
  ],
  danger: [
    '--uilib-color-danger-50',
    '--uilib-color-danger-600',
    '--uilib-color-danger-700',
    '--uilib-button-danger-bg',
    '--uilib-button-danger-bg-hover',
    '--uilib-button-danger-bg-active',
    '--uilib-button-danger-border',
    '--uilib-select-button-invalid-border',
  ],
  warning: [
    '--uilib-color-warning-50',
    '--uilib-color-warning-600',
    '--uilib-color-warning-700',
    '--uilib-button-warning-bg',
    '--uilib-button-warning-bg-hover',
    '--uilib-button-warning-bg-active',
    '--uilib-button-warning-border',
  ],
  info: [
    '--uilib-color-info-50',
    '--uilib-color-info-600',
    '--uilib-color-info-700',
    '--uilib-button-info-bg',
    '--uilib-button-info-bg-hover',
    '--uilib-button-info-bg-active',
    '--uilib-button-info-border',
  ],
  background: ['--uilib-page-bg'],
  surface: [
    '--uilib-surface',
    '--uilib-card-bg',
    '--uilib-topbar-bg',
    '--uilib-input-bg',
    '--uilib-select-bg',
    '--uilib-select-dropdown-bg',
  ],
  surfaceAlt: ['--uilib-surface-alt', '--uilib-card-header-bg', '--uilib-card-footer-bg'],
  text: ['--uilib-page-fg', '--uilib-card-text-color', '--uilib-topbar-fg', '--uilib-input-text'],
  textSecondary: [
    '--uilib-muted',
    '--uilib-input-placeholder',
    '--uilib-checkbox-description-color',
    '--uilib-tabs-color-disabled',
  ],
  border: [
    '--uilib-border',
    '--uilib-card-border',
    '--uilib-topbar-border',
    '--uilib-input-border',
    '--uilib-select-border',
    '--uilib-select-button-border',
    '--uilib-select-button-material-border',
    '--uilib-select-button-bootstrap-border',
    '--uilib-checkbox-border',
  ],
};

type ColorVariants = {
  base: string;
  hover: string;
  light: string;
  dark: string;
};

@Injectable({ providedIn: 'root' })
export class ThemeEditorService {
  private readonly doc: Document = inject(DOCUMENT);
  private readonly presetService: ThemePresetService = inject(ThemePresetService);

  private readonly originalColors: Map<string, Record<string, string | null>> = new Map();
  public readonly pendingColors: WritableSignal<Record<string, string>> = signal<
    Record<string, string>
  >({});
  public readonly hasUnsavedChanges: Signal<boolean> = computed((): boolean => {
    const pending: Record<string, string> = this.pendingColors();
    return Object.keys(pending).length > 0;
  });

  public applyColorChange(semanticKey: string, hexValue: string): void {
    if (COLOR_VAR_MAP[semanticKey] === undefined) {
      return;
    }

    const normalized: string | null = this.normalizeHex(hexValue);
    if (!normalized) {
      return;
    }

    this.cacheOriginalValues(semanticKey);

    const variants: ColorVariants = this.buildVariants(normalized);
    this.applyVariants(semanticKey, variants);

    this.pendingColors.update(
      (state: Record<string, string>): Record<string, string> => ({
        ...state,
        [semanticKey]: normalized,
      })
    );
  }

  public resetColor(semanticKey: string): void {
    const original: Record<string, string | null> | undefined =
      this.originalColors.get(semanticKey);
    if (original === undefined) {
      return;
    }

    const root: HTMLElement = this.doc.documentElement;

    Object.entries(original).forEach(([name, value]: [string, string | null]): void => {
      if (value === null) {
        root.style.removeProperty(name);
      } else {
        root.style.setProperty(name, value);
      }
    });

    this.pendingColors.update((state: Record<string, string>): Record<string, string> => {
      const next: Record<string, string> = { ...state };
      delete next[semanticKey];
      return next;
    });
  }

  public resetAll(): void {
    const keys: string[] = Object.keys(this.pendingColors());
    keys.forEach((key: string): void => this.resetColor(key));
  }

  public saveAsPreset(name: string): ThemePreset {
    const preset: ThemePreset = this.presetService.captureCurrentTheme(name);
    this.presetService.savePreset(preset);
    this.pendingColors.set({});
    return preset;
  }

  private cacheOriginalValues(semanticKey: string): void {
    if (this.originalColors.has(semanticKey)) {
      return;
    }

    const root: HTMLElement = this.doc.documentElement;
    const styles: CSSStyleDeclaration = getComputedStyle(root);
    const original: Record<string, string | null> = {};
    const vars: string[] | undefined = COLOR_VAR_MAP[semanticKey];
    if (vars === undefined) {
      return;
    }
    vars.forEach((name: string): void => {
      const value: string = styles.getPropertyValue(name).trim();
      original[name] = value || null;
    });
    this.originalColors.set(semanticKey, original);
  }

  private applyVariants(semanticKey: string, variants: ColorVariants): void {
    const root: HTMLElement = this.doc.documentElement;
    const vars: string[] | undefined = COLOR_VAR_MAP[semanticKey];
    if (vars === undefined) {
      return;
    }

    vars.forEach((name: string): void => {
      const lower: string = name.toLowerCase();
      let value: string = variants.base;

      if (lower.includes('-hover')) {
        value = variants.hover;
      } else if (lower.includes('-active')) {
        value = variants.dark;
      } else if (lower.endsWith('-100') || lower.endsWith('-50') || lower.includes('light')) {
        value = variants.light;
      } else if (lower.endsWith('-700') || lower.endsWith('-800') || lower.endsWith('-900')) {
        value = variants.dark;
      }

      root.style.setProperty(name, value);
    });
  }

  private buildVariants(hexValue: string): ColorVariants {
    return {
      base: hexValue,
      hover: this.adjustLightness(hexValue, -10),
      light: this.adjustLightness(hexValue, 40),
      dark: this.adjustLightness(hexValue, -20),
    };
  }

  private normalizeHex(value: string): string | null {
    const raw: string = value.trim().toLowerCase();
    if (!raw) {
      return null;
    }

    const hex: string = raw.startsWith('#') ? raw.slice(1) : raw;
    if (hex.length === 3) {
      const expanded: string = hex
        .split('')
        .map((c: string): string => `${c}${c}`)
        .join('');
      return `#${expanded}`;
    }
    if (hex.length === 6 && /^[0-9a-f]+$/.test(hex)) {
      return `#${hex}`;
    }
    return null;
  }

  private adjustLightness(hex: string, delta: number): string {
    const rgb: { r: number; g: number; b: number } | null = this.hexToRgb(hex);
    if (!rgb) {
      return hex;
    }
    const hsl: { h: number; s: number; l: number } = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const l: number = this.clamp(hsl.l + delta, 0, 100);
    const rgbNext: { r: number; g: number; b: number } = this.hslToRgb(hsl.h, hsl.s, l);
    return this.rgbToHex(rgbNext.r, rgbNext.g, rgbNext.b);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const normalized: string | null = this.normalizeHex(hex);
    if (!normalized) {
      return null;
    }
    const value: string = normalized.slice(1);
    const r: number = parseInt(value.slice(0, 2), 16);
    const g: number = parseInt(value.slice(2, 4), 16);
    const b: number = parseInt(value.slice(4, 6), 16);
    return { r, g, b };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    const toHex: (v: number) => string = (v: number): string => {
      const clamped: number = this.clamp(Math.round(v), 0, 255);
      return clamped.toString(16).padStart(2, '0');
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    const rn: number = r / 255;
    const gn: number = g / 255;
    const bn: number = b / 255;

    const max: number = Math.max(rn, gn, bn);
    const min: number = Math.min(rn, gn, bn);
    const delta: number = max - min;

    let h: number = 0;
    if (delta !== 0) {
      if (max === rn) {
        h = ((gn - bn) / delta) % 6;
      } else if (max === gn) {
        h = (bn - rn) / delta + 2;
      } else {
        h = (rn - gn) / delta + 4;
      }
      h *= 60;
      if (h < 0) h += 360;
    }

    const l: number = (max + min) / 2;
    const s: number = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, s: s * 100, l: l * 100 };
  }

  private hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const sn: number = s / 100;
    const ln: number = l / 100;
    const c: number = (1 - Math.abs(2 * ln - 1)) * sn;
    const x: number = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m: number = ln - c / 2;

    let r: number = 0;
    let g: number = 0;
    let b: number = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
