import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type {
  MeterGroupLabelPosition,
  MeterGroupOrientation,
  MeterGroupSize,
  MeterGroupVariant,
  MeterItem,
  MeterSegment,
} from './meter-group.types';

export type {
  MeterGroupLabelPosition,
  MeterGroupOrientation,
  MeterGroupSize,
  MeterGroupVariant,
  MeterItem,
  MeterSegment,
} from './meter-group.types';

let nextMeterGroupId: number = 0;

/**
 * MeterGroup — segmented progress/meter bar component.
 *
 * Renders multiple coloured segments proportional to their values against a
 * configurable min/max range.  An optional legend lists each segment's label,
 * colour, and value.  Supports horizontal and vertical orientations and three
 * design variants (material / bootstrap / minimal).
 *
 * @example
 * <ui-lib-meter-group
 *   [values]="[
 *     { label: 'Apps', value: 16, color: '#34d399' },
 *     { label: 'Messages', value: 8, color: '#818cf8' }
 *   ]"
 * />
 */
@Component({
  selector: 'ui-lib-meter-group',
  standalone: true,
  templateUrl: './meter-group.html',
  styleUrl: './meter-group.scss',
  host: {
    '[attr.id]': 'instanceId',
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MeterGroup {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** Unique instance identifier (auto-generated). */
  public readonly instanceId: string = `ui-lib-meter-group-${++nextMeterGroupId}`;

  /** Array of meter segments to render. */
  public readonly values: InputSignal<MeterItem[]> = input<MeterItem[]>([]);

  /** Minimum value of the range (default `0`). */
  public readonly min: InputSignal<number> = input<number>(0);

  /** Maximum value of the range (default `100`). */
  public readonly max: InputSignal<number> = input<number>(100);

  /** Bar orientation. */
  public readonly orientation: InputSignal<MeterGroupOrientation> =
    input<MeterGroupOrientation>('horizontal');

  /** Whether to render the legend. */
  public readonly showLabels: InputSignal<boolean> = input<boolean>(true);

  /** Position of the legend relative to the bar (`'start'` = above/left, `'end'` = below/right). */
  public readonly labelPosition: InputSignal<MeterGroupLabelPosition> =
    input<MeterGroupLabelPosition>('end');

  /** Component size token. */
  public readonly size: InputSignal<MeterGroupSize> = input<MeterGroupSize>('md');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<MeterGroupVariant | null> = input<MeterGroupVariant | null>(
    null,
  );

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the meter container group. */
  public readonly ariaLabel: InputSignal<string> = input<string>('Meter group');

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<MeterGroupVariant> = computed<MeterGroupVariant>(
    (): MeterGroupVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-meter-group',
      `ui-lib-meter-group--variant-${this.effectiveVariant()}`,
      `ui-lib-meter-group--size-${this.size()}`,
      `ui-lib-meter-group--orientation-${this.orientation()}`,
      `ui-lib-meter-group--label-${this.labelPosition()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Total span of the range. */
  private readonly rangeSpan: Signal<number> = computed<number>((): number =>
    Math.max(this.max() - this.min(), 0),
  );

  /** Values clamped to [min, max] and enriched with resolved percentage. */
  public readonly meterSegments: Signal<MeterSegment[]> = computed<MeterSegment[]>(
    (): MeterSegment[] => {
      const span: number = this.rangeSpan();
      if (span === 0) {
        return [];
      }
      const min: number = this.min();
      const max: number = this.max();
      return this.values().map((item: MeterItem): MeterSegment => {
        const clampedValue: number = Math.min(Math.max(item.value, min), max);
        return {
          ...item,
          value: clampedValue,
          percentage: ((clampedValue - min) / span) * 100,
        };
      });
    },
  );

  /** Sum of all rendered segment values. */
  public readonly totalValue: Signal<number> = computed<number>((): number =>
    this.meterSegments().reduce(
      (sum: number, segment: MeterSegment): number => sum + segment.value,
      0,
    ),
  );

  /** Screen-reader announcement string for the current total. */
  public readonly totalAnnouncement: Signal<string> = computed<string>(
    (): string => `Total: ${this.totalValue()}`,
  );

  /** Returns a stable key for segment rendering. */
  public trackSegment(index: number, segment: MeterSegment): string {
    return `${index}-${segment.label}-${segment.value}`;
  }

  /** Returns an aria-label for a segment including value and range context. */
  public getSegmentAriaLabel(segment: MeterSegment, index: number): string {
    const label: string =
      segment.label.trim() ||
      this.i18n.translate('meter-group.segment.default', { index: index + 1 });
    return this.i18n.translate('meter-group.segment', {
      label,
      value: segment.value,
      max: this.max(),
    });
  }
}
