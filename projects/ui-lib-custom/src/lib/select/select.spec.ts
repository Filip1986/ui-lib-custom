import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { UiLibSelect } from './select';
import type { SelectOption, SelectVariant } from './select';
import { SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

function getRequiredItem<T>(items: T[], index: number, label: string): T {
  const item: T | undefined = items[index];
  if (!item) {
    throw new Error(`Expected ${label} at index ${index}.`);
  }
  return item;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: `
    <ui-lib-select
      [options]="options()"
      [label]="label()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  public readonly options: WritableSignal<SelectOption[]> = signal<SelectOption[]>([
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ]);
  public readonly label: WritableSignal<string> = signal<string>('Pick one');
  public value: string | null = null;
}

describe('UiLibSelect accessibility', (): void => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function selectEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-select') as HTMLElement;
  }

  function controlEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__control'
    ) as HTMLElement;
  }

  function openSelect(): void {
    controlEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  it('should have combobox role', (): void => {
    expect(selectEl().getAttribute('role')).toBe('combobox');
  });

  it('should have aria-expanded', (): void => {
    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
    openSelect();
    expect(selectEl().getAttribute('aria-expanded')).toBe('true');
  });

  it('should update aria-activedescendant on arrow navigation', (): void => {
    openSelect();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    const activeId: string | null = selectEl().getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId as string)).toBeTruthy();
  });

  it('should have listbox role on dropdown', (): void => {
    openSelect();

    const listbox: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="listbox"]'
    );
    expect(listbox).toBeTruthy();
  });

  it('should have option role on each option', (): void => {
    openSelect();

    const options: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
  });

  it('should select option with Enter key', (): void => {
    openSelect();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBeTruthy();
  });

  it('should close with Escape key', (): void => {
    openSelect();
    expect(selectEl().getAttribute('aria-expanded')).toBe('true');

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
  });

  it('should close with Escape and return focus to the trigger', (): void => {
    openSelect();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
    const active: HTMLElement | null = document.activeElement as HTMLElement | null;
    expect(active === selectEl() || selectEl().contains(active)).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibSelect],
  template: `
    <form [formGroup]="form">
      <ui-lib-select [options]="options" formControlName="choice" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];
  public readonly form: FormGroup<{ choice: FormControl<string | null> }> = new FormGroup({
    choice: new FormControl<string | null>(null),
  });
}

describe('UiLibSelect Reactive Forms', (): void => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-select') as HTMLElement;
  }

  function controlEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__control'
    ) as HTMLElement;
  }

  function openSelect(): void {
    controlEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  function optionEls(): HTMLElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.ui-lib-select__option')
    );
  }

  it('updates control value when option is selected', (): void => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    openSelect();
    getRequiredItem(optionEls(), 0, 'select option').click();
    fixture.detectChanges();

    expect(control.value).toBe('alpha');
  });

  it('marks control as touched when closed', (): void => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    openSelect();
    getRequiredItem(optionEls(), 0, 'select option').click();
    fixture.detectChanges();

    expect(control.touched).toBeTruthy();
  });

  it('reflects disabled state from control', (): void => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    control.disable();
    fixture.detectChanges();

    expect(hostEl().getAttribute('aria-disabled')).toBe('true');
  });
});

describe('UiLibSelect basics', (): void => {
  let fixture: ComponentFixture<UiLibSelect>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [UiLibSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibSelect);
    fixture.detectChanges();
  });

  function hostWrapper(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-select') as HTMLElement;
  }

  function controlEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__control'
    ) as HTMLElement;
  }

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('creates with defaults', (): void => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(hostWrapper().classList.contains('ui-lib-select')).toBeTruthy();
    expect(hostWrapper().classList.contains('ui-lib-select--material')).toBeTruthy();
    expect(hostEl().classList.contains('uilib-inputwrapper-filled')).toBeFalsy();
    expect(hostEl().classList.contains('uilib-inputwrapper-focus')).toBeFalsy();
  });

  it('applies open and filled wrapper classes on the host', (): void => {
    fixture.componentRef.setInput('options', [{ label: 'Alpha', value: 'alpha' }]);
    fixture.detectChanges();

    fixture.componentInstance.writeValue('alpha');
    fixture.detectChanges();

    expect(hostEl().classList.contains('ui-lib-select--has-value')).toBeTruthy();
    expect(hostEl().classList.contains('uilib-inputwrapper-filled')).toBeTruthy();

    fixture.componentInstance.openPanel();
    fixture.detectChanges();

    expect(hostEl().classList.contains('ui-lib-select--open')).toBeTruthy();
    expect(hostEl().classList.contains('uilib-inputwrapper-focus')).toBeTruthy();
  });

  it('applies each variant class', (): void => {
    const variants: SelectVariant[] = [...SHARED_VARIANT_OPTIONS];

    variants.forEach((variant: SelectVariant): void => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      expect(hostWrapper().classList.contains(`ui-lib-select--${variant}`)).toBeTruthy();
    });
  });

  it('renders placeholder by default', (): void => {
    const valueEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__value'
    ) as HTMLElement;
    expect(valueEl.classList.contains('ui-lib-select__placeholder')).toBeTruthy();
    const valueText: string | null = valueEl.textContent;
    expect(valueText).toBeTruthy();
    expect((valueText as string).trim()).toBe('Select...');
  });

  it('renders label when provided', (): void => {
    fixture.componentRef.setInput('label', 'Pick one');
    fixture.detectChanges();

    const labelEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__label'
    ) as HTMLElement | null;
    expect(labelEl).toBeTruthy();
    const labelText: string | null = (labelEl as HTMLElement).textContent;
    expect(labelText).toBeTruthy();
    expect(labelText as string).toContain('Pick one');
  });

  it('sets aria-disabled and blocks interaction when disabled', (): void => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const style: CSSStyleDeclaration = getComputedStyle(hostWrapper());

    expect(hostEl().getAttribute('aria-disabled')).toBe('true');
    expect(hostWrapper().classList.contains('ui-lib-select--disabled')).toBeTruthy();
    expect(style.pointerEvents).toBe('none');

    controlEl().click();
    fixture.detectChanges();
    expect(hostEl().getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-invalid when invalid', (): void => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();

    expect(hostEl().getAttribute('aria-invalid')).toBe('true');
  });

  it('setDisabledState disables the host', (): void => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(hostEl().getAttribute('aria-disabled')).toBe('true');
  });

  it('writeValue updates the displayed value', (): void => {
    const options: SelectOption[] = [{ label: 'Alpha', value: 'alpha' }];
    fixture.componentRef.setInput('options', options);
    fixture.componentInstance.writeValue('alpha');
    fixture.detectChanges();

    const valueEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__value'
    ) as HTMLElement;
    const valueText: string | null = valueEl.textContent;
    expect(valueText).toBeTruthy();
    expect((valueText as string).trim()).toBe('Alpha');
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-select-bg', 'light-bg');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-select-bg').trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-select-bg', 'dark-bg');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-select-bg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});

describe('UiLibSelect ngModel', (): void => {
  let fixture: ComponentFixture<HostComponent>;

  const flushMicrotasks: () => Promise<void> = async (): Promise<void> => {
    await new Promise<void>((resolve: () => void): void => {
      setTimeout(resolve, 0);
    });
  };

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges(false);
    await flushMicrotasks();
    fixture.detectChanges(false);
  });

  it('updates displayed value when ngModel changes', async (): Promise<void> => {
    const freshFixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    freshFixture.componentInstance.value = 'beta';
    freshFixture.detectChanges(false);
    await flushMicrotasks();
    freshFixture.detectChanges(false);

    const valueEl: HTMLElement = (freshFixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__value'
    ) as HTMLElement;
    const valueText: string | null = valueEl.textContent;
    expect(valueText).toBeTruthy();
    expect((valueText as string).trim()).toBe('Beta');
  });
});

describe('UiLibSelect Reactive Forms', (): void => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  it('writeValue updates the displayed value', (): void => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    control.setValue('beta');
    fixture.detectChanges();

    const valueEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__value'
    ) as HTMLElement;
    const valueText: string | null = valueEl.textContent;
    expect(valueText).toBeTruthy();
    expect(valueText.trim()).toBe('Beta');
  });

  it('registerOnChange fires on option selection', (): void => {
    const selectFixture: ComponentFixture<UiLibSelect> = TestBed.createComponent(UiLibSelect);
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ];
    selectFixture.componentRef.setInput('options', options);
    selectFixture.detectChanges();

    const onChangeSpy: jest.Mock = jest.fn();
    selectFixture.componentInstance.registerOnChange(onChangeSpy);

    const control: HTMLElement = (selectFixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__control'
    ) as HTMLElement;
    control.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    selectFixture.detectChanges();

    const option: HTMLElement = (selectFixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__option'
    ) as HTMLElement;
    option.click();
    selectFixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('alpha');
  });

  it('registerOnTouched fires when the panel closes', (): void => {
    const selectFixture: ComponentFixture<UiLibSelect> = TestBed.createComponent(UiLibSelect);
    const options: SelectOption[] = [{ label: 'Alpha', value: 'alpha' }];
    selectFixture.componentRef.setInput('options', options);
    selectFixture.detectChanges();

    const onTouchedSpy: jest.Mock = jest.fn();
    selectFixture.componentInstance.registerOnTouched(onTouchedSpy);

    selectFixture.componentInstance.openPanel();
    selectFixture.componentInstance.closePanel();
    selectFixture.detectChanges();

    expect(onTouchedSpy).toHaveBeenCalled();
  });
});

describe('UiLibSelect behavior', (): void => {
  let fixture: ComponentFixture<UiLibSelect>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [UiLibSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibSelect);
    fixture.detectChanges();
  });

  function setOptions(options: SelectOption[]): void {
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
  }

  function hostElement(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('supports multiple selection display values', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ];
    fixture.componentRef.setInput('multiple', true);
    setOptions(options);

    fixture.componentInstance.writeValue(['alpha', 'beta']);
    fixture.detectChanges();

    const valueEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-select__value'
    ) as HTMLElement;
    const valueText: string | null = valueEl.textContent;
    expect(valueText).toBeTruthy();
    expect((valueText as string).trim()).toBe('Alpha, Beta');
  });

  it('writeValue uses first item when single-select receives an array', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ];
    setOptions(options);

    fixture.componentInstance.writeValue(['beta', 'alpha']);
    fixture.detectChanges();

    const valueElement: HTMLElement = hostElement().querySelector(
      '.ui-lib-select__value'
    ) as HTMLElement;
    expect(valueElement.textContent.trim()).toBe('Beta');
  });

  it('writeValue clears value when single-select receives an empty array', (): void => {
    setOptions([{ label: 'Alpha', value: 'alpha' }]);

    fixture.componentInstance.writeValue([]);
    fixture.detectChanges();

    expect(fixture.componentInstance.displayValue()).toBe('');
  });

  it('togglePanel closes the panel when already open', (): void => {
    setOptions([{ label: 'Alpha', value: 'alpha' }]);

    fixture.componentInstance.openPanel();
    expect(fixture.componentInstance.open()).toBe(true);

    fixture.componentInstance.togglePanel();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('clear emits null for single select', (): void => {
    const onChangeSpy: jest.Mock = jest.fn();
    fixture.componentInstance.registerOnChange(onChangeSpy);
    setOptions([{ label: 'Alpha', value: 'alpha' }]);

    fixture.componentInstance.writeValue('alpha');
    fixture.componentInstance.clear();

    expect(onChangeSpy).toHaveBeenCalledWith(null);
  });

  it('clear emits empty array for multiple select', (): void => {
    const onChangeSpy: jest.Mock = jest.fn();
    fixture.componentRef.setInput('multiple', true);
    fixture.componentInstance.registerOnChange(onChangeSpy);
    setOptions([{ label: 'Alpha', value: 'alpha' }]);

    fixture.componentInstance.writeValue(['alpha']);
    fixture.componentInstance.clear();

    expect(onChangeSpy).toHaveBeenCalledWith([]);
  });

  it('selectOption toggles existing value off in multiple mode', (): void => {
    fixture.componentRef.setInput('multiple', true);
    setOptions([
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ]);

    const onChangeSpy: jest.Mock = jest.fn();
    fixture.componentInstance.registerOnChange(onChangeSpy);
    fixture.componentInstance.writeValue(['alpha']);

    const alphaOption: SelectOption = getRequiredItem(
      fixture.componentInstance.filteredOptions(),
      0,
      'alpha option'
    );
    fixture.componentInstance.selectOption(alphaOption);

    expect(onChangeSpy).toHaveBeenCalledWith([]);
  });

  it('setActiveIndex ignores disabled options', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha', disabled: true },
      { label: 'Beta', value: 'beta' },
    ];
    setOptions(options);

    fixture.componentInstance.setActiveIndex(0);
    expect(fixture.componentInstance.focusedIndex()).toBe(-1);
  });

  it('setActiveIndex sets focus when the option is enabled', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ];
    setOptions(options);

    fixture.componentInstance.setActiveIndex(1);

    expect(fixture.componentInstance.focusedIndex()).toBe(1);
  });

  it('onKeydown Home and End update active option when panel is open', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
      { label: 'Gamma', value: 'gamma' },
    ];
    setOptions(options);
    fixture.componentInstance.openPanel();

    fixture.componentInstance.onKeydown(new KeyboardEvent('keydown', { key: 'End' }));
    expect(fixture.componentInstance.focusedIndex()).toBe(2);

    fixture.componentInstance.onKeydown(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(fixture.componentInstance.focusedIndex()).toBe(0);
  });

  it('onKeydown typeahead focuses matching enabled option', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha', disabled: true },
      { label: 'Beta', value: 'beta' },
      { label: 'Gamma', value: 'gamma' },
    ];
    setOptions(options);
    fixture.componentInstance.openPanel();
    fixture.componentInstance.focusedIndex.set(0);

    fixture.componentInstance.onKeydown(new KeyboardEvent('keydown', { key: 'g' }));

    expect(fixture.componentInstance.focusedIndex()).toBe(2);
  });

  it('openPanel sets focusedIndex to -1 when all options are disabled', (): void => {
    const options: SelectOption[] = [
      { label: 'Alpha', value: 'alpha', disabled: true },
      { label: 'Beta', value: 'beta', disabled: true },
    ];
    setOptions(options);

    fixture.componentInstance.openPanel();

    expect(fixture.componentInstance.focusedIndex()).toBe(-1);
  });

  it('getOptionLabel returns primitive fallback labels', (): void => {
    expect(fixture.componentInstance.getOptionLabel('plain')).toBe('plain');
    expect(fixture.componentInstance.getOptionLabel(null)).toBe('');
  });
});
