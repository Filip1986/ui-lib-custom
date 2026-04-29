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
      icon: 'pi pi-folder',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Terminal',
      icon: 'pi pi-code',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Browser',
      icon: 'pi pi-globe',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Mail',
      icon: 'pi pi-envelope',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Music',
      icon: 'pi pi-headphones',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Photos',
      icon: 'pi pi-images',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Trash',
      icon: 'pi pi-trash',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
  ];

  /** Items with some disabled entries. */
  public readonly itemsWithDisabled: DockItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Search (unavailable)',
      icon: 'pi pi-search',
      disabled: true,
    },
    {
      label: 'Star',
      icon: 'pi pi-star',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Bell (unavailable)',
      icon: 'pi pi-bell',
      disabled: true,
    },
    {
      label: 'User',
      icon: 'pi pi-user',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
  ];

  /** External anchor items (url / routerLink). */
  public readonly linkItems: DockItem[] = [
    {
      label: 'Anthropic',
      icon: 'pi pi-external-link',
      url: 'https://anthropic.com',
      target: '_blank',
    },
    {
      label: 'Angular',
      icon: 'pi pi-code',
      url: 'https://angular.dev',
      target: '_blank',
    },
    {
      label: 'Home',
      icon: 'pi pi-home',
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
