import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  inject,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { BadgeVariant, BadgeColor, BadgeSize } from './badge.types';

export type { BadgeVariant, BadgeColor, BadgeSize } from './badge.types';

/**
 * Badge - A performant badge/tag component for labels, status, and counts
 *
 * Single element rendering with OnPush strategy and signal-based inputs.
 * Uses design tokens for consistent styling.
 *
 * @example
 * <ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>
 * <ui-lib-badge color="danger" variant="outline" size="sm">3</ui-lib-badge>
 * <ui-lib-badge color="info" variant="subtle">New</ui-lib-badge>
 */
@Component({
  selector: 'ui-lib-badge',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './badge.scss',
  host: {
    '[class]': 'badgeClasses()',
    '[attr.role]': 'roleAttr()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Badge {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Visual variant of the badge */
  public readonly variant: InputSignal<BadgeVariant | null> = input<BadgeVariant | null>(null);

  /** Color theme of the badge */
  public readonly color: InputSignal<BadgeColor> = input<BadgeColor>('primary');

  /** Size of the badge */
  public readonly size: InputSignal<BadgeSize> = input<BadgeSize>('md');

  /** Whether the badge is a pill shape (fully rounded) */
  public readonly pill: InputSignal<boolean> = input<boolean>(false);

  /** Whether the badge is a dot (small circular indicator) */
  public readonly dot: InputSignal<boolean> = input<boolean>(false);

  /** Accessible label for the badge, used when screen reader support is needed */
  public readonly label: InputSignal<string | null> = input<string | null>(null);

  private readonly effectiveVariant: Signal<BadgeVariant> = computed<BadgeVariant>(
    (): BadgeVariant => {
      const direct: BadgeVariant | null = this.variant();
      if (direct) return direct;
      const global: 'material' | 'bootstrap' | 'minimal' = this.themeConfig.variant();
      const map: Record<'material' | 'bootstrap' | 'minimal', BadgeVariant> = {
        material: 'solid',
        bootstrap: 'outline',
        minimal: 'subtle',
      };
      return map[global];
    }
  );

  /** Computed CSS classes for the badge element */
  public readonly badgeClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'badge',
      `badge-variant-${this.effectiveVariant()}`,
      `badge-color-${this.color()}`,
      `badge-size-${this.size()}`,
    ];

    if (this.pill()) {
      classes.push('badge-pill');
    }

    if (this.dot()) {
      classes.push('badge-dot');
    }

    return classes.join(' ');
  });

  /** Computed ARIA label for the badge, falls back to color for dot badges */
  public readonly ariaLabel: Signal<string | null> = computed<string | null>(
    (): string | null => this.label() ?? (this.dot() ? this.color() : null)
  );

  /** Computed role attribute for the badge, 'status' for dot badges */
  public readonly roleAttr: Signal<string | null> = computed<string | null>((): string | null =>
    this.dot() ? 'status' : null
  );
}
