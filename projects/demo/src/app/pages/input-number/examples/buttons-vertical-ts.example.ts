import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './buttons-vertical-ts.example.html',
})
export class MyComponent {
  verticalAmount: number | null = 10;
}
