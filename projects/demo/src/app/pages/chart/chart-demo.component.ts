import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Chart component.
 */
@Component({
  selector: 'app-chart-demo',
  standalone: true,
  templateUrl: './chart-demo.component.html',
  styleUrl: './chart-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDemoComponent {}
