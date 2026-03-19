/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AutoCompleteEmptyDirective,
  AutoCompleteFooterDirective,
  AutoCompleteGroupDirective,
  AutoCompleteHeaderDirective,
  AutoCompleteItemDirective,
  AutoCompleteSelectedItemDirective,
  UiLibAutoComplete,
} from './index';

function getRequiredItem<T>(items: T[], index: number, label: string): T {
  const item: T | undefined = items[index];
  if (!item) {
    throw new Error(`Expected ${label} at index ${index}.`);
  }
  return item;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  template: `
    <ui-lib-autocomplete
      [suggestions]="options"
      optionLabel="label"
      optionValue="value"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NgModelHostComponent {
  public readonly options: Array<{ label: string; value: string }> = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibAutoComplete],
  template: `
    <form [formGroup]="form">
      <ui-lib-autocomplete
        [suggestions]="options"
        optionLabel="label"
        optionValue="value"
        formControlName="choice"
      />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly options: Array<{ label: string; value: string }> = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];
  public readonly form: FormGroup<{ choice: FormControl<string | null> }> = new FormGroup({
    choice: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });
}

@Component({
  standalone: true,
  imports: [
    UiLibAutoComplete,
    AutoCompleteItemDirective,
    AutoCompleteSelectedItemDirective,
    AutoCompleteGroupDirective,
    AutoCompleteHeaderDirective,
    AutoCompleteFooterDirective,
    AutoCompleteEmptyDirective,
  ],
  template: `
    <ui-lib-autocomplete [suggestions]="options" [multiple]="multiple" [group]="group">
      <ng-template uiAutoCompleteItem let-option>
        <span class="custom-item">Item: {{ option.label || option }}</span>
      </ng-template>
      <ng-template uiAutoCompleteSelectedItem let-chip>
        <span class="custom-chip">Chip: {{ chip }}</span>
      </ng-template>
      <ng-template uiAutoCompleteGroup let-groupData>
        <div class="custom-group">{{ groupData.label }}</div>
      </ng-template>
      <ng-template uiAutoCompleteHeader>
        <div class="custom-header">Header</div>
      </ng-template>
      <ng-template uiAutoCompleteFooter>
        <div class="custom-footer">Footer</div>
      </ng-template>
      <ng-template uiAutoCompleteEmpty>
        <div class="custom-empty">Empty</div>
      </ng-template>
    </ui-lib-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateSlotsHostComponent {
  public options: unknown[] = [{ label: 'Alpha', value: 'alpha' }];
  public multiple: boolean = false;
  public group: boolean = false;
}

describe('UiLibAutoComplete', (): void => {
  let fixture: ComponentFixture<UiLibAutoComplete>;
  let component: UiLibAutoComplete;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [UiLibAutoComplete],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibAutoComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function cmpEl(): HTMLElement {
    return hostEl();
  }

  function inputEl(): HTMLInputElement {
    return hostEl().querySelector('input.ui-autocomplete-input') as HTMLInputElement;
  }

  function optionsEls(): HTMLElement[] {
    return Array.from(hostEl().querySelectorAll('.ui-autocomplete-option'));
  }

  function setFlatSuggestions(): void {
    fixture.componentRef.setInput('suggestions', [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
      { label: 'Gamma', value: 'gamma' },
    ]);
    fixture.componentRef.setInput('optionLabel', 'label');
    fixture.componentRef.setInput('optionValue', 'value');
    fixture.detectChanges();
  }

  describe('Rendering & Initialization', (): void => {
    it('renders with default values', (): void => {
      expect(component).toBeTruthy();
      expect(cmpEl().classList.contains('ui-lib-autocomplete--material')).toBeTruthy();
      expect(cmpEl().classList.contains('ui-lib-autocomplete--medium')).toBeTruthy();
    });

    it('renders with each variant class', (): void => {
      (['material', 'bootstrap', 'minimal'] as const).forEach(
        (variant: 'material' | 'bootstrap' | 'minimal'): void => {
          fixture.componentRef.setInput('variant', variant);
          fixture.detectChanges();
          expect(cmpEl().classList.contains(`ui-lib-autocomplete--${variant}`)).toBeTruthy();
        }
      );
    });

    it('renders with each size class', (): void => {
      (['small', 'medium', 'large'] as const).forEach(
        (size: 'small' | 'medium' | 'large'): void => {
          fixture.componentRef.setInput('size', size);
          fixture.detectChanges();
          expect(cmpEl().classList.contains(`ui-lib-autocomplete--${size}`)).toBeTruthy();
        }
      );
    });

    it('renders dropdown button when dropdown is true', (): void => {
      fixture.componentRef.setInput('dropdown', true);
      fixture.detectChanges();
      expect(hostEl().querySelector('.ui-autocomplete-dropdown-btn')).toBeTruthy();
    });

    it('renders clear button when showClear and value exists', (): void => {
      fixture.componentRef.setInput('showClear', true);
      component.writeValue('alpha');
      fixture.detectChanges();
      expect(hostEl().querySelector('.ui-autocomplete-clear')).toBeTruthy();
    });

    it('applies disabled invalid filled and fluid classes', (): void => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('filled', true);
      fixture.componentRef.setInput('fluid', true);
      fixture.detectChanges();

      expect(cmpEl().classList.contains('ui-lib-autocomplete--disabled')).toBeTruthy();
      expect(cmpEl().classList.contains('ui-lib-autocomplete--invalid')).toBeTruthy();
      expect(cmpEl().classList.contains('ui-lib-autocomplete--filled')).toBeTruthy();
      expect(cmpEl().classList.contains('ui-lib-autocomplete--fluid')).toBeTruthy();
    });
  });

  describe('Single Selection Mode', (): void => {
    it('shows suggestions panel on typing', (): void => {
      jest.useFakeTimers();
      setFlatSuggestions();
      fixture.componentRef.setInput('delay', 0);
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      input.value = 'a';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      jest.advanceTimersByTime(0);
      fixture.detectChanges();

      expect(hostEl().querySelector('.ui-autocomplete-panel')).toBeTruthy();
      jest.useRealTimers();
    });

    it('emits completeMethod with debounce and minLength', (): void => {
      jest.useFakeTimers();
      const emitSpy = jest.spyOn(component.completeMethod, 'emit');
      fixture.componentRef.setInput('minLength', 2);
      fixture.componentRef.setInput('delay', 100);
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      input.value = 'a';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      jest.advanceTimersByTime(120);
      expect(emitSpy).toHaveBeenCalledTimes(0);

      input.value = 'ab';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      jest.advanceTimersByTime(99);
      expect(emitSpy).toHaveBeenCalledTimes(0);
      jest.advanceTimersByTime(1);
      expect(emitSpy).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });

    it('selects option on click and closes panel', (): void => {
      const onChange = jest.fn<void, [unknown]>();
      component.registerOnChange(onChange);
      setFlatSuggestions();
      component.showPanel();
      fixture.detectChanges();

      getRequiredItem(optionsEls(), 0, 'option').click();
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledWith('alpha');
      expect(hostEl().querySelector('.ui-autocomplete-panel')).toBeFalsy();
    });

    it('selects active option on Enter key', (): void => {
      const onChange = jest.fn<void, [unknown]>();
      component.registerOnChange(onChange);
      setFlatSuggestions();
      component.showPanel();
      component.setActiveIndex(1);

      component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledWith('beta');
    });

    it('displays selected object label via optionLabel', (): void => {
      fixture.componentRef.setInput('optionLabel', 'name');
      fixture.componentRef.setInput('optionValue', 'id');
      fixture.componentRef.setInput('suggestions', [{ name: 'Alpha', id: 1 }]);
      fixture.detectChanges();

      component.writeValue(1);
      fixture.detectChanges();

      expect(inputEl().value).toBe('Alpha');
    });

    it('clears value on clear button click', (): void => {
      fixture.componentRef.setInput('showClear', true);
      component.writeValue('alpha');
      fixture.detectChanges();

      const clearButton: HTMLElement = getRequiredItem(
        Array.from(hostEl().querySelectorAll('.ui-autocomplete-clear')) as HTMLElement[],
        0,
        'clear button'
      );
      clearButton.click();
      fixture.detectChanges();

      expect(inputEl().value).toBe('');
    });

    it('forceSelection clears non-matching input on blur', (): void => {
      jest.useFakeTimers();
      fixture.componentRef.setInput('forceSelection', true);
      fixture.componentRef.setInput('autoClear', true);
      fixture.componentRef.setInput('suggestions', [{ label: 'Alpha', value: 'alpha' }]);
      fixture.componentRef.setInput('optionLabel', 'label');
      fixture.componentRef.setInput('optionValue', 'value');
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      input.value = 'Unknown';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new FocusEvent('blur'));
      jest.advanceTimersByTime(0);
      fixture.detectChanges();

      expect(input.value).toBe('');
      jest.useRealTimers();
    });

    it('completeOnFocus emits completion on focus', (): void => {
      jest.useFakeTimers();
      const emitSpy = jest.spyOn(component.completeMethod, 'emit');
      fixture.componentRef.setInput('completeOnFocus', true);
      fixture.componentRef.setInput('delay', 0);
      fixture.detectChanges();

      inputEl().dispatchEvent(new FocusEvent('focus'));
      jest.advanceTimersByTime(0);

      expect(emitSpy).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });
  });

  describe('Multiple/Chips Mode', (): void => {
    it('renders selected values as chips', (): void => {
      fixture.componentRef.setInput('multiple', true);
      component.writeValue(['alpha', 'beta']);
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(2);
    });

    it('adds chip on option selection', (): void => {
      fixture.componentRef.setInput('multiple', true);
      setFlatSuggestions();

      component.selectOption({ label: 'Alpha', value: 'alpha' }, new MouseEvent('click'));
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(1);
    });

    it('removes chip on remove button click', (): void => {
      fixture.componentRef.setInput('multiple', true);
      component.writeValue(['alpha']);
      fixture.detectChanges();

      const removeButton: HTMLElement = getRequiredItem(
        Array.from(hostEl().querySelectorAll('.ui-autocomplete-chip-remove')) as HTMLElement[],
        0,
        'chip remove button'
      );
      removeButton.click();
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(0);
    });

    it('removes last chip on Backspace with empty input', (): void => {
      fixture.componentRef.setInput('multiple', true);
      component.writeValue(['alpha', 'beta']);
      fixture.detectChanges();

      component.onKeydown(new KeyboardEvent('keydown', { key: 'Backspace' }));
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Backspace' }));
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(1);
    });

    it('addOnBlur adds current query as chip', (): void => {
      jest.useFakeTimers();
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('addOnBlur', true);
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      input.value = 'Alpha';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new FocusEvent('blur'));
      jest.advanceTimersByTime(0);
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(1);
      jest.useRealTimers();
    });

    it('addOnTab adds current query as chip', (): void => {
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('addOnTab', true);
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      input.value = 'Alpha';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Tab' }));
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(1);
    });

    it('separator splits multiple chips and unique prevents duplicates', (): void => {
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('separator', ',');
      fixture.componentRef.setInput('unique', true);
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      input.value = 'Alpha,Beta,Alpha';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-chip').length).toBe(2);
    });

    it('chips have role option and aria-label', (): void => {
      fixture.componentRef.setInput('multiple', true);
      component.writeValue(['alpha']);
      fixture.detectChanges();

      const chip: HTMLElement = getRequiredItem(
        Array.from(hostEl().querySelectorAll('.ui-autocomplete-chip')),
        0,
        'chip'
      );
      expect(chip.getAttribute('role')).toBe('option');
      expect(chip.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Keyboard Navigation', (): void => {
    beforeEach((): void => {
      setFlatSuggestions();
      component.showPanel();
      fixture.detectChanges();
    });

    it('ArrowDown opens panel if closed', (): void => {
      component.hidePanel();
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      expect(hostEl().querySelector('.ui-autocomplete-panel')).toBeTruthy();
    });

    it('ArrowDown and ArrowUp move active option', (): void => {
      component.setActiveIndex(0);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(component.activeIndex()).toBe(1);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(component.activeIndex()).toBe(0);
    });

    it('Home and End move to first and last options', (): void => {
      component.setActiveIndex(1);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Home' }));
      expect(component.activeIndex()).toBe(0);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'End' }));
      expect(component.activeIndex()).toBe(2);
    });

    it('Escape closes panel', (): void => {
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();
      expect(hostEl().querySelector('.ui-autocomplete-panel')).toBeFalsy();
    });

    it('updates aria-activedescendant while navigating', (): void => {
      component.setActiveIndex(1);
      fixture.detectChanges();
      expect(inputEl().getAttribute('aria-activedescendant')).toContain('-option-1');
    });

    it('wraps around boundaries and skips disabled options', (): void => {
      fixture.componentRef.setInput('optionDisabled', 'disabled');
      fixture.componentRef.setInput('suggestions', [
        { label: 'Disabled', value: 'd', disabled: true },
        { label: 'Alpha', value: 'alpha', disabled: false },
        { label: 'Beta', value: 'beta', disabled: false },
      ]);
      fixture.detectChanges();
      component.showPanel();

      expect(component.activeIndex()).toBe(1);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(component.activeIndex()).toBe(2);
    });

    it('grouped mode navigation uses flattened children and skips headers', (): void => {
      fixture.componentRef.setInput('group', true);
      fixture.componentRef.setInput('suggestions', [
        { label: 'G1', items: [{ label: 'One', value: 1 }] },
        { label: 'G2', items: [{ label: 'Two', value: 2 }] },
      ]);
      fixture.detectChanges();
      component.showPanel();

      expect(component.activeIndex()).toBe(0);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(component.activeIndex()).toBe(1);
    });
  });

  describe('Dropdown Button', (): void => {
    it('dropdownMode blank emits empty query', (): void => {
      fixture.componentRef.setInput('dropdownMode', 'blank');
      const emitSpy = jest.spyOn(component.dropdownClick, 'emit');
      const input: HTMLInputElement = inputEl();
      input.value = 'Alpha';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      component.onDropdownButtonClick(new MouseEvent('click'));

      expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({ query: '' }));
    });

    it('dropdownMode current emits current query', (): void => {
      fixture.componentRef.setInput('dropdownMode', 'current');
      const emitSpy = jest.spyOn(component.dropdownClick, 'emit');
      const input: HTMLInputElement = inputEl();
      input.value = 'Alpha';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      component.onDropdownButtonClick(new MouseEvent('click'));

      expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({ query: 'Alpha' }));
    });
  });

  describe('Grouped Options & Virtual Scroll', (): void => {
    it('renders group headers and items', (): void => {
      fixture.componentRef.setInput('group', true);
      fixture.componentRef.setInput('suggestions', [
        { label: 'Group 1', items: [{ label: 'One', value: 1 }] },
        { label: 'Group 2', items: [{ label: 'Two', value: 2 }] },
      ]);
      component.showPanel();
      fixture.detectChanges();

      expect(hostEl().querySelectorAll('.ui-autocomplete-option-group-label').length).toBe(2);
      expect(hostEl().querySelectorAll('.ui-autocomplete-option').length).toBe(2);
    });

    it('renders only virtual window options for large datasets', (): void => {
      fixture.componentRef.setInput('virtualScroll', true);
      fixture.componentRef.setInput('virtualScrollItemSize', 40);
      fixture.componentRef.setInput('scrollHeight', '120px');
      fixture.componentRef.setInput(
        'suggestions',
        Array.from(
          { length: 1000 },
          (_: unknown, index: number): { label: string; value: number } => ({
            label: `Item ${index}`,
            value: index,
          })
        )
      );
      component.showPanel();
      fixture.detectChanges();

      const rendered: number = hostEl().querySelectorAll('.ui-autocomplete-option').length;
      expect(rendered).toBeLessThan(1000);
      expect(rendered).toBe(5);
    });

    it('virtual viewport scroll updates window start index', (): void => {
      fixture.componentRef.setInput('virtualScroll', true);
      fixture.componentRef.setInput('virtualScrollItemSize', 40);
      fixture.componentRef.setInput('scrollHeight', '120px');
      fixture.componentRef.setInput(
        'suggestions',
        Array.from(
          { length: 100 },
          (_: unknown, index: number): { label: string; value: number } => ({
            label: `Item ${index}`,
            value: index,
          })
        )
      );
      component.showPanel();
      fixture.detectChanges();

      const viewport: HTMLElement = getRequiredItem(
        Array.from(hostEl().querySelectorAll('.ui-autocomplete-virtual-viewport')),
        0,
        'virtual viewport'
      );
      viewport.dispatchEvent(new Event('scroll'));
      component.onVirtualViewportScroll({ target: { scrollTop: 200 } } as unknown as Event);

      expect(
        (component as unknown as { virtualStartIndex: () => number }).virtualStartIndex()
      ).toBe(5);
    });
  });

  describe('Template Slots', (): void => {
    it('renders item, selectedItem, group, header, footer, and empty templates', (): void => {
      const hostFixture: ComponentFixture<TemplateSlotsHostComponent> = TestBed.createComponent(
        TemplateSlotsHostComponent
      );
      hostFixture.detectChanges();

      const ac: UiLibAutoComplete = hostFixture.debugElement.query(
        (node): boolean => node.componentInstance instanceof UiLibAutoComplete
      ).componentInstance as UiLibAutoComplete;
      ac.showPanel();
      hostFixture.detectChanges();

      expect(hostFixture.nativeElement.querySelector('.custom-item')).toBeTruthy();
      expect(hostFixture.nativeElement.querySelector('.custom-header')).toBeTruthy();
      expect(hostFixture.nativeElement.querySelector('.custom-footer')).toBeTruthy();

      ac.hidePanel();
      hostFixture.detectChanges();

      hostFixture.componentInstance.group = true;
      hostFixture.componentInstance.options = [
        { label: 'Group 1', items: [{ label: 'One', value: 1 }] },
      ];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();
      ac.showPanel();
      hostFixture.detectChanges();

      const groupPanel: HTMLElement = getRequiredItem(
        Array.from(hostFixture.nativeElement.querySelectorAll('.ui-autocomplete-panel')),
        0,
        'template-slots group panel'
      );
      expect(groupPanel.querySelector('.custom-group')).toBeTruthy();

      ac.hidePanel();
      hostFixture.detectChanges();

      hostFixture.componentInstance.group = false;
      hostFixture.componentInstance.multiple = true;
      hostFixture.componentInstance.options = [{ label: 'Alpha', value: 'alpha' }];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();
      ac.writeValue(['alpha']);
      hostFixture.detectChanges();

      expect(hostFixture.nativeElement.querySelector('.custom-chip')).toBeTruthy();

      hostFixture.componentInstance.options = [];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();
      ac.showPanel();
      hostFixture.detectChanges();

      expect(hostFixture.nativeElement.querySelector('.custom-empty')).toBeTruthy();
    });
  });

  describe('Accessibility', (): void => {
    it('applies combobox and aria attributes to input', (): void => {
      setFlatSuggestions();
      component.showPanel();
      component.setActiveIndex(0);
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      expect(input.getAttribute('role')).toBe('combobox');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
      expect(input.getAttribute('aria-haspopup')).toBe('listbox');
      expect(input.getAttribute('aria-expanded')).toBe('true');
      expect(input.getAttribute('aria-controls')).toContain('-listbox');
      expect(input.getAttribute('aria-activedescendant')).toContain('-option-0');
    });

    it('applies listbox and option roles', (): void => {
      setFlatSuggestions();
      component.showPanel();
      fixture.detectChanges();

      const listbox: HTMLElement = getRequiredItem(
        Array.from(hostEl().querySelectorAll('.ui-autocomplete-panel')),
        0,
        'listbox panel'
      );
      expect(listbox.getAttribute('role')).toBe('listbox');

      const option: HTMLElement = getRequiredItem(optionsEls(), 0, 'option');
      expect(option.getAttribute('role')).toBe('option');
      expect(option.getAttribute('aria-selected')).toBeTruthy();
    });

    it('applies ariaLabel and ariaLabelledBy and inputId', (): void => {
      fixture.componentRef.setInput('ariaLabel', 'Search choices');
      fixture.componentRef.setInput('ariaLabelledBy', 'ext-label');
      fixture.componentRef.setInput('inputId', 'ac-input');
      fixture.detectChanges();

      const input: HTMLInputElement = inputEl();
      expect(input.id).toBe('ac-input');
      expect(input.getAttribute('aria-label')).toBe('Search choices');
      expect(input.getAttribute('aria-labelledby')).toBe('ext-label');
    });
  });

  describe('Forms Integration', (): void => {
    it('works with template-driven forms', (): void => {
      const hostFixture: ComponentFixture<NgModelHostComponent> =
        TestBed.createComponent(NgModelHostComponent);
      hostFixture.detectChanges();

      const ac: UiLibAutoComplete = hostFixture.debugElement.query(
        (node): boolean => node.componentInstance instanceof UiLibAutoComplete
      ).componentInstance as UiLibAutoComplete;
      ac.selectOption({ label: 'Alpha', value: 'alpha' }, new MouseEvent('click'));
      hostFixture.detectChanges();

      expect(hostFixture.componentInstance.value).toBe('alpha');
    });

    it('works with reactive forms, disabled state, invalid state, and touched on blur', (): void => {
      const hostFixture: ComponentFixture<ReactiveHostComponent> =
        TestBed.createComponent(ReactiveHostComponent);
      hostFixture.detectChanges();

      const control: FormControl<string | null> =
        hostFixture.componentInstance.form.controls.choice;
      const acEl: HTMLElement = hostFixture.nativeElement.querySelector(
        'ui-lib-autocomplete'
      ) as HTMLElement;
      const acCmp: UiLibAutoComplete = hostFixture.debugElement.query(
        (node): boolean => node.componentInstance instanceof UiLibAutoComplete
      ).componentInstance as UiLibAutoComplete;

      acCmp.selectOption({ label: 'Beta', value: 'beta' }, new MouseEvent('click'));
      hostFixture.detectChanges();
      expect(control.value).toBe('beta');

      control.disable();
      hostFixture.detectChanges();
      expect(acEl.classList.contains('ui-lib-autocomplete--disabled')).toBeTruthy();

      control.enable();
      control.setValue(null);
      control.markAsTouched();
      hostFixture.detectChanges();
      expect(control.invalid).toBeTruthy();
      expect(acEl.classList.contains('ng-invalid')).toBeTruthy();

      const input: HTMLInputElement = hostFixture.nativeElement.querySelector(
        'input.ui-autocomplete-input'
      );
      input.dispatchEvent(new FocusEvent('blur'));
      hostFixture.detectChanges();
      expect(control.touched).toBeTruthy();
    });
  });
});
