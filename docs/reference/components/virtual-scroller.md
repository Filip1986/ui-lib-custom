# VirtualScroller

A high-performance virtual scrolling container that renders only the items currently visible in the viewport plus a configurable tolerance buffer, using CSS transforms to position content and an invisible spacer to maintain the full scroll height.

---

## Overview

`VirtualScroller` solves the performance problem of rendering large lists by keeping only a small visible slice in the DOM at any time. The rest of the list is represented by a spacer element that maintains the correct total scroll height — the browser scroll bar and layout behave as if all items were rendered.

Supports vertical, horizontal, and 2-D (`'both'`) orientations; lazy loading with server-side pagination; external loading state with a built-in spinner or custom skeleton loader template; and a disabled mode that bypasses virtualization entirely for small lists.

**Entry point:** `ui-lib-custom/virtual-scroller`

**Selector:** `ui-lib-virtual-scroller`

---

## Import

```typescript
import {
  VirtualScrollerComponent,
  ScrollerItemDirective,
  ScrollerContentDirective,
  ScrollerLoaderDirective,
  ScrollerLoaderIconDirective,
} from 'ui-lib-custom/virtual-scroller';

import type {
  VirtualScrollerOrientation,
  VirtualScrollerToType,
  VirtualScrollerItemOptions,
  VirtualScrollerLoaderOptions,
  VirtualScrollerContentOptions,
  VirtualScrollerLazyLoadEvent,
  VirtualScrollerScrollIndexChangeEvent,
  VirtualScrollerScrollEvent,
} from 'ui-lib-custom/virtual-scroller';
```

---

## Basic Usage

```html
<ui-lib-virtual-scroller [items]="items" [itemSize]="50" scrollHeight="400px">
  <ng-template uiScrollerItem let-item>
    <div class="item">{{ item.label }}</div>
  </ng-template>
</ui-lib-virtual-scroller>
```

```typescript
items: MyItem[] = Array.from({ length: 10_000 }, (_, i) => ({ id: i, label: `Item ${i + 1}` }));
```

The item template receives the item as the implicit variable and an `options` object with positional metadata.

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | auto-generated | HTML `id` applied to the viewport element |
| `styleClass` | `string` | `''` | Extra CSS class on the host element |
| `items` | `unknown[] \| null \| undefined` | `[]` | Full list of items to virtualize |
| `itemSize` | `number \| [number, number]` | `0` | Height (vertical), width (horizontal), or `[height, width]` (both) of each item in pixels |
| `scrollHeight` | `string \| undefined` | `undefined` | CSS height of the viewport (e.g. `'400px'`, `'60vh'`) |
| `scrollWidth` | `string \| undefined` | `undefined` | CSS width of the viewport — relevant for horizontal/both orientations |
| `orientation` | `VirtualScrollerOrientation` | `'vertical'` | Scroll axis: `'vertical'`, `'horizontal'`, or `'both'` |
| `step` | `number` | `0` | Number of items to scroll per step (0 = continuous) |
| `delay` | `number` | `0` | Debounce delay in ms applied to scroll calculations |
| `resizeDelay` | `number` | `10` | Debounce delay in ms applied to resize calculations |
| `appendOnly` | `boolean` | `false` | When `true`, previously rendered items are never removed (append-only mode) |
| `inline` | `boolean` | `false` | When `true`, the host grows to fit its container rather than taking fixed dimensions |
| `lazy` | `boolean` | `false` | Enable lazy (server-side) loading. The `lazyLoad` event fires when the window needs new data |
| `disabled` | `boolean` | `false` | Bypass virtualization entirely — all items are rendered and `<ng-content>` is passed through |
| `loaderDisabled` | `boolean` | `false` | When `true`, suppresses the loader overlay even if `showLoader` and `loading` are both `true` |
| `columns` | `unknown[] \| null \| undefined` | `undefined` | Column data for `'both'` orientation |
| `showSpacer` | `boolean` | `true` | When `false`, the spacer element is omitted (use when a fixed container already provides height) |
| `showLoader` | `boolean` | `false` | Show the built-in loader overlay or custom `uiScrollerLoader` template while `loading` is `true` |
| `numToleratedItems` | `number \| undefined` | `undefined` | Number of extra items to render beyond the visible window. Defaults to auto-calculated from viewport size |
| `loading` | `boolean \| undefined` | `undefined` | External loading flag. Connects to the loader overlay when `showLoader` is also `true` |
| `trackByFn` | `((index: number, item: unknown) => unknown) \| undefined` | `undefined` | Custom track-by function passed to the internal `@for` loop |
| `tabIndex` | `number` | `0` | `tabindex` attribute on the viewport element |
| `totalRecords` | `number \| undefined` | `undefined` | Total number of records available server-side, used in lazy mode to size the spacer |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `lazyLoad` | `VirtualScrollerLazyLoadEvent` | Fires (debounced) when the visible window changes in `lazy` mode — provides the `first`/`last` index range to fetch |
| `scroll` | `VirtualScrollerScrollEvent` | Fires on every scroll event |
| `scrollIndexChange` | `VirtualScrollerScrollIndexChangeEvent` | Fires when the first or last rendered index changes |

---

## Content Directives

Apply these to `ng-template` elements projected into the scroller to supply custom rendering.

### `uiScrollerItem`

Replaces the default item rendering. The template context is:

```typescript
{ $implicit: item, options: VirtualScrollerItemOptions }
```

```html
<ng-template uiScrollerItem let-item let-options="options">
  <div [class.first]="options.first">{{ item.label }}</div>
</ng-template>
```

### `uiScrollerLoader`

Replaces the default spinner with custom loader content (e.g. skeleton rows). The template context is:

```typescript
{ options: VirtualScrollerLoaderOptions }
```

One instance of this template is rendered per item slot visible in the viewport while loading.

```html
<ng-template uiScrollerLoader let-options="options">
  <div class="skeleton-row"></div>
</ng-template>
```

### `uiScrollerContent`

Overrides the entire content area including the item loop. Use only when you need full control over layout (e.g. grid virtualization). The template context is:

```typescript
{ $implicit: VirtualScrollerContentOptions['rows'], options: VirtualScrollerContentOptions }
```

### `uiScrollerLoaderIcon`

Replaces only the spinner icon inside the default loader overlay. The template context is:

```typescript
{ options: { styleClass: string } }
```

---

## Lazy Loading

In lazy mode the scroller does not expect all items to be in memory. Pass a pre-sized (potentially sparse) array and fill it on demand as `lazyLoad` fires.

```typescript
protected readonly totalCount = 10_000;
protected readonly items: WritableSignal<MyItem[]> = signal([]);
protected readonly loading: WritableSignal<boolean> = signal(false);

protected onLazyLoad(event: VirtualScrollerLazyLoadEvent): void {
  this.loading.set(true);
  this.myService.fetch(event.first, event.last).subscribe((page) => {
    const all = [...this.items()];
    page.forEach((item) => { all[item.id] = item; });
    this.items.set(all);
    this.loading.set(false);
  });
}
```

```html
<ui-lib-virtual-scroller
  [items]="items()"
  [itemSize]="50"
  scrollHeight="400px"
  [lazy]="true"
  [loading]="loading()"
  [totalRecords]="totalCount"
  [showLoader]="true"
  (lazyLoad)="onLazyLoad($event)"
>
  <ng-template uiScrollerItem let-item>
    @if (item) {
      <div class="item">{{ item.label }}</div>
    } @else {
      <div class="item item--placeholder">Loading…</div>
    }
  </ng-template>
</ui-lib-virtual-scroller>
```

---

## Horizontal Scrolling

```html
<ui-lib-virtual-scroller
  [items]="items"
  [itemSize]="120"
  orientation="horizontal"
  scrollWidth="100%"
  scrollHeight="120px"
>
  <ng-template uiScrollerItem let-item>
    <div class="card" style="width: 120px; height: 100%">{{ item.label }}</div>
  </ng-template>
</ui-lib-virtual-scroller>
```

---

## Custom Skeleton Loader

```html
<ui-lib-virtual-scroller
  [items]="items()"
  [itemSize]="64"
  scrollHeight="400px"
  [loading]="loading()"
  [showLoader]="true"
>
  <ng-template uiScrollerItem let-item>
    <div class="item">{{ item.label }}</div>
  </ng-template>

  <ng-template uiScrollerLoader>
    <div class="skeleton-row">
      <div class="skeleton skeleton--circle"></div>
      <div class="skeleton skeleton--line"></div>
    </div>
  </ng-template>
</ui-lib-virtual-scroller>
```

---

## Disabled Mode

Disabling virtualization renders all items without a virtual container — useful for small lists or print/export paths where having only a subset of items in the DOM would break layout.

```html
<ui-lib-virtual-scroller
  [items]="items"
  [itemSize]="48"
  scrollHeight="300px"
  [disabled]="true"
>
  <ng-template uiScrollerItem let-item>
    <div class="item">{{ item.label }}</div>
  </ng-template>
</ui-lib-virtual-scroller>
```

In disabled mode the scroller renders `<ng-content>` and the `uiScrollerContent` template (if provided) with all items — no viewport, no spacer, no scroll calculation.

---

## Event Types

```typescript
interface VirtualScrollerLazyLoadEvent {
  first: number;  // First index to load (inclusive)
  last: number;   // Last index to load (exclusive)
}

interface VirtualScrollerScrollIndexChangeEvent {
  first: number | { rows: number; cols: number };
  last:  number | { rows: number; cols: number };
}

interface VirtualScrollerScrollEvent {
  originalEvent: Event;
}
```

---

## CSS Variables (Theming)

```css
/* Loader overlay */
--uilib-scroller-loader-bg: rgba(255, 255, 255, 0.7);

/* Default spinner icon */
--uilib-scroller-loading-icon-size: 2rem;
--uilib-scroller-loading-icon-color: var(--uilib-color-primary, #6366f1);
```

### Overriding Tokens

```css
ui-lib-virtual-scroller {
  --uilib-scroller-loader-bg: rgba(0, 0, 0, 0.3);
  --uilib-scroller-loading-icon-color: #fff;
}
```

---

## Accessibility

- The viewport element carries `role="log"` with `aria-live="off"` — the log role signals a live region to assistive technology while `aria-live="off"` prevents spurious announcements on every scroll update.
- The viewport element exposes a configurable `tabindex` (`[tabIndex]` input, default `0`) so keyboard users can focus and scroll the container.
- The spacer element is marked `aria-hidden="true"` since it is a presentational layout element.
- The loading overlay carries `role="status"` and `aria-label="Loading"`.
- Within item templates, ensure each rendered item has a meaningful accessible label — the scroller does not add ARIA attributes to item slots.

---

## Architecture Notes

- **Mutable / signal split:** High-frequency scroll math (`first`, `last`, `numItemsInViewport`, etc.) is stored in plain class properties to avoid signal overhead on every scroll event. A `rangeVersion: WritableSignal<number>` counter bridges the two worlds — it is incremented whenever the rendered range changes, causing `loadedRows()` and `spacerStyle()` computed signals to recompute.
- **Zone-less scroll:** The scroll event listener is bound via `NgZone.runOutsideAngular()`. Angular's change detection is re-entered via `zone.run()` only when the rendered range actually changes, keeping unnecessary CD cycles out of the hot path.
- **CSS transform positioning:** The content div uses `transform: translate3d(x, y, 0)` rather than `top`/`left` to keep rendering on the compositor thread and avoid layout thrashing.
- **Spacer sizing:** An invisible `1×1` element is scaled (via `transform: scaleY(totalHeight)` / `scaleX(totalWidth)`) rather than setting explicit height/width, which avoids reflow when the total count changes.

---

## Secondary Entry Point

```
projects/ui-lib-custom/virtual-scroller/
├── ng-package.json    # entryFile → src/lib/virtual-scroller/index.ts
├── package.json       # { "name": "ui-lib-custom/virtual-scroller" }
└── public-api.ts      # re-exports from index
```

---

## Public API (index.ts exports)

| Export | Kind |
|--------|------|
| `VirtualScrollerComponent` | Component |
| `ScrollerItemDirective` | Directive (`uiScrollerItem`) |
| `ScrollerContentDirective` | Directive (`uiScrollerContent`) |
| `ScrollerLoaderDirective` | Directive (`uiScrollerLoader`) |
| `ScrollerLoaderIconDirective` | Directive (`uiScrollerLoaderIcon`) |
| `VirtualScrollerOrientation` | Type alias |
| `VirtualScrollerToType` | Type alias |
| `VirtualScrollerItemOptions` | Interface |
| `VirtualScrollerLoaderOptions` | Interface |
| `VirtualScrollerContentOptions` | Interface |
| `VirtualScrollerLazyLoadEvent` | Interface |
| `VirtualScrollerScrollIndexChangeEvent` | Interface |
| `VirtualScrollerScrollEvent` | Interface |

---

## Source

`projects/ui-lib-custom/src/lib/virtual-scroller/`
