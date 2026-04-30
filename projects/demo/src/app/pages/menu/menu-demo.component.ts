import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import { Button } from 'ui-lib-custom/button';
import type { MenuItem, MenuItemCommandEvent } from 'ui-lib-custom/menu';

/**
 * Demo page for the Menu component.
 */
@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [Menu, Button],
  templateUrl: './menu-demo.component.html',
  styleUrl: './menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  // ── Basic (static) ─────────────────────────────────────────────────────────

  public readonly basicItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Messages', icon: 'pi pi-envelope' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  // ── With Separator ─────────────────────────────────────────────────────────

  public readonly separatorItems: MenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
    { label: 'Save As', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Exit', icon: 'pi pi-times' },
  ];

  // ── Disabled Items ─────────────────────────────────────────────────────────

  public readonly disabledItems: MenuItem[] = [
    { label: 'Undo', icon: 'pi pi-replay' },
    { label: 'Redo', icon: 'pi pi-refresh', disabled: true },
    { separator: true },
    { label: 'Cut', icon: 'pi pi-times' },
    { label: 'Copy', icon: 'pi pi-copy' },
    { label: 'Paste', icon: 'pi pi-clipboard', disabled: true },
  ];

  // ── Grouped (labelled groups) ──────────────────────────────────────────────

  public readonly groupedItems: MenuItem[] = [
    {
      label: 'Account',
      items: [
        { label: 'Profile', icon: 'pi pi-user' },
        { label: 'Security', icon: 'pi pi-lock' },
        { label: 'Notifications', icon: 'pi pi-bell' },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Projects', icon: 'pi pi-briefcase' },
        { label: 'Analytics', icon: 'pi pi-chart-bar' },
        { label: 'Billing', icon: 'pi pi-credit-card' },
      ],
    },
    {
      label: 'Support',
      items: [
        { label: 'Documentation', icon: 'pi pi-book' },
        { label: 'Help Center', icon: 'pi pi-question-circle' },
      ],
    },
  ];

  // ── Popup mode ─────────────────────────────────────────────────────────────

  public readonly popupItems: MenuItem[] = [
    { label: 'View Details', icon: 'pi pi-eye' },
    { label: 'Edit', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'Duplicate', icon: 'pi pi-copy' },
    { label: 'Move to Trash', icon: 'pi pi-trash' },
  ];

  // ── Popup grouped ──────────────────────────────────────────────────────────

  public readonly popupGroupedItems: MenuItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-file' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { label: 'Export', icon: 'pi pi-download' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clipboard', disabled: true },
      ],
    },
  ];

  // ── URL items ──────────────────────────────────────────────────────────────

  public readonly urlItems: MenuItem[] = [
    { label: 'Documentation', icon: 'pi pi-book', url: 'https://angular.dev', target: '_blank' },
    {
      label: 'GitHub',
      icon: 'pi pi-github',
      url: 'https://github.com/angular/angular',
      target: '_blank',
    },
    { separator: true },
    { label: 'Command item', icon: 'pi pi-star' },
  ];

  // ── Variants ───────────────────────────────────────────────────────────────

  public readonly variantItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Reports', icon: 'pi pi-chart-line' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  // ── Sizes ──────────────────────────────────────────────────────────────────

  public readonly sizeItems: MenuItem[] = [
    { label: 'Item One', icon: 'pi pi-circle' },
    { label: 'Item Two', icon: 'pi pi-circle' },
    { label: 'Item Three', icon: 'pi pi-circle' },
  ];

  // ── Command callbacks ──────────────────────────────────────────────────────

  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly commandItems: MenuItem[] = [
    {
      label: 'Download',
      icon: 'pi pi-download',
      command: (event: MenuItemCommandEvent): void => {
        this.logEvent(`Command fired: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Share',
      icon: 'pi pi-share-alt',
      command: (event: MenuItemCommandEvent): void => {
        this.logEvent(`Command fired: ${event.item.label ?? ''}`);
      },
    },
    { separator: true },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event: MenuItemCommandEvent): void => {
        this.logEvent(`Command fired: ${event.item.label ?? ''}`);
      },
    },
  ];

  public onItemClick(event: MenuItemCommandEvent): void {
    this.logEvent(`itemClick output: "${event.item.label ?? ''}"`);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 5));
  }
}
