import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Carousel component.
 */
@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  templateUrl: './carousel-demo.component.html',
  styleUrl: './carousel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselDemoComponent {}
