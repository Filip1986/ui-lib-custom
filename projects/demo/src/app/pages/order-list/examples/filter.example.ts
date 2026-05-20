import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { OrderListComponent, OrderListItemDirective } from 'ui-lib-custom/order-list';

interface Product {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  templateUrl: './filter.example.html',
})
export class MyComponent {
  public readonly filterProducts: WritableSignal<Product[]> = signal([
    { id: 1, name: 'Wireless Headphones' },
    { id: 2, name: 'Mechanical Keyboard' },
  ]);
}
