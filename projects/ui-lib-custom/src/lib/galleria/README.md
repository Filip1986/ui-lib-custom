# Galleria

**Selector:** `ui-lib-galleria`
**Package:** `ui-lib-custom/galleria`
**Content projection:** yes — six named template refs: `#galleriaItem` (required), `#galleriaThumbnail`, `#galleriaCaption`, `#galleriaHeader`, `#galleriaFooter`, `#galleriaIndicator`

> Both `activeIndex` and `visible` are `model()` signals (two-way bindable). `visible` controls the fullscreen overlay — it only does anything when `[fullScreen]="true"` is also set. Without that input the fullscreen button is not rendered.

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
| `ariaLabel` | `string` | `'Gallery'` | Accessible label for the gallery region landmark |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `activeIndexChange` | `number` | Emitted whenever the active item index changes |

## Usage

```html
<!-- gallery with thumbnails -->
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
