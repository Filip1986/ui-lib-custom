import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type {
  TieredMenuItem,
  TieredMenuItemCommandEvent,
  TieredMenuVariant,
  TieredMenuSize,
} from 'ui-lib-custom/tiered-menu';

/**
 * Demo page for the TieredMenu component.
 */
@Component({
  selector: 'app-tiered-menu-demo',
  standalone: true,
  imports: [TieredMenu],
  templateUrl: './tiered-menu-demo.component.html',
  styleUrl: './tiered-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TieredMenuDemoComponent {
  public readonly variant: WritableSignal<TieredMenuVariant> =
    signal<TieredMenuVariant>('material');
  public readonly size: WritableSignal<TieredMenuSize> = signal<TieredMenuSize>('md');
  public readonly lastEvent: WritableSignal<string> = signal<string>('');

  /** Simple flat menu used in the basic example. */
  public readonly basicItems: TieredMenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
    { label: 'Save As', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Exit', icon: 'pi pi-times' },
  ];

  /** Three-level deep nested menu for the nested example. */
  public readonly nestedItems: TieredMenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-file',
      items: [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        {
          label: 'Export',
          icon: 'pi pi-download',
          items: [
            { label: 'PDF', icon: 'pi pi-file-pdf' },
            { label: 'CSV', icon: 'pi pi-table' },
            { label: 'Excel', icon: 'pi pi-file-excel' },
          ],
        },
      ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      items: [
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clone' },
        { separator: true },
        { label: 'Select All' },
      ],
    },
    {
      label: 'View',
      icon: 'pi pi-eye',
      items: [{ label: 'Zoom In' }, { label: 'Zoom Out' }, { label: 'Reset Zoom' }],
    },
    { separator: true },
    { label: 'Quit', icon: 'pi pi-power-off' },
  ];

  /** Items with some disabled and hidden entries. */
  public readonly stateItems: TieredMenuItem[] = [
    { label: 'Enabled', icon: 'pi pi-check' },
    { label: 'Disabled', icon: 'pi pi-ban', disabled: true },
    { label: 'Hidden', visible: false },
    { separator: true },
    {
      label: 'With Command',
      command: (event: TieredMenuItemCommandEvent): void => {
        this.onItemClick(event);
      },
    },
  ];

  /** Items with URLs. */
  public readonly urlItems: TieredMenuItem[] = [
    { label: 'GitHub', url: 'https://github.com', target: '_blank' },
    { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
    { separator: true },
    { label: 'No URL item' },
  ];

  /** Items for the popup example. */
  public readonly popupItems: TieredMenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    {
      label: 'Share',
      icon: 'pi pi-share-alt',
      items: [
        { label: 'Email' },
        { label: 'Copy Link' },
        { label: 'Social Media', items: [{ label: 'Twitter' }, { label: 'LinkedIn' }] },
      ],
    },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ];

  public onItemClick(event: TieredMenuItemCommandEvent): void {
    this.lastEvent.set(`Clicked: ${event.item.label ?? '(no label)'}`);
  }

  public setVariant(value: TieredMenuVariant): void {
    this.variant.set(value);
  }

  public setSize(value: TieredMenuSize): void {
    this.size.set(value);
  }
}
