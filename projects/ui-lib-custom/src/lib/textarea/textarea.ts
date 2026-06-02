import type {
  AfterContentInit,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { TextareaResize, TextareaSize, TextareaVariant } from './textarea.types';
import { TEXTAREA_DEFAULTS } from './textarea.types';

export type { TextareaResize, TextareaSize, TextareaVariant } from './textarea.types';
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
export class UiLibTextarea implements AfterContentInit, ControlValueAccessor {
  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------

  /** Design variant override. When null the active global theme variant is used. */
  public readonly variant: InputSignal<TextareaVariant | null> = input<TextareaVariant | null>(
    TEXTAREA_DEFAULTS.variant,
  );

  /** Size token -- controls padding and font size. */
  public readonly size: InputSignal<TextareaSize> = input<TextareaSize>(TEXTAREA_DEFAULTS.size);

  /** Accessible label rendered above the textarea. */
  public readonly label: InputSignal<string> = input<string>('');

  /** Accessible label used when no visible label is rendered. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Space-separated ids of visible label elements for accessible-name composition. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /** Placeholder text shown inside the textarea when it is empty. */
  public readonly placeholder: InputSignal<string> = input<string>(TEXTAREA_DEFAULTS.placeholder);

  /** Explicit id forwarded to the native textarea element. */
  public readonly inputId: InputSignal<string | null> = input<string | null>(null);

  /** name attribute forwarded to the native textarea element. */
  public readonly name: InputSignal<string | null> = input<string | null>(null);

  /** Number of visible text rows. */
  public readonly rows: InputSignal<number> = input<number>(TEXTAREA_DEFAULTS.rows);

  /** Maximum number of text rows before auto-resize enables internal scrolling. */
  public readonly maxRows: InputSignal<number | null> = input<number | null>(
    TEXTAREA_DEFAULTS.maxRows,
  );

  /** Number of visible text columns. */
  public readonly cols: InputSignal<number | null> = input<number | null>(TEXTAREA_DEFAULTS.cols);

  /** CSS resize behaviour. Use 'auto' to enable JS-driven auto-resize. */
  public readonly resize: InputSignal<TextareaResize> = input<TextareaResize>(
    TEXTAREA_DEFAULTS.resize,
  );

  /** When true, the textarea grows in height automatically to fit its content. */
  public readonly autoResize: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.autoResize);

  /** Whether the textarea is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.disabled);

  /** Whether the textarea is read-only (focusable but not editable). */
  public readonly readonly: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.readonly);

  /** Whether the field is required. */
  public readonly required: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.required);

  /** Whether the control should expose validation error semantics. */
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);

  /** When true, renders a character counter below the textarea. */
  public readonly showCounter: InputSignal<boolean> = input<boolean>(TEXTAREA_DEFAULTS.showCounter);

  /** Maximum allowed character length -- also sets maxlength on the native element. */
  public readonly maxLength: InputSignal<number | null> = input<number | null>(
    TEXTAREA_DEFAULTS.maxLength,
  );

  /** Error message rendered below the textarea and announced to screen readers. */
  public readonly error: InputSignal<string | null> = input<string | null>(null);

  /** Hint text rendered below the textarea and associated through aria-describedby. */
  public readonly hint: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /**
   * Emits on every user-driven value change.
   * Named `valueChange` (not `input`) to avoid shadowing the native DOM `input` event
   * that bubbles from the inner `<textarea>` element.
   */
  public readonly valueChange: OutputEmitterRef<TextareaChangeEvent> =
    output<TextareaChangeEvent>();

  /**
   * Emits when the textarea loses focus.
   * Named `textareaBlur` (not `blur`) to avoid shadowing the native DOM `blur` event.
   */
  public readonly textareaBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /**
   * Emits when the textarea gains focus.
   * Named `textareaFocus` (not `focus`) to avoid shadowing the native DOM `focus` event.
   */
  public readonly textareaFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

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
  protected readonly hasProjectedError: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly hasProjectedHint: WritableSignal<boolean> = signal<boolean>(false);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  private onCvaChange: (value: string) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  // ---------------------------------------------------------------------------
  // Computed signals
  // ---------------------------------------------------------------------------

  protected readonly textareaId: string;

  protected readonly effectiveVariant: Signal<TextareaVariant> = computed<TextareaVariant>(
    (): TextareaVariant => this.variant() ?? this.themeConfig.variant(),
  );

  protected readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled(),
  );

  protected readonly controlId: Signal<string> = computed<string>(
    (): string => this.inputId() ?? this.textareaId,
  );

  protected readonly errorId: Signal<string> = computed<string>(
    (): string => `${this.controlId()}-error`,
  );

  protected readonly hintId: Signal<string> = computed<string>(
    (): string => `${this.controlId()}-hint`,
  );

  protected readonly isInvalid: Signal<boolean> = computed<boolean>(
    (): boolean => this.invalid() || Boolean(this.error()),
  );

  protected readonly showErrorRegion: Signal<boolean> = computed<boolean>(
    (): boolean => this.isInvalid() && (Boolean(this.error()) || this.hasProjectedError()),
  );

  protected readonly showHintRegion: Signal<boolean> = computed<boolean>(
    (): boolean => Boolean(this.hint()) || this.hasProjectedHint(),
  );

  protected readonly ariaDescribedBy: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const ids: string[] = [];
      if (this.showErrorRegion()) {
        ids.push(this.errorId());
      }
      if (this.showHintRegion()) {
        ids.push(this.hintId());
      }
      return ids.length > 0 ? ids.join(' ') : null;
    },
  );

  protected readonly currentLength: Signal<number> = computed<number>(
    (): number => this.value().length,
  );

  /** The resize CSS value applied to the native textarea. Auto-resize mode uses 'none'. */
  protected readonly nativeResize: Signal<string> = computed<string>((): string =>
    this.autoResize() ? 'none' : this.resize(),
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

    if (this.isInvalid()) {
      classes.push('ui-lib-textarea--error');
    }

    if (this.autoResize()) {
      classes.push('ui-lib-textarea--auto-resize');
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
    this.textareaId = `ui-lib-textarea-${textareaIdCounter++}`;

    effect((): void => {
      const elementRef: ElementRef<HTMLTextAreaElement> | undefined = this.textareaRef();
      if (!elementRef) {
        return;
      }

      const element: HTMLTextAreaElement = elementRef.nativeElement;
      if (!this.autoResize()) {
        element.style.height = '';
        element.style.overflowY = '';
        return;
      }

      this.value();
      this.maxRows();
      this.adjustHeight();
    });
  }

  public ngAfterContentInit(): void {
    const hostElement: HTMLElement = this.hostElement.nativeElement;
    this.hasProjectedError.set(Boolean(hostElement.querySelector('[textareaError]')));
    this.hasProjectedHint.set(Boolean(hostElement.querySelector('[textareaHint]')));
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
    this.valueChange.emit({ value: newValue, originalEvent: event });
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  public handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.textareaFocus.emit(event);
  }

  public handleBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onCvaTouched();
    this.textareaBlur.emit(event);
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
    element.style.height = 'auto';

    const nextHeight: number = element.scrollHeight;
    const maxRows: number | null = this.maxRows();
    if (!maxRows) {
      element.style.height = `${nextHeight}px`;
      element.style.overflowY = 'hidden';
      return;
    }

    const computedStyle: CSSStyleDeclaration = window.getComputedStyle(element);
    // `normal`/unitless line-height values may not parse consistently, so fall back to uncapped
    // auto-resize when the browser does not expose a computed pixel value.
    const lineHeight: number = Number.parseFloat(computedStyle.lineHeight);
    if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
      element.style.height = `${nextHeight}px`;
      element.style.overflowY = 'hidden';
      return;
    }

    const paddingTop: number = Number.parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom: number = Number.parseFloat(computedStyle.paddingBottom) || 0;
    const borderTopWidth: number = Number.parseFloat(computedStyle.borderTopWidth) || 0;
    const borderBottomWidth: number = Number.parseFloat(computedStyle.borderBottomWidth) || 0;
    const maxHeight: number =
      lineHeight * maxRows + paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;

    element.style.height = `${Math.min(nextHeight, maxHeight)}px`;
    element.style.overflowY = nextHeight > maxHeight ? 'auto' : 'hidden';
  }
}
