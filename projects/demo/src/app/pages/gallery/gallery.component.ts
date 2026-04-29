import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleriaComponent } from 'ui-lib-custom/galleria';
import type {
  GalleriaSize,
  GalleriaThumbnailsPosition,
  GalleriaVariant,
} from 'ui-lib-custom/galleria';

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
  imports: [GalleriaComponent, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
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
}
