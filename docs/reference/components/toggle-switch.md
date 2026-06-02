# Toggle Switch

**Selector:** `ui-lib-toggle-switch`
**Entry point:** `import { ToggleSwitch } from 'ui-lib-custom/toggle-switch'`

---

## Overview

ToggleSwitch presents a boolean on/off control as a sliding pill switch. Implements ControlValueAccessor for ngModel and reactive-forms support.

## API

### Inputs

| Name         | Type                 | Default | Description                                                               |
| ------------ | -------------------- | ------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `ariaLabel`  | `string              | null`   | `null`                                                                    | Accessible label applied directly to the native input element. |
| `autofocus`  | `boolean`            | `false` | When true, the native input receives focus on load.                       |
| `disabled`   | `boolean`            | `false` | When true, interaction is disabled and the control is not focusable.      |
| `inputId`    | `string              | null`   | `null`                                                                    | ID attribute applied to the native input element.              |
| `label`      | `string              | null`   | `null`                                                                    | Optional text label displayed next to the switch.              |
| `name`       | `string              | null`   | `null`                                                                    | Name attribute applied to the native input element.            |
| `readonly`   | `boolean`            | `false` | When true, the state cannot be changed but the control remains focusable. |
| `size`       | `ToggleSwitchSize`   | `'md'`  | Component size token.                                                     |
| `styleClass` | `string              | null`   | `null`                                                                    | Additional CSS class(es) applied to the host element.          |
| `tabindex`   | `number`             | `0`     | Tab index of the native input element.                                    |
| `variant`    | `ToggleSwitchVariant | null`   | `null`                                                                    | Design variant; inherits from ThemeConfigService when null.    |

### Models (two-way bindable)

| Name      | Type      | Default | Description                     |
| --------- | --------- | ------- | ------------------------------- |
| `checked` | `boolean` | `false` | Two-way bindable checked state. |

### Outputs

| Name           | Type                      | Description                                   |
| -------------- | ------------------------- | --------------------------------------------- |
| `switchBlur`   | `FocusEvent`              | Emitted when the native input loses focus.    |
| `switchChange` | `ToggleSwitchChangeEvent` | Emitted when the toggle state changes.        |
| `switchFocus`  | `FocusEvent`              | Emitted when the native input receives focus. |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                                   | Default                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--uilib-toggle-switch-focus-ring`             | `0 0 0 3px color-mix(in srgb, var(--uilib-color-primary-500, #6366f1) 30%, transparent)` |
| `--uilib-toggle-switch-font`                   | `var(--uilib-font-ui, inherit)`                                                          |
| `--uilib-toggle-switch-font-size-lg`           | `1.0625rem`                                                                              |
| `--uilib-toggle-switch-font-size-sm`           | `var(--uilib-font-size-sm, 0.875rem)`                                                    |
| `--uilib-toggle-switch-gap`                    | `var(--uilib-space-3, 0.75rem)`                                                          |
| `--uilib-toggle-switch-thumb-bg`               | `var(--uilib-color-neutral-50, #f8fafc)`                                                 |
| `--uilib-toggle-switch-thumb-bg-checked`       | `var(--uilib-color-neutral-50, #f8fafc)`                                                 |
| `--uilib-toggle-switch-thumb-offset`           | `0.1875rem`                                                                              |
| `--uilib-toggle-switch-thumb-shadow`           | `0 1px 3px rgb(0 0 0 / 25%)`                                                             |
| `--uilib-toggle-switch-thumb-size`             | `1.125rem`                                                                               |
| `--uilib-toggle-switch-track-bg`               | `var(--uilib-color-neutral-300, #cbd5e1)`                                                |
| `--uilib-toggle-switch-track-bg-checked`       | `var(--uilib-color-primary-500, #6366f1)`                                                |
| `--uilib-toggle-switch-track-bg-checked-hover` | `var(--uilib-color-primary-600, #4f46e5)`                                                |
| `--uilib-toggle-switch-track-bg-hover`         | `var(--uilib-color-neutral-400, #94a3b8)`                                                |
| `--uilib-toggle-switch-track-border-color`     | `transparent`                                                                            |
| `--uilib-toggle-switch-track-border-radius`    | `var(--uilib-radius-full, 9999px)`                                                       |
| `--uilib-toggle-switch-track-height`           | `1.5rem`                                                                                 |
| `--uilib-toggle-switch-track-width`            | `2.75rem`                                                                                |
| `--uilib-toggle-switch-transition-duration`    | `var(--uilib-transition-base, 0.2s)`                                                     |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/switch/

### Keyboard Interactions

| Test description                                                          |
| ------------------------------------------------------------------------- |
| Space key does not fire toggle twice (no double-toggle)                   |
| Space key toggles the switch when enabled                                 |
| announces                                                                 |
| announces using ariaLabel when label input is absent                      |
| aria-checked becomes                                                      |
| aria-checked is                                                           |
| ariaLabel path: does not set aria-labelledby when ariaLabel is provided   |
| ariaLabel path: sets aria-label on native input                           |
| axe: aria-label only passes                                               |
| axe: checked state passes                                                 |
| axe: default state with label passes                                      |
| axe: disabled state passes                                                |
| axe: readonly state passes                                                |
| disabled: Space key does not toggle the switch                            |
| disabled: tabindex is -1                                                  |
| does not warn when ariaLabel is provided                                  |
| label input path: sets aria-labelledby pointing to visible label element  |
| native input has role=                                                    |
| readonly: Space key does not toggle the switch                            |
| readonly: aria-readonly is absent when not readonly                       |
| readonly: aria-readonly=                                                  |
| should apply variant class when set to bootstrap                          |
| should emit focus event when native input is focused                      |
| should have role=                                                         |
| should include the variant class                                          |
| should not set aria-labelledby when ariaLabel is provided                 |
| should render the native input with role=                                 |
| should set aria-checked to false by default                               |
| should set aria-checked to true when checked                              |
| should set aria-label when ariaLabel input is provided                    |
| should set aria-labelledby to the label element id when label is provided |
| should set tabindex to -1 when disabled                                   |
| should toggle on Space keydown                                            |
| writeValue via FormControl sets aria-checked correctly                    |

## Usage Examples

```html
<!-- minimal example with visible label -->
<ui-lib-toggle-switch label="Enable notifications" [(checked)]="notificationsOn" />

<!-- aria-label only (no visible label) -->
<ui-lib-toggle-switch ariaLabel="Toggle notifications" [(checked)]="notificationsOn" />

<!-- reactive form binding -->
<ui-lib-toggle-switch [formControl]="darkModeControl" label="Dark mode" />

<!-- ngModel binding -->
<ui-lib-toggle-switch [(ngModel)]="enabled" label="Feature flag" />

<!-- projected label (e.g. inside a form field) -->
<ui-lib-toggle-switch inputId="feature-switch">
  <label for="feature-switch">Enable advanced features</label>
</ui-lib-toggle-switch>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#toggle-switch)
- [Demo page](/components/toggle-switch)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/toggle-switch/README.md)
