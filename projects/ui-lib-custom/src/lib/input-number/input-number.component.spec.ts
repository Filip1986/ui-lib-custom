import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { ThemeVariant } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { InputNumberComponent } from './input-number.component';

class MockThemeConfigService {
  public readonly variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');

  public setVariant(variant: ThemeVariant): void {
    this.variant.set(variant);
  }

  public getPreset(): { variant: ThemeVariant; colors: Record<string, string> } {
    return { variant: this.variant(), colors: {} };
  }

  public getCssVars(): Record<string, string> {
    return {};
  }
}

@Component({
  standalone: true,
  imports: [FormsModule, InputNumberComponent],
  template: `
    <uilib-input-number
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
      [showButtons]="showButtons"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateDrivenHostComponent {
  public value: number | null = null;
  public showButtons: boolean = false;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberComponent],
  template: `
    <form [formGroup]="form">
      <uilib-input-number formControlName="amount" [showClear]="showClear" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public showClear: boolean = false;
  public readonly form: FormGroup<{ amount: FormControl<number | null> }> = new FormGroup<{
    amount: FormControl<number | null>;
  }>({
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });
}

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
  const element: T | null = root.querySelector(selector) as T | null;
  if (element === null) {
    throw new Error(`Expected element for selector: ${selector}`);
  }

  return element;
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

describe('InputNumberComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputNumberComponent, TemplateDrivenHostComponent, ReactiveHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeConfigService, useClass: MockThemeConfigService },
      ],
    }).compileComponents();
  });

  function createFixture(): ComponentFixture<InputNumberComponent> {
    const fixture: ComponentFixture<InputNumberComponent> =
      TestBed.createComponent(InputNumberComponent);
    refreshFixture(fixture);
    return fixture;
  }

  function createTemplateHostFixture(): ComponentFixture<TemplateDrivenHostComponent> {
    const fixture: ComponentFixture<TemplateDrivenHostComponent> = TestBed.createComponent(
      TemplateDrivenHostComponent
    );
    refreshFixture(fixture);
    return fixture;
  }

  function createReactiveFixture(): ComponentFixture<ReactiveHostComponent> {
    const fixture: ComponentFixture<ReactiveHostComponent> =
      TestBed.createComponent(ReactiveHostComponent);
    refreshFixture(fixture);
    return fixture;
  }

  function hostElement(fixture: ComponentFixture<InputNumberComponent>): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function nativeInput(fixture: ComponentFixture<InputNumberComponent>): HTMLInputElement {
    return requiredElement<HTMLInputElement>(
      hostElement(fixture),
      'input.uilib-input-number-input'
    );
  }

  function clearButton(fixture: ComponentFixture<InputNumberComponent>): HTMLButtonElement | null {
    return hostElement(fixture).querySelector(
      '.uilib-input-number-clear'
    ) as HTMLButtonElement | null;
  }

  function spinButton(
    fixture: ComponentFixture<InputNumberComponent>,
    direction: 'up' | 'down'
  ): HTMLButtonElement {
    return requiredElement<HTMLButtonElement>(
      hostElement(fixture),
      direction === 'up' ? '.uilib-input-number-button-up' : '.uilib-input-number-button-down'
    );
  }

  function setInput<K extends keyof InputNumberComponent>(
    fixture: ComponentFixture<InputNumberComponent>,
    name: K,
    value: unknown
  ): void {
    fixture.componentRef.setInput(name as string, value);
    refreshFixture(fixture);
  }

  function setInputs(
    fixture: ComponentFixture<InputNumberComponent>,
    values: Readonly<Record<string, unknown>>
  ): void {
    Object.entries(values).forEach(([name, value]: [string, unknown]): void => {
      fixture.componentRef.setInput(name, value);
    });
    refreshFixture(fixture);
  }

  function writeValue(fixture: ComponentFixture<InputNumberComponent>, value: number | null): void {
    fixture.componentInstance.writeValue(value);
    refreshFixture(fixture);
  }

  function typeValue(fixture: ComponentFixture<InputNumberComponent>, value: string): void {
    const input: HTMLInputElement = nativeInput(fixture);
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    refreshFixture(fixture);
  }

  describe('Rendering', (): void => {
    it('renders with default state', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      const host: HTMLElement = hostElement(fixture);

      expect(host.classList.contains('uilib-input-number')).toBeTruthy();
      expect(host.classList.contains('uilib-input-number-md')).toBeTruthy();
      expect(host.classList.contains('uilib-input-number-stacked')).toBeFalsy();
      expect(clearButton(fixture)).toBeNull();
    });

    it('renders with stacked buttons when showButtons is true', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, buttonLayout: 'stacked' });

      expect(hostElement(fixture).classList.contains('uilib-input-number-stacked')).toBeTruthy();
      expect(hostElement(fixture).querySelectorAll('.uilib-input-number-button').length).toBe(2);
    });

    it('renders with horizontal button layout', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, buttonLayout: 'horizontal' });

      expect(hostElement(fixture).classList.contains('uilib-input-number-horizontal')).toBeTruthy();
      expect(hostElement(fixture).querySelectorAll('.uilib-input-number-button').length).toBe(2);
    });

    it('renders with vertical button layout', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, buttonLayout: 'vertical' });

      expect(hostElement(fixture).classList.contains('uilib-input-number-vertical')).toBeTruthy();
      expect(hostElement(fixture).querySelectorAll('.uilib-input-number-button').length).toBe(2);
    });

    it('shows clear button when showClear is true and value is set', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showClear', true);
      writeValue(fixture, 25);

      expect(clearButton(fixture)).toBeTruthy();
    });

    it('hides clear button when value is null', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showClear', true);
      writeValue(fixture, null);

      expect(clearButton(fixture)).toBeNull();
    });

    it('applies size classes (sm, md, lg)', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'size', 'sm');
      expect(hostElement(fixture).classList.contains('uilib-input-number-sm')).toBeTruthy();

      setInput(fixture, 'size', 'md');
      expect(hostElement(fixture).classList.contains('uilib-input-number-md')).toBeTruthy();

      setInput(fixture, 'size', 'lg');
      expect(hostElement(fixture).classList.contains('uilib-input-number-lg')).toBeTruthy();
    });

    it('applies fluid class', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'fluid', true);

      expect(hostElement(fixture).classList.contains('uilib-input-number-fluid')).toBeTruthy();
    });

    it('applies filled class', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'filled', true);

      expect(hostElement(fixture).classList.contains('uilib-input-number-filled')).toBeTruthy();
    });

    it('applies invalid class', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'invalid', true);

      expect(hostElement(fixture).classList.contains('uilib-input-number-invalid')).toBeTruthy();
    });

    it('applies disabled state', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'disabled', true);

      expect(hostElement(fixture).classList.contains('uilib-input-number-disabled')).toBeTruthy();
      expect(nativeInput(fixture).disabled).toBeTruthy();
    });
  });

  describe('Formatting', (): void => {
    it('formats integer in decimal mode', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      writeValue(fixture, 1234);
      expect(nativeInput(fixture).value).toBe('1,234');
    });

    it('formats with minFractionDigits', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'minFractionDigits', 2);
      writeValue(fixture, 12);
      expect(nativeInput(fixture).value).toBe('12.00');
    });

    it('formats with maxFractionDigits', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'maxFractionDigits', 2);
      writeValue(fixture, 12.3456);
      expect(nativeInput(fixture).value).toBe('12.35');
    });

    it('formats currency USD', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { mode: 'currency', currency: 'USD', locale: 'en-US' });
      writeValue(fixture, 1234.5);
      expect(nativeInput(fixture).value).toBe('$1,234.50');
    });

    it('formats currency EUR in de-DE locale', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { mode: 'currency', currency: 'EUR', locale: 'de-DE' });
      writeValue(fixture, 1234.5);

      const formattedValue: string = nativeInput(fixture).value;
      expect(formattedValue).toContain('€');
      expect(formattedValue).toContain('1.234,50');
    });

    it('formats with custom prefix', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'prefix', '~');
      writeValue(fixture, 10);
      expect(nativeInput(fixture).value).toBe('~10');
    });

    it('formats with custom suffix', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'suffix', ' kg');
      writeValue(fixture, 10);
      expect(nativeInput(fixture).value).toBe('10 kg');
    });

    it('formats with useGrouping false', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'useGrouping', false);
      writeValue(fixture, 1234);
      expect(nativeInput(fixture).value).toBe('1234');
    });

    it('displays raw value when format is false', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { format: false, prefix: '$', suffix: ' USD' });
      writeValue(fixture, 1234);
      expect(nativeInput(fixture).value).toBe('$1234 USD');
    });
  });

  describe('User input & parsing', (): void => {
    it('typing digits updates value', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      typeValue(fixture, '42');
      expect(fixture.componentInstance.value()).toBe(42);
    });

    it('typing decimal separator works', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      typeValue(fixture, '12.5');
      expect(fixture.componentInstance.value()).toBe(12.5);
    });

    it('rejects non-numeric characters', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      const keyEvent: KeyboardEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'A',
      });
      const dispatchResult: boolean = nativeInput(fixture).dispatchEvent(keyEvent);
      refreshFixture(fixture);

      expect(dispatchResult).toBeFalsy();
    });

    it('handles paste with formatted text', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'prefix', '$');
      typeValue(fixture, '$1,234.50');
      expect(fixture.componentInstance.value()).toBe(1234.5);
    });

    it('empty input sets value to null', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      writeValue(fixture, 77);
      typeValue(fixture, '');
      expect(fixture.componentInstance.value()).toBeNull();
    });

    it('accepts negative numbers when min < 0', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'min', -10);
      typeValue(fixture, '-5');
      expect(fixture.componentInstance.value()).toBe(-5);
    });
  });

  describe('Spinner buttons', (): void => {
    afterEach((): void => {
      jest.useRealTimers();
    });

    it('click increment increases value by step', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showButtons', true);
      writeValue(fixture, 2);

      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBe(3);
    });

    it('click decrement decreases value by step', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showButtons', true);
      writeValue(fixture, 2);

      spinButton(fixture, 'down').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      spinButton(fixture, 'down').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBe(1);
    });

    it('supports custom step factor', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, step: 2 });
      writeValue(fixture, 1);

      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBe(3);
    });

    it('value clamps to max on increment', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, max: 5 });
      writeValue(fixture, 5);

      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBe(5);
    });

    it('value clamps to min on decrement', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, min: 1 });
      writeValue(fixture, 1);

      spinButton(fixture, 'down').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBe(1);
    });

    it('buttons disabled when at boundary', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showButtons: true, min: 0, max: 1 });
      writeValue(fixture, 1);

      expect(spinButton(fixture, 'up').disabled).toBeTruthy();
      writeValue(fixture, 0);
      expect(spinButton(fixture, 'down').disabled).toBeTruthy();
    });

    it('spinner starts from 0 when value is null', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showButtons', true);
      writeValue(fixture, null);

      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      spinButton(fixture, 'up').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBe(1);
    });

    it('repeats spin while holding with fake timers', (): void => {
      jest.useFakeTimers();

      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showButtons', true);
      writeValue(fixture, 0);

      const upButton: HTMLButtonElement = spinButton(fixture, 'up');
      upButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      jest.advanceTimersByTime(500);
      refreshFixture(fixture);
      upButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      expect(fixture.componentInstance.value()).toBeGreaterThan(1);
    });
  });

  describe('Keyboard', (): void => {
    function triggerKey(fixture: ComponentFixture<InputNumberComponent>, key: string): void {
      nativeInput(fixture).dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key,
        })
      );
      refreshFixture(fixture);
    }

    it('ArrowUp increments by step', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      writeValue(fixture, 1);
      triggerKey(fixture, 'ArrowUp');
      expect(fixture.componentInstance.value()).toBe(2);
    });

    it('ArrowDown decrements by step', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      writeValue(fixture, 1);
      triggerKey(fixture, 'ArrowDown');
      expect(fixture.componentInstance.value()).toBe(0);
    });

    it('PageUp increments by step * 10', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'step', 2);
      writeValue(fixture, 1);
      triggerKey(fixture, 'PageUp');
      expect(fixture.componentInstance.value()).toBe(21);
    });

    it('PageDown decrements by step * 10', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'step', 2);
      writeValue(fixture, 30);
      triggerKey(fixture, 'PageDown');
      expect(fixture.componentInstance.value()).toBe(10);
    });

    it('Home sets to min', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'min', 7);
      writeValue(fixture, 30);
      triggerKey(fixture, 'Home');
      expect(fixture.componentInstance.value()).toBe(7);
    });

    it('End sets to max', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'max', 11);
      writeValue(fixture, 3);
      triggerKey(fixture, 'End');
      expect(fixture.componentInstance.value()).toBe(11);
    });

    it('keyboard increment is disabled when readonly', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'readonly', true);
      writeValue(fixture, 3);
      triggerKey(fixture, 'ArrowUp');
      expect(fixture.componentInstance.value()).toBe(3);
    });
  });

  describe('CVA', (): void => {
    it('writeValue sets formatted display', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      writeValue(fixture, 1234.5);
      expect(nativeInput(fixture).value).toBe('1,234.5');
    });

    it('NgModel two-way binding updates host value', (): void => {
      const fixture: ComponentFixture<TemplateDrivenHostComponent> = createTemplateHostFixture();
      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        fixture.nativeElement as HTMLElement,
        'input.uilib-input-number-input'
      );

      input.value = '86';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.value).toBe(86);
    });

    it('reactive form binding writes value to input', (): void => {
      const fixture: ComponentFixture<ReactiveHostComponent> = createReactiveFixture();
      fixture.componentInstance.form.controls.amount.setValue(99);
      refreshFixture(fixture);

      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        fixture.nativeElement as HTMLElement,
        'input.uilib-input-number-input'
      );
      expect(input.value).toBe('99');
    });

    it('reactive form required validation works', (): void => {
      const fixture: ComponentFixture<ReactiveHostComponent> = createReactiveFixture();
      const control: FormControl<number | null> = fixture.componentInstance.form.controls.amount;

      control.setValue(null);
      control.markAsTouched();
      refreshFixture(fixture);

      expect(control.invalid).toBeTruthy();
      expect(control.hasError('required')).toBeTruthy();
    });

    it('setDisabledState disables input', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      fixture.componentInstance.setDisabledState(true);
      refreshFixture(fixture);

      expect(nativeInput(fixture).disabled).toBeTruthy();
      expect(hostElement(fixture).classList.contains('uilib-input-number-disabled')).toBeTruthy();
    });

    it('marks touched on blur in reactive form', (): void => {
      const fixture: ComponentFixture<ReactiveHostComponent> = createReactiveFixture();
      const control: FormControl<number | null> = fixture.componentInstance.form.controls.amount;
      const input: HTMLInputElement = requiredElement<HTMLInputElement>(
        fixture.nativeElement as HTMLElement,
        'input.uilib-input-number-input'
      );

      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      refreshFixture(fixture);

      expect(control.touched).toBeTruthy();
    });
  });

  describe('Clear button', (): void => {
    it('clicking clear sets value to null', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showClear', true);
      writeValue(fixture, 15);

      const clear: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.uilib-input-number-clear'
      );
      clear.click();
      refreshFixture(fixture);

      expect(fixture.componentInstance.value()).toBeNull();
      expect(nativeInput(fixture).value).toBe('');
    });

    it('emits onClear event', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'showClear', true);
      writeValue(fixture, 10);

      const clearSpy: jest.Mock<void, []> = jest.fn<void, []>();
      fixture.componentInstance.onClear.subscribe(clearSpy);

      const clear: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.uilib-input-number-clear'
      );
      clear.click();
      refreshFixture(fixture);

      expect(clearSpy).toHaveBeenCalledTimes(1);
    });

    it('clear button hidden when disabled', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { showClear: true, disabled: true });
      writeValue(fixture, 10);
      expect(clearButton(fixture)).toBeNull();
    });
  });

  describe('Accessibility', (): void => {
    it('input has role="spinbutton"', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      expect(nativeInput(fixture).getAttribute('role')).toBe('spinbutton');
    });

    it('aria-valuemin, aria-valuemax, aria-valuenow set correctly', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInputs(fixture, { min: 0, max: 10 });
      writeValue(fixture, 6);

      const input: HTMLInputElement = nativeInput(fixture);
      expect(input.getAttribute('aria-valuemin')).toBe('0');
      expect(input.getAttribute('aria-valuemax')).toBe('10');
      expect(input.getAttribute('aria-valuenow')).toBe('6');
    });

    it('ariaLabel applied', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'ariaLabel', 'Amount');
      expect(nativeInput(fixture).getAttribute('aria-label')).toBe('Amount');
    });

    it('ariaLabelledBy applied', (): void => {
      const fixture: ComponentFixture<InputNumberComponent> = createFixture();
      setInput(fixture, 'ariaLabelledBy', 'amount-label');
      expect(nativeInput(fixture).getAttribute('aria-labelledby')).toBe('amount-label');
    });
  });
});
