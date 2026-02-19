# Theming Guide

A quick reference for using and overriding the library’s CSS variables for light/dark modes and brand themes.

## Import once
Add the theme variables globally (demo uses `projects/demo/src/styles.scss`):
```scss
@import 'ui-lib-custom/themes/themes.css';
```

## Switch themes
Toggle the `data-theme` attribute on `html` (or any container) to swap variable sets:
```ts
document.documentElement.setAttribute('data-theme', 'dark');
```
Available presets: `light` (default) and `dark`.

## Key CSS variables
- **Page/surface**: `--uilib-page-bg`, `--uilib-page-fg`, `--uilib-surface`, `--uilib-surface-alt`, `--uilib-border`, `--uilib-muted`
- **Topbar**: `--uilib-topbar-bg`, `--uilib-topbar-border`, `--uilib-topbar-fg`, `--uilib-topbar-hover`, `--uilib-topbar-accent`
- **Buttons**: `--uilib-button-<severity>-bg`, `--uilib-button-<severity>-bg-hover`, `--uilib-button-<severity>-border`, `--uilib-button-<severity>-fg`
- **Badges**: `--uilib-badge-<severity>-bg`, `--uilib-badge-<severity>-bg-subtle`, `--uilib-badge-<severity>-border`, `--uilib-badge-<severity>-fg`
- **Cards**: `--uilib-card-bg`, `--uilib-card-text-color`, `--uilib-card-border`
- **Select**: `--uilib-select-bg`, `--uilib-select-border`, `--uilib-select-radius`, `--uilib-select-dropdown-bg`
- **Select Button**: `--uilib-select-button-bg`, `--uilib-select-button-selected-bg`, `--uilib-select-button-border`
- **Layout spacing/sizing**: `--uilib-space-<token>` (e.g., `--uilib-space-4`), `--uilib-container-<size>` (e.g., `--uilib-container-lg`)

## Brand overrides
Create a brand theme by overriding the variables under a custom selector:
```css
[data-theme="brand-x"] {
  --uilib-color-primary-600: #6f42c1;
  --uilib-color-primary-700: #59359d;
  --uilib-button-primary-bg: var(--uilib-color-primary-600);
  --uilib-button-primary-bg-hover: var(--uilib-color-primary-700);
  --uilib-select-button-selected-bg: var(--uilib-color-primary-600);
  --uilib-topbar-accent: var(--uilib-color-primary-600);
  --uilib-page-bg: #0f1116;
  --uilib-page-fg: #e5e7eb;
}
```
Then toggle `data-theme="brand-x"` in your app.

## Component notes
- All spacing props fall back to tokens via `--uilib-space-*`; set these to align with your design scale.
- Containers use `--uilib-container-<size>` so you can match brand breakpoints without code changes.
- Buttons, badges, and cards read their respective severity vars; set both base and hover values for consistent states.

## Demo reference
See the demo “Themes” page and layout examples for side-by-side light/dark panels using scoped `data-theme`.
