import { Component } from '@angular/core';
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

interface Country {
  name: string;
  code: string;
}

@Component({
  standalone: true,
  imports: [
    FormsModule,
    UiLibAutoComplete,
    AutoCompleteHeaderDirective,
    AutoCompleteItemDirective,
    AutoCompleteSelectedItemDirective,
    AutoCompleteFooterDirective,
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
    this.countrySuggestions = this.allCountries.filter((c) => c.name.toLowerCase().includes(q));
  }
}
