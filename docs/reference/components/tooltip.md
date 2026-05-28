# Tooltip

**Selector:** `ui-lib-tooltip`
**Entry point:** `import { Tooltip } from 'ui-lib-custom/tooltip'`

---

## Overview

An attribute directive that attaches a floating label to any host element. The tooltip is triggered automatically by mouse or keyboard events and positioned with CSS `position: fixed`, so it escapes any `overflow: hidden` ancestor.

## API

### Inputs

| Name              | Type                    | Default   | Description                                                                |
| ----------------- | ----------------------- | --------- | -------------------------------------------------------------------------- |
| `hideDelay`       | `number`                | `0`       | Delay in milliseconds before the tooltip disappears after a hide event.    |
| `showDelay`       | `number`                | `0`       | Delay in milliseconds before the tooltip appears after a trigger event.    |
| `tooltipDisabled` | `boolean`               | `false`   | When `true`, the tooltip is never shown regardless of events.              |
| `tooltipEvent`    | `TooltipEvent`          | `'hover'` | Which events trigger the tooltip. Defaults to `'hover'`.                   |
| `tooltipPosition` | `TooltipPosition`       | `'top'`   | Position of the tooltip relative to the host element. Defaults to `'top'`. |
| `tooltipVariant`  | `TooltipVariant | null` | `null`    | Design variant override. Falls back to `ThemeConfigService` when `null`.   |
| `uiLibTooltip`    | `string`                | `''`      | The tooltip label text. An empty string suppresses the tooltip.            |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                     | Default                        |
| -------------------------------- | ------------------------------ |
| `--uilib-tooltip-arrow-size`     | `6px`                          |
| `--uilib-tooltip-bg`             | `#1f2937`                      |
| `--uilib-tooltip-border-radius`  | `var(--uilib-radius-sm, 4px)`  |
| `--uilib-tooltip-color`          | `#ffffff`                      |
| `--uilib-tooltip-enter-duration` | `140ms`                        |
| `--uilib-tooltip-enter-easing`   | `ease-out`                     |
| `--uilib-tooltip-font-size`      | `0.8125rem`                    |
| `--uilib-tooltip-max-width`      | `14rem`                        |
| `--uilib-tooltip-padding-x`      | `0.625rem`                     |
| `--uilib-tooltip-padding-y`      | `0.375rem`                     |
| `--uilib-tooltip-shadow`         | `0 2px 8px rgb(0 0 0 / 0.2)`   |
| `--uilib-tooltip-z-index`        | `var(--uilib-z-tooltip, 1060)` |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

### Keyboard Interactions

| Test description                                                                  |
| --------------------------------------------------------------------------------- |
| Escape key dismisses visible tooltip                                              |
| Escape when tooltip not visible does not throw                                    |
| aria-describedby is NOT set when tooltipDisabled=true                             |
| aria-describedby is absent before any event                                       |
| aria-describedby is not present on host after directive destroy                   |
| aria-describedby is removed after Escape                                          |
| aria-describedby is removed on blur                                               |
| aria-describedby is removed on mouseleave                                         |
| aria-describedby is set to tooltipId on focus when tooltipEvent=                  |
| aria-describedby is set to tooltipId on keyboard focus (hover mode — WCAG 1.4.13) |
| aria-describedby is set to tooltipId on mouseenter                                |
| aria-describedby is set to tooltipId on mouseenter when tooltipEvent=             |
| aria-describedby on host matches tooltipId when visible                           |
| arrow element has aria-hidden=                                                    |
| passes axe (document.body) when tooltip is visible via keyboard focus             |
| passes axe (document.body) when tooltip is visible via mouseenter                 |
| passes axe (document.body) when tooltipDisabled=true                              |
| passes axe (document.body) — closed state, no tooltip visible                     |
| should add ui-lib-tooltip--bootstrap class when variant is bootstrap              |
| should add ui-lib-tooltip--material class when variant is material                |
| should add ui-lib-tooltip--minimal class when variant is minimal                  |
| should contain an arrow element                                                   |
| should create a tooltip element in document.body on mouseenter                    |
| should have role=                                                                 |
| should hide the tooltip when Escape is pressed                                    |
| should hide tooltip on blur when tooltipEvent is focus                            |
| should remove aria-describedby on mouseleave                                      |
| should set aria-describedby on the host element                                   |
| should show tooltip on focus when tooltipEvent is focus                           |
| tooltip does NOT appear on focus when tooltipDisabled=true                        |
| tooltip does not appear on mouseenter when tooltipDisabled=true                   |
| tooltip element has role=                                                         |
| tooltip shows on focus when tooltipEvent=                                         |
| tooltip shows on keyboard focus when tooltipEvent=                                |

## Usage Examples

```html
<!-- Attribute directive — simplest form -->
<ui-lib-button uiLibTooltip="Save your changes">Save</ui-lib-button>

<!-- Positioning -->
<ui-lib-button uiLibTooltip="Copied!" tooltipPosition="top">Copy</ui-lib-button>
<ui-lib-button uiLibTooltip="Delete" tooltipPosition="bottom" severity="danger">
  Delete
</ui-lib-button>

<!-- Disabled tooltip (hidden when button is disabled) -->
<ui-lib-button
  uiLibTooltip="Approve"
  [tooltipDisabled]="!canApprove"
  [disabled]="!canApprove"
>
  Approve
</ui-lib-button>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tooltip)
- [Demo page](/components/tooltip)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tooltip/README.md)

