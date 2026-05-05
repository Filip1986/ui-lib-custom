# PickList

**Selector:** `ui-lib-pick-list`
**Package:** `ui-lib-custom/pick-list`
**Content projection:** yes — item rows via `uiPickListItem` (shared by both lists), source header via `uiPickListSourceHeader`, target header via `uiPickListTargetHeader`, empty state via `uiPickListEmpty`

> `source`, `target`, `sourceSelection`, and `targetSelection` are all `model()` signals — use `[()]` for two-way binding. The single `uiPickListItem` template is rendered in both the source and target lists. Without `trackBy`, selection equality uses object identity.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `source` | `unknown[]` | `[]` | Source list items. Two-way bindable via `[(source)]`. |
| `target` | `unknown[]` | `[]` | Target list items. Two-way bindable via `[(target)]`. |
| `sourceSelection` | `unknown[]` | `[]` | Selected items in the source list. Two-way bindable via `[(sourceSelection)]`. |
| `targetSelection` | `unknown[]` | `[]` | Selected items in the target list. Two-way bindable via `[(targetSelection)]`. |
| `sourceHeader` | `string \| null` | `null` | Caption above the source list. |
| `targetHeader` | `string \| null` | `null` | Caption above the target list. |
| `filterBy` | `string \| null` | `null` | Dot-notation property path for filtering. Null hides filter inputs. |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals'` | `'contains'` | Filter matching strategy. |
| `filterLocale` | `string \| undefined` | `undefined` | BCP 47 locale for locale-sensitive comparisons. |
| `sourceFilterPlaceholder` | `string` | `'Filter'` | Placeholder inside the source filter input. |
| `targetFilterPlaceholder` | `string` | `'Filter'` | Placeholder inside the target filter input. |
| `showSourceControls` | `boolean` | `true` | Shows reorder controls for the source list. |
| `showTargetControls` | `boolean` | `true` | Shows reorder controls for the target list. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `metaKeySelection` | `boolean` | `false` | When true, Ctrl/Meta must be held to toggle multi-select. |
| `stripedRows` | `boolean` | `false` | Alternating row background tint. |
| `dragDrop` | `boolean` | `false` | Enables drag-and-drop reordering and cross-list transfer. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |
| `trackBy` | `string \| null` | `null` | Property key for selection equality and `@for` tracking. |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the root element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `movedToTarget` | `PickListMoveToTargetEvent` | Emitted when selected source items move to target. |
| `movedAllToTarget` | `PickListMoveAllToTargetEvent` | Emitted when all source items move to target. |
| `movedToSource` | `PickListMoveToSourceEvent` | Emitted when selected target items move to source. |
| `movedAllToSource` | `PickListMoveAllToSourceEvent` | Emitted when all target items move to source. |
| `sourceSelectionChanged` | `PickListSelectionChangeEvent` | Emitted when source selection changes. |
| `targetSelectionChanged` | `PickListSelectionChangeEvent` | Emitted when target selection changes. |
| `sourceFiltered` | `PickListFilterEvent` | Emitted when source filter query changes. |
| `targetFiltered` | `PickListFilterEvent` | Emitted when target filter query changes. |
| `reordered` | `PickListReorderEvent` | Emitted after a reorder within either list. |

## Usage

```html
<!-- basic transfer list -->
<ui-lib-pick-list [(source)]="available" [(target)]="selected">
  <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
</ui-lib-pick-list>

<!-- with headers and filter -->
<ui-lib-pick-list
  [(source)]="available"
  [(target)]="selected"
  sourceHeader="Available"
  targetHeader="Selected"
  filterBy="name"
>
  <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
</ui-lib-pick-list>
```
