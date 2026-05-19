import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
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
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { Panel } from 'ui-lib-custom/panel';
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
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Button,
    CodeSnippet,
    UiLibAutoComplete,
    AutoCompleteItemDirective,
    AutoCompleteSelectedItemDirective,
    AutoCompleteGroupDirective,
    AutoCompleteHeaderDirective,
    AutoCompleteFooterDirective,
    AutoCompleteEmptyDirective,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './autocomplete-demo.component.html',
  styleUrl: './autocomplete-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Combobox', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/' },
  };

  public readonly importCode: string =
    "import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'suggestions',
      type: 'unknown[]',
      default: '[]',
      description: 'List of suggestions to display in the overlay panel.',
    },
    {
      name: 'optionLabel',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Property name to use as the display label for object options.',
    },
    {
      name: 'optionValue',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Property name to use as the value for object options.',
    },
    {
      name: 'optionDisabled',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Property name to mark an option as disabled.',
    },
    {
      name: 'optionGroupLabel',
      type: 'string',
      default: "'label'",
      description: 'Property name for the label of an option group.',
    },
    {
      name: 'optionGroupChildren',
      type: 'string',
      default: "'items'",
      description: 'Property name for the children of an option group.',
    },
    {
      name: 'dropdown',
      type: 'boolean',
      default: 'false',
      description: 'Adds a dropdown button to show all suggestions.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Enables multi-value selection as chips.',
    },
    {
      name: 'forceSelection',
      type: 'boolean',
      default: 'false',
      description: 'Requires the user to select a suggestion from the list.',
    },
    {
      name: 'completeOnFocus',
      type: 'boolean',
      default: 'false',
      description: 'Triggers suggestions when the field receives focus.',
    },
    {
      name: 'autoClear',
      type: 'boolean',
      default: 'true',
      description:
        'Clears the input when the value is not a valid selection (with forceSelection).',
    },
    {
      name: 'unique',
      type: 'boolean',
      default: 'false',
      description: 'Prevents duplicate values in multiple mode.',
    },
    {
      name: 'minLength',
      type: 'number',
      default: '1',
      description: 'Minimum characters to trigger the suggestion query.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '300',
      description: 'Debounce delay in milliseconds before calling completeMethod.',
    },
    {
      name: 'maxlength',
      type: 'number | null',
      default: 'null',
      description: 'Maximum character length for the input.',
    },
    {
      name: 'virtualScroll',
      type: 'boolean',
      default: 'false',
      description: 'Enables virtual scrolling for large suggestion lists.',
    },
    {
      name: 'virtualScrollItemSize',
      type: 'number',
      default: '0',
      description: 'Item height in pixels for virtual scrolling calculations.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the input field.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Placeholder text for the input.',
    },
    {
      name: 'showClear',
      type: 'boolean',
      default: 'false',
      description: 'Shows a clear button to reset the value.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      description: 'Makes the component expand to fill its container width.',
    },
    {
      name: 'filled',
      type: 'boolean',
      default: 'false',
      description: 'Applies a filled background style.',
    },
    {
      name: 'group',
      type: 'boolean',
      default: 'false',
      description: 'Enables grouped option mode.',
    },
    {
      name: 'scrollHeight',
      type: 'string',
      default: "'200px'",
      description: 'Max height of the suggestion panel.',
    },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order of the component.' },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id applied to the inner input element for label association.',
    },
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
    sizes: `<ui-lib-autocomplete size="sm" />
<ui-lib-autocomplete size="md" />
<ui-lib-autocomplete size="lg" />`,
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
