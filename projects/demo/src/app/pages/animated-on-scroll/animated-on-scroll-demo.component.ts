import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming AnimatedOnScroll component.
 */
@Component({
  selector: 'app-animated-on-scroll-demo',
  standalone: true,
  templateUrl: './animated-on-scroll-demo.component.html',
  styleUrl: './animated-on-scroll-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedOnScrollDemoComponent {}
