# Component Quality Scores

> **Purpose:** Single source of truth for quality scorecard results across all library components.
> Updated whenever a component completes a phase of the evolution workflow.
> Used to prioritize the hardening backlog — lowest-scored components get attention first.

**Gate:** A component is only considered production-quality when every category scores **≥ 8**.
**Prompt:** Run the 6-phase evolution workflow from [`docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`](prompts/COMPONENT_EVOLUTION_PROMPTS.md).

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

| Component    | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|--------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Button       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Input        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Textarea     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Select       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Checkbox     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| RadioButton  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ToggleButton | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ToggleSwitch | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| SelectButton | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputNumber  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputMask    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| InputOtp     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Rating       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Knob         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| KeyFilter    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Layout

| Component   | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Stack       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Inline      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Grid        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Container   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Divider     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Toolbar     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Fluid       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Fieldset    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Panel       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ScrollPanel | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Overlay & Modal

| Component     | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|---------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Dialog        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| DynamicDialog | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Drawer        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| BottomSheet   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Popover       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Tooltip       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ConfirmDialog | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ConfirmPopup  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Navigation & Menus

| Component    | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|--------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Breadcrumb   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ContextMenu  | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Dock         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Menu         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| MegaMenu     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Menubar      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| PanelMenu    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| TieredMenu   | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Stepper      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

## Data Display

| Component         | API | A11y | Perf | Comp | Theme | DX  | Docs | Polish | Angular | Feel | Avg | Status |
|-------------------|-----|------|------|------|-------|-----|------|--------|---------|------|-----|--------|
| Table             | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| TreeTable         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Tree              | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| TreeSelect        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
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
| Ripple          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ScrollTop       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| StyleClass      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| FocusTrap       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| AnimateOnScroll | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| AutoFocus       | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Bind            | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| BlockUI         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ClassNames      | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Inplace         | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Image           | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| ImageCompare    | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Avatar          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Upload          | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| SplitButton     | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |
| Terminal        | —   | —    | —    | —    | —     | —   | —    | —      | —       | —    | —   | 🔴     |

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

| Document                                                              | Relevance                                          |
|-----------------------------------------------------------------------|----------------------------------------------------|
| [Component Evolution Prompts](prompts/COMPONENT_EVOLUTION_PROMPTS.md) | The 6-phase AI workflow that produces these scores |
| [Vision — Component Philosophy](VISION.md#component-philosophy)       | The 10-layer quality model and ≥8 gate             |
| [Accessibility Guide](reference/systems/ACCESSIBILITY.md)             | Detail behind the A11y score category              |

