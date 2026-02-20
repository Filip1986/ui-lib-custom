import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal, Signal } from '@angular/core';
import { BORDER_RADIUS, SHADOWS, SELECTBUTTON_TOKENS } from 'ui-lib-custom/tokens';
import brandExamplePreset from './presets/brand-example.json';
import darkPreset from './presets/dark.json';
import lightPreset from './presets/light.json';
import { ICON_SIZES } from 'ui-lib-custom/core';
import {
  DeepPartial,
  ThemePreset,
  ThemePresetOverrides,
  ThemeShapeRadius,
  ThemeIconConfig,
  ThemeConfig,
  ThemeMode,
} from './theme-preset.interface';
import { saveAs } from './utils/file-download';
import { exportThemeAsScss, ScssExportOptions } from './exporters/scss-exporter';
import { exportThemeAsCss, CssExportOptions } from './exporters/css-exporter';
import { exportThemeAsFigmaJson } from './exporters/figma-exporter';

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
  private readonly defaultIconConfig: ThemeIconConfig = {
    defaultLibrary: 'lucide',
    defaultSize: 'md',
    sizes: { ...ICON_SIZES },
  };
  private readonly defaultPreset: ThemePreset = this.ensureIconDefaults(lightPreset as ThemePreset);
  private readonly builtInPresets: Record<string, ThemePreset> = {
    light: this.ensureIconDefaults(lightPreset as ThemePreset),
    dark: this.ensureIconDefaults(darkPreset as ThemePreset),
    'brand-example': this.ensureIconDefaults(brandExamplePreset as ThemePreset),
  };

  private readonly hostRef = signal<HTMLElement | null>(this.doc?.documentElement ?? null);
  private readonly presetSignal = signal<ThemePreset>(this.defaultPreset);
  private readonly savedThemesSignal = signal<string[]>(this.listSavedThemeNames());
  private readonly modeSignal = signal<ThemeMode>('auto');
  private mediaQuery: MediaQueryList | null = null;

  readonly preset = computed(() => this.presetSignal());
  readonly savedThemes: Signal<string[]> = this.savedThemesSignal.asReadonly();
  readonly cssVars = computed(() => this.mapPresetToCssVars(this.presetSignal()));
  readonly mode: Signal<ThemeMode> = this.modeSignal.asReadonly();
  readonly effectiveTheme = computed<'light' | 'dark'>(() => {
    const mode = this.modeSignal();
    if (mode === 'auto') {
      return this.getSystemPreference();
    }
    return mode;
  });

  constructor() {
    this.setupSystemPreferenceListener();
    const stored = this.readStoredConfig();
    const storedMode = this.getStoredMode(stored);
    if (storedMode) {
      this.modeSignal.set(storedMode);
    }
    const storedPreset = this.getStoredPreset(stored);
    const initial = storedPreset
      ? this.ensureIconDefaults(this.mergePresets(this.defaultPreset, storedPreset))
      : this.defaultPreset;
    this.presetSignal.set(initial);
    this.applyToRoot(initial);
    this.applyThemeToDocument();
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
      ? (options?.base ?? this.presetSignal() ?? this.defaultPreset)
      : (options?.base ?? this.defaultPreset);

    const resolved = this.ensureIconDefaults(this.mergePresets(base, preset));
    this.presetSignal.set(resolved);

    if (persist) {
      this.persistConfig(resolved, this.modeSignal());
    }
    if (apply) {
      this.applyToRoot(resolved, options?.target ?? undefined);
      this.applyThemeToDocument(options?.target ?? undefined);
    }

    return resolved;
  }

  async loadPresetAsync(
    source:
      | string
      | Promise<ThemePreset | ThemePresetOverrides>
      | (() => Promise<ThemePreset | ThemePresetOverrides>),
    options?: LoadOptions
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
  }

  setMode(mode: ThemeMode): void {
    this.modeSignal.set(mode);
    this.applyThemeToDocument();
    this.persistConfig(this.presetSignal(), mode);
  }

  toggleDarkMode(): void {
    const current = this.effectiveTheme();
    this.setMode(current === 'dark' ? 'light' : 'dark');
  }

  applyThemeToDocument(target?: HTMLElement | null): void {
    if (target) {
      this.hostRef.set(target);
    }
    const host = target ?? this.hostRef();
    if (!host) {
      return;
    }

    const mode = this.modeSignal();
    const effective = this.effectiveTheme();
    host.removeAttribute('data-theme');
    host.setAttribute('data-theme', mode === 'auto' ? effective : mode);
  }

  exportAsCSS(preset: ThemePreset = this.presetSignal()): string {
    const vars = this.mapPresetToCssVars(preset);
    const body = Object.entries(vars)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
    return `:root {\n${body}\n}`;
  }

  exportAsJSON(preset: ThemePreset = this.presetSignal(), download = false): string {
    const normalized = this.ensureIconDefaults(preset);
    const json = JSON.stringify(normalized, null, 2);
    if (download) {
      saveAs('theme.json', json, 'application/json');
    }
    return json;
  }

  exportAsScss(options?: ScssExportOptions): string;
  exportAsScss(preset: ThemePreset, download?: boolean): string;
  exportAsScss(
    presetOrOptions: ThemePreset | ScssExportOptions = this.presetSignal(),
    download = false
  ): string {
    if (this.isThemePreset(presetOrOptions)) {
      const vars = this.mapPresetToCssVars(presetOrOptions);
      const body = Object.entries(vars)
        .map(([name, value]) => `$${name.replace(/^--/, '')}: ${value};`)
        .join('\n');
      const scss = `// Generated from UI Lib theme preset\n${body}\n`;
      if (download) {
        saveAs('_theme-variables.scss', scss, 'text/x-scss');
      }
      return scss;
    }

    return exportThemeAsScss(this.presetSignal(), presetOrOptions);
  }

  exportAsCss(options?: CssExportOptions): string {
    return exportThemeAsCss(this.presetSignal(), options);
  }

  exportAsJson(): string {
    return this.exportAsJSON(this.presetSignal(), false);
  }

  exportAsFigmaTokens(): string {
    return exportThemeAsFigmaJson(this.presetSignal());
  }

  downloadExport(format: 'scss' | 'css' | 'json' | 'figma'): void {
    let content: string;
    let filename: string;
    let mimeType: string;

    const safeName = this.toFileSafeName(this.presetSignal().name);

    switch (format) {
      case 'scss':
        content = this.exportAsScss();
        filename = `theme-${safeName}.scss`;
        mimeType = 'text/plain';
        break;
      case 'css':
        content = this.exportAsCss();
        filename = `theme-${safeName}.css`;
        mimeType = 'text/css';
        break;
      case 'figma':
        content = this.exportAsFigmaTokens();
        filename = `theme-${safeName}-figma.json`;
        mimeType = 'application/json';
        break;
      case 'json':
      default:
        content = this.exportAsJson();
        filename = `theme-${safeName}.json`;
        mimeType = 'application/json';
        break;
    }

    this.triggerDownload(content, filename, mimeType);
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

  saveCurrentPreset(): void {
    this.persistConfig(this.presetSignal(), this.modeSignal());
  }

  clearStoredPreset(): void {
    if (!this.hasLocalStorage()) {
      return;
    }
    try {
      this.doc?.defaultView?.localStorage?.removeItem(this.storageKey);
    } catch {
      // ignore
    }
  }

  private triggerDownload(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = this.doc?.createElement('a');
    if (!anchor) {
      return;
    }
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private toFileSafeName(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '-');
  }

  private setupSystemPreferenceListener(): void {
    const win = this.doc?.defaultView;
    if (!win?.matchMedia) {
      return;
    }

    this.mediaQuery = win.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', () => {
      if (this.modeSignal() === 'auto') {
        this.applyThemeToDocument();
      }
    });
  }

  private getSystemPreference(): 'light' | 'dark' {
    const win = this.doc?.defaultView;
    if (!win?.matchMedia) {
      return 'light';
    }
    return win.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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

    const presetWithIcons = this.ensureIconDefaults(preset);
    const { colors, shape, typography, shadow, cardShadow, buttonShadow, icons } = presetWithIcons;

    applyColor(
      colors.primary,
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

    applyColor(
      colors.secondary,
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

    applyColor(
      colors.success,
      '--uilib-color-success-50',
      '--uilib-color-success-600',
      '--uilib-color-success-700',
      '--uilib-button-success-bg',
      '--uilib-button-success-bg-hover',
      '--uilib-button-success-bg-active',
      '--uilib-button-success-border'
    );
    set('--uilib-button-success-fg', '#fff');

    applyColor(
      colors.danger,
      '--uilib-color-danger-50',
      '--uilib-color-danger-600',
      '--uilib-color-danger-700',
      '--uilib-button-danger-bg',
      '--uilib-button-danger-bg-hover',
      '--uilib-button-danger-bg-active',
      '--uilib-button-danger-border'
    );
    set('--uilib-button-danger-fg', '#fff');

    applyColor(
      colors.warning,
      '--uilib-color-warning-50',
      '--uilib-color-warning-600',
      '--uilib-color-warning-700',
      '--uilib-button-warning-bg',
      '--uilib-button-warning-bg-hover',
      '--uilib-button-warning-bg-active',
      '--uilib-button-warning-border'
    );
    set('--uilib-button-warning-fg', '#000');

    applyColor(
      colors.info,
      '--uilib-color-info-50',
      '--uilib-color-info-600',
      '--uilib-color-info-700'
    );

    applyColor(colors.background, '--uilib-page-bg');
    applyColor(colors.text, '--uilib-page-fg');
    applyColor(colors.surface, '--uilib-surface', '--uilib-topbar-bg');
    applyColor(colors.surfaceAlt, '--uilib-surface-alt', '--uilib-topbar-hover');
    applyColor(colors.border, '--uilib-border', '--uilib-topbar-border', '--uilib-card-border');
    applyColor(colors.textSecondary, '--uilib-muted');
    applyColor(colors.text, '--uilib-topbar-fg');

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

    set(
      '--uilib-button-radius',
      this.resolveRadius(shape.buttonRadius) ?? resolvedBorderRadius ?? BORDER_RADIUS.md
    );
    set(
      '--uilib-card-radius',
      this.resolveRadius(shape.cardRadius) ?? resolvedBorderRadius ?? BORDER_RADIUS.md
    );
    set(
      '--uilib-input-radius',
      this.resolveRadius(shape.inputRadius) ?? resolvedBorderRadius ?? BORDER_RADIUS.md
    );

    const fontBody = typography.fontBody ?? typography.fontFamily;
    const fontUI = typography.fontUI ?? fontBody ?? typography.fontFamily;
    const fontHeading = typography.fontHeading ?? fontBody ?? typography.fontFamily;
    const fontMonospace =
      typography.fontMonospace ??
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    const headingWeight = typography.headingWeight ?? 600;
    const bodyWeight = typography.bodyWeight ?? 400;

    set('--uilib-font-family-base', fontBody);
    set('--uilib-font-size-base', typography.baseFontSize);
    set('--uilib-font-body', fontBody);
    set('--uilib-font-ui', fontUI);
    set('--uilib-font-heading', fontHeading);
    set('--uilib-font-mono', fontMonospace);
    set('--uilib-font-heading-weight', `${headingWeight}`);
    set('--uilib-font-body-weight', `${bodyWeight}`);

    const shadowValueCard =
      (SHADOWS as Record<string, string>)[cardShadow ?? shadow ?? ''] ?? 'none';
    const shadowValueButton =
      (SHADOWS as Record<string, string>)[buttonShadow ?? shadow ?? ''] ?? 'none';
    set('--uilib-card-shadow', shadowValueCard);
    set('--uilib-card-shadow-hover', shadowValueCard);
    set('--uilib-card-shadow-medium', shadowValueCard);
    set('--uilib-card-shadow-high', shadowValueCard);
    set('--uilib-button-shadow', shadowValueButton);
    set('--uilib-button-shadow-hover', shadowValueButton);
    set('--uilib-shadow-sm', shadowValueButton);
    set('--uilib-shadow-md', shadowValueButton);

    set('--uilib-select-button-gap', SELECTBUTTON_TOKENS.gap);
    set('--uilib-select-button-border-radius', SELECTBUTTON_TOKENS.borderRadius.material);
    set('--uilib-select-button-material-border-radius', SELECTBUTTON_TOKENS.borderRadius.material);
    set(
      '--uilib-select-button-bootstrap-border-radius',
      SELECTBUTTON_TOKENS.borderRadius.bootstrap
    );
    set('--uilib-select-button-minimal-border-radius', SELECTBUTTON_TOKENS.borderRadius.minimal);

    set('--uilib-select-button-small-padding', SELECTBUTTON_TOKENS.sizes.small.padding);
    set('--uilib-select-button-small-font-size', SELECTBUTTON_TOKENS.sizes.small.fontSize);
    set('--uilib-select-button-small-min-height', SELECTBUTTON_TOKENS.sizes.small.minHeight);
    set('--uilib-select-button-medium-padding', SELECTBUTTON_TOKENS.sizes.medium.padding);
    set('--uilib-select-button-medium-font-size', SELECTBUTTON_TOKENS.sizes.medium.fontSize);
    set('--uilib-select-button-medium-min-height', SELECTBUTTON_TOKENS.sizes.medium.minHeight);
    set('--uilib-select-button-large-padding', SELECTBUTTON_TOKENS.sizes.large.padding);
    set('--uilib-select-button-large-font-size', SELECTBUTTON_TOKENS.sizes.large.fontSize);
    set('--uilib-select-button-large-min-height', SELECTBUTTON_TOKENS.sizes.large.minHeight);

    set('--uilib-select-button-fg', colors.text);
    set('--uilib-select-button-invalid-border', colors.danger);

    set('--uilib-select-button-material-bg', colors.surface);
    set('--uilib-select-button-material-hover-bg', colors.surfaceAlt);
    set('--uilib-select-button-material-border', colors.border);
    set('--uilib-select-button-material-selected-bg', colors.primary);
    set('--uilib-select-button-material-selected-fg', '#fff');
    set('--uilib-select-button-material-shadow', SELECTBUTTON_TOKENS.material.shadow);

    set('--uilib-select-button-bootstrap-bg', colors.surface);
    set('--uilib-select-button-bootstrap-hover-bg', colors.surfaceAlt);
    set('--uilib-select-button-bootstrap-border', colors.border);
    set('--uilib-select-button-bootstrap-selected-bg', colors.primary);
    set('--uilib-select-button-bootstrap-selected-fg', '#fff');

    set('--uilib-select-button-minimal-bg', SELECTBUTTON_TOKENS.minimal.bg);
    set('--uilib-select-button-minimal-hover-bg', colors.surfaceAlt);
    set('--uilib-select-button-minimal-border', SELECTBUTTON_TOKENS.minimal.border);
    set('--uilib-select-button-minimal-selected-bg', colors.surfaceAlt);
    set('--uilib-select-button-minimal-selected-fg', colors.text);

    const iconSizes = icons?.sizes ?? this.defaultIconConfig.sizes;
    Object.entries(iconSizes).forEach(([key, value]) => set(`--uilib-icon-size-${key}`, value));

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

  private persistConfig(preset: ThemePreset, mode: ThemeMode): void {
    if (!this.hasLocalStorage()) {
      return;
    }
    try {
      const payload: ThemeConfig = { mode, preset };
      this.doc?.defaultView?.localStorage?.setItem(this.storageKey, JSON.stringify(payload));
    } catch {
      // ignore persistence errors (e.g., SSR or private mode)
    }
  }

  private readStoredConfig(): ThemeConfig | ThemePreset | null {
    if (!this.hasLocalStorage()) {
      return null;
    }
    try {
      const raw = this.doc?.defaultView?.localStorage?.getItem(this.storageKey);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as ThemeConfig | ThemePreset;
    } catch {
      return null;
    }
  }

  private getStoredMode(value: ThemeConfig | ThemePreset | null): ThemeMode | null {
    if (value && this.isThemeConfig(value)) {
      return value.mode;
    }
    return null;
  }

  private getStoredPreset(value: ThemeConfig | ThemePreset | null): ThemePreset | null {
    if (!value) {
      return null;
    }
    if (this.isThemeConfig(value)) {
      return value.preset ?? null;
    }
    if (this.isThemePreset(value)) {
      return value;
    }
    return null;
  }

  private isThemeConfig(value: unknown): value is ThemeConfig {
    return Boolean(value && typeof value === 'object' && 'mode' in value && 'preset' in value);
  }

  private isThemePreset(value: unknown): value is ThemePreset {
    return Boolean(value && typeof value === 'object' && 'colors' in value && 'shape' in value);
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

  private ensureIconDefaults(preset: ThemePreset): ThemePreset {
    const icons: ThemeIconConfig = {
      defaultLibrary: preset.icons?.defaultLibrary ?? this.defaultIconConfig.defaultLibrary,
      defaultSize: preset.icons?.defaultSize ?? this.defaultIconConfig.defaultSize,
      sizes: { ...this.defaultIconConfig.sizes, ...(preset.icons?.sizes ?? {}) },
    };
    return { ...preset, icons };
  }
}
