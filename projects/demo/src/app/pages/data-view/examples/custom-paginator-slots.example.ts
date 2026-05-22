import { Component } from '@angular/core';
import {
  DataViewComponent,
  DataViewListItemDirective,
  DataViewPaginatorLeftDirective,
  DataViewPaginatorRightDirective,
} from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [
    DataViewComponent,
    DataViewListItemDirective,
    DataViewPaginatorLeftDirective,
    DataViewPaginatorRightDirective,
  ],
  templateUrl: './custom-paginator-slots.example.html',
})
export class MyComponent {
  public readonly products = [
    /* array of products */
  ];
}
