# Stepper

**Selector:** `ui-lib-stepper`
**Entry point:** `import { Stepper } from 'ui-lib-custom/stepper'`

---

## Overview

Stepper — a multi-step wizard component for guided sequential workflows. Manages step navigation, active-step state, and optional linear (sequential) enforcement. Supports horizontal and vertical orientations, and three design variants.

## API

### Inputs

| Name         | Type                    | Default                      | Description                                                                                                                              |
| ------------ | ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`  | `string`                | `STEPPER_DEFAULT_ARIA_LABEL` | Accessible label announced for the step navigation container.                                                                            |
| `linear`     | `boolean`               | `false`                      | When true, users can only advance to the next step sequentially. Skipping to later steps is blocked until prior steps have been visited. |
| `styleClass` | `string | null`         | `null`                       | Additional CSS classes to attach to the host element.                                                                                    |
| `variant`    | `StepperVariant | null` | `null`                       | Visual variant — inherits from ThemeConfigService when null.                                                                             |

### Models (two-way bindable)

| Name         | Type     | Default | Description                                              |
| ------------ | -------- | ------- | -------------------------------------------------------- |
| `activeStep` | `number` | `0`     | Currently active step index (0-based). Two-way bindable. |

### Outputs

| Name         | Type              | Description                            |
| ------------ | ----------------- | -------------------------------------- |
| `stepChange` | `StepChangeEvent` | Emitted after the active step changes. |

## Content Projection

_none_

## Theming

| CSS Variable                                 | Default                                             |
| -------------------------------------------- | --------------------------------------------------- |
| `--uilib-stepper-content-padding`            | `1.5rem 0`                                          |
| `--uilib-stepper-indicator-bg`               | `var(--uilib-surface-b, #f3f4f6)`                   |
| `--uilib-stepper-indicator-bg-active`        | `var(--uilib-color-primary-500, #6366f1)`           |
| `--uilib-stepper-indicator-bg-completed`     | `var(--uilib-color-primary-500, #6366f1)`           |
| `--uilib-stepper-indicator-bg-disabled`      | `var(--uilib-surface-b, #f3f4f6)`                   |
| `--uilib-stepper-indicator-bg-error`         | `var(--uilib-color-danger-500, #dc2626)`            |
| `--uilib-stepper-indicator-border`           | `2px solid var(--uilib-surface-d, #d1d5db)`         |
| `--uilib-stepper-indicator-border-active`    | `2px solid var(--uilib-color-primary-500, #6366f1)` |
| `--uilib-stepper-indicator-border-completed` | `2px solid var(--uilib-color-primary-500, #6366f1)` |
| `--uilib-stepper-indicator-border-disabled`  | `2px solid var(--uilib-surface-d, #e5e7eb)`         |
| `--uilib-stepper-indicator-border-error`     | `2px solid var(--uilib-color-danger-500, #dc2626)`  |
| `--uilib-stepper-indicator-border-radius`    | `50%`                                               |
| `--uilib-stepper-indicator-color`            | `var(--uilib-page-fg, #374151)`                     |
| `--uilib-stepper-indicator-color-active`     | `var(--uilib-color-neutral-50, #ffffff)`            |
| `--uilib-stepper-indicator-color-completed`  | `var(--uilib-color-neutral-50, #ffffff)`            |
| `--uilib-stepper-indicator-color-disabled`   | `var(--uilib-color-surface-400, #9ca3af)`           |
| `--uilib-stepper-indicator-color-error`      | `var(--uilib-color-neutral-50, #ffffff)`            |
| `--uilib-stepper-indicator-font-size`        | `0.875rem`                                          |
| `--uilib-stepper-indicator-size`             | `2rem`                                              |
| `--uilib-stepper-label-color`                | `var(--uilib-page-fg, #374151)`                     |
| `--uilib-stepper-label-color-active`         | `var(--uilib-color-primary-600, #4f46e5)`           |
| `--uilib-stepper-label-color-completed`      | `var(--uilib-page-fg, #374151)`                     |
| `--uilib-stepper-label-color-disabled`       | `var(--uilib-color-surface-400, #9ca3af)`           |
| `--uilib-stepper-label-color-error`          | `var(--uilib-color-danger-600, #b91c1c)`            |
| `--uilib-stepper-label-font-size`            | `0.875rem`                                          |
| `--uilib-stepper-label-font-weight`          | `500`                                               |
| `--uilib-stepper-panel-footer-gap`           | `0.75rem`                                           |
| `--uilib-stepper-separator-color`            | `var(--uilib-surface-d, #d1d5db)`                   |
| `--uilib-stepper-separator-thickness`        | `2px`                                               |
| `--uilib-stepper-transition`                 | `var(--uilib-transition-default, all 0.2s ease)`    |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| announces completed steps in the aria-label                                |
| announces error steps in the aria-label                                    |
| announces future steps as unavailable until earlier steps are complete     |
| applies a custom ariaLabel input value to the step navigation container    |
| applies rich aria-labels to vertical step indicators                       |
| exposes a vertical tablist with the provided aria-label                    |
| has no axe violations on the initial step                                  |
| has no axe violations with mid-progress state                              |
| has no axe violations with the last step active                            |
| includes the step number and label in each tab aria-label                  |
| links the active tab to its tabpanel via aria-controls and aria-labelledby |
| marks future steps as aria-disabled in linear mode                         |
| marks only the active step with aria-current=                              |
| preserves error announcements when the errored step is active              |
| reflects the active step with aria-selected                                |
| renders each step indicator as a tab                                       |
| should apply material variant class by default                             |
| should apply variant class when variant input is set                       |
| should connect panel aria-labelledby to the active step id                 |
| should have role=tab on step header buttons                                |
| should have role=tablist on the nav element                                |
| should have role=tabpanel on the active panel                              |
| should move to the next step on ArrowRight                                 |
| should move to the previous step on ArrowLeft                              |
| should navigate on ArrowDown in vertical mode                              |
| should set aria-current=step on the active header                          |
| should set aria-selected=true on the active step                           |
| should set tabindex=0 only on the active step header                       |
| uses role=                                                                 |

## Usage Examples

<!-- TODO: add usage examples -->

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#stepper)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/stepper/README.md)

