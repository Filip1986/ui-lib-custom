# DataView

**Selector:** `ui-lib-data-view`
**Package:** `ui-lib-custom/data-view`
**Content projection:** yes — item templates are projected via structural directives: `uiDataViewListItem`, `uiDataViewGridItem`, `uiDataViewHeader`, `uiDataViewFooter`, `uiDataViewEmpty`, `uiDataViewLoading`, `uiDataViewPaginatorLeft`, `uiDataViewPaginatorRight`

> `layout` and `first` are `model()` signals and support two-way binding with `[()]`. When `totalRecords` is provided (server-side mode), the component renders `value` as-is without slicing — the caller is responsible for providing only the current page's data.

## Inputs

| Name                        | Type                          | Default                                                 | Notes                                                                                      |
| --------------------------- | ----------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `value`                     | `T[]`                         | required                                                | The array of items to display. Required.                                                   |
| `layout`                    | `'list' \| 'grid'`            | `'list'`                                                | Two-way bindable via `[(layout)]`.                                                         |
| `size`                      | `'sm' \| 'md' \| 'lg'`        | `'md'`                                                  | Component density.                                                                         |
| `loading`                   | `boolean`                     | `false`                                                 | When true, applies loading class and aria-busy.                                            |
| `emptyMessage`              | `string`                      | `'No records found.'`                                   | Fallback text when no items and no empty template.                                         |
| `gridColumns`               | `number`                      | `3`                                                     | Number of columns in grid layout.                                                          |
| `gridGap`                   | `string`                      | `'1rem'`                                                | CSS gap between grid cells.                                                                |
| `trackBy`                   | `TrackByFunction<T> \| null`  | `null`                                                  | Custom track-by for the item loop.                                                         |
| `dataKey`                   | `string \| null`              | `null`                                                  | Property key used for tracking when `trackBy` is null.                                     |
| `ariaLabel`                 | `string`                      | `'Data list'`                                           | Accessible label on the host element.                                                      |
| `controlsAriaLabel`         | `string`                      | `'Data view controls'`                                  | Accessible name for the built-in controls group.                                           |
| `filterAriaLabel`           | `string`                      | `'Filter items'`                                        | Accessible name for the filter input.                                                      |
| `filterPlaceholder`         | `string`                      | `'Filter items'`                                        | Placeholder text for the filter input.                                                     |
| `sortAriaLabel`             | `string`                      | `'Sort items'`                                          | Accessible name for the sort dropdown.                                                     |
| `listLayoutAriaLabel`       | `string`                      | `'Show list view'`                                      | Accessible name for list-layout toggle button.                                             |
| `gridLayoutAriaLabel`       | `string`                      | `'Show grid view'`                                      | Accessible name for grid-layout toggle button.                                             |
| `paginator`                 | `boolean`                     | `false`                                                 | Enables built-in pagination controls.                                                      |
| `rows`                      | `number`                      | `10`                                                    | Items per page.                                                                            |
| `first`                     | `number`                      | `0`                                                     | Zero-based index of the first record. Two-way bindable via `[(first)]`.                    |
| `totalRecords`              | `number \| null`              | `null`                                                  | Total record count for server-side pagination.                                             |
| `rowsPerPageOptions`        | `number[] \| null`            | `null`                                                  | Rows-per-page dropdown options.                                                            |
| `paginatorPosition`         | `'top' \| 'bottom' \| 'both'` | `'bottom'`                                              | Where to render the paginator.                                                             |
| `showCurrentPageReport`     | `boolean`                     | `true`                                                  | Renders the current page summary text.                                                     |
| `currentPageReportTemplate` | `string`                      | `'Showing {first} to {last} of {totalRecords} entries'` | Supports `{first}`, `{last}`, `{totalRecords}`, `{currentPage}`, `{totalPages}`, `{rows}`. |
| `sortField`                 | `string \| null`              | `null`                                                  | Active sort field (display only — sorting must be done by the caller).                     |
| `sortOrder`                 | `1 \| -1`                     | `1`                                                     | Active sort direction.                                                                     |

## Outputs

| Name         | Payload             | Notes                                                  |
| ------------ | ------------------- | ------------------------------------------------------ |
| `pageChange` | `DataViewPageEvent` | Emitted when the active page or rows-per-page changes. |
| `sortChange` | `DataViewSortEvent` | Emitted when sort field or order changes.              |

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

## ARIA map

| Element                    | ARIA behavior                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| Host `<ui-lib-data-view>`  | `aria-label` from `ariaLabel` input, `aria-busy` while loading, unique generated host `id` |
| Controls wrapper           | `role="group"` with accessible name from `controlsAriaLabel`                               |
| Filter input               | `type="search"` with accessible name from `filterAriaLabel`                                |
| Sort dropdown              | Accessible name from `sortAriaLabel`                                                       |
| Layout toggle buttons      | `aria-pressed` reflects active layout and each button has configurable `aria-label`        |
| Layout announcement region | Hidden `aria-live="polite"` + `aria-atomic="true"` region announces list/grid changes      |
| Content wrapper            | `role="list"` with `role="listitem"` children                                              |
| Paginator ellipsis         | `aria-hidden="true"`                                                                       |

## Keyboard interactions

| Control                  | Keys                     | Result                                            |
| ------------------------ | ------------------------ | ------------------------------------------------- |
| Filter input             | Standard text input keys | Filters rendered records by text                  |
| Sort dropdown            | Standard select keys     | Emits `sortChange` with selected order            |
| List/Grid toggle buttons | `Enter`, `Space`         | Switches active layout and updates announcement   |
| Paginator buttons        | `Enter`, `Space`         | Navigates between pages when paginator is enabled |

## CSS variables

| Variable                                  | Purpose                                                |
| ----------------------------------------- | ------------------------------------------------------ |
| `--uilib-data-view-focus-ring`            | Focus-visible ring applied to all interactive controls |
| `--uilib-data-view-paginator-button-size` | Shared control height for paginator/buttons/selects    |
| `--uilib-data-view-paginator-active-bg`   | Active background for selected page/layout button      |
| `--uilib-data-view-paginator-active-fg`   | Foreground color for selected page/layout button       |
| `--uilib-data-view-grid-columns`          | Grid column count in grid layout                       |
| `--uilib-data-view-grid-gap`              | Grid gap in grid layout                                |
