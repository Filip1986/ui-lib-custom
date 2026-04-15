import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Scroller component.
 */
@Component({
  selector: 'app-scroller-demo',
  standalone: true,
  templateUrl: './scroller-demo.component.html',
  styleUrl: './scroller-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerDemoComponent {}
