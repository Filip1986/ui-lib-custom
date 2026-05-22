import { Component } from '@angular/core';
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
}
