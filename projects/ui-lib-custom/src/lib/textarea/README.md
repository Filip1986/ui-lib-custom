# Textarea

**Selector:** `ui-lib-textarea`
**Package:** `ui-lib-custom/textarea`
**Content projection:** no — none

> Implements `ControlValueAccessor`. Use `autoResize` for JS-driven height growth; setting `resize="auto"` alone does not enable this — the `autoResize` boolean input must be `true`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `label` | `string` | `''` | Rendered as a `<label>` element |
| `placeholder` | `string` | `''` | |
| `inputId` | `string \| null` | `null` | Forwarded to the native `<textarea>` id |
| `name` | `string \| null` | `null` | |
| `rows` | `number` | `3` | Visible text rows |
| `cols` | `number \| null` | `null` | Visible text columns |
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical' \| 'auto'` | `'none'` | CSS resize behaviour; `'auto'` is mapped to `'none'` when `autoResize` is true |
| `autoResize` | `boolean` | `false` | JS-driven height expansion to fit content |
| `disabled` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `showCounter` | `boolean` | `false` | |
| `maxLength` | `number \| null` | `null` | Also applied as `maxlength` on the native element |
| `error` | `string \| null` | `null` | Rendered below the field and announced via `role="alert"` |
| `styleClass` | `string \| null` | `null` | Extra CSS classes on the host element |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onInput` | `TextareaChangeEvent` | Fires on every keystroke; `{ value: string, originalEvent: Event }` |
| `onFocus` | `FocusEvent` | |
| `onBlur` | `FocusEvent` | |

## Usage

```html
<!-- minimal example -->
<ui-lib-textarea label="Message" [(ngModel)]="message" />

<!-- auto-resize with character counter -->
<ui-lib-textarea
  label="Bio"
  [autoResize]="true"
  [showCounter]="true"
  [maxLength]="500"
  [(ngModel)]="bio"
/>
```
