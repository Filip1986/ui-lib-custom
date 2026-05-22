import { Component } from '@angular/core';
import { DataViewComponent, DataViewGridItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewGridItemDirective],
  templateUrl: './basic-grid.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }, { name: 'Product B' }];
}
