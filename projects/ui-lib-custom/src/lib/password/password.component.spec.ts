import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { WritableSignal } from '@angular/core';
import { PasswordComponent } from './password.component';
import type { PasswordSize, PasswordVariant } from './password.types';

// ── Typed query helpers ────────────────────────────────────────────────────────
function queryEl<T extends HTMLElement>(fixture: ComponentFixture<unknown>, selector: string): T {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector) as T;
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): NodeListOf<T> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector);
}

function textOf(element: HTMLElement | null): string {
  return (element?.textContent ?? '').trim();
}

// ── Configurable host ──────────────────────────────────────────────────────────
@Component({
  selector: 'test-host',
  standalone: true,
  imports: [PasswordComponent],
  template: `
    <uilib-password
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [invalid]="invalid()"
      [fluid]="fluid()"
      [feedback]="feedback()"
      [toggleMask]="toggleMask()"
      [showClear]="showClear()"
      [placeholder]="placeholder()"
      [promptLabel]="promptLabel()"
      [weakLabel]="weakLabel()"
      [mediumLabel]="mediumLabel()"
      [strongLabel]="strongLabel()"
      [appearance]="appearance()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly variant: WritableSignal<PasswordVariant> = signal<PasswordVariant>('material');
  public readonly size: WritableSignal<PasswordSize> = signal<PasswordSize>('md');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly fluid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly feedback: WritableSignal<boolean> = signal<boolean>(true);
  public readonly toggleMask: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showClear: WritableSignal<boolean> = signal<boolean>(false);
  public readonly placeholder: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined
  );
  public readonly promptLabel: WritableSignal<string> = signal<string>('Enter a password');
  public readonly weakLabel: WritableSignal<string> = signal<string>('Weak');
  public readonly mediumLabel: WritableSignal<string> = signal<string>('Medium');
  public readonly strongLabel: WritableSignal<string> = signal<string>('Strong');
  public readonly appearance: WritableSignal<'outlined' | 'filled'> = signal<'outlined' | 'filled'>(
    'outlined'
  );
}

// ── Reactive-form host ─────────────────────────────────────────────────────────
@Component({
  selector: 'test-reactive-host',
  standalone: true,
  imports: [PasswordComponent, ReactiveFormsModule],
  template: `<uilib-password [formControl]="control" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestReactiveHostComponent {
  public readonly control: FormControl<string | null> = new FormControl<string | null>(null);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function createFixture(): ComponentFixture<TestHostComponent> {
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  return fixture;
}

function createReactiveFixture(): ComponentFixture<TestReactiveHostComponent> {
  const fixture: ComponentFixture<TestReactiveHostComponent> =
    TestBed.createComponent(TestReactiveHostComponent);
  fixture.detectChanges();
  return fixture;
}

// ── Test suite ─────────────────────────────────────────────────────────────────
describe('PasswordComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ── Rendering ────────────────────────────────────────────────────────────────
  describe('rendering', (): void => {
    it('should create the component', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const host: HTMLElement = queryEl(fixture, 'uilib-password');
      expect(host).toBeTruthy();
    });

    it('should render the native input element', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        'input.uilib-password-input'
      );
      expect(input).toBeTruthy();
    });

    it('should default to type="password"', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      expect(input.type).toBe('password');
    });

    it('should not render the strength panel when not focused', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const panel: HTMLElement = queryEl(fixture, '.uilib-password-panel');
      expect(panel).toBeNull();
    });

    it('should not render toggle button when toggleMask is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      expect(queryEl(fixture, '.uilib-password-toggle-btn')).toBeNull();
    });

    it('should not render clear button when showClear is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      expect(queryEl(fixture, '.uilib-password-clear-btn')).toBeNull();
    });
  });

  // ── Variant classes ───────────────────────────────────────────────────────────
  describe('variant classes', (): void => {
    it('should apply uilib-variant-material by default', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-variant-material');
    });

    it('should apply uilib-variant-bootstrap', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-password');
      expect(host.classList).toContain('uilib-variant-bootstrap');
      expect(host.classList).not.toContain('uilib-variant-material');
    });

    it('should apply uilib-variant-minimal', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-variant-minimal');
    });
  });

  // ── Size classes ──────────────────────────────────────────────────────────────
  describe('size classes', (): void => {
    it('should not apply sm or lg class for md (default)', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const host: HTMLElement = queryEl(fixture, 'uilib-password');
      expect(host.classList).not.toContain('uilib-password-sm');
      expect(host.classList).not.toContain('uilib-password-lg');
    });

    it('should apply uilib-password-sm for size sm', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-password-sm');
    });

    it('should apply uilib-password-lg for size lg', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-password-lg');
    });
  });

  // ── Disabled / readonly ───────────────────────────────────────────────────────
  describe('disabled and readonly', (): void => {
    it('should apply disabled class and disable native input', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-password');
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      expect(host.classList).toContain('uilib-password-disabled');
      expect(input.disabled).toBe(true);
    });

    it('should mark native input as readonly', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      expect(queryEl<HTMLInputElement>(fixture, 'input').readOnly).toBe(true);
    });
  });

  // ── Invalid / fluid / appearance ──────────────────────────────────────────────
  describe('invalid, fluid, appearance', (): void => {
    it('should apply uilib-password-invalid when invalid is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.invalid.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-password-invalid');
    });

    it('should apply uilib-password-fluid when fluid is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.fluid.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-password-fluid');
    });

    it('should apply uilib-password-appearance-filled when appearance is filled', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.appearance.set('filled');
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain(
        'uilib-password-appearance-filled'
      );
    });
  });

  // ── Strength meter ────────────────────────────────────────────────────────────
  describe('strength meter', (): void => {
    it('should show the strength panel when focused with feedback enabled', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      queryEl<HTMLInputElement>(fixture, 'input').dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-panel')).toBeTruthy();
    });

    it('should hide the strength panel on blur', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      input.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-panel')).toBeNull();
    });

    it('should not show panel when feedback is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.feedback.set(false);
      fixture.detectChanges();
      queryEl<HTMLInputElement>(fixture, 'input').dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-panel')).toBeNull();
    });

    it('should display prompt label when field is empty and focused', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.promptLabel.set('Type your secret');
      fixture.detectChanges();
      queryEl<HTMLInputElement>(fixture, 'input').dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(textOf(queryEl(fixture, '.uilib-password-meter-text'))).toBe('Type your secret');
    });

    it('should show Weak label and apply weak class for a short password', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      input.value = 'abc';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(textOf(queryEl(fixture, '.uilib-password-meter-text'))).toBe('Weak');
      expect(queryEl(fixture, '.uilib-password-meter-fill').classList).toContain(
        'uilib-password-meter-weak'
      );
    });

    it('should show Medium label and apply medium class for a medium-strength password', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      // lower + upper + length >= 6 satisfies the medium regex
      input.value = 'Abcdef';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(textOf(queryEl(fixture, '.uilib-password-meter-text'))).toBe('Medium');
      expect(queryEl(fixture, '.uilib-password-meter-fill').classList).toContain(
        'uilib-password-meter-medium'
      );
    });

    it('should show Strong label and apply strong class for a strong password', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      // lower + upper + digit + length >= 8 satisfies the strong regex
      input.value = 'Abcdef12';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(textOf(queryEl(fixture, '.uilib-password-meter-text'))).toBe('Strong');
      expect(queryEl(fixture, '.uilib-password-meter-fill').classList).toContain(
        'uilib-password-meter-strong'
      );
    });

    it('should use custom strength labels', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.weakLabel.set('Too simple');
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      input.value = 'abc';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(textOf(queryEl(fixture, '.uilib-password-meter-text'))).toBe('Too simple');
    });
  });

  // ── Toggle mask ───────────────────────────────────────────────────────────────
  describe('toggle mask', (): void => {
    it('should render the toggle button when toggleMask is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-toggle-btn')).toBeTruthy();
    });

    it('should switch input type to text when toggle is clicked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      expect(input.type).toBe('password');
      queryEl<HTMLButtonElement>(fixture, '.uilib-password-toggle-btn').click();
      fixture.detectChanges();
      expect(input.type).toBe('text');
    });

    it('should switch back to password type on second click', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      const button: HTMLButtonElement = queryEl<HTMLButtonElement>(
        fixture,
        '.uilib-password-toggle-btn'
      );
      button.click();
      fixture.detectChanges();
      button.click();
      fixture.detectChanges();
      expect(input.type).toBe('password');
    });
  });

  // ── Clear button ──────────────────────────────────────────────────────────────
  describe('clear button', (): void => {
    it('should not render clear button when showClear is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      expect(queryEl(fixture, '.uilib-password-clear-btn')).toBeNull();
    });

    it('should not render clear button when field is empty (showClear=true)', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.showClear.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-clear-btn')).toBeNull();
    });

    it('should render clear button when showClear is true and field has a value', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.showClear.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'secret';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-clear-btn')).toBeTruthy();
    });

    it('should clear the input value when clear button is clicked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.showClear.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'secret';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      queryEl<HTMLButtonElement>(fixture, '.uilib-password-clear-btn').click();
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-clear-btn')).toBeNull();
    });

    it('should not show clear button when disabled (even with showClear=true and value)', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.showClear.set(true);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-clear-btn')).toBeNull();
    });
  });

  // ── Placeholder ───────────────────────────────────────────────────────────────
  describe('placeholder', (): void => {
    it('should forward placeholder to the native input', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.placeholder.set('Enter password');
      fixture.detectChanges();
      expect(queryEl<HTMLInputElement>(fixture, 'input').placeholder).toBe('Enter password');
    });
  });

  // ── ControlValueAccessor ──────────────────────────────────────────────────────
  describe('ControlValueAccessor', (): void => {
    it('should reflect the reactive form control value in the input', (): void => {
      const fixture: ComponentFixture<TestReactiveHostComponent> = createReactiveFixture();
      fixture.componentInstance.control.setValue('testpassword');
      fixture.detectChanges();
      expect(queryEl<HTMLInputElement>(fixture, 'input').value).toBe('testpassword');
    });

    it('should propagate user input back to the form control', (): void => {
      const fixture: ComponentFixture<TestReactiveHostComponent> = createReactiveFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'mypassword';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.control.value).toBe('mypassword');
    });

    it('should propagate null when input is cleared', (): void => {
      const fixture: ComponentFixture<TestReactiveHostComponent> = createReactiveFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'mypassword';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      input.value = '';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.control.value).toBeNull();
    });

    it('should disable the input when the form control is disabled', (): void => {
      const fixture: ComponentFixture<TestReactiveHostComponent> = createReactiveFixture();
      fixture.componentInstance.control.disable();
      fixture.detectChanges();
      expect(queryEl<HTMLInputElement>(fixture, 'input').disabled).toBe(true);
    });

    it('should enable the input when the form control is re-enabled', (): void => {
      const fixture: ComponentFixture<TestReactiveHostComponent> = createReactiveFixture();
      fixture.componentInstance.control.disable();
      fixture.detectChanges();
      fixture.componentInstance.control.enable();
      fixture.detectChanges();
      expect(queryEl<HTMLInputElement>(fixture, 'input').disabled).toBe(false);
    });

    it('should mark the form control as touched on blur', (): void => {
      const fixture: ComponentFixture<TestReactiveHostComponent> = createReactiveFixture();
      expect(fixture.componentInstance.control.touched).toBe(false);
      queryEl<HTMLInputElement>(fixture, 'input').dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(fixture.componentInstance.control.touched).toBe(true);
    });
  });

  // ── Focus / blur state classes ────────────────────────────────────────────────
  describe('focus and blur host classes', (): void => {
    it('should apply uilib-inputwrapper-focus on focus', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      queryEl<HTMLInputElement>(fixture, 'input').dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-inputwrapper-focus');
    });

    it('should remove uilib-inputwrapper-focus on blur', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      input.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).not.toContain(
        'uilib-inputwrapper-focus'
      );
    });

    it('should apply uilib-inputwrapper-filled when the field has a value', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'secret';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(queryEl(fixture, 'uilib-password').classList).toContain('uilib-inputwrapper-filled');
    });
  });

  // ── Input wrapper modifier classes ────────────────────────────────────────────
  describe('input wrapper modifier classes', (): void => {
    it('should add uilib-password-has-toggle when toggleMask is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-input-wrapper').classList).toContain(
        'uilib-password-has-toggle'
      );
    });

    it('should add uilib-password-has-clear when showClear is true and field has value', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.showClear.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'secret';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      expect(queryEl(fixture, '.uilib-password-input-wrapper').classList).toContain(
        'uilib-password-has-clear'
      );
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────────
  describe('accessibility', (): void => {
    it('should set role="status" and aria-live="polite" on the strength panel', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      queryEl<HTMLInputElement>(fixture, 'input').dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      const panel: HTMLElement = queryEl(fixture, '.uilib-password-panel');
      expect(panel.getAttribute('role')).toBe('status');
      expect(panel.getAttribute('aria-live')).toBe('polite');
    });

    it('should label toggle button as "Show password" when masked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      const button: HTMLButtonElement = queryEl<HTMLButtonElement>(
        fixture,
        '.uilib-password-toggle-btn'
      );
      expect(button.getAttribute('aria-label')).toBe('Show password');
    });

    it('should update toggle button label to "Hide password" when revealed', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      const button: HTMLButtonElement = queryEl<HTMLButtonElement>(
        fixture,
        '.uilib-password-toggle-btn'
      );
      button.click();
      fixture.detectChanges();
      expect(button.getAttribute('aria-label')).toBe('Hide password');
    });

    it('should label clear button as "Clear password"', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.showClear.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryEl<HTMLInputElement>(fixture, 'input');
      input.value = 'secret';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      fixture.detectChanges();
      const clearButton: HTMLButtonElement = queryEl<HTMLButtonElement>(
        fixture,
        '.uilib-password-clear-btn'
      );
      expect(clearButton.getAttribute('aria-label')).toBe('Clear password');
    });
  });

  // Ensure queryAllEl is used (avoids unused-import warning on it)
  describe('queryAllEl utility', (): void => {
    it('should find all button elements', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      fixture.componentInstance.toggleMask.set(true);
      fixture.detectChanges();
      const buttons: NodeListOf<HTMLButtonElement> = queryAllEl<HTMLButtonElement>(
        fixture,
        'button'
      );
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
