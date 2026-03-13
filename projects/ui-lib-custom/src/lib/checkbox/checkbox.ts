import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  model,
  inject,
  signal,
  type InputSignal,
  type ModelSignal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import type { CheckboxVariant, CheckboxSize } from './checkbox.types';
import { ThemeConfigService } from '../theming';

export type { CheckboxVariant, CheckboxSize } from './checkbox.types';

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
    '[attr.role]': "'checkbox'",
    '[attr.tabindex]': 'hostTabIndex()',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'hostClasses()',
    '(click)': 'onToggle($event)',
    '(keydown)': 'onKeydown($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class Checkbox implements ControlValueAccessor {
  public readonly label: InputSignal<string | null> = input<string | null>(null);
  public readonly description: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly variant: InputSignal<CheckboxVariant | null> = input<CheckboxVariant | null>(
    null
  );
  public readonly size: InputSignal<CheckboxSize> = input<CheckboxSize>('md');
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly indeterminate: InputSignal<boolean> = input<boolean>(false);

  public readonly checked: ModelSignal<boolean> = model<boolean>(false);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  private onChange: (value: boolean) => void = (): void => {};
  private onTouched: () => void = (): void => {};

  private readonly controlId: string = `ui-lib-checkbox-${++checkboxId}`;
  public readonly labelElementId: string = `${this.controlId}-label`;
  public readonly descriptionElementId: string = `${this.controlId}-description`;

  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  public readonly effectiveVariant: Signal<CheckboxVariant> = computed<CheckboxVariant>(
    (): CheckboxVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-checkbox',
      `ui-checkbox-variant-${this.effectiveVariant()}`,
      `ui-checkbox-size-${this.size()}`,
    ];

    if (this.checked()) {
      classes.push('ui-checkbox-checked');
    }

    if (this.indeterminate()) {
      classes.push('ui-checkbox-indeterminate');
    }

    if (this.isDisabled()) {
      classes.push('ui-checkbox-disabled');
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
    this.isDisabled() ? -1 : 0
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

  public writeValue(value: boolean | null): void {
    this.checked.set(Boolean(value));
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public onToggle(event: Event): void {
    event.preventDefault();
    if (this.isDisabled()) {
      return;
    }
    const nextValue: boolean = !this.checked();
    this.checked.set(nextValue);
    this.onChange(nextValue);
    this.onTouched();

    const label: string = this.label() ?? this.ariaLabel() ?? 'Checkbox';
    const state: string = nextValue ? 'checked' : 'unchecked';
    void this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
  }

  public onKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Space || event.key === KEYBOARD_KEYS.Enter) {
      event.preventDefault();
      this.onToggle(event);
    }
  }

  public onFocusOut(event: FocusEvent): void {
    const nextTarget: Node | null = event.relatedTarget as Node | null;
    if (nextTarget && (event.currentTarget as HTMLElement).contains(nextTarget)) {
      return;
    }
    this.onTouched();
  }
}
