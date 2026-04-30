import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { MegaMenu } from 'ui-lib-custom/mega-menu';
import { Button } from 'ui-lib-custom/button';
import type {
  MegaMenuCommandEvent,
  MegaMenuItem,
  MegaMenuOrientation,
  MegaMenuSize,
  MegaMenuVariant,
} from 'ui-lib-custom/mega-menu';

/**
 * Demo page for the MegaMenu component.
 */
@Component({
  selector: 'app-mega-menu-demo',
  standalone: true,
  imports: [MegaMenu, Button],
  templateUrl: './mega-menu-demo.component.html',
  styleUrl: './mega-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuDemoComponent {
  // ── Basic model ───────────────────────────────────────────

  public readonly basicModel: MegaMenuItem[] = [
    {
      label: 'Products',
      items: [
        {
          header: 'Design Tools',
          items: [
            { label: 'Figma Plugin', icon: 'pi pi-palette' },
            { label: 'Sketch Export', icon: 'pi pi-pencil' },
            { label: 'Adobe XD', icon: 'pi pi-image' },
          ],
        },
        {
          header: 'Developer Tools',
          items: [
            { label: 'VS Code Extension', icon: 'pi pi-code' },
            { label: 'CLI Toolkit', icon: 'pi pi-terminal' },
            { label: 'Component Generator', icon: 'pi pi-cog' },
          ],
        },
        {
          header: 'Analytics',
          items: [
            { label: 'Dashboard', icon: 'pi pi-chart-bar' },
            { label: 'Reports', icon: 'pi pi-file-export' },
            { label: 'Usage Stats', icon: 'pi pi-chart-line' },
          ],
        },
      ],
    },
    {
      label: 'Solutions',
      items: [
        {
          header: 'By Industry',
          items: [
            { label: 'Healthcare', icon: 'pi pi-heart' },
            { label: 'Finance', icon: 'pi pi-wallet' },
            { label: 'Education', icon: 'pi pi-book' },
            { label: 'E-Commerce', icon: 'pi pi-shopping-cart' },
          ],
        },
        {
          header: 'By Team',
          items: [
            { label: 'Designers', icon: 'pi pi-palette' },
            { label: 'Developers', icon: 'pi pi-code' },
            { label: 'Product Managers', icon: 'pi pi-briefcase' },
          ],
        },
      ],
    },
    {
      label: 'Documentation',
      url: 'https://example.com/docs',
      target: '_blank',
    },
    {
      label: 'Company',
      items: [
        {
          header: 'About',
          items: [
            { label: 'Our Story', icon: 'pi pi-info-circle' },
            { label: 'Team', icon: 'pi pi-users' },
            { label: 'Careers', icon: 'pi pi-briefcase' },
          ],
        },
        {
          header: 'Connect',
          items: [
            { label: 'Blog', icon: 'pi pi-pencil' },
            { label: 'Newsletter', icon: 'pi pi-envelope' },
            { label: 'Community', icon: 'pi pi-comments' },
          ],
        },
      ],
    },
  ];

  // ── Model with disabled items and separators ─────────────────────────

  public readonly disabledModel: MegaMenuItem[] = [
    {
      label: 'File',
      items: [
        {
          header: 'Operations',
          items: [
            { label: 'New', icon: 'pi pi-file' },
            { label: 'Open', icon: 'pi pi-folder-open' },
            { separator: true },
            { label: 'Save', icon: 'pi pi-save' },
            { label: 'Save As', icon: 'pi pi-copy', disabled: true },
            { separator: true },
            { label: 'Export PDF', icon: 'pi pi-file-pdf', disabled: true },
          ],
        },
        {
          header: 'Recent',
          items: [
            { label: 'Project Alpha', icon: 'pi pi-clock' },
            { label: 'Project Beta', icon: 'pi pi-clock' },
            { label: 'Project Gamma', icon: 'pi pi-clock', disabled: true },
          ],
        },
      ],
    },
    {
      label: 'Edit',
      disabled: true,
      items: [
        {
          items: [{ label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }],
        },
      ],
    },
    {
      label: 'View',
      items: [
        {
          items: [
            { label: 'Zoom In', icon: 'pi pi-plus' },
            { label: 'Zoom Out', icon: 'pi pi-minus' },
            { label: 'Full Screen', icon: 'pi pi-window-maximize' },
          ],
        },
      ],
    },
  ];

  // ── Command model ───────────────────────────────────────────

  public readonly lastClickedLabel: WritableSignal<string> = signal<string>('(none)');

  public readonly commandModel: MegaMenuItem[] = [
    {
      label: 'Actions',
      items: [
        {
          header: 'Quick Actions',
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
              label: 'Share',
              icon: 'pi pi-share-alt',
              command: (): void => {
                this.lastClickedLabel.set('Share');
              },
            },
          ],
        },
        {
          header: 'Danger Zone',
          items: [
            {
              label: 'Archive',
              icon: 'pi pi-inbox',
              command: (): void => {
                this.lastClickedLabel.set('Archive');
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
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          items: [
            {
              label: 'Preferences',
              icon: 'pi pi-cog',
              command: (): void => {
                this.lastClickedLabel.set('Preferences');
              },
            },
            {
              label: 'Profile',
              icon: 'pi pi-user',
              command: (): void => {
                this.lastClickedLabel.set('Profile');
              },
            },
          ],
        },
      ],
    },
  ];

  // ── Vertical model ────────────────────────────────────────────

  public readonly verticalModel: MegaMenuItem[] = [
    {
      label: 'Overview',
      items: [
        {
          header: 'Dashboard',
          items: [
            { label: 'Analytics', icon: 'pi pi-chart-bar' },
            { label: 'Reports', icon: 'pi pi-file' },
            { label: 'KPIs', icon: 'pi pi-chart-line' },
          ],
        },
      ],
    },
    {
      label: 'Users',
      items: [
        {
          header: 'Management',
          items: [
            { label: 'All Users', icon: 'pi pi-users' },
            { label: 'Roles', icon: 'pi pi-lock' },
            { label: 'Invites', icon: 'pi pi-envelope' },
          ],
        },
        {
          header: 'Activity',
          items: [
            { label: 'Login History', icon: 'pi pi-history' },
            { label: 'Sessions', icon: 'pi pi-desktop' },
          ],
        },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          items: [
            { label: 'General', icon: 'pi pi-cog' },
            { label: 'Security', icon: 'pi pi-shield' },
            { label: 'Billing', icon: 'pi pi-credit-card' },
          ],
        },
      ],
    },
  ];

  // ── Variant / size playground ─────────────────────────────────────

  public readonly playgroundVariant: WritableSignal<MegaMenuVariant> =
    signal<MegaMenuVariant>('material');
  public readonly playgroundSize: WritableSignal<MegaMenuSize> = signal<MegaMenuSize>('md');
  public readonly playgroundOrientation: WritableSignal<MegaMenuOrientation> =
    signal<MegaMenuOrientation>('horizontal');

  public readonly variants: MegaMenuVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: MegaMenuSize[] = ['sm', 'md', 'lg'];
  public readonly orientations: MegaMenuOrientation[] = ['horizontal', 'vertical'];

  public setPlaygroundVariant(value: MegaMenuVariant): void {
    this.playgroundVariant.set(value);
  }

  public setPlaygroundSize(value: MegaMenuSize): void {
    this.playgroundSize.set(value);
  }

  public setPlaygroundOrientation(value: MegaMenuOrientation): void {
    this.playgroundOrientation.set(value);
  }

  // ── itemClick event log ────────────────────────────────────────────

  public readonly itemClickLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly eventModel: MegaMenuItem[] = [
    {
      label: 'Navigate',
      items: [
        {
          header: 'Pages',
          items: [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }, { label: 'Blog' }],
        },
        {
          header: 'Resources',
          items: [{ label: 'Docs' }, { label: 'API Reference' }, { label: 'Changelog' }],
        },
      ],
    },
    {
      label: 'Community',
      items: [
        {
          items: [{ label: 'Forum' }, { label: 'Discord' }, { label: 'GitHub' }],
        },
      ],
    },
  ];

  public handleItemClick(event: MegaMenuCommandEvent): void {
    const log: string[] = this.itemClickLog();
    const newEntry: string = `Clicked: "${event.item.label ?? 'unknown'}"`;
    this.itemClickLog.set([newEntry, ...log].slice(0, 6));
  }
}
