# Component Quality Scores

> **Purpose:** Single source of truth for quality scorecard results across all library components.
> Updated whenever a component completes a phase of the evolution workflow.
> The hardening queue below is the active prioritized backlog — work top to bottom.

**Gate:** A component is only considered production-quality when every category scores **≥ 8**.
**Prompt:** Run the 6-phase evolution workflow from [`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`](prompts/COMPONENT_EVOLUTION_PROMPTS.md).

---

## Hardening Queue

Work top to bottom. Priority is driven by the current committed wow factor — **Elite Accessibility** — so components with the most complex ARIA patterns and keyboard interactions lead. Within each tier, higher-usage components come first.

### Tier 1 — Overlays & Dialogs
*Focus: Focus trap correctness, scroll lock, Escape handling, `aria-modal`, `role=dialog/alertdialog`, animation reduced-motion.*

| #   | Component     | Key a11y concern                                                       | Status     |
|-----|---------------|------------------------------------------------------------------------|------------|
| 1   | Dialog        | Focus trap, `aria-modal`, `role=dialog`, restores focus on close       | ✅ Done     |
| 2   | Select        | Combobox/listbox ARIA pattern — the hardest form control to get right  | ✅ Done     |
| 3   | AutoComplete  | Combobox with live region announcements, `aria-activedescendant`       | ✅ Done     |
| 4   | DynamicDialog | Same as Dialog + programmatic creation lifecycle                       | ✅ Done     |
| 5   | Drawer        | Side dialog, focus management, `aria-modal`                            | ✅ Done     |
| 6   | ConfirmDialog | `role=alertdialog`, default focus on confirm action, focus restoration | ✅ Done     |
| 7   | ConfirmPopup  | `role=alertdialog` anchored, click-away without losing a11y            | ✅ Done     |
| 8   | Popover       | `aria-expanded`, `aria-controls`, dismiss without losing focus context | ✅ Done     |
| 9   | Tooltip       | `aria-describedby` lifecycle — attached and cleaned up correctly       | ⏳ Queued   |
| 10  | Toast         | Live region (`aria-live=assertive`), dismiss keyboard access           | ⏳ Queued   |

### Tier 2 — Navigation & Menu Patterns
*Focus: `role=menu/menubar/menuitem`, arrow key navigation, `aria-expanded` on submenus, `aria-current` on active items.*

| #    | Component   | Key a11y concern                                                                | Status     |
|------|-------------|---------------------------------------------------------------------------------|------------|
| 11   | Menubar     | `role=menubar`, full arrow-key nav, `aria-haspopup`, submenu keyboard control   | ⏳ Queued   |
| 12   | Menu        | `role=menu`, keyboard nav, separator roles                                      | ⏳ Queued   |
| 13   | TieredMenu  | Nested `role=menu`, left-arrow closes submenu                                   | ⏳ Queued   |
| 14   | ContextMenu | Same as TieredMenu + trigger element `aria-haspopup=menu`                       | ⏳ Queued   |
| 15   | PanelMenu   | Mixed menubar + tree pattern, `aria-expanded` on panels                         | ⏳ Queued   |
| 16   | MegaMenu    | Wide menu layout, keyboard trapping within columns                              | ⏳ Queued   |
| 17   | Tabs        | `role=tablist/tab/tabpanel`, arrow nav, `aria-selected`                         | ⏳ Queued   |
| 18   | Accordion   | `role=button` on headers, `aria-expanded`, `aria-controls`                      | ⏳ Queued   |
| 19   | Stepper     | `role=tablist` variant, `aria-current=step`, linear mode enforcement            | ⏳ Queued   |
| 20   | Breadcrumb  | `role=navigation`, `aria-label`, `aria-current=page` on last item               | ⏳ Queued   |

### Tier 3 — Form Controls
*Focus: Label association, validation state announcements, group roles, indeterminate states.*

| #    | Component     | Key a11y concern                                                           | Status     |
|------|---------------|----------------------------------------------------------------------------|------------|
| 21   | Input         | Label association, `aria-invalid`, `aria-describedby` for error messages   | ⏳ Queued   |
| 22   | Checkbox      | `aria-checked=mixed` for indeterminate, group with `role=group`            | ⏳ Queued   |
| 23   | RadioButton   | `role=radiogroup`, `aria-required`, keyboard focus between siblings        | ⏳ Queued   |
| 24   | DatePicker    | Extremely complex — calendar grid, month/year navigation, live region      | ⏳ Queued   |
| 25   | CascadeSelect | Multi-level combobox — `aria-activedescendant` through levels              | ⏳ Queued   |
| 26   | InputNumber   | Spinner buttons, `role=spinbutton`, `aria-valuenow/min/max`                | ⏳ Queued   |
| 27   | Slider        | `role=slider`, `aria-valuenow/min/max/valuetext`, arrow key step           | ⏳ Queued   |
| 28   | ColorPicker   | Complex custom widget, keyboard access to hue/saturation/hex input         | ⏳ Queued   |
| 29   | Password      | Strength meter live region, toggle visibility button label                 | ⏳ Queued   |
| 30   | Rating        | `role=radiogroup` pattern or `role=slider`, keyboard interaction           | ⏳ Queued   |
| 31   | Knob          | `role=slider`, `aria-valuenow`, drag-and-keyboard equivalence              | ⏳ Queued   |

### Tier 4 — Data Display
*Focus: Grid/treegrid roles, sortable column headers, selection announcements, live regions.*

| #    | Component  | Key a11y concern                                                                | Status     |
|------|------------|---------------------------------------------------------------------------------|------------|
| 32   | Table      | `role=grid`, column sort `aria-sort`, row selection `aria-selected`, pagination | ⏳ Queued   |
| 33   | TreeTable  | `role=treegrid`, `aria-level/expanded/setsize/posinset`                         | ⏳ Queued   |
| 34   | Tree       | `role=tree/treeitem`, full keyboard nav (arrows + Home/End + Type-ahead)        | ⏳ Queued   |
| 35   | TreeSelect | Tree inside a popup — combines combobox + tree patterns                         | ⏳ Queued   |
| 36   | Listbox    | `role=listbox`, `aria-multiselectable`, keyboard selection                      | ⏳ Queued   |
| 37   | Paginator  | Live region announcing page change, button labels                               | ⏳ Queued   |
| 38   | DataView   | Sort/filter control labels, list/grid toggle announcement                       | ⏳ Queued   |
| 39   | OrderList  | Drag-and-drop a11y, keyboard reorder alternative                                | ⏳ Queued   |
| 40   | PickList   | Dual-list pattern, transfer action announcements                                | ⏳ Queued   |

### Tier 5 — Feedback, Status & Foundational
*Focus: Live regions, icon-only button labels, landmark roles, reduced motion.*

| #    | Component       | Key a11y concern                                                                    | Status     |
|------|-----------------|-------------------------------------------------------------------------------------|------------|
| 41   | Button          | `aria-disabled` vs `disabled`, icon-only `aria-label`, loading state announcement   | ⏳ Queued   |
| 42   | Alert           | `role=alert` vs `role=status`, dismiss button label                                 | ⏳ Queued   |
| 43   | Message         | Same as Alert — live region role correctness                                        | ⏳ Queued   |
| 44   | ProgressBar     | `role=progressbar`, `aria-valuenow/min/max`, indeterminate labeling                 | ⏳ Queued   |
| 45   | Carousel        | `role=region`, slide announcement, prev/next button labels                          | ⏳ Queued   |
| 46   | Galleria        | Lightbox keyboard trap, image alt text propagation                                  | ⏳ Queued   |
| 47   | SpeedDial       | `aria-expanded`, icon-only action button labels                                     | ⏳ Queued   |
| 48   | SelectButton    | `role=group` of toggle buttons, `aria-pressed`                                      | ⏳ Queued   |
| 49   | InputOtp        | Sequential focus management, paste handling announcement                            | ⏳ Queued   |
| 50   | VirtualScroller | Accessible scroll region, keyboard scrolling                                        | ⏳ Queued   |

### Tier 6 — Layout, Utility & Polish
*Standard hardening — API, DX, theming, and polish pass. A11y concerns are minimal.*

| #    | Component       | Primary focus                                             | Status     |
|------|-----------------|-----------------------------------------------------------|------------|
| 51   | Card            | API composability, slot flexibility, hover/focus polish   | ⏳ Queued   |
| 52   | Badge           | Positioning variants, `aria-label` passthrough            | ⏳ Queued   |
| 53   | Tag             | Dismissible variant `aria-label`                          | ⏳ Queued   |
| 54   | Chip            | Remove button label, image alt passthrough                | ⏳ Queued   |
| 55   | Skeleton        | `aria-busy` on container, `aria-hidden` on placeholder    | ⏳ Queued   |
| 56   | ProgressSpinner | `role=status`, `aria-label`                               | ⏳ Queued   |
| 57   | MeterGroup      | Segment `aria-label` values, totals announced             | ⏳ Queued   |
| 58   | Divider         | `role=separator` + `aria-orientation`                     | ⏳ Queued   |
| 59   | Toolbar         | `role=toolbar`, `aria-label`                              | ⏳ Queued   |
| 60   | Panel           | `role=region`, `aria-labelledby`, toggle `aria-expanded`  | ⏳ Queued   |
| 61   | Fieldset        | `role=group`, native fieldset/legend semantics            | ⏳ Queued   |
| 62   | ScrollPanel     | Keyboard-scrollable region label                          | ⏳ Queued   |
| 63   | Inplace         | Display/edit toggle `aria-expanded`                       | ⏳ Queued   |
| 64   | BlockUI         | `aria-busy` on blocked container                          | ⏳ Queued   |
| 65   | Avatar          | `alt` propagation, group context                          | ⏳ Queued   |
| 66   | Image           | Alt text, preview dialog a11y                             | ⏳ Queued   |
| 67   | ImageCompare    | Slider `role=slider` + `aria-valuetext`                   | ⏳ Queued   |
| 68   | SplitButton     | Dropdown trigger `aria-haspopup`, menu keyboard nav       | ⏳ Queued   |
| 69   | Upload          | Drop zone announcement, file list management              | ⏳ Queued   |
| 70   | Terminal        | `role=log`, command input labeling                        | ⏳ Queued   |
| 71   | Timeline        | Semantic list structure, orientation                      | ⏳ Queued   |
| 72   | Chart           | Accessible data table alternative, `aria-label`           | ⏳ Queued   |
| 73   | FocusTrap       | Correct sentinel node strategy                            | ⏳ Queued   |
| 74   | Ripple          | Motion respects `prefers-reduced-motion`                  | ⏳ Queued   |
| 75   | ScrollTop       | `aria-label` on button                                    | ⏳ Queued   |
| 76   | BottomSheet     | `role=dialog`, focus management                           | ⏳ Queued   |

> **Queue status key:** ⏳ Queued · 🔄 In progress · ✅ Done (all scores ≥ 8)

---

## Status Key

| Symbol | Meaning                                            |
|--------|----------------------------------------------------|
| 🔴     | Not yet scored — built but not formally evaluated  |
| 🟡     | In progress — partially scored, evolution underway |
| 🟢     | Complete — all 10 categories ≥ 8                   |

---

## Score Columns

`API` · `A11y` · `Perf` · `Comp` (Composability) · `Theme` · `DX` · `Docs` · `Polish` · `Angular` · `Feel` (Emotional quality)

Scores are integers 1–10. `—` means not yet evaluated.

---

## Core Inputs

| Component     | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|---------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Button        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Input         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Textarea      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Select        | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| AutoComplete  | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| CascadeSelect | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Checkbox      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| RadioButton   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ToggleButton  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ToggleSwitch  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| SelectButton  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputNumber   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputMask     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputOtp      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Password      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Rating        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Knob          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Slider        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ColorPicker   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| KeyFilter     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Layout

| Component   | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Stack       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Inline      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Grid        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Container   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| FloatLabel  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| IconField   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputGroup  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| FormField   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Divider     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Toolbar     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Fluid       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Fieldset    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Panel       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ScrollPanel | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Overlay & Modal

| Component     | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|---------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Dialog        | 9   | 9    | 8    | 9    | 8     | 9   | 8    | 9      | 9       | 8    | 8.6 | 🟢     |
| DynamicDialog | 9   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.3 | 🟢     |
| Drawer        | 9   | 9    | 8    | 8    | 9     | 8   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| BottomSheet   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Popover       | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Tooltip       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ConfirmDialog | 9   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.3 | 🟢     |
| ConfirmPopup  | 9   | 9    | 9    | 9    | 9     | 8   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |

## Navigation & Menus

| Component   | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Tabs        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Accordion   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Breadcrumb  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ContextMenu | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Dock        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Menu        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| MegaMenu    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Menubar     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| PanelMenu   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| TieredMenu  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Stepper     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| SpeedDial   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Data Display

| Component         | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Table             | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| TreeTable         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Tree              | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| TreeSelect        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Listbox           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| DataView          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| VirtualScroller   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Timeline          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| OrderList         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| OrganizationChart | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| PickList          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Paginator         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Carousel          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Galleria          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Chart             | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Feedback & Status

| Component       | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-----------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Alert           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Toast           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Badge           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Tag             | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Chip            | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Message         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Skeleton        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ProgressBar     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ProgressSpinner | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| MeterGroup      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Utilities & Directives

| Component       | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-----------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Card            | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Avatar          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Icon            | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| IconButton      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ButtonGroup     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| SplitButton     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Image           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ImageCompare    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Upload          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Inplace         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| BlockUI         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ClassNames      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Terminal        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Ripple          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ScrollTop       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| StyleClass      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| FocusTrap       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| AnimateOnScroll | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| AutoFocus       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Bind            | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Fluid           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

---

## How to Score a Component

Run the component through the 6-phase evolution workflow in [`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`](prompts/COMPONENT_EVOLUTION_PROMPTS.md), then fill in each category:

| Category    | What ≥ 8 looks like                                                                                                               |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **API**     | Inputs/outputs feel obvious without reading docs; naming is consistent with the rest of the library; defaults are intelligent     |
| **A11y**    | Full keyboard nav, correct ARIA, screen reader tested, reduced motion, high contrast — zero axe-core violations                   |
| **Perf**    | No unnecessary renders, signals used correctly, no memory leaks, tree-shaking verified, animations use `will-change` sparingly    |
| **Comp**    | Content projection slots are sufficient; developer can extend behavior without forking; directive alternatives exist where useful |
| **Theme**   | All visual properties exposed as `--uilib-<component>-*` CSS vars; dark mode works; runtime variant switching works               |
| **DX**      | TypeScript autocomplete is excellent; error states are clear; common use case requires ≤3 lines of consumer code                  |
| **Docs**    | README has selector, all inputs/outputs, content projection, usage example, a11y notes, and edge cases                            |
| **Polish**  | Animations feel smooth and intentional; interactions have perceptible feedback; no jarring reflows                                |
| **Angular** | Signals-first, OnPush, standalone, SSR-safe, hydration-safe, zoneless-compatible                                                  |
| **Feel**    | Using the component feels satisfying — it would make a developer smile, not just work                                             |

---

## Scoring Session Template

When running an evolution session, copy this into your working notes:

```
Component: <name>
Date: YYYY-MM-DD
Phase completed: <1–6 or All>

API:     /10
A11y:    /10
Perf:    /10
Comp:    /10
Theme:   /10
DX:      /10
Docs:    /10
Polish:  /10
Angular: /10
Feel:    /10
Avg:     /10

Status: 🔴 / 🟡 / 🟢
Notes: <what was improved, what remains>
```

Then update the table above and record the session in `AI_AGENT_CONTEXT.md`.

---

## Related Documents

| Document                                                                | Relevance                                            |
|-------------------------------------------------------------------------|------------------------------------------------------|
| [Component Evolution Prompts](prompts/COMPONENT_EVOLUTION_PROMPTS.md)   | The 6-phase AI workflow that produces these scores   |
| [Vision — Component Philosophy](VISION.md#component-philosophy)         | The 10-layer quality model and ≥8 gate               |
| [Accessibility Guide](reference/systems/ACCESSIBILITY.md)               | Detail behind the A11y score category                |

