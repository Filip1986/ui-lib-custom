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
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
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
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './timeline-demo.component.html',
  styleUrl: './timeline-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'value', type: 'T[]', description: 'Array of timeline items (required).' },
    {
      name: 'layout',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Timeline axis direction.',
    },
    {
      name: 'align',
      type: "'left' | 'right' | 'alternate'",
      default: "'left'",
      description: 'Content alignment relative to the spine.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Timeline size.' },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Timeline'",
      description: 'Accessible label for the timeline list.',
    },
  ];

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
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-timeline-connector-color', description: 'Connector text colour.' },
    { variable: '--uilib-timeline-connector-width', description: 'Connector width.' },
    { variable: '--uilib-timeline-marker-size', description: 'Marker size.' },
    { variable: '--uilib-timeline-marker-bg', description: 'Marker background colour.' },
    { variable: '--uilib-timeline-marker-border-color', description: 'Marker Border text colour.' },
    { variable: '--uilib-timeline-marker-border-width', description: 'Marker Border width.' },
    { variable: '--uilib-timeline-event-gap', description: 'Event gap.' },
    { variable: '--uilib-timeline-content-gap', description: 'Content gap.' },
    { variable: '--uilib-timeline-opposite-gap', description: 'Opposite gap.' },
    { variable: '--uilib-timeline-opposite-min-width', description: 'Opposite Min width.' },
    { variable: '--uilib-timeline-font-size', description: 'Font size.' },
    { variable: '--uilib-timeline-color', description: 'Text colour.' },
    { variable: '--uilib-timeline-focus-ring-color', description: 'Focus ring colour.' },
  ];
}
