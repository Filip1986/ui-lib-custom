/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicTsTs = `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './basic-ts.example.html',
})
export class MyComponent {}`;

export const basicHtml = `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
</uilib-input-group>`;

export const buttonTsTs = `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, Button],
  templateUrl: './button-ts.example.html',
})
export class MyComponent {}`;

export const buttonHtml = `<uilib-input-group>
  <ui-lib-input placeholder="Search products" />
  <uilib-input-group-addon>
    <ui-lib-button appearance="solid" size="sm">Search</ui-lib-button>
  </uilib-input-group-addon>
</uilib-input-group>`;

export const checkboxRadioTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, Checkbox, FormsModule],
  templateUrl: './checkbox-radio-ts.example.html',
})
export class MyComponent {
  acceptTerms: boolean = false;
  priorityOnly: boolean = true;
}`;

export const checkboxRadioHtml = `<uilib-input-group>
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
</uilib-input-group>`;

export const floatLabelTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, FloatLabelComponent, FormsModule],
  templateUrl: './float-label-ts.example.html',
})
export class MyComponent {
  floatValues = { over: '', in: '', on: '' };
}`;

export const floatLabelHtml = `<uilib-input-group>
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
</uilib-input-group>`;

export const multipleTsTs = `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './multiple-ts.example.html',
})
export class MyComponent {}`;

export const multipleHtml = `<uilib-input-group>
  <uilib-input-group-addon>$</uilib-input-group-addon>
  <ui-lib-input placeholder="Invoice amount" />
  <uilib-input-group-addon>.00</uilib-input-group-addon>
  <uilib-input-group-addon>USD</uilib-input-group-addon>
</uilib-input-group>`;

export const sizesTsTs = `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {}`;

export const sizesHtml = `<uilib-input-group>
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
</uilib-input-group>`;
