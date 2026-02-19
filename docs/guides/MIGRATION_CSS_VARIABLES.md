# Migrating to Standardized CSS Variables

## Breaking Changes

The following CSS custom properties have been renamed:

| Old Name | New Name |
| --- | --- |
| `--ui-select-bg` | `--uilib-select-bg` |
| `--ui-select-border` | `--uilib-select-border` |
| `--ui-select-radius` | `--uilib-select-radius` |
| `--ui-select-dropdown-bg` | `--uilib-select-dropdown-bg` |
| `--ui-select-option-hover` | `--uilib-select-option-hover` |
| `--ui-input-bg` | `--uilib-input-bg` |
| `--ui-input-border` | `--uilib-input-border` |
| `--ui-input-border-focus` | `--uilib-input-border-focus` |
| `--ui-input-text` | `--uilib-input-text` |
| `--ui-input-placeholder` | `--uilib-input-placeholder` |
| `--ui-input-radius` | `--uilib-input-radius` |
| `--ui-input-error` | `--uilib-input-error` |
| `--ui-input-label-color` | `--uilib-input-label-color` |
| `--ui-input-label-bg` | `--uilib-input-label-bg` |
| `--ui-input-label-floating-scale` | `--uilib-input-label-floating-scale` |
| `--ui-input-label-offset-x` | `--uilib-input-label-offset-x` |
| `--ui-input-label-padding-x` | `--uilib-input-label-padding-x` |
| `--ui-input-label-padding-y` | `--uilib-input-label-padding-y` |
| `--ui-input-label-on-offset` | `--uilib-input-label-on-offset` |
| `--ui-input-float-in-extra-pad` | `--uilib-input-float-in-extra-pad` |
| `--ui-sidebar-bg` | `--uilib-sidebar-bg` |
| `--ui-sidebar-width` | `--uilib-sidebar-width` |
| `--ui-sidebar-collapsed-width` | `--uilib-sidebar-collapsed-width` |
| `--ui-sidebar-item-hover` | `--uilib-sidebar-item-hover` |
| `--ui-sidebar-item-active` | `--uilib-sidebar-item-active` |
| `--ui-sidebar-text` | `--uilib-sidebar-text` |
| `--ui-sidebar-icon` | `--uilib-sidebar-icon` |
| `--alert-bg` | `--uilib-alert-bg` |
| `--alert-fg` | `--uilib-alert-fg` |
| `--badge-bg` | `--uilib-badge-bg` |
| `--badge-bg-subtle` | `--uilib-badge-bg-subtle` |
| `--badge-bg-outline` | `--uilib-badge-bg-outline` |
| `--badge-fg` | `--uilib-badge-fg` |
| `--badge-border-color` | `--uilib-badge-border-color` |
| `--badge-border-width` | `--uilib-badge-border-width` |
| `--badge-radius` | `--uilib-badge-radius` |
| `--badge-padding-y` | `--uilib-badge-padding-y` |
| `--badge-padding-x` | `--uilib-badge-padding-x` |
| `--badge-gap` | `--uilib-badge-gap` |
| `--badge-font-size` | `--uilib-badge-font-size` |
| `--badge-dot-size` | `--uilib-badge-dot-size` |
| `--btn-bg` | `--uilib-button-bg` |
| `--btn-bg-hover` | `--uilib-button-bg-hover` |
| `--btn-bg-active` | `--uilib-button-bg-active` |
| `--btn-border` | `--uilib-button-border` |
| `--btn-fg` | `--uilib-button-fg` |
| `--btn-fg-hover` | `--uilib-button-fg-hover` |
| `--btn-icon-gap` | `--uilib-button-icon-gap` |
| `--icon-color` | `--uilib-icon-color` |
| `--uilib-selectbutton-gap` | `--uilib-select-button-gap` |
| `--uilib-selectbutton-border-radius` | `--uilib-select-button-border-radius` |
| `--uilib-selectbutton-bg` | `--uilib-select-button-bg` |
| `--uilib-selectbutton-border` | `--uilib-select-button-border` |
| `--uilib-selectbutton-selected-bg` | `--uilib-select-button-selected-bg` |
| `--uilib-selectbutton-selected-fg` | `--uilib-select-button-selected-fg` |
| `--uilib-selectbutton-hover-bg` | `--uilib-select-button-hover-bg` |
| `--uilib-selectbutton-shadow` | `--uilib-select-button-shadow` |
| `--uilib-selectbutton-disabled-opacity` | `--uilib-select-button-disabled-opacity` |
| `--uilib-selectbutton-invalid-border` | `--uilib-select-button-invalid-border` |
| `--uilib-selectbutton-small-padding` | `--uilib-select-button-small-padding` |
| `--uilib-selectbutton-small-font-size` | `--uilib-select-button-small-font-size` |
| `--uilib-selectbutton-small-min-height` | `--uilib-select-button-small-min-height` |
| `--uilib-selectbutton-medium-padding` | `--uilib-select-button-medium-padding` |
| `--uilib-selectbutton-medium-font-size` | `--uilib-select-button-medium-font-size` |
| `--uilib-selectbutton-medium-min-height` | `--uilib-select-button-medium-min-height` |
| `--uilib-selectbutton-large-padding` | `--uilib-select-button-large-padding` |
| `--uilib-selectbutton-large-font-size` | `--uilib-select-button-large-font-size` |
| `--uilib-selectbutton-large-min-height` | `--uilib-select-button-large-min-height` |
| `--uilib-selectbutton-material-border-radius` | `--uilib-select-button-material-border-radius` |
| `--uilib-selectbutton-material-bg` | `--uilib-select-button-material-bg` |
| `--uilib-selectbutton-material-selected-bg` | `--uilib-select-button-material-selected-bg` |
| `--uilib-selectbutton-material-selected-fg` | `--uilib-select-button-material-selected-fg` |
| `--uilib-selectbutton-material-hover-bg` | `--uilib-select-button-material-hover-bg` |
| `--uilib-selectbutton-material-border` | `--uilib-select-button-material-border` |
| `--uilib-selectbutton-material-shadow` | `--uilib-select-button-material-shadow` |
| `--uilib-selectbutton-bootstrap-border-radius` | `--uilib-select-button-bootstrap-border-radius` |
| `--uilib-selectbutton-bootstrap-bg` | `--uilib-select-button-bootstrap-bg` |
| `--uilib-selectbutton-bootstrap-selected-bg` | `--uilib-select-button-bootstrap-selected-bg` |
| `--uilib-selectbutton-bootstrap-selected-fg` | `--uilib-select-button-bootstrap-selected-fg` |
| `--uilib-selectbutton-bootstrap-hover-bg` | `--uilib-select-button-bootstrap-hover-bg` |
| `--uilib-selectbutton-bootstrap-border` | `--uilib-select-button-bootstrap-border` |
| `--uilib-selectbutton-minimal-border-radius` | `--uilib-select-button-minimal-border-radius` |
| `--uilib-selectbutton-minimal-bg` | `--uilib-select-button-minimal-bg` |
| `--uilib-selectbutton-minimal-selected-bg` | `--uilib-select-button-minimal-selected-bg` |
| `--uilib-selectbutton-minimal-selected-fg` | `--uilib-select-button-minimal-selected-fg` |
| `--uilib-selectbutton-minimal-hover-bg` | `--uilib-select-button-minimal-hover-bg` |
| `--uilib-selectbutton-minimal-border` | `--uilib-select-button-minimal-border` |
| `--_tabs-bg` | `--uilib-tabs-bg` |
| `--_tabs-border` | `--uilib-tabs-border` |
| `--_tabs-border-width` | `--uilib-tabs-border-width` |
| `--_tabs-border-style` | `--uilib-tabs-border-style` |
| `--_tabs-radius` | `--uilib-tabs-radius` |
| `--_tabs-gap` | `--uilib-tabs-gap` |
| `--_tabs-padding` | `--uilib-tabs-padding` |
| `--_tab-padding-x` | `--uilib-tab-padding-x` |
| `--_tab-padding-y` | `--uilib-tab-padding-y` |
| `--_tab-gap` | `--uilib-tab-gap` |
| `--_tab-font-size` | `--uilib-tab-font-size` |
| `--_tab-font-weight` | `--uilib-tab-font-weight` |
| `--_tab-color` | `--uilib-tabs-color` |
| `--_tab-color-active` | `--uilib-tabs-color-active` |
| `--_tab-color-disabled` | `--uilib-tabs-color-disabled` |
| `--_tab-bg` | `--uilib-tab-bg` |
| `--_tab-bg-hover` | `--uilib-tab-bg-hover` |
| `--_tab-bg-active` | `--uilib-tab-bg-active` |
| `--_tab-border` | `--uilib-tab-border` |
| `--_tab-border-active` | `--uilib-tab-border-active` |
| `--_tab-radius` | `--uilib-tab-radius` |
| `--_indicator-color` | `--uilib-tabs-indicator-color` |
| `--_indicator-height` | `--uilib-tabs-indicator-height` |
| `--_indicator-radius` | `--uilib-tabs-indicator-radius` |
| `--_indicator-offset` | `--uilib-tabs-indicator-offset` |
| `--_transition` | `--uilib-tabs-transition` |
| `--_scroll-btn-size` | `--uilib-tabs-nav-button-size` |
| `--_scroll-btn-bg` | `--uilib-tabs-nav-button-bg` |
| `--_scroll-btn-color` | `--uilib-tabs-nav-button-color` |
| `--_scroll-btn-border` | `--uilib-tabs-nav-button-border` |
| `--_scroll-btn-radius` | `--uilib-tabs-nav-button-radius` |
| `--_scroll-btn-shadow` | `--uilib-tabs-nav-button-shadow` |
| `--_scroll-btn-hover-bg` | `--uilib-tabs-nav-button-hover-bg` |
| `--_scroll-btn-active-bg` | `--uilib-tabs-nav-button-active-bg` |
| `--_scroll-btn-disabled-opacity` | `--uilib-tabs-nav-button-disabled-opacity` |
| `--_scroll-btn-gap` | `--uilib-tabs-nav-button-gap` |
| `--background-color` | `--uilib-login-background-color` |
| `--text-color` | `--uilib-login-text-color` |
| `--surface-color` | `--uilib-login-surface-color` |
| `--card-shadow` | `--uilib-login-card-shadow` |
| `--border-color` | `--uilib-login-border-color` |
| `--primary-color` | `--uilib-login-primary-color` |
| `--primary-color-rgb` | `--uilib-login-primary-color-rgb` |
| `--text-color-secondary` | `--uilib-login-text-color-secondary` |
| `--surface-hover` | `--uilib-login-surface-hover` |
| `--red-500` | `--uilib-login-danger-color` |
| `--login-card-bg` | `--uilib-login-form-card-bg` |
| `--login-card-text` | `--uilib-login-form-card-text` |
| `--login-card-border` | `--uilib-login-form-card-border` |
| `--login-surface` | `--uilib-login-form-surface` |
| `--login-muted` | `--uilib-login-form-muted` |
| `--card-radius` | `--uilib-login-1-card-radius` |

## How to Migrate

### Find and Replace

If you have customized these variables in your app:

1. Search for: `--ui-select`
   Replace with: `--uilib-select`

2. Search for: `--ui-input`
   Replace with: `--uilib-input`

3. Search for: `--ui-sidebar`
   Replace with: `--uilib-sidebar`

4. Search for: `--btn-`
   Replace with: `--uilib-button-`

5. Search for: `--badge-`
   Replace with: `--uilib-badge-`

6. Search for: `--alert-`
   Replace with: `--uilib-alert-`

7. Search for: `--uilib-selectbutton-`
   Replace with: `--uilib-select-button-`

8. Search for: `--_tabs-`, `--_tab-`, `--_indicator-`, `--_scroll-btn-`
   Replace with: `--uilib-tabs-`/`--uilib-tab-` prefixes per the table above.

9. Search for: `--icon-color`
   Replace with: `--uilib-icon-color`

10. Search for: `--checkbox-`
    Replace with: `--uilib-checkbox-`

11. Search for: `--login-`
    Replace with: `--uilib-login-form-`

12. Search for: `--background-color`, `--text-color`, `--surface-color`, `--card-shadow`, `--border-color`,
    `--primary-color`, `--primary-color-rgb`, `--text-color-secondary`, `--surface-hover`, `--red-500`
    Replace with their `--uilib-login-*` equivalents.

### Verify

After updating, check that your custom themes still apply and confirm hover/active states on buttons, tabs, and selects.
