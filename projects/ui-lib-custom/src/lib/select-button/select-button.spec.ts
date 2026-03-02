import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { SelectButton } from './select-button';
import {
  SelectButtonChangeEvent,
  SelectButtonOption,
  SelectButtonSize,
  SelectButtonVariant,
  SelectButtonValue,
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
      [invalid]="invalid()"
      [allowEmpty]="allowEmpty()"
      [optionLabel]="optionLabel()"
      [optionValue]="optionValue()"
      [optionDisabled]="optionDisabled()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [(value)]="value"
      (selectionChange)="onChange($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  public readonly options = signal<SelectButtonOption[]>(defaultOptions);
  public readonly multiple = signal<boolean>(false);
  public readonly variant = signal<SelectButtonVariant>('material');
  public readonly size = signal<SelectButtonSize>('md');
  public readonly disabled = signal<boolean>(false);
  public readonly invalid = signal<boolean>(false);
  public readonly allowEmpty = signal<boolean>(false);
  public readonly optionLabel = signal<string>('label');
  public readonly optionValue = signal<string>('value');
  public readonly optionDisabled = signal<string>('disabled');
  public readonly ariaLabelledBy = signal<string | null>(null);
  public value: SelectButtonValue | SelectButtonValue[] | null = null;
  public lastChange: SelectButtonChangeEvent | null = null;

  public onChange(event: SelectButtonChangeEvent): void {
    this.lastChange = event;
  }
}

@Component({
  standalone: true,
  imports: [SelectButton, FormsModule],
  template: ` <ui-lib-select-button [options]="options" [(ngModel)]="value" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NgModelHostComponent {
  public options: SelectButtonOption[] = defaultOptions;
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton, ReactiveFormsModule],
  template: ` <ui-lib-select-button [options]="options" [formControl]="control" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public options: SelectButtonOption[] = defaultOptions;
  public control = new FormControl<string | null>('opt2');
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateHostComponent {
  public options: SelectButtonOption[] = defaultOptions;
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [(value)]="value" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PrimitiveHostComponent {
  public options: SelectButtonOption[] = ['A', 'B', 'C'] as unknown as SelectButtonOption[];
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [(value)]="value" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ObjectValueHostComponent {
  public options: SelectButtonOption[] = [
    { label: 'Alpha', value: { id: 1 } },
    { label: 'Beta', value: { id: 2 } },
  ];
  public value: { id: number } | null = null;
}

@Component({
  standalone: true,
  imports: [SelectButton, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ui-lib-select-button [options]="options" formControlName="choice" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveFormNameHostComponent {
  public options: SelectButtonOption[] = defaultOptions;
  public form: FormGroup<{ choice: FormControl<string | null> }> = new FormGroup({
    choice: new FormControl<string | null>('opt2'),
  });
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
    return (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-select-button'
    ) as HTMLElement;
  }

  function buttons(): HTMLButtonElement[] {
    return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'));
  }

  describe('Component creation', () => {
    it('creates successfully', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('has default values', () => {
      expect(fixture.componentInstance.multiple()).toBeFalsy();
      expect(fixture.componentInstance.allowEmpty()).toBeFalsy();
      expect(fixture.componentInstance.variant()).toBe('material');
      expect(fixture.componentInstance.size()).toBe('md');
    });

    it('renders correct number of option buttons', () => {
      expect(buttons().length).toBe(3);
    });

    it('applies aria-disabled when disabled', () => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      expect(hostEl().getAttribute('aria-disabled')).toBe('true');
    });

    it('applies aria-invalid and invalid class when invalid', () => {
      fixture.componentInstance.invalid.set(true);
      fixture.detectChanges();

      expect(hostEl().getAttribute('aria-invalid')).toBe('true');
      expect(hostEl().className).toContain('ui-lib-select-button--invalid');
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
      expect(buttons()[0].getAttribute('aria-checked')).toBe('false');
      expect(buttons()[1].getAttribute('aria-checked')).toBe('true');
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

      const text = buttons()[0].textContent;
      expect(text).toBeTruthy();
      expect((text as string).trim()).toBe('A');
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
        (primitiveFixture.nativeElement as HTMLElement).querySelectorAll('button')
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
        (objectFixture.nativeElement as HTMLElement).querySelectorAll('button')
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
        (ngModelFixture.nativeElement as HTMLElement).querySelectorAll('button')
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
        (reactiveFixture.nativeElement as HTMLElement).querySelectorAll('button')
      );
      expect(btns[1].getAttribute('aria-checked')).toBe('true');

      reactiveFixture.componentInstance.control.setValue('opt1');
      reactiveFixture.detectChanges();
      expect(btns[0].getAttribute('aria-checked')).toBe('true');
    });

    it('works with formControlName', () => {
      const reactiveFixture: ComponentFixture<ReactiveFormNameHostComponent> =
        TestBed.createComponent(ReactiveFormNameHostComponent);
      reactiveFixture.detectChanges();

      const btns: HTMLButtonElement[] = Array.from(
        (reactiveFixture.nativeElement as HTMLElement).querySelectorAll('button')
      );
      expect(btns[1].getAttribute('aria-checked')).toBe('true');

      const control: FormControl<string | null> =
        reactiveFixture.componentInstance.form.controls.choice;
      control.setValue('opt1');
      reactiveFixture.detectChanges();

      expect(btns[0].getAttribute('aria-checked')).toBe('true');
    });

    it('marks control as touched on focusout', () => {
      const reactiveFixture: ComponentFixture<ReactiveFormNameHostComponent> =
        TestBed.createComponent(ReactiveFormNameHostComponent);
      reactiveFixture.detectChanges();

      const control: FormControl<string | null> =
        reactiveFixture.componentInstance.form.controls.choice;

      const btns: HTMLButtonElement[] = Array.from(
        (reactiveFixture.nativeElement as HTMLElement).querySelectorAll('button')
      );
      btns[0].dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }));

      expect(control.touched).toBeTruthy();
    });

    it('reflects disabled state from control', () => {
      const reactiveFixture: ComponentFixture<ReactiveFormNameHostComponent> =
        TestBed.createComponent(ReactiveFormNameHostComponent);
      reactiveFixture.detectChanges();

      const control: FormControl<string | null> =
        reactiveFixture.componentInstance.form.controls.choice;
      control.disable();
      reactiveFixture.detectChanges();

      const host: HTMLElement = (reactiveFixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-select-button'
      ) as HTMLElement;
      expect(host.className).toContain('ui-lib-select-button--disabled');
    });

    it('registerOnChange fires on selection', () => {
      const selectFixture: ComponentFixture<SelectButton> = TestBed.createComponent(SelectButton);
      selectFixture.componentRef.setInput('options', defaultOptions);
      selectFixture.detectChanges();

      const component: SelectButton = selectFixture.componentInstance;
      const onChangeSpy: jasmine.Spy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      const btns: HTMLButtonElement[] = Array.from(
        (selectFixture.nativeElement as HTMLElement).querySelectorAll('button')
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

    it('writeValue updates selection', () => {
      const selectFixture: ComponentFixture<SelectButton> = TestBed.createComponent(SelectButton);
      selectFixture.componentRef.setInput('options', defaultOptions);
      selectFixture.detectChanges();

      selectFixture.componentInstance.writeValue('opt1');
      selectFixture.detectChanges();

      const btns: HTMLButtonElement[] = Array.from(
        (selectFixture.nativeElement as HTMLElement).querySelectorAll('button')
      );
      expect(btns[0].getAttribute('aria-checked')).toBe('true');
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
      const sizes: SelectButtonSize[] = ['small', 'medium', 'large'];
      sizes.forEach((size: SelectButtonSize): void => {
        fixture.componentInstance.size.set(size);
        fixture.detectChanges();
        expect(hostEl().className).toContain(`ui-lib-select-button--${size}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('has role="group" on container', () => {
      expect(hostEl().getAttribute('role')).toBe('radiogroup');
      fixture.componentInstance.multiple.set(true);
      fixture.detectChanges();
      expect(hostEl().getAttribute('role')).toBe('group');
    });

    it('buttons render as native button elements', () => {
      const button: HTMLButtonElement = buttons()[0];
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    it('aria-pressed reflects selection state', () => {
      buttons()[0].click();
      fixture.detectChanges();

      expect(buttons()[0].getAttribute('aria-checked')).toBe('true');
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

      const customItems: NodeListOf<HTMLElement> = (
        templateFixture.nativeElement as HTMLElement
      ).querySelectorAll('.custom-item');
      expect(customItems.length).toBe(3);
      const customText = customItems[0].textContent;
      expect(customText).toBeTruthy();
      expect((customText as string).trim()).toBe('Option 1');
    });
  });

  it('applies dark theme variables', () => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-select-button-material-bg')
      .trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope)
      .getPropertyValue('--uilib-select-button-material-bg')
      .trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});

describe('SelectButton keyboard behavior', () => {
  let fixture: ComponentFixture<SelectButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectButton],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectButton);
    fixture.componentRef.setInput('options', defaultOptions);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function buttons(): HTMLButtonElement[] {
    return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'));
  }

  it('moves focus with arrow keys', () => {
    hostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.focusedIndex()).toBe(1);
  });

  it('moves focus to start/end with Home/End', () => {
    hostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.focusedIndex()).toBe(1);

    hostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.focusedIndex()).toBe(0);
  });

  it('commits focused option on Enter', () => {
    hostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    hostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(buttons()[1].getAttribute('aria-checked')).toBe('true');
  });

  it('tabIndexFor returns 0 for active option', () => {
    fixture.componentInstance.focusedIndex.set(0);
    fixture.detectChanges();

    expect(fixture.componentInstance.tabIndexFor(0)).toBe(0);
    expect(fixture.componentInstance.tabIndexFor(1)).toBe(-1);
  });
});

describe('SelectButton resolvers', () => {
  let fixture: ComponentFixture<SelectButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectButton],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectButton);
  });

  it('resolveLabel falls back to value', () => {
    const option: SelectButtonOption = { value: 'Alpha' } as SelectButtonOption;
    fixture.detectChanges();

    const label: string = fixture.componentInstance.resolveLabel(option);
    expect(label).toBe('Alpha');
  });

  it('resolveValue falls back to label and option', () => {
    const option: SelectButtonOption = { label: 'Alpha' } as SelectButtonOption;
    fixture.detectChanges();

    const value: SelectButtonValue = fixture.componentInstance.resolveValue(option);
    expect(value).toBe('Alpha');
  });

  it('trackOption returns index for object values', () => {
    const option: SelectButtonOption = { label: 'Alpha', value: { id: 1 } } as SelectButtonOption;
    fixture.detectChanges();

    const track: string | number = fixture.componentInstance.trackOption(2, option);
    expect(track).toBe(2);
  });

  it('activeIndex uses selected value when available', () => {
    const options: SelectButtonOption[] = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', 'b');
    fixture.detectChanges();

    expect(fixture.componentInstance.activeIndex()).toBe(1);
  });
});
