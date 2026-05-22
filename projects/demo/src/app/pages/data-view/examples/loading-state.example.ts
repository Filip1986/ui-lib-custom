import { Component } from '@angular/core';
import { DataViewComponent, DataViewLoadingDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewLoadingDirective],
  templateUrl: './loading-state.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}
