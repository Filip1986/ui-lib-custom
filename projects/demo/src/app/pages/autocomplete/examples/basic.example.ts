import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  basicValue: string | null = null;
  basicSuggestions: string[] = [];

  onBasicComplete(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.basicSuggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(query));
  }
}
