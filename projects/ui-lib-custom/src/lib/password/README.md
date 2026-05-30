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
| `errorMessage` | `string \| undefined` | `undefined` | Announces validation message when `invalid` is `true` |
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
the live region (`strengthId`), so assistive technology announces strength changes. If `invalid`
and `errorMessage` are provided, `aria-describedby` includes the error id as well.

### Strength live region

A visually-hidden `<div role="status">` with `aria-live="polite"` and `aria-atomic="true"` is always present in
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

### Validation state (`aria-invalid` + error description)

Set `invalid` to mark the native input with `aria-invalid="true"`. Provide `errorMessage` to render
an error node linked by `aria-describedby`:

```html
<label [for]="passwordRef.passwordId">Password</label>
<uilib-password #passwordRef [invalid]="true" errorMessage="Password is required" />
```

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

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-password-transition` | `border-color 0.15s ease, box-shadow 0.15s ease` | Input border/shadow transition; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-password-border-color` | `#d1d5db` | Input border color |
| `--uilib-password-border-color-hover` | `#9ca3af` | Input border color on hover |
| `--uilib-password-border-color-focus` | `#6366f1` | Input border color on focus |
| `--uilib-password-border-color-invalid` | `#ef4444` | Input border when invalid |
| `--uilib-password-focus-ring` | `rgba(99, 102, 241, 0.2)` | Focus ring color |
| `--uilib-password-bg` | `#ffffff` | Input background |
| `--uilib-password-color` | `#374151` | Input text color |
| `--uilib-password-border-radius` | `6px` | Input corner radius |
| `--uilib-password-icon-color` | `#6b7280` | Toggle/clear icon color |
| `--uilib-password-panel-bg` | `#ffffff` | Strength panel background |
| `--uilib-password-panel-border-radius` | `6px` | Strength panel corner radius |
| `--uilib-password-panel-shadow` | `0 4px 12px rgba(0,0,0,0.08)` | Strength panel shadow |
| `--uilib-password-meter-bg` | `#e5e7eb` | Meter track background |
| `--uilib-password-meter-height` | `6px` | Meter track height |
| `--uilib-password-meter-bg-weak` | `#ef4444` | Meter fill — weak |
| `--uilib-password-meter-bg-medium` | `#f59e0b` | Meter fill — medium |
| `--uilib-password-meter-bg-strong` | `#10b981` | Meter fill — strong |
| `--uilib-password-meter-transition-duration` | `0.4s` | Meter width animation duration; set to `0ms` when `prefers-reduced-motion: reduce` |
| `--uilib-password-meter-color-transition-duration` | `0.25s` | Meter color animation duration; set to `0ms` when `prefers-reduced-motion: reduce` |
