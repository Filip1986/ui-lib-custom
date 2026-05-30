# Image

**Selector:** `ui-lib-image`
**Entry point:** `import { Image } from 'ui-lib-custom/image'`

---

## Overview

Image component with optional preview overlay, zoom, and rotation controls. When `preview` is enabled, clicking the image opens a full-screen overlay where the user can zoom in/out and rotate the image.  A hover indicator (eye icon by default) signals that the image is clickable. Content slots: - `<ng-template #imageIndicator>` — custom preview-trigger icon overlay - `<ng-template #imageError>` — custom content shown when the image fails to load

## API

### Inputs

| Name         | Type                            | Default | Description                                                                            |
| ------------ | ------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| `alt`        | `string`                        | `''`    | Accessible alt text for the image.                                                     |
| `ariaLabel`  | `string | null`                 | `null`  | Accessible label for the preview button indicator.                                     |
| `errorSrc`   | `string | null`                 | `null`  | Fallback src displayed when the image fails to load and no error template is provided. |
| `height`     | `string | null`                 | `null`  | Height attribute passed to the underlying `<img>` element.                             |
| `imageClass` | `string | null`                 | `null`  | Extra CSS class(es) applied to the `<img>` element.                                    |
| `imageStyle` | `Record<string, string> | null` | `null`  | Inline style object applied to the `<img>` element.                                    |
| `preview`    | `boolean`                       | `false` | When true, clicking the image opens a preview overlay.                                 |
| `size`       | `ImageSize`                     | `'md'`  | Component size token.                                                                  |
| `src`        | `string`                        | `''`    | URL of the image to display.                                                           |
| `styleClass` | `string | null`                 | `null`  | Additional CSS class(es) applied to the host element.                                  |
| `variant`    | `ImageVariant | null`           | `null`  | Design variant; inherits from ThemeConfigService when null.                            |
| `width`      | `string | null`                 | `null`  | Width attribute passed to the underlying `<img>` element.                              |

### Models (two-way bindable)

| Name             | Type      | Default | Description                                            |
| ---------------- | --------- | ------- | ------------------------------------------------------ |
| `previewVisible` | `boolean` | `false` | Preview overlay visibility — supports two-way binding. |

### Outputs

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `errorEvent` | `Event` | Emitted when the image fails to load.    |
| `loadEvent`  | `Event` | Emitted when the image finishes loading. |

## Content Projection

_none_

## Theming

| CSS Variable                               | Default                                         |
| ------------------------------------------ | ----------------------------------------------- |
| `--uilib-image-error-bg`                   | `var(--uilib-surface, #f3f4f6)`                 |
| `--uilib-image-error-color`                | `var(--uilib-color-muted, #9ca3af)`             |
| `--uilib-image-error-icon-size`            | `3rem`                                          |
| `--uilib-image-indicator-bg`               | `rgba(0, 0, 0, 0.5)`                            |
| `--uilib-image-indicator-bg-hover`         | `rgba(0, 0, 0, 0.7)`                            |
| `--uilib-image-indicator-bg-minimal`       | `rgba(0, 0, 0, 0.35)`                           |
| `--uilib-image-indicator-bg-minimal-hover` | `rgba(0, 0, 0, 0.55)`                           |
| `--uilib-image-indicator-color`            | `#ffffff`                                       |
| `--uilib-image-indicator-icon-size-lg`     | `1.5rem`                                        |
| `--uilib-image-indicator-icon-size-md`     | `1.25rem`                                       |
| `--uilib-image-indicator-icon-size-sm`     | `1rem`                                          |
| `--uilib-image-indicator-transition`       | `opacity 0.2s ease, background-color 0.2s ease` |
| `--uilib-image-mask-bg`                    | `rgba(0, 0, 0, 0.9)`                            |
| `--uilib-image-preview-transition`         | `transform 0.2s ease`                           |
| `--uilib-image-radius`                     | `var(--uilib-radius-md, 0.375rem)`              |
| `--uilib-image-toolbar-bg`                 | `rgba(0, 0, 0, 0.5)`                            |
| `--uilib-image-toolbar-bg-material`        | `rgba(0, 0, 0, 0.6)`                            |
| `--uilib-image-toolbar-btn-bg`             | `transparent`                                   |
| `--uilib-image-toolbar-btn-bg-hover`       | `rgba(255, 255, 255, 0.15)`                     |
| `--uilib-image-toolbar-btn-color`          | `#ffffff`                                       |
| `--uilib-image-toolbar-btn-color-disabled` | `rgba(255, 255, 255, 0.35)`                     |
| `--uilib-image-toolbar-btn-icon-size`      | `1.25rem`                                       |
| `--uilib-image-toolbar-btn-radius`         | `var(--uilib-radius-full, 9999px)`              |
| `--uilib-image-toolbar-btn-size`           | `2.5rem`                                        |
| `--uilib-image-toolbar-btn-transition`     | `background-color 0.15s ease`                   |
| `--uilib-image-toolbar-gap`                | `0.25rem`                                       |
| `--uilib-image-toolbar-padding`            | `0.5rem`                                        |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                   |
| ---------------------------------------------------------------------------------- |
| all toolbar buttons have aria-label                                                |
| announces completed full turns distinctly from the initial 0 degree state          |
| announces rotation changes when using arrow key shortcuts                          |
| announces zoom changes when using keyboard shortcuts                               |
| closes the preview overlay on Escape key                                           |
| decorative SVG icons inside the toolbar buttons are aria-hidden                    |
| indicator button has aria-controls pointing to the preview overlay when open       |
| indicator button has aria-haspopup=                                                |
| passes axe checks for the default image (no preview)                               |
| passes axe checks when the preview indicator is visible                            |
| passes axe checks when the preview overlay is open                                 |
| preview overlay has aria-modal=                                                    |
| preview overlay has role=                                                          |
| renders the preview indicator button with an aria-label                            |
| restores focus to the indicator button when the preview is closed via Escape       |
| restores focus to the indicator button when the preview is closed via close button |
| should apply variant class to the host element                                     |
| should close the preview overlay on Escape key                                     |
| should have aria-modal=                                                            |
| should have correct aria-label on the indicator button                             |
| should have role=                                                                  |
| should switch variant class when variant input changes                             |
| supports zoom shortcut fallback via keyboard code values                           |
| toolbar has role=                                                                  |
| traps focus within the preview overlay while open                                  |
| zoom-in button has aria-disabled when zoom is at maximum                           |
| zoom-out button has aria-disabled when zoom is at minimum                          |

## Usage Examples

```html
<!-- image with preview overlay -->
<ui-lib-image src="/photo.jpg" alt="A scenic photo" [preview]="true" />

<!-- two-way preview control with error fallback -->
<ui-lib-image
  src="/avatar.jpg"
  alt="User avatar"
  [preview]="true"
  [(previewVisible)]="isPreviewOpen"
  errorSrc="/placeholder.png"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#image)
- [Demo page](/components/image)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/image/README.md)

