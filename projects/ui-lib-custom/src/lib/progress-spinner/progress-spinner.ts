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
import { PROGRESS_SPINNER_DEFAULTS } from './progress-spinner.types';
import type { ProgressSpinnerSize, ProgressSpinnerVariant } from './progress-spinner.types';

export type { ProgressSpinnerSize, ProgressSpinnerVariant } from './progress-spinner.types';

/**
 * ProgressSpinner — an animated circular spinner indicating an indeterminate loading state.
 *
 * Renders an SVG circle with a CSS-animated stroke-dashoffset that produces a
 * continuously running "arc chase" effect.  The outer SVG also rotates to add
 * the characteristic spinning motion.
 *
 * Three design variants map to the global theme: `material` (colour-cycling arc),
 * `bootstrap` (solid primary blue), and `minimal` (muted grey).
 *
 * @example
 * <!-- Default spinner -->
 * <ui-lib-progress-spinner />
 *
 * <!-- Custom size and animation speed -->
 * <ui-lib-progress-spinner size="lg" animationDuration="1.5s" />
 *
 * <!-- Custom stroke and fill -->
 * <ui-lib-progress-spinner strokeWidth="4" fill="#f5f5f5" />
 */
@Component({
  selector: 'ui-lib-progress-spinner',
  standalone: true,
  templateUrl: './progress-spinner.html',
  styleUrl: './progress-spinner.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'status',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-busy]': '"true"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressSpinner {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ---------------------------------------------------------------------------
  // Public inputs
  // ---------------------------------------------------------------------------

  /**
   * Width of the SVG circle stroke in SVG user-unit coordinates.
   * Corresponds to the `stroke-width` attribute on the `<circle>` element.
   * Default: `'2'`.
   */
  public readonly strokeWidth: InputSignal<string> = input<string>(
    PROGRESS_SPINNER_DEFAULTS.strokeWidth
  );

  /**
   * Fill color of the SVG circle.
   * Accepts any CSS color string.  Use `'none'` for a transparent interior.
   * Default: `'none'`.
   */
  public readonly fill: InputSignal<string> = input<string>(PROGRESS_SPINNER_DEFAULTS.fill);

  /**
   * Duration of one animation cycle (rotation + dash).
   * Accepts any valid CSS `<time>` value, e.g. `'1s'`, `'750ms'`.
   * Default: `'2s'`.
   */
  public readonly animationDuration: InputSignal<string> = input<string>(
    PROGRESS_SPINNER_DEFAULTS.animationDuration
  );

  /** Component size token (`'sm'` | `'md'` | `'lg'`). Default: `'md'`. */
  public readonly size: InputSignal<ProgressSpinnerSize> = input<ProgressSpinnerSize>(
    PROGRESS_SPINNER_DEFAULTS.size
  );

  /**
   * Design variant override.
   * When `null` the active global theme variant from `ThemeConfigService` is used.
   */
  public readonly variant: InputSignal<ProgressSpinnerVariant | null> =
    input<ProgressSpinnerVariant | null>(null);

  /** Additional CSS class(es) to apply to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label announced to screen readers. Default: `'Loading...'`. */
  public readonly ariaLabel: InputSignal<string> = input<string>('Loading...');

  // ---------------------------------------------------------------------------
  // Derived signals
  // ---------------------------------------------------------------------------

  /** Resolved variant — local input wins; falls back to global ThemeConfigService. */
  protected readonly effectiveVariant: Signal<ProgressSpinnerVariant> =
    computed<ProgressSpinnerVariant>(
      (): ProgressSpinnerVariant => this.variant() ?? this.themeConfig.variant()
    );

  /** CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-progress-spinner',
      `ui-lib-progress-spinner--variant-${this.effectiveVariant()}`,
      `ui-lib-progress-spinner--size-${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
}
