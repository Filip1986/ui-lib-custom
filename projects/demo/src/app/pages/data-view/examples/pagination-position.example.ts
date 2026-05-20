import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './pagination-position.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}
