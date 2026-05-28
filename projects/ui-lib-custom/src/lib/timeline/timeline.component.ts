import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type {
  TimelineAlign,
  TimelineItemContext,
  TimelineLayout,
  TimelineSize,
  TimelineVariant,
} from './timeline.types';
import {
  TimelineContentDirective,
  TimelineMarkerDirective,
  TimelineOppositeDirective,
} from './timeline-template-directives';
import { TIMELINE_DEFAULTS } from './timeline.constants';
/** Monotonic counter for unique Timeline element IDs. */
let nextTimelineId: number = 0;
/**
 * Timeline component — renders a series of events along a vertical or horizontal axis.
 *
 * Supports three named template slots via structural directives:
 * - `[uiTimelineMarker]`   — custom dot/icon in the separator track
 * - `[uiTimelineContent]`  — main event body (right/bottom by default)
 * - `[uiTimelineOpposite]` — opposite-side label (left/top by default)
 *
 * @example
 * ```html
 * <ui-lib-timeline [value]="events">
 *   <ng-template uiTimelineContent let-event>{{ event.title }}</ng-template>
 * </ui-lib-timeline>
 * ```
 */
@Component({
  selector: 'ui-lib-timeline',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.id]': 'instanceId',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    role: 'list',
  },
})
export class TimelineComponent<T> {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  /** Unique instance id used for accessibility attributes. */
  public readonly instanceId: string = `ui-lib-timeline-${nextTimelineId++}`;
  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------
  /** Array of data items to render as timeline events. */
  public readonly value: InputSignal<T[]> = input.required<T[]>();
  /**
   * Layout orientation.
   * - `'vertical'` (default) — events stacked top-to-bottom
   * - `'horizontal'` — events arranged left-to-right
   */
  public readonly layout: InputSignal<TimelineLayout> = input<TimelineLayout>(
    TIMELINE_DEFAULTS.layout,
  );
  /**
   * Event alignment within the layout.
   * Vertical: `'left'` | `'right'` | `'alternate'`
   * Horizontal: `'top'` | `'bottom'`
   */
  public readonly align: InputSignal<TimelineAlign> = input<TimelineAlign>(TIMELINE_DEFAULTS.align);
  /**
   * Visual variant override. When `null`, the variant is inherited from `ThemeConfigService`.
   */
  public readonly variant: InputSignal<TimelineVariant | null> = input<TimelineVariant | null>(
    null,
  );
  /** Component density size. */
  public readonly size: InputSignal<TimelineSize> = input<TimelineSize>(TIMELINE_DEFAULTS.size);
  /** Additional CSS class(es) to append to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);
  /** Accessible label for the timeline list. Falls back to i18n `timeline.label` when empty. */
  public readonly ariaLabel: InputSignal<string> = input<string>('');
  // ---------------------------------------------------------------------------
  // Resolved accessible label
  // ---------------------------------------------------------------------------
  /** Resolved aria-label: explicit ariaLabel input > i18n fallback. */
  public readonly resolvedAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() || this.i18n.translate('timeline.label'),
  );
  // ---------------------------------------------------------------------------
  // Content children (template slot directives)
  // ---------------------------------------------------------------------------
  /** Custom template for the event marker (dot/icon) in the separator track. */
  public readonly markerTemplate: Signal<TemplateRef<TimelineItemContext<T>> | undefined> =
    contentChild(TimelineMarkerDirective, { read: TemplateRef });
  /** Custom template for the main event body shown on the content side. */
  public readonly contentTemplate: Signal<TemplateRef<TimelineItemContext<T>> | undefined> =
    contentChild(TimelineContentDirective, { read: TemplateRef });
  /** Custom template for the label shown on the opposite side of the separator. */
  public readonly oppositeTemplate: Signal<TemplateRef<TimelineItemContext<T>> | undefined> =
    contentChild(TimelineOppositeDirective, { read: TemplateRef });
  // ---------------------------------------------------------------------------
  // Computed view state
  // ---------------------------------------------------------------------------
  /** Resolved theme variant — falls back to global ThemeConfigService value. */
  public readonly resolvedVariant: Signal<TimelineVariant> = computed<TimelineVariant>(
    (): TimelineVariant => this.variant() ?? this.themeConfig.variant(),
  );
  /** Full CSS class string applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-timeline',
      `ui-lib-timeline--${this.layout()}`,
      `ui-lib-timeline--align-${this.align()}`,
      `ui-lib-timeline--${this.resolvedVariant()}`,
      `ui-lib-timeline--${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
  /** Mapped array of item contexts passed to each item template. */
  public readonly itemContexts: Signal<TimelineItemContext<T>[]> = computed<
    TimelineItemContext<T>[]
  >((): TimelineItemContext<T>[] => {
    const items: T[] = this.value();
    return items.map(
      (item: T, index: number): TimelineItemContext<T> => ({
        $implicit: item,
        index,
        first: index === 0,
        last: index === items.length - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
      }),
    );
  });

  /** Returns a stable track key for the rendered item. */
  public trackItem(index: number, context: TimelineItemContext<T>): unknown {
    const item: T = context.$implicit;
    if (this.isRecord(item)) {
      const explicitId: string | number | null =
        this.readTrackValue(item, 'id') ?? this.readTrackValue(item, 'key');
      return explicitId ?? item;
    }
    return item ?? index;
  }

  /** Returns the element id used by an individual content container. */
  public eventContentId(index: number): string {
    return `${this.instanceId}-content-${index}`;
  }

  /** Returns the element id used by an individual opposite container. */
  public eventOppositeId(index: number): string {
    return `${this.instanceId}-opposite-${index}`;
  }

  /** Returns the ids that provide the accessible name for an event. */
  public eventLabelledBy(context: TimelineItemContext<T>): string {
    const labelledByIds: string[] = [this.eventContentId(context.index)];
    if (this.oppositeTemplate()) {
      labelledByIds.push(this.eventOppositeId(context.index));
    }
    return labelledByIds.join(' ');
  }

  /** Returns the fallback content rendered when no content template is provided. */
  public defaultEventContent(item: T, index: number): string {
    if (
      typeof item === 'string' ||
      typeof item === 'number' ||
      typeof item === 'boolean' ||
      typeof item === 'bigint'
    ) {
      return String(item);
    }

    if (this.isRecord(item)) {
      const primaryText: string | null = this.readItemText(item, [
        'ariaLabel',
        'title',
        'label',
        'name',
        'status',
      ]);
      const secondaryText: string | null = this.readItemText(item, [
        'date',
        'description',
        'subtitle',
      ]);

      if (primaryText && secondaryText && primaryText !== secondaryText) {
        return `${primaryText} — ${secondaryText}`;
      }

      if (primaryText) {
        return primaryText;
      }

      if (secondaryText) {
        return secondaryText;
      }
    }

    return `Event ${index + 1}`;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private readTrackValue(record: Record<string, unknown>, key: string): string | number | null {
    const value: unknown = record[key];
    if (typeof value === 'string') {
      const trimmedValue: string = value.trim();
      return trimmedValue.length > 0 ? trimmedValue : null;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    return null;
  }

  private readItemText(record: Record<string, unknown>, keys: readonly string[]): string | null {
    for (const key of keys) {
      const value: unknown = record[key];
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'bigint'
      ) {
        const text: string = String(value).trim();
        if (text.length > 0) {
          return text;
        }
      }
    }
    return null;
  }
}
