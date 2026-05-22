/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicGridHtml = `<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="4">
  <ng-template uiDataViewGridItem let-item>
    <article class="demo-grid-card">{{ item.name }}</article>
  </ng-template>
</ui-lib-data-view>`;

export const basicGridTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewGridItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewGridItemDirective],
  templateUrl: './basic-grid.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }, { name: 'Product B' }];
}`;

export const basicListHtml = `<ui-lib-data-view [value]="products">
  <ng-template uiDataViewListItem let-item>
    <article class="demo-card">{{ item.name }}</article>
  </ng-template>
</ui-lib-data-view>`;

export const basicListTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './basic-list.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }, { name: 'Product B' }];
}`;

export const customPageReportHtml = `<ui-lib-data-view
  [value]="products"
  [paginator]="true"
  [rows]="5"
  currentPageReportTemplate="Page {currentPage} of {totalPages} ({first}-{last} / {totalRecords})"
>
  ...
</ui-lib-data-view>`;

export const customPageReportTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './custom-page-report.example.html',
})
export class MyComponent {
  public readonly products = [
    /* array of products */
  ];
}`;

export const customPaginatorSlotsHtml = `<ui-lib-data-view [value]="products" [paginator]="true" [rows]="5">
  <ng-template uiDataViewPaginatorLeft>Left slot content</ng-template>
  <ng-template uiDataViewPaginatorRight>Right slot content</ng-template>
</ui-lib-data-view>`;

export const customPaginatorSlotsTs = `import { Component } from '@angular/core';
import {
  DataViewComponent,
  DataViewListItemDirective,
  DataViewPaginatorLeftDirective,
  DataViewPaginatorRightDirective,
} from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [
    DataViewComponent,
    DataViewListItemDirective,
    DataViewPaginatorLeftDirective,
    DataViewPaginatorRightDirective,
  ],
  templateUrl: './custom-paginator-slots.example.html',
})
export class MyComponent {
  public readonly products = [
    /* array of products */
  ];
}`;

export const customTemplatesHtml = `<ui-lib-data-view [value]="customTemplateProducts" [paginator]="true" [rows]="6">
  <ng-template uiDataViewHeader>...</ng-template>
  <ng-template uiDataViewFooter>...</ng-template>
  <ng-template uiDataViewListItem let-item>...</ng-template>
  <ng-template uiDataViewGridItem let-item>...</ng-template>
</ui-lib-data-view>`;

export const customTemplatesTs = `import { Component } from '@angular/core';
import {
  DataViewComponent,
  DataViewHeaderDirective,
  DataViewFooterDirective,
  DataViewListItemDirective,
  DataViewGridItemDirective,
} from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [
    DataViewComponent,
    DataViewHeaderDirective,
    DataViewFooterDirective,
    DataViewListItemDirective,
    DataViewGridItemDirective,
  ],
  templateUrl: './custom-templates.example.html',
})
export class MyComponent {
  public readonly products = [
    /* array of products */
  ];
}`;

export const emptyStateHtml = `<ui-lib-data-view [value]="[]" emptyMessage="No inventory records found." />
<ui-lib-data-view [value]="[]">
  <ng-template uiDataViewEmpty>No products available.</ng-template>
</ui-lib-data-view>`;

export const emptyStateTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewEmptyDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewEmptyDirective],
  templateUrl: './empty-state.example.html',
})
export class MyComponent {}`;

export const gridColumnsHtml = `<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="2">...</ui-lib-data-view>
<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="3">...</ui-lib-data-view>
<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="4">...</ui-lib-data-view>`;

export const gridColumnsTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewGridItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewGridItemDirective],
  templateUrl: './grid-columns.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}`;

export const layoutSwitchingHtml = `<ui-lib-select-button [options]="layoutOptions" [(value)]="switchableLayout" />
<ui-lib-data-view [value]="products" [(layout)]="switchableLayout">...</ui-lib-data-view>`;

export const layoutSwitchingTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective, DataViewGridItemDirective } from 'ui-lib-custom/data-view';
import type { DataViewLayout } from 'ui-lib-custom/data-view';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective, DataViewGridItemDirective, SelectButton],
  templateUrl: './layout-switching.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }];
  public readonly layoutOptions: SelectButtonOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ];
  public switchableLayout: DataViewLayout = 'list';
}`;

export const loadingStateHtml = `<ui-lib-data-view [value]="products" [loading]="true" />
<ui-lib-data-view [value]="products" [loading]="true">
  <ng-template uiDataViewLoading>Syncing catalog...</ng-template>
</ui-lib-data-view>`;

export const loadingStateTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewLoadingDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewLoadingDirective],
  templateUrl: './loading-state.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}`;

export const paginationClientHtml = `<ui-lib-data-view [value]="products" [paginator]="true" [rows]="5">...</ui-lib-data-view>`;

export const paginationClientTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './pagination-client.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}`;

export const paginationPositionHtml = `<ui-lib-data-view [paginator]="true" paginatorPosition="top">...</ui-lib-data-view>
<ui-lib-data-view [paginator]="true" paginatorPosition="bottom">...</ui-lib-data-view>
<ui-lib-data-view [paginator]="true" paginatorPosition="both">...</ui-lib-data-view>`;

export const paginationPositionTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './pagination-position.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}`;

export const rowsPerPageHtml = `<ui-lib-data-view
  [value]="products"
  [paginator]="true"
  [rows]="5"
  [rowsPerPageOptions]="[5, 10, 25]"
>
  ...
</ui-lib-data-view>`;

export const rowsPerPageTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './rows-per-page.example.html',
})
export class MyComponent {
  public readonly products = [/* array of products */];
}`;

export const serverSidePaginationHtml = `<ui-lib-data-view
  [value]="serverProducts"
  [loading]="serverLoading"
  [paginator]="true"
  [rows]="serverRows"
  [totalRecords]="serverTotalRecords"
  [first]="serverFirst"
  (pageChange)="onServerPageChange($event)"
>
  ...
</ui-lib-data-view>`;

export const serverSidePaginationTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';
import type { DataViewPageEvent } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './server-side-pagination.example.html',
})
export class MyComponent {
  public serverProducts = [/* initial page */];
  public serverLoading: boolean = false;
  public serverRows: number = 5;
  public serverFirst: number = 0;
  public readonly serverTotalRecords: number = 100;

  public onServerPageChange(event: DataViewPageEvent): void {
    this.serverLoading = true;
    this.serverFirst = event.first;
    this.serverRows = event.rows;
    // fetch page from backend
    this.serverLoading = false;
  }
}`;

export const sizesHtml = `<ui-lib-data-view [value]="miniProducts" size="sm">...</ui-lib-data-view>
<ui-lib-data-view [value]="miniProducts" size="md">...</ui-lib-data-view>
<ui-lib-data-view [value]="miniProducts" size="lg">...</ui-lib-data-view>`;

export const sizesTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }];
}`;

export const sortingHtml = `<ui-lib-select-button [options]="sortFieldOptions" [(value)]="sortField" />
<ui-lib-select-button [options]="sortOrderOptions" [(value)]="sortOrder" />
<ui-lib-data-view [value]="sortedProducts">...</ui-lib-data-view>`;

export const sortingTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewListItemDirective } from 'ui-lib-custom/data-view';
import type { DataViewSortOrder } from 'ui-lib-custom/data-view';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective, SelectButton],
  templateUrl: './sorting.example.html',
})
export class MyComponent {
  public sortField: string = 'name';
  public sortOrder: DataViewSortOrder = 1;
  public readonly sortFieldOptions: SelectButtonOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
  ];
  public readonly sortOrderOptions: SelectButtonOption[] = [
    { label: 'Ascending', value: 1 },
    { label: 'Descending', value: -1 },
  ];
}`;

export const themeIntegrationHtml = `<div class="theme-surface material">...</div>
<div class="theme-surface bootstrap">...</div>
<div class="theme-surface minimal">...</div>`;

export const themeIntegrationTs = `import { Component } from '@angular/core';
import { DataViewComponent, DataViewGridItemDirective } from 'ui-lib-custom/data-view';

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewGridItemDirective],
  templateUrl: './theme-integration.example.html',
})
export class MyComponent {
  public readonly products = [{ name: 'Product A' }];
}`;
