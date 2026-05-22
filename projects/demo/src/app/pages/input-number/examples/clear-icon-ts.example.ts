import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './clear-icon-ts.example.html',
})
export class MyComponent {
  clearableValue: number | null = 99;
}
