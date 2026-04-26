import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  ElementRef,
  InputSignal,
  OnDestroy,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import type {
  UploadFileItem,
  UploadHandlerEvent,
  UploadRemoveEvent,
  UploadSelectEvent,
  UploadSize,
  UploadValidationMessage,
  UploadVariant,
} from './upload.types';
import {
  UploadContentDirective,
  UploadEmptyDirective,
  UploadFileDirective,
  UploadHeaderDirective,
} from './upload.template-directives';
import {
  UPLOAD_DEFAULT_CANCEL_LABEL,
  UPLOAD_DEFAULT_CHOOSE_LABEL,
  UPLOAD_DEFAULT_EMPTY_MESSAGE,
  UPLOAD_DEFAULT_PREVIEW_WIDTH,
  UPLOAD_DEFAULT_UPLOAD_LABEL,
  UPLOAD_INVALID_FILE_LIMIT_MESSAGE,
  UPLOAD_INVALID_FILE_SIZE_MESSAGE,
  UPLOAD_INVALID_FILE_TYPE_MESSAGE,
} from './upload.constants';

/**
 * Advanced file upload component with drag-and-drop, multi-file support,
 * image thumbnails, file validation, and three design variants.
 *
 * Use `customUpload="true"` and listen to `(uploadHandler)` to control
 * the actual HTTP transport in the consuming application.
 *
 * @example
 * ```html
 * <ui-lib-upload
 *   [multiple]="true"
 *   [accept]="'image/*'"
 *   [maxFileSize]="5000000"
 *   [customUpload]="true"
 *   (uploadHandler)="upload($event)"
 * />
 * ```
 */
@Component({
  selector: 'ui-lib-upload',
  standalone: true,
  imports: [
    CommonModule,
    UploadHeaderDirective,
    UploadContentDirective,
    UploadEmptyDirective,
    UploadFileDirective,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-upload',
    '[class.ui-lib-upload--material]': 'variant() === "material"',
    '[class.ui-lib-upload--bootstrap]': 'variant() === "bootstrap"',
    '[class.ui-lib-upload--minimal]': 'variant() === "minimal"',
    '[class.ui-lib-upload--sm]': 'size() === "sm"',
    '[class.ui-lib-upload--md]': 'size() === "md"',
    '[class.ui-lib-upload--lg]': 'size() === "lg"',
    '[class.ui-lib-upload--disabled]': 'disabled()',
    '[class.ui-lib-upload--drag-over]': 'isDragOver()',
    '[class.ui-lib-upload--has-files]': 'hasFiles()',
  },
})
export class UploadComponent implements OnDestroy {
  // ─── Inputs ────────────────────────────────────────────────────────────────

  /** Design variant. Defaults to `'material'`. */
  public readonly variant: InputSignal<UploadVariant> = input<UploadVariant>('material');

  /** Size token. Defaults to `'md'`. */
  public readonly size: InputSignal<UploadSize> = input<UploadSize>('md');

  /** Allow selecting more than one file at a time. Defaults to `false`. */
  public readonly multiple: InputSignal<boolean> = input<boolean>(false);

  /**
   * Comma-separated list of accepted file types passed directly to the
   * native `<input accept>` attribute (e.g. `'image/*'` or `'.pdf,.docx'`).
   */
  public readonly accept: InputSignal<string> = input<string>('');

  /** Disable all interactions. Defaults to `false`. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * When `true`, triggers `uploadHandler` immediately after file selection
   * (only effective when `customUpload` is also `true`).
   */
  public readonly auto: InputSignal<boolean> = input<boolean>(false);

  /** Maximum allowed file size in bytes. `null` means no limit. */
  public readonly maxFileSize: InputSignal<number | null> = input<number | null>(null);

  /**
   * Maximum number of files that can be queued at once.
   * `null` means no limit.
   */
  public readonly fileLimit: InputSignal<number | null> = input<number | null>(null);

  /** Label for the "Choose" button. */
  public readonly chooseLabel: InputSignal<string> = input<string>(UPLOAD_DEFAULT_CHOOSE_LABEL);

  /** Label for the "Upload" button. */
  public readonly uploadLabel: InputSignal<string> = input<string>(UPLOAD_DEFAULT_UPLOAD_LABEL);

  /** Label for the "Cancel" button. */
  public readonly cancelLabel: InputSignal<string> = input<string>(UPLOAD_DEFAULT_CANCEL_LABEL);

  /** Whether to show the Upload action button. Defaults to `true`. */
  public readonly showUploadButton: InputSignal<boolean> = input<boolean>(true);

  /** Whether to show the Cancel/clear button. Defaults to `true`. */
  public readonly showCancelButton: InputSignal<boolean> = input<boolean>(true);

  /**
   * When `true`, the component does not perform any upload itself.
   * Instead it emits `(uploadHandler)` so the consumer can handle transport.
   */
  public readonly customUpload: InputSignal<boolean> = input<boolean>(false);

  /** Width (and height) of image thumbnail previews in pixels. */
  public readonly previewWidth: InputSignal<number> = input<number>(UPLOAD_DEFAULT_PREVIEW_WIDTH);

  /** Validation message template for oversized files. `{0}` = name, `{1}` = limit. */
  public readonly invalidFileSizeMessage: InputSignal<string> = input<string>(
    UPLOAD_INVALID_FILE_SIZE_MESSAGE
  );

  /** Validation message template for wrong file types. `{0}` = name, `{1}` = accepted types. */
  public readonly invalidFileTypeMessage: InputSignal<string> = input<string>(
    UPLOAD_INVALID_FILE_TYPE_MESSAGE
  );

  /** Validation message template when the file limit is exceeded. `{0}` = limit. */
  public readonly invalidFileLimitMessage: InputSignal<string> = input<string>(
    UPLOAD_INVALID_FILE_LIMIT_MESSAGE
  );

  /** Text shown inside the drop zone when no files are queued. */
  public readonly emptyMessage: InputSignal<string> = input<string>(UPLOAD_DEFAULT_EMPTY_MESSAGE);

  /** Additional CSS class applied to the root container element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ─── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted whenever files are selected (via picker or drag-and-drop). */
  public readonly fileSelect: OutputEmitterRef<UploadSelectEvent> = output<UploadSelectEvent>();

  /** Emitted when the user removes a single file from the queue. */
  public readonly fileRemove: OutputEmitterRef<UploadRemoveEvent> = output<UploadRemoveEvent>();

  /** Emitted when the entire queue is cleared via the Cancel button. */
  public readonly uploadClear: OutputEmitterRef<void> = output<void>();

  /**
   * Emitted in `customUpload` mode (or `auto + customUpload`) so the consumer
   * can handle the actual HTTP upload.
   */
  public readonly uploadHandler: OutputEmitterRef<UploadHandlerEvent> =
    output<UploadHandlerEvent>();

  // ─── Content-projected templates ───────────────────────────────────────────

  /** Optional custom header template (replaces the default toolbar). */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    UploadHeaderDirective,
    { read: TemplateRef }
  );

  /** Optional custom content template (replaces the drop zone + file list). */
  public readonly contentTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    UploadContentDirective,
    { read: TemplateRef }
  );

  /** Optional custom empty-state template. */
  public readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    UploadEmptyDirective,
    { read: TemplateRef }
  );

  /** Optional custom file-item template. Context: `{ $implicit: UploadFileItem, index: number }`. */
  public readonly fileTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    UploadFileDirective,
    { read: TemplateRef }
  );

  // ─── View refs ─────────────────────────────────────────────────────────────

  /** Reference to the hidden `<input type="file">` element. */
  public readonly fileInputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // ─── Writable state ────────────────────────────────────────────────────────

  /** Whether a drag operation is currently hovering over the drop zone. */
  public readonly isDragOver: WritableSignal<boolean> = signal<boolean>(false);

  /** Active validation error messages. Cleared when the user dismisses them. */
  public readonly validationMessages: WritableSignal<UploadValidationMessage[]> = signal<
    UploadValidationMessage[]
  >([]);

  private readonly internalFiles: WritableSignal<UploadFileItem[]> = signal<UploadFileItem[]>([]);

  // ─── Computed state ────────────────────────────────────────────────────────

  /** Read-only view of the queued file items. */
  public readonly files: Signal<UploadFileItem[]> = computed<UploadFileItem[]>(
    (): UploadFileItem[] => this.internalFiles()
  );

  /** `true` when at least one file is in the queue. */
  public readonly hasFiles: Signal<boolean> = computed<boolean>(
    (): boolean => this.internalFiles().length > 0
  );

  /** `true` when the Choose button should be disabled. */
  public readonly isChooseDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.disabled()) {
      return true;
    }
    const limit: number | null = this.fileLimit();
    return limit !== null && this.internalFiles().length >= limit;
  });

  /** `true` when the Upload button should be disabled. */
  public readonly isUploadDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || !this.hasFiles()
  );

  /** `true` when the Cancel button should be disabled. */
  public readonly isCancelDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || !this.hasFiles()
  );

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  public ngOnDestroy(): void {
    this.revokeAllObjectUrls();
  }

  // ─── Public event handlers ─────────────────────────────────────────────────

  /** Triggers the hidden file input click to open the OS file picker. */
  public onChoose(): void {
    if (this.isChooseDisabled()) {
      return;
    }
    const inputElement: HTMLInputElement | undefined = this.fileInputRef()?.nativeElement;
    if (inputElement) {
      // Clear the value so selecting the same file again still fires `change`.
      inputElement.value = '';
      inputElement.click();
    }
  }

  /** Emits `uploadHandler` with all queued files. */
  public onUpload(): void {
    if (this.isUploadDisabled()) {
      return;
    }
    this.uploadHandler.emit({
      files: this.internalFiles().map((item: UploadFileItem): File => item.file),
    });
  }

  /** Clears the entire file queue and emits `uploadClear`. */
  public onCancel(): void {
    this.clearAllFiles();
    this.uploadClear.emit();
  }

  /** Handles the native `<input type="file">` change event. */
  public onFileInputChange(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (!inputElement.files || inputElement.files.length === 0) {
      return;
    }
    this.processFiles(Array.from(inputElement.files), event);
    // Reset so the same file can be re-selected next time.
    inputElement.value = '';
  }

  /** Handles `dragenter` on the drop zone. */
  public onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled()) {
      this.isDragOver.set(true);
    }
  }

  /** Handles `dragover` on the drop zone (required to allow drops). */
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /** Handles `dragleave` on the drop zone. */
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  /** Handles `drop` on the drop zone. */
  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    if (this.disabled()) {
      return;
    }
    const droppedFiles: FileList | undefined = event.dataTransfer?.files;
    if (!droppedFiles || droppedFiles.length === 0) {
      return;
    }
    this.processFiles(Array.from(droppedFiles), event);
  }

  /**
   * Removes the file at `index` from the queue and emits `fileRemove`.
   * Also revokes the blob URL for image previews to avoid memory leaks.
   */
  public removeFile(event: Event, index: number): void {
    const items: UploadFileItem[] = this.internalFiles();
    if (index < 0 || index >= items.length) {
      return;
    }
    // Index is bounds-checked above; the non-null assertion is safe here.

    const removedItem: UploadFileItem = items[index]!;
    if (removedItem.objectUrl !== null) {
      URL.revokeObjectURL(removedItem.objectUrl);
    }
    this.internalFiles.set(
      items.filter((_item: UploadFileItem, itemIndex: number): boolean => itemIndex !== index)
    );
    this.fileRemove.emit({ originalEvent: event, file: removedItem.file });
  }

  /** Returns `true` when `file.type` begins with `image/`. */
  public isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Formats a byte count as a human-readable string
   * (e.g. `1024` → `'1.0 KB'`).
   */
  public formatSize(bytes: number): string {
    if (bytes === 0) {
      return '0 B';
    }
    const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
    const magnitude: number = Math.floor(Math.log(bytes) / Math.log(1024));
    const clampedMagnitude: number = Math.min(magnitude, units.length - 1);
    const value: number = bytes / Math.pow(1024, clampedMagnitude);
    return `${value.toFixed(1)} ${units[clampedMagnitude]}`;
  }

  /** Dismisses all active validation messages. */
  public clearMessages(): void {
    this.validationMessages.set([]);
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private processFiles(newFiles: File[], originalEvent: Event): void {
    const validationErrors: UploadValidationMessage[] = [];
    const validFiles: File[] = [];

    for (const file of newFiles) {
      const validationError: UploadValidationMessage | null = this.validateFile(file);
      if (validationError !== null) {
        validationErrors.push(validationError);
      } else {
        validFiles.push(file);
      }
    }

    this.validationMessages.set(validationErrors);

    if (validFiles.length === 0) {
      return;
    }

    const limit: number | null = this.fileLimit();
    const currentCount: number = this.internalFiles().length;
    let filesToAdd: File[] = validFiles;

    if (limit !== null) {
      const remainingSlots: number = limit - currentCount;
      if (remainingSlots <= 0) {
        this.validationMessages.update(
          (existing: UploadValidationMessage[]): UploadValidationMessage[] => [
            ...existing,
            {
              summary: 'File limit exceeded',
              detail: this.invalidFileLimitMessage().replace('{0}', String(limit)),
            },
          ]
        );
        return;
      }
      filesToAdd = validFiles.slice(0, remainingSlots);
    }

    // Single-file mode: replace the existing file rather than appending.
    if (!this.multiple()) {
      this.revokeAllObjectUrls();
      filesToAdd = filesToAdd.slice(0, 1);
    }

    const newItems: UploadFileItem[] = filesToAdd.map(
      (file: File): UploadFileItem => ({
        file,
        objectUrl: this.isImage(file) ? URL.createObjectURL(file) : null,
      })
    );

    this.internalFiles.update((existing: UploadFileItem[]): UploadFileItem[] =>
      this.multiple() ? [...existing, ...newItems] : newItems
    );

    const allCurrentFiles: File[] = this.internalFiles().map(
      (item: UploadFileItem): File => item.file
    );

    this.fileSelect.emit({
      originalEvent,
      files: filesToAdd,
      currentFiles: allCurrentFiles,
    });

    // Auto-upload in custom mode: emit uploadHandler immediately.
    if (this.auto() && this.customUpload()) {
      this.uploadHandler.emit({ files: allCurrentFiles });
    }
  }

  /**
   * Validates a single file against `maxFileSize` and `accept`.
   * Returns a `UploadValidationMessage` on failure, or `null` when valid.
   */
  private validateFile(file: File): UploadValidationMessage | null {
    const maxSize: number | null = this.maxFileSize();
    if (maxSize !== null && file.size > maxSize) {
      return {
        summary: 'Invalid file size',
        detail: this.invalidFileSizeMessage()
          .replace('{0}', file.name)
          .replace('{1}', this.formatSize(maxSize)),
      };
    }

    const acceptValue: string = this.accept();
    if (acceptValue && !this.isFileTypeAccepted(file, acceptValue)) {
      return {
        summary: 'Invalid file type',
        detail: this.invalidFileTypeMessage().replace('{0}', file.name).replace('{1}', acceptValue),
      };
    }

    return null;
  }

  /**
   * Returns `true` when `file` matches at least one pattern in the
   * comma-separated `accept` string.
   */
  private isFileTypeAccepted(file: File, accept: string): boolean {
    const patterns: string[] = accept.split(',').map((pattern: string): string => pattern.trim());
    return patterns.some((pattern: string): boolean => {
      if (pattern.startsWith('.')) {
        return file.name.toLowerCase().endsWith(pattern.toLowerCase());
      }
      if (pattern.endsWith('/*')) {
        // Wildcard MIME group (e.g. "image/*")
        return file.type.startsWith(pattern.slice(0, -1));
      }
      return file.type === pattern;
    });
  }

  /** Clears the queue and revokes all blob URLs. */
  private clearAllFiles(): void {
    this.revokeAllObjectUrls();
    this.internalFiles.set([]);
    this.validationMessages.set([]);
  }

  /** Revokes every active blob URL to release browser memory. */
  private revokeAllObjectUrls(): void {
    for (const item of this.internalFiles()) {
      if (item.objectUrl !== null) {
        URL.revokeObjectURL(item.objectUrl);
      }
    }
  }
}
