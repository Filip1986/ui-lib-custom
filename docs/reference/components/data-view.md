# Data View

**Selector:** `ui-lib-data-view`
**Entry point:** `import { DataView } from 'ui-lib-custom/data-view'`

---

## Overview

Core DataView shell that renders list/grid item templates with loading and empty states.

## API

### Inputs

| Name                        | Type                        | Default                                                 | Description                                                                                 |
| --------------------------- | --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `ariaLabel`                 | `string | null`             | `null`                                                  | Accessible label for the data view host. Falls back to i18n `data-view.label`.              |
| `controlsAriaLabel`         | `string | null`             | `null`                                                  | Accessible label for the controls group. Falls back to i18n `data-view.controls`.           |
| `currentPageReportTemplate` | `string`                    | `'Showing {first} to {last} of {totalRecords} entries'` | —                                                                                           |
| `dataKey`                   | `string | null`             | `null`                                                  | —                                                                                           |
| `emptyMessage`              | `string | null`             | `null`                                                  | Empty-state message. Falls back to i18n `data-view.empty` when null.                        |
| `filterAriaLabel`           | `string | null`             | `null`                                                  | Accessible label for the filter input. Falls back to i18n `data-view.filter`.               |
| `filterPlaceholder`         | `string | null`             | `null`                                                  | Filter input placeholder text. Falls back to i18n `data-view.filter.placeholder` when null. |
| `gridColumns`               | `number`                    | `3`                                                     | —                                                                                           |
| `gridGap`                   | `string`                    | `'1rem'`                                                | —                                                                                           |
| `gridLayoutAriaLabel`       | `string | null`             | `null`                                                  | Accessible label for the grid layout button. Falls back to i18n `data-view.grid-view`.      |
| `listLayoutAriaLabel`       | `string | null`             | `null`                                                  | Accessible label for the list layout button. Falls back to i18n `data-view.list-view`.      |
| `loading`                   | `boolean`                   | `false`                                                 | —                                                                                           |
| `paginator`                 | `boolean`                   | `false`                                                 | —                                                                                           |
| `paginatorPosition`         | `DataViewPaginatorPosition` | `'bottom'`                                              | —                                                                                           |
| `rows`                      | `number`                    | `DATA_VIEW_DEFAULT_ROWS_PER_PAGE`                       | —                                                                                           |
| `rowsPerPageOptions`        | `number[] | null`           | `null`                                                  | —                                                                                           |
| `showCurrentPageReport`     | `boolean`                   | `true`                                                  | —                                                                                           |
| `size`                      | `DataViewSize`              | `'md'`                                                  | —                                                                                           |
| `sortAriaLabel`             | `string | null`             | `null`                                                  | Accessible label for the sort select. Falls back to i18n `data-view.sort`.                  |
| `sortField`                 | `string | null`             | `null`                                                  | —                                                                                           |
| `sortOrder`                 | `DataViewSortOrder`         | `1`                                                     | —                                                                                           |
| `totalRecords`              | `number | null`             | `null`                                                  | —                                                                                           |
| `trackBy`                   | `TrackByFunction<T> | null` | `null`                                                  | —                                                                                           |

### Models (two-way bindable)

| Name     | Type             | Default  | Description |
| -------- | ---------------- | -------- | ----------- |
| `first`  | `number`         | `0`      | —           |
| `layout` | `DataViewLayout` | `'list'` | —           |

### Outputs

| Name         | Type                | Description |
| ------------ | ------------------- | ----------- |
| `pageChange` | `DataViewPageEvent` | —           |
| `sortChange` | `DataViewSortEvent` | —           |

## Content Projection

_none_

## Theming

| CSS Variable                                   | Default                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--uilib-data-view-bg`                         | `var(--uilib-surface-color, #ffffff)`                                                |
| `--uilib-data-view-border`                     | `1px solid var(--uilib-border-color, #dee2e6)`                                       |
| `--uilib-data-view-border-radius`              | `var(--uilib-border-radius, 6px)`                                                    |
| `--uilib-data-view-control-label-font-size`    | `var(--uilib-font-size-sm, 0.8125rem)`                                               |
| `--uilib-data-view-controls-gap`               | `0.75rem`                                                                            |
| `--uilib-data-view-empty-color`                | `var(--uilib-text-color-secondary, #6b7280)`                                         |
| `--uilib-data-view-empty-padding`              | `2rem`                                                                               |
| `--uilib-data-view-fg`                         | `var(--uilib-text-color, #1f2937)`                                                   |
| `--uilib-data-view-focus-ring`                 | `0 0 0 2px color-mix(in srgb, var(--uilib-primary-color, #3b82f6) 40%, transparent)` |
| `--uilib-data-view-font-size`                  | `1rem`                                                                               |
| `--uilib-data-view-footer-bg`                  | `var(--uilib-surface-color-alt, #f8f9fa)`                                            |
| `--uilib-data-view-footer-padding`             | `0.75rem 1rem`                                                                       |
| `--uilib-data-view-grid-columns`               | `3`                                                                                  |
| `--uilib-data-view-grid-gap`                   | `1rem`                                                                               |
| `--uilib-data-view-header-bg`                  | `var(--uilib-surface-color-alt, #f8f9fa)`                                            |
| `--uilib-data-view-header-font-weight`         | `600`                                                                                |
| `--uilib-data-view-header-padding`             | `0.75rem 1rem`                                                                       |
| `--uilib-data-view-item-border`                | `1px solid var(--uilib-border-color, #dee2e6)`                                       |
| `--uilib-data-view-item-hover-bg`              | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.04))`                                         |
| `--uilib-data-view-item-padding`               | `1rem`                                                                               |
| `--uilib-data-view-loading-min-height`         | `200px`                                                                              |
| `--uilib-data-view-paginator-active-bg`        | `var(--uilib-primary-color, #3b82f6)`                                                |
| `--uilib-data-view-paginator-active-fg`        | `#ffffff`                                                                            |
| `--uilib-data-view-paginator-border`           | `1px solid var(--uilib-border-color, #dee2e6)`                                       |
| `--uilib-data-view-paginator-button-radius`    | `var(--uilib-border-radius, 6px)`                                                    |
| `--uilib-data-view-paginator-button-size`      | `2rem`                                                                               |
| `--uilib-data-view-paginator-disabled-opacity` | `0.5`                                                                                |
| `--uilib-data-view-paginator-gap`              | `0.25rem`                                                                            |
| `--uilib-data-view-paginator-hover-bg`         | `var(--uilib-hover-bg, rgba(0, 0, 0, 0.04))`                                         |
| `--uilib-data-view-paginator-padding`          | `0.5rem 1rem`                                                                        |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                |
| --------------------------------------------------------------- |
| announces view mode with a polite live region                   |
| content container uses role list and item wrappers use listitem |
| keeps filter and sort controls keyboard focusable               |
| keeps layout buttons keyboard focusable                         |
| marks layout toggle buttons with aria-pressed state             |
| pagination nav and buttons expose descriptive aria labels       |
| passes axe in default list state                                |
| passes axe in grid state                                        |
| passes axe with paginator enabled                               |
| sets aria-busy when loading                                     |
| sets aria-label attribute                                       |
| trackBy and dataKey resolve stable tracking keys                |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#data-view)
- [Demo page](/components/data-view)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/data-view/README.md)

