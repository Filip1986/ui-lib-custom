# CSS Theming: Progress & Competitive Position

> **Last updated:** 2026-05-23
> **Detailed architecture reference:** [docs/reference/systems/CSS_ARCHITECTURE.md](reference/systems/CSS_ARCHITECTURE.md)

---

## Where We Stand

The CSS/SCSS architecture of `ui-lib-custom` has been audited, benchmarked against PrimeNG and Angular Material, and refactored in a focused session on 2026-05-23. The result is a cleaner, more consistent foundation that is already ahead of both competitors on several axes while having clear, documented paths to close the remaining gaps.

---

## What We Have

### Strengths

**Host-element-scoped tokens (better than PrimeNG, on par with Angular Material)**
Every component defines its CSS variables on its own element selector (`ui-lib-button { --uilib-button-bg: ... }`), not on `:root`. This means:

- Consumers can override tokens for one component without affecting others
- Components can be dropped into any host application without polluting the global stylesheet
- Multiple instances of the same component can have different styles in the same page

**Runtime variant switching (unique advantage over both competitors)**
PrimeNG requires a preset rebuild to change the visual variant. Angular Material requires importing a different theme. `ui-lib-custom` switches variants at runtime by changing a class — no rebuild, no page reload. This is enabled by the CSS variable architecture: variant classes just override CSS variables on the host element.

**Density system (PrimeNG has none; Angular Material removed theirs in M3)**
A single `data-density="compact"` attribute on any ancestor compresses vertical spacing for the entire subtree via `calc(base * var(--uilib-density-scale-y))`. This is particularly valuable for data-dense UIs (tables, forms, dashboards) where the same components need to fit different screen real estate constraints.

**No SCSS build dependency at consumer runtime**
The library's SCSS compiles to plain CSS. Consumers who import the built CSS can override everything through CSS alone — they do not need to have SCSS in their build pipeline, unlike Angular Material's `@include mat.theme()` approach.

**`color-mix()` for computed hover states**
Modern CSS `color-mix(in srgb, var(--base) 90%, black 10%)` is used throughout to derive hover and active states from base colors. This means when a consumer overrides a primary color, hover states automatically adjust — no need to compute and override multiple tokens.

**Globally registered scale tokens**
Since 2026-05-23, the radius scale (`--uilib-radius-sm/md/lg/xl/full`), spacing scale, font-size scale, and shadow scale are all registered on `:root` and respected by all components. A consumer can change `--uilib-shape-base: 2px` and the entire library sharpens its corners — previously this required overriding each component individually.

**Angular Signals-native API**
All inputs/outputs use `input()`, `model()`, `output()` — the Angular 21+ signals API. No `@Input()`/`@Output()` decorators, no zone.js dependency, fully compatible with zoneless change detection.

---

## What Was Fixed in 2026-05-23

### Structural correctness

| Problem                                                                                               | Files affected                                                                                                             | Fix                                                                                                 |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `themes.scss` re-declared spacing/typography in dark block (180 redundant lines)                      | `themes.scss`                                                                                                              | Moved mode-independent tokens to `:root` (Section 1); dark block is now overrides-only (~100 lines) |
| Dark block had `--uilib-card-bg: #fff` (cards rendered white in dark mode)                            | `themes.scss`                                                                                                              | Fixed to `#22262b`                                                                                  |
| Global scale tokens (`--uilib-radius-*`, `--uilib-font-size-*`, `--uilib-space-*`) undefined globally | `themes.scss`                                                                                                              | Added all missing tokens to `:root` Section 1                                                       |
| `badge.scss` redefined global scale tokens on the badge host (13 lines)                               | `badge.scss`                                                                                                               | Deleted — badge now inherits correct global values                                                  |
| Component tokens on `:root` instead of host element                                                   | `slider.scss`, `knob.component.scss`, `ripple.scss`, `progress-spinner.scss`, `table.component.scss`                       | Moved to `ui-lib-<component>` element selector                                                      |
| Dark overrides on bare `[data-theme='dark']` (affected all descendants globally)                      | Same 5 files                                                                                                               | Changed to `[data-theme='dark'] ui-lib-<component>`                                                 |
| `:host { ... }` rules silently ignored (ViewEncapsulation.None)                                       | `cascade-select.scss`, `date-picker.scss`, `split-button.component.scss`, `virtual-scroller.component.scss`, `editor.scss` | Replaced with correct element/class selectors                                                       |
| `_theme-mixins.scss` had no indication it was deprecated                                              | `_theme-mixins.scss`                                                                                                       | Added deprecation header comment                                                                    |

### What this means in practice

- Token overrides consumers set on a component element now have **correct cascade scope** — they don't bleed into unrelated components
- The dark-mode card bug means cards in dark-mode applications may have been rendering with incorrect backgrounds before this fix
- `:host` rules that appeared to configure components were silently doing nothing — developers who wrote overrides there would have been confused why they had no effect

---

## Competitive Benchmark

| Capability                    | ui-lib-custom             | PrimeNG 19          | Angular Material 3             |
| ----------------------------- | ------------------------- | ------------------- | ------------------------------ |
| Host-element-scoped tokens    | ✅                        | ❌ (global `:root`) | ✅                             |
| Runtime variant/theme switch  | ✅                        | ❌ (rebuild)        | ❌ (rebuild)                   |
| Density system                | ✅                        | ❌                  | ❌ (removed in M3)             |
| Global radius scale override  | ✅                        | ❌                  | Partial                        |
| Global shadow scale           | ✅                        | ❌                  | ✅ (`--mat-*`)                 |
| Dark mode (attribute)         | ✅                        | ✅                  | ✅                             |
| Dark mode (OS fallback)       | Partial (some components) | ✅                  | ✅                             |
| No SCSS build dep at runtime  | ✅                        | ❌                  | ❌                             |
| `color-mix()` hover states    | ✅                        | ❌                  | ❌                             |
| Forced-colors / high contrast | Partial                   | ❌                  | ✅                             |
| Design token JSON export      | ❌ (planned)              | ✅ (Figma plugin)   | ✅ (Style Dictionary)          |
| Angular Signals-native        | ✅                        | Partial             | ❌                             |
| Three-tier token taxonomy     | ❌ (two-tier)             | ❌                  | ✅ (system/component/instance) |
| SCSS theme generation API     | ❌ (not needed)           | ✅ (presets)        | ✅ (`mat.theme()`)             |

### Reading the comparison

**We lead on:** runtime flexibility, density, Angular Signals integration, `color-mix()` ergonomics, no-SCSS consumer experience.

**We trail on:** OS-level dark mode consistency (partial coverage), forced-colors support, design tool integration (no Figma token export yet), Angular Material's more rigorous three-tier token taxonomy.

**We match:** host-element-scoped tokens, dark mode via attribute.

---

## Remaining Debt (prioritised)

### High priority

**1. Four parallel dark-mode systems**
The library currently has dark-mode implemented four different ways across different components. This is the single largest source of inconsistency. Consolidation plan:

- Migrate the 17 components using `dark-theme.scss` / `_theme-mixins.scss` to inline `[data-theme='dark'] ui-lib-<component>` blocks
- Add `@media (prefers-color-scheme: dark)` as a global wrapper around the dark overrides in `themes.scss` Section 3
- Delete `dark-theme.scss` and `_theme-mixins.scss`

**2. Runtime variant switcher**
`ThemeConfigService.setVariant()` exists but does not yet propagate variant classes to all component hosts in the page. Completing this delivers on the "runtime variant switching" claim fully.

### Medium priority

**3. CSS `@layer` adoption**
Wrap `themes.scss` in `@layer uilib.base` and component SCSS in `@layer uilib.components`. Consumers get zero-specificity-cost overrides — they never need `!important`.

**4. Stylelint rule: no `:root` in component SCSS**
Automated enforcement of host-element-scoping. One CI rule prevents an entire class of regression.

**5. Forced-colors / high contrast**
`@media (forced-colors: active)` blocks are missing from most components. Windows high-contrast mode users see unbranded system colors. Add to at minimum: buttons, inputs, focus rings, dialogs.

### Long term

**6. `color-mix()` hover states for all remaining hardcoded hovers**
~40 hover/active hex values in component SCSS are still hand-computed rather than derived via `color-mix()`.

**7. Design token JSON export**
`design-tokens.ts` → W3C DTCG JSON → Figma / Style Dictionary pipeline. Prerequisite for design-dev handoff workflow.

**8. Component-level SCSS snapshot tests**
Headless browser tests that assert CSS variable values resolve to expected computed values under each variant and theme.

---

## Phase 4 (Current) CSS Goals

These are the CSS/theming goals for the Public Beta phase:

- [ ] Runtime variant switcher fully working across all components
- [ ] Consolidate dark-mode into one system (eliminate `dark-theme.scss` and `_theme-mixins.scss`)
- [ ] `@layer` adoption for zero-specificity consumer overrides
- [ ] Forced-colors support on high-risk components (buttons, inputs, focus rings)
- [ ] Stylelint `:root` ban in component SCSS

---

**← Back to:** [Roadmap](ROADMAP.md) | [CSS Architecture Reference](reference/systems/CSS_ARCHITECTURE.md)
