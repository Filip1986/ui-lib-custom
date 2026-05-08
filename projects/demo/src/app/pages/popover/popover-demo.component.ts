import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';
import type { PopoverVariant } from 'ui-lib-custom/popover';

/**
 * Demo page for the Popover component.
 */
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [Popover],
  templateUrl: './popover-demo.component.html',
  styleUrl: './popover-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
  public readonly variants: PopoverVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly lastEvent: WritableSignal<string> = signal<string>('—');
  public readonly declarativeVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly selectedVariant: WritableSignal<PopoverVariant> =
    signal<PopoverVariant>('material');

  public onShown(): void {
    this.lastEvent.set('shown');
  }

  public onHidden(): void {
    this.lastEvent.set('hidden');
  }
}
