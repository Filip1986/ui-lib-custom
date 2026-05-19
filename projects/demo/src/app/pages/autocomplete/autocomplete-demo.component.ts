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

type AutoCompleteDemoSnippetTsKey =
  | 'basicTs'
  | 'objectsTs'
  | 'dropdownTs'
  | 'forceSelectionTs'
  | 'multipleTs'
  | 'multipleAdvancedTs'
  | 'groupedTs'
  | 'virtualTs'
  | 'templatesTs'
  | 'sizesTs'
  | 'filledTs'
  | 'statesTs'
  | 'reactiveTs'
  | 'templateDrivenTs'
  | 'variantsTs'
  | 'clippingTs';

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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippetsTs: Record<AutoCompleteDemoSnippetTsKey, string> = {
    basicTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  basicValue: string | null = null;
  basicSuggestions: string[] = [];

  onBasicComplete(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.basicSuggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(query));
  }
}`,
    objectsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  objectValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }, { name: 'France', code: 'FR' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    dropdownTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  dropdownValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    forceSelectionTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  forceSelectionValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    multipleTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  multipleValue: unknown[] = [];
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    multipleAdvancedTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  UiLibAutoComplete,
  AutoCompleteSelectedItemDirective,
} from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete, AutoCompleteSelectedItemDirective],
  templateUrl: './my.component.html',
})
export class MyComponent {
  multipleAdvancedValue: unknown[] = [];
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    groupedTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete, AutoCompleteGroupDirective } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface CityItem { label: string; value: string; }
interface Group { label: string; items: CityItem[]; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete, AutoCompleteGroupDirective],
  templateUrl: './my.component.html',
})
export class MyComponent {
  groupedValue: string | null = null;
  groupedCitySuggestions: Group[] = [];
  readonly allGroups: Group[] = [
    { label: 'Germany', items: [{ label: 'Berlin', value: 'berlin' }] },
  ];

  onGroupedCitiesComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.groupedCitySuggestions = this.allGroups
      .map(g => ({ ...g, items: g.items.filter(c => c.label.toLowerCase().includes(q)) }))
      .filter(g => g.items.length > 0);
  }
}`,
    virtualTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  virtualValue: string | null = null;
  virtualSuggestions: Array<{ label: string; value: string }> = [];

  onVirtualComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.virtualSuggestions = Array.from({ length: 100 }, (_, i) => ({ label: \`Item \${i}\`, value: \`item-\${i}\` }))
      .filter(item => item.label.toLowerCase().includes(q));
  }
}`,
    templatesTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  UiLibAutoComplete,
  AutoCompleteHeaderDirective,
  AutoCompleteItemDirective,
  AutoCompleteSelectedItemDirective,
  AutoCompleteFooterDirective,
  AutoCompleteEmptyDirective,
} from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [
    FormsModule, UiLibAutoComplete,
    AutoCompleteHeaderDirective, AutoCompleteItemDirective,
    AutoCompleteSelectedItemDirective, AutoCompleteFooterDirective,
    AutoCompleteEmptyDirective,
  ],
  templateUrl: './my.component.html',
})
export class MyComponent {
  templateValue: unknown[] = [];
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    sizesTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  smallValue: string | null = null;
  mediumValue: string | null = null;
  largeValue: string | null = null;
  suggestions: string[] = [];

  onComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.suggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(q));
  }
}`,
    filledTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  filledValue: string | null = null;
  suggestions: string[] = [];

  onComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.suggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(q));
  }
}`,
    statesTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  disabledValue: string | null = 'disabled';
  invalidValue: string | null = null;
}`,
    reactiveTs: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  readonly reactiveForm = new FormGroup({
    country: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    templateDrivenTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  templateModel: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
    variantsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  materialValue: string | null = null;
  bootstrapValue: string | null = null;
  minimalValue: string | null = null;
  suggestions: string[] = [];

  onComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.suggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(q));
  }
}`,
    clippingTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './my.component.html',
})
export class MyComponent {
  clippingValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`,
  };

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
