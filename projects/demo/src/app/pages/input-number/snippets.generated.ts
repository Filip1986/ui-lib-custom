/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const buttonsHorizontalTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './buttons-horizontal-ts.example.html',
})
export class MyComponent {
  horizontalAmount: number | null = 800;
}`;

export const buttonsHorizontalHtml = `<ui-lib-input-number
  [(ngModel)]="horizontalAmount"
  mode="currency"
  currency="EUR"
  locale="de-DE"
  [showButtons]="true"
  buttonLayout="horizontal"
/>`;

export const buttonsStackedTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './buttons-stacked-ts.example.html',
})
export class MyComponent {
  stackedAmount: number | null = 1200;
}`;

export const buttonsStackedHtml = `<ui-lib-input-number
  [(ngModel)]="stackedAmount"
  mode="currency"
  currency="USD"
  [showButtons]="true"
/>`;

export const buttonsVerticalTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './buttons-vertical-ts.example.html',
})
export class MyComponent {
  verticalAmount: number | null = 10;
}`;

export const buttonsVerticalHtml = `<ui-lib-input-number
  [(ngModel)]="verticalAmount"
  [showButtons]="true"
  buttonLayout="vertical"
/>`;

export const clearIconTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './clear-icon-ts.example.html',
})
export class MyComponent {
  clearableValue: number | null = 99;
}`;

export const clearIconHtml = `<ui-lib-input-number
  [(ngModel)]="clearableValue"
  [showClear]="true"
  [showButtons]="true"
/>`;

export const currencyTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './currency-ts.example.html',
})
export class MyComponent {
  currencyValues = { usd: 1499.5, eur: 1499.5, inr: 1499.5, jpy: 1499 };
}`;

export const currencyHtml = `<ui-lib-input-number [(ngModel)]="currencyValues.usd" mode="currency" currency="USD" />
<ui-lib-input-number [(ngModel)]="currencyValues.eur" mode="currency" currency="EUR" locale="de-DE" />
<ui-lib-input-number [(ngModel)]="currencyValues.inr" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" />
<ui-lib-input-number [(ngModel)]="currencyValues.jpy" mode="currency" currency="JPY" locale="ja-JP" />`;

export const decimalTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './decimal-ts.example.html',
})
export class MyComponent {
  decimalValue: number | null = 42.5;
}`;

export const decimalHtml = `<ui-lib-input-number
  [(ngModel)]="decimalValue"
  [minFractionDigits]="2"
  [maxFractionDigits]="4"
  placeholder="0.00"
/>`;

export const disabledInvalidTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './disabled-invalid-ts.example.html',
})
export class MyComponent {
  disabledValue: number | null = 50;
  invalidValue: number | null = null;
}`;

export const disabledInvalidHtml = `<ui-lib-input-number [(ngModel)]="disabledValue" [disabled]="true" />
<ui-lib-input-number [(ngModel)]="invalidValue" [invalid]="true" />`;

export const filledTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './filled-ts.example.html',
})
export class MyComponent {
  filledValue: number | null = 64;
}`;

export const filledHtml = `<ui-lib-input-number [(ngModel)]="filledValue" [filled]="true" [showClear]="true" />`;

export const floatLabelTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FloatLabelComponent, FormsModule],
  templateUrl: './float-label-ts.example.html',
})
export class MyComponent {
  floatValues = { over: 100, in: 200, on: 300 };
}`;

export const floatLabelHtml = `<ui-lib-float-label variant="over">
  <ui-lib-input-number [(ngModel)]="floatValues.over" inputId="float-over" />
  <label for="float-over">Over</label>
</ui-lib-float-label>
<ui-lib-float-label variant="in">
  <ui-lib-input-number [(ngModel)]="floatValues.in" inputId="float-in" />
  <label for="float-in">In</label>
</ui-lib-float-label>
<ui-lib-float-label variant="on">
  <ui-lib-input-number [(ngModel)]="floatValues.on" inputId="float-on" />
  <label for="float-on">On</label>
</ui-lib-float-label>`;

export const fluidTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './fluid-ts.example.html',
})
export class MyComponent {
  fluidValue: number | null = 500;
}`;

export const fluidHtml = `<ui-lib-input-number
  [(ngModel)]="fluidValue"
  [fluid]="true"
  [showButtons]="true"
  buttonLayout="horizontal"
/>`;

export const localeTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './locale-ts.example.html',
})
export class MyComponent {
  localeValues = { enUS: 1234567.89, deDE: 1234567.89, enIN: 1234567.89, jpJP: 1234567.89 };
}`;

export const localeHtml = `<ui-lib-input-number [(ngModel)]="localeValues.enUS" locale="en-US" />
<ui-lib-input-number [(ngModel)]="localeValues.deDE" locale="de-DE" />
<ui-lib-input-number [(ngModel)]="localeValues.enIN" locale="en-IN" />
<ui-lib-input-number [(ngModel)]="localeValues.jpJP" locale="jp-JP" />`;

export const minMaxTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './min-max-ts.example.html',
})
export class MyComponent {
  boundedValue: number | null = 40;
}`;

export const minMaxHtml = `<ui-lib-input-number
  [(ngModel)]="boundedValue"
  [min]="0"
  [max]="100"
  [showButtons]="true"
/>`;

export const numeralsTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './numerals-ts.example.html',
})
export class MyComponent {
  quantity: number | null = 1234;
}`;

export const numeralsHtml = `<ui-lib-input-number [(ngModel)]="quantity" placeholder="Enter quantity" />`;

export const prefixSuffixTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './prefix-suffix-ts.example.html',
})
export class MyComponent {
  distanceMiles: number | null = 120;
  completionPercent: number | null = 88;
  expiresInDays: number | null = 45;
  temperature: number | null = 22;
}`;

export const prefixSuffixHtml = `<ui-lib-input-number [(ngModel)]="distanceMiles" suffix=" mi" />
<ui-lib-input-number [(ngModel)]="completionPercent" suffix=" %" />
<ui-lib-input-number [(ngModel)]="expiresInDays" prefix="Expires in " suffix=" days" />
<ui-lib-input-number [(ngModel)]="temperature" suffix=" °C" />`;

export const reactiveTsTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputNumberComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive-ts.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(1000)],
    }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-input-number formControlName="amount" [min]="0" [max]="1000" [showButtons]="true" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`;

export const sizesTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {
  sizeValues = { sm: 10, md: 20, lg: 30 };
}`;

export const sizesHtml = `<ui-lib-input-number [(ngModel)]="sizeValues.sm" size="sm" />
<ui-lib-input-number [(ngModel)]="sizeValues.md" size="md" />
<ui-lib-input-number [(ngModel)]="sizeValues.lg" size="lg" />`;

export const stepTsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './step-ts.example.html',
})
export class MyComponent {
  stepValue: number | null = 1.5;
}`;

export const stepHtml = `<ui-lib-input-number [(ngModel)]="stepValue" [step]="0.25" />`;
