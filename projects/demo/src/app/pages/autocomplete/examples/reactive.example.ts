import { Component } from '@angular/core';
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
}
