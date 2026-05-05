# Image

**Selector:** `ui-lib-image`
**Package:** `ui-lib-custom/image`
**Content projection:** yes — `#imageIndicator` template ref for a custom hover-overlay icon; `#imageError` template ref for custom content shown when the image fails to load

> `previewVisible` is a `model()` signal (two-way bindable via `[(previewVisible)]`). The preview overlay includes zoom and rotation controls and is rendered inline — it is not appended to `document.body`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `src` | `string` | `''` | URL of the image |
| `alt` | `string` | `''` | Accessible alt text |
| `width` | `string \| null` | `null` | Width attribute on the `<img>` element |
| `height` | `string \| null` | `null` | Height attribute on the `<img>` element |
| `preview` | `boolean` | `false` | Enables click-to-preview overlay with zoom and rotation |
| `imageStyle` | `Record<string, string> \| null` | `null` | Inline style object applied to the `<img>` element |
| `imageClass` | `string \| null` | `null` | Extra CSS class(es) applied to the `<img>` element |
| `errorSrc` | `string \| null` | `null` | Fallback src shown when the image fails to load |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `ariaLabel` | `string` | `'Preview'` | Accessible label for the preview trigger button |
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
