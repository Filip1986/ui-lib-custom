# Checkbox

**Selector:** `ui-lib-checkbox`
**Package:** `ui-lib-custom/checkbox`
**Content projection:** yes — alternative to the `label` input; projected content appears inside the label span

> `checked` is a two-way `model()` signal — use `[(checked)]` for direct binding. For group selection (multiple checkboxes bound to an array), omit `binary` and set `value` to what each checkbox contributes to the array; use `ngModel` or reactive forms on the array.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string \| null` | `null` | Visible label text; can be replaced by projected content |
| `description` | `string \| null` | `null` | Secondary description text rendered below the label |
| `ariaLabel` | `string \| null` | `null` | Used when no visible label is provided |
| `inputId` | `string \| null` | `null` | Forwarded to the native `<input>` id |
| `name` | `string \| null` | `null` | |
| `required` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | |
| `tabindex` | `number` | `0` | |
| `value` | `unknown \| null` | `null` | The value this checkbox contributes to a group array |
| `binary` | `boolean` | `false` | When true, the control emits a simple boolean instead of managing a group array |
| `trueValue` | `unknown` | `true` | Value emitted when checked in binary mode |
| `falseValue` | `unknown` | `false` | Value emitted when unchecked in binary mode |
| `checkboxIcon` | `string \| null` | `null` | Extra CSS class applied to the check icon element |
| `autofocus` | `boolean` | `false` | |
| `inputClass` | `string \| null` | `null` | Extra CSS class on the native `<input>` |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `disabled` | `boolean` | `false` | |
| `indeterminate` | `boolean` | `false` | |
| `checked` | `boolean` | `false` | Two-way bindable via `[(checked)]` |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `CheckboxChangeEvent` | `{ checked: boolean \| unknown[], originalEvent: Event }` |
| `focus` | `FocusEvent` | |
| `blur` | `FocusEvent` | |

## Usage

```html
<!-- simple boolean checkbox -->
<ui-lib-checkbox label="Accept terms" [(checked)]="accepted" />

<!-- group mode — ngModel holds a string[] -->
<ui-lib-checkbox label="Angular" [value]="'angular'" [(ngModel)]="selected" />
<ui-lib-checkbox label="React" [value]="'react'" [(ngModel)]="selected" />
```

## Accessibility notes

- The component uses a native `<input type="checkbox">` and keeps `aria-checked` in sync with all three states: `"false"`, `"true"`, and `"mixed"` (`indeterminate`).
- `required` maps to both the native required behavior and `aria-required`.
- `disabled` maps to both native disabled behavior and `aria-disabled`.
- The visual checkmark/dash icons are decorative (`aria-hidden="true"`).

### Group labeling (consumer responsibility)

`ui-lib-checkbox` does not wrap related checkboxes into a semantic group automatically. For multiple related choices, wrap them in a labeled group:

```html
<fieldset>
  <legend>Notification types</legend>
  <ui-lib-checkbox label="Email" [(checked)]="emailEnabled" />
  <ui-lib-checkbox label="SMS" [(checked)]="smsEnabled" />
</fieldset>
```

or

```html
<div role="group" aria-labelledby="notifications-group-label">
  <span id="notifications-group-label">Notification types</span>
  <ui-lib-checkbox label="Email" [(checked)]="emailEnabled" />
  <ui-lib-checkbox label="SMS" [(checked)]="smsEnabled" />
</div>
```

## Forms integration

`ui-lib-checkbox` implements `ControlValueAccessor`, so it works with both template-driven and reactive Angular forms.

## CSS custom properties

- `--uilib-checkbox-transition-duration` controls checkbox motion timing.
- Reduced motion is respected automatically:
  - `@media (prefers-reduced-motion: reduce) { --uilib-checkbox-transition-duration: 0ms; }`
