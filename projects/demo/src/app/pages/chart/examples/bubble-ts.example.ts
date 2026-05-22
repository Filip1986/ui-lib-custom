import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './bubble-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly bubbleSegmentData: ChartData<'bubble'> = {
    datasets: [
      {
        label: 'Enterprise',
        data: [
          { x: 18, y: 42, r: 14 },
          { x: 25, y: 57, r: 18 },
        ],
      },
      {
        label: 'SMB',
        data: [
          { x: 12, y: 34, r: 10 },
          { x: 20, y: 39, r: 11 },
        ],
      },
    ],
  };
}
