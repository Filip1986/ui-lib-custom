import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  type AfterViewInit,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  ToggleSwitchVariant,
  ToggleSwitchSize,
  ToggleSwitchChangeEvent,
} from './toggle-switch.types';

export type {
  ToggleSwitchVariant,
  ToggleSwitchSize,
  ToggleSwitchChangeEvent,
} from './toggle-switch.types';

let toggleSwitchIdCounter: number = 0;

/**
 * ToggleSwitch presents a boolean on/off control as a sliding pill switch.
 * Implements ControlValueAccessor for ngModel and reactive-forms support.
 */
@Component({
  selector: 'ui-lib-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof ToggleSwitch => ToggleSwitch),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onHostClick($event)',
  },
})
export class ToggleSwitch implements ControlValueAccessor, AfterViewInit {
  /** Optional text label displayed next to the switch. */
  public readonly label: InputSignal<string | null> = input<string | null>(null);
  /** Accessible label applied directly to the native input element. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** ID attribute applied to the native input element. */
  public readonly inputId: InputSignal<string | null> = input<string | null>(null);
  /** Name attribute applied to the native input element. */
  public readonly name: InputSignal<string | null> = input<string | null>(null);
  /** When true, interaction is disabled and the control is not focusable. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  /** When true, the state cannot be changed but the control remains focusable. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  /** Tab index of the native input element. */
  public readonly tabindex: InputSignal<number> = input<number>(0);
  /** Component size token. */
  public readonly size: InputSignal<ToggleSwitchSize> = input<ToggleSwitchSize>('md');
  /** Design variant; inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<ToggleSwitchVariant | null> =
    input<ToggleSwitchVariant | null>(null);
  /** When true, the native input receives focus on load. */
  public readonly autofocus: InputSignal<boolean> = input<boolean>(false);
  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Two-way bindable checked state. */
  public readonly checked: ModelSignal<boolean> = model<boolean>(false);

  /** Emitted when the toggle state changes. */
  public readonly change: OutputEmitterRef<ToggleSwitchChangeEvent> =
    output<ToggleSwitchChangeEvent>();
  /** Emitted when the native input receives focus. */
  public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  /** Emitted when the native input loses focus. */
  public readonly blur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private onCvaChange: (value: boolean) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  private readonly controlId: string = `ui-lib-toggle-switch-${++toggleSwitchIdCounter}`;
  public readonly labelElementId: string = `${this.controlId}-label`;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly hostElement: ElementRef = inject(ElementRef);

  /** Resolved variant — falls back to the global theme variant when none is set on this input. */
  public readonly effectiveVariant: Signal<ToggleSwitchVariant> = computed<ToggleSwitchVariant>(
    (): ToggleSwitchVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** True when the switch is disabled via the input or via CVA setDisabledState. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  /** Effective tabindex — -1 when disabled so it is skipped by keyboard navigation. */
  public readonly effectiveTabindex: Signal<number> = computed<number>((): number =>
    this.isDisabled() ? -1 : this.tabindex()
  );

  /** Composite host class string applied via the host binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-toggle-switch',
      `ui-lib-toggle-switch--variant-${this.effectiveVariant()}`,
      `ui-lib-toggle-switch--size-${this.size()}`,
    ];

    if (this.checked()) {
      classes.push('ui-lib-toggle-switch--checked');
    }

    if (this.isDisabled()) {
      classes.push('ui-lib-toggle-switch--disabled');
    }

    if (this.readonly()) {
      classes.push('ui-lib-toggle-switch--readonly');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  /** aria-checked attribute value for the native input. */
  public readonly ariaChecked: Signal<string> = computed<string>((): string =>
    this.checked() ? 'true' : 'false'
  );

  /** aria-labelledby value — null when ariaLabel is provided directly. */
  public readonly ariaLabelledby: Signal<string | null> = computed<string | null>(
    (): string | null => (this.ariaLabel() || !this.label() ? null : this.labelElementId)
  );

  /** ID applied to the native input element. */
  public readonly nativeInputId: Signal<string> = computed<string>(
    (): string => this.inputId() ?? `${this.controlId}-input`
  );

  public ngAfterViewInit(): void {
    if (!this.autofocus() || this.isDisabled()) {
      return;
    }

    queueMicrotask((): void => {
      if (!this.isDisabled()) {
        this.getNativeInputElement()?.focus();
      }
    });
  }

  /** Handles host click events — delegates to onToggle, but ignores direct input clicks to avoid double-toggle. */
  public onHostClick(event: MouseEvent): void {
    const targetElement: EventTarget | null = event.target;
    if (targetElement instanceof HTMLInputElement) {
      return;
    }

    this.onToggle(event);
  }

  /** Toggles the checked state unless the switch is disabled or readonly. */
  public onToggle(event: Event): void {
    event.preventDefault();
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    const nextChecked: boolean = !this.checked();
    this.checked.set(nextChecked);
    this.onCvaChange(nextChecked);
    this.onCvaTouched();
    this.change.emit({ checked: nextChecked, originalEvent: event });

    const label: string = this.label() ?? this.ariaLabel() ?? 'Toggle switch';
    const state: string = nextChecked ? 'on' : 'off';
    void this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
  }

  /** Handles keyboard events — Space toggles the switch (native checkbox behaviour). */
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
      this.onToggle(event);
    }
  }

  /**
   * Intercepts the native change event from the inner input and stops it from bubbling
   * to prevent host-level (change) listeners from receiving the raw DOM Event instead of
   * the typed ToggleSwitchChangeEvent emitted via the component's change output.
   */
  public onNativeChange(event: Event): void {
    event.stopPropagation();
  }

  /** Forwards focus events to the focus output. */
  public onFocusIn(event: FocusEvent): void {
    this.focus.emit(event);
  }

  /** Marks the control as touched and forwards blur events to the blur output. */
  public onNativeBlur(event: FocusEvent): void {
    this.onCvaTouched();
    this.blur.emit(event);
  }

  // ControlValueAccessor implementation

  public writeValue(value: boolean | null | undefined): void {
    this.checked.set(Boolean(value));
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onCvaChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  private getNativeInputElement(): HTMLInputElement | null {
    const hostNativeElement: unknown = this.hostElement.nativeElement;
    if (!(hostNativeElement instanceof HTMLElement)) {
      return null;
    }

    return hostNativeElement.querySelector<HTMLInputElement>('.ui-lib-toggle-switch__native-input');
  }
}
