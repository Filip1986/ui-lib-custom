import { GalleriaComponent } from './galleria';

export { GalleriaComponent } from './galleria';
export type {
  GalleriaVariant,
  GalleriaSize,
  GalleriaThumbnailsPosition,
  GalleriaIndicatorsPosition,
  GalleriaResponsiveOption,
} from './galleria.types';

// Re-export constants for consumers that need default values.
export {
  GALLERIA_DEFAULT_NUM_VISIBLE,
  GALLERIA_DEFAULT_NUM_SCROLL,
  GALLERIA_DEFAULT_TRANSITION_INTERVAL,
} from './galleria.constants';

/** Convenience alias for the default export used by Angular template imports. */
export const Galleria: typeof GalleriaComponent = GalleriaComponent;
