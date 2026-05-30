# InputMask

**Selector:** `uilib-input-mask`
**Package:** `ui-lib-custom/input-mask`
**Content projection:** no — renders its own `<input>` inline (no `templateUrl`; template is inline in the component decorator)

> The component uses an inline `template` string, not a separate `.html` file — this is a pre-existing exception to the project convention. The output names (`completed`, `focused`, `blurred`, `inputChanged`, `cleared`) differ from PrimeNG's `onComplete`, `onFocus`, `onBlur` conventions.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `mask` | `string` | `''` | Mask pattern string (e.g. `'99/99/9999'`, `'(999) 999-9999'`) |
| `slotChar` | `string` | `'_'` | Placeholder character for unfilled mask slots |
| `autoClear` | `boolean` | `true` | Clear the value if input is incomplete on blur |
| `keepBuffer` | `boolean` | `false` | Keep partial mask characters in the model value |
| `unmask` | `boolean` | `false` | Emit raw value without mask characters |
| `showClear` | `boolean` | `false` | Show a clear icon when the field has a value |
| `type` | `string` | `'text'` | Native input type |
| `characterPattern` | `string` | `'[A-Za-z]'` | Regex pattern used for the `a` mask slot |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `filled` | `boolean` | `false` | Filled background appearance |
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Make the input read-only |
| `placeholder` | `string \| undefined` | `undefined` | Input placeholder text |
| `autocomplete` | `string \| undefined` | `undefined` | Native autocomplete attribute |
| `name` | `string \| undefined` | `undefined` | Native name attribute |
| `fluid` | `boolean` | `false` | Stretch to fill container width |
| `invalid` | `boolean` | `false` | Apply error styling |
| `id` | `string \| null` | `null` | Optional explicit input ID (auto-generated otherwise) |
| `ariaLabel` | `string \| null` | `null` | Accessible name for unlabeled/icon-only usage |
| `ariaLabelledBy` | `string \| null` | `null` | ID reference to an external label element |
| `maskHint` | `string \| null` | `null` | Screen-reader hint announced via `aria-describedby` (`mask` value is used when omitted) |
| `errorMessage` | `string \| null` | `null` | Error text rendered when invalid/incomplete |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `completed` | `InputMaskCompleteEvent` | All mask slots are filled |
| `focused` | `Event` | Input focused |
| `blurred` | `Event` | Input blurred |
| `inputChanged` | `Event` | Value changed while typing |
| `cleared` | `void` | Clear button clicked |

## Mask syntax

| Token | Meaning | Default accepted chars |
|---|---|---|
| `9` | Required digit | `0-9` |
| `a` | Required alpha character | `A-Z` / `a-z` (`characterPattern` input controls this) |
| `*` | Required alphanumeric character | Combined `a` + digit |
| `?` | Start of optional section | Characters after `?` are optional |
| Any other char | Literal mask character | e.g. `(`, `)`, `/`, `-`, space |

## Accessibility behavior

- `aria-describedby` automatically includes the mask format hint element (`Format: ...`) and any active error element.
- On blur, incomplete mask input sets `aria-invalid="true"` and links to the component error element.
- Use `ariaLabel` or `ariaLabelledBy`; do not rely on placeholder text as the only label.
- Invalid blocked characters are announced in a polite live region (not silently ignored).
- `aria-valuetext` exposes typed user characters without empty-slot placeholders.

## Usage

```html
<!-- phone number mask -->
<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="phone" />

<!-- date mask, emitting unmasked value -->
<uilib-input-mask mask="99/99/9999" [unmask]="true" [(ngModel)]="rawDate" />
```

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-input-mask-padding-y` | `0.5rem` | Vertical padding of the input |
| `--uilib-input-mask-padding-x` | `0.75rem` | Horizontal padding of the input |
| `--uilib-input-mask-font-size` | `1rem` | Input font size |
| `--uilib-input-mask-border-radius` | `var(--uilib-radius-md, 0.5rem)` | Input corner radius |
| `--uilib-input-mask-border-color` | `var(--uilib-border)` | Default border color |
| `--uilib-input-mask-bg` | `var(--uilib-surface)` | Input background |
| `--uilib-input-mask-text-color` | `var(--uilib-page-fg)` | Input text color |
| `--uilib-input-mask-placeholder-color` | `var(--uilib-muted)` | Placeholder text color |
| `--uilib-input-mask-focus-border-color` | `var(--uilib-color-primary-600)` | Border color on focus |
| `--uilib-input-mask-focus-ring` | `0 0 0 3px color-mix(…focus-border-color… 28%)` | Focus ring box-shadow |
| `--uilib-input-mask-invalid-border-color` | `var(--uilib-color-danger-600)` | Border color when invalid |
| `--uilib-input-mask-error-color` | `var(--uilib-color-danger-600)` | Error message text color |
| `--uilib-input-mask-transition` | `border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease` | Input state transition; set to `none` when `prefers-reduced-motion: reduce` |

## Security note

`InputMask` controls format, not secrecy. Client-side mask validation can be bypassed, and masked/raw values still exist in browser memory and the DOM. Do not use InputMask as a security control for sensitive data. For secrets or credentials, use dedicated secure fields plus backend validation, encryption, and storage protections.
