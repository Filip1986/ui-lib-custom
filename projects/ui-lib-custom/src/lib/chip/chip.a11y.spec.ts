import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
  type WritableSignal,
} from '@angular/core';
import type { DebugElement } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Chip } from './chip';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ---------------------------------------------------------------------------
// ThemeConfigService mock
// ---------------------------------------------------------------------------

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
    getPreset: buildPreset,
    preset: buildPreset,
  };
}

// ---------------------------------------------------------------------------
// Host components — chips wrapped in role="listbox" for valid ARIA hierarchy
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="listbox" aria-label="Tags">
      <ui-lib-chip label="Angular" />
      <ui-lib-chip label="React" />
    </div>
  `,
})
class BasicChipHostComponent {}

@Component({
  standalone: true,
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="listbox" aria-label="Tags">
      <ui-lib-chip label="Amy" image="/assets/amy.png" imageAlt="Amy Elsner" />
    </div>
  `,
})
class ImageChipHostComponent {}

@Component({
  standalone: true,
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="listbox" aria-label="Tags">
      <ui-lib-chip label="Angular" icon="pi pi-bolt" />
    </div>
  `,
})
class IconChipHostComponent {}

@Component({
  standalone: true,
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="region" aria-label="Active filters">
      <ui-lib-chip label="Angular" [removable]="true" />
    </div>
  `,
})
class RemovableChipHostComponent {}

@Component({
  standalone: true,
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="listbox" aria-label="Tags">
      <ui-lib-chip label="Angular" [selectable]="true" [selected]="selected()" />
    </div>
  `,
})
class SelectableChipHostComponent {
  public readonly selected: WritableSignal<boolean> = signal<boolean>(false);
}

// ---------------------------------------------------------------------------
// Fixture helpers
// ---------------------------------------------------------------------------

async function createFixture<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function query<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Chip Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  // ---- axe-core: no violations ------------------------------------------

  it('basic chip should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicChipHostComponent> =
      await createFixture(BasicChipHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('chip with image should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageChipHostComponent> =
      await createFixture(ImageChipHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('chip with icon should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<IconChipHostComponent> =
      await createFixture(IconChipHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('removable chip should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<RemovableChipHostComponent> = await createFixture(
      RemovableChipHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('selectable chip should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('selected chip should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    fixture.componentInstance.selected.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  // ---- ARIA structure ---------------------------------------------------

  it('non-removable chip should have role="option"', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicChipHostComponent> =
      await createFixture(BasicChipHostComponent);
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    expect(chip?.getAttribute('role')).toBe('option');
  });

  it('removable chip should have role="group"', async (): Promise<void> => {
    const fixture: ComponentFixture<RemovableChipHostComponent> = await createFixture(
      RemovableChipHostComponent
    );
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    expect(chip?.getAttribute('role')).toBe('group');
  });

  it('chip image should use imageAlt as alt text', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageChipHostComponent> =
      await createFixture(ImageChipHostComponent);
    const img: HTMLImageElement | null = query<HTMLImageElement>(fixture, '.ui-lib-chip__image');
    expect(img?.alt).toBe('Amy Elsner');
  });

  it('chip icon should have aria-hidden="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<IconChipHostComponent> =
      await createFixture(IconChipHostComponent);
    const icon: HTMLElement | null = query(fixture, '.ui-lib-chip__icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('remove button icon should have aria-hidden="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<RemovableChipHostComponent> = await createFixture(
      RemovableChipHostComponent
    );
    const iconSpan: HTMLElement | null = query(fixture, '.ui-lib-chip__remove-button span');
    expect(iconSpan?.getAttribute('aria-hidden')).toBe('true');
  });

  it('remove button should have aria-label "Remove {label}"', async (): Promise<void> => {
    const fixture: ComponentFixture<RemovableChipHostComponent> = await createFixture(
      RemovableChipHostComponent
    );
    const button: HTMLButtonElement | null = query<HTMLButtonElement>(
      fixture,
      '.ui-lib-chip__remove-button'
    );
    expect(button?.getAttribute('aria-label')).toBe('Remove Angular');
  });

  // ---- Selectable state -------------------------------------------------

  it('selectable chip should have aria-selected="false" when not selected', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    expect(chip?.getAttribute('aria-selected')).toBe('false');
  });

  it('selectable chip should have aria-selected="true" when selected', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    fixture.componentInstance.selected.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    expect(chip?.getAttribute('aria-selected')).toBe('true');
  });

  it('selectable chip should have tabindex="0"', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    expect(chip?.getAttribute('tabindex')).toBe('0');
  });

  it('non-selectable chip should not have a tabindex attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicChipHostComponent> =
      await createFixture(BasicChipHostComponent);
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    expect(chip?.getAttribute('tabindex')).toBeNull();
  });

  // ---- Keyboard interaction ---------------------------------------------

  it('Space key should emit selectedChange on a selectable chip', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    const emitted: boolean[] = [];
    const chipInstance: Chip = fixture.debugElement.query(
      (el: DebugElement): boolean => el.name === 'ui-lib-chip'
    ).componentInstance as Chip;
    chipInstance.selectedChange.subscribe((value: boolean): void => {
      emitted.push(value);
    });

    chip?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(emitted).toEqual([true]);
  });

  it('Enter key should emit selectedChange on a selectable chip', async (): Promise<void> => {
    const fixture: ComponentFixture<SelectableChipHostComponent> = await createFixture(
      SelectableChipHostComponent
    );
    const chip: HTMLElement | null = query(fixture, 'ui-lib-chip');
    const emitted: boolean[] = [];
    const chipInstance: Chip = fixture.debugElement.query(
      (el: DebugElement): boolean => el.name === 'ui-lib-chip'
    ).componentInstance as Chip;
    chipInstance.selectedChange.subscribe((value: boolean): void => {
      emitted.push(value);
    });

    chip?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(emitted).toEqual([true]);
  });

  // ---- Unique instance IDs ---------------------------------------------

  it('each chip instance should have a unique id', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicChipHostComponent> =
      await createFixture(BasicChipHostComponent);
    const chips: NodeListOf<HTMLElement> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'ui-lib-chip'
    );
    const ids: string[] = Array.from(chips).map(
      (chip: HTMLElement): string => chip.getAttribute('id') ?? ''
    );
    // All IDs should be non-empty strings
    ids.forEach((id: string): void => {
      expect(id).toBeTruthy();
      expect(id).toMatch(/^ui-lib-chip-\d+$/);
    });
    // IDs should be unique
    expect(new Set(ids).size).toBe(ids.length);
  });
});
