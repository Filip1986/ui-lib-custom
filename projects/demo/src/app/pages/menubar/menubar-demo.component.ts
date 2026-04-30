import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Menubar } from 'ui-lib-custom/menubar';
import type {
  MenubarCommandEvent,
  MenubarItem,
  MenubarSize,
  MenubarVariant,
} from 'ui-lib-custom/menubar';

/**
 * Demo page for the Menubar component.
 */
@Component({
  selector: 'app-menubar-demo',
  standalone: true,
  imports: [Menubar],
  templateUrl: './menubar-demo.component.html',
  styleUrl: './menubar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarDemoComponent {
  // ── Basic model ───────────────────────────────────────────────────────────

  public readonly basicModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-file' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
        { label: 'Save As', icon: 'pi pi-copy' },
        { separator: true },
        { label: 'Exit', icon: 'pi pi-sign-out' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', icon: 'pi pi-undo' },
        { label: 'Redo', icon: 'pi pi-redo' },
        { separator: true },
        { label: 'Cut', icon: 'pi pi-scissors' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clipboard' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', icon: 'pi pi-plus' },
        { label: 'Zoom Out', icon: 'pi pi-minus' },
        { separator: true },
        { label: 'Full Screen', icon: 'pi pi-window-maximize' },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Documentation', url: 'https://example.com/docs', target: '_blank' },
        { label: 'About' },
      ],
    },
  ];

  // ── Nested model ──────────────────────────────────────────────────────────

  public readonly nestedModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          icon: 'pi pi-file',
          items: [{ label: 'Project' }, { label: 'File' }, { label: 'Folder' }],
        },
        {
          label: 'Open Recent',
          icon: 'pi pi-history',
          items: [
            { label: 'Project Alpha' },
            { label: 'Project Beta' },
            { label: 'Project Gamma' },
          ],
        },
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { label: 'Preferences', icon: 'pi pi-cog' },
        {
          label: 'Theme',
          icon: 'pi pi-palette',
          items: [{ label: 'Light Mode' }, { label: 'Dark Mode' }, { label: 'System Default' }],
        },
      ],
    },
    { label: 'Dashboard', url: '/home' },
    { label: 'Docs', url: 'https://example.com/docs', target: '_blank' },
  ];

  // ── Disabled items model ──────────────────────────────────────────────────

  public readonly disabledModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New' },
        { label: 'Open' },
        { label: 'Save', disabled: true },
        { separator: true },
        { label: 'Export PDF', disabled: true },
      ],
    },
    {
      label: 'Edit',
      disabled: true,
      items: [{ label: 'Cut' }, { label: 'Copy' }],
    },
    { label: 'View' },
  ];

  // ── Command model ─────────────────────────────────────────────────────────

  public readonly lastClickedLabel: WritableSignal<string> = signal<string>('(none)');

  public readonly commandModel: MenubarItem[] = [
    {
      label: 'Actions',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
          command: (): void => {
            this.lastClickedLabel.set('Refresh');
          },
        },
        {
          label: 'Download',
          icon: 'pi pi-download',
          command: (): void => {
            this.lastClickedLabel.set('Download');
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: (): void => {
            this.lastClickedLabel.set('Delete');
          },
        },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: (): void => {
            this.lastClickedLabel.set('Profile');
          },
        },
        {
          label: 'Preferences',
          icon: 'pi pi-cog',
          command: (): void => {
            this.lastClickedLabel.set('Preferences');
          },
        },
      ],
    },
  ];

  // ── itemClick event log ───────────────────────────────────────────────────

  public readonly itemClickLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly eventModel: MenubarItem[] = [
    {
      label: 'Navigate',
      items: [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }],
    },
    {
      label: 'Resources',
      items: [{ label: 'Docs' }, { label: 'API Reference' }, { label: 'Blog' }],
    },
  ];

  public handleItemClick(event: MenubarCommandEvent): void {
    const log: string[] = this.itemClickLog();
    const entry: string = `Clicked: "${event.item.label ?? 'unknown'}"`;
    this.itemClickLog.set([entry, ...log].slice(0, 6));
  }

  // ── Variant / size playground ──────────────────────────────────────────────

  public readonly playgroundVariant: WritableSignal<MenubarVariant> =
    signal<MenubarVariant>('material');
  public readonly playgroundSize: WritableSignal<MenubarSize> = signal<MenubarSize>('md');

  public readonly variants: MenubarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: MenubarSize[] = ['sm', 'md', 'lg'];

  public setVariant(value: MenubarVariant): void {
    this.playgroundVariant.set(value);
  }

  public setSize(value: MenubarSize): void {
    this.playgroundSize.set(value);
  }
}
