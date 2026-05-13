# AutoFocus

**Selector:** `[uiLibAutoFocus]` — directive
**Package:** `ui-lib-custom/auto-focus`
**Content projection:** no — none

> Opt-in only: focus runs only when you explicitly add `uiLibAutoFocus` to an element.
> Focus is deferred with `requestAnimationFrame` and runs once on mount.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `disabled` | `boolean` | `false` | Set to `true` to skip autofocus |
| `selector` | `string \| null` | `null` | Optional child selector. When set, the matching child is focused instead of the host |

## Outputs

_none_

## Usage

```html
<input uiLibAutoFocus />
<input uiLibAutoFocus [disabled]="disableAutoFocus" />
```

```html
<div uiLibAutoFocus selector="[data-initial-focus]">
  <button data-initial-focus type="button">Primary action</button>
</div>
```

## Accessibility notes

- Auto-focus can be disruptive; use only when it improves keyboard flow.
- Prefer user-initiated focus for dialogs/overlays when another focus manager is active.
- Consider disabling auto-focus in reduced-motion/screen-reader-sensitive flows:

```html
<input uiLibAutoFocus [disabled]="prefersReducedMotion()" />
```
