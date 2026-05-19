import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CarouselComponent } from 'ui-lib-custom/carousel';
import type { CarouselResponsiveOption } from 'ui-lib-custom/carousel';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';

interface DemoProduct {
  name: string;
  category: string;
  price: number;
  image: string;
}

/**
 * Demo page for the Carousel component.
 * Showcases basic usage, multiple visible items, responsive options,
 * vertical orientation, and all three design variants.
 */
@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  imports: [
    CarouselComponent,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './carousel-demo.component.html',
  styleUrl: './carousel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselDemoComponent {
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

  public readonly importCode: string = "import { CarouselComponent } from 'ui-lib-custom/carousel'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'multiple-items', label: 'Multiple Items Visible' },
    { id: 'circular-autoplay', label: 'Circular & Autoplay' },
    { id: 'responsive', label: 'Responsive' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'header-footer', label: 'Header & Footer Templates' },
    { id: 'page-change', label: 'Page Change Event' },
    { id: 'bootstrap-variant', label: 'Bootstrap Variant' },
    { id: 'minimal-variant', label: 'Minimal Variant' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'hidden-controls', label: 'Hidden Navigators & Indicators' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
    { id: 'api', label: 'API Reference' },
  ];

  /** Sample products used across all demo scenarios. */
  public readonly products: DemoProduct[] = [
    { name: 'Bamboo Watch', category: 'Accessories', price: 65, image: '🎍' },
    { name: 'Black Watch', category: 'Accessories', price: 72, image: '⌚' },
    { name: 'Blue Band', category: 'Fitness', price: 79, image: '💙' },
    { name: 'Blue T-Shirt', category: 'Clothing', price: 29, image: '👕' },
    { name: 'Bracelet', category: 'Accessories', price: 15, image: '📿' },
    { name: 'Brown Purse', category: 'Accessories', price: 120, image: '👜' },
    { name: 'Chakra Bracelet', category: 'Accessories', price: 32, image: '🌟' },
    { name: 'Galaxy Earrings', category: 'Accessories', price: 34, image: '💫' },
    { name: 'Game Controller', category: 'Electronics', price: 99, image: '🎮' },
  ];

  /** Simple string slides for the basic demo. */
  public readonly slides: string[] = [
    'Slide One',
    'Slide Two',
    'Slide Three',
    'Slide Four',
    'Slide Five',
  ];

  /** Responsive breakpoints for the responsive demo. */
  public readonly responsiveOptions: CarouselResponsiveOption[] = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
    { breakpoint: '640px', numVisible: 1, numScroll: 1 },
  ];

  /** Track the last emitted page index for the event demo. */
  public lastPage: number = 0;

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      description: 'Array of items to display in the carousel.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Carousel size.' },
    {
      name: 'numVisible',
      type: 'number',
      default: '1',
      description: 'Number of visible items at once.',
    },
    {
      name: 'numScroll',
      type: 'number',
      default: '1',
      description: 'Number of items to scroll per click.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Scroll axis.',
    },
    {
      name: 'circular',
      type: 'boolean',
      default: 'false',
      description: 'Enables infinite looping.',
    },
    {
      name: 'showNavigators',
      type: 'boolean',
      default: 'true',
      description: 'Toggles prev/next navigation buttons.',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'true',
      description: 'Toggles page indicator dots.',
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      default: '0',
      description: 'Autoplay interval in milliseconds. 0 disables autoplay.',
    },
    {
      name: 'responsiveOptions',
      type: 'CarouselResponsiveOption[]',
      default: '[]',
      description: 'Breakpoint-specific numVisible/numScroll overrides.',
    },
    {
      name: 'verticalViewportHeight',
      type: 'string',
      default: "'300px'",
      description: 'Viewport height when orientation is vertical.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Carousel'",
      description: 'Accessible label for the carousel region.',
    },
  ];

  /** Update the displayed page index when the carousel emits a page change. */
  public onPageChange(event: { page: number }): void {
    this.lastPage = event.page;
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '← / →', action: 'Navigate to the previous or next page of items.' },
    {
      key: 'Enter / Space',
      target: 'Navigator button',
      action: 'Activate the previous/next button.',
    },
    { key: 'Enter / Space', target: 'Indicator dot', action: 'Jump directly to that page.' },
    { key: 'Tab / Shift+Tab', action: 'Move focus between navigator buttons and indicator dots.' },
  ];
}
