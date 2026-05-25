# Next-Level Strategic Response — ui-lib-custom

> **Source brief:** [`OPUS_NEXT_LEVEL_PROMPT.md`](./OPUS_NEXT_LEVEL_PROMPT.md)
> **Score snapshot used:** [`docs/COMPONENT_SCORES.md`](../COMPONENT_SCORES.md) (state as of 2026-05-25)
> **Audience:** Library maintainers + AI agents executing per-component upgrades.
>
> This document is the **answer** to the three requests in the prompt. It does not restate
> the prompt; cross-reference it for context. Everything below is library-specific, anchored
> in the existing 11-category × 182-checkbox scoring system, and intended to be executable.

---

## Request 1 — Strategic Roadmap: What "Next Level" Means

### 1.1 The math of 8.x → 10.0 in this library

At 8.0 exactly, a component has **~37 unchecked items out of 182** (`0.2 × 182 ≈ 36.4`).
Across the inventory, those unchecked items are **not randomly distributed** — they cluster
in five predictable buckets. This is the single most important strategic insight in this
document: most of the "missing 20%" is the *same 20%* on every component.

#### Cluster heatmap — where unchecked items concentrate

| Rank | Cluster                                            | Affected components | Cause                                                                    | Fix venue                  |
|------|----------------------------------------------------|---------------------|--------------------------------------------------------------------------|----------------------------|
| 1    | **Category 11 — formal competitive research**      | 100+ (all)          | Done informally during build; never written to `COMPETITIVE_BENCHMARKS`  | Library-wide sprint        |
| 2    | **Category 7 — `docs/reference/components/<x>.md`** | ~50                 | Co-located README is excellent; reference doc is a stub                  | Generation + per-component |
| 3    | **Category 2 — NVDA/VoiceOver session recorded**    | ~60                 | axe-core passes; no recorded manual SR walkthrough                       | Library-wide sprint        |
| 4    | **Category 8 — `prefers-reduced-motion` complete**  | ~30                 | Reduced motion partially applied (transitions yes, transforms missed)    | Library-wide audit + fix   |
| 5    | **Category 10 — "non-Angular dev" / "won't return" tests** | ~50         | Never run as a formal protocol                                           | Process change             |
| 6    | **Category 6 — minimal example copy-pastes clean** | ~30                 | Examples reference `provideZonelessChangeDetection` setup, easy to miss  | Per-component README diff  |
| 7    | **Category 3 — gzip payload measured per entry**   | 100+                | Never measured per component, only library-wide                          | One-off scripted audit     |

> **Strategic conclusion:** ~70% of the gap from 8.x → 9.5+ can be closed by **5 cross-cutting
> sprints**, not 100 per-component sessions. The remaining 30% is genuinely component-specific.

### 1.2 Worked example — `Select` at 8.2

`Select` currently scores `API=8, A11y=9, Perf=8, Comp=8, Theme=8, DX=8, Docs=8, Polish=8, Angular=9, Feel=8`,
Comp11 unevaluated. Predicted unchecked items, ranked by ease/impact:

| Category | Likely unchecked items (high-confidence guesses)                                                                              | Fix cost | Lift to score |
|----------|-------------------------------------------------------------------------------------------------------------------------------|----------|---------------|
| API (8)  | (a) no discriminated union for single vs multiple selection state, (b) `optionGroupLabel` typed `string` not `keyof T`         | 0.5 day  | 8 → 9         |
| Perf (8) | (a) options list re-renders on every parent CD cycle (no `@defer` when closed), (b) `@for` track key not stable for primitives | 0.5 day  | 8 → 9         |
| Comp (8) | (a) no `ng-template` for option/selected-display rendering with typed `$implicit` context, (b) no `optionTemplate` slot        | 1 day    | 8 → 10        |
| Theme(8) | (a) checked-icon, panel-shadow, group-header-bg not exposed as `--uilib-select-*` vars, (b) bootstrap variant not visually distinguished from minimal | 0.5 day | 8 → 9     |
| DX (8)   | (a) string `value` input cannot infer generic `T`, (b) no JSDoc on the 12 inputs                                              | 0.5 day  | 8 → 9         |
| Docs (8) | (a) reference doc is stub, (b) demo page missing `loading` + `empty` states, (c) theming var table missing                     | 0.5 day  | 8 → 9         |
| Polish(8)| (a) panel enter/exit not animated (instant open), (b) loading skeleton state inside panel missing                              | 0.5 day  | 8 → 9         |
| Feel (8) | (a) no type-ahead "buffer ring" indicator like macOS, (b) no haptic-style focus pulse on Home/End                              | 0.5 day  | 8 → 9         |
| Comp11   | (a)…(e) full benchmark table vs Material/PrimeNG/Radix/Ark/cdk-listbox + APG URL                                              | 0.5 day  | — → 9         |

**Total: ~5 dev-days, ending in `Avg ≈ 9.0` (every category 9, two at 10).**

This is the canonical upgrade slot — every 8.2 component should follow the same shape.

### 1.3 The five highest-leverage cross-cutting sprints

Each of these moves dozens of components simultaneously without per-component work.

**Sprint A — "Competitive benchmark backfill" (Category 11)**
- One PR per component family (overlays, form controls, data display, etc.).
- For each component, a 50-line entry in `COMPETITIVE_BENCHMARKS.md`: APG link, Material URL,
  PrimeNG URL, Radix URL, Ark URL, gap table, differentiator bullet.
- Template enforced by a `scripts/check-benchmarks.mjs` lint step.
- **Estimated impact:** ~30 components advance 0.3–0.4 average; raises Comp11 from `—` to 9 on all.
- **Estimated cost:** 2 weeks single-person, parallelisable to 3 days with AI assist.

**Sprint B — "Reference doc generator" (Category 7)**
- Build `scripts/generate-reference-doc.mjs` that consumes:
  - The co-located `README.md`
  - The component's `.ts` (signal inputs/outputs via TS AST)
  - The `<component>.scss` (`--uilib-*` var declarations)
  - The test file (extracts a11y test names as the "verified keyboard table")
- Output: `docs/reference/components/<name>.md` with API table, var table, keyboard table.
- Per-component hand-finish for examples and edge cases.
- **Estimated impact:** ~50 components advance 0.2–0.3 average.
- **Estimated cost:** 3 days for generator + 1 hour/component for finish (~6 days for 50).

**Sprint C — "Screen reader session recordings" (Category 2)**
- Pair NVDA+Chrome and VoiceOver+Safari runs of the demo app.
- Record a short transcript per component (5–10 lines: what was announced, what was missing).
- Store under `docs/reference/a11y-sessions/<component>.md`.
- Failed runs → bugs → fixes.
- **Estimated impact:** ~60 components advance ≥ 0.2 A11y; finds 5–10 real bugs.
- **Estimated cost:** 1 day NVDA + 1 day VoiceOver + 2 days fix follow-up.

**Sprint D — "Reduced-motion completeness audit" (Category 8)**
- Add a global stylelint rule: every `transition:` or `animation:` in a component SCSS
  file must have a sibling `@media (prefers-reduced-motion: reduce)` block in the same selector.
- Auto-fixer scaffolds the empty media query; humans fill the reduced behaviour.
- **Estimated impact:** ~30 components advance 0.1–0.2 Polish.
- **Estimated cost:** 1 day to write rule + 1 day fixes.

**Sprint E — "Per-component gzip budget" (Category 3)**
- Extend `scripts/bundlesize` to emit a per-entry-point gzip number into
  `docs/reference/bundle-sizes.json`. Fail PRs that grow > 5%.
- **Estimated impact:** 100+ components get the "gzip payload measured" checkbox.
- **Estimated cost:** 1 day.

> **Total cross-cutting investment: ~3 weeks** to move the whole inventory 0.4–0.7 average,
> with a single AI-assisted maintainer. This is the single highest-ROI work available right now.

### 1.4 Strategic sequence — what to do first

| Option | Description                                                            | Recommendation |
|--------|------------------------------------------------------------------------|----------------|
| A      | Close all 8.x → 9.5+ first, *then* build data grid                     | ❌ Too slow; the brand needs a flagship to convert evaluators |
| B      | Build data grid as a greenfield 10/10, then backfill                   | ⚠️ Risk: 100 components stay visibly "good not great" for 8+ weeks |
| **C**  | **Parallel: 1 dev-week/cycle on Sprints A–E + 1 dev-week on data grid scaffolding** | ✅ Recommended |

**Recommended cadence:**

```
Weeks 1–3: Sprints A + B + E in parallel (1 maintainer)  →  inventory avg ~8.8
Weeks 1–6: Data grid scaffolding (separate dev / AI agent track)
Weeks 4–5: Sprints C + D                                  →  inventory avg ~9.2
Weeks 6–8: 8.2-cluster per-component upgrades (Section 3) →  inventory avg ~9.5
Weeks 7–10: Data grid β + Query Builder scaffolding
```

By week 10: ~90 components at ≥ 9.5, a 10/10 data grid in beta, query builder scaffolded.
This is the "next level" inflection point.

### 1.5 Missing dimensions — should Category 12 exist?

Yes. The current 11 categories miss three commercially important dimensions:

| Candidate Cat 12         | Why it matters now                                              | Sample checkboxes (target ~12 items) |
|--------------------------|-----------------------------------------------------------------|--------------------------------------|
| **Internationalisation** | i18n is on the queued wow-factor list and underspecified        | LTR/RTL verified · `dir="rtl"` integration test · pluralisation for "X items selected" via `Intl.PluralRules` · locale-aware date/number/currency in DatePicker/InputNumber/Knob · translation contract documented (no string literals in TS) · keyboard shortcuts adapt for non-Latin keyboards · `aria-label` translatable input · ICU message format examples · per-component translation key contract · BiDi-safe in mixed-direction text · all logical CSS properties confirmed via RTL e2e test · screen-reader pronunciation hints (`lang="…"` propagation) |
| **Migration / Adoption** | Drives enterprise sales — "how hard to leave Material/PrimeNG?" | Codemod from Material equivalent published · codemod from PrimeNG equivalent published · drop-in `ng add` schematic · CSS-variable adapter shim documented · breaking-change matrix vs. previous library major · Storybook story showing the migration diff · public API SemVer commitment recorded · backwards-compat alias for legacy selector · …                  |
| **Telemetry hooks**      | Premium tier needs observability without coupling consumers     | `(uilibEvent)` neutral event channel · structured `data-uilib-state` attributes on root host · documented `MutationObserver` selectors for analytics tools · `aria-live` events also broadcast as DOM events · no PII surface in any default output · zero global state mutation · …                                                                              |

**Recommendation:** add Category 12 = "Internationalisation" first (12 checkboxes). It is the
next committed wow-factor, and Sprint A naturally surfaces this gap during competitive research.

### 1.6 Genuine white space in the Angular ecosystem

| Opportunity                                                                  | Competitor weakness                                                                                              | Library lead |
|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|--------------|
| **Zoneless-first components** (no `zone.js` required)                         | Material is zone-coupled in practice; PrimeNG documented zoneless support is partial                              | Already shipped — formalise + market |
| **CSS cascade layer discipline** (consumer CSS always wins)                   | Material, PrimeNG, NG-Zorro all use specificity battles                                                            | Already shipped — write the marketing piece |
| **Runtime theme variant switching** (`material` ↔ `bootstrap` ↔ `minimal`)    | Nobody else offers it; Material themes are buildtime; PrimeNG `PrimeNGConfig` is partial                          | Already shipped — convert to evaluator wow-moment |
| **WAI-ARIA APG-traceable a11y** (every component links its APG pattern)       | Material vague, PrimeNG often skips it, Radix names patterns but offers no Angular                                  | Halfway there — Sprint B + C closes |
| **Per-component tree-shakable entry points**                                  | Material and PrimeNG ship monolithic-ish; Spartan does it but covers ~20 components                               | Already shipped — quantify in benchmark table |
| **AI-native components** (streaming chat, prompt playground, diff viewer)     | Nobody Angular ships these. React has many, Vue has some.                                                          | Greenfield premium — high commercial value |
| **First-class signals API across compound widgets** (Tree, Table, Tabs all signal-in/signal-out) | Material still RxJS-leaning; PrimeNG mixed                                                                      | Already shipped — needs evangelism |
| **Headless / styled split** (CDK exists but is small; Spartan limited)        | Adding `ui-lib-custom/headless` entry points for Select, Combobox, Menu would beat Spartan within 6 months         | Greenfield — small surface, large effect |

**Highest-margin white space:** AI-native components and headless primitives. Both are
plausible 8-week premium add-ons that no Angular competitor matches.

---

## Request 2 — Component Anatomy Framework: The Complete DOD

### 2.1 The 14 layers — full anatomy map

The 11 scoring categories cover *quality dimensions*. Each component is also built from
*structural layers*. A complete DOD covers both. Layer → category mapping:

| #  | Layer                                              | Primary categories  | Verifier             |
|----|----------------------------------------------------|---------------------|----------------------|
| 1  | TypeScript class (`<x>.ts`)                        | API, Angular, DX     | tsc + ESLint         |
| 2  | Template (`<x>.html`)                              | A11y, Angular        | template ESLint      |
| 3  | Styles (`<x>.scss`)                                | Theme, Polish        | stylelint            |
| 4  | Public types (`<x>.types.ts`)                      | API, DX              | tsc                  |
| 5  | Barrel (`index.ts`)                                | API                  | entry-points.spec.ts |
| 6  | Secondary entry point (`ng-package.json`)          | Perf (tree-shake)    | `verify:tree-shaking`|
| 7  | Co-located README                                  | DX, Docs             | manual + linter      |
| 8  | Reference doc (`docs/reference/components/x.md`)   | Docs                 | Sprint B generator   |
| 9  | Unit spec (`<x>.spec.ts`)                          | A11y, Angular        | Jest                 |
| 10 | A11y spec (`<x>.a11y.spec.ts`)                     | A11y                 | jest-axe             |
| 11 | E2E a11y (`e2e/a11y-full-sweep.spec.ts` entry)     | A11y                 | Playwright           |
| 12 | Demo page (`projects/demo/...`)                    | Docs, Polish, Feel   | manual + e2e         |
| 13 | Storybook story (`<x>.stories.ts`)                 | Docs, DX             | Storybook build      |
| 14 | Competitive benchmark entry                        | Comp11               | Sprint A             |

A component is **done** only when all 14 layers exist *and* all 11 categories ≥ 9. The
existing scoring system measures (1)–(13) indirectly; (14) is the new explicit checkbox.

### 2.2 Archetype DOD packs

#### Archetype 1 — Simple display (Badge, Tag, Avatar, Icon, Divider, Chip)

| Item                          | Target               | Common miss                                |
|-------------------------------|----------------------|--------------------------------------------|
| APG pattern                   | None (decorative) or "Status indicator" | Forgets to declare `role="status"` when content is live |
| Keyboard contract             | None for purely decorative; **dismissible variants need Backspace/Delete to remove** | Misses Backspace on Chip |
| axe-core rules in play        | `color-contrast`, `aria-hidden-focus`, `image-alt`, `link-name` | Decorative icons not `aria-hidden` |
| Min test count                | 6 (render × variant × size × content projection × axe × dismissible-if-applicable) | <4 |
| Critical category             | **Polish + Theme** — these components must look perfect in all 3 variants × dark/light × all sizes |  |
| Cheapest 8 → 10 win           | Add `oklch()`-based theme vars for tone-on-tone state                |  |

#### Archetype 2 — Form control (Input, Select, AutoComplete, DatePicker, CascadeSelect, ColorPicker, Slider, Knob, InputNumber, Password, Rating, ToggleSwitch, ToggleButton, Checkbox, RadioButton, TreeSelect, Listbox)

| Item                          | Target                                                                                                                  |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| APG pattern (link in README)  | combobox · listbox · switch · spinbutton · slider · radio · checkbox — pick correctly                                    |
| Keyboard contract             | Full APG keyboard model with type-ahead for listbox/combobox/menu/tree                                                   |
| ControlValueAccessor          | **Required.** Implements `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`.                       |
| FormField integration         | Works inside `<ui-lib-form-field>` with label + error + hint                                                              |
| axe-core rules in play        | `label`, `aria-required-attr`, `aria-required-children`, `aria-allowed-attr`, `aria-input-field-name`, `select-name`     |
| Min test count                | 18 (render × disabled × required × invalid × CVA roundtrip × keyboard ×N × axe × screen reader × dark × 3 variants × 3 sizes) |
| Critical category             | **A11y + DX** — form controls are tested daily by consumers; small DX papercuts compound                                 |
| Cheapest 8 → 10 win           | Add `ng-template` slot for option rendering with typed `$implicit` context                                              |

#### Archetype 3 — Compound / data (Table, Tree, TreeTable, VirtualScroller, DataView, Listbox, OrderList, PickList, OrganizationChart, Timeline)

| Item                          | Target                                                                                          |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| APG pattern                   | grid · treegrid · tree · listbox · feed                                                          |
| Keyboard contract             | Full grid navigation: arrows × 4, Home/End row, Ctrl+Home/End grid, PageUp/PageDown, type-ahead |
| Selection model               | Single + multiple + range; signal-based; SelectionModel-compatible interop                       |
| Virtualisation                | `@defer` or `cdk-virtual-scroll` for > 100 items; tested at 10,000 items                         |
| axe-core rules                | `td-headers-attr`, `th-has-data-cells`, `scope-attr-valid`, `aria-row-col-count`, `region`       |
| Min test count                | 25 (selection × sort × filter × pagination × virtualisation × keyboard ×N × axe × performance)    |
| Critical category             | **Perf + Comp** — these components are how the library is judged on real data                    |
| Cheapest 8 → 10 win           | Typed item template context (`{ $implicit: T; index: number; level: number; expanded: boolean }`) |

#### Archetype 4 — Overlay (Dialog, Drawer, Popover, Tooltip, ConfirmDialog, ConfirmPopup, BottomSheet, DynamicDialog)

| Item                          | Target                                                                          |
|-------------------------------|---------------------------------------------------------------------------------|
| APG pattern                   | dialog · alertdialog · tooltip · disclosure                                      |
| Keyboard contract             | Tab traps inside; Escape closes; Enter on default action; Shift+Tab wraps         |
| Focus management              | CDK `FocusTrap`; restores focus to opener; first-focusable on open; **no focus vacuum** if all inside disabled |
| Scroll lock                   | Body scroll locked while open; overflow-anchor neutral                            |
| Mount strategy                | `@defer` until first open; teardown after exit animation                          |
| axe-core rules                | `aria-dialog-name`, `focus-order-semantics`, `region`                            |
| Min test count                | 14 (open × close × esc × backdrop × focus trap × focus restore × axe × reduced-motion) |
| Critical category             | **A11y + Polish** — overlays are where motion + a11y interact most               |
| Cheapest 8 → 10 win           | Add `--uilib-<name>-enter-duration` token + `prefers-reduced-motion` 0ms override |

#### Archetype 5 — Navigation (Tabs, Accordion, Menu, Menubar, ContextMenu, TieredMenu, MegaMenu, PanelMenu, Stepper, Breadcrumb, SpeedDial, Dock)

| Item                          | Target                                                                                                 |
|-------------------------------|--------------------------------------------------------------------------------------------------------|
| APG pattern                   | tabs · accordion · menu · menubar · disclosure · navigation                                              |
| Keyboard contract             | Arrow nav, Home/End, type-ahead for menus, `aria-current` on active                                     |
| Routing integration           | Works with `routerLink`, `routerLinkActive`; emits `valueChange` without router coupling                 |
| axe-core rules                | `landmark-no-duplicate-banner`, `landmark-unique`, `aria-required-children`, `region`                    |
| Min test count                | 16                                                                                                       |
| Critical category             | **Comp + Composability** — these are the components a consumer will most need to skin and re-arrange     |
| Cheapest 8 → 10 win           | Named slot for item template + typed `$implicit` context with `level`                                    |

### 2.3 Upgrade path template — 8.x to 10.0

A concrete, ordered playbook usable for any 8.x component.

| Step | Action                                          | Categories advanced       | Cost  |
|------|-------------------------------------------------|---------------------------|-------|
| 1    | Add competitive benchmark entry (Sprint A spec) | Comp11 → 9                | 30 m  |
| 2    | Generate reference doc (Sprint B)               | Docs 8 → 9                | 30 m  |
| 3    | Audit `prefers-reduced-motion` in SCSS          | Polish 8 → 9              | 15 m  |
| 4    | Add typed `ng-template` slot(s)                 | Comp 8 → 10               | 1 h   |
| 5    | Add JSDoc to every input (with default)         | DX 8 → 9                  | 30 m  |
| 6    | Export discriminated union for mode (where applicable) | API 8 → 9          | 1 h   |
| 7    | Add `@defer` for off-screen panel (if overlay/list) | Perf 8 → 9            | 30 m  |
| 8    | Expose missing theme vars from BEM file         | Theme 8 → 9               | 30 m  |
| 9    | Implement enter/exit animation + token          | Polish 9 → 10             | 1 h   |
| 10   | Add screen reader session note                  | A11y 9 → 10               | 20 m  |
| 11   | Add demo page edge-case sections                | Feel 8 → 9                | 1 h   |
| 12   | Re-score, commit, update `COMPONENT_SCORES.md`  | —                         | 15 m  |

**Total per component: ~5 hours of focused work** (or ~3 with AI pair). At 4 components/week
solo, the entire 8.x cluster (~30 components) closes in 7–8 weeks.

### 2.4 Category 10 — Emotional Quality, operationalised

The only category without an external standard. Concrete framework for each of the 10 items:

| # | Item                                          | What it means                                                | Verification                                                 |
|---|-----------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| 1 | Zero-friction entry point                     | `<ui-lib-x />` works without inputs                          | Open Storybook in incognito; render with no props; not broken |
| 2 | Intelligent defaults                          | Default rendering is shippable, not "starter template"        | A non-technical reviewer says "that looks fine to ship"      |
| 3 | Animations feel native                        | 120–180ms ease-out for enter, 80–120ms ease-in for exit       | Compare side-by-side with Linear app; can't tell the difference |
| 4 | Micro-interactions present                    | Every interactive element has hover + focus + active states with perceptible (≥ 1px / ≥ 4% opacity) delta | Click through every interactive element; no "dead" feeling |
| 5 | No visual leaks                               | No layout shift on state change; no overflow; no z-index war  | Resize browser 320–4K; rotate device; no glitch              |
| 6 | Error states communicate                      | Error colour + icon + text + screen-reader announcement       | NVDA pass announces error; sighted user sees it; colourblind too |
| 7 | Scales gracefully                             | Test at 1, 100, 10,000 items                                  | Storybook story `Stress test (10k)` exists and renders < 100ms |
| 8 | Non-Angular dev test                          | Open demo, observe reaction                                   | Protocol: "Show this for 30s, no scrolling, ask: what library is this?" Goal: not identified as Material/PrimeNG |
| 9 | A11y engineer test                            | Open demo, run axe, run NVDA, run keyboard-only               | Zero violations, all interactions reachable + understandable |
| 10| "I don't want to go back" test                | Could a maintainer happily delete the Material/PrimeNG equivalent and use this? | 3 maintainers vote yes; documented in component README footer |

**Concrete timing values for item 3 (recommended tokens):**

```scss
@layer uilib.tokens {
  :root {
    --uilib-transition-duration-instant: 80ms;     /* dismiss, close */
    --uilib-transition-duration-quick:   120ms;    /* state toggle */
    --uilib-transition-duration-fast:    180ms;    /* enter, open */
    --uilib-transition-duration-medium:  240ms;    /* page-level */
    --uilib-transition-duration-slow:    320ms;    /* never use without justification */

    --uilib-transition-easing-enter:    cubic-bezier(0.16, 1, 0.3, 1);    /* easeOutExpo lite */
    --uilib-transition-easing-exit:     cubic-bezier(0.7, 0, 0.84, 0);   /* easeInExpo lite */
    --uilib-transition-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);     /* Material standard */
  }
}
```

**Concrete micro-interaction inventory by archetype (item 4):**

| Archetype       | Required micro-interactions                                                                |
|-----------------|--------------------------------------------------------------------------------------------|
| Form control    | Focus ring fade-in (120ms), label colour shift on focus, error icon pop (transform: scale 0.9 → 1) |
| Overlay         | Backdrop fade (180ms), panel scale 0.96 → 1 + opacity 0 → 1 (180ms ease-out)                |
| Navigation      | Indicator slide between active items (180ms cubic-bezier), hover background (120ms)         |
| Compound/data   | Row hover surface tint (80ms), sort arrow rotate (180ms), selection check pop                |
| Display         | Optional pulse on update; opacity 0.6 → 1 fade on mount if hydrated                         |

### 2.5 Category 11 — Research Protocol (per component)

**Time budget: 45 minutes per component.** Output goes to `COMPETITIVE_BENCHMARKS.md`.

```markdown
## <Component>

**APG pattern:** <URL to https://www.w3.org/WAI/ARIA/apg/patterns/...>
**ui-lib-custom score:** <avg> · A11y <n> · DX <n> · Comp <n>

### Reference implementations
| Library                 | Component             | Last reviewed | URL |
|-------------------------|------------------------|---------------|-----|
| Angular Material        | mat-<name>             | YYYY-MM-DD    | …   |
| PrimeNG                 | p-<name>               | YYYY-MM-DD    | …   |
| Radix UI (React)        | <Radix.Name>           | YYYY-MM-DD    | …   |
| Ark UI                  | <ark-name>             | YYYY-MM-DD    | …   |

### Parity matrix (ours vs. best)
| Capability             | ui-lib-custom | Material | PrimeNG | Radix | Notes |
|------------------------|---------------|----------|---------|-------|-------|
| Signal inputs/outputs  | ✅            | ❌       | ❌      | n/a   | Differentiator |
| `prefers-reduced-motion` complete | ✅ | ⚠️ partial | ⚠️ partial | ✅ |       |
| Type-ahead             | ✅            | ✅       | ✅      | ✅    | parity |
| `optionTemplate` ng-template | …       | …        | …       | n/a   |       |
| Headless variant       | ❌            | ❌       | ❌      | ✅    | Future Sprint G |

### Three explicit differentiators
1. (Library exclusive — none of the four reference libraries does this) …
2. (Beats one specific reference library) …
3. (Matches best-in-class with cleaner API) …

### Documented gaps
- <gap 1>: <why we accept it / when we'd close it>
```

Per-component time breakdown:
- 5 min — open all 4 reference URLs
- 10 min — scan their API/keyboard tables
- 10 min — fill parity matrix
- 10 min — pick differentiators
- 5 min — document gaps
- 5 min — record in `COMPONENT_SCORES.md` (Comp11 column from `—` to integer)

**100 components × 45 min = 75 hours. Two solo weeks. One week with AI pair.**

---

## Request 3 — Per-Component Prioritisation

### 3.1 Top 15 components to upgrade first

Ranked by: **commercial visibility × ease of 8 → 10 lift × current gap size**.

| Rank | Component   | Cur. avg | Why it's first                                                                                  | Expected post-upgrade |
|------|-------------|----------|--------------------------------------------------------------------------------------------------|------------------------|
| 1    | Select       | 8.2     | Most-clicked form control in any enterprise demo; large public surface area                       | 9.5                    |
| 2    | DatePicker   | 8.3     | Single component evaluators judge "real" form-library quality on                                  | 9.6                    |
| 3    | AutoComplete | 8.2     | Combobox is the #2 enterprise form pattern; ARIA complexity makes it a differentiator             | 9.5                    |
| 4    | Table        | 8.6     | Highest commercial weight; flagship for premium data grid story                                   | 9.8                    |
| 5    | Dialog       | 8.6     | Overlay foundation — improvements propagate to all other overlays                                  | 9.7                    |
| 6    | Tree         | 8.6     | Hierarchical data is a known Angular weak point; differentiation opportunity                       | 9.6                    |
| 7    | TreeTable    | 8.5     | Same as Tree + Table compound; rare in Angular ecosystem                                           | 9.5                    |
| 8    | CascadeSelect| 8.2     | Almost nobody else has it; visible differentiator in 1-min eval                                    | 9.4                    |
| 9    | ColorPicker  | 8.2     | Common premium ask; visual polish has outsized impact on "Feel"                                    | 9.4                    |
| 10   | Carousel     | 8.3     | High visual-impact, common in marketing/CMS demos                                                  | 9.4                    |
| 11   | Galleria     | 8.3     | Same; pairs with Carousel on evaluator demos                                                       | 9.4                    |
| 12   | OrganizationChart | 8.3 | Nobody else does it well in Angular; immediate differentiator                                      | 9.4                    |
| 13   | VirtualScroller | 8.5  | Foundational for premium grid; perf credibility                                                    | 9.6                    |
| 14   | Knob         | 8.2     | Quirky, polish-bound; a 9.5 Knob is a Twitter-shareable artifact                                    | 9.5                    |
| 15   | Avatar       | 8.2     | Most-used display component in any dashboard; quick lift                                            | 9.4                    |

### 3.2 Root cause for the 8.2–8.3 cluster

15 components cluster at 8.2–8.3 with near-identical column patterns
(`API=8, A11y=9, Perf=8, Comp=8, Theme=8, DX=8, Docs=8, Polish=8, Angular=9, Feel=8`).
This is **not coincidence** — it's the same 5 unchecked items repeating:

| Repeated unchecked item                                  | Categories blocked  | Fix venue                       |
|----------------------------------------------------------|---------------------|---------------------------------|
| No typed `ng-template` slot for item/option rendering    | Comp, DX            | Per-component (Step 4 in §2.3) |
| Reference doc is a stub                                  | Docs                | Sprint B                        |
| No `@defer` on hidden/inactive panel                     | Perf                | Per-component (Step 7)         |
| One missing theme var (usually shadow or focus ring)     | Theme               | Per-component (Step 8)         |
| Enter/exit animation absent or instant                   | Polish, Feel        | Per-component (Step 9)         |

**Batch action that unblocks the cluster in one sprint (~1 week with AI pair):**

```bash
# For each of the 15 components, a single PR that:
# 1. Runs the Sprint B reference-doc generator   → Docs 8 → 9
# 2. Adds the standard ng-template slot pattern   → Comp 8 → 10
# 3. Wraps off-screen panel in @defer            → Perf 8 → 9
# 4. Exposes the missing theme var               → Theme 8 → 9
# 5. Adds enter/exit animation with token        → Polish + Feel 8 → 9
```

Outcome: **all 15 components from ~8.25 to ~9.4 in one week**.

### 3.3 The Category 11 hidden deficit — recommended approach

**Recommendation: tiered (c).** Bulk research is theoretically efficient but produces
unreviewable PRs and stale comparisons. Per-component-during-evolution is too slow.
A 3-tier approach matches commercial risk:

| Tier | Components                                              | Target window | Output           |
|------|---------------------------------------------------------|---------------|------------------|
| T1   | Top 15 (§3.1) + foundational primitives (Button, Input, Checkbox) | Week 1     | Full benchmark entries |
| T2   | All remaining 8.x components                            | Weeks 2–3     | Full benchmark entries |
| T3   | All 9.0+ components                                     | Weeks 4–5     | Light entries (3 columns: APG link, biggest competitor, differentiator) |

After this, **Category 11 leaves `—` for the entire inventory** and the average jumps ~0.4
across the library.

### 3.4 Cadence and process

**Realistic AI-assisted cadence:**

| Track                            | Components/week | Notes                                          |
|----------------------------------|-----------------|------------------------------------------------|
| Per-component upgrades (5h each) | 4–5             | One maintainer, AI pair, no other duties        |
| Sprint A (Comp11 backfill)        | 15–20           | Parallel, separate session, AI-heavy           |
| Sprint B (reference docs)         | 30+ (after generator) | One-off generator + 1 h hand-finish per     |
| Premium component (data grid)     | 1 per 6 weeks   | Greenfield 10/10 from day 1                    |

**Weekly rhythm proposal:**

```
Monday      — pick 4 components from §3.1 / §3.2 batch
Tue–Thu     — execute upgrade template (§2.3) on those 4
Friday AM   — run Sprint A benchmark entries for next week's 4
Friday PM   — update COMPONENT_SCORES.md, write handoff in AI_AGENT_CONTEXT.md
```

Category 11 research **must run as a separate track** — context-switching mid-upgrade
between "fix code" and "open 4 reference library docs and read them" destroys flow.

### 3.5 Premium vs. polish trade-off — when to stop polishing

**Stop polishing a component when:**
- Average ≥ 9.5
- No category below 9
- Category 11 has a complete benchmark entry
- The "I don't want to go back" test passes with 3 maintainer votes

**Continue polishing a component if:**
- Average < 9.0 **and** it appears in §3.1 (commercial top 15)
- Any category < 8.5 (gate violation)
- Demo page does not show it favourably vs. the equivalent Material/PrimeNG component

**Hard switch to premium build when:**
- 50+ components ≥ 9.0
- Sprints A + B + D are 100% complete
- Inventory average ≥ 9.0

At today's snapshot (avg ~8.7 across the inventory), the maintainer should:
- Finish Sprints A + B in weeks 1–3 (raises inventory avg to ~9.0)
- Run §3.2 cluster batch in week 2 (raises 8.2 cluster to 9.4)
- Begin data grid scaffolding in parallel from week 1
- Hard-pivot more capacity to data grid + query builder once avg crosses 9.0

This sequence puts the library at **inventory average 9.0+, premium grid in beta, two
premium components in flight by week 10** — which is the inflection point where the
library is credibly "next level" rather than "very good".

---

## Appendix A — Code patterns the upgrade template uses

### A.1 Typed `ng-template` slot (Step 4)

```ts
// select.types.ts
export interface UiLibSelectOptionContext<T> {
  $implicit: T;
  index: number;
  selected: boolean;
  disabled: boolean;
  active: boolean;
}

// select.ts
@ContentChild('option', { read: TemplateRef })
optionTemplate = contentChild<TemplateRef<UiLibSelectOptionContext<unknown>>>('option');
```

```html
@for (option of options(); track trackBy(option); let i = $index) {
  <div
    role="option"
    [id]="optionId(option)"
    [attr.aria-selected]="isSelected(option)"
    [attr.aria-disabled]="isDisabled(option) || null"
  >
    @if (optionTemplate(); as tpl) {
      <ng-container *ngTemplateOutlet="tpl; context: contextFor(option, i)" />
    } @else {
      {{ display(option) }}
    }
  </div>
}
```

### A.2 `@defer` panel (Step 7)

```html
@if (isOpen()) {
  @defer (on viewport; prefetch on idle) {
    <div class="uilib-select__panel" role="listbox" [attr.aria-label]="label()">
      <!-- panel content -->
    </div>
  } @placeholder {
    <div class="uilib-select__panel uilib-select__panel--loading" aria-busy="true"></div>
  }
}
```

### A.3 Enter/exit animation token (Step 9)

```scss
@layer uilib.components {
  .uilib-select__panel {
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0.96);
    transition:
      opacity var(--uilib-transition-duration-fast) var(--uilib-transition-easing-enter),
      transform var(--uilib-transition-duration-fast) var(--uilib-transition-easing-enter);

    &--open {
      opacity: 1;
      transform: scaleY(1);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
      transform: none;
    }
  }
}
```

### A.4 Discriminated union for mode (Step 6)

```ts
export type UiLibSelectMode<T> =
  | { kind: 'single';   value: T | null;            onChange: (next: T | null) => void }
  | { kind: 'multiple'; value: readonly T[];        onChange: (next: readonly T[]) => void }
  | { kind: 'range';    value: readonly [T, T] | null; onChange: (next: readonly [T, T] | null) => void };
```

---

## Appendix B — How this response will be kept current

| Trigger                                  | Update action                                         |
|------------------------------------------|-------------------------------------------------------|
| `COMPONENT_SCORES.md` snapshot changes   | Re-rank §3.1 and re-evaluate cluster in §3.2          |
| Sprint A complete                        | Strike-through §1.3 Sprint A row, update Comp11 column |
| Category 12 (i18n) added                 | Add new checklist counts; recalculate 8.0 thresholds  |
| Data grid β shipped                      | Update §3.5 stop-rule and §1.4 sequence               |

This response is intentionally version-tied to the 2026-05-25 snapshot. Re-run the prompt
after each major sprint to refresh.

