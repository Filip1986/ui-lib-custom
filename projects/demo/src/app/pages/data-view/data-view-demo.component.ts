import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { Button } from 'ui-lib-custom/button';
import {
  DataViewComponent,
  DataViewEmptyDirective,
  DataViewFooterDirective,
  DataViewGridItemDirective,
  DataViewHeaderDirective,
  DataViewListItemDirective,
  DataViewLoadingDirective,
  DataViewPaginatorLeftDirective,
  DataViewPaginatorRightDirective,
} from 'ui-lib-custom/data-view';
import type { DataViewLayout, DataViewPageEvent, DataViewSortOrder } from 'ui-lib-custom/data-view';
import { Grid, Inline, Stack } from 'ui-lib-custom/layout';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';
import { DATA_VIEW_DEMO_PRODUCTS } from './data-view-demo.data';
import type { DemoInventoryStatus, DemoProduct } from './data-view-demo.data';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicListHtml,
  basicListTs,
  basicGridHtml,
  basicGridTs,
  layoutSwitchingHtml,
  layoutSwitchingTs,
  paginationClientHtml,
  paginationClientTs,
  rowsPerPageHtml,
  rowsPerPageTs,
  paginationPositionHtml,
  paginationPositionTs,
  customPageReportHtml,
  customPageReportTs,
  serverSidePaginationHtml,
  serverSidePaginationTs,
  sortingHtml,
  sortingTs,
  customTemplatesHtml,
  customTemplatesTs,
  emptyStateHtml,
  emptyStateTs,
  loadingStateHtml,
  loadingStateTs,
  sizesHtml,
  sizesTs,
  gridColumnsHtml,
  gridColumnsTs,
  customPaginatorSlotsHtml,
  customPaginatorSlotsTs,
  themeIntegrationHtml,
  themeIntegrationTs,
} from './snippets.generated';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
type DataViewSortField = 'name' | 'price' | 'rating';

/**
 * Demo page for DataView list/grid rendering, paginator modes, templates, and theming.
 */
@Component({
  selector: 'app-data-view-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Button,
    Stack,
    Inline,
    Grid,
    SelectButton,
    DataViewComponent,
    DataViewListItemDirective,
    DataViewGridItemDirective,
    DataViewHeaderDirective,
    DataViewFooterDirective,
    DataViewEmptyDirective,
    DataViewLoadingDirective,
    DataViewPaginatorLeftDirective,
    DataViewPaginatorRightDirective,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './data-view-demo.component.html',
  styleUrl: './data-view-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewDemoComponent {
  public readonly basicListHtml: string = basicListHtml;
  public readonly basicListTs: string = basicListTs;
  public readonly basicGridHtml: string = basicGridHtml;
  public readonly basicGridTs: string = basicGridTs;
  public readonly layoutSwitchingHtml: string = layoutSwitchingHtml;
  public readonly layoutSwitchingTs: string = layoutSwitchingTs;
  public readonly paginationClientHtml: string = paginationClientHtml;
  public readonly paginationClientTs: string = paginationClientTs;
  public readonly rowsPerPageHtml: string = rowsPerPageHtml;
  public readonly rowsPerPageTs: string = rowsPerPageTs;
  public readonly paginationPositionHtml: string = paginationPositionHtml;
  public readonly paginationPositionTs: string = paginationPositionTs;
  public readonly customPageReportHtml: string = customPageReportHtml;
  public readonly customPageReportTs: string = customPageReportTs;
  public readonly serverSidePaginationHtml: string = serverSidePaginationHtml;
  public readonly serverSidePaginationTs: string = serverSidePaginationTs;
  public readonly sortingHtml: string = sortingHtml;
  public readonly sortingTs: string = sortingTs;
  public readonly customTemplatesHtml: string = customTemplatesHtml;
  public readonly customTemplatesTs: string = customTemplatesTs;
  public readonly emptyStateHtml: string = emptyStateHtml;
  public readonly emptyStateTs: string = emptyStateTs;
  public readonly loadingStateHtml: string = loadingStateHtml;
  public readonly loadingStateTs: string = loadingStateTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly gridColumnsHtml: string = gridColumnsHtml;
  public readonly gridColumnsTs: string = gridColumnsTs;
  public readonly customPaginatorSlotsHtml: string = customPaginatorSlotsHtml;
  public readonly customPaginatorSlotsTs: string = customPaginatorSlotsTs;
  public readonly themeIntegrationHtml: string = themeIntegrationHtml;
  public readonly themeIntegrationTs: string = themeIntegrationTs;

  public readonly importCode: string =
    "import { DataViewComponent } from 'ui-lib-custom/data-view'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic-list', label: 'Basic List' },
    { id: 'basic-grid', label: 'Basic Grid' },
    { id: 'layout-switching', label: 'Layout Switching' },
    { id: 'pagination-client', label: 'Pagination Client-Side' },
    { id: 'rows-per-page', label: 'Rows Per Page' },
    { id: 'pagination-position', label: 'Pagination Position' },
    { id: 'custom-page-report', label: 'Custom Page Report' },
    { id: 'server-side-pagination', label: 'Server-Side Pagination' },
    { id: 'sorting', label: 'Sorting' },
    { id: 'custom-templates', label: 'Custom Templates' },
    { id: 'empty-state', label: 'Empty State' },
    { id: 'loading-state', label: 'Loading State' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'grid-columns', label: 'Grid Columns' },
    { id: 'custom-paginator-slots', label: 'Custom Paginator Slots' },
    { id: 'theme-integration', label: 'Theme Integration' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly products: DemoProduct[] = [...DATA_VIEW_DEMO_PRODUCTS];
  public readonly shortProducts: DemoProduct[] = DATA_VIEW_DEMO_PRODUCTS.slice(0, 18);
  public readonly miniProducts: DemoProduct[] = DATA_VIEW_DEMO_PRODUCTS.slice(0, 4);
  public readonly customTemplateProducts: DemoProduct[] = DATA_VIEW_DEMO_PRODUCTS.slice(0, 12);

  public readonly layoutOptions: SelectButtonOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ];
  public switchableLayout: DataViewLayout = 'list';

  public readonly sortFieldOptions: SelectButtonOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Rating', value: 'rating' },
  ];
  public readonly sortOrderOptions: SelectButtonOption[] = [
    { label: 'Ascending', value: 1 },
    { label: 'Descending', value: -1 },
  ];

  public sortField: DataViewSortField = 'name';
  public sortOrder: DataViewSortOrder = 1;
  public customTemplateLayout: DataViewLayout = 'grid';

  public serverRows: number = 5;
  public serverFirst: number = 0;
  public readonly serverTotalRecords: number = DATA_VIEW_DEMO_PRODUCTS.length;
  public serverLoading: boolean = false;
  public serverProducts: DemoProduct[] = DATA_VIEW_DEMO_PRODUCTS.slice(0, 5);

  public sortedProducts(): DemoProduct[] {
    const productsCopy: DemoProduct[] = [...this.products];
    const sortDirection: number = this.sortOrder;

    return productsCopy.sort((left: DemoProduct, right: DemoProduct): number => {
      if (this.sortField === 'price') {
        return (left.price - right.price) * sortDirection;
      }

      if (this.sortField === 'rating') {
        return (left.rating - right.rating) * sortDirection;
      }

      return left.name.localeCompare(right.name) * sortDirection;
    });
  }

  public inventoryClass(status: DemoInventoryStatus): string {
    if (status === 'IN_STOCK') {
      return 'inventory-pill inventory-pill--in-stock';
    }

    if (status === 'LOW_STOCK') {
      return 'inventory-pill inventory-pill--low-stock';
    }

    return 'inventory-pill inventory-pill--out-of-stock';
  }

  public inventoryLabel(status: DemoInventoryStatus): string {
    if (status === 'IN_STOCK') {
      return 'In stock';
    }

    if (status === 'LOW_STOCK') {
      return 'Low stock';
    }

    return 'Out of stock';
  }

  public formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  public onServerPageChange(event: DataViewPageEvent): void {
    this.serverLoading = true;
    this.serverFirst = event.first;
    this.serverRows = event.rows;

    window.setTimeout((): void => {
      const startIndex: number = this.serverFirst;
      const endIndex: number = startIndex + this.serverRows;
      this.serverProducts = DATA_VIEW_DEMO_PRODUCTS.slice(startIndex, endIndex);
      this.serverLoading = false;
    }, 350);
  }

  public trackByProduct(_index: number, product: DemoProduct): number {
    return product.id;
  }

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'value',
      type: 'T[]',
      description: 'Array of items to display. Required.',
      required: true,
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a loading skeleton.',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      default: "'No records found.'",
      description: 'Message when the list is empty.',
    },
    {
      name: 'gridColumns',
      type: 'number',
      default: '3',
      description: 'Number of columns in the grid layout.',
    },
    {
      name: 'paginator',
      type: 'boolean',
      default: 'false',
      description: 'Enables pagination controls.',
    },
    {
      name: 'rows',
      type: 'number',
      default: '10',
      description: 'Rows per page when paginator is enabled.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Data list'",
      description: 'Accessible label for the data list region.',
    },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Moves focus through the filter input, sort dropdown, layout toggle buttons, and paginator controls.',
    },
    {
      key: 'Enter / Space',
      suffix: 'on List/Grid toggle',
      action: 'Switches the active layout and announces the change.',
    },
    {
      key: 'Enter / Space',
      suffix: 'on paginator button',
      action: 'Navigates between pages when the paginator is enabled.',
    },
    {
      key: 'Standard text keys',
      suffix: 'in filter input',
      action: 'Filters the rendered records by text.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host',
      attribute: 'aria-label',
      value: 'ariaLabel input (default: "Data list")',
      notes: 'Provides the accessible name for the data view region.',
    },
    {
      element: 'Host',
      attribute: 'aria-busy',
      value: '"true" while loading',
      notes: 'Applied when <code>[loading]="true"</code>.',
    },
    {
      element: 'Controls wrapper',
      attribute: 'role="group"',
      value: '—',
      notes: 'Groups filter, sort, and layout toggle controls.',
    },
    {
      element: 'Filter input',
      attribute: 'type="search"',
      value: '—',
      notes: 'Accessible name from <code>filterAriaLabel</code> input.',
    },
    {
      element: 'Layout toggle buttons',
      attribute: 'aria-pressed',
      value: '"true" | "false"',
      notes: 'Reflects the currently active layout.',
    },
    {
      element: 'Layout announcement region',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Announces list/grid layout changes to screen readers.',
    },
    {
      element: 'Content wrapper',
      attribute: 'role="list"',
      value: '—',
      notes: 'Contains <code>role="listitem"</code> children.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-data-view-border', description: 'Border shorthand.' },
    { variable: '--uilib-data-view-border-radius', description: 'Border radius.' },
    { variable: '--uilib-data-view-bg', description: 'Background colour.' },
    { variable: '--uilib-data-view-fg', description: 'Fg.' },
    { variable: '--uilib-data-view-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-data-view-header-padding', description: 'Header padding.' },
    { variable: '--uilib-data-view-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-data-view-footer-bg', description: 'Footer background colour.' },
    { variable: '--uilib-data-view-footer-padding', description: 'Footer padding.' },
    { variable: '--uilib-data-view-item-padding', description: 'Item padding.' },
    { variable: '--uilib-data-view-item-border', description: 'Item border shorthand.' },
    { variable: '--uilib-data-view-item-hover-bg', description: 'Item Hover background colour.' },
    { variable: '--uilib-data-view-grid-columns', description: 'Grid Columns.' },
    { variable: '--uilib-data-view-grid-gap', description: 'Grid gap.' },
    { variable: '--uilib-data-view-paginator-padding', description: 'Paginator padding.' },
    { variable: '--uilib-data-view-paginator-gap', description: 'Paginator gap.' },
    { variable: '--uilib-data-view-paginator-button-size', description: 'Paginator Button size.' },
    {
      variable: '--uilib-data-view-paginator-active-bg',
      description: 'Paginator Active background colour.',
    },
    { variable: '--uilib-data-view-paginator-active-fg', description: 'Paginator Active Fg.' },
    {
      variable: '--uilib-data-view-paginator-hover-bg',
      description: 'Paginator Hover background colour.',
    },
    {
      variable: '--uilib-data-view-paginator-disabled-opacity',
      description: 'Paginator Disabled opacity.',
    },
    { variable: '--uilib-data-view-paginator-border', description: 'Paginator border shorthand.' },
    {
      variable: '--uilib-data-view-paginator-button-radius',
      description: 'Paginator Button border radius.',
    },
    { variable: '--uilib-data-view-empty-padding', description: 'Empty padding.' },
    { variable: '--uilib-data-view-empty-color', description: 'Empty text colour.' },
    { variable: '--uilib-data-view-loading-min-height', description: 'Loading Min height.' },
    { variable: '--uilib-data-view-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-data-view-font-size', description: 'Font size.' },
  ];
}
