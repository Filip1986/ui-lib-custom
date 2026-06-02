import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type Provider,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ToggleSwitch } from './toggle-switch';

// ── Host components ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ToggleSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-toggle-switch
      [label]="label()"
      [ariaLabel]="ariaLabel()"
      [disabled]="disabled()"
      [readonly]="readonly()"
    />
  `,
})
class ToggleSwitchA11yHostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Enable feature');
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [ToggleSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-toggle-switch ariaLabel="Toggle notifications" />`,
})
class AriaLabelOnlyHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-toggle-switch inputId="projected-switch">
      <label for="projected-switch">Dark mode</label>
    </ui-lib-toggle-switch>
  `,
})
class ProjectedLabelHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-toggle-switch />`,
})
class NoLabelHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleSwitch, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-toggle-switch label="Notifications" [formControl]="control" />`,
})
class ReactiveFormHostComponent {
  public readonly control: FormControl<boolean> = new FormControl<boolean>(
    { value: false, disabled: true },
    { nonNullable: true },
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

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

async function createFixture<T>(
  hostType: new () => T,
  extraProviders: Provider[] = [],
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostType],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
      ...extraProviders,
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getInput(fixture: ComponentFixture<unknown>): HTMLInputElement {
  const input: HTMLInputElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-toggle-switch__native-input',
  );
  if (!input) {
    throw new Error('Expected native input element to exist');
  }
  return input;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ToggleSwitch Accessibility', (): void => {
  afterEach((): void => {
    document.body
      .querySelectorAll('ui-lib-toggle-switch')
      .forEach((element: Element): void => element.remove());
    TestBed.resetTestingModule();
  });

  // ── ARIA role ───────────────────────────────────────────────────────────────

  it('native input has role="switch"', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    expect(getInput(fixture).getAttribute('role')).toBe('switch');
  });

  it('native input has type="checkbox"', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    expect(getInput(fixture).type).toBe('checkbox');
  });

  // ── aria-checked ────────────────────────────────────────────────────────────

  it('aria-checked is "false" when unchecked', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    expect(getInput(fixture).getAttribute('aria-checked')).toBe('false');
  });

  it('aria-checked becomes "true" after toggling', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    getInput(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getInput(fixture).getAttribute('aria-checked')).toBe('true');
  });

  // ── Label strategies ────────────────────────────────────────────────────────

  it('ariaLabel path: sets aria-label on native input', async (): Promise<void> => {
    const fixture: ComponentFixture<AriaLabelOnlyHostComponent> = await createFixture(
      AriaLabelOnlyHostComponent,
    );
    expect(getInput(fixture).getAttribute('aria-label')).toBe('Toggle notifications');
  });

  it('ariaLabel path: does not set aria-labelledby when ariaLabel is provided', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.label.set(null);
    fixture.componentInstance.ariaLabel.set('Direct label');
    fixture.detectChanges();

    expect(getInput(fixture).getAttribute('aria-labelledby')).toBeNull();
  });

  it('label input path: sets aria-labelledby pointing to visible label element', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    const input: HTMLInputElement = getInput(fixture);
    const labelledby: string | null = input.getAttribute('aria-labelledby');
    expect(labelledby).toBeTruthy();

    const labelEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      `#${labelledby}`,
    );
    expect(labelEl).not.toBeNull();
    expect(String((labelEl as HTMLElement).textContent).trim()).toBe('Enable feature');
  });

  it('label input path: label for attribute matches native input id', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    const input: HTMLInputElement = getInput(fixture);
    const labelEl: HTMLLabelElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLLabelElement>('.ui-lib-toggle-switch__label');
    expect(labelEl?.htmlFor).toBe(input.id);
  });

  it('projected label path: projected <label for> connects to native input id', async (): Promise<void> => {
    const fixture: ComponentFixture<ProjectedLabelHostComponent> = await createFixture(
      ProjectedLabelHostComponent,
    );
    const input: HTMLInputElement = getInput(fixture);
    const projectedLabel: HTMLLabelElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLLabelElement>('label[for]');
    expect(input.id).toBe('projected-switch');
    expect(projectedLabel?.htmlFor).toBe('projected-switch');
  });

  // ── Readonly state ──────────────────────────────────────────────────────────

  it('readonly: aria-readonly="true" is present', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.readonly.set(true);
    fixture.detectChanges();

    expect(getInput(fixture).getAttribute('aria-readonly')).toBe('true');
  });

  it('readonly: aria-readonly is absent when not readonly', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    expect(getInput(fixture).getAttribute('aria-readonly')).toBeNull();
  });

  it('readonly: Space key does not toggle the switch', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.readonly.set(true);
    fixture.detectChanges();

    const input: HTMLInputElement = getInput(fixture);
    const checkedBefore: string | null = input.getAttribute('aria-checked');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.getAttribute('aria-checked')).toBe(checkedBefore);
  });

  // ── Disabled state ──────────────────────────────────────────────────────────

  it('disabled: native input has disabled attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    expect(getInput(fixture).disabled).toBe(true);
  });

  it('disabled: tabindex is -1', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    expect(getInput(fixture).getAttribute('tabindex')).toBe('-1');
  });

  it('disabled: Space key does not toggle the switch', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const input: HTMLInputElement = getInput(fixture);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.getAttribute('aria-checked')).toBe('false');
  });

  // ── Space key (native behaviour) ─────────────────────────────────────────────

  it('Space key toggles the switch when enabled', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    const input: HTMLInputElement = getInput(fixture);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('Space key does not fire toggle twice (no double-toggle)', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    const input: HTMLInputElement = getInput(fixture);
    // Dispatch keydown (handled by component) — no separate change event should re-toggle
    input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    // Still "true" — no double-toggle back to "false"
    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  // ── DEV mode accessible name guard ───────────────────────────────────────────

  it('warns in DEV mode when no accessible name is provided', async (): Promise<void> => {
    const warnSpy: jest.SpyInstance = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => {});
    await createFixture(NoLabelHostComponent);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[ui-lib-toggle-switch] No accessible name found.'),
    );
    warnSpy.mockRestore();
  });

  it('does not warn when label input is provided', async (): Promise<void> => {
    const warnSpy: jest.SpyInstance = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => {});
    await createFixture(ToggleSwitchA11yHostComponent);
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('[ui-lib-toggle-switch]'));
    warnSpy.mockRestore();
  });

  it('does not warn when ariaLabel is provided', async (): Promise<void> => {
    const warnSpy: jest.SpyInstance = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => {});
    await createFixture(AriaLabelOnlyHostComponent);
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('[ui-lib-toggle-switch]'));
    warnSpy.mockRestore();
  });

  // ── Live announcer ───────────────────────────────────────────────────────────

  it('announces "Enable feature on" when toggled on with a label', async (): Promise<void> => {
    const mockAnnounce: jest.Mock = jest.fn().mockResolvedValue(undefined);
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
      [{ provide: LiveAnnouncerService, useValue: { announce: mockAnnounce } }],
    );

    getInput(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockAnnounce).toHaveBeenCalledWith('Enable feature on', 'polite');
  });

  it('announces "Enable feature off" when toggled off with a label', async (): Promise<void> => {
    const mockAnnounce: jest.Mock = jest.fn().mockResolvedValue(undefined);
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
      [{ provide: LiveAnnouncerService, useValue: { announce: mockAnnounce } }],
    );

    // Toggle on then off
    const input: HTMLInputElement = getInput(fixture);
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockAnnounce).toHaveBeenLastCalledWith('Enable feature off', 'polite');
  });

  it('announces using ariaLabel when label input is absent', async (): Promise<void> => {
    const mockAnnounce: jest.Mock = jest.fn().mockResolvedValue(undefined);
    const fixture: ComponentFixture<AriaLabelOnlyHostComponent> = await createFixture(
      AriaLabelOnlyHostComponent,
      [{ provide: LiveAnnouncerService, useValue: { announce: mockAnnounce } }],
    );

    getInput(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockAnnounce).toHaveBeenCalledWith('Toggle notifications on', 'polite');
  });

  it('falls back to "Toggle switch" when neither label nor ariaLabel is set', async (): Promise<void> => {
    const mockAnnounce: jest.Mock = jest.fn().mockResolvedValue(undefined);
    const warnSpy: jest.SpyInstance = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => {});
    const fixture: ComponentFixture<NoLabelHostComponent> = await createFixture(
      NoLabelHostComponent,
      [{ provide: LiveAnnouncerService, useValue: { announce: mockAnnounce } }],
    );

    getInput(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockAnnounce).toHaveBeenCalledWith('Toggle switch on', 'polite');
    warnSpy.mockRestore();
  });

  // ── CVA integration ───────────────────────────────────────────────────────────

  it('setDisabledState via FormControl disables the native input', async (): Promise<void> => {
    const fixture: ComponentFixture<ReactiveFormHostComponent> =
      await createFixture(ReactiveFormHostComponent);
    expect(getInput(fixture).disabled).toBe(true);
  });

  it('writeValue via FormControl sets aria-checked correctly', async (): Promise<void> => {
    const fixture: ComponentFixture<ReactiveFormHostComponent> =
      await createFixture(ReactiveFormHostComponent);
    fixture.componentInstance.control.enable();
    fixture.componentInstance.control.setValue(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getInput(fixture).getAttribute('aria-checked')).toBe('true');
  });

  // ── axe automated checks ──────────────────────────────────────────────────────

  it('axe: default state with label passes', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: checked state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    getInput(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: disabled state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: readonly state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleSwitchA11yHostComponent> = await createFixture(
      ToggleSwitchA11yHostComponent,
    );
    fixture.componentInstance.readonly.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: aria-label only passes', async (): Promise<void> => {
    const fixture: ComponentFixture<AriaLabelOnlyHostComponent> = await createFixture(
      AriaLabelOnlyHostComponent,
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
