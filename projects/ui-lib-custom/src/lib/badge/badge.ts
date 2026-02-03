import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export type BadgeVariant = 'solid' | 'outline' | 'subtle';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

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
})
export class Badge {
  /** Visual variant of the badge */
  variant = input<BadgeVariant>('solid');

  /** Color theme of the badge */
  color = input<BadgeColor>('primary');

  /** Size of the badge */
  size = input<BadgeSize>('md');

  /** Whether the badge is a pill shape (fully rounded) */
  pill = input<boolean>(false);

  /** Whether the badge is a dot (small circular indicator) */
  dot = input<boolean>(false);

  /** Accessible label for the badge, used when screen reader support is needed */
  label = input<string | null>(null);

  /** Computed CSS classes for the badge element */
  badgeClasses = computed(() => {
    const classes = [
      'badge',
      `badge-variant-${this.variant()}`,
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
  ariaLabel = computed(() => this.label() ?? (this.dot() ? this.color() : null));

  /** Computed role attribute for the badge, 'status' for dot badges */
  roleAttr = computed(() => (this.dot() ? 'status' : null));
}
