import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import { Button } from 'ui-lib-custom/button';
import type { MenuItem, MenuItemCommandEvent } from 'ui-lib-custom/menu';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

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
 * Demo page for the Menu component.
 */
@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [
    Menu,
    Button,
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    DocCodeSnippetComponent,
  ],
  templateUrl: './menu-demo.component.html',
  styleUrl: './menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly separator: string;
    readonly grouped: string;
    readonly popup: string;
    readonly commands: string;
    readonly urlItems: string;
    readonly variants: string;
    readonly sizes: string;
  } = {
    import: `import { Menu } from 'ui-lib-custom/menu';
import type { MenuItem } from 'ui-lib-custom/menu';`,
    basic: `<ui-lib-menu [model]="items" (itemClick)="onItemClick($event)" />`,
    separator: `items: MenuItem[] = [
  { label: 'New File', icon: 'pi pi-file' },
  { label: 'Open',     icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Save',     icon: 'pi pi-save' },
  { label: 'Exit',     icon: 'pi pi-times' },
];`,
    grouped: `items: MenuItem[] = [
  {
    label: 'Account',
    items: [
      { label: 'Profile',       icon: 'pi pi-user' },
      { label: 'Security',      icon: 'pi pi-lock' },
      { label: 'Notifications', icon: 'pi pi-bell' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects',  icon: 'pi pi-briefcase' },
      { label: 'Billing',   icon: 'pi pi-credit-card' },
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
  Options
</ui-lib-button>
<ui-lib-menu #popupMenu [model]="items" [popup]="true" />`,
    commands: `items: MenuItem[] = [
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: (event) => console.log('clicked', event.item.label),
  },
];

// Or via the itemClick output:
onItemClick(event: MenuItemCommandEvent): void {
  console.log(event.item.label);
}`,
    urlItems: `items: MenuItem[] = [
  { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
  { label: 'GitHub',        url: 'https://github.com', target: '_blank' },
  { separator: true },
  { label: 'Command item',  icon: 'pi pi-star' },
];`,
    variants: `<ui-lib-menu [model]="items" variant="material"  />
<ui-lib-menu [model]="items" variant="bootstrap" />
<ui-lib-menu [model]="items" variant="minimal"   />`,
    sizes: `<ui-lib-menu [model]="items" size="sm" />
<ui-lib-menu [model]="items" size="md" />
<ui-lib-menu [model]="items" size="lg" />`,
  } as const;

  public readonly basicItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Messages', icon: 'pi pi-envelope' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  public readonly separatorItems: MenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
    { label: 'Save As', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Exit', icon: 'pi pi-times' },
  ];

  public readonly disabledItems: MenuItem[] = [
    { label: 'Undo', icon: 'pi pi-replay' },
    { label: 'Redo', icon: 'pi pi-refresh', disabled: true },
    { separator: true },
    { label: 'Cut', icon: 'pi pi-times' },
    { label: 'Copy', icon: 'pi pi-copy' },
    { label: 'Paste', icon: 'pi pi-clipboard', disabled: true },
  ];

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

  public readonly popupItems: MenuItem[] = [
    { label: 'View Details', icon: 'pi pi-eye' },
    { label: 'Edit', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'Duplicate', icon: 'pi pi-copy' },
    { label: 'Move to Trash', icon: 'pi pi-trash' },
  ];

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

  public readonly variantItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Reports', icon: 'pi pi-chart-line' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  public readonly sizeItems: MenuItem[] = [
    { label: 'Item One', icon: 'pi pi-circle' },
    { label: 'Item Two', icon: 'pi pi-circle' },
    { label: 'Item Three', icon: 'pi pi-circle' },
  ];

  // ── Accessibility data ────────────────────────────────────────────────────

  public readonly ariaRows: AriaRow[] = [
    {
      element: 'Panel <code>&lt;div&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"menu"</code>',
      notes: 'Root semantic container for the command list.',
    },
    {
      element: 'Panel <code>&lt;div&gt;</code>',
      attribute: '<code>aria-label</code>',
      value: '<code>ariaLabel</code> input',
      notes: 'Accessible name; provide a unique value when multiple menus are on screen.',
    },
    {
      element: 'Root <code>&lt;ul&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"presentation"</code>',
      notes: 'Presentational wrapper; semantic role is carried by the panel.',
    },
    {
      element: 'Group <code>&lt;ul&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"group"</code>',
      notes: 'Announces labelled item sections to screen readers.',
    },
    {
      element: 'Group <code>&lt;ul&gt;</code>',
      attribute: '<code>aria-label</code>',
      value: 'Parent item label',
      notes: 'Group label matches the visual section header.',
    },
    {
      element: 'Item <code>&lt;li&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"none"</code>',
      notes: 'Neutral wrapper; the interactive link carries the semantic role.',
    },
    {
      element: 'Item link <code>&lt;a&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"menuitem"</code>',
      notes: 'Identifies each interactive item as a menu command.',
    },
    {
      element: 'Disabled link',
      attribute: '<code>aria-disabled</code>',
      value: '<code>"true"</code>',
      notes: 'Communicates non-interactive state without removing the element.',
    },
    {
      element: 'Separator <code>&lt;li&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"separator"</code>',
      notes: 'Exposed as a structural separator inside the menu.',
    },
    {
      element: 'Group label <code>&lt;div&gt;</code>',
      attribute: '<code>aria-hidden</code>',
      value: '<code>"true"</code>',
      notes:
        'Visual heading only; group is named via <code>aria-label</code> on the <code>&lt;ul&gt;</code>.',
    },
    {
      element: 'Icons',
      attribute: '<code>aria-hidden</code>',
      value: '<code>"true"</code>',
      notes: 'Decorative only — not announced by screen readers.',
    },
  ];

  public readonly keyboardRows: KeyboardRow[] = [
    {
      key: '<kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd>',
      action: 'Move focus to the next or previous enabled item (wraps, skips disabled).',
    },
    {
      key: '<kbd>Home</kbd> / <kbd>End</kbd>',
      action: 'Jump to the first or last enabled item.',
    },
    {
      key: '<kbd>Enter</kbd> / <kbd>Space</kbd>',
      action: 'Activate the focused item.',
    },
    {
      key: '<kbd>Escape</kbd>',
      action:
        'Close the popup panel and restore focus to the trigger element. No-op in inline mode.',
    },
    {
      key: '<kbd>Tab</kbd>',
      action: 'Close the popup and move focus naturally to the next focusable element.',
    },
  ];

  public onItemClick(event: MenuItemCommandEvent): void {
    this.logEvent(`itemClick: "${event.item.label ?? ''}"`);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 5));
  }
}
