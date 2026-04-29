import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { TEXTAREA_DEFAULTS } from './textarea.types';
import type { TextareaResize, TextareaSize, TextareaVariant } from './textarea.types';

export type { TextareaVariant, TextareaSize, TextareaResize } from './textarea.types';
export { TEXTAREA_DEFAULTS } from './textarea.types';

let textareaIdCounter: number = 0;

/** Event payload emitted when the textarea value changes. */
export interface TextareaChangeEvent {
  /** The new string value of the textarea. */
  value: string;
  /** The native DOM input event that triggered the change. */
  originalEvent: Event;
}

/**
 * Multi-line text input with optional auto-resize, character counter,
 * floating-label support, three design variants, three sizes, and full
 * ControlValueAccessor integration (ngModel + reactive forms).
 */
@Component({
  selector: 'ui-lib-textarea',
  standalone: true,
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof UiLibTextarea => UiLibTextarea),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class UiLibTextarea implements ControlValueAccessor {
  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------

  /** Design variant override. When null the active global theme variant is used. */
  public readonly variant: InputSignal<TextareaVariant | null> = input<TextareaVariant | null>(
    TEXTAREA_DEFAULTS.variant
  );

  /** Size token -- controls padding and font size. */
  public readonly size: InputSignal<TextareaSize> = input<TextareaSize>(TEXTAREA_DEFAULTS.size);

  /** Accessible label rendered above the textarea. */
  public readonly label: InputSignal<string> = input<string>('');

  /** Placeholder text shown inside the textarea when it is empty. */
  public readonly placeholder: InputSignal<string> = input<string>(TEXTAREA_DEFAULTS.placeholder);

  /** Explicit id forwarded to the native textarea element. */
  public readonly inputId: InputSignal<string | null> = input<string | null>(null);

  /** name attribute forwarded to the native textarea element. */
  public readonly name: InputSignal<string | null> = input<string | null>(null);

  /** Number of visible text rows. */
  public readonly rows: InputSignal<number> = input<number>(TEXTAREA_DEFAULTS.rows);

  /** Number of visible text columns. */
  public readonly cols: InputSignal<number | null> = input<number | null>(TEXTAREA_DEFAULTS.cols);

  /** CSS resize behaviour. Use 'auto' to enable JS-driven auto-resize. */
  public readonly resize: InputSignal<TextareaResize> = input<TextareaResize>(
    TEXTAREA_DEFAULTS.resize
  );

  /** When true, the textarea grows in height automatically to fit its content. */
  public readonly autoResize: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.autoResize);

  /** Whether the textarea is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.disabled);

  /** Whether the textarea is read-only (focusable but not editable). */
  public readonly readonly: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.readonly);

  /** Whether the field is required. */
  public readonly required: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.required);

  /** When true, renders a character counter below the textarea. */
  public readonly showCounter: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.showCounter);

  /** Maximum allowed character length -- also sets maxlength on the native element. */
  public readonly maxLength: InputSignal<number | null> = input<number | null>(
    TEXTAREA_DEFAULTS.maxLength
  );

  /** Error message rendered below the textarea and announced to screen readers. */
  public readonly error: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emits on every user-driven value change. */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onInput: OutputEmitterRef<TextareaChangeEvent> = output<TextareaChangeEvent>();

  /** Emits when the textarea loses focus. */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /** Emits when the textarea gains focus. */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  // ---------------------------------------------------------------------------
  // ViewChild
  // ---------------------------------------------------------------------------

  private readonly textareaRef: Signal<ElementRef<HTMLTextAreaElement> | undefined> =
    viewChild<ElementRef<HTMLTextAreaElement>>('textareaRef');

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  protected readonly value: WritableSignal<string> = signal<string>('');
  protected readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  private onCvaChange: (value: string) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ---------------------------------------------------------------------------
  // Computed signals
  // ---------------------------------------------------------------------------

  protected readonly effectiveVariant: Signal<TextareaVariant> = computed<TextareaVariant>(
    (): TextareaVariant => this.variant() ?? this.themeConfig.variant()
  );

  protected readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  protected readonly controlId: Signal<string> = computed<string>(
    (): string => this.inputId() ?? `ui-lib-textarea-${++textareaIdCounter}`
  );

  protected readonly describedById: Signal<string | undefined> = computed<string | undefined>(
    (): string | undefined => (this.error() ? `${this.controlId()}-error` : undefined)
  );

  protected readonly currentLength: Signal<number> = computed<number>(
    (): number => this.value().length
  );

  /** The resize CSS value applied to the native textarea. Auto-resize mode uses 'none'. */
  protected readonly nativeResize: Signal<string> = computed<string>((): string =>
    this.autoResize() ? 'none' : this.resize()
  );

  protected readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-textarea',
      `ui-lib-textarea--variant-${this.effectiveVariant()}`,
      `ui-lib-textarea--size-${this.size()}`,
    ];

    if (this.isDisabled()) {
      classes.push('ui-lib-textarea--disabled');
    }

    if (this.readonly()) {
      classes.push('ui-lib-textarea--readonly');
    }

    if (this.isFocused()) {
      classes.push('ui-lib-textarea--focused');
    }

    if (this.error()) {
      classes.push('ui-lib-textarea--error');
    }

    if (this.value().length > 0) {
      classes.push('ui-lib-textarea--filled');
      // Emitted so FloatLabel integration works (uilib-filled host class convention)
      classes.push('uilib-filled');
    }

    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });

  // ---------------------------------------------------------------------------
  // Constructor -- auto-resize effect
  // ---------------------------------------------------------------------------

  constructor() {
    // Re-measure whenever value changes and autoResize is on
    effect((): void => {
      if (!this.autoResize()) {
        return;
      }
      // Read value() so the effect re-runs on every change
      this.value();
      this.adjustHeight();
    });
  }

  // ---------------------------------------------------------------------------
  // ControlValueAccessor
  // ---------------------------------------------------------------------------

  public writeValue(value: unknown): void {
    this.value.set(typeof value === 'string' ? value : '');
    // After the next microtask the DOM will have updated; resize if needed
    if (this.autoResize()) {
      void Promise.resolve().then((): void => {
        this.adjustHeight();
      });
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onCvaChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ---------------------------------------------------------------------------
  // Event handlers -- called from template
  // ---------------------------------------------------------------------------

  public handleInput(event: Event): void {
    const target: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    const newValue: string = target.value;
    this.value.set(newValue);
    this.onCvaChange(newValue);
    this.onInput.emit({ value: newValue, originalEvent: event });
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  public handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.onFocus.emit(event);
  }

  public handleBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onCvaTouched();
    this.onBlur.emit(event);
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private adjustHeight(): void {
    const elementRef: ElementRef<HTMLTextAreaElement> | undefined = this.textareaRef();
    if (!elementRef) {
      return;
    }
    const element: HTMLTextAreaElement = elementRef.nativeElement;
    // Reset first so shrinking works correctly
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }
}
