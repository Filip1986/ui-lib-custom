import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './scatter-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly scatterConversionData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Paid Campaigns',
        data: [
          { x: 1.2, y: 2.1 },
          { x: 1.8, y: 2.7 },
        ],
      },
    ],
  };
}
