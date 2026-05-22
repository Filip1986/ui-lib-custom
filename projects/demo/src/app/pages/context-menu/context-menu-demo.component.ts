import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ContextMenu } from 'ui-lib-custom/context-menu';
import type { ContextMenuItem, ContextMenuItemCommandEvent } from 'ui-lib-custom/context-menu';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the ContextMenu component.
 */
@Component({
  selector: 'app-context-menu-demo',
  standalone: true,
  imports: [
    ContextMenu,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './context-menu-demo.component.html',
  styleUrl: './context-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuDemoComponent {
  public readonly importCode: string = "import { ContextMenu } from 'ui-lib-custom/context-menu'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    apgPattern: {
      name: 'Menu Button',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
    },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-separator', label: 'With Separator' },
    { id: 'disabled-items', label: 'Disabled Items' },
    { id: 'nested-submenu', label: 'Nested Submenu' },
    { id: 'image-target', label: 'Image Target' },
    { id: 'command-callback', label: 'Command Callback & itemClick Output' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'model', type: 'MenuItem[]', default: '[]', description: 'Array of menu items.' },
    {
      name: 'global',
      type: 'boolean',
      default: 'false',
      description: 'Listens for the contextmenu event on the whole document.',
    },
    {
      name: 'appendTo',
      type: "'body' | HTMLElement | string",
      default: "'body'",
      description: 'Target element for portal rendering.',
    },
    {
      name: 'autoZIndex',
      type: 'boolean',
      default: 'true',
      description: 'Automatically manages z-index layering.',
    },
    {
      name: 'baseZIndex',
      type: 'number',
      default: '0',
      description: 'Base z-index when autoZIndex is enabled.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Menu item size.' },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Context menu'",
      description: 'Accessible label for the menu.',
    },
  ];

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

  // ── Keyboard navigation data ───────────────────────────────────────────────

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Menu container',
      attribute: 'role',
      value: '"menu"',
      notes: 'The popup container is a menu widget.',
    },
    {
      element: 'Menu item',
      attribute: 'role',
      value: '"menuitem"',
      notes: 'Each navigable item is announced as a menu item.',
    },
    {
      element: 'Menu item with submenu',
      attribute: 'aria-haspopup',
      value: '"true"',
      notes: 'Signals that activating the item opens a submenu.',
    },
    {
      element: 'Menu item with submenu',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Tracks whether the submenu is open.',
    },
    {
      element: 'Disabled menu item',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Marks items that cannot be activated.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '↓ / ↑',
      action: 'Move focus to the next or previous enabled item (skips separators and disabled).',
    },
    {
      key: '→',
      action: 'Open the submenu of the focused item and move focus to its first item.',
    },
    {
      key: '←',
      action: 'Close the current submenu and return focus to the parent item.',
    },
    {
      key: 'Enter / Space',
      action: 'Activate the focused item.',
    },
    {
      key: 'Escape',
      action: 'Close the menu (or close just the submenu when inside a submenu).',
    },
    {
      key: 'Home / End',
      action: 'Jump to the first or last item in the top-level menu.',
    },
  ];

  // ── Private helpers ────────────────────────────────────────────────────────

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 6));
  }

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'model',
      type: 'ContextMenuItem[]',
      default: '[]',
      description: 'Array of menu items to display.',
    },
    {
      name: 'global',
      type: 'boolean',
      default: 'false',
      description:
        'When true, listens to <code>contextmenu</code> events on the entire document automatically.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design-system variant; falls back to ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls font size and item padding.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class appended to the host element.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Context Menu'",
      description: 'Accessible label applied to the menu panel (<code>aria-label</code>).',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'itemClick',
      type: 'ContextMenuItemCommandEvent',
      description: 'Emitted when a non-disabled leaf item is activated.',
    },
    { name: 'menuShow', type: 'MouseEvent', description: 'Emitted when the menu becomes visible.' },
    { name: 'menuHide', type: 'void', description: 'Emitted when the menu is hidden.' },
  ];

  public readonly apiMethodRows: ApiPropRow[] = [
    {
      name: 'show',
      type: '(event: MouseEvent): void',
      description:
        'Opens the menu at the cursor position. Calls <code>event.preventDefault()</code> to suppress the native context menu.',
    },
    { name: 'hide', type: '(): void', description: 'Hides the menu. No-op when already hidden.' },
    {
      name: 'toggle',
      type: '(event: MouseEvent): void',
      description: 'Toggles visibility at the cursor position.',
    },
  ];

  public readonly apiContextMenuItemRows: ApiPropRow[] = [
    { name: 'label', type: 'string?', description: 'Display text for the item.' },
    { name: 'icon', type: 'string?', description: 'Icon class name rendered before the label.' },
    { name: 'disabled', type: 'boolean?', description: 'When true, the item is non-interactive.' },
    {
      name: 'separator',
      type: 'boolean?',
      description: 'When true, renders a visual separator instead of a menu item.',
    },
    {
      name: 'visible',
      type: 'boolean?',
      description: 'When explicitly false, the item is excluded from the rendered list.',
    },
    { name: 'styleClass', type: 'string?', description: 'Extra CSS class on the item element.' },
    {
      name: 'items',
      type: 'ContextMenuItem[]?',
      description: 'Nested items displayed as a submenu.',
    },
    {
      name: 'command',
      type: '(event: ContextMenuItemCommandEvent) => void',
      description: 'Callback invoked when the item is activated.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-context-menu-bg', description: 'Background colour.' },
    { variable: '--uilib-context-menu-border', description: 'Border shorthand.' },
    { variable: '--uilib-context-menu-shadow', description: 'Box shadow.' },
    { variable: '--uilib-context-menu-radius', description: 'Border radius.' },
    { variable: '--uilib-context-menu-z-index', description: 'Z-index.' },
    { variable: '--uilib-context-menu-min-width', description: 'Minimum width.' },
    { variable: '--uilib-context-menu-padding', description: 'Padding.' },
    { variable: '--uilib-context-menu-font-size', description: 'Font size.' },
    { variable: '--uilib-context-menu-font-size-sm', description: 'Font size — sm.' },
    { variable: '--uilib-context-menu-font-size-md', description: 'Font size — md.' },
    { variable: '--uilib-context-menu-font-size-lg', description: 'Font size — lg.' },
    { variable: '--uilib-context-menu-item-padding-y', description: 'Item vertical padding.' },
    { variable: '--uilib-context-menu-item-padding-x', description: 'Item horizontal padding.' },
    {
      variable: '--uilib-context-menu-item-padding-y-sm',
      description: 'Item vertical padding — sm.',
    },
    {
      variable: '--uilib-context-menu-item-padding-y-lg',
      description: 'Item vertical padding — lg.',
    },
    { variable: '--uilib-context-menu-item-color', description: 'Item text colour.' },
    {
      variable: '--uilib-context-menu-item-bg-hover',
      description: 'Item background colour (hover).',
    },
    { variable: '--uilib-context-menu-item-color-hover', description: 'Item text colour (hover).' },
    {
      variable: '--uilib-context-menu-item-color-disabled',
      description: 'Item text colour (disabled).',
    },
    {
      variable: '--uilib-context-menu-item-bg-active',
      description: 'Item background colour (active).',
    },
    {
      variable: '--uilib-context-menu-item-color-active',
      description: 'Item text colour (active).',
    },
    { variable: '--uilib-context-menu-icon-size', description: 'Icon size.' },
    { variable: '--uilib-context-menu-icon-gap', description: 'Icon gap.' },
    { variable: '--uilib-context-menu-separator-color', description: 'Separator text colour.' },
    { variable: '--uilib-context-menu-separator-my', description: 'Separator My.' },
    { variable: '--uilib-context-menu-submenu-offset', description: 'Submenu offset.' },
    { variable: '--uilib-context-menu-focus-shadow', description: 'Focus shadow.' },
  ];
}
