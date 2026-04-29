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
import { Icon } from 'ui-lib-custom/icon';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  ToggleButtonVariant,
  ToggleButtonSize,
  ToggleButtonIconPos,
  ToggleButtonChangeEvent,
} from './toggle-button.types';

export type {
  ToggleButtonVariant,
  ToggleButtonSize,
  ToggleButtonIconPos,
  ToggleButtonChangeEvent,
} from './toggle-button.types';

let toggleButtonIdCounter: number = 0;

/**
 * ToggleButton selects a boolean value via a button with distinct on/off labels and icons.
 * Implements ControlValueAccessor for ngModel and reactive-forms support.
 */
@Component({
  selector: 'ui-lib-toggle-button',
  standalone: true,
  imports: [Icon],
  templateUrl: './toggle-button.html',
  styleUrl: './toggle-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof ToggleButton => ToggleButton),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ToggleButton implements ControlValueAccessor, AfterViewInit {
  /** Label displayed when the button is in the on (checked) state. */
  public readonly onLabel: InputSignal<string> = input<string>('Yes');
  /** Label displayed when the button is in the off (unchecked) state. */
  public readonly offLabel: InputSignal<string> = input<string>('No');
  /** Icon name or CSS class displayed in the on (checked) state. */
  public readonly onIcon: InputSignal<SemanticIcon | string | null> = input<
    SemanticIcon | string | null
  >(null);
  /** Icon name or CSS class displayed in the off (unchecked) state. */
  public readonly offIcon: InputSignal<SemanticIcon | string | null> = input<
    SemanticIcon | string | null
  >(null);
  /** Accessible label applied to the inner button element. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** ID of an external element that labels this button. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
  /** When true, interaction is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  /** ID attribute applied to the inner button element. */
  public readonly inputId: InputSignal<string | null> = input<string | null>(null);
  /** Tab index of the inner button. */
  public readonly tabindex: InputSignal<number> = input<number>(0);
  /** Component size token. */
  public readonly size: InputSignal<ToggleButtonSize> = input<ToggleButtonSize>('md');
  /** Position of the icon relative to the label. */
  public readonly iconPos: InputSignal<ToggleButtonIconPos> = input<ToggleButtonIconPos>('left');
  /** When true, the button receives focus on load. */
  public readonly autofocus: InputSignal<boolean> = input<boolean>(false);
  /** When false, an already-checked button cannot be unchecked by clicking. */
  public readonly allowEmpty: InputSignal<boolean> = input<boolean>(true);
  /** Design variant; inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<ToggleButtonVariant | null> =
    input<ToggleButtonVariant | null>(null);
  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Two-way bindable checked state. */
  public readonly checked: ModelSignal<boolean> = model<boolean>(false);

  /** Emitted when the toggle state changes. */
  public readonly change: OutputEmitterRef<ToggleButtonChangeEvent> =
    output<ToggleButtonChangeEvent>();
  /** Emitted when the inner button receives focus. */
  public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  /** Emitted when the inner button loses focus. */
  public readonly blur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private onCvaChange: (value: boolean) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  private readonly controlId: string = `ui-lib-toggle-button-${++toggleButtonIdCounter}`;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly hostElement: ElementRef = inject(ElementRef);

  /** Resolved variant — falls back to the global theme variant when none is set on this input. */
  public readonly effectiveVariant: Signal<ToggleButtonVariant> = computed<ToggleButtonVariant>(
    (): ToggleButtonVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** True when the button is disabled via the input or via CVA setDisabledState. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  /** Effective tabindex — -1 when disabled so it is skipped by keyboard navigation. */
  public readonly effectiveTabindex: Signal<number> = computed<number>((): number =>
    this.isDisabled() ? -1 : this.tabindex()
  );

  /** Label resolved from onLabel / offLabel according to the current checked state. */
  public readonly activeLabel: Signal<string> = computed<string>((): string =>
    this.checked() ? this.onLabel() : this.offLabel()
  );

  /** Icon resolved from onIcon / offIcon according to the current checked state. */
  public readonly activeIcon: Signal<SemanticIcon | string | null> = computed<
    SemanticIcon | string | null
  >((): SemanticIcon | string | null => (this.checked() ? this.onIcon() : this.offIcon()));

  /** Active icon when iconPos is 'left'; null otherwise. */
  public readonly iconLeftClass: Signal<SemanticIcon | string | null> = computed<
    SemanticIcon | string | null
  >((): SemanticIcon | string | null => (this.iconPos() === 'left' ? this.activeIcon() : null));

  /** Active icon when iconPos is 'right'; null otherwise. */
  public readonly iconRightClass: Signal<SemanticIcon | string | null> = computed<
    SemanticIcon | string | null
  >((): SemanticIcon | string | null => (this.iconPos() === 'right' ? this.activeIcon() : null));

  /** Composite host class string applied via the host binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-toggle-button',
      `ui-lib-toggle-button--variant-${this.effectiveVariant()}`,
      `ui-lib-toggle-button--size-${this.size()}`,
    ];

    if (this.checked()) {
      classes.push('ui-lib-toggle-button--checked');
    }

    if (this.isDisabled()) {
      classes.push('ui-lib-toggle-button--disabled');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  /** ID applied to the inner button element. */
  public readonly buttonId: Signal<string> = computed<string>(
    (): string => this.inputId() ?? `${this.controlId}-button`
  );

  public ngAfterViewInit(): void {
    if (!this.autofocus() || this.isDisabled()) {
      return;
    }

    // Defer focus to avoid ExpressionChangedAfterItHasBeenChecked in tests.
    queueMicrotask((): void => {
      if (!this.isDisabled()) {
        this.getButtonElement()?.focus();
      }
    });
  }

  /** Handles click events — toggles the checked state unless disabled or allowEmpty is false. */
  public onToggle(event: Event): void {
    if (this.isDisabled()) {
      return;
    }

    // When allowEmpty is false and the button is already on, prevent unchecking.
    if (!this.allowEmpty() && this.checked()) {
      return;
    }

    const nextChecked: boolean = !this.checked();
    this.checked.set(nextChecked);
    this.onCvaChange(nextChecked);
    this.onCvaTouched();
    this.change.emit({ originalEvent: event, checked: nextChecked });

    const label: string = this.activeLabel();
    const state: string = nextChecked ? 'on' : 'off';
    void this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
  }

  /** Handles keyboard events — Enter and Space activate the toggle. */
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onToggle(event);
    }
  }

  /** Forwards focus events to the focus output. */
  public onFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  /** Marks the control as touched and forwards blur events to the blur output. */
  public onBlurInternal(event: FocusEvent): void {
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

  private getButtonElement(): HTMLButtonElement | null {
    const hostNativeElement: unknown = this.hostElement.nativeElement;
    if (!(hostNativeElement instanceof HTMLElement)) {
      return null;
    }
    return hostNativeElement.querySelector<HTMLButtonElement>('.ui-lib-toggle-button__inner');
  }
}
