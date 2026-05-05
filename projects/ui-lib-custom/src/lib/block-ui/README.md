# BlockUI

**Selector:** `ui-lib-block-ui`
**Package:** `ui-lib-custom/block-ui`
**Content projection:** yes — default slot for the protected content; `[blockTemplate]` attribute selector for custom mask content (e.g. a spinner) shown when blocked

> `blocked` is a `model()` signal (two-way bindable via `[(blocked)]`). Setting it to `true` overlays the mask but does not destroy the projected content — interaction is blocked by CSS pointer-events only.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `blocked` | `boolean` | `false` | Two-way bindable via `[(blocked)]`; toggles the overlay mask |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `baseZIndex` | `number` | `0` | Base z-index for the mask layer; `0` uses the CSS variable default |

## Outputs

_none_

## Usage

```html
<!-- basic usage — toggle blocked state from the parent -->
<ui-lib-block-ui [(blocked)]="isLoading">
  <p>Protected content</p>
</ui-lib-block-ui>

<!-- custom mask content with a spinner -->
<ui-lib-block-ui [(blocked)]="isSaving">
  <form>...</form>
  <span blockTemplate>
    <ui-lib-spinner /> Saving…
  </span>
</ui-lib-block-ui>
```
