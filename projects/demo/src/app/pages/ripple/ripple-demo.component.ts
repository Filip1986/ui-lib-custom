import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Ripple } from 'ui-lib-custom/ripple';
import { Button } from 'ui-lib-custom/button';

/**
 * Demo page for the Ripple directive.
 */
@Component({
  selector: 'app-ripple-demo',
  standalone: true,
  imports: [Ripple, Button],
  templateUrl: './ripple-demo.component.html',
  styleUrl: './ripple-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RippleDemoComponent {
  public readonly isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public toggleDisabled(): void {
    this.isDisabled.set(!this.isDisabled());
  }
}
