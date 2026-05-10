import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Checkbox } from './checkbox';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Checkbox],
  template: `
    <ui-lib-checkbox
      [label]="label()"
      [description]="description()"
      [required]="required()"
      [disabled]="disabled()"
      [indeterminate]="indeterminate()"
      [inputId]="inputId()"
      [ariaLabel]="ariaLabel()"
    />
    <ui-lib-checkbox label="Second option" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxA11yHostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Accept');
  public readonly description: WritableSignal<string | null> = signal<string | null>(null);
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly indeterminate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly inputId: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
}

describe('Checkbox Accessibility', (): void => {
  let fixture: ComponentFixture<CheckboxA11yHostComponent>;

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
      fonts: {
        heading: 'Inter',
        body: 'Inter',
        mono: 'monospace',
      },
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
      getPreset: (): ThemePreset => buildPreset(),
      preset: (): ThemePreset => buildPreset(),
    };

    await TestBed.configureTestingModule({
      imports: [CheckboxA11yHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeConfigService, useValue: mockTheme },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxA11yHostComponent);
    fixture.detectChanges();
  });

  function hostElement(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function firstCheckboxElement(): HTMLElement {
    return hostElement().querySelectorAll('ui-lib-checkbox')[0] as HTMLElement;
  }

  function secondCheckboxElement(): HTMLElement {
    return hostElement().querySelectorAll('ui-lib-checkbox')[1] as HTMLElement;
  }

  function firstInputElement(): HTMLInputElement {
    return firstCheckboxElement().querySelector(
      '.ui-lib-checkbox__native-input'
    ) as HTMLInputElement;
  }

  function secondInputElement(): HTMLInputElement {
    return secondCheckboxElement().querySelector(
      '.ui-lib-checkbox__native-input'
    ) as HTMLInputElement;
  }

  function firstLabelElement(): HTMLLabelElement {
    return firstCheckboxElement().querySelector('.ui-lib-checkbox__label') as HTMLLabelElement;
  }

  it('binds generated input id and label for attributes', (): void => {
    const inputElement: HTMLInputElement = firstInputElement();
    const labelElement: HTMLLabelElement = firstLabelElement();

    expect(inputElement.id).toMatch(/^ui-lib-checkbox-\d+-input$/);
    expect(labelElement.getAttribute('for')).toBe(inputElement.id);
  });

  it('keeps aria-labelledby linked to the internal label id', (): void => {
    expect(firstInputElement().getAttribute('aria-labelledby')).toBe(firstLabelElement().id);
  });

  it('sets aria-checked=false initially', (): void => {
    expect(firstInputElement().getAttribute('aria-checked')).toBe('false');
  });

  it('sets aria-checked=true after checking', (): void => {
    firstInputElement().click();
    fixture.detectChanges();

    expect(firstInputElement().getAttribute('aria-checked')).toBe('true');
  });

  it('sets aria-checked=mixed when indeterminate is true', (): void => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();

    expect(firstInputElement().getAttribute('aria-checked')).toBe('mixed');
  });

  it('sets native input.indeterminate property when indeterminate is true', (): void => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();

    expect(firstInputElement().indeterminate).toBeTruthy();
  });

  it('reflects required input as aria-required=true', (): void => {
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    expect(firstInputElement().getAttribute('aria-required')).toBe('true');
  });

  it('omits aria-required when not required', (): void => {
    expect(firstInputElement().getAttribute('aria-required')).toBeNull();
  });

  it('reflects disabled input as aria-disabled=true', (): void => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    expect(firstInputElement().getAttribute('aria-disabled')).toBe('true');
  });

  it('omits aria-disabled when enabled', (): void => {
    expect(firstInputElement().getAttribute('aria-disabled')).toBeNull();
  });

  it('keeps checkmark and indeterminate icons aria-hidden', (): void => {
    const checkIconElement: HTMLElement | null = firstCheckboxElement().querySelector(
      '.ui-lib-checkbox__icon--check'
    );
    const indeterminateIconElement: HTMLElement | null = firstCheckboxElement().querySelector(
      '.ui-lib-checkbox__icon--indeterminate'
    );

    expect(checkIconElement?.getAttribute('aria-hidden')).toBe('true');
    expect(indeterminateIconElement?.getAttribute('aria-hidden')).toBe('true');
  });

  it('generates unique ids for multiple checkbox instances', (): void => {
    expect(firstInputElement().id).not.toBe(secondInputElement().id);
  });

  it('uses a provided inputId and keeps label for in sync', (): void => {
    fixture.componentInstance.inputId.set('custom-checkbox-id');
    fixture.detectChanges();

    expect(firstInputElement().id).toBe('custom-checkbox-id');
    expect(firstLabelElement().getAttribute('for')).toBe('custom-checkbox-id');
  });

  it('sets aria-describedby when description exists', (): void => {
    fixture.componentInstance.description.set('Description text');
    fixture.detectChanges();

    expect(firstInputElement().getAttribute('aria-describedby')).toMatch(
      /^ui-lib-checkbox-\d+-description$/
    );
  });

  it('uses aria-label when no visible label is provided', (): void => {
    fixture.componentInstance.label.set(null);
    fixture.componentInstance.ariaLabel.set('Accessible checkbox label');
    fixture.detectChanges();

    expect(firstInputElement().getAttribute('aria-label')).toBe('Accessible checkbox label');
  });

  it('has no accessibility violations for unchecked state', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations for checked state', async (): Promise<void> => {
    firstInputElement().click();
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations for indeterminate state', async (): Promise<void> => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations for disabled state', async (): Promise<void> => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations for required state', async (): Promise<void> => {
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
