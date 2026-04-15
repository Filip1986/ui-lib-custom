import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Timeline component.
 */
@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  templateUrl: './timeline-demo.component.html',
  styleUrl: './timeline-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {}
