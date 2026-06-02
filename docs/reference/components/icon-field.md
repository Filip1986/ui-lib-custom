# Icon Field

**Selector:** `ui-lib-icon-field`
**Entry point:** `import { IconField } from 'ui-lib-custom/icon-field'`

---

## Overview

Wrapper that positions a leading or trailing input icon around projected controls.

## API

### Inputs

| Name           | Type           | Default                            | Description |
| -------------- | -------------- | ---------------------------------- | ----------- |
| `iconPosition` | `IconPosition` | `ICON_FIELD_DEFAULTS.iconPosition` | —           |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                                 | Default                                                      |
| -------------------------------------------- | ------------------------------------------------------------ |
| `--uilib-icon-field-icon-size`               | `0.875rem`                                                   |
| `--uilib-icon-field-input-padding-with-icon` | `var( --uilib-icon-field-input-padding-with-icon-sm, 2rem )` |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                         |
| -------------------------------------------------------- |
| allows informative icons to opt out of aria-hidden       |
| defaults decorative icons to aria-hidden and tabindex -1 |
| keeps decorative input icons out of the tab order        |
| marks input icons as aria-hidden by default              |
| uses role img when an informative icon label is provided |

## Usage Examples

```html
<!-- leading search icon -->
<uilib-icon-field>
  <uilib-input-icon styleClass="icon-search" />
  <input type="text" placeholder="Search" />
</uilib-icon-field>

<!-- trailing icon on the right -->
<uilib-icon-field iconPosition="right">
  <input type="text" placeholder="Email" />
  <uilib-input-icon styleClass="icon-envelope" />
</uilib-icon-field>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#icon-field)
- [Demo page](/components/icon-field)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/icon-field/README.md)
