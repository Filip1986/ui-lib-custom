# IconField Architecture

> Status: Research and API design (documentation-only, no runtime code changes).

## Scope and Evidence

This document maps PrimeNG `IconField`/`InputIcon` behavior to a `ui-lib-custom` design for `uilib-icon-field` and `uilib-input-icon`.

PrimeNG evidence reviewed:

- `tmp_primeng/package/types/primeng-iconfield.d.ts`
- `tmp_primeng/package/types/primeng-inputicon.d.ts`
- `tmp_primeng/package/fesm2022/primeng-iconfield.mjs`
- `tmp_primeng/package/fesm2022/primeng-inputicon.mjs`

Project integration references reviewed:

- `projects/ui-lib-custom/src/lib/input/input.ts`
- `projects/ui-lib-custom/src/lib/input/input.html`
- `projects/ui-lib-custom/src/lib/input/input.scss`
- `projects/ui-lib-custom/src/lib/icon/icon.ts`
- `projects/ui-lib-custom/src/lib/float-label/float-label.ts`
- `projects/ui-lib-custom/src/lib/float-label/float-label.scss`
- `docs/architecture/FLOATLABEL_ARCHITECTURE.md`

## PrimeNG Feature Mapping

| Feature | PrimeNG API/Evidence | Priority (P0/P1/P2) | Notes for `ui-lib-icon-field` |
|---|---|---|---|
| `iconPosition` input (`'left' | 'right'`) | `IconField.iconPosition: 'right' | 'left'` in `types/primeng-iconfield.d.ts`; root classes include `p-iconfield-left`/`p-iconfield-right` in `fesm2022/primeng-iconfield.mjs` | P0 | Keep the same public union type, but default to `'right'` for `ui-lib` consistency with trailing actions. |
| `styleClass` on InputIcon | `InputIcon.styleClass` in `types/primeng-inputicon.d.ts`; host class binding merges base class and `styleClass` in `fesm2022/primeng-inputicon.mjs` | P0 | Expose `styleClass: string | null` on `uilib-input-icon`. |
| Custom content projection in InputIcon | Template is `<ng-content></ng-content>` in `fesm2022/primeng-inputicon.mjs` | P0 | Support icon font classes and custom SVG/markup through projection. |
| FloatLabel compatibility | Prime component is a pure content wrapper (`<ng-content>`) in `fesm2022/primeng-iconfield.mjs`; no special float-label logic | P1 | Must work inside `uilib-float-label` without breaking label movement (`.uilib-float-label` relies on relative positioning and state selectors). |
| IftaLabel (`variant="in"`) compatibility | Prime has separate `iftalabel` package (`primeng-iftalabel.*` in packed artifact), while IconField remains generic | P1 | In `ui-lib`, equivalent behavior is FloatLabel `variant='in'`; IconField should not own label logic. |
| Size compatibility with input `size` / `pSize` | No size input on `IconField` or `InputIcon` in `.d.ts`; behavior is driven by wrapped input styling in Prime | P0 | `uilib-icon-field` has no `size` input; inherit from projected `ui-lib-input` or native input styles. |
| Multiple icons (left + right simultaneously) | Prime root side is single-valued (`iconPosition`), InputIcon itself is generic projected content | P2 | Allow advanced composition with multiple `uilib-input-icon` nodes; default API remains one side selector. |

## Reusable Code Assessment

- `ui-lib-icon` (`projects/ui-lib-custom/src/lib/icon/icon.ts`): reusable as an optional child for semantic/library-aware icon rendering; `uilib-input-icon` should still allow arbitrary projected content.
- FloatLabel state classes (`projects/ui-lib-custom/src/lib/float-label/float-label.scss`): current selectors target focus/filled wrappers (`.uilib-inputwrapper-*`, `.uilib-filled`); IconField must not block these states on projected controls.
- Shared constants from `ui-lib-custom/core`: use shared defaults/constants where available (for example size/variant defaults) instead of duplicating literals in runtime implementation.
- `ThemeConfigService` (`ui-lib-custom/theme`): optional reuse for variant fallback (P1); P0 layout wrappers can stay behavior-light and theme via CSS variables.

## Component Pair Architecture

### `IconField` (`uilib-icon-field`)

- Purpose: pure wrapper around projected input + icon content.
- Template shape: `<ng-content></ng-content>` only.
- Input:
  - `iconPosition: 'left' | 'right'` (default `'right'`).
- Host classes:
  - `ui-lib-icon-field`
  - `ui-lib-icon-field--left`
  - `ui-lib-icon-field--right`
- Base CSS responsibilities:
  - `position: relative;`
  - `display: inline-flex;`
  - `align-items: center;`
- Layout responsibility:
  - apply side-specific input padding for projected controls based on `iconPosition`.

### `InputIcon` (`uilib-input-icon`)

- Purpose: icon container anchored within `uilib-icon-field`.
- Content model:
  - optional `styleClass` string for icon-font usage,
  - or projected custom markup (`<ng-content>`), including `<ui-lib-icon />`.
- Host class:
  - `ui-lib-input-icon`
- Base CSS responsibilities:
  - `position: absolute;`
  - `top: 50%;`
  - `transform: translateY(-50%);`
- Positioning behavior:
  - left/right anchoring controlled by nearest parent `uilib-icon-field` side class.

## Public API Contract

### IconField Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| `iconPosition` | `'left' \| 'right'` | `'right'` | Controls icon placement and projected-input padding side. |

### InputIcon Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| `styleClass` | `string \| null` | `null` | CSS class(es) for icon element, for example icon-font classes. |

Neither component has outputs; both are layout/composition primitives.

## CSS Variable Token Contract

Use `--uilib-icon-field-*` names:

- `--uilib-icon-field-icon-color`
- `--uilib-icon-field-icon-margin`

## Integration Notes

- FloatLabel integration: when used inside `<uilib-float-label>`, `uilib-icon-field` must preserve relative positioning so both floating label and absolute icon anchor correctly in the same control region.
- Size flow: `uilib-icon-field` does not accept a `size` input. Size comes from the projected control (`ui-lib-input` size class or native input CSS). Icon sizing should follow inherited text size or a size-aware rule.
- Input compatibility: unlike Prime's `pInputText` directive ecosystem, this library must support both `<ui-lib-input>` and plain `<input>` projection.

## PrimeNG Divergences

| Area | PrimeNG | ui-lib-icon-field |
|---|---|---|
| Selector | `p-iconField` / `p-inputIcon` | `uilib-icon-field` / `uilib-input-icon` |
| Icon rendering | `styleClass` on host span-like icon container | `styleClass` + `<ng-content>` custom content; optional `<ui-lib-icon />` nesting |
| Size integration | `pSize`/input styling ecosystem | Inherits from projected input; no own `size` input |
| Variant | Implicit from Prime theme | Optional future `variant` input (P1) with fallback from `ThemeConfigService`; not required for P0 layout API |

## Notes for Implementation Phase

- Keep public input types as string unions.
- Keep wrapper components standalone + `OnPush` + `ViewEncapsulation.None`.
- Avoid imperative DOM logic; rely on host classes and SCSS selectors.
- Ensure cross-entry imports use package paths (`ui-lib-custom/core`, `ui-lib-custom/theme`) where needed.

