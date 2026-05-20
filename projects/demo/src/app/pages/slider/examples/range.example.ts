import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './range.example.html',
})
export class MyComponent {
  rangeValue: [number, number] = [20, 75];
}
