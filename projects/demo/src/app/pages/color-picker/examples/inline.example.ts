import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './inline.example.html',
})
export class MyComponent {
  public inlineHex: string = '3b82f6';
}
