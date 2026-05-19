import { ChangeDetectionStrategy, Component, signal, computed, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualScrollerComponent } from 'ui-lib-custom/virtual-scroller';
import { Button } from 'ui-lib-custom/button';
import { ScrollerItemDirective, ScrollerLoaderDirective } from 'ui-lib-custom/virtual-scroller';
import type { VirtualScrollerLazyLoadEvent } from 'ui-lib-custom/virtual-scroller';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

interface DemoItem {
  id: number;
  label: string;
  description: string;
  color: string;
}

interface LazyDemoItem {
  id: number;
  label: string;
}

const COLORS: string[] = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#0ea5e9',
  '#3b82f6',
];

function makeItems(count: number): DemoItem[] {
  return Array.from(
    { length: count },
    (_: unknown, index: number): DemoItem => ({
      id: index,
      label: `Item ${(index + 1).toString()}`,
      description: `Description for item ${(index + 1).toString()} — index ${index.toString()}`,
      color: COLORS[index % COLORS.length] as string,
    })
  );
}

function makeLazyItems(first: number, last: number): LazyDemoItem[] {
  return Array.from(
    { length: last - first },
    (_: unknown, index: number): LazyDemoItem => ({
      id: first + index,
      label: `Lazy Item ${(first + index + 1).toString()}`,
    })
  );
}

/**
 * Demo page for the VirtualScroller component.
 * Showcases vertical, horizontal, lazy, loader, and disabled scenarios.
 */
@Component({
  selector: 'app-scroller-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    CommonModule,
    VirtualScrollerComponent,
    ScrollerItemDirective,
    ScrollerLoaderDirective,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './scroller-demo.component.html',
  styleUrl: './scroller-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { VirtualScrollerComponent } from 'ui-lib-custom/virtual-scroller'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'vertical', label: 'Vertical (10 000 items)' },
    { id: 'horizontal', label: 'Horizontal (1 000 items)' },
    { id: 'lazy-loading', label: 'Lazy Loading' },
    { id: 'custom-loader', label: 'Custom Loader Template' },
    { id: 'disabled-mode', label: 'Disabled Mode' },
    { id: 'large-items', label: 'Large Items (5 000 items)' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'items',
      type: 'unknown[] | null | undefined',
      description: 'Array of items to render virtually.',
    },
    {
      name: 'itemSize',
      type: 'number | [number, number]',
      default: '0',
      description: 'Item height (or [width, height] for 2D) in pixels.',
    },
    {
      name: 'scrollHeight',
      type: 'string | undefined',
      default: 'undefined',
      description: 'CSS height of the scroll viewport.',
    },
    {
      name: 'lazy',
      type: 'boolean',
      default: 'false',
      description: 'Enables lazy loading; fires lazyLoad event as user scrolls.',
    },
    {
      name: 'loading',
      type: 'boolean | undefined',
      default: 'undefined',
      description: 'Controlled loading state for lazy mode.',
    },
    {
      name: 'loaderDisabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables built-in loader rows.',
    },
    {
      name: 'showLoader',
      type: 'boolean',
      default: 'false',
      description: 'Shows loader items while more data loads.',
    },
    {
      name: 'step',
      type: 'number',
      default: '0',
      description: 'Number of additional items to render outside the viewport.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: 'Delay in ms before rendering after scroll.',
    },
    {
      name: 'appendOnly',
      type: 'boolean',
      default: 'false',
      description: 'Only appends new items, never removes old ones.',
    },
    {
      name: 'inline',
      type: 'boolean',
      default: 'false',
      description: 'Makes the scroller inline (no fixed height).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables virtual scrolling and renders all items.',
    },
    {
      name: 'columns',
      type: 'unknown[] | null | undefined',
      default: 'null',
      description: 'Column definitions for 2D virtual scrolling.',
    },
    {
      name: 'tabIndex',
      type: 'number',
      default: '0',
      description: 'Tab order of the scroll container.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "''",
      description: 'Accessible label for the scroll region.',
    },
    {
      name: 'contentRole',
      type: "'list' | 'grid'",
      default: "'list'",
      description: 'ARIA role applied to the scroll content.',
    },
  ];

  // ---------------------------------------------------------------------------
  // Scenario 1: Vertical — 10 000 items
  // ---------------------------------------------------------------------------

  protected readonly verticalItems: DemoItem[] = makeItems(10_000);

  // ---------------------------------------------------------------------------
  // Scenario 2: Horizontal — 1 000 items
  // ---------------------------------------------------------------------------

  protected readonly horizontalItems: DemoItem[] = makeItems(1_000);

  // ---------------------------------------------------------------------------
  // Scenario 3: Lazy loading — page by page
  // ---------------------------------------------------------------------------

  protected readonly lazyTotalCount: number = 10_000;
  protected readonly lazyItems: WritableSignal<LazyDemoItem[]> = signal<LazyDemoItem[]>([]);
  protected readonly lazyLoading: WritableSignal<boolean> = signal<boolean>(false);

  protected onLazyLoad(event: VirtualScrollerLazyLoadEvent): void {
    this.lazyLoading.set(true);
    // Simulate an async data fetch
    setTimeout((): void => {
      const newItems: LazyDemoItem[] = [...this.lazyItems()];
      const fetched: LazyDemoItem[] = makeLazyItems(event.first, event.last);
      fetched.forEach((item: LazyDemoItem): void => {
        newItems[item.id] = item;
      });
      this.lazyItems.set(newItems);
      this.lazyLoading.set(false);
    }, 200);
  }

  protected trackLazyItem(_index: number, item: LazyDemoItem | undefined): number {
    return item?.id ?? _index;
  }

  // ---------------------------------------------------------------------------
  // Scenario 4: Loading skeleton (custom loader template)
  // ---------------------------------------------------------------------------

  protected readonly skeletonItems: WritableSignal<DemoItem[]> = signal<DemoItem[]>([]);
  protected readonly skeletonLoading: WritableSignal<boolean> = signal<boolean>(true);

  protected loadSkeletonData(): void {
    this.skeletonLoading.set(true);
    setTimeout((): void => {
      this.skeletonItems.set(makeItems(1_000));
      this.skeletonLoading.set(false);
    }, 1_500);
  }

  // ---------------------------------------------------------------------------
  // Scenario 5: Disabled (bypass virtualization)
  // ---------------------------------------------------------------------------

  protected readonly disabledItems: DemoItem[] = makeItems(20);
  protected readonly virtualizationDisabled: WritableSignal<boolean> = signal<boolean>(true);

  // ---------------------------------------------------------------------------
  // Scenario 6: Custom item sizing (variable-look via alternating heights)
  // ---------------------------------------------------------------------------

  protected readonly largeItems: DemoItem[] = makeItems(5_000);

  // ---------------------------------------------------------------------------
  // Shared
  // ---------------------------------------------------------------------------

  protected trackById(_index: number, item: DemoItem): number {
    return item.id;
  }

  protected readonly demoCode: Signal<string> = computed(
    (): string =>
      `<ui-lib-virtual-scroller [items]="items" [itemSize]="50" scrollHeight="400px">
  <ng-template uiScrollerItem let-item>
    <div class="item">{{ item.label }}</div>
  </ng-template>
</ui-lib-virtual-scroller>`
  );
}
