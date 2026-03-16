# Dialog

## Overview
`ui-lib-dialog` is an overlay container for focused tasks that need temporary interruption, such as confirm flows, short forms, and detail previews. It supports modal and non-modal modes, responsive sizing, draggable/maximizable behavior, variant styling, and accessible keyboard/focus patterns.

## Import

```typescript
import { DialogComponent } from 'ui-lib-custom/dialog';
```

## Basic Usage

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogComponent } from 'ui-lib-custom/dialog';

@Component({
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './dialog-basic-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBasicExampleComponent {
  public visible: boolean = false;
}
```

```html
<!-- dialog-basic-example.html -->
<button
  type="button"
  (click)="visible = true"
  [attr.aria-expanded]="visible"
  aria-controls="profile-dialog"
>
  Open
</button>

<ui-lib-dialog
  [(visible)]="visible"
  header="Edit Profile"
  [modal]="true"
>
  <p id="profile-dialog">Dialog content here.</p>
</ui-lib-dialog>
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Controls visibility. Supports two-way binding through `[(visible)]`. |
| `header` | `string` | `''` | Header fallback text when no projected header slot is provided. |
| `modal` | `boolean` | `false` | Enables modal behavior and backdrop rendering. |
| `closable` | `boolean` | `true` | Shows the close button in the header actions area. |
| `closeOnEscape` | `boolean` | `true` | Closes the dialog when `Escape` is pressed on the panel. |
| `dismissableMask` | `boolean` | `false` | Closes the dialog when clicking the backdrop. |
| `draggable` | `boolean` | `false` | Enables drag by pointer on the dialog header. |
| `maximizable` | `boolean` | `false` | Shows maximize/minimize action and allows full-screen toggle. |
| `blockScroll` | `boolean` | `true` | Locks `document.body` scroll while a modal dialog is visible. |
| `position` | `DialogPosition` | `'center'` | Viewport placement of the dialog container. |
| `breakpoints` | `Record<string, string>` | `{}` | Max-width map for responsive dialog width, for example `{ '960px': '75vw' }`. |
| `variant` | `DialogVariant \| undefined` | `undefined` | Optional explicit variant override (`material`, `bootstrap`, `minimal`). |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Explicit `aria-labelledby` target id override. |
| `headless` | `boolean` | `false` | Renders custom projected headless content instead of built-in chrome. |

## Events

| Name | Payload | Description |
| --- | --- | --- |
| `visibleChange` | `boolean` | Emitted by Angular model binding for `[(visible)]` updates. |
| `show` | `void` | Fired after dialog show lifecycle completes. |
| `hide` | `void` | Fired after dialog hide lifecycle completes. |
| `maximize` | `{ maximized: boolean }` | Fired whenever maximize state toggles. |

## Content Projection

### Slots

- Default slot: main body content.
- `[uiLibDialogHeader]`: custom header content.
- `[uiLibDialogFooter]`: footer actions/content.
- `[uiLibDialogHeadless]`: full custom content when `headless` is `true`.

### Default/Header/Footer Example

```html
<ui-lib-dialog [(visible)]="visible" header="Fallback Title" [modal]="true">
  <span uiLibDialogHeader>
    <strong>Custom Title</strong>
  </span>

  <p>Body content</p>

  <div uiLibDialogFooter>
    <button type="button" (click)="visible = false">Cancel</button>
    <button type="button">Save</button>
  </div>
</ui-lib-dialog>
```

### Headless Slot Example

```html
<ui-lib-dialog [(visible)]="visible" [headless]="true" [modal]="true">
  <div
    uiLibDialogHeadless
    class="headless-shell"
    aria-labelledby="headless-title"
  >
    <header class="headless-shell__header">
      <h2 id="headless-title">Custom Headless Dialog</h2>
      <button type="button" (click)="visible = false" aria-label="Close">x</button>
    </header>

    <main class="headless-shell__content">
      <p>Bring your own structure and styles.</p>
    </main>

    <footer class="headless-shell__footer">
      <button type="button" (click)="visible = false">Done</button>
    </footer>
  </div>
</ui-lib-dialog>
```

## Positioning

`position` supports 9 values:

- `center`
- `top`
- `bottom`
- `left`
- `right`
- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`

```typescript
import type { DialogPosition } from 'ui-lib-custom/dialog';

const positions: DialogPosition[] = [
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];
```

```html
@for (position of positions; track position) {
  <ui-lib-dialog
    [(visible)]="visibleMap[position]"
    [position]="position"
    [header]="'Position: ' + position"
  >
    <p>Content for {{ position }}</p>
  </ui-lib-dialog>
}
```

## Responsive

```typescript
const responsiveBreakpoints: Record<string, string> = {
  '1200px': '50vw',
  '960px': '75vw',
  '640px': '92vw',
};
```

```html
<ui-lib-dialog
  [(visible)]="visible"
  header="Responsive Dialog"
  [modal]="true"
  [breakpoints]="responsiveBreakpoints"
>
  <p>Resize viewport to see width updates.</p>
</ui-lib-dialog>
```

## Maximizable

```html
<ui-lib-dialog
  [(visible)]="visible"
  header="Maximizable"
  [modal]="true"
  [maximizable]="true"
  (maximize)="onMaximize($event)"
>
  <p>Use the maximize action in the header.</p>
</ui-lib-dialog>
```

```typescript
const onMaximize = (event: { maximized: boolean }): void => {
  console.log('Dialog maximized state:', event.maximized);
};
```

## Draggable

```html
<ui-lib-dialog
  [(visible)]="visible"
  header="Draggable"
  [modal]="false"
  [draggable]="true"
>
  <p>Drag from the header area.</p>
</ui-lib-dialog>
```

Notes:

- Drag starts from the header area only.
- Header action buttons (close/maximize) do not initiate drag.
- Drag is disabled while maximized.

## Without Modal

```html
<ui-lib-dialog
  [(visible)]="visible"
  header="Non-Modal Dialog"
  [modal]="false"
  [dismissableMask]="false"
>
  <p>This dialog does not render a backdrop.</p>
</ui-lib-dialog>
```

## Headless Mode (Full Custom Chrome)

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogComponent } from 'ui-lib-custom/dialog';

@Component({
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './dialog-headless-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeadlessExampleComponent {
  public visible: boolean = false;
}
```

```html
<!-- dialog-headless-example.html -->
<button type="button" (click)="visible = true">Open Headless</button>

<ui-lib-dialog [(visible)]="visible" [headless]="true" [modal]="true">
  <div
    uiLibDialogHeadless
    class="headless-shell"
    aria-labelledby="headless-title"
  >
    <header class="headless-shell__header">
      <h2 id="headless-title">Custom Confirmation</h2>
      <button type="button" (click)="visible = false" aria-label="Close">x</button>
    </header>

    <section class="headless-shell__body">
      <p>Delete this resource permanently?</p>
    </section>

    <footer class="headless-shell__footer">
      <button type="button" (click)="visible = false">Cancel</button>
      <button type="button" (click)="visible = false">Confirm</button>
    </footer>
  </div>
</ui-lib-dialog>
```

## Accessibility

### Trigger Requirements

Use a trigger element that communicates dialog state:

- `aria-expanded` reflects open/closed state.
- `aria-controls` points to a meaningful target in dialog content.
- Use clear trigger text for intent, for example "Edit Profile".

### Dialog ARIA

- Built-in panel uses `role="dialog"`.
- `aria-labelledby` is auto-generated from projected/header title unless overridden with `ariaLabelledBy`.
- `aria-modal="true"` is set when `modal` is `true`.

### Keyboard Interactions

- `Escape` closes when `closeOnEscape` is `true`.
- Close and maximize actions are keyboard-focusable buttons.
- In modal usage, focus is trapped within the dialog while open.

### Focus Management

- In modal usage, focus moves inside the dialog on activation.
- Tab/Shift+Tab wrap within dialog focusable elements.
- Focus returns to the previously focused element when the dialog closes.
- If no focusable child exists, focus is set to the dialog container.

## Design Tokens (CSS Custom Properties)

| Token | Description |
| --- | --- |
| `--uilib-dialog-bg` | Dialog panel background color. |
| `--uilib-dialog-border-radius` | Base panel border radius. |
| `--uilib-dialog-shadow` | Base panel shadow. |
| `--uilib-dialog-border` | Base panel border shorthand. |
| `--uilib-dialog-header-bg` | Header background. |
| `--uilib-dialog-header-color` | Header text color. |
| `--uilib-dialog-header-font-size` | Header title font size. |
| `--uilib-dialog-header-font-weight` | Header title font weight. |
| `--uilib-dialog-header-padding` | Header padding. |
| `--uilib-dialog-content-padding` | Content area padding. |
| `--uilib-dialog-footer-padding` | Footer padding. |
| `--uilib-dialog-footer-border-top` | Footer top border. |
| `--uilib-dialog-close-btn-size` | Size for close/maximize icon buttons. |
| `--uilib-dialog-close-btn-color` | Icon action foreground color. |
| `--uilib-dialog-close-btn-hover-bg` | Icon action hover background. |
| `--uilib-dialog-z-index` | Dialog host z-index. |
| `--uilib-dialog-maximized-margin` | Margin override in maximized state. |
| `--uilib-dialog-shadow-material` | Material variant shadow token. |
| `--uilib-dialog-shadow-bootstrap` | Bootstrap variant shadow token. |
| `--uilib-dialog-shadow-minimal` | Minimal variant shadow token. |
| `--uilib-dialog-border-bootstrap` | Bootstrap border color token. |
| `--uilib-dialog-border-minimal` | Minimal border color token. |
| `--uilib-dialog-action-hover-material` | Material action hover token. |
| `--uilib-overlay-backdrop-bg` | Backdrop color source. |
| `--uilib-overlay-backdrop-opacity` | Backdrop opacity multiplier. |
| `--uilib-z-backdrop` | Backdrop layer z-index. |

## Variant Comparison

| Variant | Visual Character | Typical Use |
| --- | --- | --- |
| `material` | Softer radius, elevated shadow, rounded action buttons. | Modern app surfaces and rich overlays. |
| `bootstrap` | Defined border, medium radius, stronger structural separators. | Traditional enterprise/admin UI style. |
| `minimal` | Subtle shadow, thin border, compact visual chrome. | Low-noise layouts and utility dialogs. |

## Exported Types

```typescript
import type { DialogPosition, DialogVariant } from 'ui-lib-custom/dialog';
```

```typescript
type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type DialogVariant = 'material' | 'bootstrap' | 'minimal';
```
