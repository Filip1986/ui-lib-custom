# TreeSelect

**Selector:** `ui-lib-tree-select`  
**Package:** `ui-lib-custom/tree-select`  
**Content projection:** no — none

> `selection` and `panelVisible` are `model()` signals, so both support two-way binding with `[()]`. The component also implements `ControlValueAccessor`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `nodes` | `TreeNode[]` | `[]` | Root-level tree nodes shown inside the popup tree |
| `selectionMode` | `'single' \| 'multiple' \| 'checkbox'` | `'single'` | Selection behavior used by the embedded tree |
| `selection` | `TreeNode \| TreeNode[] \| null` | `null` | Current value; two-way bind with `[(selection)]` |
| `panelVisible` | `boolean` | `false` | Controls popup visibility |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger and popup density |
| `placeholder` | `string` | `'Select a node...'` | Trigger text when no item is selected |
| `disabled` | `boolean` | `false` | Disables trigger and popup interaction |
| `loading` | `boolean` | `false` | Shows a spinner and disables interaction |
| `filter` | `boolean` | `false` | Enables the embedded tree filter input |
| `filterPlaceholder` | `string` | `'Search...'` | Placeholder text for the filter input |
| `showClear` | `boolean` | `false` | Shows a clear button when a value exists |
| `styleClass` | `string` | `''` | Extra class applied to the host |
| `ariaLabel` | `string \| null` | `null` | Accessible name for the combobox / popup tree |
| `ariaLabelledBy` | `string \| null` | `null` | External element id used to label the combobox |
| `invalid` | `boolean` | `false` | Applies invalid styling and `aria-invalid` |
| `required` | `boolean` | `false` | Applies `aria-required` |
| `emptyMessage` | `string` | `'No results found'` | Empty-state message when no nodes are available |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `treeChange` | `TreeSelectChangeEvent` | Fired whenever the selection changes (includes `originalEvent`). Note: `selectionChange` is reserved by the `[(selection)]` model binding — use `(treeChange)` for the rich event payload. |
| `show` | `TreeSelectShowEvent` | Fired when the popup opens |
| `hide` | `TreeSelectHideEvent` | Fired when the popup closes |
| `nodeSelect` | `TreeNodeSelectEvent` | Proxied from the embedded tree |
| `nodeUnselect` | `TreeNodeSelectEvent` | Proxied from the embedded tree |
| `nodeExpand` | `TreeNodeExpandEvent` | Proxied from the embedded tree |
| `nodeCollapse` | `TreeNodeCollapseEvent` | Proxied from the embedded tree |
| `cleared` | `void` | Fired when the clear button is pressed |

## Usage

```html
<ui-lib-tree-select
  [nodes]="treeData"
  selectionMode="single"
  [(selection)]="selectedNode"
  placeholder="Choose a category"
/>

<ui-lib-tree-select
  [nodes]="treeData"
  selectionMode="checkbox"
  [filter]="true"
  [showClear]="true"
  [(selection)]="selectedNodes"
  ariaLabel="Project files"
/>
```

## Accessibility

### ARIA structure

| Element | Attributes / behavior |
|---------|------------------------|
| Host combobox | `role="combobox"`, `aria-haspopup="tree"`, `aria-expanded`, `aria-controls`, `aria-describedby`, `aria-invalid`, `aria-required`, `aria-disabled` |
| Popup tree | `role="tree"`, generated id, `aria-label`, `aria-multiselectable` in multi/checkbox modes |
| Tree items | `role="treeitem"`, generated ids, `aria-level`, `aria-setsize`, `aria-posinset`, `aria-expanded`, `aria-selected`, `aria-checked="true|false|mixed"` as applicable |
| Nested groups | `role="group"` on child lists |
| Live region | Hidden polite live region announces current selection text |
| Decorative graphics | Chevron, spinner, and tree toggle glyphs use `aria-hidden="true"` |
| Clear button | Icon-only control uses `aria-label="Clear selection"` |

### Keyboard interaction

| Key | Behavior |
|-----|----------|
| `Enter`, `Space`, `ArrowDown` on combobox | Opens the popup and moves focus into the tree (or filter input when enabled) |
| `Escape` | Closes the popup and restores focus to the combobox |
| `Tab` | Closes the popup and leaves the component |
| `ArrowDown` / `ArrowUp` | Move between visible tree items |
| `ArrowRight` | Expands a collapsed branch, or moves focus to the first child when already expanded |
| `ArrowLeft` | Collapses an expanded branch, or moves focus to the parent item |
| `Home` / `End` | Move focus to the first / last visible tree item |
| Printable character | Type-ahead moves focus to the next visible item whose label starts with that character |
| `Enter` / `Space` on a tree item | Selects the item according to the current selection mode |

### Focus and announcements

- Opening the popup moves focus into the filter input when filtering is enabled; otherwise focus lands on the active tree item.
- In single-selection mode, choosing an item closes the popup and restores focus to the combobox.
- Selection changes update a polite live region so screen readers announce the currently selected item count or label.

## CSS Custom Properties

| Variable | Purpose |
|----------|---------|
| `--uilib-tree-select-trigger-bg` | Trigger background |
| `--uilib-tree-select-trigger-border` | Trigger border color |
| `--uilib-tree-select-trigger-radius` | Trigger border radius |
| `--uilib-tree-select-trigger-padding-y` | Trigger vertical padding |
| `--uilib-tree-select-trigger-padding-x` | Trigger horizontal padding |
| `--uilib-tree-select-placeholder-color` | Placeholder / icon color |
| `--uilib-tree-select-panel-bg` | Popup panel background |
| `--uilib-tree-select-panel-border` | Popup panel border color |
| `--uilib-tree-select-panel-radius` | Popup panel border radius |
| `--uilib-tree-select-panel-shadow` | Popup panel shadow |
| `--uilib-tree-select-panel-max-height` | Popup max height |
| `--uilib-tree-select-panel-z-index` | Popup stacking context |

## Notes

- `selectionMode="checkbox"` uses tree-style cascade selection and exposes mixed state through `aria-checked="mixed"` on partially selected branches.
- Motion-sensitive users are respected through a `prefers-reduced-motion` override that disables trigger, popup, chevron, and spinner animation.
