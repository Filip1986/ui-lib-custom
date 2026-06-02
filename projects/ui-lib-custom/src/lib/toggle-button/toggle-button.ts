import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  type InputSignal,
  isDevMode,
  model,
  type ModelSignal,
  output,
  type OutputEmitterRef,
  type Signal,
  signal,
  ViewEncapsulation,
  type WritableSignal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import { Icon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type {
  ToggleButtonChangeEvent,
  ToggleButtonIconPos,
  ToggleButtonSize,
  ToggleButtonVariant,
} from './toggle-button.types';

export type {
  ToggleButtonChangeEvent,
  ToggleButtonIconPos,
  ToggleButtonSize,
  ToggleButtonVariant,
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
  /** Label displayed when the button is in the on (checked) state. Falls back to locale 'toggle-button.on'. */
  public readonly onLabel: InputSignal<string> = input<string>('');
  /** Label displayed when the button is in the off (unchecked) state. Falls back to locale 'toggle-button.off'. */
  public readonly offLabel: InputSignal<string> = input<string>('');
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
  /** Backward-compatible checked input alias. Prefer `pressed`. */
  public readonly checked: InputSignal<boolean | null> = input<boolean | null>(null);

  /** Two-way bindable pressed state. */
  public readonly pressed: ModelSignal<boolean> = model<boolean>(false);
  /** Backward-compatible checkedChange output alias. Prefer `pressedChange`. */
  public readonly checkedChange: OutputEmitterRef<boolean> = output<boolean>();

  /** Emitted when the toggle state changes. */
  public readonly toggleButtonChange: OutputEmitterRef<ToggleButtonChangeEvent> =
    output<ToggleButtonChangeEvent>();
  /** Emitted when the inner button receives focus. */
  public readonly toggleButtonFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  /** Emitted when the inner button loses focus. */
  public readonly toggleButtonBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private isSyncingPressedFromCheckedAlias: boolean = false;
  private hasCheckedAliasInitialized: boolean = false;
  private onCvaChange: (value: boolean) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  private readonly controlId: string = `ui-lib-toggle-button-${++toggleButtonIdCounter}`;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly hostElement: ElementRef = inject(ElementRef);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** Resolved variant — falls back to the global theme variant when none is set on this input. */
  public readonly effectiveVariant: Signal<ToggleButtonVariant> = computed<ToggleButtonVariant>(
    (): ToggleButtonVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** True when the button is disabled via the input or via CVA setDisabledState. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled(),
  );

  /** Effective tabindex — -1 when disabled so it is skipped by keyboard navigation. */
  public readonly effectiveTabindex: Signal<number> = computed<number>((): number =>
    this.isDisabled() ? -1 : this.tabindex(),
  );

  /** Label resolved from onLabel / offLabel according to the current checked state. Falls back to i18n. */
  public readonly activeLabel: Signal<string> = computed<string>((): string => {
    const rawLabel: string = this.pressed() ? this.onLabel() : this.offLabel();
    if (rawLabel.length > 0) return rawLabel;
    return this.pressed()
      ? this.i18n.translate('toggle-button.on')
      : this.i18n.translate('toggle-button.off');
  });

  /** Icon resolved from onIcon / offIcon according to the current checked state. */
  public readonly activeIcon: Signal<SemanticIcon | string | null> = computed<
    SemanticIcon | string | null
  >((): SemanticIcon | string | null => (this.pressed() ? this.onIcon() : this.offIcon()));

  /**
   * True when a consumer-supplied label should be rendered visually.
   * Checks the raw input values, not the i18n fallback — i18n labels are used
   * for accessibility (aria-label, live announcements) but must not render a
   * visible span in icon-only mode.
   */
  public readonly hasVisibleLabel: Signal<boolean> = computed<boolean>((): boolean => {
    const rawLabel: string = this.pressed() ? this.onLabel() : this.offLabel();
    return rawLabel.trim().length > 0;
  });

  public readonly ariaPressed: Signal<'true' | 'false'> = computed<'true' | 'false'>(
    (): 'true' | 'false' => (this.pressed() ? 'true' : 'false'),
  );

  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const ariaLabel: string | null = this.ariaLabel();
      if (ariaLabel === null) {
        return null;
      }

      const trimmedLabel: string = ariaLabel.trim();
      return trimmedLabel.length > 0 ? trimmedLabel : null;
    },
  );

  public readonly ariaLabelledByResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const ariaLabelledBy: string | null = this.ariaLabelledBy();
      if (ariaLabelledBy === null) {
        return null;
      }

      const trimmedLabelledBy: string = ariaLabelledBy.trim();
      return trimmedLabelledBy.length > 0 ? trimmedLabelledBy : null;
    },
  );

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

    if (this.pressed()) {
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
    (): string => this.inputId() ?? `${this.controlId}-button`,
  );

  constructor() {
    effect((): void => {
      const checked: boolean | null = this.checked();
      if (checked === null || checked === this.pressed()) {
        return;
      }

      this.isSyncingPressedFromCheckedAlias = true;
      this.pressed.set(checked);
      this.isSyncingPressedFromCheckedAlias = false;
    });

    effect((): void => {
      const pressed: boolean = this.pressed();
      if (!this.hasCheckedAliasInitialized) {
        this.hasCheckedAliasInitialized = true;
        return;
      }

      if (!this.isSyncingPressedFromCheckedAlias) {
        this.checkedChange.emit(pressed);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.validateIconOnlyAriaLabel();

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
    if (!this.allowEmpty() && this.pressed()) {
      return;
    }

    const nextChecked: boolean = !this.pressed();
    this.pressed.set(nextChecked);
    this.onCvaChange(nextChecked);
    this.onCvaTouched();
    this.toggleButtonChange.emit({ originalEvent: event, checked: nextChecked });

    const label: string = this.activeLabel();
    const state: string = nextChecked ? 'on' : 'off';
    void this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
    this.validateIconOnlyAriaLabel();
  }

  /** Handles keyboard events — Enter and Space activate the toggle. */
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onToggle(event);
    }
  }

  /** Forwards focus events to the toggleButtonFocus output. */
  public onFocus(event: FocusEvent): void {
    this.toggleButtonFocus.emit(event);
  }

  /** Marks the control as touched and forwards blur events to the toggleButtonBlur output. */
  public onBlurInternal(event: FocusEvent): void {
    this.onCvaTouched();
    this.toggleButtonBlur.emit(event);
  }

  // ControlValueAccessor implementation

  public writeValue(value: boolean | null | undefined): void {
    this.pressed.set(Boolean(value));
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

  private validateIconOnlyAriaLabel(): void {
    if (!isDevMode()) {
      return;
    }

    if (this.iconOnlyModeNeedsAriaLabel() && this.ariaLabelResolved() === null) {
      console.error(
        '[ui-lib-toggle-button] ariaLabel is required when the toggle button renders icon-only content.',
      );
    }
  }

  private iconOnlyModeNeedsAriaLabel(): boolean {
    const onLabel: string = this.onLabel().trim();
    const offLabel: string = this.offLabel().trim();
    const hasOnIcon: boolean = Boolean(this.onIcon());
    const hasOffIcon: boolean = Boolean(this.offIcon());
    const onIsIconOnly: boolean = hasOnIcon && onLabel.length === 0;
    const offIsIconOnly: boolean = hasOffIcon && offLabel.length === 0;
    return onIsIconOnly || offIsIconOnly;
  }
}
