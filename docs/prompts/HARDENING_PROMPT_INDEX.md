# Hardening Prompt Index

> **Purpose:** Quick-reference record of all Tier 1 hardening results and the Tier 2 audit queue.
>
> **Tier 1 hardening** — All 100 components completed. Per-component prompt files have been
> deleted (they were one-time-use scaffolding). The reusable workflow and accumulated lessons
> live in [`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`](COMPONENT_EVOLUTION_PROMPTS.md).
>
> **Tier 2 audits** — Checkpoint-verified scoring against `docs/SCORING_CRITERIA.md`.
> Use the agentic audit system at [`docs/prompts/audit/`](audit/README.md) to run these.
>
> **Last updated:** 2026-05-18

---

## Tier 1 Completed Hardenings

All 100 components formally hardened and scored ≥ 8.0. These are Tier 1 (qualitative) scores —
see the Tier 2 queue below for checkpoint-verified audits.

### Original 76-component queue

| Component       | Queue      | Tier 1 Avg |
| --------------- | ---------- | ---------- |
| Dialog          | Tier 1 #1  | 8.6        |
| Select          | Tier 1 #2  | 8.2        |
| AutoComplete    | Tier 1 #3  | 8.2        |
| DynamicDialog   | Tier 1 #4  | 8.3        |
| Drawer          | Tier 1 #5  | 8.5        |
| ConfirmDialog   | Tier 1 #6  | 8.3        |
| ConfirmPopup    | Tier 1 #7  | 8.9        |
| Popover         | Tier 1 #8  | 9.0        |
| Tooltip         | Tier 1 #9  | 9.0        |
| Toast           | Tier 1 #10 | 9.1        |
| Menubar         | Tier 2 #11 | 9.0        |
| Menu            | Tier 2 #12 | 9.0        |
| TieredMenu      | Tier 2 #13 | 9.0        |
| ContextMenu     | Tier 2 #14 | 9.0        |
| PanelMenu       | Tier 2 #15 | 9.0        |
| MegaMenu        | Tier 2 #16 | 9.0        |
| Tabs            | Tier 2 #17 | 9.0        |
| Accordion       | Tier 2 #18 | 9.0        |
| Stepper         | Tier 2 #19 | 9.0        |
| Breadcrumb      | Tier 2 #20 | 9.0        |
| Input           | Tier 3 #21 | 8.8        |
| Checkbox        | Tier 3 #22 | 9.0        |
| RadioButton     | Tier 3 #23 | 8.8        |
| DatePicker      | Tier 3 #24 | 8.3        |
| CascadeSelect   | Tier 3 #25 | 8.2        |
| InputNumber     | Tier 3 #26 | 9.0        |
| Slider          | Tier 3 #27 | 8.8        |
| ColorPicker     | Tier 3 #28 | 8.2        |
| Password        | Tier 3 #29 | 8.7        |
| Rating          | Tier 3 #30 | 8.7        |
| Knob            | Tier 3 #31 | 8.2        |
| Table           | Tier 4 #32 | 8.6        |
| TreeTable       | Tier 4 #33 | 8.5        |
| Tree            | Tier 4 #34 | 8.6        |
| TreeSelect      | Tier 4 #35 | 8.6        |
| Listbox         | Tier 4 #36 | 8.6        |
| Paginator       | Tier 4 #37 | 8.5        |
| DataView        | Tier 4 #38 | 8.3        |
| OrderList       | Tier 4 #39 | 8.7        |
| PickList        | Tier 4 #40 | 8.7        |
| Button          | Tier 5 #41 | 8.9        |
| Alert           | Tier 5 #42 | 8.5        |
| Message         | Tier 5 #43 | 8.6        |
| ProgressBar     | Tier 5 #44 | 8.6        |
| Carousel        | Tier 5 #45 | 8.3        |
| Galleria        | Tier 5 #46 | 8.3        |
| SpeedDial       | Tier 5 #47 | 8.8        |
| SelectButton    | Tier 5 #48 | 8.7        |
| InputOtp        | Tier 5 #49 | 8.7        |
| VirtualScroller | Tier 5 #50 | 8.5        |
| Card            | Tier 6 #51 | 9.0        |
| Badge           | Tier 6 #52 | 8.4        |
| Tag             | Tier 6 #53 | 8.9        |
| Chip            | Tier 6 #54 | 8.5        |
| Skeleton        | Tier 6 #55 | 8.6        |
| ProgressSpinner | Tier 6 #56 | 8.9        |
| MeterGroup      | Tier 6 #57 | 8.3        |
| Divider         | Tier 6 #58 | 8.7        |
| Toolbar         | Tier 6 #59 | 8.9        |
| Panel           | Tier 6 #60 | 9.0        |
| Fieldset        | Tier 6 #61 | 9.0        |
| ScrollPanel     | Tier 6 #62 | 8.9        |
| Inplace         | Tier 6 #63 | 8.9        |
| BlockUI         | Tier 6 #64 | 9.0        |
| Avatar          | Tier 6 #65 | 8.2        |
| Image           | Tier 6 #66 | 8.7        |
| ImageCompare    | Tier 6 #67 | 8.9        |
| SplitButton     | Tier 6 #68 | 8.6        |
| Upload          | Tier 6 #69 | 8.9        |
| Terminal        | Tier 6 #70 | 8.9        |
| Timeline        | Tier 6 #71 | 8.3        |
| Chart           | Tier 6 #72 | 8.9        |
| FocusTrap       | Tier 6 #73 | 8.4        |
| Ripple          | Tier 6 #74 | 8.7        |
| ScrollTop       | Tier 6 #75 | 8.4        |
| BottomSheet     | Tier 6 #76 | 8.5        |

### New components (post-queue)

| Component         | Tier 1 Avg |
| ----------------- | ---------- |
| Textarea          | 8.7        |
| ToggleButton      | 8.7        |
| ToggleSwitch      | 8.8        |
| InputMask         | 8.7        |
| KeyFilter         | 8.6        |
| FormField         | 8.7        |
| FloatLabel        | 8.7        |
| InputGroup        | 8.7        |
| IconField         | 8.7        |
| Stack             | 9.0        |
| Inline            | 9.0        |
| Grid              | 9.0        |
| Container         | 8.9        |
| Fluid             | 8.7        |
| Dock              | 9.0        |
| OrganizationChart | 8.3        |
| Icon              | 8.7        |
| IconButton        | 8.6        |
| ButtonGroup       | 8.7        |
| StyleClass        | 8.7        |
| AnimateOnScroll   | 8.6        |
| AutoFocus         | 8.7        |
| ClassNames        | 9.1        |
| Bind              | 8.6        |

---

## Tier 2 — Checkpoint Audits

> **Tool:** [`docs/prompts/audit/`](audit/README.md) — agentic 3-phase system for Claude Code.
> Chat-interface alternative: [`docs/prompts/SCORING_CRITERIA_AUDIT_PROMPT.md`](SCORING_CRITERIA_AUDIT_PROMPT.md).

Run in this order — highest public scrutiny and lowest Tier 1 scores first.

### Priority 1 — Benchmark article (audit before publishing)

| Component    | Tier 1 Avg | Tier 2 Status  |
| ------------ | ---------- | -------------- |
| Button       | 8.9        | ⬜ Not audited |
| Dialog       | 8.6        | ⬜ Not audited |
| Select       | 8.2        | ⬜ Not audited |
| AutoComplete | 8.2        | ⬜ Not audited |
| Toast        | 9.1        | ⬜ Not audited |
| Menubar      | 9.0        | ⬜ Not audited |
| Table        | 8.6        | ⬜ Not audited |

### Priority 2 — Most at risk (Tier 1 avg 8.2–8.4)

| Component         | Tier 1 Avg | Tier 2 Status  |
| ----------------- | ---------- | -------------- |
| Select            | 8.2        | ⬜ Not audited |
| AutoComplete      | 8.2        | ⬜ Not audited |
| CascadeSelect     | 8.2        | ⬜ Not audited |
| Knob              | 8.2        | ⬜ Not audited |
| ColorPicker       | 8.2        | ⬜ Not audited |
| Avatar            | 8.2        | ⬜ Not audited |
| DatePicker        | 8.3        | ⬜ Not audited |
| DynamicDialog     | 8.3        | ⬜ Not audited |
| ConfirmDialog     | 8.3        | ⬜ Not audited |
| DataView          | 8.3        | ⬜ Not audited |
| Timeline          | 8.3        | ⬜ Not audited |
| OrganizationChart | 8.3        | ⬜ Not audited |
| Carousel          | 8.3        | ⬜ Not audited |
| Galleria          | 8.3        | ⬜ Not audited |
| MeterGroup        | 8.3        | ⬜ Not audited |
| Badge             | 8.4        | ⬜ Not audited |
| ScrollTop         | 8.4        | ⬜ Not audited |
| FocusTrap         | 8.4        | ⬜ Not audited |

### Priority 3 — Remaining components

Work through all remaining components before v1.0, highest-scrutiny categories first.

---

## Key Lessons (apply to every new component or re-hardening)

For the full accumulated lessons list see [`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`](COMPONENT_EVOLUTION_PROMPTS.md).

The highest-impact recurring patterns:

1. **Module-level ID counter** — any component that uses `id` in templates needs a unique counter
2. **Roving tabindex** — all composite widgets (menus, tabs, toolbars, listboxes) use `tabindex="-1"` on children
3. **Focus restoration** — all popup/overlay components restore focus to the trigger on close
4. **`prefers-reduced-motion`** — every component with transitions or animations must include this block
5. **`role="alert"` only for errors** — use `role="status"` for success/info/warn
6. **Dismiss button labels must be specific** — include context, not just "Dismiss"
7. **`aria-pressed` for toggle buttons, `aria-checked` for checkboxes/radios, `role=switch` for on/off** — never mix
8. **Icon-only interactive elements MUST have `aria-label`** — no exceptions
