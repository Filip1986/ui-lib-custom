import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent } from 'ui-lib-custom/carousel';
import type { CarouselResponsiveOption } from 'ui-lib-custom/carousel';

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
  imports: [CarouselComponent],
  templateUrl: './carousel-demo.component.html',
  styleUrl: './carousel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselDemoComponent {
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

  /** Update the displayed page index when the carousel emits a page change. */
  public onPageChange(event: { page: number }): void {
    this.lastPage = event.page;
  }
}
