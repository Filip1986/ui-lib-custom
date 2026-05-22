import { Component } from '@angular/core';
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
}
