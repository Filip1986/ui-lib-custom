import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type ButtonAppearance = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'start' | 'end';

@Component({
  selector: 'ui-lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  variant = input<ButtonVariant>('material');
  appearance = input<ButtonAppearance>('solid');
  size = input<ButtonSize>('medium');
  color = input<ButtonColor>('primary');
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  iconPosition = input<IconPosition>('start');
  shadow = input<string | null>(null);

  buttonClasses = computed(() => {
    const classes = [
      'btn',
      `btn-${this.variant()}`,
      `btn-${this.size()}`,
      `btn-${this.color()}`,
      `btn-appearance-${this.appearance()}`,
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

    return classes.join(' ');
  });

  ariaDisabled = computed(() => (this.disabled() || this.loading() ? true : null));
  isDisabled = computed(() => this.disabled() || this.loading());
}
