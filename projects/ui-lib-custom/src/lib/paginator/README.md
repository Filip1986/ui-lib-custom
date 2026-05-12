# Paginator

**Selector:** `ui-lib-paginator`
**Package:** `ui-lib-custom/paginator`
**Content projection:** yes — optional `[paginatorLeft]` slot rendered at the start of the paginator row

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

## ARIA Attributes

| Element | Attribute | Value / Condition |
|---------|-----------|-------------------|
| `ui-lib-paginator` (host) | `role` | `"navigation"` |
| `ui-lib-paginator` (host) | `id` | Auto-generated unique ID (`ui-lib-paginator-<n>`) |
| `ui-lib-paginator` (host) | `aria-label` | Value of `ariaLabel` input (`"Pagination"` by default) |
| `.uilib-paginator-live` | `aria-live` | `"polite"` |
| `.uilib-paginator-live` | `aria-atomic` | `"true"` |
| `.uilib-paginator-first/.prev/.next/.last` | `aria-label` | `"Go to first/previous/next/last page"` |
| `.uilib-paginator-page` | `aria-label` | `"Go to page X"` or `"Page X, current page"` |
| `.uilib-paginator-page` | `aria-current` | `"page"` on the active page only |
| icon SVGs | `aria-hidden`, `focusable` | `"true"` and `"false"` (decorative only) |

## Keyboard Interaction

| Key | Target | Behaviour |
|-----|--------|-----------|
| `Enter` / `Space` | Navigation and page buttons | Activates the button and changes page |
| `Enter` | Jump-to-page input (`showJumpToPageInput`) | Navigates to the typed 1-based page number when valid |
| Non-`Enter` keys | Jump-to-page input | Does not trigger navigation |
| Native select keys | Rows-per-page select (`rowsPerPageOptions`) | Changes rows and updates page range announcement |
| `Tab` / `Shift+Tab` | All controls | Standard browser focus order across paginator controls |

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uilib-paginator-gap` | `0.25rem` | Spacing between controls |
| `--uilib-paginator-padding` | `0.5rem` | Inner padding for content row |
| `--uilib-paginator-button-size` | `2.25rem` | Width/height of page and nav buttons |
| `--uilib-paginator-button-radius` | `50%` | Button border radius (variant-dependent) |
| `--uilib-paginator-button-bg-hover` | `var(--uilib-color-surface-hover)` | Hover background for non-selected buttons |
| `--uilib-paginator-button-bg-selected` | `var(--uilib-color-primary)` | Active page background |
| `--uilib-paginator-current-color` | `var(--uilib-color-text-secondary)` | Current-page report text colour |
| `--uilib-paginator-jtp-width` | `4rem` | Jump-to-page input width |
| `--uilib-paginator-rpp-height` | `var(--uilib-paginator-button-size)` | Rows-per-page select height |
| `--uilib-paginator-transition` | `background-color 150ms ease, ...` | Shared transition shorthand (disabled under `prefers-reduced-motion`) |

## Accessibility Notes

- A dedicated live region (`.uilib-paginator-live`) announces the current page (`"Page X of Y"`) on every navigation change, including empty-state (`"No pages available"`).
- All icon-only buttons ship with explicit `aria-label` values.
- Keyboard focus uses `:focus-visible` rings on all interactive controls (buttons, jump input, rows select).
- All control transitions are disabled under `@media (prefers-reduced-motion: reduce)`.

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
