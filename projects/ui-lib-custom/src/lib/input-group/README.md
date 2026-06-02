# InputGroup

**Selector:** `ui-lib-input-group`
**Package:** `ui-lib-custom/input-group`
**Content projection:** yes — project your control and optional addons as direct children (`[addonLeft]`, default slot, `[addonRight]`)

> This component is a pure layout stub — it has no inputs, no outputs, and no CVA. It only applies the root CSS class `ui-lib-input-group` to the host element. All visual composition is achieved through CSS and the projected content structure.

## Inputs

_none_ — this component has no inputs.

## Outputs

_none_

## Usage

```html
<!-- decorative text addon (not focusable, hidden from a11y tree) -->
<label for="username-input">Username</label>
<ui-lib-input-group>
  <ui-lib-input-group-addon addonLeft>
    <span aria-hidden="true">@</span>
  </ui-lib-input-group-addon>
  <input id="username-input" type="text" placeholder="Username" />
</ui-lib-input-group>

<!-- icon-only button addon must have an aria-label -->
<label for="search-input">Search</label>
<ui-lib-input-group>
  <input id="search-input" type="text" placeholder="Search term" />
  <ui-lib-input-group-addon addonRight>
    <button type="button" aria-label="Run search">
      <span aria-hidden="true">🔍</span>
    </button>
  </ui-lib-input-group-addon>
</ui-lib-input-group>
```

## Accessibility guidance

- Decorative addons (currency symbols, protocol prefixes, separators) should be rendered inside a non-focusable node with `aria-hidden="true"` so they are not announced to screen readers.
- Interactive addons must use real interactive elements (for example, `<button type="button">`), not generic `<div>` containers.
- Icon-only addon buttons must always have an `aria-label`.
- Keep `<label for="...">` associated with the actual input id inside the group, not with the group container.

## CSS Custom Properties

| Variable                                   | Default                           | Description                                                           |
| ------------------------------------------ | --------------------------------- | --------------------------------------------------------------------- |
| `--ui-lib-input-group-addon-border-radius` | `var(--uilib-border-radius, 6px)` | Corner radius applied to the outermost start/end element in the group |
