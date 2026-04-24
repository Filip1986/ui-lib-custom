# Timeline
A data-display component that renders a series of events along a vertical or horizontal axis. Supports custom marker, content, and opposite-side templates via named structural directives, three visual variants, three density sizes, and flexible alignment modes.
---
## Import
```typescript
import { TimelineComponent } from 'ui-lib-custom/timeline';
import {
  TimelineContentDirective,
  TimelineMarkerDirective,
  TimelineOppositeDirective,
} from 'ui-lib-custom/timeline';
```
---
## Basic Usage
```html
<ui-lib-timeline [value]="events">
  <ng-template uiTimelineContent let-event>
    <div>
      <h3>{{ event.status }}</h3>
      <p>{{ event.description }}</p>
    </div>
  </ng-template>
</ui-lib-timeline>
```
---
## API
### `TimelineComponent<T>`
#### Inputs
| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `T[]` | **required** | Array of data items to render as timeline events. |
| `layout` | `TimelineLayout` | `'vertical'` | Orientation: `'vertical'` or `'horizontal'`. |
| `align` | `TimelineAlign` | `'left'` | Alignment of events relative to the separator track. |
| `variant` | `TimelineVariant \| null` | `null` | Visual variant override. Falls back to `ThemeConfigService` when `null`. |
| `size` | `TimelineSize` | `'md'` | Density size: `'sm'`, `'md'`, or `'lg'`. |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) appended to the host element. |
| `ariaLabel` | `string` | `'Timeline'` | Accessible label for the list. |
#### Template Directive Slots
| Directive | Selector | Description |
|---|---|---|
| `TimelineMarkerDirective` | `[uiTimelineMarker]` | Custom marker/dot rendered in the separator track. Receives the full `TimelineItemContext<T>`. |
| `TimelineContentDirective` | `[uiTimelineContent]` | Main event body on the content side. Receives the full `TimelineItemContext<T>`. |
| `TimelineOppositeDirective` | `[uiTimelineOpposite]` | Label rendered on the opposite side of the separator. Receives the full `TimelineItemContext<T>`. |
#### Template Context (`TimelineItemContext<T>`)
| Variable | Type | Description |
|---|---|---|
| `$implicit` | `T` | The data item for this event. |
| `index` | `number` | Zero-based index in the `value` array. |
| `first` | `boolean` | `true` for the first event. |
| `last` | `boolean` | `true` for the last event. |
| `even` | `boolean` | `true` when `index` is even. |
| `odd` | `boolean` | `true` when `index` is odd. |
---
## Layout Options
### Vertical (default)
```html
<ui-lib-timeline [value]="events" layout="vertical" align="left">
  ...
</ui-lib-timeline>
```
Valid `align` values for vertical: `'left'` | `'right'` | `'alternate'`
### Horizontal
```html
<ui-lib-timeline [value]="events" layout="horizontal" align="top">
  ...
</ui-lib-timeline>
```
Valid `align` values for horizontal: `'top'` | `'bottom'`
---
## Template Slots
### Content + Opposite
```html
<ui-lib-timeline [value]="events" layout="vertical" align="left">
  <ng-template uiTimelineOpposite let-event>
    <span>{{ event.date }}</span>
  </ng-template>
  <ng-template uiTimelineContent let-event>
    <strong>{{ event.status }}</strong>
  </ng-template>
</ui-lib-timeline>
```
### Custom Marker
```html
<ui-lib-timeline [value]="events" layout="vertical" align="left">
  <ng-template uiTimelineMarker let-event>
    <span class="my-icon">{{ event.icon }}</span>
  </ng-template>
  <ng-template uiTimelineContent let-event>
    <p>{{ event.title }}</p>
  </ng-template>
</ui-lib-timeline>
```
### Alternate Alignment
```html
<ui-lib-timeline [value]="events" layout="vertical" align="alternate">
  <ng-template uiTimelineOpposite let-event>
    <small>{{ event.date }}</small>
  </ng-template>
  <ng-template uiTimelineContent let-event>
    <p>{{ event.status }}</p>
  </ng-template>
</ui-lib-timeline>
```
---
## Variants
| Value | Description |
|---|---|
| `material` | Filled primary-coloured dot, coloured connector, elevation on hover. |
| `bootstrap` | Hollow dot with primary border, thin solid connector. |
| `minimal` | Subtle border dot, hairline connector, transparent backgrounds. |
```html
<ui-lib-timeline [value]="events" variant="material">...</ui-lib-timeline>
<ui-lib-timeline [value]="events" variant="bootstrap">...</ui-lib-timeline>
<ui-lib-timeline [value]="events" variant="minimal">...</ui-lib-timeline>
```
---
## Sizes
| Value | Marker size | Gap | Font size |
|---|---|---|---|
| `sm` | `0.875rem` | `0.625rem` | `0.875rem` |
| `md` (default) | `1.25rem` | `1rem` | `1rem` |
| `lg` | `1.625rem` | `1.25rem` | `1.125rem` |
```html
<ui-lib-timeline [value]="events" size="sm">...</ui-lib-timeline>
<ui-lib-timeline [value]="events" size="lg">...</ui-lib-timeline>
```
---
## CSS Variables
All tokens are set on `.ui-lib-timeline` and can be overridden per-instance or globally.
| Variable | Default | Description |
|---|---|---|
| `--uilib-timeline-connector-color` | `var(--uilib-border-color, #dee2e6)` | Line colour between events. |
| `--uilib-timeline-connector-width` | `2px` | Line thickness. |
| `--uilib-timeline-marker-size` | `1.25rem` | Dot/marker width and height. |
| `--uilib-timeline-marker-bg` | `var(--uilib-primary-color, #3b82f6)` | Dot fill colour. |
| `--uilib-timeline-marker-border-color` | `var(--uilib-primary-color, #3b82f6)` | Dot border colour. |
| `--uilib-timeline-marker-border-width` | `2px` | Dot border width. |
| `--uilib-timeline-content-gap` | `1rem` | Space between separator and content. |
| `--uilib-timeline-opposite-gap` | `1rem` | Space between separator and opposite-side. |
| `--uilib-timeline-opposite-min-width` | `6rem` | Minimum width of the opposite column. |
| `--uilib-timeline-font-size` | `1rem` | Base font size for the component. |
| `--uilib-timeline-color` | `var(--uilib-text-color, #1f2937)` | Text colour. |
---
## Accessibility
- The host element has `role="list"` and `[attr.aria-label]`.
- Each event element has `role="listitem"` and an auto-generated `aria-label` (`"Event 1"`, `"Event 2"`, …).
- The marker wrapper has `aria-hidden="true"` to keep decorative dots out of the a11y tree.
- Connectors are decorative `<span>` elements and carry no semantic meaning.
---
## TypeScript Types
```typescript
import type {
  TimelineLayout,   // 'vertical' | 'horizontal'
  TimelineAlign,    // 'left' | 'right' | 'alternate' | 'top' | 'bottom'
  TimelineVariant,  // 'material' | 'bootstrap' | 'minimal'
  TimelineSize,     // 'sm' | 'md' | 'lg'
  TimelineItemContext,
} from 'ui-lib-custom/timeline';
```
---
## Constants
```typescript
import { TIMELINE_DEFAULTS } from 'ui-lib-custom/timeline';
// { layout: 'vertical', align: 'left', size: 'md', ariaLabel: 'Timeline' }
```
