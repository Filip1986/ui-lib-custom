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
import {
  numeralsHtml,
  numeralsTsTs,
  decimalHtml,
  decimalTsTs,
  localeHtml,
  localeTsTs,
  currencyHtml,
  currencyTsTs,
  prefixSuffixHtml,
  prefixSuffixTsTs,
  buttonsStackedHtml,
  buttonsStackedTsTs,
  buttonsHorizontalHtml,
  buttonsHorizontalTsTs,
  buttonsVerticalHtml,
  buttonsVerticalTsTs,
  stepHtml,
  stepTsTs,
  minMaxHtml,
  minMaxTsTs,
  floatLabelHtml,
  floatLabelTsTs,
  clearIconHtml,
  clearIconTsTs,
  sizesHtml,
  sizesTsTs,
  disabledInvalidHtml,
  disabledInvalidTsTs,
  filledHtml,
  filledTsTs,
  fluidHtml,
  fluidTsTs,
  reactiveHtml,
  reactiveTsTs,
} from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
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
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './input-number-demo.component.html',
  styleUrl: './input-number-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemoComponent {
  public readonly numeralsHtml: string = numeralsHtml;
  public readonly numeralsTsTs: string = numeralsTsTs;
  public readonly decimalHtml: string = decimalHtml;
  public readonly decimalTsTs: string = decimalTsTs;
  public readonly localeHtml: string = localeHtml;
  public readonly localeTsTs: string = localeTsTs;
  public readonly currencyHtml: string = currencyHtml;
  public readonly currencyTsTs: string = currencyTsTs;
  public readonly prefixSuffixHtml: string = prefixSuffixHtml;
  public readonly prefixSuffixTsTs: string = prefixSuffixTsTs;
  public readonly buttonsStackedHtml: string = buttonsStackedHtml;
  public readonly buttonsStackedTsTs: string = buttonsStackedTsTs;
  public readonly buttonsHorizontalHtml: string = buttonsHorizontalHtml;
  public readonly buttonsHorizontalTsTs: string = buttonsHorizontalTsTs;
  public readonly buttonsVerticalHtml: string = buttonsVerticalHtml;
  public readonly buttonsVerticalTsTs: string = buttonsVerticalTsTs;
  public readonly stepHtml: string = stepHtml;
  public readonly stepTsTs: string = stepTsTs;
  public readonly minMaxHtml: string = minMaxHtml;
  public readonly minMaxTsTs: string = minMaxTsTs;
  public readonly floatLabelHtml: string = floatLabelHtml;
  public readonly floatLabelTsTs: string = floatLabelTsTs;
  public readonly clearIconHtml: string = clearIconHtml;
  public readonly clearIconTsTs: string = clearIconTsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTsTs: string = sizesTsTs;
  public readonly disabledInvalidHtml: string = disabledInvalidHtml;
  public readonly disabledInvalidTsTs: string = disabledInvalidTsTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTsTs: string = filledTsTs;
  public readonly fluidHtml: string = fluidHtml;
  public readonly fluidTsTs: string = fluidTsTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTsTs: string = reactiveTsTs;

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
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-input-number-gap', description: 'Gap.' },
    { variable: '--uilib-input-number-border-width', description: 'Border width.' },
    { variable: '--uilib-input-number-border-style', description: 'Border style.' },
    { variable: '--uilib-input-number-border-radius', description: 'Border radius.' },
    { variable: '--uilib-input-number-height-sm', description: 'Height — sm.' },
    { variable: '--uilib-input-number-height-md', description: 'Height — md.' },
    { variable: '--uilib-input-number-height-lg', description: 'Height — lg.' },
    { variable: '--uilib-input-number-input-height', description: 'Input height.' },
    { variable: '--uilib-input-number-padding-y-sm', description: 'Vertical padding — sm.' },
    { variable: '--uilib-input-number-padding-y-md', description: 'Vertical padding — md.' },
    { variable: '--uilib-input-number-padding-y-lg', description: 'Vertical padding — lg.' },
    { variable: '--uilib-input-number-padding-x-sm', description: 'Horizontal padding — sm.' },
    { variable: '--uilib-input-number-padding-x-md', description: 'Horizontal padding — md.' },
    { variable: '--uilib-input-number-padding-x-lg', description: 'Horizontal padding — lg.' },
    { variable: '--uilib-input-number-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-input-number-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-input-number-font-family', description: 'Font family.' },
    { variable: '--uilib-input-number-font-weight', description: 'Font weight.' },
    { variable: '--uilib-input-number-font-size-sm', description: 'Font size — sm.' },
    { variable: '--uilib-input-number-font-size-md', description: 'Font size — md.' },
    { variable: '--uilib-input-number-font-size-lg', description: 'Font size — lg.' },
    { variable: '--uilib-input-number-font-size', description: 'Font size.' },
    { variable: '--uilib-input-number-bg', description: 'Background colour.' },
    { variable: '--uilib-input-number-text', description: 'Text.' },
    { variable: '--uilib-input-number-border-color', description: 'Border colour.' },
    { variable: '--uilib-input-number-border-color-hover', description: 'Border colour (hover).' },
    { variable: '--uilib-input-number-border-color-focus', description: 'Border colour (focus).' },
    { variable: '--uilib-input-number-placeholder-color', description: 'Placeholder text colour.' },
    { variable: '--uilib-input-number-prefix-color', description: 'Prefix text colour.' },
    { variable: '--uilib-input-number-suffix-color', description: 'Suffix text colour.' },
    { variable: '--uilib-input-number-button-bg', description: 'Button background colour.' },
    { variable: '--uilib-input-number-button-text', description: 'Button Text.' },
    {
      variable: '--uilib-input-number-button-border-color',
      description: 'Button Border text colour.',
    },
    {
      variable: '--uilib-input-number-button-hover-background',
      description: 'Button Hover Background.',
    },
    {
      variable: '--uilib-input-number-button-active-background',
      description: 'Button Active Background.',
    },
    {
      variable: '--uilib-input-number-button-disabled-opacity',
      description: 'Button Disabled opacity.',
    },
    { variable: '--uilib-input-number-button-width-sm', description: 'Button width — sm.' },
    { variable: '--uilib-input-number-button-width-md', description: 'Button width — md.' },
    { variable: '--uilib-input-number-button-width-lg', description: 'Button width — lg.' },
    { variable: '--uilib-input-number-button-width', description: 'Button width.' },
    { variable: '--uilib-input-number-clear-size', description: 'Clear size.' },
    { variable: '--uilib-input-number-clear-color', description: 'Clear text colour.' },
    { variable: '--uilib-input-number-clear-offset', description: 'Clear offset.' },
    { variable: '--uilib-input-number-focus-ring', description: 'Focus ring.' },
    {
      variable: '--uilib-input-number-invalid-border-color',
      description: 'Invalid Border text colour.',
    },
    { variable: '--uilib-input-number-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-input-number-filled-bg', description: 'Filled background colour.' },
    { variable: '--uilib-input-number-transition', description: 'Transition.' },
  ];
}
