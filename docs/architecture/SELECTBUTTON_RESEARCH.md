# SelectButton Research and Gap Analysis

## Scope
This document summarizes PrimeNG SelectButton features, compares them against current library capabilities, and recommends an architecture aligned with `LIBRARY_CONVENTIONS.md`.

## Feature Inventory and Comparison

| Feature | PrimeNG SelectButton | Planned for ui-lib SelectButton | Notes / Gaps |
| --- | --- | --- | --- |
| Single selection | Yes | Yes | Use radio-style behavior; single value binding. |
| Multiple selection | Yes | Yes | Use checkbox/pressed-style behavior; array binding. |
| Custom item template | Yes (ng-template) | Yes | Expose `item` template via content projection or `ng-template` input. |
| Sizes (small/medium/large) | Yes | Yes | Reuse `ButtonSize` inputs and CSS vars. |
| Disabled (component) | Yes | Yes | Host `disabled` input; apply `aria-disabled`, prevent interaction. |
| Disabled (per option) | Yes (optionDisabled) | Yes | Resolve `optionDisabled` field or callback. |
| Invalid state | Yes | Yes | Add `invalid` input and `aria-invalid`. |
| Fluid (full width) | Yes | Yes | Map to `fullWidth` input; stretch group and items. |
| Value binding (optionLabel/optionValue/optionDisabled) | Yes | Yes | Match PrimeNG-style field names for familiarity. |
| Reactive Forms (ngModel, formControlName) | Yes | Yes | Implement `ControlValueAccessor`. |
| onChange event | Yes | Yes | Emit `valueChange` (signal output) or `onChange` output. |
| Accessibility (aria-labelledby, keyboard) | Yes | Yes | WAI-ARIA pattern for radio/checkbox groups; roving tabindex. |
| Ripple effects | Yes (theme) | Not planned | Not in library conventions; avoid until tokenized. |
| Toggle off in single mode | Yes (allowEmpty) | TBD | Add `allowEmpty` if requested. |

## Reusability Assessment

### Reuse from `projects/ui-lib-custom/src/lib/button/`
- Inputs and types: `ButtonVariant`, `ButtonSize`, `ButtonSeverity`, `ButtonAppearance` (subset). A SelectButton likely only needs `variant`, `size`, and `severity/color` for selected state styling.
- Class conventions and CSS variables: button SCSS defines extensive CSS custom properties for size, radius, focus ring, and severity colors.
- Icon and badge support could be reused if we allow icon-only options or mixed content templates.

### Reuse from `projects/ui-lib-custom/src/lib/button-group/`
- Host grouping behavior and variant classes (material/bootstrap/minimal).
- Vertical layout could be optional, though PrimeNG uses horizontal layout by default.
- Existing `btn-group` class can be leveraged to keep styles consistent.

### Gaps in current components
- `ButtonGroup` currently only provides grouping classes and does not manage selection or keyboard navigation.
- `Button` handles disabled/loading but does not implement pressed/selected state styling or ARIA semantics.
- No shared token set for segmented control borders, selected state backgrounds, or group separators.

## Design Tokens: Existing vs Needed

### Existing tokens and CSS vars to leverage
- Spacing: `SPACING_TOKENS`, `STACK_TOKENS`, `INLINE_TOKENS`.
- Typography: `FONT_SIZES`, `FONT_WEIGHTS`.
- Radius: `BORDER_RADIUS`.
- Colors: `SEMANTIC_COLORS` (primary, neutral, warning, etc.).
- Button CSS vars: `--uilib-button-*` for focus ring, padding, and severity palettes.

### New tokens likely required
Add to `projects/ui-lib-custom/src/lib/design-tokens.ts` and map to CSS vars later.
- `SELECTBUTTON_BG` / `SELECTBUTTON_BORDER` defaults for unselected state.
- `SELECTBUTTON_ITEM_SELECTED_BG` / `SELECTBUTTON_ITEM_SELECTED_FG`.
- `SELECTBUTTON_ITEM_HOVER_BG` / `SELECTBUTTON_ITEM_HOVER_FG`.
- `SELECTBUTTON_ITEM_DISABLED_OPACITY`.
- `SELECTBUTTON_ITEM_FOCUS_RING` or reuse `--uilib-button-focus-ring`.
- `SELECTBUTTON_GROUP_RADIUS` and `SELECTBUTTON_ITEM_RADIUS` (for segmented corners).
- `SELECTBUTTON_GROUP_GAP` (if using spacing instead of borders).
- `SELECTBUTTON_INVALID_BORDER` (for invalid state styling).

## Recommended Architecture

### Composition vs custom rendering
- Prefer composing `ui-lib-button` for each option to reuse size, variant, and focus ring styles.
- Render options inside a `ui-lib-button-group` host to align with existing layout and variant class names.
- Provide an option to render custom template content without forcing `ui-lib-button` internals (projected content inside each button).

### Variants (Material / Bootstrap / Minimal)
- Match button style hooks and expose `variant` input on SelectButton, then pass through to button-group and button instances.
- Allow theme CSS to adjust selected/unselected states per variant using CSS vars on host or `btn-group`.

### ControlValueAccessor (CVA)
- Implement CVA in SelectButton for both single and multi values.
- Single: `value: T | null` with `allowEmpty` toggle.
- Multiple: `value: T[]` with `multiple = true` input.
- Keep `onTouched` on blur of group, and `onChange` from selection updates.

## Accessibility Requirements (WAI-ARIA)

### Roles
- Single selection: `role="radiogroup"` on host, each option `role="radio"` with `aria-checked`.
- Multiple selection: `role="group"` on host, each option `role="checkbox"` with `aria-checked`.
- Alternative pattern: `role="group"` with buttons using `aria-pressed` for toggle behavior.

### Labels
- Support `aria-label` and `aria-labelledby` inputs; pass through to host.
- If a visible label exists, wire `aria-labelledby` to that element.

### Keyboard Navigation
- Roving tabindex for options to ensure a single tab stop.
- Arrow keys move focus across options (Left/Right, Up/Down).
- Home/End jump to first/last option.
- Space/Enter toggles selection.
- Disabled options are skipped in navigation.

### States
- `aria-disabled` on host when disabled.
- `aria-invalid` when invalid.
- Per option `aria-disabled` for disabled options.

## Open Questions
- Do we need `allowEmpty` for single mode (toggle off)?
- Should the component expose `optionTemplate` as `TemplateRef` input or rely on content projection?
- Do we need icons per option (reuse `ui-lib-icon`) or leave to template?

## Proposed MVP Summary
- Inputs: `options`, `multiple`, `optionLabel`, `optionValue`, `optionDisabled`, `size`, `variant`, `severity`, `disabled`, `invalid`, `fullWidth`, `ariaLabel`, `ariaLabelledby`.
- Outputs: `valueChange` (and/or `onChange`) with value and original option.
- Internals: `ui-lib-button-group` host + `ui-lib-button` option buttons, CVA integration, ARIA roles + roving tabindex.

## Initial API Draft (Proposed)

### Inputs
- `options: SelectButtonOption[]`
- `optionLabel: string | ((option: SelectButtonOption) => string)`
- `optionValue: string | ((option: SelectButtonOption) => unknown)`
- `optionDisabled: string | ((option: SelectButtonOption) => boolean)`
- `variant: 'material' | 'bootstrap' | 'minimal'`
- `size: 'small' | 'medium' | 'large'`
- `severity: ButtonSeverity`
- `unselectedSeverity: ButtonSeverity`
- `multiple: boolean`
- `disabled: boolean`
- `invalid: boolean`
- `fullWidth: boolean`
- `allowEmpty: boolean`
- `ariaLabel: string | null`
- `ariaLabelledby: string | null`
- `itemTemplate: TemplateRef<{ $implicit: SelectButtonOption }> | null`

### Outputs
- CVA binding via `ngModel` / `formControlName` (no custom output in MVP).

### Files
- `projects/ui-lib-custom/src/lib/select-button/select-button.ts`
- `projects/ui-lib-custom/src/lib/select-button/select-button.html`
- `projects/ui-lib-custom/src/lib/select-button/select-button.scss`
- `projects/ui-lib-custom/src/lib/select-button/select-button.spec.ts`
