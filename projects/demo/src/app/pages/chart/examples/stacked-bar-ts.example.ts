import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartOptions } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './stacked-bar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly stackedCostData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Infrastructure', data: [32, 34, 36, 38] },
      { label: 'Operations', data: [24, 25, 27, 29] },
    ],
  };
  public readonly stackedBarOptions: ChartOptions<'bar'> = {
    scales: { x: { stacked: true }, y: { stacked: true } },
  };
}
