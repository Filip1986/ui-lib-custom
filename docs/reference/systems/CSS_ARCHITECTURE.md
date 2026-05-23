# CSS Architecture & Theming System

> **Status:** Active — refactored 2026-05-23
> **Related files:** `projects/ui-lib-custom/src/lib/themes/themes.scss`, `projects/ui-lib-custom/src/lib/styles/`

---

## Overview

`ui-lib-custom` uses a **CSS custom property (CSS variable) architecture** that was designed from the beginning to be:

- **Host-element-scoped** — component tokens live on the component element, not on `:root`
- **Override-friendly** — every visual property is a CSS variable; consumers never need to change source files or rebuild
- **Dark-mode-native** — dark theme is a set of token overrides, not a separate stylesheet
- **Density-responsive** — a single `--uilib-density-scale-y` multiplier adjusts all vertical spacing through `calc()`
- **SCSS-build-free** — consumers apply themes and overrides through CSS alone; no SCSS dependency is needed at runtime

---

## File Structure

```
projects/ui-lib-custom/src/lib/
├── themes/
│   └── themes.scss              ← Global design tokens — the single authoritative source
│                                   Section 1: :root — universal tokens (shape, radius, spacing, font-size, icons)
│                                   Section 2: :root, [data-theme='light'] — light-mode palette + component colors
│                                   Section 3: [data-theme='dark'] — OVERRIDES ONLY (~100 lines)
│                                   Section 4: Density selectors
│                                   Section 5: Base typography element mapping
└── styles/
    ├── _theme-mixins.scss       ← DEPRECATED — dark-mode mixin used by 17 component SCSS files
    │                               (--uilib-surface-dark-*, --uilib-text-dark-*, --uilib-border-dark*)
    │                               Do not add new tokens here; migrate to themes.scss Section 3
    ├── dark-theme.scss          ← Applies _theme-mixins.scss dark mixin to 17 components
    │                               (one of four parallel dark-mode systems — to be consolidated)
    └── _variables.scss          ← Legacy SCSS variable aliases — kept for SCSS-authoring convenience only
```

Each component's SCSS file lives at `projects/ui-lib-custom/src/lib/<component>/<component>.scss`.

---

## Token Hierarchy

```
:root                          — universal, mode-independent (spacing, radius scale, font-size scale, icons)
  └── :root, [data-theme='light']  — light palette + semantic component aliases
        └── [data-theme='dark']    — dark palette overrides (additive, not a full re-declaration)
              └── ui-lib-<component>  — component-level token defaults (material variant baseline)
                    └── ui-lib-<component>.variant-bootstrap  — variant overrides
                    └── ui-lib-<component>.variant-minimal    — variant overrides
```

Consumers can override at any level of this hierarchy:

```css
/* Global brand override */
:root { --uilib-color-primary-600: #e91e63; }

/* Override only inside a specific section of the page */
.admin-panel { --uilib-button-primary-bg: #6d28d9; }

/* Override one component instance */
#my-table { --uilib-table-row-bg-hover: rgba(233, 30, 99, 0.06); }
```

---

## Globally Registered Token Scales

These tokens are defined on `:root` in `themes.scss` Section 1 and cascade everywhere:

### Border-Radius Scale
| Token | Value |
|---|---|
| `--uilib-radius-sm` | `4px` |
| `--uilib-radius-md` | `var(--uilib-shape-base, 6px)` |
| `--uilib-radius-lg` | `8px` |
| `--uilib-radius-xl` | `12px` |
| `--uilib-radius-full` | `9999px` |

Consumers can change the entire library's shape language with one override:
```css
:root { --uilib-shape-base: 2px; }   /* sharper */
:root { --uilib-shape-base: 12px; }  /* rounder */
```

### Spacing Scale
`--uilib-space-1` (0.25rem) through `--uilib-space-5` (1.25rem)

### Font-Size Scale
`--uilib-font-size-xs` (0.75rem), `--uilib-font-size-sm` (0.875rem), `--uilib-font-size-md` (1rem), `--uilib-font-size-lg` (1.25rem), `--uilib-font-size-xl` (1.5rem)

### Shadow Scale
`--uilib-shadow-xs/sm/md/lg` — light values in Section 2, darker opaque overrides in Section 3 (dark mode).

### Transition
`--uilib-transition-duration: 250ms`, `--uilib-transition-fast: 150ms ease`

---

## Dark Mode

Dark mode is implemented via a `[data-theme='dark']` attribute on any ancestor element. Placing it on `<html>` affects the whole page; placing it on a `<div>` creates a dark island within a light page.

```html
<!-- Full dark page -->
<html data-theme="dark">

<!-- Dark sidebar within a light page -->
<aside data-theme="dark">
  <ui-lib-menu .../>
</aside>
```

`prefers-color-scheme: dark` is honoured by some components that have the media query alongside the data-attribute block (legacy pattern — being consolidated into `themes.scss`).

### Known limitation: four parallel dark-mode systems

Currently the library has four parallel mechanisms for dark mode:

| System | Where | Covers |
|---|---|---|
| `themes.scss` Section 3 | `[data-theme='dark']` on `:root` | Global palette + common component colors |
| `_theme-mixins.scss` + `dark-theme.scss` | `dark-theme-vars` mixin | 17 components via `--uilib-surface-dark-*` tokens |
| Inline `[data-theme='dark']` in component SCSS | Per-component | ~12 components |
| `@media (prefers-color-scheme: dark)` | Per-component | ~8 components |

This is a known tech debt. The consolidation target is a single `[data-theme='dark']` block per component (or globally in `themes.scss` for universal tokens), with `prefers-color-scheme` kept only as a fallback for components that do not yet have an explicit `data-theme` set.

---

## Density System

Density controls how compressed the vertical rhythm is. It is applied by setting `data-density` on any ancestor:

```html
<div data-density="comfortable">  <!-- 75% vertical density -->
<div data-density="compact">       <!-- 50% vertical density -->
```

All density-aware padding/height tokens use `calc(base * var(--uilib-density-scale-y))`. This means the entire page or a specific panel can be switched to compact mode with one attribute — no component code changes required.

---

## Visual Variants

Every component supports three visual variants, applied via a class on the component element (managed by `ThemeConfigService` or by the consumer directly):

| Class | Design system |
|---|---|
| `uilib-variant-material` | Google Material 3 aesthetics |
| `uilib-variant-bootstrap` | Bootstrap 5 aesthetics |
| `uilib-variant-minimal` | Minimal / design-system-agnostic |

Variants override CSS custom properties; they do not change HTML structure. Switching variants at runtime requires no re-render.

---

## CSS Variable Naming Convention

Pattern: `--uilib-{component}-{property}[-{variant}][-{state}]`

```scss
--uilib-button-bg                 /* base background */
--uilib-button-bg-hover           /* hover state */
--uilib-button-primary-bg         /* primary colour variant */
--uilib-table-row-bg-selected     /* row selected state */
--uilib-slider-handle-size-sm     /* size modifier */
```

**Reserved global prefixes** (system tokens, not component-specific):
`--uilib-color-*`, `--uilib-spacing-*`, `--uilib-radius-*`, `--uilib-shadow-*`, `--uilib-font-*`, `--uilib-surface*`, `--uilib-page-*`, `--uilib-transition-*`, `--uilib-z-*`

**Note:** Element selectors use `ui-lib-{component}` (hyphen between `ui` and `lib`); CSS variable names use `--uilib-{component}-*` (no hyphen in `uilib`). This asymmetry is intentional — both patterns are enforced by convention.

---

## Component SCSS Pattern

Every well-formed component SCSS file follows this structure:

```scss
/* 1. Host element — component token defaults (material variant baseline) */
ui-lib-<component> {
  --uilib-<component>-<token>: <value>;
}

/* 2. Dark mode override (additive — only tokens that change) */
[data-theme='dark'] ui-lib-<component> {
  --uilib-<component>-<token>: <dark-value>;
}

/* 3. BEM root block (display, layout) */
.ui-lib-<component> {
  display: block; /* or inline-flex etc. */
  /* no hardcoded colors/px — only var() references */
}

/* 4. Modifier blocks */
.ui-lib-<component>--size-sm { ... }
.ui-lib-<component>--variant-bootstrap { ... }

/* 5. Reduced motion */
@media (prefers-reduced-motion: reduce) { ... }
```

### Anti-patterns to avoid

| Anti-pattern | Why it's harmful |
|---|---|
| `:root { --uilib-foo-*: ... }` inside a component SCSS file | Leaks tokens globally; consumers can't scope overrides per component instance |
| `:host { ... }` in any file | Does nothing with `ViewEncapsulation.None` — the rule is silently ignored |
| Raw hex in rule bodies: `.foo { color: #hex }` | Bypasses the token layer; not overridable; violates the design-token contract |
| Redefining global scale tokens (`--uilib-radius-sm`, `--uilib-space-1`, `--uilib-font-size-*`) on a component host | Corrupts any descendant that relies on those global tokens for its own layout |

---

## Comparison with PrimeNG and Angular Material

### PrimeNG 19 (Tailwind/Aura)
- Uses a JS-based theme preset system (`Aura`, `Lara`, `Material`) compiled at build time
- CSS variables are global on `:root`, not host-element-scoped
- Switching themes requires importing a different preset and rebuilding
- No density system
- Dark mode via `PrimeNG.darkMode` option or `colorScheme` in the preset

**vs ui-lib-custom:** We have runtime variant switching (no rebuild), host-element-scoped tokens (no global pollution), and a density system PrimeNG lacks. PrimeNG has a richer preset ecosystem and more mature tooling.

### Angular Material 3 (MDC)
- Fully host-element-scoped via `::ng-deep` and CSS custom properties under `--mat-*`
- `@angular/material/theming` SCSS API generates token sets per component
- Dark mode via `mat.theme()` with `$isDark: true` — generates a separate token set
- No density system (Material 3 dropped the density scale from M2)
- Three levels of token override: global, per-component, per-instance

**vs ui-lib-custom:** Angular Material has a more rigorous token taxonomy (3 tiers: system → component → instance) and a SCSS API for generating full theme packages. We have simpler runtime overrides (no SCSS needed) and a density system they removed. Our `color-mix()`-based hover states are more concise than Material's pre-computed hover tokens.

### Key differentiators of ui-lib-custom

| Feature | ui-lib-custom | PrimeNG 19 | Angular Material 3 |
|---|---|---|---|
| Host-element-scoped tokens | ✅ | ❌ (`:root` global) | ✅ |
| Runtime variant switching | ✅ | ❌ (rebuild required) | ❌ |
| Density system | ✅ | ❌ | ❌ (removed in M3) |
| No SCSS dependency at runtime | ✅ | ❌ | ❌ |
| Dark mode without rebuild | ✅ | ✅ (M3 preset) | ✅ |
| Global radius/shadow scale override | ✅ | ❌ | Partial |
| `color-mix()` hover states | ✅ | ❌ | ❌ |
| Angular Signals-native API | ✅ | Partial | ❌ |

---

## What Was Refactored in 2026-05-23

This session addressed six classes of structural debt:

### 1. `themes.scss` — structural rewrite
- **Before:** 464 lines with the dark block repeating all ~180 non-color tokens (spacing, typography, icons) that never change between light and dark
- **After:** Section 1 (`:root`) holds all mode-independent tokens once. Section 3 (`[data-theme='dark']`) is overrides-only (~100 lines). Net: ~180 lines removed without losing any information.
- **New:** Globally registered `--uilib-radius-sm/md/lg/xl/full`, `--uilib-space-1` through `--uilib-space-5`, `--uilib-font-size-xs/sm/md/lg/xl`, `--uilib-shadow-xs/sm/md/lg`, `--uilib-transition-duration`
- **Bug fixed:** Previous dark block had `--uilib-card-bg: #fff` (white) — cards would render white on dark backgrounds

### 2. `badge.scss` — cascade pollution removed
- **Before:** `ui-lib-badge { --uilib-radius-sm: 0.125rem; --uilib-font-size-sm: 0.875rem; ... }` — 13 lines redefining global scale tokens on the badge host
- **After:** Those 13 lines deleted. Badge inherits the correct global values from `themes.scss`
- **Impact:** Any component nested inside a badge now gets the correct global radius/font-size, not badge-specific values

### 3. Component `:root` token blocks moved to host element
Files fixed: `slider.scss`, `knob.component.scss`, `ripple.scss`, `progress-spinner.scss`, `table.component.scss`
- **Before:** `[data-theme='dark'] { --uilib-slider-*: ... }` — scoped to nothing, applied globally
- **After:** `[data-theme='dark'] ui-lib-slider { ... }` — scoped to slider instances only

### 4. `:host` pseudo-selector dead code removed
Files fixed: `cascade-select.scss`, `date-picker.scss`, `split-button.component.scss`, `virtual-scroller.component.scss`, `editor.scss`
- **Before:** `:host { display: block; ... }` — with `ViewEncapsulation.None`, `:host` is never matched; rules silently had no effect
- **After:** Correct element-selector (`ui-lib-<component>`) or BEM class selector used

### 5. `_theme-mixins.scss` — deprecation notice added
- Added header comment documenting why this file must not be extended and pointing to `themes.scss` as the target

---

## Known Remaining Debt

| Item | Impact | Effort |
|---|---|---|
| 17 component SCSS files using `dark-theme.scss` / `_theme-mixins.scss` dark mixin | `--uilib-surface-dark-*` tokens; not consistent with `[data-theme='dark']` attribute pattern | Medium |
| ~8 components with `@media (prefers-color-scheme: dark)` blocks | OS-level dark not covered by `[data-theme='dark']`; inconsistent between components | Medium |
| ~12 components with inline `[data-theme='dark']` blocks (not using the mixin) | Inconsistency with mixin users; duplicate work | Low |
| No `[data-theme='dark'] ui-lib-<component>` pattern enforced for NEW components | Future additions may regress | Low (lint rule) |
| No automated CSS variable audit | Token drift goes undetected until build | Medium (tooling) |

---

## Roadmap

### Next (high value, low effort)
1. **Consolidate the four dark-mode systems** — migrate the 17 `dark-theme.scss` users to inline `[data-theme='dark'] ui-lib-<component>` blocks; delete `dark-theme.scss` and `_theme-mixins.scss`
2. **Add `prefers-color-scheme: dark` as a global fallback in `themes.scss`** — one `@media` block that wraps the entire Section 3 override list, removing the need for per-component media queries
3. **Runtime variant switcher** — `ThemeConfigService.setVariant()` to toggle all component variant classes at once
4. **Stylelint rule: no `:root` in component SCSS** — automated enforcement of the host-element-scoping rule

### Medium term
5. **CSS `@layer` adoption** — wrap `themes.scss` in `@layer uilib.base` and component SCSS in `@layer uilib.components`; gives consumers zero-specificity-cost overrides
6. **`color-mix()` hover token generator** — replace the ~40 hand-written hover/active hex values with computed `color-mix(in srgb, var(--base) 90%, black 10%)` values
7. **Forced-colors / high-contrast support** — add `@media (forced-colors: active)` blocks to high-risk components (buttons, inputs, focus rings)

### Long term
8. **Component-level SCSS unit testing** — headless browser snapshot tests for CSS variable resolution
9. **Theme preset packages** — publish `@ui-lib-custom/theme-material`, `@ui-lib-custom/theme-bootstrap` etc. as standalone peer packages with pre-composed variable sets
10. **Design token JSON export** — `design-tokens.ts` → W3C DTCG JSON → Figma / Style Dictionary pipeline

---

**← Back to:** [Systems Index](README.md)
