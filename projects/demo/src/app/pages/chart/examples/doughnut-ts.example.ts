import { Component } from '@angular/core';
import { DoughnutChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [DoughnutChartComponent],
  templateUrl: './doughnut-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly channelMixData: ChartData<'doughnut'> = {
    labels: ['Direct', 'Partners', 'Marketplace', 'Inside Sales'],
    datasets: [{ label: 'Acquisition Channel Mix', data: [31, 27, 22, 20] }],
  };
}
