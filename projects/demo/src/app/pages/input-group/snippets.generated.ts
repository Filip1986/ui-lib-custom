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

export const basicHtml = `<ui-lib-input-group>
  <ui-lib-input-group-addon>$</ui-lib-input-group-addon>
  <ui-lib-input placeholder="Amount" />
  <ui-lib-input-group-addon>.00</ui-lib-input-group-addon>
</ui-lib-input-group>`;

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

export const buttonHtml = `<ui-lib-input-group>
  <ui-lib-input placeholder="Search products" />
  <ui-lib-input-group-addon>
    <ui-lib-button appearance="solid" size="sm">Search</ui-lib-button>
  </ui-lib-input-group-addon>
</ui-lib-input-group>`;

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

export const checkboxRadioHtml = `<ui-lib-input-group>
  <ui-lib-input-group-addon>
    <ui-lib-checkbox [binary]="true" [(ngModel)]="acceptTerms" />
  </ui-lib-input-group-addon>
  <ui-lib-input placeholder="Accepted by" />
</ui-lib-input-group>

<ui-lib-input-group>
  <ui-lib-input-group-addon>
    <ui-lib-checkbox [binary]="true" [(ngModel)]="priorityOnly" />
  </ui-lib-input-group-addon>
  <ui-lib-input placeholder="Priority tag" />
  <ui-lib-input-group-addon>Only</ui-lib-input-group-addon>
</ui-lib-input-group>`;

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

export const floatLabelHtml = `<ui-lib-input-group>
  <ui-lib-input-group-addon>@</ui-lib-input-group-addon>
  <ui-lib-float-label variant="over">
    <ui-lib-input placeholder=" " [(ngModel)]="floatValues.over" />
    <label>Over label</label>
  </ui-lib-float-label>
</ui-lib-input-group>

<ui-lib-input-group>
  <ui-lib-input-group-addon>@</ui-lib-input-group-addon>
  <ui-lib-float-label variant="in">
    <ui-lib-input placeholder=" " [(ngModel)]="floatValues.in" />
    <label>In label</label>
  </ui-lib-float-label>
</ui-lib-input-group>

<ui-lib-input-group>
  <ui-lib-input-group-addon>@</ui-lib-input-group-addon>
  <ui-lib-float-label variant="on">
    <ui-lib-input placeholder=" " [(ngModel)]="floatValues.on" />
    <label>On label</label>
  </ui-lib-float-label>
</ui-lib-input-group>`;

export const multipleTsTs = `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './multiple-ts.example.html',
})
export class MyComponent {}`;

export const multipleHtml = `<ui-lib-input-group>
  <ui-lib-input-group-addon>$</ui-lib-input-group-addon>
  <ui-lib-input placeholder="Invoice amount" />
  <ui-lib-input-group-addon>.00</ui-lib-input-group-addon>
  <ui-lib-input-group-addon>USD</ui-lib-input-group-addon>
</ui-lib-input-group>`;

export const sizesTsTs = `import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {}`;

export const sizesHtml = `<ui-lib-input-group>
  <ui-lib-input-group-addon>$</ui-lib-input-group-addon>
  <ui-lib-input size="sm" placeholder="Small" />
</ui-lib-input-group>

<ui-lib-input-group>
  <ui-lib-input-group-addon>$</ui-lib-input-group-addon>
  <ui-lib-input size="md" placeholder="Medium" />
</ui-lib-input-group>

<ui-lib-input-group>
  <ui-lib-input-group-addon>$</ui-lib-input-group-addon>
  <ui-lib-input size="lg" placeholder="Large" />
</ui-lib-input-group>`;
