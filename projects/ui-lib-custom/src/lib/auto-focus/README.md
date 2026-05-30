# AutoFocus

**Selector:** `[uiLibAutoFocus]` — directive
**Package:** `ui-lib-custom/auto-focus`
**Content projection:** no — none

> Opt-in only: focus runs only when you explicitly add `uiLibAutoFocus` to an element.
> Focus is deferred with `requestAnimationFrame` and runs once in `ngAfterViewInit`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `disabled` | `boolean` | `false` | Set to `true` to skip autofocus |
| `selector` | `string \| null` | `null` | Optional child selector. When set, the matching child is focused instead of the host. Missing matches do nothing; invalid selectors warn in DEV mode and fall back to the host |
| `delay` | `number` | `0` | Additional delay in milliseconds before focus is applied. Use when the host is inside an animated container (modal, drawer) that needs time to finish opening. When `0`, focus is deferred one `requestAnimationFrame` tick. When positive, a `setTimeout` is used and cleared automatically on destroy. |

## Outputs

_none_

## Usage

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

## Accessibility notes

- Auto-focus can be disruptive; use it sparingly and only when it improves keyboard flow (for example: the first field in a modal or a short inline form).
- Existing meaningful focus wins. If another connected, programmatically focusable element is already focused, `uiLibAutoFocus` yields instead of stealing focus. This lets dialog/focus-trap logic remain the source of truth.
- If the target element is the current active element, or the active element is already inside the target, no second focus call is made.
- Non-native hosts such as `<div>` need `tabindex="-1"` if you want them to accept programmatic focus. In DEV mode, the directive warns when the resolved target is not programmatically focusable.
- If `selector` is invalid, the directive logs a DEV-mode warning and falls back to the host element. If the selector is valid but no child matches, no focus is applied.
- Consider disabling auto-focus in reduced-motion/screen-reader-sensitive flows:

```html
<input uiLibAutoFocus [disabled]="prefersReducedMotion()" />
```

## Timing notes

- The directive intentionally uses a single `requestAnimationFrame` (default, `delay=0`) so focus waits until the next animation frame and does not race the initial mount/animation work.
- `afterNextRender` is a good fit for components that own their render lifecycle, but this utility is a directive and only needs one browser-frame deferral after `ngAfterViewInit`.
- When `delay > 0`, a `setTimeout` is used instead of rAF. The pending timer is automatically cancelled via `DestroyRef.onDestroy` if the directive is torn down before it fires.
- Use `delay` when the host is inside an animated container (modal, drawer, bottom-sheet) whose opening animation changes the scroll position — focusing before the animation settles can cause the browser to scroll the element into view prematurely.

```html
<!-- Focus after a 300 ms modal-open animation -->
<input uiLibAutoFocus [delay]="300" />

<!-- Focus immediately (default — one rAF tick) -->
<input uiLibAutoFocus />

<!-- Conditionally disable autofocus -->
<input uiLibAutoFocus [disabled]="isMobileViewport()" />
```

## CSS Custom Properties

None — `AutoFocus` is a behaviour-only directive and applies no styles.
