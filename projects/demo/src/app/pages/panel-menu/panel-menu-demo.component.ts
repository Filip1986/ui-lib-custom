import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type {
  PanelMenuCommandEvent,
  PanelMenuItem,
  PanelMenuPanelToggleEvent,
} from 'ui-lib-custom/panel-menu';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
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
 * Demo page for the PanelMenu component.
 */
@Component({
  selector: 'app-panel-menu-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    PanelMenu,
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './panel-menu-demo.component.html',
  styleUrl: './panel-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelMenuDemoComponent {
  public readonly importCode: string = "import { PanelMenu } from 'ui-lib-custom/panel-menu'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'initially-expanded', label: 'Initially Expanded' },
    { id: 'multiple-mode', label: 'Multiple Mode' },
    { id: 'nested-sub-items', label: 'Nested Sub-Items' },
    { id: 'disabled-items', label: 'Disabled Items' },
    { id: 'url-items', label: 'URL Items' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'events', label: 'Events' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly expanded: string;
    readonly multiple: string;
    readonly urlItems: string;
    readonly events: string;
  } = {
    import: `import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem } from 'ui-lib-custom/panel-menu';`,
    basic: `<ui-lib-panel-menu [model]="items" />`,
    expanded: `items: PanelMenuItem[] = [
  { label: 'File', expanded: true, items: [...] },
  { label: 'Edit', items: [...] },
];`,
    multiple: `<ui-lib-panel-menu [model]="items" [multiple]="true" />`,
    urlItems: `{ label: 'Angular Docs', url: 'https://angular.dev', target: '_blank' }`,
    events: `<ui-lib-panel-menu
  [model]="items"
  (itemClick)="onItemClick($event)"
  (panelToggle)="onPanelToggle($event)"
/>`,
  } as const;

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
        { label: 'Community (offline)', icon: 'pi pi-comments', disabled: true },
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
        { label: 'Angular Docs', icon: 'pi pi-book', url: 'https://angular.dev', target: '_blank' },
        { label: 'GitHub', icon: 'pi pi-github', url: 'https://github.com', target: '_blank' },
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

  // ── Events ────────────────────────────────────────────────────────────

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

  // ── Accessibility data ────────────────────────────────────────────────

  public readonly ariaRows: AriaRow[] = [
    {
      element: 'Root <code>&lt;nav&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"navigation"</code>',
      notes: 'Root navigation landmark for the entire component.',
    },
    {
      element: 'Root <code>&lt;nav&gt;</code>',
      attribute: '<code>aria-label</code>',
      value: '<code>ariaLabel</code> input',
      notes: 'Accessible name; defaults to <code>"Panel Menu"</code>.',
    },
    {
      element: 'Root header <code>&lt;button&gt;</code>',
      attribute: '<code>aria-expanded</code>',
      value: '<code>"true"</code> / <code>"false"</code>',
      notes: 'Reflects whether the panel content is currently open.',
    },
    {
      element: 'Root header <code>&lt;button&gt;</code>',
      attribute: '<code>aria-controls</code>',
      value: 'Panel content <code>id</code>',
      notes: 'References the controlled panel region element.',
    },
    {
      element: 'Root header <code>&lt;button&gt;</code>',
      attribute: '<code>aria-haspopup</code>',
      value: '<code>"menu"</code>',
      notes: 'Signals the button controls a menu region.',
    },
    {
      element: 'Panel content',
      attribute: '<code>role</code>',
      value: '<code>"region"</code>',
      notes: "Groups the panel's items as a named, collapsible region.",
    },
    {
      element: 'Panel content',
      attribute: '<code>aria-labelledby</code>',
      value: 'Header button <code>id</code>',
      notes: 'Names the region after its panel header for screen readers.',
    },
    {
      element: 'Panel content (collapsed)',
      attribute: '<code>aria-hidden</code>',
      value: '<code>"true"</code>',
      notes: 'Hides collapsed panel content from assistive technology.',
    },
    {
      element: 'Sub-list <code>&lt;ul&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"menu"</code>',
      notes: 'Identifies the item list as a menu widget.',
    },
    {
      element: 'Leaf item <code>&lt;a&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"menuitem"</code>',
      notes: 'Marks each actionable item as a menu command.',
    },
    {
      element: 'Separator <code>&lt;li&gt;</code>',
      attribute: '<code>role</code>',
      value: '<code>"separator"</code>',
      notes: 'Structural divider between item groups.',
    },
    {
      element: 'Disabled items',
      attribute: '<code>aria-disabled</code>',
      value: '<code>"true"</code>',
      notes: 'Communicates non-interactive state without removing from the DOM.',
    },
  ];

  public readonly keyboardRows: KeyboardRow[] = [
    {
      key: '<kbd>Enter</kbd> / <kbd>Space</kbd> on header',
      action: 'Toggle the root panel open or closed.',
    },
    {
      key: '<kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> on header',
      action: 'Move focus to the next or previous enabled root panel header (wraps).',
    },
    {
      key: '<kbd>Home</kbd> / <kbd>End</kbd> on header',
      action: 'Jump to the first or last enabled root panel header.',
    },
    {
      key: '<kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> on sub-item',
      action: 'Move focus between items within the current sub-menu.',
    },
    {
      key: '<kbd>Escape</kbd> on sub-item',
      action: 'Return focus to the owning root panel header.',
    },
    {
      key: '<kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>',
      action: 'Move focus naturally through the page via browser tab order.',
    },
  ];

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 8));
  }
}
