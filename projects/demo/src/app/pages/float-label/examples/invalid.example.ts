import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelComponent],
  templateUrl: './invalid.example.html',
})
export class MyComponent {
  public readonly invalidForm = new FormGroup({
    over: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    in: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    on: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}
