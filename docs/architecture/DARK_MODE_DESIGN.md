# Dark Mode Design (2026-02-20)

This document defines the dark mode token system, variable mappings, CSS structure, and system preference strategy for the UI library.

## Complete Dark Mode Color Palette

Material-inspired dark palette tokens (global, reserved prefix):

```css
:root {
  /* Palette scaffold (light defaults remain in themes.scss) */
  --uilib-surface-dark-0: #121212;
  --uilib-surface-dark-1: #1e1e1e;
  --uilib-surface-dark-2: #232323;
  --uilib-surface-dark-3: #252525;
  --uilib-surface-dark-4: #272727;
  --uilib-surface-dark-5: #2c2c2c;

  --uilib-text-dark-primary: rgba(255, 255, 255, 0.87);
  --uilib-text-dark-secondary: rgba(255, 255, 255, 0.60);
  --uilib-text-dark-disabled: rgba(255, 255, 255, 0.38);

  --uilib-border-dark: rgba(255, 255, 255, 0.12);
  --uilib-border-dark-light: rgba(255, 255, 255, 0.08);

  --uilib-color-primary-dark: #90caf9;
}
```

Notes:
- This palette augments `projects/ui-lib-custom/src/lib/design-tokens.ts` but remains delivered via CSS variables for runtime theming.
- These are system tokens; component tokens should map to them.

## Variable Mapping (Light -> Dark)

All mappings below follow the library conventions in `LIBRARY_CONVENTIONS.md` (reserved globals + component variables). Values are either dark palette tokens or explicit values where required for contrast.

### Global Surfaces and Text

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-page-bg` | `var(--uilib-surface-dark-0)` |
| `--uilib-page-fg` | `var(--uilib-text-dark-primary)` |
| `--uilib-surface` | `var(--uilib-surface-dark-1)` |
| `--uilib-surface-alt` | `var(--uilib-surface-dark-2)` |
| `--uilib-border` | `var(--uilib-border-dark)` |
| `--uilib-muted` | `var(--uilib-text-dark-secondary)` |

### Core Palette Adjustments

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-color-primary-500` | `var(--uilib-color-primary-dark)` |
| `--uilib-color-primary-600` | `var(--uilib-color-primary-dark)` |
| `--uilib-color-primary-700` | `color-mix(in srgb, var(--uilib-color-primary-dark) 85%, #000000)` |
| `--uilib-color-secondary-600` | `var(--uilib-text-dark-secondary)` |
| `--uilib-color-neutral-50` | `var(--uilib-surface-dark-1)` |
| `--uilib-color-neutral-200` | `var(--uilib-border-dark)` |
| `--uilib-color-neutral-900` | `var(--uilib-text-dark-primary)` |

### Topbar

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-topbar-bg` | `var(--uilib-surface-dark-2)` |
| `--uilib-topbar-border` | `var(--uilib-border-dark)` |
| `--uilib-topbar-fg` | `var(--uilib-text-dark-primary)` |
| `--uilib-topbar-hover` | `var(--uilib-surface-dark-3)` |
| `--uilib-topbar-accent` | `var(--uilib-color-primary-dark)` |

### Cards

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-card-bg` | `var(--uilib-surface-dark-2)` |
| `--uilib-card-text-color` | `var(--uilib-text-dark-primary)` |
| `--uilib-card-border` | `var(--uilib-border-dark)` |
| `--uilib-card-header-bg` | `var(--uilib-surface-dark-3)` |
| `--uilib-card-footer-bg` | `var(--uilib-surface-dark-3)` |
| `--uilib-card-shadow` | `var(--uilib-shadow-dark, 0 8px 24px rgba(0, 0, 0, 0.45))` |

### Buttons

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-button-primary-bg` | `var(--uilib-color-primary-dark)` |
| `--uilib-button-primary-bg-hover` | `color-mix(in srgb, var(--uilib-color-primary-dark) 85%, #000000)` |
| `--uilib-button-primary-border` | `var(--uilib-color-primary-dark)` |
| `--uilib-button-primary-fg` | `#0b1220` |
| `--uilib-button-secondary-bg` | `var(--uilib-surface-dark-4)` |
| `--uilib-button-secondary-bg-hover` | `var(--uilib-surface-dark-5)` |
| `--uilib-button-secondary-border` | `var(--uilib-border-dark)` |
| `--uilib-button-secondary-fg` | `var(--uilib-text-dark-primary)` |
| `--uilib-button-success-bg` | `var(--uilib-color-success-600)` |
| `--uilib-button-success-bg-hover` | `var(--uilib-color-success-700)` |
| `--uilib-button-success-border` | `var(--uilib-color-success-600)` |
| `--uilib-button-success-fg` | `#0b1220` |
| `--uilib-button-danger-bg` | `var(--uilib-color-danger-600)` |
| `--uilib-button-danger-bg-hover` | `var(--uilib-color-danger-700)` |
| `--uilib-button-danger-border` | `var(--uilib-color-danger-600)` |
| `--uilib-button-danger-fg` | `#0b1220` |
| `--uilib-button-warning-bg` | `var(--uilib-color-warning-600)` |
| `--uilib-button-warning-bg-hover` | `var(--uilib-color-warning-700)` |
| `--uilib-button-warning-border` | `var(--uilib-color-warning-600)` |
| `--uilib-button-warning-fg` | `#0b1220` |
| `--uilib-button-info-bg` | `var(--uilib-color-info-600)` |
| `--uilib-button-info-bg-hover` | `var(--uilib-color-info-700)` |
| `--uilib-button-info-border` | `var(--uilib-color-info-600)` |
| `--uilib-button-info-fg` | `#0b1220` |
| `--uilib-button-help-bg` | `var(--uilib-color-help-600)` |
| `--uilib-button-help-bg-hover` | `var(--uilib-color-help-700)` |
| `--uilib-button-help-border` | `var(--uilib-color-help-600)` |
| `--uilib-button-help-fg` | `#0b1220` |
| `--uilib-button-contrast-bg` | `var(--uilib-text-dark-primary)` |
| `--uilib-button-contrast-bg-hover` | `var(--uilib-text-dark-secondary)` |
| `--uilib-button-contrast-border` | `var(--uilib-text-dark-primary)` |
| `--uilib-button-contrast-fg` | `#0b1220` |

### Inputs

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-input-bg` | `var(--uilib-surface-dark-1)` |
| `--uilib-input-border` | `var(--uilib-border-dark)` |
| `--uilib-input-placeholder` | `var(--uilib-text-dark-secondary)` |
| `--uilib-input-border-focus` | `var(--uilib-color-primary-dark)` |
| `--uilib-input-label-bg` | `var(--uilib-surface-dark-1)` |
| `--uilib-input-text` | `var(--uilib-text-dark-primary)` |

### Select

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-select-bg` | `var(--uilib-surface-dark-1)` |
| `--uilib-select-border` | `var(--uilib-border-dark)` |
| `--uilib-select-dropdown-bg` | `var(--uilib-surface-dark-3)` |
| `--uilib-select-option-hover` | `color-mix(in srgb, var(--uilib-color-primary-dark) 10%, transparent)` |

### Checkbox

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-checkbox-bg` | `var(--uilib-surface-dark-1)` |
| `--uilib-checkbox-border` | `var(--uilib-border-dark)` |
| `--uilib-checkbox-border-hover` | `var(--uilib-color-primary-dark)` |
| `--uilib-checkbox-border-active` | `var(--uilib-color-primary-dark)` |
| `--uilib-checkbox-bg-checked` | `var(--uilib-color-primary-dark)` |
| `--uilib-checkbox-check-color` | `#0b1220` |
| `--uilib-checkbox-description-color` | `var(--uilib-text-dark-secondary)` |

### Tabs

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-tabs-bg` | `transparent` |
| `--uilib-tabs-border` | `var(--uilib-border-dark)` |
| `--uilib-tabs-indicator-color` | `var(--uilib-color-primary-dark)` |
| `--uilib-tabs-color` | `var(--uilib-text-dark-primary)` |
| `--uilib-tabs-color-active` | `var(--uilib-color-primary-dark)` |
| `--uilib-tabs-color-disabled` | `var(--uilib-text-dark-disabled)` |
| `--uilib-tab-bg-hover` | `color-mix(in srgb, var(--uilib-text-dark-primary) 6%, transparent)` |
| `--uilib-tab-bg-active` | `color-mix(in srgb, var(--uilib-text-dark-primary) 10%, transparent)` |

### Accordion

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-accordion-panel-bg` | `var(--uilib-surface-dark-1)` |
| `--uilib-accordion-panel-border` | `1px solid var(--uilib-border-dark)` |
| `--uilib-accordion-header-bg` | `var(--uilib-surface-dark-2)` |
| `--uilib-accordion-content-bg` | `var(--uilib-surface-dark-1)` |

### Select Button

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-select-button-material-bg` | `var(--uilib-surface-dark-2)` |
| `--uilib-select-button-material-hover-bg` | `var(--uilib-surface-dark-3)` |
| `--uilib-select-button-material-border` | `var(--uilib-border-dark)` |
| `--uilib-select-button-material-selected-bg` | `var(--uilib-color-primary-dark)` |
| `--uilib-select-button-material-selected-fg` | `#0b1220` |
| `--uilib-select-button-bootstrap-bg` | `var(--uilib-surface-dark-2)` |
| `--uilib-select-button-bootstrap-hover-bg` | `var(--uilib-surface-dark-3)` |
| `--uilib-select-button-bootstrap-border` | `var(--uilib-border-dark)` |
| `--uilib-select-button-bootstrap-selected-bg` | `var(--uilib-color-primary-dark)` |
| `--uilib-select-button-bootstrap-selected-fg` | `#0b1220` |
| `--uilib-select-button-minimal-bg` | `transparent` |
| `--uilib-select-button-minimal-hover-bg` | `color-mix(in srgb, var(--uilib-text-dark-primary) 6%, transparent)` |
| `--uilib-select-button-minimal-border` | `transparent` |
| `--uilib-select-button-minimal-selected-bg` | `color-mix(in srgb, var(--uilib-text-dark-primary) 10%, transparent)` |
| `--uilib-select-button-minimal-selected-fg` | `var(--uilib-text-dark-primary)` |
| `--uilib-select-button-fg` | `var(--uilib-text-dark-primary)` |
| `--uilib-select-button-invalid-border` | `var(--uilib-color-danger-600)` |

### Sidebar Menu

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-sidebar-bg` | `var(--uilib-surface-dark-1)` |
| `--uilib-sidebar-text` | `var(--uilib-text-dark-primary)` |
| `--uilib-sidebar-icon` | `var(--uilib-text-dark-secondary)` |
| `--uilib-sidebar-item-hover` | `color-mix(in srgb, var(--uilib-color-primary-dark) 10%, transparent)` |
| `--uilib-sidebar-item-active` | `color-mix(in srgb, var(--uilib-color-primary-dark) 20%, transparent)` |
| `--uilib-sidebar-badge-fg` | `#0b1220` |
| `--uilib-sidebar-badge-bg` | `var(--uilib-color-primary-dark)` |

### Badges

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--uilib-badge-bg` | `var(--uilib-surface-dark-3)` |
| `--uilib-badge-bg-subtle` | `var(--uilib-surface-dark-2)` |
| `--uilib-badge-fg` | `var(--uilib-text-dark-primary)` |
| `--uilib-badge-border` | `var(--uilib-border-dark)` |

### Alerts

| Light Variable | Dark Variable/Value |
|----------------|---------------------|
| `--alert-bg` | `var(--uilib-surface-dark-2)` |
| `--alert-fg` | `var(--uilib-text-dark-primary)` |

## Theme Structure (TypeScript Interfaces)

The following interfaces define a color scheme surface for light and dark modes. The `ThemeColorScheme` is compatible with runtime CSS variable mapping in `ThemeConfigService`.

```typescript
export type ThemeMode = 'auto' | 'light' | 'dark';

export interface ThemeColorScheme {
  surface: string;
  surfaceAlt: string;
  background: string;
  foreground: string;
  foregroundSecondary: string;
  foregroundDisabled: string;
  border: string;
  borderLight: string;
  shadow: string;

  // Component-specific
  cardBg: string;
  cardShadow: string;
  inputBg: string;
  inputBorder: string;
  inputPlaceholder: string;
  selectBg: string;
  selectBorder: string;
  selectDropdownBg: string;
  accordionBg: string;
  accordionHeaderBg: string;
  tabsBg: string;
  tabsIndicator: string;
  checkboxBg: string;
  checkboxBorder: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarIcon: string;
}

export interface ThemePresetColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  help: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  borderLight: string;
}

export interface ThemePreset {
  name: string;
  variant: 'material' | 'bootstrap' | 'minimal';
  mode?: ThemeMode;
  colors: ThemePresetColors;
  scheme: ThemeColorScheme;
}
```

## CSS Structure Approach

Recommended approach: **Option C** (custom properties with automatic switching), with fallback to **Option A** (`[data-theme='dark']`).

```scss
:root {
  /* Light mode defaults */
  --uilib-page-bg: #ffffff;
  --uilib-page-fg: #1f2933;
  --uilib-surface: #ffffff;
}

[data-theme='dark'] {
  --uilib-page-bg: var(--uilib-surface-dark-0);
  --uilib-page-fg: var(--uilib-text-dark-primary);
  --uilib-surface: var(--uilib-surface-dark-1);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --uilib-page-bg: var(--uilib-surface-dark-0);
    --uilib-page-fg: var(--uilib-text-dark-primary);
    --uilib-surface: var(--uilib-surface-dark-1);
  }
}
```

Notes:
- `ThemeConfigService` should still set `[data-theme]` explicitly when user chooses light/dark.
- `ThemeMode = 'auto'` allows system preference while preserving explicit overrides.

## System Preference Detection Strategy

- **Auto mode**: follow system preference via `prefers-color-scheme`, unless a user forces light/dark.
- **Light mode**: set `[data-theme='light']` and persist `ThemeMode = 'light'`.
- **Dark mode**: set `[data-theme='dark']` and persist `ThemeMode = 'dark'`.

Proposed behavior:
1. If a stored theme mode exists, apply it and skip `prefers-color-scheme`.
2. If mode is `auto`, allow the media query to drive values (no explicit `data-theme`), or set a `data-theme='auto'` marker if desired.
3. On `prefers-color-scheme` change, re-apply only when mode is `auto`.

Example API surface:

```typescript
export interface ThemeModeState {
  mode: ThemeMode;
  prefersDark: boolean;
}

export interface ThemeModeOptions {
  mode: ThemeMode;
  persist?: boolean;
  apply?: boolean;
}
```

## References

- `docs/architecture/DARK_MODE_AUDIT.md`
- `projects/ui-lib-custom/src/lib/design-tokens.ts`
- `LIBRARY_CONVENTIONS.md`

