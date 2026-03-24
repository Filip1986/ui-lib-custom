# Editor Component

## Overview

`EditorComponent` is a native rich-text editor built on browser `contenteditable` and command APIs.
It has no external editor runtime dependencies, supports projected custom toolbars, integrates with
Angular forms via `ControlValueAccessor`, and follows the library variant/size/token system.

**Import**

```typescript
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';
```

If you only use the default toolbar, `EditorToolbarDirective` is not required.

**Selector:** `ui-lib-editor`

**Location:** `projects/ui-lib-custom/src/lib/editor/editor.ts`

---

## Installation

No additional package installation is required.

1. Import `EditorComponent` from `ui-lib-custom/editor`.
2. Import `EditorToolbarDirective` only when you project a custom toolbar slot (`[editorToolbar]`).

```typescript
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';
```

---

## API

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant. Falls back to `ThemeConfigService.variant()` when `null`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls toolbar/content density and sizing. |
| `placeholder` | `string` | `''` | Placeholder text shown when editor is empty. |
| `readonly` | `boolean` | `false` | Prevents content editing and disables toolbar interactions. |
| `disabled` | `boolean` | `false` | Disables editor and toolbar, also supports CVA disabled state. |
| `filled` | `boolean` | `false` | Enables filled visual style. |
| `ariaLabel` | `string \| null` | `null` | Accessible label for content area. |
| `ariaLabelledBy` | `string \| null` | `null` | Associates content area with external label element id. |

### Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `textChange` | `EditorTextChangeEvent` | Emits whenever editor HTML/text changes. |
| `selectionChange` | `EditorSelectionChangeEvent` | Emits on `selectionchange` when selection is inside the editor. |

### Public Methods and State

| API | Type | Description |
| --- | --- | --- |
| `executeCommand(command, value?)` | `(command: EditorCommand, value?: string) => void` | Executes a native formatting command against the content area. |
| `getToolbarState()` | `() => EditorToolbarState` | Returns latest computed toolbar state snapshot. |
| `toolbarState` | `WritableSignal<EditorToolbarState>` | Reactive toolbar state for template bindings (active buttons, heading value). |

### Types

```typescript
export interface EditorTextChangeEvent {
  readonly htmlValue: string;
  readonly textValue: string;
  readonly originalEvent: Event | null;
}

export interface EditorSelectionChangeEvent {
  readonly selection: Selection | null;
  readonly originalEvent: Event;
}

export interface EditorToolbarState {
  readonly bold: boolean;
  readonly italic: boolean;
  readonly underline: boolean;
  readonly strikeThrough: boolean;
  readonly orderedList: boolean;
  readonly unorderedList: boolean;
  readonly alignLeft: boolean;
  readonly alignCenter: boolean;
  readonly alignRight: boolean;
  readonly alignJustify: boolean;
  readonly blockFormat: string;
}

export type EditorCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'insertOrderedList'
  | 'insertUnorderedList'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'justifyFull'
  | 'formatBlock'
  | 'createLink'
  | 'unlink'
  | 'insertImage'
  | 'removeFormat'
  | 'foreColor'
  | 'backColor'
  | 'insertHTML';
```

---

## CSS Variables

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-editor-toolbar-bg` | `var(--uilib-surface-alt, #f8fafc)` | Toolbar background. |
| `--uilib-editor-toolbar-border-color` | `var(--uilib-border, #d1d5db)` | Toolbar and host border color. |
| `--uilib-editor-toolbar-item-color` | `var(--uilib-page-fg, #111827)` | Toolbar item color. |
| `--uilib-editor-toolbar-item-hover-color` | `var(--uilib-page-fg, #0f172a)` | Toolbar item hover color. |
| `--uilib-editor-toolbar-item-hover-bg` | `color-mix(in srgb, #000000 8%, transparent)` | Toolbar item hover background. |
| `--uilib-editor-toolbar-item-active-color` | `var(--uilib-page-fg, #0f172a)` | Toolbar active item color. |
| `--uilib-editor-toolbar-item-active-bg` | `color-mix(in srgb, #000000 12%, transparent)` | Toolbar active item background. |
| `--uilib-editor-toolbar-separator-color` | `#cbd5e1` | Toolbar separator color. |
| `--uilib-editor-toolbar-padding` | `8px` | Toolbar padding. |
| `--uilib-editor-toolbar-gap` | `4px` | Toolbar item gap. |
| `--uilib-editor-toolbar-border-radius` | `8px` | Toolbar corner radius. |
| `--uilib-editor-content-bg` | `var(--uilib-surface, #ffffff)` | Content background. |
| `--uilib-editor-content-border-color` | `var(--uilib-border, #d1d5db)` | Content border color. |
| `--uilib-editor-content-font-family` | `var(--uilib-font-ui, system-ui, sans-serif)` | Content font family. |
| `--uilib-editor-content-font-size` | `14px` | Content font size. |
| `--uilib-editor-content-line-height` | `1.6` | Content line height. |
| `--uilib-editor-content-color` | `var(--uilib-page-fg, #111827)` | Content text color. |
| `--uilib-editor-content-padding` | `12px 16px` | Content padding. |
| `--uilib-editor-content-min-height` | `150px` | Content min height. |
| `--uilib-editor-placeholder-color` | `#94a3b8` | Placeholder color when content is empty. |
| `--uilib-editor-border-radius` | `8px` | Host border radius. |
| `--uilib-editor-focus-ring-color` | `color-mix(in srgb, #2563eb 45%, transparent)` | Focus ring color. |
| `--uilib-editor-focus-ring-width` | `2px` | Focus ring width. |
| `--uilib-editor-disabled-opacity` | `0.6` | Disabled state opacity. |

---

## Usage Examples

### Basic (`ngModel`)

```html
<ui-lib-editor
  [(ngModel)]="content"
  placeholder="Write your notes..."
  ariaLabel="Content editor"
></ui-lib-editor>

<pre>{{ content }}</pre>
```

### Custom Toolbar with `[editorToolbar]` and `executeCommand()`

```html
<ui-lib-editor #editor [(ngModel)]="content">
  <div editorToolbar>
    <button
      type="button"
      [attr.aria-pressed]="editor.toolbarState().bold"
      (mousedown)="$event.preventDefault()"
      (click)="editor.executeCommand('bold')"
    >
      Bold
    </button>

    <button
      type="button"
      [attr.aria-pressed]="editor.toolbarState().italic"
      (mousedown)="$event.preventDefault()"
      (click)="editor.executeCommand('italic')"
    >
      Italic
    </button>

    <select
      [value]="editor.toolbarState().blockFormat"
      (mousedown)="$event.preventDefault()"
      (change)="editor.executeCommand('formatBlock', ($event.target as HTMLSelectElement).value)"
    >
      <option value="p">Normal</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
    </select>
  </div>
</ui-lib-editor>
```

### Reactive Forms

```html
<form [formGroup]="form">
  <ui-lib-editor formControlName="body"></ui-lib-editor>
</form>
```

```typescript
form = new FormGroup({
  body: new FormControl<string | null>('', { validators: [Validators.required] }),
});
```

### Readonly

```html
<ui-lib-editor [readonly]="true" [ngModel]="readonlyContent"></ui-lib-editor>
```

### Variants and Sizes

```html
<ui-lib-editor variant="material" size="sm"></ui-lib-editor>
<ui-lib-editor variant="bootstrap" size="md"></ui-lib-editor>
<ui-lib-editor variant="minimal" size="lg"></ui-lib-editor>
```

---

## Custom Toolbar Guide

1. Import `EditorComponent` and `EditorToolbarDirective` from `ui-lib-custom/editor`.
2. Add a template reference variable to the editor (for example `#editor`).
3. Add a projected toolbar container with the `editorToolbar` attribute.
4. Add your custom buttons/select controls inside that container.
5. On custom controls, call `editor.executeCommand(...)`.
6. Bind visual active states to `editor.toolbarState()` (`aria-pressed`, heading selected value).
7. Use `(mousedown)="$event.preventDefault()"` on toolbar controls so focus stays in the editor.

---

## Paste Behavior

Pasted HTML is sanitized before insertion.

Sanitization removes:
- dangerous tags (`script`, `iframe`, `object`, `embed`, form tags, etc.)
- event-handler attributes (`on*`)
- dangerous URL protocols (for example `javascript:`)

Plain text paste is inserted via native `insertText` behavior.

---

## Keyboard Shortcuts

Because the editor uses native `contenteditable`, common browser shortcuts work automatically,
including:

- `Ctrl+B` (bold)
- `Ctrl+I` (italic)
- `Ctrl+U` (underline)
- `Ctrl+Z` (undo)
- `Ctrl+Y` (redo)

---

## Accessibility

- Toolbar container uses `role="toolbar"`.
- Editable content uses `role="textbox"` and `aria-multiline="true"`.
- `aria-label` / `aria-labelledby` are supported via inputs.
- Toggle buttons expose `aria-pressed`.
- Toolbar keyboard navigation follows native button/select tab behavior.

---

## Known Limitations

- `document.execCommand`/`queryCommand*` APIs are deprecated but still broadly supported.
- HTML output can vary slightly across browsers for equivalent formatting actions.
- Output format is HTML only (no Delta/structured rich-text model).
- Collaborative editing behavior is not included.

---

## Deferred Features

Planned/postponed capabilities:

- Table editing
- Drag-drop upload
- Mentions
- Markdown shortcuts
- Source view mode
- `maxLength`
- Explicit undo/redo toolbar buttons
- Subscript/superscript
- Indent/outdent
- Blockquote command
- Horizontal rule insertion

