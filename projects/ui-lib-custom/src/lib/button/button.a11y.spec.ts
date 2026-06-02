import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { provideUiLibIcons } from 'ui-lib-custom/icon';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Button } from './button';

// ── Shared mock-theme factory ────────────────────────────────────────────────

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

// ── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button>Save changes</ui-lib-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextButtonHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button icon="trash" [iconOnly]="true" ariaLabel="Delete item" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconOnlyWithLabelHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button icon="trash" [iconOnly]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconOnlyNoLabelHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button [disabled]="true">Disabled</ui-lib-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button [softDisabled]="true">Soft disabled</ui-lib-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SoftDisabledHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button [loading]="true" ariaLabel="Submitting form">Submit</ui-lib-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoadingWithAriaLabelHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `<ui-lib-button [loading]="true">Submit</ui-lib-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoadingHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <ui-lib-button [loading]="true" loadingLabel="Saving…" ariaLabel="Save changes">
      Save
    </ui-lib-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoadingWithLoadingLabelHostComponent {}

@Component({
  standalone: true,
  imports: [Button],
  template: ` <ui-lib-button [ariaPressed]="pressed()" (click)="toggle()"> Bold </ui-lib-button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToggleHostComponent {
  public readonly pressed: WritableSignal<boolean> = signal<boolean>(false);

  public toggle(): void {
    this.pressed.update((v: boolean): boolean => !v);
  }
}

// ── Helper ───────────────────────────────────────────────────────────────────

function getButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement;
}

async function createFixture<T>(hostType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostType],
    providers: [
      provideZonelessChangeDetection(),
      provideUiLibIcons(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('Button Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-button').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
  });

  // ── Accessible name ──────────────────────────────────────────────────────

  it('text button: gets accessible name from projected text content', async (): Promise<void> => {
    const fixture: ComponentFixture<TextButtonHostComponent> =
      await createFixture(TextButtonHostComponent);
    const btn: HTMLButtonElement = getButton(fixture);
    expect((btn.textContent as string).trim()).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toBeNull();
  });

  it('icon-only button: has aria-label when ariaLabel is provided', async (): Promise<void> => {
    const fixture: ComponentFixture<IconOnlyWithLabelHostComponent> = await createFixture(
      IconOnlyWithLabelHostComponent,
    );
    const btn: HTMLButtonElement = getButton(fixture);
    expect(btn.getAttribute('aria-label')).toBe('Delete item');
  });

  it('icon-only button: has fallback "Button" aria-label when ariaLabel is absent', async (): Promise<void> => {
    const fixture: ComponentFixture<IconOnlyNoLabelHostComponent> = await createFixture(
      IconOnlyNoLabelHostComponent,
    );
    const btn: HTMLButtonElement = getButton(fixture);
    expect(btn.getAttribute('aria-label')).toBe('Button');
  });

  // ── Native disabled ──────────────────────────────────────────────────────

  it('disabled button: native disabled attribute is set', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    const btn: HTMLButtonElement = getButton(fixture);
    expect(btn.disabled).toBe(true);
  });

  it('disabled button: aria-disabled="true" is present', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    expect(getButton(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('disabled button: is removed from tab order via native disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    // Native disabled attribute is the reliable mechanism for removing from tab order
    const btn: HTMLButtonElement = getButton(fixture);
    expect(btn.disabled).toBe(true);
    // hasAttribute check is spec-conformant; jsdom leaves tabIndex at 0 for disabled buttons
    expect(btn.hasAttribute('disabled')).toBe(true);
  });

  // ── Soft disabled ────────────────────────────────────────────────────────

  it('softDisabled button: native disabled is NOT set', async (): Promise<void> => {
    const fixture: ComponentFixture<SoftDisabledHostComponent> =
      await createFixture(SoftDisabledHostComponent);
    expect(getButton(fixture).disabled).toBe(false);
  });

  it('softDisabled button: aria-disabled="true" is present', async (): Promise<void> => {
    const fixture: ComponentFixture<SoftDisabledHostComponent> =
      await createFixture(SoftDisabledHostComponent);
    expect(getButton(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('softDisabled button: remains in the tab order (keyboard-discoverable)', async (): Promise<void> => {
    const fixture: ComponentFixture<SoftDisabledHostComponent> =
      await createFixture(SoftDisabledHostComponent);
    // Native button default tabIndex is 0; softDisabled does NOT override it
    expect(getButton(fixture).tabIndex).toBe(0);
  });

  it('softDisabled button: click is prevented', async (): Promise<void> => {
    const fixture: ComponentFixture<SoftDisabledHostComponent> =
      await createFixture(SoftDisabledHostComponent);
    const btn: HTMLButtonElement = getButton(fixture);
    let clicked: boolean = false;
    btn.addEventListener('click', (): void => {
      clicked = true;
    });
    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(clicked).toBe(false);
  });

  // ── Loading state ────────────────────────────────────────────────────────

  it('loading button: aria-busy="true" is present', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).getAttribute('aria-busy')).toBe('true');
  });

  it('loading button: aria-disabled="true" is present', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('loading button: uses loadingLabel as aria-label when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingWithLoadingLabelHostComponent> = await createFixture(
      LoadingWithLoadingLabelHostComponent,
    );
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Saving…');
  });

  it('loading button: falls back to ariaLabel when loadingLabel is absent', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingWithAriaLabelHostComponent> = await createFixture(
      LoadingWithAriaLabelHostComponent,
    );
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Submitting form');
  });

  it('loading button: falls back to "Loading" when neither loadingLabel nor ariaLabel is set', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    expect(getButton(fixture).getAttribute('aria-label')).toBe('Loading');
  });

  // ── Toggle / aria-pressed ────────────────────────────────────────────────

  it('toggle button: aria-pressed="false" in unpressed state', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleHostComponent> = await createFixture(ToggleHostComponent);
    expect(getButton(fixture).getAttribute('aria-pressed')).toBe('false');
  });

  it('toggle button: aria-pressed="true" after activation', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleHostComponent> = await createFixture(ToggleHostComponent);
    fixture.componentInstance.pressed.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getButton(fixture).getAttribute('aria-pressed')).toBe('true');
  });

  it('default button: aria-pressed is absent when ariaPressed is null', async (): Promise<void> => {
    const fixture: ComponentFixture<TextButtonHostComponent> =
      await createFixture(TextButtonHostComponent);
    expect(getButton(fixture).getAttribute('aria-pressed')).toBeNull();
  });

  // ── Type attribute ───────────────────────────────────────────────────────

  it('button has type="button" by default', async (): Promise<void> => {
    const fixture: ComponentFixture<TextButtonHostComponent> =
      await createFixture(TextButtonHostComponent);
    expect(getButton(fixture).getAttribute('type')).toBe('button');
  });

  // ── axe-core ─────────────────────────────────────────────────────────────

  it('axe: default text button passes', async (): Promise<void> => {
    const fixture: ComponentFixture<TextButtonHostComponent> =
      await createFixture(TextButtonHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: icon-only button with aria-label passes', async (): Promise<void> => {
    const fixture: ComponentFixture<IconOnlyWithLabelHostComponent> = await createFixture(
      IconOnlyWithLabelHostComponent,
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: loading state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<LoadingHostComponent> =
      await createFixture(LoadingHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: disabled state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: softDisabled state passes', async (): Promise<void> => {
    const fixture: ComponentFixture<SoftDisabledHostComponent> =
      await createFixture(SoftDisabledHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: toggle button with aria-pressed passes', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleHostComponent> = await createFixture(ToggleHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
