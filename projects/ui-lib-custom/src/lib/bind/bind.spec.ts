import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Bind } from './bind';
// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-bind-host',
  standalone: true,
  imports: [Bind],
  template: `<div [uiLibBind]="bindings"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindHostComponent {
  public bindings: Record<string, unknown> = {};
}
@Component({
  selector: 'app-bind-signal-host',
  standalone: true,
  imports: [Bind],
  template: `<div [uiLibBind]="bindings()"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindSignalHostComponent {
  public readonly bindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({});
}
@Component({
  selector: 'app-bind-default-host',
  standalone: true,
  imports: [Bind],
  template: `<div uiLibBind></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindDefaultHostComponent {}
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function requireElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Bind));
  return debugEl.nativeElement as HTMLElement;
}
// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Bind', (): void => {
  describe('creation', (): void => {
    it('should create the directive successfully', (): void => {
      TestBed.configureTestingModule({
        imports: [BindDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindDefaultHostComponent> =
        TestBed.createComponent(BindDefaultHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Bind));
      const directive: Bind = debugEl.injector.get(Bind);
      expect(directive).toBeTruthy();
    });
    it('should add the ui-lib-bind host class to the element', (): void => {
      TestBed.configureTestingModule({
        imports: [BindDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindDefaultHostComponent> =
        TestBed.createComponent(BindDefaultHostComponent);
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.classList.contains('ui-lib-bind')).toBe(true);
    });
    it('should not throw when no bindings are supplied (default empty object)', (): void => {
      TestBed.configureTestingModule({
        imports: [BindDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindDefaultHostComponent> =
        TestBed.createComponent(BindDefaultHostComponent);
      expect((): void => fixture.detectChanges()).not.toThrow();
    });
  });
  describe('property binding', (): void => {
    it('should set DOM properties on the host element', (): void => {
      TestBed.configureTestingModule({
        imports: [BindHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindHostComponent> =
        TestBed.createComponent(BindHostComponent);
      fixture.componentInstance.bindings = { id: 'test-id', title: 'Test Title' };
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.id).toBe('test-id');
      expect(element.title).toBe('Test Title');
    });
    it('should set a boolean DOM property like hidden', (): void => {
      TestBed.configureTestingModule({
        imports: [BindHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindHostComponent> =
        TestBed.createComponent(BindHostComponent);
      fixture.componentInstance.bindings = { hidden: true };
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.hidden).toBe(true);
    });
    it('should set a numeric DOM property like tabIndex', (): void => {
      TestBed.configureTestingModule({
        imports: [BindHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindHostComponent> =
        TestBed.createComponent(BindHostComponent);
      fixture.componentInstance.bindings = { tabIndex: 5 };
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.tabIndex).toBe(5);
    });
    it('should set multiple properties in a single binding object', (): void => {
      TestBed.configureTestingModule({
        imports: [BindHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindHostComponent> =
        TestBed.createComponent(BindHostComponent);
      fixture.componentInstance.bindings = {
        id: 'multi-id',
        title: 'Multi Title',
        tabIndex: 3,
      };
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.id).toBe('multi-id');
      expect(element.title).toBe('Multi Title');
      expect(element.tabIndex).toBe(3);
    });
  });
  describe('reactivity', (): void => {
    it('should update DOM properties when the binding object changes', (): void => {
      TestBed.configureTestingModule({
        imports: [BindSignalHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindSignalHostComponent> =
        TestBed.createComponent(BindSignalHostComponent);
      fixture.componentInstance.bindings.set({ id: 'initial' });
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.id).toBe('initial');
      fixture.componentInstance.bindings.set({ id: 'updated' });
      fixture.detectChanges();
      expect(element.id).toBe('updated');
    });
    it('should reset removed properties to null when keys are dropped', (): void => {
      TestBed.configureTestingModule({
        imports: [BindSignalHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindSignalHostComponent> =
        TestBed.createComponent(BindSignalHostComponent);
      fixture.componentInstance.bindings.set({ title: 'Was Here' });
      fixture.detectChanges();
      fixture.componentInstance.bindings.set({});
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      // The property is reset (no longer equals the original value).
      // JSDOM coerces null to the string "null" for string properties; we
      // simply verify the binding was cleared rather than checking falsy.
      expect(element.title).not.toBe('Was Here');
    });
    it('should apply new properties when keys are added', (): void => {
      TestBed.configureTestingModule({
        imports: [BindSignalHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindSignalHostComponent> =
        TestBed.createComponent(BindSignalHostComponent);
      fixture.componentInstance.bindings.set({ id: 'base' });
      fixture.detectChanges();
      fixture.componentInstance.bindings.set({ id: 'base', title: 'Now Added' });
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.id).toBe('base');
      expect(element.title).toBe('Now Added');
    });
  });
  describe('edge cases', (): void => {
    it('should work on non-standard elements without throwing', (): void => {
      @Component({
        selector: 'app-span-host',
        standalone: true,
        imports: [Bind],
        template: `<span [uiLibBind]="{ title: 'tooltip' }"></span>`,
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class SpanHostComponent {}
      TestBed.configureTestingModule({
        imports: [SpanHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<SpanHostComponent> =
        TestBed.createComponent(SpanHostComponent);
      expect((): void => fixture.detectChanges()).not.toThrow();
    });
  });
});
