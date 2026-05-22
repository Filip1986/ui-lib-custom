import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './prefix-suffix-ts.example.html',
})
export class MyComponent {
  distanceMiles: number | null = 120;
  completionPercent: number | null = 88;
  expiresInDays: number | null = 45;
  temperature: number | null = 22;
}
