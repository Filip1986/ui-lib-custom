# Icon

**Selector:** `ui-lib-icon`
**Package:** `ui-lib-custom/icon`
**Content projection:** no — none

> `name` is required. Semantic icon names (e.g. `'close'`, `'chevron-right'`) are resolved to the active library at runtime via `IconService`; raw library-prefixed names (e.g. `'heroOutlineHome'`) bypass resolution and are passed through as-is.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `name` | `string \| SemanticIcon` | — | **Required.** Semantic icon name or raw library icon name |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token resolved to a pixel value by `IconService` |
| `color` | `string \| null` | `null` | Any CSS color value; applied as `--uilib-icon-color` on the host |
| `clickable` | `boolean` | `false` | Adds `role="button"`, `tabindex="0"`, and keyboard activation (Enter/Space) |
| `ariaLabel` | `string \| null` | `null` | Accessible label; defaults to `'Icon'` when `clickable` is true and no label is provided; decorative icons use `aria-hidden="true"` |
| `library` | `IconLibrary \| null` | `null` | Override the active icon library for this instance |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Helps `IconService` choose variant-appropriate icons when resolving semantic names |
| `semantic` | `boolean` | `false` | Force semantic resolution even if the name does not match a known `SemanticIcon` |

## Outputs

_none_

## Usage

```html
<!-- Semantic icon (resolved from active library) -->
<ui-lib-icon name="chevron-right" size="md" />

<!-- Clickable icon acting as a button -->
<ui-lib-icon name="close" [clickable]="true" ariaLabel="Close dialog" (click)="close()" />
```
