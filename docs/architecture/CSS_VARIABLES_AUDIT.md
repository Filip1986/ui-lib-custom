# CSS Custom Properties Audit

Date: 2026-02-19

## Scope

Searched for CSS custom property definitions and usages in:

- `projects/ui-lib-custom/src/lib/**/*.scss` (source of truth)
- `projects/demo/src/**/*.scss` (reference only)

Search patterns:

- Definition: `--[a-zA-Z][a-zA-Z0-9-]*\s*:`
- Usage: `var\(--[a-zA-Z][a-zA-Z0-9-]*`

## Naming Convention (Official)

### Standard pattern

`--uilib-{component}-{property}[-{variant}][-{state}]`

Examples:

- `--uilib-button-bg`
- `--uilib-button-bg-hover`
- `--uilib-button-border-radius`
- `--uilib-select-dropdown-bg`
- `--uilib-accordion-header-padding`
- `--uilib-card-shadow-material`

### Reserved global prefixes

These are reserved for system-wide tokens and should not include component names:

- `--uilib-color-*`
- `--uilib-spacing-*`
- `--uilib-radius-*`
- `--uilib-shadow-*`
- `--uilib-font-*`
- `--uilib-transition-*`
- `--uilib-z-*`
- `--uilib-surface` and `--uilib-surface-*`
- `--uilib-page-*`

### Additional rules

- Component parts come directly after the component name (for example: `accordion-header`, `select-dropdown`).
- Variants are appended after the property (for example: `--uilib-card-shadow-material`).
- States are appended last (for example: `--uilib-button-bg-hover`).
- Avoid internal-only, underscored variables (for example: `--_tabs-*`) in public API.

## Variable Mapping Table

All non-compliant variables and their standardized names.

| Component | Current Name | New Name | Breaking Change? |
|-----------|--------------|----------|------------------|
| Alert | `--alert-bg` | `--uilib-alert-bg` | Yes |
| Alert | `--alert-fg` | `--uilib-alert-fg` | Yes |
| Badge | `--badge-bg` | `--uilib-badge-bg` | Yes |
| Badge | `--badge-bg-subtle` | `--uilib-badge-bg-subtle` | Yes |
| Badge | `--badge-bg-outline` | `--uilib-badge-bg-outline` | Yes |
| Badge | `--badge-fg` | `--uilib-badge-fg` | Yes |
| Badge | `--badge-border-color` | `--uilib-badge-border-color` | Yes |
| Badge | `--badge-border-width` | `--uilib-badge-border-width` | Yes |
| Badge | `--badge-radius` | `--uilib-badge-radius` | Yes |
| Badge | `--badge-padding-y` | `--uilib-badge-padding-y` | Yes |
| Badge | `--badge-padding-x` | `--uilib-badge-padding-x` | Yes |
| Badge | `--badge-gap` | `--uilib-badge-gap` | Yes |
| Badge | `--badge-font-size` | `--uilib-badge-font-size` | Yes |
| Badge | `--badge-dot-size` | `--uilib-badge-dot-size` | Yes |
| Button | `--btn-bg` | `--uilib-button-bg` | Yes |
| Button | `--btn-bg-hover` | `--uilib-button-bg-hover` | Yes |
| Button | `--btn-bg-active` | `--uilib-button-bg-active` | Yes |
| Button | `--btn-border` | `--uilib-button-border` | Yes |
| Button | `--btn-fg` | `--uilib-button-fg` | Yes |
| Button | `--btn-fg-hover` | `--uilib-button-fg-hover` | Yes |
| Button | `--btn-icon-gap` | `--uilib-button-icon-gap` | Yes |
| Icon | `--icon-color` | `--uilib-icon-color` | Yes |
| Input | `--ui-input-bg` | `--uilib-input-bg` | Yes |
| Input | `--ui-input-border` | `--uilib-input-border` | Yes |
| Input | `--ui-input-border-focus` | `--uilib-input-border-focus` | Yes |
| Input | `--ui-input-text` | `--uilib-input-text` | Yes |
| Input | `--ui-input-placeholder` | `--uilib-input-placeholder` | Yes |
| Input | `--ui-input-radius` | `--uilib-input-radius` | Yes |
| Input | `--ui-input-error` | `--uilib-input-error` | Yes |
| Input | `--ui-input-label-color` | `--uilib-input-label-color` | Yes |
| Input | `--ui-input-label-bg` | `--uilib-input-label-bg` | Yes |
| Input | `--ui-input-label-floating-scale` | `--uilib-input-label-floating-scale` | Yes |
| Input | `--ui-input-label-offset-x` | `--uilib-input-label-offset-x` | Yes |
| Input | `--ui-input-label-padding-x` | `--uilib-input-label-padding-x` | Yes |
| Input | `--ui-input-label-padding-y` | `--uilib-input-label-padding-y` | Yes |
| Input | `--ui-input-label-on-offset` | `--uilib-input-label-on-offset` | Yes |
| Input | `--ui-input-float-in-extra-pad` | `--uilib-input-float-in-extra-pad` | Yes |
| Login | `--background-color` | `--uilib-login-background-color` | Yes |
| Login | `--text-color` | `--uilib-login-text-color` | Yes |
| Login | `--surface-color` | `--uilib-login-surface-color` | Yes |
| Login | `--card-shadow` | `--uilib-login-card-shadow` | Yes |
| Login | `--border-color` | `--uilib-login-border-color` | Yes |
| Login | `--primary-color` | `--uilib-login-primary-color` | Yes |
| Login | `--primary-color-rgb` | `--uilib-login-primary-color-rgb` | Yes |
| Login | `--text-color-secondary` | `--uilib-login-text-color-secondary` | Yes |
| Login | `--surface-hover` | `--uilib-login-surface-hover` | Yes |
| Login | `--red-500` | `--uilib-login-danger-color` | Yes |
| Login Form | `--login-card-bg` | `--uilib-login-form-card-bg` | Yes |
| Login Form | `--login-card-text` | `--uilib-login-form-card-text` | Yes |
| Login Form | `--login-card-border` | `--uilib-login-form-card-border` | Yes |
| Login Form | `--login-surface` | `--uilib-login-form-surface` | Yes |
| Login Form | `--login-muted` | `--uilib-login-form-muted` | Yes |
| Login 1 | `--card-radius` | `--uilib-login-1-card-radius` | Yes |
| Select | `--ui-select-bg` | `--uilib-select-bg` | Yes |
| Select | `--ui-select-border` | `--uilib-select-border` | Yes |
| Select | `--ui-select-radius` | `--uilib-select-radius` | Yes |
| Select | `--ui-select-dropdown-bg` | `--uilib-select-dropdown-bg` | Yes |
| Select | `--ui-select-option-hover` | `--uilib-select-option-hover` | Yes |
| Select Button | `--uilib-selectbutton-gap` | `--uilib-select-button-gap` | Yes |
| Select Button | `--uilib-selectbutton-border-radius` | `--uilib-select-button-border-radius` | Yes |
| Select Button | `--uilib-selectbutton-bg` | `--uilib-select-button-bg` | Yes |
| Select Button | `--uilib-selectbutton-border` | `--uilib-select-button-border` | Yes |
| Select Button | `--uilib-selectbutton-selected-bg` | `--uilib-select-button-selected-bg` | Yes |
| Select Button | `--uilib-selectbutton-selected-fg` | `--uilib-select-button-selected-fg` | Yes |
| Select Button | `--uilib-selectbutton-hover-bg` | `--uilib-select-button-hover-bg` | Yes |
| Select Button | `--uilib-selectbutton-shadow` | `--uilib-select-button-shadow` | Yes |
| Select Button | `--uilib-selectbutton-disabled-opacity` | `--uilib-select-button-disabled-opacity` | Yes |
| Select Button | `--uilib-selectbutton-invalid-border` | `--uilib-select-button-invalid-border` | Yes |
| Select Button | `--uilib-selectbutton-small-padding` | `--uilib-select-button-small-padding` | Yes |
| Select Button | `--uilib-selectbutton-small-font-size` | `--uilib-select-button-small-font-size` | Yes |
| Select Button | `--uilib-selectbutton-small-min-height` | `--uilib-select-button-small-min-height` | Yes |
| Select Button | `--uilib-selectbutton-medium-padding` | `--uilib-select-button-medium-padding` | Yes |
| Select Button | `--uilib-selectbutton-medium-font-size` | `--uilib-select-button-medium-font-size` | Yes |
| Select Button | `--uilib-selectbutton-medium-min-height` | `--uilib-select-button-medium-min-height` | Yes |
| Select Button | `--uilib-selectbutton-large-padding` | `--uilib-select-button-large-padding` | Yes |
| Select Button | `--uilib-selectbutton-large-font-size` | `--uilib-select-button-large-font-size` | Yes |
| Select Button | `--uilib-selectbutton-large-min-height` | `--uilib-select-button-large-min-height` | Yes |
| Select Button | `--uilib-selectbutton-material-border-radius` | `--uilib-select-button-material-border-radius` | Yes |
| Select Button | `--uilib-selectbutton-material-bg` | `--uilib-select-button-material-bg` | Yes |
| Select Button | `--uilib-selectbutton-material-selected-bg` | `--uilib-select-button-material-selected-bg` | Yes |
| Select Button | `--uilib-selectbutton-material-selected-fg` | `--uilib-select-button-material-selected-fg` | Yes |
| Select Button | `--uilib-selectbutton-material-hover-bg` | `--uilib-select-button-material-hover-bg` | Yes |
| Select Button | `--uilib-selectbutton-material-border` | `--uilib-select-button-material-border` | Yes |
| Select Button | `--uilib-selectbutton-material-shadow` | `--uilib-select-button-material-shadow` | Yes |
| Select Button | `--uilib-selectbutton-bootstrap-border-radius` | `--uilib-select-button-bootstrap-border-radius` | Yes |
| Select Button | `--uilib-selectbutton-bootstrap-bg` | `--uilib-select-button-bootstrap-bg` | Yes |
| Select Button | `--uilib-selectbutton-bootstrap-selected-bg` | `--uilib-select-button-bootstrap-selected-bg` | Yes |
| Select Button | `--uilib-selectbutton-bootstrap-selected-fg` | `--uilib-select-button-bootstrap-selected-fg` | Yes |
| Select Button | `--uilib-selectbutton-bootstrap-hover-bg` | `--uilib-select-button-bootstrap-hover-bg` | Yes |
| Select Button | `--uilib-selectbutton-bootstrap-border` | `--uilib-select-button-bootstrap-border` | Yes |
| Select Button | `--uilib-selectbutton-minimal-border-radius` | `--uilib-select-button-minimal-border-radius` | Yes |
| Select Button | `--uilib-selectbutton-minimal-bg` | `--uilib-select-button-minimal-bg` | Yes |
| Select Button | `--uilib-selectbutton-minimal-selected-bg` | `--uilib-select-button-minimal-selected-bg` | Yes |
| Select Button | `--uilib-selectbutton-minimal-selected-fg` | `--uilib-select-button-minimal-selected-fg` | Yes |
| Select Button | `--uilib-selectbutton-minimal-hover-bg` | `--uilib-select-button-minimal-hover-bg` | Yes |
| Select Button | `--uilib-selectbutton-minimal-border` | `--uilib-select-button-minimal-border` | Yes |
| Select Button | `--_sb-gap` | `--uilib-select-button-gap` | Yes |
| Select Button | `--_sb-radius` | `--uilib-select-button-border-radius` | Yes |
| Select Button | `--_sb-bg` | `--uilib-select-button-bg` | Yes |
| Select Button | `--_sb-border` | `--uilib-select-button-border` | Yes |
| Select Button | `--_sb-selected-bg` | `--uilib-select-button-selected-bg` | Yes |
| Select Button | `--_sb-selected-fg` | `--uilib-select-button-selected-fg` | Yes |
| Select Button | `--_sb-hover-bg` | `--uilib-select-button-hover-bg` | Yes |
| Select Button | `--_sb-shadow` | `--uilib-select-button-shadow` | Yes |
| Select Button | `--_sb-disabled-opacity` | `--uilib-select-button-disabled-opacity` | Yes |
| Select Button | `--_sb-invalid-border` | `--uilib-select-button-invalid-border` | Yes |
| Select Button | `--_sb-padding` | `--uilib-select-button-padding` | Yes |
| Select Button | `--_sb-font-size` | `--uilib-select-button-font-size` | Yes |
| Select Button | `--_sb-min-height` | `--uilib-select-button-min-height` | Yes |
| Sidebar Menu | `--ui-sidebar-bg` | `--uilib-sidebar-bg` | Yes |
| Sidebar Menu | `--ui-sidebar-width` | `--uilib-sidebar-width` | Yes |
| Sidebar Menu | `--ui-sidebar-collapsed-width` | `--uilib-sidebar-collapsed-width` | Yes |
| Sidebar Menu | `--ui-sidebar-item-hover` | `--uilib-sidebar-item-hover` | Yes |
| Sidebar Menu | `--ui-sidebar-item-active` | `--uilib-sidebar-item-active` | Yes |
| Sidebar Menu | `--ui-sidebar-text` | `--uilib-sidebar-text` | Yes |
| Sidebar Menu | `--ui-sidebar-icon` | `--uilib-sidebar-icon` | Yes |
| Tabs | `--_tabs-bg` | `--uilib-tabs-bg` | Yes |
| Tabs | `--_tabs-border` | `--uilib-tabs-border` | Yes |
| Tabs | `--_tabs-border-width` | `--uilib-tabs-border-width` | Yes |
| Tabs | `--_tabs-border-style` | `--uilib-tabs-border-style` | Yes |
| Tabs | `--_tabs-radius` | `--uilib-tabs-radius` | Yes |
| Tabs | `--_tabs-gap` | `--uilib-tabs-gap` | Yes |
| Tabs | `--_tabs-padding` | `--uilib-tabs-padding` | Yes |
| Tabs | `--_tab-padding-x` | `--uilib-tab-padding-x` | Yes |
| Tabs | `--_tab-padding-y` | `--uilib-tab-padding-y` | Yes |
| Tabs | `--_tab-gap` | `--uilib-tab-gap` | Yes |
| Tabs | `--_tab-font-size` | `--uilib-tab-font-size` | Yes |
| Tabs | `--_tab-font-weight` | `--uilib-tab-font-weight` | Yes |
| Tabs | `--_tab-color` | `--uilib-tabs-color` | Yes |
| Tabs | `--_tab-color-active` | `--uilib-tabs-color-active` | Yes |
| Tabs | `--_tab-color-disabled` | `--uilib-tabs-color-disabled` | Yes |
| Tabs | `--_tab-bg` | `--uilib-tab-bg` | Yes |
| Tabs | `--_tab-bg-hover` | `--uilib-tab-bg-hover` | Yes |
| Tabs | `--_tab-bg-active` | `--uilib-tab-bg-active` | Yes |
| Tabs | `--_tab-border` | `--uilib-tab-border` | Yes |
| Tabs | `--_tab-border-active` | `--uilib-tab-border-active` | Yes |
| Tabs | `--_tab-radius` | `--uilib-tab-radius` | Yes |
| Tabs | `--_indicator-color` | `--uilib-tabs-indicator-color` | Yes |
| Tabs | `--_indicator-height` | `--uilib-tabs-indicator-height` | Yes |
| Tabs | `--_indicator-radius` | `--uilib-tabs-indicator-radius` | Yes |
| Tabs | `--_indicator-offset` | `--uilib-tabs-indicator-offset` | Yes |
| Tabs | `--_transition` | `--uilib-tabs-transition` | Yes |
| Tabs | `--_scroll-btn-size` | `--uilib-tabs-nav-button-size` | Yes |
| Tabs | `--_scroll-btn-bg` | `--uilib-tabs-nav-button-bg` | Yes |
| Tabs | `--_scroll-btn-color` | `--uilib-tabs-nav-button-color` | Yes |
| Tabs | `--_scroll-btn-border` | `--uilib-tabs-nav-button-border` | Yes |
| Tabs | `--_scroll-btn-radius` | `--uilib-tabs-nav-button-radius` | Yes |
| Tabs | `--_scroll-btn-shadow` | `--uilib-tabs-nav-button-shadow` | Yes |
| Tabs | `--_scroll-btn-hover-bg` | `--uilib-tabs-nav-button-hover-bg` | Yes |
| Tabs | `--_scroll-btn-active-bg` | `--uilib-tabs-nav-button-active-bg` | Yes |
| Tabs | `--_scroll-btn-disabled-opacity` | `--uilib-tabs-nav-button-disabled-opacity` | Yes |
| Tabs | `--_scroll-btn-gap` | `--uilib-tabs-nav-button-gap` | Yes |

## Migration Strategy

Recommendation: hard migration (rename only), as the library is pre-1.0.

Optional soft migration (if desired) could introduce temporary aliasing:

```css
--uilib-select-bg: var(--ui-select-bg, #fff);
```

## Component Update Order

1. Design tokens / globals (none require renaming, but align with naming rules if any are added later).
2. Independent components: alert, badge, button, icon, input, select, sidebar menu, tabs.
3. Composite / layout components: accordion (depends on icon sizing), select-button (depends on button), login/login-form (app-level composite).

## Changelog Draft (Breaking Changes)

- Renamed non-compliant CSS custom properties to `--uilib-{component}-*` per naming convention.
- Removed use of `--ui-*`, `--badge-*`, `--btn-*`, `--alert-*`, `--login-*`, and `--_tabs*` variables as public API.
- `select-button` CSS variables now use `--uilib-select-button-*` instead of `--uilib-selectbutton-*`.
- Consumers must update any custom themes or overrides targeting the old variable names.

## Compliance Categories

### Correct (already `--uilib-{component}-*`)

Component variables that already follow the `--uilib-{component}-*` pattern:

- Accordion: `--uilib-accordion-*`
- Button: `--uilib-button-*`
- Card: `--uilib-card-*`
- Checkbox: `--uilib-checkbox-*`
- Icon: `--uilib-icon-*` (used as fallbacks)
- Tabs: `--uilib-tabs-*`, `--uilib-tab-*` (used as inputs to internal aliases)

### Wrong Prefix (`--ui-*` or other prefixes)

- Select: `--ui-select-*`
- Input: `--ui-input-*`
- Sidebar menu: `--ui-sidebar-*`

### No Prefix (no `uilib` prefix)

- Button: `--btn-*` (internal button variables)
- Badge: `--badge-*`
- Tabs: `--_tabs-*`, `--_tab-*`, `--_indicator-*`, `--_scroll-btn-*`
- Alert: `--alert-*`
- Icon: `--icon-color`
- Login (composite): `--background-color`, `--text-color`, `--surface-color`, `--card-shadow`, `--border-color`, `--primary-color`, `--primary-color-rgb`, `--text-color-secondary`, `--surface-hover`, `--red-500`
- Login form: `--login-*`
- Login 1: `--card-radius`

### Global Design Tokens (`--uilib-*` system tokens)

Defined in `projects/ui-lib-custom/src/lib/themes/themes.scss` (light + dark), and duplicated in a few component files as defaults:

- Spacing scale: `--uilib-space-2`, `--uilib-space-3`, `--uilib-space-4`, `--uilib-space-5`
- Colors: `--uilib-color-{primary|secondary|success|danger|warning|info}-*`, `--uilib-color-neutral-*`
- Density and touch: `--uilib-touch-size-min`, `--uilib-density-scale-y`
- Component spacing bases: `--uilib-button-*-base`, `--uilib-card-*-base`, `--uilib-input-*-base`, `--uilib-badge-*-base`, `--uilib-toolbar-*-base`, `--uilib-table-row-height-base`, `--uilib-list-item-*-base`
- Component spacing derived: `--uilib-button-*`, `--uilib-card-*`, `--uilib-input-*`, `--uilib-badge-*`, `--uilib-toolbar-*`, `--uilib-table-row-height`, `--uilib-list-item-*`
- Inline scale: `--uilib-inline-{xs|sm|md|lg|xl}`
- Surfaces and text: `--uilib-page-bg`, `--uilib-page-fg`, `--uilib-surface`, `--uilib-surface-alt`, `--uilib-border`, `--uilib-muted`
- Topbar: `--uilib-topbar-*`
- Buttons (semantic): `--uilib-button-{primary|secondary|success|danger|warning}-*`
- Cards (semantic): `--uilib-card-bg`, `--uilib-card-text-color`, `--uilib-card-border`
- Typography: `--uilib-font-heading`, `--uilib-font-body`, `--uilib-font-ui`, `--uilib-font-mono`, `--uilib-font-heading-weight`, `--uilib-font-body-weight`
- Icon sizing and transitions: `--uilib-icon-size-*`, `--uilib-transition-fast`, `--uilib-icon-color`, `--uilib-icon-transition`

Also defined as defaults in component SCSS:

- `projects/ui-lib-custom/src/lib/button/button.scss` defines `--uilib-space-1..5`, `--uilib-font-size-{sm|md|lg}`, `--uilib-font-weight-semibold`
- `projects/ui-lib-custom/src/lib/badge/badge.scss` defines `--uilib-space-1..4`, `--uilib-font-size-{xs|sm|md}`, `--uilib-radius-{sm|md|lg|full}`, and several `--uilib-color-*`

## Per-Component Variable Mapping

### Accordion

Files:

- Definitions: `projects/ui-lib-custom/src/lib/accordion/accordion.scss`, `projects/ui-lib-custom/src/lib/accordion/accordion-panel.scss`
- Usages: same files, plus demo overrides in `projects/demo/src/app/pages/accordion/accordion.component.scss`

Current variables (all compliant):

- `--uilib-accordion-gap`
- `--uilib-accordion-border-radius`
- `--uilib-accordion-panel-bg`
- `--uilib-accordion-panel-border`
- `--uilib-accordion-panel-radius`
- `--uilib-accordion-header-padding-sm`
- `--uilib-accordion-header-padding-md`
- `--uilib-accordion-header-padding-lg`
- `--uilib-accordion-header-padding`
- `--uilib-accordion-header-font-size-sm`
- `--uilib-accordion-header-font-size-md`
- `--uilib-accordion-header-font-size-lg`
- `--uilib-accordion-header-font-size`
- `--uilib-accordion-header-bg`
- `--uilib-accordion-header-bg-hover`
- `--uilib-accordion-header-color`
- `--uilib-accordion-header-font-weight`
- `--uilib-accordion-content-padding-sm`
- `--uilib-accordion-content-padding-md`
- `--uilib-accordion-content-padding-lg`
- `--uilib-accordion-content-padding`
- `--uilib-accordion-content-bg`
- `--uilib-accordion-icon-size-sm`
- `--uilib-accordion-icon-size-md`
- `--uilib-accordion-icon-size-lg`
- `--uilib-accordion-icon-size`
- `--uilib-accordion-icon-color`
- `--uilib-accordion-icon-color-hover`
- `--uilib-accordion-icon-color-expanded`
- `--uilib-accordion-icon-rotation`
- `--uilib-accordion-icon-transition`
- `--uilib-accordion-focus-ring`
- `--uilib-accordion-transition-duration`
- `--uilib-accordion-transition-easing`
- `--uilib-accordion-content-animation-duration`
- `--uilib-accordion-content-animation-easing`
- `--uilib-accordion-content-fade-duration`
- `--uilib-accordion-icon-animation-duration`
- `--uilib-accordion-icon-animation-easing`
- `--uilib-accordion-icon-gap`
- `--uilib-accordion-icon-align`

Proposed names: no change.

### Alert

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/alert/alert.scss`

Current variables (no prefix):

- `--alert-bg`
- `--alert-fg`

Proposed:

- `--uilib-alert-bg`
- `--uilib-alert-fg`

### Badge

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/badge/badge.scss`

Current variables (no prefix):

- `--badge-bg`
- `--badge-bg-subtle`
- `--badge-bg-outline`
- `--badge-fg`
- `--badge-border-color`
- `--badge-border-width`
- `--badge-radius`
- `--badge-padding-y`
- `--badge-padding-x`
- `--badge-gap`
- `--badge-font-size`
- `--badge-dot-size`

Proposed:

- `--uilib-badge-bg`
- `--uilib-badge-bg-subtle`
- `--uilib-badge-bg-outline`
- `--uilib-badge-fg`
- `--uilib-badge-border-color`
- `--uilib-badge-border-width`
- `--uilib-badge-radius`
- `--uilib-badge-padding-y`
- `--uilib-badge-padding-x`
- `--uilib-badge-gap`
- `--uilib-badge-font-size`
- `--uilib-badge-dot-size`

### Button

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/button/button.scss`

Current variables (no prefix):

- `--btn-bg`
- `--btn-bg-hover`
- `--btn-bg-active`
- `--btn-border`
- `--btn-fg`
- `--btn-fg-hover`
- `--btn-icon-gap`

Proposed:

- `--uilib-button-bg`
- `--uilib-button-bg-hover`
- `--uilib-button-bg-active`
- `--uilib-button-border`
- `--uilib-button-fg`
- `--uilib-button-fg-hover`
- `--uilib-button-icon-gap`

Current variables (already compliant):

- `--uilib-button-radius`
- `--uilib-button-gap`
- `--uilib-button-transition`
- `--uilib-button-focus-color`
- `--uilib-button-focus-ring-color`
- `--uilib-button-focus-ring`
- `--uilib-button-disabled-opacity`
- `--uilib-button-border-width`
- `--uilib-button-border-style`
- `--uilib-button-shadow`
- `--uilib-button-shadow-hover`
- `--uilib-button-text-transform`
- `--uilib-button-letter-spacing`
- `--uilib-button-padding-small`
- `--uilib-button-padding-medium`
- `--uilib-button-padding-large`
- `--uilib-button-font-size-small`
- `--uilib-button-font-size-medium`
- `--uilib-button-font-size-large`
- `--uilib-button-radius-rounded`
- `--uilib-button-radius-pill`
- `--uilib-button-text-fg`
- `--uilib-button-text-fg-hover`
- `--uilib-button-text-bg`
- `--uilib-button-text-bg-hover`
- `--uilib-button-outline-border`
- `--uilib-button-outline-border-hover`
- `--uilib-button-outline-fg`
- `--uilib-button-outline-fg-hover`
- `--uilib-button-outline-bg`
- `--uilib-button-outline-bg-hover`
- `--uilib-button-shadow-raised`
- `--uilib-button-shadow-raised-hover`
- `--uilib-button-badge-offset-x`
- `--uilib-button-badge-offset-y`
- `--uilib-button-badge-radius`
- `--uilib-button-badge-shadow`
- `--uilib-button-badge-font-size`
- `--uilib-button-badge-padding`
- `--uilib-button-badge-bg`
- `--uilib-button-badge-fg`

### Card

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/card/card.scss`

Current variables (already compliant):

- `--uilib-card-border-width`
- `--uilib-card-header-padding`
- `--uilib-card-body-padding`
- `--uilib-card-footer-padding`
- `--uilib-card-bg`
- `--uilib-card-text-color`
- `--uilib-card-radius`
- `--uilib-card-shadow`
- `--uilib-card-shadow-medium`
- `--uilib-card-shadow-low`
- `--uilib-card-shadow-high`
- `--uilib-card-shadow-none`
- `--uilib-card-shadow-hover`
- `--uilib-card-border`
- `--uilib-card-header-bg`
- `--uilib-card-footer-bg`

Proposed names: no change.

### Checkbox

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/checkbox/checkbox.scss`

Current variables (already compliant):

- `--uilib-checkbox-gap`
- `--uilib-checkbox-border`
- `--uilib-checkbox-border-hover`
- `--uilib-checkbox-border-active`
- `--uilib-checkbox-bg`
- `--uilib-checkbox-bg-checked`
- `--uilib-checkbox-check-color`
- `--uilib-checkbox-description-color`
- `--uilib-checkbox-radius`
- `--uilib-checkbox-focus-ring`
- `--uilib-checkbox-size-sm`
- `--uilib-checkbox-size-md`
- `--uilib-checkbox-size-lg`
- `--uilib-checkbox-font`
- `--uilib-checkbox-shadow`
- `--uilib-checkbox-size`

Proposed names: no change.

### Icon

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/icon/icon.scss`

Current variables (no prefix):

- `--icon-color`

Proposed:

- `--uilib-icon-color`

### Icon Button

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/icon-button/icon-button.scss`

Custom variables: none (uses `--uilib-radius-sm`).

### Input

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/input/input.scss`

Current variables (wrong prefix):

- `--ui-input-bg`
- `--ui-input-border`
- `--ui-input-border-focus`
- `--ui-input-text`
- `--ui-input-placeholder`
- `--ui-input-radius`
- `--ui-input-error`
- `--ui-input-label-color`
- `--ui-input-label-bg`
- `--ui-input-label-floating-scale`
- `--ui-input-label-offset-x`
- `--ui-input-label-padding-x`
- `--ui-input-label-padding-y`
- `--ui-input-label-on-offset`
- `--ui-input-float-in-extra-pad`

Proposed:

- `--uilib-input-bg`
- `--uilib-input-border`
- `--uilib-input-border-focus`
- `--uilib-input-text`
- `--uilib-input-placeholder`
- `--uilib-input-radius`
- `--uilib-input-error`
- `--uilib-input-label-color`
- `--uilib-input-label-bg`
- `--uilib-input-label-floating-scale`
- `--uilib-input-label-offset-x`
- `--uilib-input-label-padding-x`
- `--uilib-input-label-padding-y`
- `--uilib-input-label-on-offset`
- `--uilib-input-float-in-extra-pad`

### Login (composite)

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/login/login.component.scss`

Current variables (no prefix):

- `--background-color`
- `--text-color`
- `--surface-color`
- `--card-shadow`
- `--border-color`
- `--primary-color`
- `--primary-color-rgb`
- `--text-color-secondary`
- `--surface-hover`
- `--red-500`

Proposed:

- `--uilib-login-background-color`
- `--uilib-login-text-color`
- `--uilib-login-surface-color`
- `--uilib-login-card-shadow`
- `--uilib-login-border-color`
- `--uilib-login-primary-color`
- `--uilib-login-primary-color-rgb`
- `--uilib-login-text-color-secondary`
- `--uilib-login-surface-hover`
- `--uilib-login-danger-color`

### Login Form

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/login-form/login-form.scss`

Current variables (no prefix):

- `--login-card-bg`
- `--login-card-text`
- `--login-card-border`
- `--login-surface`
- `--login-muted`

Proposed:

- `--uilib-login-form-card-bg`
- `--uilib-login-form-card-text`
- `--uilib-login-form-card-border`
- `--uilib-login-form-surface`
- `--uilib-login-form-muted`

### Login 1

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/login/login-1/login-1.component.scss`

Current variables (no prefix):

- `--card-radius`

Proposed:

- `--uilib-login-1-card-radius`

### Select

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/select/select.scss`

Current variables (wrong prefix):

- `--ui-select-bg`
- `--ui-select-border`
- `--ui-select-radius`
- `--ui-select-dropdown-bg`
- `--ui-select-option-hover`

Proposed:

- `--uilib-select-bg`
- `--uilib-select-border`
- `--uilib-select-radius`
- `--uilib-select-dropdown-bg`
- `--uilib-select-option-hover`

### Select Button

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/select-button/select-button.scss`

Current variables (prefix correct, component name inconsistent with requested `select-button`):

- `--uilib-selectbutton-gap`
- `--uilib-selectbutton-border-radius`
- `--uilib-selectbutton-bg`
- `--uilib-selectbutton-border`
- `--uilib-selectbutton-selected-bg`
- `--uilib-selectbutton-selected-fg`
- `--uilib-selectbutton-hover-bg`
- `--uilib-selectbutton-shadow`
- `--uilib-selectbutton-disabled-opacity`
- `--uilib-selectbutton-invalid-border`
- `--uilib-selectbutton-{small|medium|large}-padding`
- `--uilib-selectbutton-{small|medium|large}-font-size`
- `--uilib-selectbutton-{small|medium|large}-min-height`
- `--uilib-selectbutton-{material|bootstrap|minimal}-*`

Proposed (`select-button` component name):

- `--uilib-select-button-gap`
- `--uilib-select-button-border-radius`
- `--uilib-select-button-bg`
- `--uilib-select-button-border`
- `--uilib-select-button-selected-bg`
- `--uilib-select-button-selected-fg`
- `--uilib-select-button-hover-bg`
- `--uilib-select-button-shadow`
- `--uilib-select-button-disabled-opacity`
- `--uilib-select-button-invalid-border`
- `--uilib-select-button-{small|medium|large}-padding`
- `--uilib-select-button-{small|medium|large}-font-size`
- `--uilib-select-button-{small|medium|large}-min-height`
- `--uilib-select-button-{material|bootstrap|minimal}-*`

Internal aliases (no prefix):

- `--_sb-*` (suggested to be replaced by `--uilib-select-button-*` or removed if redundant)

### Sidebar Menu

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/sidebar-menu/sidebar-menu.scss`

Current variables (wrong prefix):

- `--ui-sidebar-bg`
- `--ui-sidebar-width`
- `--ui-sidebar-collapsed-width`
- `--ui-sidebar-item-hover`
- `--ui-sidebar-item-active`
- `--ui-sidebar-text`
- `--ui-sidebar-icon`

Proposed:

- `--uilib-sidebar-bg`
- `--uilib-sidebar-width`
- `--uilib-sidebar-collapsed-width`
- `--uilib-sidebar-item-hover`
- `--uilib-sidebar-item-active`
- `--uilib-sidebar-text`
- `--uilib-sidebar-icon`

### Tabs

Files:

- Definitions/usage: `projects/ui-lib-custom/src/lib/tabs/tabs.scss`

Current variables (no prefix):

- `--_tabs-bg`
- `--_tabs-border`
- `--_tabs-border-width`
- `--_tabs-border-style`
- `--_tabs-radius`
- `--_tabs-gap`
- `--_tabs-padding`
- `--_tab-padding-x`
- `--_tab-padding-y`
- `--_tab-gap`
- `--_tab-font-size`
- `--_tab-font-weight`
- `--_tab-color`
- `--_tab-color-active`
- `--_tab-color-disabled`
- `--_tab-bg`
- `--_tab-bg-hover`
- `--_tab-bg-active`
- `--_tab-border`
- `--_tab-border-active`
- `--_tab-radius`
- `--_indicator-color`
- `--_indicator-height`
- `--_indicator-radius`
- `--_indicator-offset`
- `--_transition`
- `--_scroll-btn-size`
- `--_scroll-btn-bg`
- `--_scroll-btn-color`
- `--_scroll-btn-border`
- `--_scroll-btn-radius`
- `--_scroll-btn-shadow`
- `--_scroll-btn-hover-bg`
- `--_scroll-btn-active-bg`
- `--_scroll-btn-disabled-opacity`
- `--_scroll-btn-gap`

Proposed:

- `--uilib-tabs-bg`
- `--uilib-tabs-border`
- `--uilib-tabs-border-width`
- `--uilib-tabs-border-style`
- `--uilib-tabs-radius`
- `--uilib-tabs-gap`
- `--uilib-tabs-padding`
- `--uilib-tab-padding-x`
- `--uilib-tab-padding-y`
- `--uilib-tab-gap`
- `--uilib-tab-font-size`
- `--uilib-tab-font-weight`
- `--uilib-tabs-color`
- `--uilib-tabs-color-active`
- `--uilib-tabs-color-disabled`
- `--uilib-tab-bg`
- `--uilib-tab-bg-hover`
- `--uilib-tab-bg-active`
- `--uilib-tab-border`
- `--uilib-tab-border-active`
- `--uilib-tab-radius`
- `--uilib-tabs-indicator-color`
- `--uilib-tabs-indicator-height`
- `--uilib-tabs-indicator-radius`
- `--uilib-tabs-indicator-offset`
- `--uilib-tabs-transition`
- `--uilib-tabs-nav-button-size`
- `--uilib-tabs-nav-button-bg`
- `--uilib-tabs-nav-button-color`
- `--uilib-tabs-nav-button-border`
- `--uilib-tabs-nav-button-radius`
- `--uilib-tabs-nav-button-shadow`
- `--uilib-tabs-nav-button-hover-bg`
- `--uilib-tabs-nav-button-active-bg`
- `--uilib-tabs-nav-button-disabled-opacity`
- `--uilib-tabs-nav-button-gap`

## External References

### Public docs

The following docs reference CSS variables and will need updates if names change:

- `docs/reference/components/BUTTON.md` (mentions `--uilib-button-*` and `--btn-bg-active`)
- `docs/reference/components/BUTTON_IMPLEMENTATION.md`
- `docs/reference/components/ICON.md`
- `docs/reference/components/SELECTBUTTON.md` (uses `--uilib-selectbutton-*` naming)
- `docs/reference/systems/ICONS.md`
- `docs/reference/systems/SPACING_SYSTEM.md`
- `docs/reference/systems/THEME_CONFIG_SERVICE.md`
- `docs/reference/systems/README.md`

### Demo app theme editor

CSS variables referenced in the demo theme editor (reference only, no changes yet):

- `projects/demo/src/app/shared/theme-editor/theme-editor.component.scss`
- `projects/demo/src/app/shared/theme-editor/icon-preview.component.scss`

### Design tokens

`projects/ui-lib-custom/src/lib/design-tokens.ts` references CSS variables in `SELECTBUTTON_TOKENS`:

- `--uilib-surface-100`, `--uilib-surface-200`
- `--uilib-primary-500`, `--uilib-primary-contrast`
- `--uilib-border-color`
- `--uilib-text-primary`

If select button naming changes, this file should be updated to match the new `--uilib-select-button-*` names.

## Files to Modify

Based on current non-compliant variables:

- `projects/ui-lib-custom/src/lib/alert/alert.scss`
- `projects/ui-lib-custom/src/lib/badge/badge.scss`
- `projects/ui-lib-custom/src/lib/button/button.scss`
- `projects/ui-lib-custom/src/lib/icon/icon.scss`
- `projects/ui-lib-custom/src/lib/input/input.scss`
- `projects/ui-lib-custom/src/lib/login/login.component.scss`
- `projects/ui-lib-custom/src/lib/login/login-1/login-1.component.scss`
- `projects/ui-lib-custom/src/lib/login-form/login-form.scss`
- `projects/ui-lib-custom/src/lib/select/select.scss`
- `projects/ui-lib-custom/src/lib/select-button/select-button.scss`
- `projects/ui-lib-custom/src/lib/sidebar-menu/sidebar-menu.scss`
- `projects/ui-lib-custom/src/lib/tabs/tabs.scss`

Docs and demo references that will need updates after renaming:

- `docs/reference/components/BUTTON.md`
- `docs/reference/components/BUTTON_IMPLEMENTATION.md`
- `docs/reference/components/ICON.md`
- `docs/reference/components/SELECTBUTTON.md`
- `docs/reference/systems/ICONS.md`
- `docs/reference/systems/README.md`
- `docs/reference/systems/SPACING_SYSTEM.md`
- `docs/reference/systems/THEME_CONFIG_SERVICE.md`
- `projects/demo/src/app/shared/theme-editor/theme-editor.component.scss`
- `projects/demo/src/app/shared/theme-editor/icon-preview.component.scss`

## Risk Assessment

- Renaming CSS custom properties is a breaking change for any consumer overrides or theme presets targeting current names (especially `--ui-*`, `--badge-*`, `--btn-*`, `--alert-*`, `--login-*`, and `--uilib-selectbutton-*`).
- Demo-specific overrides (accordion animation durations, card/button shadow overrides) will need to be updated if variable names change.
- Public docs explicitly reference several variable names (notably `--btn-bg-active` and `--uilib-selectbutton-*`). These references must be updated in lockstep to avoid confusion.
- Consider a migration period that supports old and new names in parallel (aliases) to reduce consumer breakage.
