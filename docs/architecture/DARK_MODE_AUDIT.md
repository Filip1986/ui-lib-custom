# Dark Mode Audit (2026-02-20)

## Current Implementation Status

- Theme system uses `ThemeConfigService` to apply CSS variables to `:root` and set `data-theme`.
- Built-in presets exist: `light`, `dark`, and `brand-example` (`projects/ui-lib-custom/src/lib/theming/presets/*.json`).
- `themes.scss` and `themes.css` define defaults for `:root` and `[data-theme='dark']`.
- No `prefers-color-scheme` media queries are present.
- Demo app includes a theme toggle and a theme editor, but the demo sidebar uses hardcoded light colors.
- There is partial overlap between presets and `themes.scss`; some component variables are set only in one system.

## Existing Dark Mode Variables

Defined in `[data-theme='dark']` (from `projects/ui-lib-custom/src/lib/themes/themes.scss`):
- Core palette: `--uilib-color-primary-*`, `--uilib-color-secondary-*`, `--uilib-color-success-*`, `--uilib-color-danger-*`, `--uilib-color-warning-*`, `--uilib-color-info-*`, `--uilib-color-neutral-*`.
- Surfaces & text: `--uilib-page-bg`, `--uilib-page-fg`, `--uilib-surface`, `--uilib-surface-alt`, `--uilib-border`, `--uilib-muted`.
- Topbar colors: `--uilib-topbar-*`.
- Button colors: `--uilib-button-*-bg`, `--uilib-button-*-bg-hover`, `--uilib-button-*-border`, `--uilib-button-*-fg` for primary/secondary/success/danger/warning.

Dark preset (`projects/ui-lib-custom/src/lib/theming/presets/dark.json`) defines:
- `colors`: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `background`, `surface`, `surfaceAlt`, `text`, `textSecondary`, `border`.
- These map to CSS variables via `ThemeConfigService` (e.g., `--uilib-page-bg`, `--uilib-page-fg`, `--uilib-surface`, `--uilib-border`, `--uilib-muted`).

No `prefers-color-scheme` usage found.

## Color Variables Inventory

### Core Palette and Surfaces

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-color-primary-100` | `#bbdefb` | `#1a3d5f` | ✅ Exists |
| `--uilib-color-primary-500` | `#2196f3` | `#1e88e5` | ✅ Exists |
| `--uilib-color-primary-600` | `#1e88e5` | `#1565c0` | ✅ Exists |
| `--uilib-color-primary-700` | `#1976d2` | `#0d47a1` | ✅ Exists |
| `--uilib-color-secondary-50` | `#f5f5f5` | `#2c2c2c` | ✅ Exists |
| `--uilib-color-secondary-100` | `#eeeeee` | `#3a3a3a` | ✅ Exists |
| `--uilib-color-secondary-600` | `#757575` | `#9e9e9e` | ✅ Exists |
| `--uilib-color-secondary-700` | `#616161` | `#bdbdbd` | ✅ Exists |
| `--uilib-color-success-50` | `#e8f5e9` | `#1b5e20` | ✅ Exists |
| `--uilib-color-success-600` | `#43a047` | `#2e7d32` | ✅ Exists |
| `--uilib-color-success-700` | `#388e3c` | `#43a047` | ✅ Exists |
| `--uilib-color-danger-50` | `#ffebee` | `#3b0f0f` | ✅ Exists |
| `--uilib-color-danger-600` | `#e53935` | `#c62828` | ✅ Exists |
| `--uilib-color-danger-700` | `#d32f2f` | `#e53935` | ✅ Exists |
| `--uilib-color-warning-50` | `#fff3e0` | `#4a2a00` | ✅ Exists |
| `--uilib-color-warning-600` | `#fb8c00` | `#ef6c00` | ✅ Exists |
| `--uilib-color-warning-700` | `#f57c00` | `#fb8c00` | ✅ Exists |
| `--uilib-color-info-50` | `#e1f5fe` | `#0a2a3a` | ✅ Exists |
| `--uilib-color-info-600` | `#039be5` | `#0277bd` | ✅ Exists |
| `--uilib-color-info-700` | `#0288d1` | `#039be5` | ✅ Exists |
| `--uilib-color-neutral-50` | `#fafafa` | `#1c1c1c` | ✅ Exists |
| `--uilib-color-neutral-75` | `#f5f5f5` | `#242424` | ✅ Exists |
| `--uilib-color-neutral-100` | `#f0f0f0` | `#2a2a2a` | ✅ Exists |
| `--uilib-color-neutral-200` | `#e0e0e0` | `#3a3a3a` | ✅ Exists |
| `--uilib-color-neutral-300` | `#d6d6d6` | `#4a4a4a` | ✅ Exists |
| `--uilib-color-neutral-400` | `#bdbdbd` | `#5a5a5a` | ✅ Exists |
| `--uilib-color-neutral-900` | `#212121` | `#f5f5f5` | ✅ Exists |
| `--uilib-page-bg` | `#f7f7f9` | `#101214` | ✅ Exists |
| `--uilib-page-fg` | `#1f2933` | `#e6e8eb` | ✅ Exists |
| `--uilib-surface` | `#ffffff` | `#1a1c1f` | ✅ Exists |
| `--uilib-surface-alt` | `#f1f3f5` | `#22262b` | ✅ Exists |
| `--uilib-border` | `var(--uilib-color-neutral-200)` | `var(--uilib-color-neutral-300)` | ✅ Exists |
| `--uilib-muted` | `#5f6c80` | `#9aa4b5` | ✅ Exists |

### Topbar

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-topbar-bg` | `#ffffff` | `#1f2226` | ✅ Exists |
| `--uilib-topbar-border` | `var(--uilib-color-neutral-200)` | `var(--uilib-color-neutral-300)` | ✅ Exists |
| `--uilib-topbar-fg` | `#495057` | `#e6e8eb` | ✅ Exists |
| `--uilib-topbar-hover` | `#f8f9fa` | `#262a30` | ✅ Exists |
| `--uilib-topbar-accent` | `var(--uilib-color-primary-600)` | `var(--uilib-color-primary-500)` | ✅ Exists |

### Buttons (core variants only)

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-button-primary-bg` | `var(--uilib-color-primary-600)` | `var(--uilib-color-primary-600)` | ✅ Exists |
| `--uilib-button-primary-bg-hover` | `var(--uilib-color-primary-700)` | `var(--uilib-color-primary-700)` | ✅ Exists |
| `--uilib-button-primary-border` | `var(--uilib-color-primary-600)` | `var(--uilib-color-primary-600)` | ✅ Exists |
| `--uilib-button-primary-fg` | `#fff` | `#fff` | ⚠ Hardcoded |
| `--uilib-button-secondary-bg` | `var(--uilib-color-secondary-600)` | `var(--uilib-color-secondary-600)` | ✅ Exists |
| `--uilib-button-secondary-bg-hover` | `var(--uilib-color-secondary-700)` | `var(--uilib-color-secondary-700)` | ✅ Exists |
| `--uilib-button-secondary-border` | `var(--uilib-color-secondary-600)` | `var(--uilib-color-secondary-600)` | ✅ Exists |
| `--uilib-button-secondary-fg` | `#fff` | `#fff` | ⚠ Hardcoded |
| `--uilib-button-success-bg` | `var(--uilib-color-success-600)` | `var(--uilib-color-success-600)` | ✅ Exists |
| `--uilib-button-success-bg-hover` | `var(--uilib-color-success-700)` | `var(--uilib-color-success-700)` | ✅ Exists |
| `--uilib-button-success-border` | `var(--uilib-color-success-600)` | `var(--uilib-color-success-600)` | ✅ Exists |
| `--uilib-button-success-fg` | `#fff` | `#fff` | ⚠ Hardcoded |
| `--uilib-button-danger-bg` | `var(--uilib-color-danger-600)` | `var(--uilib-color-danger-600)` | ✅ Exists |
| `--uilib-button-danger-bg-hover` | `var(--uilib-color-danger-700)` | `var(--uilib-color-danger-700)` | ✅ Exists |
| `--uilib-button-danger-border` | `var(--uilib-color-danger-600)` | `var(--uilib-color-danger-600)` | ✅ Exists |
| `--uilib-button-danger-fg` | `#fff` | `#fff` | ⚠ Hardcoded |
| `--uilib-button-warning-bg` | `var(--uilib-color-warning-600)` | `var(--uilib-color-warning-600)` | ✅ Exists |
| `--uilib-button-warning-bg-hover` | `var(--uilib-color-warning-700)` | `var(--uilib-color-warning-700)` | ✅ Exists |
| `--uilib-button-warning-border` | `var(--uilib-color-warning-600)` | `var(--uilib-color-warning-600)` | ✅ Exists |
| `--uilib-button-warning-fg` | `#000` | `#000` | ⚠ Hardcoded |
| `--uilib-button-info-*` | `n/a` | `n/a` | ❌ Missing dark (not defined) |
| `--uilib-button-help-*` | `n/a` | `n/a` | ❌ Missing dark (not defined) |
| `--uilib-button-contrast-*` | `n/a` | `n/a` | ❌ Missing dark (not defined) |

### Cards

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-card-bg` | `#fff` | `#fff` | ❌ Missing dark (hardcoded light) |
| `--uilib-card-text-color` | `var(--uilib-color-neutral-900)` | `var(--uilib-color-neutral-900)` | ❌ Missing dark (light token) |
| `--uilib-card-border` | `var(--uilib-color-neutral-200)` | `var(--uilib-color-neutral-200)` | ❌ Missing dark (light token) |
| `--uilib-card-header-bg` | `var(--uilib-surface-alt)` | `n/a` | ❌ Missing dark (not set in dark) |
| `--uilib-card-footer-bg` | `var(--uilib-surface-alt)` | `n/a` | ❌ Missing dark (not set in dark) |

### Tabs

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-tabs-bg` | `var(--uilib-surface)` | `n/a` | ❌ Missing dark (only in light theme) |
| `--uilib-tabs-border` | `var(--uilib-border)` | `n/a` | ❌ Missing dark |
| `--uilib-tabs-indicator-color` | `var(--uilib-color-primary-600)` | `n/a` | ❌ Missing dark |
| `--uilib-tabs-color` | `var(--uilib-page-fg)` | `n/a` | ❌ Missing dark |
| `--uilib-tabs-color-active` | `var(--uilib-color-primary-700)` | `n/a` | ❌ Missing dark |
| `--uilib-tabs-color-disabled` | `var(--uilib-muted)` | `n/a` | ❌ Missing dark |

### Inputs, Selects, Checkbox (component vars used but not defined globally)

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-input-bg` | `n/a` | `n/a` | ❌ Missing dark (not defined) |
| `--uilib-input-border` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-input-placeholder` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-input-border-focus` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-border` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-dropdown-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-option-hover` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-checkbox-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-checkbox-border` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-checkbox-bg-checked` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-checkbox-check-color` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-checkbox-description-color` | `n/a` | `n/a` | ❌ Missing dark |

### Select Button (uses private or undefined tokens)

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-select-button-material-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-material-hover-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-material-border` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-material-selected-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-material-selected-fg` | `#fff` | `#fff` | ⚠ Hardcoded |
| `--uilib-select-button-bootstrap-*` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-minimal-*` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-fg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-select-button-invalid-border` | `n/a` | `n/a` | ❌ Missing dark |

### Sidebar Menu

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--uilib-sidebar-bg` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-sidebar-text` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-sidebar-icon` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-sidebar-item-hover` | `n/a` | `n/a` | ❌ Missing dark |
| `--uilib-sidebar-item-active` | `n/a` | `n/a` | ❌ Missing dark |

### Alerts

| Variable | Light Value | Dark Value | Status |
|----------|-------------|------------|--------|
| `--alert-bg` | `var(--uilib-surface)` | `n/a` | ❌ Missing dark |
| `--alert-fg` | `currentColor` | `currentColor` | ⚠ Depends on parent |

## Per-Component Dark Mode Gaps

- `projects/ui-lib-custom/src/lib/button/button.scss`
  - Uses many theme vars; dark mode depends on missing globals for info/help/contrast variants.
  - Hardcoded foreground defaults (`#fff`, `#000`) in theme config for several variants.
- `projects/ui-lib-custom/src/lib/card/card.scss`
  - Dark theme in `themes.scss` keeps light card values (`#fff`, light border). Needs dark overrides.
- `projects/ui-lib-custom/src/lib/badge/badge.scss`
  - Defines its own palette defaults with hardcoded light hexes; no dark override.
  - Should rely on global palette and add dark-specific badge vars.
- `projects/ui-lib-custom/src/lib/accordion/accordion.scss`
  - Uses `--uilib-surface` and `--uilib-border`; OK if globals updated, but no explicit dark overrides for panel borders.
- `projects/ui-lib-custom/src/lib/tabs/tabs.scss`
  - Uses `--uilib-tabs-*` variables defined only in light theme; missing dark values.
- `projects/ui-lib-custom/src/lib/select/select.scss`
  - Uses `--uilib-select-*` variables that are not defined in theme; defaults rely on base surface/border only.
- `projects/ui-lib-custom/src/lib/input/input.scss`
  - Uses `--uilib-input-*` variables not defined in theme; missing dark-specific values.
- `projects/ui-lib-custom/src/lib/checkbox/checkbox.scss`
  - Uses `--uilib-checkbox-*` variables not defined in theme; missing dark-specific values.
- `projects/ui-lib-custom/src/lib/select-button/select-button.scss`
  - Uses `--uilib-surface-100/200`, `--uilib-border-color`, `--uilib-primary-contrast`, `--uilib-text-primary`, `--uilib-danger-500` which are not defined in theme.
  - Hardcoded shadow color and `#fff` defaults.
- `projects/ui-lib-custom/src/lib/alert/alert.scss`
  - Uses `--alert-bg` and `--uilib-color-primary-50` for bootstrap variant (light-only).
- `projects/ui-lib-custom/src/lib/sidebar-menu/sidebar-menu.scss`
  - Mixed: some tokens but includes hardcoded `#fff` badge fg and hardcoded box-shadow.
- Login-related components (`projects/ui-lib-custom/src/lib/login*/*.scss`, `projects/ui-lib-custom/src/lib/login-form/login-form.scss`)
  - Multiple hardcoded light values and gradients; uses custom CSS vars unrelated to theme (`--background-color`, `--surface-color`, etc.).

## Hardcoded Colors to Fix

- Demo sidebar: `projects/demo/src/app/layout/sidebar/sidebar.component.scss`
  - Hardcoded background, borders, link colors, hover/active colors, and scrollbar colors.
- Theme editor: `projects/demo/src/app/shared/theme-editor/theme-editor.component.scss`
  - Box-shadows use fixed black `rgba(0, 0, 0, ...)`.
- Sidebar menu: `projects/ui-lib-custom/src/lib/sidebar-menu/sidebar-menu.scss`
  - `box-shadow: 0 18px 50px rgba(0, 0, 0, 0.1)` and `.ui-sidebar-badge { color: #fff; }`.
- Select button: `projects/ui-lib-custom/src/lib/select-button/select-button.scss`
  - `rgba(0, 0, 0, 0.1)` and light fallbacks like `#f5f5f5`, `#eeeeee`.
- Login form: `projects/ui-lib-custom/src/lib/login-form/login-form.scss`
  - Light-only defaults: `#fff`, `#0f172a`, `#e2e8f0`, gradient with `#1e88e5/#1976d2`, `#fff` text.
- Login component: `projects/ui-lib-custom/src/lib/login/login.component.scss`
  - Uses custom vars (`--surface-color`, `--text-color`, `--border-color`, `--red-500`) and hardcoded `rgba(0, 0, 0, 0.1)`.
- Login 1/2/3: `projects/ui-lib-custom/src/lib/login/login-1/login-1.component.scss`,
  `projects/ui-lib-custom/src/lib/login/login-2/login-2.component.scss`,
  `projects/ui-lib-custom/src/lib/login/login-3/login-3.component.scss`
  - Gradients and `#fff` text hardcoded; muted colors hardcoded.

## Recommended Dark Palette (Baseline)

Use the existing `dark.json` and `themes.scss` as the starting point; expand to cover missing tokens.

| Token | Suggested Dark Value | Notes |
|-------|----------------------|-------|
| `--uilib-page-bg` | `#101214` | Current dark preset value |
| `--uilib-surface` | `#1a1c1f` | Current dark preset value |
| `--uilib-surface-alt` | `#22262b` | Current dark preset value |
| `--uilib-border` | `#3a3a3a` | Current dark preset value |
| `--uilib-page-fg` | `#e6e8eb` | Current dark preset value |
| `--uilib-muted` | `#9aa4b5` | Current dark preset value |
| `--uilib-card-bg` | `#1a1c1f` | Align with surface |
| `--uilib-card-border` | `#30343a` | Slightly lighter than `--uilib-border` |
| `--uilib-input-bg` | `#1f2328` | Between surface and surface-alt |
| `--uilib-input-border` | `#3a3f46` | Maintain contrast |
| `--uilib-input-placeholder` | `#8b95a7` | Dark mode placeholder text |
| `--uilib-select-dropdown-bg` | `#1f2328` | Match input background |
| `--uilib-tabs-bg` | `#1a1c1f` | Match surface |
| `--uilib-tabs-border` | `#2c3138` | Dark border |
| `--uilib-checkbox-bg` | `#1f2328` | Match input background |
| `--uilib-checkbox-check-color` | `#e6e8eb` | High-contrast check |
| `--uilib-sidebar-bg` | `#14161a` | Slightly deeper than page bg |
| `--uilib-sidebar-text` | `#e6e8eb` | Primary text |
| `--uilib-sidebar-icon` | `#9aa4b5` | Muted icon |

## Notes / Risks

- Two parallel theme systems exist (`themes.scss` and `ThemeConfigService`). Some variables only exist in one place; this causes gaps when presets override root vars.
- Several components declare their own light palette defaults instead of using shared tokens.
- Some components reference undefined tokens (`--uilib-surface-100`, `--uilib-primary-contrast`, `--uilib-border-color`). These should be defined or removed.

