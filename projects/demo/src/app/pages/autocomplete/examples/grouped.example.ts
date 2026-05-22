import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete, AutoCompleteGroupDirective } from 'ui-lib-custom/autocomplete';
import type { AutoCompleteCompleteEvent } from 'ui-lib-custom/autocomplete';

interface CityItem { label: string; value: string; }
interface Group { label: string; items: CityItem[]; }

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete, AutoCompleteGroupDirective],
  templateUrl: './grouped.example.html',
})
export class MyComponent {
  groupedValue: string | null = null;
  groupedCitySuggestions: Group[] = [];
  readonly allGroups: Group[] = [
    { label: 'Germany', items: [{ label: 'Berlin', value: 'berlin' }] },
  ];

  onGroupedCitiesComplete(event: AutoCompleteCompleteEvent): void {
    const q = event.query.toLowerCase();
    this.groupedCitySuggestions = this.allGroups
      .map(g => ({ ...g, items: g.items.filter(c => c.label.toLowerCase().includes(q)) }))
      .filter(g => g.items.length > 0);
  }
}
