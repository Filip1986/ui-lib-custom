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
import { DocAriaTableComponent } from '../../shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '../../shared/doc-page/doc-aria-table.component';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import {
  basicHtml,
  basicTs,
  popupHtml,
  popupTs,
  variantsHtml,
  variantsTs,
  sizesHtml,
  sizesTs,
  importTs,
  nestedTs,
  itemStatesTs,
  urlItemsTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocApiReferenceComponent } from '../../shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '../../shared/doc-page/doc-api-reference.component';

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
    DocAriaTableComponent,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './tiered-menu-demo.component.html',
  styleUrl: './tiered-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TieredMenuDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly popupHtml: string = popupHtml;
  public readonly popupTs: string = popupTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly importTs: string = importTs;
  public readonly nestedTs: string = nestedTs;
  public readonly itemStatesTs: string = itemStatesTs;
  public readonly urlItemsTs: string = urlItemsTs;

  public readonly importCode: string = "import { TieredMenu } from 'ui-lib-custom/tiered-menu'";

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
    { id: 'nested-submenus', label: 'Nested Submenus' },
    { id: 'popup-mode', label: 'Popup Mode' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'item-states', label: 'Item States' },
    { id: 'url-items', label: 'URL Items' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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

  // ── API reference data ───────────────────────────────────────────────

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'model',
      type: 'TieredMenuItem[]',
      default: '[]',
      description:
        'Array of items to display. Items with an <code>items</code> array open nested flyout panels.',
    },
    {
      name: 'popup',
      type: 'boolean',
      default: 'false',
      description:
        'When <code>true</code>, renders as a floating fixed overlay. Control with <code>toggle()</code>, <code>show()</code>, or <code>hide()</code>.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description:
        'Design variant. Falls back to <code>ThemeConfigService</code> when <code>null</code>.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size token affecting font size, padding, and minimum panel width.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class applied to the host element.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Menu'",
      description: 'Accessible name for the root <code>&lt;ul role="menu"&gt;</code> panel.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'itemClick',
      type: 'TieredMenuItemCommandEvent',
      description: 'Emitted when a non-disabled leaf item is activated (click or keyboard).',
    },
    {
      name: 'menuShow',
      type: 'MouseEvent | KeyboardEvent',
      description: 'Emitted when the popup panel becomes visible. Popup mode only.',
    },
    {
      name: 'menuHide',
      type: 'void',
      description: 'Emitted when the popup panel is hidden. Popup mode only.',
    },
  ];

  public readonly apiMethodRows: ApiPropRow[] = [
    {
      name: 'show(event)',
      type: 'MouseEvent | KeyboardEvent',
      description:
        'Opens the popup anchored to <code>event.currentTarget</code>. No-op in inline mode.',
    },
    {
      name: 'hide()',
      type: '—',
      description:
        'Closes the popup and restores focus to the trigger element. No-op in inline mode.',
    },
    {
      name: 'toggle(event)',
      type: 'MouseEvent | KeyboardEvent',
      description: 'Calls <code>show()</code> or <code>hide()</code> based on current visibility.',
    },
  ];

  public readonly apiItemRows: ApiPropRow[] = [
    { name: 'label', type: 'string?', description: 'Display text for the item.' },
    {
      name: 'icon',
      type: 'string?',
      description: 'Icon class applied to a <code>&lt;span aria-hidden="true"&gt;</code>.',
    },
    {
      name: 'items',
      type: 'TieredMenuItem[]?',
      description:
        'Child items — renders a right-arrow caret and opens a flyout sub-panel on hover or <kbd>ArrowRight</kbd>.',
    },
    {
      name: 'disabled',
      type: 'boolean?',
      description:
        'When <code>true</code>, item is non-interactive; gets <code>aria-disabled="true"</code> and <code>tabindex="-1"</code>.',
    },
    {
      name: 'separator',
      type: 'boolean?',
      description: 'Renders a <code>&lt;li role="separator"&gt;</code> horizontal divider.',
    },
    {
      name: 'visible',
      type: 'boolean?',
      description: 'When explicitly <code>false</code>, excludes the item from the rendered list.',
    },
    {
      name: 'url',
      type: 'string?',
      description: 'Renders the item as <code>&lt;a href="..."&gt;</code>.',
    },
    {
      name: 'target',
      type: 'string?',
      description: "Target attribute for URL-based items (e.g. <code>'_blank'</code>).",
    },
    {
      name: 'command',
      type: 'function?',
      description: 'Callback invoked when the item is activated.',
    },
    {
      name: 'styleClass',
      type: 'string?',
      description: 'Extra CSS class added to the <code>&lt;li&gt;</code> element.',
    },
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
