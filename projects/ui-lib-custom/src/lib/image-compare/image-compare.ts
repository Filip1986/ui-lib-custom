import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
  type ElementRef,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  IMAGE_COMPARE_ARIA_LABEL,
  IMAGE_COMPARE_DEFAULT_VALUE,
  IMAGE_COMPARE_KEYBOARD_LARGE_STEP,
  IMAGE_COMPARE_KEYBOARD_STEP,
  IMAGE_COMPARE_MAX,
  IMAGE_COMPARE_MIN,
} from './image-compare.constants';
import type { ImageCompareSize, ImageCompareVariant } from './image-compare.types';

export type { ImageCompareSize, ImageCompareVariant } from './image-compare.types';

/**
 * ImageCompare component — renders two images with a draggable slider divider
 * so the user can compare a "before" (left) and "after" (right) image.
 *
 * The `value` model (0–100) represents the percentage from the left edge where
 * the divider is positioned. Supports keyboard navigation (ArrowLeft/Right,
 * PageUp/Down, Home/End), pointer capture for smooth dragging, three design
 * variants, three size tokens, and full CSS-variable theming.
 *
 * @example
 * ```html
 * <ui-lib-image-compare
 *   leftImage="/before.jpg"
 *   leftAlt="Before"
 *   rightImage="/after.jpg"
 *   rightAlt="After"
 * />
 * ```
 */
@Component({
  selector: 'ui-lib-image-compare',
  standalone: true,
  templateUrl: './image-compare.html',
  styleUrl: './image-compare.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ImageCompareComponent {
  // ─── Injected services ───────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  // ─── View queries ────────────────────────────────────────────────────────────

  /** Reference to the container element used to compute drag percentages. */
  private readonly containerRef: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('compareContainer');

  // ─── Inputs ──────────────────────────────────────────────────────────────────

  /** URL of the left (before) image. */
  public readonly leftImage: InputSignal<string> = input<string>('');

  /** Accessible alt text for the left image. */
  public readonly leftAlt: InputSignal<string> = input<string>('');

  /** URL of the right (after) image. */
  public readonly rightImage: InputSignal<string> = input<string>('');

  /** Accessible alt text for the right image. */
  public readonly rightAlt: InputSignal<string> = input<string>('');

  /** Design variant; inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<ImageCompareVariant | null> =
    input<ImageCompareVariant | null>(null);

  /** Component size token. */
  public readonly size: InputSignal<ImageCompareSize> = input<ImageCompareSize>('md');

  /** When true, pointer interaction is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the slider handle. */
  public readonly ariaLabel: InputSignal<string> = input<string>(IMAGE_COMPARE_ARIA_LABEL);

  // ─── Two-way binding ─────────────────────────────────────────────────────────

  /**
   * Slider position as a percentage (0–100) from the left edge.
   * Supports two-way binding: `[(value)]="position"`.
   */
  public readonly value: ModelSignal<number> = model<number>(IMAGE_COMPARE_DEFAULT_VALUE);

  // ─── Outputs ─────────────────────────────────────────────────────────────────

  /** Emitted when the user starts dragging the handle. */
  public readonly slideStart: OutputEmitterRef<number> = output<number>();

  /** Emitted when the user releases the handle after dragging. */
  public readonly slideEnd: OutputEmitterRef<number> = output<number>();

  // ─── Internal state ──────────────────────────────────────────────────────────

  /** True while the user is dragging the handle. */
  public readonly isDragging: WritableSignal<boolean> = signal<boolean>(false);

  /** True while the handle has focus. */
  public readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);

  // ─── Private fields ──────────────────────────────────────────────────────────

  private readonly boundPointerMove: (event: PointerEvent) => void = this.onPointerMove.bind(this);
  private readonly boundPointerUp: (event: PointerEvent) => void = this.onPointerUp.bind(this);

  // ─── Computed ────────────────────────────────────────────────────────────────

  /** Resolved design variant — falls back to the global theme variant when null. */
  public readonly effectiveVariant: Signal<ImageCompareVariant> = computed<ImageCompareVariant>(
    (): ImageCompareVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Clamped slider value (0–100). */
  public readonly clampedValue: Signal<number> = computed<number>((): number =>
    Math.min(IMAGE_COMPARE_MAX, Math.max(IMAGE_COMPARE_MIN, this.value()))
  );

  /** CSS `left` percentage string for the handle/divider. */
  public readonly handlePosition: Signal<string> = computed<string>(
    (): string => `${this.clampedValue()}%`
  );

  /** Clip path for the right image — shows the portion to the right of the divider. */
  public readonly rightClipPath: Signal<string> = computed<string>(
    (): string => `inset(0 0 0 ${this.clampedValue()}%)`
  );

  /** Composite CSS class string applied via the host binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-image-compare',
      `ui-lib-image-compare--variant-${this.effectiveVariant()}`,
      `ui-lib-image-compare--size-${this.size()}`,
    ];

    if (this.disabled()) {
      classes.push('ui-lib-image-compare--disabled');
    }

    if (this.isDragging()) {
      classes.push('ui-lib-image-compare--dragging');
    }

    if (this.isFocused()) {
      classes.push('ui-lib-image-compare--focused');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  // ─── Constructor ─────────────────────────────────────────────────────────────

  constructor() {
    this.destroyRef.onDestroy((): void => {
      this.removeGlobalListeners();
    });
  }

  // ─── Event handlers ──────────────────────────────────────────────────────────

  /** Begin dragging when the handle receives a pointer-down event. */
  public onHandlePointerDown(event: PointerEvent): void {
    if (this.disabled()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.isDragging.set(true);
    this.slideStart.emit(this.clampedValue());

    document.addEventListener('pointermove', this.boundPointerMove);
    document.addEventListener('pointerup', this.boundPointerUp);
  }

  /** Allow clicking anywhere on the container to reposition the divider. */
  public onContainerPointerDown(event: PointerEvent): void {
    if (this.disabled()) {
      return;
    }

    const target: HTMLElement = event.target as HTMLElement;
    if (
      target.classList.contains('uilib-image-compare__handle') ||
      target.closest('.uilib-image-compare__handle')
    ) {
      return;
    }

    const percent: number = this.getPercentFromEvent(event);
    this.value.set(percent);
  }

  /** Keyboard navigation on the handle element. */
  public onHandleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    let handled: boolean = true;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        this.adjustValue(IMAGE_COMPARE_KEYBOARD_STEP);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        this.adjustValue(-IMAGE_COMPARE_KEYBOARD_STEP);
        break;
      case 'PageUp':
        this.adjustValue(IMAGE_COMPARE_KEYBOARD_LARGE_STEP);
        break;
      case 'PageDown':
        this.adjustValue(-IMAGE_COMPARE_KEYBOARD_LARGE_STEP);
        break;
      case 'Home':
        this.value.set(IMAGE_COMPARE_MIN);
        break;
      case 'End':
        this.value.set(IMAGE_COMPARE_MAX);
        break;
      default:
        handled = false;
        break;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  /** Track focus state for visual feedback. */
  public onHandleFocus(): void {
    this.isFocused.set(true);
  }

  /** Clear focus state. */
  public onHandleBlur(): void {
    this.isFocused.set(false);
  }

  // ─── Private helpers ─────────────────────────────────────────────────────────

  private onPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) {
      return;
    }

    const percent: number = this.getPercentFromEvent(event);
    this.value.set(percent);
  }

  private onPointerUp(event: PointerEvent): void {
    if (!this.isDragging()) {
      return;
    }

    this.isDragging.set(false);
    this.slideEnd.emit(this.clampedValue());
    this.removeGlobalListeners();

    void event;
  }

  private removeGlobalListeners(): void {
    document.removeEventListener('pointermove', this.boundPointerMove);
    document.removeEventListener('pointerup', this.boundPointerUp);
  }

  /** Compute the pointer position as a percentage (0–100) within the container. */
  private getPercentFromEvent(event: PointerEvent): number {
    const container: ElementRef<HTMLElement> | undefined = this.containerRef();
    if (!container) {
      return this.clampedValue();
    }

    const rect: DOMRect = container.nativeElement.getBoundingClientRect();
    if (rect.width === 0) {
      return this.clampedValue();
    }

    const rawPercent: number = ((event.clientX - rect.left) / rect.width) * 100;
    return Math.min(IMAGE_COMPARE_MAX, Math.max(IMAGE_COMPARE_MIN, rawPercent));
  }

  /** Add or subtract a delta from the current value, clamped to [0, 100]. */
  private adjustValue(delta: number): void {
    const next: number = Math.min(
      IMAGE_COMPARE_MAX,
      Math.max(IMAGE_COMPARE_MIN, this.clampedValue() + delta)
    );
    this.value.set(next);
  }
}
