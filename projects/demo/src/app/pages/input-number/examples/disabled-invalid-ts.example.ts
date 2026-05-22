import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './disabled-invalid-ts.example.html',
})
export class MyComponent {
  disabledValue: number | null = 50;
  invalidValue: number | null = null;
}
