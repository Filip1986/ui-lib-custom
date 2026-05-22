import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibSelect } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelComponent, UiLibSelect],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
    bio: new FormControl('', { nonNullable: true }),
  });
}
