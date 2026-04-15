import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming OrganizationChart component.
 */
@Component({
  selector: 'app-organization-chart-demo',
  standalone: true,
  templateUrl: './organization-chart-demo.component.html',
  styleUrl: './organization-chart-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationChartDemoComponent {}
