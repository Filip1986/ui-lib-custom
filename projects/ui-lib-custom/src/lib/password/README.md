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
| `inputId` | `string \| undefined` | `undefined` | Overrides the auto-generated id on the native `<input>` |
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

## Public properties

| Name | Type | Notes |
|------|------|-------|
| `passwordId` | `string` | Auto-generated id for the native input — use with `<label [for]="comp.passwordId">` |
| `strengthId` | `string` | Id of the strength live region — equals `passwordId + "-strength"` |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `focused` | `Event` | Fires when the input gains focus |
| `blurred` | `Event` | Fires when the input loses focus |
| `cleared` | `void` | Fires when the clear button is clicked |

## Accessibility

### Label association (`aria-describedby` pattern)

The component generates a unique `passwordId` and `strengthId` on each instance. Associate an
external `<label>` using the component reference:

```html
<label [for]="passwordRef.passwordId">New password</label>
<uilib-password #passwordRef />
```

When `feedback` is enabled (default), the input automatically has `aria-describedby` pointing to
the live region (`strengthId`), so assistive technology announces strength changes.

### Strength live region

A visually-hidden `<div>` with `aria-live="polite"` and `aria-atomic="true"` is always present in
the DOM when `feedback` is true. It announces:

- `"Password strength: None"` — empty field
- `"Password strength: Weak"` — password fails medium regex
- `"Password strength: Medium"` — password meets medium but not strong regex
- `"Password strength: Strong"` — password meets strong regex

The visual strength meter and label inside the panel are marked `aria-hidden="true"` — only the
live region communicates strength to screen readers.

### Toggle visibility button

When `toggleMask` is enabled, a button with `aria-label` and `aria-pressed` is rendered:

- `aria-label="Show password"` / `"Hide password"` reflects current state
- `aria-pressed="false"` / `"true"` communicates toggle state to AT
- The button icon SVG has `aria-hidden="true"` and `focusable="false"`

## Usage

```html
<!-- minimal example with label association -->
<label [for]="passRef.passwordId">Password</label>
<uilib-password #passRef [(ngModel)]="password" />

<!-- with toggle mask, feedback, and clear button -->
<label [for]="passRef.passwordId">New password</label>
<uilib-password
  #passRef
  variant="material"
  [toggleMask]="true"
  [showClear]="true"
  placeholder="Min 8 characters"
  [(ngModel)]="password"
/>

<!-- without strength feedback, with clear button -->
<label [for]="passRef.passwordId">Password</label>
<uilib-password
  #passRef
  [feedback]="false"
  [showClear]="true"
  placeholder="Password"
  [(ngModel)]="password"
/>
```
