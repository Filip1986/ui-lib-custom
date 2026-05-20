import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FloatLabelComponent, FormsModule],
  templateUrl: './float-label-ts.example.html',
})
export class MyComponent {
  floatValues = { over: 100, in: 200, on: 300 };
}
