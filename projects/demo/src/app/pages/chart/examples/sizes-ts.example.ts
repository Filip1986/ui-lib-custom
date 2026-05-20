import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';
import { Grid } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [BarChartComponent, Grid],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly sizePreviewData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{ label: 'Preview', data: [5, 7, 9] }],
  };
}
