import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  effect,
  ViewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-lib-custom/button';
import type {
  ButtonAppearance,
  ButtonColor,
  ButtonSeverity,
  ButtonSize,
  ButtonVariant,
  IconPosition,
} from 'ui-lib-custom/button';
import { BUTTON_COLORS } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Inline, Stack, Grid } from 'ui-lib-custom/layout';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { ButtonGroup } from 'ui-lib-custom';
import { IconButton } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { FormsModule } from '@angular/forms';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { ButtonBasicExampleComponent } from '@demo/examples/button-basic-example.component';

type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'examples'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

/**
 * Demo page for button variants and APIs.
 */
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
    ButtonBasicExampleComponent,
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

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets: { readonly usage: string } = {
    usage: `import { Button } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Button],
  template: '<ui-lib-button color="primary">Click me</ui-lib-button>'
})
export class Example {}`,
  } as const;

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly variant: WritableSignal<ButtonVariant> = signal<ButtonVariant>('material');
  public readonly appearance: WritableSignal<ButtonAppearance> = signal<ButtonAppearance>('solid');
  public readonly size: WritableSignal<ButtonSize> = signal<ButtonSize>('medium');
  public readonly color: WritableSignal<ButtonColor> = signal<ButtonColor>('primary');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly fullWidth: WritableSignal<boolean> = signal<boolean>(false);
  public readonly iconPosition: WritableSignal<IconPosition> = signal<IconPosition>('left');
  public readonly label: WritableSignal<string> = signal<string>('Click me');

  public readonly useGlobalVariant: WritableSignal<boolean> = signal<boolean>(true);
  public readonly useLocalTheme: WritableSignal<boolean> = signal<boolean>(false);
  public readonly localPrimary: WritableSignal<string> = signal<string>('');
  public readonly localSurface: WritableSignal<string> = signal<string>('');

  public readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];
  public readonly sizes: ButtonSize[] = ['small', 'medium', 'large'];
  public readonly colors: ButtonColor[] = [...BUTTON_COLORS];
  public readonly severities: ButtonSeverity[] = [...BUTTON_COLORS];
  public readonly iconPositions: IconPosition[] = ['left', 'right', 'top', 'bottom'];
  public readonly demoIcon: WritableSignal<string> = signal<string>('search');

  private readonly globalVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const preset: ReturnType<ThemeConfigService['preset']> = this.themeService.preset();
      return this.themeService.getCssVars(preset);
    }
  );
  private readonly localVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
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
    }
  );

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const base: Record<string, string> = this.globalVars();
      if (!this.useLocalTheme()) return base;
      return { ...base, ...this.localVars() };
    }
  );

  constructor() {
    effect((): void => {
      if (!this.useGlobalVariant()) return;
      const v: ButtonVariant = this.themeService.preset().variant as ButtonVariant;
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
      const v: ButtonVariant = this.themeService.preset().variant as ButtonVariant;
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

  public readonly buttonExample: string = `<ui-lib-button color="primary">Primary Button</ui-lib-button>`;
}
