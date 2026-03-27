import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { DebugElement } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  CascadeSelectDropdownIconDirective,
  CascadeSelectFooterDirective,
  CascadeSelectHeaderDirective,
  CascadeSelectLoadingDirective,
  CascadeSelectOptionDirective,
  CascadeSelectOptionGroupIconDirective,
  CascadeSelectValueDirective,
  UiLibCascadeSelect,
} from './index';

interface CountryNode {
  name: string;
  code: string;
  states: StateNode[];
}

interface StateNode {
  name: string;
  cities: CityNode[];
  disabled?: boolean;
}

interface CityNode {
  cname: string;
  code: string;
  disabled?: boolean;
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
      {
        name: 'Queensland',
        cities: [
          { cname: 'Brisbane', code: 'BRI' },
          { cname: 'Townsville', code: 'TSV' },
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

function getRequiredItem<T>(items: T[], index: number, label: string): T {
  const item: T | undefined = items[index];
  if (!item) {
    throw new Error(`Expected ${label} at index ${index}.`);
  }
  return item;
}

@Component({
  template: `
    <ui-lib-cascade-select
      [options]="options"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [optionGroupLabel]="optionGroupLabel"
      [optionGroupChildren]="optionGroupChildren"
      [optionDisabled]="optionDisabled"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [loading]="loading"
      [showClear]="showClear"
      [variant]="variant"
      [size]="size"
      [invalid]="invalid"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public options: unknown[] = COUNTRIES;
  public optionLabel: string = 'cname';
  public optionValue: string | undefined = 'code';
  public optionGroupLabel: string = 'name';
  public optionGroupChildren: string[] = ['states', 'cities'];
  public optionDisabled: string | undefined;
  public placeholder: string = 'Select city';
  public disabled: boolean = false;
  public loading: boolean = false;
  public showClear: boolean = false;
  public variant: 'material' | 'bootstrap' | 'minimal' | undefined = 'material';
  public size: 'sm' | 'md' | 'lg' = 'md';
  public invalid: boolean = false;
  public value: unknown = null;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibCascadeSelect],
  template: `
    <form [formGroup]="form">
      <ui-lib-cascade-select
        [options]="options"
        optionLabel="cname"
        optionValue="code"
        optionGroupLabel="name"
        [optionGroupChildren]="optionGroupChildren"
        appendTo="self"
        formControlName="city"
      />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly options: unknown[] = COUNTRIES;
  public readonly optionGroupChildren: string[] = ['states', 'cities'];
  public readonly form: FormGroup<{ city: FormControl<string | null> }> = new FormGroup({
    city: new FormControl<string | null>(null),
  });
}

@Component({
  standalone: true,
  imports: [
    FormsModule,
    UiLibCascadeSelect,
    CascadeSelectOptionDirective,
    CascadeSelectValueDirective,
    CascadeSelectDropdownIconDirective,
    CascadeSelectOptionGroupIconDirective,
    CascadeSelectHeaderDirective,
    CascadeSelectFooterDirective,
    CascadeSelectLoadingDirective,
  ],
  template: `
    <ui-lib-cascade-select
      [options]="options"
      optionLabel="cname"
      optionValue="code"
      optionGroupLabel="name"
      [optionGroupChildren]="optionGroupChildren"
      [loading]="loading"
      appendTo="self"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    >
      <ng-template uiCascadeSelectOption let-option>
        <span class="slot-option">Option: {{ option.name || option.cname }}</span>
      </ng-template>
      <ng-template uiCascadeSelectValue let-selected>
        <span class="slot-value">Value: {{ selected?.cname }}</span>
      </ng-template>
      <ng-template uiCascadeSelectDropdownIcon>
        <span class="slot-dropdown-icon">D</span>
      </ng-template>
      <ng-template uiCascadeSelectOptionGroupIcon let-option>
        <span class="slot-group-icon">G {{ option.name }}</span>
      </ng-template>
      <ng-template uiCascadeSelectHeader>
        <div class="slot-header">Header Slot</div>
      </ng-template>
      <ng-template uiCascadeSelectFooter>
        <div class="slot-footer">Footer Slot</div>
      </ng-template>
      <ng-template uiCascadeSelectLoading>
        <div class="slot-loading">Loading Slot</div>
      </ng-template>
    </ui-lib-cascade-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SlotsHostComponent {
  public readonly options: unknown[] = COUNTRIES;
  public readonly optionGroupChildren: string[] = ['states', 'cities'];
  public loading: boolean = false;
  public value: unknown = null;
}

describe('UiLibCascadeSelect unit', (): void => {
  let fixture: ComponentFixture<UiLibCascadeSelect>;
  let component: UiLibCascadeSelect;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [UiLibCascadeSelect],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibCascadeSelect);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', COUNTRIES);
    fixture.componentRef.setInput('optionLabel', 'cname');
    fixture.componentRef.setInput('optionValue', 'code');
    fixture.componentRef.setInput('optionGroupLabel', 'name');
    fixture.componentRef.setInput('optionGroupChildren', ['states', 'cities']);
    fixture.componentRef.setInput('placeholder', 'Select city');
    fixture.componentRef.setInput('appendTo', 'self');
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function cmpEl(): HTMLElement {
    return hostEl();
  }

  function triggerEl(): HTMLElement {
    return hostEl().querySelector('.ui-lib-cascade-select__trigger') as HTMLElement;
  }

  function panelEl(): HTMLElement | null {
    return hostEl().querySelector('.ui-lib-cascade-select__panel') as HTMLElement | null;
  }

  function optionEls(): HTMLElement[] {
    return Array.from(hostEl().querySelectorAll('.ui-lib-cascade-select__option'));
  }

  function levelEls(): HTMLElement[] {
    return Array.from(hostEl().querySelectorAll('.ui-lib-cascade-select__level'));
  }

  function valueText(): string {
    return (
      hostEl().querySelector('.ui-lib-cascade-select__value') as HTMLElement
    ).textContent.trim();
  }

  function openPanelByClick(): void {
    triggerEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  it('renders placeholder when no value', (): void => {
    expect(valueText()).toBe('Select city');
  });

  it('shows and hides panel on click', (): void => {
    openPanelByClick();
    expect(panelEl()).toBeTruthy();

    triggerEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(panelEl()).toBeFalsy();
  });

  it('defaults appendTo to body', (): void => {
    const defaultFixture: ComponentFixture<UiLibCascadeSelect> =
      TestBed.createComponent(UiLibCascadeSelect);
    const defaultComponent: UiLibCascadeSelect = defaultFixture.componentInstance;

    defaultFixture.componentRef.setInput('options', COUNTRIES);
    defaultFixture.componentRef.setInput('optionLabel', 'cname');
    defaultFixture.componentRef.setInput('optionValue', 'code');
    defaultFixture.componentRef.setInput('optionGroupLabel', 'name');
    defaultFixture.componentRef.setInput('optionGroupChildren', ['states', 'cities']);
    defaultFixture.detectChanges();

    defaultComponent.openPanel(new MouseEvent('click'));
    defaultFixture.detectChanges();

    const panel: HTMLElement | null = document.body.querySelector('.ui-lib-cascade-select__panel');
    expect(panel).toBeTruthy();
    expect(panel?.parentElement).toBe(document.body);
  });

  it('keeps panel open for panel clicks and closes on outside clicks when appendTo is body', (): void => {
    fixture.componentRef.setInput('appendTo', 'body');
    fixture.detectChanges();

    openPanelByClick();

    const panel: HTMLElement = getRequiredItem(
      Array.from(document.body.querySelectorAll('.ui-lib-cascade-select__panel')),
      0,
      'body mounted panel'
    );

    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(document.body.querySelector('.ui-lib-cascade-select__panel')).toBeTruthy();

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(document.body.querySelector('.ui-lib-cascade-select__panel')).toBeFalsy();
  });

  it('renders hierarchical levels when expanding groups', (): void => {
    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'root option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 2, 'state option').click();
    fixture.detectChanges();

    expect(levelEls().length).toBe(3);
  });

  it('shows submenu arrow for groups and no arrow for leaf options', (): void => {
    openPanelByClick();
    const rootOption: HTMLElement = getRequiredItem(optionEls(), 0, 'root option');
    expect(rootOption.querySelector('.ui-lib-cascade-select__option-group-icon')).toBeTruthy();

    rootOption.click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 2, 'state option').click();
    fixture.detectChanges();

    const leafOption: HTMLElement = getRequiredItem(optionEls(), 5, 'leaf option');
    expect(leafOption.querySelector('.ui-lib-cascade-select__option-group-icon')).toBeFalsy();
  });

  it('shows loading content when loading is true', (): void => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    component.panelVisible.set(true);
    fixture.detectChanges();

    const loading: HTMLElement | null = hostEl().querySelector('.ui-lib-cascade-select__loading');
    expect(loading).toBeTruthy();
  });

  it('shows clear button when showClear is true and value exists', (): void => {
    component.writeValue('SYD');
    fixture.componentRef.setInput('showClear', true);
    fixture.detectChanges();

    const clearButton: HTMLElement | null = hostEl().querySelector('.ui-lib-cascade-select__clear');
    expect(clearButton).toBeTruthy();
  });

  it('applies generic wrapper focus and filled classes for FloatLabel integration', (): void => {
    component.writeValue('SYD');
    fixture.detectChanges();

    expect(cmpEl().classList.contains('ui-lib-cascade-select--has-value')).toBeTruthy();
    expect(cmpEl().classList.contains('uilib-inputwrapper-filled')).toBeTruthy();

    component.openPanel(new MouseEvent('click'));
    fixture.detectChanges();

    expect(cmpEl().classList.contains('uilib-inputwrapper-focus')).toBeTruthy();
  });

  it('selects leaf option, emits onChange, and closes panel', (): void => {
    const changeSpy: jest.SpiedFunction<typeof component.onChange.emit> = jest.spyOn(
      component.onChange,
      'emit'
    );

    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'country option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 2, 'state option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 4, 'leaf option').click();
    fixture.detectChanges();

    expect(component.internalValue()).toBe('SYD');
    expect(panelEl()).toBeFalsy();
    expect(changeSpy).toHaveBeenCalled();

    const emittedEvent: unknown = changeSpy.mock.calls[0]?.[0];
    expect(emittedEvent).toEqual(expect.objectContaining({ value: 'SYD' }));
  });

  it('clicking group option expands children and does not set value', (): void => {
    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'country option').click();
    fixture.detectChanges();

    expect(levelEls().length).toBe(2);
    expect(component.internalValue()).toBeNull();
  });

  it('emits onGroupChange when entering a group', (): void => {
    const groupSpy: jest.SpiedFunction<typeof component.onGroupChange.emit> = jest.spyOn(
      component.onGroupChange,
      'emit'
    );

    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'country option').click();
    fixture.detectChanges();

    expect(groupSpy).toHaveBeenCalled();
    const emittedEvent: unknown = groupSpy.mock.calls[0]?.[0];
    expect(emittedEvent).toEqual(expect.objectContaining({ level: 0, value: COUNTRIES[0] }));
  });

  it('ArrowDown and ArrowUp move active option within level', (): void => {
    openPanelByClick();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    const firstActive: HTMLElement | null = hostEl().querySelector(
      '.ui-lib-cascade-select__option--active'
    );
    expect(firstActive?.textContent).toContain('Canada');

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fixture.detectChanges();

    const secondActive: HTMLElement | null = hostEl().querySelector(
      '.ui-lib-cascade-select__option--active'
    );
    expect(secondActive?.textContent).toContain('Australia');
  });

  it('ArrowRight expands group and ArrowLeft returns to parent level', (): void => {
    openPanelByClick();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(levelEls().length).toBe(3);

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    expect(levelEls().length).toBe(2);
  });

  it('Enter selects a focused leaf option', (): void => {
    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'country option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 2, 'state option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 4, 'leaf option').dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true })
    );
    fixture.detectChanges();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(component.internalValue()).toBe('SYD');
  });

  it('Space selects a focused leaf option', (): void => {
    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'country option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 2, 'state option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 4, 'leaf option').dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true })
    );
    fixture.detectChanges();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();

    expect(component.internalValue()).toBe('SYD');
  });

  it('Escape closes panel', (): void => {
    openPanelByClick();
    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(panelEl()).toBeFalsy();
  });

  it('Home and End move to first and last option of current level', (): void => {
    openPanelByClick();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    let active: HTMLElement | null = hostEl().querySelector(
      '.ui-lib-cascade-select__option--active'
    );
    expect(active?.textContent).toContain('Canada');

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    active = hostEl().querySelector('.ui-lib-cascade-select__option--active');
    expect(active?.textContent).toContain('Australia');
  });

  it('skips disabled options during keyboard navigation', (): void => {
    const disabledData: CountryNode[] = JSON.parse(JSON.stringify(COUNTRIES)) as CountryNode[];
    const auCountry: CountryNode = getRequiredItem(disabledData, 0, 'australia country');
    const nswState: StateNode = getRequiredItem(auCountry.states, 0, 'nsw state');
    const sydney: CityNode = getRequiredItem(nswState.cities, 0, 'sydney city');
    sydney.disabled = true;

    fixture.componentRef.setInput('options', disabledData);
    fixture.componentRef.setInput('optionDisabled', 'disabled');
    fixture.detectChanges();

    openPanelByClick();
    getRequiredItem(optionEls(), 0, 'country option').click();
    fixture.detectChanges();
    getRequiredItem(optionEls(), 2, 'state option').click();
    fixture.detectChanges();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    const activeOptions: HTMLElement[] = Array.from(
      hostEl().querySelectorAll('.ui-lib-cascade-select__option--active')
    );
    expect(
      activeOptions.some((optionEl: HTMLElement): boolean => {
        return optionEl.textContent.includes('Newcastle');
      })
    ).toBeTruthy();
  });

  it('Tab closes panel', (): void => {
    openPanelByClick();
    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fixture.detectChanges();

    expect(panelEl()).toBeFalsy();
  });

  it('writeValue updates selected display label', (): void => {
    component.writeValue('TOR');
    fixture.detectChanges();

    expect(valueText()).toBe('Toronto');
  });

  it('setDisabledState disables interaction', (): void => {
    component.setDisabledState(true);
    fixture.detectChanges();

    triggerEl().click();
    fixture.detectChanges();

    expect(cmpEl().getAttribute('aria-disabled')).toBe('true');
    expect(panelEl()).toBeFalsy();
  });

  it('marks touched on blur via registered callback', (): void => {
    const touchedSpy: jest.Mock<void, []> = jest.fn<void, []>();
    component.registerOnTouched(touchedSpy);

    cmpEl().dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    fixture.detectChanges();

    expect(touchedSpy).toHaveBeenCalled();
  });

  it('disabled input prevents interaction', (): void => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    triggerEl().click();
    fixture.detectChanges();

    expect(panelEl()).toBeFalsy();
  });

  it('invalid input applies aria-invalid and class', (): void => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();

    expect(cmpEl().getAttribute('aria-invalid')).toBe('true');
    expect(cmpEl().classList.contains('ui-lib-cascade-select--invalid')).toBeTruthy();
  });

  it('loading prevents panel open', (): void => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    triggerEl().click();
    fixture.detectChanges();

    expect(panelEl()).toBeFalsy();
  });

  it('showClear clears value and emits onClear', (): void => {
    const clearSpy: jest.SpiedFunction<typeof component.onClear.emit> = jest.spyOn(
      component.onClear,
      'emit'
    );
    component.writeValue('TOR');
    fixture.componentRef.setInput('showClear', true);
    fixture.detectChanges();

    const clearButton: HTMLElement = hostEl().querySelector(
      '.ui-lib-cascade-select__clear'
    ) as HTMLElement;
    clearButton.click();
    fixture.detectChanges();

    expect(component.internalValue()).toBeNull();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('forwards ariaLabel and ariaLabelledBy to host attrs', (): void => {
    fixture.componentRef.setInput('ariaLabel', 'Cascade label');
    fixture.componentRef.setInput('ariaLabelledBy', 'custom-label-id');
    fixture.detectChanges();

    expect(cmpEl().getAttribute('aria-label')).toBe('Cascade label');
    expect(cmpEl().getAttribute('aria-labelledby')).toBe('custom-label-id');
  });

  it('updates aria-activedescendant while navigating', (): void => {
    openPanelByClick();

    cmpEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    const activeId: string | null = cmpEl().getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId as string)).toBeTruthy();
  });
});

describe('UiLibCascadeSelect forms integration', (): void => {
  it('works with ngModel and updates host value on leaf selection', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    const trigger: HTMLElement = hostElement.querySelector(
      '.ui-lib-cascade-select__trigger'
    ) as HTMLElement;

    trigger.click();
    fixture.detectChanges();

    let options: HTMLElement[] = Array.from(
      hostElement.querySelectorAll('.ui-lib-cascade-select__option')
    );
    getRequiredItem(options, 0, 'country option').click();
    fixture.detectChanges();
    options = Array.from(hostElement.querySelectorAll('.ui-lib-cascade-select__option'));
    getRequiredItem(options, 2, 'state option').click();
    fixture.detectChanges();
    options = Array.from(hostElement.querySelectorAll('.ui-lib-cascade-select__option'));
    getRequiredItem(options, 4, 'leaf option').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('SYD');
  });

  it('works with formControlName and updates control value on selection', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<ReactiveHostComponent> =
      TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();

    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    const trigger: HTMLElement = hostElement.querySelector(
      '.ui-lib-cascade-select__trigger'
    ) as HTMLElement;

    trigger.click();
    fixture.detectChanges();

    let options: HTMLElement[] = Array.from(
      hostElement.querySelectorAll('.ui-lib-cascade-select__option')
    );
    getRequiredItem(options, 0, 'country option').click();
    fixture.detectChanges();
    options = Array.from(hostElement.querySelectorAll('.ui-lib-cascade-select__option'));
    getRequiredItem(options, 2, 'state option').click();
    fixture.detectChanges();
    options = Array.from(hostElement.querySelectorAll('.ui-lib-cascade-select__option'));
    getRequiredItem(options, 4, 'leaf option').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.form.controls.city.value).toBe('SYD');
  });
});

describe('UiLibCascadeSelect template slots', (): void => {
  let fixture: ComponentFixture<SlotsHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SlotsHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotsHostComponent);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('renders custom option, header, and footer templates', (): void => {
    const trigger: HTMLElement = hostEl().querySelector(
      '.ui-lib-cascade-select__trigger'
    ) as HTMLElement;
    trigger.click();
    fixture.detectChanges();

    expect(hostEl().querySelector('.slot-header')).toBeTruthy();
    expect(hostEl().querySelector('.slot-footer')).toBeTruthy();
    expect(hostEl().querySelector('.slot-option')).toBeTruthy();
  });

  it('renders custom loading template', (): void => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();

    const cascadeDebugElement: DebugElement = getRequiredItem(
      fixture.debugElement.children,
      0,
      'cascade debug element'
    );
    const cascadeComponent: UiLibCascadeSelect =
      cascadeDebugElement.componentInstance as UiLibCascadeSelect;
    cascadeComponent.panelVisible.set(true);
    fixture.detectChanges();

    expect(hostEl().querySelector('.slot-loading')).toBeTruthy();
  });

  it('renders custom value template after selecting a leaf', (): void => {
    const trigger: HTMLElement = hostEl().querySelector(
      '.ui-lib-cascade-select__trigger'
    ) as HTMLElement;
    trigger.click();
    fixture.detectChanges();

    let options: HTMLElement[] = Array.from(
      hostEl().querySelectorAll('.ui-lib-cascade-select__option')
    );
    getRequiredItem(options, 0, 'country option').click();
    fixture.detectChanges();
    options = Array.from(hostEl().querySelectorAll('.ui-lib-cascade-select__option'));
    getRequiredItem(options, 2, 'state option').click();
    fixture.detectChanges();
    options = Array.from(hostEl().querySelectorAll('.ui-lib-cascade-select__option'));
    getRequiredItem(options, 4, 'leaf option').click();
    fixture.detectChanges();

    expect(hostEl().querySelector('.slot-value')?.textContent).toContain('Sydney');
  });
});
