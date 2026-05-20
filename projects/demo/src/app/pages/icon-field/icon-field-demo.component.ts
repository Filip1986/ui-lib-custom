import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { Icon } from 'ui-lib-custom/icon';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';
import { UiLibInput } from 'ui-lib-custom/input';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import {
  basicHtml,
  basicTs,
  templateHtml,
  templateTs,
  floatLabelHtml,
  floatLabelTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
} from './snippets.generated';

/**
 * Demo page for IconField and InputIcon composition patterns.
 */
@Component({
  selector: 'app-icon-field-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    UiLibInput,
    Icon,
    DocCodeExampleComponent,
    IconFieldComponent,
    InputIconComponent,
    FloatLabelComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './icon-field-demo.component.html',
  styleUrl: './icon-field-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFieldDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly templateHtml: string = templateHtml;
  public readonly templateTs: string = templateTs;
  public readonly floatLabelHtml: string = floatLabelHtml;
  public readonly floatLabelTs: string = floatLabelTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;

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

  public readonly importCode: string =
    "import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'template', label: 'Template' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'iconPosition',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Icon position relative to the input.',
    },
  ];

  public basicSearchValue: string = '';
  public basicLoadingValue: string = '';

  public templateSvgValue: string = '';
  public templateUiLibIconValue: string = '';

  public floatOverValue: string = '';
  public floatInValue: string = '';
  public floatOnValue: string = '';

  public sizeSmallValue: string = '';
  public sizeMediumValue: string = '';
  public sizeLargeValue: string = '';

  public variantMaterialValue: string = '';
  public variantBootstrapValue: string = '';
  public variantMinimalValue: string = '';
}
