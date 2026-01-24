import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UiLibInput, InputVariant, InputType } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule, UiLibInput, Button],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  variant = signal<InputVariant>('material');
  inputType = signal<InputType>('text');
  value = signal('');
  password = signal('');
  error = signal('');
  showCounter = signal(true);
  showClear = signal(true);
  showToggle = signal(true);
  required = signal(true);

  variants: InputVariant[] = ['material', 'bootstrap', 'minimal'];
  types: InputType[] = ['text', 'email', 'password', 'number', 'search', 'tel', 'url'];

  onSubmit(form: NgForm) {
    if (!this.value().trim()) {
      this.error.set('Required field');
      return;
    }
    this.error.set('');
    alert(`Submitted value: ${this.value()}`);
    form.resetForm();
    this.value.set('');
  }

  setVariant(v: InputVariant) {
    this.variant.set(v);
  }

  setType(t: InputType) {
    this.inputType.set(t);
  }
}
