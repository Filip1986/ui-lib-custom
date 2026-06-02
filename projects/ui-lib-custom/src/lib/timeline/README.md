# Timeline

**Selector:** `ui-lib-timeline`
**Package:** `ui-lib-custom/timeline`
**Content projection:** yes — three named slots via structural directives: `uiTimelineMarker` (dot/icon in separator track), `uiTimelineContent` (main event body), `uiTimelineOpposite` (label on the opposite side of the axis)

> `value` is required. All three template slots are optional — the component renders default placeholders when a slot is omitted. Template context exposes `$implicit` (the item), `index`, `first`, `last`, `even`, and `odd`.

## Inputs

| Name         | Type                                                    | Default      | Notes                                                                                                 |
| ------------ | ------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `value`      | `T[]`                                                   | required     | Array of data items to render as timeline events. Required.                                           |
| `layout`     | `'vertical' \| 'horizontal'`                            | `'vertical'` | Orientation of the timeline axis.                                                                     |
| `align`      | `'left' \| 'right' \| 'alternate' \| 'top' \| 'bottom'` | `'left'`     | Event alignment. Vertical supports `left`, `right`, `alternate`; horizontal supports `top`, `bottom`. |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null`        | `null`       | Falls back to global theme when null.                                                                 |
| `size`       | `'sm' \| 'md' \| 'lg'`                                  | `'md'`       | Component density.                                                                                    |
| `styleClass` | `string \| null`                                        | `null`       | Extra CSS class on the host element.                                                                  |
| `ariaLabel`  | `string`                                                | `'Timeline'` | Accessible label for the list element.                                                                |

## Outputs

_none_

## ARIA attributes

| Element                  | Attribute         | Value                                 | Purpose                                                           |
| ------------------------ | ----------------- | ------------------------------------- | ----------------------------------------------------------------- |
| Host (`ui-lib-timeline`) | `role`            | `list`                                | Exposes the timeline as a semantic list of events                 |
| Host                     | `id`              | `ui-lib-timeline-{n}`                 | Auto-generated unique instance id for per-item labelling          |
| Host                     | `aria-label`      | `ariaLabel` input                     | Provides the list's accessible name                               |
| Event row                | `role`            | `listitem`                            | Identifies each event as a list item                              |
| Event row                | `aria-labelledby` | `content` id + optional `opposite` id | Builds the item name from visible event text                      |
| Connector / marker dot   | `aria-hidden`     | `true`                                | Keeps decorative separator graphics out of the accessibility tree |

## Keyboard interaction

`Timeline` is non-interactive by default, so the host and event rows do not enter the tab order.
Any buttons, links, or controls projected inside the content templates keep their native keyboard
behaviour. When projected content receives focus, the event row shows a visible focus-within ring.

## Accessibility notes

- The component uses semantic `list` / `listitem` roles rather than generic containers.
- Each event gets an accessible name from its visible content. When no content template is supplied,
  the component renders fallback text derived from common item fields such as `title`, `label`,
  `name`, `status`, `date`, or `description`.
- Custom markers are treated as decorative timeline chrome. The marker wrapper, default dot, and
  connector segments are hidden from assistive technologies.
- `@media (prefers-reduced-motion: reduce)` disables marker hover transitions.

## CSS custom properties

| Variable                               | Default                               | Description                                                |
| -------------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| `--uilib-timeline-connector-color`     | `var(--uilib-border-color, #dee2e6)`  | Decorative connector colour                                |
| `--uilib-timeline-connector-width`     | `2px`                                 | Connector thickness                                        |
| `--uilib-timeline-marker-size`         | `1.25rem`                             | Marker width and height                                    |
| `--uilib-timeline-marker-bg`           | `var(--uilib-primary-color, #3b82f6)` | Marker fill colour                                         |
| `--uilib-timeline-marker-border-color` | `var(--uilib-primary-color, #3b82f6)` | Marker border colour                                       |
| `--uilib-timeline-marker-border-width` | `2px`                                 | Marker border width                                        |
| `--uilib-timeline-event-gap`           | `0`                                   | Gap between event grid tracks                              |
| `--uilib-timeline-content-gap`         | `1rem`                                | Space between separator and content                        |
| `--uilib-timeline-opposite-gap`        | `1rem`                                | Space between separator and opposite content               |
| `--uilib-timeline-opposite-min-width`  | `6rem`                                | Minimum opposite column width in vertical mode             |
| `--uilib-timeline-font-size`           | `1rem`                                | Base font size                                             |
| `--uilib-timeline-color`               | `var(--uilib-text-color, #1f2937)`    | Text colour                                                |
| `--uilib-timeline-focus-ring-color`    | `var(--uilib-primary-color, #3b82f6)` | Focus-within ring colour for projected interactive content |

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
