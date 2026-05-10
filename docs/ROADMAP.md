# Roadmap to Public Launch

> **Current position:** Phase 0 → Phase 1 transition
> **Next milestone:** Public Beta (end of Phase 3)
> **Ultimate milestone:** v1.0 General Availability (end of Phase 5)

---

## Progress Summary

| Phase | Name                          | Status      | Components   |
|-------|-------------------------------|-------------|--------------|
| 0     | Foundation Cleanup            | 🔄 Active   | —            |
| 1     | A11y: Overlays & Navigation   | ⏳ Queued   | 17 remaining |
| 2     | A11y: Forms & Data            | ⏳ Queued   | 20 remaining |
| 3     | Full Coverage + Ecosystem     | ⏳ Queued   | 36 remaining |
| 4     | Public Beta                   | ⏳ Queued   | —            |
| 5     | v1.0 General Availability     | ⏳ Queued   | —            |

**Hardening scorecard:** 3 / 76 components green (Dialog ✅, DynamicDialog ✅, Drawer ✅)

---

## The Strategy Behind This Roadmap

You do not need every component at ≥ 8 before going public.

The hardest components — overlays, menus, form controls — carry the most a11y risk and the most developer scrutiny. Getting those right first is what makes a credible public beta. Utilities and layout primitives (Tier 6) are lower stakes and can be hardened transparently post-launch without damaging trust.

**Go public after Phase 3. Reach v1.0 after Phase 5.**

---

## Phase 0 — Foundation Cleanup

> **Goal:** Close infrastructure gaps so hardening work is never blocked.
> **Status:** 🔄 Active — do this now, in parallel with Phase 1

### Infrastructure

- [ ] Secondary entry point: `icon-button`
- [ ] Secondary entry point: `alert`
- [ ] Overlay `appendTo` / z-index manager
- [ ] `knip` dead-code baseline + constants extraction pass
- [ ] Documentation gaps: `Input`, `Select`, `Card`, `Layout` reference docs

### Exit criteria

All boxes above checked. No open infrastructure blockers.

---

## Phase 1 — Elite A11y: Overlays & Navigation

> **Goal:** The most complex ARIA patterns in the library are correct, tested, and internally audited.
> **Why first:** These are the components developers open first and trust the most. Focus trap, aria-modal, and menu keyboard navigation are what accessibility engineers will scrutinize.

### Tier 1 — Overlays & Dialogs (7 remaining)

| #  | Component     | Key concern                                               | Done |
|----|---------------|-----------------------------------------------------------|------|
| 2  | Select        | Combobox/listbox ARIA — hardest form control              | ⬜   |
| 3  | AutoComplete  | Combobox + live region + `aria-activedescendant`          | ⬜   |
| 6  | ConfirmDialog | `role=alertdialog`, default focus on confirm action       | ⬜   |
| 7  | ConfirmPopup  | `role=alertdialog` anchored, click-away without a11y loss | ⬜   |
| 8  | Popover       | `aria-expanded`, `aria-controls`, dismiss without losing focus | ⬜ |
| 9  | Tooltip       | `aria-describedby` lifecycle — attached and cleaned up    | ⬜   |
| 10 | Toast         | `aria-live=assertive`, dismiss keyboard access            | ⬜   |

### Tier 2 — Navigation & Menus (10 components)

| #  | Component   | Key concern                                                 | Done |
|----|-------------|-------------------------------------------------------------|------|
| 11 | Menubar     | `role=menubar`, full arrow-key nav, `aria-haspopup`         | ⬜   |
| 12 | Menu        | `role=menu`, keyboard nav, separator roles                  | ⬜   |
| 13 | TieredMenu  | Nested `role=menu`, left-arrow closes submenu               | ⬜   |
| 14 | ContextMenu | Same as TieredMenu + trigger `aria-haspopup=menu`           | ⬜   |
| 15 | PanelMenu   | Mixed menubar + tree, `aria-expanded` on panels             | ⬜   |
| 16 | MegaMenu    | Wide layout, keyboard trapping within columns               | ⬜   |
| 17 | Tabs        | `role=tablist/tab/tabpanel`, arrow nav, `aria-selected`     | ⬜   |
| 18 | Accordion   | `role=button` on headers, `aria-expanded`, `aria-controls`  | ⬜   |
| 19 | Stepper     | `role=tablist` variant, `aria-current=step`                 | ⬜   |
| 20 | Breadcrumb  | `role=navigation`, `aria-label`, `aria-current=page`        | ⬜   |

### Milestone: Internal Axe-Core Audit

Run axe-core across all Phase 1 components before moving to Phase 2.
This is the internal quality gate — not public yet, but you need to know where you stand.

### Exit criteria

- All 17 components above scored ≥ 8 in every category
- Internal axe-core audit run and violations resolved
- Zero open a11y regressions in Tier 1 or Tier 2

**Phase 1 progress: 0 / 17**

---

## Phase 2 — Elite A11y: Forms & Data Display

> **Goal:** Form controls and data components — the daily-driver components — are production-quality.
> **Why here:** Form controls are high-friction, high-scrutiny. Getting them right is what separates a library teams trust from one they patch around.

### Tier 3 — Form Controls (11 components)

| #  | Component     | Key concern                                                   | Done |
|----|---------------|---------------------------------------------------------------|------|
| 21 | Input         | Label association, `aria-invalid`, `aria-describedby` errors  | ⬜   |
| 22 | Checkbox      | `aria-checked=mixed` for indeterminate, `role=group`          | ⬜   |
| 23 | RadioButton   | `role=radiogroup`, `aria-required`, keyboard between siblings | ⬜   |
| 24 | DatePicker    | Calendar grid, month/year nav, live region — most complex     | ⬜   |
| 25 | CascadeSelect | Multi-level combobox, `aria-activedescendant` through levels  | ⬜   |
| 26 | InputNumber   | Spinner buttons, `role=spinbutton`, `aria-valuenow/min/max`   | ⬜   |
| 27 | Slider        | `role=slider`, `aria-valuenow/min/max/valuetext`, arrow step  | ⬜   |
| 28 | ColorPicker   | Keyboard access to hue/saturation/hex input                   | ⬜   |
| 29 | Password      | Strength meter live region, toggle visibility label           | ⬜   |
| 30 | Rating        | `role=radiogroup` or `role=slider`, keyboard interaction      | ⬜   |
| 31 | Knob          | `role=slider`, `aria-valuenow`, drag-and-keyboard equivalence | ⬜   |

### Tier 4 — Data Display (9 components)

| #  | Component  | Key concern                                                          | Done |
|----|------------|----------------------------------------------------------------------|------|
| 32 | Table      | `role=grid`, sort `aria-sort`, selection `aria-selected`, paginator  | ⬜   |
| 33 | TreeTable  | `role=treegrid`, `aria-level/expanded/setsize/posinset`              | ⬜   |
| 34 | Tree       | `role=tree/treeitem`, full keyboard nav (arrows, Home/End, typeahead)| ⬜   |
| 35 | TreeSelect | Tree inside popup — combobox + tree patterns combined                | ⬜   |
| 36 | Listbox    | `role=listbox`, `aria-multiselectable`, keyboard selection           | ⬜   |
| 37 | Paginator  | Live region announcing page change, button labels                    | ⬜   |
| 38 | DataView   | Sort/filter labels, list/grid toggle announcement                    | ⬜   |
| 39 | OrderList  | Keyboard reorder alternative, drag-and-drop a11y                     | ⬜   |
| 40 | PickList   | Dual-list pattern, transfer action announcements                     | ⬜   |

### Exit criteria

- All 20 components scored ≥ 8 in every category
- DatePicker and Table (highest complexity) pass screen reader spot-check
- No open regressions across Tiers 1–4

**Phase 2 progress: 0 / 20**

---

## Phase 3 — Full Coverage + Ecosystem

> **Goal:** Every component green. Storybook live. Library ready to be shown publicly.
> **This phase unlocks the public beta.**

### Tier 5 — Feedback, Status & Foundational (10 components)

| #  | Component       | Key concern                                               | Done |
|----|-----------------|-----------------------------------------------------------|------|
| 41 | Button          | `aria-disabled`, icon-only `aria-label`, loading state    | ⬜   |
| 42 | Alert           | `role=alert` vs `role=status`, dismiss button label       | ⬜   |
| 43 | Message         | Live region role correctness                              | ⬜   |
| 44 | ProgressBar     | `role=progressbar`, `aria-valuenow`, indeterminate label  | ⬜   |
| 45 | Carousel        | `role=region`, slide announcement, prev/next labels       | ⬜   |
| 46 | Galleria        | Lightbox keyboard trap, image alt propagation             | ⬜   |
| 47 | SpeedDial       | `aria-expanded`, icon-only action button labels           | ⬜   |
| 48 | SelectButton    | `role=group` of toggle buttons, `aria-pressed`            | ⬜   |
| 49 | InputOtp        | Sequential focus management, paste handling               | ⬜   |
| 50 | VirtualScroller | Accessible scroll region, keyboard scrolling              | ⬜   |

### Tier 6 — Layout, Utility & Polish (26 components)

| #  | Component       | Primary focus                                             | Done |
|----|-----------------|-----------------------------------------------------------|------|
| 51 | Card            | API composability, slot flexibility, hover/focus polish   | ⬜   |
| 52 | Badge           | Positioning variants, `aria-label` passthrough            | ⬜   |
| 53 | Tag             | Dismissible variant `aria-label`                          | ⬜   |
| 54 | Chip            | Remove button label, image alt passthrough                | ⬜   |
| 55 | Skeleton        | `aria-busy` on container, `aria-hidden` on placeholder    | ⬜   |
| 56 | ProgressSpinner | `role=status`, `aria-label`                               | ⬜   |
| 57 | MeterGroup      | Segment `aria-label` values, totals announced             | ⬜   |
| 58 | Divider         | `role=separator`, `aria-orientation`                      | ⬜   |
| 59 | Toolbar         | `role=toolbar`, `aria-label`                              | ⬜   |
| 60 | Panel           | `role=region`, `aria-labelledby`, toggle `aria-expanded`  | ⬜   |
| 61 | Fieldset        | `role=group`, native fieldset/legend semantics            | ⬜   |
| 62 | ScrollPanel     | Keyboard-scrollable region label                          | ⬜   |
| 63 | Inplace         | Display/edit toggle `aria-expanded`                       | ⬜   |
| 64 | BlockUI         | `aria-busy` on blocked container                          | ⬜   |
| 65 | Avatar          | Alt propagation, group context                            | ⬜   |
| 66 | Image           | Alt text, preview dialog a11y                             | ⬜   |
| 67 | ImageCompare    | `role=slider`, `aria-valuetext`                           | ⬜   |
| 68 | SplitButton     | Dropdown trigger `aria-haspopup`, menu keyboard nav       | ⬜   |
| 69 | Upload          | Drop zone announcement, file list management              | ⬜   |
| 70 | Terminal        | `role=log`, command input labeling                        | ⬜   |
| 71 | Timeline        | Semantic list structure, orientation                      | ⬜   |
| 72 | Chart           | Accessible data table alternative, `aria-label`           | ⬜   |
| 73 | FocusTrap       | Correct sentinel node strategy                            | ⬜   |
| 74 | Ripple          | `prefers-reduced-motion` compliance                       | ⬜   |
| 75 | ScrollTop       | `aria-label` on button                                    | ⬜   |
| 76 | BottomSheet     | `role=dialog`, focus management                           | ⬜   |

### Ecosystem

- [ ] Storybook integration live
- [ ] Runtime variant switcher (preview of Wow Factor #2)
- [ ] Full internal axe-core audit across all 76 components — zero violations target

### Exit criteria

- All 76 components scored ≥ 8 in every category
- Storybook deployed
- Full axe-core audit clean
- `npm run test:a11y:all` passes

**Phase 3 progress: 0 / 36 components + ecosystem items**

---

## Phase 4 — Public Beta 🚀

> **Milestone: First public release. Library is on npm. Developers can use it.**

### Deliverables

- [ ] npm publish — first public version (e.g. `0.9.0`)
- [ ] Landing page live — "Built Different" section with verified benchmark claims
- [ ] Documentation site live — interactive demos, copy-paste examples, a11y notes per component
- [ ] Open benchmark repo published — axe-core results, Angular modernity scorecard, bundle sizes
- [ ] Competitive positioning content — see `docs/COMPETITIVE_STRATEGY.md`
- [ ] Announcement — Angular community channels, Dev.to post, X/Twitter

### Exit criteria

- Package installable from npm registry
- Docs site publicly accessible
- Community announcement made

---

## Phase 5 — v1.0 General Availability 🏆

> **Milestone: Wow Factor #2 complete. The library is what it set out to be.**
> **Signal: Developers talk about it. Enterprises evaluate it. Competitors study it.**

### Wow Factor #2 — Astonishingly Good Theming

- [ ] Runtime theme switching (seamless, no flash)
- [ ] Design token system — full `--uilib-*` coverage across all components
- [ ] Theme preset management (multiple built-in presets)
- [ ] Brand customization path — documented, < 30 minutes to a custom brand
- [ ] Visual theme builder (horizon — if ready)

### Quality Gates

- [ ] Every component at scorecard ≥ 9 average (stretch from ≥ 8 at beta)
- [ ] Zero open accessibility issues from community reports
- [ ] Storybook stories cover all variants for every component
- [ ] Migration guide ready (for future major versions)

### Exit criteria

- Theming declared "Wow Factor #2 achieved"
- Community validation — unprompted adoption reports
- Version tagged `1.0.0` on npm

---

## Wow Factor Roadmap (Post v1.0)

Once v1.0 ships, the next committed strengths follow in order. Each gets its own phase.

| # | Wow Factor                      | What "nothing else comes close" means                               |
|---|---------------------------------|---------------------------------------------------------------------|
| 3 | Unmatched forms experience      | Best typed, reactive, signal-native forms DX in Angular — ever      |
| 4 | Exceptional DX                  | APIs so predictable developers never reach for docs for basic usage |
| 5 | Unbelievably polished animations | Motion that makes developers say "how did they do that"            |
| 6 | The best Angular table/grid     | Performance + composability that makes every other grid feel old    |

---

## How to Use This Document

**At the start of every session:** check your current phase, find the next unchecked item in the active tier, work top to bottom.

**When a component is done:** check its box here, update its row in `docs/COMPONENT_SCORES.md`, update `AI_AGENT_CONTEXT.md`.

**When a phase is complete:** update the Progress Summary table at the top of this file, then move to the next phase.

**This document is the map. `AI_AGENT_CONTEXT.md` is the compass (current session state). `COMPONENT_SCORES.md` is the scoreboard.**
