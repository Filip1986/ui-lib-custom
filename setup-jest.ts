import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv();

HTMLElement.prototype.scrollIntoView = function scrollIntoView(): void {};

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
