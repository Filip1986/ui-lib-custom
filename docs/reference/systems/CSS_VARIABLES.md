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

