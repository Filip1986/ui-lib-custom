import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

import { FormField } from './form-field';

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field
      [label]="label()"
      [error]="error()"
      [hint]="hint()"
      [required]="required()"
      [invalid]="invalid()"
      [disabled]="disabled()"
      [inputId]="inputId()"
    >
      <input type="text" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormFieldHostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Email');
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);
  public readonly hint: WritableSignal<string | null> = signal<string | null>(null);
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly inputId: WritableSignal<string | null> = signal<string | null>(null);
}

function setup(
  overrides: {
    label?: string | null;
    error?: string | null;
    hint?: string | null;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    inputId?: string | null;
  } = {},
): {
  fixture: ComponentFixture<FormFieldHostComponent>;
  host: FormFieldHostComponent;
  component: FormField;
  announcer: { announceError: jest.Mock };
  input: HTMLInputElement;
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

  if (overrides.label !== undefined) host.label.set(overrides.label);
  if (overrides.error !== undefined) host.error.set(overrides.error);
  if (overrides.hint !== undefined) host.hint.set(overrides.hint);
  if (overrides.required !== undefined) host.required.set(overrides.required);
  if (overrides.invalid !== undefined) host.invalid.set(overrides.invalid);
  if (overrides.disabled !== undefined) host.disabled.set(overrides.disabled);
  if (overrides.inputId !== undefined) host.inputId.set(overrides.inputId);

  fixture.detectChanges();

  const component: FormField = fixture.debugElement.query(By.directive(FormField))
    .componentInstance as FormField;
  const input: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector('input')!;

  return { fixture, host, component, announcer, input };
}

describe('FormField', (): void => {
  it('renders projected input content', (): void => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('renders label and wires htmlFor to input id', (): void => {
    const { fixture, component } = setup();
    const label: HTMLLabelElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-label',
    ) as HTMLLabelElement;

    expect(label).toBeTruthy();
    expect(label.getAttribute('for')).toBe(component.inputId());
    expect(label.id).toBe(component.labelId());
  });

  it('does not render label when label input is null', (): void => {
    const { fixture } = setup({ label: null });
    const label: HTMLLabelElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-label',
    );
    expect(label).toBeNull();
  });

  it('renders required indicator with aria-hidden when required', (): void => {
    const { fixture } = setup({ required: true });
    const indicator: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-required-indicator',
    ) as HTMLElement;

    expect(indicator).toBeTruthy();
    expect(indicator.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies generated input id when inputId is not provided', (): void => {
    const { input, component } = setup();
    expect(input.id).toBe(component.inputId());
    expect(input.id).toMatch(/^form-field-\d+-input$/);
  });

  it('applies explicit inputId when provided', (): void => {
    const { input, component } = setup({ inputId: 'email-input' });
    expect(component.inputId()).toBe('email-input');
    expect(input.id).toBe('email-input');
  });

  it('shows hint and links it in aria-describedby', (): void => {
    const { fixture, input, component } = setup({ hint: 'Use work email' });
    const hintElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-hint',
    ) as HTMLElement;

    expect(hintElement.id).toBe(component.hintId());
    expect(input.getAttribute('aria-describedby')).toBe(component.hintId());
  });

  it('shows error with role=alert when invalid and error is set', (): void => {
    const { fixture, component } = setup({ invalid: true, error: 'Required' });
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error',
    ) as HTMLElement;

    expect(errorElement.id).toBe(component.errorId());
    expect(errorElement.getAttribute('role')).toBe('alert');
  });

  it('renders error when error text is provided regardless of invalid flag', (): void => {
    const { fixture } = setup({ error: 'Required', invalid: false });
    const errorElement: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error',
    );
    expect(errorElement).toBeTruthy();
  });

  it('includes hint and error ids in aria-describedby when both are active', (): void => {
    const { input, component } = setup({
      hint: 'Use work email',
      invalid: true,
      error: 'Required',
    });
    expect(input.getAttribute('aria-describedby')).toBe(
      `${component.hintId()} ${component.errorId()}`,
    );
  });

  it('sets aria-invalid true when invalid', (): void => {
    const { input } = setup({ invalid: true });
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('removes aria-invalid when not invalid and no error', (): void => {
    const { input } = setup({ invalid: false, error: null });
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('sets aria-required=true when required', (): void => {
    const { input } = setup({ required: true });
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('sets native disabled and aria-disabled when disabled', (): void => {
    const { input } = setup({ disabled: true });
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-disabled')).toBe('true');
  });

  it('announces newly added error messages once', (): void => {
    const { fixture, host, announcer } = setup();
    host.error.set('Required');
    host.invalid.set(true);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(announcer.announceError).toHaveBeenCalledWith('Required');
  });

  it('does not re-announce the same error value', (): void => {
    const { fixture, host, announcer } = setup({ invalid: true, error: 'Required' });
    announcer.announceError.mockClear();

    host.error.set('Required');
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(announcer.announceError).not.toHaveBeenCalled();
  });

  it('describedById returns combined hint and error ids when active', (): void => {
    const { component } = setup({ hint: 'Hint', invalid: true, error: 'Error' });
    expect(component.describedById).toBe(`${component.hintId()} ${component.errorId()}`);
  });

  it('describedById returns null when no hint or error is active', (): void => {
    const { component } = setup();
    expect(component.describedById).toBeNull();
  });

  it('errorId and hintId share same id prefix', (): void => {
    const { component } = setup();
    const errorPrefix: string = component.errorId().replace('-error', '');
    const hintPrefix: string = component.hintId().replace('-hint', '');
    expect(errorPrefix).toBe(hintPrefix);
  });
});
