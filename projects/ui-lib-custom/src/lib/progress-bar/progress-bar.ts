import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  computed,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
  type TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type {
  ProgressBarLabelContext,
  ProgressBarMode,
  ProgressBarSize,
  ProgressBarVariant,
} from './progress-bar.types';

export type {
  ProgressBarLabelContext,
  ProgressBarMode,
  ProgressBarSize,
  ProgressBarVariant,
} from './progress-bar.types';

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
  imports: [NgTemplateOutlet],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'progressbar',
    '[attr.aria-valuenow]': 'ariaValueNow()',
    '[attr.aria-valuemin]': '"0"',
    '[attr.aria-valuemax]': '"100"',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    '[attr.aria-labelledby]': 'ariaLabelledBy() || null',
    '[attr.aria-busy]': 'indeterminate() ? true : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBar {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

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

  /**
   * Accessible label for the progress bar.
   * Auto-set to "Loading" in indeterminate mode when not provided.
   */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** ID of an external element that labels this progress bar (`aria-labelledby`). */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /**
   * Human-readable value text announced by screen readers.
   * Overrides the default computed text — useful for i18n
   * (e.g., `"75 Prozent"` or `"Chargement"`).
   */
  public readonly ariaValueText: InputSignal<string | null> = input<string | null>(null);

  /**
   * Message read by a polite live region when progress reaches 100%.
   * Defaults to `"Complete"` when not set.
   */
  public readonly completionLabel: InputSignal<string | null> = input<string | null>(null);

  /**
   * Optional typed template for the label rendered inside the fill bar.
   *
   * ```html
   * <ui-lib-progress-bar [value]="75">
   *   <ng-template #labelTemplate let-value="value" let-label="displayLabel">
   *     {{ label }} done
   *   </ng-template>
   * </ui-lib-progress-bar>
   * ```
   *
   * Context: `{ $implicit: number, value: number, displayLabel: string }`.
   * When not provided, the default percentage / `label` input text is used.
   */
  @ContentChild('labelTemplate')
  public readonly labelTemplate: TemplateRef<ProgressBarLabelContext> | null = null;

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ProgressBarVariant> = computed<ProgressBarVariant>(
    (): ProgressBarVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** True when the bar is in indeterminate mode. */
  protected readonly indeterminate: Signal<boolean> = computed<boolean>(
    (): boolean => this.mode() === 'indeterminate',
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-progress-bar',
      `ui-lib-progress-bar--variant-${this.effectiveVariant()}`,
      `ui-lib-progress-bar--size-${this.size()}`,
    ];
    if (this.indeterminate()) {
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
    Math.min(Math.max(this.value(), 0), 100),
  );

  /** Label rendered inside the fill bar. */
  public readonly displayLabel: Signal<string> = computed<string>((): string => {
    const customLabel: string | null = this.label();
    if (customLabel !== null) {
      return customLabel;
    }
    return `${Math.round(this.clampedValue())}%`;
  });

  /** Template context object passed to the `#labelTemplate` slot. */
  public readonly labelContext: Signal<ProgressBarLabelContext> = computed<ProgressBarLabelContext>(
    (): ProgressBarLabelContext => ({
      $implicit: this.clampedValue(),
      value: this.clampedValue(),
      displayLabel: this.displayLabel(),
    }),
  );

  /**
   * `aria-valuenow` value.
   * Returns `null` (attribute omitted) in indeterminate mode so screen readers
   * interpret the absence as "unknown progress".
   */
  protected readonly ariaValueNow: Signal<number | null> = computed<number | null>(
    (): number | null => (this.indeterminate() ? null : this.clampedValue()),
  );

  /** Human-readable value text for screen readers (`aria-valuetext`). */
  protected readonly valueText: Signal<string> = computed<string>((): string => {
    const override: string | null = this.ariaValueText();
    if (override !== null) {
      return override;
    }
    return this.indeterminate() ? 'Loading\u2026' : `${this.clampedValue()}%`;
  });

  /**
   * Resolved `aria-label` value.
   * The `ariaLabel` input takes precedence; falls back to `"Loading"` in
   * indeterminate mode so screen readers always have a meaningful description.
   */
  protected readonly resolvedAriaLabel: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const labelInput: string | null = this.ariaLabel();
      if (labelInput !== null) {
        return labelInput;
      }
      return this.indeterminate() ? 'Loading' : null;
    },
  );
}
