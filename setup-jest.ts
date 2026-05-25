import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv();

HTMLElement.prototype.scrollIntoView = function scrollIntoView(): void {};

// JSDOM does not implement IntersectionObserver — required by Angular @defer (on viewport).
// The mock immediately fires the callback with isIntersecting=true so deferred content renders
// in test environments without waiting for a real viewport intersection.
class MockIntersectionObserver implements IntersectionObserver {
  public readonly root: Element | Document | null = null;
  public readonly rootMargin: string = '0px';
  public readonly thresholds: readonly number[] = [0];

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  public observe(target: Element): void {
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        } as IntersectionObserverEntry,
      ],
      this,
    );
  }

  public unobserve(): void {}
  public disconnect(): void {}
  public takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
(window as Window & typeof globalThis).IntersectionObserver = MockIntersectionObserver;

const testWindow: Partial<Window> & { matchMedia?: (query: string) => MediaQueryList } = window;
if (!testWindow.matchMedia) {
  testWindow.matchMedia = (query: string): MediaQueryList => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
      addListener: (): void => {},
      removeListener: (): void => {},
      dispatchEvent: (): boolean => false,
    } as MediaQueryList;
  };
}
