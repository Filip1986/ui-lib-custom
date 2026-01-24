import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService, ThemePreset, ThemePresetColors, ThemeVariant } from 'ui-lib-custom';

interface SelectOption<T> {
  label: string;
  value: T;
}

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

  showPanel = signal(false);

  readonly presetNames = computed(() => Object.keys(this.themeService.listBuiltInPresets()));
  readonly currentPreset = computed(() => this.themeService.preset());

  readonly radiusOptions: SelectOption<string>[] = [
    { label: 'None', value: '0' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'XL', value: 'xl' },
    { label: 'Full', value: 'full' },
  ];

  readonly variantOptions: SelectOption<ThemeVariant>[] = [
    { label: 'Material', value: 'material' },
    { label: 'Bootstrap', value: 'bootstrap' },
    { label: 'Minimal', value: 'minimal' },
  ];

  readonly fontOptions: SelectOption<string>[] = [
    { label: 'Inter', value: "'Inter', 'Segoe UI', sans-serif" },
    { label: 'Segoe UI', value: "'Segoe UI', sans-serif" },
    { label: 'Roboto', value: "'Roboto', 'Segoe UI', sans-serif" },
    { label: 'System', value: "system-ui, -apple-system, 'Segoe UI', sans-serif" },
  ];

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
    this.themeService.loadPreset({ typography: { fontFamily: value } }, { merge: true, apply: true, persist: true });
  }

  onBaseSizeChange(value: number | string): void {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      this.themeService.loadPreset({ typography: { baseFontSize: `${numeric}px` } }, { merge: true, apply: true, persist: true });
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
}
