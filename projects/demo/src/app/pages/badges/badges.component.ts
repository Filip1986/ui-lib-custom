import { Component, ChangeDetectionStrategy, ViewChild, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Badge } from 'ui-lib-custom/badge';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { BadgeColor, BadgeVariant, BadgeSize } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { BadgeBasicExampleComponent } from '@demo/examples/badge-basic-example.component';

import { Panel } from 'ui-lib-custom/panel';
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
    CodeSnippet,
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
    DocApiReferenceComponent,
  ],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
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

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to the global theme when null.',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'",
      default: "'primary'",
      description: 'Semantic color role of the badge.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Badge size.' },
    {
      name: 'pill',
      type: 'boolean',
      default: 'false',
      description: 'Applies full pill border-radius.',
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      description: 'Renders as a small dot indicator (no label).',
    },
    {
      name: 'decorative',
      type: 'boolean',
      default: 'false',
      description: 'Marks the badge as purely decorative (aria-hidden).',
    },
    {
      name: 'label',
      type: 'string | null',
      default: 'null',
      description: 'Text label displayed inside the badge.',
    },
  ];

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

  public readonly snippets: { readonly usage: string } = {
    usage: `import { Badge } from 'ui-lib-custom';

@Component({
  imports: [Badge],
  template: \
    '<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>'
})`,
  } as const;

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

  public readonly badgeExample: string = `<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>`;
}
