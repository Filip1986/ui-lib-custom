import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Slider],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    volume: new FormControl<number>(60),
    brightness: new FormControl<number>(40),
  });
}
