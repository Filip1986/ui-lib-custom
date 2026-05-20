/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-listbox [options]="cities" [(ngModel)]="selectedCity" />`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public selectedCity: unknown = null;
}`;

export const checkboxHtml = `<ui-lib-listbox
  [options]="cities"
  [multiple]="true"
  [checkbox]="true"
  [(ngModel)]="selectedCities"
/>`;

export const checkboxTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './checkbox.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public selectedCities: unknown[] = [];
}`;

export const disabledHtml = `<ui-lib-listbox [options]="cities" [disabled]="true" [(ngModel)]="value" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public value: unknown = null;
}`;

export const filterMatchModesHtml = `<!-- starts with -->
<ui-lib-listbox [options]="cities" [filter]="true" filterMatchMode="startsWith" [(ngModel)]="value" />

<!-- ends with -->
<ui-lib-listbox [options]="cities" [filter]="true" filterMatchMode="endsWith" [(ngModel)]="value" />`;

export const filterMatchModesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './filter-match-modes.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public value: unknown = null;
}`;

export const filterHtml = `<ui-lib-listbox [options]="cities" [filter]="true" [(ngModel)]="selectedCity" />`;

export const filterTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './filter.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public selectedCity: unknown = null;
}`;

export const groupsHtml = `<ui-lib-listbox
  [options]="groupedCities"
  [group]="true"
  optionGroupLabel="label"
  optionGroupChildren="items"
  [(ngModel)]="selectedCity"
/>`;

export const groupsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './groups.example.html',
})
export class MyComponent {
  public readonly groupedCities: Array<{ label: string; items: ListboxOption[] }> = [
    { label: 'Germany', items: [{ label: 'Berlin', value: 'berlin' }] },
    { label: 'UK', items: [{ label: 'London', value: 'london' }] },
  ];
  public selectedCity: unknown = null;
}`;

export const multipleHtml = `<ui-lib-listbox [options]="cities" [multiple]="true" [(ngModel)]="selectedCities" />`;

export const multipleTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './multiple.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public selectedCities: unknown[] = [];
}`;

export const reactiveHtml = `<form [formGroup]="form">
  <ui-lib-listbox [options]="cities" formControlName="city" />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ListboxComponent],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];

  public readonly form = new FormGroup({
    city: new FormControl<unknown>(null),
  });
}`;

export const toggleAllHtml = `<ui-lib-listbox
  [options]="cities"
  [multiple]="true"
  [checkbox]="true"
  [showToggleAll]="true"
  [(ngModel)]="selectedCities"
/>`;

export const toggleAllTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxOption } from 'ui-lib-custom/listbox';

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  templateUrl: './toggle-all.example.html',
})
export class MyComponent {
  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
  ];
  public selectedCities: unknown[] = [];
}`;
