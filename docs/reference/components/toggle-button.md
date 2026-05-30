# Toggle Button

**Selector:** `ui-lib-toggle-button`
**Entry point:** `import { ToggleButton } from 'ui-lib-custom/toggle-button'`

---

## Overview

ToggleButton selects a boolean value via a button with distinct on/off labels and icons. Implements ControlValueAccessor for ngModel and reactive-forms support.

## API

### Inputs

| Name             | Type                           | Default  | Description                                                                                                |
| ---------------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `allowEmpty`     | `boolean`                      | `true`   | When false, an already-checked button cannot be unchecked by clicking.                                     |
| `ariaLabel`      | `string | null`                | `null`   | Accessible label applied to the inner button element.                                                      |
| `ariaLabelledBy` | `string | null`                | `null`   | ID of an external element that labels this button.                                                         |
| `autofocus`      | `boolean`                      | `false`  | When true, the button receives focus on load.                                                              |
| `checked`        | `boolean | null`               | `null`   | Backward-compatible checked input alias. Prefer `pressed`.                                                 |
| `disabled`       | `boolean`                      | `false`  | When true, interaction is disabled.                                                                        |
| `iconPos`        | `ToggleButtonIconPos`          | `'left'` | Position of the icon relative to the label.                                                                |
| `inputId`        | `string | null`                | `null`   | ID attribute applied to the inner button element.                                                          |
| `offIcon`        | `SemanticIcon | string | null` | `null`   | Icon name or CSS class displayed in the off (unchecked) state.                                             |
| `offLabel`       | `string`                       | `''`     | Label displayed when the button is in the off (unchecked) state. Falls back to locale 'toggle-button.off'. |
| `onIcon`         | `SemanticIcon | string | null` | `null`   | Icon name or CSS class displayed in the on (checked) state.                                                |
| `onLabel`        | `string`                       | `''`     | Label displayed when the button is in the on (checked) state. Falls back to locale 'toggle-button.on'.     |
| `size`           | `ToggleButtonSize`             | `'md'`   | Component size token.                                                                                      |
| `styleClass`     | `string | null`                | `null`   | Additional CSS class(es) applied to the host element.                                                      |
| `tabindex`       | `number`                       | `0`      | Tab index of the inner button.                                                                             |
| `variant`        | `ToggleButtonVariant | null`   | `null`   | Design variant; inherits from ThemeConfigService when null.                                                |

### Models (two-way bindable)

| Name      | Type      | Default | Description                     |
| --------- | --------- | ------- | ------------------------------- |
| `pressed` | `boolean` | `false` | Two-way bindable pressed state. |

### Outputs

| Name                 | Type                      | Description                                                             |
| -------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `checkedChange`      | `boolean`                 | Backward-compatible checkedChange output alias. Prefer `pressedChange`. |
| `toggleButtonBlur`   | `FocusEvent`              | Emitted when the inner button loses focus.                              |
| `toggleButtonChange` | `ToggleButtonChangeEvent` | Emitted when the toggle state changes.                                  |
| `toggleButtonFocus`  | `FocusEvent`              | Emitted when the inner button receives focus.                           |

## Content Projection

_none_

## Theming

| CSS Variable                              | Default                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| `--uilib-toggle-button-bg`                | `transparent`                                                                               |
| `--uilib-toggle-button-bg-active`         | `color-mix( in srgb, var(--uilib-color-neutral-300, #d1d5db) 60%, transparent )`            |
| `--uilib-toggle-button-bg-hover`          | `color-mix( in srgb, var(--uilib-color-neutral-200, #e5e7eb) 80%, transparent )`            |
| `--uilib-toggle-button-border`            | `var(--uilib-color-neutral-300, #d1d5db)`                                                   |
| `--uilib-toggle-button-border-hover`      | `var(--uilib-color-neutral-400, #9ca3af)`                                                   |
| `--uilib-toggle-button-checked-bg`        | `var(--uilib-color-primary-500, #6366f1)`                                                   |
| `--uilib-toggle-button-checked-bg-active` | `var(--uilib-color-primary-700, #4338ca)`                                                   |
| `--uilib-toggle-button-checked-bg-hover`  | `var(--uilib-color-primary-600, #4f46e5)`                                                   |
| `--uilib-toggle-button-checked-border`    | `var(--uilib-color-primary-500, #6366f1)`                                                   |
| `--uilib-toggle-button-checked-color`     | `var(--uilib-color-neutral-50, #f9fafb)`                                                    |
| `--uilib-toggle-button-checked-shadow`    | `0 1px 3px 0 color-mix(in srgb, var(--uilib-color-primary-500, #6366f1) 40%, transparent)`  |
| `--uilib-toggle-button-color`             | `var(--uilib-color-neutral-700, #374151)`                                                   |
| `--uilib-toggle-button-focus-ring`        | `0 0 0 3px color-mix(in srgb, var(--uilib-color-primary-500, #6366f1) 35%, transparent)`    |
| `--uilib-toggle-button-font`              | `var(--uilib-font-ui, inherit)`                                                             |
| `--uilib-toggle-button-font-size`         | `var(--uilib-toggle-button-font-size-sm)`                                                   |
| `--uilib-toggle-button-font-size-lg`      | `1rem`                                                                                      |
| `--uilib-toggle-button-font-size-md`      | `0.875rem`                                                                                  |
| `--uilib-toggle-button-font-size-sm`      | `0.8125rem`                                                                                 |
| `--uilib-toggle-button-gap`               | `0.5rem`                                                                                    |
| `--uilib-toggle-button-height`            | `var(--uilib-toggle-button-height-sm)`                                                      |
| `--uilib-toggle-button-height-lg`         | `3rem`                                                                                      |
| `--uilib-toggle-button-height-md`         | `2.5rem`                                                                                    |
| `--uilib-toggle-button-height-sm`         | `2rem`                                                                                      |
| `--uilib-toggle-button-padding-x`         | `var(--uilib-toggle-button-padding-x-sm)`                                                   |
| `--uilib-toggle-button-padding-x-lg`      | `1.25rem`                                                                                   |
| `--uilib-toggle-button-padding-x-md`      | `1rem`                                                                                      |
| `--uilib-toggle-button-padding-x-sm`      | `0.75rem`                                                                                   |
| `--uilib-toggle-button-radius`            | `var(--uilib-radius-base, 6px)`                                                             |
| `--uilib-toggle-button-transition`        | `background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                          |
| --------------------------------------------------------- |
| applies aria-labelledby when provided                     |
| axe: default state passes                                 |
| axe: disabled state passes                                |
| axe: grouped usage passes                                 |
| axe: icon-only with aria-label passes                     |
| axe: pressed state passes                                 |
| disabled state removes button from keyboard tab order     |
| does not set aria-checked on the button                   |
| grouped buttons expose aria-pressed state                 |
| icon-only mode uses aria-label when provided              |
| icon-only mode without aria-label leaves aria-label unset |
| icon-only mode without aria-label logs a dev-mode error   |
| sets aria-pressed=                                        |
| should apply aria-label when provided                     |
| should apply variant class for variant=${variantValue}    |
| should emit focus event on focus                          |
| should have tabindex=-1 when disabled                     |
| should have tabindex=0 by default                         |
| should set aria-pressed=false when not pressed            |
| should set aria-pressed=true when pressed                 |
| should toggle on Enter keydown                            |
| should toggle on Space keydown                            |
| supports grouped usage with role=group                    |
| treats whitespace-only ariaLabel as unset                 |

## Usage Examples

```html
<!-- minimal example -->
<ui-lib-toggle-button onLabel="On" offLabel="Off" [(pressed)]="isOn" />

<!-- with icons, sticky selection -->
<ui-lib-toggle-button
  onLabel="Liked"
  offLabel="Like"
  onIcon="heart"
  [allowEmpty]="false"
  [(pressed)]="liked"
/>

<!-- icon-only requires ariaLabel -->
<ui-lib-toggle-button
  onLabel=""
  offLabel=""
  onIcon="heart"
  offIcon="heart"
  ariaLabel="Favorite"
  [(pressed)]="favorite"
/>

<!-- grouped usage -->
<div role="group" aria-label="Formatting">
  <ui-lib-toggle-button onLabel="Bold On" offLabel="Bold Off" [(pressed)]="bold" />
  <ui-lib-toggle-button onLabel="Italic On" offLabel="Italic Off" [(pressed)]="italic" />
</div>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#toggle-button)
- [Demo page](/components/toggle-button)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/toggle-button/README.md)

