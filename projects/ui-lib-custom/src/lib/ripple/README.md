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

## How it works

1. On `click`, a `<span class="ui-lib-ripple-wave">` is appended inside the host element.
2. The span is sized to cover the full element (`max(width, height)`) and centred on the pointer position.
3. A CSS keyframe animation (`ui-lib-ripple-expand`) scales the span from `0` to `3×` while fading to `opacity: 0`.
4. Once `animationend` fires, the span is removed from the DOM.

The host element automatically receives `position: relative` and `overflow: hidden` via the `ui-lib-ripple` class so the wave is clipped inside the element bounds.

## CSS variables

| Variable                  | Default                          | Description                          |
| ------------------------- | -------------------------------- | ------------------------------------ |
| `--uilib-ripple-color`    | `rgba(255, 255, 255, 0.35)`      | Wave background colour.              |
| `--uilib-ripple-duration` | `600ms`                          | Animation duration.                  |
| `--uilib-ripple-easing`   | `cubic-bezier(0.4, 0, 0.2, 1)`  | Animation timing function.           |

## Accessibility

- The directive does not alter the host's role, tab-stop, or keyboard behaviour.
- The wave `<span>` is `pointer-events: none` and invisible to screen readers (`aria-hidden` is not needed as it contains no text).
- For keyboard-activated controls (e.g. `<button>`) the ripple is triggered via the click event which fires on `Enter`/`Space` by default — no extra wiring required.

