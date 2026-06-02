import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { PasswordComponent } from './password.component';

// ── Configurable host ──────────────────────────────────────────────────────────
@Component({
  selector: 'test-host',
  standalone: true,
  imports: [PasswordComponent],
  template: `
    <span id="password-label-source">Password label from aria-labelledby</span>
    <label [attr.for]="passwordRef.passwordId">Password</label>
    <ui-lib-password
      #passwordRef
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [feedback]="feedback()"
      [toggleMask]="toggleMask()"
      [disabled]="disabled()"
      [invalid]="invalid()"
      [errorMessage]="errorMessage()"
    />
    <label [attr.for]="passwordRef2.passwordId">Confirm password</label>
    <ui-lib-password #passwordRef2 ariaLabel="Confirm password" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PasswordA11yHostComponent {
  public readonly ariaLabel: WritableSignal<string | undefined> = signal<string | undefined>(
    'Password',
  );
  public readonly feedback: WritableSignal<boolean> = signal<boolean>(true);
  public readonly toggleMask: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly errorMessage: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined,
  );
  public readonly ariaLabelledBy: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined,
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function queryEl<T extends HTMLElement>(root: HTMLElement, selector: string): T {
  return root.querySelector<T>(selector) as T;
}

describe('Password Accessibility', (): void => {
  let fixture: ComponentFixture<PasswordA11yHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PasswordA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordA11yHostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach((): void => {
    const parent: HTMLElement | null = (fixture.nativeElement as HTMLElement).parentElement;
    if (parent) {
      parent.removeChild(fixture.nativeElement as HTMLElement);
    }
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function firstPasswordEl(): HTMLElement {
    return hostEl().querySelector('ui-lib-password:first-of-type') as HTMLElement;
  }

  function secondPasswordEl(): HTMLElement {
    return hostEl().querySelector('ui-lib-password:nth-of-type(2)') as HTMLElement;
  }

  function nativeInput(root: HTMLElement = firstPasswordEl()): HTMLInputElement {
    return queryEl<HTMLInputElement>(root, 'input');
  }

  function toggleBtn(root: HTMLElement = firstPasswordEl()): HTMLButtonElement {
    return queryEl<HTMLButtonElement>(root, '.ui-lib-password-toggle-btn');
  }

  function strengthLiveRegion(root: HTMLElement = firstPasswordEl()): HTMLElement {
    return queryEl<HTMLElement>(root, '.uilib-visually-hidden');
  }

  // ── Input ID ──────────────────────────────────────────────────────────────

  it('native input has a generated id', (): void => {
    const id: string = nativeInput().id;
    expect(id).toBeTruthy();
    expect(id).toMatch(/^ui-lib-password-\d+$/);
  });

  it('generates unique ids for multiple instances', (): void => {
    expect(nativeInput(firstPasswordEl()).id).not.toBe(nativeInput(secondPasswordEl()).id);
  });

  // ── aria-describedby ──────────────────────────────────────────────────────

  it('input has aria-describedby pointing to strengthId when feedback is enabled', (): void => {
    const input: HTMLInputElement = nativeInput();
    const describedBy: string | null = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(describedBy).toMatch(/^ui-lib-password-\d+-strength$/);
  });

  it('aria-describedby id matches the strength live region id', (): void => {
    const input: HTMLInputElement = nativeInput();
    const liveRegion: HTMLElement = strengthLiveRegion();
    expect(input.getAttribute('aria-describedby')).toBe(liveRegion.id);
  });

  it('omits aria-describedby when feedback is disabled', (): void => {
    fixture.componentInstance.feedback.set(false);
    fixture.detectChanges();
    expect(nativeInput().getAttribute('aria-describedby')).toBeNull();
  });

  it('sets aria-invalid="true" when invalid is enabled', (): void => {
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    expect(nativeInput().getAttribute('aria-invalid')).toBe('true');
  });

  it('omits aria-invalid when invalid is false', (): void => {
    fixture.componentInstance.invalid.set(false);
    fixture.detectChanges();
    expect(nativeInput().getAttribute('aria-invalid')).toBeNull();
  });

  it('adds error id to aria-describedby when invalid message is present', (): void => {
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.errorMessage.set('Password is required');
    fixture.detectChanges();
    const describedBy: string = nativeInput().getAttribute('aria-describedby') ?? '';
    expect(describedBy).toContain('-strength');
    expect(describedBy).toContain('-error');
  });

  it('forwards aria-labelledby to the input', (): void => {
    fixture.componentInstance.ariaLabelledBy.set('password-label-source');
    fixture.componentInstance.ariaLabel.set(undefined);
    fixture.detectChanges();
    expect(nativeInput().getAttribute('aria-labelledby')).toBe('password-label-source');
  });

  // ── Strength live region ──────────────────────────────────────────────────

  it('strength live region has aria-live="polite"', (): void => {
    expect(strengthLiveRegion().getAttribute('aria-live')).toBe('polite');
  });

  it('strength live region has role="status"', (): void => {
    expect(strengthLiveRegion().getAttribute('role')).toBe('status');
  });

  it('strength live region has aria-atomic="true"', (): void => {
    expect(strengthLiveRegion().getAttribute('aria-atomic')).toBe('true');
  });

  it('strength live region is present without the visual panel being open', (): void => {
    // Panel only shows when focused — live region must always exist with feedback enabled.
    expect(strengthLiveRegion()).toBeTruthy();
    expect(hostEl().querySelector('.ui-lib-password-panel')).toBeNull();
  });

  it('strength live region announces "Password strength: None" when field is empty', (): void => {
    const text: string = String(strengthLiveRegion().textContent).trim();
    expect(text).toBe('Password strength: None');
  });

  it('strength live region updates to "Password strength: Weak" for a weak password', (): void => {
    const input: HTMLInputElement = nativeInput();
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const text: string = String(strengthLiveRegion().textContent).trim();
    expect(text).toBe('Password strength: Weak');
  });

  it('strength live region updates to "Password strength: Strong" for a strong password', (): void => {
    const input: HTMLInputElement = nativeInput();
    input.value = 'Str0ngPass1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const text: string = String(strengthLiveRegion().textContent).trim();
    expect(text).toBe('Password strength: Strong');
  });

  it('strength visual bars (meter) have aria-hidden="true"', (): void => {
    // Open the visual panel first
    nativeInput().dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    const meter: HTMLElement | null = firstPasswordEl().querySelector('.ui-lib-password-meter');
    expect(meter).toBeTruthy();
    expect(meter?.getAttribute('aria-hidden')).toBe('true');
  });

  // ── Toggle visibility button ──────────────────────────────────────────────

  it('toggle button is type="button"', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    expect(toggleBtn().type).toBe('button');
  });

  it('toggle button has aria-label="Show password" when password is hidden', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    expect(toggleBtn().getAttribute('aria-label')).toBe('Show password');
  });

  it('toggle button has aria-label="Hide password" when password is visible', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    toggleBtn().click();
    fixture.detectChanges();
    expect(toggleBtn().getAttribute('aria-label')).toBe('Hide password');
  });

  it('toggle button aria-pressed is false when password is hidden', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    expect(toggleBtn().getAttribute('aria-pressed')).toBe('false');
  });

  it('toggle button aria-pressed is true when password is visible', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    toggleBtn().click();
    fixture.detectChanges();
    expect(toggleBtn().getAttribute('aria-pressed')).toBe('true');
  });

  it('toggle icon svg has aria-hidden="true"', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    const icon: SVGElement | null = toggleBtn().querySelector('svg');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('toggle icon svg has focusable="false"', (): void => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    const icon: SVGElement | null = toggleBtn().querySelector('svg');
    expect(icon?.getAttribute('focusable')).toBe('false');
  });

  // ── axe-core ──────────────────────────────────────────────────────────────

  it('has no accessibility violations with empty field', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with a weak password', async (): Promise<void> => {
    const input: HTMLInputElement = nativeInput();
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with a strong password', async (): Promise<void> => {
    const input: HTMLInputElement = nativeInput();
    input.value = 'Str0ngPass1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with toggle mask enabled and password visible', async (): Promise<void> => {
    fixture.componentInstance.toggleMask.set(true);
    fixture.detectChanges();
    toggleBtn().click();
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with invalid state and described error', async (): Promise<void> => {
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.errorMessage.set('Password is required');
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations when disabled', async (): Promise<void> => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
