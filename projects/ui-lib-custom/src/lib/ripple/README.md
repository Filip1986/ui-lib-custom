# Ripple

The `Ripple` directive adds a Material-style circular wave effect to any element on click. It is a pure behaviour directive — no component wrapper is needed.

## Package path

```ts
import { Ripple } from 'ui-lib-custom/ripple';
```

## Selector

```html
[uiLibRipple]
```

## Usage

```html
<!-- Basic usage — white semi-transparent ripple -->
<button uiLibRipple>Click me</button>

<!-- Dark ripple for light surfaces -->
<div uiLibRipple [rippleColor]="'rgba(0, 0, 0, 0.12)'">Card surface</div>

<!-- Custom duration -->
<button uiLibRipple rippleDuration="400ms">Fast ripple</button>

<!-- Disable ripple conditionally -->
<button uiLibRipple [disabled]="isLoading">Submit</button>
```

## CSS customisation

Override the global defaults in your stylesheet:

```css
/* Global override */
:root {
  --uilib-ripple-color: rgba(99, 102, 241, 0.35); /* indigo */
  --uilib-ripple-duration: 500ms;
  --uilib-ripple-easing: ease-out;
}

/* Per-element override */
.my-button {
  --uilib-ripple-color: rgba(0, 0, 0, 0.12);
}
```

## Inputs

| Input            | Type      | Default | Description                                                                        |
| ---------------- | --------- | ------- | ---------------------------------------------------------------------------------- |
| `disabled`       | `boolean` | `false` | When `true`, no ripple wave is produced on click.                                  |
| `rippleColor`    | `string`  | `''`    | Inline override for `--uilib-ripple-color`. Any valid CSS colour (e.g. `rgba(...)`). |
| `rippleDuration` | `string`  | `''`    | Inline override for `--uilib-ripple-duration` (e.g. `'400ms'`).                    |

## CSS custom properties

| Variable                  | Default                         | Description                         |
| ------------------------- | ------------------------------- | ------------------------------------ |
| `--uilib-ripple-color`    | `rgba(255, 255, 255, 0.35)`     | Wave background colour.             |
| `--uilib-ripple-duration` | `600ms`                         | Animation duration.                 |
| `--uilib-ripple-easing`   | `cubic-bezier(0.4, 0, 0.2, 1)` | Animation timing function.          |

## ARIA attributes

The Ripple directive is **purely decorative** — it does not alter the host element's ARIA semantics in any way.

| Attribute | Where applied | Value | Notes |
| --------- | ------------- | ----- | ----- |
| *(none)*  | —             | —     | No ARIA attributes are added or modified. |

The wave `<span>` element contains no text and has `pointer-events: none`, so it is transparent to assistive technologies.

## Keyboard interaction

| Key       | Behaviour                                                                 |
| --------- | ------------------------------------------------------------------------- |
| `Enter`   | Fires the native `click` event on `<button>` / `<a>` — ripple responds.  |
| `Space`   | Same as above for `<button>` elements.                                    |

No extra key wiring is needed. The directive listens to `click` events, and browsers naturally fire `click` on `Enter`/`Space` for interactive elements.

## How it works

1. On `click`, a `<span class="ui-lib-ripple-wave">` is appended inside the host element.
2. The span is sized to cover the full element (`max(width, height)`) and centred on the pointer position.
3. A CSS keyframe animation (`ui-lib-ripple-expand`) scales the span from `0` to `3×` while fading to `opacity: 0`.
4. Once `animationend` fires, the span is removed from the DOM.

The host element automatically receives `position: relative` and `overflow: hidden` via the `ui-lib-ripple` class so the wave is clipped inside the element bounds.

## Accessibility

### Decorative only

The Ripple directive is a visual enhancement — it carries no semantic meaning. It does **not** change the host's `role`, tab-stop, keyboard behaviour, or any ARIA attribute.

### `prefers-reduced-motion`

When the user has enabled the **Reduce Motion** accessibility setting, the ripple animation is **completely suppressed** — the wave element is never added to the DOM. This is enforced in two layers:

1. **JavaScript (primary):** `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is checked on every click. If `true`, `spawnWave()` returns immediately — no DOM mutation occurs.
2. **CSS (defence-in-depth):** A `@media (prefers-reduced-motion: reduce)` block sets `animation: none; display: none` on `.ui-lib-ripple-wave`, ensuring no animation can run even if the element were somehow added.

### Screen readers

- The wave `<span>` is `pointer-events: none` and contains no text, so it is invisible to screen readers.
- For keyboard-activated controls (e.g. `<button>`) the ripple is triggered via the `click` event which fires on `Enter`/`Space` by default — no extra wiring required.

### SSR safety

The click listener is only registered in browser environments (`isPlatformBrowser` check in `ngOnInit`). Server-side rendering is fully supported.

