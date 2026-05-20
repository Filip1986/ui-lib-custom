import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartOptions } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './mixed-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly mixedKpiData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'Revenue (k$)', data: [90, 99, 109] },
      {
        type: 'line',
        label: 'Conversion Rate (%)',
        data: [2.8, 3.0, 3.2],
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  } as ChartData<'bar'>;
  public readonly mixedChartOptions: ChartOptions<'bar'> = {
    scales: { y1: { position: 'right', grid: { drawOnChartArea: false } } },
  } as ChartOptions<'bar'>;
}
