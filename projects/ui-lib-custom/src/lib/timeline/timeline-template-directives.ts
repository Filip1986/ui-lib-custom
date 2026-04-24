import { Directive } from '@angular/core';
/** Marks the template used to render the marker (dot/icon) for each Timeline event. */
@Directive({ selector: '[uiTimelineMarker]', standalone: true })
export class TimelineMarkerDirective {}
/** Marks the template used to render the main content body of each Timeline event. */
@Directive({ selector: '[uiTimelineContent]', standalone: true })
export class TimelineContentDirective {}
/** Marks the template used to render the opposite-side label of each Timeline event. */
@Directive({ selector: '[uiTimelineOpposite]', standalone: true })
export class TimelineOppositeDirective {}
