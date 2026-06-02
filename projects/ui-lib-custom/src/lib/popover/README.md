# Popover

A lightweight floating panel anchored to a trigger element. Accepts arbitrary projected content, supports an optional header and close button, and positions itself automatically above or below the trigger with a directional arrow.

## Package path

```ts
import { Popover } from 'ui-lib-custom/popover';
```

## Selector

```html
<ui-lib-popover />
```

## Usage

### Template-ref pattern (recommended)

```html
<button #triggerBtn (click)="op.toggle(triggerBtn)">Open</button>

<ui-lib-popover #op>
  <p>Popover body content goes here.</p>
</ui-lib-popover>
```

### With header and close button

```html
<button #infoBtn (click)="infoPopover.toggle(infoBtn)">Info</button>

<ui-lib-popover #infoPopover header="More information" [showCloseButton]="true">
  <p>Detailed information shown in the popover.</p>
</ui-lib-popover>
```

### Declarative two-way binding

```html
<ui-lib-popover [(visible)]="isOpen" (shown)="onOpen()" (hidden)="onClose()">
  <p>Content</p>
</ui-lib-popover>
```

## Inputs

| Input             | Type                                             | Default | Description                                                                              |
| ----------------- | ------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------- |
| `visible`         | `ModelSignal<boolean>`                           | `false` | Two-way visibility binding.                                                              |
| `header`          | `string \| null`                                 | `null`  | Optional header text. When set, also provides the accessible name via `aria-labelledby`. |
| `showCloseButton` | `boolean`                                        | `false` | Renders a close button (SVG ×) in the header area.                                       |
| `dismissable`     | `boolean`                                        | `true`  | Click-away closes the popover.                                                           |
| `closeOnEscape`   | `boolean`                                        | `true`  | Escape key closes the popover.                                                           |
| `variant`         | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`  | Design variant; inherits from `ThemeConfigService` when `null`.                          |
| `styleClass`      | `string \| null`                                 | `null`  | Extra CSS classes on the host element.                                                   |

## Outputs

| Output   | Type   | Description                                                                                                                                                                                           |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shown`  | `void` | Emitted after the popover becomes visible. Note: emitted inside `afterNextRender`, so it will not fire in Jest unit tests — use the `hidden` output or integration tests to observe lifecycle events. |
| `hidden` | `void` | Emitted after the popover is hidden.                                                                                                                                                                  |

## Public methods

| Method                        | Description                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `show(target: HTMLElement)`   | Show the popover anchored to `target`. Also captures the currently focused element for focus restoration on close. |
| `hide()`                      | Hide the popover.                                                                                                  |
| `toggle(target: HTMLElement)` | Show if hidden, hide if visible.                                                                                   |

## Public properties

| Property  | Type     | Description                                                                                               |
| --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `panelId` | `string` | Stable unique `id` of the panel element. Use for consumer `aria-controls` wiring.                         |
| `titleId` | `string` | Stable `id` of the title span. Set automatically on the rendered title element when `header` is provided. |

## Content projection

The default `<ng-content>` slot accepts any HTML or component content as the popover body.

## Accessibility

### ARIA features

| Feature                                | Detail                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `role="dialog"` + `aria-modal="false"` | Applied to the panel element. Non-modal: AT does not suppress background content.               |
| `aria-labelledby`                      | When `header` is provided, points to the rendered title span's `id` (`titleId`).                |
| `aria-label="Popover"`                 | Fallback when no `header` is set — satisfies WCAG 4.1.2 accessible name requirement.            |
| Focus trap                             | Tab/Shift+Tab constrained to panel focusable elements while open.                               |
| Focus restoration                      | When the popover closes, focus returns to the element that had focus when `show()` was called.  |
| `panelId`                              | Public string property — stable `id` of the panel element, for consumer `aria-controls` wiring. |
| `titleId`                              | Public string property — stable `id` of the title span, for custom `aria-labelledby` overrides. |
| Overlay                                | `aria-hidden="true"` — click-catcher is decorative and hidden from AT.                          |
| Arrow                                  | `aria-hidden="true"` — decorative only.                                                         |
| Close button                           | `aria-label="Close"` + `aria-hidden` inline SVG icon.                                           |
| Escape key                             | Closes the popover (when `closeOnEscape=true`); focus returns to trigger.                       |
| Dismissable overlay                    | Click-away closes (when `dismissable=true`); overlay has `aria-hidden`.                         |
| Reduced motion                         | `@media (prefers-reduced-motion: reduce)` sets `--uilib-popover-enter-duration: 0ms`.           |
| `:focus-visible`                       | Focus ring on the close button.                                                                 |

### Keyboard navigation

| Key       | Behaviour                                                               |
| --------- | ----------------------------------------------------------------------- |
| Tab       | Move focus to next focusable element within the popover                 |
| Shift+Tab | Move focus to previous focusable element within the popover             |
| Escape    | Close the popover (when `closeOnEscape=true`); focus returns to trigger |

### Consumer accessibility responsibilities

The trigger element that calls `show()` / `toggle()` is the consumer's responsibility for ARIA. Add `aria-expanded` and `aria-controls` on the trigger to fully satisfy WCAG:

```html
<!-- Trigger button — consumer adds aria-expanded and aria-controls -->
<button
  #triggerBtn
  type="button"
  [attr.aria-expanded]="isOpen"
  [attr.aria-controls]="op.panelId"
  (click)="isOpen = !isOpen; isOpen ? op.show(triggerBtn) : op.hide()"
>
  Open
</button>

<ui-lib-popover #op [(visible)]="isOpen" header="Options">
  <p>Content here.</p>
</ui-lib-popover>
```

- `aria-controls` links the trigger to the popover panel via `op.panelId`
- `aria-expanded` reflects the open/closed state to screen readers
- Neither is set automatically by the component because the Popover does not own or manage the trigger element
