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
import { Button } from 'ui-lib-custom/button';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';
import { InputGroupAddonComponent, InputGroupComponent } from 'ui-lib-custom/input-group';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

import { Panel } from 'ui-lib-custom/panel';
interface InputGroupSizeItem {
  readonly label: string;
  readonly size: 'sm' | 'md' | 'lg';
  value: string;
}

type InputGroupDemoSnippetKey =
  | 'basic'
  | 'multiple'
  | 'button'
  | 'checkboxRadio'
  | 'floatLabel'
  | 'sizes';

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
    CodeSnippet,
    Checkbox,
    FloatLabelComponent,
    InputGroupComponent,
    InputGroupAddonComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './input-group-demo.component.html',
  styleUrl: './input-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupDemoComponent {
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
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: '(projection)',
      type: 'ng-content',
      description:
        'Project add-ons, buttons, or text before/after the input using the [prefix] and [suffix] slots.',
    },
  ];

  public readonly snippets: Record<InputGroupDemoSnippetKey, string> = {
    basic: `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
</uilib-input-group>`,
    multiple: `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Invoice amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
  <uilib-input-group-addon>USD</uilib-input-group-addon>
</uilib-input-group>`,
    button: `<uilib-input-group>
  <ui-lib-input placeholder="Search products" />
  <uilib-input-group-addon>
    <ui-lib-button appearance="solid" size="sm">Search</ui-lib-button>
  </uilib-input-group-addon>
</uilib-input-group>`,
    checkboxRadio: `<uilib-input-group>
  <uilib-input-group-addon>
    <ui-lib-checkbox [binary]="true" [(ngModel)]="acceptTerms" />
  </uilib-input-group-addon>
  <ui-lib-input placeholder="Accepted by" />
</uilib-input-group>

<uilib-input-group>
  <uilib-input-group-addon>
    <ui-lib-checkbox [binary]="true" [(ngModel)]="priorityOnly" />
  </uilib-input-group-addon>
  <ui-lib-input placeholder="Priority tag" />
  <uilib-input-group-addon>Only</uilib-input-group-addon>
</uilib-input-group>`,
    floatLabel: `<uilib-input-group>
  <uilib-input-group-addon>@</uilib-input-group-addon>
  <uilib-float-label variant="over">
    <ui-lib-input placeholder=" " [(ngModel)]="floatValues.over" />
    <label>Over label</label>
  </uilib-float-label>
</uilib-input-group>

<uilib-input-group>
  <uilib-input-group-addon>@</uilib-input-group-addon>
  <uilib-float-label variant="in">
    <ui-lib-input placeholder=" " [(ngModel)]="floatValues.in" />
    <label>In label</label>
  </uilib-float-label>
</uilib-input-group>

<uilib-input-group>
  <uilib-input-group-addon>@</uilib-input-group-addon>
  <uilib-float-label variant="on">
    <ui-lib-input placeholder=" " [(ngModel)]="floatValues.on" />
    <label>On label</label>
  </uilib-float-label>
</uilib-input-group>`,
    sizes: `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input size="sm" placeholder="Small" />
</uilib-input-group>

<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input size="md" placeholder="Medium" />
</uilib-input-group>

<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input size="lg" placeholder="Large" />
</uilib-input-group>`,
  };

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

  public snippet(key: InputGroupDemoSnippetKey): string {
    return this.snippets[key];
  }
}
