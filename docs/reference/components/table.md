# Table

**Selector:** `ui-lib-table`
**Entry point:** `import { Table } from 'ui-lib-custom/table'`

---

## Overview

Table component — displays tabular data with sorting, filtering, selection, pagination, and row expansion.

## API

### Inputs

| Name                        | Type                  | Default                                    | Description                                                                                                                                                                                                                    |
| --------------------------- | --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ariaLabel`                 | `string | null`       | `null`                                     | Accessible label for the table element.                                                                                                                                                                                        |
| `caption`                   | `string | null`       | `null`                                     | Caption text rendered above the table when no `[uiTableCaption]` template is provided.                                                                                                                                         |
| `currentPageReportTemplate` | `string`              | `'{currentPage} of {totalPages}'`          | Template string for the current-page report. Supports `{currentPage}` and `{totalPages}`.                                                                                                                                      |
| `dataKey`                   | `string | null`       | `null`                                     | Dot-notation property key that uniquely identifies each row. Required for row expansion, selection equality, and `@for` tracking.                                                                                              |
| `disabled`                  | `boolean`             | `false`                                    | When `true`, the entire component is non-interactive.                                                                                                                                                                          |
| `emptyMessage`              | `string`              | `TABLE_DEFAULTS.EMPTY_MESSAGE`             | Message shown in the empty state when no `[uiTableEmpty]` template is provided.                                                                                                                                                |
| `filterLocale`              | `string | undefined`  | `undefined`                                | BCP 47 locale used for locale-sensitive string comparisons during filtering.                                                                                                                                                   |
| `globalFilterFields`        | `string[] | null`     | `null`                                     | Comma-separated list of column fields to include in the global filter. When `null`, all column fields are searched.                                                                                                            |
| `globalFilterPlaceholder`   | `string`              | `TABLE_DEFAULTS.GLOBAL_FILTER_PLACEHOLDER` | Placeholder displayed inside the global filter input.                                                                                                                                                                          |
| `metaKeySelection`          | `boolean`             | `false`                                    | When `true`, Ctrl/Meta must be held to toggle multi-row selection. Only relevant in `'multiple'` mode.                                                                                                                         |
| `multiSortMode`             | `boolean`             | `false`                                    | When `true`, Ctrl+click on a sortable header adds it to the multi-sort stack instead of replacing the active sort.                                                                                                             |
| `paginator`                 | `boolean`             | `false`                                    | When `true`, renders the built-in paginator below the table.                                                                                                                                                                   |
| `rowHover`                  | `boolean`             | `false`                                    | When `true`, the pointer cursor and a hover highlight are shown on rows.                                                                                                                                                       |
| `rowsPerPageOptions`        | `number[]`            | `TABLE_DEFAULTS.ROWS_PER_PAGE_OPTIONS`     | Options for the rows-per-page selector in the paginator.                                                                                                                                                                       |
| `scrollable`                | `boolean`             | `false`                                    | When `true`, the table renders inside a scrollable wrapper.                                                                                                                                                                    |
| `scrollHeight`              | `string | null`       | `null`                                     | CSS height of the scrollable body viewport, e.g. `'400px'` or `'60vh'`. Only relevant when `scrollable` is `true`.                                                                                                             |
| `selectionMode`             | `TableSelectionMode`  | `null`                                     | Row selection mode. - `'single'` — single row selection on click. - `'multiple'` — multi-row selection via Ctrl/Shift + click. - `'checkbox'` — a leading checkbox column handles selection. - `null` — selection is disabled. |
| `showGridlines`             | `boolean`             | `false`                                    | When `true`, grid lines are drawn between all cells.                                                                                                                                                                           |
| `size`                      | `TableSize`           | `'md'`                                     | Component size token.                                                                                                                                                                                                          |
| `stripedRows`               | `boolean`             | `false`                                    | When `true`, alternating rows are rendered with a background tint.                                                                                                                                                             |
| `styleClass`                | `string | null`       | `null`                                     | Additional CSS class(es) applied to the host element.                                                                                                                                                                          |
| `value`                     | `unknown[]`           | `[]`                                       | The array of row objects to display.                                                                                                                                                                                           |
| `variant`                   | `TableVariant | null` | `null`                                     | Theme variant override. When `null`, the variant is inherited from `ThemeConfigService`.                                                                                                                                       |

### Models (two-way bindable)

| Name              | Type              | Default                        | Description                                                                                                                                                                                            |
| ----------------- | ----------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expandedRowKeys` | `Set<unknown>`    | `new Set(`                     | Set of row-key values (resolved via `dataKey`) that are currently expanded. Use `[(expandedRowKeys)]` for two-way binding.                                                                             |
| `first`           | `number`          | `0`                            | Zero-based offset of the first visible row. Use `[(first)]` for two-way binding.                                                                                                                       |
| `globalFilter`    | `string`          | `''`                           | Global filter string applied across all columns simultaneously. Use `[(globalFilter)]` for two-way binding.                                                                                            |
| `multiSortMeta`   | `TableSortMeta[]` | `[]`                           | Current multi-sort stack. Use `[(multiSortMeta)]` for two-way binding.                                                                                                                                 |
| `rows`            | `number`          | `TABLE_DEFAULTS.ROWS_PER_PAGE` | Number of rows displayed per page. Use `[(rows)]` for two-way binding.                                                                                                                                 |
| `selection`       | `unknown`         | `null`                         | The currently selected row(s). In `'single'` mode this is a single row object or `null`. In `'multiple'` / `'checkbox'` mode this is an array of row objects. Use `[(selection)]` for two-way binding. |
| `sortField`       | `string | null`   | `null`                         | The field currently used for sorting (single-sort mode). Use `[(sortField)]` for two-way binding.                                                                                                      |
| `sortOrder`       | `TableSortOrder`  | `TABLE_DEFAULTS.SORT_ORDER`    | The current sort order in single-sort mode. Use `[(sortOrder)]` for two-way binding.                                                                                                                   |

### Outputs

| Name          | Type               | Description                                     |
| ------------- | ------------------ | ----------------------------------------------- |
| `filtered`    | `TableFilterEvent` | Emitted when a filter value changes.            |
| `pageChanged` | `TablePageEvent`   | Emitted when the page or rows-per-page changes. |
| `sorted`      | `TableSortEvent`   | Emitted when the sort order changes.            |

## Content Projection

_none_

## Theming

| CSS Variable                           | Default                                                    |
| -------------------------------------- | ---------------------------------------------------------- |
| `--uilib-table-bg`                     | `var(--uilib-surface, #ffffff)`                            |
| `--uilib-table-body-color`             | `var(--uilib-color-text, #212529)`                         |
| `--uilib-table-body-font-size`         | `inherit`                                                  |
| `--uilib-table-border-color`           | `var(--uilib-color-border, #dee2e6)`                       |
| `--uilib-table-border-radius`          | `var(--uilib-radius-md, 6px)`                              |
| `--uilib-table-border-width`           | `1px`                                                      |
| `--uilib-table-caption-bg`             | `transparent`                                              |
| `--uilib-table-caption-color`          | `var(--uilib-color-text, #212529)`                         |
| `--uilib-table-caption-font-size`      | `1rem`                                                     |
| `--uilib-table-caption-font-weight`    | `600`                                                      |
| `--uilib-table-caption-padding`        | `0.75rem 1rem`                                             |
| `--uilib-table-cell-padding-x`         | `1rem`                                                     |
| `--uilib-table-cell-padding-y`         | `0.75rem`                                                  |
| `--uilib-table-checkbox-size`          | `1rem`                                                     |
| `--uilib-table-expander-bg`            | `transparent`                                              |
| `--uilib-table-expander-bg-hover`      | `rgba(0, 0, 0, 0.06)`                                      |
| `--uilib-table-expander-color`         | `var(--uilib-color-text-secondary, #6c757d)`               |
| `--uilib-table-expander-size`          | `1.5rem`                                                   |
| `--uilib-table-expansion-bg`           | `rgba(0, 0, 0, 0.015)`                                     |
| `--uilib-table-filter-font-size`       | `0.8125rem`                                                |
| `--uilib-table-filter-padding`         | `0.35rem 0.5rem`                                           |
| `--uilib-table-footer-bg`              | `var(--uilib-surface, #ffffff)`                            |
| `--uilib-table-header-bg`              | `var(--uilib-surface, #ffffff)`                            |
| `--uilib-table-header-color`           | `var(--uilib-color-text, #212529)`                         |
| `--uilib-table-header-font-size`       | `inherit`                                                  |
| `--uilib-table-header-font-weight`     | `600`                                                      |
| `--uilib-table-header-padding-x`       | `1rem`                                                     |
| `--uilib-table-header-padding-y`       | `0.75rem`                                                  |
| `--uilib-table-paginator-margin-top`   | `0.75rem`                                                  |
| `--uilib-table-row-bg`                 | `transparent`                                              |
| `--uilib-table-row-bg-alt`             | `rgba(0, 0, 0, 0.02)`                                      |
| `--uilib-table-row-bg-hover`           | `rgba(0, 0, 0, 0.04)`                                      |
| `--uilib-table-row-bg-selected`        | `rgba(var(--uilib-color-primary-rgb, 99, 102, 241), 0.12)` |
| `--uilib-table-selection-border-color` | `var(--uilib-color-primary, #6366f1)`                      |
| `--uilib-table-sort-icon-color`        | `var(--uilib-color-text-secondary, #6c757d)`               |
| `--uilib-table-sort-icon-color-active` | `var(--uilib-color-primary, #6366f1)`                      |
| `--uilib-table-sort-icon-size`         | `14px`                                                     |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                      |
| --------------------------------------------------------------------- |
| ArrowDown moves focus to the first body row in the same column        |
| ArrowRight moves focus to the next header cell                        |
| ArrowUp returns focus from the first body row to the header row       |
| Ctrl+End moves focus to the last grid cell                            |
| Ctrl+Home moves focus to the first grid cell                          |
| Enter on a focused body cell selects the row in single-selection mode |
| Home and End move focus to the row edges                              |
| activates the expansion toggle with Enter from the focused grid cell  |
| announces paginated row counts and row indexes                        |
| announces pagination state through a polite live region               |
| announces sort changes in a polite live region                        |
| announces the empty state with role=                                  |
| assigns a stable table id to the rendered table element               |
| does not trap Tab key navigation inside the grid                      |
| exposes an accessible sort action label on sortable headers           |
| gives multiple instances unique table and caption ids                 |
| marks header and body rows with role=                                 |
| marks the grid, headers, and cells as aria-disabled when disabled     |
| omits aria-selected on non-selectable rows                            |
| passes axe for a populated interactive table                          |
| passes axe for a sorted table                                         |
| passes axe for expanded rows                                          |
| passes axe for selected rows                                          |
| passes axe for the empty state                                        |
| removes embedded checkbox controls from the tab order in grid mode    |
| sets aria-multiselectable=                                            |
| sets aria-selected on selectable rows                                 |
| sets aria-sort=                                                       |
| should apply host class ui-lib-table                                  |
| should apply size class ui-lib-table--md by default                   |
| should apply variant class                                            |
| should create the table component                                     |
| should have aria-sort on sortable column headers                      |
| should have role=                                                     |
| should render a <table> element                                       |
| should render custom [uiTableCaption] template                        |
| should render custom [uiTableEmpty] template                          |
| should render sort icons on sortable columns                          |
| should use roving tabindex on sortable headers                        |
| updates only the active column to aria-sort=                          |
| uses a single roving tabindex in grid mode                            |
| uses aria-label when provided                                         |
| uses aria-labelledby when caption text is provided                    |
| uses cell roles for presentational table cells                        |
| uses gridcell roles for interactive body cells                        |
| uses role=                                                            |

## Usage Examples

```html
<!-- Basic sortable table with pagination -->
<ui-lib-table [value]="products" dataKey="id" [paginator]="true" [rows]="10">
  <ui-lib-table-column field="name"  header="Name"  [sortable]="true" />
  <ui-lib-table-column field="price" header="Price" [sortable]="true" />
</ui-lib-table>

<!-- Checkbox selection with custom cell template -->
<ui-lib-table [value]="products" dataKey="id" selectionMode="checkbox" [(selection)]="selected">
  <ui-lib-table-column field="name" header="Name">
    <ng-template uiTableColumnBody let-row>{{ row.name | uppercase }}</ng-template>
  </ui-lib-table-column>
</ui-lib-table>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#table)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/table/README.md)

