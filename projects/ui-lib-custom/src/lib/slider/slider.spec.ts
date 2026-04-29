import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Slider } from './slider';
import type { SliderChangeEvent, SliderSlideEndEvent } from './slider.types';

// ---------------------------------------------------------------------------
// Typed DOM helpers
// ---------------------------------------------------------------------------

function queryEl<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
  if (!element) {
    throw new Error('Element not found: ' + selector);
  }
  return element;
}

function queryAll<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ---------------------------------------------------------------------------
// Host - ngModel
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-slider
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [size]="size()"
      [range]="range()"
      [orientation]="orientation()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [animate]="animate()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      (onChange)="onChangeEvent($event)"
      (onSlideEnd)="onSlideEndEvent($event)"
    />
  `,
})
class SliderNgModelHostComponent {
  public readonly min: WritableSignal<number> = signal<number>(0);
  public readonly max: WritableSignal<number> = signal<number>(100);
  public readonly step: WritableSignal<number> = signal<number>(1);
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly range: WritableSignal<boolean> = signal<boolean>(false);
  public readonly orientation: WritableSignal<'horizontal' | 'vertical'> = signal<
    'horizontal' | 'vertical'
  >('horizontal');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly animate: WritableSignal<boolean> = signal<boolean>(false);
  public value: number | [number, number] = 50;
  public readonly changeEvents: SliderChangeEvent[] = [];
  public readonly slideEndEvents: SliderSlideEndEvent[] = [];

  public onChangeEvent(event: SliderChangeEvent): void {
    this.changeEvents.push(event);
  }

  public onSlideEndEvent(event: SliderSlideEndEvent): void {
    this.slideEndEvents.push(event);
  }
}

// ---------------------------------------------------------------------------
// Host - Reactive forms
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <ui-lib-slider formControlName="value" [min]="0" [max]="100" />
    </form>
  `,
})
class SliderReactiveHostComponent {
  public readonly form: FormGroup = new FormGroup({
    value: new FormControl<number>(25),
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function dispatchKeyEvent(element: HTMLElement, key: string): void {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Slider - rendering', (): void => {
  let fixture: ComponentFixture<SliderNgModelHostComponent>;
  let host: SliderNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SliderNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderNgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should have ui-lib-slider host class', (): void => {
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider')).toBe(true);
  });

  it('should apply horizontal class by default', (): void => {
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--horizontal')).toBe(true);
  });

  it('should apply vertical class when orientation is vertical', async (): Promise<void> => {
    host.orientation.set('vertical');
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--vertical')).toBe(true);
  });

  it('should render single handle in single mode', (): void => {
    const handles: HTMLElement[] = queryAll<HTMLElement>(fixture, '.ui-lib-slider__handle');
    expect(handles.length).toBe(1);
  });

  it('should render two handles in range mode', async (): Promise<void> => {
    host.range.set(true);
    host.value = [20, 80];
    fixture.detectChanges();
    await fixture.whenStable();
    const handles: HTMLElement[] = queryAll<HTMLElement>(fixture, '.ui-lib-slider__handle');
    expect(handles.length).toBe(2);
  });

  it('should apply disabled class when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--disabled')).toBe(true);
  });

  it('should apply readonly class when readonly', async (): Promise<void> => {
    host.readonly.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--readonly')).toBe(true);
  });

  it('should apply animate class when animate is true', async (): Promise<void> => {
    host.animate.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--animate')).toBe(true);
  });

  it('should apply size-sm class', async (): Promise<void> => {
    host.size.set('sm');
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--size-sm')).toBe(true);
  });

  it('should apply size-lg class', async (): Promise<void> => {
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--size-lg')).toBe(true);
  });

  it('should render the track and fill elements', (): void => {
    expect(queryEl(fixture, '.ui-lib-slider__track')).toBeTruthy();
    expect(queryEl(fixture, '.ui-lib-slider__fill')).toBeTruthy();
  });
});

describe('Slider - single mode keyboard interaction', (): void => {
  let fixture: ComponentFixture<SliderNgModelHostComponent>;
  let host: SliderNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SliderNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderNgModelHostComponent);
    host = fixture.componentInstance;
    host.value = 50;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('ArrowRight increases value by step', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents.length).toBe(1);
    expect(host.changeEvents[0]!.value).toBe(51);
  });

  it('ArrowLeft decreases value by step', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowLeft');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents.length).toBe(1);
    expect(host.changeEvents[0]!.value).toBe(49);
  });

  it('ArrowUp increases value by step', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowUp');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(51);
  });

  it('ArrowDown decreases value by step', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowDown');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(49);
  });

  it('PageUp increases value by step * 10', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'PageUp');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(60);
  });

  it('PageDown decreases value by step * 10', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'PageDown');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(40);
  });

  it('Home jumps to min', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'Home');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(0);
  });

  it('End jumps to max', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'End');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(100);
  });

  it('ArrowRight does not exceed max', async (): Promise<void> => {
    host.value = 100;
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents.length).toBe(0);
  });

  it('ArrowLeft does not go below min', async (): Promise<void> => {
    host.value = 0;
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowLeft');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents.length).toBe(0);
  });

  it('keyboard does nothing when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents.length).toBe(0);
  });

  it('keyboard does nothing when readonly', async (): Promise<void> => {
    host.readonly.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents.length).toBe(0);
  });

  it('custom step is respected', async (): Promise<void> => {
    host.step.set(10);
    host.value = 50;
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.changeEvents[0]!.value).toBe(60);
  });
});

describe('Slider - range mode keyboard interaction', (): void => {
  let fixture: ComponentFixture<SliderNgModelHostComponent>;
  let host: SliderNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SliderNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderNgModelHostComponent);
    host = fixture.componentInstance;
    host.range.set(true);
    host.value = [20, 80];
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('ArrowRight on start handle increases start value', async (): Promise<void> => {
    const startHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--start');
    dispatchKeyEvent(startHandle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    const emitted: number | [number, number] = host.changeEvents[0]!.value;
    expect(Array.isArray(emitted)).toBe(true);
    if (Array.isArray(emitted)) {
      expect(emitted[0]).toBe(21);
      expect(emitted[1]).toBe(80);
    }
  });

  it('ArrowLeft on end handle decreases end value', async (): Promise<void> => {
    const endHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--end');
    dispatchKeyEvent(endHandle, 'ArrowLeft');
    fixture.detectChanges();
    await fixture.whenStable();
    const emitted: number | [number, number] = host.changeEvents[0]!.value;
    expect(Array.isArray(emitted)).toBe(true);
    if (Array.isArray(emitted)) {
      expect(emitted[0]).toBe(20);
      expect(emitted[1]).toBe(79);
    }
  });

  it('start handle cannot exceed end handle', async (): Promise<void> => {
    host.value = [79, 80];
    fixture.detectChanges();
    await fixture.whenStable();
    const startHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--start');
    dispatchKeyEvent(startHandle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    const emitted: number | [number, number] = host.changeEvents[0]!.value;
    expect(Array.isArray(emitted)).toBe(true);
    if (Array.isArray(emitted)) {
      expect(emitted[0]).toBe(80);
    }
  });

  it('end handle cannot go below start handle', async (): Promise<void> => {
    host.value = [20, 21];
    fixture.detectChanges();
    await fixture.whenStable();
    const endHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--end');
    dispatchKeyEvent(endHandle, 'ArrowLeft');
    fixture.detectChanges();
    await fixture.whenStable();
    const emitted: number | [number, number] = host.changeEvents[0]!.value;
    expect(Array.isArray(emitted)).toBe(true);
    if (Array.isArray(emitted)) {
      expect(emitted[1]).toBe(20);
    }
  });

  it('Home on start handle jumps to min', async (): Promise<void> => {
    const startHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--start');
    dispatchKeyEvent(startHandle, 'Home');
    fixture.detectChanges();
    await fixture.whenStable();
    const emitted: number | [number, number] = host.changeEvents[0]!.value;
    expect(Array.isArray(emitted)).toBe(true);
    if (Array.isArray(emitted)) {
      expect(emitted[0]).toBe(0);
    }
  });

  it('End on end handle jumps to max', async (): Promise<void> => {
    const endHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--end');
    dispatchKeyEvent(endHandle, 'End');
    fixture.detectChanges();
    await fixture.whenStable();
    const emitted: number | [number, number] = host.changeEvents[0]!.value;
    expect(Array.isArray(emitted)).toBe(true);
    if (Array.isArray(emitted)) {
      expect(emitted[1]).toBe(100);
    }
  });
});

describe('Slider - accessibility', (): void => {
  let fixture: ComponentFixture<SliderNgModelHostComponent>;
  let host: SliderNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SliderNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderNgModelHostComponent);
    host = fixture.componentInstance;
    host.value = 40;
    fixture.detectChanges();
    await fixture.whenStable();
    // Second cycle required: ngModel writeValue(40) is called in first pass but
    // the slider's signal-driven template re-renders on the subsequent cycle.
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('handle has role=slider', (): void => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('role')).toBe('slider');
  });

  it('handle has aria-valuemin attribute', (): void => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-valuemin')).toBe('0');
  });

  it('handle has aria-valuemax attribute', (): void => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-valuemax')).toBe('100');
  });

  it('handle has aria-valuenow matching current value', (): void => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-valuenow')).toBe('40');
  });

  it('handle has aria-orientation=horizontal by default', (): void => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('handle has aria-orientation=vertical when vertical', async (): Promise<void> => {
    host.orientation.set('vertical');
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('handle tabindex is -1 when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('tabindex')).toBe('-1');
  });

  it('range handles have fallback aria-labels', async (): Promise<void> => {
    host.range.set(true);
    host.value = [20, 80];
    fixture.detectChanges();
    await fixture.whenStable();
    const startHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--start');
    const endHandle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle--end');
    expect(startHandle.getAttribute('aria-label')).toBe('Minimum value');
    expect(endHandle.getAttribute('aria-label')).toBe('Maximum value');
  });
});

describe('Slider - ControlValueAccessor', (): void => {
  let fixture: ComponentFixture<SliderNgModelHostComponent>;
  let host: SliderNgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SliderNgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderNgModelHostComponent);
    host = fixture.componentInstance;
    host.value = 50;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('ngModel write propagates to aria-valuenow', async (): Promise<void> => {
    host.value = 75;
    // Host is OnPush: mark for check so ngModel re-evaluates and calls writeValue(75).
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    // Second cycle: slider signal update propagates to the template.
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-valuenow')).toBe('75');
  });

  it('keyboard input updates ngModel value', async (): Promise<void> => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    dispatchKeyEvent(handle, 'ArrowRight');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.value).toBe(51);
  });

  it('disabled state via CVA removes from tab order', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('tabindex')).toBe('-1');
  });
});

describe('Slider - reactive forms', (): void => {
  let fixture: ComponentFixture<SliderReactiveHostComponent>;
  let host: SliderReactiveHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SliderReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderReactiveHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('FormControl initial value propagates to aria-valuenow', (): void => {
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-valuenow')).toBe('25');
  });

  it('FormControl.setValue updates the slider display', async (): Promise<void> => {
    host.form.get('value')?.setValue(70);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement = queryEl(fixture, '.ui-lib-slider__handle');
    expect(handle.getAttribute('aria-valuenow')).toBe('70');
  });

  it('FormControl.disable applies disabled class', async (): Promise<void> => {
    host.form.get('value')?.disable();
    fixture.detectChanges();
    await fixture.whenStable();
    const sliderEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-slider'
    ) as HTMLElement;
    expect(sliderEl.classList.contains('ui-lib-slider--disabled')).toBe(true);
  });
});
