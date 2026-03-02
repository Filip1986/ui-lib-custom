import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  inject,
  ViewEncapsulation,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  signal,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class Button implements AfterViewChecked {
  private readonly themeConfig = inject(ThemeConfigService);

  public readonly variant = input<ButtonVariant | null>(null);
  public readonly appearance = input<ButtonAppearance>('solid');
  public readonly size = input<ButtonSize>('md');
  public readonly color = input<ButtonColor>('primary');
  public readonly severity = input<ButtonSeverity | null>(null);
  public readonly type = input<ButtonType>('button');
  public readonly disabled = input<boolean>(false);
  public readonly loading = input<boolean>(false);
  public readonly fullWidth = input<boolean>(false);
  public readonly iconPosition = input<IconPosition>('left');
  public readonly shadow = input<string | null>(null);
  public readonly icon = input<SemanticIcon | string | null>(null);
  public readonly iconOnly = input<boolean | null>(null);
  /** @deprecated Use iconOnly instead. */
  public readonly iconOnlyInput = input<boolean>(false);
  public readonly raised = input<boolean>(false);
  public readonly rounded = input<boolean>(false);
  public readonly text = input<boolean>(false);
  public readonly outlined = input<boolean>(false);
  public readonly link = input<boolean>(false);
  public readonly contrast = input<boolean>(false);
  public readonly badge = input<string | number | null>(null);
  public readonly badgeColor = input<BadgeSeverity>('danger');
  public readonly badgeSeverity = input<BadgeSeverity | null>(null);
  public readonly badgeClass = input<string | null>(null);
  public readonly loadingIcon = input<SemanticIcon | string>('spinner');
  public readonly role = input<string | null>(null);
  public readonly tabIndex = input<number | null>(null);
  public readonly ariaPressed = input<boolean | null>(null);
  public readonly ariaChecked = input<boolean | null>(null);
  public readonly ariaLabel = input<string | null>(null);

  public readonly focused = signal<boolean>(false);

  @ViewChild('btnEl') private readonly buttonEl?: ElementRef<HTMLButtonElement>;

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
      return map[size];
    }
  );

  public readonly effectiveVariant = computed<ButtonVariant>(
    (): ButtonVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly iconOnlyComputed = computed<boolean>(
    (): boolean => this.iconOnly() ?? this.iconOnlyInput()
  );
  public readonly iconSize = computed<IconSize>((): IconSize => {
    const sizeMap: Record<'small' | 'medium' | 'large', IconSize> = {
      small: 'sm',
      medium: 'md',
      large: 'lg',
    };
    return sizeMap[this.normalizedSize()];
  });

  public readonly effectiveSeverity = computed<ButtonSeverity>((): ButtonSeverity => {
    const severity: ButtonSeverity = this.contrast()
      ? 'contrast'
      : (this.severity() ?? this.color());
    return severity === 'warn' ? 'warning' : severity;
  });

  public readonly effectiveAppearance = computed<ButtonAppearance>((): ButtonAppearance => {
    if (this.text()) {
      return 'ghost';
    }

    if (this.outlined()) {
      return 'outline';
    }

    return this.appearance();
  });

  public readonly hasBadge = computed<boolean>((): boolean => this.badge() !== null);

  public readonly normalizeBadgeSeverity = computed<BadgeSeverity>((): BadgeSeverity => {
    const inputSeverity: BadgeSeverity = this.badgeSeverity() ?? this.badgeColor();
    const normalized: BadgeSeverity = inputSeverity === 'warn' ? 'warning' : inputSeverity;
    return normalized;
  });

  public readonly badgeColorResolved = computed<BadgeColor>((): BadgeColor => {
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

  public readonly buttonClasses = computed<string>((): string => {
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

    if (this.focused()) {
      classes.push('btn-focused');
    }

    return classes.join(' ');
  });

  public readonly ariaDisabled = computed<boolean | null>((): boolean | null =>
    this.disabled() || this.loading() ? true : null
  );
  public readonly ariaLabelResolved = computed<string | null>((): string | null => {
    if (this.loading()) {
      return this.ariaLabel() ?? 'Loading';
    }
    if (this.iconOnlyComputed()) {
      return this.ariaLabel() ?? 'Button';
    }
    return this.ariaLabel();
  });
  public readonly isDisabled = computed<boolean>((): boolean => this.disabled() || this.loading());

  public setFocused(isFocused: boolean): void {
    this.focused.set(isFocused);
  }

  public ngAfterViewChecked(): void {
    this.syncFocusState();
  }

  private syncFocusState(): void {
    const element: HTMLButtonElement | undefined = this.buttonEl?.nativeElement;
    const isFocused: boolean = Boolean(element) && document.activeElement === element;
    if (isFocused !== this.focused()) {
      this.focused.set(isFocused);
    }
  }
}
