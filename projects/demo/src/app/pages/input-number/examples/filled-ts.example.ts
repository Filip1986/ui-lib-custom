import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './filled-ts.example.html',
})
export class MyComponent {
  filledValue: number | null = 64;
}
