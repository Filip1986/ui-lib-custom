import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KnobComponent } from './knob.component';
import type { KnobChangeEvent } from './knob.types';

// ---------------------------------------------------------------------------
// Typed DOM helpers
// ---------------------------------------------------------------------------

function queryEl<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}

function getDebugEl(fixture: ComponentFixture<unknown>, selector: string): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

// ---------------------------------------------------------------------------
// Host — ngModel
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <uilib-knob
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [size]="size()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [showValue]="showValue()"
      [strokeWidth]="strokeWidth()"
      [valueTemplate]="valueTemplate()"
      [ariaLabel]="ariaLabel()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      (onChange)="onChangeEvent($event)"
    />
  `,
})
class KnobNgModelHostComponent {
  public readonly min: WritableSignal<number> = signal<number>(0);
  public readonly max: WritableSignal<number> = signal<number>(100);
  public readonly step: WritableSignal<number> = signal<number>(1);
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showValue: WritableSignal<boolean> = signal<boolean>(true);
  public readonly strokeWidth: WritableSignal<number> = signal<number>(14);
  public readonly valueTemplate: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined
  );
  public value: number = 0;
  public readonly changeEvents: KnobChangeEvent[] = [];

  public onChangeEvent(event: KnobChangeEvent): void {
    this.changeEvents.push(event);
  }
}

// ---------------------------------------------------------------------------
// Host — Reactive forms
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, KnobComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <uilib-knob formControlName="value" [min]="0" [max]="100" />
    </form>
  `,
})
class KnobReactiveHostComponent {
  public readonly form: FormGroup = new FormGroup({
    value: new FormControl<number>(25),
  });
}

// ---------------------------------------------------------------------------
// Helper: configure TestBed for knob tests
// ---------------------------------------------------------------------------

async function createNgModelFixture(
  initialValue: number = 0
): Promise<ComponentFixture<KnobNgModelHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [KnobNgModelHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<KnobNgModelHostComponent> =
    TestBed.createComponent(KnobNgModelHostComponent);
  fixture.componentInstance.value = initialValue;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('KnobComponent', (): void => {
  // ---- Rendering ----------------------------------------------------------

  describe('Rendering', (): void => {
    it('should create the component', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      const debugElement: DebugElement = getDebugEl(fixture, 'uilib-knob');
      expect(debugElement).toBeTruthy();
    });

    it('should render the SVG element', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg).toBeTruthy();
    });

    it('should render the track path', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      const track: SVGPathElement = queryEl<SVGPathElement>(fixture, '.uilib-knob-track');
      expect(track.getAttribute('d')).toBeTruthy();
    });

    it('should render the value label by default', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const label: SVGTextElement = queryEl<SVGTextElement>(fixture, '.uilib-knob-value-label');
      expect(label.textContent!.trim()).toBe('50');
    });

    it('should hide the value label when showValue is false', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.showValue.set(false);
      fixture.detectChanges();
      const label: SVGTextElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<SVGTextElement>('.uilib-knob-value-label');
      expect(label).toBeNull();
    });

    it('should not render range path when value is at minimum', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(0);
      const range: SVGPathElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<SVGPathElement>('.uilib-knob-range');
      expect(range).toBeNull();
    });

    it('should render range path when value is above minimum', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const range: SVGPathElement = queryEl<SVGPathElement>(fixture, '.uilib-knob-range');
      expect(range).toBeTruthy();
    });

    it('should apply valueTemplate to the label', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(42);
      fixture.componentInstance.valueTemplate.set('{value}%');
      fixture.detectChanges();
      const label: SVGTextElement = queryEl<SVGTextElement>(fixture, '.uilib-knob-value-label');
      expect(label.textContent!.trim()).toBe('42%');
    });
  });

  // ---- Size classes -------------------------------------------------------

  describe('Size classes', (): void => {
    it('should apply uilib-knob-md by default', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      const host: HTMLElement = queryEl(fixture, 'uilib-knob');
      expect(host.classList).toContain('uilib-knob-md');
    });

    it('should apply uilib-knob-sm when size is sm', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-knob');
      expect(host.classList).toContain('uilib-knob-sm');
    });

    it('should apply uilib-knob-lg when size is lg', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-knob');
      expect(host.classList).toContain('uilib-knob-lg');
    });
  });

  // ---- Disabled state -----------------------------------------------------

  describe('Disabled state', (): void => {
    it('should apply uilib-knob-disabled class when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'uilib-knob');
      expect(host.classList).toContain('uilib-knob-disabled');
    });

    it('should set aria-disabled when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-disabled')).toBe('true');
    });

    it('should remove aria-disabled when not disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-disabled')).toBeNull();
    });

    it('should set tabindex to -1 when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ---- ARIA attributes ----------------------------------------------------

  describe('ARIA attributes', (): void => {
    it('should set role="slider" on the SVG', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('role')).toBe('slider');
    });

    it('should set aria-valuemin and aria-valuemax', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.min.set(10);
      fixture.componentInstance.max.set(90);
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-valuemin')).toBe('10');
      expect(svg.getAttribute('aria-valuemax')).toBe('90');
    });

    it('should set aria-valuenow to the current value', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(75);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-valuenow')).toBe('75');
    });

    it('should set aria-label when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture();
      fixture.componentInstance.ariaLabel.set('Volume');
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-label')).toBe('Volume');
    });
  });

  // ---- Keyboard interaction -----------------------------------------------

  describe('Keyboard interaction', (): void => {
    it('should increase value on ArrowUp', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(51);
    });

    it('should decrease value on ArrowDown', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(49);
    });

    it('should increase value on ArrowRight', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(51);
    });

    it('should decrease value on ArrowLeft', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(49);
    });

    it('should set value to min on Home', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(0);
    });

    it('should set value to max on End', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(100);
    });

    it('should not exceed max on ArrowUp at max', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(100);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(100);
    });

    it('should not go below min on ArrowDown at min', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(0);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(0);
    });

    it('should not respond to keyboard when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(50);
    });

    it('should not respond to keyboard when readonly', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(50);
    });

    it('should respect step on PageUp', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      fixture.componentInstance.step.set(5);
      fixture.detectChanges();
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(100);
    });
  });

  // ---- onChange output -----------------------------------------------------

  describe('onChange output', (): void => {
    it('should emit onChange when value changes via keyboard', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(50);
      fixture.componentInstance.changeEvents.length = 0;
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.changeEvents).toHaveLength(1);
      expect(fixture.componentInstance.changeEvents[0]?.value).toBe(51);
    });
  });

  // ---- CVA (ngModel) ------------------------------------------------------

  describe('CVA — ngModel', (): void => {
    it('should reflect written value from ngModel', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(60);
      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-valuenow')).toBe('60');
    });

    it('should disable the knob via ngModel setDisabledState', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [KnobReactiveHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<KnobReactiveHostComponent> =
        TestBed.createComponent(KnobReactiveHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      fixture.componentInstance.form.get('value')?.disable();
      fixture.detectChanges();

      const host: HTMLElement = queryEl(fixture, 'uilib-knob');
      expect(host.classList).toContain('uilib-knob-disabled');
    });
  });

  // ---- CVA (reactive forms) -----------------------------------------------

  describe('CVA — reactive forms', (): void => {
    it('should initialise with form control value', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [KnobReactiveHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<KnobReactiveHostComponent> =
        TestBed.createComponent(KnobReactiveHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      expect(svg.getAttribute('aria-valuenow')).toBe('25');
    });
  });

  // ---- Step clamping -------------------------------------------------------

  describe('Step and clamping', (): void => {
    it('should snap to step boundary', async (): Promise<void> => {
      const fixture: ComponentFixture<KnobNgModelHostComponent> = await createNgModelFixture(10);
      fixture.componentInstance.step.set(5);
      fixture.detectChanges();

      const svg: SVGElement = queryEl<SVGElement>(fixture, '.uilib-knob-svg');
      // ArrowUp should step by 5
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe(15);
    });
  });
});
