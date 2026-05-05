# Inplace

Inline editing component that toggles between a read-only **display** slot and an editable **content** slot on click.

## Package path

```ts
import { Inplace } from 'ui-lib-custom/inplace';
```

## Selector

```html
<ui-lib-inplace>...</ui-lib-inplace>
```

## Inputs

| Input        | Type                                            | Default       | Description                                                              |
|--------------|-------------------------------------------------|---------------|--------------------------------------------------------------------------|
| `active`     | `boolean`                                       | `false`       | Two-way bindable via `model()`. Controls whether the editor is visible.  |
| `disabled`   | `boolean`                                       | `false`       | Prevents activation when `true`.                                         |
| `closable`   | `boolean`                                       | `false`       | Renders a close button inside the content slot.                          |
| `closeIcon`  | `string`                                        | `'pi pi-times'` | CSS class for the close button icon.                                   |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`       | Visual variant; falls back to `ThemeConfigService` when `null`.          |
| `styleClass` | `string \| null`                                | `null`        | Extra CSS classes added to the host element.                             |

## Outputs

| Output        | Type   | Description                                                          |
|---------------|--------|----------------------------------------------------------------------|
| `activated`   | `void` | Emitted when the component transitions to the active (editing) state.|
| `deactivated` | `void` | Emitted when the component transitions back to the display state.    |

## Content Projection

| Slot selector      | Description                                                            |
|--------------------|------------------------------------------------------------------------|
| `[inplaceDisplay]` | Shown when inactive. Clicking it activates the editor.                 |
| `[inplaceContent]` | Shown when active. Can contain any element, input, or component.       |

## Usage

### Basic

```html
<ui-lib-inplace>
  <span inplaceDisplay>Click to edit</span>
  <input inplaceContent type="text" />
</ui-lib-inplace>
```

### Two-way active binding

```html
<ui-lib-inplace [(active)]="isEditing">
  <span inplaceDisplay>{{ currentValue }}</span>
  <input inplaceContent type="text" [(ngModel)]="currentValue" (blur)="isEditing = false" />
</ui-lib-inplace>
```

### Closable

```html
<ui-lib-inplace [closable]="true">
  <span inplaceDisplay>PrimeNG 19.0.0</span>
  <input inplaceContent type="text" />
</ui-lib-inplace>
```

### Disabled

```html
<ui-lib-inplace [disabled]="true">
  <span inplaceDisplay>Read-only content</span>
  <input inplaceContent type="text" />
</ui-lib-inplace>
```

### Explicit variant

```html
<ui-lib-inplace variant="bootstrap" [closable]="true">
  <span inplaceDisplay>Bootstrap style</span>
  <input inplaceContent type="text" />
</ui-lib-inplace>
```

### Event handling

```html
<ui-lib-inplace (activated)="onStart()" (deactivated)="onStop()">
  <span inplaceDisplay>{{ value }}</span>
  <input inplaceContent type="text" [(ngModel)]="value" />
</ui-lib-inplace>
```

## CSS Variables

| Variable                                   | Default                          | Description                             |
|--------------------------------------------|----------------------------------|-----------------------------------------|
| `--uilib-inplace-display-cursor`           | `pointer`                        | Cursor on display slot                  |
| `--uilib-inplace-display-padding`          | `0.25rem 0.375rem`               | Padding on display slot                 |
| `--uilib-inplace-display-border-radius`    | `var(--uilib-radius-sm)`         | Border radius of display slot           |
| `--uilib-inplace-display-bg-hover`         | `rgba(0,0,0,0.04)`               | Hover background of display slot        |
| `--uilib-inplace-display-transition`       | `background-color 0.15s ease`    | Transition on display slot hover        |
| `--uilib-inplace-display-border`           | `1px dashed transparent`         | Border around display slot              |
| `--uilib-inplace-display-border-hover`     | `1px dashed primary`             | Border on display slot hover            |
| `--uilib-inplace-content-gap`              | `0.5rem`                         | Gap between content slot and close btn  |
| `--uilib-inplace-close-button-size`        | `1.75rem`                        | Width/height of close button            |
| `--uilib-inplace-close-button-bg`          | `transparent`                    | Close button background                 |
| `--uilib-inplace-close-button-color`       | `var(--uilib-color-text)`        | Close button icon colour                |
| `--uilib-inplace-close-button-bg-hover`    | `rgba(0,0,0,0.08)`               | Close button hover background           |
| `--uilib-inplace-close-button-border-radius`| `var(--uilib-radius-full)`      | Close button shape                      |
| `--uilib-inplace-disabled-opacity`         | `0.5`                            | Opacity when disabled                   |

## Accessibility

- Display slot has `role="button"`, `tabindex="0"` and `aria-label="Click to edit"`.
- Keyboard: `Enter` and `Space` activate the editor from the display slot.
- `aria-disabled="true"` is set on the display slot when `[disabled]="true"`.
- `tabindex` is removed from display when disabled.
- Close button has `aria-label="Close editor"`.

