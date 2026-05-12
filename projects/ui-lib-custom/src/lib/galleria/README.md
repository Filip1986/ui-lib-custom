# Galleria

**Selector:** `ui-lib-galleria`
**Package:** `ui-lib-custom/galleria`
**Content projection:** yes — six named template refs: `#galleriaItem`, `#galleriaThumbnail`, `#galleriaCaption`, `#galleriaHeader`, `#galleriaFooter`, `#galleriaIndicator`

> Both `activeIndex` and `visible` are `model()` signals (two-way bindable). `visible` controls the fullscreen overlay — it only does anything when `[fullScreen]="true"` is also set. Without that input the fullscreen button is not rendered.

## Item data model

```ts
interface GalleriaItem {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}
```

- `alt` is required and used for the default main image renderer.
- If `alt`/`thumbnailAlt` are blank, Galleria falls back to `alt=""` (decorative image semantics) instead of omitting the attribute.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `unknown[]` | `[]` | Array of data items to display |
| `activeIndex` | `number` | `0` | Two-way bindable via `[(activeIndex)]`; currently displayed item |
| `visible` | `boolean` | `false` | Two-way bindable via `[(visible)]`; fullscreen overlay open state |
| `numVisible` | `number` | `3` | Number of thumbnails shown in the strip |
| `numScroll` | `number` | `1` | Number of thumbnails scrolled per navigator click |
| `thumbnailsPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Position of the thumbnail strip |
| `indicatorsPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Position of the dot indicators |
| `showThumbnails` | `boolean` | `true` | Renders the thumbnail strip |
| `showIndicators` | `boolean` | `false` | Renders dot indicators outside the item |
| `showIndicatorsOnItem` | `boolean` | `false` | Renders dot indicators overlaid on the active item |
| `showItemNavigators` | `boolean` | `true` | Shows prev/next arrows on the main item |
| `showItemNavigatorsOnHover` | `boolean` | `false` | Reveals item navigators only on hover |
| `showThumbnailNavigators` | `boolean` | `true` | Shows prev/next arrows on the thumbnail strip |
| `circular` | `boolean` | `false` | Wraps navigation from last to first item |
| `autoPlay` | `boolean` | `false` | Automatically advances to the next item |
| `transitionInterval` | `number` | `4000` | Ms between automatic transitions |
| `fullScreen` | `boolean` | `false` | Renders a fullscreen toggle button |
| `responsiveOptions` | `GalleriaResponsiveOption[]` | `[]` | Breakpoint-based `numVisible` overrides for the thumbnail strip |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `containerStyle` | `Record<string, string> \| null` | `null` | Inline styles for the gallery container element |
| `ariaLabel` | `string` | `'Image gallery'` | Accessible label for the gallery region landmark |
| `lightboxLabel` | `string \| null` | `null` | Accessible label for fullscreen dialog (`'Image gallery'` fallback) |
| `prevLabel` | `string \| null` | `null` | Accessible label for previous-item navigation (`'Previous image'` fallback) |
| `nextLabel` | `string \| null` | `null` | Accessible label for next-item navigation (`'Next image'` fallback) |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `activeIndexChange` | `number` | Emitted whenever the active item index changes |

## Usage

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
<ui-lib-galleria [value]="images" [autoPlay]="true" [fullScreen]="true" [(visible)]="fullscreenOpen">
  <ng-template #galleriaItem let-image>
    <img [src]="image.src" [alt]="image.alt" />
  </ng-template>
</ui-lib-galleria>
```

## Keyboard interaction

| Target | Keys | Behavior |
|---|---|---|
| Fullscreen dialog | `Escape` | Closes fullscreen overlay |
| Thumbnail buttons | `Enter` / `Space` | Activates thumbnail |
| Thumbnail buttons (horizontal) | `ArrowLeft` / `ArrowRight` | Moves active thumbnail |
| Thumbnail buttons (vertical) | `ArrowUp` / `ArrowDown` | Moves active thumbnail |
| Thumbnail buttons | `Home` / `End` | Jumps to first/last thumbnail |
