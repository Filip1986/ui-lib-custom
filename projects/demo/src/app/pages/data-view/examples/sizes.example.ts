import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }];
}
