import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type WritableSignal,
  type DebugElement,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { RadioButton } from './radio-button';
import { SHARED_SIZE_OPTIONS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';
import type {
  RadioButtonAppearance,
  RadioButtonSize,
  RadioButtonVariant,
  RadioButtonChangeEvent,
} from './radio-button';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-radio-button') as HTMLElement;
}

function getNativeInput(fixture: ComponentFixture<unknown>): HTMLInputElement {
  return getHostElement(fixture).querySelector(
    '.ui-lib-radio-button__native-input'
  ) as HTMLInputElement;
}

function getBox(fixture: ComponentFixture<unknown>): HTMLElement {
  return getHostElement(fixture).querySelector('.ui-lib-radio-button__box') as HTMLElement;
}

function getLabel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getHostElement(fixture).querySelector('.ui-lib-radio-button__label');
}

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RadioButton],
  template: `
    <ui-lib-radio-button
      [label]="label()"
      [inputId]="inputId()"
      [name]="name()"
      [value]="value()"
      [required]="required()"
      [readonly]="readonly()"
      [disabled]="disabled()"
      [tabindex]="tabindex()"
      [autofocus]="autofocus()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabelledby()"
      [variant]="variant()"
      [size]="size()"
      [appearance]="appearance()"
      (change)="handleChange($event)"
      (focus)="handleFocus($event)"
      (blur)="handleBlur($event)"
    />
  `,
})
class HostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Option A');
  public readonly inputId: WritableSignal<string | null> = signal<string | null>(null);
  public readonly name: WritableSignal<string | null> = signal<string | null>('group');
  public readonly value: WritableSignal<string> = signal<string>('option-a');
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tabindex: WritableSignal<number> = signal<number>(0);
  public readonly autofocus: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabelledby: WritableSignal<string | null> = signal<string | null>(null);
  public readonly variant: WritableSignal<RadioButtonVariant> =
    signal<RadioButtonVariant>('material');
  public readonly size: WritableSignal<RadioButtonSize> = signal<RadioButtonSize>('md');
  public readonly appearance: WritableSignal<RadioButtonAppearance> =
    signal<RadioButtonAppearance>('outlined');

  public readonly lastChange: WritableSignal<RadioButtonChangeEvent | null> =
    signal<RadioButtonChangeEvent | null>(null);
  public readonly lastFocusEvent: WritableSignal<FocusEvent | null> = signal<FocusEvent | null>(
    null
  );
  public readonly lastBlurEvent: WritableSignal<FocusEvent | null> = signal<FocusEvent | null>(
    null
  );

  public handleChange(event: RadioButtonChangeEvent): void {
    this.lastChange.set(event);
  }

  public handleFocus(event: FocusEvent): void {
    this.lastFocusEvent.set(event);
  }

  public handleBlur(event: FocusEvent): void {
    this.lastBlurEvent.set(event);
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('RadioButton', (): void => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Creation ─────────────────────────────────────────────────────────────

  it('creates the component', (): void => {
    expect(host).toBeTruthy();
    const el: HTMLElement = getHostElement(fixture);
    expect(el.classList.contains('ui-lib-radio-button')).toBe(true);
  });

  it('applies default variant and size classes', (): void => {
    const el: HTMLElement = getHostElement(fixture);
    expect(el.classList.contains('ui-lib-radio-button--variant-material')).toBe(true);
    expect(el.classList.contains('ui-lib-radio-button--size-md')).toBe(true);
  });

  it('renders a native radio input', (): void => {
    const input: HTMLInputElement = getNativeInput(fixture);
    expect(input).toBeTruthy();
    expect(input.type).toBe('radio');
  });

  it('renders a visual box element', (): void => {
    expect(getBox(fixture)).toBeTruthy();
  });

  // ── Label ─────────────────────────────────────────────────────────────────

  it('renders a visible label when the label input is set', (): void => {
    const label: HTMLElement | null = getLabel(fixture);
    expect(label).toBeTruthy();
    expect(label?.textContent).toContain('Option A');
  });

  it('does not render the label element when label input is null', (): void => {
    host.label.set(null);
    fixture.detectChanges();
    expect(getLabel(fixture)).toBeNull();
  });

  it('connects label for attribute to native input id', (): void => {
    const input: HTMLInputElement = getNativeInput(fixture);
    const label: HTMLElement | null = getLabel(fixture);
    expect(label?.getAttribute('for')).toBe(input.id);
  });

  // ── Variant ───────────────────────────────────────────────────────────────

  it('applies each variant class', (): void => {
    const variants: RadioButtonVariant[] = [...SHARED_VARIANT_OPTIONS];
    for (const variant of variants) {
      host.variant.set(variant);
      fixture.detectChanges();
      expect(
        getHostElement(fixture).classList.contains(`ui-lib-radio-button--variant-${variant}`)
      ).toBe(true);
    }
  });

  // ── Size ──────────────────────────────────────────────────────────────────

  it('applies each size class', (): void => {
    const sizes: RadioButtonSize[] = [...SHARED_SIZE_OPTIONS];
    for (const size of sizes) {
      host.size.set(size);
      fixture.detectChanges();
      expect(getHostElement(fixture).classList.contains(`ui-lib-radio-button--size-${size}`)).toBe(
        true
      );
    }
  });

  // ── Appearance ────────────────────────────────────────────────────────────

  it('does not apply filled class when appearance is outlined', (): void => {
    expect(getHostElement(fixture).classList.contains('radio-button--filled')).toBe(false);
  });

  it('applies filled class when appearance is filled', (): void => {
    host.appearance.set('filled');
    fixture.detectChanges();
    expect(getHostElement(fixture).classList.contains('radio-button--filled')).toBe(true);
  });

  // ── Checked state (CVA) ───────────────────────────────────────────────────

  it('is not checked by default (no writeValue has been called)', (): void => {
    const el: HTMLElement = getHostElement(fixture);
    expect(el.classList.contains('ui-lib-radio-button--checked')).toBe(false);
  });

  it('becomes checked when writeValue receives the matching value', (): void => {
    const radioButton: RadioButton = fixture.debugElement.query(
      (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof RadioButton
    ).componentInstance as RadioButton;

    radioButton.writeValue('option-a');
    fixture.detectChanges();

    const el: HTMLElement = getHostElement(fixture);
    expect(el.classList.contains('ui-lib-radio-button--checked')).toBe(true);
    expect(getNativeInput(fixture).checked).toBe(true);
  });

  it('is not checked when writeValue receives a different value', (): void => {
    const radioButton: RadioButton = fixture.debugElement.query(
      (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof RadioButton
    ).componentInstance as RadioButton;

    radioButton.writeValue('option-b');
    fixture.detectChanges();

    expect(getHostElement(fixture).classList.contains('ui-lib-radio-button--checked')).toBe(false);
  });

  // ── Selection via click ────────────────────────────────────────────────────

  it('emits change event with the bound value when clicked', (): void => {
    const input: HTMLInputElement = getNativeInput(fixture);
    input.click();
    fixture.detectChanges();

    const changeEvent: RadioButtonChangeEvent | null = host.lastChange();
    expect(changeEvent).toBeTruthy();
    expect(changeEvent?.value).toBe('option-a');
  });

  it('marks the radio as checked after click', (): void => {
    getNativeInput(fixture).click();
    fixture.detectChanges();

    expect(getHostElement(fixture).classList.contains('ui-lib-radio-button--checked')).toBe(true);
  });

  it('emits the originalEvent with the change', (): void => {
    getNativeInput(fixture).click();
    fixture.detectChanges();

    expect(host.lastChange()?.originalEvent).toBeInstanceOf(MouseEvent);
  });

  // ── Disabled ──────────────────────────────────────────────────────────────

  it('applies disabled class when disabled', (): void => {
    host.disabled.set(true);
    fixture.detectChanges();
    expect(getHostElement(fixture).classList.contains('ui-lib-radio-button--disabled')).toBe(true);
  });

  it('sets native input disabled attribute when disabled', (): void => {
    host.disabled.set(true);
    fixture.detectChanges();
    expect(getNativeInput(fixture).disabled).toBe(true);
  });

  it('does not emit change when disabled', (): void => {
    host.disabled.set(true);
    fixture.detectChanges();

    getNativeInput(fixture).click();
    fixture.detectChanges();

    expect(host.lastChange()).toBeNull();
  });

  it('accepts setDisabledState from parent form control', (): void => {
    const radioButton: RadioButton = fixture.debugElement.query(
      (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof RadioButton
    ).componentInstance as RadioButton;

    radioButton.setDisabledState(true);
    fixture.detectChanges();

    expect(getHostElement(fixture).classList.contains('ui-lib-radio-button--disabled')).toBe(true);
  });

  // ── Readonly ──────────────────────────────────────────────────────────────

  it('does not emit change when readonly', (): void => {
    host.readonly.set(true);
    fixture.detectChanges();

    getNativeInput(fixture).click();
    fixture.detectChanges();

    expect(host.lastChange()).toBeNull();
  });

  it('state is unchanged after click when readonly', (): void => {
    const radioButton: RadioButton = fixture.debugElement.query(
      (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof RadioButton
    ).componentInstance as RadioButton;

    // Start unchecked
    radioButton.writeValue('option-b');
    fixture.detectChanges();
    expect(getHostElement(fixture).classList.contains('ui-lib-radio-button--checked')).toBe(false);

    host.readonly.set(true);
    fixture.detectChanges();

    getNativeInput(fixture).click();
    fixture.detectChanges();

    expect(getHostElement(fixture).classList.contains('ui-lib-radio-button--checked')).toBe(false);
  });

  // ── ARIA attributes ────────────────────────────────────────────────────────

  it('sets aria-label on the native input', (): void => {
    host.ariaLabel.set('Choose option A');
    fixture.detectChanges();
    expect(getNativeInput(fixture).getAttribute('aria-label')).toBe('Choose option A');
  });

  it('sets aria-labelledby to label element id when label is provided', (): void => {
    const input: HTMLInputElement = getNativeInput(fixture);
    const labelledby: string | null = input.getAttribute('aria-labelledby');
    expect(labelledby).toContain('label');
  });

  it('does not set aria-labelledby when ariaLabel is provided', (): void => {
    host.ariaLabel.set('Explicit label');
    fixture.detectChanges();
    expect(getNativeInput(fixture).getAttribute('aria-labelledby')).toBeNull();
  });

  it('sets custom aria-labelledby when provided', (): void => {
    host.ariaLabelledby.set('external-label-id');
    fixture.detectChanges();
    expect(getNativeInput(fixture).getAttribute('aria-labelledby')).toBe('external-label-id');
  });

  it('sets required attribute on native input', (): void => {
    host.required.set(true);
    fixture.detectChanges();
    expect(getNativeInput(fixture).required).toBe(true);
  });

  it('sets the name attribute on native input', (): void => {
    expect(getNativeInput(fixture).getAttribute('name')).toBe('group');
  });

  // ── Custom inputId ────────────────────────────────────────────────────────

  it('uses the provided inputId on the native input', (): void => {
    host.inputId.set('my-radio');
    fixture.detectChanges();
    expect(getNativeInput(fixture).id).toBe('my-radio');
  });

  // ── Tab index ─────────────────────────────────────────────────────────────

  it('applies tabindex to native input', (): void => {
    host.tabindex.set(2);
    fixture.detectChanges();
    expect(getNativeInput(fixture).getAttribute('tabindex')).toBe('2');
  });

  it('sets tabindex to -1 when disabled', (): void => {
    host.disabled.set(true);
    fixture.detectChanges();
    expect(getNativeInput(fixture).getAttribute('tabindex')).toBe('-1');
  });

  // ── Focus / blur outputs ──────────────────────────────────────────────────

  it('emits focus event', (): void => {
    const focusEvent: FocusEvent = new FocusEvent('focus');
    getNativeInput(fixture).dispatchEvent(focusEvent);
    fixture.detectChanges();
    expect(host.lastFocusEvent()).toBeTruthy();
  });

  it('emits blur event', (): void => {
    const blurEvent: FocusEvent = new FocusEvent('blur');
    getNativeInput(fixture).dispatchEvent(blurEvent);
    fixture.detectChanges();
    expect(host.lastBlurEvent()).toBeTruthy();
  });
});

// ── ngModel integration ───────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RadioButton, FormsModule],
  template: `
    <ui-lib-radio-button name="city" value="chicago" [(ngModel)]="selectedCity" label="Chicago" />
    <ui-lib-radio-button name="city" value="berlin" [(ngModel)]="selectedCity" label="Berlin" />
  `,
})
class NgModelHostComponent {
  public selectedCity: string = '';
}

describe('RadioButton — ngModel', (): void => {
  let fixture: ComponentFixture<NgModelHostComponent>;
  let host: NgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [NgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is not checked initially when selectedCity is empty', (): void => {
    const radioButtons: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('ui-lib-radio-button');

    for (const radio of Array.from(radioButtons)) {
      expect(radio.classList.contains('ui-lib-radio-button--checked')).toBe(false);
    }
  });

  it('checks the correct radio when model is set to matching value', async (): Promise<void> => {
    host.selectedCity = 'chicago';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const radioElements: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-radio-button')
    );

    expect(radioElements[0]?.classList.contains('ui-lib-radio-button--checked')).toBe(true);
    expect(radioElements[1]?.classList.contains('ui-lib-radio-button--checked')).toBe(false);
  });
});

// ── Reactive forms integration ────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RadioButton, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ui-lib-radio-button name="tier" value="free" formControlName="tier" label="Free" />
      <ui-lib-radio-button name="tier" value="pro" formControlName="tier" label="Pro" />
    </form>
  `,
})
class ReactiveHostComponent {
  public readonly form: FormGroup = new FormGroup({
    tier: new FormControl<string>(''),
  });
}

describe('RadioButton — reactive forms', (): void => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let host: ReactiveHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders two radio buttons', (): void => {
    const radios: NodeListOf<HTMLElement> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'ui-lib-radio-button'
    );

    expect(radios.length).toBe(2);
  });

  it('updates the form control when a radio is clicked', (): void => {
    const inputs: HTMLInputElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
        '.ui-lib-radio-button__native-input'
      )
    );

    inputs[1]?.click();
    fixture.detectChanges();

    expect(host.form.get('tier')?.value).toBe('pro');
  });

  it('disables radio buttons when the form control is disabled', (): void => {
    host.form.get('tier')?.disable();
    fixture.detectChanges();

    const radioElements: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('ui-lib-radio-button');

    for (const radio of Array.from(radioElements)) {
      expect(radio.classList.contains('ui-lib-radio-button--disabled')).toBe(true);
    }
  });
});
