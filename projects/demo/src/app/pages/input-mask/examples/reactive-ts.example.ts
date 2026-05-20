import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputMaskComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive-ts.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}
