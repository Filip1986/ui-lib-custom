import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ProgressBar component.
 */
@Component({
  selector: 'app-progress-bar-demo',
  standalone: true,
  templateUrl: './progress-bar-demo.component.html',
  styleUrl: './progress-bar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarDemoComponent {}
