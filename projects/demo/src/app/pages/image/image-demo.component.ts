import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Image component.
 */
@Component({
  selector: 'app-image-demo',
  standalone: true,
  templateUrl: './image-demo.component.html',
  styleUrl: './image-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDemoComponent {}
