import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewChild,
  ViewEncapsulation,
  type AfterViewChecked,
  type ElementRef,
  type InputSignal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import type { IconSize, SemanticIcon } from 'ui-lib-custom/icon';
import { Badge } from 'ui-lib-custom/badge';
import type { BadgeColor } from 'ui-lib-custom/badge';
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
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  public readonly variant: InputSignal<ButtonVariant | null> = input<ButtonVariant | null>(null);
  public readonly appearance: InputSignal<ButtonAppearance> = input<ButtonAppearance>('solid');
  public readonly size: InputSignal<ButtonSize> = input<ButtonSize>('md');
  public readonly color: InputSignal<ButtonColor> = input<ButtonColor>('primary');
  public readonly severity: InputSignal<ButtonSeverity | null> = input<ButtonSeverity | null>(null);
  public readonly type: InputSignal<ButtonType> = input<ButtonType>('button');
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly fullWidth: InputSignal<boolean> = input<boolean>(false);
  public readonly iconPosition: InputSignal<IconPosition> = input<IconPosition>('left');
  public readonly shadow: InputSignal<string | null> = input<string | null>(null);
  public readonly icon: InputSignal<SemanticIcon | string | null> = input<
    SemanticIcon | string | null
  >(null);
  public readonly iconOnly: InputSignal<boolean | null> = input<boolean | null>(null);
  /** @deprecated Use iconOnly instead. */
  public readonly iconOnlyInput: InputSignal<boolean> = input<boolean>(false);
  public readonly raised: InputSignal<boolean> = input<boolean>(false);
  public readonly rounded: InputSignal<boolean> = input<boolean>(false);
  public readonly text: InputSignal<boolean> = input<boolean>(false);
  public readonly outlined: InputSignal<boolean> = input<boolean>(false);
  public readonly link: InputSignal<boolean> = input<boolean>(false);
  public readonly contrast: InputSignal<boolean> = input<boolean>(false);
  public readonly badge: InputSignal<string | number | null | undefined> = input<
    string | number | null | undefined
  >(null);
  public readonly badgeColor: InputSignal<BadgeSeverity> = input<BadgeSeverity>('danger');
  public readonly badgeSeverity: InputSignal<BadgeSeverity | null> = input<BadgeSeverity | null>(
    null
  );
  public readonly badgeClass: InputSignal<string | null> = input<string | null>(null);
  public readonly loadingIcon: InputSignal<SemanticIcon | string> = input<SemanticIcon | string>(
    'spinner'
  );
  public readonly role: InputSignal<string | null> = input<string | null>(null);
  public readonly tabIndex: InputSignal<number | null> = input<number | null>(null);
  public readonly ariaPressed: InputSignal<boolean | null> = input<boolean | null>(null);
  public readonly ariaChecked: InputSignal<boolean | null> = input<boolean | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  public readonly focused: WritableSignal<boolean> = signal<boolean>(false);

  @ViewChild('btnEl') private readonly buttonEl?: ElementRef<HTMLButtonElement>;

  private readonly normalizedSize: Signal<'small' | 'medium' | 'large'> = computed<
    'small' | 'medium' | 'large'
  >((): 'small' | 'medium' | 'large' => {
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
  });

  public readonly effectiveVariant: Signal<ButtonVariant> = computed<ButtonVariant>(
    (): ButtonVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly iconOnlyComputed: Signal<boolean> = computed<boolean>(
    (): boolean => this.iconOnly() ?? this.iconOnlyInput()
  );
  public readonly iconSize: Signal<IconSize> = computed<IconSize>((): IconSize => {
    const sizeMap: Record<'small' | 'medium' | 'large', IconSize> = {
      small: 'sm',
      medium: 'md',
      large: 'lg',
    };
    return sizeMap[this.normalizedSize()];
  });

  public readonly effectiveSeverity: Signal<ButtonSeverity> = computed<ButtonSeverity>(
    (): ButtonSeverity => {
      const severity: ButtonSeverity = this.contrast()
        ? 'contrast'
        : (this.severity() ?? this.color());
      return severity === 'warn' ? 'warning' : severity;
    }
  );

  public readonly effectiveAppearance: Signal<ButtonAppearance> = computed<ButtonAppearance>(
    (): ButtonAppearance => {
      if (this.text()) {
        return 'ghost';
      }

      if (this.outlined()) {
        return 'outline';
      }

      return this.appearance();
    }
  );

  public readonly hasBadge: Signal<boolean> = computed<boolean>((): boolean => {
    const badgeValue: string | number | null | undefined = this.badge();
    return badgeValue !== null && badgeValue !== undefined;
  });

  public readonly normalizeBadgeSeverity: Signal<BadgeSeverity> = computed<BadgeSeverity>(
    (): BadgeSeverity => {
      const inputSeverity: BadgeSeverity = this.badgeSeverity() ?? this.badgeColor();
      return inputSeverity === 'warn' ? 'warning' : inputSeverity;
    }
  );

  public readonly badgeColorResolved: Signal<BadgeColor> = computed<BadgeColor>((): BadgeColor => {
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

  public readonly buttonClasses: Signal<string> = computed<string>((): string => {
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

  public readonly ariaDisabled: Signal<boolean | null> = computed<boolean | null>(
    (): boolean | null => (this.disabled() || this.loading() ? true : null)
  );
  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.loading()) {
        return this.ariaLabel() ?? 'Loading';
      }
      if (this.iconOnlyComputed()) {
        return this.ariaLabel() ?? 'Button';
      }
      return this.ariaLabel();
    }
  );
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.loading()
  );

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
