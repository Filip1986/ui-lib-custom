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
import { ThemeConfigService } from 'ui-lib-custom/theme';

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
  public readonly label = input<string | null>(null);
  public readonly description = input<string | null>(null);
  public readonly ariaLabel = input<string | null>(null);
  public readonly variant = input<CheckboxVariant | null>(null);
  public readonly size = input<CheckboxSize>('md');
  public readonly disabled = input<boolean>(false);
  public readonly indeterminate = input<boolean>(false);

  public readonly checked = model<boolean>(false);
  private readonly cvaDisabled = signal<boolean>(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly controlId = `ui-lib-checkbox-${++checkboxId}`;
  public readonly labelElementId = `${this.controlId}-label`;
  public readonly descriptionElementId = `${this.controlId}-description`;

  private readonly liveAnnouncer = inject(LiveAnnouncerService);
  private readonly themeConfig = inject(ThemeConfigService);

  public readonly effectiveVariant = computed<CheckboxVariant>(
    () => this.variant() ?? this.themeConfig.variant()
  );
  public readonly hostClasses = computed<string>(() => {
    const classes = [
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

  public readonly ariaChecked = computed<string>(() =>
    this.indeterminate() ? 'mixed' : this.checked() ? 'true' : 'false'
  );
  public readonly isDisabled = computed<boolean>(() => this.disabled() || this.cvaDisabled());
  public readonly hostTabIndex = computed<number>(() => (this.isDisabled() ? -1 : 0));
  public readonly ariaLabelledby = computed<string | null>(() =>
    this.ariaLabel() ? null : this.labelElementId
  );
  public readonly ariaDescribedby = computed<string | null>(() =>
    this.description() ? this.descriptionElementId : null
  );
  public readonly showDescription = computed<boolean>(() => Boolean(this.description()));

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
    if (event.key === ' ' || event.key === 'Enter') {
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
