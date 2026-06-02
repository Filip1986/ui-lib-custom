# Avatar

**Selector:** `ui-lib-avatar`
**Entry point:** `import { Avatar } from 'ui-lib-custom/avatar'`

---

## Overview

Avatar - Represents a person or object with an image, initials, or icon. Supports three display modes (image, label, icon) with three shapes and sizes. Falls back to content projection when no display mode is active.

## API

### Inputs

| Name         | Type           | Default    | Description                    |
| ------------ | -------------- | ---------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| `ariaLabel`  | `string        | null`      | `null`                         | Accessible label override for the avatar                                           |
| `icon`       | `string        | null`      | `null`                         | CSS class string for an icon (e.g. "pi pi-user") to display when no image or label |
| `image`      | `string        | null`      | `null`                         | URL of the image to display                                                        |
| `imageAlt`   | `string`       | `''`       | Alternative text for the image |
| `label`      | `string        | null`      | `null`                         | Text label (typically initials) to display when no image is provided               |
| `name`       | `string        | null`      | `null`                         | Full name announced by assistive technologies                                      |
| `shape`      | `AvatarShape`  | `'circle'` | Shape of the avatar            |
| `size`       | `AvatarSize`   | `'md'`     | Size of the avatar             |
| `styleClass` | `string        | null`      | `null`                         | Additional CSS classes to apply                                                    |
| `variant`    | `AvatarVariant | null`      | `null`                         | Visual variant - inherits from ThemeConfigService when not set                     |

### Outputs

_none_

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                  | Default                                   |
| ----------------------------- | ----------------------------------------- |
| `--uilib-avatar-bg`           | `var(--uilib-color-primary-100, #dbeafe)` |
| `--uilib-avatar-border-color` | `var(--uilib-color-neutral-200, #e5e7eb)` |
| `--uilib-avatar-border-width` | `0`                                       |
| `--uilib-avatar-fg`           | `var(--uilib-color-primary-700, #1d4ed8)` |
| `--uilib-avatar-font-size`    | `var(--uilib-avatar-font-size-md)`        |
| `--uilib-avatar-font-size-lg` | `1.375rem`                                |
| `--uilib-avatar-font-size-md` | `1rem`                                    |
| `--uilib-avatar-font-size-sm` | `0.75rem`                                 |
| `--uilib-avatar-icon-size`    | `var(--uilib-avatar-icon-size-md)`        |
| `--uilib-avatar-icon-size-lg` | `1.75rem`                                 |
| `--uilib-avatar-icon-size-md` | `1.25rem`                                 |
| `--uilib-avatar-icon-size-sm` | `1rem`                                    |
| `--uilib-avatar-radius`       | `50%`                                     |
| `--uilib-avatar-size`         | `var(--uilib-avatar-size-md)`             |
| `--uilib-avatar-size-lg`      | `3.5rem`                                  |
| `--uilib-avatar-size-md`      | `2.5rem`                                  |
| `--uilib-avatar-size-sm`      | `2rem`                                    |

## Accessibility

**APG pattern:** Decorative — no APG pattern

### Keyboard Interactions

| Test description                                         |
| -------------------------------------------------------- |
| allows ariaLabel override on icon avatars                |
| announces overflow with an accessible listitem label     |
| applies aria-label from ariaLabel input                  |
| applies aria-label from imageAlt when image is set       |
| applies aria-label from label when no ariaLabel override |
| applies aria-label to group                              |
| applies role=                                            |
| applies variant class when explicit variant is given     |
| ensures icon avatars have an aria-label                  |
| passes axe for avatar group with overflow indicator      |
| passes axe for default initials avatar                   |
| passes axe for image avatar with computed alt            |
| renders avatar groups as role=                           |
| uses name for initials aria-labels                       |
| uses role=                                               |

## Usage Examples

```html
<!-- Image avatar -->
<ui-lib-avatar image="/assets/photo.jpg" imageAlt="Jane Doe portrait" shape="circle" />

<!-- Initials fallback -->
<ui-lib-avatar label="JD" name="Jane Doe" size="lg" />

<!-- Icon fallback -->
<ui-lib-avatar icon="pi pi-user" name="Guest user" shape="square" />

<!-- Group + overflow -->
<ui-lib-avatar-group ariaLabel="Project team" [overflowCount]="3">
  <ui-lib-avatar label="JD" name="Jane Doe" />
  <ui-lib-avatar label="AB" name="Alex Brown" />
</ui-lib-avatar-group>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#avatar)
- [Demo page](/components/avatar)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/avatar/README.md)
