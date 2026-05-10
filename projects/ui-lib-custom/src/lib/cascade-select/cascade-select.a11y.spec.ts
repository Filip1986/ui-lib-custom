import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from './cascade-select';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

interface CountryNode {
  name: string;
  code: string;
  states: Array<{ name: string; cities: Array<{ cname: string; code: string }> }>;
}

const COUNTRIES: CountryNode[] = [
  {
    name: 'Australia',
    code: 'AU',
    states: [
      {
        name: 'New South Wales',
        cities: [
          { cname: 'Sydney', code: 'SYD' },
          { cname: 'Newcastle', code: 'NEW' },
        ],
      },
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    states: [
      {
        name: 'Ontario',
        cities: [
          { cname: 'Toronto', code: 'TOR' },
          { cname: 'Ottawa', code: 'OTT' },
        ],
      },
    ],
  },
];

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  template: `
    <ui-lib-cascade-select
      [options]="options"
      optionLabel="cname"
      optionValue="code"
      optionGroupLabel="name"
      [optionGroupChildren]="optionGroupChildren"
      placeholder="Select a city"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
    <span id="external-label">External Label</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class A11yHostComponent {
  public readonly options: unknown[] = COUNTRIES;
  public readonly optionGroupChildren: string[] = ['states', 'cities'];
  public ariaLabel: string | null = 'Cascade Select';
  public ariaLabelledBy: string | null = null;
  public value: unknown = null;
}

describe('CascadeSelect accessibility', (): void => {
  let fixture: ComponentFixture<A11yHostComponent>;

  beforeEach(async (): Promise<void> => {
    const variantSignal: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
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

    const themeServiceMock: {
      variant: WritableSignal<ThemeVariant>;
      setVariant: (value: ThemeVariant) => void;
      getPreset: () => ThemePreset;
      preset: () => ThemePreset;
    } = {
      variant: variantSignal,
      setVariant: (value: ThemeVariant): void => variantSignal.set(value),
      getPreset: (): ThemePreset => buildPreset(),
      preset: (): ThemePreset => buildPreset(),
    };

    await TestBed.configureTestingModule({
      imports: [A11yHostComponent],
      providers: [{ provide: ThemeConfigService, useValue: themeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(A11yHostComponent);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function cmpEl(): HTMLElement {
    return hostEl().querySelector('ui-lib-cascade-select') as HTMLElement;
  }

  function triggerEl(): HTMLElement {
    return hostEl().querySelector('.ui-lib-cascade-select__trigger') as HTMLElement;
  }

  function getListboxes(): HTMLElement[] {
    return Array.from(hostEl().querySelectorAll('ul[role="listbox"]'));
  }

  function getOptions(): HTMLElement[] {
    return Array.from(hostEl().querySelectorAll('li[role="option"]'));
  }

  function openPanel(): void {
    triggerEl().click();
    fixture.detectChanges();
  }

  function press(key: string): void {
    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  function openToLevelTwo(): void {
    openPanel();
    press('ArrowRight');
    press('ArrowRight');
  }

  it('has combobox role', (): void => {
    expect(cmpEl().getAttribute('role')).toBe('combobox');
  });

  it('sets aria-haspopup to listbox', (): void => {
    expect(cmpEl().getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('starts with aria-expanded false', (): void => {
    expect(cmpEl().getAttribute('aria-expanded')).toBe('false');
  });

  it('keeps aria-controls on the combobox', (): void => {
    expect(cmpEl().getAttribute('aria-controls')).toBeTruthy();
  });

  it('sets aria-expanded true when open', (): void => {
    openPanel();
    expect(cmpEl().getAttribute('aria-expanded')).toBe('true');
  });

  it('renders top level listbox with matching id', (): void => {
    openPanel();
    const levelOne: HTMLElement = getListboxes()[0] as HTMLElement;
    expect(levelOne.id).toBe(cmpEl().getAttribute('aria-controls'));
  });

  it('applies aria-label to top level listbox', (): void => {
    openPanel();
    const levelOne: HTMLElement = getListboxes()[0] as HTMLElement;
    expect(levelOne.getAttribute('aria-label')).toBe('Select a city');
  });

  it('renders options with role option', (): void => {
    openPanel();
    expect(getOptions().length).toBeGreaterThan(0);
  });

  it('renders parent options with aria-haspopup listbox', (): void => {
    openPanel();
    const parentOption: HTMLElement = getOptions()[0] as HTMLElement;
    expect(parentOption.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('keeps aria-expanded false on parent option before opening child list', (): void => {
    openPanel();
    const parentOption: HTMLElement = getOptions()[0] as HTMLElement;
    expect(parentOption.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not set aria-haspopup for leaf options', (): void => {
    openToLevelTwo();
    const leafOption: HTMLElement = getOptions()[4] as HTMLElement;
    expect(leafOption.getAttribute('aria-haspopup')).toBeNull();
  });

  it('sets aria-selected true for selected leaf', (): void => {
    openPanel();
    let options: HTMLElement[] = getOptions();
    options[0]?.click();
    fixture.detectChanges();
    options = getOptions();
    options[2]?.click();
    fixture.detectChanges();
    options = getOptions();
    options[4]?.click();
    fixture.detectChanges();
    openPanel();
    const selectedOption: HTMLElement | null = hostEl().querySelector(
      '.ui-lib-cascade-select__option[aria-selected="true"]'
    );
    expect(selectedOption).toBeTruthy();
    expect(selectedOption?.getAttribute('aria-selected')).toBe('true');
  });

  it('has no aria-activedescendant while closed', (): void => {
    expect(cmpEl().getAttribute('aria-activedescendant')).toBeNull();
  });

  it('sets aria-activedescendant after ArrowDown navigation', (): void => {
    openPanel();
    press('ArrowDown');
    expect(cmpEl().getAttribute('aria-activedescendant')).toBeTruthy();
  });

  it('keeps aria-activedescendant pointing to an existing option id', (): void => {
    openPanel();
    press('ArrowDown');
    const activeId: string = cmpEl().getAttribute('aria-activedescendant') as string;
    expect(document.getElementById(activeId)).toBeTruthy();
  });

  it('ArrowDown opens the panel from closed state', (): void => {
    press('ArrowDown');
    expect(cmpEl().getAttribute('aria-expanded')).toBe('true');
  });

  it('ArrowDown moves focus to the next option when panel is already open', (): void => {
    openPanel();
    const firstId: string = cmpEl().getAttribute('aria-activedescendant') as string;
    press('ArrowDown');
    expect(cmpEl().getAttribute('aria-activedescendant')).not.toBe(firstId);
  });

  it('ArrowUp moves focus to the previous option', (): void => {
    openPanel();
    press('ArrowDown');
    const secondId: string = cmpEl().getAttribute('aria-activedescendant') as string;
    press('ArrowUp');
    expect(cmpEl().getAttribute('aria-activedescendant')).not.toBe(secondId);
  });

  it('ArrowRight opens a sub-list', (): void => {
    openPanel();
    press('ArrowRight');
    expect(getListboxes().length).toBe(2);
  });

  it('ArrowRight moves aria-activedescendant to first sub-item', (): void => {
    openPanel();
    press('ArrowRight');
    const subListFirstOptionId: string = getListboxes()[1]?.querySelector('li[role="option"]')
      ?.id as string;
    expect(cmpEl().getAttribute('aria-activedescendant')).toBe(subListFirstOptionId);
  });

  it('second ArrowRight opens level 2 sub-list', (): void => {
    openPanel();
    press('ArrowRight');
    press('ArrowRight');
    expect(getListboxes().length).toBe(3);
  });

  it('nested listbox uses parent label as aria-label', (): void => {
    openPanel();
    press('ArrowRight');
    const nestedListbox: HTMLElement = getListboxes()[1] as HTMLElement;
    expect(nestedListbox.getAttribute('aria-label')).toBe('Australia');
  });

  it('sets parent option aria-expanded true while sub-list is open', (): void => {
    openPanel();
    press('ArrowRight');
    const parentOption: HTMLElement = getOptions()[0] as HTMLElement;
    expect(parentOption.getAttribute('aria-expanded')).toBe('true');
  });

  it('ArrowLeft closes the current sub-list level', (): void => {
    openToLevelTwo();
    press('ArrowLeft');
    expect(getListboxes().length).toBe(2);
  });

  it('Escape closes the panel', (): void => {
    openPanel();
    press('Escape');
    expect(cmpEl().getAttribute('aria-expanded')).toBe('false');
  });

  it('Enter selects focused leaf option', (): void => {
    openToLevelTwo();
    press('Enter');
    expect(fixture.componentInstance.value).toBe('SYD');
  });

  it('forwards ariaLabel to host', (): void => {
    fixture.componentInstance.ariaLabel = 'Cascade Label';
    fixture.detectChanges();
    expect(cmpEl().getAttribute('aria-label')).toBe('Cascade Label');
  });

  it('forwards ariaLabelledBy to host', (): void => {
    fixture.componentInstance.ariaLabel = null;
    fixture.componentInstance.ariaLabelledBy = 'external-label';
    fixture.detectChanges();
    expect(cmpEl().getAttribute('aria-labelledby')).toBe('external-label');
  });

  it('has no axe violations when closed', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('has no axe violations when open at level 1', async (): Promise<void> => {
    openPanel();
    await checkA11y(fixture, {
      rules: {
        ...SKIP_COLOR_CONTRAST_RULES,
        'aria-allowed-attr': { enabled: false },
      },
    });
  });

  it('has no axe violations when open at level 2', async (): Promise<void> => {
    openToLevelTwo();
    await checkA11y(fixture, {
      rules: {
        ...SKIP_COLOR_CONTRAST_RULES,
        'aria-allowed-attr': { enabled: false },
      },
    });
  });
});
