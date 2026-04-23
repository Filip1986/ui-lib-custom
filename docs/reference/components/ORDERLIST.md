# OrderList

A reorderable list component with button controls, optional inline filtering, native HTML5 drag-and-drop, custom item templates, and full keyboard + screen-reader accessibility.

---

## Overview

`OrderList` lets users manually sort a collection of items using control buttons (Move Top / Up / Down / Bottom), keyboard shortcuts, or drag-and-drop. It supports:

- Multi-selection with optional meta-key mode
- Inline text filtering with four match modes
- Fully customisable item, header, empty-state, and filter templates
- Three theme variants (`material`, `bootstrap`, `minimal`) and three sizes (`sm`, `md`, `lg`)
- Complete keyboard navigation and live-announcement of every reorder

---

## Import

```ts
import {
  OrderListComponent,
  OrderListItemDirective,
  OrderListHeaderDirective,
  OrderListEmptyDirective,
  OrderListFilterDirective,
} from 'ui-lib-custom/order-list';
```

---

## Basic Usage

```html
<ui-lib-order-list [(value)]="items" [(selection)]="selected">
  <ng-template uiOrderListItem let-item>{{ item.label }}</ng-template>
</ui-lib-order-list>
```

---

## Filtering

```html
<ui-lib-order-list [(value)]="items" filterBy="name" filterPlaceholder="Search…">
  <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
</ui-lib-order-list>
```

The active filter never mutates `value`. Items hidden by a filter cannot be reordered until the filter is cleared.

---

## Drag & Drop

```html
<ui-lib-order-list [(value)]="items" [dragDrop]="true" (reordered)="onReorder($event)">
  <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
</ui-lib-order-list>
```

Built on the native HTML5 DnD API — no CDK dependency. A drop-indicator line shows the insertion position before or after the hovered item.

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `unknown[]` | `[]` | Ordered list items. Two-way bindable via `[(value)]`. |
| `selection` | `unknown[]` | `[]` | Selected items. Two-way bindable via `[(selection)]`. |
| `header` | `string \| null` | `null` | Static header text (overridden by `uiOrderListHeader` template). |
| `filterBy` | `string \| null` | `null` | Dot-notation property path to filter on. Renders the filter input when set. |
| `filterPlaceholder` | `string` | `'Filter'` | Placeholder text for the filter input. |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | Filter matching strategy. |
| `filterLocale` | `string \| undefined` | `undefined` | BCP 47 locale for locale-sensitive comparisons. |
| `dragDrop` | `boolean` | `false` | Enables native HTML5 drag-and-drop reordering. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `metaKeySelection` | `boolean` | `false` | Requires Ctrl/Meta to toggle items; plain click replaces the selection. |
| `stripedRows` | `boolean` | `false` | Adds alternating row background tint. |
| `controlsPosition` | `'left' \| 'right' \| 'top'` | `'left'` | Position of reorder buttons relative to the list. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Explicit theme variant override; `null` inherits from `ThemeConfigService`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size scale token. |
| `trackBy` | `string \| null` | `null` | Dot-notation property path for item identity (selection equality and `@for` tracking). |
| `ariaLabel` | `string \| null` | `null` | Accessible label for the listbox element. |
| `ariaLabelledBy` | `string \| null` | `null` | One or more IDs that label the listbox element. |
| `moveTopAriaLabel` | `string` | `'Move to top'` | Label for the Move Top button. |
| `moveUpAriaLabel` | `string` | `'Move up'` | Label for the Move Up button. |
| `moveDownAriaLabel` | `string` | `'Move down'` | Label for the Move Down button. |
| `moveBottomAriaLabel` | `string` | `'Move to bottom'` | Label for the Move Bottom button. |
| `styleClass` | `string \| null` | `null` | Additional CSS class applied to the host element. |

### Outputs

| Output | Payload | Description |
|---|---|---|
| `reordered` | `OrderListReorderEvent` | Fires after any reorder operation (button or drag-and-drop). |
| `selectionChanged` | `OrderListSelectionChangeEvent` | Fires when the selection array changes. |
| `filtered` | `OrderListFilterEvent` | Fires when the filter query changes. |
| `dragDropped` | `OrderListDragDropEvent` | Fires specifically after a drag-and-drop reorder. |

### Event Types

```ts
interface OrderListReorderEvent {
  items: unknown[];
  previousIndex: number;
  currentIndex: number;
}

interface OrderListSelectionChangeEvent {
  originalEvent: Event;
  value: unknown[];
}

interface OrderListFilterEvent {
  originalEvent: Event;
  query: string;
  filteredItems: unknown[];
}

interface OrderListDragDropEvent {
  previousIndex: number;
  currentIndex: number;
  items: unknown[];
}
```

---

## Template Slots

| Directive | Context variable | Description |
|---|---|---|
| `uiOrderListItem` | `$implicit: T` | Custom item row renderer. |
| `uiOrderListHeader` | — | Custom header area. |
| `uiOrderListEmpty` | `filter: boolean` | Rendered when the list is empty or a filter matches nothing. |
| `uiOrderListFilter` | — | Replaces the default filter input entirely. |

---

## Keyboard Interaction

| Key | Action |
|---|---|
| `Arrow Down` | Move focus to next item (wraps to first). |
| `Arrow Up` | Move focus to previous item (wraps to last). |
| `Home` | Move focus to first item. |
| `End` | Move focus to last item. |
| `Space` / `Enter` | Toggle selection of the focused item. |
| `Ctrl+A` / `Meta+A` | Select all visible items. |
| `Escape` | Clear selection. |
| `Alt+Arrow Down` / `Ctrl+Arrow Down` | Move selected items down one position. |
| `Alt+Arrow Up` / `Ctrl+Arrow Up` | Move selected items up one position. |
| `Alt+Home` / `Ctrl+Home` | Move selected items to the top. |
| `Alt+End` / `Ctrl+End` | Move selected items to the bottom. |

---

## CSS Variables

| Variable | Description |
|---|---|
| `--uilib-order-list-gap` | Gap between controls column and list container. |
| `--uilib-order-list-min-height` | Minimum height of the listbox. |
| `--uilib-order-list-max-height` | Maximum height of the listbox (enables scrolling). |
| `--uilib-order-list-surface` | List container background. |
| `--uilib-order-list-border-color` | Border colour of the list container. |
| `--uilib-order-list-border-radius` | Corner radius. |
| `--uilib-order-list-item-padding` | Padding inside each list item. |
| `--uilib-order-list-item-hover-bg` | Item hover background. |
| `--uilib-order-list-item-selected-bg` | Selected item background. |
| `--uilib-order-list-item-selected-color` | Selected item text colour. |
| `--uilib-order-list-item-border-color` | Border between items. |
| `--uilib-order-list-control-size` | Width/height of control buttons. |
| `--uilib-order-list-control-bg` | Control button background. |
| `--uilib-order-list-control-color` | Control button icon colour. |
| `--uilib-order-list-control-hover-bg` | Control button hover background. |
| `--uilib-order-list-header-bg` | Header area background. |
| `--uilib-order-list-header-padding` | Header area padding. |
| `--uilib-order-list-focus-ring-color` | Focus ring colour (keyboard navigation). |
| `--uilib-order-list-drop-indicator-color` | Drag-drop insertion line colour. |
| `--uilib-order-list-transition` | Transition applied to interactive states. |
| `--uilib-order-list-font-size` | Base font size. |

---

## Accessibility

- **Role:** The `<ul>` element carries `role="listbox"` and `aria-multiselectable="true"`.
- **Items:** Each `<li>` carries `role="option"` and an `aria-selected` state attribute.
- **Buttons:** All four control buttons have configurable `aria-label` inputs.
- **Live announcements:** Every reorder (button or drag) is announced via `LiveAnnouncerService` — e.g. _"Apple moved to position 2 of 5."_
- **Roving tabindex:** The `<ul>` is the tab stop; individual items receive focus programmatically.
- **Label:** Provide `[ariaLabel]` or `[ariaLabelledBy]` so screen readers announce the purpose of the list.

---

## Known Limitations / v2 Considerations

- **No virtual scroll:** The full item array is always rendered. For very large lists, consider a wrapper with virtual scrolling.
- **No multi-item drag:** Only single-item drag-and-drop is supported. Multiple selected items must be moved via the control buttons.
- **Limited mobile drag-and-drop:** HTML5 DnD has incomplete mobile browser support. A pointer-events polyfill or CDK integration is planned for v2.
- **No CDK dependency:** Drag-and-drop is fully custom; no `@angular/cdk/drag-drop`.
- **Filter + drag interaction:** Items hidden by an active filter cannot be drag-reordered.

