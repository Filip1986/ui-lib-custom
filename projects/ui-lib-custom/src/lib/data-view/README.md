# DataView

**Selector:** `ui-lib-data-view`
**Package:** `ui-lib-custom/data-view`
**Content projection:** yes — item templates are projected via structural directives: `uiDataViewListItem`, `uiDataViewGridItem`, `uiDataViewHeader`, `uiDataViewFooter`, `uiDataViewEmpty`, `uiDataViewLoading`, `uiDataViewPaginatorLeft`, `uiDataViewPaginatorRight`

> `layout` and `first` are `model()` signals and support two-way binding with `[()]`. When `totalRecords` is provided (server-side mode), the component renders `value` as-is without slicing — the caller is responsible for providing only the current page's data.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `T[]` | required | The array of items to display. Required. |
| `layout` | `'list' \| 'grid'` | `'list'` | Two-way bindable via `[(layout)]`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |
| `loading` | `boolean` | `false` | When true, applies loading class and aria-busy. |
| `emptyMessage` | `string` | `'No records found.'` | Fallback text when no items and no empty template. |
| `gridColumns` | `number` | `3` | Number of columns in grid layout. |
| `gridGap` | `string` | `'1rem'` | CSS gap between grid cells. |
| `trackBy` | `TrackByFunction<T> \| null` | `null` | Custom track-by for the item loop. |
| `dataKey` | `string \| null` | `null` | Property key used for tracking when `trackBy` is null. |
| `ariaLabel` | `string` | `'Data list'` | Accessible label on the host element. |
| `paginator` | `boolean` | `false` | Enables built-in pagination controls. |
| `rows` | `number` | `10` | Items per page. |
| `first` | `number` | `0` | Zero-based index of the first record. Two-way bindable via `[(first)]`. |
| `totalRecords` | `number \| null` | `null` | Total record count for server-side pagination. |
| `rowsPerPageOptions` | `number[] \| null` | `null` | Rows-per-page dropdown options. |
| `paginatorPosition` | `'top' \| 'bottom' \| 'both'` | `'bottom'` | Where to render the paginator. |
| `showCurrentPageReport` | `boolean` | `true` | Renders the current page summary text. |
| `currentPageReportTemplate` | `string` | `'Showing {first} to {last} of {totalRecords} entries'` | Supports `{first}`, `{last}`, `{totalRecords}`, `{currentPage}`, `{totalPages}`, `{rows}`. |
| `sortField` | `string \| null` | `null` | Active sort field (display only — sorting must be done by the caller). |
| `sortOrder` | `1 \| -1` | `1` | Active sort direction. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `pageChange` | `DataViewPageEvent` | Emitted when the active page or rows-per-page changes. |
| `sortChange` | `DataViewSortEvent` | Emitted when sort field or order changes. |

## Usage

```html
<!-- list layout with item template -->
<ui-lib-data-view [value]="products">
  <ng-template uiDataViewListItem let-item>
    <span>{{ item.name }}</span>
  </ng-template>
</ui-lib-data-view>

<!-- grid layout with paginator, two-way layout binding -->
<ui-lib-data-view [value]="products" [(layout)]="layout" [paginator]="true" [rows]="6">
  <ng-template uiDataViewGridItem let-item>
    <div class="card">{{ item.name }}</div>
  </ng-template>
</ui-lib-data-view>
```
