import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService, ThemePreset, ThemePresetColors, ThemeVariant, SHADOWS } from 'ui-lib-custom';
import { GoogleFontsService } from './google-fonts.service';
import { FontPairingService } from './font-pairing.service';
import { IconEditorPanel } from './panels/icon-editor-panel';
import { IconPreview } from './icon-preview';

interface SelectOption<T> {
  label: string;
  value: T;
}

const GOOGLE_FONTS_API_KEY = 'AIzaSyDarBrNj_ISn3VSURsfzSLmhVhnbHZ_CcU';

@Component({
  selector: 'app-theme-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, IconEditorPanel, IconPreview],
  templateUrl: './theme-editor.component.html',
  styleUrl: './theme-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeEditorComponent {
  private readonly themeService = inject(ThemeConfigService);
  private readonly googleFonts = inject(GoogleFontsService);
  private readonly fontPairings = inject(FontPairingService);

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

  readonly headingFontOptions = computed<SelectOption<string>[]>(() =>
    this.combineFontOptions([
      this.googleFonts.displayFonts(),
      this.googleFonts.sansSerifFonts(),
    ]));

  readonly bodyFontOptions = computed<SelectOption<string>[]>(() =>
    this.combineFontOptions([
      this.googleFonts.serifFonts(),
      this.googleFonts.sansSerifFonts(),
    ]));

  readonly uiFontOptions = computed<SelectOption<string>[]>(() =>
    this.combineFontOptions([this.googleFonts.sansSerifFonts()]));

  readonly monoFontOptions = computed<SelectOption<string>[]>(() =>
    this.combineFontOptions([this.googleFonts.monospaceFonts()]));

  readonly fontOptions = computed<SelectOption<string>[]>(() => this.headingFontOptions()); // backward compatibility if needed

  readonly pairingOptions = computed(() => this.fontPairings.list());

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

  readonly syncUIWithBody = signal(true);

  readonly headingFont = computed(() => this.currentPreset().typography.fontHeading ?? this.currentPreset().typography.fontBody ?? this.currentPreset().typography.fontFamily);
  readonly bodyFont = computed(() => this.currentPreset().typography.fontBody ?? this.currentPreset().typography.fontFamily);
  readonly uiFont = computed(() => this.currentPreset().typography.fontUI ?? this.bodyFont() ?? this.currentPreset().typography.fontFamily);
  readonly monoFont = computed(() => this.currentPreset().typography.fontMonospace ?? "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace");
  readonly selectedPairing = signal<string>('');

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
    // Backward compat: set body/ui/heading together
    this.onBodyFontChange(value, { applyToUI: true, applyToHeading: true });
  }

  onHeadingFontChange(value: string): void {
    this.ensureGoogleFontLoaded(value);
    this.themeService.loadPreset({ typography: { fontHeading: value } }, { merge: true, apply: true, persist: true });
  }

  onBodyFontChange(value: string, opts?: { applyToUI?: boolean; applyToHeading?: boolean }): void {
    this.ensureGoogleFontLoaded(value);
    const patch: any = { fontBody: value };
    if (opts?.applyToUI || this.syncUIWithBody()) {
      patch.fontUI = value;
    }
    if (opts?.applyToHeading) {
      patch.fontHeading = value;
    }
    this.themeService.loadPreset({ typography: patch }, { merge: true, apply: true, persist: true });
  }

  onUIFontChange(value: string): void {
    this.ensureGoogleFontLoaded(value);
    this.themeService.loadPreset({ typography: { fontUI: value } }, { merge: true, apply: true, persist: true });
  }

  onMonoFontChange(value: string): void {
    this.ensureGoogleFontLoaded(value);
    this.themeService.loadPreset({ typography: { fontMonospace: value } }, { merge: true, apply: true, persist: true });
  }

  onPairingSelect(name: string): void {
    const pairing = this.fontPairings.findByName(name);
    if (!pairing) {
      this.selectedPairing.set('');
      return;
    }

    const heading = this.toFontValue(pairing.heading);
    const body = this.toFontValue(pairing.body);
    const ui = this.toFontValue(pairing.ui);
    const mono = this.toFontValue(pairing.mono);

    [heading, body, ui, mono].forEach((f) => this.ensureGoogleFontLoaded(f));
    this.selectedPairing.set(name);
    this.syncUIWithBody.set(ui === body);

    this.themeService.loadPreset({
      typography: {
        fontHeading: heading,
        fontBody: body,
        fontUI: ui,
        fontMonospace: mono,
      }
    }, { merge: true, apply: true, persist: true });
  }

  onSyncUIToggle(checked: boolean): void {
    this.syncUIWithBody.set(checked);
    if (checked) {
      this.onUIFontChange(this.bodyFont());
    }
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
    if (this.googleFonts.fonts().length && !this.googleFonts.fonts().includes(family)) return; // only skip if list is loaded and missing

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
      const current = this.currentPreset().typography;
      [
        current.fontFamily,
        current.fontHeading,
        current.fontBody,
        current.fontUI,
        current.fontMonospace,
      ].forEach((f) => f && this.ensureGoogleFontLoaded(f));
    });
  }

  private combineFontOptions(groups: string[][]): SelectOption<string>[] {
    const set = new Set<string>();
    const push = (value: string) => set.add(this.toFontValue(value));
    this.baseFontOptions.forEach((o) => push(this.extractPrimaryFamily(o.value) ?? o.value));
    groups.forEach((group) => group.forEach((f) => push(f)));
    return Array.from(set).map((value) => ({ label: this.extractPrimaryFamily(value) ?? value, value }));
  }
}
