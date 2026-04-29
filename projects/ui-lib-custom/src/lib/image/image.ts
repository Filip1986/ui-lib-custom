import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  model,
  input,
  output,
  signal,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  type TemplateRef,
  type WritableSignal,
} from '@angular/core';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
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
import type { ImageSize, ImageVariant } from './image.types';

export type { ImageSize, ImageVariant } from './image.types';

let imageIdCounter: number = 0;

/**
 * Image component with optional preview overlay, zoom, and rotation controls.
 *
 * When `preview` is enabled, clicking the image opens a full-screen overlay
 * where the user can zoom in/out and rotate the image.  A hover indicator
 * (eye icon by default) signals that the image is clickable.
 *
 * Content slots:
 * - `<ng-template #imageIndicator>` — custom preview-trigger icon overlay
 * - `<ng-template #imageError>` — custom content shown when the image fails to load
 *
 * @example
 * ```html
 * <ui-lib-image src="/photo.jpg" alt="A photo" [preview]="true" />
 * ```
 */
@Component({
  selector: 'ui-lib-image',
  standalone: true,
  imports: [NgTemplateOutlet, NgStyle],
  templateUrl: './image.html',
  styleUrl: './image.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ImageComponent {
  // ─── Injected services ───────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ─── Content queries ─────────────────────────────────────────────────────────

  /** Custom template shown as the hover indicator when preview is enabled. */
  public readonly indicatorTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('imageIndicator');

  /** Custom template rendered when the image fails to load. */
  public readonly errorTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('imageError');

  // ─── Inputs ──────────────────────────────────────────────────────────────────

  /** URL of the image to display. */
  public readonly src: InputSignal<string> = input<string>('');

  /** Accessible alt text for the image. */
  public readonly alt: InputSignal<string> = input<string>('');

  /** Width attribute passed to the underlying `<img>` element. */
  public readonly width: InputSignal<string | null> = input<string | null>(null);

  /** Height attribute passed to the underlying `<img>` element. */
  public readonly height: InputSignal<string | null> = input<string | null>(null);

  /** When true, clicking the image opens a preview overlay. */
  public readonly preview: InputSignal<boolean> = input<boolean>(false);

  /** Inline style object applied to the `<img>` element. */
  public readonly imageStyle: InputSignal<Record<string, string> | null> = input<Record<
    string,
    string
  > | null>(null);

  /** Extra CSS class(es) applied to the `<img>` element. */
  public readonly imageClass: InputSignal<string | null> = input<string | null>(null);

  /** Fallback src displayed when the image fails to load and no error template is provided. */
  public readonly errorSrc: InputSignal<string | null> = input<string | null>(null);

  /** Design variant; inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<ImageVariant | null> = input<ImageVariant | null>(null);

  /** Component size token. */
  public readonly size: InputSignal<ImageSize> = input<ImageSize>('md');

  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the preview button indicator. */
  public readonly ariaLabel: InputSignal<string> = input<string>(IMAGE_ARIA_PREVIEW_LABEL);

  // ─── Two-way bindings ─────────────────────────────────────────────────────────

  /** Preview overlay visibility — supports two-way binding. */
  public readonly previewVisible: ModelSignal<boolean> = model<boolean>(false);

  // ─── Outputs ─────────────────────────────────────────────────────────────────

  /** Emitted when the image finishes loading. */
  public readonly loadEvent: OutputEmitterRef<Event> = output<Event>();

  /** Emitted when the image fails to load. */
  public readonly errorEvent: OutputEmitterRef<Event> = output<Event>();

  // ─── Internal state ───────────────────────────────────────────────────────────

  /** True while the pointer is over the image wrapper. */
  public readonly isHovered: WritableSignal<boolean> = signal<boolean>(false);

  /** True when the image has failed to load. */
  public readonly hasError: WritableSignal<boolean> = signal<boolean>(false);

  /** Current fallback src used when hasError is true and errorSrc is set. */
  public readonly activeSrc: WritableSignal<string> = signal<string>('');

  /** Zoom scale in the preview overlay. */
  public readonly zoomScale: WritableSignal<number> = signal<number>(1);

  /** Rotation angle in the preview overlay. */
  public readonly rotateAngle: WritableSignal<number> = signal<number>(0);

  public readonly componentId: string = `ui-lib-image-${++imageIdCounter}`;

  // ─── ARIA label constants exposed to the template ─────────────────────────────

  public readonly closeAriaLabel: string = IMAGE_ARIA_CLOSE_LABEL;
  public readonly zoomInAriaLabel: string = IMAGE_ARIA_ZOOM_IN_LABEL;
  public readonly zoomOutAriaLabel: string = IMAGE_ARIA_ZOOM_OUT_LABEL;
  public readonly rotateLeftAriaLabel: string = IMAGE_ARIA_ROTATE_LEFT_LABEL;
  public readonly rotateRightAriaLabel: string = IMAGE_ARIA_ROTATE_RIGHT_LABEL;

  // ─── Computed ────────────────────────────────────────────────────────────────

  /** Resolved design variant — falls back to the global theme variant when null. */
  public readonly effectiveVariant: Signal<ImageVariant> = computed<ImageVariant>(
    (): ImageVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** True when the zoom scale has reached the maximum. */
  public readonly zoomInDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.zoomScale() >= IMAGE_ZOOM_MAX
  );

  /** True when the zoom scale has reached the minimum. */
  public readonly zoomOutDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.zoomScale() <= IMAGE_ZOOM_MIN
  );

  /** CSS transform string applied to the preview image. */
  public readonly previewTransform: Signal<string> = computed<string>(
    (): string => `scale(${this.zoomScale()}) rotate(${this.rotateAngle()}deg)`
  );

  /** Composite CSS class string applied via the host binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-image',
      `ui-lib-image--variant-${this.effectiveVariant()}`,
      `ui-lib-image--size-${this.size()}`,
    ];

    if (this.preview()) {
      classes.push('ui-lib-image--previewable');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  /** Resolved CSS class string for the `<img>` element. */
  public readonly imgClasses: Signal<string> = computed<string>((): string => {
    const base: string = 'uilib-image__img';
    const extra: string | null = this.imageClass();
    return extra ? `${base} ${extra}` : base;
  });

  // ─── Event handlers ───────────────────────────────────────────────────────────

  /** Handle successful image load. */
  public onLoad(event: Event): void {
    this.loadEvent.emit(event);
  }

  /** Handle image load error — switch to error state or fallback src. */
  public onError(event: Event): void {
    const fallback: string | null = this.errorSrc();
    if (fallback && this.activeSrc() !== fallback) {
      this.activeSrc.set(fallback);
    } else {
      this.hasError.set(true);
    }
    this.errorEvent.emit(event);
  }

  /** Track pointer entering the image wrapper. */
  public onMouseEnter(): void {
    this.isHovered.set(true);
  }

  /** Track pointer leaving the image wrapper. */
  public onMouseLeave(): void {
    this.isHovered.set(false);
  }

  // ─── Preview controls ─────────────────────────────────────────────────────────

  /** Open the preview overlay and reset transform state. */
  public openPreview(): void {
    this.zoomScale.set(1);
    this.rotateAngle.set(0);
    this.previewVisible.set(true);
  }

  /** Close the preview overlay. */
  public closePreview(): void {
    this.previewVisible.set(false);
  }

  /** Close the overlay when clicking the backdrop (outside the image). */
  public onMaskClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('uilib-image__mask')) {
      this.closePreview();
    }
  }

  /** Keyboard handler for the preview overlay — Escape closes. */
  public onMaskKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePreview();
    }
  }

  /** Increase zoom scale by one step, clamped to the maximum. */
  public zoomIn(): void {
    const next: number = Math.min(
      parseFloat((this.zoomScale() + IMAGE_ZOOM_STEP).toFixed(2)),
      IMAGE_ZOOM_MAX
    );
    this.zoomScale.set(next);
  }

  /** Decrease zoom scale by one step, clamped to the minimum. */
  public zoomOut(): void {
    const next: number = Math.max(
      parseFloat((this.zoomScale() - IMAGE_ZOOM_STEP).toFixed(2)),
      IMAGE_ZOOM_MIN
    );
    this.zoomScale.set(next);
  }

  /** Rotate the preview image 90 degrees counter-clockwise. */
  public rotateLeft(): void {
    this.rotateAngle.set(this.rotateAngle() - IMAGE_ROTATE_STEP);
  }

  /** Rotate the preview image 90 degrees clockwise. */
  public rotateRight(): void {
    this.rotateAngle.set(this.rotateAngle() + IMAGE_ROTATE_STEP);
  }
}
