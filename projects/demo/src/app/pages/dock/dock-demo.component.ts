import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Dock } from 'ui-lib-custom/dock';
import type {
  DockItem,
  DockItemCommandEvent,
  DockPosition,
  DockSize,
  DockVariant,
} from 'ui-lib-custom/dock';

/**
 * Demo page for the Dock component.
 */
@Component({
  selector: 'app-dock-demo',
  standalone: true,
  imports: [Dock],
  templateUrl: './dock-demo.component.html',
  styleUrl: './dock-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockDemoComponent {
  // ── Controls ──────────────────────────────────────────────────────────────

  public readonly variant: WritableSignal<DockVariant> = signal<DockVariant>('material');
  public readonly size: WritableSignal<DockSize> = signal<DockSize>('md');
  public readonly position: WritableSignal<DockPosition> = signal<DockPosition>('bottom');
  public readonly magnification: WritableSignal<boolean> = signal<boolean>(true);
  public readonly magnificationLevel: WritableSignal<number> = signal<number>(1.5);
  public readonly lastEvent: WritableSignal<string> = signal<string>('');

  // ── Available options ──────────────────────────────────────────────────────

  public readonly variants: DockVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: DockSize[] = ['sm', 'md', 'lg'];
  public readonly positions: DockPosition[] = ['bottom', 'top', 'left', 'right'];

  // ── Sample item sets ──────────────────────────────────────────────────────

  /** OS-style dock items used in most demos. */
  public readonly osItems: DockItem[] = [
    {
      label: 'Finder',
      icon: 'bootstrapList',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Terminal',
      icon: 'bootstrapPencil',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Browser',
      icon: 'bootstrapShare',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Mail',
      icon: 'bootstrapEnvelope',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Music',
      icon: 'bootstrapStar',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Photos',
      icon: 'bootstrapHeart',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Settings',
      icon: 'bootstrapGear',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Trash',
      icon: 'bootstrapTrash',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
  ];

  /** Items with some disabled entries. */
  public readonly itemsWithDisabled: DockItem[] = [
    {
      label: 'Home',
      icon: 'bootstrapHouse',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Search (unavailable)',
      icon: 'bootstrapSearch',
      disabled: true,
    },
    {
      label: 'Star',
      icon: 'bootstrapStar',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Bell (unavailable)',
      icon: 'bootstrapBell',
      disabled: true,
    },
    {
      label: 'User',
      icon: 'bootstrapPerson',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
  ];

  /** External anchor items (url / routerLink). */
  public readonly linkItems: DockItem[] = [
    {
      label: 'Anthropic',
      icon: 'bootstrapArrowRight',
      url: 'https://anthropic.com',
      target: '_blank',
    },
    {
      label: 'Angular',
      icon: 'bootstrapPencil',
      url: 'https://angular.dev',
      target: '_blank',
    },
    {
      label: 'Home',
      icon: 'bootstrapHouse',
      routerLink: '/',
    },
  ];

  // ── Event handler for playground ──────────────────────────────────────────

  /** Handles itemClick from the interactive playground dock. */
  public onItemClick(event: DockItemCommandEvent): void {
    this.lastEvent.set(`Clicked: ${event.item.label ?? '(no label)'}`);
  }

  /** Sets the active variant. */
  public setVariant(variant: DockVariant): void {
    this.variant.set(variant);
  }

  /** Sets the active size. */
  public setSize(size: DockSize): void {
    this.size.set(size);
  }

  /** Sets the active position. */
  public setPosition(position: DockPosition): void {
    this.position.set(position);
  }
}
