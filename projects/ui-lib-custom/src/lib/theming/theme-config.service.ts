import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal, Signal } from '@angular/core';
import { BORDER_RADIUS, SHADOWS } from '../design-tokens';
import brandExamplePreset from './presets/brand-example.json';
import darkPreset from './presets/dark.json';
import lightPreset from './presets/light.json';
import { DeepPartial, ThemePreset, ThemePresetOverrides, ThemeShapeRadius } from './theme-preset.interface';
import { saveAs } from './utils/file-download';

type LoadOptions = {
  merge?: boolean;
  persist?: boolean;
  apply?: boolean;
  target?: HTMLElement | null;
  base?: ThemePreset | null;
};

@Injectable({ providedIn: 'root' })
export class ThemeConfigService {
  private readonly doc = inject(DOCUMENT);
  private readonly storageKey = 'ui-lib-custom.theme';
  private readonly savedThemesKey = 'ui-lib-custom.saved-themes';
  private readonly defaultPreset: ThemePreset = lightPreset as ThemePreset;
  private readonly builtInPresets: Record<string, ThemePreset> = {
    light: lightPreset as ThemePreset,
    dark: darkPreset as ThemePreset,
    'brand-example': brandExamplePreset as ThemePreset,
  };

  private readonly hostRef = signal<HTMLElement | null>(this.doc?.documentElement ?? null);
  private readonly presetSignal = signal<ThemePreset>(this.defaultPreset);
  private readonly savedThemesSignal = signal<string[]>(this.listSavedThemeNames());

  readonly preset = computed(() => this.presetSignal());
  readonly savedThemes: Signal<string[]> = this.savedThemesSignal.asReadonly();
  readonly cssVars = computed(() => this.mapPresetToCssVars(this.presetSignal()));

  constructor() {
    const stored = this.readStoredPreset();
    const initial = stored
      ? this.mergePresets(this.defaultPreset, stored)
      : this.defaultPreset;
    this.presetSignal.set(initial);
    this.applyToRoot(initial);
    this.syncSavedThemes();
  }

  getPreset(): ThemePreset {
    return this.presetSignal();
  }

  listBuiltInPresets(): Record<string, ThemePreset> {
    return this.builtInPresets;
  }

  loadPreset(preset: ThemePreset | ThemePresetOverrides, options?: LoadOptions): ThemePreset {
    const merge = options?.merge ?? true;
    const apply = options?.apply ?? true;
    const persist = options?.persist ?? true;
    const base = merge
      ? options?.base ?? this.presetSignal() ?? this.defaultPreset
      : options?.base ?? this.defaultPreset;

    const resolved = this.mergePresets(base, preset);
    this.presetSignal.set(resolved);

    if (persist) {
      this.persistPreset(resolved);
    }
    if (apply) {
      this.applyToRoot(resolved, options?.target ?? undefined);
    }

    return resolved;
  }

  async loadPresetAsync(
    source: string | Promise<ThemePreset | ThemePresetOverrides> | (() => Promise<ThemePreset | ThemePresetOverrides>),
    options?: LoadOptions,
  ): Promise<ThemePreset> {
    let presetLike: ThemePreset | ThemePresetOverrides;

    if (typeof source === 'string') {
      presetLike = await this.fetchPreset(source);
    } else if (typeof source === 'function') {
      presetLike = await source();
    } else {
      presetLike = await source;
    }

    return this.loadPreset(presetLike, options);
  }

  applyToRoot(preset: ThemePreset | null = null, target?: HTMLElement | null): void {
    if (target) {
      this.hostRef.set(target);
    }
    const host = target ?? this.hostRef();
    const current = preset ?? this.presetSignal();
    if (!host || !current) {
      return;
    }

    const vars = this.mapPresetToCssVars(current);
    Object.entries(vars).forEach(([name, value]) => {
      host.style.setProperty(name, value);
    });
    host.setAttribute('data-theme', current.name);
  }

  exportAsCSS(preset: ThemePreset = this.presetSignal()): string {
    const vars = this.mapPresetToCssVars(preset);
    const body = Object.entries(vars)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
    return `:root {\n${body}\n}`;
  }

  exportAsJSON(preset: ThemePreset = this.presetSignal(), download = false): string {
    const json = JSON.stringify(preset, null, 2);
    if (download) {
      saveAs('theme.json', json, 'application/json');
    }
    return json;
  }

  exportAsScss(preset: ThemePreset = this.presetSignal(), download = false): string {
    const vars = this.mapPresetToCssVars(preset);
    const body = Object.entries(vars)
      .map(([name, value]) => `$${name.replace(/^--/, '')}: ${value};`)
      .join('\n');
    const scss = `// Generated from UI Lib theme preset\n${body}\n`;
    if (download) {
      saveAs('_theme-variables.scss', scss, 'text/x-scss');
    }
    return scss;
  }

  saveToLocalStorage(name: string, preset: ThemePreset = this.presetSignal()): void {
    if (!name || !this.hasLocalStorage()) return;
    const map = this.readSavedThemes();
    map[name] = preset;
    this.writeSavedThemes(map);
    this.syncSavedThemes(map);
  }

  loadFromLocalStorage(name: string, options?: LoadOptions): ThemePreset | null {
    const map = this.readSavedThemes();
    const found = map[name];
    if (!found) return null;
    return this.loadPreset(found, { merge: false, apply: true, persist: true, ...options });
  }

  listSavedThemes(): string[] {
    return Object.keys(this.readSavedThemes());
  }

  deleteSavedTheme(name: string): void {
    const map = this.readSavedThemes();
    if (map[name]) {
      delete map[name];
      this.writeSavedThemes(map);
      this.syncSavedThemes(map);
    }
  }

  async importFromJSON(file: File, options?: LoadOptions): Promise<ThemePreset> {
    const text = await file.text();
    const parsed = JSON.parse(text) as ThemePreset;
    return this.loadPreset(parsed, { merge: false, apply: true, persist: true, ...options });
  }

  downloadPresetFiles(preset: ThemePreset = this.presetSignal()): void {
    const json = this.exportAsJSON(preset);
    const css = this.exportAsCSS(preset);
    const scss = this.exportAsScss(preset);
    saveAs('theme.json', json, 'application/json');
    saveAs('theme.css', css, 'text/css');
    saveAs('_theme-variables.scss', scss, 'text/x-scss');
  }

  getCssVars(preset: ThemePreset | null = null): Record<string, string> {
    const source = preset ?? this.presetSignal();
    return this.mapPresetToCssVars(source);
  }

  private mapPresetToCssVars(preset: ThemePreset): Record<string, string> {
    const vars: Record<string, string> = {};
    const set = (name: string, value: string | undefined) => {
      if (value !== undefined) {
        vars[name] = value;
      }
    };
    const applyColor = (value: string, ...names: string[]) => {
      names.forEach((name) => set(name, value));
    };

    const { colors, shape, typography, shadow } = preset;

    applyColor(colors.primary,
      '--uilib-color-primary-100',
      '--uilib-color-primary-500',
      '--uilib-color-primary-600',
      '--uilib-color-primary-700',
      '--uilib-button-primary-bg',
      '--uilib-button-primary-bg-hover',
      '--uilib-button-primary-bg-active',
      '--uilib-button-primary-border',
      '--uilib-topbar-accent'
    );
    set('--uilib-button-primary-fg', '#fff');

    applyColor(colors.secondary,
      '--uilib-color-secondary-50',
      '--uilib-color-secondary-100',
      '--uilib-color-secondary-600',
      '--uilib-color-secondary-700',
      '--uilib-button-secondary-bg',
      '--uilib-button-secondary-bg-hover',
      '--uilib-button-secondary-bg-active',
      '--uilib-button-secondary-border'
    );
    set('--uilib-button-secondary-fg', '#fff');

    applyColor(colors.success,
      '--uilib-color-success-50',
      '--uilib-color-success-600',
      '--uilib-color-success-700',
      '--uilib-button-success-bg',
      '--uilib-button-success-bg-hover',
      '--uilib-button-success-bg-active',
      '--uilib-button-success-border'
    );
    set('--uilib-button-success-fg', '#fff');

    applyColor(colors.danger,
      '--uilib-color-danger-50',
      '--uilib-color-danger-600',
      '--uilib-color-danger-700',
      '--uilib-button-danger-bg',
      '--uilib-button-danger-bg-hover',
      '--uilib-button-danger-bg-active',
      '--uilib-button-danger-border'
    );
    set('--uilib-button-danger-fg', '#fff');

    applyColor(colors.warning,
      '--uilib-color-warning-50',
      '--uilib-color-warning-600',
      '--uilib-color-warning-700',
      '--uilib-button-warning-bg',
      '--uilib-button-warning-bg-hover',
      '--uilib-button-warning-bg-active',
      '--uilib-button-warning-border'
    );
    set('--uilib-button-warning-fg', '#000');

    applyColor(colors.info,
      '--uilib-color-info-50',
      '--uilib-color-info-600',
      '--uilib-color-info-700'
    );

    applyColor(colors.background,
      '--uilib-page-bg'
    );
    applyColor(colors.text,
      '--uilib-page-fg'
    );
    applyColor(colors.surface,
      '--uilib-surface',
      '--uilib-topbar-bg'
    );
    applyColor(colors.surfaceAlt,
      '--uilib-surface-alt',
      '--uilib-topbar-hover'
    );
    applyColor(colors.border,
      '--uilib-border',
      '--uilib-topbar-border',
      '--uilib-card-border'
    );
    applyColor(colors.textSecondary,
      '--uilib-muted'
    );
    applyColor(colors.text,
      '--uilib-topbar-fg'
    );

    set('--uilib-card-bg', colors.surface);
    set('--uilib-card-text-color', colors.text);
    set('--uilib-card-header-bg', colors.surfaceAlt);
    set('--uilib-card-footer-bg', colors.surfaceAlt);

    const resolvedBorderRadius = this.resolveRadius(shape.borderRadius);
    const radiusBase = resolvedBorderRadius ?? BORDER_RADIUS.md;
    set('--uilib-radius-sm', radiusBase);
    set('--uilib-radius-md', radiusBase);
    set('--uilib-radius-lg', radiusBase);
    set('--uilib-radius-xl', radiusBase);
    set('--uilib-radius-2xl', radiusBase);
    set('--uilib-radius-full', BORDER_RADIUS.full);

    set('--uilib-button-radius', this.resolveRadius(shape.buttonRadius) ?? resolvedBorderRadius ?? BORDER_RADIUS.md);
    set('--uilib-card-radius', this.resolveRadius(shape.cardRadius) ?? resolvedBorderRadius ?? BORDER_RADIUS.md);
    set('--uilib-input-radius', this.resolveRadius(shape.inputRadius) ?? resolvedBorderRadius ?? BORDER_RADIUS.md);

    set('--uilib-font-family-base', typography.fontFamily);
    set('--uilib-font-size-base', typography.baseFontSize);

    const shadowValue = (SHADOWS as Record<string, string>)[shadow ?? ''] ?? 'none';
    set('--uilib-card-shadow', shadowValue);
    set('--uilib-card-shadow-hover', shadowValue);
    set('--uilib-card-shadow-medium', shadowValue);
    set('--uilib-card-shadow-high', shadowValue);
    set('--uilib-button-shadow', shadowValue);
    set('--uilib-button-shadow-hover', shadowValue);

    return vars;
  }

  private resolveRadius(value: ThemeShapeRadius | undefined): string | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    const key = value as keyof typeof BORDER_RADIUS;
    if (key in BORDER_RADIUS) {
      return BORDER_RADIUS[key];
    }
    return value as string;
  }

  private mergePresets(base: ThemePreset, overrides: DeepPartial<ThemePreset>): ThemePreset {
    return this.deepMerge(base, overrides);
  }

  private deepMerge<T>(base: T, patch: DeepPartial<T>): T {
    const source = patch ?? {};
    const clone: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };

    Object.entries(source).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }

      const existing = (base as any)[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        clone[key] = this.deepMerge(existing ?? {}, value as any);
      } else {
        clone[key] = value as any;
      }
    });

    return clone as T;
  }

  private persistPreset(preset: ThemePreset): void {
    if (!this.hasLocalStorage()) {
      return;
    }
    try {
      this.doc?.defaultView?.localStorage?.setItem(this.storageKey, JSON.stringify(preset));
    } catch {
      // ignore persistence errors (e.g., SSR or private mode)
    }
  }

  private readStoredPreset(): ThemePreset | null {
    if (!this.hasLocalStorage()) {
      return null;
    }
    try {
      const raw = this.doc?.defaultView?.localStorage?.getItem(this.storageKey);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as ThemePreset;
    } catch {
      return null;
    }
  }

  private readSavedThemes(): Record<string, ThemePreset> {
    if (!this.hasLocalStorage()) return {};
    try {
      const raw = this.doc?.defaultView?.localStorage?.getItem(this.savedThemesKey);
      return raw ? (JSON.parse(raw) as Record<string, ThemePreset>) : {};
    } catch {
      return {};
    }
  }

  private listSavedThemeNames(): string[] {
    const map = this.readSavedThemes();
    return Object.keys(map);
  }

  private syncSavedThemes(map?: Record<string, ThemePreset>): void {
    const source = map ?? this.readSavedThemes();
    this.savedThemesSignal.set(Object.keys(source));
  }

  private writeSavedThemes(map: Record<string, ThemePreset>): void {
    if (!this.hasLocalStorage()) return;
    try {
      this.doc?.defaultView?.localStorage?.setItem(this.savedThemesKey, JSON.stringify(map));
    } catch {
      // ignore
    }
  }

  private hasLocalStorage(): boolean {
    return Boolean(this.doc?.defaultView?.localStorage);
  }

  private async fetchPreset(url: string): Promise<ThemePreset | ThemePresetOverrides> {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load theme preset from ${url} (${response.status})`);
    }
    return response.json();
  }
}
