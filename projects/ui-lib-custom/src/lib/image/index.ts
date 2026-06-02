import { ImageComponent } from './image';
export { ImageComponent } from './image';
export {
  IMAGE_ARIA_CLOSE_LABEL,
  IMAGE_ARIA_PREVIEW_LABEL,
  IMAGE_ARIA_ROTATE_LEFT_LABEL,
  IMAGE_ARIA_ROTATE_RIGHT_LABEL,
  IMAGE_ARIA_ZOOM_IN_LABEL,
  IMAGE_ARIA_ZOOM_OUT_LABEL,
  IMAGE_ROTATE_STEP,
  IMAGE_ZOOM_MAX,
  IMAGE_ZOOM_MIN,
  IMAGE_ZOOM_STEP,
} from './image.constants';
export type { ImageSize, ImageVariant } from './image.types';
/** Convenience alias for the default export used by Angular template imports. */
export const Image: typeof ImageComponent = ImageComponent;
