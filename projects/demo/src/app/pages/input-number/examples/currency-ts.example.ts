import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './currency-ts.example.html',
})
export class MyComponent {
  currencyValues = { usd: 1499.5, eur: 1499.5, inr: 1499.5, jpy: 1499 };
}
