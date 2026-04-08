import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskComponent } from './input-mask.component';
import type { InputMaskCompleteEvent } from './input-mask.types';

@Component({
  standalone: true,
  imports: [FormsModule, InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <uilib-input-mask
      [mask]="mask"
      [slotChar]="slotChar"
      [autoClear]="autoClear"
      [keepBuffer]="keepBuffer"
      [unmask]="unmask"
      [showClear]="showClear"
      [size]="size"
      [filled]="filled"
      [fluid]="fluid"
      [invalid]="invalid"
      [disabled]="disabled"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      (completed)="onCompleted($event)"
      (focused)="onFocused($event)"
      (blurred)="onBlurred($event)"
      (cleared)="onCleared()"
    />
  `,
})
class InputMaskHostComponent {
  public mask: string = '(999) 999-9999';
  public slotChar: string = '_';
  public autoClear: boolean = true;
  public keepBuffer: boolean = false;
  public unmask: boolean = false;
  public showClear: boolean = false;
  public size: 'sm' | 'md' | 'lg' = 'md';
  public filled: boolean = false;
  public fluid: boolean = false;
  public invalid: boolean = false;
  public disabled: boolean = false;
  public value: string | null = null;

  public completedEvents: InputMaskCompleteEvent[] = [];
  public focusEvents: Event[] = [];
  public blurEvents: Event[] = [];
  public clearCount: number = 0;

  public onCompleted(event: InputMaskCompleteEvent): void {
    this.completedEvents.push(event);
  }

  public onFocused(event: Event): void {
    this.focusEvents.push(event);
  }

  public onBlurred(event: Event): void {
    this.blurEvents.push(event);
  }

  public onCleared(): void {
    this.clearCount += 1;
  }
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <uilib-input-mask mask="(999) 999-9999" formControlName="phone" />
    </form>
  `,
})
class InputMaskReactiveHostComponent {
  public readonly form: FormGroup<{ phone: FormControl<string | null> }> = new FormGroup<{
    phone: FormControl<string | null>;
  }>({
    phone: new FormControl<string | null>(null),
  });
}

describe('InputMaskComponent', (): void => {
  let fixture: ComponentFixture<InputMaskHostComponent>;

  beforeEach(async (): Promise<void> => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [InputMaskHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputMaskHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  function hostComponent(): InputMaskHostComponent {
    return fixture.componentInstance;
  }

  function componentElement(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('uilib-input-mask') as HTMLElement;
  }

  function inputElement(): HTMLInputElement {
    return (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
  }

  function clearIcon(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('.uilib-input-mask-clear-icon');
  }

  function flushTimers(): void {
    jest.runOnlyPendingTimers();
    fixture.detectChanges();
  }

  function keyboardEvent(
    type: 'keydown' | 'keypress',
    key: string,
    keyCode: number
  ): KeyboardEvent {
    const event: KeyboardEvent = new KeyboardEvent(type, {
      key,
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, 'which', { value: keyCode });
    Object.defineProperty(event, 'keyCode', { value: keyCode });
    return event;
  }

  function focusInput(): void {
    inputElement().dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    jest.advanceTimersByTime(10);
    fixture.detectChanges();
  }

  function blurInput(): void {
    inputElement().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
  }

  function setCaret(begin: number, end: number = begin): void {
    inputElement().setSelectionRange(begin, end);
    fixture.detectChanges();
  }

  function typeMaskedText(text: string): void {
    focusInput();

    for (const character of text) {
      const keyCode: number = character.charCodeAt(0);
      inputElement().dispatchEvent(keyboardEvent('keypress', character, keyCode));
      fixture.detectChanges();
    }
  }

  it('renders with the default phone mask host state', (): void => {
    expect(componentElement().classList.contains('uilib-input-mask')).toBeTruthy();
    expect(inputElement().value).toBe('');
  });

  it('applies size classes for sm, md, and lg', (): void => {
    expect(componentElement().classList.contains('uilib-input-mask-sm')).toBeFalsy();
    expect(componentElement().classList.contains('uilib-input-mask-lg')).toBeFalsy();

    hostComponent().size = 'sm';
    fixture.detectChanges();
    expect(componentElement().classList.contains('uilib-input-mask-sm')).toBeTruthy();

    const largeFixture: ComponentFixture<InputMaskHostComponent> =
      TestBed.createComponent(InputMaskHostComponent);
    largeFixture.componentInstance.size = 'lg';
    largeFixture.detectChanges();

    const largeHostElement: HTMLElement = (largeFixture.nativeElement as HTMLElement).querySelector(
      'uilib-input-mask'
    ) as HTMLElement;
    expect(largeHostElement.classList.contains('uilib-input-mask-lg')).toBeTruthy();

    largeFixture.destroy();
  });

  it('applies filled, fluid, invalid, and disabled host classes', (): void => {
    hostComponent().filled = true;
    hostComponent().fluid = true;
    hostComponent().invalid = true;
    hostComponent().disabled = true;
    fixture.detectChanges();

    expect(componentElement().classList.contains('uilib-input-mask-filled')).toBeTruthy();
    expect(componentElement().classList.contains('uilib-input-mask-fluid')).toBeTruthy();
    expect(componentElement().classList.contains('uilib-input-mask-invalid')).toBeTruthy();
    expect(componentElement().classList.contains('uilib-input-mask-disabled')).toBeTruthy();
    expect(inputElement().disabled).toBeTruthy();
  });

  it('formats phone input as (123) 456-7890', (): void => {
    typeMaskedText('1234567890');
    expect(inputElement().value).toBe('(123) 456-7890');
  });

  it('formats date input as 01/01/2025', (): void => {
    hostComponent().mask = '99/99/9999';
    fixture.detectChanges();

    typeMaskedText('01012025');
    expect(inputElement().value).toBe('01/01/2025');
  });

  it('supports mixed masks and rejects invalid alpha-first input', (): void => {
    hostComponent().mask = 'a*9';
    hostComponent().keepBuffer = true;
    fixture.detectChanges();

    typeMaskedText('A12');
    expect(inputElement().value).toBe('A12');

    const component: InputMaskComponent = fixture.debugElement.query(
      By.directive(InputMaskComponent)
    ).componentInstance as InputMaskComponent;
    component.clear();
    fixture.detectChanges();

    typeMaskedText('111');
    expect(inputElement().value.startsWith('1')).toBeFalsy();
  });

  it('renders slot char placeholders for default and custom slot chars with keepBuffer', (): void => {
    hostComponent().keepBuffer = true;
    fixture.detectChanges();

    focusInput();
    expect(inputElement().value).toBe('(___) ___-____');

    hostComponent().slotChar = '#';
    fixture.detectChanges();
    focusInput();
    expect(inputElement().value).toBe('(###) ###-####');
  });

  it('treats optional suffix mask portion as optional for completion', (): void => {
    hostComponent().mask = '(999) 999-9999? x99999';
    fixture.detectChanges();

    typeMaskedText('1234567890');
    blurInput();

    expect(inputElement().value).toContain('(123) 456-7890');
    expect(hostComponent().completedEvents.length).toBe(1);
  });

  it('auto-inserts literals while typing into (999)', (): void => {
    hostComponent().mask = '(999)';
    fixture.detectChanges();

    typeMaskedText('123');
    expect(inputElement().value).toBe('(123)');
  });

  it('positions caret on focus and advances caret over literals on typing', (): void => {
    focusInput();
    const focusedStart: number | null = inputElement().selectionStart;

    inputElement().dispatchEvent(keyboardEvent('keypress', '1', '1'.charCodeAt(0)));
    fixture.detectChanges();

    expect(inputElement().selectionStart).toBeGreaterThan(focusedStart ?? 0);
  });

  it('backspace removes the previous editable character and shifts left', (): void => {
    typeMaskedText('1234567890');
    setCaret(inputElement().value.length);

    inputElement().dispatchEvent(keyboardEvent('keydown', 'Backspace', 8));
    fixture.detectChanges();

    expect(inputElement().value).toBe('(123) 456-789_');
  });

  it('delete removes the current editable character and shifts left', (): void => {
    typeMaskedText('1234567890');
    setCaret(1);

    inputElement().dispatchEvent(keyboardEvent('keydown', 'Delete', 46));
    fixture.detectChanges();

    expect(inputElement().value).toBe('(234) 567-890_');
  });

  it('clears incomplete input on blur when autoClear is true', (): void => {
    typeMaskedText('123');
    blurInput();

    expect(inputElement().value).toBe('');
  });

  it('preserves incomplete input on blur when autoClear is false', (): void => {
    hostComponent().autoClear = false;
    fixture.detectChanges();

    typeMaskedText('123');
    blurInput();

    expect(inputElement().value).toContain('(123)');
  });

  it('preserves mask buffer on clear when keepBuffer is true', (): void => {
    hostComponent().showClear = true;
    hostComponent().keepBuffer = true;
    fixture.detectChanges();

    typeMaskedText('1234567890');
    const icon: HTMLElement | null = clearIcon();
    expect(icon).toBeTruthy();

    icon?.click();
    fixture.detectChanges();

    expect(inputElement().value).toBe('(___) ___-____');
  });

  it('resets to empty on clear when keepBuffer is false', (): void => {
    hostComponent().showClear = true;
    fixture.detectChanges();

    typeMaskedText('1234567890');
    const icon: HTMLElement | null = clearIcon();
    expect(icon).toBeTruthy();

    icon?.click();
    fixture.detectChanges();

    expect(inputElement().value).toBe('');
  });

  it('emits masked value by default and unmasked value when unmask is true', (): void => {
    typeMaskedText('1234567890');
    expect(hostComponent().value).toBe('(123) 456-7890');

    const component: InputMaskComponent = fixture.debugElement.query(
      By.directive(InputMaskComponent)
    ).componentInstance as InputMaskComponent;
    component.clear();

    hostComponent().unmask = true;
    fixture.detectChanges();

    typeMaskedText('1234567890');
    expect(hostComponent().value).toBe('1234567890');
  });

  it('integrates with ngModel updates and disabled state via CVA', (): void => {
    typeMaskedText('1234567890');
    expect(hostComponent().value).toBe('(123) 456-7890');

    const component: InputMaskComponent = fixture.debugElement.query(
      By.directive(InputMaskComponent)
    ).componentInstance as InputMaskComponent;
    component.writeValue('1234567890');
    fixture.detectChanges();

    expect(inputElement().value).toBe('(123) 456-7890');

    component.setDisabledState(true);
    fixture.detectChanges();

    expect(inputElement().disabled).toBeTruthy();
  });

  it('emits focused, blurred, completed, and cleared events', (): void => {
    hostComponent().showClear = true;
    fixture.detectChanges();

    focusInput();
    expect(hostComponent().focusEvents.length).toBe(1);

    typeMaskedText('1234567890');
    expect(hostComponent().completedEvents.length).toBe(1);

    blurInput();
    expect(hostComponent().blurEvents.length).toBe(1);

    const icon: HTMLElement | null = clearIcon();
    icon?.click();
    fixture.detectChanges();
    expect(hostComponent().clearCount).toBe(1);
  });

  it('handles clear icon visibility rules and resets model to null', (): void => {
    hostComponent().showClear = true;
    fixture.detectChanges();
    expect(clearIcon()).toBeNull();

    typeMaskedText('1234567890');
    expect(clearIcon()).toBeTruthy();

    const component: InputMaskComponent = fixture.debugElement.query(
      By.directive(InputMaskComponent)
    ).componentInstance as InputMaskComponent;
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(clearIcon()).toBeNull();

    component.setDisabledState(false);
    fixture.detectChanges();

    const icon: HTMLElement | null = clearIcon();
    icon?.click();
    fixture.detectChanges();

    expect(hostComponent().value).toBeNull();
  });

  it('re-initializes mask behavior when mask changes at runtime', (): void => {
    typeMaskedText('1234567890');
    expect(inputElement().value).toBe('(123) 456-7890');

    hostComponent().mask = '99/99/9999';
    fixture.detectChanges();

    const component: InputMaskComponent = fixture.debugElement.query(
      By.directive(InputMaskComponent)
    ).componentInstance as InputMaskComponent;
    component.clear();
    fixture.detectChanges();

    typeMaskedText('01012025');
    expect(inputElement().value).toBe('01/01/2025');
  });

  it('updates float-label integration classes for filled and focus states', (): void => {
    expect(componentElement().classList.contains('uilib-inputwrapper-filled')).toBeFalsy();

    typeMaskedText('1');
    expect(componentElement().classList.contains('uilib-inputwrapper-filled')).toBeTruthy();
    expect(componentElement().classList.contains('uilib-inputwrapper-focus')).toBeTruthy();

    blurInput();
    expect(componentElement().classList.contains('uilib-inputwrapper-focus')).toBeFalsy();
  });

  it('processes standard input and paste events through mask validation', (): void => {
    inputElement().value = '1234567890';
    inputElement().dispatchEvent(new Event('input'));
    fixture.detectChanges();
    flushTimers();

    expect(inputElement().value).toBe('(123) 456-7890');

    inputElement().value = '1112223333';
    inputElement().dispatchEvent(new Event('paste'));
    fixture.detectChanges();
    flushTimers();

    expect(inputElement().value).toBe('(111) 222-3333');
  });
});

describe('InputMaskComponent reactive forms integration', (): void => {
  let fixture: ComponentFixture<InputMaskReactiveHostComponent>;

  beforeEach(async (): Promise<void> => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [InputMaskReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputMaskReactiveHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  function inputElement(): HTMLInputElement {
    return (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
  }

  function keyboardEvent(character: string): KeyboardEvent {
    const keyCode: number = character.charCodeAt(0);
    const event: KeyboardEvent = new KeyboardEvent('keypress', {
      key: character,
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, 'which', { value: keyCode });
    Object.defineProperty(event, 'keyCode', { value: keyCode });
    return event;
  }

  function focusInput(): void {
    inputElement().dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    jest.advanceTimersByTime(10);
    fixture.detectChanges();
  }

  it('writes form-control values into the mask buffer', (): void => {
    fixture.componentInstance.form.controls.phone.setValue('1234567890');
    fixture.detectChanges();

    expect(inputElement().value).toBe('(123) 456-7890');
  });

  it('propagates typed values to the form control', (): void => {
    focusInput();

    for (const character of '1234567890') {
      inputElement().dispatchEvent(keyboardEvent(character));
      fixture.detectChanges();
    }

    expect(fixture.componentInstance.form.controls.phone.value).toBe('(123) 456-7890');
  });

  it('reflects disabled state from the form control', (): void => {
    fixture.componentInstance.form.controls.phone.disable();
    fixture.detectChanges();

    expect(inputElement().disabled).toBeTruthy();
  });
});
