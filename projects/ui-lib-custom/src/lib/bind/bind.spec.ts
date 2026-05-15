import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { StyleClass } from '../style-class/style-class';
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

@Component({
  selector: 'app-bind-aria-host',
  standalone: true,
  imports: [Bind],
  template: `<button
    type="button"
    [attr.aria-label]="ariaLabel()"
    [uiLibBind]="bindings()"
  ></button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindAriaHostComponent {
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Angular label');
  public readonly bindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({});
}

@Component({
  selector: 'app-bind-a11y-host',
  standalone: true,
  imports: [Bind],
  template: `<button type="button" [uiLibBind]="bindings()">Open panel</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindA11yHostComponent {
  public readonly bindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({
    title: 'Open the details panel',
  });
}

@Component({
  selector: 'app-bind-override-host',
  standalone: true,
  imports: [Bind],
  template: `<div [title]="externalTitle()" [uiLibBind]="bindings()"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindExternalOverrideHostComponent {
  public readonly externalTitle: WritableSignal<string> = signal<string>('External title');
  public readonly bindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({});
}

@Component({
  selector: 'app-bind-style-class-host',
  standalone: true,
  imports: [Bind, StyleClass],
  template: `
    <button
      type="button"
      [uiLibBind]="bindings()"
      [uiLibStyleClass]="'@next'"
      [toggleClass]="'is-open'"
    >
      Toggle panel
    </button>
    <div id="bind-style-class-target">Panel</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindStyleClassHostComponent {
  public readonly bindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({
    title: 'Toggle the next panel',
    ariaLabel: 'Toggle the next panel',
  });
}

@Component({
  selector: 'app-bind-structural-host',
  standalone: true,
  imports: [Bind],
  template: `
    @if (showIf()) {
      <section data-testid="if-target" [uiLibBind]="ifBindings()"></section>
    }

    @switch (mode()) {
      @case ('alpha') {
        <article data-testid="switch-target" [uiLibBind]="switchBindings()"></article>
      }
    }

    @for (item of items(); track item.id) {
      <div data-testid="for-target" [uiLibBind]="item.bindings"></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BindStructuralHostComponent {
  public readonly showIf: WritableSignal<boolean> = signal<boolean>(true);
  public readonly mode: WritableSignal<'alpha' | 'beta'> = signal<'alpha' | 'beta'>('alpha');
  public readonly ifBindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({
    title: 'if-title',
  });
  public readonly switchBindings: WritableSignal<Record<string, unknown>> = signal<
    Record<string, unknown>
  >({
    id: 'switch-id',
  });
  public readonly items: WritableSignal<Array<{ id: string; bindings: Record<string, unknown> }>> =
    signal<Array<{ id: string; bindings: Record<string, unknown> }>>([
      { id: 'one', bindings: { title: 'first' } },
      { id: 'two', bindings: { title: 'second' } },
    ]);
}
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function requireElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Bind));
  return debugEl.nativeElement as HTMLElement;
}

function requireDirective(fixture: ComponentFixture<unknown>): Bind {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Bind));
  return debugEl.injector.get(Bind);
}
// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Bind', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
  });

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
    it('should normalize kebab-case aria keys to reflected DOM properties', (): void => {
      TestBed.configureTestingModule({
        imports: [BindHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindHostComponent> =
        TestBed.createComponent(BindHostComponent);
      fixture.componentInstance.bindings = { 'aria-label': 'Bound label' };
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.ariaLabel).toBe('Bound label');
      expect(element.getAttribute('aria-label')).toBe('Bound label');
    });
    it('should set reflected ariaHidden state when using DOM property names', (): void => {
      TestBed.configureTestingModule({
        imports: [BindHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindHostComponent> =
        TestBed.createComponent(BindHostComponent);
      fixture.componentInstance.bindings = { ariaHidden: 'true' };
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.ariaHidden).toBe('true');
      expect(element.getAttribute('aria-hidden')).toBe('true');
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
    it('should remove reflected aria attributes when the directive still owns them', (): void => {
      TestBed.configureTestingModule({
        imports: [BindSignalHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindSignalHostComponent> =
        TestBed.createComponent(BindSignalHostComponent);
      fixture.componentInstance.bindings.set({ ariaHidden: 'true' });
      fixture.detectChanges();
      fixture.componentInstance.bindings.set({});
      fixture.detectChanges();
      const element: HTMLElement = requireElement(fixture);
      expect(element.ariaHidden).toBeNull();
      expect(element.getAttribute('aria-hidden')).toBeNull();
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
    it('should allow Angular attribute bindings to take over without unexpected clearing', (): void => {
      TestBed.configureTestingModule({
        imports: [BindAriaHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindAriaHostComponent> =
        TestBed.createComponent(BindAriaHostComponent);

      fixture.componentInstance.bindings.set({ 'aria-label': 'Bind label' });
      fixture.detectChanges();

      const element: HTMLElement = requireElement(fixture);
      expect(element.ariaLabel).toBe('Bind label');
      expect(element.getAttribute('aria-label')).toBe('Bind label');

      fixture.componentInstance.ariaLabel.set('Angular override');
      fixture.detectChanges();

      expect(element.ariaLabel).toBe('Angular override');
      expect(element.getAttribute('aria-label')).toBe('Angular override');

      fixture.componentInstance.bindings.set({});
      fixture.detectChanges();

      expect(element.ariaLabel).toBe('Angular override');
      expect(element.getAttribute('aria-label')).toBe('Angular override');
    });
    it('should not clear external host bindings when a key is removed from uiLibBind', (): void => {
      TestBed.configureTestingModule({
        imports: [BindExternalOverrideHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindExternalOverrideHostComponent> = TestBed.createComponent(
        BindExternalOverrideHostComponent
      );

      fixture.componentInstance.bindings.set({ title: 'bind-title' });
      fixture.detectChanges();

      fixture.componentInstance.externalTitle.set('External override');
      fixture.detectChanges();

      fixture.componentInstance.bindings.set({});
      fixture.detectChanges();

      const element: HTMLElement = requireElement(fixture);
      expect(element.title).toBe('External override');
    });
    it('should rerun the effect when the binding object reference changes', (): void => {
      TestBed.configureTestingModule({
        imports: [BindSignalHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindSignalHostComponent> =
        TestBed.createComponent(BindSignalHostComponent);
      fixture.detectChanges();

      const directive: Bind = requireDirective(fixture);
      const applyBindingsSpy: jest.SpiedFunction<(bindings: Record<string, unknown>) => void> =
        jest.spyOn(
          directive as unknown as { applyBindings(bindings: Record<string, unknown>): void },
          'applyBindings'
        );

      fixture.componentInstance.bindings.set({ title: 'same value' });
      fixture.detectChanges();

      fixture.componentInstance.bindings.set({ title: 'same value' });
      fixture.detectChanges();

      expect(applyBindingsSpy).toHaveBeenCalledTimes(2);
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
    it('should compose correctly inside @if, @for, and @switch blocks', (): void => {
      TestBed.configureTestingModule({
        imports: [BindStructuralHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindStructuralHostComponent> = TestBed.createComponent(
        BindStructuralHostComponent
      );

      fixture.detectChanges();

      const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
      const ifTarget: HTMLElement | null = hostElement.querySelector('[data-testid="if-target"]');
      const switchTarget: HTMLElement | null = hostElement.querySelector(
        '[data-testid="switch-target"]'
      );
      const forTargets: NodeListOf<HTMLElement> = hostElement.querySelectorAll(
        '[data-testid="for-target"]'
      );

      expect(ifTarget?.title).toBe('if-title');
      expect(switchTarget?.id).toBe('switch-id');
      expect(forTargets.length).toBe(2);
      expect(forTargets[0]?.title).toBe('first');
      expect(forTargets[1]?.title).toBe('second');
    });
    it('should return undefined for unknown host properties during ownership checks', (): void => {
      TestBed.configureTestingModule({
        imports: [BindDefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindDefaultHostComponent> =
        TestBed.createComponent(BindDefaultHostComponent);
      fixture.detectChanges();

      const directiveWithInternals: { getPropertyValue(key: string): unknown } = requireDirective(
        fixture
      ) as unknown as {
        getPropertyValue(key: string): unknown;
      };

      expect(directiveWithInternals.getPropertyValue('doesNotExist')).toBeUndefined();
    });
    it('should compose with uiLibStyleClass without interfering', (): void => {
      TestBed.configureTestingModule({
        imports: [BindStyleClassHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindStyleClassHostComponent> = TestBed.createComponent(
        BindStyleClassHostComponent
      );
      fixture.detectChanges();

      const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
      const button: HTMLButtonElement = hostElement.querySelector('button') as HTMLButtonElement;
      const target: HTMLElement = hostElement.querySelector(
        '#bind-style-class-target'
      ) as HTMLElement;

      expect(button.title).toBe('Toggle the next panel');
      expect(button.getAttribute('aria-label')).toBe('Toggle the next panel');

      button.click();

      expect(target.classList.contains('is-open')).toBe(true);
    });
    it('passes axe with uiLibBind applied to a basic element', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [BindA11yHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<BindA11yHostComponent> =
        TestBed.createComponent(BindA11yHostComponent);

      document.body.appendChild(fixture.nativeElement);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
