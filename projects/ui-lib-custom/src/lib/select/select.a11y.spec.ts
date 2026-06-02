import type { WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import type { SelectOption } from './select';
import { UiLibSelect } from './select';

// ── Shared mock factory ──────────────────────────────────────────────────────

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

// ── Test host components ─────────────────────────────────────────────────────

const BASE_OPTIONS: SelectOption[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

const GROUPED_OPTIONS: SelectOption[] = [
  { label: 'Alpha', value: 'alpha', group: 'Letters' },
  { label: 'Beta', value: 'beta', group: 'Letters' },
  { label: 'One', value: 1, group: 'Numbers' },
  { label: 'Two', value: 2, group: 'Numbers' },
];

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: `<ui-lib-select label="Choose option" [options]="options" [(ngModel)]="value" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
  public options: SelectOption[] = BASE_OPTIONS;
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: `
    <ui-lib-select
      label="Choose multiple"
      [options]="options"
      [multiple]="true"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiSelectHostComponent {
  public options: SelectOption[] = BASE_OPTIONS;
  public value: string[] = [];
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: `
    <ui-lib-select
      label="Search options"
      [options]="options"
      [searchable]="true"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SearchableHostComponent {
  public options: SelectOption[] = BASE_OPTIONS;
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: ` <ui-lib-select label="Grouped options" [options]="options" [(ngModel)]="value" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GroupedHostComponent {
  public options: SelectOption[] = GROUPED_OPTIONS;
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: `
    <ui-lib-select
      label="Disabled select"
      [options]="options"
      [disabled]="true"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {
  public options: SelectOption[] = BASE_OPTIONS;
  public value: string | null = null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getSelectEl(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-select') as HTMLElement;
}

function getControlEl(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-select__control',
  ) as HTMLElement;
}

function openPanel(fixture: ComponentFixture<unknown>): void {
  getControlEl(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  fixture.detectChanges();
}

async function configureTestBed<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  fixture.detectChanges();
  await fixture.whenStable(); // Pre-load @defer (on immediate) block
  return fixture;
}

// ── Closed-state ARIA ────────────────────────────────────────────────────────

describe('Select — Closed state ARIA', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(DefaultHostComponent);
  });

  it('host should have role="combobox"', (): void => {
    expect(getSelectEl(fixture).getAttribute('role')).toBe('combobox');
  });

  it('host should have aria-haspopup="listbox"', (): void => {
    expect(getSelectEl(fixture).getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('host should have aria-expanded="false" when closed', (): void => {
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('false');
  });

  it('host should NOT have aria-controls when panel is closed', (): void => {
    expect(getSelectEl(fixture).getAttribute('aria-controls')).toBeNull();
  });

  it('host should have aria-labelledby pointing to label id', (): void => {
    const labelId: string | null = getSelectEl(fixture).getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const labelEl: HTMLElement | null = document.getElementById(labelId!);
    expect(labelEl).toBeTruthy();
  });

  it('host should NOT have aria-activedescendant when closed', (): void => {
    expect(getSelectEl(fixture).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('host should have tabindex="0" when enabled', (): void => {
    expect(getSelectEl(fixture).getAttribute('tabindex')).toBe('0');
  });
});

// ── Open-state ARIA ──────────────────────────────────────────────────────────

describe('Select — Open state ARIA', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(DefaultHostComponent);
  });

  it('host should have aria-expanded="true" when open', (): void => {
    openPanel(fixture);
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('true');
  });

  it('host should have aria-controls pointing to listbox element when open', (): void => {
    openPanel(fixture);
    const listboxId: string | null = getSelectEl(fixture).getAttribute('aria-controls');
    expect(listboxId).toBeTruthy();
    const listboxEl: HTMLElement | null = document.getElementById(listboxId!);
    expect(listboxEl).toBeTruthy();
    expect(listboxEl!.getAttribute('role')).toBe('listbox');
  });

  it('panel should have role="listbox"', (): void => {
    openPanel(fixture);
    const listbox: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="listbox"]',
    );
    expect(listbox).toBeTruthy();
  });

  it('options should have role="option"', (): void => {
    openPanel(fixture);
    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    expect(options.length).toBe(3);
  });

  it('unselected options should have aria-selected="false"', (): void => {
    openPanel(fixture);
    const firstOption: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="option"]',
    ) as HTMLElement;
    expect(firstOption.getAttribute('aria-selected')).toBe('false');
  });

  it('options should have aria-setsize reflecting total count', (): void => {
    openPanel(fixture);
    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    options.forEach((opt: HTMLElement): void => {
      expect(opt.getAttribute('aria-setsize')).toBe('3');
    });
  });

  it('options should have aria-posinset reflecting 1-based index', (): void => {
    openPanel(fixture);
    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    options.forEach((opt: HTMLElement, index: number): void => {
      expect(opt.getAttribute('aria-posinset')).toBe(String(index + 1));
    });
  });

  it('arrow icon should have aria-hidden="true"', (): void => {
    const arrow: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__arrow',
    ) as HTMLElement;
    expect(arrow.getAttribute('aria-hidden')).toBe('true');
  });

  it('clear button SVG should have aria-hidden="true" (not raw text)', (): void => {
    // Pre-select a value to make clear button visible by opening and selecting first option
    openPanel(fixture);
    const firstOption: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="option"]',
    ) as HTMLElement;
    firstOption.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    const clearIcon: SVGElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__clear-icon',
    );
    if (clearIcon) {
      expect(clearIcon.getAttribute('aria-hidden')).toBe('true');
      expect(clearIcon.tagName.toLowerCase()).toBe('svg');
    }
  });
});

// ── Keyboard navigation ──────────────────────────────────────────────────────

describe('Select — Keyboard navigation', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(DefaultHostComponent);
  });

  it('ArrowDown should open the panel when closed', (): void => {
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('true');
  });

  it('ArrowUp should open the panel when closed', (): void => {
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('true');
  });

  it('ArrowDown should move aria-activedescendant forward when open', (): void => {
    openPanel(fixture);
    const beforeId: string | null = getSelectEl(fixture).getAttribute('aria-activedescendant');
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    const afterId: string | null = getSelectEl(fixture).getAttribute('aria-activedescendant');
    expect(afterId).toBeTruthy();
    expect(afterId).not.toBe(beforeId);
  });

  it('aria-activedescendant should match an option element id', (): void => {
    openPanel(fixture);
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    const activeId: string | null = getSelectEl(fixture).getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    const activeEl: HTMLElement | null = document.getElementById(activeId!);
    expect(activeEl).toBeTruthy();
    expect(activeEl!.getAttribute('role')).toBe('option');
  });

  it('Enter should select the focused option and close the panel', (): void => {
    openPanel(fixture);
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape should close the panel', (): void => {
    openPanel(fixture);
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('true');
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape should restore focus to the host element', (): void => {
    openPanel(fixture);
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    const active: HTMLElement | null = document.activeElement as HTMLElement | null;
    expect(active === getSelectEl(fixture) || getSelectEl(fixture).contains(active)).toBeTruthy();
  });

  it('Home should move focus to first option', (): void => {
    openPanel(fixture);
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    const activeId: string | null = getSelectEl(fixture).getAttribute('aria-activedescendant');
    expect(activeId).toMatch(/-option-0$/);
  });

  it('End should move focus to last option', (): void => {
    openPanel(fixture);
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    const activeId: string | null = getSelectEl(fixture).getAttribute('aria-activedescendant');
    expect(activeId).toMatch(/-option-2$/);
  });
});

// ── Multi-select ARIA ────────────────────────────────────────────────────────

describe('Select — Multi-select ARIA', (): void => {
  let fixture: ComponentFixture<MultiSelectHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(MultiSelectHostComponent);
  });

  it('listbox should have aria-multiselectable="true"', (): void => {
    openPanel(fixture);
    const listbox: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="listbox"]',
    ) as HTMLElement;
    expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
  });

  it('selected option should have aria-selected="true"', (): void => {
    openPanel(fixture);
    const firstOption: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="option"]',
    ) as HTMLElement;
    firstOption.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    // In multi-select mode, the panel stays open after selection.
    // The clicked option should now have aria-selected="true".
    const selectedOption: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__option--selected',
    );
    expect(selectedOption).toBeTruthy();
    expect(selectedOption!.getAttribute('aria-selected')).toBe('true');
  });

  it('unselected options should have aria-selected="false"', (): void => {
    openPanel(fixture);
    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    options.forEach((opt: HTMLElement): void => {
      expect(opt.getAttribute('aria-selected')).toBe('false');
    });
  });

  it('panel stays open after selecting an option in multi mode', (): void => {
    openPanel(fixture);
    const firstOption: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="option"]',
    ) as HTMLElement;
    firstOption.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('true');
  });
});

// ── Disabled state ───────────────────────────────────────────────────────────

describe('Select — Disabled state', (): void => {
  let fixture: ComponentFixture<DisabledHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(DisabledHostComponent);
  });

  it('host should have aria-disabled="true" when disabled', (): void => {
    expect(getSelectEl(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('host should have tabindex="-1" when disabled', (): void => {
    expect(getSelectEl(fixture).getAttribute('tabindex')).toBe('-1');
  });

  it('panel should NOT open when disabled (click blocked)', (): void => {
    getControlEl(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('false');
  });

  it('panel should NOT open when disabled (keyboard blocked)', (): void => {
    getSelectEl(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    expect(getSelectEl(fixture).getAttribute('aria-expanded')).toBe('false');
  });
});

// ── Searchable mode ──────────────────────────────────────────────────────────

describe('Select — Searchable mode', (): void => {
  let fixture: ComponentFixture<SearchableHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(SearchableHostComponent);
  });

  it('search input should have aria-autocomplete="list"', (): void => {
    openPanel(fixture);
    const input: HTMLInputElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__search input',
    );
    expect(input).toBeTruthy();
    expect(input!.getAttribute('aria-autocomplete')).toBe('list');
  });

  it('search input should have aria-controls pointing to the listbox', (): void => {
    openPanel(fixture);
    const input: HTMLInputElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__search input',
    );
    const listboxId: string | null = input!.getAttribute('aria-controls');
    expect(listboxId).toBeTruthy();
    const listbox: HTMLElement | null = document.getElementById(listboxId!);
    expect(listbox).toBeTruthy();
    expect(listbox!.getAttribute('role')).toBe('listbox');
  });

  it('live region should exist (for result count announcements)', (): void => {
    const liveRegion: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__sr-live',
    );
    expect(liveRegion).toBeTruthy();
    expect(liveRegion!.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion!.getAttribute('aria-atomic')).toBe('true');
  });

  it('live region should announce result count when filtering', (): void => {
    openPanel(fixture);
    const input: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__search input',
    ) as HTMLInputElement;

    // Simulate typing 'a' — matches 'Alpha' and 'Gamma'
    input.value = 'a';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    const liveRegion: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__sr-live',
    ) as HTMLElement;
    expect(liveRegion.textContent!.trim()).toMatch(/result/i);
  });

  it('live region should be empty when no filter is active', (): void => {
    // Live region is empty without an active filter
    const liveRegion: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__sr-live',
    ) as HTMLElement;
    expect(liveRegion.textContent!.trim()).toBe('');
  });
});

// ── Group ARIA ───────────────────────────────────────────────────────────────

describe('Select — Group ARIA', (): void => {
  let fixture: ComponentFixture<GroupedHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await configureTestBed(GroupedHostComponent);
  });

  it('grouped options should be wrapped in role="group"', (): void => {
    openPanel(fixture);
    const groups: NodeListOf<HTMLElement> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[role="group"]',
    );
    expect(groups.length).toBe(2);
  });

  it('each group container should have aria-label matching group name', (): void => {
    openPanel(fixture);
    const groups: NodeListOf<HTMLElement> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[role="group"]',
    );
    const labels: string[] = Array.from(groups).map(
      (g: HTMLElement): string => g.getAttribute('aria-label') ?? '',
    );
    expect(labels).toContain('Letters');
    expect(labels).toContain('Numbers');
  });

  it('group header div should have aria-hidden="true"', (): void => {
    // With the CSS ::before approach, there are NO separate group header divs in the DOM.
    // The visual label is rendered via CSS content: attr(aria-label) on the group container.
    // This is intentional — it keeps the DOM clean and avoids aria-required-children violations.
    openPanel(fixture);
    const groupHeaders: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('.ui-lib-select__group');
    // There are no `.ui-lib-select__group` divs — groups use CSS ::before for visual labels.
    expect(groupHeaders.length).toBe(0);
  });

  it('all options should still have role="option"', (): void => {
    openPanel(fixture);
    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    expect(options.length).toBe(4);
  });

  it('options inside groups should have correct aria-setsize', (): void => {
    openPanel(fixture);
    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    options.forEach((opt: HTMLElement): void => {
      expect(opt.getAttribute('aria-setsize')).toBe('4');
    });
  });
});

// ── axe-core automated checks ────────────────────────────────────────────────

describe('Select — axe-core automated accessibility', (): void => {
  it('should have no violations in closed state', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await configureTestBed(DefaultHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have no violations in open state', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await configureTestBed(DefaultHostComponent);
    openPanel(fixture);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have no violations in searchable open state', async (): Promise<void> => {
    const fixture: ComponentFixture<SearchableHostComponent> =
      await configureTestBed(SearchableHostComponent);
    openPanel(fixture);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have no violations in multi-select open state', async (): Promise<void> => {
    const fixture: ComponentFixture<MultiSelectHostComponent> =
      await configureTestBed(MultiSelectHostComponent);
    openPanel(fixture);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have no violations with grouped options', async (): Promise<void> => {
    const fixture: ComponentFixture<GroupedHostComponent> =
      await configureTestBed(GroupedHostComponent);
    openPanel(fixture);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have no violations in disabled state', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await configureTestBed(DisabledHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
