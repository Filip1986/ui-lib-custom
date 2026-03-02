import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  effect,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button,
  ButtonAppearance,
  ButtonColor,
  ButtonSeverity,
  ButtonSize,
  ButtonVariant,
  Card,
  Inline,
  Stack,
  IconButton,
  IconPosition,
  ThemeConfigService,
  Tabs,
  Tab,
  TabsValue,
  ButtonGroup,
  Grid,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { FormsModule } from '@angular/forms';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'examples'
  | 'accessibility';
type ViewportPreset = { key: string; label: string; width: number; height: number };

@Component({
  selector: 'app-buttons',
  imports: [
    CommonModule,
    Tabs,
    Tab,
    Button,
    ButtonGroup,
    Grid,
    IconButton,
    Inline,
    Stack,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    Card,
    FormsModule,
    DocCodeSnippetComponent,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'examples', label: 'Examples' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly activeTab = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets = {
    usage: `import { Button } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Button],
  template: '<ui-lib-button color="primary">Click me</ui-lib-button>'
})
export class Example {}`,
  } as const;

  private readonly themeService = inject(ThemeConfigService);

  public readonly variant = signal<ButtonVariant>('material');
  public readonly appearance = signal<ButtonAppearance>('solid');
  public readonly size = signal<ButtonSize>('medium');
  public readonly color = signal<ButtonColor>('primary');
  public readonly disabled = signal(false);
  public readonly loading = signal(false);
  public readonly fullWidth = signal(false);
  public readonly iconPosition = signal<IconPosition>('left');
  public readonly label = signal('Click me');

  public readonly useGlobalVariant = signal(true);
  public readonly useLocalTheme = signal(false);
  public readonly localPrimary = signal('');
  public readonly localSurface = signal('');

  public readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];
  public readonly sizes: ButtonSize[] = ['small', 'medium', 'large'];
  public readonly colors: ButtonColor[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'help',
    'danger',
    'contrast',
  ];
  public readonly severities: ButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'help',
    'danger',
    'contrast',
  ];
  public readonly iconPositions: IconPosition[] = ['left', 'right', 'top', 'bottom'];
  public readonly demoIcon = signal('search');

  private readonly globalVars = computed<Record<string, string>>((): Record<string, string> => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });
  private readonly localVars = computed<Record<string, string>>((): Record<string, string> => {
    const vars: Record<string, string> = {};
    if (this.localPrimary().trim()) {
      vars['--uilib-button-primary-bg'] = this.localPrimary().trim();
      vars['--uilib-button-primary-bg-hover'] = this.localPrimary().trim();
      vars['--uilib-button-primary-bg-active'] = this.localPrimary().trim();
    }
    if (this.localSurface().trim()) {
      vars['--uilib-card-bg'] = this.localSurface().trim();
      vars['--uilib-surface'] = this.localSurface().trim();
    }
    return vars;
  });

  public readonly appliedTheme = computed<Record<string, string>>((): Record<string, string> => {
    const base = this.globalVars();
    if (!this.useLocalTheme()) return base;
    return { ...base, ...this.localVars() };
  });

  constructor() {
    effect((): void => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as ButtonVariant;
      this.variant.set(v);
    });
  }

  public resetLocalTheme(): void {
    this.localPrimary.set('');
    this.localSurface.set('');
  }

  public selectVariant(v: ButtonVariant): void {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  public setFollowThemeVariant(on: boolean): void {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as ButtonVariant;
      this.variant.set(v);
    }
  }

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  public viewportDisplayWidth(): number {
    return this.viewport?.displayWidth() ?? 0;
  }

  public viewportDisplayHeight(): number {
    return this.viewport?.displayHeight() ?? 0;
  }

  public viewportCustomWidth(): number {
    return this.viewport?.customWidth() ?? 0;
  }

  public setViewportCustomWidth(value: number): void {
    this.viewport?.setCustomWidth(value);
  }

  public setViewportPreset(preset: ViewportPreset): void {
    this.viewport?.setPreset(preset);
  }

  public applyViewportCustom(): void {
    this.viewport?.setCustom();
  }

  public rotateViewport(): void {
    this.viewport?.rotate();
  }

  public setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.viewport?.setDensity(value);
  }

  public readonly buttonExample = `<ui-lib-button color="primary">Primary Button</ui-lib-button>`;
}
