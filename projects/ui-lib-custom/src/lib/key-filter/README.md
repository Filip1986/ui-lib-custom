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
| `hintText` | `string \| null` | `null` | Accessible format hint text linked through `aria-describedby` |
| `pattern` | `KeyFilterPreset \| null` | `null` | Optional preset alias; ignored when `regex` is also set |
| `regex` | `RegExp \| null` | `null` | Optional custom regex alias with precedence over `pattern` |

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
<input [uilibKeyFilter]="'alpha'" [hintText]="'Letters only'" />
<input [pattern]="'pint'" [regex]="/[0-9]/" />
```

## CSS Custom Properties

_None — `KeyFilter` is a directive with no component styles. It manipulates input event behaviour only; all visual formatting is handled by the host `<input>` or `<textarea>` and the consuming application's CSS._

> The visually-hidden hint element inserted by `hintText` uses hardcoded clip-pattern styles (not `--uilib-*` tokens) to ensure the element is invisible across all contexts without any cascade dependency.

## Accessibility guidance

- Always provide `hintText` for strict filters (for example, `"Numbers only"` or `"Hex characters only"`).
- The directive creates a hint element next to the host and links it with `aria-describedby`.
- When pasted text is filtered, the directive announces:
  `"Characters not matching the allowed pattern were removed."`
