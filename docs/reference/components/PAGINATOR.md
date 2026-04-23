# Paginator

A page-navigation component that controls which slice of a data set is visible.
Inspired by PrimeNG's `p-paginator`, adapted to the `ui-lib-custom` conventions (signal inputs, three variants, design-token CSS variables).

---

## Import

```ts
import { PaginatorComponent } from 'ui-lib-custom/paginator';
import type { PaginatorPageEvent } from 'ui-lib-custom/paginator';
```

---

## Basic usage

```html
<ui-lib-paginator
  [totalRecords]="totalRecords"
  [rows]="rows"
  [(first)]="first"
  (pageChange)="onPageChange($event)"
/>
```

```ts
totalRecords = 250;
rows         = 10;
first        = 0;

onPageChange(event: PaginatorPageEvent): void {
  this.first = event.first;
  this.rows  = event.rows;
}
```

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `totalRecords` | `number` | `0` | Total number of records across all pages. |
| `rows` | `number` | `10` | Records per page. Two-way (`[(rows)]`). |
| `first` | `number` | `0` | Zero-based index of the first visible record. Two-way (`[(first)]`). |
| `pageLinkSize` | `number` | `5` | Maximum number of page-link buttons in the windowed range. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual design variant. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls button dimensions. |
| `alwaysShow` | `boolean` | `true` | When `false`, hides the paginator when there is only one page. |
| `showFirstLastIcon` | `boolean` | `true` | Show buttons to jump to the first and last page. |
| `showPageLinks` | `boolean` | `true` | Show the windowed list of numbered page buttons. |
| `showCurrentPageReport` | `boolean` | `false` | Show the formatted page report string. |
| `currentPageReportTemplate` | `string` | `'{currentPage} of {totalPages}'` | Template with placeholders (see below). |
| `rowsPerPageOptions` | `number[] \| null` | `null` | Options for the rows-per-page dropdown; `null` hides it. |
| `showJumpToPageInput` | `boolean` | `false` | Show a numeric input; press **Enter** to navigate. |
| `styleClass` | `string` | `''` | Extra CSS class(es) on the inner content wrapper. |
| `ariaLabel` | `string` | `'Pagination'` | Accessible label for the navigation landmark. |

### currentPageReportTemplate placeholders

| Placeholder | Value |
|---|---|
| `{currentPage}` | 1-based current page number |
| `{totalPages}` | total page count |
| `{first}` | 1-based index of first visible record |
| `{last}` | 1-based index of last visible record |
| `{rows}` | current rows per page |
| `{totalRecords}` | total record count |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `pageChange` | `PaginatorPageEvent` | Emitted when the active page or rows-per-page changes. |

### PaginatorPageEvent

```ts
interface PaginatorPageEvent {
  page: number;       // zero-based page index
  first: number;      // zero-based index of the first record on this page
  rows: number;       // records per page
  pageCount: number;  // total number of pages
}
```

---

## Content projection

| Selector | Description |
|---|---|
| `[paginatorLeft]` | Content injected before the navigation buttons. |
| `[paginatorRight]` | Content injected after the navigation buttons. |

```html
<ui-lib-paginator [totalRecords]="100" [rows]="10">
  <span paginatorLeft>Custom left</span>
  <span paginatorRight>Custom right</span>
</ui-lib-paginator>
```

---

## Variants

```html
<ui-lib-paginator variant="material" ... />   <!-- pill-shaped, indigo primary -->
<ui-lib-paginator variant="bootstrap" ... />  <!-- rounded, flat row, border-grouped -->
<ui-lib-paginator variant="minimal" ... />    <!-- flat, underlined selected page -->
```

---

## Sizes

```html
<ui-lib-paginator size="sm" ... />   <!-- compact — 1.75 rem buttons -->
<ui-lib-paginator size="md" ... />   <!-- default — 2.25 rem buttons -->
<ui-lib-paginator size="lg" ... />   <!-- spacious — 2.75 rem buttons -->
```

---

## CSS custom properties

All tokens follow `--uilib-paginator-{property}[-{state}]`.

| Token | Default | Description |
|---|---|---|
| `--uilib-paginator-gap` | `0.25rem` | Gap between paginator elements. |
| `--uilib-paginator-padding` | `0.5rem` | Padding around the content wrapper. |
| `--uilib-paginator-button-size` | `2.25rem` | Square size of each button (`sm` 1.75 rem, `lg` 2.75 rem). |
| `--uilib-paginator-button-font-size` | `0.875rem` | Font size inside buttons. |
| `--uilib-paginator-button-radius` | `50%` | Border radius of buttons (`50%` = circle for `material`). |
| `--uilib-paginator-button-bg` | `transparent` | Default button background. |
| `--uilib-paginator-button-color` | `var(--uilib-color-text-primary)` | Default button text/icon colour. |
| `--uilib-paginator-button-bg-hover` | `rgba(99,102,241,0.08)` | Button hover background. |
| `--uilib-paginator-button-bg-selected` | `var(--uilib-color-primary)` | Selected page button background. |
| `--uilib-paginator-button-color-selected` | `#ffffff` | Selected page button text colour. |
| `--uilib-paginator-button-color-disabled` | `var(--uilib-color-text-muted)` | Disabled button colour. |
| `--uilib-paginator-current-color` | `var(--uilib-color-text-secondary)` | Colour of the page-report text. |
| `--uilib-paginator-jtp-width` | `4rem` | Width of the jump-to-page input. |
| `--uilib-paginator-rpp-padding` | `0 0.625rem` | Padding of the rows-per-page select. |

Override any token on the host or a parent to retheme:

```css
ui-lib-paginator {
  --uilib-paginator-button-bg-selected: #ef4444;
  --uilib-paginator-button-radius: 4px;
}
```

---

## Accessibility

- The host element carries `role="navigation"` (implicit via `<nav>`) and `aria-label="Pagination"` (configurable via `ariaLabel` input).
- The active page button has `aria-current="page"`.
- All navigation buttons have descriptive `aria-label` attributes (e.g. "Previous page", "Page 3").
- Navigation buttons are disabled via the native `disabled` attribute **and** `aria-disabled`, preventing both click and keyboard activation.
- The page-link list uses `role="list"` / `role="listitem"`.
- SVG icons use `aria-hidden="true"` and `focusable="false"`.
- The current-page report span uses `aria-live="polite"` so screen readers announce changes.

### Keyboard navigation

| Key | Action |
|---|---|
| **Tab** | Move focus between buttons and controls in DOM order. |
| **Space / Enter** | Activate the focused button. |
| **Enter** (in jump-to-page input) | Navigate to the entered page. |

---

## Examples

### Full-featured paginator

```html
<ui-lib-paginator
  [totalRecords]="500"
  [(first)]="first"
  [(rows)]="rows"
  [rowsPerPageOptions]="[10, 25, 50]"
  [showCurrentPageReport]="true"
  currentPageReportTemplate="Showing {first}–{last} of {totalRecords}"
  [showJumpToPageInput]="true"
  variant="material"
  size="md"
  (pageChange)="onPageChange($event)"
/>
```

### Minimal arrows-only

```html
<ui-lib-paginator
  [totalRecords]="50"
  [rows]="10"
  [showPageLinks]="false"
  [showFirstLastIcon]="false"
  variant="minimal"
/>
```
