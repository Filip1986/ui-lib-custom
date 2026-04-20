# CSS Custom Properties Reference

This document lists the public CSS custom properties for each component. Defaults are shown as the variable fallback chain (token + hardcoded last resort where applicable).

## Accordion

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-accordion-gap` | `var(--uilib-space-2, 0.5rem)` | Space between panels. |
| `--uilib-accordion-border-radius` | `var(--uilib-radius-md, 8px)` | Outer radius for bootstrap variant edges. |
| `--uilib-accordion-panel-bg` | `var(--uilib-surface, #ffffff)` | Panel background. |
| `--uilib-accordion-panel-border` | `1px solid var(--uilib-border, #e5e7eb)` | Panel border. |
| `--uilib-accordion-panel-radius` | `var(--uilib-radius-md, 8px)` | Panel radius. |
| `--uilib-accordion-header-padding-sm` | `var(--uilib-space-2, 0.5rem) var(--uilib-space-3, 0.75rem)` | Small header padding. |
| `--uilib-accordion-header-padding-md` | `var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem)` | Medium header padding. |
| `--uilib-accordion-header-padding-lg` | `var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem)` | Large header padding. |
| `--uilib-accordion-header-padding` | `var(--uilib-accordion-header-padding-md, var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem))` | Active header padding. |
| `--uilib-accordion-header-font-size-sm` | `var(--uilib-font-size-sm, 0.875rem)` | Small header font size. |
| `--uilib-accordion-header-font-size-md` | `var(--uilib-font-size-md, 1rem)` | Medium header font size. |
| `--uilib-accordion-header-font-size-lg` | `var(--uilib-font-size-lg, 1.125rem)` | Large header font size. |
| `--uilib-accordion-header-font-size` | `var(--uilib-accordion-header-font-size-md, var(--uilib-font-size-md, 1rem))` | Active header font size. |
| `--uilib-accordion-header-bg` | `var(--uilib-surface, transparent)` | Header background. |
| `--uilib-accordion-header-bg-hover` | `var(--uilib-surface-hover, color-mix(in srgb, currentColor 6%, transparent))` | Header hover background. |
| `--uilib-accordion-header-color` | `var(--uilib-page-fg, #111827)` | Header text color. |
| `--uilib-accordion-header-font-weight` | `var(--uilib-font-weight-500, 500)` | Header weight. |
| `--uilib-accordion-content-padding-sm` | `var(--uilib-space-3, 0.75rem)` | Small content padding. |
| `--uilib-accordion-content-padding-md` | `var(--uilib-space-4, 1rem)` | Medium content padding. |
| `--uilib-accordion-content-padding-lg` | `var(--uilib-space-5, 1.25rem)` | Large content padding. |
| `--uilib-accordion-content-padding` | `var(--uilib-accordion-content-padding-md, var(--uilib-space-4, 1rem))` | Active content padding. |
| `--uilib-accordion-content-bg` | `var(--uilib-surface, #ffffff)` | Content background. |
| `--uilib-accordion-icon-size-sm` | `var(--uilib-icon-size-sm, 1rem)` | Small icon size. |
| `--uilib-accordion-icon-size-md` | `var(--uilib-icon-size-md, 1.25rem)` | Medium icon size. |
| `--uilib-accordion-icon-size-lg` | `var(--uilib-icon-size-lg, 1.5rem)` | Large icon size. |
| `--uilib-accordion-icon-size` | `var(--uilib-accordion-icon-size-md, var(--uilib-icon-size-md, 1.25rem))` | Active icon size. |
| `--uilib-accordion-icon-color` | `var(--uilib-muted, #6b7280)` | Icon color. |
| `--uilib-accordion-icon-color-hover` | `var(--uilib-color-primary-600, #1e88e5)` | Icon hover color. |
| `--uilib-accordion-icon-color-expanded` | `var(--uilib-color-primary-600, #1e88e5)` | Icon expanded color. |
| `--uilib-accordion-icon-rotation` | `var(--uilib-rotation-0, 0deg)` | Expanded rotation. |
| `--uilib-accordion-icon-transition` | `transform var(--uilib-transition-fast, 200ms ease)` | Icon transition. |
| `--uilib-accordion-focus-ring` | `0 0 0 2px var(--uilib-focus-ring-color, color-mix(in srgb, var(--uilib-color-primary-500, #1e88e5) 35%, transparent))` | Focus ring. |
| `--uilib-accordion-transition-duration` | `var(--uilib-transition-fast-duration, 200ms)` | Base transition duration. |
| `--uilib-accordion-transition-easing` | `var(--uilib-transition-ease-out, ease-out)` | Base transition easing. |
| `--uilib-accordion-content-animation-duration` | `var(--uilib-transition-normal-duration, 250ms)` | Content animation duration. |
| `--uilib-accordion-content-animation-easing` | `var(--uilib-transition-ease-out, ease-out)` | Content animation easing. |
| `--uilib-accordion-content-fade-duration` | `150ms` | Fade duration. |
| `--uilib-accordion-icon-animation-duration` | `var(--uilib-transition-fast-duration, 150ms)` | Icon animation duration. |
| `--uilib-accordion-icon-animation-easing` | `ease-in-out` | Icon animation easing. |
| `--uilib-accordion-icon-gap` | `var(--uilib-space-2, 0.5rem)` | Gap between icon and label. |
| `--uilib-accordion-icon-align` | `center` | Icon alignment. |

## Alert

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-alert-bg` | `var(--uilib-surface, #ffffff)` | Alert background. |
| `--uilib-alert-fg` | `currentColor` | Alert text color. |

## Badge

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-badge-bg` | `var(--uilib-color-neutral-50, #fafafa)` | Base background. |
| `--uilib-badge-bg-subtle` | `var(--uilib-color-neutral-50, #fafafa)` | Subtle background. |
| `--uilib-badge-bg-outline` | `transparent` | Outline background. |
| `--uilib-badge-fg` | `var(--uilib-color-neutral-900, #212121)` | Base text color. |
| `--uilib-badge-border-color` | `transparent` | Border color. |
| `--uilib-badge-border-width` | `0` | Border width. |
| `--uilib-badge-radius` | `var(--uilib-radius-md, 8px)` | Border radius. |
| `--uilib-badge-padding-y` | `var(--uilib-space-1, 0.25rem)` | Vertical padding. |
| `--uilib-badge-padding-x` | `var(--uilib-space-2, 0.5rem)` | Horizontal padding. |
| `--uilib-badge-gap` | `var(--uilib-space-1, 0.25rem)` | Gap between items. |
| `--uilib-badge-font-size` | `var(--uilib-font-size-sm, 0.875rem)` | Font size. |
| `--uilib-badge-dot-size` | `0.75rem` | Dot badge size. |
| `--uilib-badge-primary-bg` | `var(--uilib-color-primary-700, #1976d2)` | Primary background. |
| `--uilib-badge-primary-bg-subtle` | `var(--uilib-color-primary-50, #e3f2fd)` | Primary subtle background. |
| `--uilib-badge-primary-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Primary text. |
| `--uilib-badge-primary-border` | `var(--uilib-color-primary-700, #1976d2)` | Primary border. |
| `--uilib-badge-secondary-bg` | `var(--uilib-color-secondary-700, #616161)` | Secondary background. |
| `--uilib-badge-secondary-bg-subtle` | `var(--uilib-color-secondary-50, #f5f5f5)` | Secondary subtle background. |
| `--uilib-badge-secondary-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Secondary text. |
| `--uilib-badge-secondary-border` | `var(--uilib-color-secondary-700, #616161)` | Secondary border. |
| `--uilib-badge-success-bg` | `var(--uilib-color-success-700, #388e3c)` | Success background. |
| `--uilib-badge-success-bg-subtle` | `var(--uilib-color-success-50, #e8f5e9)` | Success subtle background. |
| `--uilib-badge-success-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Success text. |
| `--uilib-badge-success-border` | `var(--uilib-color-success-700, #388e3c)` | Success border. |
| `--uilib-badge-danger-bg` | `var(--uilib-color-danger-700, #d32f2f)` | Danger background. |
| `--uilib-badge-danger-bg-subtle` | `var(--uilib-color-danger-50, #ffebee)` | Danger subtle background. |
| `--uilib-badge-danger-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Danger text. |
| `--uilib-badge-danger-border` | `var(--uilib-color-danger-700, #d32f2f)` | Danger border. |
| `--uilib-badge-warning-bg` | `var(--uilib-color-warning-700, #f57c00)` | Warning background. |
| `--uilib-badge-warning-bg-subtle` | `var(--uilib-color-warning-50, #fff3e0)` | Warning subtle background. |
| `--uilib-badge-warning-fg` | `var(--uilib-color-neutral-900, #212121)` | Warning text. |
| `--uilib-badge-warning-border` | `var(--uilib-color-warning-700, #f57c00)` | Warning border. |
| `--uilib-badge-info-bg` | `var(--uilib-color-info-700, #0288d1)` | Info background. |
| `--uilib-badge-info-bg-subtle` | `var(--uilib-color-info-50, #e1f5fe)` | Info subtle background. |
| `--uilib-badge-info-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Info text. |
| `--uilib-badge-info-border` | `var(--uilib-color-info-700, #0288d1)` | Info border. |
| `--uilib-badge-neutral-bg` | `var(--uilib-color-neutral-200, #eeeeee)` | Neutral background. |
| `--uilib-badge-neutral-bg-subtle` | `var(--uilib-color-neutral-50, #fafafa)` | Neutral subtle background. |
| `--uilib-badge-neutral-fg` | `var(--uilib-color-neutral-900, #212121)` | Neutral text. |
| `--uilib-badge-neutral-border` | `var(--uilib-color-neutral-200, #eeeeee)` | Neutral border. |

## Button

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-button-bg` | `var(--uilib-button-secondary-bg, var(--uilib-color-secondary-100, #eeeeee))` | Base background. |
| `--uilib-button-bg-hover` | `var(--uilib-button-bg)` | Hover background. |
| `--uilib-button-bg-active` | `var(--uilib-button-bg-hover, var(--uilib-button-bg))` | Active background. |
| `--uilib-button-border` | `currentColor` | Base border color. |
| `--uilib-button-fg` | `var(--uilib-button-secondary-fg, inherit)` | Base text color. |
| `--uilib-button-fg-hover` | `var(--uilib-button-fg)` | Hover text color. |
| `--uilib-button-radius` | `var(--uilib-radius-md, 8px)` | Border radius. |
| `--uilib-button-gap` | `var(--uilib-space-2, 0.5rem)` | Icon gap. |
| `--uilib-button-icon-gap` | `var(--uilib-space-2, 0.5rem)` | Icon gap (btn element). |
| `--uilib-button-padding` | `var(--uilib-button-padding-medium)` | Padding. |
| `--uilib-button-font-size` | `var(--uilib-button-font-size-medium)` | Font size. |
| `--uilib-button-transition` | `all 0.2s ease` | Transition. |
| `--uilib-button-focus-color` | `var(--uilib-color-primary-500, #1e88e5)` | Focus outline color. |
| `--uilib-button-focus-ring-color` | `var(--uilib-color-primary-100, #bbdefb)` | Focus ring color. |
| `--uilib-button-focus-ring` | `0 0 0 3px var(--uilib-button-focus-ring-color)` | Focus ring. |
| `--uilib-button-disabled-opacity` | `0.5` | Disabled opacity. |
| `--uilib-button-border-width` | `1px` | Border width. |
| `--uilib-button-border-style` | `solid` | Border style. |
| `--uilib-button-shadow` | `var(--uilib-shadow-sm, none)` | Base shadow. |
| `--uilib-button-shadow-hover` | `var(--uilib-shadow-md, var(--uilib-shadow-sm, none))` | Hover shadow. |
| `--uilib-button-text-transform` | `none` | Text transform. |
| `--uilib-button-letter-spacing` | `normal` | Letter spacing. |
| `--uilib-button-padding-small` | `var(--uilib-button-padding-y-small, var(--uilib-space-1, 0.25rem)) var(--uilib-button-padding-x-small, var(--uilib-space-3, 0.75rem))` | Small padding. |
| `--uilib-button-padding-medium` | `var(--uilib-button-padding-y-medium, var(--uilib-space-2, 0.5rem)) var(--uilib-button-padding-x-medium, var(--uilib-space-4, 1rem))` | Medium padding. |
| `--uilib-button-padding-large` | `var(--uilib-button-padding-y-large, var(--uilib-space-3, 0.75rem)) var(--uilib-button-padding-x-large, var(--uilib-space-5, 1.25rem))` | Large padding. |
| `--uilib-button-font-size-small` | `var(--uilib-font-size-sm, 0.875rem)` | Small font size. |
| `--uilib-button-font-size-medium` | `var(--uilib-font-size-md, 1rem)` | Medium font size. |
| `--uilib-button-font-size-large` | `var(--uilib-font-size-lg, 1.125rem)` | Large font size. |
| `--uilib-button-radius-rounded` | `var(--uilib-radius-lg, var(--uilib-radius-md, 8px))` | Rounded radius. |
| `--uilib-button-radius-pill` | `var(--uilib-radius-full, 9999px)` | Pill radius. |
| `--uilib-button-text-fg` | `var(--uilib-button-primary-fg, inherit)` | Text variant fg. |
| `--uilib-button-text-fg-hover` | `var(--uilib-button-primary-fg, var(--uilib-button-text-fg, inherit))` | Text hover fg. |
| `--uilib-button-text-bg` | `transparent` | Text background. |
| `--uilib-button-text-bg-hover` | `transparent` | Text hover background. |
| `--uilib-button-outline-border` | `var(--uilib-button-primary-border, currentColor)` | Outline border. |
| `--uilib-button-outline-border-hover` | `var(--uilib-button-outline-border)` | Outline hover border. |
| `--uilib-button-outline-fg` | `var(--uilib-button-primary-fg, inherit)` | Outline fg. |
| `--uilib-button-outline-fg-hover` | `var(--uilib-button-outline-fg)` | Outline hover fg. |
| `--uilib-button-outline-bg` | `transparent` | Outline bg. |
| `--uilib-button-outline-bg-hover` | `var(--uilib-button-outline-bg)` | Outline hover bg. |
| `--uilib-button-shadow-raised` | `var(--uilib-button-shadow, var(--uilib-shadow-md, none))` | Raised shadow. |
| `--uilib-button-shadow-raised-hover` | `var(--uilib-button-shadow-hover, var(--uilib-shadow-lg, none))` | Raised hover shadow. |
| `--uilib-button-badge-offset-x` | `var(--uilib-space-2, 0.5rem)` | Badge x offset. |
| `--uilib-button-badge-offset-y` | `var(--uilib-space-2, 0.5rem)` | Badge y offset. |
| `--uilib-button-badge-radius` | `var(--uilib-radius-full, 9999px)` | Badge radius. |
| `--uilib-button-badge-shadow` | `var(--uilib-shadow-sm, none)` | Badge shadow. |
| `--uilib-button-badge-font-size` | `var(--uilib-font-size-sm, 0.875rem)` | Badge font size. |
| `--uilib-button-badge-padding` | `var(--uilib-space-1, 0.25rem) var(--uilib-space-2, 0.5rem)` | Badge padding. |
| `--uilib-button-badge-bg` | `var(--uilib-button-danger-bg, currentColor)` | Badge bg. |
| `--uilib-button-badge-fg` | `var(--uilib-button-danger-fg, var(--uilib-color-neutral-50, #fafafa))` | Badge fg. |
| `--uilib-button-primary-bg` | `var(--uilib-color-primary-600, #1e88e5)` | Primary bg. |
| `--uilib-button-primary-bg-hover` | `var(--uilib-color-primary-700, #1976d2)` | Primary hover bg. |
| `--uilib-button-primary-bg-active` | `var(--uilib-button-primary-bg-hover)` | Primary active bg. |
| `--uilib-button-primary-border` | `var(--uilib-color-primary-600, #1e88e5)` | Primary border. |
| `--uilib-button-primary-fg` | `#fff` | Primary fg. |
| `--uilib-button-secondary-bg` | `var(--uilib-color-secondary-600, #757575)` | Secondary bg. |
| `--uilib-button-secondary-bg-hover` | `var(--uilib-color-secondary-700, #616161)` | Secondary hover bg. |
| `--uilib-button-secondary-bg-active` | `var(--uilib-button-secondary-bg-hover)` | Secondary active bg. |
| `--uilib-button-secondary-border` | `var(--uilib-color-secondary-600, #757575)` | Secondary border. |
| `--uilib-button-secondary-fg` | `#fff` | Secondary fg. |
| `--uilib-button-success-bg` | `var(--uilib-color-success-600, #43a047)` | Success bg. |
| `--uilib-button-success-bg-hover` | `var(--uilib-color-success-700, #388e3c)` | Success hover bg. |
| `--uilib-button-success-bg-active` | `var(--uilib-button-success-bg-hover)` | Success active bg. |
| `--uilib-button-success-border` | `var(--uilib-color-success-600, #43a047)` | Success border. |
| `--uilib-button-success-fg` | `#fff` | Success fg. |
| `--uilib-button-danger-bg` | `var(--uilib-color-danger-600, #e53935)` | Danger bg. |
| `--uilib-button-danger-bg-hover` | `var(--uilib-color-danger-700, #d32f2f)` | Danger hover bg. |
| `--uilib-button-danger-bg-active` | `var(--uilib-button-danger-bg-hover)` | Danger active bg. |
| `--uilib-button-danger-border` | `var(--uilib-color-danger-600, #e53935)` | Danger border. |
| `--uilib-button-danger-fg` | `#fff` | Danger fg. |
| `--uilib-button-warning-bg` | `var(--uilib-color-warning-600, #fb8c00)` | Warning bg. |
| `--uilib-button-warning-bg-hover` | `var(--uilib-color-warning-700, #f57c00)` | Warning hover bg. |
| `--uilib-button-warning-bg-active` | `var(--uilib-button-warning-bg-hover)` | Warning active bg. |
| `--uilib-button-warning-border` | `var(--uilib-color-warning-600, #fb8c00)` | Warning border. |
| `--uilib-button-warning-fg` | `#000` | Warning fg. |
| `--uilib-button-info-bg` | `var(--uilib-color-info-700, #0288d1)` | Info bg. |
| `--uilib-button-info-bg-hover` | `var(--uilib-button-info-bg)` | Info hover bg. |
| `--uilib-button-info-bg-active` | `var(--uilib-button-info-bg-hover)` | Info active bg. |
| `--uilib-button-info-border` | `var(--uilib-button-info-bg)` | Info border. |
| `--uilib-button-info-fg` | `var(--uilib-button-secondary-fg, inherit)` | Info fg. |
| `--uilib-button-help-bg` | `var(--uilib-color-help-600, #7e22ce)` | Help bg. |
| `--uilib-button-help-bg-hover` | `var(--uilib-button-help-bg)` | Help hover bg. |
| `--uilib-button-help-bg-active` | `var(--uilib-button-help-bg-hover)` | Help active bg. |
| `--uilib-button-help-border` | `var(--uilib-button-help-bg)` | Help border. |
| `--uilib-button-help-fg` | `var(--uilib-button-secondary-fg, inherit)` | Help fg. |
| `--uilib-button-contrast-bg` | `var(--uilib-color-neutral-900, #000)` | Contrast bg. |
| `--uilib-button-contrast-bg-hover` | `var(--uilib-button-contrast-bg)` | Contrast hover bg. |
| `--uilib-button-contrast-bg-active` | `var(--uilib-button-contrast-bg-hover)` | Contrast active bg. |
| `--uilib-button-contrast-border` | `var(--uilib-button-contrast-bg)` | Contrast border. |
| `--uilib-button-contrast-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Contrast fg. |

## Card

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-card-bg` | `var(--uilib-surface, #ffffff)` | Card background. |
| `--uilib-card-text-color` | `var(--uilib-page-fg, #1f2933)` | Card text color. |
| `--uilib-card-border` | `var(--uilib-border, #e0e0e0)` | Card border. |
| `--uilib-card-radius` | `var(--uilib-radius-lg, 12px)` | Card radius. |
| `--uilib-card-border-width` | `0` | Border width. |
| `--uilib-card-header-padding` | `var(--uilib-card-header-padding-base, var(--uilib-space-3, 0.75rem) var(--uilib-space-4, 1rem))` | Header padding. |
| `--uilib-card-body-padding` | `var(--uilib-card-body-padding-base, 1.5rem)` | Body padding. |
| `--uilib-card-footer-padding` | `var(--uilib-card-footer-padding-base, var(--uilib-space-4, 1rem) var(--uilib-space-5, 1.25rem))` | Footer padding. |
| `--uilib-card-header-bg` | `var(--uilib-surface-alt, var(--uilib-card-bg, inherit))` | Header background. |
| `--uilib-card-footer-bg` | `var(--uilib-surface-alt, var(--uilib-card-bg, inherit))` | Footer background. |
| `--uilib-card-shadow` | `var(--uilib-card-shadow-medium, none)` | Base shadow. |
| `--uilib-card-shadow-hover` | `var(--uilib-card-shadow, var(--uilib-card-shadow-medium, none))` | Hover shadow. |
| `--uilib-card-shadow-none` | `none` | Shadow none. |
| `--uilib-card-shadow-low` | `none` | Shadow low. |
| `--uilib-card-shadow-medium` | `none` | Shadow medium. |
| `--uilib-card-shadow-high` | `none` | Shadow high. |

## Chart

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-chart-min-height-sm` | `200px` | Minimum container height for `sm` charts. |
| `--uilib-chart-min-height-md` | `300px` | Minimum container height for `md` charts. |
| `--uilib-chart-min-height-lg` | `400px` | Minimum container height for `lg` charts. |
| `--uilib-chart-min-height` | `var(--uilib-chart-min-height-md)` | Active chart container minimum height. |
| `--uilib-chart-font-family` | `var(--uilib-font-family, inherit)` | Font family forwarded to Chart.js defaults. |
| `--uilib-chart-font-size` | `12` | Font size forwarded to Chart.js defaults. |
| `--uilib-chart-font-color` | `var(--uilib-text-color, #333333)` | Base chart text color. |
| `--uilib-chart-grid-color` | `var(--uilib-border-color, rgba(0, 0, 0, 0.1))` | Grid line color. |
| `--uilib-chart-border-color` | `var(--uilib-border-color, rgba(0, 0, 0, 0.1))` | Axis/element border color. |
| `--uilib-chart-background-color` | `transparent` | Dataset background fallback color. |
| `--uilib-chart-tooltip-background` | `rgba(0, 0, 0, 0.8)` | Tooltip panel background color. |
| `--uilib-chart-tooltip-font-color` | `#ffffff` | Tooltip text color. |
| `--uilib-chart-legend-font-color` | `var(--uilib-text-color-secondary, #666666)` | Legend label text color. |
| `--uilib-chart-color-1` | `var(--uilib-color-primary-500, #4285f4)` | Palette slot 1. |
| `--uilib-chart-color-2` | `var(--uilib-color-danger-500, #ea4335)` | Palette slot 2. |
| `--uilib-chart-color-3` | `var(--uilib-color-warning-500, #fbbc04)` | Palette slot 3. |
| `--uilib-chart-color-4` | `var(--uilib-color-success-500, #34a853)` | Palette slot 4. |
| `--uilib-chart-color-5` | `#ff6d01` | Palette slot 5. |
| `--uilib-chart-color-6` | `#46bdc6` | Palette slot 6. |
| `--uilib-chart-color-7` | `#7baaf7` | Palette slot 7. |
| `--uilib-chart-color-8` | `#f07b72` | Palette slot 8. |

## ColorPicker

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-colorpicker-trigger-width` | `2rem` | Trigger swatch width. |
| `--uilib-colorpicker-trigger-height` | `2rem` | Trigger swatch height. |
| `--uilib-colorpicker-trigger-border-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 4px))` | Trigger border radius. |
| `--uilib-colorpicker-trigger-border-color` | `var(--uilib-input-border, var(--uilib-border, #d1d5db))` | Trigger border color. |
| `--uilib-colorpicker-panel-width` | `196px` | Popup panel width. |
| `--uilib-colorpicker-panel-padding` | `0.75rem` | Popup panel inner spacing. |
| `--uilib-colorpicker-panel-bg` | `var(--uilib-surface, #fff)` | Popup panel background. |
| `--uilib-colorpicker-panel-border-color` | `var(--uilib-border, #e5e7eb)` | Popup panel border color. |
| `--uilib-colorpicker-panel-border-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 6px))` | Popup panel border radius. |
| `--uilib-colorpicker-panel-shadow` | `0 4px 12px rgb(0 0 0 / 15%)` | Popup panel shadow. |
| `--uilib-colorpicker-hue-slider-width` | `18px` | Hue slider width. |
| `--uilib-colorpicker-hue-slider-height` | `11rem` | Hue slider height. |
| `--uilib-colorpicker-selector-size` | `12px` | Selector indicator size. |
| `--uilib-colorpicker-transition-duration` | `200ms` | Trigger/panel transition duration. |

## DatePicker

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-datepicker-input-bg` | `var(--uilib-input-bg, var(--uilib-surface, #ffffff))` | Input trigger background. |
| `--uilib-datepicker-input-color` | `var(--uilib-input-text, var(--uilib-page-fg, #1f2933))` | Input trigger text color. |
| `--uilib-datepicker-input-border-color` | `var(--uilib-input-border, var(--uilib-border, #d1d5db))` | Input border color. |
| `--uilib-datepicker-input-border-color-hover` | `var(--uilib-datepicker-input-border-color, var(--uilib-input-border, var(--uilib-border, #d1d5db)))` | Input hover border color. |
| `--uilib-datepicker-input-border-color-focus` | `var(--uilib-input-border-focus, var(--uilib-color-primary-600, #1e88e5))` | Input focus border color. |
| `--uilib-datepicker-input-border-radius` | `var(--uilib-input-radius, var(--uilib-radius-md, 0.5rem))` | Input border radius. |
| `--uilib-datepicker-input-padding-y` | `var(--uilib-space-2, 0.5rem)` | Input vertical padding. |
| `--uilib-datepicker-input-padding-x` | `var(--uilib-space-3, 0.75rem)` | Input horizontal padding. |
| `--uilib-datepicker-input-min-height` | `2.75rem` | Input minimum height. |
| `--uilib-datepicker-filled-bg` | `var(--uilib-surface-alt, #f3f4f6)` | Filled input background. |
| `--uilib-datepicker-invalid-border-color` | `var(--uilib-color-danger-600, #e53935)` | Invalid input border color. |
| `--uilib-datepicker-focus-ring` | `0 0 0 3px color-mix(in srgb, var(--uilib-datepicker-input-border-color-focus, var(--uilib-color-primary-600, #1e88e5)) 24%, transparent)` | Shared focus ring. |
| `--uilib-datepicker-panel-bg` | `var(--uilib-surface, #ffffff)` | Popup panel background. |
| `--uilib-datepicker-panel-color` | `var(--uilib-page-fg, #1f2933)` | Popup panel text color. |
| `--uilib-datepicker-panel-border-color` | `var(--uilib-border, #d1d5db)` | Popup panel border color. |
| `--uilib-datepicker-panel-border-radius` | `var(--uilib-radius-lg, 0.75rem)` | Popup panel border radius. |
| `--uilib-datepicker-panel-shadow` | `var(--uilib-shadow-lg, 0 12px 28px rgb(0 0 0 / 16%))` | Popup panel shadow. |
| `--uilib-datepicker-panel-padding` | `var(--uilib-space-3, 0.75rem)` | Popup panel inner padding. |
| `--uilib-datepicker-panel-max-height` | `28rem` | Popup panel max height. |
| `--uilib-datepicker-z-index` | `var(--uilib-z-overlay, 20)` | Popup z-index. |
| `--uilib-datepicker-day-cell-size` | `2.25rem` | Day cell size. |
| `--uilib-datepicker-day-font-size` | `var(--uilib-font-size-sm, 0.875rem)` | Day cell font size. |
| `--uilib-datepicker-day-border-radius` | `0.5rem` | Day cell border radius. |
| `--uilib-datepicker-day-bg-hover` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 12%, transparent)` | Day hover background. |
| `--uilib-datepicker-day-bg-today` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 16%, transparent)` | Today highlight background. |
| `--uilib-datepicker-day-color-today` | `var(--uilib-color-primary-700, #1976d2)` | Today text/border color. |
| `--uilib-datepicker-day-bg-selected` | `var(--uilib-color-primary-600, #1e88e5)` | Selected day background. |
| `--uilib-datepicker-day-color-selected` | `var(--uilib-color-neutral-50, #fafafa)` | Selected day text color. |
| `--uilib-datepicker-day-bg-range-between` | `color-mix(in srgb, var(--uilib-datepicker-day-bg-selected, #1e88e5) 22%, transparent)` | In-range band background. |
| `--uilib-datepicker-day-color-disabled` | `color-mix(in srgb, var(--uilib-page-fg, #1f2933) 38%, transparent)` | Disabled day color. |
| `--uilib-datepicker-day-color-other-month` | `var(--uilib-muted, #6b7280)` | Outside-month day color. |
| `--uilib-datepicker-month-year-cell-min-height` | `2.5rem` | Month/year cell min height. |
| `--uilib-datepicker-month-year-cell-radius` | `0.5rem` | Month/year cell border radius. |
| `--uilib-datepicker-time-input-width` | `2.5rem` | Time spinner input width. |
| `--uilib-datepicker-time-input-height` | `2rem` | Time spinner input height. |
| `--uilib-datepicker-time-input-bg` | `var(--uilib-surface, #ffffff)` | Time spinner input background. |
| `--uilib-datepicker-time-input-border-color` | `var(--uilib-border, #d1d5db)` | Time spinner input border color. |
| `--uilib-datepicker-time-button-size` | `1.625rem` | Time spinner button size. |
| `--uilib-datepicker-time-button-bg` | `var(--uilib-surface, #ffffff)` | Time spinner button background. |
| `--uilib-datepicker-time-button-bg-hover` | `var(--uilib-datepicker-day-bg-hover, color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 12%, transparent))` | Time spinner button hover background. |
| `--uilib-datepicker-time-separator-color` | `var(--uilib-muted, #6b7280)` | Time separator color. |
| `--uilib-datepicker-time-ampm-min-width` | `2.75rem` | AM/PM toggle minimum width. |
| `--uilib-datepicker-buttonbar-padding-top` | `var(--uilib-space-2, 0.5rem)` | Button bar top padding. |
| `--uilib-datepicker-buttonbar-gap` | `var(--uilib-space-2, 0.5rem)` | Button bar item gap. |
| `--uilib-datepicker-buttonbar-border-color` | `color-mix(in srgb, var(--uilib-datepicker-panel-border-color, #d1d5db) 65%, transparent)` | Button bar separator color. |
| `--uilib-datepicker-transition-fast` | `var(--uilib-transition-fast, 150ms ease)` | Fast transition token. |
| `--uilib-datepicker-transition-normal` | `var(--uilib-transition-normal, 200ms ease)` | Normal transition token. |
| `--uilib-datepicker-panel-shadow-material` | `var(--uilib-shadow-xl, 0 20px 40px rgb(0 0 0 / 18%))` | Material panel elevation override. |
| `--uilib-datepicker-panel-shadow-bootstrap` | `var(--uilib-shadow-md, 0 8px 20px rgb(0 0 0 / 12%))` | Bootstrap panel elevation override. |
| `--uilib-datepicker-panel-shadow-minimal` | `none` | Minimal panel elevation override. |
| `--uilib-datepicker-day-bg-selected-material` | `var(--uilib-color-primary-600, #1e88e5)` | Material selected-day background. |
| `--uilib-datepicker-day-bg-selected-bootstrap` | `var(--uilib-color-primary-700, #0d6efd)` | Bootstrap selected-day background. |
| `--uilib-datepicker-day-bg-selected-minimal` | `var(--uilib-color-help-600, #7e22ce)` | Minimal selected-day background. |

## Editor

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-editor-toolbar-bg` | `var(--uilib-surface-alt, #f8fafc)` | Toolbar background. |
| `--uilib-editor-toolbar-border-color` | `var(--uilib-border, #d1d5db)` | Toolbar and host border color. |
| `--uilib-editor-toolbar-item-color` | `var(--uilib-page-fg, #111827)` | Toolbar item color. |
| `--uilib-editor-toolbar-item-hover-color` | `var(--uilib-page-fg, #0f172a)` | Toolbar item hover color. |
| `--uilib-editor-toolbar-item-hover-bg` | `color-mix(in srgb, #000000 8%, transparent)` | Toolbar item hover background. |
| `--uilib-editor-toolbar-item-active-color` | `var(--uilib-page-fg, #0f172a)` | Toolbar active item color. |
| `--uilib-editor-toolbar-item-active-bg` | `color-mix(in srgb, #000000 12%, transparent)` | Toolbar active item background. |
| `--uilib-editor-toolbar-separator-color` | `#cbd5e1` | Toolbar separator color. |
| `--uilib-editor-toolbar-padding` | `8px` | Toolbar padding. |
| `--uilib-editor-toolbar-gap` | `4px` | Toolbar item gap. |
| `--uilib-editor-toolbar-border-radius` | `8px` | Toolbar corner radius. |
| `--uilib-editor-content-bg` | `var(--uilib-surface, #ffffff)` | Content background. |
| `--uilib-editor-content-border-color` | `var(--uilib-border, #d1d5db)` | Content border color. |
| `--uilib-editor-content-font-family` | `var(--uilib-font-ui, system-ui, sans-serif)` | Content font family. |
| `--uilib-editor-content-font-size` | `14px` | Content font size. |
| `--uilib-editor-content-line-height` | `1.6` | Content line height. |
| `--uilib-editor-content-color` | `var(--uilib-page-fg, #111827)` | Content text color. |
| `--uilib-editor-content-padding` | `12px 16px` | Content padding. |
| `--uilib-editor-content-min-height` | `150px` | Content min height. |
| `--uilib-editor-placeholder-color` | `#94a3b8` | Placeholder color for empty contenteditable state. |
| `--uilib-editor-border-radius` | `8px` | Host border radius. |
| `--uilib-editor-focus-ring-color` | `color-mix(in srgb, #2563eb 45%, transparent)` | Focus ring color. |
| `--uilib-editor-focus-ring-width` | `2px` | Focus ring width. |
| `--uilib-editor-disabled-opacity` | `0.6` | Disabled state opacity. |

## Checkbox

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-checkbox-gap` | `var(--uilib-space-3, 0.75rem)` | Gap between box and label. |
| `--uilib-checkbox-border-color` | `var(--uilib-color-neutral-400, #bdbdbd)` | Base border color. |
| `--uilib-checkbox-border-hover-color` | `var(--uilib-color-primary-500, #1e88e5)` | Hover border color. |
| `--uilib-checkbox-border-active-color` | `var(--uilib-color-primary-600, #1e88e5)` | Active border color. |
| `--uilib-checkbox-bg-color` | `var(--uilib-surface, #ffffff)` | Base background. |
| `--uilib-checkbox-bg-checked-color` | `var(--uilib-color-primary-500, #1e88e5)` | Checked background. |
| `--uilib-checkbox-check-color` | `var(--uilib-color-neutral-50, #fafafa)` | Checkmark color. |
| `--uilib-checkbox-description-color` | `var(--uilib-color-neutral-600, #5f6c80)` | Description color. |
| `--uilib-checkbox-radius-value` | `var(--uilib-radius-sm, 4px)` | Checkbox radius. |
| `--uilib-checkbox-focus-ring` | `0 0 0 3px color-mix(in srgb, var(--uilib-checkbox-border-hover) 30%, transparent)` | Focus ring. |
| `--uilib-checkbox-size-sm` | `1rem` | Small size. |
| `--uilib-checkbox-size-md` | `1.25rem` | Medium size. |
| `--uilib-checkbox-size-lg` | `1.5rem` | Large size. |
| `--uilib-checkbox-font` | `var(--uilib-font-ui, inherit)` | Font family. |
| `--uilib-checkbox-shadow` | `none` | Shadow. |
| `--uilib-checkbox-size` | `var(--uilib-checkbox-size-md)` | Active size. |

## Icon

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-icon-color` | `currentColor` | Icon color. |
| `--uilib-icon-transition` | `var(--uilib-transition-fast, 150ms ease)` | Transition. |
| `--uilib-icon-size-xs` | `0.75rem` | Extra-small icon size. |
| `--uilib-icon-size-sm` | `1rem` | Small icon size. |
| `--uilib-icon-size-md` | `1.25rem` | Medium icon size. |
| `--uilib-icon-size-lg` | `1.5rem` | Large icon size. |
| `--uilib-icon-size-xl` | `2rem` | Extra-large icon size. |
| `--uilib-icon-size-2xl` | `2.5rem` | 2XL icon size. |

## Icon Field

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-icon-field-icon-color` | `var(--uilib-muted, currentColor)` | Default icon color. |
| `--uilib-icon-field-icon-color-bootstrap` | `var(--uilib-icon-field-icon-color)` | Bootstrap-specific icon color override. |
| `--uilib-icon-field-icon-color-minimal` | `var(--uilib-icon-field-icon-color)` | Minimal-specific icon color override. |
| `--uilib-icon-field-icon-margin` | `0.75rem` | Icon horizontal inset from input edge. |
| `--uilib-icon-field-icon-margin-minimal` | `var(--uilib-icon-field-icon-margin)` | Minimal variant icon inset. |
| `--uilib-icon-field-icon-size` | `1rem` | Base icon size. |
| `--uilib-icon-field-input-padding-with-icon` | `2.5rem` | Input side padding when an icon is present. |
| `--uilib-icon-field-input-padding-with-icon-sm` | `2rem` | Small-size input side padding with icon. |
| `--uilib-icon-field-input-padding-with-icon-lg` | `3rem` | Large-size input side padding with icon. |

## Input

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-input-bg` | `var(--uilib-surface, #ffffff)` | Input background. |
| `--uilib-input-border` | `var(--uilib-border, #e5e7eb)` | Input border. |
| `--uilib-input-border-focus` | `var(--uilib-color-primary-600, #1e88e5)` | Focus border. |
| `--uilib-input-text` | `var(--uilib-page-fg, #1f2933)` | Input text. |
| `--uilib-input-placeholder` | `var(--uilib-muted, #6b7280)` | Placeholder text. |
| `--uilib-input-radius` | `var(--uilib-radius-md, 8px)` | Input radius. |
| `--uilib-input-error` | `var(--uilib-color-danger-600, #e53935)` | Error color. |
| `--uilib-input-label-color` | `var(--uilib-input-text, var(--uilib-page-fg, #1f2933))` | Label color. |
| `--uilib-input-label-bg` | `var(--uilib-input-bg, var(--uilib-surface, #ffffff))` | Floating label background. |
| `--uilib-input-label-floating-scale` | `0.85` | Floating label scale. |
| `--uilib-input-label-offset-x` | `0` | Floating label x offset. |
| `--uilib-input-label-padding-x` | `var(--uilib-input-padding-x, 0.75rem)` | Label x padding. |
| `--uilib-input-label-padding-y` | `var(--uilib-input-padding-y, 0.5rem)` | Label y padding. |
| `--uilib-input-label-on-offset` | `0.65rem` | Float-on offset. |
| `--uilib-input-float-in-extra-pad` | `0.35rem` | Float-in extra padding. |
| `--uilib-input-padding-x` | `var(--uilib-input-padding-x-base, 0.5rem)` | Input horizontal padding. |
| `--uilib-input-padding-y` | `var(--uilib-input-padding-y-base, 1rem)` | Input vertical padding. |
| `--uilib-input-min-height` | `var(--uilib-touch-size-min, 44px)` | Input min height. |

## InputNumber

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-input-number-gap` | `var(--uilib-space-2, 0.5rem)` | Gap between input and spinner controls. |
| `--uilib-input-number-border-width` | `var(--uilib-border-width, 1px)` | Wrapper border width. |
| `--uilib-input-number-border-radius` | `var(--uilib-radius-md, 0.5rem)` | Wrapper border radius. |
| `--uilib-input-number-bg` | `var(--uilib-input-bg, var(--uilib-surface, #ffffff))` | Input wrapper background. |
| `--uilib-input-number-text` | `var(--uilib-input-text, var(--uilib-page-fg, #1f2933))` | Input text color. |
| `--uilib-input-number-border-color` | `var(--uilib-input-border, var(--uilib-border, #d1d5db))` | Wrapper border color. |
| `--uilib-input-number-border-color-hover` | `var(--uilib-input-border-hover, var(--uilib-input-number-border-color))` | Hover border color. |
| `--uilib-input-number-border-color-focus` | `var(--uilib-input-border-focus, var(--uilib-color-primary-600, #1e88e5))` | Focus border color. |
| `--uilib-input-number-focus-ring` | `0 0 0 var(--uilib-focus-ring-width, 2px) color-mix(in srgb, var(--uilib-input-number-border-color-focus) 28%, transparent)` | Focus ring shadow. |
| `--uilib-input-number-placeholder-color` | `var(--uilib-input-placeholder, var(--uilib-muted, #6b7280))` | Placeholder color. |
| `--uilib-input-number-prefix-color` | `var(--uilib-input-number-placeholder-color)` | Prefix text color. |
| `--uilib-input-number-suffix-color` | `var(--uilib-input-number-placeholder-color)` | Suffix text color. |
| `--uilib-input-number-filled-bg` | `var(--uilib-surface-alt, #f3f4f6)` | Filled mode background. |
| `--uilib-input-number-invalid-border-color` | `var(--uilib-color-danger-600, #e53935)` | Invalid border color. |
| `--uilib-input-number-disabled-opacity` | `var(--uilib-disabled-opacity, 0.6)` | Disabled host opacity. |
| `--uilib-input-number-font-family` | `var(--uilib-font-ui, inherit)` | Font family. |
| `--uilib-input-number-font-weight` | `var(--uilib-font-weight-400, 400)` | Font weight. |
| `--uilib-input-number-font-size` | `var(--uilib-input-number-font-size-md)` | Active font size. |
| `--uilib-input-number-font-size-sm` | `var(--uilib-font-size-sm, 0.875rem)` | Small size font. |
| `--uilib-input-number-font-size-md` | `var(--uilib-font-size-md, 1rem)` | Medium size font. |
| `--uilib-input-number-font-size-lg` | `var(--uilib-font-size-lg, 1.125rem)` | Large size font. |
| `--uilib-input-number-input-height` | `var(--uilib-input-number-height-md)` | Active input height. |
| `--uilib-input-number-height-sm` | `var(--uilib-size-9, 2.25rem)` | Small input height. |
| `--uilib-input-number-height-md` | `var(--uilib-size-11, 2.75rem)` | Medium input height. |
| `--uilib-input-number-height-lg` | `var(--uilib-size-12, 3.125rem)` | Large input height. |
| `--uilib-input-number-padding-y` | `var(--uilib-input-number-padding-y-md)` | Active vertical padding. |
| `--uilib-input-number-padding-x` | `var(--uilib-input-number-padding-x-md)` | Active horizontal padding. |
| `--uilib-input-number-padding-y-sm` | `var(--uilib-space-1, 0.25rem)` | Small vertical padding. |
| `--uilib-input-number-padding-y-md` | `var(--uilib-space-2, 0.5rem)` | Medium vertical padding. |
| `--uilib-input-number-padding-y-lg` | `var(--uilib-space-3, 0.75rem)` | Large vertical padding. |
| `--uilib-input-number-padding-x-sm` | `var(--uilib-space-2, 0.5rem)` | Small horizontal padding. |
| `--uilib-input-number-padding-x-md` | `var(--uilib-space-3, 0.75rem)` | Medium horizontal padding. |
| `--uilib-input-number-padding-x-lg` | `var(--uilib-space-4, 1rem)` | Large horizontal padding. |
| `--uilib-input-number-button-width` | `var(--uilib-input-number-button-width-md)` | Active spinner button width. |
| `--uilib-input-number-button-width-sm` | `var(--uilib-size-8, 2rem)` | Small spinner button width. |
| `--uilib-input-number-button-width-md` | `var(--uilib-size-9, 2.25rem)` | Medium spinner button width. |
| `--uilib-input-number-button-width-lg` | `var(--uilib-size-10, 2.5rem)` | Large spinner button width. |
| `--uilib-input-number-button-bg` | `var(--uilib-surface-alt, var(--uilib-input-number-bg))` | Spinner button background. |
| `--uilib-input-number-button-text` | `var(--uilib-input-number-text)` | Spinner button text color. |
| `--uilib-input-number-button-border-color` | `var(--uilib-input-number-border-color)` | Spinner button border color. |
| `--uilib-input-number-button-hover-background` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 10%, var(--uilib-input-number-button-bg))` | Spinner hover background. |
| `--uilib-input-number-button-active-background` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 18%, var(--uilib-input-number-button-bg))` | Spinner active background. |
| `--uilib-input-number-button-disabled-opacity` | `var(--uilib-disabled-opacity, 0.45)` | Spinner disabled opacity. |
| `--uilib-input-number-clear-color` | `var(--uilib-input-number-placeholder-color)` | Clear button icon color. |
| `--uilib-input-number-clear-size` | `var(--uilib-font-size-base, 1rem)` | Clear button icon size. |
| `--uilib-input-number-clear-offset` | `var(--uilib-space-2, 0.5rem)` | Clear button offset from edge. |

## InputMask

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-input-mask-padding-y` | `var(--uilib-space-2, 0.5rem)` | Vertical input padding. |
| `--uilib-input-mask-padding-x` | `var(--uilib-space-3, 0.75rem)` | Horizontal input padding. |
| `--uilib-input-mask-font-size` | `var(--uilib-font-size-base, 1rem)` | Input font size. |
| `--uilib-input-mask-border-radius` | `var(--uilib-radius-md, 0.5rem)` | Input border radius. |
| `--uilib-input-mask-border-color` | `var(--uilib-border, currentColor)` | Input border color. |
| `--uilib-input-mask-bg` | `var(--uilib-surface, transparent)` | Input background. |
| `--uilib-input-mask-text-color` | `var(--uilib-page-fg, currentColor)` | Input text color. |
| `--uilib-input-mask-placeholder-color` | `var(--uilib-muted, currentColor)` | Placeholder text color. |
| `--uilib-input-mask-focus-border-color` | `var(--uilib-color-primary-600, currentColor)` | Focus border color. |
| `--uilib-input-mask-focus-ring` | `0 0 0 0.1875rem color-mix(in srgb, var(--uilib-input-mask-focus-border-color) 28%, transparent)` | Focus ring shadow. |
| `--uilib-input-mask-invalid-border-color` | `var(--uilib-color-danger-600, currentColor)` | Invalid-state border color. |
| `--uilib-input-mask-filled-bg` | `color-mix(in srgb, var(--uilib-input-mask-bg) 84%, var(--uilib-color-neutral-900, currentColor) 4%)` | Filled appearance background. |
| `--uilib-input-mask-icon-color` | `var(--uilib-muted, currentColor)` | Clear icon color. |
| `--uilib-input-mask-clear-icon-size` | `1rem` | Clear icon size. |
| `--uilib-input-mask-disabled-opacity` | `0.6` | Disabled host opacity. |

## Login

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-login-background-color` | `var(--uilib-page-bg, #f7f7f9)` | Screen background. |
| `--uilib-login-text-color` | `var(--uilib-page-fg, #1f2933)` | Base text color. |
| `--uilib-login-surface-color` | `var(--uilib-surface, #ffffff)` | Surface color. |
| `--uilib-login-card-shadow` | `var(--uilib-shadow-md, none)` | Card shadow. |
| `--uilib-login-border-color` | `var(--uilib-border, #e5e7eb)` | Border color. |
| `--uilib-login-primary-color` | `var(--uilib-color-primary-600, #1e88e5)` | Primary color. |
| `--uilib-login-primary-color-rgb` | `25 118 210` | Primary rgb value. |
| `--uilib-login-text-color-secondary` | `var(--uilib-muted, #6b7280)` | Secondary text. |
| `--uilib-login-surface-hover` | `color-mix(in srgb, currentColor 6%, transparent)` | Hover surface. |
| `--uilib-login-danger-color` | `var(--uilib-color-danger-600, #e53935)` | Error color. |

## Login 1

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-login-1-card-radius` | `var(--uilib-card-radius, var(--uilib-radius-lg, 12px))` | Login card radius override. |

## Login Form

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-login-form-card-bg` | `var(--uilib-card-bg, #ffffff)` | Form card background. |
| `--uilib-login-form-card-text` | `var(--uilib-card-text-color, #1f2933)` | Form card text. |
| `--uilib-login-form-card-border` | `var(--uilib-card-border, #e5e7eb)` | Form card border. |
| `--uilib-login-form-surface` | `var(--uilib-surface, #ffffff)` | Form surface. |
| `--uilib-login-form-muted` | `var(--uilib-muted, #6b7280)` | Form muted text. |

## Select

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-select-bg` | `var(--uilib-surface, #ffffff)` | Control background. |
| `--uilib-select-border` | `var(--uilib-border, #e5e7eb)` | Control border. |
| `--uilib-select-radius` | `var(--uilib-radius-md, 8px)` | Control radius. |
| `--uilib-select-dropdown-bg` | `var(--uilib-surface, #ffffff)` | Panel background. |
| `--uilib-select-dropdown-shadow` | `var(--uilib-shadow-md, none)` | Panel shadow. |
| `--uilib-select-option-hover` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 8%, transparent)` | Option hover. |

## Select Button

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-select-button-gap` | `0` | Item gap. |
| `--uilib-select-button-border-radius` | `var(--uilib-radius-md, 8px)` | Control radius. |
| `--uilib-select-button-bg` | `var(--uilib-surface-100, #f5f5f5)` | Base background. |
| `--uilib-select-button-border` | `var(--uilib-border-color, #e5e7eb)` | Base border. |
| `--uilib-select-button-selected-bg` | `var(--uilib-color-primary-500, #1e88e5)` | Selected background. |
| `--uilib-select-button-selected-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Selected text. |
| `--uilib-select-button-hover-bg` | `var(--uilib-surface-200, #eeeeee)` | Hover background. |
| `--uilib-select-button-shadow` | `none` | Shadow. |
| `--uilib-select-button-disabled-opacity` | `0.6` | Disabled opacity. |
| `--uilib-select-button-invalid-border` | `var(--uilib-color-danger-600, #e53935)` | Invalid border. |
| `--uilib-select-button-fg` | `var(--uilib-page-fg, #1f2933)` | Base text color. |
| `--uilib-select-button-material-border-radius` | `var(--uilib-radius-md, 8px)` | Material radius. |
| `--uilib-select-button-material-bg` | `var(--uilib-surface-100, #f5f5f5)` | Material background. |
| `--uilib-select-button-material-selected-bg` | `var(--uilib-color-primary-500, #1e88e5)` | Material selected bg. |
| `--uilib-select-button-material-selected-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Material selected fg. |
| `--uilib-select-button-material-hover-bg` | `var(--uilib-surface-200, #eeeeee)` | Material hover bg. |
| `--uilib-select-button-material-border` | `var(--uilib-border-color, #e5e7eb)` | Material border. |
| `--uilib-select-button-material-shadow` | `0 2px 4px rgba(0, 0, 0, 0.1)` | Material shadow. |
| `--uilib-select-button-bootstrap-border-radius` | `var(--uilib-radius-md, 8px)` | Bootstrap radius. |
| `--uilib-select-button-bootstrap-bg` | `var(--uilib-surface-100, #f5f5f5)` | Bootstrap bg. |
| `--uilib-select-button-bootstrap-selected-bg` | `var(--uilib-color-primary-500, #1e88e5)` | Bootstrap selected bg. |
| `--uilib-select-button-bootstrap-selected-fg` | `var(--uilib-color-neutral-50, #fafafa)` | Bootstrap selected fg. |
| `--uilib-select-button-bootstrap-hover-bg` | `var(--uilib-surface-200, #eeeeee)` | Bootstrap hover bg. |
| `--uilib-select-button-bootstrap-border` | `var(--uilib-border-color, #e5e7eb)` | Bootstrap border. |
| `--uilib-select-button-minimal-border-radius` | `0` | Minimal radius. |
| `--uilib-select-button-minimal-bg` | `transparent` | Minimal bg. |
| `--uilib-select-button-minimal-selected-bg` | `var(--uilib-surface-200, #eeeeee)` | Minimal selected bg. |
| `--uilib-select-button-minimal-selected-fg` | `var(--uilib-page-fg, #1f2933)` | Minimal selected fg. |
| `--uilib-select-button-minimal-hover-bg` | `var(--uilib-surface-100, #f5f5f5)` | Minimal hover bg. |
| `--uilib-select-button-minimal-border` | `transparent` | Minimal border. |
| `--uilib-select-button-small-padding` | `0.5rem 0.75rem` | Small padding. |
| `--uilib-select-button-small-font-size` | `0.875rem` | Small font size. |
| `--uilib-select-button-small-min-height` | `2rem` | Small min height. |
| `--uilib-select-button-medium-padding` | `0.625rem 1rem` | Medium padding. |
| `--uilib-select-button-medium-font-size` | `1rem` | Medium font size. |
| `--uilib-select-button-medium-min-height` | `2.5rem` | Medium min height. |
| `--uilib-select-button-large-padding` | `0.75rem 1.25rem` | Large padding. |
| `--uilib-select-button-large-font-size` | `1.125rem` | Large font size. |
| `--uilib-select-button-large-min-height` | `3rem` | Large min height. |

## SpeedDial

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-speed-dial-button-size` | `var(--uilib-speed-dial-size-button-md, 3.25rem)` | Trigger button size. |
| `--uilib-speed-dial-button-bg` | `var(--uilib-color-primary-600, #1e88e5)` | Trigger button background. |
| `--uilib-speed-dial-button-color` | `var(--uilib-color-neutral-50, #fafafa)` | Trigger button foreground/icon color. |
| `--uilib-speed-dial-button-shadow` | `var(--uilib-shadow-lg, none)` | Trigger button shadow. |
| `--uilib-speed-dial-item-size` | `var(--uilib-speed-dial-size-item-md, 2.75rem)` | Action item size. |
| `--uilib-speed-dial-item-bg` | `var(--uilib-color-primary-600, #1e88e5)` | Action item background. |
| `--uilib-speed-dial-item-color` | `var(--uilib-color-neutral-50, #fafafa)` | Action item foreground/icon color. |
| `--uilib-speed-dial-item-shadow` | `var(--uilib-shadow-md, none)` | Action item shadow. |
| `--uilib-speed-dial-gap` | `var(--uilib-space-2, 0.5rem)` | Gap between trigger and list/actions in linear layouts. |
| `--uilib-speed-dial-radius` | `var(--uilib-radius-full, 9999px)` | Shared trigger/item border radius. |
| `--uilib-speed-dial-mask-bg` | `color-mix(in srgb, var(--uilib-overlay-backdrop-bg, var(--uilib-color-neutral-900, #212121)) 50%, transparent)` | Backdrop mask color. |
| `--uilib-speed-dial-mask-z` | `var(--uilib-z-backdrop, 1040)` | Backdrop mask z-index. |
| `--uilib-speed-dial-list-z` | `var(--uilib-z-overlay, 1060)` | Action list z-index. |
| `--uilib-speed-dial-transition-duration` | `var(--uilib-transition-md, 200ms)` | Base transition duration. |
| `--uilib-speed-dial-transition-easing` | `var(--uilib-transition-ease-out, ease-out)` | Base transition easing. |
| `--uilib-speed-dial-rotate-open` | `45deg` | Trigger icon rotation angle when open (`--rotate` mode). |
| `--uilib-speed-dial-focus-ring` | `0 0 0 var(--uilib-border-width-2, 2px) color-mix(in srgb, var(--uilib-color-primary-500, #2196f3) 30%, transparent)` | Focus ring for trigger/items. |
| `--uilib-speed-dial-size-button-sm` | `2.5rem` | Small trigger button size token. |
| `--uilib-speed-dial-size-button-md` | `3.25rem` | Medium trigger button size token. |
| `--uilib-speed-dial-size-button-lg` | `4rem` | Large trigger button size token. |
| `--uilib-speed-dial-size-item-sm` | `2.25rem` | Small action item size token. |
| `--uilib-speed-dial-size-item-md` | `2.75rem` | Medium action item size token. |
| `--uilib-speed-dial-size-item-lg` | `3.25rem` | Large action item size token. |

## SplitButton

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-split-button-bg` | `var(--uilib-button-secondary-bg, var(--uilib-color-secondary-600, var(--uilib-color-neutral-600, currentColor)))` | Shared background for both joined buttons. |
| `--uilib-split-button-fg` | `var(--uilib-button-secondary-fg, var(--uilib-color-neutral-50, currentColor))` | Shared foreground color for both joined buttons. |
| `--uilib-split-button-border` | `var(--uilib-button-secondary-border, var(--uilib-split-button-bg))` | Shared border color for both joined buttons and panel edge. |
| `--uilib-split-button-bg-hover` | `var(--uilib-button-secondary-bg-hover, var(--uilib-split-button-bg))` | Hover/active background for joined buttons. |
| `--uilib-split-button-fg-hover` | `var(--uilib-split-button-fg)` | Hover foreground for joined buttons. |
| `--uilib-split-button-radius` | `var(--uilib-button-radius, var(--uilib-shape-base, 0.375rem))` | Outer radius for left and right button caps. |
| `--uilib-split-button-padding` | `var(--uilib-button-padding-medium, var(--uilib-space-2, 0.5rem) var(--uilib-space-4, 1rem))` | Inner button padding. |
| `--uilib-split-button-font-size` | `var(--uilib-button-font-size-medium, var(--uilib-font-size-md, 1rem))` | Inner button font size. |
| `--uilib-split-button-shadow` | `var(--uilib-button-shadow, none)` | Base button shadow. |
| `--uilib-split-button-transition` | `var(--uilib-button-transition, all var(--uilib-transition-fast, 0.2s ease))` | Transition applied to button visuals. |
| `--uilib-split-button-focus-ring` | `var(--uilib-button-focus-ring, 0 0 0 var(--uilib-border-width-2, 0.125rem) color-mix(in srgb, var(--uilib-color-primary-500, currentColor) 30%, transparent))` | Focus-visible ring for action/menu buttons and menu rows. |
| `--uilib-split-button-disabled-opacity` | `var(--uilib-button-disabled-opacity, 0.5)` | Host opacity when disabled state is active. |
| `--uilib-split-button-divider-color` | `color-mix(in srgb, var(--uilib-split-button-bg) 75%, transparent)` | Visual seam color between main and menu button. |
| `--uilib-split-button-menu-bg` | `var(--uilib-select-dropdown-bg, var(--uilib-surface, transparent))` | Dropdown panel background. |
| `--uilib-split-button-menu-shadow` | `var(--uilib-select-dropdown-shadow, var(--uilib-shadow-md, none))` | Dropdown panel elevation. |
| `--uilib-split-button-menu-radius` | `var(--uilib-split-button-radius)` | Dropdown panel corner radius. |
| `--uilib-split-button-menu-z` | `var(--uilib-z-overlay, 1000)` | Dropdown panel stacking context. |
| `--uilib-split-button-menu-item-padding` | `var(--uilib-space-2, 0.5rem) var(--uilib-space-3, 0.75rem)` | Menu item row padding. |
| `--uilib-split-button-menu-item-hover-bg` | `var(--uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600, currentColor) 8%, transparent))` | Menu item hover/active background. |
| `--uilib-split-button-menu-item-disabled-opacity` | `0.55` | Menu item disabled opacity. |
| `--uilib-split-button-separator-color` | `color-mix(in srgb, var(--uilib-split-button-border) 55%, transparent)` | Separator line color between item groups. |

## Sidebar Menu

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-sidebar-bg` | `var(--uilib-surface, #ffffff)` | Sidebar background. |
| `--uilib-sidebar-width` | `260px` | Expanded width. |
| `--uilib-sidebar-collapsed-width` | `72px` | Collapsed width. |
| `--uilib-sidebar-item-hover` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 8%, transparent)` | Item hover bg. |
| `--uilib-sidebar-item-active` | `color-mix(in srgb, var(--uilib-color-primary-600, #1e88e5) 16%, transparent)` | Item active bg. |
| `--uilib-sidebar-text` | `var(--uilib-page-fg, #1f2933)` | Text color. |
| `--uilib-sidebar-icon` | `var(--uilib-muted, #6b7280)` | Icon color. |

## Tabs

| Variable | Default | Description |
| --- | --- | --- |
| `--uilib-tabs-bg` | `var(--uilib-surface, #ffffff)` | Tabs background. |
| `--uilib-tabs-border` | `var(--uilib-border, #e5e7eb)` | Tabs border. |
| `--uilib-tabs-border-width` | `1px` | Border width. |
| `--uilib-tabs-border-style` | `solid` | Border style. |
| `--uilib-tabs-radius` | `var(--uilib-radius-md, 8px)` | Tabs radius. |
| `--uilib-tabs-gap` | `var(--uilib-space-3, 0.5rem)` | Tabs gap. |
| `--uilib-tabs-padding` | `var(--uilib-space-3, 0.5rem)` | Tabs padding. |
| `--uilib-tabs-padding-x` | `var(--uilib-space-4, 0.75rem)` | Tab horizontal padding. |
| `--uilib-tabs-padding-y` | `var(--uilib-space-3, 0.5rem)` | Tab vertical padding. |
| `--uilib-tab-gap` | `var(--uilib-space-2, 0.25rem)` | Tab label gap. |
| `--uilib-tab-font-size` | `var(--uilib-font-size-md, 1rem)` | Tab font size. |
| `--uilib-tab-font-weight` | `var(--uilib-font-weight-500, 500)` | Tab font weight. |
| `--uilib-tabs-color` | `var(--uilib-page-fg, currentColor)` | Tab text color. |
| `--uilib-tabs-color-active` | `var(--uilib-color-primary-600, #1e88e5)` | Active text color. |
| `--uilib-tabs-color-disabled` | `var(--uilib-muted, #6b7280)` | Disabled text color. |
| `--uilib-tab-bg` | `transparent` | Tab background. |
| `--uilib-tab-bg-hover` | `color-mix(in srgb, currentColor 4%, transparent)` | Hover background. |
| `--uilib-tab-bg-active` | `color-mix(in srgb, currentColor 8%, transparent)` | Active background. |
| `--uilib-tab-border` | `transparent` | Tab border. |
| `--uilib-tab-border-active` | `var(--uilib-tab-border, transparent)` | Active border. |
| `--uilib-tab-radius` | `var(--uilib-radius-md, 8px)` | Tab radius. |
| `--uilib-tabs-indicator-color` | `var(--uilib-color-primary-600, #1e88e5)` | Indicator color. |
| `--uilib-tabs-indicator-height` | `2px` | Indicator thickness. |
| `--uilib-tabs-indicator-radius` | `999px` | Indicator radius. |
| `--uilib-tabs-indicator-offset` | `0px` | Indicator offset. |
| `--uilib-tabs-transition` | `var(--uilib-transition-fast, 150ms ease)` | Transition. |
| `--uilib-tabs-nav-button-size` | `2rem` | Scroll button size. |
| `--uilib-tabs-nav-button-bg` | `var(--uilib-surface-secondary, transparent)` | Scroll button bg. |
| `--uilib-tabs-nav-button-color` | `var(--uilib-tabs-color, currentColor)` | Scroll button color. |
| `--uilib-tabs-nav-button-border` | `transparent` | Scroll button border. |
| `--uilib-tabs-nav-button-radius` | `var(--uilib-radius-md, 8px)` | Scroll button radius. |
| `--uilib-tabs-nav-button-shadow` | `none` | Scroll button shadow. |
| `--uilib-tabs-nav-button-hover-bg` | `var(--uilib-surface-tertiary, color-mix(in srgb, currentColor 6%, transparent))` | Scroll hover bg. |
| `--uilib-tabs-nav-button-active-bg` | `color-mix(in srgb, currentColor 10%, transparent)` | Scroll active bg. |
| `--uilib-tabs-nav-button-disabled-opacity` | `0.4` | Disabled opacity. |
| `--uilib-tabs-nav-button-gap` | `var(--uilib-space-2, 0.25rem)` | Scroll button gap. |

