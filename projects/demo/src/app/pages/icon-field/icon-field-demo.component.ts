import { CommonModule } from '@angular/common';
import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { Icon } from 'ui-lib-custom/icon';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';
import { UiLibInput } from 'ui-lib-custom/input';
import { Panel } from 'ui-lib-custom/panel';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import {
  basicHtml,
  basicTs,
  floatLabelHtml,
  floatLabelTs,
  sizesHtml,
  sizesTs,
  templateHtml,
  templateTs,
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
    DocSectionComponent,
    DocCssVarsTableComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
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
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-icon-field-icon-size', description: 'Icon size.' },
    {
      variable: '--uilib-icon-field-input-padding-with-icon',
      description: 'Input Padding With Icon.',
    },
    { variable: '--uilib-float-label-position-x', description: 'Uilib Float Label Position X.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Icon (<ui-lib-input-icon>)',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes:
        'Icons inside the field are purely decorative and are hidden from assistive technologies.',
    },
    {
      element: 'Host input',
      attribute: '(none added)',
      value: '—',
      notes:
        'The wrapper does not add ARIA attributes to the input. Associate the input with a visible <code>&lt;label&gt;</code> or provide <code>aria-label</code> / <code>aria-labelledby</code>.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the wrapped input.' },
    { key: 'Shift + Tab', action: 'Moves focus away from the wrapped input.' },
  ];
}
