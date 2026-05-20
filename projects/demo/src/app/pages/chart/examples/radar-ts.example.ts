import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './radar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly radarCapabilityData: ChartData<'radar'> = {
    labels: ['Reliability', 'Security', 'Scalability', 'Usability', 'Support', 'Speed'],
    datasets: [{ label: 'Platform Capability', data: [85, 88, 90, 79, 84, 87] }],
  };
}
