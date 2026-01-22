import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'uilib-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() variant: ButtonVariant = 'material';
  @Input() size: ButtonSize = 'medium';
  @Input() color: ButtonColor = 'primary';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;

  get buttonClasses(): string {
    return `btn btn-${this.variant} btn-${this.size} btn-${this.color} ${this.fullWidth ? 'btn-full-width' : ''} ${this.disabled ? 'btn-disabled' : ''}`;
  }
}
