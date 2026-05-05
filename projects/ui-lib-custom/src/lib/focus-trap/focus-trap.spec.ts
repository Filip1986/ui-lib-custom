import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FocusTrapDirective } from './focus-trap';

// effect() is asynchronous in zoneless mode — flush after detectChanges.
function detectAndFlush(fixture: ComponentFixture<unknown>): void {
  fixture.detectChanges();
  TestBed.flushEffects();
}

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-focus-trap-host',
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <div [uiLibFocusTrap]="enabled()">
      <button id="first">First</button>
      <button id="second">Second</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapHostComponent {
  public readonly enabled: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  selector: 'app-focus-trap-default-host',
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <div uiLibFocusTrap>
      <button id="a">A</button>
      <button id="b">B</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapDefaultHostComponent {}

@Component({
  selector: 'app-focus-trap-disabled-host',
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <div [uiLibFocusTrap]="false">
      <button id="inside">Inside</button>
    </div>
    <button id="outside">Outside</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapDisabledHostComponent {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(FocusTrapDirective));
  return debugEl.nativeElement as HTMLElement;
}

function dispatchTab(target: HTMLElement, shiftKey: boolean = false): boolean {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event.defaultPrevented;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('FocusTrapDirective', (): void => {
  describe('creation', (): void => {
    it('should create the directive successfully', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDefaultHostComponent> = TestBed.createComponent(
        FocusTrapDefaultHostComponent
      );
      detectAndFlush(fixture);
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(FocusTrapDirective));
      const directive: FocusTrapDirective = debugEl.injector.get(FocusTrapDirective);
      expect(directive).toBeTruthy();
    });

    it('should add the ui-lib-focus-trap host class', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDefaultHostComponent> = TestBed.createComponent(
        FocusTrapDefaultHostComponent
      );
      detectAndFlush(fixture);
      const hostElement: HTMLElement = getHostElement(fixture);
      expect(hostElement.classList.contains('ui-lib-focus-trap')).toBe(true);
    });
  });

  describe('activation (uiLibFocusTrap = true, default)', (): void => {
    it('should move focus to the first focusable element on activation', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDefaultHostComponent> = TestBed.createComponent(
        FocusTrapDefaultHostComponent
      );
      detectAndFlush(fixture);
      const buttonA: HTMLElement = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('#a')!;
      expect(document.activeElement).toBe(buttonA);
    });

    it('should wrap focus from last to first on Tab', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDefaultHostComponent> = TestBed.createComponent(
        FocusTrapDefaultHostComponent
      );
      detectAndFlush(fixture);
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const buttonA: HTMLElement = nativeEl.querySelector<HTMLElement>('#a')!;
      const buttonB: HTMLElement = nativeEl.querySelector<HTMLElement>('#b')!;
      buttonB.focus();
      const prevented: boolean = dispatchTab(buttonB);
      expect(prevented).toBe(true);
      expect(document.activeElement).toBe(buttonA);
    });

    it('should wrap focus from first to last on Shift+Tab', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDefaultHostComponent> = TestBed.createComponent(
        FocusTrapDefaultHostComponent
      );
      detectAndFlush(fixture);
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const buttonA: HTMLElement = nativeEl.querySelector<HTMLElement>('#a')!;
      const buttonB: HTMLElement = nativeEl.querySelector<HTMLElement>('#b')!;
      buttonA.focus();
      const prevented: boolean = dispatchTab(buttonA, true);
      expect(prevented).toBe(true);
      expect(document.activeElement).toBe(buttonB);
    });
  });

  describe('conditional activation via input', (): void => {
    it('should not trap focus when uiLibFocusTrap is false', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapDisabledHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDisabledHostComponent> = TestBed.createComponent(
        FocusTrapDisabledHostComponent
      );
      detectAndFlush(fixture);
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const insideButton: HTMLElement = nativeEl.querySelector<HTMLElement>('#inside')!;
      insideButton.focus();
      const prevented: boolean = dispatchTab(insideButton);
      expect(prevented).toBe(false);
    });

    it('should activate trap when input changes from false to true', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapHostComponent> =
        TestBed.createComponent(FocusTrapHostComponent);
      fixture.componentInstance.enabled.set(false);
      detectAndFlush(fixture);
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const firstButton: HTMLElement = nativeEl.querySelector<HTMLElement>('#first')!;
      const secondButton: HTMLElement = nativeEl.querySelector<HTMLElement>('#second')!;
      secondButton.focus();
      let prevented: boolean = dispatchTab(secondButton);
      expect(prevented).toBe(false);
      fixture.componentInstance.enabled.set(true);
      detectAndFlush(fixture);
      secondButton.focus();
      prevented = dispatchTab(secondButton);
      expect(prevented).toBe(true);
      expect(document.activeElement).toBe(firstButton);
    });

    it('should deactivate trap when input changes from true to false', (): void => {
      TestBed.configureTestingModule({
        imports: [FocusTrapHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapHostComponent> =
        TestBed.createComponent(FocusTrapHostComponent);
      fixture.componentInstance.enabled.set(true);
      detectAndFlush(fixture);
      fixture.componentInstance.enabled.set(false);
      detectAndFlush(fixture);
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const secondButton: HTMLElement = nativeEl.querySelector<HTMLElement>('#second')!;
      secondButton.focus();
      const prevented: boolean = dispatchTab(secondButton);
      expect(prevented).toBe(false);
    });
  });

  describe('destruction', (): void => {
    it('should deactivate trap and restore focus on destroy', (): void => {
      @Component({
        selector: 'app-focus-trap-destroy-host',
        standalone: true,
        imports: [FocusTrapDirective],
        template: `
          <button id="trigger">Trigger</button>
          @if (showTrap()) {
            <div uiLibFocusTrap>
              <button id="inside">Inside</button>
            </div>
          }
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class FocusTrapDestroyHostComponent {
        public readonly showTrap: WritableSignal<boolean> = signal<boolean>(false);
      }

      TestBed.configureTestingModule({
        imports: [FocusTrapDestroyHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<FocusTrapDestroyHostComponent> = TestBed.createComponent(
        FocusTrapDestroyHostComponent
      );
      detectAndFlush(fixture);
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const triggerButton: HTMLElement = nativeEl.querySelector<HTMLElement>('#trigger')!;
      triggerButton.focus();
      fixture.componentInstance.showTrap.set(true);
      detectAndFlush(fixture);
      fixture.componentInstance.showTrap.set(false);
      detectAndFlush(fixture);
      expect(document.activeElement).toBe(triggerButton);
    });
  });
});
