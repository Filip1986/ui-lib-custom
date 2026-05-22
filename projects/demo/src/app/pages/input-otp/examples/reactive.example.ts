import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputOtpComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    code: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit(): void {
    this.reactiveForm.markAllAsTouched();
  }
}
