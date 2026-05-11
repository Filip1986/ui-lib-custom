import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { UiLibInput } from './input';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: `
    <ui-lib-input
      [label]="label()"
      [error]="error()"
      [hint]="hint()"
      [invalid]="invalid()"
      [required]="required()"
      [disabled]="disabled()"
      [id]="inputId()"
      [labelFloat]="labelFloat()"
    />
    <ui-lib-input label="Second field" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputA11yHostComponent {
  public readonly label: WritableSignal<string> = signal<string>('Email');
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);
  public readonly hint: WritableSignal<string | null> = signal<string | null>(null);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly inputId: WritableSignal<string | null> = signal<string | null>(null);
  public readonly labelFloat: WritableSignal<'over' | 'in' | 'on'> = signal<'over' | 'in' | 'on'>(
    'over'
  );
}

describe('Input Accessibility', (): void => {
  let fixture: ComponentFixture<InputA11yHostComponent>;

  beforeEach(async (): Promise<void> => {
    const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
    const buildPreset: () => ThemePreset = (): ThemePreset => ({
      id: 'test-preset',
      name: 'Test Preset',
      variant: 'material',
      shape: 'rounded',
      density: 'default',
      darkMode: 'light',
      colors: {
        primary: '#000000',
        secondary: '#000000',
        success: '#000000',
        danger: '#000000',
        warning: '#000000',
        info: '#000000',
        surface: '#000000',
        background: '#000000',
      },
      fonts: { heading: 'Inter', body: 'Inter', mono: 'monospace' },
      icons: {
        defaultLibrary: 'lucide',
        defaultSize: 'md',
        sizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
        },
      },
      createdAt: 0,
      updatedAt: 0,
    });
    const mockTheme: {
      variant: WritableSignal<ThemeVariant>;
      setVariant: (value: ThemeVariant) => void;
      getPreset: () => ThemePreset;
      preset: () => ThemePreset;
    } = {
      variant,
      setVariant: (value: ThemeVariant): void => variant.set(value),
      getPreset: buildPreset,
      preset: buildPreset,
    };

    await TestBed.configureTestingModule({
      imports: [InputA11yHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeConfigService, useValue: mockTheme },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputA11yHostComponent);
    fixture.detectChanges();
  });

  function hostElement(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function firstInputComponent(): HTMLElement {
    return hostElement().querySelector('ui-lib-input:first-of-type') as HTMLElement;
  }

  function secondInputComponent(): HTMLElement {
    return hostElement().querySelector('ui-lib-input:nth-of-type(2)') as HTMLElement;
  }

  function nativeInput(root: HTMLElement = firstInputComponent()): HTMLInputElement {
    return root.querySelector('input') as HTMLInputElement;
  }

  function labelElement(root: HTMLElement = firstInputComponent()): HTMLLabelElement {
    return root.querySelector('label.ui-input-label') as HTMLLabelElement;
  }

  // ── Label association ──────────────────────────────────────────────────────

  it('assigns a generated id to the native input', (): void => {
    expect(nativeInput().id).toMatch(/^ui-lib-input-\d+$/);
  });

  it('sets label[for] matching the native input id', (): void => {
    expect(labelElement().getAttribute('for')).toBe(nativeInput().id);
  });

  it('generates unique ids for multiple instances', (): void => {
    expect(nativeInput(firstInputComponent()).id).not.toBe(nativeInput(secondInputComponent()).id);
  });

  it('uses a provided id on the native input', (): void => {
    fixture.componentInstance.inputId.set('custom-email-field');
    fixture.detectChanges();

    expect(nativeInput().id).toBe('custom-email-field');
  });

  it('keeps label[for] in sync with a provided id', (): void => {
    fixture.componentInstance.inputId.set('custom-email-field');
    fixture.detectChanges();

    expect(labelElement().getAttribute('for')).toBe('custom-email-field');
  });

  it('associates floating label with input via for/id when labelFloat is in', (): void => {
    fixture.componentInstance.labelFloat.set('in');
    fixture.detectChanges();

    const floatingLabel: HTMLLabelElement = firstInputComponent().querySelector(
      'label.ui-input-label-floating'
    ) as HTMLLabelElement;
    expect(floatingLabel.getAttribute('for')).toBe(nativeInput().id);
  });

  it('associates floating label with input via for/id when labelFloat is on', (): void => {
    fixture.componentInstance.labelFloat.set('on');
    fixture.detectChanges();

    const floatingLabel: HTMLLabelElement = firstInputComponent().querySelector(
      'label.ui-input-label-floating'
    ) as HTMLLabelElement;
    expect(floatingLabel.getAttribute('for')).toBe(nativeInput().id);
  });

  // ── aria-required ──────────────────────────────────────────────────────────

  it('omits aria-required by default', (): void => {
    expect(nativeInput().getAttribute('aria-required')).toBeNull();
  });

  it('sets aria-required="true" when required', (): void => {
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    expect(nativeInput().getAttribute('aria-required')).toBe('true');
  });

  it('required indicator (*) carries aria-hidden="true"', (): void => {
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    const indicator: HTMLElement | null =
      firstInputComponent().querySelector('.required-indicator');
    expect(indicator).toBeTruthy();
    expect(indicator?.getAttribute('aria-hidden')).toBe('true');
  });

  // ── aria-invalid ──────────────────────────────────────────────────────────

  it('omits aria-invalid by default', (): void => {
    expect(nativeInput().getAttribute('aria-invalid')).toBeNull();
  });

  it('sets aria-invalid="true" when error is set', (): void => {
    fixture.componentInstance.error.set('This field is required');
    fixture.detectChanges();

    expect(nativeInput().getAttribute('aria-invalid')).toBe('true');
  });

  it('sets aria-invalid="true" when invalid input is true (no error message)', (): void => {
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();

    expect(nativeInput().getAttribute('aria-invalid')).toBe('true');
  });

  it('clears aria-invalid when error is removed', (): void => {
    fixture.componentInstance.error.set('Required');
    fixture.detectChanges();

    fixture.componentInstance.error.set(null);
    fixture.detectChanges();

    expect(nativeInput().getAttribute('aria-invalid')).toBeNull();
  });

  // ── aria-describedby ──────────────────────────────────────────────────────

  it('omits aria-describedby when no error and no hint', (): void => {
    expect(nativeInput().getAttribute('aria-describedby')).toBeNull();
  });

  it('sets aria-describedby to errorId when error is shown', (): void => {
    fixture.componentInstance.error.set('Required');
    fixture.detectChanges();

    const errorEl: HTMLElement | null = firstInputComponent().querySelector('.ui-input-error-text');
    expect(errorEl).toBeTruthy();
    expect(nativeInput().getAttribute('aria-describedby')).toBe(errorEl!.id);
  });

  it('error message element id matches errorId pattern', (): void => {
    fixture.componentInstance.error.set('Required');
    fixture.detectChanges();

    const errorEl: HTMLElement | null = firstInputComponent().querySelector('.ui-input-error-text');
    expect(errorEl?.id).toMatch(/^ui-lib-input-\d+-error$/);
  });

  it('sets aria-describedby to hintId when hint is shown', (): void => {
    fixture.componentInstance.hint.set('Enter your work email');
    fixture.detectChanges();

    const hintEl: HTMLElement | null = firstInputComponent().querySelector('.ui-input-hint-text');
    expect(hintEl).toBeTruthy();
    expect(nativeInput().getAttribute('aria-describedby')).toBe(hintEl!.id);
  });

  it('hint element id matches hintId pattern', (): void => {
    fixture.componentInstance.hint.set('Enter your work email');
    fixture.detectChanges();

    const hintEl: HTMLElement | null = firstInputComponent().querySelector('.ui-input-hint-text');
    expect(hintEl?.id).toMatch(/^ui-lib-input-\d+-hint$/);
  });

  it('aria-describedby includes both errorId and hintId when both are present', (): void => {
    fixture.componentInstance.error.set('Invalid format');
    fixture.componentInstance.hint.set('Use your company email');
    fixture.detectChanges();

    const describedBy: string | null = nativeInput().getAttribute('aria-describedby');
    const errorEl: HTMLElement | null = firstInputComponent().querySelector('.ui-input-error-text');
    const hintEl: HTMLElement | null = firstInputComponent().querySelector('.ui-input-hint-text');

    expect(describedBy).toContain(errorEl!.id);
    expect(describedBy).toContain(hintEl!.id);
  });

  it('clears aria-describedby when error is removed and no hint exists', (): void => {
    fixture.componentInstance.error.set('Required');
    fixture.detectChanges();

    fixture.componentInstance.error.set(null);
    fixture.detectChanges();

    expect(nativeInput().getAttribute('aria-describedby')).toBeNull();
  });

  // ── Disabled state ────────────────────────────────────────────────────────

  it('uses HTML disabled attribute on the native input when disabled', (): void => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    expect(nativeInput().disabled).toBe(true);
  });

  // ── axe-core checks ──────────────────────────────────────────────────────

  it('has no accessibility violations in default state', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations when required', async (): Promise<void> => {
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations when invalid with error message', async (): Promise<void> => {
    fixture.componentInstance.error.set('This field is required');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations when hint is shown', async (): Promise<void> => {
    fixture.componentInstance.hint.set('Enter your work email');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with both error and hint', async (): Promise<void> => {
    fixture.componentInstance.error.set('Invalid format');
    fixture.componentInstance.hint.set('Use your company email');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations when disabled', async (): Promise<void> => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with floating label (in)', async (): Promise<void> => {
    fixture.componentInstance.labelFloat.set('in');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
