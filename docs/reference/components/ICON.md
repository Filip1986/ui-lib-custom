# Icon

Unified wrapper for Ng Icons with semantic names, variant-aware library selection, and token-aligned sizing.

## Import
```typescript
import { Icon } from 'ui-lib-custom';
```

## Usage
```html
<!-- Semantic name (preferred) -->
<ui-lib-icon name="search" />

<!-- Explicit size and color -->
<ui-lib-icon name="settings" size="lg" color="var(--uilib-color-primary)" />

<!-- Variant-aware: uses the icon library mapped for the variant -->
<ui-lib-icon name="menu" variant="material" />

<!-- Override library explicitly -->
<ui-lib-icon name="lucideHeart" library="lucide" />
```

## Inputs
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string \| SemanticIcon` | **required** | Semantic or concrete icon name |
| `size` | `IconSize` | `'md'` | Icon size (`xs`-`2xl`) |
| `color` | `string` | `currentColor` | CSS color value |
| `library` | `IconLibrary` | — | Force a specific library |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | — | Resolve icon based on component variant |
| `clickable` | `boolean` | `false` | Adds interactive affordance |
| `semantic` | `boolean` | `false` | Force treating `name` as semantic |

## Theming
- Respects `--uilib-icon-color`, falls back to `currentColor`.
- Sizes follow CSS vars: `--uilib-icon-size-xs` … `--uilib-icon-size-2xl`.

## Notes
- Semantic mappings live in `projects/ui-lib-custom/src/lib/icon/icon.semantics.ts`.
- Registered icons are provided via `provideUiLibIcons` or `provideIcons` from `@ng-icons/core`.
