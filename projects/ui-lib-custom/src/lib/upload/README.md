# Upload

**Selector:** `ui-lib-upload`
**Package:** `ui-lib-custom/upload`
**Content projection:** yes — four optional template slots via directives: `uiUploadHeader` (replaces toolbar), `uiUploadContent` (replaces drop zone + file list), `uiUploadEmpty` (replaces empty state), `uiUploadFile` (custom file-row rendering; context: `{ $implicit: UploadFileItem, index: number }`)

> The component does not perform HTTP uploads itself. You must set `[customUpload]="true"` and listen to `(uploadHandler)` to handle transport. Without `customUpload`, the Upload button emits `uploadHandler` but nothing actually sends the files.

## Inputs

| Name                      | Type                                     | Default                      | Notes                                                                             |
| ------------------------- | ---------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| `variant`                 | `'material' \| 'bootstrap' \| 'minimal'` | `'material'`                 | Design variant; note: no `null` fallback — defaults to `'material'`               |
| `size`                    | `'sm' \| 'md' \| 'lg'`                   | `'md'`                       | Size token                                                                        |
| `multiple`                | `boolean`                                | `false`                      | Allow selecting more than one file                                                |
| `accept`                  | `string`                                 | `''`                         | Passed directly to `<input accept>` (e.g. `'image/*'` or `'.pdf,.docx'`)          |
| `disabled`                | `boolean`                                | `false`                      | Disables all interaction                                                          |
| `auto`                    | `boolean`                                | `false`                      | Emits `uploadHandler` immediately after file selection (requires `customUpload`)  |
| `maxFileSize`             | `number \| null`                         | `null`                       | Max file size in bytes; `null` = no limit                                         |
| `fileLimit`               | `number \| null`                         | `null`                       | Max files in queue; `null` = no limit                                             |
| `chooseLabel`             | `string`                                 | `'Choose'`                   | Label for the Choose button                                                       |
| `uploadLabel`             | `string`                                 | `'Upload'`                   | Label for the Upload button                                                       |
| `cancelLabel`             | `string`                                 | `'Cancel'`                   | Label for the Cancel/clear button                                                 |
| `showUploadButton`        | `boolean`                                | `true`                       | Whether to show the Upload button                                                 |
| `showCancelButton`        | `boolean`                                | `true`                       | Whether to show the Cancel button                                                 |
| `customUpload`            | `boolean`                                | `false`                      | Must be `true` for `uploadHandler` to work; component never sends HTTP on its own |
| `previewWidth`            | `number`                                 | `50`                         | Width/height of image thumbnail previews in px                                    |
| `invalidFileSizeMessage`  | `string`                                 | template                     | `{0}` = filename, `{1}` = limit                                                   |
| `invalidFileTypeMessage`  | `string`                                 | template                     | `{0}` = filename, `{1}` = accepted types                                          |
| `invalidFileLimitMessage` | `string`                                 | template                     | `{0}` = limit                                                                     |
| `emptyMessage`            | `string`                                 | `'Drag and drop files here'` | Text in the drop zone when no files are queued                                    |
| `styleClass`              | `string \| null`                         | `null`                       | Extra CSS class on the root element                                               |

## Outputs

| Name            | Payload              | Notes                                                        |
| --------------- | -------------------- | ------------------------------------------------------------ |
| `fileSelect`    | `UploadSelectEvent`  | Fired after each selection (picker or drag-and-drop)         |
| `fileRemove`    | `UploadRemoveEvent`  | Fired when a single file is removed from the queue           |
| `uploadClear`   | `void`               | Fired when the entire queue is cleared via Cancel            |
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

## ARIA Attributes

| Element                | Attribute       | Value                                               | Notes                                                        |
| ---------------------- | --------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| Host `<ui-lib-upload>` | `class`         | `ui-lib-upload--<variant>`, `ui-lib-upload--<size>` | Variant and size modifiers                                   |
| Host `<ui-lib-upload>` | `class`         | `ui-lib-upload--disabled`                           | Applied when `[disabled]="true"`                             |
| Host `<ui-lib-upload>` | `class`         | `ui-lib-upload--drag-over`                          | Applied during an active drag-over                           |
| Toolbar `<div>`        | `role`          | `toolbar`                                           | Groups the action buttons                                    |
| Toolbar `<div>`        | `aria-label`    | `"Upload actions"`                                  | Announces the toolbar to screen readers                      |
| Choose button          | `aria-disabled` | `"true"`                                            | When file limit reached or `[disabled]="true"`               |
| Upload button          | `aria-disabled` | `"true"`                                            | When queue is empty or `[disabled]="true"`                   |
| Cancel button          | `aria-disabled` | `"true"`                                            | When queue is empty or `[disabled]="true"`                   |
| Toolbar icon SVGs      | `aria-hidden`   | `"true"`                                            | Decorative icons excluded from AT                            |
| Drop zone `<div>`      | `role`          | `region`                                            | Landmark for the drop/content area                           |
| Drop zone `<div>`      | `aria-label`    | `"File upload area"`                                | Visible label for the region landmark                        |
| Drop zone `<div>`      | `aria-disabled` | `"true"`                                            | Applied when `[disabled]="true"`                             |
| Hidden file `<input>`  | `aria-hidden`   | `"true"`                                            | Excluded from AT; keyboard access via Choose button          |
| Hidden file `<input>`  | `tabindex`      | `"-1"`                                              | Removed from tab order                                       |
| Hidden file `<input>`  | `id`            | `ui-lib-upload-input-N`                             | Unique per instance; referenced by visually-hidden `<label>` |
| Drag-status `<div>`    | `aria-live`     | `"polite"`                                          | Announces drag-enter/leave to screen readers                 |
| Drag-status `<div>`    | `aria-atomic`   | `"true"`                                            | Full message is announced on every change                    |
| File list `<ul>`       | `role`          | `list`                                              | Explicit list role for CSS `list-style: none` reset          |
| File list `<ul>`       | `aria-label`    | `"Files to upload"`                                 | Labels the file queue                                        |
| File item `<li>`       | `role`          | `listitem`                                          | Explicit list item role                                      |
| File icon SVG          | `aria-hidden`   | `"true"`                                            | Decorative file-type icon                                    |
| Remove button          | `aria-label`    | `"Remove <filename>"`                               | e.g. `"Remove report.pdf"`                                   |
| Remove icon SVG        | `aria-hidden`   | `"true"`                                            | Decorative icon                                              |
| Validation `<div>`     | `role`          | `alert`                                             | Immediately announces validation errors to AT                |
| Validation `<div>`     | `aria-live`     | `"assertive"`                                       | Interrupts current announcement for errors                   |
| Dismiss button         | `aria-label`    | `"Dismiss validation messages"`                     | Icon-only close button                                       |
| Dismiss icon SVG       | `aria-hidden`   | `"true"`                                            | Decorative icon                                              |

## Keyboard Interaction

| Key               | Target                  | Action                                                                     |
| ----------------- | ----------------------- | -------------------------------------------------------------------------- |
| `Tab`             | Any interactive element | Moves focus through Choose → Upload → Cancel → Remove buttons in DOM order |
| `Enter` / `Space` | Choose button           | Opens the OS file picker                                                   |
| `Enter` / `Space` | Upload button           | Emits `uploadHandler` (requires `[customUpload]="true"`)                   |
| `Enter` / `Space` | Cancel button           | Clears the file queue and emits `uploadClear`                              |
| `Enter` / `Space` | Remove button           | Removes that file from the queue and emits `fileRemove`                    |
| `Enter` / `Space` | Dismiss button (errors) | Dismisses the validation message panel                                     |

> Drag-and-drop is pointer-only. Keyboard users access all features through the toolbar buttons.

## CSS Custom Properties

All custom properties are defined on `.ui-lib-upload` and cascade to child elements. Override them on the host element or via a wrapper.

| Property                                     | Default                | Notes                                                       |
| -------------------------------------------- | ---------------------- | ----------------------------------------------------------- |
| `--uilib-upload-border-color`                | `#dee2e6`              | Outer border colour                                         |
| `--uilib-upload-border`                      | `1px solid …`          | Outer border shorthand                                      |
| `--uilib-upload-border-radius`               | `6px`                  | Outer corner radius                                         |
| `--uilib-upload-bg`                          | `#ffffff`              | Component background                                        |
| `--uilib-upload-fg`                          | `#1f2937`              | Primary text colour                                         |
| `--uilib-upload-secondary-fg`                | `#6b7280`              | Secondary text colour                                       |
| `--uilib-upload-transition`                  | `all 0.2s ease`        | Default transition (overridden by `prefers-reduced-motion`) |
| `--uilib-upload-header-bg`                   | `#f8f9fa`              | Toolbar / header background                                 |
| `--uilib-upload-header-padding`              | `0.75rem 1rem`         | Toolbar padding                                             |
| `--uilib-upload-toolbar-gap`                 | `0.5rem`               | Gap between toolbar buttons                                 |
| `--uilib-upload-content-padding`             | `1.5rem`               | Drop zone inner padding                                     |
| `--uilib-upload-drop-zone-min-height`        | `200px`                | Minimum height of the drop zone                             |
| `--uilib-upload-drop-zone-border`            | `2px dashed …`         | Drop zone border                                            |
| `--uilib-upload-drop-zone-drag-border-color` | `#3b82f6`              | Border colour while dragging                                |
| `--uilib-upload-drop-zone-drag-bg`           | `rgba(59,130,246,.04)` | Background tint while dragging                              |
| `--uilib-upload-file-list-gap`               | `0.5rem`               | Gap between file items                                      |
| `--uilib-upload-file-item-padding`           | `0.625rem 0.875rem`    | Padding inside each file row                                |
| `--uilib-upload-file-item-bg`                | `#f9fafb`              | File row background                                         |
| `--uilib-upload-file-item-border`            | `1px solid #e5e7eb`    | File row border                                             |
| `--uilib-upload-file-item-radius`            | `6px`                  | File row corner radius                                      |
| `--uilib-upload-file-name-color`             | `#1f2937`              | File name text colour                                       |
| `--uilib-upload-file-size-color`             | `#6b7280`              | File size text colour                                       |
| `--uilib-upload-file-remove-color`           | `#9ca3af`              | Remove icon default colour                                  |
| `--uilib-upload-file-remove-hover-color`     | `#ef4444`              | Remove icon hover colour                                    |
| `--uilib-upload-file-preview-size`           | `3rem`                 | Image thumbnail size (width & height)                       |
| `--uilib-upload-btn-choose-bg`               | `#3b82f6`              | Choose button background                                    |
| `--uilib-upload-btn-choose-fg`               | `#ffffff`              | Choose button foreground                                    |
| `--uilib-upload-btn-choose-hover-bg`         | `#2563eb`              | Choose button hover background                              |
| `--uilib-upload-btn-upload-bg`               | `#22c55e`              | Upload button background                                    |
| `--uilib-upload-btn-upload-fg`               | `#ffffff`              | Upload button foreground                                    |
| `--uilib-upload-btn-cancel-bg`               | `#ef4444`              | Cancel button background                                    |
| `--uilib-upload-btn-cancel-fg`               | `#ffffff`              | Cancel button foreground                                    |
| `--uilib-upload-messages-bg`                 | `#fef2f2`              | Error panel background                                      |
| `--uilib-upload-messages-fg`                 | `#b91c1c`              | Error panel text colour                                     |

## Accessibility

### Screen reader support

- The toolbar is a `role="toolbar"` landmark with `aria-label="Upload actions"`. All buttons inside are natively focusable with visible text labels.
- The drop zone is a `role="region"` landmark with `aria-label="File upload area"`. It is the primary interaction target for drag-and-drop.
- A visually-hidden `aria-live="polite"` region announces drag state changes (`"Files are over the drop zone"` on enter; cleared on leave or drop). Screen readers announce this without interrupting ongoing speech.
- Validation errors appear in a `role="alert"` / `aria-live="assertive"` container so they are announced immediately.
- Each file's remove button carries `aria-label="Remove <filename>"` so screen readers convey which file is being removed.
- All decorative SVG icons have `aria-hidden="true"`.
- The hidden `<input type="file">` has `aria-hidden="true"` and `tabindex="-1"`. Keyboard users interact exclusively through the labelled Choose button.
- Unique `id` attributes (e.g. `ui-lib-upload-input-0`) are generated per instance via a module-level counter, preventing ID collisions when multiple Upload components coexist on the page.

### Reduced motion

All CSS transitions inside `.ui-lib-upload` (drop-zone background/border, button hover, remove button colour, dismiss button opacity) are suppressed when `prefers-reduced-motion: reduce` is active.

### Drag-and-drop limitations

Drag-and-drop is a pointer enhancement only; all features remain fully accessible via keyboard using the Choose, Upload, Cancel, and per-file Remove buttons.
