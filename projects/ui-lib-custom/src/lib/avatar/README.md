# Avatar

**Selector:** `ui-lib-avatar`
**Package:** `ui-lib-custom/avatar`
**Content projection:** yes — fallback slot rendered only when none of `image`, `label`, or `icon` is set

> Display priority is `image` > `label` > `icon` > projected content; unlike PrimeNG, content projection is a last-resort fallback, not the primary slot.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `image` | `string \| null` | `null` | URL of the image to display |
| `imageAlt` | `string` | `'Avatar'` | Alt text for the image; also used as aria-label when an image is shown |
| `label` | `string \| null` | `null` | Text label (typically initials); shown when no image is set |
| `icon` | `string \| null` | `null` | CSS class string (e.g. `'pi pi-user'`); shown when neither image nor label is set |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls avatar dimensions via size tokens |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Border-radius style |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; inherits from `ThemeConfigService` when null |
| `styleClass` | `string \| null` | `null` | Additional CSS classes appended to the host element |
| `ariaLabel` | `string \| null` | `null` | Overrides the computed aria-label; falls back to `imageAlt` or `label` |

## Outputs

_none_

## Usage

```html
<!-- Image avatar -->
<ui-lib-avatar image="/assets/photo.jpg" shape="circle" />

<!-- Initials fallback -->
<ui-lib-avatar label="JD" size="lg" />

<!-- Icon fallback -->
<ui-lib-avatar icon="pi pi-user" shape="square" />
```
