import { Component } from '@angular/core';
import { DataViewComponent, DataViewEmptyDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewEmptyDirective],
  templateUrl: './empty-state.example.html',
})
export class MyComponent {}
