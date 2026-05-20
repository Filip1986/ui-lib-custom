import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { ImageCompare } from 'ui-lib-custom/image-compare';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import {
  basicHtml,
  basicTs,
  twoWayBindingHtml,
  twoWayBindingTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  disabledHtml,
  disabledTs,
  customLabelHtml,
  customLabelTs,
} from './snippets.generated';

/**
 * Demo page for the ImageCompare component.
 */
@Component({
  selector: 'app-image-compare-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    ImageCompare,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './image-compare-demo.component.html',
  styleUrl: './image-compare-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompareDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly twoWayBindingHtml: string = twoWayBindingHtml;
  public readonly twoWayBindingTs: string = twoWayBindingTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly customLabelHtml: string = customLabelHtml;
  public readonly customLabelTs: string = customLabelTs;

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
}
