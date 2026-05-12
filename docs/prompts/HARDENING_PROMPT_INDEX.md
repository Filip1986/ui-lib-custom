# Hardening Prompt Index

> **Purpose:** Single index of all component hardening session prompts.
> Work top to bottom within each tier. Each prompt file is a self-contained session guide.
>
> **Format convention:**
> - Files in `docs/prompts/` root = full prescriptive prompts with exact code fixes (early Tier 1–2 hardenings)
> - Files in `docs/prompts/sessions/` = structured session prompts with pre-identified issues, used as-is with source pasted in

---

## Completed Hardenings (already in `docs/COMPONENT_SCORES.md` as ✅ Done)

| Component | Tier | Prompt File |
|-----------|------|-------------|
| Dialog | Tier 1 #1 | `sessions/SESSION_START_DIALOG_HARDENING.md` |
| Select | Tier 1 #2 | `sessions/SESSION_START_SELECT_HARDENING.md` |
| AutoComplete | Tier 1 #3 | `sessions/SESSION_START_AUTOCOMPLETE_HARDENING.md` |
| DynamicDialog | Tier 1 #4 | `sessions/SESSION_START_DYNAMIC_DIALOG_HARDENING.md` |
| Drawer | Tier 1 #5 | `sessions/SESSION_START_DRAWER_HARDENING.md` |
| ConfirmDialog | Tier 1 #6 | `sessions/SESSION_START_CONFIRM_DIALOG_HARDENING.md` |
| ConfirmPopup | Tier 1 #7 | `CONFIRM_POPUP_HARDENING_PROMPT.md` |
| Popover | Tier 1 #8 | `POPOVER_HARDENING_PROMPT.md` |
| Tooltip | Tier 1 #9 | `TOOLTIP_HARDENING_PROMPT.md` |
| Toast | Tier 1 #10 | `TOAST_HARDENING_PROMPT.md` |
| Menubar | Tier 2 #11 | `MENUBAR_HARDENING_PROMPT.md` |
| Menu | Tier 2 #12 | `sessions/menu-hardening-prompt.md` |
| TieredMenu | Tier 2 #13 | *(hardened without dedicated prompt file)* |
| MegaMenu | Tier 2 #16 | *(hardened without dedicated prompt file)* |
| Tabs | Tier 2 #17 | *(hardened without dedicated prompt file)* |
| Accordion | Tier 2 #18 | *(hardened without dedicated prompt file)* |
| Stepper | Tier 2 #19 | *(hardened without dedicated prompt file)* |
| Breadcrumb | Tier 2 #20 | *(hardened without dedicated prompt file)* |
| Checkbox | Tier 3 #22 | *(hardened without dedicated prompt file)* |
| RadioButton | Tier 3 #23 | *(hardened without dedicated prompt file)* |
| DatePicker | Tier 3 #24 | *(hardened without dedicated prompt file)* |
| CascadeSelect | Tier 3 #25 | *(hardened without dedicated prompt file)* |
| InputNumber | Tier 3 #26 | *(hardened without dedicated prompt file)* |
| Slider | Tier 3 #27 | *(hardened without dedicated prompt file)* |
| ColorPicker | Tier 3 #28 | *(hardened without dedicated prompt file)* |
| Password | Tier 3 #29 | *(hardened without dedicated prompt file)* |
| Rating | Tier 3 #30 | *(hardened without dedicated prompt file)* |
| Knob | Tier 3 #31 | *(hardened without dedicated prompt file)* |

---

## Queued Hardenings — Work Top to Bottom

### Tier 2 — Navigation & Menu Patterns (remaining)

| # | Component | Prompt File | Key A11y Focus |
|---|-----------|-------------|----------------|
| 14 | ContextMenu | `sessions/context-menu-hardening-prompt.md` | Focus restoration, roving tabindex, separator ARIA |
| 15 | PanelMenu | `sessions/panel-menu-hardening-prompt.md` | Accordion+nav ARIA pattern, aria-controls, keyboard nav |

### Tier 3 — Form Controls (remaining)

| # | Component | Prompt File | Key A11y Focus |
|---|-----------|-------------|----------------|
| 21 | Input | `sessions/input-hardening-prompt.md` | Label association, aria-invalid, aria-describedby |

### Tier 4 — Data Display

| # | Component | Prompt File | Key A11y Focus |
|---|-----------|-------------|----------------|
| 32 | Table | `sessions/table-hardening-prompt.md` | aria-selected, aria-expanded, sort/pagination live regions |
| 33 | TreeTable | `sessions/tree-table-hardening-prompt.md` | role=treegrid, aria-level, aria-setsize/posinset |
| 34 | Tree | `sessions/tree-hardening-prompt.md` | role=tree/treeitem, type-ahead, ArrowLeft-to-parent |
| 35 | TreeSelect | `sessions/tree-select-hardening-prompt.md` | Combobox + tree popup pattern |
| 36 | Listbox | `sessions/listbox-hardening-prompt.md` | aria-activedescendant, select-all label |
| 37 | Paginator | `sessions/paginator-hardening-prompt.md` | Button labels, live region, aria-current=page |
| 38 | DataView | `sessions/data-view-hardening-prompt.md` | Sort/filter labels, list/grid toggle |
| 39 | OrderList | `sessions/order-list-hardening-prompt.md` | Keyboard reorder alternative (REQUIRED) |
| 40 | PickList | `sessions/pick-list-hardening-prompt.md` | Dual-list, transfer announcements |

### Tier 5 — Feedback, Status & Foundational

| # | Component | Prompt File | Key A11y Focus |
|---|-----------|-------------|----------------|
| 41 | Button | `sessions/button-hardening-prompt.md` | icon-only label, loading announcement, disabled semantics |
| 42 | Alert | `sessions/alert-hardening-prompt.md` | role=alert vs status, dismiss button as real button |
| 43 | Message | `sessions/message-hardening-prompt.md` | Same as Alert — live region role |
| 44 | ProgressBar | `sessions/progress-bar-hardening-prompt.md` | aria-valuetext, required aria-label, indeterminate |
| 45 | Carousel | `sessions/carousel-hardening-prompt.md` | role=region, slide announce, pause control (WCAG 2.2.2) |
| 46 | Galleria | `sessions/galleria-hardening-prompt.md` | Lightbox dialog pattern, focus trap |
| 47 | SpeedDial | `sessions/speed-dial-hardening-prompt.md` | aria-expanded, action button labels |
| 48 | SelectButton | `sessions/select-button-hardening-prompt.md` | role=group, aria-pressed |
| 49 | InputOtp | `sessions/input-otp-hardening-prompt.md` | Per-digit aria-label, sequential focus |
| 50 | VirtualScroller | `sessions/virtual-scroller-hardening-prompt.md` | Scroll region label, keyboard scrolling |

### Tier 6 — Layout, Utility & Polish

| # | Component | Prompt File | Key A11y Focus |
|---|-----------|-------------|----------------|
| 51 | Card | `sessions/card-hardening-prompt.md` | Clickable as button/anchor, focus-visible parity |
| 52 | Badge | `sessions/badge-hardening-prompt.md` | aria-label passthrough, decorative vs. informative |
| 53 | Tag | `sessions/tag-hardening-prompt.md` | Dismiss button specific label |
| 54 | Chip | `sessions/chip-hardening-prompt.md` | Remove button label, selectable state |
| 55 | Skeleton | `sessions/skeleton-hardening-prompt.md` | aria-hidden skeleton, aria-busy container |
| 56 | ProgressSpinner | `sessions/progress-spinner-hardening-prompt.md` | role=status, aria-label, reduced motion |
| 57 | MeterGroup | `sessions/meter-group-hardening-prompt.md` | Segment labels, totals announced |
| 58 | Divider | `sessions/divider-hardening-prompt.md` | role=separator, aria-orientation |
| 59 | Toolbar | `sessions/toolbar-hardening-prompt.md` | role=toolbar, roving tabindex |
| 60 | Panel | `sessions/panel-hardening-prompt.md` | role=region, aria-labelledby, collapsible |
| 61 | Fieldset | `sessions/fieldset-hardening-prompt.md` | Native fieldset/legend preferred |
| 62 | ScrollPanel | `sessions/scroll-panel-hardening-prompt.md` | Keyboard-scrollable, aria-label |
| 63 | Inplace | `sessions/inplace-hardening-prompt.md` | Display/edit toggle, focus management |
| 64 | BlockUI | `sessions/block-ui-hardening-prompt.md` | aria-busy, focus exclusion |
| 65 | Avatar | `sessions/avatar-hardening-prompt.md` | Alt text propagation, group context |
| 66 | Image | `sessions/image-hardening-prompt.md` | Alt text, lightbox dialog pattern |
| 67 | ImageCompare | `sessions/image-compare-hardening-prompt.md` | role=slider, aria-valuetext |
| 68 | SplitButton | `sessions/split-button-hardening-prompt.md` | Dropdown aria-haspopup, menu pattern |
| 69 | Upload | `sessions/upload-hardening-prompt.md` | Drop zone, file list management |
| 70 | Terminal | `sessions/terminal-hardening-prompt.md` | role=log, command input label |
| 71 | Timeline | `sessions/timeline-hardening-prompt.md` | Semantic list structure |
| 72 | Chart | `sessions/chart-hardening-prompt.md` | Data table alternative, aria-label |
| 73 | FocusTrap | `sessions/focus-trap-hardening-prompt.md` | Sentinel strategy (foundational utility) |
| 74 | Ripple | `sessions/ripple-hardening-prompt.md` | prefers-reduced-motion only |
| 75 | ScrollTop | `sessions/scroll-top-hardening-prompt.md` | aria-label, hidden state tabindex |
| 76 | BottomSheet | `sessions/bottom-sheet-hardening-prompt.md` | Dialog pattern, focus management |

---

## How to Use These Prompts

1. Pick the next component in queue order (top to bottom within tier).
2. Open the prompt file listed above.
3. Read the **Step 1** file list — read ALL listed files before writing any code.
4. Run Phase 3 (Accessibility) FIRST — that is always the critical priority.
5. Complete Phases 1, 2, 4, 5, 6 in order.
6. Run validation commands (ESLint → Jest → ng build → entry-points).
7. Score the component and update `docs/COMPONENT_SCORES.md`.
8. Update `AI_AGENT_CONTEXT.md` with the handoff block.

---

## Lessons Reference

For accumulated lessons from all previous hardenings, see the **Accumulated Lessons** section
added to `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The most impactful recurring lessons (apply to every session):
1. **Module-level ID counter** for any component that uses IDs in templates
2. **Roving tabindex** for all widget patterns (menus, tabs, toolbars, listboxes)
3. **Focus restoration** for all popup/overlay components on close
4. **`prefers-reduced-motion`** in every component with transitions or animations
5. **ESLint in `bash.exe` only** — PowerShell returns exit 1 even on clean runs
6. **`role="separator"` must NOT have `aria-hidden="true"`** inside menu/listbox roles
7. **`role="alert"` only for errors** — use `role="status"` for success/info/warn
8. **Dismiss button labels must be specific** — not generic "Dismiss" — include context

