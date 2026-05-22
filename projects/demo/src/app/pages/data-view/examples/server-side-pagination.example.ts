import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';
import type { DataViewPageEvent } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './server-side-pagination.example.html',
})
export class MyComponent {
  public serverProducts = [/* initial page */];
  public serverLoading: boolean = false;
  public serverRows: number = 5;
  public serverFirst: number = 0;
  public readonly serverTotalRecords: number = 100;

  public onServerPageChange(event: DataViewPageEvent): void {
    this.serverLoading = true;
    this.serverFirst = event.first;
    this.serverRows = event.rows;
    // fetch page from backend
    this.serverLoading = false;
  }
}
