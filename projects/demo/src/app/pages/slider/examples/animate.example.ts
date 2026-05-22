import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './animate.example.html',
})
export class MyComponent {
  value: number = 30;
}
