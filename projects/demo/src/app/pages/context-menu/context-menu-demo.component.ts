import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ContextMenu } from 'ui-lib-custom/context-menu';
import type { ContextMenuItem, ContextMenuItemCommandEvent } from 'ui-lib-custom/context-menu';

/**
 * Demo page for the ContextMenu component.
 */
@Component({
  selector: 'app-context-menu-demo',
  standalone: true,
  imports: [ContextMenu],
  templateUrl: './context-menu-demo.component.html',
  styleUrl: './context-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuDemoComponent {
  // ── Basic ──────────────────────────────────────────────────────────────────

  public readonly basicItems: ContextMenuItem[] = [
    { label: 'Cut', icon: 'pi pi-times' },
    { label: 'Copy', icon: 'pi pi-copy' },
    { label: 'Paste', icon: 'pi pi-clipboard' },
  ];

  // ── With Separator ─────────────────────────────────────────────────────────

  public readonly separatorItems: ContextMenuItem[] = [
    { label: 'View', icon: 'pi pi-eye' },
    { label: 'Edit', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'Delete', icon: 'pi pi-trash' },
  ];

  // ── Disabled Items ─────────────────────────────────────────────────────────

  public readonly disabledItems: ContextMenuItem[] = [
    { label: 'Undo', icon: 'pi pi-replay' },
    { label: 'Redo', icon: 'pi pi-refresh', disabled: true },
    { separator: true },
    { label: 'Cut', icon: 'pi pi-times' },
    { label: 'Copy', icon: 'pi pi-copy' },
    { label: 'Paste', icon: 'pi pi-clipboard', disabled: true },
  ];

  // ── With Submenu ───────────────────────────────────────────────────────────

  public readonly submenuItems: ContextMenuItem[] = [
    { label: 'New', icon: 'pi pi-file' },
    { label: 'Open Recent', icon: 'pi pi-clock' },
    { separator: true },
    {
      label: 'Export',
      icon: 'pi pi-download',
      items: [
        { label: 'PDF', icon: 'pi pi-file-pdf' },
        { label: 'Excel', icon: 'pi pi-file-excel' },
        { label: 'CSV', icon: 'pi pi-table' },
      ],
    },
    {
      label: 'Share',
      icon: 'pi pi-share-alt',
      items: [
        { label: 'Copy Link', icon: 'pi pi-link' },
        { label: 'Email', icon: 'pi pi-envelope' },
      ],
    },
  ];

  // ── Image context menu ─────────────────────────────────────────────────────

  public readonly imageItems: ContextMenuItem[] = [
    { label: 'View Full Size', icon: 'pi pi-search-plus' },
    { label: 'Save Image As…', icon: 'pi pi-cloud-download' },
    { label: 'Copy Image', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Open in New Tab', icon: 'pi pi-external-link' },
    { label: 'Inspect', icon: 'pi pi-code' },
  ];

  // ── Event logging ──────────────────────────────────────────────────────────

  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly eventItems: ContextMenuItem[] = [
    {
      label: 'Save',
      icon: 'pi pi-save',
      command: (event: ContextMenuItemCommandEvent): void => {
        this.logEvent(`Command: ${event.item.label ?? 'unknown'}`);
      },
    },
    {
      label: 'Download',
      icon: 'pi pi-download',
      command: (event: ContextMenuItemCommandEvent): void => {
        this.logEvent(`Command: ${event.item.label ?? 'unknown'}`);
      },
    },
    { separator: true },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event: ContextMenuItemCommandEvent): void => {
        this.logEvent(`Command: ${event.item.label ?? 'unknown'}`);
      },
    },
  ];

  public onItemClick(event: ContextMenuItemCommandEvent): void {
    this.logEvent(`itemClick: ${event.item.label ?? 'unknown'}`);
  }

  // ── Sizes ──────────────────────────────────────────────────────────────────

  public readonly sizeItems: ContextMenuItem[] = [
    { label: 'Action One', icon: 'pi pi-star' },
    { label: 'Action Two', icon: 'pi pi-heart' },
    { label: 'Action Three', icon: 'pi pi-check' },
  ];

  // ── Private helpers ────────────────────────────────────────────────────────

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 6));
  }
}
