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
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

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
    DocApiReferenceComponent,
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

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'target',
      type: "'window' | 'parent'",
      default: "'window'",
      description: 'Scroll target: the window or the nearest scrollable parent.',
    },
    {
      name: 'threshold',
      type: 'number',
      default: '400',
      description: 'Scroll distance (px) before the button appears.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "'arrow-up'",
      description: 'Icon name for the button.',
    },
    {
      name: 'behavior',
      type: "'smooth' | 'instant' | 'auto'",
      default: "'smooth'",
      description: 'CSS scroll-behavior value.',
    },
  ];

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

  public readonly inputRows: readonly ApiPropRow[] = [
    {
      name: 'threshold',
      type: 'number',
      default: '400',
      description: 'Scroll distance (px) before the button becomes visible.',
    },
    {
      name: 'target',
      type: "'window' | 'parent'",
      default: "'window'",
      description: 'Scroll target: the global window or the immediate parent element.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "'pi pi-arrow-up'",
      description: 'CSS class(es) for the icon inside the button.',
    },
    {
      name: 'behavior',
      type: "'smooth' | 'auto'",
      default: "'smooth'",
      description: 'Native scroll-behavior applied when scrolling to top.',
    },
    {
      name: 'buttonAriaLabel',
      type: 'string',
      default: "'Scroll to top'",
      description: 'Accessible label for the button element.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Visual variant. Falls back to global ThemeConfigService when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes added to the host element.',
    },
  ];

  public readonly propertyRows: readonly ApiPropRow[] = [
    {
      name: 'isVisible',
      type: 'WritableSignal<boolean>',
      description: 'Whether the button is currently visible. You can set this manually.',
    },
  ];
}
