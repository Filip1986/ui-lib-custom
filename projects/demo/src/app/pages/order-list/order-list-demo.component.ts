import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming OrderList component.
 */
@Component({
  selector: 'app-order-list-demo',
  standalone: true,
  templateUrl: './order-list-demo.component.html',
  styleUrl: './order-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListDemoComponent {}
