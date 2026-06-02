# Galleria

**Selector:** `ui-lib-galleria`
**Entry point:** `import { Galleria } from 'ui-lib-custom/galleria'`

---

## Overview

Galleria is a media gallery component for displaying images or other content with optional thumbnail navigation, dot indicators, autoplay, and fullscreen mode. Provide content via ng-template slots: - `<ng-template #galleriaItem let-item>` — main item renderer - `<ng-template #galleriaThumbnail let-item>` — thumbnail renderer - `<ng-template #galleriaCaption let-item>` — caption overlay on the active item - `<ng-template #galleriaHeader>` — header above the gallery - `<ng-template #galleriaFooter>` — footer below the gallery - `<ng-template #galleriaIndicator let-index let-active="active">` — custom indicator

## API

### Inputs

| Name                        | Type                         | Default                                | Description                                                                                |
| --------------------------- | ---------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `ariaLabel`                 | `string`                     | `GALLERIA_ARIA_REGION_LABEL`           | Accessible label for the gallery landmark. Defaults to the built-in region label constant. |
| `autoPlay`                  | `boolean`                    | `false`                                | When true, the gallery automatically advances to the next item.                            |
| `circular`                  | `boolean`                    | `false`                                | When true, navigation wraps around from the last item to the first and vice versa.         |
| `containerStyle`            | `Record<string, string>      | null`                                  | `null`                                                                                     | Inline styles for the gallery container element.            |
| `fullScreen`                | `boolean`                    | `false`                                | When true, a fullscreen toggle button is rendered; use `visible` to control open state.    |
| `indicatorsPosition`        | `GalleriaIndicatorsPosition` | `'bottom'`                             | Position of the indicator dots.                                                            |
| `lightboxLabel`             | `string                      | null`                                  | `null`                                                                                     | Accessible label for the fullscreen dialog container.       |
| `nextLabel`                 | `string                      | null`                                  | `null`                                                                                     | Accessible label for the next-item navigation button.       |
| `numScroll`                 | `number`                     | `GALLERIA_DEFAULT_NUM_SCROLL`          | Number of thumbnails to scroll per thumbnail-navigator click.                              |
| `numVisible`                | `number`                     | `GALLERIA_DEFAULT_NUM_VISIBLE`         | Number of thumbnails visible in the strip.                                                 |
| `prevLabel`                 | `string                      | null`                                  | `null`                                                                                     | Accessible label for the previous-item navigation button.   |
| `responsiveOptions`         | `GalleriaResponsiveOption[]` | `[]`                                   | Responsive options for breakpoint-based thumbnail counts.                                  |
| `showIndicators`            | `boolean`                    | `false`                                | When true, indicator dots are rendered below/above the gallery.                            |
| `showIndicatorsOnItem`      | `boolean`                    | `false`                                | When true, indicator dots are rendered on top of the active item.                          |
| `showItemNavigators`        | `boolean`                    | `true`                                 | When true, prev/next item navigation arrows are always visible.                            |
| `showItemNavigatorsOnHover` | `boolean`                    | `false`                                | When true, prev/next item navigation arrows appear only while hovering the item.           |
| `showThumbnailNavigators`   | `boolean`                    | `true`                                 | When true, thumbnail-strip navigation arrows are rendered.                                 |
| `showThumbnails`            | `boolean`                    | `true`                                 | When true, the thumbnail strip is rendered.                                                |
| `size`                      | `GalleriaSize`               | `'md'`                                 | Component size token.                                                                      |
| `styleClass`                | `string                      | null`                                  | `null`                                                                                     | Additional CSS class(es) applied to the host element.       |
| `thumbnailsPosition`        | `GalleriaThumbnailsPosition` | `'bottom'`                             | Position of the thumbnail strip relative to the main item.                                 |
| `transitionInterval`        | `number`                     | `GALLERIA_DEFAULT_TRANSITION_INTERVAL` | Interval in milliseconds between automatic slide transitions.                              |
| `value`                     | `GalleriaItem[]`             | `[]`                                   | Array of data items to display.                                                            |
| `variant`                   | `GalleriaVariant             | null`                                  | `null`                                                                                     | Design variant; inherits from ThemeConfigService when null. |

### Models (two-way bindable)

| Name          | Type      | Default | Description                                               |
| ------------- | --------- | ------- | --------------------------------------------------------- |
| `activeIndex` | `number`  | `0`     | Active item index — supports two-way binding.             |
| `visible`     | `boolean` | `false` | Fullscreen overlay visibility — supports two-way binding. |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                                       | Default                                         |
| -------------------------------------------------- | ----------------------------------------------- |
| `--uilib-galleria-caption-bg`                      | `rgba(0, 0, 0, 0.5)`                            |
| `--uilib-galleria-caption-color`                   | `#ffffff`                                       |
| `--uilib-galleria-caption-padding`                 | `0.75rem 1rem`                                  |
| `--uilib-galleria-close-btn-bg`                    | `rgba(0, 0, 0, 0.5)`                            |
| `--uilib-galleria-close-btn-bg-hover`              | `rgba(0, 0, 0, 0.8)`                            |
| `--uilib-galleria-close-btn-color`                 | `#ffffff`                                       |
| `--uilib-galleria-close-btn-size`                  | `2.5rem`                                        |
| `--uilib-galleria-fullscreen-btn-bg`               | `rgba(0, 0, 0, 0.4)`                            |
| `--uilib-galleria-fullscreen-btn-bg-hover`         | `rgba(0, 0, 0, 0.7)`                            |
| `--uilib-galleria-fullscreen-btn-color`            | `#ffffff`                                       |
| `--uilib-galleria-fullscreen-btn-size`             | `2rem`                                          |
| `--uilib-galleria-gap`                             | `0.5rem`                                        |
| `--uilib-galleria-indicator-dot-bg`                | `rgba(255, 255, 255, 0.5)`                      |
| `--uilib-galleria-indicator-dot-bg-active`         | `#ffffff`                                       |
| `--uilib-galleria-indicator-dot-size`              | `0.625rem`                                      |
| `--uilib-galleria-indicator-gap`                   | `0.375rem`                                      |
| `--uilib-galleria-indicator-padding`               | `0.5rem`                                        |
| `--uilib-galleria-item-bg`                         | `var(--uilib-surface, #1a1a2e)`                 |
| `--uilib-galleria-mask-bg`                         | `rgba(0, 0, 0, 0.9)`                            |
| `--uilib-galleria-nav-bg`                          | `rgba(0, 0, 0, 0.45)`                           |
| `--uilib-galleria-nav-bg-hover`                    | `rgba(0, 0, 0, 0.7)`                            |
| `--uilib-galleria-nav-color`                       | `#ffffff`                                       |
| `--uilib-galleria-nav-offset`                      | `0.5rem`                                        |
| `--uilib-galleria-nav-radius`                      | `50%`                                           |
| `--uilib-galleria-nav-size`                        | `2.5rem`                                        |
| `--uilib-galleria-thumbnail-gap`                   | `0.25rem`                                       |
| `--uilib-galleria-thumbnail-index-font-size`       | `var(--uilib-font-size-xs, 0.75rem)`            |
| `--uilib-galleria-thumbnail-item-border`           | `2px solid transparent`                         |
| `--uilib-galleria-thumbnail-item-border-active`    | `2px solid var(--uilib-color-primary, #6366f1)` |
| `--uilib-galleria-thumbnail-item-opacity-inactive` | `0.6`                                           |
| `--uilib-galleria-thumbnail-nav-bg`                | `rgba(0, 0, 0, 0.3)`                            |
| `--uilib-galleria-thumbnail-nav-bg-hover`          | `rgba(0, 0, 0, 0.6)`                            |
| `--uilib-galleria-thumbnail-nav-color`             | `#ffffff`                                       |
| `--uilib-galleria-thumbnail-nav-size`              | `2rem`                                          |
| `--uilib-galleria-thumbnail-size-lg`               | `5.5rem`                                        |
| `--uilib-galleria-thumbnail-size-md`               | `4rem`                                          |
| `--uilib-galleria-thumbnail-size-sm`               | `3rem`                                          |

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

### Keyboard Interactions

| Test description                                                       |
| ---------------------------------------------------------------------- |
| moves focus to the close button when fullscreen opens                  |
| passes axe checks in inline mode                                       |
| passes axe checks when fullscreen dialog is open                       |
| restores focus to the fullscreen trigger when fullscreen closes        |
| should apply bootstrap variant class                                   |
| should apply material variant class                                    |
| should apply minimal variant class                                     |
| should apply the variant class                                         |
| should have aria-label on the host                                     |
| should have aria-label on the item area                                |
| should have role=                                                      |
| should set aria-current on the active thumbnail button                 |
| supports ArrowDown keyboard navigation in vertical thumbnail mode      |
| supports ArrowRight keyboard navigation in horizontal thumbnail mode   |
| uses a custom lightbox aria-label when provided                        |
| uses the fallback lightbox aria-label when no custom label is provided |

## Usage Examples

```html
<!-- gallery with built-in image rendering -->
<ui-lib-galleria [value]="images" [showThumbnails]="true" />

<!-- gallery with custom templates -->
<ui-lib-galleria [value]="images" [showThumbnails]="true">
  <ng-template #galleriaItem let-image>
    <img [src]="image.src" [alt]="image.alt" style="width: 100%" />
  </ng-template>
  <ng-template #galleriaThumbnail let-image>
    <img [src]="image.thumbnailSrc" [alt]="image.alt" />
  </ng-template>
</ui-lib-galleria>

<!-- autoplay with fullscreen support -->
<ui-lib-galleria
  [value]="images"
  [autoPlay]="true"
  [fullScreen]="true"
  [(visible)]="fullscreenOpen"
>
  <ng-template #galleriaItem let-image>
    <img [src]="image.src" [alt]="image.alt" />
  </ng-template>
</ui-lib-galleria>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#galleria)
- [Demo page](/components/galleria)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/galleria/README.md)
