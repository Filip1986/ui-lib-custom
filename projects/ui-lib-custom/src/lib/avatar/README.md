# Avatar

**Selector:** `ui-lib-avatar`
**Package:** `ui-lib-custom/avatar`
**Content projection:** yes — fallback slot rendered only when none of `image`, `label`, or `icon` is set

> Display priority is `image` > `label` > `icon` > projected content; unlike PrimeNG, content projection is a last-resort fallback, not the primary slot.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `image` | `string \| null` | `null` | URL of the image to display |
| `imageAlt` | `string` | `''` | Explicit alt text for image avatars. If omitted, Avatar falls back to `name`, then `label`, then `'Avatar'` |
| `name` | `string \| null` | `null` | Full name used for accessibility labels (recommended for initials/icon avatars) |
| `label` | `string \| null` | `null` | Text label (typically initials); shown when no image is set |
| `icon` | `string \| null` | `null` | CSS class string (e.g. `'pi pi-user'`); shown when neither image nor label is set |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls avatar dimensions via size tokens |
| `shape` | `'circle' \| 'square'` | `'circle'` | Border-radius style |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; inherits from `ThemeConfigService` when null |
| `styleClass` | `string \| null` | `null` | Additional CSS classes appended to the host element |
| `ariaLabel` | `string \| null` | `null` | Hard override for announced label |

### AvatarGroup Inputs (`ui-lib-avatar-group`)

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `ariaLabel` | `string \| null` | `null` | Accessible label for the avatar list container |
| `overflowCount` | `number` | `0` | Number shown in `+N` overflow indicator |
| `overflowAriaLabel` | `string \| null` | `null` | Custom SR text for overflow indicator announcement |

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

| Area | Behavior |
|------|----------|
| Avatar role | Standalone avatars use `role="img"` and a computed `aria-label` |
| Group role | `ui-lib-avatar-group` uses `role="list"` and avatars inside it become `role="listitem"` |
| Image alt fallback | `imageAlt` → `name` → `label` → `'Avatar'` |
| Icon + initials naming | Use `name` for full spoken names while keeping short visual labels |
| Decorative internals | Internal icon/image/initial spans are `aria-hidden="true"` |
| Overflow announcement | `+N` indicator is exposed as a `listitem` with an accessible label |

## Keyboard

Avatar and AvatarGroup are non-interactive display components and do not implement custom keyboard handlers.

## CSS Custom Properties

| Variable | Purpose |
|----------|---------|
| `--uilib-avatar-size-sm/md/lg` | Avatar dimensions |
| `--uilib-avatar-font-size-sm/md/lg` | Initials text size |
| `--uilib-avatar-icon-size-sm/md/lg` | Icon size |
| `--uilib-avatar-bg` / `--uilib-avatar-fg` | Avatar colors |
| `--uilib-avatar-border-width` / `--uilib-avatar-border-color` | Avatar border styling |
| `--uilib-avatar-group-overlap` | Horizontal overlap for stacked avatars |
| `--uilib-avatar-group-overflow-bg` / `--uilib-avatar-group-overflow-fg` | Overflow badge colors |
