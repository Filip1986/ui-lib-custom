import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the ScrollTop component.
 */
@Component({
  selector: 'app-scroll-top-demo',
  standalone: true,
  imports: [
    ScrollTop,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
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

  public readonly snippetThreshold: string = `<ui-lib-scroll-top [threshold]="200" />`;
  public readonly snippetThresholdTs: string = `import { Component } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';

@Component({
  standalone: true,
  imports: [ScrollTop],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly snippetParentTarget: string = `<div style="height: 300px; overflow-y: auto; position: relative;">\n  <ui-lib-scroll-top target="parent" [threshold]="100" />\n  <!-- scrollable content -->\n</div>`;
  public readonly snippetParentTargetTs: string = `import { Component } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';

@Component({
  standalone: true,
  imports: [ScrollTop],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;

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
      description: 'Scroll distance in pixels before the button becomes visible.',
    },
    {
      name: 'target',
      type: "'window' | 'parent'",
      default: "'window'",
      description: 'Scroll target.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "'pi pi-arrow-up'",
      description: 'CSS class for the scroll-up icon.',
    },
    {
      name: 'behavior',
      type: "'smooth' | 'auto'",
      default: "'smooth'",
      description: 'Scroll animation behaviour.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
  ];
  public readonly propertyRows: readonly ApiPropRow[] = [
    {
      name: 'scrollUp()',
      type: 'void',
      description: 'Programmatically triggers the scroll-to-top action.',
    },
  ];
}
