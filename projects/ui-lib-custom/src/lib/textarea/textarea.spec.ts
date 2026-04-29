import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiLibTextarea } from './textarea';
import type { TextareaChangeEvent, TextareaSize, TextareaVariant } from './textarea';

// ---------------------------------------------------------------------------
// Typed DOM helpers
// ---------------------------------------------------------------------------

function queryEl<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
  if (!element) {
    throw new Error('Element not found: ' + selector);
  }
  return element;
}

function queryAll<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ---------------------------------------------------------------------------
// Host -- ngModel
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormsModule, UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-textarea
      [label]="label()"
      [placeholder]="placeholder()"
      [size]="size()"
      [variant]="variant()"
      [rows]="rows()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [required]="required()"
      [showCounter]="showCounter()"
      [maxLength]="maxLength()"
      [error]="error()"
      [autoResize]="autoResize()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      (onInput)="onInputEvent($event)"
      (onFocus)="onFocusEvent($event)"
      (onBlur)="onBlurEvent($event)"
    />
  `,
})
class TextareaNgModelHostComponent {
  public readonly label: WritableSignal<string> = signal<string>('Description');
  public readonly placeholder: WritableSignal<string> = signal<string>('Enter text...');
  public readonly size: WritableSignal<TextareaSize> = signal<TextareaSize>('md');
  public readonly variant: WritableSignal<TextareaVariant | null> = signal<TextareaVariant | null>(
    null
  );
  public readonly rows: WritableSignal<number> = signal<number>(3);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showCounter: WritableSignal<boolean> = signal<boolean>(false);
  public readonly maxLength: WritableSignal<number | null> = signal<number | null>(null);
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);
  public readonly autoResize: WritableSignal<boolean> = signal<boolean>(false);
  public value: string = '';
  public readonly inputEvents: TextareaChangeEvent[] = [];
  public focusCount: number = 0;
  public blurCount: number = 0;

  public onInputEvent(event: TextareaChangeEvent): void {
    this.inputEvents.push(event);
  }

  public onFocusEvent(_event: FocusEvent): void {
    this.focusCount++;
  }

  public onBlurEvent(_event: FocusEvent): void {
    this.blurCount++;
  }
}

// ---------------------------------------------------------------------------
// Host -- reactive forms
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <ui-lib-textarea formControlName="description" label="Description" />
    </form>
  `,
})
class TextareaReactiveHostComponent {
  public readonly form: FormGroup = new FormGroup({
    description: new FormControl<string>('initial value'),
  });
}

// ---------------------------------------------------------------------------
// Rendering tests
// ---------------------------------------------------------------------------

describe('UiLibTextarea - rendering', (): void => {
  let fixture: ComponentFixture<TextareaNgModelHostComponent>;
  let host: TextareaNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TextareaNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaNgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', (): void => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a native textarea element', (): void => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.tagName).toBe('TEXTAREA');
  });

  it('should render the label', (): void => {
    const label: HTMLElement = queryEl(fixture, '.ui-lib-textarea__label');
    expect(label.textContent.trim()).toContain('Description');
  });

  it('should not render label element when label is empty', async (): Promise<void> => {
    host.label.set('');
    fixture.detectChanges();
    await fixture.whenStable();
    const labels: HTMLElement[] = queryAll(fixture, '.ui-lib-textarea__label');
    expect(labels.length).toBe(0);
  });

  it('should render placeholder on the native textarea', (): void => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.placeholder).toBe('Enter text...');
  });

  it('should apply md size class by default', (): void => {
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--size-md')).toBe(true);
  });

  it('should apply sm size class when size is sm', async (): Promise<void> => {
    host.size.set('sm');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--size-sm')).toBe(true);
  });

  it('should apply lg size class when size is lg', async (): Promise<void> => {
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--size-lg')).toBe(true);
  });

  it('should apply disabled class and attribute when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(hostEl.classList.contains('ui-lib-textarea--disabled')).toBe(true);
    expect(control.disabled).toBe(true);
  });

  it('should apply readonly class and attribute when readonly', async (): Promise<void> => {
    host.readonly.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(hostEl.classList.contains('ui-lib-textarea--readonly')).toBe(true);
    expect(control.readOnly).toBe(true);
  });

  it('should render required indicator when required', async (): Promise<void> => {
    host.required.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const indicator: HTMLElement = queryEl(fixture, '.ui-lib-textarea__required');
    expect(indicator).toBeTruthy();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.getAttribute('aria-required')).toBe('true');
  });

  it('should render error message and apply error class', async (): Promise<void> => {
    host.error.set('This field is required');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    const errorEl: HTMLElement = queryEl(fixture, '.ui-lib-textarea__error');
    expect(hostEl.classList.contains('ui-lib-textarea--error')).toBe(true);
    expect(errorEl.textContent.trim()).toBe('This field is required');
    expect(errorEl.getAttribute('role')).toBe('alert');
  });

  it('should not render error element when error is null', (): void => {
    const errors: HTMLElement[] = queryAll(fixture, '.ui-lib-textarea__error');
    expect(errors.length).toBe(0);
  });

  it('should set aria-describedby when error is present', async (): Promise<void> => {
    host.error.set('Error!');
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.getAttribute('aria-describedby')).toBeTruthy();
    expect(control.getAttribute('aria-invalid')).toBe('true');
  });

  it('should render character counter when showCounter is true', async (): Promise<void> => {
    host.showCounter.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const counter: HTMLElement = queryEl(fixture, '.ui-lib-textarea__counter');
    expect(counter).toBeTruthy();
  });

  it('should not render counter when showCounter is false', (): void => {
    const counters: HTMLElement[] = queryAll(fixture, '.ui-lib-textarea__counter');
    expect(counters.length).toBe(0);
  });

  it('should set maxlength attribute on native textarea', async (): Promise<void> => {
    host.maxLength.set(200);
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.getAttribute('maxlength')).toBe('200');
  });

  it('should apply the rows attribute', async (): Promise<void> => {
    host.rows.set(5);
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.rows).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// Variant tests
// ---------------------------------------------------------------------------

describe('UiLibTextarea - variants', (): void => {
  let fixture: ComponentFixture<TextareaNgModelHostComponent>;
  let host: TextareaNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TextareaNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaNgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should apply material variant class', async (): Promise<void> => {
    host.variant.set('material');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--variant-material')).toBe(true);
  });

  it('should apply bootstrap variant class', async (): Promise<void> => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--variant-bootstrap')).toBe(true);
  });

  it('should apply minimal variant class', async (): Promise<void> => {
    host.variant.set('minimal');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--variant-minimal')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// ngModel integration tests
// ---------------------------------------------------------------------------

describe('UiLibTextarea - ngModel', (): void => {
  let fixture: ComponentFixture<TextareaNgModelHostComponent>;
  let host: TextareaNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TextareaNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaNgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should reflect initial ngModel value in the native textarea', async (): Promise<void> => {
    host.value = 'hello world';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.value).toBe('hello world');
  });

  it('should update model and emit onInput when user types', async (): Promise<void> => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    control.value = 'typed text';
    control.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.inputEvents.length).toBe(1);
    expect(host.inputEvents[0]!.value).toBe('typed text');
  });

  it('should apply filled class when value is non-empty', async (): Promise<void> => {
    host.value = 'something';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--filled')).toBe(true);
    expect(hostEl.classList.contains('uilib-filled')).toBe(true);
  });

  it('should remove filled class when value is cleared', async (): Promise<void> => {
    // Type text via native event so CVA internal state is driven directly
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    control.value = 'something';
    control.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.classList.contains('ui-lib-textarea--filled')).toBe(true);

    // Clear the textarea
    control.value = '';
    control.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hostEl.classList.contains('ui-lib-textarea--filled')).toBe(false);
  });

  it('should show character count matching value length', async (): Promise<void> => {
    host.showCounter.set(true);
    host.value = 'abc';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    const counter: HTMLElement = queryEl(fixture, '.ui-lib-textarea__counter');
    expect(counter.textContent.trim()).toContain('3');
  });

  it('should show count/maxLength when maxLength is set', async (): Promise<void> => {
    host.showCounter.set(true);
    host.maxLength.set(100);
    host.value = 'hello';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    const counter: HTMLElement = queryEl(fixture, '.ui-lib-textarea__counter');
    expect(counter.textContent.trim()).toContain('5 / 100');
  });

  it('should emit onFocus event when textarea gains focus', async (): Promise<void> => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    control.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.focusCount).toBe(1);
  });

  it('should emit onBlur event when textarea loses focus', async (): Promise<void> => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    control.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.blurCount).toBe(1);
  });

  it('should apply focused class on focus and remove on blur', async (): Promise<void> => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;

    control.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hostEl.classList.contains('ui-lib-textarea--focused')).toBe(true);

    control.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(hostEl.classList.contains('ui-lib-textarea--focused')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Reactive forms integration tests
// ---------------------------------------------------------------------------

describe('UiLibTextarea - reactive forms', (): void => {
  let fixture: ComponentFixture<TextareaReactiveHostComponent>;
  let host: TextareaReactiveHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TextareaReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaReactiveHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should initialise with the FormControl value', (): void => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.value).toBe('initial value');
  });

  it('should propagate user input back to FormControl', async (): Promise<void> => {
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    control.value = 'updated';
    control.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.form.get('description')?.value).toBe('updated');
  });

  it('should disable the native textarea when FormControl is disabled', async (): Promise<void> => {
    host.form.get('description')?.disable();
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.disabled).toBe(true);
  });

  it('should re-enable the native textarea when FormControl is re-enabled', async (): Promise<void> => {
    host.form.get('description')?.disable();
    fixture.detectChanges();
    await fixture.whenStable();
    host.form.get('description')?.enable();
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.disabled).toBe(false);
  });

  it('should update the native element when FormControl value is patched', async (): Promise<void> => {
    host.form.patchValue({ description: 'patched value' });
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.value).toBe('patched value');
  });
});

// ---------------------------------------------------------------------------
// Accessibility tests
// ---------------------------------------------------------------------------

describe('UiLibTextarea - accessibility', (): void => {
  let fixture: ComponentFixture<TextareaNgModelHostComponent>;
  let host: TextareaNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TextareaNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaNgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should associate label with textarea via for/id', (): void => {
    const label: HTMLLabelElement = queryEl<HTMLLabelElement>(fixture, '.ui-lib-textarea__label');
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(label.htmlFor).toBe(control.id);
    expect(control.id).toBeTruthy();
  });

  it('should set aria-readonly when readonly', async (): Promise<void> => {
    host.readonly.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const control: HTMLTextAreaElement = queryEl<HTMLTextAreaElement>(
      fixture,
      '.ui-lib-textarea__control'
    );
    expect(control.getAttribute('aria-readonly')).toBe('true');
  });

  it('should set aria-disabled on host when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-textarea'
    ) as HTMLElement;
    expect(hostEl.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have aria-live on the counter', async (): Promise<void> => {
    host.showCounter.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const counter: HTMLElement = queryEl(fixture, '.ui-lib-textarea__counter');
    expect(counter.getAttribute('aria-live')).toBe('polite');
  });
});
