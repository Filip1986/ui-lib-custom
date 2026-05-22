import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './polar-area-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly polarPriorityData: ChartData<'polarArea'> = {
    labels: ['Performance', 'Localization', 'A11y', 'Analytics', 'Automation'],
    datasets: [{ label: 'Roadmap Priority', data: [14, 10, 12, 8, 9] }],
  };
}
