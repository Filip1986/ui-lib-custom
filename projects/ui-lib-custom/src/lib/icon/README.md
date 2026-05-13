# Icon

**Selector:** `ui-lib-icon`
**Package:** `ui-lib-custom/icon`
**Content projection:** no — none

> `name` is required. Semantic icon names (e.g. `'close'`, `'chevron-right'`) are resolved to the active library at runtime via `IconService`; raw library-prefixed names (e.g. `'heroOutlineHome'`) bypass resolution and are passed through as-is.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `name` | `string \| SemanticIcon` | — | **Required.** Semantic icon name or raw library icon name |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size token resolved to an `em`-based value by `IconService` so icons scale with surrounding text |
| `color` | `string \| null` | `null` | Any CSS color value; applied as `--uilib-icon-color` on the host |
| `ariaLabel` | `string \| null` | `null` | Makes the icon informative by removing `aria-hidden`, setting `aria-label`, and setting `role="img"` |
| `library` | `IconLibrary \| null` | `null` | Override the active icon library for this instance |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Helps `IconService` choose variant-appropriate icons when resolving semantic names |
| `semantic` | `boolean` | `false` | Force semantic resolution even if the name does not match a known `SemanticIcon` |

## Outputs

_none_

## Usage

```html
<!-- Semantic icon (resolved from active library) -->
<ui-lib-icon name="chevron-right" size="md" />

<!-- Decorative icon inside a labeled control -->
<ui-lib-button ariaLabel="Close dialog" icon="close" />

<!-- Standalone informative icon -->
<ui-lib-icon name="alert-circle" ariaLabel="Warning" />
```

## Accessibility

- Decorative is the default: icons render with `aria-hidden="true"` and `tabindex="-1"`.
- Standalone informative icons must pass `ariaLabel`; the icon name is never used as the accessible name.
- For clickable actions, use `ui-lib-button` or `ui-lib-icon-button` so button semantics come from the control, not the icon.

## Size tokens

| Token | Rendered size |
|-------|---------------|
| `xs` | `0.75em` |
| `sm` | `0.875em` |
| `md` | `1em` |
| `lg` | `1.25em` |
| `xl` | `1.5em` |
| `2xl` | `2em` |

## Performance

- Icons are resolved from the already-registered `@ng-icons` bundle and rendered inline through `<ng-icon>`.
- No per-icon network request is made during render.
