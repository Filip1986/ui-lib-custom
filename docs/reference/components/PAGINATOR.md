# Paginator

**Selector:** `ui-lib-paginator`
**Entry point:** `import { Paginator } from 'ui-lib-custom/paginator'`

---

## Overview

Paginator provides page-based navigation controls for any list or data set. Supports three visual variants (material, bootstrap, minimal), three sizes, optional first/last buttons, page-link windowing, rows-per-page select, and a jump-to-page input.

## API

### Inputs

| Name                        | Type                      | Default                                           | Description                                                                                                                                |
| --------------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `alwaysShow`                | `boolean`                 | `true`                                            | When false, the paginator hides itself if there is only one page.                                                                          |
| `ariaLabel`                 | `string`                  | `'Pagination'`                                    | Accessible label for the navigation landmark (used on the host element).                                                                   |
| `currentPageReportTemplate` | `string`                  | `PAGINATOR_DEFAULTS.CURRENT_PAGE_REPORT_TEMPLATE` | Template string for the current-page report. Supported placeholders: {currentPage}, {totalPages}, {first}, {last}, {rows}, {totalRecords}. |
| `pageLinkSize`              | `number`                  | `PAGINATOR_DEFAULTS.PAGE_LINK_SIZE`               | Maximum number of page-link buttons shown in the windowed range.                                                                           |
| `rowsPerPageOptions`        | `number[] | null`         | `null`                                            | Array of row counts to show in the rows-per-page dropdown. Pass null to hide the dropdown.                                                 |
| `showCurrentPageReport`     | `boolean`                 | `false`                                           | Show a summary of the current page position (e.g. "1 of 10").                                                                              |
| `showFirstLastIcon`         | `boolean`                 | `true`                                            | Show buttons to jump to the first and last page.                                                                                           |
| `showJumpToPageInput`       | `boolean`                 | `false`                                           | Show a numeric input that lets the user type a page number and press Enter.                                                                |
| `showPageLinks`             | `boolean`                 | `true`                                            | Show the windowed list of numbered page-link buttons.                                                                                      |
| `size`                      | `PaginatorSize`           | `'md'`                                            | Size token controlling padding and font size.                                                                                              |
| `styleClass`                | `string`                  | `''`                                              | Additional CSS class(es) applied to the inner content wrapper.                                                                             |
| `totalRecords`              | `number`                  | `0`                                               | Total number of records across all pages.                                                                                                  |
| `variant`                   | `PaginatorVariant | null` | `null`                                            | Visual design variant. Falls back to the global ThemeConfigService variant when null.                                                      |

### Models (two-way bindable)

| Name    | Type     | Default                   | Description                                                                 |
| ------- | -------- | ------------------------- | --------------------------------------------------------------------------- |
| `first` | `number` | `0`                       | Zero-based index of the first record on the current page. Two-way bindable. |
| `rows`  | `number` | `PAGINATOR_DEFAULTS.ROWS` | Number of records displayed per page. Two-way bindable.                     |

### Outputs

| Name         | Type                 | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| `pageChange` | `PaginatorPageEvent` | Emitted whenever the active page or rows-per-page changes. |

## Content Projection

| Selector          | Notes |
| ----------------- | ----- |
| `[paginatorLeft]` | —     |

## Theming

| CSS Variable                              | Default                                                                                         |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--uilib-paginator-button-bg`             | `transparent`                                                                                   |
| `--uilib-paginator-button-bg-disabled`    | `transparent`                                                                                   |
| `--uilib-paginator-button-bg-hover`       | `var(--uilib-color-surface-hover, #f3f4f6)`                                                     |
| `--uilib-paginator-button-bg-selected`    | `var(--uilib-color-primary, #6366f1)`                                                           |
| `--uilib-paginator-button-border`         | `1px solid transparent`                                                                         |
| `--uilib-paginator-button-color`          | `var(--uilib-color-text-primary, #374151)`                                                      |
| `--uilib-paginator-button-color-disabled` | `var(--uilib-color-text-muted, #9ca3af)`                                                        |
| `--uilib-paginator-button-color-hover`    | `var(--uilib-color-text-primary, #374151)`                                                      |
| `--uilib-paginator-button-color-selected` | `#ffffff`                                                                                       |
| `--uilib-paginator-button-font-size`      | `0.875rem`                                                                                      |
| `--uilib-paginator-button-radius`         | `50%`                                                                                           |
| `--uilib-paginator-button-size`           | `2.25rem`                                                                                       |
| `--uilib-paginator-current-color`         | `var(--uilib-color-text-secondary, #6b7280)`                                                    |
| `--uilib-paginator-current-font-size`     | `0.875rem`                                                                                      |
| `--uilib-paginator-gap`                   | `0.25rem`                                                                                       |
| `--uilib-paginator-icon-size`             | `1rem`                                                                                          |
| `--uilib-paginator-jtp-bg`                | `var(--uilib-color-surface, #ffffff)`                                                           |
| `--uilib-paginator-jtp-border`            | `1px solid var(--uilib-color-border, #d1d5db)`                                                  |
| `--uilib-paginator-jtp-color`             | `var(--uilib-color-text-primary, #374151)`                                                      |
| `--uilib-paginator-jtp-font-size`         | `0.875rem`                                                                                      |
| `--uilib-paginator-jtp-height`            | `var(--uilib-paginator-button-size)`                                                            |
| `--uilib-paginator-jtp-radius`            | `0.375rem`                                                                                      |
| `--uilib-paginator-jtp-width`             | `4rem`                                                                                          |
| `--uilib-paginator-padding`               | `0.5rem`                                                                                        |
| `--uilib-paginator-rpp-bg`                | `var(--uilib-color-surface, #ffffff)`                                                           |
| `--uilib-paginator-rpp-border`            | `1px solid var(--uilib-color-border, #d1d5db)`                                                  |
| `--uilib-paginator-rpp-color`             | `var(--uilib-color-text-primary, #374151)`                                                      |
| `--uilib-paginator-rpp-font-size`         | `0.875rem`                                                                                      |
| `--uilib-paginator-rpp-height`            | `var(--uilib-paginator-button-size)`                                                            |
| `--uilib-paginator-rpp-padding`           | `0 0.625rem`                                                                                    |
| `--uilib-paginator-rpp-radius`            | `0.375rem`                                                                                      |
| `--uilib-paginator-transition`            | `background-color 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease` |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                               |
| ------------------------------------------------------------------------------ |
| announces empty-state pagination in the live region                            |
| announces page changes through a polite live region                            |
| changes page when Enter is pressed in the jump-to-page input                   |
| does not change page from keyboard activation when previous button is disabled |
| does not change page when non-Enter key is pressed in jump-to-page input       |
| exposes a navigation landmark with the configured aria-label                   |
| marks decorative SVG icons as aria-hidden and non-focusable                    |
| marks only the active page button with aria-current=                           |
| passes axe in default state                                                    |
| passes axe when paginator is empty                                             |
| passes axe with report, jump input, and rows-per-page controls visible         |
| should announce                                                                |
| should apply bootstrap variant host class                                      |
| should apply material variant host class by default                            |
| should apply minimal variant host class                                        |
| should have a navigation aria-label on the host element                        |
| should have aria-label on nav buttons                                          |
| should have numbered aria-label on page-link buttons                           |
| should mark the selected page with aria-current=                               |
| should navigate to the entered page when Enter is pressed                      |
| should not navigate when a non-Enter key is pressed on jump-to-page input      |
| should render a polite live region that announces current page                 |
| supports Enter activation on the next-page button                              |
| supports Space activation on a page-link button                                |
| updates the navigation aria-label when ariaLabel input changes                 |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#paginator)
- [Demo page](/components/paginator)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/paginator/README.md)

