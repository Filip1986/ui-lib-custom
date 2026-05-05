import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Skeleton } from 'ui-lib-custom/skeleton';
import type { SkeletonVariant } from 'ui-lib-custom/skeleton';

/**
 * Demo page for the Skeleton component.
 */
@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [Skeleton],
  templateUrl: './skeleton-demo.component.html',
  styleUrl: './skeleton-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {
  public readonly variants: SkeletonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly isLoaded: WritableSignal<boolean> = signal<boolean>(false);

  public toggleLoaded(): void {
    this.isLoaded.set(!this.isLoaded());
  }
}
