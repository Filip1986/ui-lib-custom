# Input

**Selector:** `ui-lib-input`
**Package:** `ui-lib-custom/input`
**Content projection:** yes — `[prefix]` and `[suffix]` slots for icons or addons

> Implements `ControlValueAccessor`; use `ngModel` or reactive forms. The `label` input renders a `<label>` element — it is not projected content. Prefix/suffix content must carry the `prefix` or `suffix` attribute selector.

> **Accessibility note:** A `placeholder` alone is **not** an accessible label. Always provide a `label` input so the `<label>` element is rendered and associated with the native input via `for`/`id`. Placeholder text disappears once the user types and is not reliably announced by all screen readers.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `id` | `string \| null` | `null` | Forwarded to the native `<input>` id |
| `name` | `string \| null` | `null` | Forwarded to the native `<input>` name |
| `label` | `string` | `''` | Rendered as a `<label>` element above the input |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `type` | `InputType` | `'text'` | Any valid HTML input type |
| `labelFloat` | `'over' \| 'in' \| 'on'` | `'over'` | Label position / floating behaviour |
| `placeholder` | `string` | `''` | |
| `error` | `string \| null` | `null` | Error message rendered below the input; announces via live region; implies `aria-invalid` |
| `hint` | `string \| null` | `null` | Helper text rendered below the input; linked via `aria-describedby` |
| `invalid` | `boolean` | `false` | Marks the field invalid (sets `aria-invalid`) without requiring an error message |
| `disabled` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `showCounter` | `boolean` | `false` | Shows character count; requires `maxLength` to display fraction |
| `maxLength` | `number \| null` | `null` | |
| `showClear` | `boolean` | `false` | Shows an inline clear button when the field has a value |
| `showTogglePassword` | `boolean` | `false` | Only meaningful when `type="password"` |

## Outputs

_none_

## Usage

```html
<!-- minimal example -->
<ui-lib-input label="Email" type="email" [(ngModel)]="email" />

<!-- with hint text -->
<ui-lib-input
  label="Email"
  hint="We'll never share your email"
  [(ngModel)]="email"
/>

<!-- with prefix icon, error, and character counter -->
<ui-lib-input
  label="Username"
  [error]="usernameError"
  [showCounter]="true"
  [maxLength]="30"
  [(ngModel)]="username"
>
  <span prefix>@</span>
</ui-lib-input>
```
