# ToggleButton

**Selector:** `ui-lib-toggle-button`
**Package:** `ui-lib-custom/toggle-button`
**Content projection:** no — none (label/icon are input-driven)

> Label text is driven by `onLabel` / `offLabel` inputs, not content projection. When `allowEmpty` is `false`, clicking an already-checked button does nothing (selection is sticky).

## Inputs

| Name             | Type                                             | Default  | Notes                                                                              |
| ---------------- | ------------------------------------------------ | -------- | ---------------------------------------------------------------------------------- |
| `onLabel`        | `string`                                         | `'Yes'`  | Label shown when checked                                                           |
| `offLabel`       | `string`                                         | `'No'`   | Label shown when unchecked                                                         |
| `onIcon`         | `SemanticIcon \| string \| null`                 | `null`   | Icon shown when checked                                                            |
| `offIcon`        | `SemanticIcon \| string \| null`                 | `null`   | Icon shown when unchecked                                                          |
| `ariaLabel`      | `string \| null`                                 | `null`   | Required when rendering icon-only content (for example empty labels + icon inputs) |
| `ariaLabelledBy` | `string \| null`                                 | `null`   |                                                                                    |
| `disabled`       | `boolean`                                        | `false`  |                                                                                    |
| `inputId`        | `string \| null`                                 | `null`   | Forwarded to the inner `<button>` id                                               |
| `tabindex`       | `number`                                         | `0`      |                                                                                    |
| `size`           | `'sm' \| 'md' \| 'lg'`                           | `'md'`   |                                                                                    |
| `iconPos`        | `'left' \| 'right'`                              | `'left'` | Icon position relative to the label                                                |
| `autofocus`      | `boolean`                                        | `false`  |                                                                                    |
| `allowEmpty`     | `boolean`                                        | `true`   | When false, a checked button cannot be unchecked                                   |
| `variant`        | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Falls back to global theme variant when null                                       |
| `styleClass`     | `string \| null`                                 | `null`   | Extra CSS classes on the host element                                              |
| `pressed`        | `boolean`                                        | `false`  | Two-way bindable via `[(pressed)]`                                                 |

## Outputs

| Name     | Payload                   | Notes                                        |
| -------- | ------------------------- | -------------------------------------------- |
| `change` | `ToggleButtonChangeEvent` | `{ checked: boolean, originalEvent: Event }` |
| `focus`  | `FocusEvent`              |                                              |
| `blur`   | `FocusEvent`              |                                              |

## Usage

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

## CSS Custom Properties

| Variable                               | Default                                                                                     | Description                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `--uilib-toggle-button-radius`         | `var(--uilib-radius-base, 6px)`                                                             | Button border radius                                                  |
| `--uilib-toggle-button-bg`             | `transparent`                                                                               | Off-state background                                                  |
| `--uilib-toggle-button-border`         | `var(--uilib-color-neutral-300)`                                                            | Off-state border color                                                |
| `--uilib-toggle-button-color`          | `var(--uilib-color-neutral-700)`                                                            | Off-state text color                                                  |
| `--uilib-toggle-button-checked-bg`     | `var(--uilib-color-primary-500)`                                                            | On-state background                                                   |
| `--uilib-toggle-button-checked-border` | `var(--uilib-color-primary-500)`                                                            | On-state border color                                                 |
| `--uilib-toggle-button-checked-color`  | `var(--uilib-color-neutral-50)`                                                             | On-state text color                                                   |
| `--uilib-toggle-button-checked-shadow` | `0 1px 3px 0 color-mix(…primary-500… 40%, transparent)`                                     | Elevation shadow on checked state (material variant)                  |
| `--uilib-toggle-button-focus-ring`     | `0 0 0 3px color-mix(…primary-500… 35%, transparent)`                                       | Focus ring box-shadow                                                 |
| `--uilib-toggle-button-transition`     | `background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease` | State transition; set to `none` when `prefers-reduced-motion: reduce` |

## Accessibility notes

- Uses native `<button type="button">` semantics with `aria-pressed="true|false"` to expose toggle state.
- Uses native `[disabled]` for true disabled behavior (non-focusable, non-interactive).
- If you need a keyboard-discoverable "disabled-like" state, keep the button enabled and apply `aria-disabled="true"` with custom interaction handling in your parent logic.
