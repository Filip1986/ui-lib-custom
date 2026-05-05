# InputGroup

**Selector:** `uilib-input-group`
**Package:** `ui-lib-custom/input-group`
**Content projection:** yes — project your input and any addon elements (buttons, text spans, icons) as direct children

> This component is a pure layout stub — it has no inputs, no outputs, and no CVA. It only applies the root CSS class `uilib-input-group` to the host element. All visual composition is achieved through CSS and the projected content structure.

## Inputs

_none_ — this component has no inputs.

## Outputs

_none_

## Usage

```html
<!-- text addon before the input -->
<uilib-input-group>
  <span class="uilib-input-group-addon">@</span>
  <input type="text" placeholder="Username" />
</uilib-input-group>

<!-- button addon after the input -->
<uilib-input-group>
  <input type="text" placeholder="Search term" />
  <button type="button">Go</button>
</uilib-input-group>
```
