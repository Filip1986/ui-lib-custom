import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Menubar } from 'ui-lib-custom/menubar';
import { Button } from 'ui-lib-custom/button';
import type {
  MenubarCommandEvent,
  MenubarItem,
  MenubarSize,
  MenubarVariant,
} from 'ui-lib-custom/menubar';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { basicHtml, basicTs, startEndHtml, startEndTs } from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Menubar component.
 */
@Component({
  selector: 'app-menubar-demo',
  standalone: true,
  imports: [
    Menubar,
    Button,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './menubar-demo.component.html',
  styleUrl: './menubar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly startEndHtml: string = startEndHtml;
  public readonly startEndTs: string = startEndTs;

  public readonly importCode: string = "import { Menubar } from 'ui-lib-custom/menubar'";

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
    apgPattern: { name: 'Menubar', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/' },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'nested-submenus', label: 'Nested Submenus' },
    { id: 'disabled-items', label: 'Disabled Items' },
    { id: 'command-callbacks', label: 'Command Callbacks' },
    { id: 'item-click-output', label: 'itemClick Output' },
    { id: 'start-end-slots', label: 'Start / End Slots' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'playground', label: 'Playground' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  // ── Basic model ───────────────────────────────────────────────────────────

  public readonly basicModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-file' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
        { label: 'Save As', icon: 'pi pi-copy' },
        { separator: true },
        { label: 'Exit', icon: 'pi pi-sign-out' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', icon: 'pi pi-undo' },
        { label: 'Redo', icon: 'pi pi-redo' },
        { separator: true },
        { label: 'Cut', icon: 'pi pi-scissors' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clipboard' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', icon: 'pi pi-plus' },
        { label: 'Zoom Out', icon: 'pi pi-minus' },
        { separator: true },
        { label: 'Full Screen', icon: 'pi pi-window-maximize' },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Documentation', url: 'https://example.com/docs', target: '_blank' },
        { label: 'About' },
      ],
    },
  ];

  // ── Nested model ──────────────────────────────────────────────────────────

  public readonly nestedModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          icon: 'pi pi-file',
          items: [{ label: 'Project' }, { label: 'File' }, { label: 'Folder' }],
        },
        {
          label: 'Open Recent',
          icon: 'pi pi-history',
          items: [
            { label: 'Project Alpha' },
            { label: 'Project Beta' },
            { label: 'Project Gamma' },
          ],
        },
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { label: 'Preferences', icon: 'pi pi-cog' },
        {
          label: 'Theme',
          icon: 'pi pi-palette',
          items: [{ label: 'Light Mode' }, { label: 'Dark Mode' }, { label: 'System Default' }],
        },
      ],
    },
    { label: 'Dashboard', url: '/home' },
    { label: 'Docs', url: 'https://example.com/docs', target: '_blank' },
  ];

  // ── Disabled items model ──────────────────────────────────────────────────

  public readonly disabledModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New' },
        { label: 'Open' },
        { label: 'Save', disabled: true },
        { separator: true },
        { label: 'Export PDF', disabled: true },
      ],
    },
    {
      label: 'Edit',
      disabled: true,
      items: [{ label: 'Cut' }, { label: 'Copy' }],
    },
    { label: 'View' },
  ];

  // ── Command model ─────────────────────────────────────────────────────────

  public readonly lastClickedLabel: WritableSignal<string> = signal<string>('(none)');

  public readonly commandModel: MenubarItem[] = [
    {
      label: 'Actions',
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
          label: 'Delete',
          icon: 'pi pi-trash',
          command: (): void => {
            this.lastClickedLabel.set('Delete');
          },
        },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: (): void => {
            this.lastClickedLabel.set('Profile');
          },
        },
        {
          label: 'Preferences',
          icon: 'pi pi-cog',
          command: (): void => {
            this.lastClickedLabel.set('Preferences');
          },
        },
      ],
    },
  ];

  // ── itemClick event log ───────────────────────────────────────────────────

  public readonly itemClickLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly eventModel: MenubarItem[] = [
    {
      label: 'Navigate',
      items: [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }],
    },
    {
      label: 'Resources',
      items: [{ label: 'Docs' }, { label: 'API Reference' }, { label: 'Blog' }],
    },
  ];

  public handleItemClick(event: MenubarCommandEvent): void {
    const log: string[] = this.itemClickLog();
    const entry: string = `Clicked: "${event.item.label ?? 'unknown'}"`;
    this.itemClickLog.set([entry, ...log].slice(0, 6));
  }

  // ── Variant / size playground ──────────────────────────────────────────────

  public readonly playgroundVariant: WritableSignal<MenubarVariant> =
    signal<MenubarVariant>('material');
  public readonly playgroundSize: WritableSignal<MenubarSize> = signal<MenubarSize>('md');

  public readonly variants: MenubarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: MenubarSize[] = ['sm', 'md', 'lg'];

  public setVariant(value: MenubarVariant): void {
    this.playgroundVariant.set(value);
  }

  public setSize(value: MenubarSize): void {
    this.playgroundSize.set(value);
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'model',
      type: 'MenubarItem[]',
      default: '[]',
      description: 'Array of top-level navigation items.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size token controlling font-size and padding.',
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

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(itemClick)',
      type: 'MenubarCommandEvent',
      description: 'Emitted when a non-disabled leaf item is activated.',
    },
  ];

  public readonly apiItemRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string', description: 'Display text.' },
    { name: 'icon', type: 'string', description: 'Icon class or ui-lib-icon name.' },
    { name: 'disabled', type: 'boolean', description: 'Prevents interaction.' },
    { name: 'visible', type: 'boolean', description: 'When false, hides the item.' },
    { name: 'separator', type: 'boolean', description: 'Renders a visual separator instead.' },
    { name: 'styleClass', type: 'string', description: 'Extra CSS class on the item element.' },
    {
      name: 'url',
      type: 'string',
      description: 'Renders item as <code>&lt;a href&gt;</code> when set (leaf items).',
    },
    { name: 'target', type: 'string', description: 'Anchor target for url-based items.' },
    { name: 'items', type: 'MenubarItem[]', description: 'Nested children — opens a sub-panel.' },
    {
      name: 'command',
      type: '(event) => void',
      description: 'Callback when the item is activated.',
    },
  ];

  public readonly apiProjectionRows: readonly ApiPropRow[] = [
    {
      name: '[menubarStart]',
      type: 'ng-content',
      description: 'Content rendered in the leading area (e.g. logo).',
    },
    {
      name: '[menubarEnd]',
      type: 'ng-content',
      description: 'Content rendered in the trailing area (e.g. action buttons).',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '← / →', action: 'Move focus between top-level menu items.' },
    { key: '↓ / ↑', action: 'Open a submenu or navigate within an open submenu.' },
    { key: 'Enter / Space', action: 'Activate the focused item or open/close its submenu.' },
    { key: 'Escape', action: 'Close the open submenu and return focus to the parent item.' },
    {
      key: 'Home / End',
      action: 'Move focus to the first or last item in the current menu level.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-menubar-bar-bg', description: 'Bar background colour.' },
    { variable: '--uilib-menubar-bar-border', description: 'Bar border shorthand.' },
    { variable: '--uilib-menubar-bar-border-radius', description: 'Bar Border border radius.' },
    { variable: '--uilib-menubar-bar-padding', description: 'Bar padding.' },
    { variable: '--uilib-menubar-root-link-padding', description: 'Root Link padding.' },
    { variable: '--uilib-menubar-root-link-gap', description: 'Root Link gap.' },
    { variable: '--uilib-menubar-root-link-color', description: 'Root Link text colour.' },
    {
      variable: '--uilib-menubar-root-link-color-hover',
      description: 'Root Link text colour (hover).',
    },
    {
      variable: '--uilib-menubar-root-link-color-active',
      description: 'Root Link text colour (active).',
    },
    {
      variable: '--uilib-menubar-root-link-bg-hover',
      description: 'Root Link background colour (hover).',
    },
    {
      variable: '--uilib-menubar-root-link-bg-active',
      description: 'Root Link background colour (active).',
    },
    {
      variable: '--uilib-menubar-root-link-border-radius',
      description: 'Root Link Border border radius.',
    },
    {
      variable: '--uilib-menubar-root-link-font-size-sm',
      description: 'Root Link Font size — sm.',
    },
    {
      variable: '--uilib-menubar-root-link-font-size-md',
      description: 'Root Link Font size — md.',
    },
    {
      variable: '--uilib-menubar-root-link-font-size-lg',
      description: 'Root Link Font size — lg.',
    },
    { variable: '--uilib-menubar-root-link-font-weight', description: 'Root Link font weight.' },
    { variable: '--uilib-menubar-panel-bg', description: 'Panel background colour.' },
    { variable: '--uilib-menubar-panel-border', description: 'Panel border shorthand.' },
    { variable: '--uilib-menubar-panel-border-radius', description: 'Panel border radius.' },
    { variable: '--uilib-menubar-panel-shadow', description: 'Panel box shadow.' },
    { variable: '--uilib-menubar-panel-min-width', description: 'Panel Min width.' },
    { variable: '--uilib-menubar-panel-padding', description: 'Panel padding.' },
    { variable: '--uilib-menubar-sub-link-padding', description: 'Sub Link padding.' },
    { variable: '--uilib-menubar-sub-link-gap', description: 'Sub Link gap.' },
    { variable: '--uilib-menubar-sub-link-color', description: 'Sub Link text colour.' },
    {
      variable: '--uilib-menubar-sub-link-color-hover',
      description: 'Sub Link text colour (hover).',
    },
    {
      variable: '--uilib-menubar-sub-link-bg-hover',
      description: 'Sub Link background colour (hover).',
    },
    {
      variable: '--uilib-menubar-sub-link-border-radius',
      description: 'Sub Link Border border radius.',
    },
    { variable: '--uilib-menubar-sub-link-font-size', description: 'Sub Link Font size.' },
    {
      variable: '--uilib-menubar-sub-link-disabled-opacity',
      description: 'Sub Link Disabled opacity.',
    },
    { variable: '--uilib-menubar-caret-size', description: 'Caret size.' },
    { variable: '--uilib-menubar-caret-color', description: 'Caret text colour.' },
    { variable: '--uilib-menubar-sub-caret-color', description: 'Sub Caret text colour.' },
    { variable: '--uilib-menubar-separator-color', description: 'Separator text colour.' },
    { variable: '--uilib-menubar-separator-margin', description: 'Separator margin.' },
    { variable: '--uilib-menubar-toggle-color', description: 'Toggle icon colour.' },
    { variable: '--uilib-menubar-toggle-bar-width', description: 'Toggle Bar width.' },
    { variable: '--uilib-menubar-toggle-bar-height', description: 'Toggle Bar height.' },
    { variable: '--uilib-menubar-toggle-bar-gap', description: 'Toggle Bar gap.' },
    { variable: '--uilib-menubar-transition', description: 'Transition.' },
  ];
}
