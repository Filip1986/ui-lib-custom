import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

/**
 * Demo page for the ScrollTop component.
 */
@Component({
  selector: 'app-scroll-top-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ScrollTop,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './scroll-top-demo.component.html',
  styleUrl: './scroll-top-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { ScrollTop } from 'ui-lib-custom/scroll-top'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'custom-threshold', label: 'Custom Threshold' },
    { id: 'parent-container-target', label: 'Parent Container Target' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'custom-icon', label: 'Custom Icon' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippetThreshold: string = `<ui-lib-scroll-top [threshold]="200" />`;
  public readonly snippetParentTarget: string = `<div style="height: 300px; overflow-y: auto; position: relative;">\n  <ui-lib-scroll-top target="parent" [threshold]="100" />\n  <!-- scrollable content -->\n</div>`;

  /** Items for the scrollable container demo. */
  public readonly dummyItems: number[] = Array.from(
    { length: 20 },
    (_: unknown, index: number): number => index + 1
  );

  /** Filler items to make the page tall enough to scroll. */
  public readonly fillerItems: number[] = Array.from(
    { length: 8 },
    (_: unknown, index: number): number => index + 1
  );
}
