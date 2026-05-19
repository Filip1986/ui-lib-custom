import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { MegaMenu } from 'ui-lib-custom/mega-menu';
import { Button } from 'ui-lib-custom/button';
import type {
  MegaMenuCommandEvent,
  MegaMenuItem,
  MegaMenuOrientation,
  MegaMenuSize,
  MegaMenuVariant,
} from 'ui-lib-custom/mega-menu';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the MegaMenu component.
 */
@Component({
  selector: 'app-mega-menu-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    MegaMenu,
    Button,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './mega-menu-demo.component.html',
  styleUrl: './mega-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuDemoComponent {
  public readonly importCode: string = "import { MegaMenu } from 'ui-lib-custom/mega-menu'";

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
      name: 'Navigation',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/',
    },
    competitiveParity: 'pending',
  };
  public readonly snippetBasicHorizontal: string = `<ui-lib-mega-menu [model]="items" />`;
  public readonly snippetVertical: string = `<ui-lib-mega-menu [model]="items" orientation="vertical" />`;
  public readonly snippetDisabledSeparator: string = `{ label: "Save As", disabled: true }\n{ separator: true }`;
  public readonly snippetCommand: string = `{ label: "Delete", command: ({ item }) => console.log(item) }`;
  public readonly snippetItemClick: string = `<ui-lib-mega-menu [model]="items" (itemClick)="onItemClick($event)" />`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-horizontal', label: 'Basic Horizontal' },
    { id: 'vertical-orientation', label: 'Vertical Orientation' },
    { id: 'disabled-items', label: 'Disabled Items & Separators' },
    { id: 'command-callbacks', label: 'Command Callbacks' },
    { id: 'item-click-output', label: 'itemClick Output' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API Reference' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'model',
      type: 'MegaMenuItem[]',
      default: '[]',
      description: 'Array of mega-menu items with nested category columns.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Menu bar orientation.',
    },
    {
      name: 'breakpoint',
      type: 'string',
      default: "'960px'",
      description: 'Screen width below which the menu switches to mobile layout.',
    },
    {
      name: 'scrollHeight',
      type: 'string | null',
      default: 'null',
      description: 'CSS max-height for the overlay panel.',
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
      default: "'Mega menu'",
      description: 'Accessible label for the menu bar navigation.',
    },
  ];

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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '← / →',
      action:
        'Move focus between root-level items (horizontal) or between category panels (vertical).',
    },
    { key: '↓ / ↑', action: 'Navigate items inside the open panel column.' },
    {
      key: 'Enter / Space',
      action: 'Activate the focused item, or open/close the associated panel.',
    },
    { key: 'Escape', action: 'Close the open panel and return focus to the triggering root item.' },
    { key: 'Home / End', action: 'Jump to the first or last item in the current column.' },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'model',
      type: 'MegaMenuItem[]',
      default: '[]',
      description: 'Array of top-level navigation items.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Layout direction of the navigation bar.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size token applied to link padding and font size.',
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
      default: "'Navigation'",
      description: 'Accessible label for the nav landmark.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'itemClick',
      type: 'MegaMenuCommandEvent',
      description: 'Emitted when a non-disabled sub-item is activated (click or keyboard).',
    },
  ];

  public readonly apiMenuItemRows: ApiPropRow[] = [
    { name: 'label', type: 'string', description: 'Display label for the top-level item.' },
    { name: 'icon', type: 'string', description: 'Icon CSS class rendered before the label.' },
    {
      name: 'items',
      type: 'MegaMenuSubColumn[]',
      description: 'When present, opens a mega panel with these columns.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Prevents interaction with the top-level item.',
    },
    { name: 'visible', type: 'boolean', description: 'When false, hides the item entirely.' },
    {
      name: 'url',
      type: 'string',
      description: 'Renders the item as an anchor tag when no sub-items are present.',
    },
    {
      name: 'target',
      type: 'string',
      description: "Target attribute for url-based items (e.g. '_blank').",
    },
    {
      name: 'styleClass',
      type: 'string',
      description: 'Extra CSS class on the root item element.',
    },
    {
      name: 'command',
      type: '(event) => void',
      description: 'Callback for simple items without sub-items.',
    },
  ];

  public readonly apiSubColumnRows: ApiPropRow[] = [
    {
      name: 'header',
      type: 'string',
      description: 'Optional column header label rendered above the item list.',
    },
    {
      name: 'items',
      type: 'MegaMenuSubItem[]',
      description: 'Sub-items displayed in this column.',
    },
  ];

  public readonly apiSubItemRows: ApiPropRow[] = [
    { name: 'label', type: 'string', description: 'Display label.' },
    { name: 'icon', type: 'string', description: 'Icon CSS class.' },
    { name: 'disabled', type: 'boolean', description: 'Prevents interaction.' },
    { name: 'visible', type: 'boolean', description: 'When false, hides the item.' },
    { name: 'separator', type: 'boolean', description: 'Renders a visual divider line.' },
    { name: 'url', type: 'string', description: 'Renders as an anchor tag.' },
    { name: 'target', type: 'string', description: 'Target for url-based items.' },
    { name: 'styleClass', type: 'string', description: 'Extra CSS class on the item element.' },
    { name: 'command', type: '(event) => void', description: 'Callback invoked on activation.' },
  ];
}
