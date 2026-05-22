import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';
import { Button } from 'ui-lib-custom/button';
import { Inline } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [BarChartComponent, Button, Inline],
  templateUrl: './dynamic-update-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public dynamicRevenueData: ChartData<'bar'> = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [{ label: 'Live Revenue (k$)', data: [44, 57, 39] }],
  };
  public randomizeRevenueData(): void {
    this.dynamicRevenueData = {
      labels: this.dynamicRevenueData.labels,
      datasets: [
        {
          label: 'Live Revenue (k$)',
          data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
        },
      ],
    };
  }
}
