/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-order-list [value]="products" [(selection)]="selection">
  <ng-template uiOrderListItem let-item>
    <div class="demo-ol-row">
      <span class="demo-ol-name">{{ item.name }}</span>
      <span class="demo-ol-price">{{ formatPrice(item.price) }}</span>
    </div>
  </ng-template>
</ui-lib-order-list>`;

export const basicTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import {
  OrderListComponent,
  OrderListItemDirective,
} from 'ui-lib-custom/order-list';

interface Product { id: number; name: string; price: number; }

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
}`;

export const dragDropHtml = `<ui-lib-order-list
  [value]="dragProducts"
  [dragDrop]="true"
  (reordered)="onReorder($event)"
>
  <ng-template uiOrderListItem let-item>
    <span>{{ item.name }}</span>
  </ng-template>
</ui-lib-order-list>`;

export const dragDropTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import {
  OrderListComponent,
  OrderListItemDirective,
} from 'ui-lib-custom/order-list';
import type { OrderListReorderEvent } from 'ui-lib-custom/order-list';

interface Product { id: number; name: string; }

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  templateUrl: './drag-drop.example.html',
})
export class MyComponent {
  public readonly dragProducts: WritableSignal<Product[]> = signal([
    { id: 1, name: 'Wireless Headphones' },
    { id: 2, name: 'Mechanical Keyboard' },
  ]);

  public onReorder(event: OrderListReorderEvent): void {
    console.log('Reordered', event);
  }
}`;

export const filterHtml = `<ui-lib-order-list
  [value]="filterProducts"
  filterBy="name"
  filterPlaceholder="Search products…"
>
  <ng-template uiOrderListItem let-item>
    <span>{{ item.name }}</span>
  </ng-template>
</ui-lib-order-list>`;

export const filterTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import {
  OrderListComponent,
  OrderListItemDirective,
} from 'ui-lib-custom/order-list';

interface Product { id: number; name: string; }

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
}`;

export const templateHtml = `<ui-lib-order-list [value]="templateProducts" [(selection)]="templateSelection">
  <ng-template uiOrderListHeader>
    <span>Products ({{ templateProducts().length }})</span>
  </ng-template>
  <ng-template uiOrderListItem let-item>
    <div class="demo-ol-card-row">
      <span class="demo-ol-category-badge">{{ item.category }}</span>
      <strong class="demo-ol-name">{{ item.name }}</strong>
      <span class="demo-ol-stars">{{ starsLabel(item.rating) }}</span>
      <span class="demo-ol-price">{{ formatPrice(item.price) }}</span>
    </div>
  </ng-template>
  <ng-template uiOrderListEmpty>
    <span>No products match the current filter.</span>
  </ng-template>
</ui-lib-order-list>`;

export const templateTs = `import { Component, signal } from '@angular/core';
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
}`;
