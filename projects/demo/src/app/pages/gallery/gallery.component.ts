import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import type { Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleriaComponent } from 'ui-lib-custom/galleria';
import { Button } from 'ui-lib-custom/button';
import type {
  GalleriaSize,
  GalleriaThumbnailsPosition,
  GalleriaVariant,
} from 'ui-lib-custom/galleria';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

interface GalleriaImage {
  src: string;
  thumbnailSrc: string;
  alt: string;
  title: string;
  description: string;
}

const DEMO_IMAGES: GalleriaImage[] = [
  {
    src: 'https://picsum.photos/seed/galleria1/800/500',
    thumbnailSrc: 'https://picsum.photos/seed/galleria1/120/80',
    alt: 'Mountain landscape at sunrise',
    title: 'Mountain Sunrise',
    description: 'A breathtaking view of mountain peaks bathed in early morning light.',
  },
  {
    src: 'https://picsum.photos/seed/galleria2/800/500',
    thumbnailSrc: 'https://picsum.photos/seed/galleria2/120/80',
    alt: 'Ocean waves at golden hour',
    title: 'Golden Hour Waves',
    description: 'Calm ocean waves reflecting the warm tones of a late-afternoon sun.',
  },
  {
    src: 'https://picsum.photos/seed/galleria3/800/500',
    thumbnailSrc: 'https://picsum.photos/seed/galleria3/120/80',
    alt: 'Dense forest path in autumn',
    title: 'Autumn Forest',
    description: 'A winding path through a forest ablaze with autumn colours.',
  },
  {
    src: 'https://picsum.photos/seed/galleria4/800/500',
    thumbnailSrc: 'https://picsum.photos/seed/galleria4/120/80',
    alt: 'City skyline at night',
    title: 'City Lights',
    description: 'A modern skyline reflected in still water after dark.',
  },
  {
    src: 'https://picsum.photos/seed/galleria5/800/500',
    thumbnailSrc: 'https://picsum.photos/seed/galleria5/120/80',
    alt: 'Desert dunes under a clear blue sky',
    title: 'Desert Dunes',
    description: 'Sweeping sand dunes stretching to the horizon under a cloudless sky.',
  },
  {
    src: 'https://picsum.photos/seed/galleria6/800/500',
    thumbnailSrc: 'https://picsum.photos/seed/galleria6/120/80',
    alt: 'Snowy village in winter',
    title: 'Winter Village',
    description: 'A quiet village dusted with fresh snow on a crisp winter morning.',
  },
];

/**
 * Demo page for the Galleria component — showcases all major API surfaces:
 * basic usage, thumbnails positions, indicators, fullscreen, autoplay, and variants.
 */
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    GalleriaComponent,
    FormsModule,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
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

  public readonly importCode: string = "import { GalleriaComponent } from 'ui-lib-custom/galleria'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-caption', label: 'With Caption' },
    { id: 'indicators', label: 'Indicators' },
    { id: 'thumbnail-position', label: 'Thumbnail Position' },
    { id: 'indicators-on-item', label: 'Indicators on Item' },
    { id: 'fullscreen', label: 'Fullscreen' },
    { id: 'circular-autoplay', label: 'Circular & Autoplay' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'images',
      type: 'GalleryImage[]',
      default: '[]',
      description: 'Array of image objects with src, alt, and optional caption.',
    },
    {
      name: 'thumbnails',
      type: 'boolean',
      default: 'true',
      description: 'Shows thumbnail strip navigation.',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'true',
      description: 'Shows position indicator dots.',
    },
    {
      name: 'circular',
      type: 'boolean',
      default: 'false',
      description: 'Enables infinite looping.',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      default: 'false',
      description: 'Enables automatic slideshow.',
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      default: '3000',
      description: 'Milliseconds per slide in autoplay mode.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Gallery'",
      description: 'Accessible label for the gallery region.',
    },
  ];

  public readonly images: GalleriaImage[] = DEMO_IMAGES;

  // Basic demo state
  public readonly basicActiveIndex: WritableSignal<number> = signal<number>(0);

  // Indicators demo state
  public readonly indicatorsActiveIndex: WritableSignal<number> = signal<number>(0);

  // Position demo
  public readonly positionActiveIndex: WritableSignal<number> = signal<number>(0);
  public readonly thumbnailsPosition: WritableSignal<GalleriaThumbnailsPosition> =
    signal<GalleriaThumbnailsPosition>('bottom');

  // No thumbnails + indicators
  public readonly noThumbActiveIndex: WritableSignal<number> = signal<number>(0);

  // Fullscreen demo
  public readonly fullscreenActiveIndex: WritableSignal<number> = signal<number>(0);
  public readonly fullscreenVisible: WritableSignal<boolean> = signal<boolean>(false);

  // Autoplay demo
  public readonly autoplayActiveIndex: WritableSignal<number> = signal<number>(0);

  // Variants demo
  public readonly variantActiveIndex: WritableSignal<number> = signal<number>(0);
  public readonly selectedVariant: WritableSignal<GalleriaVariant> =
    signal<GalleriaVariant>('material');

  // Size demo
  public readonly sizeActiveIndex: WritableSignal<number> = signal<number>(0);
  public readonly selectedSize: WritableSignal<GalleriaSize> = signal<GalleriaSize>('md');

  // Playground state
  public readonly playgroundActiveIndex: WritableSignal<number> = signal<number>(0);
  public readonly playgroundVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<GalleriaVariant> =
    signal<GalleriaVariant>('material');
  public readonly playgroundSize: WritableSignal<GalleriaSize> = signal<GalleriaSize>('md');
  public readonly playgroundPosition: WritableSignal<GalleriaThumbnailsPosition> =
    signal<GalleriaThumbnailsPosition>('bottom');
  public readonly playgroundShowThumbnails: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundShowIndicators: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundShowNavigators: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundCircular: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundAutoPlay: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundFullScreen: WritableSignal<boolean> = signal<boolean>(false);

  public readonly positionOptions: GalleriaThumbnailsPosition[] = [
    'bottom',
    'top',
    'left',
    'right',
  ];
  public readonly variantOptions: GalleriaVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizeOptions: GalleriaSize[] = ['sm', 'md', 'lg'];

  public onPositionChange(position: GalleriaThumbnailsPosition): void {
    this.thumbnailsPosition.set(position);
    this.positionActiveIndex.set(0);
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'value',
      type: 'unknown[]',
      default: '[]',
      description: 'Array of data items to display.',
    },
    {
      name: 'activeIndex',
      type: 'number',
      default: '0',
      description: 'Active item index — two-way bindable.',
    },
    {
      name: 'visible',
      type: 'boolean',
      default: 'false',
      description: 'Fullscreen overlay open state — two-way bindable.',
    },
    {
      name: 'numVisible',
      type: 'number',
      default: '3',
      description: 'Number of thumbnails visible in the strip.',
    },
    {
      name: 'numScroll',
      type: 'number',
      default: '1',
      description: 'Thumbnails scrolled per navigator click.',
    },
    {
      name: 'thumbnailsPosition',
      type: "'bottom' | 'top' | 'left' | 'right'",
      default: "'bottom'",
      description: 'Position of the thumbnail strip.',
    },
    {
      name: 'indicatorsPosition',
      type: "'bottom' | 'top' | 'left' | 'right'",
      default: "'bottom'",
      description: 'Position of the indicator dots.',
    },
    {
      name: 'showThumbnails',
      type: 'boolean',
      default: 'true',
      description: 'Render the thumbnail strip.',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'false',
      description: 'Render dot indicators.',
    },
    {
      name: 'showIndicatorsOnItem',
      type: 'boolean',
      default: 'false',
      description: 'Overlay dot indicators on the active item.',
    },
    {
      name: 'showItemNavigators',
      type: 'boolean',
      default: 'true',
      description: 'Always show prev/next arrows on the item.',
    },
    {
      name: 'showItemNavigatorsOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Show prev/next arrows only on hover.',
    },
    {
      name: 'showThumbnailNavigators',
      type: 'boolean',
      default: 'true',
      description: 'Show scroll arrows on the thumbnail strip.',
    },
    {
      name: 'circular',
      type: 'boolean',
      default: 'false',
      description: 'Wrap navigation around the item list.',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      default: 'false',
      description: 'Automatically advance to the next item.',
    },
    {
      name: 'transitionInterval',
      type: 'number',
      default: '4000',
      description: 'Autoplay interval in milliseconds.',
    },
    {
      name: 'fullScreen',
      type: 'boolean',
      default: 'false',
      description: 'Enable the fullscreen toggle button.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant; inherits theme default when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls thumbnail size token.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class applied to the host.',
    },
    {
      name: 'containerStyle',
      type: 'Record<string, string> | null',
      default: 'null',
      description: 'Inline styles for the gallery container.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'activeIndexChange',
      type: 'number',
      description: 'Emitted when the active index changes.',
    },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    {
      name: '#galleriaItem',
      type: 'let-item ($implicit)',
      description: 'Renders the main active item.',
    },
    {
      name: '#galleriaThumbnail',
      type: 'let-item ($implicit)',
      description: 'Renders each thumbnail.',
    },
    {
      name: '#galleriaCaption',
      type: 'let-item ($implicit)',
      description: 'Caption overlay on the active item.',
    },
    { name: '#galleriaHeader', type: '—', description: 'Content rendered above the gallery.' },
    { name: '#galleriaFooter', type: '—', description: 'Content rendered below the gallery.' },
    {
      name: '#galleriaIndicator',
      type: 'let-index, let-active="active"',
      description: 'Custom indicator button content.',
    },
  ];
}
