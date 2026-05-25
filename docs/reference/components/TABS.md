# Tabs

**Selector:** `ui-lib-tabs`
**Entry point:** `import { Tabs } from 'ui-lib-custom/tabs'`

---

## Overview

Tabs container that manages selection, focus, and scroll behavior.

## API

### Inputs

| Name                 | Type                       | Default                | Description                                                |
| -------------------- | -------------------------- | ---------------------- | ---------------------------------------------------------- |
| `activation`         | `TabsActivation`           | `'auto'`               | —                                                          |
| `align`              | `TabsAlignment`            | `'start'`              | —                                                          |
| `ariaLabel`          | `string | null`            | `null`                 | —                                                          |
| `closable`           | `boolean`                  | `false`                | —                                                          |
| `defaultIndex`       | `number | null`            | `null`                 | —                                                          |
| `defaultValue`       | `TabsValue | null`         | `null`                 | —                                                          |
| `dir`                | `'ltr' | 'rtl' | 'auto'`   | `'auto'`               | —                                                          |
| `disabled`           | `boolean`                  | `false`                | —                                                          |
| `focusPanelOnSelect` | `boolean`                  | `false`                | /** Moves focus into the active panel on selection.        |
| `iconPosition`       | `'left' | 'top' | 'right'` | `'left'`               | —                                                          |
| `lazy`               | `TabsLazyMode`             | `false`                | /** Global lazy rendering mode; can be overridden per tab. |
| `mode`               | `TabsMode`                 | `'default'`            | /** Controls panel rendering vs navigation-only mode.      |
| `orientation`        | `TabsOrientation`          | `'horizontal'`         | —                                                          |
| `scrollBehavior`     | `TabsScrollBehavior`       | `'auto'`               | /** Scroll handling for overflowing tab lists.             |
| `selectedIndex`      | `number | null`            | `null`                 | —                                                          |
| `selectedValue`      | `TabsValue | null`         | `null`                 | —                                                          |
| `size`               | `TabsSize`                 | `SHARED_DEFAULTS.Size` | —                                                          |
| `variant`            | `TabsVariant | null`       | `null`                 | —                                                          |

### Outputs

| Name                  | Type                                         | Description                                           |
| --------------------- | -------------------------------------------- | ----------------------------------------------------- |
| `navigate`            | `{ value: TabsValue | null; index: number }` | /** Emitted when selection occurs in navigation mode. |
| `selectedIndexChange` | `number`                                     | —                                                     |
| `tabClose`            | `{ value: TabsValue | null; index: number }` | —                                                     |
| `tabFocus`            | `{ value: TabsValue | null; index: number }` | —                                                     |

## Content Projection

_none_

## Theming

| CSS Variable                                        | Default                                                                                                                    |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-tabs-bg`                                   | `transparent`                                                                                                              |
| `--uilib-tabs-bg-resolved`                          | `var(--uilib-tabs-bg, var(--uilib-surface))`                                                                               |
| `--uilib-tabs-border`                               | `var(--uilib-border-dark)`                                                                                                 |
| `--uilib-tabs-border-resolved`                      | `var(--uilib-tabs-border, var(--uilib-border))`                                                                            |
| `--uilib-tabs-border-style-resolved`                | `var(--uilib-tabs-border-style, solid)`                                                                                    |
| `--uilib-tabs-border-width-resolved`                | `var(--uilib-tabs-border-width, 1px)`                                                                                      |
| `--uilib-tabs-color`                                | `var(--uilib-text-dark-primary)`                                                                                           |
| `--uilib-tabs-color-active`                         | `var(--uilib-color-primary-dark)`                                                                                          |
| `--uilib-tabs-color-active-resolved`                | `var( --uilib-tabs-color-active, var(--uilib-color-primary-600) )`                                                         |
| `--uilib-tabs-color-disabled`                       | `var(--uilib-text-dark-disabled)`                                                                                          |
| `--uilib-tabs-color-disabled-resolved`              | `var(--uilib-tabs-color-disabled, var(--uilib-muted))`                                                                     |
| `--uilib-tabs-color-resolved`                       | `var(--uilib-tabs-color, var(--uilib-page-fg, currentColor))`                                                              |
| `--uilib-tabs-gap-resolved`                         | `var(--uilib-tabs-gap, var(--uilib-space-3, 0.5rem))`                                                                      |
| `--uilib-tabs-indicator-color`                      | `var(--uilib-color-primary-dark)`                                                                                          |
| `--uilib-tabs-indicator-color-resolved`             | `var( --uilib-tabs-indicator-color, var(--uilib-color-primary-600) )`                                                      |
| `--uilib-tabs-indicator-height-resolved`            | `var(--uilib-tabs-indicator-height, 2px)`                                                                                  |
| `--uilib-tabs-indicator-offset-resolved`            | `var(--uilib-tabs-indicator-offset, 0px)`                                                                                  |
| `--uilib-tabs-indicator-radius-resolved`            | `var( --uilib-tabs-indicator-radius, var(--uilib-shape-base, 6px) )`                                                       |
| `--uilib-tabs-nav-button-active-bg-resolved`        | `var( --uilib-tabs-nav-button-active-bg, color-mix(in srgb, currentColor 10%, transparent) )`                              |
| `--uilib-tabs-nav-button-bg-resolved`               | `var( --uilib-tabs-nav-button-bg, var(--uilib-surface-secondary, transparent) )`                                           |
| `--uilib-tabs-nav-button-border-resolved`           | `var(--uilib-tabs-nav-button-border, transparent)`                                                                         |
| `--uilib-tabs-nav-button-color-resolved`            | `var( --uilib-tabs-nav-button-color, var(--uilib-tabs-color-resolved) )`                                                   |
| `--uilib-tabs-nav-button-disabled-opacity-resolved` | `var( --uilib-tabs-nav-button-disabled-opacity, 0.4 )`                                                                     |
| `--uilib-tabs-nav-button-gap-resolved`              | `var( --uilib-tabs-nav-button-gap, var(--uilib-space-2, 0.25rem) )`                                                        |
| `--uilib-tabs-nav-button-hover-bg-resolved`         | `var( --uilib-tabs-nav-button-hover-bg, var(--uilib-surface-tertiary, color-mix(in srgb, currentColor 6%, transparent)) )` |
| `--uilib-tabs-nav-button-radius-resolved`           | `var( --uilib-tabs-nav-button-radius, var(--uilib-shape-base, 6px) )`                                                      |
| `--uilib-tabs-nav-button-shadow-resolved`           | `var(--uilib-tabs-nav-button-shadow, none)`                                                                                |
| `--uilib-tabs-nav-button-size-resolved`             | `var(--uilib-tabs-nav-button-size, 2rem)`                                                                                  |
| `--uilib-tabs-padding-base`                         | `0.5rem`                                                                                                                   |
| `--uilib-tabs-padding-resolved`                     | `calc(var(--uilib-tabs-padding-base) * var(--uilib-density, 1))`                                                           |
| `--uilib-tabs-radius-resolved`                      | `var(--uilib-tabs-radius, var(--uilib-shape-base, 6px))`                                                                   |
| `--uilib-tabs-transition`                           | `0ms linear`                                                                                                               |
| `--uilib-tabs-transition-resolved`                  | `var( --uilib-tabs-transition, var(--uilib-transition-fast, 150ms ease) )`                                                 |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                             |
| ---------------------------------------------------------------------------- |
| applies dark theme variables                                                 |
| applies variant classes on the tab list                                      |
| does not select disabled tab                                                 |
| exposes tablist, tab, and tabpanel roles with proper aria linkage            |
| generates unique tab and panel ids for separate tabs instances               |
| handles Enter and Space activation branches from keyboard                    |
| handles Home, End, and ArrowLeft keyboard branches                           |
| moves focus into the active panel when Tab leaves the tablist                |
| moves selection with horizontal arrow keys in automatic activation mode      |
| moves selection with vertical arrow keys in automatic activation mode        |
| renders the tablist, tabs, and tabpanels with correct ARIA relationships     |
| selects the first tab by default                                             |
| should auto-scroll focused tab into view                                     |
| should emit value on tab click                                               |
| should hide arrows when all tabs are visible                                 |
| should highlight the active tab                                              |
| should keep cached content for keep-alive tabs                               |
| should render tablist with two tabs                                          |
| should respect per-tab lazy override                                         |
| should scroll on arrow click                                                 |
| should show arrows when tabs overflow                                        |
| should unmount lazy content when tab deactivates                             |
| shows and hides tab panels correctly                                         |
| skips disabled tabs during arrow-key navigation and marks them aria-disabled |
| supports Home and End navigation across enabled tabs                         |
| supports manual activation until Enter or Space is pressed                   |
| switches tabs on click                                                       |
| switches tabs with ArrowRight key                                            |
| uses aria-selected and roving tabindex on active and inactive tabs           |

## Usage Examples

```html
<!-- Basic tabs -->
<ui-lib-tabs>
  <ui-lib-tab label="Overview">Overview content</ui-lib-tab>
  <ui-lib-tab label="Settings">Settings content</ui-lib-tab>
</ui-lib-tabs>

<!-- Controlled selection with close support -->
<ui-lib-tabs [selectedValue]="activeTab" [closable]="true" (selectedChange)="activeTab = $event.value" (tabClose)="removeTab($event)">
  <ui-lib-tab value="a" label="Tab A">Content A</ui-lib-tab>
  <ui-lib-tab value="b" label="Tab B">Content B</ui-lib-tab>
</ui-lib-tabs>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tabs)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tabs/README.md)

