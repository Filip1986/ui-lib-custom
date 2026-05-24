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
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import {
  basicHtml,
  basicTs,
  objectsHtml,
  objectsTs,
  dropdownHtml,
  dropdownTs,
  forceSelectionHtml,
  forceSelectionTs,
  multipleHtml,
  multipleTs,
  multipleAdvancedHtml,
  multipleAdvancedTs,
  groupedHtml,
  groupedTs,
  virtualHtml,
  virtualTs,
  templatesHtml,
  templatesTs,
  sizesHtml,
  sizesTs,
  filledHtml,
  filledTs,
  statesHtml,
  statesTs,
  reactiveHtml,
  reactiveTs,
  templateDrivenHtml,
  templateDrivenTs,
  variantsHtml,
  variantsTs,
  clippingHtml,
  clippingTs,
} from './snippets.generated';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';

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
    UiLibAutoComplete,
    AutoCompleteItemDirective,
    AutoCompleteSelectedItemDirective,
    AutoCompleteGroupDirective,
    AutoCompleteHeaderDirective,
    AutoCompleteFooterDirective,
    AutoCompleteEmptyDirective,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,
    DocApiReferenceComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocSectionComponent,
  ],
  templateUrl: './autocomplete-demo.component.html',
  styleUrl: './autocomplete-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly objectsHtml: string = objectsHtml;
  public readonly objectsTs: string = objectsTs;
  public readonly dropdownHtml: string = dropdownHtml;
  public readonly dropdownTs: string = dropdownTs;
  public readonly forceSelectionHtml: string = forceSelectionHtml;
  public readonly forceSelectionTs: string = forceSelectionTs;
  public readonly multipleHtml: string = multipleHtml;
  public readonly multipleTs: string = multipleTs;
  public readonly multipleAdvancedHtml: string = multipleAdvancedHtml;
  public readonly multipleAdvancedTs: string = multipleAdvancedTs;
  public readonly groupedHtml: string = groupedHtml;
  public readonly groupedTs: string = groupedTs;
  public readonly virtualHtml: string = virtualHtml;
  public readonly virtualTs: string = virtualTs;
  public readonly templatesHtml: string = templatesHtml;
  public readonly templatesTs: string = templatesTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTs: string = filledTs;
  public readonly statesHtml: string = statesHtml;
  public readonly statesTs: string = statesTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;
  public readonly templateDrivenHtml: string = templateDrivenHtml;
  public readonly templateDrivenTs: string = templateDrivenTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly clippingHtml: string = clippingHtml;
  public readonly clippingTs: string = clippingTs;

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
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'suggestions',
      type: 'unknown[]',
      default: '[]',
      description:
        'Options to show in the dropdown; always managed externally — filter inside completeMethod.',
    },
    {
      name: 'optionLabel',
      type: 'string | undefined',
      description: 'Field name used as the display label.',
    },
    {
      name: 'optionValue',
      type: 'string | undefined',
      description: 'Field name used as the emitted value.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Enables chip (multi-value) mode.',
    },
    {
      name: 'dropdown',
      type: 'boolean',
      default: 'false',
      description: 'Shows a dropdown toggle button.',
    },
    {
      name: 'forceSelection',
      type: 'boolean',
      default: 'false',
      description: 'Restricts value to items from suggestions on blur.',
    },
    {
      name: 'minLength',
      type: 'number',
      default: '1',
      description: 'Minimum query length before completeMethod fires.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '300',
      description: 'Debounce delay in ms before completeMethod fires.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Visual style variant.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Size token.',
    },
    { name: 'placeholder', type: 'string', default: "''", description: 'Input placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Applies error styling.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the input read-only.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      description: 'Stretches to fill container width.',
    },
    {
      name: 'showClear',
      type: 'boolean',
      default: 'false',
      description: 'Shows a clear button when the field has a value.',
    },
    {
      name: 'scrollHeight',
      type: 'string',
      default: "'200px'",
      description: 'Max height of the dropdown panel.',
    },
    {
      name: 'appendTo',
      type: 'string | HTMLElement | undefined',
      default: "'body'",
      description: 'Where to mount the dropdown panel.',
    },
    {
      name: 'virtualScroll',
      type: 'boolean',
      default: 'false',
      description: 'Enables virtual scrolling for large suggestion lists.',
    },
    {
      name: 'group',
      type: 'boolean',
      default: 'false',
      description: 'Treats suggestions as grouped data.',
    },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state.' },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'completeMethod',
      type: 'AutoCompleteCompleteEvent',
      description: 'Fires (debounced) when user types; update [suggestions] in response.',
    },
    {
      name: 'optionSelect',
      type: 'AutoCompleteSelectEvent',
      description: 'Emits when an option is selected.',
    },
    {
      name: 'unselect',
      type: 'AutoCompleteUnselectEvent',
      description: 'Emits when a chip is removed (multiple mode).',
    },
    { name: 'clearEvent', type: 'void', description: 'Emits when the clear button is clicked.' },
    { name: 'autocompleteFocus', type: 'FocusEvent', description: 'Input focused.' },
    { name: 'autocompleteBlur', type: 'FocusEvent', description: 'Input blurred.' },
    { name: 'autocompleteKeyUp', type: 'KeyboardEvent', description: 'Keyup on the input field.' },
    {
      name: 'dropdownClick',
      type: 'AutoCompleteDropdownClickEvent',
      description: 'Dropdown toggle button clicked.',
    },
  ];

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
          city.label.toLowerCase().includes(query),
        ),
      }),
    ).filter((group: DemoGroup): boolean => group.items.length > 0);
  }

  public onVirtualComplete(event: AutoCompleteCompleteEvent): void {
    const query: string = event.query.trim().toLowerCase();

    if (!query) {
      this.virtualSuggestions = AUTOCOMPLETE_LARGE_DATASET.slice(0, 500);
      return;
    }

    this.virtualSuggestions = AUTOCOMPLETE_LARGE_DATASET.filter(
      (item: { label: string; value: string }): boolean => item.label.toLowerCase().includes(query),
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
        country.code.toLowerCase().includes(normalized),
    );
  }
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the autocomplete input.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the autocomplete.' },
    { key: 'Type', action: 'Triggers the complete event and opens the suggestion panel.' },
    { key: '↓', action: 'Opens the panel (if closed) or moves focus to the next suggestion.' },
    { key: '↑', action: 'Moves focus to the previous suggestion.' },
    { key: 'Enter', action: 'Selects the focused suggestion.' },
    { key: 'Escape', action: 'Closes the suggestion panel.' },
    { key: 'Backspace', suffix: 'in multiple mode', action: 'Removes the last selected chip.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Input',
      attribute: 'role="combobox"',
      value: '—',
      notes: 'Identifies the input as a combobox to assistive technologies.',
    },
    {
      element: 'Input',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the suggestion panel is open.',
    },
    {
      element: 'Input',
      attribute: 'aria-autocomplete',
      value: '"list"',
      notes: 'Indicates that a list of suggestions is provided.',
    },
    {
      element: 'Input',
      attribute: 'aria-controls',
      value: 'panel element ID',
      notes: 'Links the input to its suggestion panel.',
    },
    {
      element: 'Input',
      attribute: 'aria-activedescendant',
      value: 'focused option ID',
      notes: 'Tracks the focused suggestion for screen readers.',
    },
    {
      element: 'Input',
      attribute: 'aria-invalid',
      value: '"true"',
      notes: 'Applied when <code>[invalid]="true"</code>.',
    },
    {
      element: 'Input',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Suggestion panel',
      attribute: 'role="listbox"',
      value: '—',
      notes: 'Identifies the dropdown panel as a listbox.',
    },
    {
      element: 'Suggestion item',
      attribute: 'role="option"',
      value: '—',
      notes: 'Each suggestion is announced as a selectable option.',
    },
    {
      element: 'Suggestion item',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Indicates whether the option is currently selected.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-autocomplete-border-radius', description: 'Border radius.' },
    { variable: '--uilib-autocomplete-padding-y-base', description: 'Padding Y Base.' },
    { variable: '--uilib-autocomplete-padding-x-base', description: 'Padding X Base.' },
    { variable: '--uilib-autocomplete-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-autocomplete-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-autocomplete-min-height', description: 'Minimum height.' },
    { variable: '--uilib-autocomplete-bg', description: 'Background colour.' },
    { variable: '--uilib-autocomplete-border', description: 'Border shorthand.' },
    { variable: '--uilib-autocomplete-border-focus', description: 'Border shorthand (focus).' },
    { variable: '--uilib-autocomplete-text', description: 'Text.' },
    { variable: '--uilib-autocomplete-placeholder', description: 'Placeholder.' },
    { variable: '--uilib-autocomplete-panel-bg', description: 'Panel background colour.' },
    { variable: '--uilib-autocomplete-panel-border', description: 'Panel border shorthand.' },
    { variable: '--uilib-autocomplete-panel-shadow', description: 'Panel box shadow.' },
    { variable: '--uilib-autocomplete-panel-max-height', description: 'Panel Max height.' },
    { variable: '--uilib-autocomplete-panel-z-index', description: 'Panel z-index.' },
    {
      variable: '--uilib-autocomplete-option-padding-y-base',
      description: 'Option Padding Y Base.',
    },
    {
      variable: '--uilib-autocomplete-option-padding-x-base',
      description: 'Option Padding X Base.',
    },
    { variable: '--uilib-autocomplete-option-padding-y', description: 'Option vertical padding.' },
    {
      variable: '--uilib-autocomplete-option-padding-x',
      description: 'Option horizontal padding.',
    },
    { variable: '--uilib-autocomplete-option-padding', description: 'Option padding.' },
    {
      variable: '--uilib-autocomplete-option-hover-bg',
      description: 'Option Hover background colour.',
    },
    {
      variable: '--uilib-autocomplete-option-selected-bg',
      description: 'Option Selected background colour.',
    },
    { variable: '--uilib-autocomplete-option-selected-text', description: 'Option Selected Text.' },
    {
      variable: '--uilib-autocomplete-option-disabled-opacity',
      description: 'Option Disabled opacity.',
    },
    { variable: '--uilib-autocomplete-chip-bg', description: 'Chip background colour.' },
    { variable: '--uilib-autocomplete-chip-text', description: 'Chip Text.' },
    {
      variable: '--uilib-autocomplete-chip-border-radius',
      description: 'Chip Border border radius.',
    },
    { variable: '--uilib-autocomplete-chip-padding', description: 'Chip padding.' },
    { variable: '--uilib-autocomplete-chip-gap', description: 'Chip gap.' },
    {
      variable: '--uilib-autocomplete-chip-remove-hover-bg',
      description: 'Chip Remove Hover background colour.',
    },
    { variable: '--uilib-autocomplete-dropdown-bg', description: 'Dropdown background colour.' },
    {
      variable: '--uilib-autocomplete-dropdown-hover-bg',
      description: 'Dropdown Hover background colour.',
    },
    { variable: '--uilib-autocomplete-dropdown-border', description: 'Dropdown border shorthand.' },
    {
      variable: '--uilib-autocomplete-dropdown-icon-color',
      description: 'Dropdown Icon text colour.',
    },
    { variable: '--uilib-autocomplete-clear-icon-color', description: 'Clear Icon text colour.' },
    {
      variable: '--uilib-autocomplete-clear-icon-hover-color',
      description: 'Clear Icon Hover text colour.',
    },
    {
      variable: '--uilib-autocomplete-group-label-bg',
      description: 'Group Label background colour.',
    },
    { variable: '--uilib-autocomplete-group-label-text', description: 'Group Label Text.' },
    {
      variable: '--uilib-autocomplete-group-label-font-weight',
      description: 'Group Label font weight.',
    },
    { variable: '--uilib-autocomplete-sm-padding', description: 'Sm padding.' },
    { variable: '--uilib-autocomplete-sm-font-size', description: 'Sm Font size.' },
    { variable: '--uilib-autocomplete-lg-padding', description: 'Lg padding.' },
    { variable: '--uilib-autocomplete-lg-font-size', description: 'Lg Font size.' },
  ];
}
