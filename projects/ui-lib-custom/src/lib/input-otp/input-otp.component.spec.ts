import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputOtpComponent } from './input-otp.component';
import type { InputOtpChangeEvent } from './input-otp.types';

// ---------------------------------------------------------------------------
// Typed DOM helpers
// ---------------------------------------------------------------------------

function queryAll(fixture: ComponentFixture<unknown>, selector: string): HTMLInputElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(selector)
  );
}

function queryEl(fixture: ComponentFixture<unknown>, selector: string): HTMLElement {
  const element: HTMLElement | null = (
    fixture.nativeElement as HTMLElement
  ).querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}

// ---------------------------------------------------------------------------
// Host — ngModel (uses WritableSignal for OnPush + zoneless reactivity)
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormsModule, InputOtpComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <uilib-input-otp
      [length]="length()"
      [mask]="mask()"
      [integerOnly]="integerOnly()"
      [filled]="filled()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [invalid]="invalid()"
      [size]="size()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      (changed)="onChanged($event)"
      (focused)="onFocused($event)"
      (blurred)="onBlurred($event)"
      (completed)="onCompleted($event)"
    />
  `,
})
class InputOtpHostComponent {
  public readonly length: WritableSignal<number> = signal<number>(4);
  public readonly mask: WritableSignal<boolean> = signal<boolean>(false);
  public readonly integerOnly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly filled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public value: string = '';

  public readonly changeEvents: InputOtpChangeEvent[] = [];
  public readonly focusEvents: FocusEvent[] = [];
  public readonly blurEvents: FocusEvent[] = [];
  public readonly completedValues: string[] = [];

  public onChanged(event: InputOtpChangeEvent): void {
    this.changeEvents.push(event);
  }
  public onFocused(event: FocusEvent): void {
    this.focusEvents.push(event);
  }
  public onBlurred(event: FocusEvent): void {
    this.blurEvents.push(event);
  }
  public onCompleted(value: string): void {
    this.completedValues.push(value);
  }
}

// ---------------------------------------------------------------------------
// Host — reactive form
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputOtpComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <uilib-input-otp [length]="4" formControlName="otp" />
    </form>
  `,
})
class ReactiveHostComponent {
  public readonly form: FormGroup = new FormGroup({
    otp: new FormControl(''),
  });
}

// ---------------------------------------------------------------------------
// Event helpers
// ---------------------------------------------------------------------------

function createInputEvent(value: string, inputType: string = 'insertText'): InputEvent {
  const event: InputEvent = new InputEvent('input', { bubbles: true, inputType });
  Object.defineProperty(event, 'target', { value: { value }, configurable: true });
  return event;
}

function createKeydownEvent(key: string, targetValue: string = ''): KeyboardEvent {
  const event: KeyboardEvent = new KeyboardEvent('keydown', { bubbles: true, key });
  Object.defineProperty(event, 'target', { value: { value: targetValue }, configurable: true });
  return event;
}

function createPasteEvent(text: string): ClipboardEvent {
  const EventCtor: typeof ClipboardEvent =
    typeof ClipboardEvent !== 'undefined'
      ? ClipboardEvent
      : (Event as unknown as typeof ClipboardEvent);
  const event: ClipboardEvent = new EventCtor('paste', { bubbles: true });
  Object.defineProperty(event, 'clipboardData', {
    value: { getData: (_format: string): string => text } as unknown as DataTransfer,
    configurable: true,
  });
  return event;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('InputOtpComponent', (): void => {
  async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
    await TestBed.configureTestingModule({
      imports: [component],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<T> = TestBed.createComponent(component);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  describe('rendering', (): void => {
    it('should create with default 4 cells', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells.length).toBe(4);
    });

    it('should render the correct number of cells when length changes', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.length.set(6);
      fixture.detectChanges();
      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells.length).toBe(6);
    });

    it('should apply host class uilib-input-otp', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const host: HTMLElement = queryEl(fixture, 'uilib-input-otp');
      expect(host.classList).toContain('uilib-input-otp');
    });

    it('should set aria-label on each cell', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells[0]?.getAttribute('aria-label')).toBe('OTP digit 1 of 4');
      expect(cells[3]?.getAttribute('aria-label')).toBe('OTP digit 4 of 4');
    });

    it('should set autocomplete="one-time-code" on first cell only', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells[0]?.getAttribute('autocomplete')).toBe('one-time-code');
      expect(cells[1]?.getAttribute('autocomplete')).toBe('off');
    });
  });

  // -------------------------------------------------------------------------
  // Size variants
  // -------------------------------------------------------------------------

  describe('size variants', (): void => {
    it('should apply sm class for size="sm"', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-input-otp');
      expect(host.classList).toContain('uilib-input-otp-sm');
    });

    it('should apply lg class for size="lg"', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-input-otp');
      expect(host.classList).toContain('uilib-input-otp-lg');
    });

    it('should not apply size class for size="md" (default)', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const host: HTMLElement = queryEl(fixture, 'uilib-input-otp');
      expect(host.classList).not.toContain('uilib-input-otp-sm');
      expect(host.classList).not.toContain('uilib-input-otp-lg');
    });
  });

  // -------------------------------------------------------------------------
  // State inputs
  // -------------------------------------------------------------------------

  describe('state inputs', (): void => {
    it('should apply disabled class and attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-input-otp');
      expect(host.classList).toContain('uilib-input-otp-disabled');
      queryAll(fixture, 'input.uilib-input-otp-cell').forEach((cell: HTMLInputElement): void => {
        expect(cell.disabled).toBe(true);
      });
    });

    it('should apply readonly class and attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-input-otp');
      expect(host.classList).toContain('uilib-input-otp-readonly');
      queryAll(fixture, 'input.uilib-input-otp-cell').forEach((cell: HTMLInputElement): void => {
        expect(cell.readOnly).toBe(true);
      });
    });

    it('should apply invalid class', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.invalid.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-input-otp').classList).toContain('uilib-input-otp-invalid');
    });

    it('should apply filled class', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.filled.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-input-otp').classList).toContain('uilib-input-otp-filled');
    });
  });

  // -------------------------------------------------------------------------
  // Mask mode
  // -------------------------------------------------------------------------

  describe('mask mode', (): void => {
    it('should set input type to password when mask=true', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.mask.set(true);
      fixture.detectChanges();
      queryAll(fixture, 'input.uilib-input-otp-cell').forEach((cell: HTMLInputElement): void => {
        expect(cell.type).toBe('password');
      });
    });

    it('should use type="text" by default', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      queryAll(fixture, 'input.uilib-input-otp-cell').forEach((cell: HTMLInputElement): void => {
        expect(cell.type).toBe('text');
      });
    });
  });

  // -------------------------------------------------------------------------
  // integerOnly
  // -------------------------------------------------------------------------

  describe('integerOnly', (): void => {
    it('should set inputMode="numeric" when integerOnly=true', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.integerOnly.set(true);
      fixture.detectChanges();
      queryAll(fixture, 'input.uilib-input-otp-cell').forEach((cell: HTMLInputElement): void => {
        expect(cell.inputMode).toBe('numeric');
      });
    });
  });

  // -------------------------------------------------------------------------
  // CVA: writeValue
  // -------------------------------------------------------------------------

  describe('writeValue', (): void => {
    it('should populate cells from writeValue', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.writeValue('1234');
      fixture.detectChanges();

      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells[0]?.value).toBe('1');
      expect(cells[1]?.value).toBe('2');
      expect(cells[2]?.value).toBe('3');
      expect(cells[3]?.value).toBe('4');
    });

    it('should clear all cells on null value', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.writeValue('1234');
      fixture.detectChanges();
      component.writeValue(null);
      fixture.detectChanges();

      queryAll(fixture, 'input.uilib-input-otp-cell').forEach((cell: HTMLInputElement): void => {
        expect(cell.value).toBe('');
      });
    });

    it('should truncate value longer than length', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.writeValue('123456');
      fixture.detectChanges();

      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells.length).toBe(4);
      expect(cells[3]?.value).toBe('4');
    });
  });

  // -------------------------------------------------------------------------
  // CVA: ngModel binding
  // -------------------------------------------------------------------------

  describe('ngModel integration', (): void => {
    it('should populate cells when writeValue is called (ngModel path)', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      // Simulate ngModel writing a value via the CVA channel.
      component.writeValue('AB12');
      fixture.detectChanges();

      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells[0]?.value).toBe('A');
      expect(cells[1]?.value).toBe('B');
      expect(cells[2]?.value).toBe('1');
      expect(cells[3]?.value).toBe('2');
    });
  });

  // -------------------------------------------------------------------------
  // CVA: reactive forms
  // -------------------------------------------------------------------------

  describe('reactive forms integration', (): void => {
    it('should bind to a reactive FormControl', async (): Promise<void> => {
      const fixture: ComponentFixture<ReactiveHostComponent> =
        await createFixture(ReactiveHostComponent);

      fixture.componentInstance.form.setValue({ otp: '9876' });
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const cells: HTMLInputElement[] = queryAll(fixture, 'input.uilib-input-otp-cell');
      expect(cells[0]?.value).toBe('9');
      expect(cells[3]?.value).toBe('6');
    });

    it('should disable cells when form control is disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<ReactiveHostComponent> =
        await createFixture(ReactiveHostComponent);
      fixture.componentInstance.form.get('otp')?.disable();
      fixture.detectChanges();

      expect(queryEl(fixture, 'uilib-input-otp').classList).toContain('uilib-input-otp-disabled');
    });
  });

  // -------------------------------------------------------------------------
  // Keyboard navigation
  // -------------------------------------------------------------------------

  describe('keyboard navigation', (): void => {
    it('should prevent default on ArrowUp and ArrowDown', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      const upEvent: KeyboardEvent = createKeydownEvent('ArrowUp');
      jest.spyOn(upEvent, 'preventDefault');
      component['onCellKeydown'](upEvent, 0);
      expect(upEvent.preventDefault).toHaveBeenCalled();

      const downEvent: KeyboardEvent = createKeydownEvent('ArrowDown');
      jest.spyOn(downEvent, 'preventDefault');
      component['onCellKeydown'](downEvent, 0);
      expect(downEvent.preventDefault).toHaveBeenCalled();
    });

    it('should call focusCell(index-1) on ArrowLeft', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      const spy: jest.SpyInstance = jest.spyOn(
        component as unknown as { focusCell: (i: number) => void },
        'focusCell'
      );
      const event: KeyboardEvent = createKeydownEvent('ArrowLeft');
      jest.spyOn(event, 'preventDefault');
      component['onCellKeydown'](event, 2);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('should call focusCell(index+1) on ArrowRight', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      const spy: jest.SpyInstance = jest.spyOn(
        component as unknown as { focusCell: (i: number) => void },
        'focusCell'
      );
      const event: KeyboardEvent = createKeydownEvent('ArrowRight');
      jest.spyOn(event, 'preventDefault');
      component['onCellKeydown'](event, 1);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(2);
    });

    it('should clear prev cell and move back on Backspace when current cell is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.writeValue('1234');
      fixture.detectChanges();

      const event: KeyboardEvent = createKeydownEvent('Backspace', '');
      jest.spyOn(event, 'preventDefault');
      component['onCellKeydown'](event, 2);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['getToken'](1)).toBe('');
    });

    it('should clear current cell on Delete', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.writeValue('1234');
      fixture.detectChanges();

      const event: KeyboardEvent = createKeydownEvent('Delete', '2');
      jest.spyOn(event, 'preventDefault');
      component['onCellKeydown'](event, 1);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['getToken'](1)).toBe('');
    });

    it('should block non-digit keys when integerOnly=true', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.integerOnly.set(true);
      fixture.detectChanges();

      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      const event: KeyboardEvent = createKeydownEvent('a');
      jest.spyOn(event, 'preventDefault');
      component['onCellKeydown'](event, 0);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should allow digit keys when integerOnly=true', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.integerOnly.set(true);
      fixture.detectChanges();

      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      const event: KeyboardEvent = createKeydownEvent('5');
      jest.spyOn(event, 'preventDefault');
      component['onCellKeydown'](event, 0);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // Paste handling
  // -------------------------------------------------------------------------

  describe('paste handling', (): void => {
    it('should distribute pasted text across cells', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component['onCellPaste'](createPasteEvent('1234'));
      fixture.detectChanges();

      expect(component['getToken'](0)).toBe('1');
      expect(component['getToken'](1)).toBe('2');
      expect(component['getToken'](2)).toBe('3');
      expect(component['getToken'](3)).toBe('4');
    });

    it('should filter non-digits on paste when integerOnly=true', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.integerOnly.set(true);
      fixture.detectChanges();

      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component['onCellPaste'](createPasteEvent('a1b2'));
      fixture.detectChanges();

      expect(component['getToken'](0)).toBe('1');
      expect(component['getToken'](1)).toBe('2');
      expect(component['getToken'](2)).toBe('');
      expect(component['getToken'](3)).toBe('');
    });

    it('should not paste when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component['onCellPaste'](createPasteEvent('1234'));
      fixture.detectChanges();

      expect(component['getToken'](0)).toBe('');
    });
  });

  // -------------------------------------------------------------------------
  // Output events
  // -------------------------------------------------------------------------

  describe('outputs', (): void => {
    it('should emit completed when all cells are filled', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.writeValue('123');
      fixture.detectChanges();
      component['onCellInput'](createInputEvent('4'), 3);
      fixture.detectChanges();

      expect(fixture.componentInstance.completedValues).toContain('1234');
    });

    it('should emit focused event on cell focus', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      const focusEvent: FocusEvent = new FocusEvent('focus');
      Object.defineProperty(focusEvent, 'target', {
        value: { select: jest.fn<void, []>() },
        configurable: true,
      });
      component['onCellFocus'](focusEvent);

      expect(fixture.componentInstance.focusEvents.length).toBe(1);
    });

    it('should emit blurred event on cell blur', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component['onCellBlur'](new FocusEvent('blur'));
      expect(fixture.componentInstance.blurEvents.length).toBe(1);
    });
  });

  // -------------------------------------------------------------------------
  // setDisabledState (CVA)
  // -------------------------------------------------------------------------

  describe('setDisabledState', (): void => {
    it('should apply disabled class when setDisabledState(true)', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.setDisabledState(true);
      fixture.detectChanges();

      expect(queryEl(fixture, 'uilib-input-otp').classList).toContain('uilib-input-otp-disabled');
    });

    it('should remove disabled class when setDisabledState(false)', async (): Promise<void> => {
      const fixture: ComponentFixture<InputOtpHostComponent> =
        await createFixture(InputOtpHostComponent);
      const component: InputOtpComponent = fixture.debugElement.query(
        By.directive(InputOtpComponent)
      ).componentInstance as InputOtpComponent;

      component.setDisabledState(true);
      fixture.detectChanges();
      component.setDisabledState(false);
      fixture.detectChanges();

      expect(queryEl(fixture, 'uilib-input-otp').classList).not.toContain(
        'uilib-input-otp-disabled'
      );
    });
  });
});
