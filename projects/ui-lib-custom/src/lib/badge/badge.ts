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

let nextBadgeId: number = 0;

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
    '[attr.id]': 'id()',
    '[attr.role]': 'roleAttr()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-hidden]': 'ariaHiddenAttr()',
    '[attr.aria-live]': 'ariaLiveAttr()',
    '[attr.aria-atomic]': 'ariaAtomicAttr()',
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

  /** Whether the badge is decorative and should be hidden from assistive technologies */
  public readonly decorative: InputSignal<boolean> = input<boolean>(false);

  /** Accessible label for the badge, used when screen reader support is needed */
  public readonly label: InputSignal<string | null> = input<string | null>(null);

  private readonly instanceId: number = nextBadgeId++;

  /** Auto-generated stable host id */
  public readonly id: Signal<string> = computed<string>(
    (): string => `ui-lib-badge-${this.instanceId.toString()}`
  );

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
      'ui-lib-badge',
      `ui-lib-badge--variant-${this.effectiveVariant()}`,
      `ui-lib-badge--color-${this.color()}`,
      `ui-lib-badge--size-${this.size()}`,
    ];

    if (this.pill()) {
      classes.push('ui-lib-badge--pill');
    }

    if (this.dot()) {
      classes.push('ui-lib-badge--dot');
    }

    return classes.join(' ');
  });

  /** Computed ARIA label for the badge, falls back to color for dot badges */
  public readonly ariaLabel: Signal<string | null> = computed<string | null>((): string | null => {
    if (this.decorative()) {
      return null;
    }
    return this.label() ?? (this.dot() ? this.color() : null);
  });

  /** Computed role attribute for the badge, 'status' for dot badges */
  public readonly roleAttr: Signal<string | null> = computed<string | null>((): string | null =>
    this.decorative() ? null : this.dot() ? 'status' : null
  );

  /** Computed aria-hidden attribute for decorative badges */
  public readonly ariaHiddenAttr: Signal<'true' | null> = computed<'true' | null>(
    (): 'true' | null => (this.decorative() ? 'true' : null)
  );

  /** Computed aria-live attribute for non-decorative status badges */
  public readonly ariaLiveAttr: Signal<'polite' | null> = computed<'polite' | null>(
    (): 'polite' | null => (this.decorative() || !this.dot() ? null : 'polite')
  );

  /** Computed aria-atomic attribute for non-decorative status badges */
  public readonly ariaAtomicAttr: Signal<'true' | null> = computed<'true' | null>(
    (): 'true' | null => (this.decorative() || !this.dot() ? null : 'true')
  );
}
