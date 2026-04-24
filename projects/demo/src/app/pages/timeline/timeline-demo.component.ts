import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimelineComponent } from 'ui-lib-custom/timeline';
import {
  TimelineContentDirective,
  TimelineMarkerDirective,
  TimelineOppositeDirective,
} from 'ui-lib-custom/timeline';
import type {
  TimelineAlign,
  TimelineLayout,
  TimelineSize,
  TimelineVariant,
} from 'ui-lib-custom/timeline';
interface ProjectEvent {
  status: string;
  date: string;
  description: string;
  icon: string;
  severity: 'success' | 'info' | 'warning' | 'danger';
}
interface OrderStep {
  label: string;
  date: string;
}
/**
 * Demo page showcasing all Timeline component features and variants.
 */
@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  imports: [
    TimelineComponent,
    TimelineContentDirective,
    TimelineMarkerDirective,
    TimelineOppositeDirective,
  ],
  templateUrl: './timeline-demo.component.html',
  styleUrl: './timeline-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {
  /** Events used in basic vertical demo. */
  public readonly basicEvents: ProjectEvent[] = [
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      description: 'Your order has been placed.',
      icon: 'pi pi-shopping-cart',
      severity: 'info',
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      description: 'Order is being processed.',
      icon: 'pi pi-cog',
      severity: 'warning',
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      description: 'Package has been dispatched.',
      icon: 'pi pi-shopping-bag',
      severity: 'success',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      description: 'Package delivered to recipient.',
      icon: 'pi pi-check',
      severity: 'success',
    },
  ];
  /** Steps used in the horizontal demo. */
  public readonly orderSteps: OrderStep[] = [
    { label: 'Cart', date: 'Jan 1' },
    { label: 'Checkout', date: 'Jan 2' },
    { label: 'Shipping', date: 'Jan 3' },
    { label: 'Delivered', date: 'Jan 4' },
  ];
  /** Active layout for the horizontal switcher demo. */
  public activeLayout: TimelineLayout = 'horizontal';
  /** Active align for the horizontal switcher demo. */
  public activeHorizontalAlign: TimelineAlign = 'top';
  public readonly sizeOptions: TimelineSize[] = ['sm', 'md', 'lg'];
  public readonly variantOptions: TimelineVariant[] = ['material', 'bootstrap', 'minimal'];
  /** Returns a CSS class string for a severity badge. */
  public severityClass(severity: ProjectEvent['severity']): string {
    const map: Record<ProjectEvent['severity'], string> = {
      success: 'timeline-demo__badge--success',
      info: 'timeline-demo__badge--info',
      warning: 'timeline-demo__badge--warning',
      danger: 'timeline-demo__badge--danger',
    };
    return `timeline-demo__badge ${map[severity]}`;
  }
}
