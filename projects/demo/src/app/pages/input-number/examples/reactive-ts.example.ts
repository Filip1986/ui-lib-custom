import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputNumberComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive-ts.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(1000)],
    }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}
