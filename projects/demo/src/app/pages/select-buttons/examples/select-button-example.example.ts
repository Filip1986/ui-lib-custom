import { Component } from '@angular/core';
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
}
