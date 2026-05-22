import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public readonly variantValues = {
    material: 'a855f7',
    bootstrap: 'f97316',
    minimal: '14b8a6',
  };
}
