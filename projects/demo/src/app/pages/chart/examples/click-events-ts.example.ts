import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartClickEvent } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './click-events-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly clickableRevenueData: ChartData<'bar'> = {
    labels: ['API', 'Web', 'Partner', 'Mobile'],
    datasets: [{ label: 'Revenue by Channel (k$)', data: [58, 79, 43, 64] }],
  };
  public onChartClick(event: ChartClickEvent): void {
    console.log('Clicked element index:', event.activeElements[0]?.index);
  }
}
