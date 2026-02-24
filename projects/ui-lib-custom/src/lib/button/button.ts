import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import { IconSize } from 'ui-lib-custom/icon';
import { SemanticIcon } from 'ui-lib-custom/icon';
import { Badge, BadgeColor } from 'ui-lib-custom/badge';
import { ThemeConfigService } from 'ui-lib-custom/theme';

export type ButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type ButtonAppearance = 'solid' | 'outline' | 'ghost';
export type ButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'warning'
  | 'help'
  | 'danger'
  | 'contrast';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
export type ButtonColor = ButtonSeverity;
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'left' | 'right' | 'top' | 'bottom';
export type BadgeSeverity = ButtonSeverity | 'neutral';

@Component({
  selector: 'ui-lib-button',
  standalone: true,
  imports: [CommonModule, Icon, Badge],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  private readonly themeConfig = inject(ThemeConfigService);

  variant = input<ButtonVariant | null>(null);
  appearance = input<ButtonAppearance>('solid');
  size = input<ButtonSize>('md');
  color = input<ButtonColor>('primary');
  severity = input<ButtonSeverity | null>(null);
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  iconPosition = input<IconPosition>('left');
  shadow = input<string | null>(null);
  icon = input<SemanticIcon | string | null>(null);
  iconOnly = input<boolean | null>(null);
  /** @deprecated Use iconOnly instead. */
  iconOnlyLegacy = input<boolean>(false, { alias: 'iconOnlyInput' });
  raised = input<boolean>(false);
  rounded = input<boolean>(false);
  text = input<boolean>(false);
  outlined = input<boolean>(false);
  link = input<boolean>(false);
  contrast = input<boolean>(false);
  badge = input<string | number | null>(null);
  badgeColor = input<BadgeSeverity>('danger');
  badgeSeverity = input<BadgeSeverity | null>(null);
  badgeClass = input<string | null>(null);
  loadingIcon = input<SemanticIcon | string>('spinner');
  role = input<string | null>(null);
  tabIndex = input<number | null>(null);
  ariaPressed = input<boolean | null>(null);
  ariaChecked = input<boolean | null>(null);

  private readonly normalizedSize = computed<'small' | 'medium' | 'large'>(
    (): 'small' | 'medium' | 'large' => {
      const size: ButtonSize = this.size();
      const map: Record<ButtonSize, 'small' | 'medium' | 'large'> = {
        sm: 'small',
        md: 'medium',
        lg: 'large',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      return map[size] ?? 'medium';
    }
  );

  readonly effectiveVariant = computed<ButtonVariant>(
    () => this.variant() ?? this.themeConfig.variant()
  );
  readonly iconOnlyComputed = computed<boolean>(() => this.iconOnly() ?? this.iconOnlyLegacy());
  iconSize = computed<IconSize>(() => {
    const sizeMap: Record<'small' | 'medium' | 'large', IconSize> = {
      small: 'sm',
      medium: 'md',
      large: 'lg',
    };
    return sizeMap[this.normalizedSize()];
  });

  effectiveSeverity = computed<ButtonSeverity>(() => {
    const severity: ButtonSeverity = this.contrast()
      ? 'contrast'
      : (this.severity() ?? this.color());
    return severity === 'warn' ? 'warning' : severity;
  });

  effectiveAppearance = computed<ButtonAppearance>(() => {
    if (this.text()) {
      return 'ghost';
    }

    if (this.outlined()) {
      return 'outline';
    }

    return this.appearance();
  });

  hasBadge = computed<boolean>(() => this.badge() !== null && this.badge() !== undefined);

  normalizeBadgeSeverity = computed<BadgeSeverity>(() => {
    const inputSeverity: BadgeSeverity = this.badgeSeverity() ?? this.badgeColor();
    const normalized: BadgeSeverity = inputSeverity === 'warn' ? 'warning' : inputSeverity;
    return normalized;
  });

  badgeColorResolved = computed<BadgeColor>(() => {
    const severity: BadgeSeverity = this.normalizeBadgeSeverity();
    const allowed: BadgeColor[] = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'neutral',
    ];

    if ((allowed as string[]).includes(severity)) {
      return severity as BadgeColor;
    }

    if (severity === 'help') {
      return 'info';
    }

    if (severity === 'contrast') {
      return 'neutral';
    }

    return 'neutral';
  });

  buttonClasses = computed<string>(() => {
    const classes: string[] = [
      'btn',
      `btn-${this.effectiveVariant()}`,
      `btn-${this.normalizedSize()}`,
      `btn-${this.effectiveSeverity()}`,
      `btn-appearance-${this.effectiveAppearance()}`,
      `btn-icon-${this.iconPosition()}`,
    ];

    if (this.fullWidth()) {
      classes.push('btn-full-width');
    }

    if (this.disabled() || this.loading()) {
      classes.push('btn-disabled');
    }

    if (this.loading()) {
      classes.push('btn-loading');
    }

    if (this.icon()) {
      classes.push('btn-has-icon');
    }

    if (this.iconOnlyComputed()) {
      classes.push('btn-icon-only');
    }

    if (this.raised()) {
      classes.push('btn-raised');
    }

    if (this.rounded()) {
      classes.push('btn-rounded');
    }

    if (this.text()) {
      classes.push('btn-text');
    }

    if (this.outlined()) {
      classes.push('btn-outlined');
    }

    if (this.link()) {
      classes.push('btn-link');
    }

    if (this.hasBadge()) {
      classes.push('btn-has-badge');
    }

    if (this.iconPosition() === 'top' || this.iconPosition() === 'bottom') {
      classes.push('btn-vertical');
    }

    return classes.join(' ');
  });

  ariaDisabled = computed<boolean | null>(() => (this.disabled() || this.loading() ? true : null));
  isDisabled = computed<boolean>(() => this.disabled() || this.loading());
}
