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
import type { SkeletonAnimation, SkeletonShape, SkeletonVariant } from './skeleton.types';

export type { SkeletonAnimation, SkeletonShape, SkeletonVariant } from './skeleton.types';

/**
 * Skeleton — content placeholder displayed while real content is loading.
 *
 * Renders an animated shimmer block in rectangle or circle shape. Use width,
 * height, and size inputs to control dimensions. Combine multiple skeletons
 * to mock realistic page layouts.
 *
 * @example
 * <ui-lib-skeleton width="100%" height="1.5rem" />
 * <ui-lib-skeleton shape="circle" size="4rem" />
 */
@Component({
  selector: 'ui-lib-skeleton',
  standalone: true,
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.width]': 'effectiveWidth()',
    '[style.height]': 'effectiveHeight()',
    '[style.border-radius]': 'effectiveBorderRadius()',
    'aria-hidden': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Skeleton {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Shape of the skeleton placeholder. */
  public readonly shape: InputSignal<SkeletonShape> = input<SkeletonShape>('rectangle');

  /** Width of the skeleton. Accepts any valid CSS dimension string (e.g. '100%', '12rem'). */
  public readonly width: InputSignal<string> = input<string>('100%');

  /** Height of the skeleton. Accepts any valid CSS dimension string (e.g. '1rem', '4rem'). */
  public readonly height: InputSignal<string> = input<string>('1rem');

  /**
   * Convenience shorthand that sets both width and height to the same value.
   * Useful for circle shapes. When set, overrides width and height individually.
   */
  public readonly size: InputSignal<string | null> = input<string | null>(null);

  /** Custom border-radius value. Overrides the shape-derived default. */
  public readonly borderRadius: InputSignal<string | null> = input<string | null>(null);

  /** Animation type. Use 'none' to disable the shimmer. */
  public readonly animation: InputSignal<SkeletonAnimation> = input<SkeletonAnimation>('wave');

  /** Design variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<SkeletonVariant | null> = input<SkeletonVariant | null>(
    null
  );

  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<SkeletonVariant> = computed<SkeletonVariant>(
    (): SkeletonVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-skeleton',
      `ui-lib-skeleton--shape-${this.shape()}`,
      `ui-lib-skeleton--variant-${this.effectiveVariant()}`,
    ];
    if (this.animation() === 'wave') {
      classes.push('ui-lib-skeleton--wave');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Resolved width — size input takes precedence over width. */
  public readonly effectiveWidth: Signal<string> = computed<string>(
    (): string => this.size() ?? this.width()
  );

  /** Resolved height — size input takes precedence over height. */
  public readonly effectiveHeight: Signal<string> = computed<string>(
    (): string => this.size() ?? this.height()
  );

  /** Resolved border-radius — explicit borderRadius overrides shape default. */
  public readonly effectiveBorderRadius: Signal<string | null> = computed<string | null>(
    (): string | null => this.borderRadius()
  );
}
