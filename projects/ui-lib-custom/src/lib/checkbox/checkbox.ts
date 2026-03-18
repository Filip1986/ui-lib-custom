import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  output,
  model,
  inject,
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
import type {
  CheckboxVariant,
  CheckboxSize,
  CheckboxChangeEvent,
  CheckboxAppearance,
} from './checkbox.types';
import { ThemeConfigService } from 'ui-lib-custom/theme';

export type {
  CheckboxVariant,
  CheckboxSize,
  CheckboxChangeEvent,
  CheckboxAppearance,
} from './checkbox.types';

let checkboxId: number = 0;

/**
 * Checkbox component with accessible labeling and indeterminate support.
 */
@Component({
  selector: 'ui-lib-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof Checkbox => Checkbox),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onHostClick($event)',
  },
})
export class Checkbox implements ControlValueAccessor, AfterViewInit {
  public readonly label: InputSignal<string | null> = input<string | null>(null);
  public readonly description: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly inputId: InputSignal<string | null> = input<string | null>(null);
  public readonly name: InputSignal<string | null> = input<string | null>(null);
  public readonly required: InputSignal<boolean> = input<boolean>(false);
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly tabindex: InputSignal<number> = input<number>(0);
  public readonly value: InputSignal<unknown | null> = input<unknown | null>(null);
  public readonly binary: InputSignal<boolean> = input<boolean>(false);
  public readonly trueValue: InputSignal<unknown> = input<unknown>(true);
  public readonly falseValue: InputSignal<unknown> = input<unknown>(false);
  public readonly checkboxIcon: InputSignal<string | null> = input<string | null>(null);
  public readonly autofocus: InputSignal<boolean> = input<boolean>(false);
  public readonly inputClass: InputSignal<string | null> = input<string | null>(null);
  public readonly appearance: InputSignal<CheckboxAppearance> =
    input<CheckboxAppearance>('outlined');
  public readonly variant: InputSignal<CheckboxVariant | null> = input<CheckboxVariant | null>(
    null
  );
  public readonly size: InputSignal<CheckboxSize> = input<CheckboxSize>('md');
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly indeterminate: InputSignal<boolean> = input<boolean>(false);

  public readonly checked: ModelSignal<boolean> = model<boolean>(false);
  public readonly change: OutputEmitterRef<CheckboxChangeEvent> = output<CheckboxChangeEvent>();
  public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  public readonly blur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly groupValue: WritableSignal<unknown[]> = signal<unknown[]>([]);

  private onCvaChange: (value: unknown | unknown[]) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  private readonly controlId: string = `ui-lib-checkbox-${++checkboxId}`;
  public readonly labelElementId: string = `${this.controlId}-label`;
  public readonly descriptionElementId: string = `${this.controlId}-description`;

  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly hostElement: ElementRef = inject(ElementRef);

  public readonly effectiveVariant: Signal<CheckboxVariant> = computed<CheckboxVariant>(
    (): CheckboxVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-checkbox',
      `ui-lib-checkbox--variant-${this.effectiveVariant()}`,
      `ui-lib-checkbox--size-${this.size()}`,
    ];

    if (this.appearance() === 'filled') {
      classes.push('checkbox--filled');
    }

    if (this.checked()) {
      classes.push('ui-lib-checkbox--checked');
    }

    if (this.indeterminate()) {
      classes.push('ui-lib-checkbox--indeterminate');
    }

    if (this.isDisabled()) {
      classes.push('ui-lib-checkbox--disabled');
    }

    return classes.join(' ');
  });

  public readonly ariaChecked: Signal<string> = computed<string>((): string =>
    this.indeterminate() ? 'mixed' : this.checked() ? 'true' : 'false'
  );
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );
  public readonly hostTabIndex: Signal<number> = computed<number>((): number =>
    this.isDisabled() ? -1 : this.tabindex()
  );
  public readonly ariaLabelledby: Signal<string | null> = computed<string | null>(
    (): string | null => (this.ariaLabel() ? null : this.labelElementId)
  );
  public readonly ariaDescribedby: Signal<string | null> = computed<string | null>(
    (): string | null => (this.description() ? this.descriptionElementId : null)
  );
  public readonly showDescription: Signal<boolean> = computed<boolean>((): boolean =>
    Boolean(this.description())
  );
  public readonly nativeInputClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-checkbox__native-input'];
    const inputClass: string | null = this.inputClass();
    if (inputClass) {
      classes.push(inputClass);
    }

    return classes.join(' ');
  });
  public readonly checkIconClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-checkbox__icon', 'ui-lib-checkbox__icon--check'];
    const customIconClass: string | null = this.checkboxIcon();
    if (customIconClass) {
      classes.push('ui-lib-checkbox__icon--custom');
      classes.push(customIconClass);
    }

    return classes.join(' ');
  });

  private readonly isBinaryMode: Signal<boolean> = computed<boolean>(
    (): boolean => this.binary() || this.value() === null
  );
  public readonly nativeInputValue: Signal<string> = computed<string>((): string => {
    const rawValue: unknown = this.value() ?? this.trueValue();
    return String(rawValue);
  });

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

  public onHostClick(event: MouseEvent): void {
    const targetElement: EventTarget | null = event.target;
    if (targetElement instanceof HTMLInputElement) {
      return;
    }

    this.onToggle(event);
  }

  public writeValue(value: unknown | unknown[] | null | undefined): void {
    if (this.isBinaryMode()) {
      this.checked.set(this.resolveBinaryCheckedState(value));
      return;
    }

    const normalizedGroupValue: unknown[] = this.resolveGroupModelValue(value);
    this.groupValue.set(normalizedGroupValue);
    this.checked.set(this.isValueSelected(normalizedGroupValue));
  }

  public registerOnChange(fn: (value: unknown | unknown[]) => void): void {
    this.onCvaChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public onToggle(event: Event): void {
    event.preventDefault();
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    let nextValue: boolean;
    if (this.isBinaryMode()) {
      nextValue = !this.checked();
      this.checked.set(nextValue);
      this.onCvaChange(this.getBinaryModelValue(nextValue));
      this.change.emit({ checked: nextValue, originalEvent: event });
    } else {
      const selectedValue: unknown = this.value();
      const currentGroupValue: unknown[] = this.resolveGroupModelValue(this.groupValue());
      const nextGroupValue: unknown[] = this.checked()
        ? currentGroupValue.filter((groupItem: unknown): boolean => groupItem !== selectedValue)
        : [...currentGroupValue, selectedValue];

      this.groupValue.set(nextGroupValue);
      nextValue = this.isValueSelected(nextGroupValue);
      this.checked.set(nextValue);
      this.onCvaChange(this.cloneGroupModelValue(nextGroupValue));
      this.change.emit({ checked: nextGroupValue, originalEvent: event });
    }

    this.onCvaTouched();

    const label: string = this.label() ?? this.ariaLabel() ?? 'Checkbox';
    const state: string = nextValue ? 'checked' : 'unchecked';
    void this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
  }

  public onFocusIn(event: FocusEvent): void {
    this.focus.emit(event);
  }

  public onNativeBlur(event: FocusEvent): void {
    this.onCvaTouched();
    this.blur.emit(event);
  }

  public getNativeInputId(): string {
    return this.inputId() ?? `${this.controlId}-input`;
  }

  private getNativeInputElement(): HTMLInputElement | null {
    const hostNativeElement: unknown = this.hostElement.nativeElement;
    if (!(hostNativeElement instanceof HTMLElement)) {
      return null;
    }

    return hostNativeElement.querySelector('.ui-lib-checkbox__native-input');
  }

  private normalizeGroupValue(value: unknown): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    const normalizedValue: unknown[] = value as unknown[];
    return normalizedValue.slice();
  }

  private resolveBinaryCheckedState(value: unknown): boolean {
    return value === this.trueValue();
  }

  private getBinaryModelValue(isChecked: boolean): unknown {
    return isChecked ? this.trueValue() : this.falseValue();
  }

  private resolveGroupModelValue(value: unknown): unknown[] {
    return this.normalizeGroupValue(value);
  }

  private cloneGroupModelValue(value: unknown[]): unknown[] {
    return value.slice();
  }

  private isValueSelected(groupValue: unknown[]): boolean {
    const selectedValue: unknown = this.value();
    return groupValue.some((groupItem: unknown): boolean => groupItem === selectedValue);
  }
}
