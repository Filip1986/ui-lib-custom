import { Component } from '@angular/core';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './line-area-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly trafficAreaData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Site Sessions (k)', data: [8, 9, 11, 10, 13, 15, 14], fill: true, tension: 0.3 },
    ],
  };
}
