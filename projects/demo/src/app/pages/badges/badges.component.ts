import { Component, ChangeDetectionStrategy, ViewChild, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Badge } from 'ui-lib-custom/badge';
import type { BadgeColor, BadgeVariant, BadgeSize } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { VariantComparisonComponent } from '@demo/shared/components/variant-comparison/variant-comparison.component';
import { BadgeBasicExampleComponent } from '@demo/examples/badge-basic-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { badgeExampleHtml, badgeExampleTs, usageHtml, usageTs } from './snippets.generated';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

/**
 * Demo page for badge variants and usage.
 */
@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [
    Panel,
    Badge,
    Button,
    Tabs,
    Tab,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    FormsModule,
    VariantComparisonComponent,
    BadgeBasicExampleComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,

    DocSectionComponent,
  ],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
  public readonly badgeExampleHtml: string = badgeExampleHtml;
  public readonly badgeExampleTs: string = badgeExampleTs;
  public readonly usageHtml: string = usageHtml;
  public readonly usageTs: string = usageTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Badge } from 'ui-lib-custom/badge'";

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

  public readonly variant: WritableSignal<BadgeVariant> = signal<BadgeVariant>('solid');
  public readonly color: WritableSignal<BadgeColor> = signal<BadgeColor>('primary');
  public readonly size: WritableSignal<BadgeSize> = signal<BadgeSize>('md');
  public readonly pill: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dot: WritableSignal<boolean> = signal<boolean>(false);
  public readonly text: WritableSignal<string> = signal<string>('New');

  public readonly variants: BadgeVariant[] = ['solid', 'outline', 'subtle'];
  public readonly colors: BadgeColor[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'neutral',
  ];
  public readonly sizes: BadgeSize[] = ['sm', 'md', 'lg'];

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
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-badge-bg-resolved', description: 'Bg Resolved.' },
    { variable: '--uilib-badge-bg-subtle-resolved', description: 'Bg Subtle Resolved.' },
    { variable: '--uilib-badge-bg-outline-resolved', description: 'Bg Outline Resolved.' },
    { variable: '--uilib-badge-fg-resolved', description: 'Fg Resolved.' },
    { variable: '--uilib-badge-border-color-resolved', description: 'Border Color Resolved.' },
    { variable: '--uilib-badge-border-width-resolved', description: 'Border Width Resolved.' },
    { variable: '--uilib-badge-radius-resolved', description: 'Radius Resolved.' },
    { variable: '--uilib-badge-gap-resolved', description: 'Gap Resolved.' },
    { variable: '--uilib-badge-font-size-resolved', description: 'Font Size Resolved.' },
    { variable: '--uilib-badge-padding-y-base', description: 'Padding Y Base.' },
    { variable: '--uilib-badge-padding-x-base', description: 'Padding X Base.' },
    { variable: '--uilib-badge-padding-y-resolved', description: 'Padding Y Resolved.' },
    { variable: '--uilib-badge-padding-x-resolved', description: 'Padding X Resolved.' },
    { variable: '--uilib-badge-dot-size', description: 'Dot size.' },
    { variable: '--uilib-badge-bg', description: 'Background colour.' },
    { variable: '--uilib-badge-bg-subtle', description: 'Bg Subtle.' },
    { variable: '--uilib-badge-fg', description: 'Fg.' },
    { variable: '--uilib-badge-border', description: 'Border shorthand.' },
  ];
}
