# ButtonGroup

**Selector:** `ui-lib-button-group`
**Package:** `ui-lib-custom/button-group`
**Content projection:** yes — place `<ui-lib-button>` elements directly inside the component

> The `size` input accepts shorthand values (`'sm'`, `'md'`, `'lg'`) and normalizes them internally.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual style applied to the group container |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Propagated to child buttons via CSS classes on the host |
| `ariaLabel` | `string \| null` | `null` | Accessible label applied to the internal `role="group"` element |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction for grouped buttons |
| `vertical` | `boolean` | `false` | Backward-compatible alias; when `true`, treated as `orientation="vertical"` |

## Outputs

_none_

## Usage

```html
<ui-lib-button-group variant="material" size="md" ariaLabel="Text formatting actions">
  <ui-lib-button>Left</ui-lib-button>
  <ui-lib-button>Centre</ui-lib-button>
  <ui-lib-button>Right</ui-lib-button>
</ui-lib-button-group>
```

## Accessibility

- The rendered group container uses `role="group"` and forwards `ariaLabel` to `aria-label`.
- Keep each button's own accessible name (`button text` or `ariaLabel` on icon-only buttons). The group label does **not** replace individual button labels.
- If projected content is present and `ariaLabel` is missing, ButtonGroup emits a dev-mode warning to prevent unlabeled action groups.
- Do not group unrelated actions in one ButtonGroup.

## Orientation and keyboard behavior

- `orientation="horizontal"` (default): native Tab order moves between buttons normally.
- `orientation="vertical"`: visual layout stacks buttons; keyboard behavior remains native button Tab navigation.
- If you need arrow-key roving navigation semantics, prefer a dedicated `ui-lib-toolbar` pattern (`role="toolbar"`).

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-button-group-gap` | `0px` | Spacing between grouped buttons |
| `--uilib-button-group-connected-border-overlap` | `-1px` | Negative margin used to collapse adjacent borders in connected mode |
