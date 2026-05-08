import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';
import type { FieldsetVariant } from 'ui-lib-custom/fieldset';

/**
 * Demo page for the Fieldset component.
 */
@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  imports: [Fieldset],
  templateUrl: './fieldset-demo.component.html',
  styleUrl: './fieldset-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoComponent {
  public readonly isBasicCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isAdvancedCollapsed: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundToggleable: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<FieldsetVariant> =
    signal<FieldsetVariant>('material');

  public readonly variants: FieldsetVariant[] = ['material', 'bootstrap', 'minimal'];

  public toggleBasic(): void {
    this.isBasicCollapsed.update((current: boolean): boolean => !current);
  }

  public setPlaygroundVariant(variant: FieldsetVariant): void {
    this.playgroundVariant.set(variant);
  }
}
