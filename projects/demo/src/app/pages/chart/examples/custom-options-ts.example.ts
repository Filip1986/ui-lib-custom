import { Component } from '@angular/core';
import { DoughnutChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartOptions } from 'ui-lib-custom/chart';
import type { TooltipItem } from 'chart.js';

@Component({
  standalone: true,
  imports: [DoughnutChartComponent],
  templateUrl: './custom-options-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly customOptionsData: ChartData<'doughnut'> = {
    labels: ['Onboarding', 'Expansion', 'Renewal'],
    datasets: [{ label: 'Pipeline Mix', data: [29, 46, 25] }],
  };
  public readonly customLegendOptions: ChartOptions<'doughnut'> = {
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>): string =>
            `${context.label}: ${String(context.parsed)} deals`,
        },
      },
    },
  };
}
