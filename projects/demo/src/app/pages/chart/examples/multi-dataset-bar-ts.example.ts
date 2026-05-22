import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './multi-dataset-bar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly regionalRevenueData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Enterprise', data: [120, 132, 144, 158] },
      { label: 'Mid-Market', data: [86, 94, 101, 112] },
      { label: 'SMB', data: [52, 57, 64, 72] },
    ],
  };
}
