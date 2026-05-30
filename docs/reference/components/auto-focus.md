# Auto Focus

**Selector:** `ui-lib-auto-focus`
**Entry point:** `import { AutoFocus } from 'ui-lib-custom/auto-focus'`

---

## Overview

Opt-in only: focus runs only when you explicitly add `uiLibAutoFocus` to an element.

## API

### Inputs

| Name       | Type            | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delay`    | `number`        | `0`     | Additional delay in milliseconds before the focus is applied. Useful when the host element is inside an animated container (modal, drawer, dropdown) that needs time to complete its opening animation before the browser will scroll the focused element into view correctly. When `0` (default) focus is deferred by one `requestAnimationFrame` tick — sufficient for most static-mount scenarios. When positive, a `setTimeout` is used instead and the pending timer is cleared if the directive is destroyed before it fires. |
| `disabled` | `boolean`       | `false` | When `true`, autofocus is skipped.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `selector` | `string | null` | `null`  | Optional CSS selector used to focus a child element instead of the host.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### Outputs

_none_

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                      |
| ------------------------------------------------------------------------------------- |
| adds ui-lib-autofocus class on the host element                                       |
| does not focus when disabled is true                                                  |
| does not focus when selector match is missing                                         |
| does not re-focus when a descendant inside the target already has focus               |
| does not re-focus when the target is already active before the frame runs             |
| does not steal focus from an already focused external element                         |
| focuses a selector-matched child element                                              |
| focuses only once and does not re-run on subsequent re-renders                        |
| focuses the host element on mount                                                     |
| passes axe checks in default state                                                    |
| passes axe checks in disabled state                                                   |
| should NOT call focus when disabled input changes from false to true before view init |
| should NOT call focus when disabled is true                                           |
| should add the ui-lib-autofocus host class to the element                             |
| should call focus on the host element after view init                                 |
| should call focus when disabled input is explicitly false                             |
| should focus a matching child when selector is provided                               |
| should focus only once and not on subsequent host re-renders                          |
| should not throw when applied to a non-focusable element and should log a dev warning |
| skips autofocus entirely when the directive is instantiated on the server platform    |
| uses requestAnimationFrame for deferred focus                                         |
| warns when the resolved host is not programmatically focusable                        |

## Usage Examples

```html
<input uiLibAutoFocus />
<input uiLibAutoFocus [disabled]="disableAutoFocus" />
```

```html
<div uiLibAutoFocus selector="[data-initial-focus]">
  <button data-initial-focus type="button">Primary action</button>
</div>
```

```html
<!-- Non-focusable hosts need tabindex="-1" for programmatic focus -->
<div uiLibAutoFocus tabindex="-1">Focusable container</div>

<!-- Native form controls are already programmatically focusable -->
<input uiLibAutoFocus />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#auto-focus)
- [Demo page](/components/auto-focus)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/auto-focus/README.md)

