/** Design variant for the Galleria component. */
export type GalleriaVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the Galleria component. */
export type GalleriaSize = 'sm' | 'md' | 'lg';

/** Position of the thumbnail strip relative to the main item. */
export type GalleriaThumbnailsPosition = 'bottom' | 'top' | 'left' | 'right';

/** Position of the indicator dots relative to the main item. */
export type GalleriaIndicatorsPosition = 'bottom' | 'top' | 'left' | 'right';

/** Responsive option for controlling visible thumbnails at different breakpoints. */
export interface GalleriaResponsiveOption {
  /** CSS media-query breakpoint string, e.g. \'960px\'. */
  breakpoint: string;
  /** Number of thumbnails visible at this breakpoint. */
  numVisible: number;
}

/** Data model for a gallery item. */
export interface GalleriaItem {
  /** Full-sized media source URL. */
  src: string;
  /** Accessible description for the full-sized media. */
  alt: string;
  /** Optional thumbnail source URL. Falls back to `src` when omitted. */
  thumbnailSrc?: string;
  /** Optional thumbnail description. Falls back to `alt` when omitted. */
  thumbnailAlt?: string;
}
