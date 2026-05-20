import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './filled.example.html',
})
export class MyComponent {
  filledValue: string | null = null;
  suggestions: string[] = [];

  onComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.suggestions = ['Angular', 'React', 'Vue'].filter(s => s.toLowerCase().includes(q));
  }
}
