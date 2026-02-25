import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ThemeConfigService,
  ThemePresetService,
  ThemePreset,
  ThemeVariant,
  Button,
  Card,
  Badge,
  UiLibInput,
  UiLibSelect,
  Checkbox,
  Tabs,
  Tab,
  Accordion,
  AccordionPanel,
} from 'ui-lib-custom';
import { ThemeEditorComponent } from '../../shared/theme-editor/theme-editor.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Card,
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
  private readonly route = inject(ActivatedRoute);
  private readonly presetService = inject(ThemePresetService);
  private readonly themeConfig = inject(ThemeConfigService);
  private readonly destroyRef = inject(DestroyRef);

  readonly presentMode = signal<boolean>(false);
  readonly shareNotice = signal<string>('');
  readonly variant = computed<ThemeVariant>(() => this.themeConfig.variant());

  readonly sizes = ['sm', 'md', 'lg'] as const;
  readonly variants: ThemeVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly severities = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const;

  readonly roles = [
    { label: 'Designer', value: 'designer' },
    { label: 'Engineer', value: 'engineer' },
    { label: 'Manager', value: 'manager' },
  ];

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const encoded = params.get('theme');
      if (!encoded) {
        return;
      }
      const preset = this.decodePreset(encoded);
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

  togglePresentMode(): void {
    this.presentMode.update((value: boolean) => !value);
  }

  async copyShareLink(): Promise<void> {
    const url: string = this.buildShareUrl();
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea: HTMLTextAreaElement = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    this.shareNotice.set('Link copied');
    setTimeout(() => this.shareNotice.set(''), 1500);
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
