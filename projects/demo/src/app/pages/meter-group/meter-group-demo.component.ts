import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming MeterGroup component.
 */
@Component({
  selector: 'app-meter-group-demo',
  standalone: true,
  templateUrl: './meter-group-demo.component.html',
  styleUrl: './meter-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterGroupDemoComponent {}
