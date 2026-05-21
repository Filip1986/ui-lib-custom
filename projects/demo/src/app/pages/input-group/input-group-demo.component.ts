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
import { Button } from 'ui-lib-custom/button';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';
import { InputGroupAddonComponent, InputGroupComponent } from 'ui-lib-custom/input-group';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTsTs,
  multipleHtml,
  multipleTsTs,
  buttonHtml,
  buttonTsTs,
  checkboxRadioHtml,
  checkboxRadioTsTs,
  floatLabelHtml,
  floatLabelTsTs,
  sizesHtml,
  sizesTsTs,
} from './snippets.generated';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
interface InputGroupSizeItem {
  readonly label: string;
  readonly size: 'sm' | 'md' | 'lg';
  value: string;
}

/**
 * Demo page for InputGroup and InputGroupAddon layout composition.
 */
@Component({
  selector: 'app-input-group-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    UiLibInput,
    Button,
    Checkbox,
    FloatLabelComponent,
    InputGroupComponent,
    InputGroupAddonComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './input-group-demo.component.html',
  styleUrl: './input-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTsTs: string = basicTsTs;
  public readonly multipleHtml: string = multipleHtml;
  public readonly multipleTsTs: string = multipleTsTs;
  public readonly buttonHtml: string = buttonHtml;
  public readonly buttonTsTs: string = buttonTsTs;
  public readonly checkboxRadioHtml: string = checkboxRadioHtml;
  public readonly checkboxRadioTsTs: string = checkboxRadioTsTs;
  public readonly floatLabelHtml: string = floatLabelHtml;
  public readonly floatLabelTsTs: string = floatLabelTsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTsTs: string = sizesTsTs;

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
    "import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'button', label: 'Button' },
    { id: 'checkbox-radio', label: 'Checkbox & Radio' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'sizes', label: 'Sizes' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public basicAmount: string = '';
  public multipleAmount: string = '';
  public searchQuery: string = '';
  public acceptTerms: boolean = false;
  public acceptedBy: string = '';
  public priorityOnly: boolean = true;
  public priorityTag: string = '';

  public readonly floatValues: { over: string; in: string; on: string } = {
    over: '',
    in: '',
    on: '',
  };

  public readonly sizeItems: InputGroupSizeItem[] = [
    { label: 'Small', size: 'sm', value: '' },
    { label: 'Medium', size: 'md', value: '' },
    { label: 'Large', size: 'lg', value: '' },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: '(no inputs)',
      type: '—',
      description:
        'InputGroup is a structural wrapper. Place uilib-input-group-addon and form controls as children.',
    },
  ];
}
