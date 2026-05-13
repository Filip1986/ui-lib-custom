import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { AnimateOnScroll } from './animate-on-scroll';

let intersectionCallback: IntersectionObserverCallback | null = null;

const mockObserver: {
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
} = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

const originalIntersectionObserver: typeof globalThis.IntersectionObserver =
  globalThis.IntersectionObserver;
const originalRequestAnimationFrame: typeof globalThis.requestAnimationFrame =
  globalThis.requestAnimationFrame;
const originalMatchMedia: typeof window.matchMedia = window.matchMedia;

@Component({
  standalone: true,
  imports: [AnimateOnScroll],
  template: `
    <div
      class="uilib-aos-slide-up"
      uiLibAnimateOnScroll
      [enterClass]="enterClass"
      [once]="once"
      (enter)="onEnter()"
    >
      Accessible content
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AnimateOnScrollA11yHostComponent {
  public enterClass: string = 'uilib-aos-active';
  public once: boolean = true;
  public enterCount: number = 0;

  public onEnter(): void {
    this.enterCount++;
  }
}

function setReducedMotionPreference(preferReducedMotion: boolean): void {
  window.matchMedia = jest.fn().mockImplementation(
    (query: string): MediaQueryList =>
      ({
        matches: preferReducedMotion && query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn().mockReturnValue(false),
      }) as MediaQueryList
  );
}

async function createFixture(): Promise<ComponentFixture<AnimateOnScrollA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [AnimateOnScrollA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = TestBed.createComponent(
    AnimateOnScrollA11yHostComponent
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getAnimatedElement(
  fixture: ComponentFixture<AnimateOnScrollA11yHostComponent>
): HTMLElement {
  const rootElement: HTMLElement = fixture.nativeElement as HTMLElement;
  return rootElement.querySelector('.ui-lib-animate-on-scroll') as HTMLElement;
}

describe('AnimateOnScroll (a11y)', (): void => {
  beforeEach((): void => {
    intersectionCallback = null;
    mockObserver.observe.mockClear();
    mockObserver.unobserve.mockClear();
    mockObserver.disconnect.mockClear();

    setReducedMotionPreference(false);

    (
      globalThis as typeof globalThis & {
        IntersectionObserver: typeof IntersectionObserver;
      }
    ).IntersectionObserver = jest.fn(
      (callback: IntersectionObserverCallback): IntersectionObserver => {
        intersectionCallback = callback;
        return mockObserver as unknown as IntersectionObserver;
      }
    ) as unknown as typeof IntersectionObserver;

    globalThis.requestAnimationFrame = jest.fn((callback: FrameRequestCallback): number => {
      callback(0);
      return 1;
    }) as typeof requestAnimationFrame;
  });

  afterEach((): void => {
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
    window.matchMedia = originalMatchMedia;
    globalThis.IntersectionObserver = originalIntersectionObserver;
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
  });

  it('passes axe in the default state', async (): Promise<void> => {
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('sets up IntersectionObserver when reduced motion is not requested', async (): Promise<void> => {
    await createFixture();
    expect(mockObserver.observe).toHaveBeenCalledTimes(1);
  });

  it('uses requestAnimationFrame for class application when intersecting', async (): Promise<void> => {
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    const host: AnimateOnScrollA11yHostComponent = fixture.componentInstance;
    const requestAnimationFrameMock: jest.Mock = globalThis.requestAnimationFrame as jest.Mock;
    const entry: Partial<IntersectionObserverEntry> = {
      isIntersecting: true,
      target: getAnimatedElement(fixture),
      intersectionRatio: 1,
      boundingClientRect: new DOMRect(),
      intersectionRect: new DOMRect(),
      rootBounds: null,
      time: 0,
    };

    if (intersectionCallback === null) {
      throw new Error('IntersectionObserver callback was not registered.');
    }

    intersectionCallback(
      [entry as IntersectionObserverEntry],
      mockObserver as unknown as IntersectionObserver
    );
    expect(requestAnimationFrameMock).toHaveBeenCalled();
    expect(host.enterCount).toBe(1);
  });

  it('does not observe when prefers-reduced-motion is enabled', async (): Promise<void> => {
    setReducedMotionPreference(true);
    await createFixture();
    expect(mockObserver.observe).not.toHaveBeenCalled();
  });

  it('keeps content visible when prefers-reduced-motion is enabled', async (): Promise<void> => {
    setReducedMotionPreference(true);
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    const element: HTMLElement = getAnimatedElement(fixture);
    expect(element.style.opacity).toBe('1');
    expect(element.style.transform).toBe('none');
    expect(element.style.transition).toBe('none');
    expect(element.style.animation).toBe('none');
  });

  it('does not emit enter when reduced motion skips observer setup', async (): Promise<void> => {
    setReducedMotionPreference(true);
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    expect(fixture.componentInstance.enterCount).toBe(0);
    expect(intersectionCallback).toBeNull();
  });

  it('disconnects observer on destroy', async (): Promise<void> => {
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    fixture.destroy();
    expect(mockObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('does not throw on destroy when reduced motion bypasses observer', async (): Promise<void> => {
    setReducedMotionPreference(true);
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    expect((): void => {
      fixture.destroy();
    }).not.toThrow();
  });

  it('forces visible static state when IntersectionObserver is unavailable', async (): Promise<void> => {
    (
      globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver | undefined }
    ).IntersectionObserver = undefined;
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    const element: HTMLElement = getAnimatedElement(fixture);
    expect(element.style.opacity).toBe('1');
    expect(element.style.transform).toBe('none');
  });

  it('does not leave hidden inline styles when reduced motion is not requested', async (): Promise<void> => {
    const fixture: ComponentFixture<AnimateOnScrollA11yHostComponent> = await createFixture();
    const element: HTMLElement = getAnimatedElement(fixture);
    expect(element.style.opacity).toBe('');
    expect(element.style.transform).toBe('');
  });
});
