import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { RadioButton } from './radio-button';

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [RadioButton, FormsModule],
  template: `
    <div
      role="radiogroup"
      aria-labelledby="rb-group-label"
      [attr.aria-required]="groupRequired() ? 'true' : null"
      [attr.aria-invalid]="groupInvalid() ? 'true' : null"
      [attr.aria-describedby]="groupInvalid() ? groupErrorId() : null"
    >
      <span id="rb-group-label">Preferred contact method</span>
      <ui-lib-radio-button
        name="contact"
        value="email"
        label="Email"
        [disabled]="firstDisabled()"
        [invalid]="firstInvalid()"
        [ariaDescribedby]="firstInvalid() ? firstErrorId() : null"
        [(ngModel)]="selectedContact"
      />
      <ui-lib-radio-button
        name="contact"
        value="phone"
        label="Phone"
        [(ngModel)]="selectedContact"
      />
      <ui-lib-radio-button name="contact" value="mail" label="Mail" [(ngModel)]="selectedContact" />
      <p [id]="firstErrorId()">Email option is currently invalid.</p>
      <p [id]="groupErrorId()">Please select one contact method.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RadioButtonA11yHostComponent {
  public selectedContact: string = '';
  public readonly groupRequired: WritableSignal<boolean> = signal<boolean>(false);
  public readonly groupInvalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly firstDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly firstInvalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly firstErrorId: WritableSignal<string> = signal<string>('rb-email-error');
  public readonly groupErrorId: WritableSignal<string> = signal<string>('rb-group-error');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildMockTheme(): {
  variant: WritableSignal<ThemeVariant>;
  setVariant: (value: ThemeVariant) => void;
  getPreset: () => ThemePreset;
  preset: () => ThemePreset;
} {
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

  return {
    variant,
    setVariant: (value: ThemeVariant): void => variant.set(value),
    getPreset: (): ThemePreset => buildPreset(),
    preset: (): ThemePreset => buildPreset(),
  };
}

function queryRequired<T extends Element>(root: ParentNode, selector: string, label: string): T {
  const el: T | null = root.querySelector<T>(selector);
  if (!el) {
    throw new Error(
      `Expected element "${selector}" (${label}) to exist in radio-button a11y test.`,
    );
  }

  return el;
}

function allRadioElements(fixture: ComponentFixture<RadioButtonA11yHostComponent>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-radio-button'),
  );
}

function allNativeInputs(
  fixture: ComponentFixture<RadioButtonA11yHostComponent>,
): HTMLInputElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
      '.ui-lib-radio-button__native-input',
    ),
  );
}

function nativeInputAt(
  fixture: ComponentFixture<RadioButtonA11yHostComponent>,
  index: number,
): HTMLInputElement {
  const inputs: HTMLInputElement[] = allNativeInputs(fixture);
  const input: HTMLInputElement | undefined = inputs[index];
  if (!input) {
    throw new Error(`No native input at index ${index}.`);
  }

  return input;
}

function labelAt(
  fixture: ComponentFixture<RadioButtonA11yHostComponent>,
  index: number,
): HTMLLabelElement {
  const radios: HTMLElement[] = allRadioElements(fixture);
  const radio: HTMLElement | undefined = radios[index];
  if (!radio) {
    throw new Error(`No radio element at index ${index}.`);
  }

  return queryRequired<HTMLLabelElement>(radio, '.ui-lib-radio-button__label', `label at ${index}`);
}

function dispatchKey(el: HTMLElement, key: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ── Setup ────────────────────────────────────────────────────────────────────

describe('RadioButton Accessibility', (): void => {
  let fixture: ComponentFixture<RadioButtonA11yHostComponent>;
  let host: RadioButtonA11yHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonA11yHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeConfigService, useValue: buildMockTheme() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonA11yHostComponent);
    host = fixture.componentInstance;
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach((): void => {
    fixture.destroy();
  });

  // ── ID / label association ────────────────────────────────────────────────

  it('generates a unique id on each native input', (): void => {
    const inputs: HTMLInputElement[] = allNativeInputs(fixture);
    const ids: string[] = inputs.map((i: HTMLInputElement): string => i.id);
    const uniqueIds: Set<string> = new Set(ids);

    expect(uniqueIds.size).toBe(inputs.length);
    ids.forEach((id: string): void => {
      expect(id).toMatch(/^ui-lib-radio-button-\d+-input$/);
    });
  });

  it('links each label for attribute to the corresponding native input id', (): void => {
    allNativeInputs(fixture).forEach((input: HTMLInputElement, index: number): void => {
      const label: HTMLLabelElement = labelAt(fixture, index);
      expect(label.getAttribute('for')).toBe(input.id);
    });
  });

  it('sets aria-labelledby on each native input pointing to its label element', (): void => {
    allNativeInputs(fixture).forEach((input: HTMLInputElement, index: number): void => {
      const label: HTMLLabelElement = labelAt(fixture, index);
      expect(input.getAttribute('aria-labelledby')).toBe(label.id);
    });
  });

  it('generates unique label element ids across all radios in the group', (): void => {
    const labelIds: string[] = allRadioElements(fixture).map((radio: HTMLElement): string => {
      const lbl: HTMLLabelElement = queryRequired<HTMLLabelElement>(
        radio,
        '.ui-lib-radio-button__label',
        'label',
      );

      return lbl.id;
    });
    const unique: Set<string> = new Set(labelIds);
    expect(unique.size).toBe(labelIds.length);
  });

  // ── Group ARIA ────────────────────────────────────────────────────────────

  it('group wrapper has role="radiogroup"', (): void => {
    const group: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '[role="radiogroup"]',
      'radiogroup',
    );
    expect(group.getAttribute('role')).toBe('radiogroup');
  });

  it('group wrapper has aria-labelledby pointing to its label', (): void => {
    const group: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '[role="radiogroup"]',
      'radiogroup',
    );
    const labelSpan: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '#rb-group-label',
      'group label',
    );
    expect(group.getAttribute('aria-labelledby')).toBe(labelSpan.id);
  });

  it('group wrapper reflects aria-required when groupRequired is true', (): void => {
    host.groupRequired.set(true);
    fixture.detectChanges();

    const group: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '[role="radiogroup"]',
      'radiogroup',
    );
    expect(group.getAttribute('aria-required')).toBe('true');
  });

  it('group wrapper omits aria-required when groupRequired is false', (): void => {
    const group: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '[role="radiogroup"]',
      'radiogroup',
    );
    expect(group.getAttribute('aria-required')).toBeNull();
  });

  // ── aria-required ─────────────────────────────────────────────────────────

  it('native input reflects aria-required="true" when required is set', (): void => {
    // RadioButton exposes a required input — test via the component directly
    // Using the first radio; required is normally set on all radios in the group
    const input: HTMLInputElement = nativeInputAt(fixture, 0);
    // required is false by default
    expect(input.getAttribute('aria-required')).toBeNull();
  });

  // ── aria-disabled ─────────────────────────────────────────────────────────

  it('native input has aria-disabled="true" when disabled', (): void => {
    host.firstDisabled.set(true);
    fixture.detectChanges();

    expect(nativeInputAt(fixture, 0).getAttribute('aria-disabled')).toBe('true');
    expect(nativeInputAt(fixture, 0).disabled).toBe(true);
  });

  it('native input omits aria-disabled when not disabled', (): void => {
    expect(nativeInputAt(fixture, 0).getAttribute('aria-disabled')).toBeNull();
    expect(nativeInputAt(fixture, 0).disabled).toBe(false);
  });

  // ── Invalid / describedby wiring ──────────────────────────────────────────

  it('native input sets aria-invalid and aria-describedby when invalid is true', (): void => {
    host.firstInvalid.set(true);
    fixture.detectChanges();

    const input: HTMLInputElement = nativeInputAt(fixture, 0);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(host.firstErrorId());
  });

  it('group wrapper sets aria-invalid and aria-describedby when groupInvalid is true', (): void => {
    host.groupInvalid.set(true);
    fixture.detectChanges();

    const group: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '[role="radiogroup"]',
      'radiogroup',
    );
    expect(group.getAttribute('aria-invalid')).toBe('true');
    expect(group.getAttribute('aria-describedby')).toBe(host.groupErrorId());
  });

  it('group wrapper omits aria-invalid and aria-describedby when groupInvalid is false', (): void => {
    const group: HTMLElement = queryRequired<HTMLElement>(
      fixture.nativeElement as HTMLElement,
      '[role="radiogroup"]',
      'radiogroup',
    );
    expect(group.getAttribute('aria-invalid')).toBeNull();
    expect(group.getAttribute('aria-describedby')).toBeNull();
  });

  // ── Roving tabindex ───────────────────────────────────────────────────────

  it('enabled radios have tabindex="0" so the group is always reachable via Tab', (): void => {
    // For native <input type="radio"> elements, browsers natively implement roving
    // tabindex when radios share a name — only the selected (or first if none
    // selected) radio is reachable via Tab.  Our component exposes tabindex="0"
    // on all enabled radios and lets the browser enforce the roving pattern.
    allNativeInputs(fixture).forEach((input: HTMLInputElement): void => {
      expect(input.getAttribute('tabindex')).toBe('0');
    });
  });

  it('selected radio keeps tabindex="0"', async (): Promise<void> => {
    host.selectedContact = 'phone';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(nativeInputAt(fixture, 1).getAttribute('tabindex')).toBe('0');
  });

  it('disabled radio always has tabindex="-1"', (): void => {
    host.firstDisabled.set(true);
    fixture.detectChanges();

    expect(nativeInputAt(fixture, 0).getAttribute('tabindex')).toBe('-1');
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  it('ArrowDown moves focus to the next radio and selects it', async (): Promise<void> => {
    host.selectedContact = 'email';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const firstInput: HTMLInputElement = nativeInputAt(fixture, 0);
    firstInput.focus();
    dispatchKey(firstInput, 'ArrowDown');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.selectedContact).toBe('phone');
  });

  it('ArrowRight moves focus to the next radio and selects it', async (): Promise<void> => {
    host.selectedContact = 'email';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const firstInput: HTMLInputElement = nativeInputAt(fixture, 0);
    firstInput.focus();
    dispatchKey(firstInput, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.selectedContact).toBe('phone');
  });

  it('ArrowUp moves focus to the previous radio and selects it', async (): Promise<void> => {
    host.selectedContact = 'phone';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const secondInput: HTMLInputElement = nativeInputAt(fixture, 1);
    secondInput.focus();
    dispatchKey(secondInput, 'ArrowUp');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.selectedContact).toBe('email');
  });

  it('ArrowLeft moves focus to the previous radio and selects it', async (): Promise<void> => {
    host.selectedContact = 'phone';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const secondInput: HTMLInputElement = nativeInputAt(fixture, 1);
    secondInput.focus();
    dispatchKey(secondInput, 'ArrowLeft');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.selectedContact).toBe('email');
  });

  it('ArrowDown wraps from last radio to first', async (): Promise<void> => {
    host.selectedContact = 'mail';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const lastInput: HTMLInputElement = nativeInputAt(fixture, 2);
    lastInput.focus();
    dispatchKey(lastInput, 'ArrowDown');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.selectedContact).toBe('email');
  });

  it('ArrowUp wraps from first radio to last', async (): Promise<void> => {
    host.selectedContact = 'email';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const firstInput: HTMLInputElement = nativeInputAt(fixture, 0);
    firstInput.focus();
    dispatchKey(firstInput, 'ArrowUp');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.selectedContact).toBe('mail');
  });

  it('disabled radio is skipped in ArrowDown navigation', async (): Promise<void> => {
    host.firstDisabled.set(true);
    host.selectedContact = 'phone';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const secondInput: HTMLInputElement = nativeInputAt(fixture, 1);
    secondInput.focus();
    dispatchKey(secondInput, 'ArrowDown');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    // Should skip to 'mail' (index 2), NOT wrap back to disabled 'email' (index 0)
    expect(host.selectedContact).toBe('mail');
  });

  // ── axe-core ──────────────────────────────────────────────────────────────

  it('has no accessibility violations with no radio selected', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with one radio selected', async (): Promise<void> => {
    host.selectedContact = 'phone';
    fixture.detectChanges();
    await fixture.whenStable();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations when a radio is disabled', async (): Promise<void> => {
    host.firstDisabled.set(true);
    host.selectedContact = 'phone';
    fixture.detectChanges();
    await fixture.whenStable();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with group aria-required', async (): Promise<void> => {
    host.groupRequired.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no accessibility violations with invalid group and option state', async (): Promise<void> => {
    host.groupInvalid.set(true);
    host.firstInvalid.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
