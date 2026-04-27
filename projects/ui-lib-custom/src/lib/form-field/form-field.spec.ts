import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { FormField } from './form-field';

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field [error]="error()" [hint]="hint()">
      <input type="text" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldHostComponent {
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);
  public readonly hint: WritableSignal<string | null> = signal<string | null>(null);
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function setup(overrides: { error?: string | null; hint?: string | null } = {}): {
  fixture: ComponentFixture<FormFieldHostComponent>;
  host: FormFieldHostComponent;
  component: FormField;
  announcer: { announceError: jest.Mock };
} {
  const announcer: { announceError: jest.Mock } = {
    announceError: jest.fn().mockResolvedValue(undefined),
  };

  TestBed.configureTestingModule({
    imports: [FormFieldHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: LiveAnnouncerService, useValue: announcer },
    ],
  });

  const fixture: ComponentFixture<FormFieldHostComponent> =
    TestBed.createComponent(FormFieldHostComponent);
  const host: FormFieldHostComponent = fixture.componentInstance;

  if (overrides.error !== undefined) host.error.set(overrides.error);
  if (overrides.hint !== undefined) host.hint.set(overrides.hint);

  fixture.detectChanges();

  const component: FormField = fixture.debugElement.query(By.directive(FormField))
    .componentInstance as FormField;

  return { fixture, host, component, announcer };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('FormField', (): void => {
  describe('rendering', (): void => {
    it('creates successfully', (): void => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('renders projected content', (): void => {
      const { fixture } = setup();
      const input: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        'input'
      );
      expect(input).toBeTruthy();
    });

    it('applies base class to wrapper', (): void => {
      const { fixture } = setup();
      const wrapper: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field'
      );
      expect(wrapper).toBeTruthy();
    });
  });

  describe('error display', (): void => {
    it('shows error message when error is set', (): void => {
      const { fixture } = setup({ error: 'This field is required' });
      const errorEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-error'
      );
      expect(errorEl).toBeTruthy();
      expect(errorEl!.textContent!.trim()).toBe('This field is required');
    });

    it('hides error element when error is null', (): void => {
      const { fixture } = setup({ error: null });
      const errorEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-error'
      );
      expect(errorEl).toBeNull();
    });

    it('applies error modifier class when error is set', (): void => {
      const { fixture } = setup({ error: 'Bad input' });
      const wrapper: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field'
      );
      expect(wrapper?.classList.contains('ui-form-field--error')).toBe(true);
    });

    it('does NOT apply error modifier class when error is null', (): void => {
      const { fixture } = setup({ error: null });
      const wrapper: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field'
      );
      expect(wrapper?.classList.contains('ui-form-field--error')).toBe(false);
    });

    it('error element has role=alert and aria-live=assertive', (): void => {
      const { fixture } = setup({ error: 'Required' });
      const errorEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-error'
      );
      expect(errorEl?.getAttribute('role')).toBe('alert');
      expect(errorEl?.getAttribute('aria-live')).toBe('assertive');
    });

    it('error element has unique id matching errorId', (): void => {
      const { fixture, component } = setup({ error: 'Required' });
      const errorEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-error'
      );
      expect(errorEl?.id).toBe(component.errorId);
    });
  });

  describe('hint display', (): void => {
    it('shows hint when hint is set and error is null', (): void => {
      const { fixture } = setup({ hint: 'Enter your email address' });
      const hintEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-hint'
      );
      expect(hintEl).toBeTruthy();
      expect(hintEl!.textContent!.trim()).toBe('Enter your email address');
    });

    it('hides hint when error is present', (): void => {
      const { fixture } = setup({ hint: 'Some hint', error: 'Some error' });
      const hintEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-hint'
      );
      expect(hintEl).toBeNull();
    });

    it('hides hint when hint is null', (): void => {
      const { fixture } = setup({ hint: null });
      const hintEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-hint'
      );
      expect(hintEl).toBeNull();
    });

    it('hint element has unique id matching hintId', (): void => {
      const { fixture, component } = setup({ hint: 'Hint text' });
      const hintEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-form-field-hint'
      );
      expect(hintEl?.id).toBe(component.hintId);
    });
  });

  describe('describedById getter', (): void => {
    it('returns errorId when error is set', (): void => {
      const { component } = setup({ error: 'Required' });
      expect(component.describedById).toBe(component.errorId);
    });

    it('returns hintId when hint is set and no error', (): void => {
      const { component } = setup({ hint: 'Some hint' });
      expect(component.describedById).toBe(component.hintId);
    });

    it('returns null when neither error nor hint is set', (): void => {
      const { component } = setup();
      expect(component.describedById).toBeNull();
    });
  });

  describe('live announcer', (): void => {
    it('calls announceError when error first appears', (): void => {
      const { fixture, host, announcer } = setup();

      host.error.set('Required');
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(announcer.announceError).toHaveBeenCalledWith('Required');
    });

    it('does not call announceError for the same error twice', (): void => {
      const { fixture, host, announcer } = setup({ error: 'Required' });
      announcer.announceError.mockClear();

      // Set the same error value again — should not re-announce
      host.error.set('Required');
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(announcer.announceError).not.toHaveBeenCalled();
    });

    it('calls announceError when error changes to a new message', (): void => {
      const { fixture, host, announcer } = setup({ error: 'Required' });
      announcer.announceError.mockClear();

      host.error.set('Too short');
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(announcer.announceError).toHaveBeenCalledWith('Too short');
    });

    it('does not call announceError when error is cleared to null', (): void => {
      const { fixture, host, announcer } = setup({ error: 'Required' });
      announcer.announceError.mockClear();

      host.error.set(null);
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(announcer.announceError).not.toHaveBeenCalled();
    });
  });

  describe('unique IDs', (): void => {
    it('generates an errorId prefixed with form-field-', (): void => {
      const { component } = setup({ error: 'Required' });
      expect(component.errorId).toMatch(/^form-field-\d+-error$/);
    });

    it('generates a hintId prefixed with form-field-', (): void => {
      const { component } = setup({ hint: 'Some hint' });
      expect(component.hintId).toMatch(/^form-field-\d+-hint$/);
    });

    it('errorId and hintId share the same unique prefix', (): void => {
      const { component } = setup();
      // e.g. form-field-3-error and form-field-3-hint
      const errorBase: string = component.errorId.replace('-error', '');
      const hintBase: string = component.hintId.replace('-hint', '');
      expect(errorBase).toBe(hintBase);
    });
  });
});
