import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ProgressSpinner } from 'ui-lib-custom/progress-spinner';
import { Button } from 'ui-lib-custom/button';
import type { ProgressSpinnerSize, ProgressSpinnerVariant } from 'ui-lib-custom/progress-spinner';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the ProgressSpinner component.
 */
@Component({
  selector: 'app-progress-spinner-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ProgressSpinner,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './progress-spinner-demo.component.html',
  styleUrl: './progress-spinner-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerDemoComponent {
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

  public readonly importCode: string =
    "import { ProgressSpinner } from 'ui-lib-custom/progress-spinner'";
  public readonly snippetBasic: string = `<ui-lib-progress-spinner />`;
  public readonly snippetSizes: string = `<ui-lib-progress-spinner size="sm" />\n<ui-lib-progress-spinner size="md" />\n<ui-lib-progress-spinner size="lg" />`;
  public readonly snippetVariants: string = `<ui-lib-progress-spinner variant="material" />\n<ui-lib-progress-spinner variant="bootstrap" />\n<ui-lib-progress-spinner variant="minimal" />`;
  public readonly snippetAnimationDuration: string = `<ui-lib-progress-spinner animationDuration="4s" />\n<ui-lib-progress-spinner animationDuration="2s" />\n<ui-lib-progress-spinner animationDuration="750ms" />`;
  public readonly snippetStrokeWidth: string = `<ui-lib-progress-spinner strokeWidth="1" />\n<ui-lib-progress-spinner strokeWidth="4" />\n<ui-lib-progress-spinner strokeWidth="6" fill="#e0e7ff" />`;
  public readonly snippetLoadingOverlay: string = `<div class="loading-wrapper">\n  <div class="content">…</div>\n  <div class="overlay">\n    <ui-lib-progress-spinner size="lg" />\n  </div>\n</div>`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'animation-duration', label: 'Animation Duration' },
    { id: 'stroke-width-fill', label: 'Stroke Width & Fill' },
    { id: 'loading-overlay', label: 'Loading Overlay Pattern' },
    { id: 'playground', label: 'Playground' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'strokeWidth',
      type: 'string',
      default: "'2'",
      description: 'SVG stroke-width of the circle arc.',
    },
    {
      name: 'fill',
      type: 'string',
      default: "'none'",
      description: 'SVG fill colour of the circle interior.',
    },
    {
      name: 'animationDuration',
      type: 'string',
      default: "'2s'",
      description: 'Duration of one rotation/dash cycle. Accepts any CSS <time>.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size token controlling the overall diameter.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to global theme when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class(es) applied to the host element.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Loading...'",
      description: 'Screen-reader accessible label.',
    },
  ];

  // ---- Interactive controls -----------------------------------------------
  public readonly interactiveSize: WritableSignal<ProgressSpinnerSize> =
    signal<ProgressSpinnerSize>('md');

  public readonly interactiveVariant: WritableSignal<ProgressSpinnerVariant> =
    signal<ProgressSpinnerVariant>('material');

  public readonly interactiveDuration: WritableSignal<string> = signal<string>('2s');

  public readonly interactiveStrokeWidth: WritableSignal<string> = signal<string>('2');

  // ---- Helpers -------------------------------------------------------------
  public setSize(size: ProgressSpinnerSize): void {
    this.interactiveSize.set(size);
  }

  public setVariant(variant: ProgressSpinnerVariant): void {
    this.interactiveVariant.set(variant);
  }

  public setDuration(duration: string): void {
    this.interactiveDuration.set(duration);
  }

  public setStrokeWidth(width: string): void {
    this.interactiveStrokeWidth.set(width);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-progress-spinner-size-sm', description: 'Size — sm.' },
    { variable: '--uilib-progress-spinner-size-md', description: 'Size — md.' },
    { variable: '--uilib-progress-spinner-size-lg', description: 'Size — lg.' },
  ];
}
