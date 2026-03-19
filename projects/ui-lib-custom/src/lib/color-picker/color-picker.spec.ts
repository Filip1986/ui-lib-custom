import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { DebugElement } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ColorPicker } from './index';
import type { ColorPickerValue, HsbColor, RgbColor } from './index';

type ChangeEventPayload = { originalEvent: Event; value: ColorPickerValue };

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker],
  template: `
    <ui-lib-color-picker
      [format]="format()"
      [inline]="inline()"
      [variant]="variant()"
      [disabled]="disabled()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NgModelHostComponent {
  public value: ColorPickerValue = 'ff0000';
  public readonly format: WritableSignal<'hex' | 'rgb' | 'hsb'> = signal<'hex' | 'rgb' | 'hsb'>(
    'hex'
  );
  public readonly inline: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<'material' | 'bootstrap' | 'minimal'> = signal<
    'material' | 'bootstrap' | 'minimal'
  >('material');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ColorPicker],
  template: `
    <form [formGroup]="form">
      <ui-lib-color-picker [inline]="inline" [format]="format" formControlName="color" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public inline: boolean = false;
  public format: 'hex' | 'rgb' | 'hsb' = 'hex';
  public readonly form: FormGroup<{ color: FormControl<ColorPickerValue> }> = new FormGroup({
    color: new FormControl<ColorPickerValue>('ff0000'),
  });
}

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
  const element: T | null = root.querySelector(selector) as T | null;
  if (!element) {
    throw new Error(`Expected element for selector: ${selector}`);
  }
  return element;
}

function mockRect(
  element: Element,
  left: number,
  top: number,
  width: number,
  height: number
): void {
  const rect: DOMRect = {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: (): object => ({}),
  } as DOMRect;

  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: (): DOMRect => rect,
  });
}

describe('ColorPicker component', (): void => {
  let fixture: ComponentFixture<ColorPicker>;
  let component: ColorPicker;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ColorPicker],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function triggerEl(): HTMLButtonElement {
    return requiredElement<HTMLButtonElement>(hostEl(), '.ui-lib-colorpicker__trigger');
  }

  function panelEl(): HTMLDivElement | null {
    return hostEl().querySelector('.ui-lib-colorpicker__panel') as HTMLDivElement | null;
  }

  function colorAreaEl(): HTMLDivElement {
    return requiredElement<HTMLDivElement>(hostEl(), '.ui-lib-colorpicker__color-area');
  }

  function hueEl(): HTMLDivElement {
    return requiredElement<HTMLDivElement>(hostEl(), '.ui-lib-colorpicker__hue');
  }

  function selectorEl(): HTMLDivElement {
    return requiredElement<HTMLDivElement>(hostEl(), '.ui-lib-colorpicker__selector');
  }

  function openPanel(): void {
    triggerEl().click();
    fixture.detectChanges();
  }

  describe('rendering', (): void => {
    it('renders trigger swatch in popup mode by default', (): void => {
      expect(triggerEl()).toBeTruthy();
    });

    it('does not render trigger in inline mode', (): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      const trigger: Element | null = hostEl().querySelector('.ui-lib-colorpicker__trigger');
      expect(trigger).toBeNull();
    });

    it('keeps panel hidden by default in popup mode', (): void => {
      expect(panelEl()).toBeNull();
    });

    it('shows panel in inline mode', (): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      expect(panelEl()).toBeTruthy();
    });

    it('shows current color on trigger background', (): void => {
      component.writeValue('00ff00');
      fixture.detectChanges();

      expect(triggerEl().style.backgroundColor).toContain('rgb(0, 255, 0)');
    });

    it('applies variant class names', (): void => {
      fixture.componentRef.setInput('variant', 'bootstrap');
      fixture.detectChanges();
      expect(hostEl().classList.contains('ui-lib-colorpicker--bootstrap')).toBeTruthy();

      fixture.componentRef.setInput('variant', 'minimal');
      fixture.detectChanges();
      expect(hostEl().classList.contains('ui-lib-colorpicker--minimal')).toBeTruthy();

      fixture.componentRef.setInput('variant', 'material');
      fixture.detectChanges();
      expect(hostEl().classList.contains('ui-lib-colorpicker--material')).toBeTruthy();
    });
  });

  describe('popup behavior', (): void => {
    it('opens on trigger click and emits onShow', (): void => {
      const showSpy: jest.SpyInstance = jest.spyOn(component.onShow, 'emit');

      openPanel();

      expect(component.panelVisible()).toBeTruthy();
      expect(showSpy).toHaveBeenCalledTimes(1);
    });

    it('closes on second trigger click and emits onHide', (): void => {
      const hideSpy: jest.SpyInstance = jest.spyOn(component.onHide, 'emit');

      openPanel();
      triggerEl().click();
      fixture.detectChanges();

      expect(component.panelVisible()).toBeFalsy();
      expect(hideSpy).toHaveBeenCalledTimes(1);
    });

    it('closes on outside click', (): void => {
      const hideSpy: jest.SpyInstance = jest.spyOn(component.onHide, 'emit');
      openPanel();

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(component.panelVisible()).toBeFalsy();
      expect(hideSpy).toHaveBeenCalled();
    });

    it('closes on Escape key and returns focus to trigger', (): void => {
      openPanel();

      const panel: HTMLDivElement = requiredElement<HTMLDivElement>(
        hostEl(),
        '.ui-lib-colorpicker__panel'
      );
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(component.panelVisible()).toBeFalsy();
      expect(document.activeElement).toBe(triggerEl());
    });

    it('does not close when clicking inside panel', (): void => {
      openPanel();

      const panel: HTMLDivElement = requiredElement<HTMLDivElement>(
        hostEl(),
        '.ui-lib-colorpicker__panel'
      );
      panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(component.panelVisible()).toBeTruthy();
    });
  });

  describe('color selection', (): void => {
    beforeEach((): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      mockRect(colorAreaEl(), 0, 0, 100, 100);
      mockRect(hueEl(), 0, 0, 20, 100);
    });

    it('updates saturation/brightness on color area mousedown', (): void => {
      colorAreaEl().dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 80, clientY: 25 })
      );
      fixture.detectChanges();

      expect(component.saturation()).toBe(80);
      expect(component.brightness()).toBe(75);
    });

    it('updates hue on hue slider mousedown', (): void => {
      hueEl().dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 10, clientY: 50 })
      );
      fixture.detectChanges();

      expect(component.hue()).toBe(180);
    });

    it('emits hex formatted onChange payload', (): void => {
      fixture.componentRef.setInput('format', 'hex');
      fixture.detectChanges();
      const emitSpy: jest.SpyInstance = jest.spyOn(component.onChange, 'emit');

      hueEl().dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 0 }));
      fixture.detectChanges();

      const calls: ChangeEventPayload[][] = emitSpy.mock.calls as ChangeEventPayload[][];
      const value: ColorPickerValue | undefined = calls[0]?.[0]?.value;
      expect(typeof value).toBe('string');
    });

    it('emits rgb formatted onChange payload', (): void => {
      fixture.componentRef.setInput('format', 'rgb');
      fixture.detectChanges();
      const emitSpy: jest.SpyInstance = jest.spyOn(component.onChange, 'emit');

      hueEl().dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 33 }));
      fixture.detectChanges();

      const calls: ChangeEventPayload[][] = emitSpy.mock.calls as ChangeEventPayload[][];
      const value: ColorPickerValue | undefined = calls[0]?.[0]?.value;
      expect(typeof value).toBe('object');
      expect(value).toBeTruthy();
      const rgbValue: Record<string, unknown> = value as unknown as Record<string, unknown>;
      expect(typeof rgbValue['r']).toBe('number');
      expect(typeof rgbValue['g']).toBe('number');
      expect(typeof rgbValue['b']).toBe('number');
    });

    it('emits hsb formatted onChange payload', (): void => {
      fixture.componentRef.setInput('format', 'hsb');
      fixture.detectChanges();
      const emitSpy: jest.SpyInstance = jest.spyOn(component.onChange, 'emit');

      hueEl().dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 20 }));
      fixture.detectChanges();

      const calls: ChangeEventPayload[][] = emitSpy.mock.calls as ChangeEventPayload[][];
      const value: ColorPickerValue | undefined = calls[0]?.[0]?.value;
      expect(typeof value).toBe('object');
      expect(value).toBeTruthy();
      const hsbValue: Record<string, unknown> = value as unknown as Record<string, unknown>;
      expect(typeof hsbValue['h']).toBe('number');
      expect(typeof hsbValue['s']).toBe('number');
      expect(typeof hsbValue['b']).toBe('number');
    });

    it('maps color-area top-left to white', (): void => {
      fixture.componentRef.setInput('format', 'hex');
      fixture.detectChanges();

      colorAreaEl().dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 0 })
      );
      fixture.detectChanges();

      expect(component.displayColor()).toBe('#ffffff');
    });

    it('maps color-area bottom-right to black', (): void => {
      fixture.componentRef.setInput('format', 'hex');
      fixture.detectChanges();

      colorAreaEl().dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 100, clientY: 100 })
      );
      fixture.detectChanges();

      expect(component.displayColor()).toBe('#000000');
    });
  });

  describe('ControlValueAccessor', (): void => {
    it('writeValue with hex updates display', (): void => {
      component.writeValue('00ff00');
      fixture.detectChanges();
      expect(component.displayColor()).toBe('#00ff00');
    });

    it('writeValue with rgb updates display', (): void => {
      const value: RgbColor = { r: 0, g: 0, b: 255 };
      component.writeValue(value);
      fixture.detectChanges();
      expect(component.displayColor()).toBe('#0000ff');
    });

    it('writeValue with hsb updates display', (): void => {
      const value: HsbColor = { h: 120, s: 100, b: 100 };
      component.writeValue(value);
      fixture.detectChanges();
      expect(component.displayColor()).toBe('#00ff00');
    });

    it('writeValue(null) resets to defaults', (): void => {
      component.writeValue('000000');
      component.writeValue(null);
      fixture.detectChanges();

      expect(component.hue()).toBe(0);
      expect(component.saturation()).toBe(100);
      expect(component.brightness()).toBe(100);
      expect(component.displayColor()).toBe('#ff0000');
    });
  });

  describe('keyboard', (): void => {
    it('trigger is tabbable', (): void => {
      expect(triggerEl().getAttribute('tabindex')).toBe('0');
      triggerEl().focus();
      expect(document.activeElement).toBe(triggerEl());
    });

    it('opens panel with Space/Enter on trigger', (): void => {
      triggerEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(component.panelVisible()).toBeTruthy();

      triggerEl().dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      expect(component.panelVisible()).toBeTruthy();
    });

    it('updates saturation/brightness with arrows on color area', (): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      const area: HTMLDivElement = colorAreaEl();
      const beforeSaturation: number = component.saturation();
      const beforeBrightness: number = component.brightness();

      area.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      area.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();

      expect(component.saturation()).toBe(beforeSaturation - 1);
      expect(component.brightness()).toBe(beforeBrightness - 1);
    });

    it('updates hue with arrow keys on hue slider', (): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      const hueControl: HTMLDivElement = hueEl();
      const beforeHue: number = component.hue();

      hueControl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(component.hue()).toBe(beforeHue + 1);

      hueControl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(component.hue()).toBe(beforeHue);
    });
  });

  describe('disabled state', (): void => {
    it('prevents trigger click when disabled', (): void => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      triggerEl().click();
      fixture.detectChanges();

      expect(component.panelVisible()).toBeFalsy();
      expect(hostEl().classList.contains('ui-lib-colorpicker--disabled')).toBeTruthy();
    });

    it('blocks keyboard interaction when disabled', (): void => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      triggerEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();

      expect(component.panelVisible()).toBeFalsy();
    });
  });

  describe('edge cases', (): void => {
    it('cleans drag listeners on destroy', (): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.detectChanges();

      mockRect(colorAreaEl(), 0, 0, 100, 100);

      const addSpy: jest.SpyInstance = jest.spyOn(document, 'addEventListener');
      const removeSpy: jest.SpyInstance = jest.spyOn(document, 'removeEventListener');

      colorAreaEl().dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 30, clientY: 30 })
      );
      fixture.detectChanges();
      expect(addSpy).toHaveBeenCalled();

      fixture.destroy();
      expect(removeSpy).toHaveBeenCalled();

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });

    it('handles rapid open/close toggling without state corruption', (): void => {
      for (let index: number = 0; index < 5; index += 1) {
        triggerEl().click();
        fixture.detectChanges();
      }

      expect(component.panelVisible()).toBeTruthy();

      triggerEl().click();
      fixture.detectChanges();
      expect(component.panelVisible()).toBeFalsy();
    });

    it('updates selector position when value changes while panel is open', (): void => {
      openPanel();

      component.writeValue({ h: 120, s: 25, b: 40 });
      fixture.detectChanges();

      expect(selectorEl().style.left).toBe('25%');
      expect(selectorEl().style.top).toBe('60%');
    });

    it('emits new format after format change on next interaction', (): void => {
      fixture.componentRef.setInput('inline', true);
      fixture.componentRef.setInput('format', 'rgb');
      fixture.detectChanges();

      mockRect(hueEl(), 0, 0, 20, 100);

      const emitSpy: jest.SpyInstance = jest.spyOn(component.onChange, 'emit');
      hueEl().dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 10 }));
      fixture.detectChanges();
      const callsAfterRgb: ChangeEventPayload[][] = emitSpy.mock.calls as ChangeEventPayload[][];
      const rgbValue: ColorPickerValue | undefined = callsAfterRgb[0]?.[0]?.value;
      expect(typeof rgbValue).toBe('object');
      expect(rgbValue).toBeTruthy();
      const rgbRecord: Record<string, unknown> = rgbValue as unknown as Record<string, unknown>;
      expect(typeof rgbRecord['r']).toBe('number');
      expect(typeof rgbRecord['g']).toBe('number');
      expect(typeof rgbRecord['b']).toBe('number');

      fixture.componentRef.setInput('format', 'hsb');
      fixture.detectChanges();

      hueEl().dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 20 }));
      fixture.detectChanges();
      const callsAfterHsb: ChangeEventPayload[][] = emitSpy.mock.calls as ChangeEventPayload[][];
      const hsbValue: ColorPickerValue | undefined = callsAfterHsb[1]?.[0]?.value;
      expect(typeof hsbValue).toBe('object');
      expect(hsbValue).toBeTruthy();
      const hsbRecord: Record<string, unknown> = hsbValue as unknown as Record<string, unknown>;
      expect(typeof hsbRecord['h']).toBe('number');
      expect(typeof hsbRecord['s']).toBe('number');
      expect(typeof hsbRecord['b']).toBe('number');
    });
  });
});

describe('ColorPicker forms integration', (): void => {
  describe('reactive forms', (): void => {
    let fixture: ComponentFixture<ReactiveHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ReactiveHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
    });

    function pickerComponent(): ColorPicker {
      const debugElement: DebugElement = fixture.debugElement.query(By.directive(ColorPicker));
      return debugElement.componentInstance as ColorPicker;
    }

    function pickerElement(): HTMLElement {
      return fixture.debugElement.query(By.css('ui-lib-color-picker')).nativeElement as HTMLElement;
    }

    function triggerEl(): HTMLButtonElement {
      return requiredElement<HTMLButtonElement>(pickerElement(), '.ui-lib-colorpicker__trigger');
    }

    function colorAreaEl(): HTMLDivElement {
      return requiredElement<HTMLDivElement>(pickerElement(), '.ui-lib-colorpicker__color-area');
    }

    it('formControlName binding works for write and read', (): void => {
      fixture.componentInstance.form.controls.color.setValue('00ff00');
      fixture.detectChanges();

      expect(pickerComponent().displayColor()).toBe('#00ff00');
    });

    it('reflects disabled state from form control', (): void => {
      fixture.componentInstance.form.controls.color.disable();
      fixture.detectChanges();

      expect(triggerEl().disabled).toBeTruthy();
      triggerEl().click();
      fixture.detectChanges();
      expect(pickerComponent().panelVisible()).toBeFalsy();
    });

    it('marks touched on popup close', (): void => {
      const control: FormControl<ColorPickerValue> = fixture.componentInstance.form.controls.color;

      triggerEl().click();
      fixture.detectChanges();
      triggerEl().click();
      fixture.detectChanges();

      expect(control.touched).toBeTruthy();
    });

    it('marks dirty after first color change', (): void => {
      fixture.componentInstance.inline = true;
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      if (!pickerElement().querySelector('.ui-lib-colorpicker__color-area')) {
        triggerEl().click();
        fixture.detectChanges();
      }

      mockRect(colorAreaEl(), 0, 0, 100, 100);
      colorAreaEl().dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 60, clientY: 40 })
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.form.controls.color.dirty).toBeTruthy();
    });
  });

  describe('template-driven forms', (): void => {
    let fixture: ComponentFixture<NgModelHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [NgModelHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
    });

    function pickerElement(): HTMLElement {
      return fixture.debugElement.query(By.css('ui-lib-color-picker')).nativeElement as HTMLElement;
    }

    function pickerComponent(): ColorPicker {
      return fixture.debugElement.query(By.directive(ColorPicker)).componentInstance as ColorPicker;
    }

    function triggerEl(): HTMLButtonElement {
      return requiredElement<HTMLButtonElement>(pickerElement(), '.ui-lib-colorpicker__trigger');
    }

    function hueEl(): HTMLDivElement {
      return requiredElement<HTMLDivElement>(pickerElement(), '.ui-lib-colorpicker__hue');
    }

    it('supports ngModel two-way binding', async (): Promise<void> => {
      fixture.componentInstance.value = '0000ff';
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(pickerComponent().displayColor()).toBe('#0000ff');

      triggerEl().click();
      fixture.detectChanges();

      mockRect(hueEl(), 0, 0, 20, 100);
      hueEl().dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 0 }));
      fixture.detectChanges();

      expect(fixture.componentInstance.value).toBeTruthy();
    });
  });
});
