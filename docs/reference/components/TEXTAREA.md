# Textarea

**Selector:** `ui-lib-textarea`
**Entry point:** `import { Textarea } from 'ui-lib-custom/textarea'`

---

## Overview

Multi-line text input with optional auto-resize, character counter, floating-label support, three design variants, three sizes, and full ControlValueAccessor integration (ngModel + reactive forms).

## API

### Inputs

| Name             | Type                     | Default                         | Description                                                                    |
| ---------------- | ------------------------ | ------------------------------- | ------------------------------------------------------------------------------ |
| `ariaLabel`      | `string | null`          | `null`                          | Accessible label used when no visible label is rendered.                       |
| `ariaLabelledBy` | `string | null`          | `null`                          | Space-separated ids of visible label elements for accessible-name composition. |
| `autoResize`     | `boolean`                | `TEXTAREA_DEFAULTS.autoResize`  | When true, the textarea grows in height automatically to fit its content.      |
| `cols`           | `number | null`          | `TEXTAREA_DEFAULTS.cols`        | Number of visible text columns.                                                |
| `disabled`       | `boolean`                | `TEXTAREA_DEFAULTS.disabled`    | Whether the textarea is disabled.                                              |
| `error`          | `string | null`          | `null`                          | Error message rendered below the textarea and announced to screen readers.     |
| `hint`           | `string | null`          | `null`                          | Hint text rendered below the textarea and associated through aria-describedby. |
| `inputId`        | `string | null`          | `null`                          | Explicit id forwarded to the native textarea element.                          |
| `invalid`        | `boolean`                | `false`                         | Whether the control should expose validation error semantics.                  |
| `label`          | `string`                 | `''`                            | Accessible label rendered above the textarea.                                  |
| `maxLength`      | `number | null`          | `TEXTAREA_DEFAULTS.maxLength`   | Maximum allowed character length -- also sets maxlength on the native element. |
| `maxRows`        | `number | null`          | `TEXTAREA_DEFAULTS.maxRows`     | Maximum number of text rows before auto-resize enables internal scrolling.     |
| `name`           | `string | null`          | `null`                          | name attribute forwarded to the native textarea element.                       |
| `placeholder`    | `string`                 | `TEXTAREA_DEFAULTS.placeholder` | Placeholder text shown inside the textarea when it is empty.                   |
| `readonly`       | `boolean`                | `TEXTAREA_DEFAULTS.readonly`    | Whether the textarea is read-only (focusable but not editable).                |
| `required`       | `boolean`                | `TEXTAREA_DEFAULTS.required`    | Whether the field is required.                                                 |
| `resize`         | `TextareaResize`         | `TEXTAREA_DEFAULTS.resize`      | CSS resize behaviour. Use 'auto' to enable JS-driven auto-resize.              |
| `rows`           | `number`                 | `TEXTAREA_DEFAULTS.rows`        | Number of visible text rows.                                                   |
| `showCounter`    | `boolean`                | `TEXTAREA_DEFAULTS.showCounter` | When true, renders a character counter below the textarea.                     |
| `size`           | `TextareaSize`           | `TEXTAREA_DEFAULTS.size`        | Size token -- controls padding and font size.                                  |
| `styleClass`     | `string | null`          | `null`                          | Additional CSS classes appended to the host element.                           |
| `variant`        | `TextareaVariant | null` | `TEXTAREA_DEFAULTS.variant`     | Design variant override. When null the active global theme variant is used.    |

### Outputs

| Name            | Type         | Description                                                                                                               |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `textareaBlur`  | `FocusEvent` | Emits when the textarea loses focus. Named `textareaBlur` (not `blur`) to avoid shadowing the native DOM `blur` event.    |
| `textareaFocus` | `FocusEvent` | Emits when the textarea gains focus. Named `textareaFocus` (not `focus`) to avoid shadowing the native DOM `focus` event. |

## Content Projection

| Selector          | Notes |
| ----------------- | ----- |
| `[textareaError]` | —     |
| `[textareaHint]`  | —     |

## Theming

| CSS Variable                        | Default                          |
| ----------------------------------- | -------------------------------- |
| `--uilib-textarea-bg`               | `var(--uilib-surface)`           |
| `--uilib-textarea-border`           | `var(--uilib-border)`            |
| `--uilib-textarea-border-error`     | `var(--uilib-color-danger-600)`  |
| `--uilib-textarea-border-focus`     | `var(--uilib-color-primary-600)` |
| `--uilib-textarea-counter-color`    | `var(--uilib-muted)`             |
| `--uilib-textarea-disabled-opacity` | `0.6`                            |
| `--uilib-textarea-error-color`      | `var(--uilib-color-danger-600)`  |
| `--uilib-textarea-font-size`        | `1rem`                           |
| `--uilib-textarea-hint-color`       | `var(--uilib-muted)`             |
| `--uilib-textarea-label-color`      | `var(--uilib-page-fg)`           |
| `--uilib-textarea-padding-x`        | `0.75rem`                        |
| `--uilib-textarea-padding-y`        | `0.5rem`                         |
| `--uilib-textarea-placeholder`      | `var(--uilib-muted)`             |
| `--uilib-textarea-radius`           | `var(--uilib-shape-base, 6px)`   |
| `--uilib-textarea-required-color`   | `var(--uilib-color-danger-600)`  |
| `--uilib-textarea-resize-color`     | `var(--uilib-border)`            |
| `--uilib-textarea-text`             | `var(--uilib-page-fg)`           |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                     |
| -------------------------------------------------------------------- |
| aria-describedby also includes the hint id when hint text is present |
| aria-describedby points to the error element id                      |
| aria-invalid is absent when not invalid                              |
| aria-invalid=                                                        |
| aria-required=                                                       |
| disabled textarea exposes aria-disabled=                             |
| error element has role=                                              |
| links hint input content through aria-describedby                    |
| passes axe — default state with ariaLabel                            |
| passes axe — disabled state                                          |
| passes axe — invalid state                                           |
| passes axe — readonly state                                          |
| readonly textarea has aria-readonly=                                 |
| should apply bootstrap variant class                                 |
| should apply focused class on focus and remove on blur               |
| should apply material variant class                                  |
| should apply minimal variant class                                   |
| should emit textareaBlur event when textarea loses focus             |
| should emit textareaFocus event when textarea gains focus            |
| should set aria-describedby when error is present                    |
| should set aria-disabled on host when disabled                       |
| should set aria-readonly when readonly                               |
| textarea does not use placeholder as an aria-label fallback          |
| textarea has accessible name via ariaLabel input                     |
| textarea has accessible name via ariaLabelledBy input                |

## Usage Examples

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
<ui-lib-textarea
  label="Address"
  [required]="true"
  [invalid]="addressInvalid"
  [(ngModel)]="address"
>
  <span textareaHint>Include street, city, and postal code.</span>
  <span textareaError>Please provide a complete mailing address.</span>
</ui-lib-textarea>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#textarea)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/textarea/README.md)

