# Breadcrumb

**Selector:** `ui-lib-breadcrumb`
**Entry point:** `import { Breadcrumb } from 'ui-lib-custom/breadcrumb'`

---

## Overview

Breadcrumb component for displaying hierarchical navigation trails. Supports URL links, Angular Router links, and command callbacks. Fully accessible with ARIA landmark, `aria-current="page"` on the active item, and keyboard activation for command-only items.

## API

### Inputs

| Name         | Type               | Default                         | Description                                                        |
| ------------ | ------------------ | ------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | --- |
| `ariaLabel`  | `string`           | `BREADCRUMB_DEFAULT_ARIA_LABEL` | Accessible label for the `<nav>` landmark element.                 |
| `home`       | `BreadcrumbItem    | null`                           | `null`                                                             | Optional home item pinned as the first crumb.                      |
| `model`      | `BreadcrumbItem[]` | `[]`                            | Array of navigation items to display after the optional home item. |
| `size`       | `BreadcrumbSize`   | `'md'`                          | Size token: sm                                                     | md                                                                 | lg. |
| `styleClass` | `string            | null`                           | `null`                                                             | Extra CSS class appended to the host element.                      |
| `variant`    | `BreadcrumbVariant | null`                           | `null`                                                             | Design-system variant; falls back to ThemeConfigService when null. |

### Outputs

| Name        | Type                       | Description                                                            |
| ----------- | -------------------------- | ---------------------------------------------------------------------- |
| `itemClick` | `BreadcrumbItemClickEvent` | Emitted when any breadcrumb item is clicked or activated via keyboard. |

## Content Projection

_none_

## Theming

| CSS Variable                             | Default                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--uilib-breadcrumb-current-color`       | `var(--uilib-color-neutral-600, #4b5563)`                                                |
| `--uilib-breadcrumb-disabled-color`      | `var(--uilib-color-neutral-300, #d1d5db)`                                                |
| `--uilib-breadcrumb-focus-shadow`        | `0 0 0 2px color-mix(in srgb, var(--uilib-color-primary-500, #3b82f6) 40%, transparent)` |
| `--uilib-breadcrumb-font-size`           | `var(--uilib-font-size-md, 0.875rem)`                                                    |
| `--uilib-breadcrumb-font-size-lg`        | `var(--uilib-font-size-lg, 1rem)`                                                        |
| `--uilib-breadcrumb-font-size-md`        | `var(--uilib-font-size-md, 0.875rem)`                                                    |
| `--uilib-breadcrumb-font-size-sm`        | `var(--uilib-font-size-sm, 0.75rem)`                                                     |
| `--uilib-breadcrumb-gap`                 | `var(--uilib-spacing-2, 0.5rem)`                                                         |
| `--uilib-breadcrumb-item-icon-font-size` | `0.9em`                                                                                  |
| `--uilib-breadcrumb-link-color`          | `var(--uilib-color-primary-500, #3b82f6)`                                                |
| `--uilib-breadcrumb-link-color-hover`    | `var(--uilib-color-primary-600, #2563eb)`                                                |
| `--uilib-breadcrumb-separator-color`     | `var(--uilib-color-neutral-400, #9ca3af)`                                                |
| `--uilib-breadcrumb-separator-content`   | `'/'`                                                                                    |
| `--uilib-breadcrumb-separator-font-size` | `0.875em`                                                                                |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/

### Keyboard Interactions

| Test description                                                 |
| ---------------------------------------------------------------- |
| applies aria-label=                                              |
| does not apply aria-current to non-last items                    |
| has role=                                                        |
| marks icon spans as aria-hidden                                  |
| marks separators as aria-hidden                                  |
| passes axe for a 2-item breadcrumb                               |
| passes axe for a 3-item breadcrumb                               |
| passes axe for home-icon-first breadcrumb                        |
| renders the last item as non-interactive span with aria-current= |
| should NOT add aria-current to home item                         |
| should NOT add aria-current to non-last items                    |
| should add aria-current=                                         |
| should apply variant-bootstrap class                             |
| should apply variant-material class                              |
| should apply variant-minimal class                               |
| should emit itemClick on Enter key                               |
| should emit itemClick on Space key                               |
| should have aria-label equal to default                          |
| should have role=                                                |
| should render disabled item as <span> with aria-disabled         |
| should update aria-label when ariaLabel input changes            |
| uses custom ariaLabel input value on host landmark               |
| uses iconAriaLabel for icon-only home link when provided         |

## Usage Examples

```html
<!-- Data-driven breadcrumb -->
<ui-lib-breadcrumb [items]="crumbs" [home]="{ label: 'Home', routerLink: '/' }" />

<!-- Custom separator -->
<ui-lib-breadcrumb [items]="crumbs">
  <ng-template #separator>›</ng-template>
</ui-lib-breadcrumb>

<!-- Custom home item content -->
<ui-lib-breadcrumb [items]="crumbs" [home]="{ icon: 'pi pi-home', url: '/' }">
  <ng-template #firstItem let-item>
    <span aria-hidden="true" class="pi pi-home"></span>
    <span>{{ item.iconAriaLabel ?? 'Home' }}</span>
  </ng-template>
</ui-lib-breadcrumb>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#breadcrumb)
- [Demo page](/components/breadcrumb)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/breadcrumb/README.md)
