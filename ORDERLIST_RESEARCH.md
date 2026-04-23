# OrderList Research — PrimeNG v19.1.4 Analysis

> Research document for implementing `ui-lib-custom` `OrderList` component.
> Source: `primeng@19.1.4` (packed and inspected `fesm2022/primeng-orderlist.mjs` + `orderlist/orderlist.d.ts` + `orderlist/orderlist.interface.d.ts`).

---

## API Surface

### Inputs

| PrimeNG Input | Type | Default | Notes |
|---|---|---|---|
| `header` | `string \| undefined` | `undefined` | Caption text above the list |
| `style` | `object \| null` | `undefined` | Inline style on root element |
| `styleClass` | `string \| undefined` | `undefined` | Extra CSS class on root |
| `tabindex` | `number \| undefined` | `undefined` | Tab order for the list |
| `ariaLabel` | `string \| undefined` | `undefined` | Accessible label for the listbox |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | IDs that label the listbox |
| `listStyle` | `object \| null` | `undefined` | Inline style on the inner listbox |
| `responsive` | `boolean` | `false` | Injects breakpoint media-query `<style>` |
| `filterBy` | `string \| undefined` | `undefined` | Comma-separated field paths to search |
| `filterPlaceholder` | `string \| undefined` | `undefined` | Placeholder for filter input |
| `filterLocale` | `string \| undefined` | host locale | Locale for `toLocaleLowerCase` |
| `filterMatchMode` | `'contains' \| 'startsWith' \| 'endsWith' \| 'equals' \| 'notEquals' \| 'in' \| 'lt' \| 'lte' \| 'gt' \| 'gte'` | `'contains'` | Filter strategy |
| `metaKeySelection` | `boolean` | `false` | Require Ctrl/Meta for multi-select toggle |
| `dragdrop` | `boolean` | `false` | Enable CDK drag-and-drop reorder |
| `controlsPosition` | `'left' \| 'right'` | `'left'` | Side the control buttons appear on |
| `ariaFilterLabel` | `string \| undefined` | `undefined` | Accessible label for filter input |
| `breakpoint` | `string` | `'960px'` | Width at which layout collapses to column |
| `stripedRows` | `boolean` | `false` | Alternating row background |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `trackBy` | `Function` | identity | `ngFor` trackBy function |
| `scrollHeight` | `string` | `'14rem'` | Max list height before scroll |
| `autoOptionFocus` | `boolean` | `true` | Auto-focus first or selected item on list focus |
| `selection` | `any[]` | `[]` | Currently selected items (two-way via `selectionChange`) |
| `value` | `any[] \| undefined` | `undefined` | The ordered data array |
| `buttonProps` | `ButtonProps` | `{ severity: 'secondary' }` | Shared props for all control buttons |
| `moveUpButtonProps` | `ButtonProps \| undefined` | `undefined` | Overrides for move-up button (merged over `buttonProps`) |
| `moveTopButtonProps` | `ButtonProps \| undefined` | `undefined` | Overrides for move-top button |
| `moveDownButtonProps` | `ButtonProps \| undefined` | `undefined` | Overrides for move-down button |
| `moveBottomButtonProps` | `ButtonProps \| undefined` | `undefined` | Overrides for move-bottom button |

### Outputs

| PrimeNG Output | Payload | When |
|---|---|---|
| `selectionChange` | `any[]` | After every selection mutation (two-way binding companion) |
| `onSelectionChange` | `{ originalEvent: Event; value: any[] }` | Same trigger as `selectionChange`; carries browser event |
| `onReorder` | `any[]` (selected items that moved) | After every move operation |
| `onFilterEvent` | `{ originalEvent: Event; value: any[] }` (filtered options) | On every keyup in filter input |
| `onFocus` | `Event` | When the listbox receives focus |
| `onBlur` | `Event` | When the listbox loses focus |

### Template Slots (Content Children)

| PrimeNG name | Context | Purpose |
|---|---|---|
| `item` | `{ $implicit: item, index: number }` | Custom item row renderer |
| `header` | none | Content above the list |
| `empty` | none | Shown when `value` is empty |
| `emptyfilter` | none | Shown when filter yields no results |
| `filter` | `{ options: { filter(v?): void; reset(): void } }` | Replace entire filter input area |
| `filtericon` | none | Replace the filter icon |
| `moveupicon` | none | Replace move-up button icon |
| `movetopicon` | none | Replace move-top button icon |
| `movedownicon` | none | Replace move-down button icon |
| `movebottomicon` | none | Replace move-bottom button icon |

### Public Methods

| Method | Signature | Effect |
|---|---|---|
| `moveUp()` | `(): void` | Move selected items up one position |
| `moveTop()` | `(): void` | Move selected items to the top |
| `moveDown()` | `(): void` | Move selected items down one position |
| `moveBottom()` | `(): void` | Move selected items to the bottom |
| `resetFilter()` | `(): void` | Clear filter value and input element |

---

## Value Model

- `value` is the **mutable source array**. PrimeNG mutates it directly (array index swaps, `splice`, `unshift`, `push`). It does **not** replace the reference on reorder; the same array object is modified in place.
- `selection` mirrors `d_selection` — an internal working copy of the selected items. When the component emits `selectionChange`, it emits the same `d_selection` reference.
- The relationship: `selection ⊆ value` — selected items must exist in `value` by object identity.
- On setting `value`, if `filterValue` is active, `filter()` is re-run immediately to keep `visibleOptions` in sync.
- `onReorder` emits the **currently selected items** (not all items) as its payload, i.e., the items that actually moved.

> **ui-lib-custom divergence:** We will use **signal inputs** (`input<T[]>()`) and treat `value` as immutable. Reorder operations will emit a new array reference via `valueChange` output instead of mutating in place. This is safer for OnPush and aligns with Angular signal patterns.

---

## Reorder Logic

### moveUp
```
for i = 0 to selection.length - 1:
  index = indexOf(selection[i], value)
  if index === 0: break          // already at top
  swap value[index-1] ↔ value[index]
emit onReorder(selection)
scroll first selected item into view
```
**Multi-select:** Iterates forward through selection. If the topmost selected item is already at index 0, the whole operation halts (even if lower items could still move). This means a contiguous block "locks" once its leading edge reaches index 0.

### moveTop
```
for i = selection.length - 1 downto 0:
  index = indexOf(selection[i], value)
  if index === 0: break
  splice item out → unshift to front
emit onReorder(selection)
scroll to index 0
```
**Multi-select:** Iterates in reverse to preserve relative order when items are moved to front.

### moveDown
```
for i = selection.length - 1 downto 0:
  index = indexOf(selection[i], value)
  if index === value.length - 1: break
  swap value[index] ↔ value[index+1]
emit onReorder(selection)
scroll last selected item into view
```
**Multi-select:** Iterates reverse to avoid cascading shifts. Stops when the last selected item is already at the end.

### moveBottom
```
for i = 0 to selection.length - 1:
  index = indexOf(selection[i], value)
  if index === value.length - 1: break
  splice item out → push to end
emit onReorder(selection)
scroll to last index
```
**Multi-select:** Forward iteration, splicing each item to end in order, preserving relative order at the tail.

---

## Filter Implementation

- Triggered on `keyup` of the filter input: `filterValue = input.value.trim().toLocaleLowerCase(filterLocale)`.
- `filter()` uses PrimeNG's `FilterService.filter(value, searchFields, filterValue, filterMatchMode, filterLocale)`.
- `searchFields` is `filterBy.split(',')` — supports nested dot-notation paths (`'address.city'`).
- `filterMatchMode` defaults to `'contains'` (case-insensitive substring check via `toLocaleLowerCase`).
- `visibleOptions` is replaced with the result; `value` is never mutated.
- `isItemVisible(item)` checks for item presence in `visibleOptions` by identity (===).
- `onFilterEvent` emits `{ originalEvent: keyboardEvent, value: visibleOptions }` — the filtered items array.
- `resetFilter()` clears `filterValue` to `null` and resets the DOM input to `''`.
- **Selection when filtered:** Reorder operations work against `value` (not `visibleOptions`), so selection indices in the full array are used. Filtering does not remove selected items from `d_selection`.

> **ui-lib-custom divergence:** We implement our own filter function — no dependency on `FilterService`. We support `'contains'` (default) and `'startsWith'` modes. Dot-notation field path resolution is implemented locally. Filter is applied to a `computed` signal signal rather than a mutable `visibleOptions` property.

---

## Drag & Drop

PrimeNG uses `@angular/cdk/drag-drop`:
- `[cdkDropList]` wraps the `<ul>` in the listbox.
- Each item has `[cdkDrag]` with `[cdkDragData]="item"`.
- `onDrop(event: CdkDragDrop)` is called with `{ previousIndex, currentIndex, item.data }`.
- **With filter active:** maps visual indices back to real `value` indices using `findIndexInList` against `visibleOptions`.
- `moveItemInArray(value, previousIndex, currentIndex)` from CDK performs the swap.
- `onReorder` emits `[event.item.data]` (the single dragged item as array).
- Focus is moved to `currentIndex` after drop.

**Behavior to replicate with HTML5 DnD (no CDK):**
- `dragstart`: record dragged item and its index; set `dataTransfer.effectAllowed = 'move'`.
- `dragover`: call `event.preventDefault()` to allow drop; track hover index for visual feedback.
- `drop`: compute source/target indices in `value`; splice item from source, insert at target; emit `valueChange` and `reorder`.
- `dragend`: clear drag state.
- When filter is active: map visible indices to real array indices before performing the splice.

> **ui-lib-custom:** HTML5 DnD only — no CDK dependency. `dragdrop` input (`boolean`, default `false`) enables it.

---

## Selection Model

- Selection is stored as `d_selection: any[]` — an array of item references.
- Item identity is by **object reference** (`===` via `findIndexInList`).
- **Single-item click (metaKeySelection = false, default):**
  - If item is selected → deselect (remove from array).
  - If item is not selected → add to selection (does not clear others — this is effectively multi-select toggle by default).
- **metaKeySelection = true:**
  - Click without Ctrl/Meta → replace selection with just this item.
  - Click with Ctrl/Meta + item selected → deselect.
  - Click with Ctrl/Meta + item not selected → add to selection.
- `insertIntoOrderedArray` is used to maintain selection in the same relative order as in `value`.
- **Touch devices:** `itemTouched = true` after `touchend` overrides `metaKeySelection`, treating it as `false` for that interaction.
- **Ctrl+A (KeyA + ctrlKey):** Selects all items in `value`.

> **ui-lib-custom divergence:** `selection` is a `model<T[]>()` signal input (two-way). We do not expose a separate `selectionChange` EventEmitter — the model signal handles two-way sync. We keep `metaKeySelection` as `input<boolean>()`. Touch detection via `itemTouched` flag is preserved.

---

## Keyboard Interaction

All keyboard events are handled on `keydown` via `onItemKeydown`:

| Key | Condition | Action |
|---|---|---|
| `ArrowDown` | — | Move focus to next visible item |
| `ArrowDown` + `Shift` | — | Move focus + toggle selection of newly focused item |
| `ArrowUp` | — | Move focus to previous visible item |
| `ArrowUp` + `Shift` | — | Move focus + toggle selection of newly focused item |
| `Home` | — | Move focus to first item |
| `Home` + `Ctrl+Shift` | — | Select all items from current focused item to top |
| `End` | — | Move focus to last item |
| `End` + `Ctrl+Shift` | — | Select all items from current focused item to bottom |
| `Enter` | — | Toggle selection of focused item (same as click) |
| `Space` | — | Same as Enter |
| `Space` + `Shift` + selection exists | — | Range-select from last selected item to focused item |
| `Ctrl+A` (`KeyA` + ctrlKey) | — | Select all visible items |

Focus is tracked via `focusedOptionIndex` (the DOM element `id` attribute) and `focusedOption` (the data reference). `changeFocusedOptionIndex` scrolls the focused item into view.

---

## Accessibility Contract

| Element | ARIA Role | Key Attributes |
|---|---|---|
| List container (`<ul>`) | `listbox` | `aria-multiselectable="true"`, `aria-label` or `aria-labelledby` |
| List item (`<li>`) | `option` | `aria-selected="true/false"` |
| Move-up button | `button` | `aria-label` = translated "Move Up" string |
| Move-top button | `button` | `aria-label` = translated "Move to Top" string |
| Move-down button | `button` | `aria-label` = translated "Move Down" string |
| Move-bottom button | `button` | `aria-label` = translated "Move to Bottom" string |
| Filter input | `text` input | `aria-label` via `ariaFilterLabel` |

- Buttons are `disabled` (HTML attribute) when `disabled=true` or selection is empty (`moveDisabled()`).
- Focused option tracked with `aria-activedescendant` on the listbox pointing to the focused item's `id`.
- `autoOptionFocus`: on list focus, if a previously focused or selected item exists, restore focus there; otherwise skip.

> **ui-lib-custom additions:** We will use `LiveAnnouncerService` from `ui-lib-custom/a11y` to announce reorder results (e.g., "Item moved up. Position 2 of 5."). Button `aria-label` inputs will be exposed as component inputs.

---

## Template Slots — Mapping to ui-lib-custom Directive Convention

PrimeNG uses `ngTemplateOutlet` with string-keyed `PrimeTemplate`. We use `@ContentChild` with dedicated directive selectors:

| PrimeNG template name | ui-lib-custom directive selector | Context type |
|---|---|---|
| `item` | `[uiOrderListItem]` | `{ $implicit: T; index: number }` |
| `header` | `[uiOrderListHeader]` | none |
| `empty` | `[uiOrderListEmpty]` | none |
| `emptyfilter` | `[uiOrderListEmptyFilter]` | none |
| `filter` | `[uiOrderListFilter]` | `{ filter: (value?: string) => void; reset: () => void }` |
| `filtericon` | `[uiOrderListFilterIcon]` | none |
| `moveupicon` | `[uiOrderListMoveUpIcon]` | none |
| `movetopicon` | `[uiOrderListMoveTopIcon]` | none |
| `movedownicon` | `[uiOrderListMoveDownIcon]` | none |
| `movebottomicon` | `[uiOrderListMoveBottomIcon]` | none |

Each directive is a lightweight `Directive` that injects its `TemplateRef` and is queried by the parent component with `contentChild(UiOrderListItemDirective)`.

---

## DOM Structure

```
<ui-order-list>                          <!-- host; ViewEncapsulation.None -->
  <div class="uilib-order-list">
    <!-- Controls column (left or right via modifier class) -->
    <div class="uilib-order-list__controls">
      <button aria-label="Move Up">   ↑   </button>
      <button aria-label="Move to Top">  ⇑  </button>
      <button aria-label="Move Down">  ↓   </button>
      <button aria-label="Move to Bottom"> ⇓ </button>
    </div>

    <!-- List column -->
    <div class="uilib-order-list__list-container">
      <!-- Optional header -->
      <div class="uilib-order-list__header"> ... </div>

      <!-- Optional filter row -->
      <div class="uilib-order-list__filter">
        <input type="text" aria-label="..." />
        <span class="uilib-order-list__filter-icon"> ... </span>
      </div>

      <!-- Scrollable list -->
      <ul role="listbox"
          aria-multiselectable="true"
          aria-label="..."
          aria-activedescendant="..."
          class="uilib-order-list__list"
          style="max-height: var(--uilib-order-list-scroll-height)">
        <li *ngFor role="option"
            id="uilib-ol-item-{index}"
            aria-selected="true|false"
            class="uilib-order-list__item [--selected] [--focused] [--striped]"
            draggable="true"  <!-- when dragdrop=true -->
        >
          <!-- item template or default label -->
        </li>
        <!-- empty/emptyfilter slot -->
      </ul>
    </div>
  </div>
</ui-order-list>
```

Layout direction: `display: flex; flex-direction: row` on root; controls column is `flex-direction: column`. Responsive collapse switches root to `flex-direction: column` and controls to `flex-direction: row`.

---

## Divergence Table

| PrimeNG concept | ui-lib-custom equivalent |
|---|---|
| `@Input() value: any[]` (mutable in place) | `value = input<T[]>([])` (signal input, immutable); reorder emits new array via `valueChange = output<T[]>()` |
| `@Input() selection: any[]` + `@Output() selectionChange` | `selection = model<T[]>([])` (two-way signal model) |
| `@Output() onReorder: EventEmitter<any[]>` | `reorder = output<T[]>()` (emits new full array after reorder) |
| `@Output() onSelectionChange` | `selectionChange` automatic from `model()`, plus `selectionChanged = output<OrderListSelectionEvent<T>>()` if event context needed |
| `@Output() onFilterEvent` | `filterChanged = output<OrderListFilterEvent<T>>()` |
| `@Output() onFocus / onBlur` | `listFocus = output<FocusEvent>()` / `listBlur = output<FocusEvent>()` |
| `filterBy` + PrimeNG `FilterService` | Built-in filter logic; `filterBy = input<string>('')`; dot-path resolver implemented locally |
| `filterMatchMode` | `filterMatchMode = input<'contains' \| 'startsWith'>('contains')` (two modes in v1; expand in v2) |
| CDK `dragdrop` | `dragdrop = input<boolean>(false)`; HTML5 DnD implementation |
| `responsive` + injected `<style>` | CSS media query in component SCSS; `responsive = input<boolean>(false)` adds host class |
| `controlsPosition: 'left' \| 'right'` | `controlsPosition = input<'left' \| 'right'>('left')` (same union) |
| `stripedRows: boolean` | `striped = input<boolean>(false)` |
| `scrollHeight: string` | `scrollHeight = input<string>('14rem')` mapped to `--uilib-order-list-scroll-height` CSS var |
| `breakpoint: string` | `breakpoint = input<string>('960px')` (applied via host style binding if responsive) |
| `autoOptionFocus: boolean` | `autoOptionFocus = input<boolean>(true)` |
| `metaKeySelection: boolean` | `metaKeySelection = input<boolean>(false)` |
| `disabled: boolean` | `disabled = input<boolean>(false)` |
| `tabindex: number` | `tabindex = input<number>(0)` |
| `ariaLabel: string` | `ariaLabel = input<string \| undefined>(undefined)` |
| `ariaLabelledBy: string` | `ariaLabelledBy = input<string \| undefined>(undefined)` |
| `ariaFilterLabel: string` | `ariaFilterLabel = input<string \| undefined>(undefined)` |
| `header: string` | `header = input<string \| undefined>(undefined)` |
| `trackBy: Function` | `trackBy = input<TrackByFunction<T>>((_, item) => item)` |
| `PrimeTemplate` content children | Dedicated directive per slot (see template slot table above) |
| `buttonProps` / `moveXButtonProps` | **Not ported in v1.** Control buttons use built-in `ui-lib-button` with standard size/variant from parent. Expose in v2 if needed. |
| `listStyle` / `style` / `styleClass` | **Not ported.** Callers use CSS variables and host class overrides. |
| `BaseComponent` inheritance | `standalone: true` component, `ViewEncapsulation.None`, `ChangeDetectionStrategy.OnPush` |
| No size input | `size = input<'sm' \| 'md' \| 'lg'>('md')` — standard library size token |
| No variant input | `variant = input<'material' \| 'bootstrap' \| 'minimal'>('material')` — resolved via `ThemeConfigService` if not provided |
| Announce on reorder | `LiveAnnouncerService` from `ui-lib-custom/a11y` — announce "Moved up. Position X of Y." |

---

## Reusable Library Utilities

| Utility | Import path | Usage in OrderList |
|---|---|---|
| `KEYBOARD_KEYS` | `ui-lib-custom/core` | Key-code constants for keydown handler |
| `LiveAnnouncerService` | `ui-lib-custom/a11y` | Announce reorder results to screen readers |
| `ThemeConfigService` | `ui-lib-custom/theme` | Read global variant/mode signals for CSS class resolution |

---

## Deferred Features (v2)

| Feature | Reason deferred |
|---|---|
| Virtual scroll | Requires additional viewport manager; adds complexity |
| `responsive` breakpoint media-query injection via JS `<style>` | Replace with pure CSS media query in SCSS using CSS custom property for breakpoint |
| `filterMatchMode` modes beyond `'contains'` and `'startsWith'` | Low usage; expand in v2 |
| `buttonProps` / per-button `ButtonProps` overrides | Rarely needed; expose in v2 |
| CDK drag-and-drop interop | Out of scope — HTML5 DnD covers core use cases |
| Drag handle customization (custom drag-handle template) | Deferred; default drag-cursor on entire row for v1 |
| Programmatic `scrollHeight: 'flex'` (viewport-fill mode) | Deferred |
| `ariaLabelledBy` wiring | v1 supports `ariaLabel`; `ariaLabelledBy` deferred as optional enhancement |
| `listStyle` / `style` / `styleClass` pass-through | Anti-pattern in this library; use CSS variables instead |
| `autoOptionFocus = false` shortcut focus path | v1 always attempts focus restore; configurable in v2 |

