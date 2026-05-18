import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import { Button } from 'ui-lib-custom/button';
import type {
  TieredMenuItem,
  TieredMenuItemCommandEvent,
  TieredMenuVariant,
  TieredMenuSize,
} from 'ui-lib-custom/tiered-menu';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

interface AriaRow {
  readonly element: string;
  readonly attribute: string;
  readonly value: string;
  readonly notes: string;
}

interface KeyboardRow {
  readonly key: string;
  readonly action: string;
}

/**
 * Demo page for the TieredMenu component.
 */
@Component({
  selector: 'app-tiered-menu-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    TieredMenu,
    Button,
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './tiered-menu-demo.component.html',
  styleUrl: './tiered-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TieredMenuDemoComponent {
  public readonly importCode: string = "import { TieredMenu } from 'ui-lib-custom/tiered-menu'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'nested-submenus', label: 'Nested Submenus' },
    { id: 'popup-mode', label: 'Popup Mode' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'item-states', label: 'Item States' },
    { id: 'url-items', label: 'URL Items' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly nested: string;
    readonly popup: string;
    readonly variants: string;
    readonly sizes: string;
    readonly itemStates: string;
    readonly urlItems: string;
  } = {
    import: `import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type { TieredMenuItem } from 'ui-lib-custom/tiered-menu';`,
    basic: `<ui-lib-tiered-menu [model]="items" (itemClick)="onItemClick($event)" />`,
    nested: `items: TieredMenuItem[] = [
  {
    label: 'File', icon: 'pi pi-file',
    items: [
      { label: 'New',  icon: 'pi pi-plus' },
      {
        label: 'Export', icon: 'pi pi-download',
        items: [
          { label: 'PDF',   icon: 'pi pi-file-pdf' },
          { label: 'CSV',   icon: 'pi pi-table' },
        ],
      },
    ],
  },
];`,
    popup: `<!-- trigger button wires aria-haspopup, aria-expanded, aria-controls -->
<ui-lib-button
  [attr.aria-haspopup]="'menu'"
  [attr.aria-expanded]="popupMenu.isVisible()"
  [attr.aria-controls]="popupMenu.menuId"
  (click)="popupMenu.toggle($event)"
>
  Open Menu ▾
</ui-lib-button>
<ui-lib-tiered-menu #popupMenu [model]="items" [popup]="true" />`,
    variants: `<ui-lib-tiered-menu [model]="items" variant="material"  />
<ui-lib-tiered-menu [model]="items" variant="bootstrap" />
<ui-lib-tiered-menu [model]="items" variant="minimal"   />`,
    sizes: `<ui-lib-tiered-menu [model]="items" size="sm" />
<ui-lib-tiered-menu [model]="items" size="md" />
<ui-lib-tiered-menu [model]="items" size="lg" />`,
    itemStates: `items: TieredMenuItem[] = [
  { label: 'Enabled',  icon: 'pi pi-check' },
  { label: 'Disabled', icon: 'pi pi-ban',  disabled: true },
  { label: 'Hidden',   visible: false },
  { separator: true },
  {
    label: 'With Command',
    command: (event) => console.log('clicked', event.item.label),
  },
];`,
    urlItems: `items: TieredMenuItem[] = [
  { label: 'GitHub',        url: 'https://github.com',  target: '_blank' },
  { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
  { separator: true },
  { label: 'No URL item' },
];`,
  } as const;

  public readonly variant: WritableSignal<TieredMenuVariant> =
    signal<TieredMenuVariant>('material');
  public readonly size: WritableSignal<TieredMenuSize> = signal<TieredMenuSize>('md');
  public readonly lastEvent: WritableSignal<string> = signal<string>('');

  public readonly basicItems: TieredMenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
    { label: 'Save As', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Exit', icon: 'pi pi-times' },
  ];

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

  public readonly urlItems: TieredMenuItem[] = [
    { label: 'GitHub', url: 'https://github.com', target: '_blank' },
    { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
    { separator: true },
    { label: 'No URL item' },
  ];

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

  // ── Accessibility data ────────────────────────────────────────────────────

  public readonly ariaRows: AriaRow[] = [
    {
      element: 'Root <code>&lt;ul&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"menu"</code>',
      notes: 'Identifies the list as a menu widget.',
    },
    {
      element: 'Root <code>&lt;ul&gt;</code>',
      attribute: '<code>aria-label</code>',
      value: '<code>ariaLabel</code> input',
      notes: 'Accessible name for the root panel, defaults to <code>"Menu"</code>.',
    },
    {
      element: 'Nested <code>&lt;ul&gt;</code>',
      attribute: '<code>aria-label</code>',
      value: 'Parent item label',
      notes: 'Each sub-panel is named after its parent item for screen reader context.',
    },
    {
      element: '<code>&lt;li&gt;</code> wrapper',
      attribute: '<code>role</code>',
      value: '<code>"none"</code>',
      notes: 'Removes implicit list-item semantics, preserving the menuitem role on the link.',
    },
    {
      element: 'Leaf <code>&lt;a&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"menuitem"</code>',
      notes: 'Identifies each interactive item as a menu item.',
    },
    {
      element: 'Parent <code>&lt;a&gt;</code>',
      attribute: '<code>aria-haspopup</code>',
      value: '<code>"menu"</code>',
      notes: 'Signals that the item controls a submenu.',
    },
    {
      element: 'Parent <code>&lt;a&gt;</code>',
      attribute: '<code>aria-expanded</code>',
      value: '<code>"true"</code> / <code>"false"</code>',
      notes: 'Reflects whether the flyout sub-panel is currently open.',
    },
    {
      element: 'Disabled <code>&lt;a&gt;</code>',
      attribute: '<code>aria-disabled</code>',
      value: '<code>"true"</code>',
      notes: 'Communicates non-interactive state without removing focus management.',
    },
    {
      element: 'Separator <code>&lt;li&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"separator"</code>',
      notes: 'Conveys structural grouping without <code>aria-hidden</code>.',
    },
  ];

  public readonly keyboardRows: KeyboardRow[] = [
    {
      key: '<kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd>',
      action: 'Navigate between items in the current list (wraps).',
    },
    {
      key: '<kbd>Home</kbd> / <kbd>End</kbd>',
      action: 'Jump to the first or last item in the current list.',
    },
    {
      key: '<kbd>ArrowRight</kbd>',
      action: 'Open the flyout for an item with nested children; focus first child item.',
    },
    {
      key: '<kbd>ArrowLeft</kbd>',
      action: 'Close the current flyout and return focus to the parent item. No-op at root level.',
    },
    {
      key: '<kbd>Enter</kbd> / <kbd>Space</kbd>',
      action: "Activate the focused leaf item or toggle a parent's flyout.",
    },
    {
      key: '<kbd>Escape</kbd>',
      action:
        'Close the innermost open flyout; propagates up through nested levels. In popup mode, closes the entire panel and restores trigger focus.',
    },
    {
      key: '<kbd>Tab</kbd>',
      action: 'Closes popup panel and moves focus naturally to the next focusable element.',
    },
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
