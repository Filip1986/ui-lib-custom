import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Button } from 'ui-lib-custom/button';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
type InputNumberSnippetKey =
  | 'numerals'
  | 'numeralsTs'
  | 'decimal'
  | 'decimalTs'
  | 'locale'
  | 'localeTs'
  | 'currency'
  | 'currencyTs'
  | 'prefixSuffix'
  | 'prefixSuffixTs'
  | 'buttonsStacked'
  | 'buttonsStackedTs'
  | 'buttonsHorizontal'
  | 'buttonsHorizontalTs'
  | 'buttonsVertical'
  | 'buttonsVerticalTs'
  | 'step'
  | 'stepTs'
  | 'minMax'
  | 'minMaxTs'
  | 'floatLabel'
  | 'floatLabelTs'
  | 'clearIcon'
  | 'clearIconTs'
  | 'sizes'
  | 'sizesTs'
  | 'disabledInvalid'
  | 'disabledInvalidTs'
  | 'filled'
  | 'filledTs'
  | 'fluid'
  | 'fluidTs'
  | 'reactive'
  | 'reactiveTs';

/**
 * Demo page for InputNumber modes, formatting, controls, and forms.
 */
@Component({
  selector: 'app-input-number-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    Button,
    FloatLabelComponent,
    InputNumberComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './input-number-demo.component.html',
  styleUrl: './input-number-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Spinbutton', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/' },
  };

  public readonly importCode: string =
    "import { InputNumberComponent } from 'ui-lib-custom/input-number'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<InputNumberSnippetKey, string> = {
    numerals: `<uilib-input-number [(ngModel)]="quantity" placeholder="Enter quantity" />`,
    numeralsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  quantity: number | null = 1234;
}`,
    decimal: `<uilib-input-number
  [(ngModel)]="decimalValue"
  [minFractionDigits]="2"
  [maxFractionDigits]="4"
  placeholder="0.00"
/>`,
    decimalTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  decimalValue: number | null = 42.5;
}`,
    locale: `<uilib-input-number [(ngModel)]="localeValues.enUS" locale="en-US" />
<uilib-input-number [(ngModel)]="localeValues.deDE" locale="de-DE" />
<uilib-input-number [(ngModel)]="localeValues.enIN" locale="en-IN" />
<uilib-input-number [(ngModel)]="localeValues.jpJP" locale="jp-JP" />`,
    localeTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  localeValues = { enUS: 1234567.89, deDE: 1234567.89, enIN: 1234567.89, jpJP: 1234567.89 };
}`,
    currency: `<uilib-input-number [(ngModel)]="currencyValues.usd" mode="currency" currency="USD" />
<uilib-input-number [(ngModel)]="currencyValues.eur" mode="currency" currency="EUR" locale="de-DE" />
<uilib-input-number [(ngModel)]="currencyValues.inr" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" />
<uilib-input-number [(ngModel)]="currencyValues.jpy" mode="currency" currency="JPY" locale="ja-JP" />`,
    currencyTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  currencyValues = { usd: 1499.5, eur: 1499.5, inr: 1499.5, jpy: 1499 };
}`,
    prefixSuffix: `<uilib-input-number [(ngModel)]="distanceMiles" suffix=" mi" />
<uilib-input-number [(ngModel)]="completionPercent" suffix=" %" />
<uilib-input-number [(ngModel)]="expiresInDays" prefix="Expires in " suffix=" days" />
<uilib-input-number [(ngModel)]="temperature" suffix=" °C" />`,
    prefixSuffixTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  distanceMiles: number | null = 120;
  completionPercent: number | null = 88;
  expiresInDays: number | null = 45;
  temperature: number | null = 22;
}`,
    buttonsStacked: `<uilib-input-number
  [(ngModel)]="stackedAmount"
  mode="currency"
  currency="USD"
  [showButtons]="true"
/>`,
    buttonsStackedTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  stackedAmount: number | null = 1200;
}`,
    buttonsHorizontal: `<uilib-input-number
  [(ngModel)]="horizontalAmount"
  mode="currency"
  currency="EUR"
  locale="de-DE"
  [showButtons]="true"
  buttonLayout="horizontal"
/>`,
    buttonsHorizontalTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  horizontalAmount: number | null = 800;
}`,
    buttonsVertical: `<uilib-input-number
  [(ngModel)]="verticalAmount"
  [showButtons]="true"
  buttonLayout="vertical"
/>`,
    buttonsVerticalTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  verticalAmount: number | null = 10;
}`,
    step: `<uilib-input-number [(ngModel)]="stepValue" [step]="0.25" />`,
    stepTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  stepValue: number | null = 1.5;
}`,
    minMax: `<uilib-input-number
  [(ngModel)]="boundedValue"
  [min]="0"
  [max]="100"
  [showButtons]="true"
/>`,
    minMaxTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  boundedValue: number | null = 40;
}`,
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
    floatLabelTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FloatLabelComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  floatValues = { over: 100, in: 200, on: 300 };
}`,
    clearIcon: `<uilib-input-number
  [(ngModel)]="clearableValue"
  [showClear]="true"
  [showButtons]="true"
/>`,
    clearIconTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  clearableValue: number | null = 99;
}`,
    sizes: `<uilib-input-number [(ngModel)]="sizeValues.sm" size="sm" />
<uilib-input-number [(ngModel)]="sizeValues.md" size="md" />
<uilib-input-number [(ngModel)]="sizeValues.lg" size="lg" />`,
    sizesTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  sizeValues = { sm: 10, md: 20, lg: 30 };
}`,
    disabledInvalid: `<uilib-input-number [(ngModel)]="disabledValue" [disabled]="true" />
<uilib-input-number [(ngModel)]="invalidValue" [invalid]="true" />`,
    disabledInvalidTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  disabledValue: number | null = 50;
  invalidValue: number | null = null;
}`,
    filled: `<uilib-input-number [(ngModel)]="filledValue" [filled]="true" [showClear]="true" />`,
    filledTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  filledValue: number | null = 64;
}`,
    fluid: `<uilib-input-number
  [(ngModel)]="fluidValue"
  [fluid]="true"
  [showButtons]="true"
  buttonLayout="horizontal"
/>`,
    fluidTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  fluidValue: number | null = 500;
}`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-input-number formControlName="amount" [min]="0" [max]="1000" [showButtons]="true" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    reactiveTs: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputNumberComponent, Button, ReactiveFormsModule],
  templateUrl: './my.component.html',
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
}`,
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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'mode',
      type: "'decimal' | 'currency'",
      default: "'decimal'",
      description: 'Formatting mode.',
    },
    { name: 'prefix', type: 'string', default: "''", description: 'Text prefix.' },
    { name: 'suffix', type: 'string', default: "''", description: 'Text suffix.' },
    { name: 'min', type: 'number | null', default: 'null', description: 'Minimum allowed value.' },
    { name: 'max', type: 'number | null', default: 'null', description: 'Maximum allowed value.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step.' },
    {
      name: 'showButtons',
      type: 'boolean',
      default: 'false',
      description: 'Renders +/- spinner buttons.',
    },
    {
      name: 'buttonLayout',
      type: "'stacked' | 'horizontal' | 'vertical'",
      default: "'stacked'",
      description: 'Button placement.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
    },
  ];
}
