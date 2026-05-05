import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Inplace } from 'ui-lib-custom/inplace';
import type { InplaceVariant } from 'ui-lib-custom/inplace';

/**
 * Demo page for the Inplace component.
 */
@Component({
  selector: 'app-inplace-demo',
  standalone: true,
  imports: [Inplace],
  templateUrl: './inplace-demo.component.html',
  styleUrl: './inplace-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InplaceDemoComponent {
  public readonly variants: InplaceVariant[] = ['material', 'bootstrap', 'minimal'];

  // Basic demo
  public readonly basicActive: WritableSignal<boolean> = signal<boolean>(false);
  public readonly basicText: WritableSignal<string> = signal<string>('Click to edit this text');

  // Closable demo
  public readonly closableActive: WritableSignal<boolean> = signal<boolean>(false);
  public closableText: string = 'PrimeNG 19.0.0';

  // Image demo
  public readonly imageActive: WritableSignal<boolean> = signal<boolean>(false);

  // Disabled demo
  public readonly disabledText: string = 'This field is read-only';

  // Variants demo
  public readonly variantActives: WritableSignal<Record<InplaceVariant, boolean>> = signal<
    Record<InplaceVariant, boolean>
  >({
    material: false,
    bootstrap: false,
    minimal: false,
  });

  // Event log
  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public onActivated(label: string): void {
    this.eventLog.update((log: string[]): string[] => [`${label} activated`, ...log].slice(0, 5));
  }

  public onDeactivated(label: string): void {
    this.eventLog.update((log: string[]): string[] => [`${label} deactivated`, ...log].slice(0, 5));
  }

  public setVariantActive(variant: InplaceVariant, value: boolean): void {
    this.variantActives.update(
      (current: Record<InplaceVariant, boolean>): Record<InplaceVariant, boolean> => ({
        ...current,
        [variant]: value,
      })
    );
  }

  public clearLog(): void {
    this.eventLog.set([]);
  }
}
