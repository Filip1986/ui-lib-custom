# KeyFilter

**Selector:** `[uilibKeyFilter]` — directive
**Package:** `ui-lib-custom/key-filter`
**Content projection:** no — none

> Filtering is applied on `keydown`, `paste`, and `drop` events. Modifier-key combos (`Ctrl+A`, `Cmd+C`, etc.) and non-printable keys (`Enter`, `Backspace`, etc.) are always allowed through regardless of the active pattern.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `uilibKeyFilter` | `KeyFilterPreset \| RegExp` | `'alphanum'` | Built-in preset name or a custom `RegExp` tested per character |
| `keyFilterBypass` | `boolean` | `false` | When `true`, all filtering is suspended |

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
