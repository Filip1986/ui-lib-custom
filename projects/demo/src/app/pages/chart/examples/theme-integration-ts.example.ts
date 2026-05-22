import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';
import { Button } from 'ui-lib-custom/button';
import { Inline } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [LineChartComponent, Button, Inline, CommonModule],
  templateUrl: './theme-integration-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public selectedProfile: 'material' | 'bootstrap' | 'minimal' = 'material';
  public readonly themeBridgeData: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{ label: 'Satisfaction Score', data: [72, 76, 81, 85], tension: 0.35 }],
  };
  public setThemeProfile(
    profile: 'material' | 'bootstrap' | 'minimal',
    chart: { refresh(): void }
  ): void {
    this.selectedProfile = profile;
    chart.refresh();
  }
  public themeCssVariables(): Record<string, string> {
    return {};
  }
}
