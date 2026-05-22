import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import {
  OrderListComponent,
  OrderListItemDirective,
  OrderListHeaderDirective,
  OrderListEmptyDirective,
} from 'ui-lib-custom/order-list';

interface Product { id: number; name: string; category: string; rating: number; price: number; }

@Component({
  standalone: true,
  imports: [
    OrderListComponent,
    OrderListItemDirective,
    OrderListHeaderDirective,
    OrderListEmptyDirective,
  ],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public readonly templateProducts: WritableSignal<Product[]> = signal([
    { id: 1, name: 'Wireless Headphones', category: 'Audio', rating: 4, price: 79.99 },
  ]);
  public readonly templateSelection: WritableSignal<Product[]> = signal([]);

  public starsLabel(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
}
