# InputGroup Architecture

> Status: Research and API design (documentation-only, no runtime code changes).

## Scope and Evidence

This document maps PrimeNG `InputGroup`/`InputGroupAddon` behavior to a `ui-lib-custom` design for `uilib-input-group` and `uilib-input-group-addon`.

PrimeNG evidence reviewed:

- `tmp_primeng/package/types/primeng-inputgroup.d.ts`
- `tmp_primeng/package/types/primeng-inputgroupaddon.d.ts`
- `tmp_primeng/package/fesm2022/primeng-inputgroup.mjs`
- `tmp_primeng/package/fesm2022/primeng-inputgroupaddon.mjs`
- `tmp_primeng/primeuix_styles/package/dist/inputgroup/index.mjs`

Project integration references reviewed:

- `projects/ui-lib-custom/src/lib/input/input.ts`
- `projects/ui-lib-custom/src/lib/input/input.html`
- `projects/ui-lib-custom/src/lib/input/input.scss`
- `projects/ui-lib-custom/src/lib/select/select.ts`
- `projects/ui-lib-custom/src/lib/select/select.html`
- `projects/ui-lib-custom/src/lib/select/select.scss`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.ts`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.html`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.scss`
- `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.ts`
- `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.constants.ts`
- `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.scss`
- `projects/ui-lib-custom/src/lib/float-label/float-label.ts`
- `projects/ui-lib-custom/src/lib/float-label/float-label.scss`
- `projects/ui-lib-custom/src/lib/icon-field/icon-field.ts`
- `projects/ui-lib-custom/src/lib/icon-field/icon-field.scss`
- `projects/ui-lib-custom/src/lib/button/button.ts`
- `projects/ui-lib-custom/src/lib/button/button.html`
- `projects/ui-lib-custom/src/lib/button/button.scss`

## PrimeNG Behavior Inventory

### Component/API level behavior

- `InputGroup` is a pure content wrapper (`<ng-content></ng-content>`) with root class `p-inputgroup`.
- `InputGroup` still exposes deprecated `styleClass` (deprecated since v20), and applies `p-inputgroup-fluid` based on `instance.fluid` in class generation.
- `InputGroupAddon` is also pure wrapper content, class `p-inputgroupaddon`, with optional `style` and `styleClass` inputs.

### Full CSS behavior from PrimeUIX (`@primeuix/styles/inputgroup`)

- Base layout:
  - `.p-inputgroup`, `.p-inputgroup .p-iconfield`, `.p-inputgroup .p-floatlabel`, `.p-inputgroup .p-iftalabel` => `display: flex`, `align-items: stretch`, `width: 100%`.
  - Nested wrappers `.p-floatlabel .p-inputwrapper` and `.p-iftalabel .p-inputwrapper` => `display: inline-flex`.
  - `.p-inputtext` and `.p-inputwrapper` in group => `flex: 1 1 auto`, `width: 1%`.
- Addon cell styling:
  - `.p-inputgroupaddon` => flex-center, themed `padding/background/color`, top+bottom borders, themed `min-width`.
  - Border stitching: first or adjacent addons get start border; last addon gets end border.
- Addon button containment:
  - `.p-inputgroupaddon:has(.p-button)` => `padding: 0`, `overflow: hidden`.
  - `.p-inputgroupaddon .p-button` => `border-radius: 0`.
- Radius stripping and restoration:
  - Direct children and wrappers (`.p-component`, `.p-inputwrapper`, `.p-iconfield`, `.p-floatlabel`, `.p-iftalabel`) inside group are reset to `border-radius: 0; margin: 0`.
  - First visual segment gets start radii; last segment gets end radii.
- Focus stacking:
  - Focused components, focus wrappers, and adjacent labels (`~ label`) are raised with `z-index: 1` so focus visuals render above neighboring borders.
- Other rules:
  - Non-icon-only button in group has `width: auto`.
  - Adjacent icon fields remove inner start border (`.p-iconfield + .p-iconfield .p-inputtext { border-inline-start: 0; }`).

### PrimeNG-specific extras in `primeng-inputgroup.mjs`

- Includes extra selector for direct `p-button` at group edges using `:has(> p-button:first-child|last-child)` to restore edge radii on nested `.p-button`.
- Forces direct `p-button` wrappers to `display: inline-flex`.
- `p-inputmask` special case: `.p-inputgroup > p-inputmask > .p-inputtext { width: 100%; }`.

## Existing ui-lib Host Class Audit (Interop Targets)

| Component | Selector / Host Class | Border Radius Default | Notes for InputGroup CSS targeting |
|---|---|---|---|
| Input | Selector `ui-lib-input`; host conditional class `uilib-filled`; inner classes `ui-input`, `ui-input-field` | `ui-input-field` uses `border-radius: var(--uilib-input-radius, ...)` | Group should target `ui-lib-input` children and remove/restore radius on `.ui-input-field`.
| Select | Selector `ui-lib-select`; host gets open/value/focus classes; inner root class `ui-lib-select` | `.ui-lib-select__control` uses `border-radius: var(--uilib-select-radius, ...)` | Group should target `ui-lib-select` and strip/restore radius on `.ui-lib-select__control`.
| AutoComplete | Selector and host class `ui-lib-autocomplete` | `.ui-autocomplete-container` uses `border-radius: var(--uilib-autocomplete-border-radius, ...)` | Group should target `.ui-autocomplete-container` as the visual control surface.
| CascadeSelect | Selector `ui-lib-cascade-select`; root class from constants `ui-lib-cascade-select` | `.ui-lib-cascade-select__trigger` uses `border-radius: var(--uilib-cascade-select-radius, ...)` | Group should target trigger element for radius stitching.
| FloatLabel | Selector `uilib-float-label`; host class `uilib-float-label` with `--over|--in|--on` modifiers | Does not define control border directly; wraps child controls | Group needs deep selectors for wrapped controls and focus label z-index.
| IconField | Selector `uilib-icon-field`; host class `ui-lib-icon-field` with `--left|--right` modifiers | No direct border; wrapped input control owns border | Group needs selectors for icon-field wrapped controls and nested wrappers.
| Button | Selector `ui-lib-button`; no host class binding; host styled with `display: inline-flex`; inner `<button>` class `ui-lib-button` | Inner button has radius via `--uilib-button-radius` | Button in addon should get zero radius; direct group edge button handling should be considered for projected `ui-lib-button`.

## Public API Contract

### `input-group.types.ts`

- No public union inputs required for v1.
- Types file may be omitted or kept minimal for future expansion.

### InputGroup Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| (none) | - | - | Pure layout wrapper; consumers use native Angular `class` and `style` bindings on host if needed. |

### InputGroupAddon Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| (none) | - | - | Pure layout wrapper; no `styleClass`/`style` inputs (Prime parity intentionally skipped). |

Neither component has outputs.

## Component Pair Architecture

### `InputGroupComponent` (`uilib-input-group`)

- Purpose: horizontal grouping container for controls and addons.
- Template: `<ng-content />`.
- Host class: `ui-lib-input-group`.
- Runtime behavior: no state, no CVA, no outputs, no DOM listeners.

### `InputGroupAddonComponent` (`uilib-input-group-addon`)

- Purpose: addon cell wrapper for text/icons/buttons.
- Template: `<ng-content />`.
- Host class: `ui-lib-input-group-addon`.
- Runtime behavior: no state, no CVA, no outputs, no DOM listeners.

## CSS Strategy (Implementation Plan)

### 1) Base layout

- Group host is flex row: `display: flex; align-items: stretch; width: 100%;`.
- `uilib-float-label`, `ui-lib-icon-field`, and direct control wrappers inside group should also stretch and participate in a continuous row.
- Projected controls should be flexible (`flex: 1 1 auto; width: 1%`) to avoid overflow and preserve add-on sizing.

### 2) Border-radius stitching

- Strip radius for all middle control surfaces.
- Restore start radii to first visual segment and end radii to last visual segment.
- Include nested wrappers in selectors:
  - direct controls (`ui-lib-input`, `ui-lib-select`, `ui-lib-autocomplete`, `ui-lib-cascade-select`)
  - wrapper forms (`uilib-float-label > ...`, `ui-lib-icon-field > ...`)
  - control internals (`.ui-input-field`, `.ui-lib-select__control`, `.ui-autocomplete-container`, `.ui-lib-cascade-select__trigger`)
- Reset inter-segment margins where required to avoid visual seams.

### 3) Addon surface styling

- `ui-lib-input-group-addon` should be flex-centered and token-driven:
  - background, text color, padding, min-width
  - top/bottom borders always
  - start border for first addon and adjacent addons
  - end border for last addon
- Addon containing a button should use `padding: 0` and `overflow: hidden`.
- Button inside addon should have `border-radius: 0` to merge with neighboring segments.

### 4) Focus stacking

- Apply `z-index: 1` to focused control surfaces and their wrapper focus classes (`.uilib-inputwrapper-focus`) so focus ring is not clipped by adjacent addon borders.
- Raise floating labels near focused controls similarly to avoid label overlap artifacts in grouped contexts.

### 5) Fluid/full-width behavior

- Base group should naturally allow full-width (`width: 100%`).
- Add compatibility selector when a fluid control is present, for example `:has(.uilib-fluid)` or root-level fluid utility class, so grouped wrapper stays full width in all mixed compositions.

## CSS Variable Contract

Use `--uilib-input-group-*` variables:

- `--uilib-input-group-addon-background`
- `--uilib-input-group-addon-border-color`
- `--uilib-input-group-addon-color`
- `--uilib-input-group-addon-padding`
- `--uilib-input-group-addon-min-width`
- `--uilib-input-group-addon-border-radius`

Token flow should follow project conventions:

1. Add defaults in `projects/ui-lib-custom/src/lib/design-tokens.ts`.
2. Map to CSS vars (theme service + component SCSS fallbacks).
3. Document in `docs/reference/systems/CSS_VARIABLES.md`.

## PrimeNG Divergences

| Area | PrimeNG | ui-lib-input-group |
|---|---|---|
| Selectors | `p-inputgroup` / `p-inputgroup-addon` | `uilib-input-group` / `uilib-input-group-addon` |
| `styleClass` input | Present on both (`InputGroup` deprecated) | Not implemented |
| `style` input on addon | Present | Not implemented |
| Fluid toggle | `p-inputgroup-fluid` class from internal `fluid` path | CSS-driven width behavior; rely on fluid utility/presence selectors |
| IftaLabel integration | Separate `p-iftalabel` component | `uilib-float-label` with `variant="in"` |
| Prime directives | Uses Prime pass-through/Bind host directives | No pass-through directives; plain Angular wrapper components |

## Notes for Implementation Phase

- Keep both components standalone + `OnPush` + `ViewEncapsulation.None`.
- Keep public API minimal: no custom inputs/outputs for v1.
- Use explicit typing if helper functions/constants are introduced.
- Do not use relative imports across entry points.
- Add `ui-lib-custom/input-group` secondary entry point and update export-map tests when implementation starts.

