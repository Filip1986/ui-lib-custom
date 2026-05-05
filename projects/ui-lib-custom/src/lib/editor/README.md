# Editor

**Selector:** `ui-lib-editor`
**Package:** `ui-lib-custom/editor`
**Content projection:** yes — project a custom toolbar element with `[editorToolbar]` to replace the built-in toolbar entirely

> The editor uses `execCommand` internally (deprecated API, no replacement as of 2026). It sanitizes pasted HTML via a custom sanitizer. The component only initializes its `contenteditable` div after `afterNextRender`, so `writeValue` calls before first render are buffered automatically. Implements `ControlValueAccessor` — use with `ngModel` or reactive forms.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global `ThemeConfigService` variant when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls padding and font size. |
| `placeholder` | `string` | `''` | Placeholder shown when the editor is empty. |
| `readonly` | `boolean` | `false` | When true, sets `contenteditable="false"`. |
| `disabled` | `boolean` | `false` | Disables editing; also respected via CVA `setDisabledState`. |
| `filled` | `boolean` | `false` | Applies a filled background style. |
| `ariaLabel` | `string \| null` | `null` | `aria-label` on the editor content area. |
| `ariaLabelledBy` | `string \| null` | `null` | `aria-labelledby` on the editor content area. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `textChange` | `EditorTextChangeEvent` | Emitted on every input; carries `htmlValue`, `textValue`, and `originalEvent`. |
| `selectionChange` | `EditorSelectionChangeEvent` | Emitted when the document selection changes inside the editor. |

## Usage

```html
<!-- with ngModel -->
<ui-lib-editor [(ngModel)]="html" placeholder="Start typing..." />

<!-- readonly display with custom toolbar -->
<ui-lib-editor [readonly]="true" [ngModel]="html">
  <div editorToolbar><!-- custom toolbar buttons --></div>
</ui-lib-editor>
```
