# Avatar

**Selector:** `ui-lib-avatar`
**Package:** `ui-lib-custom/avatar`
**Content projection:** yes — fallback slot rendered only when none of `image`, `label`, or `icon` is set

> Display priority is `image` > `label` > `icon` > projected content; unlike PrimeNG, content projection is a last-resort fallback, not the primary slot.

## Inputs

| Name         | Type                                             | Default    | Notes                                                                                                       |
| ------------ | ------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------- |
| `image`      | `string \| null`                                 | `null`     | URL of the image to display                                                                                 |
| `imageAlt`   | `string`                                         | `''`       | Explicit alt text for image avatars. If omitted, Avatar falls back to `name`, then `label`, then `'Avatar'` |
| `name`       | `string \| null`                                 | `null`     | Full name used for accessibility labels (recommended for initials/icon avatars)                             |
| `label`      | `string \| null`                                 | `null`     | Text label (typically initials); shown when no image is set                                                 |
| `icon`       | `string \| null`                                 | `null`     | CSS class string (e.g. `'pi pi-user'`); shown when neither image nor label is set                           |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`     | Controls avatar dimensions via size tokens                                                                  |
| `shape`      | `'circle' \| 'square'`                           | `'circle'` | Border-radius style                                                                                         |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`     | Visual variant; inherits from `ThemeConfigService` when null                                                |
| `styleClass` | `string \| null`                                 | `null`     | Additional CSS classes appended to the host element                                                         |
| `ariaLabel`  | `string \| null`                                 | `null`     | Hard override for announced label                                                                           |

### AvatarGroup Inputs (`ui-lib-avatar-group`)

| Name                | Type             | Default | Notes                                              |
| ------------------- | ---------------- | ------- | -------------------------------------------------- |
| `ariaLabel`         | `string \| null` | `null`  | Accessible label for the avatar list container     |
| `overflowCount`     | `number`         | `0`     | Number shown in `+N` overflow indicator            |
| `overflowAriaLabel` | `string \| null` | `null`  | Custom SR text for overflow indicator announcement |

## Outputs

_none_

## Usage

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

## Accessibility

| Area                   | Behavior                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Avatar role            | Standalone avatars use `role="img"` and a computed `aria-label`                         |
| Group role             | `ui-lib-avatar-group` uses `role="list"` and avatars inside it become `role="listitem"` |
| Image alt fallback     | `imageAlt` → `name` → `label` → `'Avatar'`                                              |
| Icon + initials naming | Use `name` for full spoken names while keeping short visual labels                      |
| Decorative internals   | Internal icon/image/initial spans are `aria-hidden="true"`                              |
| Overflow announcement  | `+N` indicator is exposed as a `listitem` with an accessible label                      |

## Keyboard

Avatar and AvatarGroup are non-interactive display components and do not implement custom keyboard handlers.

## CSS Custom Properties

| Variable                           | Default                                                      | Description                                                             |
| ---------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `--uilib-avatar-size-sm`           | `2rem`                                                       | Avatar dimensions for `size="sm"`                                       |
| `--uilib-avatar-size-md`           | `2.5rem`                                                     | Avatar dimensions for `size="md"` (default)                             |
| `--uilib-avatar-size-lg`           | `3.5rem`                                                     | Avatar dimensions for `size="lg"`                                       |
| `--uilib-avatar-font-size-sm`      | `0.75rem`                                                    | Initials text size for `size="sm"`                                      |
| `--uilib-avatar-font-size-md`      | `1rem`                                                       | Initials text size for `size="md"`                                      |
| `--uilib-avatar-font-size-lg`      | `1.375rem`                                                   | Initials text size for `size="lg"`                                      |
| `--uilib-avatar-icon-size-sm`      | `1rem`                                                       | Icon size for `size="sm"`                                               |
| `--uilib-avatar-icon-size-md`      | `1.25rem`                                                    | Icon size for `size="md"`                                               |
| `--uilib-avatar-icon-size-lg`      | `1.75rem`                                                    | Icon size for `size="lg"`                                               |
| `--uilib-avatar-font-weight`       | `600`                                                        | Initials font weight                                                    |
| `--uilib-avatar-bg`                | `var(--uilib-color-primary-100)`                             | Avatar background color                                                 |
| `--uilib-avatar-fg`                | `var(--uilib-color-primary-700)`                             | Avatar foreground / initials color                                      |
| `--uilib-avatar-border-color`      | `var(--uilib-color-neutral-200)`                             | Border color                                                            |
| `--uilib-avatar-border-width`      | `0`                                                          | Border width (variants override this)                                   |
| `--uilib-avatar-radius`            | `var(--uilib-radius-full, 9999px)`                           | Border radius; overridden by `shape`                                    |
| `--uilib-avatar-mount-animation`   | `uilib-avatar-mount 0.15s cubic-bezier(0.4, 0, 0.2, 1) both` | Entrance animation; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-avatar-group-overlap`     | `0.5rem`                                                     | Negative margin creating stacking overlap in `AvatarGroup`              |
| `--uilib-avatar-group-overflow-bg` | `var(--uilib-color-neutral-200)`                             | Overflow `+N` badge background                                          |
| `--uilib-avatar-group-overflow-fg` | `var(--uilib-color-neutral-700)`                             | Overflow `+N` badge text color                                          |
