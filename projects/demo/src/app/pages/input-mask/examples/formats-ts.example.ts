import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './formats-ts.example.html',
})
export class MyComponent {
  formatValues = { phone: null, date: null, ssn: null, serial: null };
}
