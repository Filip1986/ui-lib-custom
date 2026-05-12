# Button

**Selector:** `ui-lib-button`
**Package:** `ui-lib-custom/button`
**Content projection:** yes — button label text is projected as `<ng-content>`. There is no `label` input and no `clicked` output; use native `(click)` on the host.

## Architecture

The Button uses a **two-axis model**:

| Axis | Input | Controls |
|------|-------|----------|
| Visual style | `appearance` | Shape, fill, border, effects |
| Colour semantic | `severity` | Which palette is applied |

Every appearance composes with every severity, giving you 12 × 9 = 108 combinations from a single component. Two orthogonal modifiers (`pill`, `raised`) overlay on top without conflicting with either axis.

## Inputs

### Primary axes

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `appearance` | `ButtonAppearance` | `'solid'` | Visual style — see table below |
| `severity` | `ButtonSeverity \| null` | `null` | Colour role — defaults to `primary` when null |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Design system variant; falls back to global theme |

### Appearance values

| Value | Visual effect |
|-------|--------------|
| `solid` | Filled background (default) |
| `outline` | Transparent fill, coloured border |
| `ghost` | No border, no fill — hover reveals subtle bg |
| `soft` | Low-opacity tinted fill — great for secondary actions |
| `link` | Hyperlink-style, no button chrome, underlined |
| `flat` | Filled, no shadow, no border — maximum contrast |
| `elevated` | Filled with colour-matched drop shadow; lifts on hover |
| `gradient` | Two-tone diagonal gradient fill |
| `glass` | Frosted glass with `backdrop-filter: blur` |
| `glass-shadow` | Frosted glass foreground with an offset gradient shadow layer |
| `neon` | Outline with glow ring on hover |
| `tactile` | 3D glossy gradient with inset highlight and press-down state |

### Severity values

`'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'warning' | 'help' | 'danger' | 'contrast'`

`warn` is normalised to `warning` internally.

### Orthogonal modifiers

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `pill` | `boolean` | `false` | Applies 999 px border-radius (capsule shape) |
| `raised` | `boolean` | `false` | Adds a drop shadow |

### Size & layout

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `fullWidth` | `boolean` | `false` | Fills the container width |

### State

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `disabled` | `boolean` | `false` | Applies native `disabled` attribute — removes button from tab order entirely |
| `softDisabled` | `boolean` | `false` | Applies `aria-disabled="true"` without native disabled — button stays keyboard-discoverable; clicks are silently blocked |
| `loading` | `boolean` | `false` | Shows spinner; blocks interaction |
| `loadingIcon` | `SemanticIcon \| string` | `'spinner'` | Icon during loading |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |

### Icon

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `icon` | `SemanticIcon \| string \| null` | `null` | Icon name |
| `iconPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | |
| `iconOnly` | `boolean` | `false` | Hides label; must be paired with `ariaLabel` |

### Badge

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `badge` | `string \| number \| null` | `null` | Counter overlaid on the button |
| `badgeSeverity` | `BadgeSeverity` | `'danger'` | Badge colour |
| `badgeClass` | `string \| null` | `null` | Extra CSS class on the badge wrapper |

### ARIA & advanced

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `ariaLabel` | `string \| null` | `null` | **Required** when `iconOnly` is `true`; also overrides the button's AT label during loading when no `loadingLabel` is provided |
| `loadingLabel` | `string \| null` | `null` | AT-only label announced while `loading` is `true` (e.g. `'Saving…'`). Falls back to `ariaLabel`, then `'Loading'` |
| `ariaPressed` | `boolean \| null` | `null` | For toggle buttons — binds `aria-pressed` |
| `ariaChecked` | `boolean \| null` | `null` | For checkable roles |
| `role` | `string \| null` | `null` | ARIA role override |
| `tabIndex` | `number \| null` | `null` | |
| `shadow` | `string \| null` | `null` | Inline value for `--uilib-button-shadow` |

### ARIA attribute mapping

| Scenario | Bound attribute | Value |
|----------|-----------------|-------|
| `iconOnly=true`, `ariaLabel="…"` | `aria-label` | provided value |
| `iconOnly=true`, no `ariaLabel` | `aria-label` | `'Button'` (fallback) |
| `loading=true`, `loadingLabel="…"` | `aria-label` | provided `loadingLabel` |
| `loading=true`, no `loadingLabel`, `ariaLabel="…"` | `aria-label` | provided `ariaLabel` |
| `loading=true`, neither set | `aria-label` | `'Loading'` |
| `loading=true` | `aria-busy` | `'true'` |
| `disabled=true` or `loading=true` | `aria-disabled` | `'true'` |
| `softDisabled=true` | `aria-disabled` | `'true'` (no native `disabled`) |
| `ariaPressed=true/false` | `aria-pressed` | `'true'` / `'false'` |

## Outputs

_none_ — use native `(click)` on the host element.

## Usage

```html
<!-- Minimal -->
<ui-lib-button>Save</ui-lib-button>

<!-- Two-axis: appearance + severity -->
<ui-lib-button appearance="outline" severity="danger" (click)="delete()">Delete</ui-lib-button>
<ui-lib-button appearance="soft"    severity="success">Confirm</ui-lib-button>
<ui-lib-button appearance="ghost"   severity="primary">Cancel</ui-lib-button>

<!-- Orthogonal modifiers compose with any appearance -->
<ui-lib-button appearance="outline" severity="primary" [pill]="true">Pill Outline</ui-lib-button>
<ui-lib-button appearance="solid"   severity="primary" [raised]="true">Raised</ui-lib-button>
<ui-lib-button appearance="soft"    severity="danger"  [pill]="true" [raised]="true">
  Pill + Raised
</ui-lib-button>

<!-- Expressive styles -->
<ui-lib-button appearance="elevated" severity="primary" icon="layers">Elevated</ui-lib-button>
<ui-lib-button appearance="gradient" severity="primary">Gradient</ui-lib-button>
<ui-lib-button appearance="glass"    severity="info"   [pill]="true">Glass Pill</ui-lib-button>
<ui-lib-button appearance="glass-shadow">Glass Shadow</ui-lib-button>
<ui-lib-button appearance="neon"     severity="success">Neon</ui-lib-button>
<ui-lib-button appearance="tactile"  severity="primary" icon="search">Tactile</ui-lib-button>

<!-- Link style -->
<ui-lib-button appearance="link" severity="primary">Learn more</ui-lib-button>

<!-- States -->
<ui-lib-button [loading]="isSaving" severity="success" loadingLabel="Saving…" (click)="save()">Save</ui-lib-button>
<ui-lib-button [disabled]="true" severity="primary">Disabled (removed from tab order)</ui-lib-button>
<ui-lib-button [softDisabled]="true" severity="primary">Soft Disabled (keyboard-discoverable)</ui-lib-button>

<!-- Icon-only (ariaLabel required) -->
<ui-lib-button icon="trash" [iconOnly]="true" severity="danger" ariaLabel="Delete item" />

<!-- Sizes -->
<ui-lib-button size="sm" severity="primary">Small</ui-lib-button>
<ui-lib-button size="md" severity="primary">Medium</ui-lib-button>
<ui-lib-button size="lg" severity="primary">Large</ui-lib-button>
```
