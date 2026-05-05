# Carousel

**Selector:** `ui-lib-carousel`
**Package:** `ui-lib-custom/carousel`
**Content projection:** yes — `#carouselItem` (required, item renderer), `#carouselHeader`, `#carouselFooter`, `#carouselPrevIcon`, `#carouselNextIcon` (all optional template refs)

> Item widths are set by a dynamically injected `<style>` element scoped to a per-instance ID — this is not controlled via CSS variables. The `variant` input defaults to `'material'` (unlike most other components that default to null and inherit from `ThemeConfigService`).

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `unknown[]` | `[]` | Array of data items to display |
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual style; does NOT fall back to `ThemeConfigService` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `numVisible` | `number` | `3` | Number of items visible at once |
| `numScroll` | `number` | `1` | Number of items scrolled per navigation step |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `verticalViewportHeight` | `string` | `'300px'` | Viewport height override (vertical mode only) |
| `circular` | `boolean` | `false` | Wraps navigation from last to first item |
| `showNavigators` | `boolean` | `true` | Shows prev/next arrow buttons |
| `showIndicators` | `boolean` | `true` | Shows dot indicator buttons |
| `autoplayInterval` | `number` | `0` | Ms between auto-advances; `0` disables autoplay |
| `responsiveOptions` | `CarouselResponsiveOption[]` | `[]` | Breakpoint-based `numVisible`/`numScroll` overrides |
| `styleClass` | `string` | `''` | Additional CSS class(es) on the host element |
| `prevAriaLabel` | `string` | `'Previous'` | Accessible label for the previous button |
| `nextAriaLabel` | `string` | `'Next'` | Accessible label for the next button |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `pageChange` | `CarouselPageEvent` | Emitted when the active page changes; payload includes `page` (zero-based index) |

## Usage

```html
<!-- 3-visible, circular carousel -->
<ui-lib-carousel [value]="products" [numVisible]="3" [numScroll]="1" [circular]="true">
  <ng-template #carouselItem let-product>
    <div class="product-card">{{ product.name }}</div>
  </ng-template>
</ui-lib-carousel>

<!-- autoplay with responsive options -->
<ui-lib-carousel [value]="images" [autoplayInterval]="4000" [responsiveOptions]="responsiveOpts">
  <ng-template #carouselItem let-image>
    <img [src]="image.src" [alt]="image.alt" />
  </ng-template>
</ui-lib-carousel>
```
