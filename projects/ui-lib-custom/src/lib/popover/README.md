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

| Input            | Type                                        | Default    | Description                                              |
|------------------|---------------------------------------------|------------|----------------------------------------------------------|
| `visible`        | `ModelSignal<boolean>`                      | `false`    | Two-way visibility binding.                              |
| `header`         | `string \| null`                            | `null`     | Optional header text.                                    |
| `showCloseButton`| `boolean`                                   | `false`    | Renders a close (×) button in the header area.           |
| `dismissable`    | `boolean`                                   | `true`     | Click-away closes the popover.                           |
| `closeOnEscape`  | `boolean`                                   | `true`     | Escape key closes the popover.                           |
| `variant`        | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Design variant; inherits from `ThemeConfigService` when `null`. |
| `styleClass`     | `string \| null`                            | `null`     | Extra CSS classes on the host element.                   |

## Outputs

| Output   | Type   | Description                             |
|----------|--------|-----------------------------------------|
| `shown`  | `void` | Emitted after the popover becomes visible. |
| `hidden` | `void` | Emitted after the popover is hidden.    |

## Public methods

| Method                        | Description                                        |
|-------------------------------|----------------------------------------------------|
| `show(target: HTMLElement)`   | Show the popover anchored to `target`.             |
| `hide()`                      | Hide the popover.                                  |
| `toggle(target: HTMLElement)` | Show if hidden, hide if visible.                   |

## Content projection

The default `<ng-content>` slot accepts any HTML or component content as the popover body.

## Accessibility

- `role="dialog"` with `aria-modal="false"` on the panel.
- `tabindex="-1"` on the panel to receive programmatic focus.
- Focus trap activated while the popover is open.
- Escape key dismissal (when `closeOnEscape` is true).
- Close button has `aria-label="Close"`.
