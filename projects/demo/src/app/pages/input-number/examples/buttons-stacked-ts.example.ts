import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './buttons-stacked-ts.example.html',
})
export class MyComponent {
  stackedAmount: number | null = 1200;
}
