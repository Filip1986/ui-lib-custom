# Image

**Selector:** `ui-lib-image`
**Package:** `ui-lib-custom/image`
**Content projection:** yes — `#imageIndicator` template ref for a custom hover-overlay icon; `#imageError` template ref for custom content shown when the image fails to load

> `previewVisible` is a `model()` signal (two-way bindable via `[(previewVisible)]`). The preview overlay includes zoom and rotation controls and is rendered inline — it is not appended to `document.body`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `src` | `string` | `''` | URL of the image |
| `alt` | `string` | `''` | Accessible alt text — always provide a meaningful description |
| `width` | `string \| null` | `null` | Width attribute on the `<img>` element |
| `height` | `string \| null` | `null` | Height attribute on the `<img>` element |
| `preview` | `boolean` | `false` | Enables click-to-preview overlay with zoom and rotation |
| `imageStyle` | `Record<string, string> \| null` | `null` | Inline style object applied to the `<img>` element |
| `imageClass` | `string \| null` | `null` | Extra CSS class(es) applied to the `<img>` element |
| `errorSrc` | `string \| null` | `null` | Fallback src shown when the image fails to load |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `ariaLabel` | `string` | `'Preview image'` | Accessible label for the preview trigger button and preview dialog |
| `previewVisible` | `boolean` | `false` | Two-way bindable via `[(previewVisible)]`; controls overlay open state |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `loadEvent` | `Event` | Emitted when the image finishes loading |
| `errorEvent` | `Event` | Emitted when the image fails to load |

## Usage

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

## Content Projection

### Custom preview indicator
```html
<ui-lib-image src="/photo.jpg" alt="A photo" [preview]="true">
  <ng-template #imageIndicator>
    <span aria-hidden="true">🔍</span>
  </ng-template>
</ui-lib-image>
```

### Custom error content
```html
<ui-lib-image src="/photo.jpg" alt="A photo">
  <ng-template #imageError>
    <div>Image unavailable</div>
  </ng-template>
</ui-lib-image>
```

## ARIA Attributes

| Element | Attribute | Value | Notes |
|---------|-----------|-------|-------|
| Preview trigger button | `aria-label` | `ariaLabel` input value | Defaults to `'Preview image'` |
| Preview trigger button | `aria-haspopup` | `"dialog"` | Always present when `preview=true` |
| Preview trigger button | `aria-controls` | preview dialog ID | Only set while the overlay is open |
| Preview trigger button | `aria-expanded` | `"true"` / `"false"` | Reflects overlay open state |
| Preview overlay (`.uilib-image__mask`) | `role` | `"dialog"` | When `preview` is enabled and overlay is open |
| Preview overlay | `aria-modal` | `"true"` | Prevents interaction with background content |
| Preview overlay | `aria-label` | `ariaLabel` input value | Accessible name for the dialog |
| Preview overlay | `aria-describedby` | preview status live region ID | Announces zoom/rotation changes while open |
| Toolbar | `role` | `"toolbar"` | Groups the zoom/rotate/close controls |
| Toolbar | `aria-label` | `"Image controls"` | Describes the toolbar |
| Toolbar buttons | `aria-label` | Per-button label | Zoom in/out, rotate left/right, close |
| Zoom buttons | `aria-disabled` | `"true"` when at limit | Indicates disabled state to screen readers |
| Preview status region | `aria-live` | `"polite"` | Announces zoom percentage and rotation changes |
| Error placeholder | `role` | `"img"` | When the image fails to load |
| Error placeholder | `aria-label` | `alt` or `"Image failed to load"` | Describes the error state |
| All SVG icons | `aria-hidden` | `"true"` | Decorative icons are hidden from screen readers |

## Keyboard Interaction

| Key | Context | Action |
|-----|---------|--------|
| `Enter` / `Space` | Preview trigger button | Opens the preview overlay |
| `Escape` | Preview overlay open | Closes the overlay and restores focus to the trigger |
| `Tab` / `Shift+Tab` | Preview overlay open | Cycles focus among toolbar buttons (focus is trapped inside the overlay) |
| `Enter` / `Space` | Zoom In button | Increases zoom scale by one step |
| `Enter` / `Space` | Zoom Out button | Decreases zoom scale by one step |
| `Enter` / `Space` | Rotate Left / Right | Rotates the image 90° in the corresponding direction |
| `Enter` / `Space` | Close button | Closes the overlay and restores focus |
| `+` / `=` / numpad `+` | Preview overlay open | Zooms in without moving focus away from the current control |
| `-` / numpad `-` | Preview overlay open | Zooms out without moving focus away from the current control |
| `ArrowLeft` / `ArrowRight` | Preview overlay open | Rotates the image 90° left or right |

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uilib-image-radius` | `var(--uilib-radius-md, 0.375rem)` | Border radius of the image |
| `--uilib-image-indicator-bg` | `rgba(0, 0, 0, 0.5)` | Background of the preview indicator overlay |
| `--uilib-image-indicator-bg-hover` | `rgba(0, 0, 0, 0.7)` | Background of the indicator on hover |
| `--uilib-image-indicator-color` | `#ffffff` | Icon color in the indicator overlay |
| `--uilib-image-indicator-icon-size-sm` | `1rem` | Indicator icon size at `sm` |
| `--uilib-image-indicator-icon-size-md` | `1.25rem` | Indicator icon size at `md` |
| `--uilib-image-indicator-icon-size-lg` | `1.5rem` | Indicator icon size at `lg` |
| `--uilib-image-mask-bg` | `rgba(0, 0, 0, 0.9)` | Background of the full-screen preview overlay |
| `--uilib-image-toolbar-bg` | `rgba(0, 0, 0, 0.5)` | Background of the toolbar bar |
| `--uilib-image-toolbar-btn-bg` | `transparent` | Default toolbar button background |
| `--uilib-image-toolbar-btn-bg-hover` | `rgba(255, 255, 255, 0.15)` | Toolbar button background on hover |
| `--uilib-image-toolbar-btn-color` | `#ffffff` | Toolbar button icon color |
| `--uilib-image-toolbar-btn-color-disabled` | `rgba(255, 255, 255, 0.35)` | Disabled toolbar button icon color |
| `--uilib-image-toolbar-btn-size` | `2.5rem` | Toolbar button hit-target size |
| `--uilib-image-toolbar-btn-icon-size` | `1.25rem` | Toolbar button icon size |
| `--uilib-image-toolbar-gap` | `0.25rem` | Gap between toolbar buttons |
| `--uilib-image-toolbar-padding` | `0.5rem` | Padding inside the toolbar |
| `--uilib-image-error-bg` | `var(--uilib-surface, #f3f4f6)` | Background of the error placeholder |
| `--uilib-image-error-color` | `var(--uilib-color-muted, #9ca3af)` | Icon color in the error placeholder |
| `--uilib-image-error-icon-size` | `3rem` | Error icon size |
| `--uilib-image-preview-transition` | `transform 0.2s ease` | CSS transition for zoom/rotate transforms |

## Accessibility

### Alt text
Always provide meaningful alt text via the `alt` input. For decorative images, pass `alt=""` explicitly.

### Preview dialog
When `preview=true` and the overlay is opened:
- The overlay is announced as a modal dialog (`role="dialog"`, `aria-modal="true"`).
- A **focus trap** keeps keyboard focus inside the toolbar controls while the overlay is open.
- Pressing **Escape** or activating the **Close** button dismisses the overlay and **restores focus** to the preview trigger button.
- A polite live region announces the current zoom percentage and rotation so screen reader users receive feedback after toolbar actions or keyboard shortcuts.

### Error state
When an image fails to load, the error placeholder uses `role="img"` with an `aria-label` equal to the `alt` input (or a default fallback message), ensuring the error state is accessible to screen readers.

### Reduced motion
All transitions and animations are suppressed when `prefers-reduced-motion: reduce` is set in the user's operating system preferences.
