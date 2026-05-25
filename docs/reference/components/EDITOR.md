# Editor

**Selector:** `ui-lib-editor`
**Entry point:** `import { Editor } from 'ui-lib-custom/editor'`

---

## Overview

Native rich text editor with default toolbar and content projection support.

## API

### Inputs

| Name             | Type                  | Default                       | Description |
| ---------------- | --------------------- | ----------------------------- | ----------- |
| `ariaLabel`      | `string | null`       | `null`                        | —           |
| `ariaLabelledBy` | `string | null`       | `null`                        | —           |
| `disabled`       | `boolean`             | `EDITOR_DEFAULTS.disabled`    | —           |
| `filled`         | `boolean`             | `EDITOR_DEFAULTS.filled`      | —           |
| `placeholder`    | `string`              | `EDITOR_DEFAULTS.placeholder` | —           |
| `readonly`       | `boolean`             | `EDITOR_DEFAULTS.readonly`    | —           |
| `size`           | `'sm' | 'md' | 'lg'`  | `EDITOR_DEFAULTS.size`        | —           |
| `variant`        | `ThemeVariant | null` | `EDITOR_DEFAULTS.variant`     | —           |

### Outputs

_none_

## Content Projection

| Selector          | Notes |
| ----------------- | ----- |
| `[editorToolbar]` | —     |

## Theming

| CSS Variable                               | Default                                        |
| ------------------------------------------ | ---------------------------------------------- |
| `--uilib-editor-content-bg`                | `color-mix(in srgb, #000000 16%, #0b1220)`     |
| `--uilib-editor-content-border-color`      | `color-mix(in srgb, #ffffff 22%, transparent)` |
| `--uilib-editor-content-color`             | `color-mix(in srgb, #ffffff 88%, #000000)`     |
| `--uilib-editor-focus-ring-color`          | `color-mix(in srgb, #60a5fa 55%, transparent)` |
| `--uilib-editor-placeholder-color`         | `color-mix(in srgb, #ffffff 46%, transparent)` |
| `--uilib-editor-toolbar-bg`                | `color-mix(in srgb, #ffffff 8%, transparent)`  |
| `--uilib-editor-toolbar-border-color`      | `color-mix(in srgb, #ffffff 18%, transparent)` |
| `--uilib-editor-toolbar-item-active-bg`    | `color-mix(in srgb, #ffffff 20%, transparent)` |
| `--uilib-editor-toolbar-item-active-color` | `#ffffff`                                      |
| `--uilib-editor-toolbar-item-color`        | `color-mix(in srgb, #ffffff 85%, #000000)`     |
| `--uilib-editor-toolbar-item-hover-bg`     | `color-mix(in srgb, #ffffff 14%, transparent)` |
| `--uilib-editor-toolbar-item-hover-color`  | `#ffffff`                                      |
| `--uilib-editor-toolbar-separator-color`   | `color-mix(in srgb, #ffffff 22%, transparent)` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                          |
| ------------------------------------------------------------------------- |
| applies variant, size, and filled classes                                 |
| exposes textbox semantics for contenteditable surface                     |
| exposes toolbar role and button pressed state semantics                   |
| focusout emits onTouched callback                                         |
| marks readonly and disabled aria attributes when state changes            |
| reflects ariaLabel and ariaLabelledBy and readonly aria state             |
| setDisabledState updates editable attribute and disabled class            |
| sets contenteditable false and disables toolbar controls                  |
| sets contenteditable false, disabled class, and disables toolbar controls |
| sets toolbar role and aria-pressed for toggle buttons                     |

## Usage Examples

```html
<!-- with ngModel -->
<ui-lib-editor [(ngModel)]="html" placeholder="Start typing..." />

<!-- readonly display with custom toolbar -->
<ui-lib-editor [readonly]="true" [ngModel]="html">
  <div editorToolbar><!-- custom toolbar buttons --></div>
</ui-lib-editor>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#editor)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/editor/README.md)

