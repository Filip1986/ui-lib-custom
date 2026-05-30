# Key Filter

**Selector:** `ui-lib-key-filter`
**Entry point:** `import { KeyFilter } from 'ui-lib-custom/key-filter'`

---

## Overview

Filtering is applied on `keydown`, `paste`, and `drop` events. Modifier-key combos (`Ctrl+A`, `Cmd+C`, etc.) and non-printable keys (`Enter`, `Backspace`, etc.) are always allowed through regardless of the active pattern.

## API

### Inputs

_none_

### Outputs

_none_

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                 |
| ---------------------------------------------------------------- |
| announces removed characters on filtered paste                   |
| axe: has no accessibility violations with label and hint         |
| does not announce when pasted text already matches the pattern   |
| does not strip or announce pasted text in bypass mode            |
| links the host input to the generated hint with aria-describedby |
| preserves existing aria-describedby ids when adding hint text    |

## Usage Examples

```html
<input [uilibKeyFilter]="'pint'" />
<input [uilibKeyFilter]="customPattern" [keyFilterBypass]="bypassFilter" />
<input [uilibKeyFilter]="'alpha'" [hintText]="'Letters only'" />
<input [pattern]="'pint'" [regex]="/[0-9]/" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#key-filter)
- [Demo page](/components/key-filter)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/key-filter/README.md)

