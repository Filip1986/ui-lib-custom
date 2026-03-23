import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { Button } from 'ui-lib-custom/button';
import {
  AutoCompleteEmptyDirective,
  AutoCompleteFooterDirective,
  AutoCompleteGroupDirective,
  AutoCompleteHeaderDirective,
  AutoCompleteItemDirective,
  AutoCompleteSelectedItemDirective,
  UiLibAutoComplete,
} from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';
import {
  AUTOCOMPLETE_BASIC_STRINGS,
  AUTOCOMPLETE_COUNTRIES,
  AUTOCOMPLETE_GROUPED_CITIES,
  AUTOCOMPLETE_LARGE_DATASET,
} from './autocomplete-demo.data';
import type { DemoCountry, DemoGroup } from './autocomplete-demo.data';

type AutoCompleteDemoSnippetKey =
  | 'basic'
  | 'objects'
  | 'dropdown'
  | 'forceSelection'
  | 'multiple'
  | 'multipleAdvanced'
  | 'grouped'
  | 'virtual'
  | 'templates'
  | 'sizes'
  | 'filled'
  | 'states'
  | 'reactive'
  | 'templateDriven'
  | 'variants'
  | 'clipping';

/**
 * Demo page for AutoComplete component features and patterns.
 */
@Component({
  selector: 'app-autocomplete-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    Button,
    UiLibAutoComplete,
    AutoCompleteItemDirective,
    AutoCompleteSelectedItemDirective,
    AutoCompleteGroupDirective,
    AutoCompleteHeaderDirective,
    AutoCompleteFooterDirective,
    AutoCompleteEmptyDirective,
  ],
  templateUrl: './autocomplete-demo.component.html',
  styleUrl: './autocomplete-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'objects', label: 'Objects' },
    { id: 'dropdown', label: 'Dropdown' },
    { id: 'force-selection', label: 'Force Selection' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'multiple-advanced', label: 'Multiple Advanced' },
    { id: 'grouped', label: 'Grouped' },
    { id: 'virtual-scroll', label: 'Virtual Scroll' },
    { id: 'templates', label: 'Templates' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'filled', label: 'Filled' },
    { id: 'disabled-invalid', label: 'Disabled & Invalid' },
    { id: 'forms', label: 'Forms' },
    { id: 'variants', label: 'Variants' },
    { id: 'clipping', label: 'Clipping Container' },
  ];

  public readonly snippets: Record<AutoCompleteDemoSnippetKey, string> = {
    basic: `<ui-lib-autocomplete
  [suggestions]="basicSuggestions"
  [delay]="150"
  placeholder="Search framework"
  (completeMethod)="onBasicComplete($event)"
/>`,
    objects: `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  placeholder="Select country"
  (completeMethod)="onCountryComplete($event)"
/>`,
    dropdown: `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [dropdown]="true"
  dropdownMode="current"
  (completeMethod)="onCountryComplete($event)"
/>`,
    forceSelection: `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [forceSelection]="true"
  [autoClear]="true"
  (completeMethod)="onCountryComplete($event)"
/>`,
    multiple: `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  (completeMethod)="onCountryComplete($event)"
/>`,
    multipleAdvanced: `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  [dropdown]="true"
  [addOnBlur]="true"
  [addOnTab]="true"
  separator=","
  [unique]="true"
  (completeMethod)="onCountryComplete($event)"
>
  <ng-template uiAutoCompleteSelectedItem let-code="code">
    <span class="chip-template">{{ code }}</span>
  </ng-template>
</ui-lib-autocomplete>`,
    grouped: `<ui-lib-autocomplete
  [suggestions]="groupedCitySuggestions"
  [group]="true"
  optionLabel="label"
  optionValue="value"
  [optionGroupLabel]="'label'"
  [optionGroupChildren]="'items'"
  (completeMethod)="onGroupedCitiesComplete($event)"
/>`,
    virtual: `<ui-lib-autocomplete
  [suggestions]="virtualSuggestions"
  optionLabel="label"
  optionValue="value"
  [virtualScroll]="true"
  [virtualScrollItemSize]="44"
  scrollHeight="240px"
  (completeMethod)="onVirtualComplete($event)"
/>`,
    templates: `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  (completeMethod)="onCountryComplete($event)"
>
  <ng-template uiAutoCompleteHeader>
    <strong>Choose country</strong>
  </ng-template>
  <ng-template uiAutoCompleteItem let-country="country">
    <span>{{ country.name }} ({{ country.code }})</span>
  </ng-template>
  <ng-template uiAutoCompleteFooter>
    <small>{{ countrySuggestions.length }} options</small>
  </ng-template>
</ui-lib-autocomplete>`,
    sizes: `<ui-lib-autocomplete size="small" />
<ui-lib-autocomplete size="medium" />
<ui-lib-autocomplete size="large" />`,
    filled: `<ui-lib-autocomplete [filled]="true" [showClear]="true" />`,
    states: `<ui-lib-autocomplete [disabled]="true" />
<ui-lib-autocomplete [invalid]="true" />`,
    reactive: `<form [formGroup]="reactiveForm">
  <ui-lib-autocomplete
    formControlName="country"
    [suggestions]="countrySuggestions"
    optionLabel="name"
    optionValue="code"
    (completeMethod)="onCountryComplete($event)"
  />
</form>`,
    templateDriven: `<ui-lib-autocomplete
  [(ngModel)]="templateModel"
  [ngModelOptions]="{ standalone: true }"
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="onCountryComplete($event)"
/>`,
    variants: `<ui-lib-autocomplete variant="material" />
<ui-lib-autocomplete variant="bootstrap" />
<ui-lib-autocomplete variant="minimal" />`,
    clipping: `<div class="clipping-card">
  <ui-lib-autocomplete
    [(ngModel)]="clippingValue"
    [suggestions]="countrySuggestions"
    optionLabel="name"
    optionValue="code"
    placeholder="Open inside clipped card"
    (completeMethod)="onCountryComplete($event)"
  />
</div>`,
  };

  public basicSuggestions: string[] = [...AUTOCOMPLETE_BASIC_STRINGS];
  public countrySuggestions: DemoCountry[] = [...AUTOCOMPLETE_COUNTRIES];
  public groupedCitySuggestions: DemoGroup[] = [...AUTOCOMPLETE_GROUPED_CITIES];
  public virtualSuggestions: Array<{ label: string; value: string }> =
    AUTOCOMPLETE_LARGE_DATASET.slice(0, 200);

  public basicValue: string | null = null;
  public objectValue: string | null = null;
  public dropdownValue: string | null = null;
  public forceSelectionValue: string | null = null;
  public multipleValue: unknown[] = [];
  public multipleAdvancedValue: unknown[] = [];
  public groupedValue: string | null = null;
  public virtualValue: string | null = null;
  public templateValue: unknown[] = [];

  public smallValue: string | null = null;
  public mediumValue: string | null = null;
  public largeValue: string | null = null;
  public filledValue: string | null = null;

  public disabledValue: string | null = 'disabled';
  public invalidValue: string | null = null;

  public templateModel: string | null = null;
  public clippingValue: string | null = null;

  public readonly reactiveForm: FormGroup = new FormGroup({
    country: new FormControl<string | null>(null, { validators: [Validators.required] }),
    tags: new FormControl<unknown[]>([]),
  });

  public readonly variantModels: Record<'material' | 'bootstrap' | 'minimal', string | null> = {
    material: null,
    bootstrap: null,
    minimal: null,
  };

  public snippet(key: AutoCompleteDemoSnippetKey): string {
    return this.snippets[key];
  }

  public countryControl(): FormControl<string | null> {
    return this.reactiveForm.controls['country'] as FormControl<string | null>;
  }

  public onBasicComplete(event: AutoCompleteCompleteEvent): void {
    this.basicSuggestions = this.filterStrings(AUTOCOMPLETE_BASIC_STRINGS, event.query);
  }

  public onCountryComplete(event: AutoCompleteCompleteEvent): void {
    this.countrySuggestions = this.filterCountries(event.query);
  }

  public onGroupedCitiesComplete(event: AutoCompleteCompleteEvent): void {
    const query: string = event.query.trim().toLowerCase();

    if (!query) {
      this.groupedCitySuggestions = [...AUTOCOMPLETE_GROUPED_CITIES];
      return;
    }

    this.groupedCitySuggestions = AUTOCOMPLETE_GROUPED_CITIES.map(
      (group: DemoGroup): DemoGroup => ({
        ...group,
        items: group.items.filter((city: { label: string; value: string }): boolean =>
          city.label.toLowerCase().includes(query)
        ),
      })
    ).filter((group: DemoGroup): boolean => group.items.length > 0);
  }

  public onVirtualComplete(event: AutoCompleteCompleteEvent): void {
    const query: string = event.query.trim().toLowerCase();

    if (!query) {
      this.virtualSuggestions = AUTOCOMPLETE_LARGE_DATASET.slice(0, 500);
      return;
    }

    this.virtualSuggestions = AUTOCOMPLETE_LARGE_DATASET.filter(
      (item: { label: string; value: string }): boolean => item.label.toLowerCase().includes(query)
    );
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }

  private filterStrings(source: string[], query: string): string[] {
    const normalized: string = query.trim().toLowerCase();
    if (!normalized) {
      return [...source];
    }

    return source.filter((item: string): boolean => item.toLowerCase().includes(normalized));
  }

  private filterCountries(query: string): DemoCountry[] {
    const normalized: string = query.trim().toLowerCase();
    if (!normalized) {
      return [...AUTOCOMPLETE_COUNTRIES];
    }

    return AUTOCOMPLETE_COUNTRIES.filter(
      (country: DemoCountry): boolean =>
        country.name.toLowerCase().includes(normalized) ||
        country.code.toLowerCase().includes(normalized)
    );
  }
}
