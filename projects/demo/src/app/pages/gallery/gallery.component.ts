import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeConfigService, ThemePresetService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Badge } from 'ui-lib-custom/badge';
import { UiLibInput } from 'ui-lib-custom/input';
import { UiLibSelect } from 'ui-lib-custom/select';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';
import { ThemeEditorComponent } from '../../shared/theme-editor/theme-editor.component';

/**
 * Demo gallery page highlighting multiple components.
 */
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    Button,
    Badge,
    UiLibInput,
    UiLibSelect,
    Checkbox,
    Tabs,
    Tab,
    Accordion,
    AccordionPanel,
    ThemeEditorComponent,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly presetService: ThemePresetService = inject(ThemePresetService);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public readonly presentMode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly shareNotice: WritableSignal<string> = signal<string>('');
  public readonly variant: Signal<ThemeVariant> = computed<ThemeVariant>(
    (): ThemeVariant => this.themeConfig.variant()
  );

  public readonly sizes: readonly ['sm', 'md', 'lg'] = ['sm', 'md', 'lg'];
  public readonly variants: ThemeVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly severities: readonly [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

  public readonly roles: { label: string; value: string }[] = [
    { label: 'Designer', value: 'designer' },
    { label: 'Engineer', value: 'engineer' },
    { label: 'Manager', value: 'manager' },
  ];

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: ParamMap): void => {
        const encoded: string | null = params.get('theme');
        if (!encoded) {
          return;
        }
        const preset: ThemePreset | null = this.decodePreset(encoded);
        if (!preset) {
          return;
        }
        this.presetService.applyPreset(preset);
        this.themeConfig.setVariant(preset.variant);
        this.themeConfig.setShape(preset.shape);
        this.themeConfig.setDensity(preset.density);
        this.themeConfig.setMode(preset.darkMode);
      });
  }

  public togglePresentMode(): void {
    this.presentMode.update((value: boolean): boolean => !value);
  }

  public async copyShareLink(): Promise<void> {
    const url: string = this.buildShareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea: HTMLTextAreaElement = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    this.shareNotice.set('Link copied');
    setTimeout((): void => this.shareNotice.set(''), 1500);
  }

  private buildShareUrl(): string {
    const preset: ThemePreset = this.presetService.captureCurrentTheme('shared');
    const json: string = JSON.stringify(preset);
    const encoded: string = this.base64Encode(json);
    const url: URL = new URL(window.location.href);
    url.searchParams.set('theme', encoded);
    return url.toString();
  }

  private base64Encode(value: string): string {
    const encoded: string = encodeURIComponent(value);
    return btoa(unescape(encoded));
  }

  private decodePreset(encoded: string): ThemePreset | null {
    try {
      const json: string = this.base64Decode(encoded);
      return this.presetService.importFromJson(json);
    } catch {
      return null;
    }
  }

  private base64Decode(value: string): string {
    const normalized: string = value.replace(/\s/g, '');
    const decoded: string = atob(normalized);
    return decodeURIComponent(escape(decoded));
  }
}
