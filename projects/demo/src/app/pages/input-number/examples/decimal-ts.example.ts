import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './decimal-ts.example.html',
})
export class MyComponent {
  decimalValue: number | null = 42.5;
}
