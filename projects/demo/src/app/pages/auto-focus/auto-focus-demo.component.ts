import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';

/**
 * Demo page for the AutoFocus directive.
 * Demonstrates basic usage, conditional focus, and the full input API.
 */
@Component({
  selector: 'app-auto-focus-demo',
  standalone: true,
  imports: [AutoFocus],
  templateUrl: './auto-focus-demo.component.html',
  styleUrl: './auto-focus-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoFocusDemoComponent {
  public readonly showConditional: WritableSignal<boolean> = signal<boolean>(false);
  public readonly enableFocus: WritableSignal<boolean> = signal<boolean>(true);

  public toggleConditional(): void {
    this.showConditional.set(!this.showConditional());
  }

  public toggleFocus(): void {
    this.enableFocus.set(!this.enableFocus());
  }
}
