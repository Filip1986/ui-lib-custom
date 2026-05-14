# KeyFilter

**Selector:** `[uilibKeyFilter]` — directive
**Package:** `ui-lib-custom/key-filter`
**Content projection:** no — none

> Filtering is applied on `keydown`, `paste`, and `drop` events. Modifier-key combos (`Ctrl+A`, `Cmd+C`, etc.) and non-printable keys (`Enter`, `Backspace`, etc.) are always allowed through regardless of the active pattern.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `uilibKeyFilter` | `KeyFilterPreset \| RegExp` | `'alphanum'` | Built-in preset name or a custom `RegExp` tested per character |
| `pattern` | `KeyFilterPreset \| null` | `null` | Optional preset alias. Use for template readability when passing a preset explicitly |
| `regex` | `RegExp \| string \| null` | `null` | Optional custom regex alias. If both `pattern` and `regex` are set, `regex` takes precedence and a DEV_MODE warning is logged |
| `allowedChars` | `string \| null` | `null` | Optional literal whitelist. Each character in the string is treated as allowed input |
| `keyFilterBypass` | `boolean` | `false` | When `true`, all filtering is suspended |
| `hintText` | `string \| null` | `null` | Accessible format guidance injected next to the target input and linked via `aria-describedby` |

## Built-in Presets (`KeyFilterPreset`)

| Preset | Allowed characters |
|--------|--------------------|
| `'pint'` | Positive integers (digits only) |
| `'int'` | Integers (digits and `-`) |
| `'pnum'` | Positive numbers (digits and `.`) |
| `'num'` | Numbers (digits, `-`, `.`) |
| `'hex'` | Hexadecimal (0-9, a-f, A-F) |
| `'alpha'` | Letters only |
| `'alphanum'` | Letters and digits |
| `'money'` | Digits, `-`, `.`, `,` |
| `'email'` | RFC 5321 local-part + domain characters |

## Outputs

_none_

## Usage

```html
<input [uilibKeyFilter]="'pint'" />
<input [uilibKeyFilter]="customPattern" [keyFilterBypass]="bypassFilter" />
```

## Accessibility Guidance

When invalid keystrokes are blocked, always provide format guidance to assistive technology users:

```html
<label for="account-id">Account ID</label>
<input id="account-id" [uilibKeyFilter]="'pint'" hintText="Numbers only" />
```

- `hintText` creates a linked helper description via `aria-describedby`.
- On paste filtering, the directive announces:
  `Characters not matching the allowed pattern were removed.`

## Preset vs custom regex examples

```html
<!-- Preset alias -->
<input [pattern]="'alpha'" hintText="Letters only" />

<!-- Custom regex alias -->
<input [regex]="'[A-Fa-f0-9]'" hintText="Hex characters only" />

<!-- Literal whitelist -->
<input allowedChars="ABC123" hintText="Allowed: A, B, C, 1, 2, 3" />
```
