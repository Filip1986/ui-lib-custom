# PickList

Transfers items between a source list and a target list with reorder controls, optional filter inputs, drag-and-drop support, multi-selection, and full keyboard accessibility.

---

## Import

```typescript
import {
  PickListComponent,
  PickListItemDirective,
  PickListSourceHeaderDirective,
  PickListTargetHeaderDirective,
  PickListEmptyDirective,
  PICK_LIST_DEFAULTS,
} from 'ui-lib-custom/pick-list';
```

---

## Basic Usage

```html
<ui-lib-pick-list
  [(source)]="availableItems"
  [(target)]="selectedItems"
  trackBy="id"
  sourceHeader="Available"
  targetHeader="Selected"
/>
```

---

## With Filter

```html
<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="name"
  filterBy="name"
  sourceFilterPlaceholder="Search available…"
  targetFilterPlaceholder="Search selected…"
/>
```

---

## With Custom Templates

```html
<ui-lib-pick-list [(source)]="source" [(target)]="target" trackBy="code">
  <ng-template uiPickListSourceHeader>
    <span>Available ({{ source().length }})</span>
  </ng-template>
  <ng-template uiPickListTargetHeader>
    <span>Selected ({{ target().length }})</span>
  </ng-template>
  <ng-template uiPickListItem let-item>
    <div class="row">
      <strong>{{ item.name }}</strong>
      <span>{{ item.category }}</span>
    </div>
  </ng-template>
  <ng-template uiPickListEmpty>
    <span>No items here.</span>
  </ng-template>
</ui-lib-pick-list>
```

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `source` | `unknown[]` | `[]` | Source list items. Two-way via `[(source)]`. |
| `target` | `unknown[]` | `[]` | Target list items. Two-way via `[(target)]`. |
| `sourceSelection` | `unknown[]` | `[]` | Selected source items. Two-way via `[(sourceSelection)]`. |
| `targetSelection` | `unknown[]` | `[]` | Selected target items. Two-way via `[(targetSelection)]`. |
| `sourceHeader` | `string \| null` | `null` | Static source list header text. |
| `targetHeader` | `string \| null` | `null` | Static target list header text. |
| `filterBy` | `string \| null` | `null` | Dot-notation property path used for filtering. Shows filter inputs when set. |
| `sourceFilterPlaceholder` | `string` | `'Filter'` | Placeholder for source filter input. |
| `targetFilterPlaceholder` | `string` | `'Filter'` | Placeholder for target filter input. |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | Matching strategy for filter. |
| `showSourceControls` | `boolean` | `true` | Show reorder buttons next to source list. |
| `showTargetControls` | `boolean` | `true` | Show reorder buttons next to target list. |
| `dragDrop` | `boolean` | `false` | Enables drag-and-drop reorder and inter-list transfer. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `metaKeySelection` | `boolean` | `false` | Requires Ctrl/Meta held for multi-select clicks. |
| `stripedRows` | `boolean` | `false` | Alternating row background. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Theme variant override. Inherits from `ThemeConfigService` when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size scale. |
| `trackBy` | `string \| null` | `null` | Property path for item identity. Used for equality checks and label display. |
| `sourceAriaLabel` | `string \| null` | `null` | `aria-label` for the source listbox. |
| `targetAriaLabel` | `string \| null` | `null` | `aria-label` for the target listbox. |

---

## Outputs

| Output | Payload | Description |
|---|---|---|
| `movedToTarget` | `PickListMoveToTargetEvent` | After selected source items are transferred to target. |
| `movedAllToTarget` | `PickListMoveAllToTargetEvent` | After all source items are transferred to target. |
| `movedToSource` | `PickListMoveToSourceEvent` | After selected target items are returned to source. |
| `movedAllToSource` | `PickListMoveAllToSourceEvent` | After all target items are returned to source. |
| `sourceSelectionChanged` | `PickListSelectionChangeEvent` | When source selection changes. |
| `targetSelectionChanged` | `PickListSelectionChangeEvent` | When target selection changes. |
| `reordered` | `PickListReorderEvent` | After a reorder within either list (buttons or DnD). |

---

## Template Slots

| Directive | Selector | Context | Description |
|---|---|---|---|
| `PickListItemDirective` | `[uiPickListItem]` | `$implicit: T` | Custom item row rendered in both lists. |
| `PickListSourceHeaderDirective` | `[uiPickListSourceHeader]` | — | Custom source list header. |
| `PickListTargetHeaderDirective` | `[uiPickListTargetHeader]` | — | Custom target list header. |
| `PickListEmptyDirective` | `[uiPickListEmpty]` | — | Empty state shown when a list has no items. |

---

## CSS Tokens

| Token | Description |
|---|---|
| `--uilib-pick-list-gap` | Gap between the two panels and the transfer controls. |
| `--uilib-pick-list-min-height` | Minimum height of each list. |
| `--uilib-pick-list-max-height` | Maximum height of each list (scrollable). |
| `--uilib-pick-list-item-padding` | Padding of each list item. |
| `--uilib-pick-list-item-bg` | Default item background. |
| `--uilib-pick-list-item-bg-hover` | Item background on hover. |
| `--uilib-pick-list-item-bg-selected` | Item background when selected. |
| `--uilib-pick-list-item-color-selected` | Item text colour when selected. |
| `--uilib-pick-list-transfer-btn-size` | Width/height of transfer buttons. |
| `--uilib-pick-list-transfer-btn-bg` | Transfer button background. |
| `--uilib-pick-list-transfer-btn-bg-hover` | Transfer button background on hover. |
| `--uilib-pick-list-control-btn-size` | Width/height of reorder control buttons. |

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Arrow Down / Up` | Navigate items in the focused list. |
| `Space` / `Enter` | Toggle selection of focused item. |
| `Ctrl+A` | Select all visible items in the focused list. |
| `Escape` | Clear selection in the focused list. |
| `Ctrl+→` | Transfer selected source items to target. |
| `Ctrl+←` | Return selected target items to source. |
| `Ctrl+↑` | Move selected items up within their list. |
| `Ctrl+↓` | Move selected items down within their list. |
| `Ctrl+Home` | Move selected items to top of list. |
| `Ctrl+End` | Move selected items to bottom of list. |

---

## Accessibility

- Each list uses `role="listbox"` with `aria-multiselectable="true"`.
- Each item uses `role="option"` with `aria-selected`.
- Transfer and reorder buttons carry descriptive `aria-label` attributes.
- All transfers and reorders are announced via `LiveAnnouncerService`.
- Label the source and target listboxes with `[sourceAriaLabel]` / `[targetAriaLabel]`.

---

## Variants

| Variant | Style |
|---|---|
| `material` | Elevated panels with box-shadow, rounded transfer buttons. |
| `bootstrap` | Flat bordered panels with Bootstrap 5 colour system. |
| `minimal` | No panel chrome, transparent backgrounds, subtle borders only. |

---

## Entry Point

`ui-lib-custom/pick-list`
