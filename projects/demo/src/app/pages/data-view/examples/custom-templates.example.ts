import { Component } from '@angular/core';
import {
  DataViewComponent,
  DataViewHeaderDirective,
  DataViewFooterDirective,
  DataViewListItemDirective,
  DataViewGridItemDirective,
} from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [
    DataViewComponent,
    DataViewHeaderDirective,
    DataViewFooterDirective,
    DataViewListItemDirective,
    DataViewGridItemDirective,
  ],
  templateUrl: './custom-templates.example.html',
})
export class MyComponent {
  public readonly products = [
    /* array of products */
  ];
}
