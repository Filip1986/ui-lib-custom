import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Slider component.
 */
@Component({
  selector: 'app-slider-demo',
  standalone: true,
  templateUrl: './slider-demo.component.html',
  styleUrl: './slider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {}
