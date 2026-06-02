import type { WritableSignal } from '@angular/core';
import type { DebugElement } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AutoFocus } from './auto-focus';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-auto-focus-host',
  standalone: true,
  imports: [AutoFocus],
  template: `<input uiLibAutoFocus [disabled]="disabled" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusHostComponent {
  public disabled: boolean = false;
}

@Component({
  selector: 'app-auto-focus-disabled-host',
  standalone: true,
  imports: [AutoFocus],
  template: `<input uiLibAutoFocus [disabled]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusDisabledHostComponent {}

@Component({
  selector: 'app-auto-focus-default-host',
  standalone: true,
  imports: [AutoFocus],
  template: `<input uiLibAutoFocus />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusDefaultHostComponent {}

@Component({
  selector: 'app-auto-focus-selector-host',
  standalone: true,
  imports: [AutoFocus],
  template: `
    <div uiLibAutoFocus selector="[data-autofocus-target]">
      <button type="button" data-autofocus-target>Focus target</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusSelectorHostComponent {}

@Component({
  selector: 'app-auto-focus-rerender-host',
  standalone: true,
  imports: [AutoFocus],
  template: `<input uiLibAutoFocus [disabled]="disabled()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusRerenderHostComponent {
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<div uiLibAutoFocus></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusNonFocusableHostComponent {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(AutoFocus));
  return debugEl.nativeElement as HTMLElement;
}

async function detectAndWaitForFocus(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  await new Promise<void>((resolve: () => void): void => {
    window.requestAnimationFrame((): void => resolve());
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AutoFocus', (): void => {
  let requestAnimationFrameSpy: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach((): void => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
  });

  afterEach((): void => {
    requestAnimationFrameSpy.mockRestore();
    TestBed.resetTestingModule();
  });

  describe('creation', (): void => {
    it('should create the directive successfully', (): void => {
      TestBed.configureTestingModule({
        imports: [AutoFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusHostComponent> =
        TestBed.createComponent(AutoFocusHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(AutoFocus));
      const directive: AutoFocus = debugEl.injector.get(AutoFocus);
      expect(directive).toBeTruthy();
    });

    it('should add the ui-lib-autofocus host class to the element', (): void => {
      TestBed.configureTestingModule({
        imports: [AutoFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusHostComponent> =
        TestBed.createComponent(AutoFocusHostComponent);
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.classList.contains('ui-lib-autofocus')).toBe(true);
    });
  });

  describe('default focus behavior', (): void => {
    it('should call focus on the host element after view init', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusDefaultHostComponent> = TestBed.createComponent(
        AutoFocusDefaultHostComponent,
      );

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus',
      );

      await detectAndWaitForFocus(fixture);

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(requestAnimationFrameSpy).toHaveBeenCalled();
    });

    it('should call focus when disabled input is explicitly false', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusHostComponent> =
        TestBed.createComponent(AutoFocusHostComponent);

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus',
      );

      await detectAndWaitForFocus(fixture);

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled', (): void => {
    it('should NOT call focus when disabled is true', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusDisabledHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusDisabledHostComponent> = TestBed.createComponent(
        AutoFocusDisabledHostComponent,
      );

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus',
      );

      await detectAndWaitForFocus(fixture);

      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should NOT call focus when disabled input changes from false to true before view init', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusHostComponent> =
        TestBed.createComponent(AutoFocusHostComponent);

      fixture.componentInstance.disabled = true;

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus',
      );

      await detectAndWaitForFocus(fixture);

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('selector support', (): void => {
    it('should focus a matching child when selector is provided', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusSelectorHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusSelectorHostComponent> = TestBed.createComponent(
        AutoFocusSelectorHostComponent,
      );
      const childButton: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        '[data-autofocus-target]',
      ) as HTMLElement;
      const focusSpy: jest.SpyInstance = jest.spyOn(childButton, 'focus');

      await detectAndWaitForFocus(fixture);

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('single-run behavior', (): void => {
    it('should focus only once and not on subsequent host re-renders', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusRerenderHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusRerenderHostComponent> = TestBed.createComponent(
        AutoFocusRerenderHostComponent,
      );
      const input: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'input',
      ) as HTMLElement;
      const focusSpy: jest.SpyInstance = jest.spyOn(input, 'focus');

      await detectAndWaitForFocus(fixture);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      fixture.componentInstance.disabled.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(requestAnimationFrameSpy).toHaveBeenCalled();
    });
  });

  describe('edge cases', (): void => {
    it('should not throw when applied to a non-focusable element and should log a dev warning', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [AutoFocusNonFocusableHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusNonFocusableHostComponent> = TestBed.createComponent(
        AutoFocusNonFocusableHostComponent,
      );
      const warnSpy: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation((): void => {
        return;
      });

      await detectAndWaitForFocus(fixture);
      expect(warnSpy).toHaveBeenCalledTimes(1);

      warnSpy.mockRestore();
    });
  });
});
