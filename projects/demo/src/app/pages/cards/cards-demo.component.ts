import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  signal,
  computed,
  inject,
  effect,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Card } from 'ui-lib-custom/card';
import type { CardVariant, CardElevation } from 'ui-lib-custom/card';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { Button } from 'ui-lib-custom/button';
import { SHADOWS } from 'ui-lib-custom/tokens';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { FormsModule } from '@angular/forms';
import { VariantComparisonComponent } from '@demo/shared/components/variant-comparison/variant-comparison.component';
import { CardBasicExampleComponent } from '@demo/examples/card-basic-example.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { cardExampleHtml, cardExampleTs, usageTs } from './snippets.generated';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';

type ShadowKey = string;
const SHADOW_MAP: Record<string, string> = SHADOWS as Record<string, string>;

type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

/**
 * Demo page for card variants and theming.
 */
@Component({
  selector: 'app-cards-demo',
  standalone: true,
  imports: [
    Card,
    Button,
    DocPageHeaderComponent,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    FormsModule,
    VariantComparisonComponent,
    CardBasicExampleComponent,
    ThemeScopeDirective,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,

    DocSectionComponent,
    DocAriaTableComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './cards-demo.component.html',
  styleUrl: './cards-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsDemoComponent {
  public readonly cardExampleHtml: string = cardExampleHtml;
  public readonly cardExampleTs: string = cardExampleTs;
  public readonly usageTs: string = usageTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Card } from 'ui-lib-custom/card'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Card host',
      attribute: 'role',
      value: '"article" (when semantic)',
      notes:
        'Add <code>role="article"</code> when each card represents a self-contained content unit.',
    },
    {
      element: 'Card header',
      attribute: 'aria-label',
      value: 'string',
      notes: 'Describe the card purpose when the header text alone is insufficient.',
    },
    {
      element: 'Interactive card',
      attribute: 'tabindex',
      value: '"0"',
      notes: 'Make the entire card focusable when it acts as a single interactive element.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly variant: WritableSignal<CardVariant> = signal<CardVariant>('material');
  public readonly elevation: WritableSignal<CardElevation> = signal<CardElevation>('medium');
  public readonly bordered: WritableSignal<boolean> = signal<boolean>(false);
  public readonly hoverable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly title: WritableSignal<string> = signal<string>('Card Title');
  public readonly body: WritableSignal<string> = signal<string>(
    'Cards can host arbitrary content and actions.',
  );
  public readonly showHeader: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showFooter: WritableSignal<boolean> = signal<boolean>(true);
  public readonly headerBg: WritableSignal<string> = signal<string>('');
  public readonly footerBg: WritableSignal<string> = signal<string>('');

  public readonly useGlobalVariant: WritableSignal<boolean> = signal<boolean>(true);
  public readonly variants: CardVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly elevations: CardElevation[] = ['none', 'low', 'medium', 'high'];

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly useLocalTheme: WritableSignal<boolean> = signal<boolean>(false);
  public readonly localSurface: WritableSignal<string> = signal<string>('');
  public readonly localBorder: WritableSignal<string> = signal<string>('');

  private readonly globalVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const preset: ReturnType<ThemeConfigService['preset']> = this.themeService.preset();
      return this.themeService.getCssVars(preset);
    },
  );
  private readonly localVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const vars: Record<string, string> = {};
      if (this.localSurface().trim()) {
        vars['--uilib-card-bg'] = this.localSurface().trim();
        vars['--uilib-surface'] = this.localSurface().trim();
        vars['--uilib-card-header-bg'] = this.localSurface().trim();
        vars['--uilib-card-footer-bg'] = this.localSurface().trim();
      }
      if (this.localBorder().trim()) {
        vars['--uilib-card-border'] = this.localBorder().trim();
      }
      return vars;
    },
  );

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const base: Record<string, string> = this.globalVars();
      if (!this.useLocalTheme()) return base;
      return { ...base, ...this.localVars() };
    },
  );

  public readonly shadowOptions: ShadowKey[] = Object.keys(SHADOW_MAP).filter(
    (key: string): boolean => key.startsWith('shadow-'),
  );
  public readonly globalShadow: Signal<string> = computed<string>(
    (): string =>
      SHADOW_MAP[
        this.themeService.preset().cardShadow ?? this.themeService.preset().shadow ?? ''
      ] ?? 'none',
  );
  public readonly selectedShadow: WritableSignal<ShadowKey> = signal<ShadowKey>(
    this.resolveShadowKey(
      this.themeService.preset().cardShadow ?? this.themeService.preset().shadow,
    ),
  );
  public readonly shadowValue: Signal<string> = computed<string>((): string =>
    this.useLocalTheme() ? (SHADOW_MAP[this.selectedShadow()] ?? 'none') : this.globalShadow(),
  );

  public setShadow(value: string): void {
    if (SHADOW_MAP[value]) {
      this.selectedShadow.set(value);
    }
  }

  private resolveShadowKey(value?: string): ShadowKey {
    return value && SHADOW_MAP[value] ? value : 'shadow-1';
  }

  constructor() {
    effect((): void => {
      if (!this.useGlobalVariant()) return;
      const v: CardVariant = this.themeService.preset().variant as CardVariant;
      this.variant.set(v);
    });
  }

  public resetLocalTheme(): void {
    this.localSurface.set('');
    this.localBorder.set('');
    this.headerBg.set('');
    this.footerBg.set('');
  }

  public selectVariant(v: CardVariant): void {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  public setFollowThemeVariant(on: boolean): void {
    this.useGlobalVariant.set(on);
    if (on) {
      const v: CardVariant = this.themeService.preset().variant as CardVariant;
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
  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Visual style of the card',
    },
    {
      name: 'elevation',
      type: "'none' | 'low' | 'medium' | 'high'",
      default: "'medium'",
      description: 'Shadow depth',
    },
    { name: 'bordered', type: 'boolean', default: 'false', description: 'Enable border' },
    { name: 'hoverable', type: 'boolean', default: 'false', description: 'Enable hover effect' },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-card-header-padding-y-base', description: 'Header Padding Y Base.' },
    { variable: '--uilib-card-header-padding-x-base', description: 'Header Padding X Base.' },
    { variable: '--uilib-card-body-padding-base', description: 'Body Padding Base.' },
    { variable: '--uilib-card-footer-padding-y-base', description: 'Footer Padding Y Base.' },
    { variable: '--uilib-card-footer-padding-x-base', description: 'Footer Padding X Base.' },
    { variable: '--uilib-card-header-padding', description: 'Header padding.' },
    { variable: '--uilib-card-body-padding', description: 'Body padding.' },
    { variable: '--uilib-card-footer-padding', description: 'Footer padding.' },
    { variable: '--uilib-card-border-width', description: 'Border width.' },
    { variable: '--uilib-card-shadow', description: 'Box shadow.' },
    { variable: '--uilib-card-shadow-hover', description: 'Box shadow (hover).' },
    { variable: '--uilib-card-radius', description: 'Border radius.' },
    { variable: '--uilib-card-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-card-footer-bg', description: 'Footer background colour.' },
    { variable: '--uilib-card-border', description: 'Border shorthand.' },
    { variable: '--uilib-card-bg', description: 'Background colour.' },
    { variable: '--uilib-card-text-color', description: 'Text text colour.' },
  ];
}
