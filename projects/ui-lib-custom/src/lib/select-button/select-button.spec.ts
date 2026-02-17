import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { SelectButton } from './select-button';
import {
  SelectButtonChangeEvent,
  SelectButtonOption,
  SelectButtonSize,
  SelectButtonVariant,
} from './select-button.types';

const defaultOptions: SelectButtonOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3', disabled: true },
];

@Component({
  standalone: true,
  imports: [SelectButton],
  template: `
    <ui-lib-select-button
      [options]="options()"
      [multiple]="multiple()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [allowEmpty]="allowEmpty()"
      [optionLabel]="optionLabel()"
      [optionValue]="optionValue()"
      [optionDisabled]="optionDisabled()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [(value)]="value"
      (onChange)="onChange($event)"
    />
  `,
})
class HostComponent {
  options = signal<SelectButtonOption[]>(defaultOptions);
  multiple = signal<boolean>(false);
  variant = signal<SelectButtonVariant>('material');
  size = signal<SelectButtonSize>('medium');
  disabled = signal<boolean>(false);
  allowEmpty = signal<boolean>(false);
  optionLabel = signal<string>('label');
  optionValue = signal<string>('value');
  optionDisabled = signal<string>('disabled');
  ariaLabelledBy = signal<string | null>(null);
  value: any | any[] | null = null;
  lastChange: SelectButtonChangeEvent | null = null;

  onChange(event: SelectButtonChangeEvent): void {
    this.lastChange = event;
  }
}

@Component({
  standalone: true,
  imports: [SelectButton, FormsModule],
  template: ` <ui-lib-select-button [options]="options" [(ngModel)]="value" /> `,
})
class NgModelHostComponent {
  options: SelectButtonOption[] = defaultOptions;
  value: string | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton, ReactiveFormsModule],
  template: ` <ui-lib-select-button [options]="options" [formControl]="control" /> `,
})
class ReactiveHostComponent {
  options: SelectButtonOption[] = defaultOptions;
  control = new FormControl<string | null>('opt2');
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: `
    <ui-lib-select-button [options]="options" [(value)]="value">
      <ng-template #item let-option>
        <span class="custom-item">{{ option.label }}</span>
      </ng-template>
    </ui-lib-select-button>
  `,
})
class TemplateHostComponent {
  options: SelectButtonOption[] = defaultOptions;
  value: string | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [(value)]="value" /> `,
})
class PrimitiveHostComponent {
  options: SelectButtonOption[] = ['A', 'B', 'C'] as unknown as SelectButtonOption[];
  value: string | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [(value)]="value" /> `,
})
class ObjectValueHostComponent {
  options: SelectButtonOption[] = [
    { label: 'Alpha', value: { id: 1 } },
    { label: 'Beta', value: { id: 2 } },
  ];
  value: { id: number } | null = null;
}

describe('SelectButton', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement.querySelector('ui-lib-select-button');
  }

  function buttons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('button'));
  }

  describe('Component creation', () => {
    it('creates successfully', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('has default values', () => {
      expect(fixture.componentInstance.multiple()).toBeFalse();
      expect(fixture.componentInstance.allowEmpty()).toBeFalse();
      expect(fixture.componentInstance.variant()).toBe('material');
      expect(fixture.componentInstance.size()).toBe('medium');
    });

    it('renders correct number of option buttons', () => {
      expect(buttons().length).toBe(3);
    });
  });

  describe('Single selection mode', () => {
    it('selects item on click', () => {
      buttons()[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBe('opt1');
    });

    it('deselects when allowEmpty is true', () => {
      fixture.componentInstance.allowEmpty.set(true);
      fixture.detectChanges();

      buttons()[0].click();
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe('opt1');

      buttons()[0].click();
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBeNull();
    });

    it('cannot deselect when allowEmpty is false', () => {
      buttons()[0].click();
      fixture.detectChanges();

      buttons()[0].click();
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe('opt1');
    });

    it('only one item selected at a time', () => {
      buttons()[0].click();
      fixture.detectChanges();
      buttons()[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBe('opt2');
      expect(buttons()[0].getAttribute('aria-pressed')).toBe('false');
      expect(buttons()[1].getAttribute('aria-pressed')).toBe('true');
    });

    it('emits onChange with correct value', () => {
      buttons()[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.lastChange?.value).toBe('opt1');
    });
  });

  describe('Multiple selection mode', () => {
    beforeEach(() => {
      fixture.componentInstance.multiple.set(true);
      fixture.detectChanges();
    });

    it('selects multiple items', () => {
      buttons()[0].click();
      buttons()[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toEqual(['opt1', 'opt2']);
    });

    it('toggles selection on click', () => {
      buttons()[0].click();
      fixture.detectChanges();
      buttons()[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toEqual([]);
    });

    it('emits onChange with array value', () => {
      buttons()[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.lastChange?.value).toEqual(['opt1']);
    });

    it('can deselect all items', () => {
      buttons()[0].click();
      buttons()[1].click();
      fixture.detectChanges();

      buttons()[0].click();
      buttons()[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toEqual([]);
    });
  });

  describe('Options binding', () => {
    it('handles optionLabel property', () => {
      const options: SelectButtonOption[] = [
        { label: 'Alpha', value: 1, name: 'A' },
        { label: 'Beta', value: 2, name: 'B' },
      ];
      fixture.componentInstance.options.set(options);
      fixture.componentInstance.optionLabel.set('name');
      fixture.detectChanges();

      expect(buttons()[0].textContent?.trim()).toBe('A');
    });

    it('handles optionValue property', () => {
      const options: SelectButtonOption[] = [
        { label: 'Alpha', value: 1, id: 'a' },
        { label: 'Beta', value: 2, id: 'b' },
      ];
      fixture.componentInstance.options.set(options);
      fixture.componentInstance.optionValue.set('id');
      fixture.detectChanges();

      buttons()[1].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBe('b');
    });

    it('handles optionDisabled property', () => {
      const options: SelectButtonOption[] = [
        { label: 'Alpha', value: 'a', inactive: true },
        { label: 'Beta', value: 'b' },
      ];
      fixture.componentInstance.options.set(options);
      fixture.componentInstance.optionDisabled.set('inactive');
      fixture.detectChanges();

      buttons()[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBeNull();
    });

    it('works with primitive values (string array)', async () => {
      const primitiveFixture: ComponentFixture<PrimitiveHostComponent> =
        TestBed.createComponent(PrimitiveHostComponent);
      primitiveFixture.detectChanges();

      const btns: HTMLButtonElement[] = Array.from(
        primitiveFixture.nativeElement.querySelectorAll('button')
      );
      btns[1].click();
      primitiveFixture.detectChanges();

      expect(primitiveFixture.componentInstance.value).toBe('B');
    });

    it('works with object values', async () => {
      const objectFixture: ComponentFixture<ObjectValueHostComponent> =
        TestBed.createComponent(ObjectValueHostComponent);
      objectFixture.detectChanges();

      const btns: HTMLButtonElement[] = Array.from(
        objectFixture.nativeElement.querySelectorAll('button')
      );
      btns[0].click();
      objectFixture.detectChanges();

      expect(objectFixture.componentInstance.value).toEqual({ id: 1 });
    });
  });

  describe('Forms integration', () => {
    it('works with ngModel', async () => {
      const ngModelFixture: ComponentFixture<NgModelHostComponent> =
        TestBed.createComponent(NgModelHostComponent);
      ngModelFixture.detectChanges();

      const btns: HTMLButtonElement[] = Array.from(
        ngModelFixture.nativeElement.querySelectorAll('button')
      );
      btns[0].click();
      ngModelFixture.detectChanges();

      expect(ngModelFixture.componentInstance.value).toBe('opt1');
    });

    it('works with formControlName and writeValue updates selection', async () => {
      const reactiveFixture: ComponentFixture<ReactiveHostComponent> =
        TestBed.createComponent(ReactiveHostComponent);
      reactiveFixture.detectChanges();

      const btns: HTMLButtonElement[] = Array.from(
        reactiveFixture.nativeElement.querySelectorAll('button')
      );
      expect(btns[1].getAttribute('aria-pressed')).toBe('true');

      reactiveFixture.componentInstance.control.setValue('opt1');
      reactiveFixture.detectChanges();
      expect(btns[0].getAttribute('aria-pressed')).toBe('true');
    });

    it('registerOnChange fires on selection', () => {
      const selectFixture: ComponentFixture<SelectButton> = TestBed.createComponent(SelectButton);
      selectFixture.componentRef.setInput('options', defaultOptions);
      selectFixture.detectChanges();

      const component: SelectButton = selectFixture.componentInstance;
      const onChangeSpy: jasmine.Spy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      const btns: HTMLButtonElement[] = Array.from(
        selectFixture.nativeElement.querySelectorAll('button')
      );
      btns[0].click();
      selectFixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith('opt1');
    });

    it('registerOnTouched fires on blur', () => {
      const selectFixture: ComponentFixture<SelectButton> = TestBed.createComponent(SelectButton);
      selectFixture.componentRef.setInput('options', defaultOptions);
      selectFixture.detectChanges();

      const component: SelectButton = selectFixture.componentInstance;
      const onTouchedSpy: jasmine.Spy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      const host: HTMLElement = selectFixture.nativeElement as HTMLElement;
      host.dispatchEvent(new FocusEvent('focusout', { relatedTarget: null }));

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('setDisabledState works', () => {
      const selectFixture: ComponentFixture<SelectButton> = TestBed.createComponent(SelectButton);
      selectFixture.componentRef.setInput('options', defaultOptions);
      selectFixture.detectChanges();

      selectFixture.componentInstance.setDisabledState(true);
      selectFixture.detectChanges();

      const host: HTMLElement = selectFixture.nativeElement as HTMLElement;
      expect(host.className).toContain('ui-lib-select-button--disabled');
    });
  });

  describe('Disabled state', () => {
    it('component-level disabled prevents interaction', () => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      buttons()[0].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBeNull();
    });

    it('per-option disabled prevents specific option interaction', () => {
      buttons()[2].click();
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBeNull();
    });

    it('disabled styling applied', () => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      expect(hostEl().className).toContain('ui-lib-select-button--disabled');
    });
  });

  describe('Variants & sizes', () => {
    it('material variant applies correct classes', () => {
      fixture.componentInstance.variant.set('material');
      fixture.detectChanges();
      expect(hostEl().className).toContain('ui-lib-select-button--material');
    });

    it('bootstrap variant applies correct classes', () => {
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      expect(hostEl().className).toContain('ui-lib-select-button--bootstrap');
    });

    it('minimal variant applies correct classes', () => {
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      expect(hostEl().className).toContain('ui-lib-select-button--minimal');
    });

    it('size classes applied correctly', () => {
      fixture.componentInstance.size.set('large');
      fixture.detectChanges();
      expect(hostEl().className).toContain('ui-lib-select-button--large');
    });
  });

  describe('Accessibility', () => {
    it('has role="group" on container', () => {
      expect(hostEl().getAttribute('role')).toBe('group');
    });

    it('buttons have role="button"', () => {
      expect(buttons()[0].getAttribute('role')).toBe('button');
    });

    it('aria-pressed reflects selection state', () => {
      buttons()[0].click();
      fixture.detectChanges();

      expect(buttons()[0].getAttribute('aria-pressed')).toBe('true');
    });

    it('aria-labelledby applied when set', () => {
      fixture.componentInstance.ariaLabelledBy.set('label-id');
      fixture.detectChanges();

      expect(hostEl().getAttribute('aria-labelledby')).toBe('label-id');
    });

    it('keyboard navigation (Space) toggles selection', () => {
      hostEl().dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBe('opt1');
    });
  });

  describe('Custom templates', () => {
    it('renders custom item template', async () => {
      const templateFixture: ComponentFixture<TemplateHostComponent> =
        TestBed.createComponent(TemplateHostComponent);
      templateFixture.detectChanges();

      const customItems: NodeListOf<HTMLElement> =
        templateFixture.nativeElement.querySelectorAll('.custom-item');
      expect(customItems.length).toBe(3);
      expect(customItems[0].textContent?.trim()).toBe('Option 1');
    });
  });
});
