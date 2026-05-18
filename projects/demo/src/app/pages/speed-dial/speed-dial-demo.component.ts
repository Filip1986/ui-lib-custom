import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
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
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

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
  imports: [
    CodeSnippet,
    Icon,
    SpeedDialComponent,
    SpeedDialIconDirective,
    SpeedDialItemDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './speed-dial-demo.component.html',
  styleUrl: './speed-dial-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpeedDialDemoComponent {
  public readonly importCode: string =
    "import { SpeedDialComponent } from 'ui-lib-custom/speed-dial'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'linear', label: 'Linear' },
    { id: 'circle', label: 'Circle' },
    { id: 'semi-circle', label: 'Semi-Circle' },
    { id: 'quarter-circle', label: 'Quarter-Circle' },
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'mask', label: 'Mask' },
    { id: 'custom-template', label: 'Custom Template' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'event-log', label: 'Event Log' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
