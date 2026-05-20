import { Component } from '@angular/core';
import { PieChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [PieChartComponent],
  templateUrl: './pie-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly marketShareData: ChartData<'pie'> = {
    labels: ['North America', 'Europe', 'APAC', 'LATAM'],
    datasets: [{ label: 'Market Share', data: [37, 28, 24, 11] }],
  };
}
