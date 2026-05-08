# Tooltip

An attribute directive that attaches a floating label to any host element. The tooltip is triggered automatically by mouse or keyboard events and positioned with CSS `position: fixed`, so it escapes any `overflow: hidden` ancestor.

## Package path

```ts
import { Tooltip } from 'ui-lib-custom/tooltip';
```

## Global styles

The tooltip element is appended to `document.body` and relies on global CSS. Add the following import **once** to your application's global stylesheet:

```scss
@use 'path/to/ui-lib-custom/src/lib/tooltip/tooltip.scss';
```

## Selector

```
[uiLibTooltip]
```

## Basic usage

```html
<button uiLibTooltip="Save the document">Save</button>

<span uiLibTooltip="Tooltip on the right" tooltipPosition="right">Hover me</span>

<input uiLibTooltip="Enter your username" tooltipEvent="focus" />
```

## Inputs

| Input             | Type                                      | Default     | Description                                                     |
|-------------------|-------------------------------------------|-------------|-----------------------------------------------------------------|
| `uiLibTooltip`    | `string`                                  | `''`        | The tooltip label text. Empty string suppresses the tooltip.   |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Preferred position. Flips automatically when space is lacking. |
| `tooltipEvent`    | `'hover' \| 'focus' \| 'both'`           | `'hover'`   | Which host events trigger the tooltip.                          |
| `showDelay`       | `number`                                  | `0`         | Milliseconds to wait before showing.                           |
| `hideDelay`       | `number`                                  | `0`         | Milliseconds to wait before hiding.                            |
| `tooltipDisabled` | `boolean`                                 | `false`     | Prevent the tooltip from showing.                              |
| `tooltipVariant`  | `TooltipVariant \| null`                  | `null`      | Design variant. Falls back to `ThemeConfigService` when `null`.|

## Types

```ts
type TooltipVariant  = 'material' | 'bootstrap' | 'minimal';
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipEvent    = 'hover' | 'focus' | 'both';
```

## Accessibility

- The directive sets `aria-describedby` on the host element pointing to the tooltip element's `id` while the tooltip is visible, and removes it when hidden.
- The tooltip element has `role="tooltip"`.
- Pressing **Escape** dismisses a visible tooltip.
- The tooltip has `pointer-events: none` so it does not block interaction.

## CSS custom properties

Override these on `:root` or a scoped container:

| Property                          | Default                      | Description                    |
|-----------------------------------|------------------------------|--------------------------------|
| `--uilib-tooltip-bg`              | `#1f2937`                    | Background colour              |
| `--uilib-tooltip-color`           | `#ffffff`                    | Text colour                    |
| `--uilib-tooltip-border-radius`   | `var(--uilib-radius-sm, 4px)`| Corner radius                  |
| `--uilib-tooltip-padding-x`       | `0.625rem`                   | Horizontal padding             |
| `--uilib-tooltip-padding-y`       | `0.375rem`                   | Vertical padding               |
| `--uilib-tooltip-font-size`       | `0.8125rem`                  | Font size                      |
| `--uilib-tooltip-max-width`       | `14rem`                      | Maximum width                  |
| `--uilib-tooltip-arrow-size`      | `6px`                        | Arrow triangle size            |
| `--uilib-tooltip-z-index`         | `var(--uilib-z-tooltip,1060)`| Stack order                    |
| `--uilib-tooltip-shadow`          | `0 2px 8px …`               | Box shadow                     |
| `--uilib-tooltip-enter-duration`  | `140ms`                      | Transition duration            |
