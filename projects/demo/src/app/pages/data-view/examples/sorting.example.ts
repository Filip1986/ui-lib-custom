import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';
import type { DataViewSortOrder } from 'ui-lib-custom/data-view';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective, SelectButton],
  templateUrl: './sorting.example.html',
})
export class MyComponent {
  public sortField: string = 'name';
  public sortOrder: DataViewSortOrder = 1;
  public readonly sortFieldOptions: SelectButtonOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
  ];
  public readonly sortOrderOptions: SelectButtonOption[] = [
    { label: 'Ascending', value: 1 },
    { label: 'Descending', value: -1 },
  ];
}
