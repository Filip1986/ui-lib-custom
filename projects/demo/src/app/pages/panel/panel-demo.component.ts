import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';
import type { PanelToggleEvent, PanelVariant } from 'ui-lib-custom/panel';

/**
 * Demo page for the Panel component.
 */
@Component({
  selector: 'app-panel-demo',
  standalone: true,
  imports: [Panel],
  templateUrl: './panel-demo.component.html',
  styleUrl: './panel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelDemoComponent {
  public readonly isToggleableCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isStartCollapsed: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundToggleable: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<PanelVariant> =
    signal<PanelVariant>('material');
  public readonly lastToggleEvent: WritableSignal<PanelToggleEvent | null> =
    signal<PanelToggleEvent | null>(null);

  public readonly variants: PanelVariant[] = ['material', 'bootstrap', 'minimal'];

  public setPlaygroundVariant(variant: PanelVariant): void {
    this.playgroundVariant.set(variant);
  }

  public handleToggle(event: PanelToggleEvent): void {
    this.lastToggleEvent.set(event);
  }
}
