import { Component } from '@angular/core';
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
}
