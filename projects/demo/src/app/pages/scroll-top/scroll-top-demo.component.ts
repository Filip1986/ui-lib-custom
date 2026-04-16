import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ScrollTop component.
 */
@Component({
  selector: 'app-scroll-top-demo',
  standalone: true,
  templateUrl: './scroll-top-demo.component.html',
  styleUrl: './scroll-top-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopDemoComponent {}
