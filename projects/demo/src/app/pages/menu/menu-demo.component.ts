import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Menu } from 'ui-lib-custom/menu';
import { Button } from 'ui-lib-custom/button';
import type { MenuItem, MenuItemCommandEvent } from 'ui-lib-custom/menu';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

interface AriaRow {
  readonly element: string;
  readonly attribute: string;
  readonly value: string;
  readonly notes: string;
}

interface InputRow {
  readonly name: string;
  readonly type: string;
  readonly default: string;
  readonly description: string;
}

interface OutputRow {
  readonly name: string;
  readonly payload: string;
  readonly description: string;
}

interface MethodRow {
  readonly name: string;
  readonly parameters: string;
  readonly description: string;
}

interface MenuItemRow {
  readonly property: string;
  readonly type: string;
  readonly description: string;
}

/**
 * Demo page for the Menu component.
 */
@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Menu,
    Button,
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './menu-demo.component.html',
  styleUrl: './menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  public readonly importCode: string = "import { Menu } from 'ui-lib-custom/menu'";

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
    { id: 'basic-inline', label: 'Basic (Inline)' },
    { id: 'with-separator', label: 'With Separator' },
    { id: 'disabled-items', label: 'Disabled Items' },
    { id: 'grouped-items', label: 'Grouped Items' },
    { id: 'popup-mode', label: 'Popup Mode' },
    { id: 'popup-with-groups', label: 'Popup with Groups' },
    { id: 'commands-events', label: 'Commands & Events' },
    { id: 'url-items', label: 'URL Items' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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

  // ── API data ──────────────────────────────────────────────────────────────

  public readonly inputRows: InputRow[] = [
    {
      name: '<code>model</code>',
      type: '<code>MenuItem[]</code>',
      default: '<code>[]</code>',
      description:
        'Items to render. Top-level items with an <code>items</code> array act as labelled group headers.',
    },
    {
      name: '<code>popup</code>',
      type: '<code>boolean</code>',
      default: '<code>false</code>',
      description:
        'When <code>true</code>, renders as a floating fixed overlay. Control with <code>toggle()</code>, <code>show()</code>, or <code>hide()</code>.',
    },
    {
      name: '<code>variant</code>',
      type: "<code>'material' | 'bootstrap' | 'minimal' | null</code>",
      default: '<code>null</code>',
      description:
        'Design variant. Falls back to <code>ThemeConfigService</code> when <code>null</code>.',
    },
    {
      name: '<code>size</code>',
      type: "<code>'sm' | 'md' | 'lg'</code>",
      default: "<code>'md'</code>",
      description: 'Size token controlling item padding and font size.',
    },
    {
      name: '<code>styleClass</code>',
      type: '<code>string | null</code>',
      default: '<code>null</code>',
      description: 'Extra CSS class applied to the host element.',
    },
    {
      name: '<code>ariaLabel</code>',
      type: '<code>string</code>',
      default: "<code>'Menu'</code>",
      description:
        'Accessible label for the <code>role="menu"</code> panel. Provide a unique value when multiple menus appear on screen.',
    },
  ];

  public readonly outputRows: OutputRow[] = [
    {
      name: '<code>itemClick</code>',
      payload: '<code>MenuItemCommandEvent</code>',
      description: 'Emitted when a non-disabled leaf item is activated (click or keyboard).',
    },
    {
      name: '<code>menuShow</code>',
      payload: '<code>MouseEvent</code>',
      description: 'Emitted when the popup panel becomes visible. Popup mode only.',
    },
    {
      name: '<code>menuHide</code>',
      payload: '<code>void</code>',
      description: 'Emitted when the popup panel is hidden. Popup mode only.',
    },
  ];

  public readonly methodRows: MethodRow[] = [
    {
      name: '<code>toggle(event)</code>',
      parameters: '<code>MouseEvent</code>',
      description:
        'Toggles the popup open or closed anchored to the trigger. No-op in inline mode.',
    },
    {
      name: '<code>show(event)</code>',
      parameters: '<code>MouseEvent</code>',
      description:
        'Shows the popup anchored to <code>event.currentTarget</code>. No-op in inline mode.',
    },
    {
      name: '<code>hide()</code>',
      parameters: '—',
      description:
        'Hides the popup and restores focus to the trigger element. No-op in inline mode.',
    },
  ];

  public readonly menuItemRows: MenuItemRow[] = [
    {
      property: '<code>label</code>',
      type: '<code>string?</code>',
      description: 'Display text for the item or group header.',
    },
    {
      property: '<code>icon</code>',
      type: '<code>string?</code>',
      description:
        'Icon class rendered in a decorative <code>&lt;span aria-hidden="true"&gt;</code>.',
    },
    {
      property: '<code>disabled</code>',
      type: '<code>boolean?</code>',
      description:
        'When <code>true</code>, item is non-interactive; gets <code>aria-disabled="true"</code> and excluded from keyboard navigation.',
    },
    {
      property: '<code>separator</code>',
      type: '<code>boolean?</code>',
      description: 'Renders a <code>&lt;li role="separator"&gt;</code> horizontal divider.',
    },
    {
      property: '<code>visible</code>',
      type: '<code>boolean?</code>',
      description: 'When explicitly <code>false</code>, excludes the item from rendering.',
    },
    {
      property: '<code>items</code>',
      type: '<code>MenuItem[]?</code>',
      description:
        'Child items — makes the parent a labelled group header (<code>role="group"</code>).',
    },
    {
      property: '<code>url</code>',
      type: '<code>string?</code>',
      description: 'Renders the item as <code>&lt;a href="..."&gt;</code>.',
    },
    {
      property: '<code>target</code>',
      type: '<code>string?</code>',
      description:
        "<code>target</code> attribute for URL-based items (e.g. <code>'_blank'</code>).",
    },
    {
      property: '<code>styleClass</code>',
      type: '<code>string?</code>',
      description: 'Extra CSS class added to the rendered link element.',
    },
    {
      property: '<code>command</code>',
      type: '<code>function?</code>',
      description: 'Callback invoked when the item is activated (click or keyboard).',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-menu-bg',
      default: 'var(--uilib-surface-overlay, #fff)',
      description: 'Panel background colour.',
    },
    {
      variable: '--uilib-menu-border',
      default: '1px solid var(--uilib-color-neutral-200)',
      description: 'Panel border.',
    },
    {
      variable: '--uilib-menu-shadow',
      default: 'var(--uilib-shadow-md)',
      description: 'Panel box-shadow.',
    },
    {
      variable: '--uilib-menu-radius',
      default: 'var(--uilib-radius-md, 0.375rem)',
      description: 'Panel border-radius.',
    },
    { variable: '--uilib-menu-min-width', default: '12rem', description: 'Minimum panel width.' },
    {
      variable: '--uilib-menu-padding',
      default: 'var(--uilib-spacing-1, 0.25rem)',
      description: 'Vertical panel padding.',
    },
    {
      variable: '--uilib-menu-item-padding-y',
      default: 'var(--uilib-spacing-2, 0.5rem)',
      description: 'Item vertical padding.',
    },
    {
      variable: '--uilib-menu-item-padding-x',
      default: 'var(--uilib-spacing-3, 0.75rem)',
      description: 'Item horizontal padding.',
    },
    {
      variable: '--uilib-menu-item-bg-hover',
      default: 'var(--uilib-color-neutral-100, #f3f4f6)',
      description: 'Hover/focus background.',
    },
    {
      variable: '--uilib-menu-item-color-disabled',
      default: 'var(--uilib-color-neutral-400, #9ca3af)',
      description: 'Disabled item text colour.',
    },
    {
      variable: '--uilib-menu-separator-color',
      default: 'var(--uilib-color-neutral-200, #e5e7eb)',
      description: 'Separator line colour.',
    },
    {
      variable: '--uilib-menu-focus-shadow',
      default: '0 0 0 2px color-mix(...)',
      description: 'Focus-visible ring.',
    },
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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '↓ / ↑',
      action: 'Move focus to the next or previous enabled item (wraps, skips disabled).',
    },
    {
      key: 'Home / End',
      action: 'Jump to the first or last enabled item.',
    },
    {
      key: 'Enter / Space',
      action: 'Activate the focused item.',
    },
    {
      key: 'Escape',
      action:
        'Close the popup panel and restore focus to the trigger element. No-op in inline mode.',
    },
    {
      key: 'Tab',
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
