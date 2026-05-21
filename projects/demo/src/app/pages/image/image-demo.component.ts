import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { Image } from 'ui-lib-custom/image';

import { Panel } from 'ui-lib-custom/panel';
import {
  basicHtml,
  basicTs,
  previewHtml,
  previewTs,
  customIndicatorHtml,
  customIndicatorTs,
  errorFallbackHtml,
  errorFallbackTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  customErrorHtml,
  customErrorTs,
  dimensionsHtml,
  dimensionsTs,
  twoWayBindingHtml,
  twoWayBindingTs,
} from './snippets.generated';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
/**
 * Demo page for the Image component.
 */
@Component({
  selector: 'app-image-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageLayoutComponent,
    DocTocComponent,
    Image,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,

    DocSectionComponent,
  ],
  templateUrl: './image-demo.component.html',
  styleUrl: './image-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly previewHtml: string = previewHtml;
  public readonly previewTs: string = previewTs;
  public readonly customIndicatorHtml: string = customIndicatorHtml;
  public readonly customIndicatorTs: string = customIndicatorTs;
  public readonly errorFallbackHtml: string = errorFallbackHtml;
  public readonly errorFallbackTs: string = errorFallbackTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly customErrorHtml: string = customErrorHtml;
  public readonly customErrorTs: string = customErrorTs;
  public readonly dimensionsHtml: string = dimensionsHtml;
  public readonly dimensionsTs: string = dimensionsTs;
  public readonly twoWayBindingHtml: string = twoWayBindingHtml;
  public readonly twoWayBindingTs: string = twoWayBindingTs;

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
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Image } from 'ui-lib-custom/image'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'preview', label: 'Preview' },
    { id: 'custom-indicator', label: 'Custom Indicator' },
    { id: 'error-fallback', label: 'Error Fallback' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'custom-error', label: 'Custom Error' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'two-way-binding', label: 'Two-Way Binding' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);

  // ─── Code snippets ────────────────────────────────────────────────────────────
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-image-radius', description: 'Border radius.' },
    { variable: '--uilib-image-indicator-bg', description: 'Indicator background colour.' },
    {
      variable: '--uilib-image-indicator-bg-hover',
      description: 'Indicator background colour (hover).',
    },
    { variable: '--uilib-image-indicator-color', description: 'Active indicator colour.' },
    { variable: '--uilib-image-indicator-icon-size-sm', description: 'Indicator Icon size — sm.' },
    { variable: '--uilib-image-indicator-icon-size-md', description: 'Indicator Icon size — md.' },
    { variable: '--uilib-image-indicator-icon-size-lg', description: 'Indicator Icon size — lg.' },
    { variable: '--uilib-image-mask-bg', description: 'Mask background colour.' },
    { variable: '--uilib-image-toolbar-bg', description: 'Toolbar background colour.' },
    { variable: '--uilib-image-toolbar-btn-bg', description: 'Toolbar Btn background colour.' },
    {
      variable: '--uilib-image-toolbar-btn-bg-hover',
      description: 'Toolbar Btn background colour (hover).',
    },
    { variable: '--uilib-image-toolbar-btn-color', description: 'Toolbar Btn text colour.' },
    {
      variable: '--uilib-image-toolbar-btn-color-disabled',
      description: 'Toolbar Btn text colour (disabled).',
    },
    { variable: '--uilib-image-toolbar-btn-size', description: 'Toolbar Btn size.' },
    { variable: '--uilib-image-toolbar-btn-icon-size', description: 'Toolbar Btn Icon size.' },
    { variable: '--uilib-image-toolbar-gap', description: 'Toolbar gap.' },
    { variable: '--uilib-image-toolbar-padding', description: 'Toolbar padding.' },
    { variable: '--uilib-image-error-bg', description: 'Error background colour.' },
    { variable: '--uilib-image-error-color', description: 'Error text colour.' },
    { variable: '--uilib-image-error-icon-size', description: 'Error Icon size.' },
    { variable: '--uilib-image-preview-transition', description: 'Preview transition.' },
  ];
}
