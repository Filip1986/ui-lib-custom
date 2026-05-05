# Accordion

**Selector:** `ui-lib-accordion` (container) / `ui-lib-accordion-panel` (child)
**Package:** `ui-lib-custom/accordion`
**Content projection:** yes — `<ui-lib-accordion-panel>` children project into `<ui-lib-accordion>`; panel body content projects into the panel via `<ng-content />`; headers can be overridden with `[accordionHeader]` and icons with `[accordionToggleIcon]`

> Panel identity uses `value` (if set) or an auto-generated UUID — not a numeric index. Pass string values in `expandedPanels` to control expansion; the first write to `expandedPanels` after initialization permanently switches the component to controlled mode.

---

## `ui-lib-accordion` — Container

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; inherits from `ThemeConfigService` when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `expandMode` | `'single' \| 'multiple'` | `'single'` | `'single'` collapses other panels when one is opened |
| `expandedPanels` | `string[]` | `[]` | Controlled set of expanded panel IDs (matched by `value` or auto ID) |
| `defaultExpandedPanels` | `string[]` | `[]` | Initial expanded panels in uncontrolled mode |

### Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `expandedChange` | `AccordionChangeEvent` | Emitted after any panel toggle; payload: `{ panelId, expanded, index }` |
| `panelToggle` | `AccordionChangeEvent` | Same event; provided as an alias |

---

## `ui-lib-accordion-panel` — Panel

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `header` | `string` | `''` | Text label for the panel header trigger |
| `value` | `string \| null` | `null` | Unique identifier used by the parent accordion; auto-generated when null |
| `disabled` | `boolean` | `false` | Prevents the panel from being toggled |
| `expanded` | `boolean` | `false` | Initial expanded state when used standalone (without parent accordion) |
| `iconPosition` | `'start' \| 'end'` | `'end'` | Position of the toggle icon within the header |
| `expandIcon` | `string` | `'chevron-up'` | Icon name shown when the panel is collapsed |
| `collapseIcon` | `string` | `'chevron-down'` | Icon name shown when the panel is expanded |
| `showIcon` | `boolean` | `false` | Whether to render the toggle icon at all |

Use `[accordionHeader]` on an inner element to replace the default `header` text with custom markup.
Use `[accordionToggleIcon]` on an `<ng-template>` for a custom toggle icon; context: `{ $implicit: boolean, expanded: boolean }`.

---

## Usage

```html
<!-- Single-expand accordion -->
<ui-lib-accordion>
  <ui-lib-accordion-panel header="Section 1" value="s1">Content one</ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Section 2" value="s2">Content two</ui-lib-accordion-panel>
</ui-lib-accordion>

<!-- Multiple expand, pre-opened -->
<ui-lib-accordion expandMode="multiple" [defaultExpandedPanels]="['s1']">
  <ui-lib-accordion-panel header="Alpha" value="s1" [showIcon]="true">Alpha body</ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Beta"  value="s2" [showIcon]="true">Beta body</ui-lib-accordion-panel>
</ui-lib-accordion>
```
