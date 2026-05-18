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
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

interface AriaRow {
  readonly element: string;
  readonly attribute: string;
  readonly value: string;
  readonly notes: string;
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
    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
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

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-tiered-menu-panel-bg',
      default: 'var(--uilib-surface, #fff)',
      description: 'Panel background colour.',
    },
    {
      variable: '--uilib-tiered-menu-panel-border',
      default: 'var(--uilib-color-border, #e5e7eb)',
      description: 'Panel border colour.',
    },
    {
      variable: '--uilib-tiered-menu-panel-radius',
      default: '0.375rem',
      description: 'Panel border-radius.',
    },
    {
      variable: '--uilib-tiered-menu-panel-shadow',
      default: 'var(--uilib-shadow-md)',
      description: 'Panel box-shadow.',
    },
    {
      variable: '--uilib-tiered-menu-min-width',
      default: '12rem',
      description: 'Minimum panel width.',
    },
    {
      variable: '--uilib-tiered-menu-font-size',
      default: '0.875rem',
      description: 'Item font size.',
    },
    {
      variable: '--uilib-tiered-menu-item-padding',
      default: '0.5rem 0.875rem',
      description: 'Item padding.',
    },
    {
      variable: '--uilib-tiered-menu-item-color',
      default: 'var(--uilib-color-text, #1f2937)',
      description: 'Item text colour.',
    },
    {
      variable: '--uilib-tiered-menu-item-color-hover',
      default: 'var(--uilib-color-primary, #6366f1)',
      description: 'Hover text colour.',
    },
    {
      variable: '--uilib-tiered-menu-item-bg-hover',
      default: 'var(--uilib-surface-hover, #f3f4f6)',
      description: 'Hover background.',
    },
    {
      variable: '--uilib-tiered-menu-separator-color',
      default: 'var(--uilib-color-border, #e5e7eb)',
      description: 'Separator line colour.',
    },
    {
      variable: '--uilib-tiered-menu-focus-ring',
      default: 'var(--uilib-color-primary, #6366f1)',
      description: 'Focus ring colour.',
    },
    {
      variable: '--uilib-tiered-menu-disabled-opacity',
      default: '0.45',
      description: 'Disabled item opacity.',
    },
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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '↓ / ↑',
      action: 'Navigate between items in the current list (wraps).',
    },
    {
      key: 'Home / End',
      action: 'Jump to the first or last item in the current list.',
    },
    {
      key: '→',
      action: 'Open the flyout for an item with nested children; focus first child item.',
    },
    {
      key: '←',
      action: 'Close the current flyout and return focus to the parent item. No-op at root level.',
    },
    {
      key: 'Enter / Space',
      action: "Activate the focused leaf item or toggle a parent's flyout.",
    },
    {
      key: 'Escape',
      action:
        'Close the innermost open flyout; propagates up through nested levels. In popup mode, closes the entire panel and restores trigger focus.',
    },
    {
      key: 'Tab',
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
