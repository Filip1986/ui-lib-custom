# Paginator

**Selector:** `ui-lib-paginator`
**Package:** `ui-lib-custom/paginator`
**Content projection:** no — none

> Both `rows` and `first` are `model()` signals and support two-way binding. When `alwaysShow` is false, the paginator hides itself entirely when there is only one page. The `currentPageReportTemplate` supports placeholders: `{currentPage}`, `{totalPages}`, `{first}`, `{last}`, `{rows}`, `{totalRecords}`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `totalRecords` | `number` | `0` | Total number of records across all pages. |
| `rows` | `number` | `10` | Records per page. Two-way bindable via `[(rows)]`. |
| `first` | `number` | `0` | Zero-based index of the first record on the current page. Two-way bindable via `[(first)]`. |
| `pageLinkSize` | `number` | `5` | Maximum number of page-link buttons in the windowed range. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual design variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls padding and font size. |
| `alwaysShow` | `boolean` | `true` | When false, hides the paginator if there is only one page. |
| `showFirstLastIcon` | `boolean` | `true` | Shows buttons to jump to the first and last page. |
| `showPageLinks` | `boolean` | `true` | Shows numbered page-link buttons. |
| `showCurrentPageReport` | `boolean` | `false` | Renders the current-page summary string. |
| `currentPageReportTemplate` | `string` | `'{currentPage} of {totalPages}'` | Template for the page report text. |
| `rowsPerPageOptions` | `number[] \| null` | `null` | Options for the rows-per-page dropdown. Null hides the dropdown. |
| `showJumpToPageInput` | `boolean` | `false` | Shows a numeric input for jumping to a specific page. |
| `styleClass` | `string` | `''` | Extra CSS class for the inner content wrapper. |
| `ariaLabel` | `string` | `'Pagination'` | Accessible label for the navigation landmark. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `pageChange` | `PaginatorPageEvent` | Emitted whenever the active page or rows-per-page changes. Carries `page`, `first`, `rows`, `pageCount`. |

## Usage

```html
<!-- basic paginator -->
<ui-lib-paginator [totalRecords]="total" [(first)]="first" [(rows)]="rows" />

<!-- with rows-per-page dropdown and page report -->
<ui-lib-paginator
  [totalRecords]="total"
  [(first)]="first"
  [rowsPerPageOptions]="[10, 25, 50]"
  [showCurrentPageReport]="true"
  (pageChange)="onPageChange($event)"
/>
```
