import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './virtual.example.html',
})
export class MyComponent {
  virtualValue: string | null = null;
  virtualSuggestions: Array<{ label: string; value: string }> = [];

  onVirtualComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.virtualSuggestions = Array.from({ length: 100 }, (_, i) => ({
      label: `Item ${i}`,
      value: `item-${i}`,
    })).filter((item) => item.label.toLowerCase().includes(q));
  }
}
