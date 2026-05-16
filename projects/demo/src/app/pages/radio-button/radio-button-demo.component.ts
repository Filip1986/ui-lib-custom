import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RadioButton } from 'ui-lib-custom/radio-button';
import type { RadioButtonChangeEvent } from 'ui-lib-custom/radio-button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

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
    DocPageLayoutComponent,
    DocTocComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './radio-button-demo.component.html',
  styleUrl: './radio-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonDemoComponent {
  public readonly importCode: string = "import { RadioButton } from 'ui-lib-custom/radio-button'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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
}
