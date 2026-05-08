import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';
import {
  SpeedDialComponent,
  SpeedDialIconDirective,
  SpeedDialItemDirective,
} from 'ui-lib-custom/speed-dial';
import type {
  SpeedDialDirection,
  SpeedDialItem,
  SpeedDialItemCommandEvent,
  SpeedDialVariant,
} from 'ui-lib-custom/speed-dial';

interface SpeedDialLogEntry {
  timestamp: string;
  message: string;
}

/**
 * Demo page for the SpeedDial component.
 * Shows all layout types, directions, tooltip, mask, template, and disabled states.
 */
@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  imports: [Icon, SpeedDialComponent, SpeedDialIconDirective, SpeedDialItemDirective],
  templateUrl: './speed-dial-demo.component.html',
  styleUrl: './speed-dial-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpeedDialDemoComponent {
  public readonly activeVariant: WritableSignal<SpeedDialVariant> =
    signal<SpeedDialVariant>('material');
  public readonly eventLog: WritableSignal<SpeedDialLogEntry[]> = signal<SpeedDialLogEntry[]>([]);

  public readonly variants: SpeedDialVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly linearDirections: readonly SpeedDialDirection[] = ['up', 'down', 'left', 'right'];
  public readonly quarterDirections: readonly SpeedDialDirection[] = [
    'up-left',
    'up-right',
    'down-left',
    'down-right',
  ];

  public readonly items: SpeedDialItem[] = [
    {
      label: 'Add',
      icon: 'plus',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Update',
      icon: 'pencil',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Delete',
      icon: 'trash',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Search',
      icon: 'search',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Share',
      icon: 'share-nodes',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
  ];

  public readonly itemsWithTooltip: SpeedDialItem[] = this.items.map(
    (item: SpeedDialItem, index: number): SpeedDialItem => ({
      ...item,
      tooltip: `${item.label ?? 'Action'} action`,
      styleClass: `demo-speed-dial-item-${String(index + 1)}`,
    })
  );

  public setVariant(variant: SpeedDialVariant): void {
    this.activeVariant.set(variant);
  }

  public logEvent(message: string): void {
    const timestamp: string = new Date().toLocaleTimeString();
    this.eventLog.update((entries: SpeedDialLogEntry[]): SpeedDialLogEntry[] => [
      { timestamp, message: `Clicked: ${message}` },
      ...entries.slice(0, 9),
    ]);
  }
}
