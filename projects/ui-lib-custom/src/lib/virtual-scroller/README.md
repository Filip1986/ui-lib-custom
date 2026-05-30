# VirtualScroller

**Selector:** `ui-lib-virtual-scroller`
**Package:** `ui-lib-custom/virtual-scroller`
**Content projection:** yes — four template slots via structural directives: `uiScrollerItem` (item row), `uiScrollerContent` (full content override), `uiScrollerLoader` (custom loading overlay), `uiScrollerLoaderIcon` (custom loader icon); also supports `<ng-content>` for the loading overlay

> `itemSize` must be a fixed pixel value and must match the actual rendered item height/width — the virtual window calculation depends on it. The component only initializes after `afterViewInit` and only when the host element is visible; items will not render in hidden containers until the element becomes visible. In lazy mode, set `totalRecords` to pre-size the scrollbar for the full server-side dataset.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `unknown[] \| null \| undefined` | `null` | Full array of items to virtualize. |
| `itemSize` | `number \| [number, number]` | `0` | Fixed pixel size per item: height (vertical), width (horizontal), or `[rowHeight, colWidth]` (both). |
| `scrollHeight` | `string \| undefined` | `undefined` | CSS height of the viewport (e.g. `'400px'`). |
| `scrollWidth` | `string \| undefined` | `undefined` | CSS width. Only relevant for horizontal/both orientations. |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Scroll direction. |
| `lazy` | `boolean` | `false` | Enables lazy loading; emits `lazyLoad` when the visible range changes. |
| `step` | `number` | `0` | Number of items per lazy-load page. `0` disables stepped paging. |
| `delay` | `number` | `0` | Throttle delay in ms between processed scroll events. |
| `resizeDelay` | `number` | `10` | Debounce in ms after window resize before re-initializing. |
| `appendOnly` | `boolean` | `false` | Appends newly loaded items without removing older DOM nodes. |
| `inline` | `boolean` | `false` | Fits the viewport inline within its containing flow. |
| `disabled` | `boolean` | `false` | Disables virtualization — all items are rendered directly. |
| `loaderDisabled` | `boolean` | `false` | Suppresses the built-in loader; provide your own via the loader template. |
| `columns` | `unknown[] \| null \| undefined` | `null` | Column data array for horizontal/both orientations. |
| `showSpacer` | `boolean` | `true` | Renders the spacer element that creates the virtual scroll height. |
| `showLoader` | `boolean` | `false` | Shows a loading overlay when `loading` is true. |
| `numToleratedItems` | `number \| undefined` | `undefined` | Override the number of off-screen tolerated items rendered on each side. |
| `loading` | `boolean \| undefined` | `undefined` | External loading flag for the loading overlay. |
| `trackByFn` | `((index: number, item: unknown) => unknown) \| undefined` | `undefined` | TrackBy function for the item loop. |
| `tabIndex` | `number` | `0` | Tab index on the viewport element. |
| `ariaLabel` | `string` | `'Scrollable list'` / `'Scrollable grid'` | Accessible label for the scroll region. Blank values fall back to a role-aware default. |
| `contentRole` | `'list' \| 'grid'` | `'list'` | Exposes list or grid semantics on the scroll viewport and rendered item wrappers. |
| `defaultListAriaLabel` | `string` | `'Scrollable list'` | Localizable fallback used when `contentRole="list"` and `ariaLabel` is blank. |
| `defaultGridAriaLabel` | `string` | `'Scrollable grid'` | Localizable fallback used when `contentRole="grid"` and `ariaLabel` is blank. |
| `loadingMessage` | `string` | `'Loading items…'` | Localizable live-region message for the initial loading state. |
| `loadingMoreMessage` | `string` | `'Loading more items.'` | Localizable live-region message for incremental/lazy loading. |
| `emptyMessage` | `string` | `'No items to display.'` | Localizable live-region message used when the total item count is zero. |
| `availableItemsText` | `string` | `'item(s) available.'` | Localizable suffix appended after the announced total item count. |
| `totalRecords` | `number \| undefined` | `undefined` | Total server-side record count used to pre-size the virtual spacer in lazy mode. |
| `id` | `string` | auto | Unique HTML id on the viewport element. |
| `styleClass` | `string` | `''` | Extra CSS class on the host element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `lazyLoad` | `VirtualScrollerLazyLoadEvent` | Fires when the visible range changes in lazy mode. Carries `first` and `last` indices. |
| `scroll` | `VirtualScrollerScrollEvent` | Fires on every scroll event. |
| `scrollIndexChange` | `VirtualScrollerScrollIndexChangeEvent` | Fires when the first/last rendered index changes. |

## Usage

```html
<!-- basic vertical virtual list -->
<ui-lib-virtual-scroller [items]="items" [itemSize]="50" scrollHeight="400px">
  <ng-template uiScrollerItem let-item>
    <div class="row">{{ item.label }}</div>
  </ng-template>
</ui-lib-virtual-scroller>

<!-- lazy-loaded list with loading state -->
<ui-lib-virtual-scroller
  [items]="items"
  [itemSize]="60"
  scrollHeight="500px"
  [lazy]="true"
  [loading]="isLoading"
  [totalRecords]="totalCount"
  (lazyLoad)="onLazyLoad($event)"
>
  <ng-template uiScrollerItem let-item>{{ item.name }}</ng-template>
</ui-lib-virtual-scroller>

<!-- grid semantics: row wrappers come from the component, cells come from your template -->
<ui-lib-virtual-scroller
  [items]="rows"
  [itemSize]="48"
  scrollHeight="320px"
  contentRole="grid"
  ariaLabel="Account results"
  [totalRecords]="rows.length"
>
  <ng-template uiScrollerItem let-row>
    <div role="gridcell">{{ row.name }}</div>
  </ng-template>
</ui-lib-virtual-scroller>
```

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uilib-scroller-loader-bg` | `rgba(255,255,255,0.7)` | Loading overlay background (variant-dependent) |
| `--uilib-scroller-loading-icon-size` | `2rem` | Diameter of the spinner icon |
| `--uilib-scroller-loading-icon-color` | `var(--uilib-color-primary)` | Spinner arc colour |
| `--uilib-scroller-item-border-color` | `var(--uilib-color-border)` | Border colour used in Bootstrap variant |
| `--uilib-scroller-spinner-border-radius` | `var(--uilib-radius-full, 9999px)` | Border radius that makes the spinner circular |
| `--uilib-scroller-spinner-animation` | `uilib-scroller-spin 0.75s linear infinite` | Spinner keyframe animation (set to `none` under `prefers-reduced-motion`) |
| `--uilib-scroller-focus-ring` | `0 0 0 2px var(--uilib-color-focus-ring, #6366f1)` | `box-shadow` applied to the viewport on `:focus-visible`; override to match your brand focus colour |

## Accessibility

- The viewport is keyboard focusable by default (`tabIndex=0`) and supports `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, and `End`. Horizontal and two-axis scrollers also support `ArrowLeft` and `ArrowRight`.
- Use `contentRole="list"` for list semantics. The component applies `role="listitem"`, `aria-setsize`, and `aria-posinset` to each rendered item wrapper, using `totalRecords` when present so virtualized lazy lists still announce the full logical size.
- Use `contentRole="grid"` when each rendered item is a row. The viewport exposes `aria-rowcount`, and each rendered row wrapper exposes `aria-rowindex`. Your projected row template should provide the inner `gridcell` content.
- The built-in polite live region announces loading, empty, and total-count states. `loadingMessage`, `loadingMoreMessage`, `emptyMessage`, `availableItemsText`, `defaultListAriaLabel`, and `defaultGridAriaLabel` can be overridden for i18n or product-specific copy.
- In lazy mode, set `totalRecords` so the live region and ARIA metadata reflect the full server-side dataset rather than only the currently loaded slice.
