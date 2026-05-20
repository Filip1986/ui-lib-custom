import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { OrderListComponent, OrderListItemDirective } from 'ui-lib-custom/order-list';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly products: WritableSignal<Product[]> = signal([
    { id: 1, name: 'Wireless Headphones', price: 79.99 },
    { id: 2, name: 'Mechanical Keyboard', price: 129.99 },
  ]);
  public readonly selection: WritableSignal<Product[]> = signal([]);

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
}
