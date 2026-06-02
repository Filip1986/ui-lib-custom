# Textarea

**Selector:** `ui-lib-textarea`
**Package:** `ui-lib-custom/textarea`
**Content projection:** yes — `[textareaHint]`, `[textareaError]`

> Implements `ControlValueAccessor`. Use `autoResize` for JS-driven height growth; setting `resize="auto"` alone does not enable this — the `autoResize` boolean input must be `true`.

## Labeling and descriptions

- Preferred: render a native `<label for="...">` via the `label` input or your own external label using the component's generated/native id.
- Alternative: pass `ariaLabelledBy` to reference visible label text elsewhere in the DOM.
- Last resort: pass `ariaLabel` when no visible label can be rendered.
- Use `hint` / `[textareaHint]` and `error` / `[textareaError]` for `aria-describedby` content.

## Inputs

| Name             | Type                                                       | Default      | Notes                                                                           |
| ---------------- | ---------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------- |
| `variant`        | `'material' \| 'bootstrap' \| 'minimal' \| null`           | `null`       | Falls back to global theme variant when null                                    |
| `size`           | `'sm' \| 'md' \| 'lg'`                                     | `'md'`       |                                                                                 |
| `label`          | `string`                                                   | `''`         | Rendered as a `<label>` element                                                 |
| `ariaLabel`      | `string \| null`                                           | `null`       | Accessible name fallback when no visible label is rendered                      |
| `ariaLabelledBy` | `string \| null`                                           | `null`       | Space-separated ids of visible labels/descriptions used as the accessible name  |
| `placeholder`    | `string`                                                   | `''`         |                                                                                 |
| `inputId`        | `string \| null`                                           | `null`       | Forwarded to the native `<textarea>` id                                         |
| `name`           | `string \| null`                                           | `null`       |                                                                                 |
| `rows`           | `number`                                                   | `3`          | Visible text rows                                                               |
| `maxRows`        | `number \| null`                                           | `null`       | Max rows before auto-resize enables internal scrolling                          |
| `cols`           | `number \| null`                                           | `null`       | Visible text columns                                                            |
| `resize`         | `'none' \| 'both' \| 'horizontal' \| 'vertical' \| 'auto'` | `'vertical'` | CSS resize behaviour; `'auto'` is mapped to `'none'` when `autoResize` is true  |
| `autoResize`     | `boolean`                                                  | `false`      | JS-driven height expansion to fit content                                       |
| `disabled`       | `boolean`                                                  | `false`      |                                                                                 |
| `readonly`       | `boolean`                                                  | `false`      |                                                                                 |
| `required`       | `boolean`                                                  | `false`      |                                                                                 |
| `invalid`        | `boolean`                                                  | `false`      | Forces `aria-invalid` / invalid styling even when no error string input is used |
| `showCounter`    | `boolean`                                                  | `false`      |                                                                                 |
| `maxLength`      | `number \| null`                                           | `null`       | Also applied as `maxlength` on the native element                               |
| `error`          | `string \| null`                                           | `null`       | Rendered below the field and announced via `role="alert"`                       |
| `hint`           | `string \| null`                                           | `null`       | Rendered below the field and associated with `aria-describedby`                 |
| `styleClass`     | `string \| null`                                           | `null`       | Extra CSS classes on the host element                                           |

## Outputs

| Name            | Payload               | Notes                                                                                                                                                                                                |
| --------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `valueChange`   | `TextareaChangeEvent` | Fires on every keystroke; `{ value: string, originalEvent: Event }`. Named `valueChange` (not `input`) to avoid clashing with the native `input` DOM event that bubbles from the inner `<textarea>`. |
| `textareaFocus` | `FocusEvent`          | Named `textareaFocus` (not `focus`) to avoid clashing with the native `focus` DOM event.                                                                                                             |
| `textareaBlur`  | `FocusEvent`          | Named `textareaBlur` (not `blur`) to avoid clashing with the native `blur` DOM event.                                                                                                                |

## Usage

```html
<!-- minimal example -->
<ui-lib-textarea label="Message" [(ngModel)]="message" />

<!-- auto-resize with character counter -->
<ui-lib-textarea
  label="Bio"
  [autoResize]="true"
  [maxRows]="8"
  [showCounter]="true"
  [maxLength]="500"
  [(ngModel)]="bio"
/>

<!-- projected hint + projected rich error -->
<ui-lib-textarea label="Address" [required]="true" [invalid]="addressInvalid" [(ngModel)]="address">
  <span textareaHint>Include street, city, and postal code.</span>
  <span textareaError>Please provide a complete mailing address.</span>
</ui-lib-textarea>
```

## Projection slots

| Slot              | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `[textareaHint]`  | Rich hint or helper copy associated via `aria-describedby`               |
| `[textareaError]` | Rich validation error content announced with `role="alert"` when invalid |

## CSS custom properties

| Variable                         | Purpose                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-textarea-bg`            | Field background                                                                                                                 |
| `--uilib-textarea-border`        | Default border color                                                                                                             |
| `--uilib-textarea-border-focus`  | Focus ring / active border color                                                                                                 |
| `--uilib-textarea-border-error`  | Invalid border color                                                                                                             |
| `--uilib-textarea-label-color`   | Label color                                                                                                                      |
| `--uilib-textarea-hint-color`    | Hint text color                                                                                                                  |
| `--uilib-textarea-error-color`   | Error text color                                                                                                                 |
| `--uilib-textarea-counter-color` | Counter text color                                                                                                               |
| `--uilib-textarea-resize-color`  | Native resize-handle accent                                                                                                      |
| `--uilib-textarea-transition`    | Border/shadow transition (`border-color 0.15s ease, box-shadow 0.15s ease`); set to `none` when `prefers-reduced-motion: reduce` |

## Internationalisation

This component contains no translatable strings — all visible text is supplied by the consumer via inputs or content projection. No UiLibI18nService integration is needed.
