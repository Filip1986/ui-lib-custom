import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { AnimateOnScroll } from './animate-on-scroll';

// ---------------------------------------------------------------------------
// IntersectionObserver mock
// ---------------------------------------------------------------------------

let intersectionCallback: IntersectionObserverCallback;
const originalRequestAnimationFrame: typeof globalThis.requestAnimationFrame =
  globalThis.requestAnimationFrame;

const mockObserver: {
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
} = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-animate-on-scroll-host',
  standalone: true,
  imports: [AnimateOnScroll],
  template: `
    <div
      uiLibAnimateOnScroll
      [enterClass]="enterClass"
      [leaveClass]="leaveClass"
      [once]="once"
      [disabled]="disabled"
      (enter)="onEnter()"
      (leave)="onLeave()"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AnimateOnScrollHostComponent {
  public enterClass: string = 'fade-in';
  public leaveClass: string = 'fade-out';
  public once: boolean = true;
  public disabled: boolean = false;
  public enterCount: number = 0;
  public leaveCount: number = 0;

  public onEnter(): void {
    this.enterCount++;
  }

  public onLeave(): void {
    this.leaveCount++;
  }
}

@Component({
  selector: 'app-animate-on-scroll-repeat-host',
  standalone: true,
  imports: [AnimateOnScroll],
  template: `
    <div
      uiLibAnimateOnScroll
      enterClass="fade-in"
      leaveClass="fade-out"
      [once]="false"
      (enter)="onEnter()"
      (leave)="onLeave()"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AnimateOnScrollRepeatHostComponent {
  public enterCount: number = 0;
  public leaveCount: number = 0;

  public onEnter(): void {
    this.enterCount++;
  }

  public onLeave(): void {
    this.leaveCount++;
  }
}

@Component({
  selector: 'app-animate-on-scroll-disabled-host',
  standalone: true,
  imports: [AnimateOnScroll],
  template: `<div uiLibAnimateOnScroll [disabled]="true"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AnimateOnScrollDisabledHostComponent {}

@Component({
  selector: 'app-animate-on-scroll-empty-host',
  standalone: true,
  imports: [AnimateOnScroll],
  template: `<div uiLibAnimateOnScroll></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AnimateOnScrollEmptyHostComponent {}

// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------

function setupHost(): {
  fixture: ComponentFixture<AnimateOnScrollHostComponent>;
  host: AnimateOnScrollHostComponent;
  element: HTMLElement;
} {
  TestBed.configureTestingModule({
    imports: [AnimateOnScrollHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<AnimateOnScrollHostComponent> = TestBed.createComponent(
    AnimateOnScrollHostComponent
  );
  fixture.detectChanges();
  const host: AnimateOnScrollHostComponent = fixture.componentInstance;
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(AnimateOnScroll));
  const element: HTMLElement = debugEl.nativeElement as HTMLElement;
  return { fixture, host, element };
}

function setupRepeatHost(): {
  fixture: ComponentFixture<AnimateOnScrollRepeatHostComponent>;
  host: AnimateOnScrollRepeatHostComponent;
  element: HTMLElement;
} {
  TestBed.configureTestingModule({
    imports: [AnimateOnScrollRepeatHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<AnimateOnScrollRepeatHostComponent> = TestBed.createComponent(
    AnimateOnScrollRepeatHostComponent
  );
  fixture.detectChanges();
  const host: AnimateOnScrollRepeatHostComponent = fixture.componentInstance;
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(AnimateOnScroll));
  const element: HTMLElement = debugEl.nativeElement as HTMLElement;
  return { fixture, host, element };
}

function triggerIntersection(isIntersecting: boolean): void {
  const entry: Partial<IntersectionObserverEntry> = {
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    target: document.createElement('div'),
    boundingClientRect: new DOMRect(),
    intersectionRect: new DOMRect(),
    rootBounds: null,
    time: 0,
  };
  intersectionCallback(
    [entry as IntersectionObserverEntry],
    mockObserver as unknown as IntersectionObserver
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AnimateOnScroll', (): void => {
  beforeEach((): void => {
    mockObserver.observe.mockClear();
    mockObserver.unobserve.mockClear();
    mockObserver.disconnect.mockClear();

    (
      globalThis as typeof globalThis & { IntersectionObserver: typeof IntersectionObserver }
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

  afterAll((): void => {
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
  });

  describe('creation', (): void => {
    it('should create the directive successfully', (): void => {
      const { fixture } = setupHost();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(AnimateOnScroll));
      const directive: AnimateOnScroll = debugEl.injector.get(AnimateOnScroll);
      expect(directive).toBeTruthy();
    });

    it('should add the ui-lib-animate-on-scroll host class to the element', (): void => {
      const { element } = setupHost();
      expect(element.classList.contains('ui-lib-animate-on-scroll')).toBe(true);
    });

    it('should set up the IntersectionObserver on init', (): void => {
      setupHost();
      expect(mockObserver.observe).toHaveBeenCalledTimes(1);
    });
  });

  describe('enter behaviour', (): void => {
    it('should add enterClass to the element when isIntersecting is true', (): void => {
      const { element } = setupHost();
      triggerIntersection(true);
      expect(element.classList.contains('fade-in')).toBe(true);
    });

    it('should remove leaveClass when element enters', (): void => {
      const { element } = setupHost();
      element.classList.add('fade-out');
      triggerIntersection(true);
      expect(element.classList.contains('fade-out')).toBe(false);
    });

    it('should emit the enter output when isIntersecting is true', (): void => {
      const { host } = setupHost();
      triggerIntersection(true);
      expect(host.enterCount).toBe(1);
    });

    it('should schedule class mutations using requestAnimationFrame', (): void => {
      setupHost();
      const requestAnimationFrameMock: jest.Mock = globalThis.requestAnimationFrame as jest.Mock;
      triggerIntersection(true);
      expect(requestAnimationFrameMock).toHaveBeenCalled();
    });
  });

  describe('once mode (default)', (): void => {
    it('should call unobserve after entering when once is true', (): void => {
      setupHost();
      triggerIntersection(true);
      expect(mockObserver.unobserve).toHaveBeenCalledTimes(1);
    });

    it('should NOT emit leave when once is true and element leaves', (): void => {
      const { host } = setupHost();
      triggerIntersection(true);
      triggerIntersection(false);
      expect(host.leaveCount).toBe(0);
    });
  });

  describe('repeat mode (once = false)', (): void => {
    it('should NOT call unobserve when once is false', (): void => {
      setupRepeatHost();
      triggerIntersection(true);
      expect(mockObserver.unobserve).not.toHaveBeenCalled();
    });

    it('should add leaveClass and emit leave when once is false and element leaves', (): void => {
      const { element, host } = setupRepeatHost();

      triggerIntersection(false);
      expect(element.classList.contains('fade-out')).toBe(true);
      expect(host.leaveCount).toBe(1);
    });

    it('should remove enterClass when element leaves in repeat mode', (): void => {
      const { element } = setupRepeatHost();

      triggerIntersection(true);
      expect(element.classList.contains('fade-in')).toBe(true);

      triggerIntersection(false);
      expect(element.classList.contains('fade-in')).toBe(false);
    });
  });

  describe('disabled mode', (): void => {
    it('should NOT set up the observer when disabled is true', (): void => {
      TestBed.configureTestingModule({
        imports: [AnimateOnScrollDisabledHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const disabledFixture: ComponentFixture<AnimateOnScrollDisabledHostComponent> =
        TestBed.createComponent(AnimateOnScrollDisabledHostComponent);
      disabledFixture.detectChanges();

      expect(mockObserver.observe).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', (): void => {
    it('should not throw when enterClass is empty string', (): void => {
      TestBed.configureTestingModule({
        imports: [AnimateOnScrollEmptyHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const emptyFixture: ComponentFixture<AnimateOnScrollEmptyHostComponent> =
        TestBed.createComponent(AnimateOnScrollEmptyHostComponent);
      expect((): void => {
        emptyFixture.detectChanges();
        triggerIntersection(true);
      }).not.toThrow();
    });

    it('should disconnect observer on destroy', (): void => {
      const { fixture } = setupHost();
      fixture.destroy();
      expect(mockObserver.disconnect).toHaveBeenCalledTimes(1);
    });

    it('should force visible static state when IntersectionObserver is unavailable', (): void => {
      (
        globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver | undefined }
      ).IntersectionObserver = undefined;

      const { element } = setupHost();
      expect(element.style.opacity).toBe('1');
      expect(element.style.transform).toBe('none');
      expect(element.style.transition).toBe('none');
      expect(element.style.animation).toBe('none');
    });
  });
});
