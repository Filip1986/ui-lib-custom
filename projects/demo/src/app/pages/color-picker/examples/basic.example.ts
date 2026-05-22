import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicHex: string = '6466f1';
}
