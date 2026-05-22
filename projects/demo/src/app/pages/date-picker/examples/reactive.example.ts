import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [DatePickerComponent, Button, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    appointment: new FormControl<Date | null>(null, { validators: [Validators.required] }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}
