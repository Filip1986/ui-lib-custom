import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
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
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

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
    ImageCompare,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,

    DocSectionComponent,
    DocApiReferenceComponent,
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly position: WritableSignal<number> = signal<number>(50);

  // ─── Code snippets ────────────────────────────────────────────────────────────
  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'leftImage',
      type: 'string',
      default: "''",
      description: 'URL of the left (before) image.',
    },
    { name: 'leftAlt', type: 'string', default: "''", description: 'Alt text for the left image.' },
    {
      name: 'rightImage',
      type: 'string',
      default: "''",
      description: 'URL of the right (after) image.',
    },
    {
      name: 'rightAlt',
      type: 'string',
      default: "''",
      description: 'Alt text for the right image.',
    },
    {
      name: 'value (model)',
      type: 'number',
      default: '50',
      description: 'Slider position as a percentage (0–100). Supports two-way binding.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'When true, the slider cannot be moved.',
    },
    {
      name: 'variant',
      type: 'ImageCompareVariant | null',
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: 'ImageCompareSize',
      default: "'md'",
      description: 'Handle size token (sm / md / lg).',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on the host element.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Image comparison slider'",
      description: 'Accessible label for the slider handle.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'slideStart',
      type: 'number',
      description: 'Emitted with the current position when the user starts dragging.',
    },
    {
      name: 'slideEnd',
      type: 'number',
      description: 'Emitted with the final position when the user releases the handle.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-image-compare-radius', description: 'Border radius.' },
    { variable: '--uilib-image-compare-divider-width', description: 'Divider width.' },
    { variable: '--uilib-image-compare-divider-color', description: 'Divider text colour.' },
    { variable: '--uilib-image-compare-handle-size-sm', description: 'Handle size — sm.' },
    { variable: '--uilib-image-compare-handle-size-md', description: 'Handle size — md.' },
    { variable: '--uilib-image-compare-handle-size-lg', description: 'Handle size — lg.' },
    { variable: '--uilib-image-compare-handle-bg', description: 'Handle background colour.' },
    { variable: '--uilib-image-compare-handle-color', description: 'Handle text colour.' },
    { variable: '--uilib-image-compare-handle-shadow', description: 'Handle shadow.' },
    {
      variable: '--uilib-image-compare-handle-icon-size-sm',
      description: 'Handle Icon size — sm.',
    },
    {
      variable: '--uilib-image-compare-handle-icon-size-md',
      description: 'Handle Icon size — md.',
    },
    {
      variable: '--uilib-image-compare-handle-icon-size-lg',
      description: 'Handle Icon size — lg.',
    },
    { variable: '--uilib-image-compare-focus-ring', description: 'Focus ring.' },
  ];
}
