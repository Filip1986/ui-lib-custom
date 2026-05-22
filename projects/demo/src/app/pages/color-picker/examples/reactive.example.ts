import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ColorPicker, Button],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    color: new FormControl<string | null>('0ea5e9', { validators: [Validators.required] }),
  });

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}
