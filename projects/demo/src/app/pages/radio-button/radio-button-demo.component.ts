import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RadioButton } from 'ui-lib-custom/radio-button';
import type { RadioButtonChangeEvent } from 'ui-lib-custom/radio-button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

interface CityOption {
  label: string;
  value: string;
}

/**
 * Demo page for the RadioButton component.
 */
@Component({
  selector: 'app-radio-button-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    RadioButton,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './radio-button-demo.component.html',
  styleUrl: './radio-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonDemoComponent {
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
      polish: 9,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { RadioButton } from 'ui-lib-custom/radio-button'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-radio-button-gap',
      description: 'Gap between the radio control and its label.',
    },
    { variable: '--uilib-radio-button-border-color', description: 'Default border colour.' },
    { variable: '--uilib-radio-button-border-hover', description: 'Border colour on hover.' },
    { variable: '--uilib-radio-button-border-active', description: 'Border colour when checked.' },
    { variable: '--uilib-radio-button-bg', description: 'Background colour of the radio control.' },
    {
      variable: '--uilib-radio-button-bg-checked',
      description: 'Background colour when checked (filled appearance).',
    },
    {
      variable: '--uilib-radio-button-dot-color',
      description: 'Colour of the inner dot when checked.',
    },
    { variable: '--uilib-radio-button-focus-ring', description: 'Focus ring box-shadow.' },
    {
      variable: '--uilib-radio-button-size-sm',
      description: 'Control diameter for <code>size="sm"</code>.',
    },
    {
      variable: '--uilib-radio-button-size-md',
      description: 'Control diameter for <code>size="md"</code> (default).',
    },
    {
      variable: '--uilib-radio-button-size-lg',
      description: 'Control diameter for <code>size="lg"</code>.',
    },
    { variable: '--uilib-radio-button-font', description: 'Font applied to the label text.' },
    { variable: '--uilib-radio-button-label-color', description: 'Colour of the label text.' },
    {
      variable: '--uilib-radio-button-transition-duration',
      description:
        'Transition duration. Set to <code>0ms</code> for <code>prefers-reduced-motion: reduce</code>.',
    },
  ];

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'filled', label: 'Filled Appearance' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'ngmodel', label: 'With ngModel' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
      ],
    },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly variants: string;
    readonly sizes: string;
    readonly filled: string;
    readonly disabled: string;
    readonly ngmodel: string;
    readonly reactiveForms: string;
  } = {
    import: `import { RadioButton } from 'ui-lib-custom/radio-button';`,
    basic: `<fieldset>
  <legend>City</legend>
  <ui-lib-radio-button name="city" value="chicago"    label="Chicago"     [(ngModel)]="selectedCity" />
  <ui-lib-radio-button name="city" value="new-york"   label="New York"    [(ngModel)]="selectedCity" />
  <ui-lib-radio-button name="city" value="los-angeles" label="Los Angeles" [(ngModel)]="selectedCity" />
</fieldset>`,
    variants: `<ui-lib-radio-button name="v" value="a" label="Option A" variant="material"  [(ngModel)]="value" />
<ui-lib-radio-button name="v" value="a" label="Option A" variant="bootstrap" [(ngModel)]="value" />
<ui-lib-radio-button name="v" value="a" label="Option A" variant="minimal"   [(ngModel)]="value" />`,
    sizes: `<ui-lib-radio-button name="s" value="sm" label="Small (sm)"  size="sm" />
<ui-lib-radio-button name="s" value="md" label="Medium (md)" size="md" />
<ui-lib-radio-button name="s" value="lg" label="Large (lg)"  size="lg" />`,
    filled: `<ui-lib-radio-button name="f" value="one" label="One" appearance="filled" [(ngModel)]="value" />
<ui-lib-radio-button name="f" value="two" label="Two" appearance="filled" [(ngModel)]="value" />`,
    disabled: `<ui-lib-radio-button name="d" value="a" label="Option A" [disabled]="true" />
<ui-lib-radio-button name="d" value="b" label="Option B (checked)" [disabled]="true" [(ngModel)]="value" />`,
    ngmodel: `<fieldset>
  <legend>Fruit</legend>
  @for (fruit of fruits; track fruit.value) {
    <ui-lib-radio-button
      name="fruit"
      [value]="fruit.value"
      [label]="fruit.label"
      [(ngModel)]="selectedFruit"
    />
  }
</fieldset>`,
    reactiveForms: `<form [formGroup]="planForm">
  <fieldset>
    <legend>Plan</legend>
    @for (plan of plans; track plan.value) {
      <ui-lib-radio-button
        name="plan"
        [value]="plan.value"
        [label]="plan.label"
        formControlName="plan"
      />
    }
  </fieldset>
</form>`,
  } as const;

  // ---- Basic demo ---------------------------------------------------------

  public selectedCity: string = '';
  public lastChangeEvent: RadioButtonChangeEvent | null = null;

  public readonly cities: CityOption[] = [
    { label: 'Chicago', value: 'chicago' },
    { label: 'New York', value: 'new-york' },
    { label: 'Los Angeles', value: 'los-angeles' },
    { label: 'Houston', value: 'houston' },
  ];

  // ---- ngModel demo -------------------------------------------------------

  public selectedFruit: string = 'apple';

  public readonly fruits: CityOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  // ---- Reactive forms demo ------------------------------------------------

  public readonly planForm: FormGroup = new FormGroup({
    plan: new FormControl<string>('starter'),
  });

  public readonly plans: CityOption[] = [
    { label: 'Starter', value: 'starter' },
    { label: 'Professional', value: 'professional' },
    { label: 'Enterprise', value: 'enterprise' },
  ];

  // ---- Variant demo -------------------------------------------------------

  public variantMaterialValue: string = 'c';
  public variantBootstrapValue: string = 'c';
  public variantMinimalValue: string = 'c';

  // ---- Disabled demo ------------------------------------------------------

  public disabledValue: string = 'option-b';

  // ---- Filled appearance demo ---------------------------------------------

  public filledValue: string = 'one';

  // ---- Event handlers -----------------------------------------------------

  public onCityChange(event: RadioButtonChangeEvent): void {
    this.lastChangeEvent = event;
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'value', type: 'unknown', description: 'Value this radio represents.' },
    { name: 'name', type: 'string', default: "''", description: 'Radio group name.' },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id for the inner input element.',
    },
    { name: 'label', type: 'string | null', default: 'null', description: 'Label text.' },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Radio button size.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the radio button.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the radio read-only.',
    },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'Id of an external label.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Enters the radio group; browser focuses the checked radio (or first if none checked).',
    },
    {
      key: 'Shift+Tab',
      action: 'Leaves the radio group.',
    },
    {
      key: '↓ / →',
      action: 'Moves focus to the next non-disabled radio, wrapping around, and selects it.',
    },
    {
      key: '↑ / ←',
      action: 'Moves focus to the previous non-disabled radio, wrapping around, and selects it.',
    },
    {
      key: 'Space',
      action: 'Selects the focused radio (native browser behaviour).',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'label',
      type: 'string | null',
      default: 'null',
      description: 'Visible label text. Content projection is an alternative.',
    },
    {
      name: 'inputId',
      type: 'string | null',
      default: 'null',
      description: 'Forwarded to the native <code>&lt;input&gt;</code> id.',
    },
    {
      name: 'name',
      type: 'string | null',
      default: 'null',
      description: 'Must be identical across all buttons in a group.',
    },
    {
      name: 'value',
      type: 'unknown',
      default: 'null',
      description: 'The value this radio button represents in the group.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Sets <code>aria-required</code> on the native input.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Prevents value changes while remaining visible.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Sets <code>aria-disabled</code> on the native input. Skipped during arrow-key navigation.',
    },
    {
      name: 'tabindex',
      type: 'number',
      default: '0',
      description: 'Applied when the radio is checked (roving tabindex pattern).',
    },
    {
      name: 'autofocus',
      type: 'boolean',
      default: 'false',
      description: 'Focuses this radio after first render.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Used when no visible label is provided.',
    },
    {
      name: 'ariaLabelledby',
      type: 'string | null',
      default: 'null',
      description: 'Explicit override; takes precedence over the auto-generated label id.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Inherits from <code>ThemeConfigService</code> when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Component density.',
    },
    {
      name: 'appearance',
      type: "'outlined' | 'filled'",
      default: "'outlined'",
      description: 'Visual style — <code>filled</code> uses a solid checked background.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'change',
      type: 'RadioButtonChangeEvent',
      description:
        'Fires when this button is selected. Payload: <code>{ value, originalEvent }</code>.',
    },
    { name: 'focus', type: 'FocusEvent', description: 'Emitted when the radio receives focus.' },
    { name: 'blur', type: 'FocusEvent', description: 'Emitted when the radio loses focus.' },
  ];
}
