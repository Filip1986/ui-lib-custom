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
import { ScrollTop } from './scroll-top';
import type {
  ScrollTopBehavior,
  ScrollTopSize,
  ScrollTopTarget,
  ScrollTopVariant,
} from './scroll-top.types';

// ---- Minimal test host ------------------------------------------------

@Component({
  standalone: true,
  imports: [ScrollTop],
  template: `
    <ui-lib-scroll-top
      [threshold]="threshold()"
      [target]="targetValue()"
      [icon]="icon()"
      [behavior]="behavior()"
      [buttonAriaLabel]="buttonAriaLabel()"
      [size]="size()"
      [variant]="variant()"
      [styleClass]="styleClass()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly threshold: WritableSignal<number> = signal<number>(400);
  public readonly targetValue: WritableSignal<ScrollTopTarget> = signal<ScrollTopTarget>('window');
  public readonly icon: WritableSignal<string> = signal<string>('pi pi-arrow-up');
  public readonly behavior: WritableSignal<ScrollTopBehavior> = signal<ScrollTopBehavior>('smooth');
  public readonly buttonAriaLabel: WritableSignal<string> = signal<string>('Back to top');
  public readonly size: WritableSignal<ScrollTopSize> = signal<ScrollTopSize>('md');
  public readonly variant: WritableSignal<ScrollTopVariant | null> =
    signal<ScrollTopVariant | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
}

// ---- Helpers ----------------------------------------------------------

function setup(): {
  fixture: ComponentFixture<TestHostComponent>;
  host: TestHostComponent;
  component: ScrollTop;
} {
  TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const component: ScrollTop = fixture.debugElement.query(By.directive(ScrollTop))
    .componentInstance as ScrollTop;
  return { fixture, host: fixture.componentInstance, component };
}

// ---- Tests ------------------------------------------------------------

describe('ScrollTop', (): void => {
  let originalScrollY: PropertyDescriptor | undefined;
  let mockScrollY: number = 0;

  beforeEach((): void => {
    mockScrollY = 0;
    originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: (): number => mockScrollY,
    });
  });

  afterEach((): void => {
    if (originalScrollY) {
      Object.defineProperty(window, 'scrollY', originalScrollY);
    } else {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        get: (): number => 0,
      });
    }
  });

  it('should create', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('should apply base class, default size and target classes', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top');
    expect(el.className).toContain('ui-lib-scroll-top--size-md');
    expect(el.className).toContain('ui-lib-scroll-top--target-window');
  });

  it('should not have visible class when isVisible is false', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).not.toContain('ui-lib-scroll-top--visible');
  });

  it('should apply visible class when isVisible is set to true', async (): Promise<void> => {
    const { fixture, component } = setup();
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top--visible');
  });

  it('should remove visible class when isVisible is set back to false', async (): Promise<void> => {
    const { fixture, component } = setup();
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    component.isVisible.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).not.toContain('ui-lib-scroll-top--visible');
  });

  it('should render a button with the correct aria-label', (): void => {
    const { fixture } = setup();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-scroll-top__button')
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Back to top');
  });

  it('should update aria-label when buttonAriaLabel input changes', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.buttonAriaLabel.set('Scroll to top');
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-scroll-top__button')
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Scroll to top');
  });

  it('should render a button with type="button"', (): void => {
    const { fixture } = setup();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-scroll-top__button')
    ).nativeElement as HTMLButtonElement;
    expect(button.type).toBe('button');
  });

  it('should render the icon span with the given icon class', (): void => {
    const { fixture } = setup();
    const span: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-scroll-top__button span'))
      .nativeElement as HTMLElement;
    expect(span.className).toContain('pi');
    expect(span.className).toContain('pi-arrow-up');
  });

  it('should update icon class when icon input changes', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.icon.set('pi pi-chevron-up');
    fixture.detectChanges();
    await fixture.whenStable();
    const span: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-scroll-top__button span'))
      .nativeElement as HTMLElement;
    expect(span.className).toContain('pi-chevron-up');
  });

  it('should apply size class when size changes', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top--size-lg');
    expect(el.className).not.toContain('ui-lib-scroll-top--size-md');
  });

  it('should apply sm size class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.size.set('sm');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top--size-sm');
  });

  it('should apply variant class when variant is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top--variant-bootstrap');
  });

  it('should apply target-parent class when target is "parent"', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.targetValue.set('parent');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top--target-parent');
    expect(el.className).not.toContain('ui-lib-scroll-top--target-window');
  });

  it('should apply extra styleClass', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.styleClass.set('custom-scroll-btn');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('custom-scroll-btn');
  });

  it('should call window.scrollTo when scrollToTop is called with window target', (): void => {
    const { component } = setup();
    const spy: jest.SpyInstance = jest
      .spyOn(window, 'scrollTo')
      .mockImplementation((): void => undefined);
    component.scrollToTop();
    expect(spy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    spy.mockRestore();
  });

  it('should call window.scrollTo with auto behavior when behavior is "auto"', async (): Promise<void> => {
    const { fixture, host, component } = setup();
    host.behavior.set('auto');
    fixture.detectChanges();
    await fixture.whenStable();
    const spy: jest.SpyInstance = jest
      .spyOn(window, 'scrollTo')
      .mockImplementation((): void => undefined);
    component.scrollToTop();
    expect(spy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    spy.mockRestore();
  });

  it('should become visible when window scroll exceeds threshold', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.threshold.set(200);
    fixture.detectChanges();
    await fixture.whenStable();

    mockScrollY = 300;
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    await fixture.whenStable();

    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-scroll-top--visible');
  });

  it('should become hidden when window scroll drops below threshold', async (): Promise<void> => {
    const { fixture, host, component } = setup();
    host.threshold.set(200);
    fixture.detectChanges();

    // First make visible
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    // Now scroll back to top
    mockScrollY = 50;
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    await fixture.whenStable();

    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-scroll-top'))
      .nativeElement as HTMLElement;
    expect(el.className).not.toContain('ui-lib-scroll-top--visible');
  });
});
