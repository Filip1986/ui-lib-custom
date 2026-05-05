# Bind

**Selector:** `[uiLibBind]` — directive
**Package:** `ui-lib-custom/bind`
**Content projection:** no — none

> Properties are applied via `Renderer2.setProperty`, not `setAttribute` — use standard DOM property names (`tabIndex`, not `tabindex`; `htmlFor`, not `for`). Keys present in a previous signal value but absent from the new value are reset to `null`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `uiLibBind` | `Record<string, unknown>` | `{}` | Key-value pairs applied as DOM properties on the host element |

## Outputs

_none_

## Usage

```html
<div [uiLibBind]="{ id: 'hero', title: 'Hello world' }"></div>
<input [uiLibBind]="dynamicProps" />
```
