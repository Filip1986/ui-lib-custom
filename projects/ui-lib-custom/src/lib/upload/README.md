# Upload

**Selector:** `ui-lib-upload`
**Package:** `ui-lib-custom/upload`
**Content projection:** yes — four optional template slots via directives: `uiUploadHeader` (replaces toolbar), `uiUploadContent` (replaces drop zone + file list), `uiUploadEmpty` (replaces empty state), `uiUploadFile` (custom file-row rendering; context: `{ $implicit: UploadFileItem, index: number }`)

> The component does not perform HTTP uploads itself. You must set `[customUpload]="true"` and listen to `(uploadHandler)` to handle transport. Without `customUpload`, the Upload button emits `uploadHandler` but nothing actually sends the files.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Design variant; note: no `null` fallback — defaults to `'material'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `multiple` | `boolean` | `false` | Allow selecting more than one file |
| `accept` | `string` | `''` | Passed directly to `<input accept>` (e.g. `'image/*'` or `'.pdf,.docx'`) |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `auto` | `boolean` | `false` | Emits `uploadHandler` immediately after file selection (requires `customUpload`) |
| `maxFileSize` | `number \| null` | `null` | Max file size in bytes; `null` = no limit |
| `fileLimit` | `number \| null` | `null` | Max files in queue; `null` = no limit |
| `chooseLabel` | `string` | `'Choose'` | Label for the Choose button |
| `uploadLabel` | `string` | `'Upload'` | Label for the Upload button |
| `cancelLabel` | `string` | `'Cancel'` | Label for the Cancel/clear button |
| `showUploadButton` | `boolean` | `true` | Whether to show the Upload button |
| `showCancelButton` | `boolean` | `true` | Whether to show the Cancel button |
| `customUpload` | `boolean` | `false` | Must be `true` for `uploadHandler` to work; component never sends HTTP on its own |
| `previewWidth` | `number` | `50` | Width/height of image thumbnail previews in px |
| `invalidFileSizeMessage` | `string` | template | `{0}` = filename, `{1}` = limit |
| `invalidFileTypeMessage` | `string` | template | `{0}` = filename, `{1}` = accepted types |
| `invalidFileLimitMessage` | `string` | template | `{0}` = limit |
| `emptyMessage` | `string` | `'Drag and drop files here'` | Text in the drop zone when no files are queued |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the root element |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `fileSelect` | `UploadSelectEvent` | Fired after each selection (picker or drag-and-drop) |
| `fileRemove` | `UploadRemoveEvent` | Fired when a single file is removed from the queue |
| `uploadClear` | `void` | Fired when the entire queue is cleared via Cancel |
| `uploadHandler` | `UploadHandlerEvent` | Fired in `customUpload` mode to hand off files for transport |

## Usage

```html
<!-- basic custom upload -->
<ui-lib-upload
  [multiple]="true"
  accept="image/*"
  [maxFileSize]="5000000"
  [customUpload]="true"
  (uploadHandler)="upload($event)"
/>

<!-- auto-upload on file selection -->
<ui-lib-upload [customUpload]="true" [auto]="true" (uploadHandler)="upload($event)" />
```
