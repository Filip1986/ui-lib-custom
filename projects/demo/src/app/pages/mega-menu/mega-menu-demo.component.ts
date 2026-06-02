import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';

import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type {
  MegaMenuCommandEvent,
  MegaMenuItem,
  MegaMenuOrientation,
  MegaMenuSize,
  MegaMenuVariant,
} from 'ui-lib-custom/mega-menu';
import { MegaMenu } from 'ui-lib-custom/mega-menu';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import {
  basicHorizontalHtml,
  basicHorizontalTs,
  itemClickHtml,
  itemClickTs,
  verticalHtml,
  verticalTs,
} from './snippets.generated';
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
    DocAriaTableComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './mega-menu-demo.component.html',
  styleUrl: './mega-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuDemoComponent {
  public readonly basicHorizontalHtml: string = basicHorizontalHtml;
  public readonly basicHorizontalTs: string = basicHorizontalTs;
  public readonly verticalHtml: string = verticalHtml;
  public readonly verticalTs: string = verticalTs;
  public readonly itemClickHtml: string = itemClickHtml;
  public readonly itemClickTs: string = itemClickTs;

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
  public readonly snippetDisabledSeparator: string = `{ label: "Save As", disabled: true }\n{ separator: true }`;
  public readonly snippetCommand: string = `{ label: "Delete", command: ({ item }) => console.log(item) }`;
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Menu bar',
      attribute: 'role',
      value: '"menubar"',
      notes: 'The top-level navigation container uses the menubar role.',
    },
    {
      element: 'Top-level item',
      attribute: 'role',
      value: '"menuitem"',
      notes: 'Each top-level entry is a menu item.',
    },
    {
      element: 'Top-level item (with panel)',
      attribute: 'aria-haspopup',
      value: '"true"',
      notes: 'Signals that activating the item opens a mega panel.',
    },
    {
      element: 'Top-level item (with panel)',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the mega panel is visible.',
    },
    {
      element: 'Mega panel',
      attribute: 'role',
      value: '"menu"',
      notes: 'The expanded panel container uses the menu role.',
    },
    {
      element: 'Panel item',
      attribute: 'role',
      value: '"menuitem"',
      notes: 'Each item inside the mega panel is a menu item.',
    },
  ];

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

  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'model', type: 'MegaMenuItem[]', default: '[]', description: 'Top-level menu items.' },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Mega menu orientation.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Menu size.' },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Menu'",
      description: 'ARIA label for the navigation landmark.',
    },
  ];
  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(itemClick)',
      type: 'OutputEmitterRef<MouseEvent>',
      description: 'Emitted when a leaf item is clicked.',
    },
  ];
  public readonly apiMenuItemRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string | undefined', description: 'Item label text.' },
    { name: 'icon', type: 'string | undefined', description: 'CSS icon class.' },
    { name: 'items', type: 'MegaMenuSubColumn[][] | undefined', description: 'Sub-column groups.' },
    { name: 'disabled', type: 'boolean | undefined', description: 'Disables the item.' },
  ];
  public readonly apiSubColumnRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string | undefined', description: 'Column header label.' },
    {
      name: 'items',
      type: 'MegaMenuSubItem[] | undefined',
      description: 'Items inside the column.',
    },
  ];
  public readonly apiSubItemRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string | undefined', description: 'Item label text.' },
    { name: 'icon', type: 'string | undefined', description: 'CSS icon class.' },
    { name: 'disabled', type: 'boolean | undefined', description: 'Disables the item.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-mega-menu-bar-bg', description: 'Bar background colour.' },
    { variable: '--uilib-mega-menu-bar-border', description: 'Bar border shorthand.' },
    { variable: '--uilib-mega-menu-bar-border-radius', description: 'Bar Border border radius.' },
    { variable: '--uilib-mega-menu-root-item-padding', description: 'Root Item padding.' },
    { variable: '--uilib-mega-menu-root-item-gap', description: 'Root Item gap.' },
    { variable: '--uilib-mega-menu-root-link-color', description: 'Root Link text colour.' },
    {
      variable: '--uilib-mega-menu-root-link-color-hover',
      description: 'Root Link text colour (hover).',
    },
    {
      variable: '--uilib-mega-menu-root-link-color-active',
      description: 'Root Link text colour (active).',
    },
    {
      variable: '--uilib-mega-menu-root-link-bg-hover',
      description: 'Root Link background colour (hover).',
    },
    {
      variable: '--uilib-mega-menu-root-link-bg-active',
      description: 'Root Link background colour (active).',
    },
    {
      variable: '--uilib-mega-menu-root-link-border-radius',
      description: 'Root Link Border border radius.',
    },
    {
      variable: '--uilib-mega-menu-root-link-font-size-sm',
      description: 'Root Link Font size — sm.',
    },
    {
      variable: '--uilib-mega-menu-root-link-font-size-md',
      description: 'Root Link Font size — md.',
    },
    {
      variable: '--uilib-mega-menu-root-link-font-size-lg',
      description: 'Root Link Font size — lg.',
    },
    { variable: '--uilib-mega-menu-root-link-font-weight', description: 'Root Link font weight.' },
    { variable: '--uilib-mega-menu-caret-size', description: 'Caret size.' },
    { variable: '--uilib-mega-menu-caret-color', description: 'Caret text colour.' },
    { variable: '--uilib-mega-menu-panel-bg', description: 'Panel background colour.' },
    { variable: '--uilib-mega-menu-panel-border', description: 'Panel border shorthand.' },
    { variable: '--uilib-mega-menu-panel-border-radius', description: 'Panel border radius.' },
    { variable: '--uilib-mega-menu-panel-shadow', description: 'Panel box shadow.' },
    { variable: '--uilib-mega-menu-panel-padding', description: 'Panel padding.' },
    { variable: '--uilib-mega-menu-panel-gap', description: 'Panel gap.' },
    { variable: '--uilib-mega-menu-panel-min-width', description: 'Panel Min width.' },
    {
      variable: '--uilib-mega-menu-column-header-color',
      description: 'Column Header text colour.',
    },
    {
      variable: '--uilib-mega-menu-column-header-font-size',
      description: 'Column Header Font size.',
    },
    {
      variable: '--uilib-mega-menu-column-header-font-weight',
      description: 'Column Header font weight.',
    },
    {
      variable: '--uilib-mega-menu-column-header-letter-spacing',
      description: 'Column Header letter spacing.',
    },
    {
      variable: '--uilib-mega-menu-column-header-padding-bottom',
      description: 'Column Header bottom padding.',
    },
    {
      variable: '--uilib-mega-menu-column-header-margin-bottom',
      description: 'Column Header Margin Bottom.',
    },
    {
      variable: '--uilib-mega-menu-column-header-border-bottom',
      description: 'Column Header Border Bottom.',
    },
    { variable: '--uilib-mega-menu-sub-item-padding', description: 'Sub Item padding.' },
    { variable: '--uilib-mega-menu-sub-item-gap', description: 'Sub Item gap.' },
    { variable: '--uilib-mega-menu-sub-link-color', description: 'Sub Link text colour.' },
    {
      variable: '--uilib-mega-menu-sub-link-color-hover',
      description: 'Sub Link text colour (hover).',
    },
    {
      variable: '--uilib-mega-menu-sub-link-bg-hover',
      description: 'Sub Link background colour (hover).',
    },
    {
      variable: '--uilib-mega-menu-sub-link-border-radius',
      description: 'Sub Link Border border radius.',
    },
    { variable: '--uilib-mega-menu-sub-link-font-size', description: 'Sub Link Font size.' },
    {
      variable: '--uilib-mega-menu-sub-link-disabled-opacity',
      description: 'Sub Link Disabled opacity.',
    },
    { variable: '--uilib-mega-menu-separator-color', description: 'Separator text colour.' },
    { variable: '--uilib-mega-menu-separator-margin', description: 'Separator margin.' },
    { variable: '--uilib-mega-menu-transition', description: 'Transition.' },
  ];
}
