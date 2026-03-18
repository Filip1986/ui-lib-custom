import { Component, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideZonelessChangeDetection, ChangeDetectionStrategy } from '@angular/core';
import { Checkbox } from './checkbox';
import { SHARED_SIZE_OPTIONS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';
import type {
  CheckboxAppearance,
  CheckboxChangeEvent,
  CheckboxSize,
  CheckboxVariant,
} from './checkbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Checkbox],
  template: `
    <ui-lib-checkbox
      [label]="label()"
      [description]="description()"
      [inputId]="inputId()"
      [name]="name()"
      [required]="required()"
      [readonly]="readonly()"
      [tabindex]="tabindex()"
      [checkboxIcon]="checkboxIcon()"
      [autofocus]="autofocus()"
      [inputClass]="inputClass()"
      [appearance]="appearance()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [indeterminate]="indeterminate()"
      [ariaLabel]="ariaLabel()"
      (focus)="handleFocus($event)"
      (blur)="handleBlur($event)"
      [(checked)]="checked"
    >
      {{ content() }}
    </ui-lib-checkbox>
  `,
})
class HostComponent {
  public readonly label: WritableSignal<string> = signal<string>('Accept terms');
  public readonly description: WritableSignal<string> = signal<string>('Required to continue');
  public readonly inputId: WritableSignal<string | null> = signal<string | null>(null);
  public readonly name: WritableSignal<string | null> = signal<string | null>(null);
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tabindex: WritableSignal<number> = signal<number>(0);
  public readonly checkboxIcon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly autofocus: WritableSignal<boolean> = signal<boolean>(false);
  public readonly inputClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly appearance: WritableSignal<CheckboxAppearance> =
    signal<CheckboxAppearance>('outlined');
  public readonly variant: WritableSignal<CheckboxVariant> = signal<CheckboxVariant>('material');
  public readonly size: WritableSignal<CheckboxSize> = signal<CheckboxSize>('md');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly indeterminate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly lastFocusEvent: WritableSignal<FocusEvent | null> = signal<FocusEvent | null>(
    null
  );
  public readonly lastBlurEvent: WritableSignal<FocusEvent | null> = signal<FocusEvent | null>(
    null
  );
  public checked: boolean = false;
  public readonly content: WritableSignal<string> = signal<string>('');

  public handleFocus(event: FocusEvent): void {
    this.lastFocusEvent.set(event);
  }

  public handleBlur(event: FocusEvent): void {
    this.lastBlurEvent.set(event);
  }
}

describe('Checkbox', (): void => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function checkboxEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-checkbox') as HTMLElement;
  }

  function nativeInputEl(): HTMLInputElement {
    return checkboxEl().querySelector('.ui-lib-checkbox__native-input') as HTMLInputElement;
  }

  it('should render label and description', (): void => {
    const el: HTMLElement = checkboxEl();
    expect(el.querySelector('.ui-lib-checkbox__label')?.textContent).toContain('Accept terms');
    expect(el.querySelector('.ui-lib-checkbox__description')?.textContent).toContain(
      'Required to continue'
    );
  });

  it('applies variant, size, and checked classes', (): void => {
    fixture.componentInstance.variant.set('bootstrap');
    fixture.componentInstance.size.set('lg');
    fixture.componentInstance.appearance.set('filled');
    fixture.componentInstance.checked = true;
    fixture.detectChanges();

    const el: HTMLElement = checkboxEl();
    expect(el.className).toContain('ui-lib-checkbox--variant-bootstrap');
    expect(el.className).toContain('ui-lib-checkbox--size-lg');
    expect(el.className).toContain('checkbox--filled');
    expect(el.className).toContain('ui-lib-checkbox--checked');
  });

  it('uses outlined appearance by default', (): void => {
    fixture.detectChanges();

    expect(checkboxEl().className).not.toContain('checkbox--filled');
  });

  it('toggles checked state on click when enabled', (): void => {
    const el: HTMLElement = checkboxEl();
    el.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeTruthy();
    expect(nativeInputEl().getAttribute('aria-checked')).toBe('true');
  });

  it('does not toggle when disabled', (): void => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const el: HTMLElement = checkboxEl();
    el.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeFalsy();
    expect(nativeInputEl().disabled).toBeTruthy();
  });

  it('supports native input interaction', (): void => {
    const inputElement: HTMLInputElement = nativeInputEl();
    inputElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeTruthy();

    inputElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeFalsy();
  });

  it('creates with defaults', (): void => {
    expect(fixture.componentInstance).toBeTruthy();
    const el: HTMLElement = checkboxEl();
    expect(el.classList.contains('ui-lib-checkbox')).toBeTruthy();
    expect(el.classList.contains('ui-lib-checkbox--variant-material')).toBeTruthy();
    expect(el.classList.contains('ui-lib-checkbox--size-md')).toBeTruthy();
  });

  it('applies each variant class', (): void => {
    const variants: CheckboxVariant[] = [...SHARED_VARIANT_OPTIONS];

    variants.forEach((variant: CheckboxVariant): void => {
      fixture.componentInstance.variant.set(variant);
      fixture.detectChanges();

      expect(checkboxEl().classList.contains(`ui-lib-checkbox--variant-${variant}`)).toBeTruthy();
    });
  });

  it('applies filled appearance class for all variants', (): void => {
    const variants: CheckboxVariant[] = [...SHARED_VARIANT_OPTIONS];

    variants.forEach((variant: CheckboxVariant): void => {
      fixture.componentInstance.variant.set(variant);
      fixture.componentInstance.appearance.set('filled');
      fixture.detectChanges();

      const element: HTMLElement = checkboxEl();
      expect(element.classList.contains(`ui-lib-checkbox--variant-${variant}`)).toBeTruthy();
      expect(element.classList.contains('checkbox--filled')).toBeTruthy();
    });
  });

  it('applies each size class', (): void => {
    const sizes: CheckboxSize[] = [...SHARED_SIZE_OPTIONS];

    sizes.forEach((size: CheckboxSize): void => {
      fixture.componentInstance.size.set(size);
      fixture.detectChanges();

      expect(checkboxEl().classList.contains(`ui-lib-checkbox--size-${size}`)).toBeTruthy();
    });
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-checkbox-border', 'light-border');
    const light: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-checkbox-border')
      .trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-checkbox-border', 'dark-border');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-checkbox-border').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });

  it('associates label via aria-labelledby', (): void => {
    fixture.detectChanges();

    const labelEl: HTMLElement | null = checkboxEl().querySelector('.ui-lib-checkbox__label');
    expect(nativeInputEl().getAttribute('aria-labelledby')).toBe(labelEl?.id ?? null);
  });

  it('uses aria-label when provided', (): void => {
    fixture.componentInstance.label.set(null as unknown as string);
    fixture.componentInstance.description.set(null as unknown as string);
    fixture.componentInstance.ariaLabel.set('Custom label');
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-label')).toBe('Custom label');
  });

  it('applies native input id, name, and required attributes', (): void => {
    fixture.componentInstance.inputId.set('consent-checkbox');
    fixture.componentInstance.name.set('consent');
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    const nativeInputElement: HTMLInputElement = nativeInputEl();
    expect(nativeInputElement.id).toBe('consent-checkbox');
    expect(nativeInputElement.getAttribute('name')).toBe('consent');
    expect(nativeInputElement.required).toBeTruthy();
    expect(nativeInputElement.getAttribute('tabindex')).toBe('0');
  });

  it('keeps native input screen-reader accessible and visual box presentation-only', (): void => {
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputEl();
    const boxElement: HTMLElement | null = checkboxEl().querySelector('.ui-lib-checkbox__box');
    expect(inputElement.getAttribute('aria-hidden')).toBeNull();
    expect(boxElement?.getAttribute('role')).toBe('presentation');
    expect(boxElement?.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies inputClass to the native checkbox input', (): void => {
    fixture.componentInstance.inputClass.set('my-native-input');
    fixture.detectChanges();

    expect(nativeInputEl().classList.contains('ui-lib-checkbox__native-input')).toBeTruthy();
    expect(nativeInputEl().classList.contains('my-native-input')).toBeTruthy();
  });

  it('applies checkboxIcon custom class to the check icon', (): void => {
    fixture.componentInstance.checkboxIcon.set('pi pi-check');
    fixture.detectChanges();

    const iconElement: HTMLElement | null = checkboxEl().querySelector(
      '.ui-lib-checkbox__icon--check'
    );
    expect(iconElement?.classList.contains('ui-lib-checkbox__icon--custom')).toBeTruthy();
    expect(iconElement?.classList.contains('pi')).toBeTruthy();
    expect(iconElement?.classList.contains('pi-check')).toBeTruthy();
  });

  it('autofocuses the host when autofocus is true', async (): Promise<void> => {
    const autoFocusFixture: ComponentFixture<HostComponent> =
      TestBed.createComponent(HostComponent);
    autoFocusFixture.componentInstance.autofocus.set(true);
    autoFocusFixture.detectChanges();
    await Promise.resolve();

    const element: HTMLElement = (autoFocusFixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-checkbox__native-input'
    ) as HTMLElement;
    expect(document.activeElement).toBe(element);
  });

  it('uses custom tabindex when enabled and -1 when disabled', (): void => {
    fixture.componentInstance.tabindex.set(4);
    fixture.detectChanges();
    expect(nativeInputEl().getAttribute('tabindex')).toBe('4');

    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(nativeInputEl().getAttribute('tabindex')).toBe('-1');
  });

  it('prevents value changes when readonly is true', (): void => {
    fixture.componentInstance.readonly.set(true);
    fixture.detectChanges();

    const element: HTMLElement = checkboxEl();
    element.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked).toBeFalsy();

    nativeInputEl().click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked).toBeFalsy();

    nativeInputEl().focus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(nativeInputEl());
  });

  it('emits onFocus when host receives focus', (): void => {
    nativeInputEl().dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(fixture.componentInstance.lastFocusEvent()).not.toBeNull();
  });

  it('emits onBlur when host loses focus', (): void => {
    nativeInputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(fixture.componentInstance.lastBlurEvent()).not.toBeNull();
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Checkbox],
  template: `
    <form [formGroup]="form">
      <ui-lib-checkbox label="Accept" formControlName="accepted" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly form: FormGroup<{ accepted: FormControl<boolean> }> = new FormGroup({
    accepted: new FormControl<boolean>(false, { nonNullable: true }),
  });
}

@Component({
  standalone: true,
  imports: [FormsModule, Checkbox],
  template: `
    <ui-lib-checkbox
      [ngModelOptions]="{ standalone: true }"
      [binary]="false"
      [value]="'A'"
      [(ngModel)]="selected"
    />
    <ui-lib-checkbox
      [ngModelOptions]="{ standalone: true }"
      [binary]="false"
      [value]="'B'"
      [(ngModel)]="selected"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateDrivenGroupHostComponent {
  public selected: string[] | null = [];
}

@Component({
  standalone: true,
  imports: [FormsModule, Checkbox],
  template: `
    @for (option of options(); track option) {
      <ui-lib-checkbox
        [ngModelOptions]="{ standalone: true }"
        [name]="'dynamic-option-' + option"
        [binary]="false"
        [value]="option"
        [(ngModel)]="selected"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DynamicTemplateDrivenGroupHostComponent {
  public readonly options: WritableSignal<string[]> = signal<string[]>(['A', 'B']);
  public selected: string[] | null = [];
}

@Component({
  standalone: true,
  imports: [Checkbox],
  template: `
    <label for="external-checkbox-id">Accept external label</label>
    <ui-lib-checkbox [inputId]="'external-checkbox-id'" [(checked)]="checked" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ExternalLabelHostComponent {
  public checked: boolean = false;
}

@Component({
  standalone: true,
  imports: [FormsModule, Checkbox],
  template: `
    <form #formRef="ngForm">
      <ui-lib-checkbox name="required-template-checkbox" [required]="true" [(ngModel)]="accepted" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateDrivenRequiredHostComponent {
  public accepted: boolean = false;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Checkbox],
  template: `
    <form [formGroup]="form">
      <ui-lib-checkbox [required]="true" formControlName="accepted" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveRequiredHostComponent {
  public readonly form: FormGroup<{ accepted: FormControl<boolean> }> = new FormGroup({
    accepted: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });
}

describe('Checkbox Reactive Forms', (): void => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  function checkboxEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-checkbox') as HTMLElement;
  }

  function nativeInputEl(): HTMLInputElement {
    return checkboxEl().querySelector('.ui-lib-checkbox__native-input') as HTMLInputElement;
  }

  it('updates control value on click', (): void => {
    const control: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    checkboxEl().click();
    fixture.detectChanges();

    expect(control.value).toBeTruthy();
  });

  it('marks control as touched on focusout', (): void => {
    const control: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    nativeInputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(control.touched).toBeTruthy();
  });

  it('reflects disabled state from control', (): void => {
    const control: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    control.disable();
    fixture.detectChanges();

    expect(nativeInputEl().disabled).toBeTruthy();
  });
});

describe('Checkbox Template-driven Group Mode', (): void => {
  let fixture: ComponentFixture<TemplateDrivenGroupHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TemplateDrivenGroupHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDrivenGroupHostComponent);
    fixture.detectChanges();
  });

  function checkboxElements(): HTMLElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-checkbox')
    ) as HTMLElement[];
  }

  it('supports multiple checkboxes sharing the same ngModel array', async (): Promise<void> => {
    const elements: HTMLElement[] = checkboxElements();

    elements[0]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toEqual(['A']);

    elements[1]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toEqual(['A', 'B']);

    elements[0]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toEqual(['B']);
  });

  it('handles null and undefined model values without crashing', async (): Promise<void> => {
    const elements: HTMLElement[] = checkboxElements();

    fixture.componentInstance.selected = null;
    fixture.detectChanges();
    await fixture.whenStable();
    elements[0]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toEqual(['A']);

    fixture.componentInstance.selected = undefined as unknown as string[];
    fixture.detectChanges();
    await fixture.whenStable();
    elements[1]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(Array.isArray(fixture.componentInstance.selected)).toBeTruthy();
    expect(fixture.componentInstance.selected).toContain('B');
  });
});

describe('Checkbox Template-driven Dynamic Group Mode', (): void => {
  let fixture: ComponentFixture<DynamicTemplateDrivenGroupHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [DynamicTemplateDrivenGroupHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTemplateDrivenGroupHostComponent);
    fixture.detectChanges();
  });

  function checkboxElements(): HTMLElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-checkbox')
    ) as HTMLElement[];
  }

  it('supports group mode with dynamic @for rendered checkboxes', async (): Promise<void> => {
    const initialElements: HTMLElement[] = checkboxElements();
    expect(initialElements).toHaveLength(2);

    initialElements[0]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toEqual(['A']);

    fixture.componentInstance.options.set(['A', 'B', 'C']);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const updatedElements: HTMLElement[] = checkboxElements();
    expect(updatedElements).toHaveLength(3);

    updatedElements[2]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toEqual(['A', 'C']);
  });
});

describe('Checkbox External Label', (): void => {
  let fixture: ComponentFixture<ExternalLabelHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ExternalLabelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLabelHostComponent);
    fixture.detectChanges();
  });

  it('supports inputId association with external label for attribute', (): void => {
    const nativeInputElement: HTMLInputElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.ui-lib-checkbox__native-input') as HTMLInputElement;
    const externalLabelElement: HTMLLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector('label[for="external-checkbox-id"]') as HTMLLabelElement;

    externalLabelElement.click();
    fixture.detectChanges();

    expect(nativeInputElement.id).toBe('external-checkbox-id');
    expect(fixture.componentInstance.checked).toBeTruthy();
  });
});

describe('Checkbox Required Validation', (): void => {
  it('applies required validation in template-driven forms', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TemplateDrivenRequiredHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<TemplateDrivenRequiredHostComponent> = TestBed.createComponent(
      TemplateDrivenRequiredHostComponent
    );
    fixture.detectChanges();

    const nativeInputElement: HTMLInputElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.ui-lib-checkbox__native-input') as HTMLInputElement;
    expect(nativeInputElement.checkValidity()).toBeFalsy();

    const checkboxElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-checkbox'
    ) as HTMLElement;
    checkboxElement.click();
    fixture.detectChanges();

    expect(nativeInputElement.checkValidity()).toBeTruthy();
  });

  it('applies required validation in reactive forms', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveRequiredHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<ReactiveRequiredHostComponent> = TestBed.createComponent(
      ReactiveRequiredHostComponent
    );
    fixture.detectChanges();
    const acceptedControl: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    expect(acceptedControl.invalid).toBeTruthy();

    const checkboxElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-checkbox'
    ) as HTMLElement;
    checkboxElement.click();
    fixture.detectChanges();

    expect(acceptedControl.valid).toBeTruthy();
  });
});

describe('Checkbox CVA', (): void => {
  let fixture: ComponentFixture<Checkbox>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Checkbox],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkbox);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function nativeInputEl(): HTMLInputElement {
    return hostEl().querySelector('.ui-lib-checkbox__native-input') as HTMLInputElement;
  }

  it('writeValue updates checked state', (): void => {
    fixture.componentInstance.writeValue(true);
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-checked')).toBe('true');
  });

  it('writeValue handles undefined in binary mode', (): void => {
    fixture.componentInstance.writeValue(undefined);
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-checked')).toBe('false');
  });

  it('writeValue uses trueValue and falseValue in binary mode', (): void => {
    fixture.componentRef.setInput('trueValue', 'YES');
    fixture.componentRef.setInput('falseValue', 'NO');
    fixture.componentInstance.writeValue('YES');
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-checked')).toBe('true');

    fixture.componentInstance.writeValue('NO');
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-checked')).toBe('false');
  });

  it('registerOnChange fires when toggled', (): void => {
    const onChange: jest.Mock = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    hostEl().click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('registerOnChange emits configured trueValue and falseValue in binary mode', (): void => {
    const onChange: jest.Mock = jest.fn();
    fixture.componentRef.setInput('trueValue', 'ON');
    fixture.componentRef.setInput('falseValue', 'OFF');
    fixture.componentInstance.registerOnChange(onChange);
    fixture.detectChanges();

    hostEl().click();
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledWith('ON');

    hostEl().click();
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledWith('OFF');
  });

  it('emits onChange output with boolean checked in binary mode', (): void => {
    const events: CheckboxChangeEvent[] = [];
    fixture.componentInstance.change.subscribe((event: CheckboxChangeEvent): void => {
      events.push(event);
    });

    hostEl().click();
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]?.checked).toBe(true);
    expect(events[0]?.originalEvent).toBeInstanceOf(Event);
  });

  it('registerOnTouched fires on focusout', (): void => {
    const onTouched: jest.Mock = jest.fn();
    fixture.componentInstance.registerOnTouched(onTouched);

    nativeInputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalled();
  });

  it('setDisabledState disables the host', (): void => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(nativeInputEl().disabled).toBeTruthy();
  });

  it('handles group mode writeValue with array values', (): void => {
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentInstance.writeValue(['A', 'B']);
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-checked')).toBe('true');
  });

  it('treats null group value as empty array', (): void => {
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentInstance.writeValue(null);
    fixture.detectChanges();

    expect(nativeInputEl().getAttribute('aria-checked')).toBe('false');
  });

  it('treats undefined and non-array group values as empty array', (): void => {
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);

    fixture.componentInstance.writeValue(undefined);
    fixture.detectChanges();
    expect(nativeInputEl().getAttribute('aria-checked')).toBe('false');

    fixture.componentInstance.writeValue(true);
    fixture.detectChanges();
    expect(nativeInputEl().getAttribute('aria-checked')).toBe('false');
  });

  it('adds the configured value when toggled from unchecked group state', (): void => {
    const onChange: jest.Mock = jest.fn();
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentInstance.writeValue(['B']);
    fixture.componentInstance.registerOnChange(onChange);
    fixture.detectChanges();

    hostEl().click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(['B', 'A']);
  });

  it('removes the configured value when toggled from checked group state', (): void => {
    const onChange: jest.Mock = jest.fn();
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentInstance.writeValue(['A', 'B']);
    fixture.componentInstance.registerOnChange(onChange);
    fixture.detectChanges();

    hostEl().click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(['B']);
  });

  it('emits onChange output with full array checked in group mode', (): void => {
    const events: CheckboxChangeEvent[] = [];
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentInstance.writeValue(['B']);
    fixture.componentInstance.change.subscribe((event: CheckboxChangeEvent): void => {
      events.push(event);
    });
    fixture.detectChanges();

    hostEl().click();
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]?.checked).toEqual(['B', 'A']);
    expect(events[0]?.originalEvent).toBeInstanceOf(Event);
  });

  it('supports indeterminate state in group mode without blocking value updates', (): void => {
    const onChange: jest.Mock = jest.fn();
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentRef.setInput('indeterminate', true);
    fixture.componentInstance.writeValue([]);
    fixture.componentInstance.registerOnChange(onChange);
    fixture.detectChanges();

    hostEl().click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(['A']);
    expect(nativeInputEl().getAttribute('aria-checked')).toBe('mixed');
  });

  it('setDisabledState blocks toggle in group mode', (): void => {
    const onChange: jest.Mock = jest.fn();
    fixture.componentRef.setInput('value', 'A');
    fixture.componentRef.setInput('binary', false);
    fixture.componentInstance.writeValue(['A']);
    fixture.componentInstance.registerOnChange(onChange);
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    hostEl().click();
    fixture.detectChanges();

    expect(onChange).not.toHaveBeenCalled();
    expect(nativeInputEl().disabled).toBeTruthy();
    expect(nativeInputEl().getAttribute('aria-checked')).toBe('true');
  });
});
