import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibCascadeSelect],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  public cityControl(): FormControl<string | null> {
    return this.reactiveForm.controls['city'] as FormControl<string | null>;
  }

  public countries = [
    /* your country data */
  ];
}
