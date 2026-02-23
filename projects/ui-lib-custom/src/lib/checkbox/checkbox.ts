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
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

export type CheckboxVariant = 'material' | 'bootstrap' | 'minimal';
export type CheckboxSize = 'sm' | 'md' | 'lg';

let checkboxId = 0;

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
      useExisting: forwardRef(() => Checkbox),
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
  label = input<string | null>(null);
  description = input<string | null>(null);
  ariaLabel = input<string | null>(null);
  variant = input<CheckboxVariant>('material');
  size = input<CheckboxSize>('md');
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);

  readonly checked = model<boolean>(false);
  private readonly cvaDisabled = signal<boolean>(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly controlId = `ui-lib-checkbox-${++checkboxId}`;
  readonly labelElementId = `${this.controlId}-label`;
  readonly descriptionElementId = `${this.controlId}-description`;

  private readonly liveAnnouncer = inject(LiveAnnouncerService);

  readonly hostClasses = computed(() => {
    const classes = [
      'ui-checkbox',
      `ui-checkbox-variant-${this.variant()}`,
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

  readonly ariaChecked = computed(() =>
    this.indeterminate() ? 'mixed' : this.checked() ? 'true' : 'false'
  );
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  readonly hostTabIndex = computed(() => (this.isDisabled() ? -1 : 0));
  readonly ariaLabelledby = computed(() => (this.ariaLabel() ? null : this.labelElementId));
  readonly ariaDescribedby = computed(() =>
    this.description() ? this.descriptionElementId : null
  );
  readonly showDescription = computed(() => !!this.description());

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  onToggle(event: Event): void {
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
    this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggle(event);
    }
  }

  onFocusOut(event: FocusEvent): void {
    const nextTarget: Node | null = event.relatedTarget as Node | null;
    if (nextTarget && (event.currentTarget as HTMLElement).contains(nextTarget)) {
      return;
    }
    this.onTouched();
  }
}
