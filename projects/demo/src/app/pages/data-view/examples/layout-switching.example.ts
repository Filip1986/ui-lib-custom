import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective, DataViewGridItemDirective } from 'ui-lib-custom/data-view';
import type { DataViewLayout } from 'ui-lib-custom/data-view';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective, DataViewGridItemDirective, SelectButton],
  templateUrl: './layout-switching.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }];
  public readonly layoutOptions: SelectButtonOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ];
  public switchableLayout: DataViewLayout = 'list';
}
