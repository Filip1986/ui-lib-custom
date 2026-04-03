import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';
import { InputGroupAddonComponent, InputGroupComponent } from 'ui-lib-custom/input-group';

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
    CommonModule,
    FormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    UiLibInput,
    Button,
    Checkbox,
    FloatLabelComponent,
    InputGroupComponent,
    InputGroupAddonComponent,
  ],
  templateUrl: './input-group-demo.component.html',
  styleUrl: './input-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'button', label: 'Button' },
    { id: 'checkbox-radio', label: 'Checkbox & Radio' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'sizes', label: 'Sizes' },
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
