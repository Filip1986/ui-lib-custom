import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitch } from './toggle-switch';
import type {
  ToggleSwitchChangeEvent,
  ToggleSwitchSize,
  ToggleSwitchVariant,
} from './toggle-switch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ToggleSwitch, FormsModule, ReactiveFormsModule],
  template: `
    <ui-lib-toggle-switch
      [label]="label()"
      [ariaLabel]="ariaLabel()"
      [inputId]="inputId()"
      [name]="name()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [tabindex]="tabindex()"
      [size]="size()"
      [variant]="variant()"
      [autofocus]="autofocus()"
      [styleClass]="styleClass()"
      (change)="handleChange($event)"
      (focus)="handleFocus($event)"
      (blur)="handleBlur($event)"
      [(checked)]="checked"
    />
  `,
})
class HostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Enable feature');
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly inputId: WritableSignal<string | null> = signal<string | null>(null);
  public readonly name: WritableSignal<string | null> = signal<string | null>(null);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tabindex: WritableSignal<number> = signal<number>(0);
  public readonly size: WritableSignal<ToggleSwitchSize> = signal<ToggleSwitchSize>('md');
  public readonly variant: WritableSignal<ToggleSwitchVariant> =
    signal<ToggleSwitchVariant>('material');
  public readonly autofocus: WritableSignal<boolean> = signal<boolean>(false);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public checked: boolean = false;

  public readonly lastChangeEvent: WritableSignal<ToggleSwitchChangeEvent | null> =
    signal<ToggleSwitchChangeEvent | null>(null);
  public readonly lastFocusEvent: WritableSignal<FocusEvent | null> = signal<FocusEvent | null>(
    null
  );
  public readonly lastBlurEvent: WritableSignal<FocusEvent | null> = signal<FocusEvent | null>(
    null
  );

  public handleChange(event: ToggleSwitchChangeEvent): void {
    this.lastChangeEvent.set(event);
  }

  public handleFocus(event: FocusEvent): void {
    this.lastFocusEvent.set(event);
  }

  public handleBlur(event: FocusEvent): void {
    this.lastBlurEvent.set(event);
  }
}

describe('ToggleSwitch', (): void => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function rootEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function switchEl(): HTMLElement {
    return rootEl().querySelector('ui-lib-toggle-switch') as HTMLElement;
  }

  function nativeInputEl(): HTMLInputElement {
    return rootEl().querySelector('.ui-lib-toggle-switch__native-input') as HTMLInputElement;
  }

  function trackEl(): HTMLElement {
    return rootEl().querySelector('.ui-lib-toggle-switch__track') as HTMLElement;
  }

  function thumbEl(): HTMLElement {
    return rootEl().querySelector('.ui-lib-toggle-switch__thumb') as HTMLElement;
  }

  function labelEl(): HTMLLabelElement | null {
    return rootEl().querySelector<HTMLLabelElement>('.ui-lib-toggle-switch__label');
  }

  // ── Rendering ─────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should render the host element', (): void => {
      expect(switchEl()).toBeTruthy();
    });

    it('should render the track element', (): void => {
      expect(trackEl()).toBeTruthy();
    });

    it('should render the thumb element inside the track', (): void => {
      expect(thumbEl()).toBeTruthy();
    });

    it('should render the native input with role="switch"', (): void => {
      expect(nativeInputEl().getAttribute('role')).toBe('switch');
    });

    it('should render the label element when label input is provided', (): void => {
      const label: HTMLLabelElement | null = labelEl();
      expect(label).toBeTruthy();
      const labelText: string = String((label as HTMLLabelElement).textContent).trim();
      expect(labelText).toBe('Enable feature');
    });

    it('should not render a label element when label is null', (): void => {
      fixture.componentInstance.label.set(null);
      fixture.detectChanges();

      expect(labelEl()).toBeNull();
    });

    it('should link the label for attribute to the native input id', (): void => {
      const inputId: string = nativeInputEl().id;
      expect(labelEl()?.htmlFor).toBe(inputId);
    });
  });

  // ── Host BEM classes ──────────────────────────────────────────────────

  describe('host classes', (): void => {
    it('should always have the base class', (): void => {
      expect(switchEl().classList.contains('ui-lib-toggle-switch')).toBe(true);
    });

    it('should include the variant class', (): void => {
      expect(switchEl().classList.contains('ui-lib-toggle-switch--variant-material')).toBe(true);
    });

    it('should include the size class', (): void => {
      expect(switchEl().classList.contains('ui-lib-toggle-switch--size-md')).toBe(true);
    });

    it('should add --checked class when checked', async (): Promise<void> => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(switchEl().classList.contains('ui-lib-toggle-switch--checked')).toBe(true);
    });

    it('should add --disabled class when disabled', (): void => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      expect(switchEl().classList.contains('ui-lib-toggle-switch--disabled')).toBe(true);
    });

    it('should add --readonly class when readonly', (): void => {
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      expect(switchEl().classList.contains('ui-lib-toggle-switch--readonly')).toBe(true);
    });

    it('should apply variant class when set to bootstrap', (): void => {
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();

      expect(switchEl().classList.contains('ui-lib-toggle-switch--variant-bootstrap')).toBe(true);
    });

    it('should apply size class for sm', (): void => {
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();

      expect(switchEl().classList.contains('ui-lib-toggle-switch--size-sm')).toBe(true);
    });

    it('should apply the styleClass input value', (): void => {
      fixture.componentInstance.styleClass.set('my-custom-class');
      fixture.detectChanges();

      expect(switchEl().classList.contains('my-custom-class')).toBe(true);
    });
  });

  // ── Toggle behavior ───────────────────────────────────────────────────

  describe('toggle behavior', (): void => {
    it('should toggle checked state on native input click', async (): Promise<void> => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.checked).toBe(true);
    });

    it('should not toggle when disabled', async (): Promise<void> => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.checked).toBe(false);
    });

    it('should not toggle when readonly', async (): Promise<void> => {
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.checked).toBe(false);
    });

    it('should emit change event with correct payload on toggle', async (): Promise<void> => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      const emittedEvent: ToggleSwitchChangeEvent | null =
        fixture.componentInstance.lastChangeEvent();
      expect(emittedEvent).not.toBeNull();
      expect(emittedEvent?.checked).toBe(true);
    });
  });

  // ── ARIA ──────────────────────────────────────────────────────────────

  describe('ARIA attributes', (): void => {
    it('should have role="switch" on native input', (): void => {
      expect(nativeInputEl().getAttribute('role')).toBe('switch');
    });

    it('should set aria-checked to false by default', (): void => {
      expect(nativeInputEl().getAttribute('aria-checked')).toBe('false');
    });

    it('should set aria-checked to true when checked', async (): Promise<void> => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(nativeInputEl().getAttribute('aria-checked')).toBe('true');
    });

    it('should set aria-label when ariaLabel input is provided', (): void => {
      fixture.componentInstance.ariaLabel.set('Toggle notifications');
      fixture.detectChanges();

      expect(nativeInputEl().getAttribute('aria-label')).toBe('Toggle notifications');
    });

    it('should set aria-labelledby to the label element id when label is provided', (): void => {
      const labelledbyAttr: string | null = nativeInputEl().getAttribute('aria-labelledby');
      expect(labelledbyAttr).toBeTruthy();
      expect(labelledbyAttr).toContain('label');
    });

    it('should not set aria-labelledby when ariaLabel is provided', (): void => {
      fixture.componentInstance.ariaLabel.set('Direct label');
      fixture.detectChanges();

      expect(nativeInputEl().getAttribute('aria-labelledby')).toBeNull();
    });
  });

  // ── Disabled state ────────────────────────────────────────────────────

  describe('disabled state', (): void => {
    it('should set disabled attribute on native input when disabled', (): void => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      expect(nativeInputEl().disabled).toBe(true);
    });

    it('should set tabindex to -1 when disabled', (): void => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      expect(nativeInputEl().getAttribute('tabindex')).toBe('-1');
    });
  });

  // ── CVA (ControlValueAccessor) ────────────────────────────────────────

  describe('ControlValueAccessor', (): void => {
    it('should work with ngModel via FormsModule', async (): Promise<void> => {
      @Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [ToggleSwitch, FormsModule],
        template: `<ui-lib-toggle-switch [(ngModel)]="value" />`,
      })
      class NgModelHost {
        public value: boolean = false;
      }

      const ngModelFixture: ComponentFixture<NgModelHost> = TestBed.createComponent(NgModelHost);
      ngModelFixture.detectChanges();
      await ngModelFixture.whenStable();

      const input: HTMLInputElement = (ngModelFixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-toggle-switch__native-input'
      ) as HTMLInputElement;

      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      ngModelFixture.detectChanges();
      await ngModelFixture.whenStable();

      expect(ngModelFixture.componentInstance.value).toBe(true);
    });

    it('should work with reactive FormControl', async (): Promise<void> => {
      @Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [ToggleSwitch, ReactiveFormsModule],
        template: `<ui-lib-toggle-switch [formControl]="control" />`,
      })
      class ReactiveHost {
        public readonly control: FormControl<boolean> = new FormControl<boolean>(false, {
          nonNullable: true,
        });
      }

      const reactiveFixture: ComponentFixture<ReactiveHost> = TestBed.createComponent(ReactiveHost);
      reactiveFixture.detectChanges();
      await reactiveFixture.whenStable();

      const input: HTMLInputElement = (reactiveFixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-toggle-switch__native-input'
      ) as HTMLInputElement;

      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      reactiveFixture.detectChanges();
      await reactiveFixture.whenStable();

      expect(reactiveFixture.componentInstance.control.value).toBe(true);
    });

    it('should disable via setDisabledState', async (): Promise<void> => {
      @Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [ToggleSwitch, ReactiveFormsModule],
        template: `<ui-lib-toggle-switch [formControl]="control" />`,
      })
      class DisabledHost {
        public readonly control: FormControl<boolean> = new FormControl<boolean>(
          { value: false, disabled: true },
          { nonNullable: true }
        );
      }

      const disabledFixture: ComponentFixture<DisabledHost> = TestBed.createComponent(DisabledHost);
      disabledFixture.detectChanges();
      await disabledFixture.whenStable();

      const hostEl: HTMLElement = (disabledFixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-toggle-switch'
      ) as HTMLElement;

      expect(hostEl.classList.contains('ui-lib-toggle-switch--disabled')).toBe(true);
    });
  });

  // ── Focus / Blur outputs ──────────────────────────────────────────────

  describe('focus and blur outputs', (): void => {
    it('should emit focus event when native input is focused', (): void => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.lastFocusEvent()).not.toBeNull();
    });

    it('should emit blur event when native input is blurred', (): void => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.lastBlurEvent()).not.toBeNull();
    });
  });

  // ── Keyboard interaction ──────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('should toggle on Space keydown', async (): Promise<void> => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.checked).toBe(true);
    });

    it('should not toggle on other keys', async (): Promise<void> => {
      const input: HTMLInputElement = nativeInputEl();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.checked).toBe(false);
    });
  });

  // ── Custom inputId ────────────────────────────────────────────────────

  describe('inputId', (): void => {
    it('should use provided inputId on the native input', (): void => {
      fixture.componentInstance.inputId.set('my-switch');
      fixture.detectChanges();

      expect(nativeInputEl().id).toBe('my-switch');
    });

    it('should generate a unique id when inputId is not provided', (): void => {
      const id: string = nativeInputEl().id;
      expect(id).toMatch(/^ui-lib-toggle-switch-\d+-input$/);
    });
  });
});
