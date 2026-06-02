# Button

**Selector:** `ui-lib-button`
**Package:** `ui-lib-custom/button`
**Content projection:** yes — button label text is normally projected as `<ng-content>` (`<ui-lib-button>Save</ui-lib-button>`). A `label` input is also accepted as a convenience for self-closing usage (`<ui-lib-button label="Save" />`); projected content takes precedence when both are present. There is no `clicked` output; use native `(click)` on the host.

## Architecture

The Button uses a **two-axis model**:

| Axis            | Input        | Controls                     |
| --------------- | ------------ | ---------------------------- |
| Visual style    | `appearance` | Shape, fill, border, effects |
| Colour semantic | `severity`   | Which palette is applied     |

Every appearance composes with every severity, giving you 12 × 9 = 108 combinations from a single component. Two orthogonal modifiers (`pill`, `raised`) overlay on top without conflicting with either axis.

## Inputs

### Content

| Name    | Type             | Default | Notes                                                                                                                                                                               |
| ------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label` | `string \| null` | `null`  | Convenience text rendered inside the button when no content is projected. Prefer projected content (`<ui-lib-button>Save</ui-lib-button>`); projected content wins if both are set. |

### Primary axes

| Name         | Type                                             | Default   | Notes                                             |
| ------------ | ------------------------------------------------ | --------- | ------------------------------------------------- |
| `appearance` | `ButtonAppearance`                               | `'solid'` | Visual style — see table below                    |
| `severity`   | `ButtonSeverity \| null`                         | `null`    | Colour role — defaults to `primary` when null     |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`    | Design system variant; falls back to global theme |

### Appearance values

| Value          | Visual effect                                                 |
| -------------- | ------------------------------------------------------------- |
| `solid`        | Filled background (default)                                   |
| `outline`      | Transparent fill, coloured border                             |
| `ghost`        | No border, no fill — hover reveals subtle bg                  |
| `soft`         | Low-opacity tinted fill — great for secondary actions         |
| `link`         | Hyperlink-style, no button chrome, underlined                 |
| `flat`         | Filled, no shadow, no border — maximum contrast               |
| `elevated`     | Filled with colour-matched drop shadow; lifts on hover        |
| `gradient`     | Two-tone diagonal gradient fill                               |
| `glass`        | Frosted glass with `backdrop-filter: blur`                    |
| `glass-shadow` | Frosted glass foreground with an offset gradient shadow layer |
| `neon`         | Outline with glow ring on hover                               |
| `tactile`      | 3D glossy gradient with inset highlight and press-down state  |

### Severity values

`'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'warning' | 'help' | 'danger' | 'contrast'`

`warn` is normalised to `warning` internally.

### Orthogonal modifiers

| Name     | Type      | Default | Notes                                        |
| -------- | --------- | ------- | -------------------------------------------- |
| `pill`   | `boolean` | `false` | Applies 999 px border-radius (capsule shape) |
| `raised` | `boolean` | `false` | Adds a drop shadow                           |

### Size & layout

| Name        | Type                   | Default | Notes                     |
| ----------- | ---------------------- | ------- | ------------------------- |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`  |                           |
| `fullWidth` | `boolean`              | `false` | Fills the container width |

### State

| Name           | Type                              | Default     | Notes                                                                                                                    |
| -------------- | --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `disabled`     | `boolean`                         | `false`     | Applies native `disabled` attribute — removes button from tab order entirely                                             |
| `softDisabled` | `boolean`                         | `false`     | Applies `aria-disabled="true"` without native disabled — button stays keyboard-discoverable; clicks are silently blocked |
| `loading`      | `boolean`                         | `false`     | Shows spinner; blocks interaction                                                                                        |
| `loadingIcon`  | `SemanticIcon \| string`          | `'spinner'` | Icon during loading                                                                                                      |
| `type`         | `'button' \| 'submit' \| 'reset'` | `'button'`  | Native button type                                                                                                       |

### Icon

| Name           | Type                                     | Default  | Notes                                        |
| -------------- | ---------------------------------------- | -------- | -------------------------------------------- |
| `icon`         | `SemanticIcon \| string \| null`         | `null`   | Icon name                                    |
| `iconPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |                                              |
| `iconOnly`     | `boolean`                                | `false`  | Hides label; must be paired with `ariaLabel` |

### Badge

| Name            | Type                       | Default    | Notes                                |
| --------------- | -------------------------- | ---------- | ------------------------------------ |
| `badge`         | `string \| number \| null` | `null`     | Counter overlaid on the button       |
| `badgeSeverity` | `BadgeSeverity`            | `'danger'` | Badge colour                         |
| `badgeClass`    | `string \| null`           | `null`     | Extra CSS class on the badge wrapper |

### ARIA & advanced

| Name           | Type              | Default | Notes                                                                                                                          |
| -------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `ariaLabel`    | `string \| null`  | `null`  | **Required** when `iconOnly` is `true`; also overrides the button's AT label during loading when no `loadingLabel` is provided |
| `loadingLabel` | `string \| null`  | `null`  | AT-only label announced while `loading` is `true` (e.g. `'Saving…'`). Falls back to `ariaLabel`, then `'Loading'`              |
| `ariaPressed`  | `boolean \| null` | `null`  | For toggle buttons — binds `aria-pressed`                                                                                      |
| `ariaChecked`  | `boolean \| null` | `null`  | For checkable roles                                                                                                            |
| `role`         | `string \| null`  | `null`  | ARIA role override                                                                                                             |
| `tabIndex`     | `number \| null`  | `null`  |                                                                                                                                |
| `shadow`       | `string \| null`  | `null`  | Inline value for `--uilib-button-shadow`                                                                                       |

### ARIA attribute mapping

| Scenario                                           | Bound attribute | Value                           |
| -------------------------------------------------- | --------------- | ------------------------------- |
| `iconOnly=true`, `ariaLabel="…"`                   | `aria-label`    | provided value                  |
| `iconOnly=true`, no `ariaLabel`                    | `aria-label`    | `'Button'` (fallback)           |
| `loading=true`, `loadingLabel="…"`                 | `aria-label`    | provided `loadingLabel`         |
| `loading=true`, no `loadingLabel`, `ariaLabel="…"` | `aria-label`    | provided `ariaLabel`            |
| `loading=true`, neither set                        | `aria-label`    | `'Loading'`                     |
| `loading=true`                                     | `aria-busy`     | `'true'`                        |
| `disabled=true` or `loading=true`                  | `aria-disabled` | `'true'`                        |
| `softDisabled=true`                                | `aria-disabled` | `'true'` (no native `disabled`) |
| `ariaPressed=true/false`                           | `aria-pressed`  | `'true'` / `'false'`            |

## Outputs

_none_ — use native `(click)` on the host element.

## Usage

```html
<!-- Minimal -->
<ui-lib-button>Save</ui-lib-button>

<!-- Two-axis: appearance + severity -->
<ui-lib-button appearance="outline" severity="danger" (click)="delete()">Delete</ui-lib-button>
<ui-lib-button appearance="soft" severity="success">Confirm</ui-lib-button>
<ui-lib-button appearance="ghost" severity="primary">Cancel</ui-lib-button>

<!-- Orthogonal modifiers compose with any appearance -->
<ui-lib-button appearance="outline" severity="primary" [pill]="true">Pill Outline</ui-lib-button>
<ui-lib-button appearance="solid" severity="primary" [raised]="true">Raised</ui-lib-button>
<ui-lib-button appearance="soft" severity="danger" [pill]="true" [raised]="true">
  Pill + Raised
</ui-lib-button>

<!-- Expressive styles -->
<ui-lib-button appearance="elevated" severity="primary" icon="layers">Elevated</ui-lib-button>
<ui-lib-button appearance="gradient" severity="primary">Gradient</ui-lib-button>
<ui-lib-button appearance="glass" severity="info" [pill]="true">Glass Pill</ui-lib-button>
<ui-lib-button appearance="glass-shadow">Glass Shadow</ui-lib-button>
<ui-lib-button appearance="neon" severity="success">Neon</ui-lib-button>
<ui-lib-button appearance="tactile" severity="primary" icon="search">Tactile</ui-lib-button>

<!-- Link style -->
<ui-lib-button appearance="link" severity="primary">Learn more</ui-lib-button>

<!-- States -->
<ui-lib-button [loading]="isSaving" severity="success" loadingLabel="Saving…" (click)="save()"
  >Save</ui-lib-button
>
<ui-lib-button [disabled]="true" severity="primary"
  >Disabled (removed from tab order)</ui-lib-button
>
<ui-lib-button [softDisabled]="true" severity="primary"
  >Soft Disabled (keyboard-discoverable)</ui-lib-button
>

<!-- Icon-only (ariaLabel required) -->
<ui-lib-button icon="trash" [iconOnly]="true" severity="danger" ariaLabel="Delete item" />

<!-- Sizes -->
<ui-lib-button size="sm" severity="primary">Small</ui-lib-button>
<ui-lib-button size="md" severity="primary">Medium</ui-lib-button>
<ui-lib-button size="lg" severity="primary">Large</ui-lib-button>
```

## CSS Custom Properties

All tokens are set on the `ui-lib-button` host element and cascade to child selectors. Override at any scope: `:root` for global, a component selector for local, or inline `style` for one-off instances.

### Core tokens

| Variable                          | Default                        | Description                                                                  |
| --------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `--uilib-button-radius`           | `var(--uilib-shape-base, 6px)` | Border radius                                                                |
| `--uilib-button-gap`              | `var(--uilib-space-2, 0.5rem)` | Gap between icon and label                                                   |
| `--uilib-button-transition`       | `all 0.2s ease`                | Hover/active transition; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-button-border-width`     | `1px`                          | Border thickness                                                             |
| `--uilib-button-text-transform`   | `none`                         | Text casing (`uppercase`, `capitalize`, etc.)                                |
| `--uilib-button-letter-spacing`   | `normal`                       | Letter spacing                                                               |
| `--uilib-button-disabled-opacity` | `0.5`                          | Opacity of the disabled state                                                |

### Focus ring tokens

| Variable                          | Default                                          | Description                            |
| --------------------------------- | ------------------------------------------------ | -------------------------------------- |
| `--uilib-button-focus-color`      | `var(--uilib-color-primary-500)`                 | Focus ring inner colour                |
| `--uilib-button-focus-ring-color` | `var(--uilib-color-primary-100)`                 | Focus ring halo colour                 |
| `--uilib-button-focus-ring`       | `0 0 0 3px var(--uilib-button-focus-ring-color)` | Full `box-shadow` value for focus ring |

### Shadow tokens

| Variable                             | Default                        | Description                        |
| ------------------------------------ | ------------------------------ | ---------------------------------- |
| `--uilib-button-shadow`              | `var(--uilib-shadow-sm, none)` | Resting shadow                     |
| `--uilib-button-shadow-hover`        | `var(--uilib-shadow-md, …)`    | Hover shadow                       |
| `--uilib-button-shadow-raised`       | `var(--uilib-shadow-md, none)` | Shadow when `raised` is true       |
| `--uilib-button-shadow-raised-hover` | `var(--uilib-shadow-lg, none)` | Hover shadow when `raised` is true |

### Size padding tokens

| Variable                          | Default                         | Description                        |
| --------------------------------- | ------------------------------- | ---------------------------------- |
| `--uilib-button-padding-y-small`  | `var(--uilib-space-1, 0.25rem)` | Vertical padding for `size="sm"`   |
| `--uilib-button-padding-x-small`  | `var(--uilib-space-3, 0.75rem)` | Horizontal padding for `size="sm"` |
| `--uilib-button-padding-y-medium` | `var(--uilib-space-2, 0.5rem)`  | Vertical padding for `size="md"`   |
| `--uilib-button-padding-x-medium` | `var(--uilib-space-4, 1rem)`    | Horizontal padding for `size="md"` |
| `--uilib-button-padding-y-large`  | `var(--uilib-space-3, 0.75rem)` | Vertical padding for `size="lg"`   |
| `--uilib-button-padding-x-large`  | `var(--uilib-space-5, 1.25rem)` | Horizontal padding for `size="lg"` |

### Badge overlay tokens

| Variable                         | Default                        | Description                         |
| -------------------------------- | ------------------------------ | ----------------------------------- |
| `--uilib-button-badge-offset-x`  | `var(--uilib-space-2)`         | Horizontal badge offset from corner |
| `--uilib-button-badge-offset-y`  | `var(--uilib-space-2)`         | Vertical badge offset from corner   |
| `--uilib-button-badge-radius`    | `var(--uilib-shape-base, 6px)` | Badge border radius                 |
| `--uilib-button-badge-font-size` | `var(--uilib-font-size-sm)`    | Badge font size                     |

## Composability

Button composes cleanly with the following library components:

### With ButtonGroup

```html
<ui-lib-button-group>
  <ui-lib-button appearance="outline" severity="primary">Left</ui-lib-button>
  <ui-lib-button appearance="outline" severity="primary">Center</ui-lib-button>
  <ui-lib-button appearance="outline" severity="primary">Right</ui-lib-button>
</ui-lib-button-group>
```

### With SplitButton

```html
<ui-lib-split-button label="Save" (click)="save()" [model]="splitItems" />
```

### Custom theming via CSS tokens

```css
/* Brand override — all buttons in the app */
:root {
  --uilib-button-radius: 2px; /* sharp corners */
  --uilib-button-text-transform: uppercase;
  --uilib-button-letter-spacing: 0.05em;
}

/* Override only inside a specific container */
.sidebar {
  --uilib-button-padding-x-medium: 0.75rem;
  --uilib-button-gap: 0.375rem;
}
```

### Inside a form (submit button pattern)

```html
<form (ngSubmit)="submit()">
  <!-- form fields … -->
  <ui-lib-button
    type="submit"
    severity="primary"
    [loading]="isSubmitting"
    loadingLabel="Submitting…"
    [disabled]="form.invalid"
  >
    Submit
  </ui-lib-button>
</form>
```
