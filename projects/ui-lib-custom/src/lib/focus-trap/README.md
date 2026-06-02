# FocusTrap

An Angular directive that constrains keyboard focus within a host element. Tab and Shift+Tab cycle only among the focusable descendants of the host, preventing focus from escaping — essential for accessible modals, dialogs, and side panels.

The underlying `FocusTrap` class from `ui-lib-custom/core` handles the low-level keyboard interception and focus restoration. This directive is the Angular-idiomatic wrapper around it.

## Package path

```ts
import { FocusTrapDirective } from 'ui-lib-custom/focus-trap';
```

## Selector

```
[uiLibFocusTrap]
```

## Inputs

| Name                   | Type             | Default | Description                                                                                                                         |
| ---------------------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `uiLibFocusTrap`       | `boolean`        | `true`  | When `true`, keyboard focus is trapped within the host element. Set `false` to release at runtime.                                  |
| `autoFocus`            | `boolean`        | `true`  | When `true`, the first focusable descendant (or `initialFocusSelector` match) receives focus immediately on activation.             |
| `initialFocusSelector` | `string \| null` | `null`  | CSS selector for the element that should receive focus on activation. Falls back to first focusable descendant when no match found. |
| `restoreFocus`         | `boolean`        | `true`  | When `true`, deactivating the trap returns focus to whichever element was active before activation.                                 |
| `sentinelClass`        | `string \| null` | `null`  | Extra CSS class name(s) added to each sentinel `<span>`. Useful for visual debugging.                                               |

## Usage

### Always active

```html
<div uiLibFocusTrap>
  <input type="text" placeholder="Name" />
  <button>Submit</button>
</div>
```

### Conditionally active (e.g. modal open/close)

```html
@if (isModalOpen) {
<div role="dialog" aria-modal="true" [uiLibFocusTrap]="true">
  <h2>Dialog title</h2>
  <button (click)="close()">Close</button>
</div>
}
```

### Focus a specific element on open

Use `initialFocusSelector` to focus the cancel button rather than the first (potentially destructive) action:

```html
<div role="dialog" aria-modal="true" uiLibFocusTrap initialFocusSelector="#cancel-btn">
  <h2>Confirm deletion</h2>
  <button id="confirm-btn" (click)="confirm()">Delete</button>
  <button id="cancel-btn" (click)="cancel()">Cancel</button>
</div>
```

### Toggle on/off at runtime

```html
<div [uiLibFocusTrap]="isTrapActive">
  <input type="text" />
  <button>Action</button>
</div>
```

```ts
isTrapActive = signal(true);

// Deactivate — focus is restored to the previously focused element
isTrapActive.set(false);
```

### Skip focus restoration (activating element is destroyed on close)

```html
<div [uiLibFocusTrap]="isOpen" [restoreFocus]="false">
  <button (click)="close()">Close</button>
</div>
```

### Disable auto-focus (parent manages focus)

```html
<div uiLibFocusTrap [autoFocus]="false">
  <!-- focus is managed externally by the parent component -->
</div>
```

### Debug sentinel visibility

```html
<div uiLibFocusTrap sentinelClass="debug-sentinel">…</div>
```

```scss
.debug-sentinel {
  opacity: 1 !important;
  outline: 2px solid red;
  background: rgba(255, 0, 0, 0.1);
}
```

## Keyboard behavior

| Key           | Behavior                                                           |
| ------------- | ------------------------------------------------------------------ |
| `Tab`         | Move to next focusable descendant; wraps to first after last.      |
| `Shift + Tab` | Move to previous focusable descendant; wraps to last before first. |

## ARIA attributes

FocusTrap does not change the host role semantics. It only adds hidden sentinel nodes around the trapped container while active.

| Element                    | Attribute     | Value  | Purpose                                             |
| -------------------------- | ------------- | ------ | --------------------------------------------------- |
| Sentinel nodes (start/end) | `tabindex`    | `0`    | Keep both Tab and Shift+Tab cycles inside the trap. |
| Sentinel nodes (start/end) | `aria-hidden` | `true` | Keep sentinels out of the accessibility tree.       |

## CSS

The directive adds `ui-lib-focus-trap` to the host element. Use it as a CSS hook when needed.

Sentinel nodes receive a predictable structure you can target:

```css
/* Target sentinel nodes by data attribute */
[data-ui-lib-focus-trap-sentinel='start'],
[data-ui-lib-focus-trap-sentinel='end'] {
  /* custom styles */
}
```

Or inject a class via `sentinelClass` input (see above).

## Focusable elements

The trap includes: `a[href]`, `button`, `input`, `select`, `textarea`, elements with a non-negative `tabindex`, and `[contenteditable="true"]`. Disabled and `aria-hidden` elements are excluded.

If no focusable descendants exist, the container itself receives `tabindex="-1"` temporarily and is focused.

## Deactivation & focus restoration

When the directive input is set to `false` or the directive is destroyed (e.g. the container is removed from the DOM via `@if`), the trap is released. If `restoreFocus` is `true` (default), focus is returned to whichever element was active before the trap was activated — provided that element is still connected to the DOM.

## Accessibility notes

- Pair with `role="dialog"` and `aria-modal="true"` on modal containers.
- Pair with `aria-labelledby` pointing to the dialog title.
- Combine with scroll-lock on `<body>` for full overlay accessibility.
- On activation, focus goes to `initialFocusSelector` match → first focusable descendant → the container itself (when no focusable descendants exist).
- On deactivation, focus is restored to the trigger element when `restoreFocus` is `true` and the element is still connected.
- Use `initialFocusSelector` to put initial focus on the "safe" action in confirmation dialogs (typically the cancel/dismiss button).

## Directive alternative

If you need imperative control (non-Angular or service-level overlays), use the core utility directly:

```ts
import { FocusTrap } from 'ui-lib-custom/core';
import type { FocusTrapOptions } from 'ui-lib-custom/core';

const options: FocusTrapOptions = {
  initialFocusSelector: '#cancel-btn',
  restoreFocus: true,
};

const trap = new FocusTrap(dialogElement);
trap.activate(options);

// Later:
trap.deactivate();
```

## Host class

The directive adds `ui-lib-focus-trap` to the host element.
