import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService, ThemePreset, ThemePresetColors, ThemeVariant, SHADOWS } from 'ui-lib-custom';
import { GoogleFontsService } from './google-fonts.service';

interface SelectOption<T> {
  label: string;
  value: T;
}

const GOOGLE_FONTS_API_KEY = 'AIzaSyDarBrNj_ISn3VSURsfzSLmhVhnbHZ_CcU';

@Component({
  selector: 'app-theme-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-editor.component.html',
  styleUrl: './theme-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeEditorComponent {
  private readonly themeService = inject(ThemeConfigService);
  private readonly googleFonts = inject(GoogleFontsService);

  showPanel = signal(false);

  readonly presetNames = computed(() => Object.keys(this.themeService.listBuiltInPresets()));
  readonly currentPreset = computed(() => this.themeService.preset());

  readonly radiusOptions: SelectOption<string>[] = [
    { label: 'None', value: '0' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'XL', value: 'xl' }
  ];

  readonly variantOptions: SelectOption<ThemeVariant>[] = [
    { label: 'Material', value: 'material' },
    { label: 'Bootstrap', value: 'bootstrap' },
    { label: 'Minimal', value: 'minimal' },
  ];

  private readonly baseFontOptions: SelectOption<string>[] = [
    { label: 'Inter', value: "'Inter', 'Segoe UI', sans-serif" },
    { label: 'Segoe UI', value: "'Segoe UI', sans-serif" },
    { label: 'Roboto', value: "'Roboto', 'Segoe UI', sans-serif" },
    { label: 'System', value: "system-ui, -apple-system, 'Segoe UI', sans-serif" },
  ];

  readonly fontOptions = computed<SelectOption<string>[]>(() => {
    const google = this.googleFonts.fonts().map<SelectOption<string>>((family) => ({
      label: family,
      value: this.toFontValue(family),
    }));
    return [...this.baseFontOptions, ...google];
  });

  readonly colorKeys: (keyof ThemePresetColors)[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'background',
    'surface',
    'text',
  ];

  readonly shadowOptions: SelectOption<string>[] = [
    { label: 'none', value: 'none' },
    ...Object.keys(SHADOWS as Record<string, string>)
      .filter((key) => key.startsWith('shadow-'))
      .map((key) => ({ label: key, value: key })),
  ];

  onTogglePanel(): void {
    this.showPanel.update((v) => !v);
  }

  onPresetChange(name: string): void {
    const preset = this.themeService.listBuiltInPresets()[name];
    if (preset) {
      this.themeService.loadPreset(preset, { merge: false, apply: true, persist: true });
    }
  }

  onColorChange(key: keyof ThemePresetColors, value: string): void {
    this.themeService.loadPreset({ colors: { [key]: value } }, { merge: true, apply: true, persist: true });
  }

  onRadiusChange(value: string): void {
    this.themeService.loadPreset({ shape: { borderRadius: value, cardRadius: value, buttonRadius: value, inputRadius: value } }, { merge: true, apply: true, persist: true });
  }

  onVariantChange(value: ThemeVariant): void {
    this.themeService.loadPreset({ variant: value as ThemeVariant }, { merge: true, apply: true, persist: true });
  }

  onFontChange(value: string): void {
    this.ensureGoogleFontLoaded(value);
    this.themeService.loadPreset({ typography: { fontFamily: value } }, { merge: true, apply: true, persist: true });
  }

  onBaseSizeChange(value: number | string): void {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      this.themeService.loadPreset({ typography: { baseFontSize: `${numeric}px` } }, { merge: true, apply: true, persist: true });
    }
  }

  onShadowChange(value: string): void {
    const exists = (SHADOWS as Record<string, string>)[value];
    if (exists) {
      this.themeService.loadPreset({ shadow: value }, { merge: true, apply: true, persist: true });
    }
  }

  onCardShadowChange(value: string): void {
    const exists = (SHADOWS as Record<string, string>)[value] ?? (value === 'none' ? 'none' : undefined);
    if (exists !== undefined) {
      this.themeService.loadPreset({ cardShadow: value }, { merge: true, apply: true, persist: true });
    }
  }

  onCardShadowPreview(value: string): void {
    const exists = (SHADOWS as Record<string, string>)[value] ?? (value === 'none' ? 'none' : undefined);
    if (exists !== undefined) {
      this.themeService.loadPreset({ cardShadow: value }, { merge: true, apply: true, persist: false });
    }
  }

  onButtonShadowChange(value: string): void {
    const exists = (SHADOWS as Record<string, string>)[value] ?? (value === 'none' ? 'none' : undefined);
    if (exists !== undefined) {
      this.themeService.loadPreset({ buttonShadow: value }, { merge: true, apply: true, persist: true });
    }
  }

  onButtonShadowPreview(value: string): void {
    const exists = (SHADOWS as Record<string, string>)[value] ?? (value === 'none' ? 'none' : undefined);
    if (exists !== undefined) {
      this.themeService.loadPreset({ buttonShadow: value }, { merge: true, apply: true, persist: false });
    }
  }

  resetToDefault(): void {
    const base = this.themeService.listBuiltInPresets()['light'] as ThemePreset | undefined;
    if (base) {
      this.themeService.loadPreset(base, { merge: false, apply: true, persist: true });
    }
  }

  async exportTheme(): Promise<void> {
    const css = this.themeService.exportAsCSS();
    const json = this.themeService.exportAsJSON();
    await this.copyText(css);
    this.downloadJson(json, `theme-${this.currentPreset().name}.json`);
  }

  private async copyText(text: string): Promise<void> {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  private downloadJson(json: string, filename: string): void {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private toFontValue(family: string): string {
    return `'${family}', 'Segoe UI', sans-serif`;
  }

  private ensureGoogleFontLoaded(fontValue: string): void {
    const family = this.extractPrimaryFamily(fontValue);
    if (!family) return;
    if (!this.googleFonts.fonts().includes(family)) return; // only load link for google fonts

    const id = `google-font-${family.replace(/\s+/g, '-')}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }

  private extractPrimaryFamily(fontValue: string): string | null {
    const match = fontValue.match(/'([^']+)'/);
    if (match) return match[1];
    const first = fontValue.split(',')[0]?.trim();
    return first || null;
  }

  constructor() {
    effect(() => {
      this.googleFonts.loadFonts(GOOGLE_FONTS_API_KEY);
    });

    effect(() => {
      const current = this.currentPreset().typography.fontFamily;
      this.ensureGoogleFontLoaded(current);
    });
  }
}
