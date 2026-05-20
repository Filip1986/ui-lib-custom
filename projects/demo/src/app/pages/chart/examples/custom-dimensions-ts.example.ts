import { Component } from '@angular/core';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './custom-dimensions-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly customDimensionData: ChartData<'line'> = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
    datasets: [{ label: 'Completed Stories', data: [21, 24, 27, 30], tension: 0.25 }],
  };
}
