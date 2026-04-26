/** Structural variant — maps to the design system (Material, Bootstrap, Minimal). */
export type UploadVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the component. */
export type UploadSize = 'sm' | 'md' | 'lg';

/** Emitted when files are selected via the file picker or drag-and-drop. */
export interface UploadSelectEvent {
  /** The originating browser event. */
  originalEvent: Event;
  /** The newly added files (after validation). */
  files: File[];
  /** All files currently in the queue after the selection. */
  currentFiles: File[];
}

/** Emitted when a single file is removed from the queue. */
export interface UploadRemoveEvent {
  /** The originating browser event. */
  originalEvent: Event;
  /** The file that was removed. */
  file: File;
}

/** Emitted in custom-upload mode to let the consumer handle the actual upload. */
export interface UploadHandlerEvent {
  /** All files currently in the queue. */
  files: File[];
}

/** Internal representation of a queued file plus its optional object URL for image preview. */
export interface UploadFileItem {
  /** The native File object. */
  file: File;
  /**
   * A blob URL created via `URL.createObjectURL()` for image preview.
   * `null` when the file is not an image.
   */
  objectUrl: string | null;
}

/** A validation error produced when a file fails size, type, or limit checks. */
export interface UploadValidationMessage {
  /** Short summary of the error. */
  summary: string;
  /** Detailed description shown to the user. */
  detail: string;
}
