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
  buttonLayout="horizontal"
  currency="EUR"
  locale="de-DE"
  mode="currency"
  [showButtons]="true"
  [(ngModel)]="horizontalAmount"
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
  currency="USD"
  mode="currency"
  [showButtons]="true"
  [(ngModel)]="stackedAmount"
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

export const buttonsVerticalHtml = `<ui-lib-input-number buttonLayout="vertical" [showButtons]="true" [(ngModel)]="verticalAmount" />`;

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

export const clearIconHtml = `<ui-lib-input-number [showButtons]="true" [showClear]="true" [(ngModel)]="clearableValue" />`;

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

export const currencyHtml = `<ui-lib-input-number currency="USD" mode="currency" [(ngModel)]="currencyValues.usd" />
<ui-lib-input-number
  currency="EUR"
  locale="de-DE"
  mode="currency"
  [(ngModel)]="currencyValues.eur"
/>
<ui-lib-input-number
  currency="INR"
  currencyDisplay="code"
  locale="en-IN"
  mode="currency"
  [(ngModel)]="currencyValues.inr"
/>
<ui-lib-input-number
  currency="JPY"
  locale="ja-JP"
  mode="currency"
  [(ngModel)]="currencyValues.jpy"
/>`;

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
  placeholder="0.00"
  [maxFractionDigits]="4"
  [minFractionDigits]="2"
  [(ngModel)]="decimalValue"
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

export const disabledInvalidHtml = `<ui-lib-input-number [disabled]="true" [(ngModel)]="disabledValue" />
<ui-lib-input-number [invalid]="true" [(ngModel)]="invalidValue" />`;

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

export const filledHtml = `<ui-lib-input-number [filled]="true" [showClear]="true" [(ngModel)]="filledValue" />`;

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
  <ui-lib-input-number inputId="float-over" [(ngModel)]="floatValues.over" />
  <label for="float-over">Over</label>
</ui-lib-float-label>
<ui-lib-float-label variant="in">
  <ui-lib-input-number inputId="float-in" [(ngModel)]="floatValues.in" />
  <label for="float-in">In</label>
</ui-lib-float-label>
<ui-lib-float-label variant="on">
  <ui-lib-input-number inputId="float-on" [(ngModel)]="floatValues.on" />
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
  buttonLayout="horizontal"
  [fluid]="true"
  [showButtons]="true"
  [(ngModel)]="fluidValue"
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

export const localeHtml = `<ui-lib-input-number locale="en-US" [(ngModel)]="localeValues.enUS" />
<ui-lib-input-number locale="de-DE" [(ngModel)]="localeValues.deDE" />
<ui-lib-input-number locale="en-IN" [(ngModel)]="localeValues.enIN" />
<ui-lib-input-number locale="jp-JP" [(ngModel)]="localeValues.jpJP" />`;

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

export const minMaxHtml = `<ui-lib-input-number [max]="100" [min]="0" [showButtons]="true" [(ngModel)]="boundedValue" />`;

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

export const numeralsHtml = `<ui-lib-input-number placeholder="Enter quantity" [(ngModel)]="quantity" />`;

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

export const prefixSuffixHtml = `<ui-lib-input-number suffix=" mi" [(ngModel)]="distanceMiles" />
<ui-lib-input-number suffix=" %" [(ngModel)]="completionPercent" />
<ui-lib-input-number prefix="Expires in " suffix=" days" [(ngModel)]="expiresInDays" />
<ui-lib-input-number suffix=" °C" [(ngModel)]="temperature" />`;

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
  <ui-lib-input-number formControlName="amount" [max]="1000" [min]="0" [showButtons]="true" />
  <ui-lib-button color="primary" type="submit">Submit</ui-lib-button>
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

export const sizesHtml = `<ui-lib-input-number size="sm" [(ngModel)]="sizeValues.sm" />
<ui-lib-input-number size="md" [(ngModel)]="sizeValues.md" />
<ui-lib-input-number size="lg" [(ngModel)]="sizeValues.lg" />`;

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

export const stepHtml = `<ui-lib-input-number [step]="0.25" [(ngModel)]="stepValue" />`;
