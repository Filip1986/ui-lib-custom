import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TableComponent,
  TableColumnComponent,
  TableCaptionDirective,
  TableColumnBodyDirective,
  TableEmptyDirective,
  TableExpansionDirective,
} from 'ui-lib-custom/table';
import type { TableSelectionMode, TableSortEvent, TableVariant } from 'ui-lib-custom/table';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  rating: number;
}

/** Demo component showcasing the TableComponent with all supported variants, sizes, and features. */
@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    TableColumnComponent,
    TableCaptionDirective,
    TableColumnBodyDirective,
    TableEmptyDirective,
    TableExpansionDirective,
  ],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {
  public readonly products: WritableSignal<Product[]> = signal<Product[]>([
    {
      id: 1,
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1299,
      quantity: 12,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 49,
      quantity: 0,
      status: 'OUTOFSTOCK',
      rating: 3,
    },
    {
      id: 3,
      name: 'Standing Desk',
      category: 'Furniture',
      price: 599,
      quantity: 5,
      status: 'LOWSTOCK',
      rating: 5,
    },
    {
      id: 4,
      name: 'Monitor 27"',
      category: 'Electronics',
      price: 449,
      quantity: 20,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 5,
      name: 'Ergonomic Chair',
      category: 'Furniture',
      price: 389,
      quantity: 3,
      status: 'LOWSTOCK',
      rating: 5,
    },
    {
      id: 6,
      name: 'USB-C Hub',
      category: 'Electronics',
      price: 79,
      quantity: 50,
      status: 'INSTOCK',
      rating: 3,
    },
    {
      id: 7,
      name: 'Bookshelf',
      category: 'Furniture',
      price: 229,
      quantity: 8,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 8,
      name: 'Webcam HD',
      category: 'Electronics',
      price: 99,
      quantity: 0,
      status: 'OUTOFSTOCK',
      rating: 3,
    },
    {
      id: 9,
      name: 'Desk Lamp',
      category: 'Lighting',
      price: 59,
      quantity: 30,
      status: 'INSTOCK',
      rating: 4,
    },
    {
      id: 10,
      name: 'Keyboard Mech',
      category: 'Electronics',
      price: 149,
      quantity: 15,
      status: 'INSTOCK',
      rating: 5,
    },
    {
      id: 11,
      name: 'Whiteboard',
      category: 'Office',
      price: 119,
      quantity: 7,
      status: 'INSTOCK',
      rating: 3,
    },
    {
      id: 12,
      name: 'Headphones',
      category: 'Electronics',
      price: 199,
      quantity: 2,
      status: 'LOWSTOCK',
      rating: 5,
    },
  ]);

  // Demo config
  public readonly activeVariant: WritableSignal<TableVariant> = signal<TableVariant>('material');
  public readonly stripedRows: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showGridlines: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rowHover: WritableSignal<boolean> = signal<boolean>(true);
  public readonly paginatorEnabled: WritableSignal<boolean> = signal<boolean>(true);
  public readonly selectionMode: WritableSignal<TableSelectionMode> =
    signal<TableSelectionMode>('checkbox');
  public readonly globalFilterValue: WritableSignal<string> = signal<string>('');
  public readonly selectedProducts: WritableSignal<unknown> = signal<unknown>([]);
  public readonly expandedRowKeys: WritableSignal<Set<unknown>> = signal<Set<unknown>>(new Set());
  public readonly lastSortEvent: WritableSignal<string> = signal<string>('—');

  public readonly variants: TableVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly selectionModes: Array<{ label: string; value: TableSelectionMode }> = [
    { label: 'None', value: null },
    { label: 'Single', value: 'single' },
    { label: 'Multiple', value: 'multiple' },
    { label: 'Checkbox', value: 'checkbox' },
  ];

  public onSortChange(event: TableSortEvent): void {
    this.lastSortEvent.set(
      event.order !== 0 ? `${event.field} ${event.order === 1 ? 'ASC' : 'DESC'}` : 'cleared'
    );
  }

  public formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  public statusSeverity(status: Product['status']): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  public stars(rating: number): string {
    return '*'.repeat(rating) + '-'.repeat(5 - rating);
  }
}
