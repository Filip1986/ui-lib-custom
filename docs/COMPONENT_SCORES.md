# Component Quality Scores

> **Purpose:** Single source of truth for quality scorecard results across all library components.
> Updated whenever a component completes a phase of the evolution workflow.
> The hardening queue below is the active prioritized backlog — work top to bottom.

**Gate:** A component is only considered production-quality when every category scores **≥ 8** (11 categories total).
**Criteria:** [`docs/SCORING_CRITERIA.md`](SCORING_CRITERIA.md) — the canonical checklist defining what each score number means. A score is a count of verified checkboxes, not a gut feeling.
**Prompt:** Run the 6-phase evolution workflow from [`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`](prompts/COMPONENT_EVOLUTION_PROMPTS.md).
**Benchmarks:** [`docs/COMPETITIVE_BENCHMARKS.md`](COMPETITIVE_BENCHMARKS.md) — per-component parity tables (Category 11 evidence).

---

## Hardening Queue

Work top to bottom. Priority is driven by the current committed wow factor — **Elite Accessibility** — so components with the most complex ARIA patterns and keyboard interactions lead. Within each tier, higher-usage components come first.

> **Status key for this queue:** ✅ Done = all 10 scores ≥ 8 recorded in tables below · ⏳ Needs hardening = prompt exists in `docs/prompts/needs-hardening/` · 🔄 In progress

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
| 9   | Tooltip       | `aria-describedby` lifecycle — attached and cleaned up correctly       | ✅ Done     |
| 10  | Toast         | Live region (`aria-live=assertive`), dismiss keyboard access           | ✅ Done     |

### Tier 2 — Navigation & Menu Patterns
*Focus: `role=menu/menubar/menuitem`, arrow key navigation, `aria-expanded` on submenus, `aria-current` on active items.*

| #    | Component   | Key a11y concern                                                                | Status       |
|------|-------------|---------------------------------------------------------------------------------|--------------|
| 11   | Menubar     | `role=menubar`, full arrow-key nav, `aria-haspopup`, submenu keyboard control   | ✅ Done       |
| 12   | Menu        | `role=menu`, keyboard nav, separator roles                                      | ✅ Done       |
| 13   | TieredMenu  | Nested `role=menu`, left-arrow closes submenu                                   | ✅ Done       |
| 14   | ContextMenu | Same as TieredMenu + trigger element `aria-haspopup=menu`                       | ✅ Done       |
| 15   | PanelMenu   | Mixed menubar + tree pattern, `aria-expanded` on panels                         | ✅ Done       |
| 16   | MegaMenu    | Wide menu layout, keyboard trapping within columns                              | ✅ Done       |
| 17   | Tabs        | `role=tablist/tab/tabpanel`, arrow nav, `aria-selected`                         | ✅ Done       |
| 18   | Accordion   | `role=button` on headers, `aria-expanded`, `aria-controls`                      | ✅ Done       |
| 19   | Stepper     | `role=tablist` variant, `aria-current=step`, linear mode enforcement            | ✅ Done       |
| 20   | Breadcrumb  | `role=navigation`, `aria-label`, `aria-current=page` on last item               | ✅ Done       |

### Tier 3 — Form Controls
*Focus: Label association, validation state announcements, group roles, indeterminate states.*

| #    | Component     | Key a11y concern                                                           | Status            |
|------|---------------|----------------------------------------------------------------------------|-------------------|
| 21   | Input         | Label association, `aria-invalid`, `aria-describedby` for error messages   | ✅ Done            |
| 22   | Checkbox      | `aria-checked=mixed` for indeterminate, group with `role=group`            | ✅ Done            |
| 23   | RadioButton   | `role=radiogroup`, `aria-required`, keyboard focus between siblings        | ✅ Done            |
| 24   | DatePicker    | Extremely complex — calendar grid, month/year navigation, live region      | ✅ Done            |
| 25   | CascadeSelect | Multi-level combobox — `aria-activedescendant` through levels              | ✅ Done            |
| 26   | InputNumber   | Spinner buttons, `role=spinbutton`, `aria-valuenow/min/max`                | ✅ Done            |
| 27   | Slider        | `role=slider`, `aria-valuenow/min/max/valuetext`, arrow key step           | ✅ Done            |
| 28   | ColorPicker   | Complex custom widget, keyboard access to hue/saturation/hex input         | ✅ Done            |
| 29   | Password      | Strength meter live region, toggle visibility button label                 | ✅ Done            |
| 30   | Rating        | `role=radiogroup` pattern or `role=slider`, keyboard interaction           | ✅ Done            |
| 31   | Knob          | `role=slider`, `aria-valuenow`, drag-and-keyboard equivalence              | ✅ Done            |

### Tier 4 — Data Display
*Focus: Grid/treegrid roles, sortable column headers, selection announcements, live regions.*

| #    | Component  | Key a11y concern                                                                | Status            |
|------|------------|---------------------------------------------------------------------------------|-------------------|
| 32   | Table      | `role=grid`, column sort `aria-sort`, row selection `aria-selected`, pagination | ✅ Done            |
| 33   | TreeTable  | `role=treegrid`, `aria-level/expanded/setsize/posinset`                         | ✅ Done            |
| 34   | Tree       | `role=tree/treeitem`, full keyboard nav (arrows + Home/End + Type-ahead)        | ✅ Done            |
| 35   | TreeSelect | Tree inside a popup — combines combobox + tree patterns                         | ✅ Done            |
| 36   | Listbox    | `role=listbox`, `aria-multiselectable`, keyboard selection                      | ✅ Done            |
| 37   | Paginator  | Live region announcing page change, button labels                               | ✅ Done            |
| 38   | DataView   | Sort/filter control labels, list/grid toggle announcement                       | ✅ Done            |
| 39   | OrderList  | Drag-and-drop a11y, keyboard reorder alternative                                | ✅ Done            |
| 40   | PickList   | Dual-list pattern, transfer action announcements                                | ✅ Done            |

### Tier 5 — Feedback, Status & Foundational
*Focus: Live regions, icon-only button labels, landmark roles, reduced motion.*

| #    | Component       | Key a11y concern                                                                    | Status       |
|------|-----------------|-------------------------------------------------------------------------------------|--------------|
| 41   | Button          | `aria-disabled` vs `disabled`, icon-only `aria-label`, loading state announcement   | ✅ Done       |
| 42   | Alert           | `role=alert` vs `role=status`, dismiss button label                                 | ✅ Done       |
| 43   | Message         | Same as Alert — live region role correctness                                        | ✅ Done       |
| 44   | ProgressBar     | `role=progressbar`, `aria-valuenow/min/max`, indeterminate labeling                 | ✅ Done       |
| 45   | Carousel        | `role=region`, slide announcement, prev/next button labels                          | ✅ Done       |
| 46   | Galleria        | Lightbox keyboard trap, image alt text propagation                                  | ✅ Done       |
| 47   | SpeedDial       | `aria-expanded`, icon-only action button labels                                     | ✅ Done       |
| 48   | SelectButton    | `role=group` of toggle buttons, `aria-pressed`                                      | ✅ Done       |
| 49   | InputOtp        | Sequential focus management, paste handling announcement                            | ✅ Done       |
| 50   | VirtualScroller | Accessible scroll region, keyboard scrolling                                        | ✅ Done       |

### Tier 6 — Layout, Utility & Polish
*Standard hardening — API, DX, theming, and polish pass. A11y concerns are minimal.*

| #    | Component       | Primary focus                                             | Status            |
|------|-----------------|-----------------------------------------------------------|-------------------|
| 51   | Card            | API composability, slot flexibility, hover/focus polish   | ✅ Done            |
| 52   | Badge           | Positioning variants, `aria-label` passthrough            | ✅ Done            |
| 53   | Tag             | Dismissible variant `aria-label`                          | ✅ Done            |
| 54   | Chip            | Remove button label, image alt passthrough                | ✅ Done            |
| 55   | Skeleton        | `aria-busy` on container, `aria-hidden` on placeholder    | ✅ Done            |
| 56   | ProgressSpinner | `role=status`, `aria-label`                               | ✅ Done            |
| 57   | MeterGroup      | Segment `aria-label` values, totals announced             | ✅ Done            |
| 58   | Divider         | `role=separator` + `aria-orientation`                     | ✅ Done            |
| 59   | Toolbar         | `role=toolbar`, `aria-label`                              | ✅ Done            |
| 60   | Panel           | `role=region`, `aria-labelledby`, toggle `aria-expanded`  | ✅ Done            |
| 61   | Fieldset        | `role=group`, native fieldset/legend semantics            | ✅ Done            |
| 62   | ScrollPanel     | Keyboard-scrollable region label                          | ✅ Done            |
| 63   | Inplace         | Display/edit toggle `aria-expanded`                       | ✅ Done            |
| 64   | BlockUI         | `aria-busy` on blocked container                          | ✅ Done            |
| 65   | Avatar          | `alt` propagation, group context                          | ✅ Done            |
| 66   | Image           | Alt text, preview dialog a11y                             | ✅ Done            |
| 67   | ImageCompare    | Slider `role=slider` + `aria-valuetext`                   | ✅ Done            |
| 68   | SplitButton     | Dropdown trigger `aria-haspopup`, menu keyboard nav       | ✅ Done            |
| 69   | Upload          | Drop zone announcement, file list management              | ✅ Done            |
| 70   | Terminal        | `role=log`, command input labeling                        | ✅ Done            |
| 71   | Timeline        | Semantic list structure, orientation                      | ✅ Done            |
| 72   | Chart           | Accessible data table alternative, `aria-label`           | ✅ Done            |
| 73   | FocusTrap       | Correct sentinel node strategy                            | ✅ Done            |
| 74   | Ripple          | Motion respects `prefers-reduced-motion`                  | ✅ Done            |
| 75   | ScrollTop       | `aria-label` on button                                    | ✅ Done            |
| 76   | BottomSheet     | `role=dialog`, focus management                           | ✅ Done            |

### New Components (not in original 76-item queue — built but not yet formally scored)

| Component         | Key a11y concern                                                                                    | Status                 |
|-------------------|-----------------------------------------------------------------------------------------------------|------------------------|
| Textarea          | Label, aria-invalid, aria-readonly, resize a11y                                                     | ✅ Done (8.7)           |
| ToggleButton      | `aria-pressed`, icon-only `aria-label`                                                              | ✅ Done (8.8)           |
| ToggleSwitch      | `role=switch`, `aria-checked`, Space key                                                            | ✅ Done (8.8)           |
| InputMask         | Format hint `aria-describedby`, `aria-invalid`                                                      | ✅ Done (8.7)           |
| KeyFilter         | Format hint, silent block communication                                                             | ✅ Done (8.8)           |
| FormField         | Full label+error+hint chain orchestration                                                           | ✅ Done                 |
| FloatLabel        | Real label element, floated contrast ≥ 11px                                                         | ⏳ Needs hardening (🔴) |
| InputGroup        | Decorative addons `aria-hidden`, button addon labels                                                | ✅ Done                 |
| IconField         | Icon `aria-hidden` if decorative, no focus intercept                                                | ✅ Done                 |
| Stack             | No landmark pollution, `as` tag semantics                                                           | ✅ Done (9.0)           |
| Inline            | No landmark pollution, wrap + reading order                                                         | ✅ Done                 |
| Grid              | Visual vs DOM order constraint, no overflow clipping                                                | ✅ Done (9.0)           |
| Container         | No clipping, skip-link target compatibility                                                         | ✅ Done                 |
| Fluid             | 400% zoom reflow (WCAG 1.4.10)                                                                      | ✅ Done                 |
| Dock              | `<nav>` with `aria-label`, item labels, `aria-hidden` icons, disabled button/anchor, reduced-motion | ✅ Done (9.0)           |
| OrganizationChart | `role=tree/treeitem`, full keyboard nav                                                             | ✅ Done (8.3)           |
| Icon              | `aria-hidden` by default, informative mode `aria-label`                                             | ⏳ Needs hardening (🔴) |
| IconButton        | `aria-label` MANDATORY, icon `aria-hidden` inside                                                   | ⏳ Needs hardening (🔴) |
| ButtonGroup       | `role=group` with `aria-label`                                                                      | ✅ Done                 |
| StyleClass        | `aria-expanded` on trigger, `aria-hidden` on target                                                 | ✅ Done (8.7)           |
| AnimateOnScroll   | `prefers-reduced-motion` (CRITICAL — skip all animation)                                            | ✅ Done                 |
| AutoFocus         | Only once on mount, no focus theft from dialogs                                                     | ⏳ Needs hardening (🔴) |
| ClassNames        | No ARIA interference                                                                                | ✅ Done (9.1)           |
| Bind              | No ARIA interference                                                                                | ✅ Done (8.6)           |

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
| Button        | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| Input         | 9   | 9    | 9    | 8    | 8     | 9   | 9    | 9      | 9       | 9    | 8.8 | 🟢     |
| Textarea      | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| Select        | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| AutoComplete  | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| CascadeSelect | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| Checkbox      | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| RadioButton   | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 8    | 8.8 | 🟢     |
| ToggleButton  | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| ToggleSwitch  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| SelectButton  | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| InputNumber   | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| InputMask     | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| InputOtp      | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| Password      | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| Rating        | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| Knob          | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| Slider        | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 8      | 9       | 8    | 8.8 | 🟢     |
| ColorPicker   | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| KeyFilter     | 9   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |

## Layout

| Component   | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Card        | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Stack       | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Inline      | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Grid        | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Container   | 9   | 9    | 9    | 9    | 8     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| FloatLabel  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| IconField   | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| InputGroup  | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| FormField   | 9   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 9    | 8.7 | 🟢     |
| Divider     | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| Toolbar     | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| Fluid       | 9   | 9    | 9    | 9    | 8     | 9   | 8    | 9      | 9       | 8    | 8.7 | 🟢     |
| Fieldset    | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Panel       | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| ScrollPanel | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |

## Overlay & Modal

| Component     | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|---------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Dialog        | 9   | 9    | 8    | 9    | 8     | 9   | 8    | 9      | 9       | 8    | 8.6 | 🟢     |
| DynamicDialog | 9   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.3 | 🟢     |
| Drawer        | 9   | 9    | 8    | 8    | 9     | 8   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| BottomSheet   | 8   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| Popover       | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Tooltip       | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| ConfirmDialog | 9   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.3 | 🟢     |
| ConfirmPopup  | 9   | 9    | 9    | 9    | 9     | 8   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |

## Navigation & Menus

| Component   | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Tabs        | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Accordion   | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Breadcrumb  | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| ContextMenu | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Dock        | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Menu        | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| MegaMenu    | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Menubar     | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| PanelMenu   | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| TieredMenu  | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| Stepper     | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| SpeedDial   | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 8      | 9       | 8    | 8.8 | 🟢     |

## Data Display

| Component         | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Table             | 9   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| TreeTable         | 9   | 9    | 8    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| Tree              | 9   | 8    | 9    | 9    | 9     | 9   | 8    | 8      | 9       | 8    | 8.6 | 🟢     |
| TreeSelect        | 9   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| Listbox           | 9   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| DataView          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 | 🟢     |
| VirtualScroller   | 8   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| Timeline          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 | 🟢     |
| OrderList         | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| OrganizationChart | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 | 🟢     |
| PickList          | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| Paginator         | 8   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| Carousel          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 | 🟢     |
| Galleria          | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 | 🟢     |
| Chart             | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |

## Feedback & Status

| Component       | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-----------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Alert           | 9   | 9    | 8    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| Toast           | 9   | 10   | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.1 | 🟢     |
| Badge           | 8   | 9    | 9    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.4 | 🟢     |
| Tag             | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| Chip            | 9   | 9    | 8    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.5 | 🟢     |
| Message         | 9   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| Skeleton        | 9   | 9    | 9    | 8    | 9     | 8   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| ProgressBar     | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| ProgressSpinner | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| MeterGroup      | 8   | 9    | 8    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.3 | 🟢     |

## Utilities & Directives

| Component       | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-----------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Avatar          | 8   | 9    | 8    | 8    | 8     | 8   | 8    | 8      | 9       | 8    | 8.2 | 🟢     |
| Icon            | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| IconButton      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ButtonGroup     | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| SplitButton     | 9   | 9    | 8    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| Image           | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| ImageCompare    | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| Upload          | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| Inplace         | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| BlockUI         | 9   | 9    | 9    | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.0 | 🟢     |
| ClassNames      | 9   | 9    | 10   | 9    | 9     | 9   | 9    | 9      | 9       | 9    | 9.1 | 🟢     |
| Terminal        | 9   | 9    | 9    | 8    | 9     | 9   | 9    | 9      | 9       | 9    | 8.9 | 🟢     |
| Ripple          | 8   | 9    | 9    | 8    | 8     | 9   | 9    | 9      | 9       | 9    | 8.7 | 🟢     |
| ScrollTop       | 8   | 9    | 8    | 8    | 9     | 8   | 9    | 8      | 9       | 8    | 8.4 | 🟢     |
| StyleClass      | 9   | 9    | 9    | 9    | 8     | 9   | 9    | 8      | 9       | 8    | 8.7 | 🟢     |
| FocusTrap       | 8   | 9    | 9    | 8    | 8     | 8   | 9    | 8      | 9       | 8    | 8.4 | 🟢     |
| AnimateOnScroll | 9   | 9    | 9    | 8    | 8     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |
| AutoFocus       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Bind            | 8   | 9    | 9    | 9    | 8     | 9   | 9    | 8      | 9       | 8    | 8.6 | 🟢     |

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

| Document                                                                    | Relevance                                                                                                |
|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| [Hardening Prompt Index](prompts/HARDENING_PROMPT_INDEX.md)                 | **Reconciled 2026-05-13** — index of all session prompts, split into `completed/` and `needs-hardening/` |
| [Component Evolution Prompts](prompts/COMPONENT_EVOLUTION_PROMPTS.md)       | The 6-phase AI workflow + accumulated lessons from all hardenings                                        |
| [Vision — Component Philosophy](VISION.md#component-philosophy)             | The 10-layer quality model and ≥8 gate                                                                   |
| [Accessibility Guide](reference/systems/ACCESSIBILITY.md)                   | Detail behind the A11y score category                                                                    |
