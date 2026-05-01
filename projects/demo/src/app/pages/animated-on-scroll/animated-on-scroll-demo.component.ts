import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll';

/**
 * Demo page for the AnimateOnScroll directive.
 * Shows all built-in SCSS preset classes and demonstrates repeat mode,
 * custom threshold, and the full input/output API.
 */
@Component({
  selector: 'app-animated-on-scroll-demo',
  standalone: true,
  imports: [AnimateOnScroll],
  templateUrl: './animated-on-scroll-demo.component.html',
  styleUrl: './animated-on-scroll-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedOnScrollDemoComponent {}
