import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { AutoFocus } from './auto-focus';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-auto-focus-host',
  standalone: true,
  imports: [AutoFocus],
  template: `<input uiLibAutoFocus [autofocus]="autofocus" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusHostComponent {
  public autofocus: boolean = true;
}

@Component({
  selector: 'app-auto-focus-disabled-host',
  standalone: true,
  imports: [AutoFocus],
  template: `<input uiLibAutoFocus [autofocus]="false" />`,
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(AutoFocus));
  return debugEl.nativeElement as HTMLElement;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AutoFocus', (): void => {
  beforeEach((): void => {
    jest.useFakeTimers();
  });

  afterEach((): void => {
    jest.useRealTimers();
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

  describe('autofocus = true (default)', (): void => {
    it('should call focus on the host element after view init', (): void => {
      TestBed.configureTestingModule({
        imports: [AutoFocusDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusDefaultHostComponent> = TestBed.createComponent(
        AutoFocusDefaultHostComponent
      );

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus'
      );

      fixture.detectChanges();
      jest.runAllTimers();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('should call focus when autofocus input is explicitly true', (): void => {
      TestBed.configureTestingModule({
        imports: [AutoFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusHostComponent> =
        TestBed.createComponent(AutoFocusHostComponent);

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus'
      );

      fixture.detectChanges();
      jest.runAllTimers();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('autofocus = false', (): void => {
    it('should NOT call focus when autofocus is false', (): void => {
      TestBed.configureTestingModule({
        imports: [AutoFocusDisabledHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusDisabledHostComponent> = TestBed.createComponent(
        AutoFocusDisabledHostComponent
      );

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus'
      );

      fixture.detectChanges();
      jest.runAllTimers();

      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should NOT call focus when autofocus input changes from true to false before view init', (): void => {
      TestBed.configureTestingModule({
        imports: [AutoFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<AutoFocusHostComponent> =
        TestBed.createComponent(AutoFocusHostComponent);

      // Set false before detectChanges triggers ngAfterViewInit
      fixture.componentInstance.autofocus = false;

      const focusSpy: jest.SpyInstance = jest.spyOn(
        fixture.debugElement.query(By.directive(AutoFocus)).nativeElement as HTMLElement,
        'focus'
      );

      fixture.detectChanges();
      jest.runAllTimers();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', (): void => {
    it('should not throw when applied to a non-focusable element', (): void => {
      @Component({
        selector: 'app-div-host',
        standalone: true,
        imports: [AutoFocus],
        template: `<div uiLibAutoFocus></div>`,
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class DivHostComponent {}

      TestBed.configureTestingModule({
        imports: [DivHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<DivHostComponent> = TestBed.createComponent(DivHostComponent);

      expect((): void => {
        fixture.detectChanges();
        jest.runAllTimers();
      }).not.toThrow();
    });
  });
});
