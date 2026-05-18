import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { Card } from 'ui-lib-custom/card';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { ImageCompare } from 'ui-lib-custom/image-compare';

type SnippetKey = 'basic' | 'twoWayBinding' | 'sizes' | 'variants' | 'disabled' | 'customLabel';

/**
 * Demo page for the ImageCompare component.
 */
@Component({
  selector: 'app-image-compare-demo',
  standalone: true,
  imports: [
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Card,
    CodeSnippet,
    ImageCompare,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './image-compare-demo.component.html',
  styleUrl: './image-compare-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompareDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { ImageCompare } from 'ui-lib-custom/image-compare'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'two-way-binding', label: 'Two-Way Binding' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'custom-label', label: 'Custom Label' },
    { id: 'api', label: 'API' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly position: WritableSignal<number> = signal<number>(50);

  // ─── Code snippets ────────────────────────────────────────────────────────────

  private readonly snippets: Record<SnippetKey, string> = {
    basic: `<ui-lib-image-compare
  leftImage="https://picsum.photos/seed/before/800/400"
  leftAlt="Before"
  rightImage="https://picsum.photos/seed/after/800/400"
  rightAlt="After"
/>`,
    twoWayBinding: `<ui-lib-image-compare
  leftImage="https://picsum.photos/seed/before/800/400"
  leftAlt="Before"
  rightImage="https://picsum.photos/seed/after/800/400"
  rightAlt="After"
  [(value)]="position"
/>
<p>Position: {{ position() }}%</p>`,
    sizes: `<ui-lib-image-compare
  leftImage="..." rightImage="..."
  size="sm"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  size="md"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  size="lg"
/>`,
    variants: `<ui-lib-image-compare
  leftImage="..." rightImage="..."
  variant="material"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  variant="bootstrap"
/>
<ui-lib-image-compare
  leftImage="..." rightImage="..."
  variant="minimal"
/>`,
    disabled: `<ui-lib-image-compare
  leftImage="..."
  rightImage="..."
  [disabled]="true"
/>`,
    customLabel: `<ui-lib-image-compare
  leftImage="..."
  rightImage="..."
  ariaLabel="Compare photo filters"
/>`,
  };

  public snippet(key: SnippetKey): string {
    return this.snippets[key];
  }
}
