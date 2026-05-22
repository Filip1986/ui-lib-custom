import { Component } from '@angular/core';
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
}
