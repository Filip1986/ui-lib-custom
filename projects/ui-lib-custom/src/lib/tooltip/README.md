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

| Input             | Type                                        | Default     | Description                                                                                                          |
|-------------------|---------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
| `uiLibTooltip`    | `string`                                    | `''`        | The tooltip label text. Empty string suppresses the tooltip.                                                         |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'`    | `'top'`     | Preferred position. Flips automatically when space is lacking.                                                       |
| `tooltipEvent`    | `'hover' \| 'focus' \| 'both'`              | `'hover'`   | Which host events trigger the tooltip. **`'hover'` (default) also binds `focus`/`blur` for WCAG 1.4.13 compliance.** |
| `showDelay`       | `number`                                    | `0`         | Milliseconds to wait before showing.                                                                                 |
| `hideDelay`       | `number`                                    | `0`         | Milliseconds to wait before hiding.                                                                                  |
| `tooltipDisabled` | `boolean`                                   | `false`     | Prevent the tooltip from showing.                                                                                    |
| `tooltipVariant`  | `TooltipVariant \| null`                    | `null`      | Design variant. Falls back to `ThemeConfigService` when `null`.                                                      |

## Types

```ts
type TooltipVariant  = 'material' | 'bootstrap' | 'minimal';
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipEvent    = 'hover' | 'focus' | 'both';
```

## Accessibility

### ARIA features

| Feature                | Detail                                                                                                                   |
|------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `role="tooltip"`       | Applied to the dynamically created tooltip element appended to `document.body`.                                          |
| `aria-describedby`     | Set on the host element to `tooltipId` while the tooltip is visible. Removed when the tooltip hides.                     |
| `tooltipId`            | Public `string` property — the `id` of the tooltip element. Use for custom `aria-describedby` wiring or test assertions. |
| WCAG 1.4.13 compliance | `tooltipEvent="hover"` (default) also binds `focus`/`blur` — keyboard users see the same tooltip as mouse users.         |
| `tooltipEvent="focus"` | Binds only `focus`/`blur` — tooltip appears on keyboard navigation, not on mouse hover.                                  |
| `tooltipEvent="both"`  | Binds both hover and focus explicitly (functionally equivalent to `hover` post-fix, but self-documenting intent).        |
| Escape key             | Always active — dismisses the tooltip regardless of which event triggered it.                                            |
| `pointer-events: none` | Tooltip is fully non-interactive — never blocks clicks, hovers, or focus on underlying content.                          |
| Arrow                  | `aria-hidden="true"` — decorative only, ignored by screen readers.                                                       |
| Reduced motion         | `@media (prefers-reduced-motion: reduce)` sets `--uilib-tooltip-enter-duration: 0ms`.                                    |
| Lazy DOM               | Tooltip element created only on first show, removed from `document.body` after the hide transition completes.            |
| SSR safety             | `DOCUMENT` is injected via Angular DI — no direct `document` or `window` global access.                                  |

### Keyboard navigation

| Key                    | Behaviour                                                        |
|------------------------|------------------------------------------------------------------|
| Tab (to host)          | Shows the tooltip (all `tooltipEvent` modes)                     |
| Tab (away) / Shift+Tab | Hides the tooltip                                                |
| Escape                 | Dismisses the visible tooltip and cancels any pending show timer |

### Consumer guidance — choosing `tooltipEvent`

```html
<!-- Default: hover + focus (WCAG 1.4.13 compliant) -->
<button uiLibTooltip="Save the document">Save</button>

<!-- Focus-only: good for form fields where hover is redundant -->
<input uiLibTooltip="Enter your email address" tooltipEvent="focus" />

<!-- Both: self-documenting — explicitly declares hover + focus intent -->
<span uiLibTooltip="Right side info" tooltipPosition="right" tooltipEvent="both">Info</span>
```

### Using `tooltipId` for custom wiring

The `tooltipId` property is public and equals the `id` applied to the tooltip element in the DOM. Use it when you need to reference the tooltip from another element or in test assertions:

```typescript
// In a test:
const directive = debugEl.injector.get(Tooltip);
const tooltipEl = document.body.querySelector(`#${directive.tooltipId}`);
```

## CSS custom properties

Override these on `:root` or a scoped container:

| Property                          | Default                        | Description                    |
|-----------------------------------|--------------------------------|--------------------------------|
| `--uilib-tooltip-bg`              | `#1f2937`                      | Background colour              |
| `--uilib-tooltip-color`           | `#ffffff`                      | Text colour                    |
| `--uilib-tooltip-border-radius`   | `var(--uilib-radius-sm, 4px)`  | Corner radius                  |
| `--uilib-tooltip-padding-x`       | `0.625rem`                     | Horizontal padding             |
| `--uilib-tooltip-padding-y`       | `0.375rem`                     | Vertical padding               |
| `--uilib-tooltip-font-size`       | `0.8125rem`                    | Font size                      |
| `--uilib-tooltip-max-width`       | `14rem`                        | Maximum width                  |
| `--uilib-tooltip-arrow-size`      | `6px`                          | Arrow triangle size            |
| `--uilib-tooltip-z-index`         | `var(--uilib-z-tooltip,1060)`  | Stack order                    |
| `--uilib-tooltip-shadow`          | `0 2px 8px …`                  | Box shadow                     |
| `--uilib-tooltip-enter-duration`  | `140ms`                        | Transition duration            |
