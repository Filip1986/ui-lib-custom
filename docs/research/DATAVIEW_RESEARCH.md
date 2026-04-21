# DataView Research (PrimeNG v19)

Source analyzed:
- `/tmp/tmp.3Jr7GWipI6/package/dataview/dataview.d.ts`
- `/tmp/tmp.3Jr7GWipI6/package/dataview/dataview.interface.d.ts`
- `/tmp/tmp.3Jr7GWipI6/package/fesm2022/primeng-dataview.mjs`
- `/tmp/tmp.3Jr7GWipI6/package/paginator/paginator.d.ts`

## 1) API Surface

### Component selectors and role
- Selectors: `p-dataView`, `p-dataview`, `p-data-view`
- Role: generic data display container for list/grid layouts
- Dependencies: embeds PrimeNG `p-paginator` component when pagination is enabled

### Inputs (public)

| Input | Type | Default (from implementation) | Notes |
|---|---|---:|---|
| `paginator` | `boolean \| undefined` | `undefined` | Enables paginator rendering |
| `rows` | `number \| undefined` | `undefined` | Items per page |
| `totalRecords` | `number \| undefined` | `undefined` | In non-lazy mode computed from `value.length` |
| `pageLinks` | `number` | `5` | Paginator page-link count |
| `rowsPerPageOptions` | `number[] \| any[] \| undefined` | `undefined` | Passed directly to paginator |
| `paginatorPosition` | `'top' \| 'bottom' \| 'both'` | `'bottom'` | Where paginator appears |
| `paginatorStyleClass` | `string \| undefined` | `undefined` | Extra class passed to paginator |
| `alwaysShowPaginator` | `boolean` | `true` | Show paginator even for one page |
| `paginatorDropdownAppendTo` | `HTMLElement \| ElementRef \| TemplateRef<any> \| string \| null \| undefined \| any` | `undefined` | Overlay target for paginator dropdown |
| `paginatorDropdownScrollHeight` | `string` | `'200px'` | Rows-per-page dropdown max height |
| `currentPageReportTemplate` | `string` | `'{currentPage} of {totalPages}'` | Current page report format |
| `showCurrentPageReport` | `boolean \| undefined` | `undefined` | Toggles page report |
| `showJumpToPageDropdown` | `boolean \| undefined` | `undefined` | Toggles jump-to-page dropdown |
| `showFirstLastIcon` | `boolean` | `true` | First/last controls |
| `showPageLinks` | `boolean` | `true` | Numeric page links |
| `lazy` | `boolean \| undefined` | `undefined` | Enables lazy paging/sort/filter callbacks |
| `lazyLoadOnInit` | `boolean` | `true` | Emits lazy event on init |
| `emptyMessage` | `string` | `''` | Fallback empty-state text |
| `style` | `Record<string, any> \| null \| undefined` | `undefined` | Root inline style |
| `styleClass` | `string \| undefined` | `undefined` | Root class |
| `gridStyleClass` | `string` | `''` | Exposed for grid class customization |
| `trackBy` | `Function` | `(index, item) => item` | Exposed but not used directly in DataView template |
| `filterBy` | `string \| undefined` | `undefined` | Comma-separated filter fields |
| `filterLocale` | `string \| undefined` | `undefined` | Locale for filtering |
| `loading` | `boolean \| undefined` | `undefined` | Shows blocking loading overlay |
| `loadingIcon` | `string \| undefined` | `undefined` | Custom CSS class icon for loading |
| `first` | `number \| undefined` | `0` | First row index |
| `sortField` | `string \| undefined` | `undefined` | Field used by sorting |
| `sortOrder` | `number \| undefined` | `undefined` | Typically `1` or `-1` |
| `value` | `any[] \| undefined` | `undefined` | Input dataset |
| `layout` | `'list' \| 'grid'` | `'list'` | Active layout mode |

### Outputs (public)

| Output | Type | Emission behavior |
|---|---|---|
| `onLazyLoad` | `EventEmitter<DataViewLazyLoadEvent>` | Emits on init (`lazyLoadOnInit`), paginate, and sort in lazy mode |
| `onPage` | `EventEmitter<DataViewPageEvent>` | Emits from `paginate()` with `first` and `rows` |
| `onSort` | `EventEmitter<DataViewSortEvent>` | Emits after each `sort()` call |
| `onChangeLayout` | `EventEmitter<DataViewLayoutChangeEvent>` | Emits in `ngOnChanges` when `layout` input changes after first change |

### Templates (public)

`DataViewTemplates` and component queries expose these template keys:

| Template key | Purpose | Context |
|---|---|---|
| `list` | List layout row rendering | `{ $implicit: rowsSubset }` |
| `grid` | Grid layout row rendering | `{ $implicit: rowsSubset }` |
| `header` | Header content | none |
| `footer` | Footer content | none |
| `emptymessage` | Empty-state template | none |
| `paginatorleft` | Left paginator content | `{ $implicit: DataViewPaginatorState }` |
| `paginatorright` | Right paginator content | `{ $implicit: DataViewPaginatorState }` |
| `paginatordropdownitem` | Rows-per-page dropdown item | `{ $implicit: any }` |
| `loadingicon` | Loading overlay icon | none |
| `listicon` | Layout toggle list icon hook | none |
| `gridicon` | Layout toggle grid icon hook | none |

### Public methods

| Method | Purpose |
|---|---|
| `updateTotalRecords()` | Recomputes `totalRecords` in non-lazy mode |
| `paginate(event)` | Updates pagination state and emits events |
| `sort()` | Sorts in-memory array (non-lazy) or emits lazy metadata |
| `isEmpty()` | Empty-state detection based on filtered or raw dataset |
| `createLazyLoadMetadata()` | Creates payload for `onLazyLoad` |
| `filter(filter, filterMatchMode?)` | Applies client-side filtering via `FilterService` |
| `hasFilter()` | Checks active filter presence |

Internal fields like `_value`, `filteredValue`, and `filterValue` are implementation details.

---

## 2) Pagination and Paginator Coupling

### How pagination works
- DataView delegates UI and interactions to PrimeNG `p-paginator`.
- DataView can render paginator at top, bottom, or both positions.
- Each paginator instance is bound to the same `rows`, `first`, and `totalRecords` state.

### Internal flow
1. Paginator emits `(onPageChange)`.
2. DataView `paginate(event)` stores `first` and `rows`.
3. If `lazy`, DataView emits `onLazyLoad` with `first/rows/sortField/sortOrder`.
4. DataView emits `onPage`.
5. Visible data slice is computed in template via `slice` pipe.

### Data slicing behavior
- Non-lazy mode with paginator: `slice(first, first + rows)`.
- Lazy mode with paginator: `slice(0, rows)` because caller is expected to provide already paged records.
- Without paginator: renders full `filteredValue || value`.

---

## 3) Sorting Model Analysis

### PrimeNG behavior
- Sorting is not purely external in non-lazy mode.
- In `sort()` when `lazy !== true`, DataView mutates the input array in place with `this.value.sort(...)`.
- Comparator uses `resolveFieldData(data, sortField)` and handles null/string/primitive comparisons.
- `first` resets to `0` whenever sort runs.
- `onSort` always emits after sort call.

### Lazy-mode behavior
- No client-side sorting is performed.
- DataView emits `onLazyLoad` metadata and leaves sorting to consumer/server.

### Implication for `ui-lib-custom`
- PrimeNG hybrid behavior (internal sort for non-lazy + external for lazy) diverges from our pre-decided API: external sorting only.

---

## 4) Layout Switching and Rendering

### PrimeNG behavior
- `layout` input is a union: `'list' | 'grid'`.
- Rendering switches between `list` and `grid` templates.
- `onChangeLayout` emits only when `layout` input changes after initialization (`ngOnChanges` check).

### Layout classes
- Root always includes `p-dataview` and `p-component`.
- Adds `p-dataview-list` or `p-dataview-grid` depending on active layout.

### Notes
- PrimeNG also exposes `listicon` and `gridicon` templates, typically consumed by layout option controls.

---

## 5) Loading and Empty States

### Loading
- `loading` shows a blocking overlay inside DataView.
- Icon priority:
  1. `loadingIcon` CSS class string
  2. `loadingicon` template
  3. built-in `SpinnerIcon`

### Empty state
- `isEmpty()` checks `filteredValue || value`.
- Empty block only shows when empty and `!loading`.
- Content priority:
  1. `emptymessage` template
  2. fallback `emptyMessage` (or translation key default)

---

## 6) Divergences for `ui-lib-custom`

PrimeNG behavior mapped to this repository's conventions and pre-decisions:

1. Template projection API
- PrimeNG: string-keyed template queries (`list`, `grid`, `paginatorleft`, etc.).
- `ui-lib-custom`: standalone marker directives in `data-view.template-directives.ts` + `contentChild(..., { read: TemplateRef })`.

2. Pagination strategy
- PrimeNG: embeds separate `p-paginator` component and forwards many paginator inputs.
- `ui-lib-custom` v1: self-contained inline pagination controls (prev/next, page report, rows-per-page).

3. Sorting ownership
- PrimeNG: internal array sort in non-lazy mode.
- `ui-lib-custom`: external sort only (`sortField`, `sortOrder`, `sortChange` output), no internal mutation.

4. Inputs/outputs implementation
- PrimeNG: decorator inputs/outputs + mutable internal fields.
- `ui-lib-custom`: signal APIs (`input`, `model`, `output`) with explicit typing.

5. Styling system
- PrimeNG: style/styleClass escape hatches and Prime token system.
- `ui-lib-custom`: design-token-first + `--uilib-dataview-*` CSS variables and variant classes (`material`, `bootstrap`, `minimal`).

6. Type strictness
- PrimeNG: mostly `any[]` data and broad `Function` trackBy input.
- `ui-lib-custom`: generic `<T>` for `value` and strongly typed template contexts.

7. Naming alignment
- PrimeNG: already uses `layout: 'list' | 'grid'`.
- `ui-lib-custom`: keeps same layout vocabulary; adds signal-driven `layoutChange` for two-way binding ergonomics.

---

## 7) `ui-lib-custom` Value-Add (vs PrimeNG DataView)

1. Signal-first reactive API
- `input()`/`model()`/`output()` for predictable push-based updates.

2. Typed templates with generics
- `<T>`-safe item contexts for list/grid templates instead of `any`.

3. Self-contained pagination
- No dependency on standalone Paginator component for v1 delivery.

4. Theming and variants out of the box
- Three design variants + tokenized CSS custom properties.

5. Cleaner template directive UX
- Directive selectors (`uiDataViewListItem`, etc.) instead of string-based `pTemplate` names.

---

## 8) Notes for Prompt 2

- Define generic context types first (`DataViewItemTemplateContext<T>`, paginator slot context, empty/loading context if needed).
- Build directive names to match the pre-decided slot list: `listItem`, `gridItem`, `header`, `footer`, `empty`, `loading`, `paginatorLeft`, `paginatorRight`.
- Keep sort logic event-only (no in-place `value` mutation).
- Keep pagination implementation isolated so a future `ui-lib-custom/paginator` can replace internals with minimal API breakage.

