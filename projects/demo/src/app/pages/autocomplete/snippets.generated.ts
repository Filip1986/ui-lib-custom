/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-autocomplete
  [suggestions]="basicSuggestions"
  [delay]="150"
  placeholder="Search framework"
  (completeMethod)="onBasicComplete($event)"
/>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  basicValue: string | null = null;
  basicSuggestions: string[] = [];

  onBasicComplete(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.basicSuggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(query));
  }
}`;

export const clippingHtml = `<div class="clipping-card">
  <ui-lib-autocomplete
    [(ngModel)]="clippingValue"
    [suggestions]="countrySuggestions"
    optionLabel="name"
    optionValue="code"
    placeholder="Open inside clipped card"
    (completeMethod)="onCountryComplete($event)"
  />
</div>`;

export const clippingTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './clipping.example.html',
})
export class MyComponent {
  clippingValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const dropdownHtml = `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [dropdown]="true"
  dropdownMode="current"
  (completeMethod)="onCountryComplete($event)"
/>`;

export const dropdownTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './dropdown.example.html',
})
export class MyComponent {
  dropdownValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const filledHtml = `<ui-lib-autocomplete [filled]="true" [showClear]="true" />`;

export const filledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './filled.example.html',
})
export class MyComponent {
  filledValue: string | null = null;
  suggestions: string[] = [];

  onComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.suggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(q));
  }
}`;

export const forceSelectionHtml = `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [forceSelection]="true"
  [autoClear]="true"
  (completeMethod)="onCountryComplete($event)"
/>`;

export const forceSelectionTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './force-selection.example.html',
})
export class MyComponent {
  forceSelectionValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const groupedHtml = `<ui-lib-autocomplete
  [suggestions]="groupedCitySuggestions"
  [group]="true"
  optionLabel="label"
  optionValue="value"
  [optionGroupLabel]="'label'"
  [optionGroupChildren]="'items'"
  (completeMethod)="onGroupedCitiesComplete($event)"
/>`;

export const groupedTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete, AutoCompleteGroupDirective } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface CityItem { label: string; value: string; }
interface Group { label: string; items: CityItem[]; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete, AutoCompleteGroupDirective],
  templateUrl: './grouped.example.html',
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
}`;

export const multipleAdvancedHtml = `<ui-lib-autocomplete
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
</ui-lib-autocomplete>`;

export const multipleAdvancedTs = `import { Component } from '@angular/core';
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
  templateUrl: './multiple-advanced.example.html',
})
export class MyComponent {
  multipleAdvancedValue: unknown[] = [];
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const multipleHtml = `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  (completeMethod)="onCountryComplete($event)"
/>`;

export const multipleTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './multiple.example.html',
})
export class MyComponent {
  multipleValue: unknown[] = [];
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const objectsHtml = `<ui-lib-autocomplete
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  placeholder="Select country"
  (completeMethod)="onCountryComplete($event)"
/>`;

export const objectsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './objects.example.html',
})
export class MyComponent {
  objectValue: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }, { name: 'France', code: 'FR' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm">
  <ui-lib-autocomplete
    formControlName="country"
    [suggestions]="countrySuggestions"
    optionLabel="name"
    optionValue="code"
    (completeMethod)="onCountryComplete($event)"
  />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibAutoComplete],
  templateUrl: './reactive.example.html',
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
}`;

export const sizesHtml = `<ui-lib-autocomplete size="sm" />
<ui-lib-autocomplete size="md" />
<ui-lib-autocomplete size="lg" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './sizes.example.html',
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
}`;

export const statesHtml = `<ui-lib-autocomplete [disabled]="true" />
<ui-lib-autocomplete [invalid]="true" />`;

export const statesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './states.example.html',
})
export class MyComponent {
  disabledValue: string | null = 'disabled';
  invalidValue: string | null = null;
}`;

export const templateDrivenHtml = `<ui-lib-autocomplete
  [(ngModel)]="templateModel"
  [ngModelOptions]="{ standalone: true }"
  [suggestions]="countrySuggestions"
  optionLabel="name"
  optionValue="code"
  (completeMethod)="onCountryComplete($event)"
/>`;

export const templateDrivenTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface Country { name: string; code: string; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './template-driven.example.html',
})
export class MyComponent {
  templateModel: string | null = null;
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const templatesHtml = `<ui-lib-autocomplete
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
</ui-lib-autocomplete>`;

export const templatesTs = `import { Component } from '@angular/core';
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
  templateUrl: './templates.example.html',
})
export class MyComponent {
  templateValue: unknown[] = [];
  countrySuggestions: Country[] = [];
  readonly allCountries: Country[] = [{ name: 'Germany', code: 'DE' }];

  onCountryComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.countrySuggestions = this.allCountries.filter(c => c.name.toLowerCase().includes(q));
  }
}`;

export const variantsHtml = `<ui-lib-autocomplete variant="material" />
<ui-lib-autocomplete variant="bootstrap" />
<ui-lib-autocomplete variant="minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './variants.example.html',
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
}`;

export const virtualHtml = `<ui-lib-autocomplete
  [suggestions]="virtualSuggestions"
  optionLabel="label"
  optionValue="value"
  [virtualScroll]="true"
  [virtualScrollItemSize]="44"
  scrollHeight="240px"
  (completeMethod)="onVirtualComplete($event)"
/>`;

export const virtualTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './virtual.example.html',
})
export class MyComponent {
  virtualValue: string | null = null;
  virtualSuggestions: Array<{ label: string; value: string }> = [];

  onVirtualComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.virtualSuggestions = Array.from({ length: 100 }, (_, i) => ({ label: \`Item \${i}\`, value: \`item-\${i}\` }))
      .filter(item => item.label.toLowerCase().includes(q));
  }
}`;
