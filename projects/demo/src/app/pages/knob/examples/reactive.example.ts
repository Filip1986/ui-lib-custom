import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, KnobComponent],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    brightness: new FormControl<number>(70),
    contrast: new FormControl<number>(50),
  });
}
