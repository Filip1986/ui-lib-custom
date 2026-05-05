# Password

**Selector:** `uilib-password`
**Package:** `ui-lib-custom/password`
**Content projection:** no — none

> The selector is `uilib-password` (no hyphen after `ui`), unlike most library components that use `ui-lib-*`. The `variant` input defaults to `'material'` instead of inheriting the global theme — set it explicitly for consistent theming.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Does not fall back to global theme — must be set explicitly |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | |
| `disabled` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | |
| `invalid` | `boolean` | `false` | Applies invalid styles; does not render an error message |
| `fluid` | `boolean` | `false` | Full-width layout |
| `feedback` | `boolean` | `true` | Shows a strength meter panel on focus |
| `toggleMask` | `boolean` | `true` | Shows a button to reveal/hide the password |
| `showClear` | `boolean` | `false` | Shows an inline clear button when the field has a value |
| `placeholder` | `string \| undefined` | `undefined` | |
| `autocomplete` | `string \| undefined` | `undefined` | |
| `name` | `string \| undefined` | `undefined` | |
| `inputId` | `string \| undefined` | `undefined` | Forwarded to the native `<input>` id |
| `ariaLabel` | `string \| undefined` | `undefined` | |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | |
| `maxLength` | `number \| undefined` | `undefined` | |
| `tabindex` | `number \| undefined` | `undefined` | |
| `promptLabel` | `string` | `'Enter a password'` | Strength panel text before typing |
| `weakLabel` | `string` | `'Weak'` | |
| `mediumLabel` | `string` | `'Medium'` | |
| `strongLabel` | `string` | `'Strong'` | |
| `mediumRegex` | `string` | `'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'` | |
| `strongRegex` | `string` | `'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'` | |
| `inputStyleClass` | `string \| undefined` | `undefined` | Extra CSS class on the inner `<input>` element |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `focused` | `Event` | Fires when the input gains focus |
| `blurred` | `Event` | Fires when the input loses focus |
| `cleared` | `void` | Fires when the clear button is clicked |

## Usage

```html
<!-- minimal example -->
<uilib-password [(ngModel)]="password" />

<!-- without strength feedback, with clear button -->
<uilib-password
  [feedback]="false"
  [showClear]="true"
  placeholder="New password"
  [(ngModel)]="password"
/>
```
