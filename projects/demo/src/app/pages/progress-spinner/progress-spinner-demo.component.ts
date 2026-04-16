import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ProgressSpinner component.
 */
@Component({
  selector: 'app-progress-spinner-demo',
  standalone: true,
  templateUrl: './progress-spinner-demo.component.html',
  styleUrl: './progress-spinner-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerDemoComponent {}
