import { Component } from '@angular/core';
import { DataViewComponent, DataViewGridItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewGridItemDirective],
  templateUrl: './grid-columns.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}
