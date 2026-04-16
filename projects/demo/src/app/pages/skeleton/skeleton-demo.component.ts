import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Skeleton component.
 */
@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  templateUrl: './skeleton-demo.component.html',
  styleUrl: './skeleton-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {}
