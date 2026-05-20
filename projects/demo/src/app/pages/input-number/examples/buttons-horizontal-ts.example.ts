import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './buttons-horizontal-ts.example.html',
})
export class MyComponent {
  horizontalAmount: number | null = 800;
}
