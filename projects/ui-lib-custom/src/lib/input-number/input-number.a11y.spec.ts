import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeVariant } from 'ui-lib-custom/core';
import { InputNumberComponent } from './input-number.component';

// ── Mock ThemeConfigService ────────────────────────────────────────────────

class MockThemeConfigService {
  public readonly variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');

  public setVariant(value: ThemeVariant): void {
    this.variant.set(value);
  }

  public getCssVars(): Record<string, string> {
    return {};
  }
}

// ── Host components ────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [InputNumberComponent],
  template: `
    <ui-lib-input-number
      [value]="value()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [label]="label()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [required]="required()"
      [invalid]="invalid()"
      [showButtons]="showButtons()"
      [disabled]="disabled()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
  public readonly value: WritableSignal<number | null> = signal<number | null>(null);
  public readonly min: WritableSignal<number | null> = signal<number | null>(null);
  public readonly max: WritableSignal<number | null> = signal<number | null>(null);
  public readonly step: WritableSignal<number> = signal<number>(1);
  public readonly label: WritableSignal<string | undefined> = signal<string | undefined>(undefined);
  public readonly ariaLabel: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined
  );
  public readonly ariaLabelledBy: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined
  );
  public readonly required: WritableSignal<boolean> = signal<boolean>(false);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showButtons: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
}

// ── Setup helpers ──────────────────────────────────────────────────────────

async function createFixture(): Promise<ComponentFixture<DefaultHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [DefaultHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useClass: MockThemeConfigService },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<DefaultHostComponent> =
    TestBed.createComponent(DefaultHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  return fixture;
}

function getInput(fixture: ComponentFixture<DefaultHostComponent>): HTMLInputElement {
  const host: HTMLElement = fixture.nativeElement as HTMLElement;
  const input: HTMLInputElement | null = host.querySelector(
    'input.ui-lib-input-number-input'
  ) as HTMLInputElement | null;

  if (input === null) {
    throw new Error('Expected input.ui-lib-input-number-input to exist');
  }

  return input;
}

function getButton(
  fixture: ComponentFixture<DefaultHostComponent>,
  selector: string
): HTMLButtonElement {
  const host: HTMLElement = fixture.nativeElement as HTMLElement;
  const button: HTMLButtonElement | null = host.querySelector(selector) as HTMLButtonElement | null;

  if (button === null) {
    throw new Error(`Expected button "${selector}" to exist`);
  }

  return button;
}

function dispatchKey(target: HTMLElement, key: string): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('InputNumber Accessibility', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  afterEach((): void => {
    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    if (document.body.contains(host)) {
      document.body.removeChild(host);
    }
    TestBed.resetTestingModule();
  });

  // ── 1. role=spinbutton ───────────────────────────────────────────────────

  describe('role=spinbutton', (): void => {
    it('input element has role="spinbutton"', async (): Promise<void> => {
      fixture = await createFixture();
      expect(getInput(fixture).getAttribute('role')).toBe('spinbutton');
    });
  });

  // ── 2. aria-valuenow ────────────────────────────────────────────────────

  describe('aria-valuenow', (): void => {
    it('reflects current value on aria-valuenow', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(42);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('42');
    });

    it('sets aria-valuenow to null when value is null', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(null);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBeNull();
    });
  });

  // ── 3. aria-valuemin / aria-valuemax ────────────────────────────────────

  describe('aria-valuemin / aria-valuemax', (): void => {
    it('sets aria-valuemin from min input', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.min.set(0);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuemin')).toBe('0');
    });

    it('sets aria-valuemax from max input', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.max.set(100);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuemax')).toBe('100');
    });

    it('omits aria-valuemin when min is null', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.min.set(null);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuemin')).toBeNull();
    });

    it('omits aria-valuemax when max is null', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.max.set(null);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuemax')).toBeNull();
    });
  });

  // ── 4. aria-valuetext ───────────────────────────────────────────────────

  describe('aria-valuetext', (): void => {
    it('provides aria-valuetext when a value is set', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(1500);
      fixture.detectChanges();
      const valuetext: string | null = getInput(fixture).getAttribute('aria-valuetext');
      expect(valuetext).not.toBeNull();
      expect(valuetext!.length).toBeGreaterThan(0);
    });

    it('sets aria-valuetext to null when no value is set', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(null);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuetext')).toBeNull();
    });
  });

  // ── 5. aria-label / aria-labelledby ─────────────────────────────────────

  describe('aria-label / aria-labelledby', (): void => {
    it('sets aria-label on the input when ariaLabel is provided', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.ariaLabel.set('Quantity');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-label')).toBe('Quantity');
    });

    it('omits aria-label when ariaLabel is not provided', async (): Promise<void> => {
      fixture = await createFixture();
      expect(getInput(fixture).getAttribute('aria-label')).toBeNull();
    });

    it('sets aria-labelledby on the input when ariaLabelledBy is provided', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.ariaLabelledBy.set('qty-label');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-labelledby')).toBe('qty-label');
    });
  });

  // ── 6. aria-required ────────────────────────────────────────────────────

  describe('aria-required', (): void => {
    it('sets aria-required="true" when required is true', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.required.set(true);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-required')).toBe('true');
    });

    it('omits aria-required when required is false', async (): Promise<void> => {
      fixture = await createFixture();
      expect(getInput(fixture).getAttribute('aria-required')).toBeNull();
    });
  });

  // ── 7. aria-invalid ─────────────────────────────────────────────────────

  describe('aria-invalid', (): void => {
    it('sets aria-invalid="true" when invalid is true', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.invalid.set(true);
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-invalid')).toBe('true');
    });

    it('omits aria-invalid when invalid is false', async (): Promise<void> => {
      fixture = await createFixture();
      expect(getInput(fixture).getAttribute('aria-invalid')).toBeNull();
    });
  });

  // ── 8. Spinner button attributes ────────────────────────────────────────

  describe('spinner button attributes', (): void => {
    it('increment button has type="button"', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      expect(getButton(fixture, '.ui-lib-input-number-button-up').getAttribute('type')).toBe(
        'button'
      );
    });

    it('decrement button has type="button"', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      expect(getButton(fixture, '.ui-lib-input-number-button-down').getAttribute('type')).toBe(
        'button'
      );
    });

    it('increment button aria-label contains "Increment"', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      const label: string | null = getButton(
        fixture,
        '.ui-lib-input-number-button-up'
      ).getAttribute('aria-label');
      expect(label).not.toBeNull();
      expect(label!.toLowerCase()).toContain('increment');
    });

    it('decrement button aria-label contains "Decrement"', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      const label: string | null = getButton(
        fixture,
        '.ui-lib-input-number-button-down'
      ).getAttribute('aria-label');
      expect(label).not.toBeNull();
      expect(label!.toLowerCase()).toContain('decrement');
    });

    it('increment button aria-label includes the label input', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.componentInstance.label.set('price');
      fixture.detectChanges();
      expect(getButton(fixture, '.ui-lib-input-number-button-up').getAttribute('aria-label')).toBe(
        'Increment price'
      );
    });

    it('increment button aria-label falls back to "value" when no label is set', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      expect(getButton(fixture, '.ui-lib-input-number-button-up').getAttribute('aria-label')).toBe(
        'Increment value'
      );
    });
  });

  // ── 9. aria-disabled on spinner buttons ─────────────────────────────────

  describe('aria-disabled on spinner buttons', (): void => {
    it('increment button has aria-disabled="true" when at max', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.componentInstance.max.set(10);
      fixture.componentInstance.value.set(10);
      fixture.detectChanges();
      expect(
        getButton(fixture, '.ui-lib-input-number-button-up').getAttribute('aria-disabled')
      ).toBe('true');
    });

    it('decrement button has aria-disabled="true" when at min', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.componentInstance.min.set(0);
      fixture.componentInstance.value.set(0);
      fixture.detectChanges();
      expect(
        getButton(fixture, '.ui-lib-input-number-button-down').getAttribute('aria-disabled')
      ).toBe('true');
    });

    it('increment button does not have aria-disabled when below max', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.componentInstance.max.set(10);
      fixture.componentInstance.value.set(5);
      fixture.detectChanges();
      expect(
        getButton(fixture, '.ui-lib-input-number-button-up').getAttribute('aria-disabled')
      ).toBeNull();
    });

    it('decrement button does not have aria-disabled when above min', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.componentInstance.min.set(0);
      fixture.componentInstance.value.set(5);
      fixture.detectChanges();
      expect(
        getButton(fixture, '.ui-lib-input-number-button-down').getAttribute('aria-disabled')
      ).toBeNull();
    });

    it('increment and decrement buttons have aria-disabled="true" when component is disabled', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.showButtons.set(true);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      expect(
        getButton(fixture, '.ui-lib-input-number-button-up').getAttribute('aria-disabled')
      ).toBe('true');
      expect(
        getButton(fixture, '.ui-lib-input-number-button-down').getAttribute('aria-disabled')
      ).toBe('true');
    });
  });

  // ── 10. Keyboard navigation ──────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('ArrowUp increments the value', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(5);
      fixture.componentInstance.step.set(1);
      fixture.detectChanges();
      dispatchKey(getInput(fixture), 'ArrowUp');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('6');
    });

    it('ArrowDown decrements the value', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(5);
      fixture.componentInstance.step.set(1);
      fixture.detectChanges();
      dispatchKey(getInput(fixture), 'ArrowDown');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('4');
    });

    it('PageUp increments by 10× step', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(5);
      fixture.componentInstance.step.set(1);
      fixture.detectChanges();
      dispatchKey(getInput(fixture), 'PageUp');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('15');
    });

    it('PageDown decrements by 10× step', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(20);
      fixture.componentInstance.step.set(1);
      fixture.detectChanges();
      dispatchKey(getInput(fixture), 'PageDown');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('10');
    });

    it('Home sets value to min', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(50);
      fixture.componentInstance.min.set(0);
      fixture.detectChanges();
      dispatchKey(getInput(fixture), 'Home');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('0');
    });

    it('End sets value to max', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.value.set(50);
      fixture.componentInstance.max.set(100);
      fixture.detectChanges();
      dispatchKey(getInput(fixture), 'End');
      fixture.detectChanges();
      expect(getInput(fixture).getAttribute('aria-valuenow')).toBe('100');
    });
  });

  // ── 11. axe-core automated checks ───────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('default state (no value, no buttons) passes axe', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.ariaLabel.set('Quantity');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('at min value passes axe', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.ariaLabel.set('Quantity');
      fixture.componentInstance.min.set(0);
      fixture.componentInstance.max.set(100);
      fixture.componentInstance.value.set(0);
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('at max value passes axe', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.ariaLabel.set('Quantity');
      fixture.componentInstance.min.set(0);
      fixture.componentInstance.max.set(100);
      fixture.componentInstance.value.set(100);
      fixture.componentInstance.showButtons.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('invalid state passes axe', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.ariaLabel.set('Quantity');
      fixture.componentInstance.invalid.set(true);
      fixture.componentInstance.value.set(5);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
