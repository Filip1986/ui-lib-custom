import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './basic-bar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly monthlyRevenueData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Monthly Revenue (k$)', data: [82, 96, 104, 118, 126, 139] }],
  };
}
