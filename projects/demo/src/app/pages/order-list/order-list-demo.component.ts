import type { Signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';

import { Stack } from 'ui-lib-custom/layout';
import type {
  OrderListReorderEvent,
  OrderListSelectionChangeEvent,
} from 'ui-lib-custom/order-list';
import {
  OrderListComponent,
  OrderListEmptyDirective,
  OrderListHeaderDirective,
  OrderListItemDirective,
} from 'ui-lib-custom/order-list';
import { Panel } from 'ui-lib-custom/panel';

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
  basicHtml,
  basicTs,
  dragDropHtml,
  dragDropTs,
  filterHtml,
  filterTs,
  templateHtml,
  templateTs,
} from './snippets.generated';

// ---------------------------------------------------------------------------
// Demo data model
// ---------------------------------------------------------------------------

interface DemoProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
}

const DEMO_PRODUCTS: DemoProduct[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Audio', price: 79.99, rating: 4 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Input', price: 129.99, rating: 5 },
  { id: 3, name: 'USB-C Hub', category: 'Connectivity', price: 49.99, rating: 3 },
  { id: 4, name: '4K Webcam', category: 'Video', price: 99.99, rating: 4 },
  { id: 5, name: 'Desk Lamp', category: 'Lighting', price: 34.99, rating: 3 },
  { id: 6, name: 'Mouse Pad XL', category: 'Input', price: 19.99, rating: 4 },
  { id: 7, name: 'Monitor Stand', category: 'Ergonomics', price: 59.99, rating: 5 },
  { id: 8, name: 'Cable Organizer', category: 'Accessories', price: 14.99, rating: 3 },
];

// ---------------------------------------------------------------------------
// Demo code snippets
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Demo page for the OrderList component.
 * Sections: Basic, Filter, Custom Templates, Drag & Drop, Accessibility, API Reference.
 */
@Component({
  selector: 'app-order-list-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocCodeExampleComponent,
    Stack,
    OrderListComponent,
    OrderListItemDirective,
    OrderListHeaderDirective,
    OrderListEmptyDirective,
    DocTocComponent,
    DocQualityBadgeComponent,

    DocSectionComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocApiReferenceComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './order-list-demo.component.html',
  styleUrl: './order-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly filterHtml: string = filterHtml;
  public readonly filterTs: string = filterTs;
  public readonly templateHtml: string = templateHtml;
  public readonly templateTs: string = templateTs;
  public readonly dragDropHtml: string = dragDropHtml;
  public readonly dragDropTs: string = dragDropTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { OrderListComponent } from 'ui-lib-custom/order-list'";

  // -------------------------------------------------------------------------
  // Sections
  // -------------------------------------------------------------------------

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'filter', label: 'Filter' },
    { id: 'templates', label: 'Custom Templates' },
    { id: 'drag-drop', label: 'Drag & Drop' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  // -------------------------------------------------------------------------
  // Keyboard navigation rows
  // -------------------------------------------------------------------------

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'List container',
      attribute: 'role',
      value: '"listbox"',
      notes: 'The reorderable list uses the listbox role.',
    },
    {
      element: 'List container',
      attribute: 'aria-label',
      value: 'string',
      notes: 'Name the list with <code>[ariaLabel]</code> so screen readers announce its purpose.',
    },
    {
      element: 'List item',
      attribute: 'role',
      value: '"option"',
      notes: 'Each item in the list is an option.',
    },
    {
      element: 'List item',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Reflects selection state.',
    },
    {
      element: 'Move buttons',
      attribute: 'aria-label',
      value: '"Move Up" | "Move Down" | "Move to Top" | "Move to Bottom"',
      notes: 'Descriptive labels on the order-control buttons.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '↓ / ↑', action: 'Navigate focus between items (wraps).' },
    { key: 'Home / End', action: 'Jump focus to first / last item.' },
    { key: 'Space / Enter', action: 'Toggle selection of focused item.' },
    { key: 'Ctrl+A', action: 'Select all visible items.' },
    { key: 'Escape', action: 'Clear selection.' },
    { key: 'Alt+↑ / Ctrl+↑', action: 'Move selected items up.' },
    { key: 'Alt+↓ / Ctrl+↓', action: 'Move selected items down.' },
    { key: 'Alt+Home', action: 'Move selected items to top.' },
    { key: 'Alt+End', action: 'Move selected items to bottom.' },
  ];

  // -------------------------------------------------------------------------
  // Basic section
  // -------------------------------------------------------------------------

  public readonly products: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS,
  ]);
  public readonly selection: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([]);

  // -------------------------------------------------------------------------
  // Filter section
  // -------------------------------------------------------------------------

  public readonly filterProducts: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS,
  ]);

  // -------------------------------------------------------------------------
  // Template section
  // -------------------------------------------------------------------------

  public readonly templateProducts: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS,
  ]);
  public readonly templateSelection: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([]);

  // -------------------------------------------------------------------------
  // Drag & drop section
  // -------------------------------------------------------------------------

  public readonly dragProducts: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS.slice(0, 5),
  ]);
  public lastReorderEvent: WritableSignal<string> = signal<string>('—');

  public onReorder(event: OrderListReorderEvent): void {
    const items: DemoProduct[] = event.items as DemoProduct[];
    this.lastReorderEvent.set(
      `Moved from position ${event.previousIndex + 1} → ${event.currentIndex + 1} (${items.length} items)`,
    );
  }

  public onSelectionChanged(event: OrderListSelectionChangeEvent): void {
    this.selection.set(event.value as DemoProduct[]);
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  public starsLabel(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      description: 'Ordered list items — two-way via [(value)].',
    },
    {
      name: 'selection',
      type: 'unknown[]',
      default: '[]',
      description: 'Selected items — two-way via [(selection)].',
    },
    { name: 'header', type: 'string | null', default: 'null', description: 'Static header text.' },
    {
      name: 'filterBy',
      type: 'string | null',
      default: 'null',
      description: 'Dot-notation filter field. Shows filter input when set.',
    },
    {
      name: 'filterPlaceholder',
      type: 'string',
      default: "'Filter'",
      description: 'Filter input placeholder.',
    },
    {
      name: 'filterMatchMode',
      type: "'contains' | 'startsWith' | 'endsWith' | 'equals'",
      default: "'contains'",
      description: 'Matching strategy.',
    },
    {
      name: 'filterLocale',
      type: 'string | undefined',
      default: 'undefined',
      description: 'BCP 47 locale for comparisons.',
    },
    {
      name: 'dragDrop',
      type: 'boolean',
      default: 'false',
      description: 'Enables native HTML5 drag-and-drop.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all interaction.',
    },
    {
      name: 'metaKeySelection',
      type: 'boolean',
      default: 'false',
      description: 'Requires Ctrl/Meta to multi-select.',
    },
    {
      name: 'stripedRows',
      type: 'boolean',
      default: 'false',
      description: 'Alternating row background.',
    },
    {
      name: 'controlsPosition',
      type: "'left' | 'right' | 'top'",
      default: "'left'",
      description: 'Control buttons position.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Theme variant override.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size scale.' },
    {
      name: 'trackBy',
      type: 'string | null',
      default: 'null',
      description: 'Property path for identity.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Listbox accessible label.',
    },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'ID(s) labelling the listbox.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'reordered',
      type: 'OrderListReorderEvent',
      description: 'After any reorder (buttons or DnD).',
    },
    {
      name: 'selectionChanged',
      type: 'OrderListSelectionChangeEvent',
      description: 'When selection changes.',
    },
    { name: 'filtered', type: 'OrderListFilterEvent', description: 'When filter query changes.' },
    {
      name: 'dragDropped',
      type: 'OrderListDragDropEvent',
      description: 'After a drag-and-drop reorder.',
    },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    { name: 'uiOrderListItem', type: '$implicit: T', description: 'Custom item row.' },
    { name: 'uiOrderListHeader', type: '—', description: 'Custom header.' },
    {
      name: 'uiOrderListEmpty',
      type: 'filter: boolean',
      description: 'Empty / no-filter-match state.',
    },
    { name: 'uiOrderListFilter', type: '—', description: 'Replaces default filter input.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-order-list-gap', description: 'Gap.' },
    { variable: '--uilib-order-list-min-height', description: 'Minimum height.' },
    { variable: '--uilib-order-list-max-height', description: 'Maximum height.' },
    { variable: '--uilib-order-list-bg', description: 'Background colour.' },
    { variable: '--uilib-order-list-border', description: 'Border shorthand.' },
    { variable: '--uilib-order-list-radius', description: 'Border radius.' },
    { variable: '--uilib-order-list-item-padding', description: 'Item padding.' },
    { variable: '--uilib-order-list-item-bg', description: 'Item background colour.' },
    {
      variable: '--uilib-order-list-item-bg-hover',
      description: 'Item background colour (hover).',
    },
    {
      variable: '--uilib-order-list-item-bg-selected',
      description: 'Item background colour (selected).',
    },
    { variable: '--uilib-order-list-item-color', description: 'Item text colour.' },
    {
      variable: '--uilib-order-list-item-color-selected',
      description: 'Item text colour (selected).',
    },
    { variable: '--uilib-order-list-item-border-bottom', description: 'Item Border Bottom.' },
    { variable: '--uilib-order-list-item-drag-opacity', description: 'Item Drag opacity.' },
    {
      variable: '--uilib-order-list-drop-indicator-color',
      description: 'Drop Indicator text colour.',
    },
    { variable: '--uilib-order-list-drop-indicator-height', description: 'Drop Indicator height.' },
    { variable: '--uilib-order-list-item-bg-striped', description: 'Item Bg Striped.' },
    { variable: '--uilib-order-list-filter-padding', description: 'Filter padding.' },
    { variable: '--uilib-order-list-filter-border', description: 'Filter border shorthand.' },
    { variable: '--uilib-order-list-filter-bg', description: 'Filter background colour.' },
    { variable: '--uilib-order-list-filter-radius', description: 'Filter border radius.' },
    { variable: '--uilib-order-list-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-order-list-header-padding', description: 'Header padding.' },
    { variable: '--uilib-order-list-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-order-list-header-border', description: 'Header border shorthand.' },
    { variable: '--uilib-order-list-control-size', description: 'Control size.' },
    { variable: '--uilib-order-list-control-bg', description: 'Control background colour.' },
    { variable: '--uilib-order-list-control-color', description: 'Control text colour.' },
    {
      variable: '--uilib-order-list-control-bg-hover',
      description: 'Control background colour (hover).',
    },
    { variable: '--uilib-order-list-control-radius', description: 'Control border radius.' },
    { variable: '--uilib-order-list-control-gap', description: 'Control gap.' },
    { variable: '--uilib-order-list-control-border', description: 'Control border shorthand.' },
    { variable: '--uilib-order-list-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-order-list-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-order-list-transition', description: 'Transition.' },
    { variable: '--uilib-order-list-font-size', description: 'Font size.' },
  ];
}
