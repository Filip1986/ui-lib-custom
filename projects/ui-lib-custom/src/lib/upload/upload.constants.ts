/** Default label for the "Choose files" button. */
export const UPLOAD_DEFAULT_CHOOSE_LABEL: string = 'Choose';

/** Default label for the "Upload" action button. */
export const UPLOAD_DEFAULT_UPLOAD_LABEL: string = 'Upload';

/** Default label for the "Cancel / clear queue" button. */
export const UPLOAD_DEFAULT_CANCEL_LABEL: string = 'Cancel';

/** Default placeholder shown in the drop zone when no files are queued. */
export const UPLOAD_DEFAULT_EMPTY_MESSAGE: string = 'Drag and drop files here to upload.';

/** Default thumbnail preview width in pixels. */
export const UPLOAD_DEFAULT_PREVIEW_WIDTH: number = 50;

/**
 * Default message when a file exceeds `maxFileSize`.
 * `{0}` is replaced by the file name; `{1}` by the human-readable size limit.
 */
export const UPLOAD_INVALID_FILE_SIZE_MESSAGE: string =
  '{0}: Invalid file size. Maximum allowed size is {1}.';

/**
 * Default message when a file type is not in the `accept` list.
 * `{0}` is replaced by the file name; `{1}` by the allowed types string.
 */
export const UPLOAD_INVALID_FILE_TYPE_MESSAGE: string =
  '{0}: Invalid file type. Allowed types: {1}.';

/**
 * Default message when the `fileLimit` is exceeded.
 * `{0}` is replaced by the numeric limit.
 */
export const UPLOAD_INVALID_FILE_LIMIT_MESSAGE: string =
  'Maximum number of files exceeded. Limit is {0}.';
