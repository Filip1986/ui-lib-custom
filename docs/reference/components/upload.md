# Upload

**Selector:** `ui-lib-upload`
**Entry point:** `import { Upload } from 'ui-lib-custom/upload'`

---

## Overview

Advanced file upload component with drag-and-drop, multi-file support, image thumbnails, file validation, and three design variants. Use `customUpload="true"` and listen to `(uploadHandler)` to control the actual HTTP transport in the consuming application.

## API

### Inputs

| Name                      | Type           | Default                             | Description                                                                                                                                |
| ------------------------- | -------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `accept`                  | `string`       | `''`                                | Comma-separated list of accepted file types passed directly to the native `<input accept>` attribute (e.g. `'image/*'` or `'.pdf,.docx'`). |
| `auto`                    | `boolean`      | `false`                             | When `true`, triggers `uploadHandler` immediately after file selection (only effective when `customUpload` is also `true`).                |
| `cancelLabel`             | `string`       | `UPLOAD_DEFAULT_CANCEL_LABEL`       | Label for the "Cancel" button.                                                                                                             |
| `chooseLabel`             | `string`       | `UPLOAD_DEFAULT_CHOOSE_LABEL`       | Label for the "Choose" button.                                                                                                             |
| `customUpload`            | `boolean`      | `false`                             | When `true`, the component does not perform any upload itself. Instead it emits `(uploadHandler)` so the consumer can handle transport.    |
| `disabled`                | `boolean`      | `false`                             | Disable all interactions. Defaults to `false`.                                                                                             |
| `emptyMessage`            | `string`       | `UPLOAD_DEFAULT_EMPTY_MESSAGE`      | Text shown inside the drop zone when no files are queued.                                                                                  |
| `fileLimit`               | `number        | null`                               | `null`                                                                                                                                     | Maximum number of files that can be queued at once. `null` means no limit.     |
| `invalidFileLimitMessage` | `string`       | `UPLOAD_INVALID_FILE_LIMIT_MESSAGE` | Validation message template when the file limit is exceeded. `{0}` = limit.                                                                |
| `invalidFileSizeMessage`  | `string`       | `UPLOAD_INVALID_FILE_SIZE_MESSAGE`  | Validation message template for oversized files. `{0}` = name, `{1}` = limit.                                                              |
| `invalidFileTypeMessage`  | `string`       | `UPLOAD_INVALID_FILE_TYPE_MESSAGE`  | Validation message template for wrong file types. `{0}` = name, `{1}` = accepted types.                                                    |
| `maxFileSize`             | `number        | null`                               | `null`                                                                                                                                     | Maximum allowed file size in bytes. `null` means no limit.                     |
| `multiple`                | `boolean`      | `false`                             | Allow selecting more than one file at a time. Defaults to `false`.                                                                         |
| `previewWidth`            | `number`       | `UPLOAD_DEFAULT_PREVIEW_WIDTH`      | Width (and height) of image thumbnail previews in pixels.                                                                                  |
| `showCancelButton`        | `boolean`      | `true`                              | Whether to show the Cancel/clear button. Defaults to `true`.                                                                               |
| `showUploadButton`        | `boolean`      | `true`                              | Whether to show the Upload action button. Defaults to `true`.                                                                              |
| `size`                    | `UploadSize`   | `'md'`                              | Size token. Defaults to `'md'`.                                                                                                            |
| `styleClass`              | `string        | null`                               | `null`                                                                                                                                     | Additional CSS class applied to the root container element.                    |
| `uploadLabel`             | `string`       | `UPLOAD_DEFAULT_UPLOAD_LABEL`       | Label for the "Upload" button.                                                                                                             |
| `variant`                 | `UploadVariant | null`                               | `null`                                                                                                                                     | Design variant. Falls back to the global ThemeConfigService variant when null. |

### Outputs

| Name            | Type                 | Description                                                                                                  |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `fileRemove`    | `UploadRemoveEvent`  | Emitted when the user removes a single file from the queue.                                                  |
| `fileSelect`    | `UploadSelectEvent`  | Emitted whenever files are selected (via picker or drag-and-drop).                                           |
| `uploadClear`   | `void`               | Emitted when the entire queue is cleared via the Cancel button.                                              |
| `uploadHandler` | `UploadHandlerEvent` | Emitted in `customUpload` mode (or `auto + customUpload`) so the consumer can handle the actual HTTP upload. |

## Content Projection

_none_

## Theming

| CSS Variable                                 | Default                                        |
| -------------------------------------------- | ---------------------------------------------- |
| `--uilib-upload-bg`                          | `var(--uilib-surface-color, #ffffff)`          |
| `--uilib-upload-border`                      | `1px solid var(--uilib-upload-border-color)`   |
| `--uilib-upload-border-color`                | `var(--uilib-border-color, #dee2e6)`           |
| `--uilib-upload-border-radius`               | `var(--uilib-border-radius, 6px)`              |
| `--uilib-upload-btn-cancel-bg`               | `var(--uilib-danger-color, #ef4444)`           |
| `--uilib-upload-btn-cancel-fg`               | `#ffffff`                                      |
| `--uilib-upload-btn-cancel-hover-bg`         | `var(--uilib-danger-color-dark, #dc2626)`      |
| `--uilib-upload-btn-choose-bg`               | `var(--uilib-primary-color, #3b82f6)`          |
| `--uilib-upload-btn-choose-fg`               | `#ffffff`                                      |
| `--uilib-upload-btn-choose-hover-bg`         | `var(--uilib-primary-color-dark, #2563eb)`     |
| `--uilib-upload-btn-disabled-opacity`        | `0.5`                                          |
| `--uilib-upload-btn-font-size`               | `0.875rem`                                     |
| `--uilib-upload-btn-font-weight`             | `500`                                          |
| `--uilib-upload-btn-gap`                     | `0.375rem`                                     |
| `--uilib-upload-btn-padding`                 | `0.5rem 1rem`                                  |
| `--uilib-upload-btn-radius`                  | `var(--uilib-border-radius, 6px)`              |
| `--uilib-upload-btn-upload-bg`               | `var(--uilib-success-color, #22c55e)`          |
| `--uilib-upload-btn-upload-fg`               | `#ffffff`                                      |
| `--uilib-upload-btn-upload-hover-bg`         | `var(--uilib-success-color-dark, #16a34a)`     |
| `--uilib-upload-content-padding`             | `1.5rem`                                       |
| `--uilib-upload-drop-zone-bg`                | `var(--uilib-surface-color, #ffffff)`          |
| `--uilib-upload-drop-zone-border`            | `2px dashed var(--uilib-upload-border-color)`  |
| `--uilib-upload-drop-zone-drag-bg`           | `rgba(59, 130, 246, 0.04)`                     |
| `--uilib-upload-drop-zone-drag-border-color` | `var(--uilib-primary-color, #3b82f6)`          |
| `--uilib-upload-drop-zone-min-height`        | `200px`                                        |
| `--uilib-upload-empty-gap`                   | `0.5rem`                                       |
| `--uilib-upload-empty-hint-color`            | `var(--uilib-text-color-secondary, #9ca3af)`   |
| `--uilib-upload-empty-hint-font-size`        | `var(--uilib-font-size-sm, 0.8125rem)`         |
| `--uilib-upload-empty-icon-color`            | `var(--uilib-text-color-secondary, #9ca3af)`   |
| `--uilib-upload-empty-link-color`            | `var(--uilib-primary-color, #3b82f6)`          |
| `--uilib-upload-empty-link-font-size`        | `var(--uilib-font-size-sm, 0.8125rem)`         |
| `--uilib-upload-empty-message-font-size`     | `0.9375rem`                                    |
| `--uilib-upload-empty-text-color`            | `var(--uilib-text-color-secondary, #6b7280)`   |
| `--uilib-upload-fg`                          | `var(--uilib-text-color, #1f2937)`             |
| `--uilib-upload-file-icon-color`             | `var(--uilib-text-color-secondary, #6b7280)`   |
| `--uilib-upload-file-item-bg`                | `var(--uilib-surface-color-alt, #f9fafb)`      |
| `--uilib-upload-file-item-border`            | `1px solid var(--uilib-border-color, #e5e7eb)` |
| `--uilib-upload-file-item-gap`               | `0.75rem`                                      |
| `--uilib-upload-file-item-padding`           | `0.625rem 0.875rem`                            |
| `--uilib-upload-file-item-radius`            | `var(--uilib-border-radius, 6px)`              |
| `--uilib-upload-file-list-gap`               | `0.5rem`                                       |
| `--uilib-upload-file-name-color`             | `var(--uilib-text-color, #1f2937)`             |
| `--uilib-upload-file-name-font-size`         | `var(--uilib-font-size-sm, 0.875rem)`          |
| `--uilib-upload-file-preview-radius`         | `4px`                                          |
| `--uilib-upload-file-preview-size`           | `3rem`                                         |
| `--uilib-upload-file-remove-color`           | `var(--uilib-text-color-secondary, #9ca3af)`   |
| `--uilib-upload-file-remove-hover-color`     | `var(--uilib-danger-color, #ef4444)`           |
| `--uilib-upload-file-size-color`             | `var(--uilib-text-color-secondary, #6b7280)`   |
| `--uilib-upload-file-size-font-size`         | `var(--uilib-font-size-xs, 0.75rem)`           |
| `--uilib-upload-header-bg`                   | `var(--uilib-surface-color-alt, #f8f9fa)`      |
| `--uilib-upload-header-padding`              | `0.75rem 1rem`                                 |
| `--uilib-upload-message-font-size`           | `var(--uilib-font-size-sm, 0.8125rem)`         |
| `--uilib-upload-messages-bg`                 | `#fef2f2`                                      |
| `--uilib-upload-messages-border`             | `1px solid #fecaca`                            |
| `--uilib-upload-messages-close-color`        | `#b91c1c`                                      |
| `--uilib-upload-messages-fg`                 | `#b91c1c`                                      |
| `--uilib-upload-messages-padding`            | `0.75rem 1rem`                                 |
| `--uilib-upload-messages-radius`             | `var(--uilib-border-radius, 6px)`              |
| `--uilib-upload-secondary-fg`                | `var(--uilib-text-color-secondary, #6b7280)`   |
| `--uilib-upload-toolbar-gap`                 | `0.5rem`                                       |
| `--uilib-upload-transition`                  | `var(--uilib-transition-base, all 0.2s ease)`  |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                           |
| ---------------------------------------------------------- |
| Choose button has aria-disabled when component is disabled |
| Choose button is focusable (not removed from tab order)    |
| aria-live=                                                 |
| default state passes axe                                   |
| disabled state passes axe                                  |
| dismiss button has aria-label=                             |
| drag-over state passes axe                                 |
| drop zone does not have aria-disabled when enabled         |
| drop zone has role=                                        |
| drop zone sets aria-disabled when component is disabled    |
| each file item has role=                                   |
| file input has aria-hidden=                                |
| file input has tabindex=                                   |
| file list has role=                                        |
| live region announces when drag enters                     |
| remove button has aria-label=                              |
| remove button icons have aria-hidden=                      |
| remove buttons are focusable when files are present        |
| should apply material variant class by default             |
| should have role=list on the file list                     |
| should have role=region on the drop zone                   |
| should have role=toolbar on the toolbar                    |
| should set aria-label on file remove button                |
| toolbar buttons have aria-disabled when in disabled state  |
| toolbar has role=                                          |
| validation container has role=                             |
| with files queued passes axe                               |
| with validation messages passes axe                        |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#upload)
- [Demo page](/components/upload)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/upload/README.md)
