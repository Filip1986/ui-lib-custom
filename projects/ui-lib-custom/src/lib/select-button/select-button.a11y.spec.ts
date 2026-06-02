import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { SelectButton } from './select-button';
import type { SelectButtonOption } from './select-button.types';

// ── Host components ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [value]="value" ariaLabel="Alignment" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SingleSelectHost {
  public options: SelectButtonOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ];
  public value: string = 'left';
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: `
    <span id="size-label">Size</span>
    <ui-lib-select-button [options]="options" [value]="value" ariaLabelledBy="size-label" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LabelledByHost {
  public options: SelectButtonOption[] = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
  public value: string = 'md';
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: `
    <ui-lib-select-button [options]="options" [value]="value" [multiple]="true" ariaLabel="Tags" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiSelectHost {
  public options: SelectButtonOption[] = [
    { label: 'Bold', value: 'bold' },
    { label: 'Italic', value: 'italic' },
    { label: 'Underline', value: 'underline' },
  ];
  public value: string[] = ['bold', 'italic'];
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [value]="value" ariaLabel="View" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledOptionHost {
  public options: SelectButtonOption[] = [
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list', disabled: true },
    { label: 'Card', value: 'card' },
  ];
  public value: string = 'grid';
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: `
    <ui-lib-select-button
      [options]="options"
      [value]="value"
      [disabled]="true"
      ariaLabel="Disabled group"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ComponentDisabledHost {
  public options: SelectButtonOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];
  public value: string = 'a';
}

// ── Shared helpers ────────────────────────────────────────────────────────────

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

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-select-button',
  ) as HTMLElement;
}

function getButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-select-button button'),
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('SelectButton Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => f.destroy());
    createdFixtures.length = 0;
  });

  // ── Group role ──────────────────────────────────────────────────────────────

  describe('Group role', (): void => {
    it('single-select mode: host has role="radiogroup"', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectHost> = await setup(SingleSelectHost);
      expect(getHost(fixture).getAttribute('role')).toBe('radiogroup');
    });

    it('multi-select mode: host has role="group"', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiSelectHost> = await setup(MultiSelectHost);
      expect(getHost(fixture).getAttribute('role')).toBe('group');
    });
  });

  // ── Accessible name ─────────────────────────────────────────────────────────

  describe('Accessible name', (): void => {
    it('host receives aria-label when ariaLabel is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectHost> = await setup(SingleSelectHost);
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Alignment');
    });

    it('host receives aria-labelledby when ariaLabelledBy is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledByHost> = await setup(LabelledByHost);
      expect(getHost(fixture).getAttribute('aria-labelledby')).toBe('size-label');
    });

    it('when ariaLabelledBy is set, aria-label is null', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledByHost> = await setup(LabelledByHost);
      expect(getHost(fixture).getAttribute('aria-label')).toBeNull();
    });
  });

  // ── Item roles and aria-checked ──────────────────────────────────────────────

  describe('Item roles and aria-checked', (): void => {
    it('single-select: each button has role="radio"', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectHost> = await setup(SingleSelectHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons.forEach((btn: HTMLButtonElement): void => {
        expect(btn.getAttribute('role')).toBe('radio');
      });
    });

    it('multi-select: each button has role="checkbox"', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiSelectHost> = await setup(MultiSelectHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons.forEach((btn: HTMLButtonElement): void => {
        expect(btn.getAttribute('role')).toBe('checkbox');
      });
    });

    it('single-select: selected button has aria-checked="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectHost> = await setup(SingleSelectHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
      expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');
    });

    it('multi-select: selected buttons have aria-checked="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiSelectHost> = await setup(MultiSelectHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
      expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
      expect(buttons[2]?.getAttribute('aria-checked')).toBe('false');
    });
  });

  // ── Disabled state ───────────────────────────────────────────────────────────

  describe('Disabled state', (): void => {
    it('disabled option button has aria-disabled="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledOptionHost> = await setup(DisabledOptionHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[1]?.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled option button has the disabled attribute set', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledOptionHost> = await setup(DisabledOptionHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[1]?.hasAttribute('disabled')).toBe(true);
    });

    it('enabled options do not have aria-disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledOptionHost> = await setup(DisabledOptionHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[0]?.getAttribute('aria-disabled')).toBeNull();
      expect(buttons[2]?.getAttribute('aria-disabled')).toBeNull();
    });
  });

  // ── Roving tabindex ──────────────────────────────────────────────────────────

  describe('Roving tabindex', (): void => {
    it('selected option has tabindex="0"; others have tabindex="-1"', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectHost> = await setup(SingleSelectHost);
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[0]?.getAttribute('tabindex')).toBe('0');
      expect(buttons[1]?.getAttribute('tabindex')).toBe('-1');
      expect(buttons[2]?.getAttribute('tabindex')).toBe('-1');
    });

    it('first enabled option gets tabindex="0" when nothing is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiSelectHost> = await setup(MultiSelectHost);
      fixture.componentInstance.value = [];
      fixture.detectChanges();
      await fixture.whenStable();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[0]?.getAttribute('tabindex')).toBe('0');
    });
  });

  // ── axe-core ─────────────────────────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('single-select (default state) has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectHost> = await setup(SingleSelectHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('single-select labelled-by has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledByHost> = await setup(LabelledByHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('multi-select has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiSelectHost> = await setup(MultiSelectHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('component with disabled option has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledOptionHost> = await setup(DisabledOptionHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('component-disabled state has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<ComponentDisabledHost> = await setup(ComponentDisabledHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
