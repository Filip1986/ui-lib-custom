# Button Component

## Overview

A flexible, themeable button built with standalone + OnPush + signal-based inputs. Supports multiple variants, appearances, sizes, severities, icons, badges, and loading states.

**Import**
```typescript
import { Button } from 'ui-lib-custom/button';
```

**Location:** `projects/ui-lib-custom/src/lib/button/button.ts`

---

## Features

- ✅ Signal-powered inputs for reactive updates.
- 🎨 CSS variable theming with design-token fallbacks.
- ♿ Accessibility-friendly defaults (focus-visible, ARIA support).
- 🧪 Component is unit-test friendly (no extra wrappers).
- 🧩 Supports icons, badges, groups, and loading state.
- 🎛️ Variants: material, bootstrap, minimal.
- 🎯 Severities: primary, secondary, success, info, warning, help, danger, contrast.

---

## Usage
```typescript
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button color="primary">Click me</ui-lib-button>`
})
export class Example {}
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | `'material'` | Visual style. |
| `appearance` | `ButtonAppearance` | `'solid'` | Base fill style. |
| `size` | `ButtonSize` | `'medium'` | Button size. |
| `color` | `ButtonColor` | `'primary'` | Severity alias (used if `severity` is null). |
| `severity` | `ButtonSeverity \| null` | `null` | Preferred color token (overrides `color`). |
| `type` | `ButtonType` | `'button'` | Native button type. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `loading` | `boolean` | `false` | Loading state (disables the button). |
| `fullWidth` | `boolean` | `false` | Stretch to container width. |
| `icon` | `SemanticIcon \| string \| null` | `null` | Icon name. |
| `iconPosition` | `IconPosition` | `'left'` | Icon placement. |
| `iconOnly` | `boolean \| null` | `null` | Icon-only styling (explicit). |
| `iconOnlyInput` | `boolean` | `false` | Icon-only styling (legacy input). |
| `shadow` | `string \| null` | `null` | Custom shadow override token. |
| `raised` | `boolean` | `false` | Raised appearance. |
| `rounded` | `boolean` | `false` | Pill shape. |
| `text` | `boolean` | `false` | Text/ghost style (overrides appearance). |
| `outlined` | `boolean` | `false` | Outline style (overrides appearance). |
| `link` | `boolean` | `false` | Link-style button. |
| `contrast` | `boolean` | `false` | Forces contrast severity. |
| `badge` | `string \| number \| null` | `null` | Badge content. |
| `badgeColor` | `BadgeSeverity` | `'danger'` | Badge color alias. |
| `badgeSeverity` | `BadgeSeverity \| null` | `null` | Preferred badge severity. |
| `badgeClass` | `string \| null` | `null` | Extra class for badge wrapper. |
| `loadingIcon` | `SemanticIcon \| string` | `'spinner'` | Icon to use when loading. |
| `role` | `string \| null` | `null` | Optional custom role (rare). |
| `tabIndex` | `number \| null` | `null` | Optional tab index. |
| `ariaPressed` | `boolean \| null` | `null` | ARIA pressed state. |
| `ariaChecked` | `boolean \| null` | `null` | ARIA checked state. |

### Outputs

None.

### Types
```typescript
type ButtonVariant = 'material' | 'bootstrap' | 'minimal';
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'warning'
  | 'help'
  | 'danger'
  | 'contrast';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonAppearance = 'solid' | 'outline' | 'ghost';
type ButtonType = 'button' | 'submit' | 'reset';
type IconPosition = 'left' | 'right' | 'top' | 'bottom';
```

---

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-button-bg` | Base background. |
| `--uilib-button-bg-hover` | Hover background. |
| `--uilib-button-bg-active` | Active background. |
| `--uilib-button-border` | Base border color. |
| `--uilib-button-fg` | Base text color. |
| `--uilib-button-fg-hover` | Hover text color. |
| `--uilib-button-radius` | Base radius. |
| `--uilib-button-gap` | Icon/content gap. |
| `--uilib-button-icon-gap` | Icon gap for `.btn` content. |
| `--uilib-button-padding` | Padding (resolved). |
| `--uilib-button-font-size` | Font size (resolved). |
| `--uilib-button-transition` | Transition string. |
| `--uilib-button-focus-color` | Focus outline color. |
| `--uilib-button-focus-ring-color` | Focus ring color. |
| `--uilib-button-focus-ring` | Focus ring shadow. |
| `--uilib-button-disabled-opacity` | Disabled opacity. |
| `--uilib-button-border-width` | Border width. |
| `--uilib-button-border-style` | Border style. |
| `--uilib-button-shadow` | Base shadow. |
| `--uilib-button-shadow-hover` | Hover shadow. |
| `--uilib-button-text-transform` | Text transform. |
| `--uilib-button-letter-spacing` | Letter spacing. |
| `--uilib-button-padding-small` | Small padding. |
| `--uilib-button-padding-medium` | Medium padding. |
| `--uilib-button-padding-large` | Large padding. |
| `--uilib-button-font-size-small` | Small font size. |
| `--uilib-button-font-size-medium` | Medium font size. |
| `--uilib-button-font-size-large` | Large font size. |
| `--uilib-button-radius-rounded` | Rounded radius. |
| `--uilib-button-radius-pill` | Pill radius. |
| `--uilib-button-text-fg` | Text appearance fg. |
| `--uilib-button-text-fg-hover` | Text appearance hover fg. |
| `--uilib-button-text-bg` | Text appearance bg. |
| `--uilib-button-text-bg-hover` | Text appearance hover bg. |
| `--uilib-button-text-hover-bg` | Text hover override. |
| `--uilib-button-outline-border` | Outline border. |
| `--uilib-button-outline-border-hover` | Outline hover border. |
| `--uilib-button-outline-fg` | Outline fg. |
| `--uilib-button-outline-fg-hover` | Outline hover fg. |
| `--uilib-button-outline-bg` | Outline bg. |
| `--uilib-button-outline-bg-hover` | Outline hover bg. |
| `--uilib-button-shadow-raised` | Raised shadow. |
| `--uilib-button-shadow-raised-hover` | Raised hover shadow. |
| `--uilib-button-badge-offset-x` | Badge x offset. |
| `--uilib-button-badge-offset-y` | Badge y offset. |
| `--uilib-button-badge-radius` | Badge radius. |
| `--uilib-button-badge-shadow` | Badge shadow. |
| `--uilib-button-badge-font-size` | Badge font size. |
| `--uilib-button-badge-padding` | Badge padding. |
| `--uilib-button-badge-bg` | Badge background. |
| `--uilib-button-badge-fg` | Badge text color. |
| `--uilib-button-primary-bg` | Primary bg. |
| `--uilib-button-primary-bg-hover` | Primary hover bg. |
| `--uilib-button-primary-bg-active` | Primary active bg. |
| `--uilib-button-primary-border` | Primary border. |
| `--uilib-button-primary-fg` | Primary fg. |
| `--uilib-button-secondary-bg` | Secondary bg. |
| `--uilib-button-secondary-bg-hover` | Secondary hover bg. |
| `--uilib-button-secondary-bg-active` | Secondary active bg. |
| `--uilib-button-secondary-border` | Secondary border. |
| `--uilib-button-secondary-fg` | Secondary fg. |
| `--uilib-button-success-bg` | Success bg. |
| `--uilib-button-success-bg-hover` | Success hover bg. |
| `--uilib-button-success-bg-active` | Success active bg. |
| `--uilib-button-success-border` | Success border. |
| `--uilib-button-success-fg` | Success fg. |
| `--uilib-button-danger-bg` | Danger bg. |
| `--uilib-button-danger-bg-hover` | Danger hover bg. |
| `--uilib-button-danger-bg-active` | Danger active bg. |
| `--uilib-button-danger-border` | Danger border. |
| `--uilib-button-danger-fg` | Danger fg. |
| `--uilib-button-warning-bg` | Warning bg. |
| `--uilib-button-warning-bg-hover` | Warning hover bg. |
| `--uilib-button-warning-bg-active` | Warning active bg. |
| `--uilib-button-warning-border` | Warning border. |
| `--uilib-button-warning-fg` | Warning fg. |
| `--uilib-button-info-bg` | Info bg. |
| `--uilib-button-info-bg-hover` | Info hover bg. |
| `--uilib-button-info-bg-active` | Info active bg. |
| `--uilib-button-info-border` | Info border. |
| `--uilib-button-info-fg` | Info fg. |
| `--uilib-button-help-bg` | Help bg. |
| `--uilib-button-help-bg-hover` | Help hover bg. |
| `--uilib-button-help-bg-active` | Help active bg. |
| `--uilib-button-help-border` | Help border. |
| `--uilib-button-help-fg` | Help fg. |
| `--uilib-button-contrast-bg` | Contrast bg. |
| `--uilib-button-contrast-bg-hover` | Contrast hover bg. |
| `--uilib-button-contrast-bg-active` | Contrast active bg. |
| `--uilib-button-contrast-border` | Contrast border. |
| `--uilib-button-contrast-fg` | Contrast fg. |

---

## Examples

### Basic Usage
```html
<ui-lib-button color="primary">Primary</ui-lib-button>
<ui-lib-button severity="success">Save</ui-lib-button>
<ui-lib-button appearance="outline" severity="danger">Delete</ui-lib-button>
```

### With Icons
```html
<ui-lib-button icon="search">Search</ui-lib-button>
<ui-lib-button icon="arrow-right" iconPosition="right">Next</ui-lib-button>
<ui-lib-button icon="menu" [iconOnly]="true" aria-label="Menu" />
```

### Loading State
```html
<ui-lib-button [loading]="true">Saving</ui-lib-button>
<ui-lib-button [loading]="true" loadingIcon="spinner">Saving</ui-lib-button>
```

### Button Group
```html
<ui-lib-button-group>
  <ui-lib-button>Left</ui-lib-button>
  <ui-lib-button>Middle</ui-lib-button>
  <ui-lib-button>Right</ui-lib-button>
</ui-lib-button-group>
```

### Full Width
```html
<ui-lib-button [fullWidth]="true">Full width</ui-lib-button>
```

---

## Accessibility

### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Move focus to/from button |
| Enter | Activate button |
| Space | Activate button |

### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `aria-disabled` | Set when `disabled` or `loading` is true |
| `aria-busy` | Set when `loading` is true |
| `aria-pressed` | For toggle buttons |
| `aria-checked` | For button-as-checkbox patterns |
| `aria-label` | Required for icon-only buttons |

### Focus Management
- Focus ring uses `--uilib-button-focus-*` variables.
- Focus visible appears only for keyboard navigation.

### Screen Reader Behavior
- Button text is announced by default.
- Loading state is conveyed via `aria-busy`; add hidden text if state change needs emphasis.
- Disabled state is conveyed via `aria-disabled`.

### Known Issues & Solutions
- Icon-only buttons: always provide `aria-label`.
- Loading state: include a visually hidden label if action changes.

---

## Best Practices

**Do:**
- Use `severity` for semantic actions and keep labels short.
- Prefer `text` or `outlined` for secondary actions.
- Set `aria-label` for icon-only buttons.

**Don’t:**
- Use `iconOnly` without a label or aria label.
- Mix `text` and `outlined` on the same button.
- Override both `color` and `severity` simultaneously.

---

## Related

- `docs/reference/components/BADGE.md`
- `docs/reference/components/ICON.md`
- `docs/reference/components/ICON_BUTTON.md`
- `docs/reference/components/SELECTBUTTON.md`
