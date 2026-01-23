import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import {
  SEMANTIC_COLORS,
  FONT_SIZES,
  SPACING_TOKENS,
  BORDER_RADIUS,
  type SemanticColor,
  type FontSize,
  type SpacingToken,
  type BorderRadius,
} from '../design-tokens';

export type BadgeVariant = 'solid' | 'outline' | 'subtle';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge - A performant badge/tag component for labels, status, and counts
 *
 * Single element rendering with OnPush strategy and signal-based inputs.
 * Uses design tokens for consistent styling.
 *
 * @example
 * <uilib-badge color="success" variant="solid">Active</uilib-badge>
 * <uilib-badge color="danger" variant="outline" size="sm">3</uilib-badge>
 * <uilib-badge color="info" variant="subtle">New</uilib-badge>
 */
@Component({
  selector: 'uilib-badge',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.display]': '"inline-flex"',
    '[style.align-items]': '"center"',
    '[style.justify-content]': '"center"',
    '[style.font-size]': '_fontSize()',
    '[style.font-weight]': '"500"',
    '[style.line-height]': '"1"',
    '[style.padding]': '_padding()',
    '[style.border-radius]': '_borderRadius()',
    '[style.white-space]': '"nowrap"',
    '[style.background-color]': '_backgroundColor()',
    '[style.color]': '_textColor()',
    '[style.border]': '_border()',
    '[style.min-width]': '_minWidth()',
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

  /** Computed font size based on size */
  protected _fontSize = computed(() => {
    const sizeMap: Record<BadgeSize, keyof typeof FONT_SIZES> = {
      sm: 'xs',
      md: 'sm',
      lg: 'base',
    };
    return FONT_SIZES[sizeMap[this.size()]];
  });

  /** Computed padding based on size and dot mode */
  protected _padding = computed(() => {
    if (this.dot()) {
      const dotSizes = { sm: '0.25rem', md: '0.375rem', lg: '0.5rem' };
      return dotSizes[this.size()];
    }

    const paddingMap: Record<BadgeSize, string> = {
      sm: `${SPACING_TOKENS[1]} ${SPACING_TOKENS[2]}`,  // 4px 8px
      md: `${SPACING_TOKENS[1]} ${SPACING_TOKENS[3]}`,  // 4px 12px
      lg: `${SPACING_TOKENS[2]} ${SPACING_TOKENS[4]}`,  // 8px 16px
    };
    return paddingMap[this.size()];
  });

  /** Computed border radius */
  protected _borderRadius = computed(() => {
    if (this.pill() || this.dot()) {
      return BORDER_RADIUS.full;
    }
    const radiusMap: Record<BadgeSize, keyof typeof BORDER_RADIUS> = {
      sm: 'sm',
      md: 'base',
      lg: 'md',
    };
    return BORDER_RADIUS[radiusMap[this.size()]];
  });

  /** Computed background color based on variant and color */
  protected _backgroundColor = computed(() => {
    const variant = this.variant();
    const color = this.color();

    if (variant === 'outline') {
      return 'transparent';
    }

    const colorMap: Record<BadgeColor, string> = {
      primary: variant === 'solid' ? SEMANTIC_COLORS.primary : SEMANTIC_COLORS['primary-light'] + '20',
      secondary: variant === 'solid' ? SEMANTIC_COLORS.secondary : SEMANTIC_COLORS['secondary-light'] + '20',
      success: variant === 'solid' ? SEMANTIC_COLORS.success : SEMANTIC_COLORS['success-light'] + '20',
      danger: variant === 'solid' ? SEMANTIC_COLORS.danger : SEMANTIC_COLORS['danger-light'] + '20',
      warning: variant === 'solid' ? SEMANTIC_COLORS.warning : SEMANTIC_COLORS['warning-light'] + '20',
      info: variant === 'solid' ? SEMANTIC_COLORS.info : SEMANTIC_COLORS['info-light'] + '20',
      neutral: variant === 'solid' ? SEMANTIC_COLORS.secondary : SEMANTIC_COLORS['background-alt'],
    };

    return colorMap[color];
  });

  /** Computed text color based on variant and color */
  protected _textColor = computed(() => {
    const variant = this.variant();
    const color = this.color();

    if (variant === 'solid') {
      return '#ffffff';
    }

    const colorMap: Record<BadgeColor, string> = {
      primary: SEMANTIC_COLORS.primary,
      secondary: SEMANTIC_COLORS.secondary,
      success: SEMANTIC_COLORS.success,
      danger: SEMANTIC_COLORS.danger,
      warning: SEMANTIC_COLORS.warning,
      info: SEMANTIC_COLORS.info,
      neutral: SEMANTIC_COLORS.text,
    };

    return colorMap[color];
  });

  /** Computed border based on variant */
  protected _border = computed(() => {
    if (this.variant() === 'outline') {
      return `1px solid ${this._textColor()}`;
    }
    return 'none';
  });

  /** Computed min-width for dot mode */
  protected _minWidth = computed(() => {
    if (this.dot()) {
      const dotSizes = { sm: '0.5rem', md: '0.75rem', lg: '1rem' };
      return dotSizes[this.size()];
    }
    return 'auto';
  });
}
