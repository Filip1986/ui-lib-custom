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
| `numVisible` | `number` | `1` | Number of items visible at once |
| `numScroll` | `number` | `1` | Number of items scrolled per navigation step |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `verticalViewportHeight` | `string` | `'300px'` | Viewport height override (vertical mode only) |
| `circular` | `boolean` | `false` | Wraps navigation from last to first item |
| `showNavigators` | `boolean` | `true` | Shows prev/next arrow buttons |
| `showIndicators` | `boolean` | `true` | Shows dot indicator buttons |
| `autoplayInterval` | `number` | `0` | Ms between auto-advances; `0` disables autoplay. Autoplay is automatically disabled when `prefers-reduced-motion: reduce` is detected |
| `responsiveOptions` | `CarouselResponsiveOption[]` | `[]` | Breakpoint-based `numVisible`/`numScroll` overrides |
| `styleClass` | `string` | `''` | Additional CSS class(es) on the host element |
| `ariaLabel` | `string` | `'Carousel'` | ARIA label for the `role="region"` landmark. Provide a descriptive, unique value per page |
| `prevAriaLabel` | `string` | `'Previous slide'` | Accessible label for the previous button (i18n) |
| `nextAriaLabel` | `string` | `'Next slide'` | Accessible label for the next button (i18n) |
| `pauseLabel` | `string` | `'Pause autoplay'` | Accessible label for the pause button when autoplay is running (i18n) |
| `playLabel` | `string` | `'Resume autoplay'` | Accessible label for the resume button when autoplay is paused (i18n) |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `pageChange` | `CarouselPageEvent` | Emitted when the active page changes; payload includes `page` (zero-based index) |

## Keyboard shortcuts

| Key | Context | Action |
|-----|---------|--------|
| `ArrowRight` / `ArrowDown` | Indicator dot list focused | Move focus to next dot |
| `ArrowLeft` / `ArrowUp` | Indicator dot list focused | Move focus to previous dot |
| `Home` | Indicator dot list focused | Move focus to first dot |
| `End` | Indicator dot list focused | Move focus to last dot |
| `Enter` / `Space` | Any indicator dot button | Navigate to that slide |
| `Enter` / `Space` | Prev/Next button | Navigate one step backward/forward |
| `Enter` / `Space` | Pause/Resume button | Toggle autoplay (only shown when `autoplayInterval > 0`) |

## Autoplay

Set `[autoplayInterval]="3000"` (milliseconds) to enable automatic advancement. The carousel renders a pause/resume button to satisfy **WCAG 2.1 SC 2.2.2** (Pause, Stop, Hide). Autoplay is suppressed automatically when the user has `prefers-reduced-motion: reduce` set in their OS/browser preferences.

Use `pauseLabel` and `playLabel` to localise the pause button's accessible name.

## Accessibility

- **`role="region"` + `aria-label`** — the host element is a landmark region. Set `ariaLabel` to a unique, descriptive value when multiple carousels are on the same page.
- **`aria-roledescription="carousel"`** — announces the widget type to screen readers.
- **Slides** — each visible slide has `role="group"`, `aria-roledescription="slide"`, and `aria-label="Slide N of M"`.
- **Inactive slides** — hidden from the accessibility tree via `aria-hidden="true"`.
- **Prev/Next buttons** — labelled with `prevAriaLabel` / `nextAriaLabel`.
- **Indicators** — each dot button uses `aria-label="Go to slide N"` and `aria-current="true"` on the active dot.
- **Live region** — the content area uses `aria-live="polite"` when autoplay is active so screen readers announce slide changes.
- **Reduced motion** — CSS transitions are suppressed via `@media (prefers-reduced-motion: reduce)` and autoplay is disabled in JavaScript when the media query matches.

## Usage

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
