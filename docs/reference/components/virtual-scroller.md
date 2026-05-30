# Virtual Scroller

**Selector:** `ui-lib-virtual-scroller`
**Entry point:** `import { VirtualScroller } from 'ui-lib-custom/virtual-scroller'`

---

## Overview

VirtualScroller renders only the items currently visible in the viewport plus a configurable tolerance buffer, using CSS transforms to position the content and an invisible spacer to maintain the full scroll height. Supports vertical, horizontal, and 2-D ('both') orientations; lazy loading; external loading state; and fully custom item, content, and loader templates.

## API

### Inputs

| Name                   | Type                                                      | Default                                         | Description                                                                                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appendOnly`           | `boolean`                                                 | `false`                                         | When true, newly loaded items are appended without removing older DOM nodes.                                                                                                                                                        |
| `ariaLabel`            | `string | null`                                           | `null`                                          | Accessible label for the scrollable region.                                                                                                                                                                                         |
| `availableItemsText`   | `string | null`                                           | `null`                                          | Localizable suffix appended after the announced total item count.                                                                                                                                                                   |
| `columns`              | `unknown[] | null | undefined`                            | `null`                                          | Column data array used with 'horizontal' or 'both' orientations.                                                                                                                                                                    |
| `contentRole`          | `'list' | 'grid'`                                         | `'list'`                                        | Structural role used by assistive technology for the rendered content.                                                                                                                                                              |
| `defaultGridAriaLabel` | `string | null`                                           | `null`                                          | Default fallback label used when no explicit grid ariaLabel is provided.                                                                                                                                                            |
| `defaultListAriaLabel` | `string | null`                                           | `null`                                          | Default fallback label used when no explicit list ariaLabel is provided.                                                                                                                                                            |
| `delay`                | `number`                                                  | `0`                                             | Throttle delay in ms between scroll events being processed. 0 = no throttle.                                                                                                                                                        |
| `disabled`             | `boolean`                                                 | `false`                                         | Disable virtualization — all items are rendered directly.                                                                                                                                                                           |
| `emptyMessage`         | `string | null`                                           | `null`                                          | Localizable message announced when the data set is empty.                                                                                                                                                                           |
| `id`                   | `string`                                                  | ``uilib-scroller-${(++virtualScrollerIdCounter` | Unique HTML id applied to the viewport element.                                                                                                                                                                                     |
| `inline`               | `boolean`                                                 | `false`                                         | When true, the viewport fits inline within its containing flow (no fixed height).                                                                                                                                                   |
| `items`                | `unknown[] | null | undefined`                            | `null`                                          | The full array of items to virtualize.                                                                                                                                                                                              |
| `itemSize`             | `number | [number, number]`                               | `0`                                             | Fixed height per row (vertical), width (horizontal), or [rowHeight, colWidth] (both) in px.                                                                                                                                         |
| `lazy`                 | `boolean`                                                 | `false`                                         | Enable lazy loading. Emits lazyLoad when the visible range changes.                                                                                                                                                                 |
| `loaderDisabled`       | `boolean`                                                 | `false`                                         | Suppress the built-in loader overlay; provide your own via the loader template.                                                                                                                                                     |
| `loading`              | `boolean | undefined`                                     | `undefined`                                     | External loading flag combined with lazy to control the loading overlay.                                                                                                                                                            |
| `loadingMessage`       | `string | null`                                           | `null`                                          | Localizable message announced while the first batch is loading.                                                                                                                                                                     |
| `loadingMoreMessage`   | `string | null`                                           | `null`                                          | Localizable message announced while additional items are loading.                                                                                                                                                                   |
| `numToleratedItems`    | `number | undefined`                                      | `undefined`                                     | Override the number of off-screen tolerated items rendered on each side.                                                                                                                                                            |
| `orientation`          | `VirtualScrollerOrientation`                              | `'vertical'`                                    | Scroll direction.                                                                                                                                                                                                                   |
| `resizeDelay`          | `number`                                                  | `10`                                            | Debounce in ms after a window resize before re-initializing.                                                                                                                                                                        |
| `scrollHeight`         | `string | undefined`                                      | `undefined`                                     | CSS height of the scroll viewport (e.g. '400px', '100%').                                                                                                                                                                           |
| `scrollWidth`          | `string | undefined`                                      | `undefined`                                     | CSS width of the scroll viewport. Only relevant for horizontal/both orientations.                                                                                                                                                   |
| `showLoader`           | `boolean`                                                 | `false`                                         | Whether to show a loading overlay when loading is true.                                                                                                                                                                             |
| `showSpacer`           | `boolean`                                                 | `true`                                          | Whether to render the spacer element that creates the virtual scroll height.                                                                                                                                                        |
| `step`                 | `number`                                                  | `0`                                             | Number of items per lazy-load page. 0 disables stepped paging.                                                                                                                                                                      |
| `styleClass`           | `string | null`                                           | `null`                                          | Additional CSS class(es) applied to the host element.                                                                                                                                                                               |
| `tabIndex`             | `number`                                                  | `0`                                             | Tab index on the viewport element.                                                                                                                                                                                                  |
| `totalRecords`         | `number | undefined`                                      | `undefined`                                     | Total number of records available on the server. Used in lazy-loading mode to pre-size the virtual spacer so the scrollbar reflects the full dataset even when only a page is loaded. When omitted, `items.length` is used instead. |
| `trackByFn`            | `((index: number, item: unknown) => unknown) | undefined` | `(index: number`                                | TrackBy function forwarded to the                                                                                                                                                                                                   |
| `variant`              | `'material' | 'bootstrap' | 'minimal' | null`             | `null`                                          | Design variant override. When null the active global theme variant is used.                                                                                                                                                         |

### Outputs

| Name                | Type                                    | Description                                        |
| ------------------- | --------------------------------------- | -------------------------------------------------- |
| `lazyLoad`          | `VirtualScrollerLazyLoadEvent`          | Fires when the visible range changes in lazy mode. |
| `scrollIndexChange` | `VirtualScrollerScrollIndexChangeEvent` | Fires when the first/last rendered index changes.  |
| `virtualScroll`     | `VirtualScrollerScrollEvent`            | Fires on every scroll event.                       |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                        |
| ----------------------------------------------------------------------- |
| announces empty state when there are no items to display                |
| announces loading state through a polite live region                    |
| applies aria-posinset using the absolute rendered item position         |
| applies aria-rowindex to rendered grid rows                             |
| applies aria-setsize for rendered list items using the total item count |
| exposes a keyboard-focusable viewport with a default aria-label         |
| has no axe violations in the empty state                                |
| has no axe violations in the loading state                              |
| has no axe violations in the populated state                            |
| scrolls by one item height when ArrowDown is pressed                    |
| should expose a tabindex on the viewport                                |
| should expose aria-rowcount when configured as a grid                   |
| should have role=                                                       |
| should mark the spacer as aria-hidden                                   |
| should not render the spacer when disabled                              |
| should not render the spacer when showSpacer is false                   |
| should remove aria-busy when loading becomes false                      |
| should render the spacer when showSpacer is true                        |
| should scroll by one item height when ArrowDown is pressed              |
| should show loader overlay and aria-busy when loading is true           |
| uses a custom aria-label when provided                                  |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#virtual-scroller)
- [Demo page](/components/virtual-scroller)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/virtual-scroller/README.md)

