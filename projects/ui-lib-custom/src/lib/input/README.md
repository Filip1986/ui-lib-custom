# Input

**Selector:** `ui-lib-input`
**Package:** `ui-lib-custom/input`
**Content projection:** yes — `[prefix]` and `[suffix]` slots for icons or addons

> Implements `ControlValueAccessor`; use `ngModel` or reactive forms. The `label` input renders a `<label>` element — it is not projected content. Prefix/suffix content must carry the `prefix` or `suffix` attribute selector.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `id` | `string \| null` | `null` | Forwarded to the native `<input>` id |
| `name` | `string \| null` | `null` | Forwarded to the native `<input>` name |
| `label` | `string` | `''` | Rendered as a `<label>` element above the input |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `type` | `InputType` | `'text'` | Any valid HTML input type |
| `labelFloat` | `'over' \| 'in' \| 'out'` | `'over'` | Label position / floating behaviour |
| `placeholder` | `string` | `''` | |
| `error` | `string \| null` | `null` | Error message rendered below the input; announces via live region |
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
