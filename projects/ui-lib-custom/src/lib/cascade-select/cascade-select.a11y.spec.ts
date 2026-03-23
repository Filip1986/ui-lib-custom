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

  function openPanel(): void {
    triggerEl().click();
    fixture.detectChanges();
  }

  it('has no axe violations when closed', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('sets combobox and tree roles', (): void => {
    expect(cmpEl().getAttribute('role')).toBe('combobox');

    openPanel();
    const treePanel: HTMLElement | null = hostEl().querySelector('[role="tree"]');
    expect(treePanel).toBeTruthy();
  });

  it('updates aria-expanded and aria-controls when opening panel', (): void => {
    expect(cmpEl().getAttribute('aria-expanded')).toBe('false');

    openPanel();

    expect(cmpEl().getAttribute('aria-expanded')).toBe('true');
    expect(cmpEl().getAttribute('aria-controls')).toBeTruthy();
  });

  it('renders treeitem semantics with aria-level metadata', (): void => {
    openPanel();

    const firstOption: HTMLElement | null = hostEl().querySelector('[role="treeitem"]');
    expect(firstOption).toBeTruthy();
    expect(firstOption?.getAttribute('aria-level')).toBe('1');
    expect(firstOption?.getAttribute('aria-setsize')).toBeTruthy();
    expect(firstOption?.getAttribute('aria-posinset')).toBeTruthy();
  });

  it('updates aria-activedescendant via keyboard navigation', (): void => {
    openPanel();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    const activeId: string | null = cmpEl().getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId as string)).toBeTruthy();
  });

  it('applies aria-selected to selected leaf option', (): void => {
    openPanel();

    let options: HTMLElement[] = Array.from(
      hostEl().querySelectorAll('.ui-lib-cascade-select__option')
    );
    options[0]?.click();
    fixture.detectChanges();
    options = Array.from(hostEl().querySelectorAll('.ui-lib-cascade-select__option'));
    options[2]?.click();
    fixture.detectChanges();
    options = Array.from(hostEl().querySelectorAll('.ui-lib-cascade-select__option'));
    options[4]?.click();
    fixture.detectChanges();

    openPanel();
    const selectedItem: HTMLElement | null = hostEl().querySelector(
      '.ui-lib-cascade-select__option[aria-selected="true"]'
    );
    expect(selectedItem).toBeTruthy();
  });

  it('forwards ariaLabel and ariaLabelledBy', (): void => {
    fixture.componentInstance.ariaLabel = 'Cascade Label';
    fixture.componentInstance.ariaLabelledBy = 'external-label';
    fixture.detectChanges();

    expect(cmpEl().getAttribute('aria-label')).toBe('Cascade Label');
    expect(cmpEl().getAttribute('aria-labelledby')).toBe('external-label');
  });
});
