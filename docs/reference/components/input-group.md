# Input Group

**Selector:** `ui-lib-input-group`
**Entry point:** `import { InputGroup } from 'ui-lib-custom/input-group'`

---

## Overview

Wrapper container that composes inputs with optional addon elements.

## API

### Inputs

_none_

### Outputs

_none_

## Content Projection

| Selector                              | Notes |
| ------------------------------------- | ----- |
| `:not([addonLeft]):not([addonRight])` | —     |
| `[addonLeft]`                         | —     |
| `[addonRight]`                        | —     |

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                          |
| ----------------------------------------- |
| decorative text addon is aria-hidden      |
| decorative text addon is not focusable    |
| default composition has no axe violations |
| icon-only button addon has an aria-label  |

## Usage Examples

```html
<!-- decorative text addon (not focusable, hidden from a11y tree) -->
<label for="username-input">Username</label>
<uilib-input-group>
  <uilib-input-group-addon addonLeft>
    <span aria-hidden="true">@</span>
  </uilib-input-group-addon>
  <input id="username-input" type="text" placeholder="Username" />
</uilib-input-group>

<!-- icon-only button addon must have an aria-label -->
<label for="search-input">Search</label>
<uilib-input-group>
  <input id="search-input" type="text" placeholder="Search term" />
  <uilib-input-group-addon addonRight>
    <button type="button" aria-label="Run search">
      <span aria-hidden="true">🔍</span>
    </button>
  </uilib-input-group-addon>
</uilib-input-group>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#input-group)
- [Demo page](/components/input-group)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/input-group/README.md)

