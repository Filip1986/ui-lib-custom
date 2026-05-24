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
import { NgClass } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import type { IconSize, SemanticIcon } from 'ui-lib-custom/icon';
import { Badge } from 'ui-lib-custom/badge';
import type { BadgeColor } from 'ui-lib-custom/badge';
import { ThemeConfigService } from 'ui-lib-custom/theme';

export type ButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type ButtonAppearance =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'tactile'
  | 'link'
  | 'soft'
  | 'glass'
  | 'glass-shadow'
  | 'gradient'
  | 'elevated'
  | 'neon'
  | 'flat'
  | 'framed';
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
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'left' | 'right' | 'top' | 'bottom';
export type BadgeSeverity = ButtonSeverity | 'neutral';

/**
 * Action button component with 12 appearances, 9 severities, and orthogonal pill / raised modifiers.
 */
@Component({
  selector: 'ui-lib-button',
  standalone: true,
  imports: [NgClass, Icon, Badge],
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
  public readonly iconOnly: InputSignal<boolean> = input<boolean>(false);
  public readonly raised: InputSignal<boolean> = input<boolean>(false);
  public readonly pill: InputSignal<boolean> = input<boolean>(false);
  public readonly badge: InputSignal<string | number | null | undefined> = input<
    string | number | null | undefined
  >(null);
  public readonly badgeSeverity: InputSignal<BadgeSeverity> = input<BadgeSeverity>('danger');
  public readonly badgeClass: InputSignal<string | null> = input<string | null>(null);
  public readonly loadingIcon: InputSignal<SemanticIcon | string> = input<SemanticIcon | string>(
    'spinner',
  );
  public readonly role: InputSignal<string | null> = input<string | null>(null);
  public readonly tabIndex: InputSignal<number | null> = input<number | null>(null);
  public readonly softDisabled: InputSignal<boolean> = input<boolean>(false);
  public readonly loadingLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaPressed: InputSignal<boolean | null> = input<boolean | null>(null);
  public readonly ariaChecked: InputSignal<boolean | null> = input<boolean | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  public readonly focused: WritableSignal<boolean> = signal<boolean>(false);

  @ViewChild('btnEl') private readonly buttonEl?: ElementRef<HTMLButtonElement>;

  private readonly normalizedSize: Signal<'small' | 'medium' | 'large'> = computed<
    'small' | 'medium' | 'large'
  >((): 'small' | 'medium' | 'large' => {
    const sizeMap: Record<ButtonSize, 'small' | 'medium' | 'large'> = {
      sm: 'small',
      md: 'medium',
      lg: 'large',
    };
    return sizeMap[this.size()];
  });

  public readonly effectiveVariant: Signal<ButtonVariant> = computed<ButtonVariant>(
    (): ButtonVariant => this.variant() ?? this.themeConfig.variant(),
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
      const severity: ButtonSeverity = this.severity() ?? 'primary';
      return severity === 'warn' ? 'warning' : severity;
    },
  );

  public readonly hasBadge: Signal<boolean> = computed<boolean>((): boolean => {
    const badgeValue: string | number | null | undefined = this.badge();
    return badgeValue !== null && badgeValue !== undefined;
  });

  public readonly badgeColorResolved: Signal<BadgeColor> = computed<BadgeColor>((): BadgeColor => {
    const raw: BadgeSeverity = this.badgeSeverity();
    const severity: BadgeSeverity = raw === 'warn' ? 'warning' : raw;
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
    return 'neutral';
  });

  public readonly buttonClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-button',
      `ui-lib-button--${this.effectiveVariant()}`,
      `ui-lib-button--size-${this.normalizedSize()}`,
      `ui-lib-button--${this.effectiveSeverity()}`,
      `ui-lib-button--appearance-${this.appearance()}`,
      `ui-lib-button--icon-${this.iconPosition()}`,
    ];

    if (this.fullWidth()) classes.push('ui-lib-button--full-width');
    if (this.disabled() || this.loading()) classes.push('ui-lib-button--disabled');
    if (this.softDisabled() && !this.disabled() && !this.loading())
      classes.push('ui-lib-button--soft-disabled');
    if (this.loading()) classes.push('ui-lib-button--loading');
    if (this.icon()) classes.push('ui-lib-button--has-icon');
    if (this.iconOnly()) classes.push('ui-lib-button--icon-only');
    if (this.raised()) classes.push('ui-lib-button--raised');
    if (this.pill()) classes.push('ui-lib-button--pill');
    if (this.hasBadge()) classes.push('ui-lib-button--has-badge');
    if (this.iconPosition() === 'top' || this.iconPosition() === 'bottom') {
      classes.push('ui-lib-button--vertical');
    }
    if (this.focused()) classes.push('ui-lib-button--focused');

    return classes.join(' ');
  });

  public readonly ariaDisabled: Signal<boolean | null> = computed<boolean | null>(
    (): boolean | null => (this.disabled() || this.loading() || this.softDisabled() ? true : null),
  );

  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.loading()) return this.loadingLabel() ?? this.ariaLabel() ?? 'Loading';
      if (this.iconOnly()) return this.ariaLabel() ?? 'Button';
      return this.ariaLabel();
    },
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.loading(),
  );

  public setFocused(isFocused: boolean): void {
    this.focused.set(isFocused);
  }

  public onButtonClick(event: MouseEvent): void {
    if (this.softDisabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
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
