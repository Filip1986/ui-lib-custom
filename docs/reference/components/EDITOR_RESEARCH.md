# Editor Research and Gap Analysis

## Scope

This document defines a v1 plan for `ui-lib-editor` (rich text editor) using native browser editing APIs (`contenteditable`, `document.execCommand`, `document.queryCommandState`, `document.queryCommandValue`) with no third-party editor runtime.

Inputs used:
- `AI_AGENT_CONTEXT.md`
- `LIBRARY_CONVENTIONS.md`
- `projects/ui-lib-custom/src/lib/select/select.ts` (CVA + host state baseline)
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.ts` (content projection + advanced form UX baseline)
- `projects/ui-lib-custom/src/lib/core/shared/constants.ts` (`KEYBOARD_KEYS`, shared variant/size defaults)
- `projects/ui-lib-custom/src/lib/theming/theme-config.service.ts` (variant fallback + CSS var theming flow)
- PrimeNG package evidence from `npm pack primeng@19` inspection:
  - `tmp_primeng/primeng-19.1.4/package/editor/editor.d.ts`
  - `tmp_primeng/primeng-19.1.4/package/editor/editor.interface.d.ts`
  - `tmp_primeng/primeng-19.1.4/package/fesm2022/primeng-editor.mjs`

## PrimeNG Feature Mapping

| Feature | PrimeNG API / Evidence | Priority | Notes for `ui-lib-editor` (native implementation) |
| --- | --- | --- | --- |
| Value binding (`ngModel`, `formControlName`) | `ControlValueAccessor` in `editor.d.ts`, `writeValue/registerOnChange/registerOnTouched` | P0 | Implement CVA over editable `div` `innerHTML`; model value remains HTML string. |
| Readonly mode | `readonly` input in `editor.d.ts` and Quill `disable/enable` calls in `primeng-editor.mjs` | P0 | Use `contenteditable="false"` when readonly and disable toolbar actions. |
| Placeholder | `placeholder` input in `editor.d.ts`; Quill placeholder config in `primeng-editor.mjs` | P0 | Use `data-placeholder` on editable element + `::before` when empty. |
| Default toolbar | Inline default toolbar markup in `primeng-editor.mjs` (header, bold, italic, underline, color, background, list, align, link, image, code block, clean) | P0 | Ship native `<button>/<select>` toolbar wired to `execCommand`. |
| Custom toolbar template | `p-header` projection / `headerTemplate` in `editor.d.ts` and template in `primeng-editor.mjs` | P0 | Provide content projection via `ng-content select="[editorToolbar]"`; expose `executeCommand()` public method for custom controls. |
| Text change event | `onTextChange` in `editor.d.ts`; Quill `text-change` handler in `primeng-editor.mjs` | P0 | Emit `textChange` from editable `input`/`beforeinput` pipeline with `{ htmlValue, textValue, source, originalEvent }`. |
| Selection change event | `onSelectionChange` in `editor.d.ts`; Quill `selection-change` handler in `primeng-editor.mjs` | P0 | Subscribe to `document` `selectionchange`; emit normalized range state when selection is inside editor root. |
| Init event | `onInit` output in `editor.d.ts`; emitted after editor setup in `primeng-editor.mjs` | P0 | Emit `init` from `afterNextRender` once editable element and toolbar wiring are ready. |
| Formats whitelist | `formats` input in `editor.d.ts` | P2 | Not directly equivalent without Quill format registry; can be approximated by sanitizing/normalizing output HTML and restricting toolbar commands. |
| Modules config | `modules` input in `editor.d.ts` | P2 | Not applicable to native editor (no module ecosystem). |
| Bounds | `bounds` input in `editor.d.ts` | P2 | Quill-specific tooltip bounds; no native counterpart for v1. |
| Scrolling container | `scrollingContainer` input in `editor.d.ts` | P2 | Quill-specific scrolling behavior; no direct native API need in v1. |
| Debug level | `debug` input in `editor.d.ts` | P2 | Quill-specific debug switch; omit in native editor. |
| Quill instance access (`getQuill`) | `getQuill()` in `editor.d.ts` | P2 | No third-party instance to expose; replace with explicit public methods (`focus`, `executeCommand`, `getHtml`, `setHtml`). |
| Value model includes Delta concepts | `EditorTextChangeEvent.delta` and Quill event signatures in `editor.interface.d.ts` / `primeng-editor.mjs` | P2 | Native model has no Delta; output HTML + plain text only. |
| Container style/styleClass passthrough | `style` and `styleClass` inputs in `editor.d.ts` | Divergence | Per library convention, avoid `style`/`styleClass` inputs; use host classes + CSS variable contract instead. |

## Native API Capabilities and Limitations Assessment

## `document.execCommand()` coverage needed for v1 default toolbar

Required commands:
- `bold`
- `italic`
- `underline`
- `strikeThrough`
- `insertOrderedList`
- `insertUnorderedList`
- `justifyLeft`
- `justifyCenter`
- `justifyRight`
- `justifyFull`
- `formatBlock` (for `h1`, `h2`, `h3`, `p`)
- `createLink`
- `unlink`
- `insertImage`
- `removeFormat`
- `foreColor`
- `backColor`
- `insertHTML` (code block insertion wrapper)

## `document.queryCommandState()` usage

Use for active/toggle state on:
- `bold`
- `italic`
- `underline`
- `strikeThrough`
- `insertOrderedList`
- `insertUnorderedList`
- `justifyLeft`
- `justifyCenter`
- `justifyRight`
- `justifyFull`

## `document.queryCommandValue()` usage

Use for value-based state on:
- `formatBlock` (expected values similar to `p`, `h1`, `h2`, `h3`)
- `foreColor`
- `backColor`

## Browser support and quirks

- `contenteditable` and query APIs are broadly available in current evergreen browsers.
- `execCommand` is deprecated but still widely implemented; v1 can rely on it with defensive guards.
- Known quirks to normalize around:
  - HTML output differs by browser (`<b>` vs `<strong>`, inline style color formats, list markup differences).
  - `formatBlock` behavior varies when selection spans mixed block types.
  - `insertImage` defaults to URL-based insertion and may produce weak UX without custom picker flow.
  - Selection/range can reset when toolbar buttons steal focus; command execution should preserve or restore range.

Mitigation plan:
- Normalize HTML on read/write (tag canonicalization + attribute cleanup).
- Keep a small sanitizer pipeline on paste and before emitting model changes.
- Maintain internal selection snapshot while interacting with toolbar controls.

## Reusable Infrastructure Assessment

| Area | Reusable from | Reuse plan for `ui-lib-editor` |
| --- | --- | --- |
| CVA contract | `select.ts`, `autocomplete.ts`, `checkbox.ts`, `date-picker.ts` patterns | Reuse explicit `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState` flow for HTML string value. |
| Variant resolution | `ThemeConfigService` + component fallback pattern (`variant() ?? themeConfig.variant()`) | Reuse for `material`/`bootstrap`/`minimal` host class resolution. |
| Shared sizes/defaults | `ui-lib-custom/core` `SHARED_SIZES`, `SHARED_DEFAULTS` | Reuse `sm`/`md`/`lg` input semantics and host modifiers. |
| Host class composition | `select.ts` and other signal-based components | Reuse computed host class approach for variant, size, disabled, readonly, filled, focused states. |
| Disabled/readonly behavior | Existing form components (`select`, `autocomplete`, `input`) | Reuse guards that prevent user interaction while preserving value rendering. |
| Keyboard constants | `KEYBOARD_KEYS` in `core/shared/constants.ts` | Reuse for Escape/Tab and navigation behavior around toolbar and editable surface. |

## New Infrastructure Required

| Item | Why needed | Placement |
| --- | --- | --- |
| HTML sanitizer utility | Strip dangerous tags and attributes on paste/model update (`<script>`, `<iframe>`, inline event handlers, javascript: URLs) | `projects/ui-lib-custom/src/lib/editor/` (editor-specific, not `core`) |
| Toolbar state tracker | Derive active command/value state via `queryCommandState` + `queryCommandValue` on `selectionchange` and editor input | `projects/ui-lib-custom/src/lib/editor/` |
| Public `executeCommand()` method | Enable custom projected toolbar to trigger native commands consistently | `UiLibEditor` public API |

## Proposed Feature Scope

## P0 (ship in v1)

- CVA binding for `ngModel` and reactive forms with HTML string value.
- Readonly mode (`contenteditable=false`) and disabled mode.
- Placeholder behavior via `data-placeholder` + empty-state pseudo-element.
- Default toolbar commands:
  - Heading select (`H1`, `H2`, `H3`, `Normal`)
  - Bold, italic, underline, strikethrough
  - Text color, background color
  - Ordered/unordered list
  - Alignment (`left`, `center`, `right`, `justify`)
  - Link, image (URL prompt), code block insertion, remove formatting
- Outputs: `textChange`, `selectionChange`, `init`.
- Variant/size/filled support with tokenized theming and CSS variable contract.
- Paste sanitization by default.
- Custom toolbar projection slot + command API for consumer-defined controls.

## P1 (near-term enhancement)

- `maxLength` enforcement and character counter.
- Native undo/redo toolbar actions.
- Additional formatting commands: subscript, superscript, indent, outdent, blockquote, horizontal rule.

## P2 (deferred)

- Table insertion/editing.
- Drag-and-drop file upload/image pipeline.
- Mention/autocomplete integration.
- Markdown shortcut parsing.
- Source HTML view toggle.
- Optional formats whitelist via stricter post-processing.

## Proposed CSS Variable Contract (`--uilib-editor-*`)

## Toolbar

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

## Content

- `--uilib-editor-content-bg`
- `--uilib-editor-content-border-color`
- `--uilib-editor-content-font-family`
- `--uilib-editor-content-font-size`
- `--uilib-editor-content-line-height`
- `--uilib-editor-content-color`
- `--uilib-editor-content-padding`
- `--uilib-editor-content-min-height`

## Misc

- `--uilib-editor-placeholder-color`
- `--uilib-editor-border-radius`
- `--uilib-editor-focus-ring-color`
- `--uilib-editor-focus-ring-width`
- `--uilib-editor-disabled-opacity`

## Accessibility Requirements

## Editable surface

- `role="textbox"`
- `aria-multiline="true"`
- pass-through support for `aria-label` and `aria-labelledby`
- `aria-readonly="true"` in readonly mode
- `aria-disabled="true"` in disabled mode

## Toolbar

- Wrapper uses `role="toolbar"` with default `aria-label="Formatting options"`.
- Toolbar controls use descriptive `aria-label` values.
- Toggle controls expose `aria-pressed` (`bold`, `italic`, `underline`, `strikeThrough`, list toggles, alignment toggles where applicable).

## Keyboard

- Toolbar buttons are standard `button` elements and remain Tab-navigable.
- Native editing shortcuts (`Ctrl+B`, `Ctrl+I`, `Ctrl+U`) work inside `contenteditable`.
- Escape behavior should be limited to component concerns (for example, closing link/image popups if implemented), not overriding browser editing semantics.

## Key Divergences from PrimeNG

- No Quill runtime dependency; implementation is native browser editing APIs.
- Value model is HTML string (plus derived plain text), not Quill Delta.
- Signal-based inputs/outputs (`input()`, `model()`, `output()`) following library conventions.
- Library-native visual inputs: `variant`, `size`, `filled`.
- No `style` or `styleClass` inputs; host classes and CSS variables are the styling extension path.
- Custom toolbar uses projected `ng-content select="[editorToolbar]"` and `executeCommand()` instead of Quill header templates.
- Supported variants: Material, Bootstrap, Minimal.
- Supported sizes: `sm`, `md`, `lg`.
- Omit Quill-only inputs (`modules`, `bounds`, `scrollingContainer`, `debug`) in v1.
- `formats` whitelist is deferred due required HTML post-processing complexity.
- Paste sanitization is built-in by default.

## Summary

`ui-lib-editor` is feasible as a native-first component in this architecture with strong reuse of CVA, host-state, and theming patterns already in the library. The main new work is editor-specific sanitization and robust toolbar-state synchronization around browser command APIs.

