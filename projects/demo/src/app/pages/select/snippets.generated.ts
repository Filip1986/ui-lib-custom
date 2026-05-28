/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const selectExampleHtml = `<ui-lib-select label="Choose" [options]="options" />`;

export const selectExampleTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { SelectOption } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  templateUrl: './select-example.example.html',
})
export class MyComponent {
  readonly options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];
}`;

export const usageHtml = `<ui-lib-select
  label="Choose"
  [options]="options"
  [(ngModel)]="selectedValue"
/>`;

export const usageTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { SelectOption } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  templateUrl: './usage.example.html',
})
export class MyComponent {
  public readonly options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];
  public selectedValue: string | null = null;
}`;
