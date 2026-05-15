# Bind

**Selector:** `[uiLibBind]` — directive
**Package:** `ui-lib-custom/bind`
**Content projection:** no — none

`Bind` is a lightweight template utility for applying a dynamic object of DOM
properties to a host element.

Use it when you have a computed/dynamic set of host properties and want one
binding point instead of many individual `[prop]` bindings.

> Properties are applied via `Renderer2.setProperty`, not `setAttribute`, so
> prefer standard DOM property names (`tabIndex`, not `tabindex`; `htmlFor`,
> not `for`; `ariaLabel`, not `aria-label`). Keys present in a previous signal
> value but absent from the new value are reset to `null` only when the
> directive still owns that value.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `uiLibBind` | `Record<string, unknown>` | `{}` | Key-value pairs applied as DOM properties on the host element. `unknown` is intentional so the directive can forward any valid native or component-host property without over-constraining callers. |

## Outputs

_none_

## Usage

```html
<div [uiLibBind]="{ id: 'hero', title: 'Hello world' }"></div>
<input [uiLibBind]="dynamicProps" />
```

### DOM property names vs attribute names

`[uiLibBind]` writes **DOM properties**, not attributes. That means the keys in
your object should usually match the JavaScript property name on the element:

```html
<!-- Correct: DOM property names -->
<button [uiLibBind]="{ tabIndex: -1, ariaLabel: 'Open details' }">Open</button>

<!-- Avoid: lowercase attribute names -->
<button [uiLibBind]="{ tabindex: -1, 'aria-label': 'Open details' }">Open</button>
```

`aria-*` keys written in kebab-case are normalized to their reflected DOM
property names for compatibility, but the recommended style is still the DOM
property form because it is clearer and matches other native properties.

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
- Use `[attr.x]` when you explicitly want attribute semantics instead of DOM
  property semantics. This matters for cases where the attribute name differs
  from the DOM property name.

## Removal and update behavior

- Omit a key from the next object value to let `Bind` clear the previously bound
  property.
- You can also set a key to `null` directly when you want to remove the current
  property value in the same object.
- Removal is intentionally guarded: the directive only clears a stale key when
  the current host property still matches the last value written by `Bind`.

```html
<div [uiLibBind]="{ title: isOpen() ? 'Expanded' : null }"></div>
<div [uiLibBind]="panelBindings()"></div>
```

## Performance notes

- The directive uses an `effect()`, so it re-runs whenever the `uiLibBind`
  object reference changes.
- Prefer `computed()` or another memoized signal when you assemble binding
  objects from multiple sources, so unchanged values do not create unnecessary
  object references.

## Accessibility Notes

- `Bind` works with reflected ARIA DOM properties, but the key names differ from
  the attribute names you may use with Angular `[attr.x]` bindings.

```html
<!-- Recommended: DOM property names -->
<button [uiLibBind]="{ ariaLabel: 'Open menu', ariaHidden: null }">Open</button>

<!-- Compatibility: kebab-case ARIA keys are normalized -->
<button [uiLibBind]="{ 'aria-label': 'Open menu' }">Open</button>
```

- `aria-hidden` expects the string `"true"` / `"false"` when you bind through
  the DOM property:

```ts
// Correct
[uiLibBind]="{ ariaHidden: 'true' }"

// Also correct — removes the reflected attribute/property
[uiLibBind]="{ ariaHidden: null }"
```

- Common pitfalls:
  - Use `tabIndex`, not `tabindex`
  - Use `ariaHidden`, not `aria-hidden`, when you want the clearest DOM property form
  - Use `ariaLabel`, not `aria-label`, when you want the clearest DOM property form
- Native Angular ARIA bindings (for example `[attr.aria-label]`) continue to
  work alongside `Bind`; whichever binding writes last for the current change
  detection cycle wins.
- `Bind` composes cleanly with other utility directives such as
  `[uiLibStyleClass]` because it only writes host properties and only clears
  stale values it still owns.
