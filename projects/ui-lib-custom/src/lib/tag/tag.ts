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
import type { TagSeverity, TagSize, TagVariant } from './tag.types';

export type { TagSeverity, TagSize, TagVariant } from './tag.types';

/**
 * Tag — compact label for status, category, or classification.
 *
 * Supports a text label, an optional leading icon, severity-based colouring,
 * three sizes (sm / md / lg), and three design variants (material / bootstrap / minimal).
 * Use the `rounded` input to control border-radius independently of variant.
 *
 * @example
 * <ui-lib-tag value="New" />
 * <ui-lib-tag value="Success" severity="success" />
 * <ui-lib-tag value="Angular" icon="pi pi-bolt" [rounded]="true" />
 */
@Component({
  selector: 'ui-lib-tag',
  standalone: true,
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'value() ?? null',
    role: 'status',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Tag {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Text displayed inside the tag. */
  public readonly value: InputSignal<string | null> = input<string | null>(null);

  /** CSS class string for a leading PrimeIcons icon (e.g. "pi pi-check"). */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);

  /**
   * Severity colour — maps to a predefined palette.
   * Defaults to `'primary'`.
   */
  public readonly severity: InputSignal<TagSeverity> = input<TagSeverity>('primary');

  /**
   * When true, the tag uses fully rounded (pill) corners regardless of variant.
   * Defaults to `false`.
   */
  public readonly rounded: InputSignal<boolean> = input<boolean>(false);

  /** Size of the tag. Defaults to `'md'`. */
  public readonly size: InputSignal<TagSize> = input<TagSize>('md');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<TagVariant | null> = input<TagVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<TagVariant> = computed<TagVariant>(
    (): TagVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-tag',
      `ui-lib-tag--size-${this.size()}`,
      `ui-lib-tag--variant-${this.effectiveVariant()}`,
      `ui-lib-tag--severity-${this.severity()}`,
    ];
    if (this.rounded()) {
      classes.push('ui-lib-tag--rounded');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Whether the icon slot should be rendered. */
  public readonly showIcon: Signal<boolean> = computed<boolean>(
    (): boolean => this.icon() !== null
  );
}
