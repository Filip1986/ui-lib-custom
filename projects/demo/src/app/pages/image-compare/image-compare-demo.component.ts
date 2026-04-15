import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ImageCompare component.
 */
@Component({
  selector: 'app-image-compare-demo',
  standalone: true,
  templateUrl: './image-compare-demo.component.html',
  styleUrl: './image-compare-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompareDemoComponent {}
