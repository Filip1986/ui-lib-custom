import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { UiLibInput, InputVariant } from './input';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: ` <ui-lib-input /> `,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibInput],
  template: `
    <ui-lib-input
      name="name"
      label="Name"
      placeholder="Name"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
})
class NgModelHostComponent {
  value: string = 'Ada';
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibInput],
  template: `
    <form [formGroup]="form">
      <ui-lib-input label="Name" formControlName="name" />
    </form>
  `,
})
class ReactiveHostComponent {
  readonly form: FormGroup<{ name: FormControl<string> }> = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
  });
}

describe('UiLibInput basics', () => {
  let fixture: ComponentFixture<UiLibInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLibInput],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibInput);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement.querySelector('.ui-input');
  }

  function inputEl(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('creates with defaults', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(hostEl().classList.contains('ui-input')).toBeTruthy();
    expect(hostEl().classList.contains('ui-input-material')).toBeTruthy();
    expect(hostEl().classList.contains('ui-input-float-over')).toBeTruthy();
  });

  it('applies each variant class', () => {
    const variants: InputVariant[] = ['material', 'bootstrap', 'minimal'];

    variants.forEach((variant: InputVariant): void => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(hostEl().classList.contains(`ui-input-${variant}`)).toBeTruthy();
    });
  });

  it('renders label text when provided', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.detectChanges();

    const label: HTMLElement | null = fixture.nativeElement.querySelector('.ui-input-label-text');
    expect(label?.textContent).toContain('Email');
  });

  it('renders placeholder when labelFloat is over', () => {
    fixture.componentRef.setInput('placeholder', 'Email');
    fixture.componentRef.setInput('labelFloat', 'over');
    fixture.detectChanges();

    expect(inputEl().getAttribute('placeholder')).toBe('Email');
  });

  it('does not show placeholder when labelFloat is not over', () => {
    fixture.componentRef.setInput('placeholder', 'Email');
    fixture.componentRef.setInput('labelFloat', 'in');
    fixture.detectChanges();

    expect(inputEl().getAttribute('placeholder')).toBe('');
  });

  it('sets disabled state on the input element', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(inputEl().disabled).toBeTruthy();
    expect(hostEl().classList.contains('ui-input-disabled')).toBeTruthy();
  });

  it('applies error state and aria-invalid', () => {
    fixture.componentRef.setInput('error', 'Required');
    fixture.detectChanges();

    expect(hostEl().classList.contains('ui-input-error')).toBeTruthy();
    expect(inputEl().getAttribute('aria-invalid')).toBe('true');
  });

  it('fires registerOnChange when input changes', () => {
    const onChange: jasmine.Spy = jasmine.createSpy('onChange');
    fixture.componentInstance.registerOnChange(onChange);

    inputEl().value = 'Ada';
    inputEl().dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith('Ada');
  });

  it('fires registerOnTouched on blur', () => {
    const onTouched: jasmine.Spy = jasmine.createSpy('onTouched');
    fixture.componentInstance.registerOnTouched(onTouched);

    inputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalled();
  });

  it('setDisabledState disables the input', () => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(inputEl().disabled).toBeTruthy();
  });

  it('writeValue updates the displayed value', () => {
    fixture.componentInstance.writeValue('Ada');
    fixture.detectChanges();

    expect(inputEl().value).toBe('Ada');
  });

  it('shows clear button and clears value when clicked', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.componentRef.setInput('labelFloat', 'over');
    fixture.componentInstance.writeValue('Ada');
    fixture.detectChanges();

    const clearBtn: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('button.ui-input-clear');
    expect(clearBtn).toBeTruthy();

    clearBtn?.click();
    fixture.detectChanges();

    expect(inputEl().value).toBe('');
  });

  it('toggles password visibility when enabled', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.componentRef.setInput('showTogglePassword', true);
    fixture.detectChanges();

    const toggleBtn: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('button.ui-input-toggle');
    expect(inputEl().getAttribute('type')).toBe('password');

    toggleBtn?.click();
    fixture.detectChanges();

    expect(inputEl().getAttribute('type')).toBe('text');
  });

  it('renders counter when enabled with maxLength', () => {
    fixture.componentRef.setInput('showCounter', true);
    fixture.componentRef.setInput('maxLength', 10);
    fixture.componentInstance.writeValue('Ada');
    fixture.detectChanges();

    const counter: HTMLElement | null = fixture.nativeElement.querySelector('.ui-input-counter');
    expect(counter?.textContent).toContain('3 / 10');
  });

  it('sets floating class when labelFloat is not over and value exists', () => {
    fixture.componentRef.setInput('labelFloat', 'in');
    fixture.componentInstance.writeValue('Ada');
    fixture.detectChanges();

    expect(hostEl().classList.contains('ui-input-floating-active')).toBeTruthy();
  });

  it('focusInput focuses input when click is not on a button', () => {
    const spy: jasmine.Spy = spyOn(inputEl(), 'focus');

    fixture.componentInstance.focusInput();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('focusInput ignores clicks on buttons', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.componentInstance.writeValue('Ada');
    fixture.detectChanges();

    const clearBtn: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('button.ui-input-clear');
    const spy: jasmine.Spy = spyOn(inputEl(), 'focus');

    const mockTarget: { closest: (selector: string) => HTMLButtonElement | null } = {
      closest: (selector: string): HTMLButtonElement | null =>
        selector === 'button' ? clearBtn : null,
    };

    fixture.componentInstance.focusInput({
      target: mockTarget as unknown as HTMLElement,
    } as unknown as MouseEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('clear does nothing when disabled', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.componentInstance.writeValue('Ada');
    fixture.detectChanges();

    const clearBtn: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('button.ui-input-clear');
    clearBtn?.click();
    fixture.detectChanges();

    expect(inputEl().value).toBe('Ada');
  });

  it('togglePassword does nothing when disabled', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.componentRef.setInput('showTogglePassword', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const toggleBtn: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('button.ui-input-toggle');
    toggleBtn?.click();
    fixture.detectChanges();

    expect(inputEl().getAttribute('type')).toBe('password');
  });

  it('applies dark theme variables', () => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(root).getPropertyValue('--uilib-input-bg').trim();

    root.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(root).getPropertyValue('--uilib-input-bg').trim();

    expect(dark).not.toBe(light);
    root.removeAttribute('data-theme');
  });
});

describe('UiLibInput ngModel integration', () => {
  let fixture: ComponentFixture<NgModelHostComponent>;

  const flushMicrotasks = async (): Promise<void> => {
    await new Promise<void>((resolve: () => void) => setTimeout(resolve, 0));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgModelHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgModelHostComponent);
    fixture.detectChanges(false);
    await flushMicrotasks();
    fixture.detectChanges(false);
  });

  function inputEl(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('reflects ngModel value in the input', async () => {
    const freshFixture: ComponentFixture<NgModelHostComponent> =
      TestBed.createComponent(NgModelHostComponent);
    freshFixture.componentInstance.value = 'Grace';
    freshFixture.detectChanges(false);
    await flushMicrotasks();
    freshFixture.detectChanges(false);

    const freshInput: HTMLInputElement = freshFixture.nativeElement.querySelector('input');
    expect(freshInput.value).toBe('Grace');
  });

  it('updates ngModel on user input', async () => {
    inputEl().value = 'Linus';
    inputEl().dispatchEvent(new Event('input'));
    fixture.detectChanges(false);
    await flushMicrotasks();

    expect(fixture.componentInstance.value).toBe('Linus');
  });
});

describe('UiLibInput Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  function inputEl(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('updates control value and dirty state', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    inputEl().value = 'Ada';
    inputEl().dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(control.value).toBe('Ada');
    expect(control.dirty).toBeTruthy();
  });

  it('marks control as touched on blur', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    inputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(control.touched).toBeTruthy();
  });

  it('reflects disabled state from control', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    control.disable();
    fixture.detectChanges();

    expect(inputEl().disabled).toBeTruthy();
  });

  it('writeValue updates displayed value', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    control.setValue('Ada');
    fixture.detectChanges();

    expect(inputEl().value).toBe('Ada');
  });
});

describe('UiLibInput announcer', () => {
  let fixture: ComponentFixture<UiLibInput>;
  let announcer: { announceError: jasmine.Spy };

  beforeEach(async () => {
    announcer = {
      announceError: jasmine.createSpy('announceError'),
    };

    await TestBed.configureTestingModule({
      imports: [UiLibInput],
      providers: [{ provide: LiveAnnouncerService, useValue: announcer }],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibInput);
    fixture.detectChanges();
  });

  it('announces new error messages once', () => {
    fixture.componentRef.setInput('error', 'Required');
    fixture.detectChanges();

    fixture.componentRef.setInput('error', 'Required');
    fixture.detectChanges();

    expect(announcer.announceError).toHaveBeenCalledTimes(1);
    expect(announcer.announceError).toHaveBeenCalledWith('Required');
  });
});

describe('UiLibInput accessibility', () => {
  let fixture: ComponentFixture<UiLibInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLibInput],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibInput);
    fixture.detectChanges();
  });

  function inputEl(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('associates label with input via for/id', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.detectChanges();

    const labelEl: HTMLLabelElement | null =
      fixture.nativeElement.querySelector('label.ui-input-label');
    const inputId: string | null = inputEl().getAttribute('id');
    expect(labelEl?.getAttribute('for')).toBe(inputId);
  });

  it('sets aria-describedby to the error element', () => {
    fixture.componentRef.setInput('error', 'Required');
    fixture.detectChanges();

    const errorEl: HTMLElement | null = fixture.nativeElement.querySelector('.ui-input-error-text');
    expect(inputEl().getAttribute('aria-describedby')).toBe(errorEl?.id ?? null);
  });

  it('marks touched on blur after keyboard focus', () => {
    const onTouched: jasmine.Spy = jasmine.createSpy('onTouched');
    fixture.componentInstance.registerOnTouched(onTouched);

    inputEl().dispatchEvent(new FocusEvent('focus'));
    inputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalled();
  });
});
