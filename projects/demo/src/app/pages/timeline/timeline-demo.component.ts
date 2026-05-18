import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
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
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

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
    CodeSnippet,
    TimelineComponent,
    TimelineContentDirective,
    TimelineMarkerDirective,
    TimelineOppositeDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './timeline-demo.component.html',
  styleUrl: './timeline-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {
  public readonly importCode: string = "import { TimelineComponent } from 'ui-lib-custom/timeline'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-vertical', label: 'Basic Vertical' },
    { id: 'opposite-content', label: 'Opposite Content' },
    { id: 'alternate-alignment', label: 'Alternate Alignment' },
    { id: 'custom-markers', label: 'Custom Markers' },
    { id: 'horizontal-layout', label: 'Horizontal Layout' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'right-alignment', label: 'Right Alignment' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
