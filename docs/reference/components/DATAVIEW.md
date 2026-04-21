# DataView

Template-driven data rendering component for list and grid layouts with built-in pagination controls, external sorting hooks, loading/empty states, and CSS-variable theming.

---

## Overview

`DataView` renders your data collection through projected Angular templates:

- `uiDataViewListItem` for list mode
- `uiDataViewGridItem` for grid mode

The component manages the container behavior (layout, pagination, ARIA semantics, loading/empty fallbacks), while item markup stays fully controlled by your templates.

---

## Features

- Template directives for list/grid/header/footer/loading/empty/paginator slots
- Built-in pagination for client-side and server-side flows
- Layout switching (`list`/`grid`) with two-way binding support
- External sorting contract (`sortField`, `sortOrder`, `sortChange`)
- CSS variable theming with Material/Bootstrap/Minimal variant support
- Loading and empty states with default or custom templates
- Responsive grid control via CSS variables (`gridColumns`, `gridGap`)

---

## Import

```ts
import {
  DataViewComponent,
  DataViewListItemDirective,
  DataViewGridItemDirective,
  DataViewHeaderDirective,
  DataViewFooterDirective,
  DataViewEmptyDirective,
  DataViewLoadingDirective,
  DataViewPaginatorLeftDirective,
  DataViewPaginatorRightDirective,
} from 'ui-lib-custom/data-view';
```

---

## Usage

### Basic List

```html
<ui-lib-data-view [value]="products" [trackBy]="trackByProduct">
  <ng-template uiDataViewListItem let-product>
    <article class="product-row">
      <strong>{{ product.name }}</strong>
      <span>{{ product.category }}</span>
      <span>{{ product.price | currency }}</span>
    </article>
  </ng-template>
</ui-lib-data-view>
```

### Basic Grid

```html
<ui-lib-data-view [value]="products" layout="grid" [gridColumns]="3" gridGap="1rem">
  <ng-template uiDataViewGridItem let-product>
    <article class="product-card">
      <strong>{{ product.name }}</strong>
      <span>{{ product.price | currency }}</span>
    </article>
  </ng-template>
</ui-lib-data-view>
```

---

## API Reference

### Inputs (signal/model API)

| Input | Type | Default | Description |
|---|---|---:|---|
| `value` | `T[]` | required | Source dataset. |
| `layout` | `DataViewLayout` | `'list'` | Active layout mode (`[(layout)]` supported). |
| `size` | `DataViewSize` | `'md'` | Component density/size scale. |
| `loading` | `boolean` | `false` | Shows loading state and sets `aria-busy`. |
| `emptyMessage` | `string` | `'No records found.'` | Fallback empty-state message. |
| `gridColumns` | `number` | `3` | Grid column count in grid layout. |
| `gridGap` | `string` | `'1rem'` | Grid gap CSS value in grid layout. |
| `trackBy` | `TrackByFunction<T> \| null` | `null` | Custom item tracking function. |
| `dataKey` | `string \| null` | `null` | Fallback key for item tracking when `trackBy` is not set. |
| `ariaLabel` | `string` | `'Data list'` | Host `aria-label`. |
| `paginator` | `boolean` | `false` | Enables built-in paginator controls. |
| `rows` | `number` | `10` | Rows per page. |
| `first` | `number` | `0` | Zero-based first-row index (`[(first)]` supported). |
| `totalRecords` | `number \| null` | `null` | Enables server-side pagination behavior when set. |
| `rowsPerPageOptions` | `number[] \| null` | `null` | Rows-per-page select options. |
| `paginatorPosition` | `'top' \| 'bottom' \| 'both'` | `'bottom'` | Paginator placement. |
| `showCurrentPageReport` | `boolean` | `true` | Toggles current-page report text. |
| `currentPageReportTemplate` | `string` | `'Showing {first} to {last} of {totalRecords} entries'` | Page report format string. |
| `sortField` | `string \| null` | `null` | Consumer-managed sort field metadata. |
| `sortOrder` | `DataViewSortOrder` | `1` | Consumer-managed sort order metadata. |

### Outputs

| Output | Type | Description |
|---|---|---|
| `layoutChange` | `DataViewLayout` | Emitted by `[(layout)]` two-way binding updates. |
| `firstChange` | `number` | Emitted by `[(first)]` two-way binding updates. |
| `pageChange` | `DataViewPageEvent` | Emitted when pagination changes (page/rows/offset). |
| `sortChange` | `DataViewSortEvent` | Emitted when consumer-triggered sort metadata changes. |

### Template Directives

| Directive | Selector | Context type | Purpose |
|---|---|---|---|
| `DataViewListItemDirective` | `[uiDataViewListItem]` | `DataViewListItemContext<T>` | Renders each item in list layout. |
| `DataViewGridItemDirective` | `[uiDataViewGridItem]` | `DataViewGridItemContext<T>` | Renders each item in grid layout. |
| `DataViewHeaderDirective` | `[uiDataViewHeader]` | `unknown` | Projects custom header content. |
| `DataViewFooterDirective` | `[uiDataViewFooter]` | `unknown` | Projects custom footer content. |
| `DataViewEmptyDirective` | `[uiDataViewEmpty]` | `unknown` | Overrides empty-state rendering. |
| `DataViewLoadingDirective` | `[uiDataViewLoading]` | `unknown` | Overrides loading-state rendering. |
| `DataViewPaginatorLeftDirective` | `[uiDataViewPaginatorLeft]` | `unknown` | Projects content on paginator left/start area. |
| `DataViewPaginatorRightDirective` | `[uiDataViewPaginatorRight]` | `unknown` | Projects content on paginator right/end area. |

### Types

| Type | Definition |
|---|---|
| `DataViewLayout` | `'list' \| 'grid'` |
| `DataViewSize` | `'sm' \| 'md' \| 'lg'` |
| `DataViewSortOrder` | `1 \| -1` |
| `DataViewPageEvent` | `{ first: number; rows: number; page: number; pageCount: number }` |
| `DataViewSortEvent` | `{ sortField: string; sortOrder: DataViewSortOrder }` |
| `DataViewLayoutChangeEvent` | `{ layout: DataViewLayout }` |
| `DataViewListItemContext<T>` | `{ $implicit: T; index: number; first: boolean; last: boolean; even: boolean; odd: boolean }` |
| `DataViewGridItemContext<T>` | `{ $implicit: T; index: number; first: boolean; last: boolean; even: boolean; odd: boolean }` |

---

## Template Context

Both item template directives expose the same context shape:

- `$implicit`: current item (`let-product`)
- `index`: zero-based index (`let-i="index"`)
- `first`: `true` for first item (`let-isFirst="first"`)
- `last`: `true` for last item (`let-isLast="last"`)
- `even`: `true` for even indexes (`let-isEven="even"`)
- `odd`: `true` for odd indexes (`let-isOdd="odd"`)

Typed usage example:

```html
<ui-lib-data-view [value]="products">
  <ng-template
    uiDataViewListItem
    let-product
    let-i="index"
    let-isFirst="first"
    let-isLast="last"
    let-isEven="even"
    let-isOdd="odd"
  >
    <article>
      {{ i + 1 }}. {{ product.name }}
      <small>first: {{ isFirst }}, last: {{ isLast }}, even: {{ isEven }}, odd: {{ isOdd }}</small>
    </article>
  </ng-template>
</ui-lib-data-view>
```

---

## Pagination

### Client-Side Pagination

Use `paginator` with `rows`; DataView slices the supplied `value` array per current page.

```html
<ui-lib-data-view [value]="products" [paginator]="true" [rows]="10">
  <ng-template uiDataViewListItem let-product>
    <div>{{ product.name }}</div>
  </ng-template>
</ui-lib-data-view>
```

### Server-Side Pagination

Set `totalRecords` and handle `pageChange`; provide only current-page records to `value`.

```html
<ui-lib-data-view
  [value]="serverPageItems"
  [paginator]="true"
  [rows]="rows"
  [first]="first"
  [totalRecords]="totalRecords"
  (pageChange)="loadServerPage($event)"
>
  <ng-template uiDataViewListItem let-product>
    <div>{{ product.name }}</div>
  </ng-template>
</ui-lib-data-view>
```

### Custom Page Report Template

```html
<ui-lib-data-view
  [value]="products"
  [paginator]="true"
  [rows]="10"
  currentPageReportTemplate="Page {currentPage} / {totalPages} ({first}-{last} of {totalRecords})"
/>
```

Supported placeholders: `{currentPage}`, `{totalPages}`, `{first}`, `{last}`, `{totalRecords}`, `{rows}`.

### Rows-Per-Page Options

```html
<ui-lib-data-view [value]="products" [paginator]="true" [rows]="10" [rowsPerPageOptions]="[5, 10, 25, 50]" />
```

### Paginator Position

```html
<ui-lib-data-view [value]="products" [paginator]="true" paginatorPosition="top" />
<ui-lib-data-view [value]="products" [paginator]="true" paginatorPosition="bottom" />
<ui-lib-data-view [value]="products" [paginator]="true" paginatorPosition="both" />
```

### Custom Paginator Left/Right Slots

```html
<ui-lib-data-view [value]="products" [paginator]="true" [rows]="10">
  <ng-template uiDataViewPaginatorLeft>
    <span>Catalog controls</span>
  </ng-template>

  <ng-template uiDataViewPaginatorRight>
    <button type="button">Export</button>
  </ng-template>

  <ng-template uiDataViewListItem let-product>
    <div>{{ product.name }}</div>
  </ng-template>
</ui-lib-data-view>
```

---

## Sorting

`DataView` does not sort internally. Recommended pattern:

1. Keep sort controls outside (or in projected header template).
2. Re-sort your array in component logic.
3. Bind the sorted array via `value`.
4. Optionally pass/emit sort metadata via `sortField`, `sortOrder`, and `sortChange`.

```html
<ui-lib-data-view
  #dataView
  [value]="sortedProducts"
  [sortField]="sortField"
  [sortOrder]="sortOrder"
  (sortChange)="onSortChange($event)"
  [paginator]="true"
  [rows]="10"
>
  <ng-template uiDataViewHeader>
    <button type="button" (click)="dataView.emitSortChange('name', 1)">Sort Name Asc</button>
    <button type="button" (click)="dataView.emitSortChange('name', -1)">Sort Name Desc</button>
  </ng-template>

  <ng-template uiDataViewListItem let-product>
    <div>{{ product.name }}</div>
  </ng-template>
</ui-lib-data-view>
```

```ts
public onSortChange(event: DataViewSortEvent): void {
  this.sortField = event.sortField;
  this.sortOrder = event.sortOrder;
  this.sortedProducts = this.sortProducts(this.products, event.sortField, event.sortOrder);
}
```

---

## Theming

### CSS Variables

| Variable | Purpose |
|---|---|
| `--uilib-data-view-border` | Root border shorthand. |
| `--uilib-data-view-border-radius` | Root and grid-item radius. |
| `--uilib-data-view-bg` | Root/background surface color. |
| `--uilib-data-view-fg` | Foreground text color. |
| `--uilib-data-view-header-bg` | Header background. |
| `--uilib-data-view-header-padding` | Header padding. |
| `--uilib-data-view-header-font-weight` | Header font weight. |
| `--uilib-data-view-footer-bg` | Footer background. |
| `--uilib-data-view-footer-padding` | Footer padding. |
| `--uilib-data-view-item-padding` | Item and content spacing. |
| `--uilib-data-view-item-border` | Item border style. |
| `--uilib-data-view-item-hover-bg` | Item hover background. |
| `--uilib-data-view-grid-columns` | Grid column count token. |
| `--uilib-data-view-grid-gap` | Grid gap token. |
| `--uilib-data-view-paginator-padding` | Paginator container padding. |
| `--uilib-data-view-paginator-gap` | Paginator horizontal/vertical gaps. |
| `--uilib-data-view-paginator-button-size` | Page/action button size. |
| `--uilib-data-view-paginator-active-bg` | Active page button background. |
| `--uilib-data-view-paginator-active-fg` | Active page button text color. |
| `--uilib-data-view-paginator-hover-bg` | Hover page/action background. |
| `--uilib-data-view-paginator-disabled-opacity` | Disabled paginator control opacity. |
| `--uilib-data-view-paginator-border` | Paginator divider border. |
| `--uilib-data-view-paginator-button-radius` | Paginator button radius. |
| `--uilib-data-view-empty-padding` | Empty-state block padding. |
| `--uilib-data-view-empty-color` | Empty/loading/paginator secondary text color. |
| `--uilib-data-view-loading-min-height` | Minimum loading-state height. |
| `--uilib-data-view-font-size` | Base font size per size variant. |

### Theme Override Example

```scss
.custom-catalog {
  --uilib-data-view-border-radius: 10px;
  --uilib-data-view-grid-gap: 1.25rem;
  --uilib-data-view-paginator-active-bg: #0f766e;
  --uilib-data-view-paginator-active-fg: #ffffff;
  --uilib-data-view-item-hover-bg: color-mix(in srgb, #0f766e 8%, transparent);
}
```

### Variant Notes

- `material`: larger radius, softer border blend, elevation shadow.
- `bootstrap`: tighter radius and control geometry.
- `minimal`: borderless shell with subtle divider lines and transparent paginator buttons.

When no explicit component variant override is set, variant styles come from the active global theme scope.

---

## Accessibility

- Data container uses `role="list"`; each rendered item wrapper uses `role="listitem"`.
- Host supports `aria-label` via `ariaLabel` input.
- Host sets `aria-busy="true"` during loading.
- Paginator uses semantic `<nav aria-label="Pagination">`.
- Current page button uses `aria-current="page"`.
- Disabled paginator buttons expose disabled semantics (`disabled` + `aria-disabled` in browsers/AT mappings).

---

## Performance

- Client-side pagination slices only the rendered page segment at render time.
- Item identity is stable with `trackBy`; `dataKey` provides a lightweight fallback key strategy.
- Server-side mode (`totalRecords` set) avoids local slicing assumptions and delegates page data fetching to consumer logic.


