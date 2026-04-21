import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
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

type DataViewSortField = 'name' | 'price' | 'rating';

type DataViewDemoSnippetKey =
  | 'basicList'
  | 'basicGrid'
  | 'layoutSwitching'
  | 'paginationClient'
  | 'rowsPerPage'
  | 'paginationPosition'
  | 'customPageReport'
  | 'serverSidePagination'
  | 'sorting'
  | 'customTemplates'
  | 'emptyState'
  | 'loadingState'
  | 'sizes'
  | 'gridColumns'
  | 'customPaginatorSlots'
  | 'themeIntegration';

/**
 * Demo page for DataView list/grid rendering, paginator modes, templates, and theming.
 */
@Component({
  selector: 'app-data-view-demo',
  standalone: true,
  imports: [
    CommonModule,
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
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
  ],
  templateUrl: './data-view-demo.component.html',
  styleUrl: './data-view-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewDemoComponent {
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
  ];

  public readonly snippets: Record<DataViewDemoSnippetKey, string> = {
    basicList: `<ui-lib-data-view [value]="products">
  <ng-template uiDataViewListItem let-item>
    <article class="demo-card">{{ item.name }}</article>
  </ng-template>
</ui-lib-data-view>`,
    basicGrid: `<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="4">
  <ng-template uiDataViewGridItem let-item>
    <article class="demo-grid-card">{{ item.name }}</article>
  </ng-template>
</ui-lib-data-view>`,
    layoutSwitching: `<ui-lib-select-button [options]="layoutOptions" [(value)]="switchableLayout" />
<ui-lib-data-view [value]="products" [(layout)]="switchableLayout">...</ui-lib-data-view>`,
    paginationClient: `<ui-lib-data-view [value]="products" [paginator]="true" [rows]="5">...</ui-lib-data-view>`,
    rowsPerPage: `<ui-lib-data-view
  [value]="products"
  [paginator]="true"
  [rows]="5"
  [rowsPerPageOptions]="[5, 10, 25]"
>
  ...
</ui-lib-data-view>`,
    paginationPosition: `<ui-lib-data-view [paginator]="true" paginatorPosition="top">...</ui-lib-data-view>
<ui-lib-data-view [paginator]="true" paginatorPosition="bottom">...</ui-lib-data-view>
<ui-lib-data-view [paginator]="true" paginatorPosition="both">...</ui-lib-data-view>`,
    customPageReport: `<ui-lib-data-view
  [value]="products"
  [paginator]="true"
  [rows]="5"
  currentPageReportTemplate="Page {currentPage} of {totalPages} ({first}-{last} / {totalRecords})"
>
  ...
</ui-lib-data-view>`,
    serverSidePagination: `<ui-lib-data-view
  [value]="serverProducts"
  [loading]="serverLoading"
  [paginator]="true"
  [rows]="serverRows"
  [totalRecords]="serverTotalRecords"
  [first]="serverFirst"
  (pageChange)="onServerPageChange($event)"
>
  ...
</ui-lib-data-view>`,
    sorting: `<ui-lib-select-button [options]="sortFieldOptions" [(value)]="sortField" />
<ui-lib-select-button [options]="sortOrderOptions" [(value)]="sortOrder" />
<ui-lib-data-view [value]="sortedProducts">...</ui-lib-data-view>`,
    customTemplates: `<ui-lib-data-view [value]="customTemplateProducts" [paginator]="true" [rows]="6">
  <ng-template uiDataViewHeader>...</ng-template>
  <ng-template uiDataViewFooter>...</ng-template>
  <ng-template uiDataViewListItem let-item>...</ng-template>
  <ng-template uiDataViewGridItem let-item>...</ng-template>
</ui-lib-data-view>`,
    emptyState: `<ui-lib-data-view [value]="[]" emptyMessage="No inventory records found." />
<ui-lib-data-view [value]="[]">
  <ng-template uiDataViewEmpty>No products available.</ng-template>
</ui-lib-data-view>`,
    loadingState: `<ui-lib-data-view [value]="products" [loading]="true" />
<ui-lib-data-view [value]="products" [loading]="true">
  <ng-template uiDataViewLoading>Syncing catalog...</ng-template>
</ui-lib-data-view>`,
    sizes: `<ui-lib-data-view [value]="miniProducts" size="sm">...</ui-lib-data-view>
<ui-lib-data-view [value]="miniProducts" size="md">...</ui-lib-data-view>
<ui-lib-data-view [value]="miniProducts" size="lg">...</ui-lib-data-view>`,
    gridColumns: `<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="2">...</ui-lib-data-view>
<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="3">...</ui-lib-data-view>
<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="4">...</ui-lib-data-view>`,
    customPaginatorSlots: `<ui-lib-data-view [value]="products" [paginator]="true" [rows]="5">
  <ng-template uiDataViewPaginatorLeft>Left slot content</ng-template>
  <ng-template uiDataViewPaginatorRight>Right slot content</ng-template>
</ui-lib-data-view>`,
    themeIntegration: `<div class="theme-surface material">...</div>
<div class="theme-surface bootstrap">...</div>
<div class="theme-surface minimal">...</div>`,
  };

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

  public snippet(key: DataViewDemoSnippetKey): string {
    return this.snippets[key];
  }

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
}
