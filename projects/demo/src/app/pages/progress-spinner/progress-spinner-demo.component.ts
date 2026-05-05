import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ProgressSpinner } from 'ui-lib-custom/progress-spinner';
import type { ProgressSpinnerSize, ProgressSpinnerVariant } from 'ui-lib-custom/progress-spinner';

/**
 * Demo page for the ProgressSpinner component.
 */
@Component({
  selector: 'app-progress-spinner-demo',
  standalone: true,
  imports: [ProgressSpinner],
  templateUrl: './progress-spinner-demo.component.html',
  styleUrl: './progress-spinner-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerDemoComponent {
  // ---- Interactive controls -----------------------------------------------
  public readonly interactiveSize: WritableSignal<ProgressSpinnerSize> =
    signal<ProgressSpinnerSize>('md');

  public readonly interactiveVariant: WritableSignal<ProgressSpinnerVariant> =
    signal<ProgressSpinnerVariant>('material');

  public readonly interactiveDuration: WritableSignal<string> = signal<string>('2s');

  public readonly interactiveStrokeWidth: WritableSignal<string> = signal<string>('2');

  // ---- Helpers -------------------------------------------------------------
  public setSize(size: ProgressSpinnerSize): void {
    this.interactiveSize.set(size);
  }

  public setVariant(variant: ProgressSpinnerVariant): void {
    this.interactiveVariant.set(variant);
  }

  public setDuration(duration: string): void {
    this.interactiveDuration.set(duration);
  }

  public setStrokeWidth(width: string): void {
    this.interactiveStrokeWidth.set(width);
  }
}
