# Speed Dial

**Selector:** `ui-lib-speed-dial`
**Entry point:** `import { SpeedDial } from 'ui-lib-custom/speed-dial'`

---

## Overview

SpeedDial scaffold component with public API signals and projection slots.

## API

### Inputs

| Name                 | Type                       | Default    | Description |
| -------------------- | -------------------------- | ---------- | ----------- | --- |
| `ariaLabel`          | `string                    | null`      | `null`      | —   |
| `ariaLabelledBy`     | `string                    | null`      | `null`      | —   |
| `buttonAriaLabel`    | `string                    | null`      | `null`      | —   |
| `direction`          | `SpeedDialDirection`       | `'up'`     | —           |
| `disabled`           | `boolean`                  | `false`    | —           |
| `hideIcon`           | `string                    | null`      | `null`      | —   |
| `hideOnClickOutside` | `boolean`                  | `true`     | —           |
| `mask`               | `boolean`                  | `false`    | —           |
| `model`              | `readonly SpeedDialItem[]` | `[]`       | —           |
| `radius`             | `number`                   | `0`        | —           |
| `rotateAnimation`    | `boolean`                  | `true`     | —           |
| `showIcon`           | `string`                   | `'plus'`   | —           |
| `size`               | `SpeedDialSize`            | `'md'`     | —           |
| `styleClass`         | `string                    | null`      | `null`      | —   |
| `tabindex`           | `number`                   | `0`        | —           |
| `transitionDelay`    | `number`                   | `30`       | —           |
| `type`               | `SpeedDialType`            | `'linear'` | —           |
| `variant`            | `SpeedDialVariant          | null`      | `null`      | —   |

### Models (two-way bindable)

| Name      | Type      | Default | Description |
| --------- | --------- | ------- | ----------- |
| `visible` | `boolean` | `false` | —           |

### Outputs

| Name          | Type                          | Description                                                                                                                                                                                                                                                          |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonBlur`  | `FocusEvent`                  | Emits when the trigger button loses focus.                                                                                                                                                                                                                           |
| `buttonClick` | `SpeedDialClickEvent`         | Emits when the trigger button is activated by click or keyboard.                                                                                                                                                                                                     |
| `buttonFocus` | `FocusEvent`                  | Emits when the trigger button gains focus.                                                                                                                                                                                                                           |
| `hide`        | `SpeedDialHideEvent`          | —                                                                                                                                                                                                                                                                    |
| `itemCommand` | `SpeedDialItemCommandEvent`   | —                                                                                                                                                                                                                                                                    |
| `panelChange` | `SpeedDialVisibleChangeEvent` | Emits whenever the panel opens or closes, carrying the native event and new visibility state. Named `panelChange` (not `visibleChange`) to avoid shadowing the two-way-binding event that `model<boolean>()` for `visible` generates internally under the same name. |
| `show`        | `SpeedDialShowEvent`          | —                                                                                                                                                                                                                                                                    |

## Content Projection

_none_

## Theming

| CSS Variable                             | Default                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `--uilib-speed-dial-button-bg`           | `var(--uilib-color-primary-600, #1e88e5)`                                                                             |
| `--uilib-speed-dial-button-color`        | `var(--uilib-color-neutral-50, #fafafa)`                                                                              |
| `--uilib-speed-dial-button-shadow`       | `var(--uilib-shadow-lg, none)`                                                                                        |
| `--uilib-speed-dial-button-size`         | `var(--uilib-speed-dial-size-button-md, 3.25rem)`                                                                     |
| `--uilib-speed-dial-focus-ring`          | `0 0 0 var(--uilib-border-width-2, 2px) color-mix(in srgb, var(--uilib-color-primary-500, #2196f3) 30%, transparent)` |
| `--uilib-speed-dial-gap`                 | `var(--uilib-space-2, 0.5rem)`                                                                                        |
| `--uilib-speed-dial-item-bg`             | `var(--uilib-color-primary-600, #1e88e5)`                                                                             |
| `--uilib-speed-dial-item-color`          | `var(--uilib-color-neutral-50, #fafafa)`                                                                              |
| `--uilib-speed-dial-item-shadow`         | `var(--uilib-shadow-md, none)`                                                                                        |
| `--uilib-speed-dial-item-size`           | `var(--uilib-speed-dial-size-item-md, 2.75rem)`                                                                       |
| `--uilib-speed-dial-list-z`              | `var(--uilib-z-overlay, 1060)`                                                                                        |
| `--uilib-speed-dial-mask-bg`             | `color-mix( in srgb, var(--uilib-overlay-backdrop-bg, var(--uilib-color-neutral-900, #212121)) 50%, transparent )`    |
| `--uilib-speed-dial-mask-z`              | `var(--uilib-z-backdrop, 1040)`                                                                                       |
| `--uilib-speed-dial-radius`              | `var(--uilib-radius-full, 9999px)`                                                                                    |
| `--uilib-speed-dial-rotate-open`         | `45deg`                                                                                                               |
| `--uilib-speed-dial-transition-duration` | `var(--uilib-transition-md, 200ms)`                                                                                   |
| `--uilib-speed-dial-transition-easing`   | `var(--uilib-transition-ease-out, ease-out)`                                                                          |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/

### Keyboard Interactions

| Test description                                                                    |
| ----------------------------------------------------------------------------------- |
| <li> wrappers have role=                                                            |
| ArrowDown on an action moves focus to the next action (direction=down)              |
| ArrowDown on trigger opens the menu and focuses the first action                    |
| ArrowUp on an action moves focus to the previous action (direction=down)            |
| ArrowUp on trigger opens the menu and focuses the first action                      |
| Escape on an action closes the menu and restores focus to the trigger               |
| action list has role=                                                               |
| applies each variant host class                                                     |
| button aria label prefers buttonAriaLabel over ariaLabel                            |
| covers guard paths for show/hide/toggle/onItemClick/onDocumentClick/focusItem       |
| covers move-focus guards for empty and disabled item collections                    |
| covers right-direction and fallback-direction arrow open rules                      |
| disabled action item gets aria-disabled=                                            |
| document Escape closes the menu and restores focus to the trigger                   |
| each action button has an aria-label sourced from item.label                        |
| each action button has role=                                                        |
| handles document click and escape host-listener paths with DOM events               |
| handles trigger Escape keydown path only when menu is visible                       |
| has no detectable violations for the bootstrap variant                              |
| has no detectable violations for the minimal variant                                |
| has no detectable violations in the default closed state                            |
| has no detectable violations with the menu open                                     |
| item ArrowDown/ArrowUp move focus and wrap                                          |
| item Enter and Space invoke command                                                 |
| item Escape closes and returns focus to trigger                                     |
| item Tab closes and does not prevent default                                        |
| item ignores arrow keys that are not valid for current axis                         |
| onDocumentEscape ignores non-keyboard events and ignores escape when already closed |
| renders items and sets aria-expanded true when visible is true                      |
| returns focus to trigger when hidden while focus is in menu list                    |
| trigger Arrow keys move focus when already open                                     |
| trigger Arrow keys respect direction when opening                                   |
| trigger ArrowDown opens and focuses first item                                      |
| trigger Tab closes and does not prevent default                                     |
| trigger has aria-controls pointing to the action list id                            |
| trigger has aria-expanded=                                                          |
| trigger has aria-haspopup=                                                          |
| trigger keyboard Enter and Space toggle visibility                                  |
| trigger keyboard Escape closes when open                                            |
| trigger/list/items expose expected ARIA attributes                                  |

## Usage Examples

```html
<!-- basic vertical speed dial -->
<ui-lib-speed-dial [model]="actions" [(visible)]="isOpen" />

<!-- circular layout with mask -->
<ui-lib-speed-dial [model]="actions" type="circle" [mask]="true" (onItemCommand)="run($event)" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#speed-dial)
- [Demo page](/components/speed-dial)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/speed-dial/README.md)
