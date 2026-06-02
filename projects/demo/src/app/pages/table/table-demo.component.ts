import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TableComponent,
  TableColumnComponent,
  TableCaptionDirective,
  TableColumnBodyDirective,
  TableEmptyDirective,
  TableExpansionDirective,
} from 'ui-lib-custom/table';
import type { TableSelectionMode, TableSortEvent, TableVariant } from 'ui-lib-custom/table';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  rating: number;
}

/** Demo component showcasing the TableComponent with all supported variants, sizes, and features. */
@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    TableColumnComponent,
    TableCaptionDirective,
    TableColumnBodyDirective,
    TableEmptyDirective,
    TableExpansionDirective,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {
  public readonly importCode: string = "import { TableComponent } from 'ui-lib-custom/table'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    apgPattern: { name: 'Grid', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/' },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'interactive-demo', label: 'Interactive Demo' },
    { id: 'all-variants', label: 'All Variants' },
    { id: 'scrollable-table', label: 'Scrollable Table' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'value', type: 'unknown[]', default: '[]', description: 'Data array to display.' },
    {
      name: 'dataKey',
      type: 'string | null',
      default: 'null',
      description: 'Property for unique row identity.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Table size.' },
    {
      name: 'selectionMode',
      type: "'single' | 'multiple' | null",
      default: 'null',
      description: 'Row selection mode.',
    },
    {
      name: 'metaKeySelection',
      type: 'boolean',
      default: 'false',
      description: 'Requires Meta/Ctrl for multiple selection.',
    },
    {
      name: 'paginator',
      type: 'boolean',
      default: 'false',
      description: 'Enables built-in pagination.',
    },
    {
      name: 'rowsPerPageOptions',
      type: 'number[]',
      default: '[10, 25, 50]',
      description: 'Options for the rows-per-page selector.',
    },
    {
      name: 'multiSortMode',
      type: 'boolean',
      default: 'false',
      description: 'Allows sorting by multiple columns.',
    },
    {
      name: 'globalFilterFields',
      type: 'string[] | null',
      default: 'null',
      description: 'Fields to search in the global filter.',
    },
    {
      name: 'globalFilterPlaceholder',
      type: 'string',
      default: "'Search...'",
      description: 'Global filter input placeholder.',
    },
    {
      name: 'stripedRows',
      type: 'boolean',
      default: 'false',
      description: 'Alternates row background colors.',
    },
    {
      name: 'rowHover',
      type: 'boolean',
      default: 'false',
      description: 'Highlights rows on hover.',
    },
    {
      name: 'showGridlines',
      type: 'boolean',
      default: 'false',
      description: 'Displays column gridlines.',
    },
    {
      name: 'scrollable',
      type: 'boolean',
      default: 'false',
      description: 'Enables vertical scrolling with a fixed header.',
    },
    {
      name: 'scrollHeight',
      type: 'string | null',
      default: 'null',
      description: 'CSS height of the scroll viewport.',
    },
  ];

  public readonly products: WritableSignal<Product[]> = signal<Product[]>([
    {
      id: 1,
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1299,
      quantity: 12,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 49,
      quantity: 0,
      status: 'OUTOFSTOCK',
      rating: 3,
    },
    {
      id: 3,
      name: 'Standing Desk',
      category: 'Furniture',
      price: 599,
      quantity: 5,
      status: 'LOWSTOCK',
      rating: 5,
    },
    {
      id: 4,
      name: 'Monitor 27"',
      category: 'Electronics',
      price: 449,
      quantity: 20,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 5,
      name: 'Ergonomic Chair',
      category: 'Furniture',
      price: 389,
      quantity: 3,
      status: 'LOWSTOCK',
      rating: 5,
    },
    {
      id: 6,
      name: 'USB-C Hub',
      category: 'Electronics',
      price: 79,
      quantity: 50,
      status: 'INSTOCK',
      rating: 3,
    },
    {
      id: 7,
      name: 'Bookshelf',
      category: 'Furniture',
      price: 229,
      quantity: 8,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 8,
      name: 'Webcam HD',
      category: 'Electronics',
      price: 99,
      quantity: 0,
      status: 'OUTOFSTOCK',
      rating: 3,
    },
    {
      id: 9,
      name: 'Desk Lamp',
      category: 'Lighting',
      price: 59,
      quantity: 30,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 10,
      name: 'Keyboard Mech',
      category: 'Electronics',
      price: 149,
      quantity: 15,
      status: 'INSTOCK',
      rating: 5,
    },
    {
      id: 11,
      name: 'Whiteboard',
      category: 'Office',
      price: 119,
      quantity: 7,
      status: 'INSTOCK',
      rating: 3,
    },
    {
      id: 12,
      name: 'Headphones',
      category: 'Electronics',
      price: 199,
      quantity: 2,
      status: 'LOWSTOCK',
      rating: 5,
    },
  ]);

  // Demo config
  public readonly activeVariant: WritableSignal<TableVariant> = signal<TableVariant>('material');
  public readonly stripedRows: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showGridlines: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rowHover: WritableSignal<boolean> = signal<boolean>(true);
  public readonly paginatorEnabled: WritableSignal<boolean> = signal<boolean>(true);
  public readonly selectionMode: WritableSignal<TableSelectionMode> =
    signal<TableSelectionMode>('checkbox');
  public readonly globalFilterValue: WritableSignal<string> = signal<string>('');
  public readonly selectedProducts: WritableSignal<unknown> = signal<unknown>([]);
  public readonly expandedRowKeys: WritableSignal<Set<unknown>> = signal<Set<unknown>>(new Set());
  public readonly lastSortEvent: WritableSignal<string> = signal<string>('—');

  public readonly variants: TableVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly selectionModes: Array<{ label: string; value: TableSelectionMode }> = [
    { label: 'None', value: null },
    { label: 'Single', value: 'single' },
    { label: 'Multiple', value: 'multiple' },
    { label: 'Checkbox', value: 'checkbox' },
  ];

  public onSortChange(event: TableSortEvent): void {
    this.lastSortEvent.set(
      event.order !== 0 ? `${event.field} ${event.order === 1 ? 'ASC' : 'DESC'}` : 'cleared',
    );
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  public statusSeverity(status: Product['status']): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  public stars(rating: number): string {
    return '*'.repeat(rating) + '-'.repeat(5 - rating);
  }
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action: 'Move focus between interactive elements (sort headers, checkboxes, expand buttons).',
    },
    {
      key: 'Enter / Space',
      target: 'sortable column header',
      action: 'Toggle sort order (ascending → descending → none).',
    },
    { key: 'Enter / Space', target: 'checkbox cell', action: 'Toggle row selection.' },
    { key: 'Enter / Space', target: 'expand button', action: 'Toggle row expansion.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Table',
      attribute: 'role="grid"',
      value: '—',
      notes: 'Announced as an interactive grid to assistive technologies.',
    },
    {
      element: 'Column header',
      attribute: 'aria-sort',
      value: '"ascending" | "descending" | "none"',
      notes: 'Reflects the current sort direction on sortable columns.',
    },
    {
      element: 'Row',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Set when selectionMode is active.',
    },
    {
      element: 'Checkbox cell',
      attribute: 'role="checkbox"',
      value: '—',
      notes: 'Checkbox selection cells announce checked state.',
    },
    {
      element: 'Expand button',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the expansion row is open.',
    },
    {
      element: 'Empty state',
      attribute: 'role="row"',
      value: '—',
      notes: 'Empty state row is still a valid grid row for screen readers.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-table-border-radius', description: 'Border radius.' },
    { variable: '--uilib-table-border-width', description: 'Border width.' },
    { variable: '--uilib-table-border-color', description: 'Border colour.' },
    { variable: '--uilib-table-bg', description: 'Background colour.' },
    { variable: '--uilib-table-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-table-footer-bg', description: 'Footer background colour.' },
    { variable: '--uilib-table-row-bg', description: 'Row background colour.' },
    { variable: '--uilib-table-row-bg-alt', description: 'Row Bg Alt.' },
    { variable: '--uilib-table-row-bg-hover', description: 'Row background colour (hover).' },
    { variable: '--uilib-table-row-bg-selected', description: 'Row background colour (selected).' },
    { variable: '--uilib-table-header-color', description: 'Header text colour.' },
    { variable: '--uilib-table-body-color', description: 'Body text colour.' },
    { variable: '--uilib-table-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-table-header-font-size', description: 'Header font size.' },
    { variable: '--uilib-table-body-font-size', description: 'Body Font size.' },
    { variable: '--uilib-table-cell-padding-y', description: 'Cell vertical padding.' },
    { variable: '--uilib-table-cell-padding-x', description: 'Cell horizontal padding.' },
    { variable: '--uilib-table-header-padding-y', description: 'Header vertical padding.' },
    { variable: '--uilib-table-header-padding-x', description: 'Header horizontal padding.' },
    { variable: '--uilib-table-filter-padding', description: 'Filter padding.' },
    { variable: '--uilib-table-filter-font-size', description: 'Filter Font size.' },
    { variable: '--uilib-table-sort-icon-size', description: 'Sort Icon size.' },
    { variable: '--uilib-table-sort-icon-color', description: 'Sort Icon text colour.' },
    {
      variable: '--uilib-table-sort-icon-color-active',
      description: 'Sort Icon text colour (active).',
    },
    {
      variable: '--uilib-table-selection-border-color',
      description: 'Selection Border text colour.',
    },
    { variable: '--uilib-table-checkbox-size', description: 'Checkbox size.' },
    { variable: '--uilib-table-expander-size', description: 'Expander size.' },
    { variable: '--uilib-table-expander-bg', description: 'Expander background colour.' },
    { variable: '--uilib-table-expander-color', description: 'Expander text colour.' },
    {
      variable: '--uilib-table-expander-bg-hover',
      description: 'Expander background colour (hover).',
    },
    { variable: '--uilib-table-expansion-bg', description: 'Expansion background colour.' },
    { variable: '--uilib-table-paginator-margin-top', description: 'Paginator Margin Top.' },
    { variable: '--uilib-table-caption-padding', description: 'Caption padding.' },
    { variable: '--uilib-table-caption-bg', description: 'Caption background colour.' },
    { variable: '--uilib-table-caption-color', description: 'Caption text colour.' },
    { variable: '--uilib-table-caption-font-size', description: 'Caption Font size.' },
    { variable: '--uilib-table-caption-font-weight', description: 'Caption font weight.' },
  ];
}
