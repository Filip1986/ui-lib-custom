# Carousel

**Selector:** `ui-lib-carousel`
**Entry point:** `import { Carousel } from 'ui-lib-custom/carousel'`

---

## Overview

Carousel is a content slider with support for multiple visible items, responsive breakpoints, autoplay, circular mode, touch/swipe, and three design variants (Material, Bootstrap, Minimal). Provide an item template via \`<ng-template carouselItem let-item>\`.

## API

### Inputs

| Name                     | Type                         | Default                                               | Description                                                                                     |
| ------------------------ | ---------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `ariaLabel`              | `string`                     | `CAROUSEL_ARIA_REGION_LABEL`                          | ARIA label for the carousel landmark region. Falls back to `'Carousel'`.                        |
| `autoplayInterval`       | `number`                     | `0`                                                   | Milliseconds between automatic page advances. Set to 0 (default) to disable autoplay.           |
| `circular`               | `boolean`                    | `false`                                               | When true, navigation wraps from last item back to first.                                       |
| `nextAriaLabel`          | `string`                     | `CAROUSEL_ARIA_NEXT_LABEL`                            | ARIA label for the "next" button.                                                               |
| `numScroll`              | `number`                     | `CAROUSEL_DEFAULT_NUM_SCROLL`                         | Number of items scrolled per navigation step.                                                   |
| `numVisible`             | `number`                     | `CAROUSEL_DEFAULT_NUM_VISIBLE`                        | Number of items visible in the viewport at once.                                                |
| `orientation`            | `CarouselOrientation`        | `CAROUSEL_DEFAULT_ORIENTATION as CarouselOrientation` | Layout orientation.                                                                             |
| `pauseLabel`             | `string`                     | `CAROUSEL_ARIA_PAUSE_LABEL`                           | ARIA label for the autoplay pause button (when playing).                                        |
| `playLabel`              | `string`                     | `CAROUSEL_ARIA_PLAY_LABEL`                            | ARIA label for the autoplay resume button (when paused).                                        |
| `prevAriaLabel`          | `string`                     | `CAROUSEL_ARIA_PREV_LABEL`                            | ARIA label for the "previous" button.                                                           |
| `responsiveOptions`      | `CarouselResponsiveOption[]` | `[]`                                                  | Responsive breakpoint options. Applied when viewport width is at or below the breakpoint value. |
| `showIndicators`         | `boolean`                    | `true`                                                | Show or hide the indicator (dot) buttons below the viewport.                                    |
| `showNavigators`         | `boolean`                    | `true`                                                | Show or hide the navigation (prev/next) buttons.                                                |
| `size`                   | `CarouselSize`               | `'md'`                                                | Size token — controls padding, font-size, and button dimensions.                                |
| `styleClass`             | `string`                     | `''`                                                  | Optional extra CSS class applied to the root host element.                                      |
| `value`                  | `unknown[]`                  | `[]`                                                  | Array of data items to display in the carousel.                                                 |
| `variant`                | `CarouselVariant | null`     | `null`                                                | Design variant — controls visual style. Defaults to the global ThemeConfigService variant.      |
| `verticalViewportHeight` | `string`                     | `CAROUSEL_DEFAULT_VERTICAL_VIEWPORT_HEIGHT`           | Viewport height override — only applied in vertical orientation.                                |

### Outputs

| Name         | Type                | Description                               |
| ------------ | ------------------- | ----------------------------------------- |
| `pageChange` | `CarouselPageEvent` | Emitted whenever the active page changes. |

## Content Projection

_none_

## Theming

| CSS Variable                            | Default                                         |
| --------------------------------------- | ----------------------------------------------- |
| `--uilib-carousel-content-gap`          | `var(--uilib-spacing-2, 0.5rem)`                |
| `--uilib-carousel-gap`                  | `var(--uilib-spacing-4, 1rem)`                  |
| `--uilib-carousel-indicator-bg`         | `var(--uilib-surface-300, #d0d0d0)`             |
| `--uilib-carousel-indicator-bg-active`  | `var(--uilib-color-primary, #1976d2)`           |
| `--uilib-carousel-indicator-bg-hover`   | `var(--uilib-surface-400, #b0b0b0)`             |
| `--uilib-carousel-indicator-focus-ring` | `0 0 0 2px var(--uilib-color-primary, #1976d2)` |
| `--uilib-carousel-indicator-gap`        | `var(--uilib-spacing-1, 0.25rem)`               |
| `--uilib-carousel-indicator-height`     | `0.5rem`                                        |
| `--uilib-carousel-indicator-padding`    | `var(--uilib-spacing-3, 0.75rem) 0`             |
| `--uilib-carousel-indicator-radius`     | `0.25rem`                                       |
| `--uilib-carousel-indicator-width`      | `2rem`                                          |
| `--uilib-carousel-nav-button-bg`        | `var(--uilib-surface-100, #f5f5f5)`             |
| `--uilib-carousel-nav-button-bg-hover`  | `var(--uilib-surface-200, #e8e8e8)`             |
| `--uilib-carousel-nav-button-border`    | `1px solid transparent`                         |
| `--uilib-carousel-nav-button-color`     | `var(--uilib-color-text-primary, #1a1a1a)`      |
| `--uilib-carousel-nav-button-radius`    | `50%`                                           |
| `--uilib-carousel-nav-button-shadow`    | `none`                                          |
| `--uilib-carousel-nav-button-size`      | `2.5rem`                                        |
| `--uilib-carousel-nav-icon-size`        | `1.25rem`                                       |
| `--uilib-carousel-transition`           | `500ms ease`                                    |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

### Keyboard Interactions

| Test description                                                    |
| ------------------------------------------------------------------- |
| ArrowLeft on indicator container does not throw                     |
| ArrowRight on indicator container moves focus to next dot           |
| does not set aria-current on inactive indicator buttons             |
| has aria-label on the host element                                  |
| has aria-roledescription=                                           |
| has role=                                                           |
| indicator buttons have correct tabindex (0 on active, -1 on others) |
| next button has aria-label                                          |
| passes axe in default state                                         |
| passes axe with autoplay paused                                     |
| passes axe with navigators and indicators hidden                    |
| pause button has correct aria-label when playing                    |
| prev button has aria-label                                          |
| renders indicator buttons with aria-label                           |
| renders real slides with aria-label                                 |
| renders real slides with aria-roledescription=                      |
| renders real slides with role=                                      |
| sets aria-current=                                                  |
| sets aria-hidden=                                                   |
| should apply aria-roledescription=                                  |
| should apply bootstrap variant class when set                       |
| should apply material variant class by default                      |
| should apply minimal variant class when set                         |
| should have role=                                                   |
| should not set role=                                                |
| should produce correct ariaPageLabel                                |
| should produce correct ariaSlideNumber                              |
| should set aria-current=                                            |
| should set aria-hidden on non-active items                          |
| should set aria-label on prev and next buttons                      |
| updates aria-current after navigating to a different slide          |
| updates aria-label when ariaLabel input changes                     |
| updates pause button aria-label via pauseLabel input                |
| updates pause button aria-label via playLabel input                 |
| updates prev/next aria-labels when inputs change                    |

## Usage Examples

```html
<!-- 3-visible, circular carousel with accessible label -->
<ui-lib-carousel
  [value]="products"
  [numVisible]="3"
  [numScroll]="1"
  [circular]="true"
  ariaLabel="Featured products"
>
  <ng-template #carouselItem let-product>
    <div class="product-card">{{ product.name }}</div>
  </ng-template>
</ui-lib-carousel>

<!-- Autoplay with pause control (WCAG 2.1 SC 2.2.2 compliant) -->
<ui-lib-carousel
  [value]="images"
  [autoplayInterval]="4000"
  ariaLabel="Product gallery"
  pauseLabel="Pause gallery"
  playLabel="Resume gallery"
>
  <ng-template #carouselItem let-image>
    <img [src]="image.src" [alt]="image.alt" />
  </ng-template>
</ui-lib-carousel>

<!-- Localised labels (German) -->
<ui-lib-carousel
  [value]="slides"
  ariaLabel="Neuigkeiten"
  prevAriaLabel="Vorherige Folie"
  nextAriaLabel="Nächste Folie"
  pauseLabel="Automatische Wiedergabe pausieren"
  playLabel="Automatische Wiedergabe fortsetzen"
>
  <ng-template #carouselItem let-slide>
    <div>{{ slide }}</div>
  </ng-template>
</ui-lib-carousel>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#carousel)
- [Demo page](/components/carousel)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/carousel/README.md)

