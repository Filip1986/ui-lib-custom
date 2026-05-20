import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';
import type { HsbColor, RgbColor } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './formats.example.html',
})
export class MyComponent {
  public hexValue: string = '6466f1';
  public rgbValue: RgbColor = { r: 100, g: 102, b: 241 };
  public hsbValue: HsbColor = { h: 239, s: 59, b: 95 };
}
