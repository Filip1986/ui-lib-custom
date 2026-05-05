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
import type { ProgressBarMode, ProgressBarSize, ProgressBarVariant } from './progress-bar.types';

export type { ProgressBarMode, ProgressBarSize, ProgressBarVariant } from './progress-bar.types';

/**
 * ProgressBar — displays a horizontal bar indicating progress or loading state.
 *
 * Supports determinate mode (fixed percentage fill) and indeterminate mode (animated
 * oscillating bar for unknown durations).  Three design variants and three size tokens
 * integrate with the library theming system.
 *
 * @example
 * <ui-lib-progress-bar [value]="75" />
 * <ui-lib-progress-bar mode="indeterminate" />
 */
@Component({
  selector: 'ui-lib-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'progressbar',
    '[attr.aria-valuenow]': 'mode() === "determinate" ? clampedValue() : null',
    '[attr.aria-valuemin]': '"0"',
    '[attr.aria-valuemax]': '"100"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-busy]': 'mode() === "indeterminate" ? true : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBar {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Progress value from 0 to 100. Clamped automatically. */
  public readonly value: InputSignal<number> = input<number>(0);

  /** Display mode. */
  public readonly mode: InputSignal<ProgressBarMode> = input<ProgressBarMode>('determinate');

  /** Whether to display the numeric percentage label inside the fill bar. */
  public readonly showValue: InputSignal<boolean> = input<boolean>(true);

  /** Custom label text; overrides the computed percentage string when set. */
  public readonly label: InputSignal<string | null> = input<string | null>(null);

  /** Component size token. */
  public readonly size: InputSignal<ProgressBarSize> = input<ProgressBarSize>('md');

  /** Design variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ProgressBarVariant | null> =
    input<ProgressBarVariant | null>(null);

  /** Custom CSS color applied directly to the fill element, overriding the CSS variable. */
  public readonly color: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ProgressBarVariant> = computed<ProgressBarVariant>(
    (): ProgressBarVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-progress-bar',
      `ui-lib-progress-bar--variant-${this.effectiveVariant()}`,
      `ui-lib-progress-bar--size-${this.size()}`,
    ];
    if (this.mode() === 'indeterminate') {
      classes.push('ui-lib-progress-bar--indeterminate');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Value clamped to [0, 100]. */
  public readonly clampedValue: Signal<number> = computed<number>((): number =>
    Math.min(Math.max(this.value(), 0), 100)
  );

  /** Label rendered inside the fill bar. */
  public readonly displayLabel: Signal<string> = computed<string>((): string => {
    const customLabel: string | null = this.label();
    if (customLabel !== null) {
      return customLabel;
    }
    return `${Math.round(this.clampedValue())}%`;
  });

  /** Accessible label used in indeterminate mode where aria-valuenow is absent. */
  public readonly ariaLabel: Signal<string | null> = computed<string | null>((): string | null =>
    this.mode() === 'indeterminate' ? 'Loading' : null
  );
}
