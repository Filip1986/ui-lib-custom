import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UiLibInput, InputVariant, InputType } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule, UiLibInput, Button, DocPageLayoutComponent, DocDemoViewportComponent],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
  ];

  variant = signal<InputVariant>('material');
  inputType = signal<InputType>('text');
  value = signal('');
  password = signal('');
  error = signal('');
  showCounter = signal(true);
  showClear = signal(true);
  showToggle = signal(true);
  required = signal(true);
  label = signal('Email');
  placeholder = signal('you@example.com');

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
    this.password.set('');
  }

  setVariant(v: InputVariant) {
    this.variant.set(v);
  }

  setType(t: InputType) {
    this.inputType.set(t);
  }
}
