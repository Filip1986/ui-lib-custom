# Bind

**Selector:** `[uiLibBind]` — directive
**Package:** `ui-lib-custom/bind`
**Content projection:** no — none

`Bind` is a lightweight template utility for applying a dynamic object of DOM
properties to a host element.

Use it when you have a computed/dynamic set of host properties and want one
binding point instead of many individual `[prop]` bindings.

> Properties are applied via `Renderer2.setProperty`, not `setAttribute` — use
> standard DOM property names (`tabIndex`, not `tabindex`; `htmlFor`, not
> `for`). Keys present in a previous signal value but absent from the new value
> are reset to `null` only when the directive still owns that value.

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

### Inside Angular control-flow blocks

```html
@if (showDetails()) {
  <section [uiLibBind]="detailsBindings()"></section>
}

@for (item of items(); track item.id) {
  <li [uiLibBind]="item.bindings"></li>
}
```

## Native Angular Alternatives

- Use direct bindings like `[id]`, `[title]`, `[tabIndex]` when the property
  set is small and static.
- Use `[uiLibBind]` when the property set is dynamic (for example, a computed
  record assembled from multiple signals).

## Accessibility Notes

- `Bind` does not directly mutate `aria-*` attributes unless you explicitly pass
  related keys in `uiLibBind`.
- Native Angular ARIA bindings (for example `[attr.aria-label]`) continue to
  work alongside `Bind`.
