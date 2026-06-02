# Timeline

**Selector:** `ui-lib-timeline`
**Entry point:** `import { Timeline } from 'ui-lib-custom/timeline'`

---

## Overview

Timeline component — renders a series of events along a vertical or horizontal axis. Supports three named template slots via structural directives: - `[uiTimelineMarker]` — custom dot/icon in the separator track - `[uiTimelineContent]` — main event body (right/bottom by default) - `[uiTimelineOpposite]` — opposite-side label (left/top by default)

## API

### Inputs

| Name         | Type             | Default                       | Description                                                                                                                  |
| ------------ | ---------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------- | ---------- |
| `align`      | `TimelineAlign`  | `TIMELINE_DEFAULTS.align`     | Event alignment within the layout. Vertical: `'left'`                                                                        | `'right'`                                                                                 | `'alternate'` Horizontal: `'top'` | `'bottom'` |
| `ariaLabel`  | `string`         | `TIMELINE_DEFAULTS.ariaLabel` | Accessible label for the timeline list.                                                                                      |
| `layout`     | `TimelineLayout` | `TIMELINE_DEFAULTS.layout`    | Layout orientation. - `'vertical'` (default) — events stacked top-to-bottom - `'horizontal'` — events arranged left-to-right |
| `size`       | `TimelineSize`   | `TIMELINE_DEFAULTS.size`      | Component density size.                                                                                                      |
| `styleClass` | `string          | null`                         | `null`                                                                                                                       | Additional CSS class(es) to append to the host element.                                   |
| `variant`    | `TimelineVariant | null`                         | `null`                                                                                                                       | Visual variant override. When `null`, the variant is inherited from `ThemeConfigService`. |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                           | Default                               |
| -------------------------------------- | ------------------------------------- |
| `--uilib-timeline-color`               | `var(--uilib-text-color, #1f2937)`    |
| `--uilib-timeline-connector-color`     | `var(--uilib-border-color, #dee2e6)`  |
| `--uilib-timeline-connector-width`     | `2px`                                 |
| `--uilib-timeline-content-gap`         | `1rem`                                |
| `--uilib-timeline-event-gap`           | `0`                                   |
| `--uilib-timeline-focus-ring-color`    | `var(--uilib-primary-color, #3b82f6)` |
| `--uilib-timeline-font-size`           | `1rem`                                |
| `--uilib-timeline-marker-bg`           | `var(--uilib-primary-color, #3b82f6)` |
| `--uilib-timeline-marker-border-color` | `var(--uilib-primary-color, #3b82f6)` |
| `--uilib-timeline-marker-border-width` | `2px`                                 |
| `--uilib-timeline-marker-size`         | `1.25rem`                             |
| `--uilib-timeline-opposite-gap`        | `1rem`                                |
| `--uilib-timeline-opposite-min-width`  | `6rem`                                |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                                        |
| --------------------------------------------------------------------------------------- |
| should apply ${variant} variant class                                                   |
| should expose role=                                                                     |
| should have role=                                                                       |
| should include opposite content in aria-labelledby when an opposite template is present |
| should keep the host and event rows out of the tab order by default                     |
| should pass axe after reactive layout changes                                           |
| should pass axe in the default state                                                    |
| should pass axe with templated horizontal content                                       |
| should preserve native keyboard access for projected interactive content                |
| should set aria-label on the host element                                               |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#timeline)
- [Demo page](/components/timeline)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/timeline/README.md)
