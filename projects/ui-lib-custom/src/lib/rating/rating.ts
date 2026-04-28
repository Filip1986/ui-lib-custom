import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { RatingVariant, RatingSize, RatingChangeEvent } from './rating.types';

export type { RatingVariant, RatingSize, RatingChangeEvent } from './rating.types';

let ratingIdCounter: number = 0;

/**
 * Rating component that lets users select a star value from 1 to N via click or keyboard.
 * Implements ControlValueAccessor for ngModel and reactive form integration.
 */
@Component({
  selector: 'ui-lib-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof Rating => Rating),
      multi: true,
    },
  ],
  host: {
    role: 'radiogroup',
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class Rating implements ControlValueAccessor {
  /** Number of star icons to render. */
  public readonly stars: InputSignal<number> = input<number>(5);
  /** When true, a cancel button is shown to clear the current value. */
  public readonly cancel: InputSignal<boolean> = input<boolean>(true);
  /** Disables the component entirely. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  /** Makes the component read-only: visible but not interactive. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  /** Accessible label for the radiogroup element. */
  public readonly ariaLabel: InputSignal<string> = input<string>('Rating');
  /** Explicit aria-labelledby override; overrides ariaLabel when set. */
  public readonly ariaLabelledby: InputSignal<string | null> = input<string | null>(null);
  /** Custom CSS class appended to a filled star icon. */
  public readonly iconOnClass: InputSignal<string | null> = input<string | null>(null);
  /** Custom CSS class appended to an empty star icon. */
  public readonly iconOffClass: InputSignal<string | null> = input<string | null>(null);
  /** Custom CSS class appended to the cancel icon. */
  public readonly iconCancelClass: InputSignal<string | null> = input<string | null>(null);
  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<RatingVariant | null> = input<RatingVariant | null>(null);
  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<RatingSize> = input<RatingSize>('md');

  /** Current rating value. Supports two-way binding via [(value)]. */
  public readonly value: ModelSignal<number | null> = model<number | null>(null);

  /** Emitted whenever the rating value changes (including clears). */
  public readonly change: OutputEmitterRef<RatingChangeEvent> = output<RatingChangeEvent>();

  /** Disabled state propagated by a parent form control. */
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Tracks which star the pointer is currently over; drives the hover-preview fill.
   * Null when the pointer is not over any star.
   */
  private readonly hoverValue: WritableSignal<number | null> = signal<number | null>(null);

  private onCvaChange: (value: number | null) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  /** Unique id prefix used for accessibility identifiers on this instance. */
  public readonly controlId: string = `ui-lib-rating-${++ratingIdCounter}`;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  /** Resolved variant — falls back to global theme when not explicitly set. */
  public readonly effectiveVariant: Signal<RatingVariant> = computed<RatingVariant>(
    (): RatingVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** True when the component is disabled via input or a parent form control. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  /** Array of star positions [1 … stars]. */
  public readonly starsArray: Signal<number[]> = computed<number[]>((): number[] =>
    Array.from({ length: this.stars() }, (_element: unknown, index: number): number => index + 1)
  );

  /** Host CSS classes derived from current variant, size, and state. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-rating',
      `ui-lib-rating--variant-${this.effectiveVariant()}`,
      `ui-lib-rating--size-${this.size()}`,
    ];

    if (this.isDisabled()) {
      classes.push('ui-lib-rating--disabled');
    }

    if (this.readonly()) {
      classes.push('ui-lib-rating--readonly');
    }

    return classes.join(' ');
  });

  // ── Public helpers used in the template ──────────────────────────────────

  /**
   * Returns true when a star should appear filled — either because it falls
   * within the current hover preview or within the committed value.
   */
  public isStarActive(star: number): boolean {
    const displayValue: number | null = this.hoverValue() ?? this.value();
    return displayValue !== null && star <= displayValue;
  }

  /**
   * Returns true when this star IS the committed value (used for aria-checked).
   * Visually filling the star below the selection does not make it "checked".
   */
  public isStarChecked(star: number): boolean {
    const currentValue: number | null = this.value();
    return currentValue !== null && star === currentValue;
  }

  /**
   * Roving tabindex: the active star (or the first star when nothing is
   * selected) receives tabindex=0; all others receive -1.
   */
  public getStarTabIndex(star: number): number {
    if (this.isDisabled()) {
      return -1;
    }

    const currentValue: number | null = this.value();
    if (currentValue === null) {
      return star === 1 ? 0 : -1;
    }

    return star === currentValue ? 0 : -1;
  }

  /** Cancel button tab index — removed from tab order when disabled. */
  public getCancelTabIndex(): number {
    return this.isDisabled() ? -1 : 0;
  }

  /** Human-readable aria-label for a single star element. */
  public getStarAriaLabel(star: number): string {
    return `${star} of ${this.stars()}`;
  }

  /** CSS classes for the star icon element, merging the custom icon class when provided. */
  public getStarIconClass(star: number): string {
    const baseClass: string = 'ui-lib-rating__star-icon';
    const customClass: string | null = this.isStarActive(star)
      ? this.iconOnClass()
      : this.iconOffClass();

    return customClass ? `${baseClass} ${customClass}` : baseClass;
  }

  /** CSS classes for the cancel icon element, merging the custom icon class when provided. */
  public getCancelIconClass(): string {
    const baseClass: string = 'ui-lib-rating__cancel-icon';
    const customClass: string | null = this.iconCancelClass();
    return customClass ? `${baseClass} ${customClass}` : baseClass;
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  /** Handles clicks on a star element. */
  public onStarClick(star: number, event: Event): void {
    event.preventDefault();

    if (this.isDisabled() || this.readonly()) {
      return;
    }

    this.applyRating(star, event);
  }

  /** Handles clicks on the cancel/clear button. */
  public onCancelClick(event: Event): void {
    event.preventDefault();

    if (this.isDisabled() || this.readonly()) {
      return;
    }

    this.clearRating(event);
  }

  /** Sets the hover-preview value when the pointer enters a star. */
  public onStarHover(star: number): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    this.hoverValue.set(star);
  }

  /** Clears the hover-preview when the pointer leaves a star. */
  public onStarLeave(): void {
    this.hoverValue.set(null);
  }

  /**
   * Keyboard handler on the host radiogroup element.
   *
   * | Key              | Action                                              |
   * |---|---|
   * | ArrowRight / Up  | Increase rating by one (max = stars())              |
   * | ArrowLeft / Down | Decrease rating by one (min = 1)                    |
   * | Delete / Backspace | Clear rating (when cancel is enabled)             |
   * | 1–9              | Set rating to that digit (if within stars() range)  |
   */
  public onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    const currentValue: number = this.value() ?? 0;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp': {
        event.preventDefault();
        this.applyRating(Math.min(currentValue + 1, this.stars()), event);
        break;
      }
      case 'ArrowLeft':
      case 'ArrowDown': {
        event.preventDefault();
        if (currentValue > 1) {
          this.applyRating(currentValue - 1, event);
        }

        break;
      }
      case 'Delete':
      case 'Backspace': {
        event.preventDefault();
        if (this.cancel()) {
          this.clearRating(event);
        }

        break;
      }
      default: {
        const digit: number = parseInt(event.key, 10);
        if (!isNaN(digit) && digit >= 1 && digit <= this.stars()) {
          event.preventDefault();
          this.applyRating(digit, event);
        }

        break;
      }
    }
  }

  // ── ControlValueAccessor ────────────────────────────────────────────────

  /** Receives the committed value from the parent form control. */
  public writeValue(value: number | null): void {
    this.value.set(value);
  }

  /** Registers the CVA onChange callback. */
  public registerOnChange(fn: (value: number | null) => void): void {
    this.onCvaChange = fn;
  }

  /** Registers the CVA onTouched callback. */
  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  /** Applies disabled state propagated by the parent form group. */
  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private applyRating(star: number, event: Event): void {
    this.value.set(star);
    this.onCvaChange(star);
    this.onCvaTouched();
    this.change.emit({ value: star, originalEvent: event });
  }

  private clearRating(event: Event): void {
    this.value.set(null);
    this.onCvaChange(null);
    this.onCvaTouched();
    this.change.emit({ value: null, originalEvent: event });
  }
}
