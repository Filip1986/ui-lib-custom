import { DOCUMENT } from '@angular/common';
import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { ThemeConfigService } from './theme-config.service';
import type { ThemePreset, ThemePresetColors, ThemePresetFonts } from './theme-preset.interface';
import { saveAs } from './utils/file-download';

@Injectable({ providedIn: 'root' })
export class ThemePresetService {
  private readonly storageKey = 'uilib_presets';
  private readonly doc = inject(DOCUMENT);
  private readonly themeConfig = inject(ThemeConfigService);

  private readonly presetsSignal: WritableSignal<ThemePreset[]> = signal<ThemePreset[]>(
    this.loadPresets()
  );
  private readonly activePresetSignal: WritableSignal<ThemePreset | null> =
    signal<ThemePreset | null>(null);

  readonly presets: Signal<ThemePreset[]> = this.presetsSignal.asReadonly();
  readonly activePreset: Signal<ThemePreset | null> = this.activePresetSignal.asReadonly();

  savePreset(preset: ThemePreset): void {
    const now: number = Date.now();
    const normalized: ThemePreset = {
      ...preset,
      createdAt: preset.createdAt || now,
      updatedAt: now,
    };

    const list: ThemePreset[] = [...this.presetsSignal()];
    const index: number = list.findIndex((item: ThemePreset) => item.id === normalized.id);
    if (index >= 0) {
      list[index] = normalized;
    } else {
      list.push(normalized);
    }
    this.presetsSignal.set(list);
    this.persistPresets(list);
  }

  applyPreset(preset: ThemePreset): void {
    this.themeConfig.setVariant(preset.variant);
    this.themeConfig.setShape(preset.shape);
    this.themeConfig.setDensity(preset.density);
    this.themeConfig.setMode(preset.darkMode);

    const root: HTMLElement | null = this.doc?.documentElement ?? null;
    if (!root) {
      return;
    }

    const vars: Record<string, string> = this.buildCssVars(preset);
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    this.activePresetSignal.set(preset);
  }

  deletePreset(id: string): void {
    const list: ThemePreset[] = this.presetsSignal().filter((item: ThemePreset) => item.id !== id);
    this.presetsSignal.set(list);
    this.persistPresets(list);
    const active: ThemePreset | null = this.activePresetSignal();
    if (active?.id === id) {
      this.activePresetSignal.set(null);
    }
  }

  exportAsJson(preset: ThemePreset): void {
    const json: string = JSON.stringify(preset, null, 2);
    saveAs(`theme-preset-${preset.name}.json`, json, 'application/json');
  }

  exportAsCss(preset: ThemePreset): string {
    const vars: Record<string, string> = this.buildCssVars(preset);
    const body: string = Object.entries(vars)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
    return `:root {\n${body}\n}`;
  }

  importFromJson(json: string): ThemePreset {
    const parsed: unknown = JSON.parse(json);
    if (!this.isThemePreset(parsed)) {
      throw new Error('Invalid ThemePreset JSON');
    }
    return parsed;
  }

  captureCurrentTheme(name: string): ThemePreset {
    const now: number = Date.now();
    const root: HTMLElement | null = this.doc?.documentElement ?? null;
    const styles: CSSStyleDeclaration | null = root ? getComputedStyle(root) : null;

    const colors: ThemePresetColors = {
      primary: this.readCssVar(styles, '--uilib-color-primary-600', '#1976d2'),
      secondary: this.readCssVar(styles, '--uilib-color-secondary-600', '#757575'),
      success: this.readCssVar(styles, '--uilib-color-success-600', '#43a047'),
      danger: this.readCssVar(styles, '--uilib-color-danger-600', '#e53935'),
      warning: this.readCssVar(styles, '--uilib-color-warning-600', '#fb8c00'),
      info: this.readCssVar(styles, '--uilib-color-info-600', '#039be5'),
      surface: this.readCssVar(styles, '--uilib-surface', '#ffffff'),
      background: this.readCssVar(styles, '--uilib-page-bg', '#ffffff'),
      surfaceAlt: this.readCssVar(styles, '--uilib-surface-alt', ''),
      text: this.readCssVar(styles, '--uilib-page-fg', ''),
      textSecondary: this.readCssVar(styles, '--uilib-muted', ''),
      border: this.readCssVar(styles, '--uilib-border', ''),
    };

    const fonts: ThemePresetFonts = {
      heading: this.readCssVar(styles, '--uilib-font-heading', 'Inter'),
      body: this.readCssVar(styles, '--uilib-font-body', 'Inter'),
      mono: this.readCssVar(styles, '--uilib-font-mono', 'monospace'),
    };

    const preset: ThemePreset = {
      id: this.createId(),
      name,
      variant: this.themeConfig.variant(),
      shape: this.themeConfig.shape(),
      density: this.themeConfig.density(),
      darkMode: this.themeConfig.mode(),
      colors,
      fonts,
      customCssVars: undefined,
      createdAt: now,
      updatedAt: now,
    };

    return preset;
  }

  private loadPresets(): ThemePreset[] {
    const storage: Storage | null = this.doc?.defaultView?.localStorage ?? null;
    if (!storage) {
      return [];
    }
    const raw: string | null = storage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((item: unknown) => this.isThemePreset(item)) as ThemePreset[];
      }
    } catch {
      return [];
    }
    return [];
  }

  private persistPresets(list: ThemePreset[]): void {
    const storage: Storage | null = this.doc?.defaultView?.localStorage ?? null;
    if (!storage) {
      return;
    }
    storage.setItem(this.storageKey, JSON.stringify(list));
  }

  private buildCssVars(preset: ThemePreset): Record<string, string> {
    const vars: Record<string, string> = {
      '--uilib-color-primary-600': preset.colors.primary,
      '--uilib-color-secondary-600': preset.colors.secondary,
      '--uilib-color-success-600': preset.colors.success,
      '--uilib-color-danger-600': preset.colors.danger,
      '--uilib-color-warning-600': preset.colors.warning,
      '--uilib-color-info-600': preset.colors.info,
      '--uilib-surface': preset.colors.surface,
      '--uilib-page-bg': preset.colors.background,
      '--uilib-font-heading': preset.fonts.heading,
      '--uilib-font-body': preset.fonts.body,
      '--uilib-font-ui': preset.fonts.body,
      '--uilib-font-mono': preset.fonts.mono,
    };

    if (preset.colors.surfaceAlt) {
      vars['--uilib-surface-alt'] = preset.colors.surfaceAlt;
    }
    if (preset.colors.text) {
      vars['--uilib-page-fg'] = preset.colors.text;
    }
    if (preset.colors.textSecondary) {
      vars['--uilib-muted'] = preset.colors.textSecondary;
    }
    if (preset.colors.border) {
      vars['--uilib-border'] = preset.colors.border;
    }

    if (preset.customCssVars) {
      Object.entries(preset.customCssVars).forEach(([key, value]) => {
        vars[key] = value;
      });
    }

    return vars;
  }

  private readCssVar(styles: CSSStyleDeclaration | null, name: string, fallback: string): string {
    if (!styles) {
      return fallback;
    }
    const value: string = styles.getPropertyValue(name).trim();
    return value || fallback;
  }

  private createId(): string {
    const cryptoRef: Crypto | undefined = this.doc?.defaultView?.crypto;
    if (cryptoRef?.randomUUID) {
      return cryptoRef.randomUUID();
    }
    const random: string = Math.random().toString(16).slice(2);
    return `preset-${Date.now()}-${random}`;
  }

  private isThemePreset(value: unknown): value is ThemePreset {
    if (!value || typeof value !== 'object') {
      return false;
    }
    const preset = value as ThemePreset;
    return (
      typeof preset.id === 'string' &&
      typeof preset.name === 'string' &&
      typeof preset.variant === 'string' &&
      typeof preset.shape === 'string' &&
      typeof preset.density === 'string' &&
      typeof preset.darkMode === 'string' &&
      typeof preset.createdAt === 'number' &&
      typeof preset.updatedAt === 'number' &&
      this.isPresetColors(preset.colors) &&
      this.isPresetFonts(preset.fonts)
    );
  }

  private isPresetColors(colors: ThemePresetColors): boolean {
    if (!colors || typeof colors !== 'object') {
      return false;
    }
    return (
      typeof colors.primary === 'string' &&
      typeof colors.secondary === 'string' &&
      typeof colors.success === 'string' &&
      typeof colors.danger === 'string' &&
      typeof colors.warning === 'string' &&
      typeof colors.info === 'string' &&
      typeof colors.surface === 'string' &&
      typeof colors.background === 'string'
    );
  }

  private isPresetFonts(fonts: ThemePresetFonts): boolean {
    if (!fonts || typeof fonts !== 'object') {
      return false;
    }
    return (
      typeof fonts.heading === 'string' &&
      typeof fonts.body === 'string' &&
      typeof fonts.mono === 'string'
    );
  }
}
