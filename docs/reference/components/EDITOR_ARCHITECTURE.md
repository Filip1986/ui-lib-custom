# Editor Architecture and API Design

## Goal

Define a `ui-lib-editor` architecture that follows library conventions while delivering a native rich text editing baseline:
- standalone + `OnPush` + `ViewEncapsulation.None`
- signal-based inputs/outputs
- CVA compatibility for template-driven and reactive forms
- token-driven styling across `material`, `bootstrap`, and `minimal` variants
- no Quill/third-party runtime dependency

## Public API Surface

## Inputs (signal-based)

| Input | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Uses `ThemeConfigService.variant()` fallback when `null`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Host class drives size styles. |
| `placeholder` | `string` | `''` | Applied to `data-placeholder` on editable element. |
| `readonly` | `boolean` | `false` | Sets `contenteditable="false"` and disables toolbar actions. |
| `disabled` | `boolean` | `false` | Merged with CVA `setDisabledState`. |
| `filled` | `boolean` | `false` | Adds filled appearance host class. |
| `ariaLabel` | `string \| null` | `null` | Passed through to editable area. |
| `ariaLabelledBy` | `string \| null` | `null` | Passed through to editable area. |

## Outputs

| Output | Type | Emitted when |
| --- | --- | --- |
| `textChange` | `EditorTextChangeEvent` | Editable content changes from user or programmatic updates. |
| `selectionChange` | `EditorSelectionChangeEvent` | Browser selection changes inside the editor root. |

## Public methods

- `executeCommand(command: EditorCommand, value?: string): void`
  - Focuses editable area and executes `document.execCommand(command, false, value)`.
  - Exposed for projected custom toolbar usage.
- `getToolbarState(): EditorToolbarState`
  - Returns the current command/value state snapshot.
  - Same state is exposed reactively via `toolbarState` signal.

## Core Type Contracts

Source files:
- `projects/ui-lib-custom/src/lib/editor/editor.types.ts`
- `projects/ui-lib-custom/src/lib/editor/editor.constants.ts`

Key contracts:
- `EditorTextChangeEvent`
- `EditorSelectionChangeEvent`
- `EditorToolbarState`
- `EditorCommand`

## ControlValueAccessor Flow

`ui-lib-editor` stores value as HTML string.

- `writeValue(value)`
  - Sets `editorElement.innerHTML = value ?? ''`.
  - Triggers internal empty-state and toolbar-state refresh.
- `registerOnChange(fn)`
  - The editable `input` handler calls `fn(editorElement.innerHTML)`.
- `registerOnTouched(fn)`
  - `focusout` calls `fn()` when the editor loses focus.
- `setDisabledState(disabled)`
  - Updates effective disabled state, editable `contenteditable` attribute, and disabled host class.

## Toolbar State Tracking

State refresh sources:
- Document `selectionchange` (filtered to selections inside editor root)
- Editable `input`
- Command execution completion

State refresh logic:
- `document.queryCommandState()` for toggle commands:
  - `bold`, `italic`, `underline`, `strikeThrough`
  - `insertOrderedList`, `insertUnorderedList`
  - `justifyLeft`, `justifyCenter`, `justifyRight`, `justifyFull`
- `document.queryCommandValue()` for value commands:
  - `formatBlock` -> `toolbarState().blockFormat`
  - color values (`foreColor`, `backColor`) when needed for UI sync

Template bindings:
- Toolbar buttons bind active class to `toolbarState()` fields.
- Toggle buttons bind `aria-pressed` to same state fields.
- Heading select binds `[value]` to `toolbarState().blockFormat`.

## Toolbar Rendering Strategy

- Default toolbar is native HTML (`button` + `select`) in component template.
- Each control calls `executeCommand(...)`.
- Heading select change uses:
  - `executeCommand('formatBlock', '<h1>')`
  - `executeCommand('formatBlock', '<h2>')`
  - `executeCommand('formatBlock', '<h3>')`
  - `executeCommand('formatBlock', '<p>')`
- Groups are separated by `<span class="ui-lib-editor-toolbar-separator">`.
- Toggle buttons use `aria-pressed`; all controls use descriptive `aria-label`.
- If `[editorToolbar]` projected content exists, default toolbar is hidden with `@if (!hasCustomToolbar())`.
- Consumers can call `editor.executeCommand(...)` through template reference variable.

## Paste Handling

Editable area listens to `paste` and performs:
1. `event.preventDefault()`
2. Read `text/html` from clipboard
3. If HTML exists:
   - sanitize with `sanitizeHtml()`
   - insert with `document.execCommand('insertHTML', false, sanitizedHtml)`
4. Otherwise read `text/plain` and insert with:
   - `document.execCommand('insertText', false, plainText)`

Sanitization rules are editor-local (not in `core`) and remove dangerous tags plus event/style/class attributes.

## Placeholder and Empty-State Strategy

Placeholder remains CSS-driven:

```scss
.ui-lib-editor-content:empty::before {
  content: attr(data-placeholder);
}
```

Runtime details:
- Editable element gets `data-placeholder` from `placeholder()` input.
- Browsers often keep `<br>` for empty `contenteditable`; therefore component computes `isEmpty` using `textContent?.trim() === ''`.
- Host gets `ui-lib-editor--empty` class when computed empty state is true.

## Focus Management

- Editable `focusin` / `focusout` drives `focused` signal.
- Host class `ui-lib-editor--focused` controls focus ring styling.
- Toolbar button `mousedown` calls `event.preventDefault()` so clicks do not steal selection focus from editable content.

## Host Binding Strategy

A computed host class string includes:
- root class
- variant class (`ui-lib-editor--material`, `ui-lib-editor--bootstrap`, `ui-lib-editor--minimal`)
- size class (`ui-lib-editor--size-sm`, `ui-lib-editor--size-md`, `ui-lib-editor--size-lg`)
- state classes (`--disabled`, `--readonly`, `--focused`, `--filled`, `--empty`)

## CSS Variable Contract

## Toolbar tokens

- `--uilib-editor-toolbar-bg`
- `--uilib-editor-toolbar-border-color`
- `--uilib-editor-toolbar-item-color`
- `--uilib-editor-toolbar-item-hover-color`
- `--uilib-editor-toolbar-item-hover-bg`
- `--uilib-editor-toolbar-item-active-color`
- `--uilib-editor-toolbar-item-active-bg`
- `--uilib-editor-toolbar-separator-color`
- `--uilib-editor-toolbar-padding`
- `--uilib-editor-toolbar-gap`
- `--uilib-editor-toolbar-border-radius`

## Content tokens

- `--uilib-editor-content-bg`
- `--uilib-editor-content-border-color`
- `--uilib-editor-content-font-family`
- `--uilib-editor-content-font-size`
- `--uilib-editor-content-line-height`
- `--uilib-editor-content-color`
- `--uilib-editor-content-padding`
- `--uilib-editor-content-min-height`

## Shared/misc tokens

- `--uilib-editor-placeholder-color`
- `--uilib-editor-border-radius`
- `--uilib-editor-focus-ring-color`
- `--uilib-editor-focus-ring-width`
- `--uilib-editor-disabled-opacity`

## Variant default guidance

Default values are tokenized first in `design-tokens.ts`, then mapped to CSS vars:
- `material`: elevated/surface-first toolbar and stronger focus ring
- `bootstrap`: higher border contrast and slightly denser control chrome
- `minimal`: reduced chrome, lower shadow, neutral separators

## Deferred Features (Out of Scope for v1)

- Table insertion/editing
- Drag/drop file upload workflow
- Mention/autocomplete integrations
- Markdown shortcuts
- Source HTML view toggle
- Quill-like `formats` whitelist
- `maxLength` enforcement and character counter

## Utility Module Notes

`projects/ui-lib-custom/src/lib/editor/editor-sanitizer.ts` provides pure helpers:
- `sanitizeHtml(html: string): string`
- `stripHtmlTags(html: string): string`

Implementation uses `DOMParser`, tag stripping, and attribute filtering. It is intentionally editor-specific so other components are not coupled to rich-text sanitization behavior.

