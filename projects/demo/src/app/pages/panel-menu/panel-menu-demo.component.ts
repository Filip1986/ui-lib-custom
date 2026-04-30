import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type {
  PanelMenuCommandEvent,
  PanelMenuItem,
  PanelMenuPanelToggleEvent,
} from 'ui-lib-custom/panel-menu';

/**
 * Demo page for the PanelMenu component.
 */
@Component({
  selector: 'app-panel-menu-demo',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './panel-menu-demo.component.html',
  styleUrl: './panel-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelMenuDemoComponent {
  // ── Basic ───────────────────────────────────────────────────────────────

  public readonly basicModel: PanelMenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      items: [
        { label: 'Profile', icon: 'pi pi-id-card' },
        { label: 'Security', icon: 'pi pi-lock' },
        { label: 'Notifications', icon: 'pi pi-bell' },
      ],
    },
    {
      label: 'Workspace',
      icon: 'pi pi-briefcase',
      items: [
        { label: 'Projects', icon: 'pi pi-folder' },
        { label: 'Analytics', icon: 'pi pi-chart-bar' },
        { label: 'Billing', icon: 'pi pi-credit-card' },
      ],
    },
    {
      label: 'Support',
      icon: 'pi pi-question-circle',
      items: [
        { label: 'Documentation', icon: 'pi pi-book' },
        { label: 'Help Center', icon: 'pi pi-info-circle' },
      ],
    },
  ];

  // ── Initially expanded ─────────────────────────────────────────────────

  public readonly expandedModel: PanelMenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-file',
      expanded: true,
      items: [
        { label: 'New File', icon: 'pi pi-plus' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
        { label: 'Export', icon: 'pi pi-download' },
      ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      items: [
        { label: 'Undo', icon: 'pi pi-replay' },
        { label: 'Redo', icon: 'pi pi-refresh' },
        { separator: true },
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clipboard' },
      ],
    },
    {
      label: 'View',
      icon: 'pi pi-eye',
      items: [
        { label: 'Zoom In', icon: 'pi pi-search-plus' },
        { label: 'Zoom Out', icon: 'pi pi-search-minus' },
        { label: 'Full Screen', icon: 'pi pi-window-maximize' },
      ],
    },
  ];

  // ── Multiple mode ─────────────────────────────────────────────────────

  public readonly multipleModel: PanelMenuItem[] = [
    {
      label: 'Frontend',
      icon: 'pi pi-desktop',
      items: [
        { label: 'Angular', icon: 'pi pi-circle' },
        { label: 'React', icon: 'pi pi-circle' },
        { label: 'Vue', icon: 'pi pi-circle' },
      ],
    },
    {
      label: 'Backend',
      icon: 'pi pi-server',
      items: [
        { label: 'Node.js', icon: 'pi pi-circle' },
        { label: 'Python', icon: 'pi pi-circle' },
        { label: 'Go', icon: 'pi pi-circle' },
      ],
    },
    {
      label: 'Database',
      icon: 'pi pi-database',
      items: [
        { label: 'PostgreSQL', icon: 'pi pi-circle' },
        { label: 'MongoDB', icon: 'pi pi-circle' },
      ],
    },
  ];

  // ── Nested sub-items ──────────────────────────────────────────────────

  public readonly nestedModel: PanelMenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'General',
          icon: 'pi pi-sliders-h',
          items: [
            { label: 'Language', icon: 'pi pi-globe' },
            { label: 'Timezone', icon: 'pi pi-clock' },
            { label: 'Currency', icon: 'pi pi-dollar' },
          ],
        },
        {
          label: 'Appearance',
          icon: 'pi pi-palette',
          items: [
            { label: 'Theme', icon: 'pi pi-sun' },
            { label: 'Font Size', icon: 'pi pi-text' },
          ],
        },
        { label: 'Privacy', icon: 'pi pi-shield' },
      ],
    },
    {
      label: 'Integrations',
      icon: 'pi pi-link',
      items: [
        {
          label: 'Cloud',
          icon: 'pi pi-cloud',
          items: [
            { label: 'AWS', icon: 'pi pi-circle' },
            { label: 'Azure', icon: 'pi pi-circle' },
          ],
        },
        { label: 'Webhooks', icon: 'pi pi-bolt' },
      ],
    },
  ];

  // ── Disabled items ────────────────────────────────────────────────────

  public readonly disabledModel: PanelMenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      items: [
        { label: 'Profile', icon: 'pi pi-id-card' },
        { label: 'Delete Account', icon: 'pi pi-trash', disabled: true },
      ],
    },
    {
      label: 'Locked Section',
      icon: 'pi pi-lock',
      disabled: true,
      items: [{ label: 'Secret Item', icon: 'pi pi-eye-slash' }],
    },
    {
      label: 'Help',
      icon: 'pi pi-question-circle',
      items: [
        { label: 'Documentation', icon: 'pi pi-book' },
        {
          label: 'Community (offline)',
          icon: 'pi pi-comments',
          disabled: true,
        },
      ],
    },
  ];

  // ── URL items ─────────────────────────────────────────────────────────

  public readonly urlModel: PanelMenuItem[] = [
    {
      label: 'Resources',
      icon: 'pi pi-external-link',
      expanded: true,
      items: [
        {
          label: 'Angular Docs',
          icon: 'pi pi-book',
          url: 'https://angular.dev',
          target: '_blank',
        },
        {
          label: 'GitHub',
          icon: 'pi pi-github',
          url: 'https://github.com',
          target: '_blank',
        },
        { label: 'Command Item', icon: 'pi pi-star' },
      ],
    },
  ];

  // ── Variants ──────────────────────────────────────────────────────────

  public readonly variantModel: PanelMenuItem[] = [
    {
      label: 'Navigation',
      icon: 'pi pi-compass',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Reports', icon: 'pi pi-chart-line' },
      ],
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        { label: 'Profile', icon: 'pi pi-user' },
        { label: 'Security', icon: 'pi pi-lock' },
      ],
    },
  ];

  // ── Sizes ─────────────────────────────────────────────────────────────

  public readonly sizeModel: PanelMenuItem[] = [
    {
      label: 'Category',
      items: [
        { label: 'Item One', icon: 'pi pi-circle' },
        { label: 'Item Two', icon: 'pi pi-circle' },
        { label: 'Item Three', icon: 'pi pi-circle' },
      ],
    },
  ];

  // ── Command callbacks ─────────────────────────────────────────────────

  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly commandModel: PanelMenuItem[] = [
    {
      label: 'Actions',
      icon: 'pi pi-bolt',
      expanded: true,
      items: [
        {
          label: 'Download',
          icon: 'pi pi-download',
          command: (event: PanelMenuCommandEvent): void => {
            this.logEvent(`Command: ${event.item.label ?? ''}`);
          },
        },
        {
          label: 'Share',
          icon: 'pi pi-share-alt',
          command: (event: PanelMenuCommandEvent): void => {
            this.logEvent(`Command: ${event.item.label ?? ''}`);
          },
        },
        { separator: true },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: (event: PanelMenuCommandEvent): void => {
            this.logEvent(`Command: ${event.item.label ?? ''}`);
          },
        },
      ],
    },
  ];

  public onItemClick(event: PanelMenuCommandEvent): void {
    this.logEvent(`itemClick: "${event.item.label ?? ''}"`);
  }

  public onPanelToggle(event: PanelMenuPanelToggleEvent): void {
    const state: string = event.expanded ? 'expanded' : 'collapsed';
    this.logEvent(`panelToggle: "${event.item.label ?? ''}" ${state}`);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 8));
  }
}
