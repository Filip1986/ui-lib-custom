import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Rating component.
 */
@Component({
  selector: 'app-rating-demo',
  standalone: true,
  templateUrl: './rating-demo.component.html',
  styleUrl: './rating-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDemoComponent {}
