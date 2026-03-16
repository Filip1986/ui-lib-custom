# Dialog Token Audit (Phase 1.2)

## Goal

Define a token strategy for `ui-lib-dialog` and shared overlay infrastructure that is:

- Reuse-first (existing design tokens + CSS custom properties)
- Variant-aware (Material, Bootstrap, Minimal)
- Future-safe for other overlays (Toast, Dropdown, Tooltip)

This is a design specification only (no implementation changes in this phase).

## Audit: Reuse Candidates from Existing System

### Reusable global/system tokens

- **Surface/background:** `--uilib-surface`, `--uilib-surface-alt`, `--uilib-page-fg`, `--uilib-border`
- **Typography:** `--uilib-font-ui`, `--uilib-font-heading`, `--uilib-font-size-sm|md|lg`, `--uilib-font-heading-weight`
- **Shape/radius:** `--uilib-shape-base`, `--uilib-radius-sm|md|lg`
- **Shadows/elevation:** `--uilib-shadow-sm`, `--uilib-shadow-md`, `--uilib-shadow-lg`, `--uilib-card-shadow-*`
- **Spacing:** `--uilib-space-2|3|4|5|6`
- **Motion:** `--uilib-transition-fast`, `--uilib-transition-fast-duration` (used by Accordion), `--uilib-transition-ease-out` (fallback pattern in Accordion)

### Reusable component-level patterns

- `accordion-panel.scss` pattern: component tokens map to global tokens with literal fallbacks and density-aware padding.
- `card.scss` pattern: variant-specific radius/shadow behavior and surface/header/footer split.
- `button.scss` pattern: close-button-like control sizing/color/hover tokens can mirror icon/button token layering.

### Gaps found

- No shared overlay token namespace yet (`--uilib-overlay-*`).
- No CSS z-layer scale (`--uilib-z-*`) despite TS `Z_INDEX` constants existing.
- Transition naming is partially inconsistent (`--uilib-transition-fast` vs `--uilib-transition-fast-duration` usage).

## Proposed Dialog + Overlay Tokens

> Table includes requested tokens plus a `Shared?` column to identify cross-overlay candidates.

| Name | Default (Material) | Bootstrap | Minimal | Shared? |
|---|---|---|---|---|
| `--uilib-dialog-bg` | `var(--uilib-surface, #ffffff)` | `var(--uilib-surface, #ffffff)` | `var(--uilib-surface, #ffffff)` | No |
| `--uilib-dialog-border-radius` | `var(--uilib-radius-lg, 8px)` | `var(--uilib-radius-md, 6px)` | `var(--uilib-radius-sm, 2px)` | No |
| `--uilib-dialog-shadow` | `var(--uilib-shadow-lg, 0 14px 28px rgba(0, 0, 0, 0.25))` | `var(--uilib-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.12))` | `none` | No |
| `--uilib-dialog-header-bg` | `var(--uilib-surface-alt, #f1f3f5)` | `var(--uilib-surface-alt, #f1f3f5)` | `var(--uilib-dialog-bg, var(--uilib-surface, #ffffff))` | No |
| `--uilib-dialog-header-color` | `var(--uilib-page-fg, #1f2933)` | `var(--uilib-page-fg, #1f2933)` | `var(--uilib-page-fg, #1f2933)` | No |
| `--uilib-dialog-header-font-size` | `var(--uilib-font-size-lg, 1.125rem)` | `var(--uilib-font-size-md, 1rem)` | `var(--uilib-font-size-md, 1rem)` | No |
| `--uilib-dialog-header-font-weight` | `var(--uilib-font-heading-weight, 600)` | `var(--uilib-font-heading-weight, 600)` | `var(--uilib-font-heading-weight, 600)` | No |
| `--uilib-dialog-header-padding` | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)` | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)` | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)` | No |
| `--uilib-dialog-content-padding` | `var(--uilib-space-5, 1.25rem)` | `var(--uilib-space-4, 1rem)` | `var(--uilib-space-4, 1rem)` | No |
| `--uilib-dialog-footer-padding` | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)` | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)` | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)` | No |
| `--uilib-dialog-footer-border-top` | `1px solid var(--uilib-border, #e0e0e0)` | `1px solid var(--uilib-border, #e0e0e0)` | `1px solid var(--uilib-border, #e0e0e0)` | No |
| `--uilib-dialog-close-btn-size` | `2rem` | `1.875rem` | `1.75rem` | No |
| `--uilib-dialog-close-btn-color` | `var(--uilib-muted, #5f6c80)` | `var(--uilib-muted, #5f6c80)` | `var(--uilib-muted, #5f6c80)` | No |
| `--uilib-dialog-close-btn-hover-bg` | `color-mix(in srgb, var(--uilib-page-fg, #1f2933) 8%, transparent)` | `color-mix(in srgb, var(--uilib-page-fg, #1f2933) 10%, transparent)` | `color-mix(in srgb, var(--uilib-page-fg, #1f2933) 6%, transparent)` | No |
| `--uilib-dialog-z-index` | `var(--uilib-z-modal, 1050)` | `var(--uilib-z-modal, 1050)` | `var(--uilib-z-modal, 1050)` | No (depends on shared z-scale) |
| `--uilib-overlay-backdrop-bg` | `var(--uilib-color-neutral-900, #212121)` | `var(--uilib-color-neutral-900, #212121)` | `var(--uilib-color-neutral-900, #212121)` | Yes |
| `--uilib-overlay-backdrop-opacity` | `0.48` | `0.50` | `0.32` | Yes |
| `--uilib-dialog-animation-duration` | `var(--uilib-transition-fast-duration, 200ms)` | `var(--uilib-transition-fast-duration, 200ms)` | `var(--uilib-transition-fast-duration, 150ms)` | No (can map to shared overlay motion token later) |
| `--uilib-dialog-animation-easing` | `var(--uilib-transition-ease-out, ease-out)` | `var(--uilib-transition-ease-out, ease-out)` | `var(--uilib-transition-ease-out, ease-out)` | No |
| `--uilib-dialog-maximized-margin` | `0` | `0` | `0` | No |

## Token Dependency Graph (Fallback Hierarchy)

Use this fallback ordering consistently:

1. **Consumer override** at component instance/container
2. **Variant token** (`ui-lib-dialog--variant-*` sets dialog token)
3. **Dialog token default** (`--uilib-dialog-*`)
4. **Shared overlay/global token** (`--uilib-overlay-*`, `--uilib-z-*`, `--uilib-surface`, `--uilib-border`, etc.)
5. **Literal fallback** (only as final safety)

### Graph examples

- `--uilib-dialog-bg`
  - -> `--uilib-surface`
  - -> `#ffffff`
- `--uilib-dialog-shadow`
  - -> variant assignment (`--uilib-shadow-lg` / `--uilib-shadow-sm` / `none`)
  - -> literal safety fallback for Material/Bootstrap
- `--uilib-dialog-z-index`
  - -> `--uilib-z-modal`
  - -> `1050`
- Backdrop effective color
  - `background-color: color-mix(in srgb, var(--uilib-overlay-backdrop-bg) calc(var(--uilib-overlay-backdrop-opacity) * 100%), transparent)`
  - fallback: `rgba(0, 0, 0, 0.5)` if `color-mix` strategy is not used
- `--uilib-dialog-header-font-size`
  - -> variant assignment
  - -> `--uilib-font-size-md|lg`
  - -> literal rem fallback

## Global vs Component-Scoped Token Placement

### Add to global token system (shared/core)

These should be defined in design token source and exposed as CSS custom properties in global theme layers:

- `--uilib-overlay-backdrop-bg`
- `--uilib-overlay-backdrop-opacity`
- `--uilib-z-backdrop`
- `--uilib-z-modal`
- `--uilib-z-popover` (forward-compatible)
- `--uilib-z-tooltip` (forward-compatible)

Rationale:

- Overlay consistency across Dialog, Dropdown, Tooltip, Toast
- Centralized stacking model aligned with existing TS `Z_INDEX`

### Keep component-scoped (dialog)

- `--uilib-dialog-bg`
- `--uilib-dialog-border-radius`
- `--uilib-dialog-shadow`
- `--uilib-dialog-header-bg`
- `--uilib-dialog-header-color`
- `--uilib-dialog-header-font-size`
- `--uilib-dialog-header-font-weight`
- `--uilib-dialog-header-padding`
- `--uilib-dialog-content-padding`
- `--uilib-dialog-footer-padding`
- `--uilib-dialog-footer-border-top`
- `--uilib-dialog-close-btn-size`
- `--uilib-dialog-close-btn-color`
- `--uilib-dialog-close-btn-hover-bg`
- `--uilib-dialog-z-index` (consumes shared `--uilib-z-modal`)
- `--uilib-dialog-animation-duration`
- `--uilib-dialog-animation-easing`
- `--uilib-dialog-maximized-margin`

## Variant Intent Summary

- **Material:** elevated surface, larger radius (`8px` intent), slide-down + fade motion profile.
- **Bootstrap:** subtle elevation, medium radius (`6px` intent), straightforward fade.
- **Minimal:** low/no elevation, sharp radius (`2px` intent), minimal fade.

## Notes for Implementation Phase

- Keep naming strict: `--uilib-{component}-{property}` and `--uilib-overlay-*` for shared overlay primitives.
- Mirror TS z-index constants into CSS tokens to avoid split-brain layering logic.
- Normalize transition tokens (`duration` + `easing`) during implementation to avoid `--uilib-transition-fast` vs `--uilib-transition-fast-duration` drift.

