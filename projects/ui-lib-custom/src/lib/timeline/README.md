# Timeline

**Selector:** `ui-lib-timeline`
**Package:** `ui-lib-custom/timeline`
**Content projection:** yes — three named slots via structural directives: `uiTimelineMarker` (dot/icon in separator track), `uiTimelineContent` (main event body), `uiTimelineOpposite` (label on the opposite side of the axis)

> `value` is required. All three template slots are optional — the component renders default placeholders when a slot is omitted. Template context exposes `$implicit` (the item), `index`, `first`, `last`, `even`, and `odd`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `T[]` | required | Array of data items to render as timeline events. Required. |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Orientation of the timeline axis. |
| `align` | `'left' \| 'right' \| 'alternate' \| 'top' \| 'bottom'` | `'left'` | Event alignment. Vertical supports `left`, `right`, `alternate`; horizontal supports `top`, `bottom`. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host element. |
| `ariaLabel` | `string` | `'Timeline'` | Accessible label for the list element. |

## Outputs

_none_

## Usage

```html
<!-- vertical timeline with content template -->
<ui-lib-timeline [value]="events">
  <ng-template uiTimelineContent let-event>
    <strong>{{ event.title }}</strong>
  </ng-template>
</ui-lib-timeline>

<!-- alternating with custom marker and opposite label -->
<ui-lib-timeline [value]="events" align="alternate">
  <ng-template uiTimelineMarker let-event><span class="dot"></span></ng-template>
  <ng-template uiTimelineOpposite let-event>{{ event.date }}</ng-template>
  <ng-template uiTimelineContent let-event>{{ event.description }}</ng-template>
</ui-lib-timeline>
```
