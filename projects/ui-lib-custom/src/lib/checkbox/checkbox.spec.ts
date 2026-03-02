import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection, ChangeDetectionStrategy } from '@angular/core';
import { Checkbox, CheckboxSize, CheckboxVariant } from './checkbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Checkbox],
  template: `
    <ui-lib-checkbox
      [label]="label()"
      [description]="description()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [indeterminate]="indeterminate()"
      [ariaLabel]="ariaLabel()"
      [(checked)]="checked"
    >
      {{ content() }}
    </ui-lib-checkbox>
  `,
})
class HostComponent {
  public readonly label = signal('Accept terms');
  public readonly description = signal('Required to continue');
  public readonly variant = signal<CheckboxVariant>('material');
  public readonly size = signal<CheckboxSize>('md');
  public readonly disabled = signal(false);
  public readonly indeterminate = signal(false);
  public readonly ariaLabel = signal<string | null>(null);
  public checked = false;
  public readonly content = signal('');
}

describe('Checkbox', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
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

  it('should render label and description', () => {
    const el = checkboxEl();
    expect(el.querySelector('.checkbox-label')?.textContent).toContain('Accept terms');
    expect(el.querySelector('.checkbox-description')?.textContent).toContain(
      'Required to continue'
    );
  });

  it('applies variant, size, and checked classes', () => {
    fixture.componentInstance.variant.set('bootstrap');
    fixture.componentInstance.size.set('lg');
    fixture.componentInstance.checked = true;
    fixture.detectChanges();

    const el = checkboxEl();
    expect(el.className).toContain('ui-checkbox-variant-bootstrap');
    expect(el.className).toContain('ui-checkbox-size-lg');
    expect(el.className).toContain('ui-checkbox-checked');
  });

  it('reflects indeterminate state via aria', () => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();

    expect(checkboxEl().getAttribute('aria-checked')).toBe('mixed');
    expect(checkboxEl().className).toContain('ui-checkbox-indeterminate');
  });

  it('toggles checked state on click when enabled', () => {
    const el = checkboxEl();
    el.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeTruthy();
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('does not toggle when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const el = checkboxEl();
    el.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeFalsy();
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('supports keyboard interaction', () => {
    const el = checkboxEl();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeTruthy();

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeFalsy();
  });

  it('creates with defaults', () => {
    expect(fixture.componentInstance).toBeTruthy();
    const el: HTMLElement = checkboxEl();
    expect(el.classList.contains('ui-checkbox')).toBeTruthy();
    expect(el.classList.contains('ui-checkbox-variant-material')).toBeTruthy();
    expect(el.classList.contains('ui-checkbox-size-md')).toBeTruthy();
  });

  it('applies each variant class', () => {
    const variants: CheckboxVariant[] = ['material', 'bootstrap', 'minimal'];

    variants.forEach((variant: CheckboxVariant): void => {
      fixture.componentInstance.variant.set(variant);
      fixture.detectChanges();

      expect(checkboxEl().classList.contains(`ui-checkbox-variant-${variant}`)).toBeTruthy();
    });
  });

  it('applies each size class', () => {
    const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size: CheckboxSize): void => {
      fixture.componentInstance.size.set(size);
      fixture.detectChanges();

      expect(checkboxEl().classList.contains(`ui-checkbox-size-${size}`)).toBeTruthy();
    });
  });

  it('applies dark theme variables', () => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-checkbox-border')
      .trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-checkbox-border').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });

  it('associates label via aria-labelledby', () => {
    fixture.detectChanges();

    const el = checkboxEl();
    const labelEl: HTMLElement | null = el.querySelector('.checkbox-label');
    expect(el.getAttribute('aria-labelledby')).toBe(labelEl?.id ?? null);
  });

  it('uses aria-label when provided', () => {
    fixture.componentInstance.label.set(null as unknown as string);
    fixture.componentInstance.description.set(null as unknown as string);
    fixture.componentInstance.ariaLabel.set('Custom label');
    fixture.detectChanges();

    expect(checkboxEl().getAttribute('aria-label')).toBe('Custom label');
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

describe('Checkbox Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async () => {
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

  it('updates control value on click', () => {
    const control: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    checkboxEl().click();
    fixture.detectChanges();

    expect(control.value).toBeTruthy();
  });

  it('marks control as touched on focusout', () => {
    const control: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    checkboxEl().dispatchEvent(new FocusEvent('focusout', { relatedTarget: null }));
    fixture.detectChanges();

    expect(control.touched).toBeTruthy();
  });

  it('reflects disabled state from control', () => {
    const control: FormControl<boolean> = fixture.componentInstance.form.controls.accepted;

    control.disable();
    fixture.detectChanges();

    expect(checkboxEl().getAttribute('aria-disabled')).toBe('true');
  });
});

describe('Checkbox CVA', () => {
  let fixture: ComponentFixture<Checkbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkbox],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkbox);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('writeValue updates checked state', () => {
    fixture.componentInstance.writeValue(true);
    fixture.detectChanges();

    expect(hostEl().getAttribute('aria-checked')).toBe('true');
  });

  it('registerOnChange fires when toggled', () => {
    const onChange: jasmine.Spy = jasmine.createSpy('onChange');
    fixture.componentInstance.registerOnChange(onChange);

    hostEl().click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('registerOnTouched fires on focusout', () => {
    const onTouched: jasmine.Spy = jasmine.createSpy('onTouched');
    fixture.componentInstance.registerOnTouched(onTouched);

    hostEl().dispatchEvent(new FocusEvent('focusout', { relatedTarget: null }));
    fixture.detectChanges();

    expect(onTouched).toHaveBeenCalled();
  });

  it('setDisabledState disables the host', () => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(hostEl().getAttribute('aria-disabled')).toBe('true');
  });
});
