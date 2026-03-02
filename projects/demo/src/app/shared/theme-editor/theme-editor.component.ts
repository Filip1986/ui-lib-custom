import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ThemeConfigService,
  ThemeEditorService,
  ThemePresetService,
  ThemePreset,
  ThemeVariant,
  ThemeShape,
  ThemeMode,
  ThemeDensity,
} from 'ui-lib-custom/theme';
import { Button } from 'ui-lib-custom/button';
import { UiLibInput } from 'ui-lib-custom/input';

interface ToggleOption<T> {
  label: string;
  value: T;
}

interface ColorOption {
  key: string;
  label: string;
  cssVar: string;
}

@Component({
  selector: 'app-theme-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, UiLibInput],
  templateUrl: './theme-editor.component.html',
  styleUrl: './theme-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeEditorComponent {
  public readonly embedded = input<boolean>(false);
  public readonly showFab = input<boolean>(true);

  private readonly themeConfig = inject(ThemeConfigService);
  private readonly presetService = inject(ThemePresetService);
  private readonly editorService = inject(ThemeEditorService);

  public readonly isOpen = signal<boolean>(false);
  public readonly panelOpen = computed<boolean>((): boolean => this.embedded() || this.isOpen());
  public readonly pendingColors = this.editorService.pendingColors;

  public readonly variant = computed<ThemeVariant>((): ThemeVariant => this.themeConfig.variant());
  public readonly shape = computed<ThemeShape>((): ThemeShape => this.themeConfig.shape());
  public readonly density = computed<ThemeDensity>((): ThemeDensity => this.themeConfig.density());
  public readonly mode = computed<ThemeMode>((): ThemeMode => this.themeConfig.mode());

  public readonly variants: ToggleOption<ThemeVariant>[] = [
    { label: 'Material', value: 'material' },
    { label: 'Bootstrap', value: 'bootstrap' },
    { label: 'Minimal', value: 'minimal' },
  ];

  public readonly shapes: ToggleOption<ThemeShape>[] = [
    { label: 'Sharp', value: 'sharp' },
    { label: 'Rounded', value: 'rounded' },
    { label: 'Soft', value: 'soft' },
    { label: 'Pill', value: 'pill' },
  ];

  public readonly densities: ToggleOption<ThemeDensity>[] = [
    { label: 'Compact', value: 'compact' },
    { label: 'Default', value: 'default' },
    { label: 'Comfortable', value: 'comfortable' },
  ];

  public readonly modes: ToggleOption<ThemeMode>[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' },
  ];

  public readonly colors: ColorOption[] = [
    { key: 'primary', label: 'Primary', cssVar: '--uilib-color-primary-600' },
    { key: 'secondary', label: 'Secondary', cssVar: '--uilib-color-secondary-600' },
    { key: 'success', label: 'Success', cssVar: '--uilib-color-success-600' },
    { key: 'danger', label: 'Danger', cssVar: '--uilib-color-danger-600' },
    { key: 'warning', label: 'Warning', cssVar: '--uilib-color-warning-600' },
    { key: 'info', label: 'Info', cssVar: '--uilib-color-info-600' },
  ];

  public readonly colorValues = signal<Record<string, string>>({});

  public readonly headingFont = signal<string>(
    this.readCssVar('--uilib-font-heading', "'Inter', sans-serif")
  );
  public readonly bodyFont = signal<string>(
    this.readCssVar('--uilib-font-body', "'Inter', sans-serif")
  );

  public readonly savedPresets = computed<ThemePreset[]>((): ThemePreset[] =>
    this.presetService.presets()
  );

  constructor() {
    this.refreshColors();
  }

  public togglePanel(): void {
    if (this.embedded()) {
      return;
    }
    this.isOpen.update((v: boolean): boolean => !v);
  }

  public closePanel(): void {
    if (this.embedded()) {
      return;
    }
    this.isOpen.set(false);
  }

  public setVariant(value: ThemeVariant): void {
    this.themeConfig.setVariant(value);
  }

  public setShape(value: ThemeShape): void {
    this.themeConfig.setShape(value);
  }

  public setDensity(value: ThemeDensity): void {
    this.themeConfig.setDensity(value);
  }

  public setMode(value: ThemeMode): void {
    this.themeConfig.setMode(value);
  }

  public applyColor(key: string, value: string): void {
    this.editorService.applyColorChange(key, value);
    this.colorValues.update(
      (state: Record<string, string>): Record<string, string> => ({
        ...state,
        [key]: value,
      })
    );
  }

  public resetColor(key: string): void {
    this.editorService.resetColor(key);
    this.colorValues.update(
      (state: Record<string, string>): Record<string, string> => ({
        ...state,
        [key]: this.readColor(key),
      })
    );
  }

  public onHexChange(key: string, value: string): void {
    this.applyColor(key, value);
  }

  public onSwatchChange(key: string, value: string): void {
    this.applyColor(key, value);
  }

  public onHeadingBlur(value: string): void {
    this.applyFont('heading', value);
    this.headingFont.set(value);
  }

  public onBodyBlur(value: string): void {
    this.applyFont('body', value);
    this.bodyFont.set(value);
  }

  public applyPreset(preset: ThemePreset): void {
    this.presetService.applyPreset(preset);
    this.themeConfig.setVariant(preset.variant);
    this.themeConfig.setShape(preset.shape);
    this.themeConfig.setDensity(preset.density);
    this.themeConfig.setMode(preset.darkMode);
    this.headingFont.set(this.readCssVar('--uilib-font-heading', this.headingFont()));
    this.bodyFont.set(this.readCssVar('--uilib-font-body', this.bodyFont()));
    this.refreshColors();
  }

  public deletePreset(id: string): void {
    this.presetService.deletePreset(id);
  }

  public savePreset(): void {
    const name = window.prompt('Preset name');
    if (!name) {
      return;
    }
    this.editorService.saveAsPreset(name.trim());
  }

  public exportJson(): void {
    const preset = this.presetService.captureCurrentTheme('export');
    this.presetService.exportAsJson(preset);
  }

  public async copyCss(): Promise<void> {
    const preset = this.presetService.captureCurrentTheme('export');
    const css = this.presetService.exportAsCss(preset);
    try {
      await navigator.clipboard.writeText(css);
      return;
    } catch {
      // Fallback to textarea copy.
    }
    const textarea = document.createElement('textarea');
    textarea.value = css;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  private refreshColors(): void {
    const values: Record<string, string> = {};
    this.colors.forEach((color: ColorOption): void => {
      values[color.key] = this.readColor(color.key);
    });
    this.colorValues.set(values);
  }

  private readColor(key: string): string {
    const def = this.colors.find((color: ColorOption): boolean => color.key === key);
    if (!def) {
      return '#000000';
    }
    return this.readCssVar(def.cssVar, '#000000');
  }

  private readCssVar(name: string, fallback: string): string {
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    return value || fallback;
  }

  private applyFont(type: 'heading' | 'body', value: string): void {
    const family = this.extractFontFamily(value);
    if (family) {
      this.ensureGoogleFontLoaded(family);
    }
    const cssVar = type === 'heading' ? '--uilib-font-heading' : '--uilib-font-body';
    document.documentElement.style.setProperty(cssVar, value);
    if (type === 'body') {
      document.documentElement.style.setProperty('--uilib-font-ui', value);
    }
  }

  private extractFontFamily(value: string): string | null {
    const match = value.match(/'([^']+)'/);
    if (match) {
      return match[1] ?? null;
    }

    return null;
  }

  private ensureGoogleFontLoaded(family: string): void {
    const id = `theme-editor-font-${family.replace(/\s+/g, '-')}`;
    if (document.getElementById(id)) {
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }
}
