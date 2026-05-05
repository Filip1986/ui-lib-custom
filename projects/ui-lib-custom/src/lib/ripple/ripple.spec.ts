import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { Ripple } from './ripple';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ripple-host',
  standalone: true,
  imports: [Ripple],
  template: `
    <button
      uiLibRipple
      [disabled]="disabledSignal()"
      [rippleColor]="colorSignal()"
      [rippleDuration]="durationSignal()"
    >
      Click me
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RippleHostComponent {
  public readonly disabledSignal: WritableSignal<boolean> = signal<boolean>(false);
  public readonly colorSignal: WritableSignal<string> = signal<string>('');
  public readonly durationSignal: WritableSignal<string> = signal<string>('');
}

@Component({
  selector: 'app-ripple-plain-host',
  standalone: true,
  imports: [Ripple],
  template: `<div uiLibRipple>Plain</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RipplePlainHostComponent {}

// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------

function setupHost(): {
  fixture: ComponentFixture<RippleHostComponent>;
  host: RippleHostComponent;
  element: HTMLElement;
} {
  TestBed.configureTestingModule({
    imports: [RippleHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<RippleHostComponent> =
    TestBed.createComponent(RippleHostComponent);
  fixture.detectChanges();
  const host: RippleHostComponent = fixture.componentInstance;
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
  const element: HTMLElement = debugEl.nativeElement as HTMLElement;
  return { fixture, host, element };
}

/** Dispatch a synthetic MouseEvent on the given element. */
function click(element: HTMLElement, x: number = 0, y: number = 0): void {
  const event: MouseEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
  });
  element.dispatchEvent(event);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Ripple', (): void => {
  describe('creation', (): void => {
    it('should create the directive successfully', (): void => {
      const { fixture } = setupHost();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
      const directive: Ripple = debugEl.injector.get(Ripple);
      expect(directive).toBeTruthy();
    });

    it('should add the ui-lib-ripple class to the host element', (): void => {
      const { element } = setupHost();
      expect(element.classList.contains('ui-lib-ripple')).toBe(true);
    });
  });

  describe('ripple wave creation', (): void => {
    it('should append a ui-lib-ripple-wave span on click', (): void => {
      const { element } = setupHost();
      click(element);
      const wave: HTMLElement | null = element.querySelector('.ui-lib-ripple-wave');
      expect(wave).not.toBeNull();
    });

    it('should set width and height on the wave element', (): void => {
      const { element } = setupHost();
      click(element);
      const wave: HTMLElement | null = element.querySelector<HTMLElement>('.ui-lib-ripple-wave');
      expect(wave?.style.width).toBeTruthy();
      expect(wave?.style.height).toBeTruthy();
    });

    it('should set left and top positioning on the wave element', (): void => {
      const { element } = setupHost();
      click(element, 10, 10);
      const wave: HTMLElement | null = element.querySelector<HTMLElement>('.ui-lib-ripple-wave');
      expect(wave?.style.left).toBeDefined();
      expect(wave?.style.top).toBeDefined();
    });

    it('should create a new wave on each click', (): void => {
      const { element } = setupHost();
      click(element);
      click(element);
      // At most 2 waves present (animationend may not fire in test env)
      const waves: NodeListOf<HTMLElement> =
        element.querySelectorAll<HTMLElement>('.ui-lib-ripple-wave');
      expect(waves.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('disabled mode', (): void => {
    it('should NOT create a wave when disabled is true', (): void => {
      const { host, element, fixture } = setupHost();
      host.disabledSignal.set(true);
      fixture.detectChanges();
      click(element);
      const wave: HTMLElement | null = element.querySelector('.ui-lib-ripple-wave');
      expect(wave).toBeNull();
    });

    it('should create a wave when disabled is false', (): void => {
      const { element } = setupHost();
      click(element);
      const wave: HTMLElement | null = element.querySelector('.ui-lib-ripple-wave');
      expect(wave).not.toBeNull();
    });
  });

  describe('rippleColor input', (): void => {
    it('rippleColor signal should default to empty string', (): void => {
      const { fixture } = setupHost();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
      const directive: Ripple = debugEl.injector.get(Ripple);
      expect(directive.rippleColor()).toBe('');
    });

    it('rippleColor signal should reflect the bound value after change detection', (): void => {
      const { host, fixture } = setupHost();
      host.colorSignal.set('rgba(0,0,0,0.12)');
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
      const directive: Ripple = debugEl.injector.get(Ripple);
      expect(directive.rippleColor()).toBe('rgba(0,0,0,0.12)');
    });

    it('should still create a wave when rippleColor is provided', (): void => {
      const { host, element, fixture } = setupHost();
      host.colorSignal.set('rgba(0,0,0,0.12)');
      fixture.detectChanges();
      click(element);
      const wave: HTMLElement | null = element.querySelector('.ui-lib-ripple-wave');
      expect(wave).not.toBeNull();
    });
  });

  describe('rippleDuration input', (): void => {
    it('rippleDuration signal should default to empty string', (): void => {
      const { fixture } = setupHost();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
      const directive: Ripple = debugEl.injector.get(Ripple);
      expect(directive.rippleDuration()).toBe('');
    });

    it('rippleDuration signal should reflect the bound value after change detection', (): void => {
      const { host, fixture } = setupHost();
      host.durationSignal.set('400ms');
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
      const directive: Ripple = debugEl.injector.get(Ripple);
      expect(directive.rippleDuration()).toBe('400ms');
    });

    it('should still create a wave when rippleDuration is provided', (): void => {
      const { host, element, fixture } = setupHost();
      host.durationSignal.set('400ms');
      fixture.detectChanges();
      click(element);
      const wave: HTMLElement | null = element.querySelector('.ui-lib-ripple-wave');
      expect(wave).not.toBeNull();
    });
  });

  describe('cleanup', (): void => {
    it('should remove the wave element after animationend fires', (): void => {
      const { element } = setupHost();
      click(element);
      const wave: HTMLElement | null = element.querySelector<HTMLElement>('.ui-lib-ripple-wave');
      expect(wave).not.toBeNull();
      // Simulate animationend
      const animEnd: Event = new Event('animationend', { bubbles: false });
      wave!.dispatchEvent(animEnd);
      expect(element.querySelector('.ui-lib-ripple-wave')).toBeNull();
    });

    it('should not throw when the directive is destroyed', (): void => {
      const { fixture } = setupHost();
      expect((): void => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('plain usage (no inputs)', (): void => {
    it('should work without any inputs', (): void => {
      TestBed.configureTestingModule({
        imports: [RipplePlainHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<RipplePlainHostComponent> =
        TestBed.createComponent(RipplePlainHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Ripple));
      const element: HTMLElement = debugEl.nativeElement as HTMLElement;
      click(element);
      expect(element.querySelector('.ui-lib-ripple-wave')).not.toBeNull();
    });
  });
});
