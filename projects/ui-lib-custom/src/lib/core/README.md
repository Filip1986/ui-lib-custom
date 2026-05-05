# core

**Selector:** utility — types, constants, and utility classes
**Package:** `ui-lib-custom/core`
**Content projection:** no — none

> This entry point is the single source of truth for cross-cutting types and constants. Never import from it using relative paths across entry points — always use the `ui-lib-custom/core` package path.

## Exports

### Types

| Name | Kind | Values |
|------|------|--------|
| `ThemeVariant` | type | `'material' \| 'bootstrap' \| 'minimal'` |
| `IconSize` | type | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` |
| `IconLibrary` | type | `'material' \| 'bootstrap' \| 'lucide' \| 'heroicons' \| 'tabler'` |
| `SharedSize` | type | `'sm' \| 'md' \| 'lg'` |
| `SharedThemeVariant` | type alias | same as `ThemeVariant` |
| `KeyboardKey` | type | union of named keyboard key strings |

### Constants

| Name | Kind | Notes |
|------|------|-------|
| `ICON_SIZES` | `Record<IconSize, string>` | Pixel/rem values for each icon size token |
| `SHARED_SIZES` | `as const` object | `{ Sm, Md, Lg }` |
| `SHARED_THEME_VARIANTS` | `as const` object | `{ Material, Bootstrap, Minimal }` |
| `SHARED_DEFAULTS` | `as const` object | `{ Size: 'md', Variant: 'material' }` |
| `SHARED_SIZE_OPTIONS` | `ReadonlyArray<SharedSize>` | Ordered array for stories/tests |
| `SHARED_VARIANT_OPTIONS` | `ReadonlyArray<SharedThemeVariant>` | Ordered array for stories/tests |
| `KEYBOARD_KEYS` | `as const` object | Named key constants (`ArrowDown`, `Enter`, `Escape`, etc.) |
| `OVERLAY_APPEND_TARGETS` | `as const` object | `{ Body: 'body', Self: 'self' }` |

### Utility classes / functions

| Name | Kind | Notes |
|------|------|-------|
| `FocusTrap` | class | Keyboard focus trap for overlay containers; call `activate()` / `deactivate()` |
| `resolveOverlayAppendTarget` | function | Resolves an `appendTo` string or `HTMLElement` to a concrete DOM node |
| `claimOverlayZIndex` | function | Assigns an incrementing z-index to an overlay panel |
| `releaseOverlayZIndex` | function | Removes the managed z-index from a panel |

## Usage

```typescript
import { SHARED_DEFAULTS, FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';

const trap = new FocusTrap(overlayElement);
trap.activate();
```
