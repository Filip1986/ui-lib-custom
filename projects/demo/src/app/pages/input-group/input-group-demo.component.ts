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
interface InputGroupSizeItem {
  readonly label: string;
  readonly size: 'sm' | 'md' | 'lg';
  value: string;
}

type InputGroupDemoSnippetKey =
  | 'basic'
  | 'basicTs'
  | 'multiple'
  | 'multipleTs'
  | 'button'
  | 'buttonTs'
  | 'checkboxRadio'
  | 'checkboxRadioTs'
  | 'floatLabel'
  | 'floatLabelTs'
  | 'sizes'
  | 'sizesTs';

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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<InputGroupDemoSnippetKey, string> = {
    basic: `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
</uilib-input-group>`,
    basicTs: `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    multiple: `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Invoice amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
  <uilib-input-group-addon>USD</uilib-input-group-addon>
</uilib-input-group>`,
    multipleTs: `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    button: `<uilib-input-group>
  <ui-lib-input placeholder="Search products" />
  <uilib-input-group-addon>
    <ui-lib-button appearance="solid" size="sm">Search</ui-lib-button>
  </uilib-input-group-addon>
</uilib-input-group>`,
    buttonTs: `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, Button],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
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
    checkboxRadioTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, Checkbox, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  acceptTerms: boolean = false;
  priorityOnly: boolean = true;
}`,
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
    floatLabelTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, FloatLabelComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  floatValues = { over: '', in: '', on: '' };
}`,
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
    sizesTs: `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: '(no inputs)',
      type: '—',
      description:
        'InputGroup is a structural wrapper. Place uilib-input-group-addon and form controls as children.',
    },
  ];
}
