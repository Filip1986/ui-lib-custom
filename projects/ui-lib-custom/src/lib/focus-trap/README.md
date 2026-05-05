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

| Name            | Type      | Default | Description                                                                                    |
| --------------- | --------- | ------- | ---------------------------------------------------------------------------------------------- |
| `uiLibFocusTrap` | `boolean` | `true`  | When `true`, keyboard focus is trapped within the host element. Set `false` to release at runtime. |

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

## Keyboard behavior

| Key           | Behavior                                                            |
| ------------- | ------------------------------------------------------------------- |
| `Tab`         | Move to next focusable descendant; wraps to first after last.       |
| `Shift + Tab` | Move to previous focusable descendant; wraps to last before first.  |

## Focusable elements

The trap includes: `a[href]`, `button`, `input`, `select`, `textarea`, elements with a non-negative `tabindex`, and `[contenteditable="true"]`. Disabled and `aria-hidden` elements are excluded.

If no focusable descendants exist, the container itself receives `tabindex="-1"` temporarily and is focused.

## Deactivation & focus restoration

When the directive input is set to `false` or the directive is destroyed (e.g. the container is removed from the DOM via `@if`), the trap is released and focus is returned to whichever element was active before the trap was activated.

## Accessibility notes

- Pair with `role="dialog"` and `aria-modal="true"` on modal containers.
- Pair with `aria-labelledby` pointing to the dialog title.
- Combine with scroll-lock on `<body>` for full overlay accessibility.

## Host class

The directive adds `ui-lib-focus-trap` to the host element.
