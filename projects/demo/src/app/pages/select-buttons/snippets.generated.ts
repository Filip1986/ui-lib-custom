/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const selectButtonExampleHtml = `<ui-lib-select-button [options]="basicOptions" [(value)]="basicValue" />`;

export const selectButtonExampleTs = `import { Component } from '@angular/core';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [SelectButton],
  templateUrl: './select-button-example.example.html',
})
export class MyComponent {
  readonly basicOptions: SelectButtonOption[] = [
    { label: 'One-Way', value: 'one-way' },
    { label: 'Return', value: 'return' },
  ];
  basicValue: string = 'one-way';
}`;
