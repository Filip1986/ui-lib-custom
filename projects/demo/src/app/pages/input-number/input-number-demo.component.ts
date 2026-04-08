import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { Button } from 'ui-lib-custom/button';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

type InputNumberSnippetKey =
  | 'numerals'
  | 'decimal'
  | 'locale'
  | 'currency'
  | 'prefixSuffix'
  | 'buttonsStacked'
  | 'buttonsHorizontal'
  | 'buttonsVertical'
  | 'step'
  | 'minMax'
  | 'floatLabel'
  | 'clearIcon'
  | 'sizes'
  | 'disabledInvalid'
  | 'filled'
  | 'fluid'
  | 'reactive';

/**
 * Demo page for InputNumber modes, formatting, controls, and forms.
 */
@Component({
  selector: 'app-input-number-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    Button,
    FloatLabelComponent,
    InputNumberComponent,
  ],
  templateUrl: './input-number-demo.component.html',
  styleUrl: './input-number-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'numerals', label: 'Numerals' },
    { id: 'decimal', label: 'Decimal' },
    { id: 'locale', label: 'Locale' },
    { id: 'currency', label: 'Currency' },
    { id: 'prefix-suffix', label: 'Prefix & Suffix' },
    { id: 'buttons-stacked', label: 'Buttons Stacked' },
    { id: 'buttons-horizontal', label: 'Buttons Horizontal' },
    { id: 'buttons-vertical', label: 'Buttons Vertical' },
    { id: 'step', label: 'Step' },
    { id: 'min-max', label: 'Min & Max' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'clear-icon', label: 'Clear Icon' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'disabled-invalid', label: 'Disabled & Invalid' },
    { id: 'filled', label: 'Filled' },
    { id: 'fluid', label: 'Fluid' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
  ];

  public readonly snippets: Record<InputNumberSnippetKey, string> = {
    numerals: `<uilib-input-number [(ngModel)]="quantity" placeholder="Enter quantity" />`,
    decimal: `<uilib-input-number
  [(ngModel)]="decimalValue"
  [minFractionDigits]="2"
  [maxFractionDigits]="4"
  placeholder="0.00"
/>`,
    locale: `<uilib-input-number [(ngModel)]="localeValues.enUS" locale="en-US" />
<uilib-input-number [(ngModel)]="localeValues.deDE" locale="de-DE" />
<uilib-input-number [(ngModel)]="localeValues.enIN" locale="en-IN" />
<uilib-input-number [(ngModel)]="localeValues.jpJP" locale="jp-JP" />`,
    currency: `<uilib-input-number [(ngModel)]="currencyValues.usd" mode="currency" currency="USD" />
<uilib-input-number [(ngModel)]="currencyValues.eur" mode="currency" currency="EUR" locale="de-DE" />
<uilib-input-number [(ngModel)]="currencyValues.inr" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" />
<uilib-input-number [(ngModel)]="currencyValues.jpy" mode="currency" currency="JPY" locale="ja-JP" />`,
    prefixSuffix: `<uilib-input-number [(ngModel)]="distanceMiles" suffix=" mi" />
<uilib-input-number [(ngModel)]="completionPercent" suffix=" %" />
<uilib-input-number [(ngModel)]="expiresInDays" prefix="Expires in " suffix=" days" />
<uilib-input-number [(ngModel)]="temperature" suffix=" °C" />`,
    buttonsStacked: `<uilib-input-number
  [(ngModel)]="stackedAmount"
  mode="currency"
  currency="USD"
  [showButtons]="true"
/>`,
    buttonsHorizontal: `<uilib-input-number
  [(ngModel)]="horizontalAmount"
  mode="currency"
  currency="EUR"
  locale="de-DE"
  [showButtons]="true"
  buttonLayout="horizontal"
/>`,
    buttonsVertical: `<uilib-input-number
  [(ngModel)]="verticalAmount"
  [showButtons]="true"
  buttonLayout="vertical"
/>`,
    step: `<uilib-input-number [(ngModel)]="stepValue" [step]="0.25" />`,
    minMax: `<uilib-input-number
  [(ngModel)]="boundedValue"
  [min]="0"
  [max]="100"
  [showButtons]="true"
/>`,
    floatLabel: `<uilib-float-label variant="over">
  <uilib-input-number [(ngModel)]="floatValues.over" inputId="float-over" />
  <label for="float-over">Over</label>
</uilib-float-label>
<uilib-float-label variant="in">
  <uilib-input-number [(ngModel)]="floatValues.in" inputId="float-in" />
  <label for="float-in">In</label>
</uilib-float-label>
<uilib-float-label variant="on">
  <uilib-input-number [(ngModel)]="floatValues.on" inputId="float-on" />
  <label for="float-on">On</label>
</uilib-float-label>`,
    clearIcon: `<uilib-input-number
  [(ngModel)]="clearableValue"
  [showClear]="true"
  [showButtons]="true"
/>`,
    sizes: `<uilib-input-number [(ngModel)]="sizeValues.sm" size="sm" />
<uilib-input-number [(ngModel)]="sizeValues.md" size="md" />
<uilib-input-number [(ngModel)]="sizeValues.lg" size="lg" />`,
    disabledInvalid: `<uilib-input-number [(ngModel)]="disabledValue" [disabled]="true" />
<uilib-input-number [(ngModel)]="invalidValue" [invalid]="true" />`,
    filled: `<uilib-input-number [(ngModel)]="filledValue" [filled]="true" [showClear]="true" />`,
    fluid: `<uilib-input-number
  [(ngModel)]="fluidValue"
  [fluid]="true"
  [showButtons]="true"
  buttonLayout="horizontal"
/>`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-input-number formControlName="amount" [min]="0" [max]="1000" [showButtons]="true" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
  };

  public quantity: number | null = 1234;
  public decimalValue: number | null = 42.5;

  public readonly localeValues: {
    enUS: number | null;
    deDE: number | null;
    enIN: number | null;
    jpJP: number | null;
  } = {
    enUS: 1234567.89,
    deDE: 1234567.89,
    enIN: 1234567.89,
    jpJP: 1234567.89,
  };

  public readonly currencyValues: {
    usd: number | null;
    eur: number | null;
    inr: number | null;
    jpy: number | null;
  } = {
    usd: 1499.5,
    eur: 1499.5,
    inr: 1499.5,
    jpy: 1499,
  };

  public distanceMiles: number | null = 120;
  public completionPercent: number | null = 88;
  public expiresInDays: number | null = 45;
  public temperature: number | null = 22;

  public stackedAmount: number | null = 1200;
  public horizontalAmount: number | null = 800;
  public verticalAmount: number | null = 10;
  public stepValue: number | null = 1.5;
  public boundedValue: number | null = 40;

  public readonly floatValues: { over: number | null; in: number | null; on: number | null } = {
    over: 100,
    in: 200,
    on: 300,
  };

  public clearableValue: number | null = 99;

  public readonly sizeValues: { sm: number | null; md: number | null; lg: number | null } = {
    sm: 10,
    md: 20,
    lg: 30,
  };

  public disabledValue: number | null = 50;
  public invalidValue: number | null = null;
  public filledValue: number | null = 64;
  public fluidValue: number | null = 500;

  public readonly reactiveForm: FormGroup<{ amount: FormControl<number | null> }> = new FormGroup<{
    amount: FormControl<number | null>;
  }>({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(1000)],
    }),
  });

  public submittedAmount: number | null = null;

  public snippet(key: InputNumberSnippetKey): string {
    return this.snippets[key];
  }

  public amountControl(): FormControl<number | null> {
    return this.reactiveForm.controls.amount;
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    if (this.reactiveForm.invalid) {
      this.submittedAmount = null;
      return;
    }

    this.submittedAmount = this.amountControl().value;
  }
}
