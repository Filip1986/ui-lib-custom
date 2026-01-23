import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'uilib-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  variant = input<ButtonVariant>('material');
  size = input<ButtonSize>('medium');
  color = input<ButtonColor>('primary');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);

  buttonClasses = computed(() =>
    `btn btn-${this.variant()} btn-${this.size()} btn-${this.color()} ${this.fullWidth() ? 'btn-full-width' : ''} ${this.disabled() ? 'btn-disabled' : ''}`
  );
}
