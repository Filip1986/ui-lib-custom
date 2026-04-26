import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { Stack } from 'ui-lib-custom/layout';
import {
  OrderListComponent,
  OrderListItemDirective,
  OrderListHeaderDirective,
  OrderListEmptyDirective,
} from 'ui-lib-custom/order-list';
import type {
  OrderListReorderEvent,
  OrderListSelectionChangeEvent,
} from 'ui-lib-custom/order-list';

// ---------------------------------------------------------------------------
// Demo data model
// ---------------------------------------------------------------------------

interface DemoProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
}

const DEMO_PRODUCTS: DemoProduct[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Audio', price: 79.99, rating: 4 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Input', price: 129.99, rating: 5 },
  { id: 3, name: 'USB-C Hub', category: 'Connectivity', price: 49.99, rating: 3 },
  { id: 4, name: '4K Webcam', category: 'Video', price: 99.99, rating: 4 },
  { id: 5, name: 'Desk Lamp', category: 'Lighting', price: 34.99, rating: 3 },
  { id: 6, name: 'Mouse Pad XL', category: 'Input', price: 19.99, rating: 4 },
  { id: 7, name: 'Monitor Stand', category: 'Ergonomics', price: 59.99, rating: 5 },
  { id: 8, name: 'Cable Organizer', category: 'Accessories', price: 14.99, rating: 3 },
];

// ---------------------------------------------------------------------------
// Demo code snippets
// ---------------------------------------------------------------------------

const SNIPPETS: Record<string, string> = {
  basic: `<ui-lib-order-list [value]="products" [(selection)]="selection">
  <ng-template uiOrderListItem let-item>
    <div class="demo-ol-row">
      <span class="demo-ol-name">{{ item.name }}</span>
      <span class="demo-ol-price">{{ formatPrice(item.price) }}</span>
    </div>
  </ng-template>
</ui-lib-order-list>`,

  filter: `<ui-lib-order-list
  [value]="filterProducts"
  filterBy="name"
  filterPlaceholder="Search products…"
>
  <ng-template uiOrderListItem let-item>
    <span>{{ item.name }}</span>
  </ng-template>
</ui-lib-order-list>`,

  template: `<ui-lib-order-list [value]="templateProducts" [(selection)]="templateSelection">
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
</ui-lib-order-list>`,

  dragDrop: `<ui-lib-order-list
  [value]="dragProducts"
  [dragDrop]="true"
  (reordered)="onReorder($event)"
>
  <ng-template uiOrderListItem let-item>
    <span>{{ item.name }}</span>
  </ng-template>
</ui-lib-order-list>`,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Demo page for the OrderList component.
 * Sections: Basic, Filter, Custom Templates, Drag & Drop, Accessibility, API Reference.
 */
@Component({
  selector: 'app-order-list-demo',
  standalone: true,
  imports: [
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    Stack,
    OrderListComponent,
    OrderListItemDirective,
    OrderListHeaderDirective,
    OrderListEmptyDirective,
  ],
  templateUrl: './order-list-demo.component.html',
  styleUrl: './order-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListDemoComponent {
  // -------------------------------------------------------------------------
  // Sections
  // -------------------------------------------------------------------------

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'filter', label: 'Filter' },
    { id: 'templates', label: 'Custom Templates' },
    { id: 'drag-drop', label: 'Drag & Drop' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'api', label: 'API Reference' },
  ];

  // -------------------------------------------------------------------------
  // Basic section
  // -------------------------------------------------------------------------

  public readonly products: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS,
  ]);
  public readonly selection: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([]);

  // -------------------------------------------------------------------------
  // Filter section
  // -------------------------------------------------------------------------

  public readonly filterProducts: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS,
  ]);

  // -------------------------------------------------------------------------
  // Template section
  // -------------------------------------------------------------------------

  public readonly templateProducts: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS,
  ]);
  public readonly templateSelection: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([]);

  // -------------------------------------------------------------------------
  // Drag & drop section
  // -------------------------------------------------------------------------

  public readonly dragProducts: WritableSignal<DemoProduct[]> = signal<DemoProduct[]>([
    ...DEMO_PRODUCTS.slice(0, 5),
  ]);
  public lastReorderEvent: WritableSignal<string> = signal<string>('—');

  public onReorder(event: OrderListReorderEvent): void {
    const items: DemoProduct[] = event.items as DemoProduct[];
    this.lastReorderEvent.set(
      `Moved from position ${event.previousIndex + 1} → ${event.currentIndex + 1} (${items.length} items)`
    );
  }

  public onSelectionChanged(event: OrderListSelectionChangeEvent): void {
    this.selection.set(event.value as DemoProduct[]);
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  public starsLabel(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  public snippet(key: string): string {
    return SNIPPETS[key] ?? '';
  }
}
