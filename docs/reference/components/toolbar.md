# Toolbar

**Selector:** `ui-lib-toolbar`
**Entry point:** `import { Toolbar } from 'ui-lib-custom/toolbar'`

---

## Overview

Toolbar — a horizontal container with start, center, and end content projection slots. Use the `uiToolbarStart`, `uiToolbarCenter`, and `uiToolbarEnd` attribute selectors to project content into the corresponding slot. Keyboard interaction follows the WAI-ARIA Toolbar Pattern: - `ArrowRight` / `ArrowDown` — focus next item - `ArrowLeft` / `ArrowUp` — focus previous item - `Home` — focus first item - `End` — focus last item - `Tab` — exit the toolbar

## API

### Inputs

| Name         | Type                    | Default | Description                                                                            |
| ------------ | ----------------------- | ------- | -------------------------------------------------------------------------------------- |
| `ariaLabel`  | `string | null`         | `null`  | Accessible label for the toolbar (recommended when multiple toolbars are on one page). |
| `size`       | `ToolbarSize`           | `'md'`  | Size modifier for the toolbar. Defaults to `'md'`.                                     |
| `styleClass` | `string | null`         | `null`  | Additional CSS classes to attach to the host element.                                  |
| `variant`    | `ToolbarVariant | null` | `null`  | Visual variant — inherits from ThemeConfigService when not set.                        |

### Outputs

_none_

## Content Projection

| Selector            | Notes |
| ------------------- | ----- |
| `[uiToolbarCenter]` | —     |
| `[uiToolbarEnd]`    | —     |
| `[uiToolbarStart]`  | —     |

## Theming

| CSS Variable                    | Default                             |
| ------------------------------- | ----------------------------------- |
| `--uilib-toolbar-background`    | `var(--uilib-surface-0, #ffffff)`   |
| `--uilib-toolbar-border-color`  | `var(--uilib-surface-200, #e5e7eb)` |
| `--uilib-toolbar-border-radius` | `var(--uilib-radius-md, 0.375rem)`  |
| `--uilib-toolbar-border-width`  | `1px`                               |
| `--uilib-toolbar-color`         | `var(--uilib-color-text, #374151)`  |
| `--uilib-toolbar-font-family`   | `var(--uilib-font-ui, inherit)`     |
| `--uilib-toolbar-gap`           | `0.5rem`                            |
| `--uilib-toolbar-min-height`    | `3rem`                              |
| `--uilib-toolbar-padding-x`     | `1rem`                              |
| `--uilib-toolbar-padding-y`     | `0.5rem`                            |
| `--uilib-toolbar-shadow`        | `none`                              |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                   |
| ------------------------------------------------------------------ |
| ArrowDown moves focus to the next button (vertical axis alias)     |
| ArrowLeft moves focus backward                                     |
| ArrowLeft moves focus to the previous button                       |
| ArrowLeft wraps from first to last button                          |
| ArrowLeft wraps to last from first                                 |
| ArrowRight moves focus forward                                     |
| ArrowRight moves focus to the next button                          |
| ArrowRight wraps from last to first button                         |
| ArrowRight wraps to first from last                                |
| ArrowUp moves focus to the previous button (vertical axis alias)   |
| End focuses the last button                                        |
| End moves focus to the last button                                 |
| Home focuses the first button                                      |
| Home moves focus to the first button                               |
| applies aria-label when provided                                   |
| decorative icons inside buttons have aria-hidden=                  |
| default toolbar with aria-label has no accessibility violations    |
| does not apply aria-label when not provided                        |
| first button has tabindex=                                         |
| focusin on a non-active button updates the roving tabindex         |
| host has role=                                                     |
| icon-only buttons have descriptive aria-label                      |
| icon-only toolbar with aria-labels has no accessibility violations |
| keyboard navigation updates tabindex on active item                |
| navigation updates tabindex on moved-to item                       |
| should apply aria-label when provided                              |
| should apply variant class when provided                           |
| should have role=                                                  |
| should not have aria-label by default                              |
| should project center content into center group                    |
| should render center group wrapper                                 |
| subsequent buttons have tabindex=                                  |
| toolbar without aria-label has no accessibility violations         |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#toolbar)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/toolbar/README.md)

