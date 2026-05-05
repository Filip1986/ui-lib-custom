# AutoFocus

**Selector:** `[uiLibAutoFocus]` — directive
**Package:** `ui-lib-custom/auto-focus`
**Content projection:** no — none

> Focus is applied via `setTimeout` (one macrotask delay) so it works reliably inside overlays and `@defer` blocks — unlike the native `autofocus` attribute which fires synchronously during parse.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `autofocus` | `boolean` | `true` | Set to `false` to disable autofocus conditionally |

## Outputs

_none_

## Usage

```html
<input uiLibAutoFocus />
<input uiLibAutoFocus [autofocus]="isNewRecord" />
```
