import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  type WritableSignal,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { ToggleButton } from './toggle-button';
import type {
  ToggleButtonChangeEvent,
  ToggleButtonIconPos,
  ToggleButtonSize,
  ToggleButtonVariant,
} from './toggle-button.types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    '.ui-lib-toggle-button__inner'
  )!;
}

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('ui-lib-toggle-button')!;
}

function getLabelText(fixture: ComponentFixture<unknown>): string {
  const element: HTMLElement | null = (
    fixture.nativeElement as HTMLElement
  ).querySelector<HTMLElement>('.ui-lib-toggle-button__label');
  return element ? element.textContent!.trim() : '';
}

// ── Host components ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `
    <ui-lib-toggle-button
      [onLabel]="onLabel"
      [offLabel]="offLabel"
      [checked]="checked()"
      (checkedChange)="checked.set($event)"
      [disabled]="disabled"
      [size]="size"
      [variant]="variant"
      [iconPos]="iconPos"
      [allowEmpty]="allowEmpty"
      (change)="onChangeEvent($event)"
      (focus)="focusCalled = true"
      (blur)="blurCalled = true"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class TestHostComponent {
  public onLabel: string = 'On';
  public offLabel: string = 'Off';
  public checked: WritableSignal<boolean> = signal<boolean>(false);
  public disabled: boolean = false;
  public size: ToggleButtonSize = 'md';
  public variant: ToggleButtonVariant | null = 'material';
  public iconPos: ToggleButtonIconPos = 'left';
  public allowEmpty: boolean = true;
  public lastChangeEvent: ToggleButtonChangeEvent | null = null;
  public focusCalled: boolean = false;
  public blurCalled: boolean = false;

  public onChangeEvent(event: ToggleButtonChangeEvent): void {
    this.lastChangeEvent = event;
  }
}

@Component({
  standalone: true,
  imports: [ToggleButton, FormsModule],
  template: `<ui-lib-toggle-button [(ngModel)]="value" variant="material" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class NgModelHostComponent {
  public value: boolean = false;
}

@Component({
  standalone: true,
  imports: [ToggleButton, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ui-lib-toggle-button formControlName="toggle" variant="material" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class ReactiveFormHostComponent {
  public readonly form: FormGroup = new FormGroup({
    toggle: new FormControl<boolean>(false),
  });
}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `
    <ui-lib-toggle-button
      [checked]="true"
      [allowEmpty]="false"
      variant="material"
      onLabel="On"
      offLabel="Off"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class AllowEmptyFalseHostComponent {}

@Component({
  standalone: true,
  imports: [ToggleButton],
  template: `<ui-lib-toggle-button ariaLabel="Notifications" variant="material" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class AriaLabelHostComponent {}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ToggleButton', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        NgModelHostComponent,
        ReactiveFormHostComponent,
        AllowEmptyFalseHostComponent,
        AriaLabelHostComponent,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ── Rendering ────────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should create the component', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render the off label by default', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getLabelText(fixture)).toBe('Off');
    });

    it('should render the on label when checked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.checked.set(true);
      fixture.detectChanges();
      expect(getLabelText(fixture)).toBe('On');
    });

    it('should render a button with role=switch', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('role')).toBe('switch');
    });

    it('should set aria-checked=false when unchecked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('aria-checked')).toBe('false');
    });

    it('should set aria-checked=true when checked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.checked.set(true);
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('aria-checked')).toBe('true');
    });

    it('should apply the base host class', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button')).toBe(true);
    });

    it('should apply checked host class when checked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.checked.set(true);
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });

    it('should not apply checked host class when unchecked', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(false);
    });

    it('should apply disabled host class when disabled', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--disabled')).toBe(true);
    });
  });

  // ── Size variants ────────────────────────────────────────────────────────

  describe('size variants', (): void => {
    const sizes: ToggleButtonSize[] = ['sm', 'md', 'lg'];
    for (const sizeValue of sizes) {
      it(`should apply size class for size=${sizeValue}`, (): void => {
        const fixture: ComponentFixture<TestHostComponent> =
          TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.size = sizeValue;
        fixture.detectChanges();
        expect(getHost(fixture).classList.contains(`ui-lib-toggle-button--size-${sizeValue}`)).toBe(
          true
        );
      });
    }
  });

  // ── Design variants ──────────────────────────────────────────────────────

  describe('design variants', (): void => {
    const variants: ToggleButtonVariant[] = ['material', 'bootstrap', 'minimal'];
    for (const variantValue of variants) {
      it(`should apply variant class for variant=${variantValue}`, (): void => {
        const fixture: ComponentFixture<TestHostComponent> =
          TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.variant = variantValue;
        fixture.detectChanges();
        expect(
          getHost(fixture).classList.contains(`ui-lib-toggle-button--variant-${variantValue}`)
        ).toBe(true);
      });
    }
  });

  // ── Interaction ──────────────────────────────────────────────────────────

  describe('interaction', (): void => {
    it('should toggle checked state to true on first click', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });

    it('should toggle checked state back to false on second click', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.checked.set(true);
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(false);
    });

    it('should emit change event with checked=true on first toggle', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.lastChangeEvent).not.toBeNull();
      expect(fixture.componentInstance.lastChangeEvent?.checked).toBe(true);
    });

    it('should emit change event with checked=false on second toggle', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.checked.set(true);
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.lastChangeEvent?.checked).toBe(false);
    });

    it('should not toggle when disabled', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.checked()).toBe(false);
    });

    it('should emit focus event on focus', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(fixture.componentInstance.focusCalled).toBe(true);
    });

    it('should emit blur event on blur', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(fixture.componentInstance.blurCalled).toBe(true);
    });
  });

  // ── Keyboard interaction ─────────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('should toggle on Enter keydown', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });

    it('should toggle on Space keydown', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });

    it('should not toggle on other keys', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      getButton(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.checked()).toBe(false);
    });
  });

  // ── allowEmpty ───────────────────────────────────────────────────────────

  describe('allowEmpty input', (): void => {
    it('should not uncheck when allowEmpty=false and button is already checked', (): void => {
      const fixture: ComponentFixture<AllowEmptyFalseHostComponent> = TestBed.createComponent(
        AllowEmptyFalseHostComponent
      );
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });
  });

  // ── CVA — ngModel ────────────────────────────────────────────────────────

  describe('CVA - ngModel', (): void => {
    it('should initialize as checked when ngModel value is true', async (): Promise<void> => {
      const fixture: ComponentFixture<NgModelHostComponent> =
        TestBed.createComponent(NgModelHostComponent);
      fixture.componentInstance.value = true;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });

    it('should update ngModel on click', async (): Promise<void> => {
      const fixture: ComponentFixture<NgModelHostComponent> =
        TestBed.createComponent(NgModelHostComponent);
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.value).toBe(true);
    });
  });

  // ── CVA — reactive forms ─────────────────────────────────────────────────

  describe('CVA - reactive forms', (): void => {
    it('should reflect initial form control value of true', (): void => {
      const fixture: ComponentFixture<ReactiveFormHostComponent> =
        TestBed.createComponent(ReactiveFormHostComponent);
      fixture.componentInstance.form.controls['toggle']!.setValue(true);
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--checked')).toBe(true);
    });

    it('should update the form control value on click', (): void => {
      const fixture: ComponentFixture<ReactiveFormHostComponent> =
        TestBed.createComponent(ReactiveFormHostComponent);
      fixture.detectChanges();
      getButton(fixture).click();
      fixture.detectChanges();
      expect(fixture.componentInstance.form.controls['toggle']!.value).toBe(true);
    });

    it('should be disabled when the form control is disabled', (): void => {
      const fixture: ComponentFixture<ReactiveFormHostComponent> =
        TestBed.createComponent(ReactiveFormHostComponent);
      fixture.componentInstance.form.controls['toggle']!.disable();
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains('ui-lib-toggle-button--disabled')).toBe(true);
    });
  });

  // ── Accessibility ────────────────────────────────────────────────────────

  describe('accessibility', (): void => {
    it('should have tabindex=0 by default', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex=-1 when disabled', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('tabindex')).toBe('-1');
    });

    it('should apply aria-label when provided', (): void => {
      const fixture: ComponentFixture<AriaLabelHostComponent> =
        TestBed.createComponent(AriaLabelHostComponent);
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('aria-label')).toBe('Notifications');
    });

    it('should have type=button on the inner button', (): void => {
      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      expect(getButton(fixture).getAttribute('type')).toBe('button');
    });
  });
});
