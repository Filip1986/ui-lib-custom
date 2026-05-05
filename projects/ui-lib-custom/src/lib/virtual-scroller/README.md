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
```
