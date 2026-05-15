# Hardening Prompt Index

> **Purpose:** Single index of all component hardening session prompts.
> Work top to bottom within each tier. Each prompt file is a self-contained session guide.
>
> **Folder convention:**
> - `docs/prompts/completed/` — prompts for components with all 10 scores ≥ 8 (🟢 in COMPONENT_SCORES.md)
> - `docs/prompts/needs-hardening/` — prompts for components not yet formally scored (🔴 or 🟡)
>
> **Last reconciled:** 2026-05-15 — matched against actual scores in `docs/COMPONENT_SCORES.md`.

---

## Completed Hardenings (all scores ≥ 8 — prompt files in `docs/prompts/completed/`)

| Component       | Tier        | Avg   | Prompt File                                 |
|-----------------|-------------|-------|---------------------------------------------|
| Dialog          | Tier 1 #1   | 8.6   | `SESSION_START_DIALOG_HARDENING.md`         |
| Select          | Tier 1 #2   | 8.2   | `SESSION_START_SELECT_HARDENING.md`         |
| AutoComplete    | Tier 1 #3   | 8.2   | `SESSION_START_AUTOCOMPLETE_HARDENING.md`   |
| DynamicDialog   | Tier 1 #4   | 8.3   | `SESSION_START_DYNAMIC_DIALOG_HARDENING.md` |
| Drawer          | Tier 1 #5   | 8.5   | `SESSION_START_DRAWER_HARDENING.md`         |
| ConfirmDialog   | Tier 1 #6   | 8.3   | `SESSION_START_CONFIRM_DIALOG_HARDENING.md` |
| ConfirmPopup    | Tier 1 #7   | 8.9   | `CONFIRM_POPUP_HARDENING_PROMPT.md`         |
| Popover         | Tier 1 #8   | 9.0   | `POPOVER_HARDENING_PROMPT.md`               |
| Tooltip         | Tier 1 #9   | 9.0   | `TOOLTIP_HARDENING_PROMPT.md`               |
| Toast           | Tier 1 #10  | 9.1   | `TOAST_HARDENING_PROMPT.md`                 |
| Menubar         | Tier 2 #11  | 9.0   | `MENUBAR_HARDENING_PROMPT.md`               |
| Menu            | Tier 2 #12  | 9.0   | `menu-hardening-prompt.md`                  |
| TieredMenu      | Tier 2 #13  | 9.0   | *(hardened without dedicated prompt)*       |
| ContextMenu     | Tier 2 #14  | 9.0   | `context-menu-hardening-prompt.md`          |
| PanelMenu       | Tier 2 #15  | 9.0   | `panel-menu-hardening-prompt.md`            |
| MegaMenu        | Tier 2 #16  | 9.0   | *(hardened without dedicated prompt)*       |
| Tabs            | Tier 2 #17  | 9.0   | *(hardened without dedicated prompt)*       |
| Accordion       | Tier 2 #18  | 9.0   | *(hardened without dedicated prompt)*       |
| Stepper         | Tier 2 #19  | 9.0   | *(hardened without dedicated prompt)*       |
| Breadcrumb      | Tier 2 #20  | 9.0   | *(hardened without dedicated prompt)*       |
| Input           | Tier 3 #21  | 8.8   | `input-hardening-prompt.md`                 |
| Checkbox        | Tier 3 #22  | 9.0   | *(hardened without dedicated prompt)*       |
| RadioButton     | Tier 3 #23  | 8.8   | `radio-button-hardening-prompt.md`          |
| CascadeSelect   | Tier 3 #25  | 8.2   | *(hardened without dedicated prompt)*       |
| InputNumber     | Tier 3 #26  | 9.0   | *(hardened without dedicated prompt)*       |
| Slider          | Tier 3 #27  | 8.8   | `slider-hardening-prompt.md`                |
| ColorPicker     | Tier 3 #28  | 8.2   | *(hardened without dedicated prompt)*       |
| Password        | Tier 3 #29  | 8.7   | `password-hardening-prompt.md`              |
| Rating          | Tier 3 #30  | 8.7   | `rating-hardening-prompt.md`                |
| Knob            | Tier 3 #31  | 8.2   | *(hardened without dedicated prompt)*       |
| Table           | Tier 4 #32  | 8.6   | `table-hardening-prompt.md`                 |
| TreeTable       | Tier 4 #33  | 8.5   | `tree-table-hardening-prompt.md`            |
| Tree            | Tier 4 #34  | 8.6   | `tree-hardening-prompt.md`                  |
| TreeSelect      | Tier 4 #35  | 8.6   | `tree-select-hardening-prompt.md`           |
| Listbox         | Tier 4 #36  | 8.6   | `listbox-hardening-prompt.md`               |
| Paginator       | Tier 4 #37  | 8.5   | `paginator-hardening-prompt.md`             |
| DataView        | Tier 4 #38  | 8.3   | `data-view-hardening-prompt.md`             |
| OrderList       | Tier 4 #39  | 8.7   | `order-list-hardening-prompt.md`            |
| PickList        | Tier 4 #40  | 8.7   | `pick-list-hardening-prompt.md`             |
| Button          | Tier 5 #41  | 8.9   | `button-hardening-prompt.md`                |
| Alert           | Tier 5 #42  | 8.5   | `alert-hardening-prompt.md`                 |
| Message         | Tier 5 #43  | 8.6   | `message-hardening-prompt.md`               |
| ProgressBar     | Tier 5 #44  | 8.6   | `progress-bar-hardening-prompt.md`          |
| Carousel        | Tier 5 #45  | 8.3   | `carousel-hardening-prompt.md`              |
| Galleria        | Tier 5 #46  | 8.3   | `galleria-hardening-prompt.md`              |
| SpeedDial       | Tier 5 #47  | 8.8   | `speed-dial-hardening-prompt.md`            |
| SelectButton    | Tier 5 #48  | 8.7   | `select-button-hardening-prompt.md`         |
| InputOtp        | Tier 5 #49  | 8.7   | `input-otp-hardening-prompt.md`             |
| VirtualScroller | Tier 5 #50  | 8.5   | `virtual-scroller-hardening-prompt.md`      |
| Card            | Tier 6 #51  | 9.0   | `card-hardening-prompt.md`                  |
| Badge           | Tier 6 #52  | 8.4   | `badge-hardening-prompt.md`                 |
| Tag             | Tier 6 #53  | 8.9   | `tag-hardening-prompt.md`                   |
| Chip            | Tier 6 #54  | 8.5   | `chip-hardening-prompt.md`                  |
| Skeleton        | Tier 6 #55  | 8.6   | `skeleton-hardening-prompt.md`              |
| ProgressSpinner | Tier 6 #56  | 8.9   | `progress-spinner-hardening-prompt.md`      |
| MeterGroup      | Tier 6 #57  | 8.3   | `meter-group-hardening-prompt.md`           |
| Divider         | Tier 6 #58  | 8.7   | `divider-hardening-prompt.md`               |
| Toolbar         | Tier 6 #59  | 8.9   | `toolbar-hardening-prompt.md`               |
| Panel           | Tier 6 #60  | 9.0   | `panel-hardening-prompt.md`                 |
| Fieldset        | Tier 6 #61  | 9.0   | `fieldset-hardening-prompt.md`              |
| ScrollPanel     | Tier 6 #62  | 8.9   | `scroll-panel-hardening-prompt.md`          |
| Inplace         | Tier 6 #63  | 8.9   | `inplace-hardening-prompt.md`               |
| BlockUI         | Tier 6 #64  | 9.0   | `block-ui-hardening-prompt.md`              |
| Avatar          | Tier 6 #65  | 8.2   | `avatar-hardening-prompt.md`                |
| Image           | Tier 6 #66  | 8.7   | `image-hardening-prompt.md`                 |
| ImageCompare    | Tier 6 #67  | 8.9   | `image-compare-hardening-prompt.md`         |
| SplitButton     | Tier 6 #68  | 8.6   | `split-button-hardening-prompt.md`          |
| Upload          | Tier 6 #69  | 8.9   | `upload-hardening-prompt.md`                |
| Terminal        | Tier 6 #70  | 8.9   | `terminal-hardening-prompt.md`              |
| Timeline        | Tier 6 #71  | 8.3   | `timeline-sessions-hardening-prompt.md`     |
| Chart           | Tier 6 #72  | 8.9   | `chart-hardening-prompt.md`                 |
| FocusTrap       | Tier 6 #73  | 8.4   | `focus-trap-hardening-prompt.md`            |
| Ripple          | Tier 6 #74  | 8.7   | `ripple-hardening-prompt.md`                |
| ScrollTop       | Tier 6 #75  | 8.4   | `scroll-top-hardening-prompt.md`            |
| BottomSheet     | Tier 6 #76  | 8.5   | `bottom-sheet-hardening-prompt.md`          |

**New components (post-queue) — also completed:**

| Component         | Avg   | Prompt File                              |
|-------------------|-------|------------------------------------------|
| Textarea          | 8.7   | `textarea-hardening-prompt.md`           |
| ToggleButton      | 8.7   | `toggle-button-hardening-prompt.md`      |
| InputMask         | 8.7   | `input-mask-hardening-prompt.md`         |
| KeyFilter         | 8.6   | `key-filter-hardening-prompt.md`         |
| FormField         | 8.7   | `form-field-hardening-prompt.md`         |
| InputGroup        | 8.7   | `input-group-hardening-prompt.md`        |
| IconField         | 8.7   | `icon-field-hardening-prompt.md`         |
| Stack             | 9.0   | `stack-hardening-prompt.md`              |
| Inline            | 9.0   | `inline-hardening-prompt.md`             |
| Container         | 8.9   | `container-hardening-prompt.md`          |
| Fluid             | 8.7   | `fluid-hardening-prompt.md`              |
| Dock              | 9.0   | `dock-hardening-prompt.md`               |
| OrganizationChart | 8.3   | `organization-chart-hardening-prompt.md` |
| ButtonGroup       | 8.7   | `button-group-hardening-prompt.md`       |
| StyleClass        | 8.7   | `style-class-hardening-prompt.md`        |
| AnimateOnScroll   | 8.6   | `animate-on-scroll-hardening-prompt.md`  |
| ClassNames        | 9.1   | `class-names-hardening-prompt.md`        |

---

## Needs Hardening — Work Top to Bottom (prompt files in `docs/prompts/needs-hardening/`)

> 7 components remain. All prompts were updated 2026-05-15 to reflect current source code.

| Priority | Component      | Key A11y Focus                                                                              | Prompt File                           |
|----------|----------------|---------------------------------------------------------------------------------------------|---------------------------------------|
| 1        | ToggleSwitch   | `role=switch` on `<input type=checkbox>`, label guard, aria-readonly, high-contrast track   | `toggle-switch-hardening-prompt.md`   |
| 2        | Icon           | decorative/informative modes, clickable+no-label DEV warning, SVG focusable=false           | `icon-hardening-prompt.md`            |
| 3        | IconButton     | required ariaLabel, loading disable+announce, 44px touch target                             | `icon-button-hardening-prompt.md`     |
| 4        | Grid           | no ARIA data-grid role, no overflow clip, reading-order constraint documented               | `grid-hardening-prompt.md`            |
| 5        | AutoFocus      | shouldFocusTarget logic, selector fallback, SSR guard, focus-theft prevention               | `auto-focus-hardening-prompt.md`      |
| 6        | FloatLabel     | **scaffold needs full impl** — real `<label for>`, CSS-only float, contrast                 | `float-label-hardening-prompt.md`     |
| 7        | Bind           | Renderer2/ARIA no-clobber, property vs attribute naming pitfalls                            | `bind-hardening-prompt.md`            |

> **Note on FloatLabel (#6):** The current implementation is a scaffold. A design decision on the
> label/input wiring strategy is required before the 6-phase audit can run.

---

## How to Use These Prompts

1. Pick the next component in priority order (top to bottom within the Needs Hardening section).
2. Open the prompt file listed above from `docs/prompts/needs-hardening/`.
3. Read the **Step 1** file list — read ALL listed files before writing any code.
4. Run **Phase 3 (Accessibility) FIRST** — that is always the critical priority.
5. Complete Phases 1, 2, 4, 5, 6 in order.
6. Run validation commands (ESLint → Jest → ng build → entry-points).
7. Score the component and update `docs/COMPONENT_SCORES.md`.
8. Move the prompt file from `needs-hardening/` to `completed/`.
9. Update `AI_AGENT_CONTEXT.md` with the handoff block.

---

## Lessons Reference

For accumulated lessons from all previous hardenings, see the **Accumulated Lessons** section
in `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

The most impactful recurring lessons (apply to every session):
1. **Module-level ID counter** for any component that uses IDs in templates
2. **Roving tabindex** for all widget patterns (menus, tabs, toolbars, listboxes)
3. **Focus restoration** for all popup/overlay components on close
4. **`prefers-reduced-motion`** in every component with transitions or animations
5. **ESLint in `bash.exe` only** — PowerShell returns exit 1 even on clean runs
6. **`role="separator"` must NOT have `aria-hidden="true"`** inside menu/listbox roles
7. **`role="alert"` only for errors** — use `role="status"` for success/info/warn
8. **Dismiss button labels must be specific** — not generic "Dismiss" — include context
9. **`aria-pressed` for toggle buttons, `aria-checked` for checkboxes/radios, `role=switch` for on/off controls** — never mix these up
10. **Icon-only interactive elements MUST have `aria-label`** — no exceptions
