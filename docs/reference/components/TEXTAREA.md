# Textarea Component

## Overview

`UiLibTextarea` is the library's multiline text control. It supports visible or ARIA-only labeling, generated stable ids, optional auto-resize with `maxRows`, validation messaging, hint text, character counters, and Angular forms integration through `ControlValueAccessor`.

**Selector:** `ui-lib-textarea`  
**Package:** `ui-lib-custom/textarea`

```typescript
import { UiLibTextarea } from 'ui-lib-custom/textarea';
```

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Renders a visible `<label>` linked to the native `<textarea>` |
| `ariaLabel` | `string \| null` | `null` | Accessible name fallback when no visible label is rendered |
| `ariaLabelledBy` | `string \| null` | `null` | Space-separated ids of visible elements that label the textarea |
| `inputId` | `string \| null` | `null` | Explicit id forwarded to the native control |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Uses the active theme variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size scale |
| `rows` | `number` | `3` | Initial visible rows |
| `maxRows` | `number \| null` | `null` | Caps auto-resize height before internal scrolling starts |
| `cols` | `number \| null` | `null` | Native `cols` attribute |
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical' \| 'auto'` | `'vertical'` | Native resize behavior; `autoResize` overrides it to JS sizing |
| `autoResize` | `boolean` | `false` | Grows height with content |
| `disabled` | `boolean` | `false` | Disables editing and interaction |
| `readonly` | `boolean` | `false` | Preserves focus semantics while preventing edits |
| `required` | `boolean` | `false` | Adds required semantics and indicator |
| `invalid` | `boolean` | `false` | Forces invalid styling / `aria-invalid` |
| `error` | `string \| null` | `null` | Inline string error announced with `role="alert"` |
| `hint` | `string \| null` | `null` | Inline string hint wired through `aria-describedby` |
| `showCounter` | `boolean` | `false` | Shows a character counter |
| `maxLength` | `number \| null` | `null` | Native `maxlength` attribute |

---

## Content Projection

| Slot | Selector | Purpose |
|---|---|---|
| Hint | `[textareaHint]` | Rich helper text linked through `aria-describedby` |
| Error | `[textareaError]` | Rich validation content announced when the textarea is invalid |

```html
<ui-lib-textarea
  label="Address"
  [invalid]="addressInvalid"
  [(ngModel)]="address"
>
  <span textareaHint>Include street, city, and postal code.</span>
  <span textareaError>Please provide a complete mailing address.</span>
</ui-lib-textarea>
```

---

## Accessibility

- Never rely on `placeholder` as the only label; use `label`, `ariaLabelledBy`, or `ariaLabel`.
- `aria-describedby` automatically composes hint and error ids when those regions are present.
- `aria-invalid`, `aria-required`, `aria-readonly`, and `aria-disabled` stay aligned with component state.
- Invalid content uses `role="alert"` for immediate announcement.
- Reduced-motion users avoid focus/field transitions through a `prefers-reduced-motion` safeguard.

---

## CSS Variables

| Variable | Purpose |
|---|---|
| `--uilib-textarea-border-focus` | Focus ring / active border color |
| `--uilib-textarea-border-error` | Invalid border color |
| `--uilib-textarea-hint-color` | Hint text color |
| `--uilib-textarea-error-color` | Error text color |
| `--uilib-textarea-counter-color` | Counter text color |
| `--uilib-textarea-resize-color` | Native resize handle accent |
