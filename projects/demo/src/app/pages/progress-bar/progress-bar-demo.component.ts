import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ProgressBar } from 'ui-lib-custom/progress-bar';
import type { ProgressBarVariant } from 'ui-lib-custom/progress-bar';

/**
 * Demo page for the ProgressBar component.
 */
@Component({
  selector: 'app-progress-bar-demo',
  standalone: true,
  imports: [ProgressBar],
  templateUrl: './progress-bar-demo.component.html',
  styleUrl: './progress-bar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarDemoComponent {
  public readonly basicValue: WritableSignal<number> = signal<number>(75);
  public readonly dynamicValue: WritableSignal<number> = signal<number>(0);

  public readonly variants: ProgressBarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];

  public increment(): void {
    const current: number = this.dynamicValue();
    this.dynamicValue.set(Math.min(current + 10, 100));
  }

  public reset(): void {
    this.dynamicValue.set(0);
  }
}
