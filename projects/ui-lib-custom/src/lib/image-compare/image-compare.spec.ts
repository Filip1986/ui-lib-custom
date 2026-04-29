import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ImageCompareComponent } from './image-compare';
import type { ImageCompareSize, ImageCompareVariant } from './image-compare.types';

// ─── Test helpers ─────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('ui-lib-image-compare')!;
}

function getContainer(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.uilib-image-compare__container'
  );
}

function getLeftImage(fixture: ComponentFixture<unknown>): HTMLImageElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLImageElement>(
    '.uilib-image-compare__img--left'
  );
}

function getRightImage(fixture: ComponentFixture<unknown>): HTMLImageElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLImageElement>(
    '.uilib-image-compare__img--right'
  );
}

function getHandle(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.uilib-image-compare__handle'
  );
}

function getDivider(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.uilib-image-compare__divider'
  );
}

// ─── Test host ────────────────────────────────────────────────────────────────

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [ImageCompareComponent],
  template: `
    <ui-lib-image-compare
      [leftImage]="leftImage()"
      [leftAlt]="leftAlt()"
      [rightImage]="rightImage()"
      [rightAlt]="rightAlt()"
      [value]="value()"
      (valueChange)="value.set($event)"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly leftImage: WritableSignal<string> = signal<string>('before.jpg');
  public readonly leftAlt: WritableSignal<string> = signal<string>('Before');
  public readonly rightImage: WritableSignal<string> = signal<string>('after.jpg');
  public readonly rightAlt: WritableSignal<string> = signal<string>('After');
  public readonly value: WritableSignal<number> = signal<number>(50);
  public readonly variant: WritableSignal<ImageCompareVariant> =
    signal<ImageCompareVariant>('material');
  public readonly size: WritableSignal<ImageCompareSize> = signal<ImageCompareSize>('md');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ImageCompareComponent', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // ─── Rendering ──────────────────────────────────────────────────────────────

  it('should render the host element', (): void => {
    expect(getHost(fixture)).toBeTruthy();
  });

  it('should render the container element', (): void => {
    expect(getContainer(fixture)).toBeTruthy();
  });

  it('should render the left image with the correct src', (): void => {
    const img: HTMLImageElement | null = getLeftImage(fixture);
    expect(img).toBeTruthy();
    expect(img!.getAttribute('src')).toBe('before.jpg');
  });

  it('should render the left image with the correct alt attribute', (): void => {
    const img: HTMLImageElement | null = getLeftImage(fixture);
    expect(img!.getAttribute('alt')).toBe('Before');
  });

  it('should render the right image with the correct src', (): void => {
    const img: HTMLImageElement | null = getRightImage(fixture);
    expect(img).toBeTruthy();
    expect(img!.getAttribute('src')).toBe('after.jpg');
  });

  it('should render the right image with the correct alt attribute', (): void => {
    const img: HTMLImageElement | null = getRightImage(fixture);
    expect(img!.getAttribute('alt')).toBe('After');
  });

  it('should render the handle element', (): void => {
    expect(getHandle(fixture)).toBeTruthy();
  });

  it('should render the divider element', (): void => {
    expect(getDivider(fixture)).toBeTruthy();
  });

  // ─── Host classes ────────────────────────────────────────────────────────────

  it('should apply variant class to the host element', (): void => {
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--variant-material')).toBe(true);
  });

  it('should apply size class to the host element', (): void => {
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--size-md')).toBe(true);
  });

  it('should switch variant class when variant input changes', async (): Promise<void> => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--variant-bootstrap')).toBe(true);
    expect(hostEl.classList.contains('ui-lib-image-compare--variant-material')).toBe(false);
  });

  it('should apply disabled class when disabled is true', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--disabled')).toBe(true);
  });

  it('should not apply disabled class when disabled is false', (): void => {
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--disabled')).toBe(false);
  });

  it('should apply size class when size input changes', async (): Promise<void> => {
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--size-lg')).toBe(true);
  });

  // ─── Handle position ─────────────────────────────────────────────────────────

  it('should set handle left style to 50% at default value', (): void => {
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.style.left).toBe('50%');
  });

  it('should update handle position when value changes', async (): Promise<void> => {
    host.value.set(75);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.style.left).toBe('75%');
  });

  it('should clamp the handle position to 0% at minimum', async (): Promise<void> => {
    host.value.set(-10);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.style.left).toBe('0%');
  });

  it('should clamp the handle position to 100% at maximum', async (): Promise<void> => {
    host.value.set(110);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.style.left).toBe('100%');
  });

  // ─── Right image clip-path ────────────────────────────────────────────────────

  it('should apply clip-path to the right image based on value', (): void => {
    const rightImg: HTMLImageElement | null = getRightImage(fixture);
    expect(rightImg!.style.clipPath).toBe('inset(0 0 0 50%)');
  });

  it('should update clip-path when value changes', async (): Promise<void> => {
    host.value.set(30);
    fixture.detectChanges();
    await fixture.whenStable();
    const rightImg: HTMLImageElement | null = getRightImage(fixture);
    expect(rightImg!.style.clipPath).toBe('inset(0 0 0 30%)');
  });

  // ─── Keyboard navigation ──────────────────────────────────────────────────────

  it('should increase value by 1 on ArrowRight key', async (): Promise<void> => {
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('51%');
  });

  it('should decrease value by 1 on ArrowLeft key', async (): Promise<void> => {
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('49%');
  });

  it('should increase value by 10 on PageUp key', async (): Promise<void> => {
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('60%');
  });

  it('should decrease value by 10 on PageDown key', async (): Promise<void> => {
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('40%');
  });

  it('should set value to 0 on Home key', async (): Promise<void> => {
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('0%');
  });

  it('should set value to 100 on End key', async (): Promise<void> => {
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('100%');
  });

  it('should not respond to keyboard when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(handle.style.left).toBe('50%');
  });

  // ─── ARIA ────────────────────────────────────────────────────────────────────

  it('should have role="slider" on the handle', (): void => {
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('role')).toBe('slider');
  });

  it('should have aria-valuemin="0" on the handle', (): void => {
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('aria-valuemin')).toBe('0');
  });

  it('should have aria-valuemax="100" on the handle', (): void => {
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should set aria-valuenow to the current value', (): void => {
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should update aria-valuenow when value changes', async (): Promise<void> => {
    host.value.set(73);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('aria-valuenow')).toBe('73');
  });

  it('should have aria-disabled on the handle when disabled', async (): Promise<void> => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have the default aria-label on the handle', (): void => {
    const handle: HTMLElement | null = getHandle(fixture);
    expect(handle!.getAttribute('aria-label')).toBe('Image comparison slider');
  });

  // ─── Focus state ─────────────────────────────────────────────────────────────

  it('should apply focused class when handle is focused', async (): Promise<void> => {
    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new Event('focus', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--focused')).toBe(true);
  });

  it('should remove focused class when handle is blurred', async (): Promise<void> => {
    const handle: HTMLElement = getHandle(fixture)!;
    handle.dispatchEvent(new Event('focus', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    handle.dispatchEvent(new Event('blur', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image-compare--focused')).toBe(false);
  });

  // ─── Outputs ─────────────────────────────────────────────────────────────────

  it('should emit slideStart when onHandlePointerDown is called', async (): Promise<void> => {
    const comp: ImageCompareComponent = fixture.debugElement.children[0]!.children[0]!
      .componentInstance as ImageCompareComponent;

    host.value.set(50);
    fixture.detectChanges();
    await fixture.whenStable();

    let emittedValue: number = -1;
    comp.slideStart.subscribe((value: number): void => {
      emittedValue = value;
    });

    // Use a minimal stub — setPointerCapture is not available in JSDOM
    const stubEvent: Partial<PointerEvent> = {
      preventDefault: (): void => {},
      stopPropagation: (): void => {},
      target: getHandle(fixture) as EventTarget,
      pointerId: 1,
    };
    (stubEvent.target as { setPointerCapture?: (id: number) => void }).setPointerCapture =
      (): void => {};

    comp.onHandlePointerDown(stubEvent as PointerEvent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(emittedValue).toBe(50);
  });
});
