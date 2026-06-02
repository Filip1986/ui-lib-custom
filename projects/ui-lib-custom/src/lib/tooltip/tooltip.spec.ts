import type { WritableSignal } from '@angular/core';
import type { DebugElement } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Tooltip } from './tooltip';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-tooltip-host',
  standalone: true,
  imports: [Tooltip],
  template: `
    <button
      [uiLibTooltip]="textSignal()"
      [tooltipPosition]="positionSignal()"
      [tooltipDisabled]="disabledSignal()"
      [tooltipVariant]="variantSignal()"
    >
      Hover
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipHostComponent {
  public readonly textSignal: WritableSignal<string> = signal<string>('Test tooltip');
  public readonly positionSignal: WritableSignal<'top' | 'bottom' | 'left' | 'right'> = signal<
    'top' | 'bottom' | 'left' | 'right'
  >('top');
  public readonly disabledSignal: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variantSignal: WritableSignal<'material' | 'bootstrap' | 'minimal' | null> =
    signal<'material' | 'bootstrap' | 'minimal' | null>(null);
}

@Component({
  selector: 'app-tooltip-focus-host',
  standalone: true,
  imports: [Tooltip],
  template: `<input uiLibTooltip="Focus tooltip" tooltipEvent="focus" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipFocusHostComponent {}

@Component({
  selector: 'app-tooltip-delay-host',
  standalone: true,
  imports: [Tooltip],
  template: `
    <button
      uiLibTooltip="Delayed tooltip"
      [showDelay]="showDelaySignal()"
      [hideDelay]="hideDelaySignal()"
    >
      Hover
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipDelayHostComponent {
  public readonly showDelaySignal: WritableSignal<number> = signal<number>(300);
  public readonly hideDelaySignal: WritableSignal<number> = signal<number>(0);
}

// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------

function setupHost(): {
  fixture: ComponentFixture<TooltipHostComponent>;
  host: TooltipHostComponent;
  element: HTMLElement;
  directive: Tooltip;
} {
  TestBed.configureTestingModule({
    imports: [TooltipHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<TooltipHostComponent> =
    TestBed.createComponent(TooltipHostComponent);
  fixture.detectChanges();
  const host: TooltipHostComponent = fixture.componentInstance;
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
  const element: HTMLElement = debugEl.nativeElement as HTMLElement;
  const directive: Tooltip = debugEl.injector.get(Tooltip);
  return { fixture, host, element, directive };
}

function dispatchMouseEnter(element: HTMLElement): void {
  element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
}

function dispatchMouseLeave(element: HTMLElement): void {
  element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
}

function getTooltipElement(id: string): HTMLElement | null {
  return document.body.querySelector<HTMLElement>(`#${id}`);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Tooltip', (): void => {
  afterEach((): void => {
    // Remove any lingering tooltip elements from body
    document.querySelectorAll('.ui-lib-tooltip').forEach((el: Element): void => {
      el.remove();
    });
  });

  describe('creation', (): void => {
    it('should create the directive successfully', (): void => {
      const { directive } = setupHost();
      expect(directive).toBeTruthy();
    });

    it('should assign a unique tooltipId', (): void => {
      const { directive } = setupHost();
      expect(directive.tooltipId).toMatch(/^ui-lib-tooltip-\d+$/);
    });

    it('should NOT create a tooltip element on init (lazy creation)', (): void => {
      const { directive } = setupHost();
      expect(getTooltipElement(directive.tooltipId)).toBeNull();
    });
  });

  describe('show on mouseenter', (): void => {
    it('should create a tooltip element in document.body on mouseenter', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      expect(getTooltipElement(directive.tooltipId)).not.toBeNull();
    });

    it('should have role="tooltip" on the tooltip element', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.getAttribute('role')).toBe('tooltip');
    });

    it('should display the tooltip text', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      const textEl: HTMLElement | null =
        tooltipEl?.querySelector<HTMLElement>('.ui-lib-tooltip__text') ?? null;
      expect(textEl?.textContent).toBe('Test tooltip');
    });

    it('should add the base ui-lib-tooltip class', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip')).toBe(true);
    });

    it('should add the position class matching tooltipPosition input', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--pos-top')).toBe(true);
    });

    it('should set aria-describedby on the host element', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      expect(element.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });

    it('should contain an arrow element', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.querySelector('.ui-lib-tooltip__arrow')).not.toBeNull();
    });
  });

  describe('hide on mouseleave', (): void => {
    it('should remove aria-describedby on mouseleave', (): void => {
      const { element } = setupHost();
      dispatchMouseEnter(element);
      dispatchMouseLeave(element);
      expect(element.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should remove the --visible class on mouseleave', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      // Flush rAF so --visible class is added
      jest.runAllTimers();
      dispatchMouseLeave(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--visible')).toBe(false);
    });
  });

  describe('tooltipDisabled', (): void => {
    it('should NOT create a tooltip element when tooltipDisabled is true', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.disabledSignal.set(true);
      fixture.detectChanges();
      dispatchMouseEnter(element);
      expect(getTooltipElement(directive.tooltipId)).toBeNull();
    });

    it('should create the tooltip when tooltipDisabled is false (default)', (): void => {
      const { element, directive } = setupHost();
      dispatchMouseEnter(element);
      expect(getTooltipElement(directive.tooltipId)).not.toBeNull();
    });
  });

  describe('empty text', (): void => {
    it('should NOT create a tooltip element when uiLibTooltip is empty', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.textSignal.set('');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      expect(getTooltipElement(directive.tooltipId)).toBeNull();
    });
  });

  describe('tooltipPosition', (): void => {
    it('should add ui-lib-tooltip--pos-bottom class when position is bottom', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.positionSignal.set('bottom');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--pos-bottom')).toBe(true);
    });

    it('should add ui-lib-tooltip--pos-left class when position is left', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.positionSignal.set('left');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--pos-left')).toBe(true);
    });

    it('should add ui-lib-tooltip--pos-right class when position is right', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.positionSignal.set('right');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--pos-right')).toBe(true);
    });
  });

  describe('tooltipVariant', (): void => {
    it('should add ui-lib-tooltip--material class when variant is material', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.variantSignal.set('material');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--material')).toBe(true);
    });

    it('should add ui-lib-tooltip--bootstrap class when variant is bootstrap', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.variantSignal.set('bootstrap');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--bootstrap')).toBe(true);
    });

    it('should add ui-lib-tooltip--minimal class when variant is minimal', (): void => {
      const { host, element, fixture, directive } = setupHost();
      host.variantSignal.set('minimal');
      fixture.detectChanges();
      dispatchMouseEnter(element);
      const tooltipEl: HTMLElement | null = getTooltipElement(directive.tooltipId);
      expect(tooltipEl?.classList.contains('ui-lib-tooltip--minimal')).toBe(true);
    });
  });

  describe('focus event', (): void => {
    it('should show tooltip on focus when tooltipEvent is focus', (): void => {
      TestBed.configureTestingModule({
        imports: [TooltipFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<TooltipFocusHostComponent> =
        TestBed.createComponent(TooltipFocusHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
      const directive: Tooltip = debugEl.injector.get(Tooltip);
      const inputEl: HTMLElement = debugEl.nativeElement as HTMLElement;

      inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      expect(getTooltipElement(directive.tooltipId)).not.toBeNull();
    });

    it('should hide tooltip on blur when tooltipEvent is focus', (): void => {
      TestBed.configureTestingModule({
        imports: [TooltipFocusHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<TooltipFocusHostComponent> =
        TestBed.createComponent(TooltipFocusHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
      const inputEl: HTMLElement = debugEl.nativeElement as HTMLElement;

      inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      inputEl.dispatchEvent(new FocusEvent('blur', { bubbles: true }));

      expect(inputEl.hasAttribute('aria-describedby')).toBe(false);
    });
  });

  describe('Escape key', (): void => {
    it('should hide the tooltip when Escape is pressed', (): void => {
      const { element } = setupHost();
      dispatchMouseEnter(element);
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(element.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should NOT interfere when tooltip is not visible', (): void => {
      const { element } = setupHost();
      expect((): void => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      }).not.toThrow();
      expect(element.hasAttribute('aria-describedby')).toBe(false);
    });
  });

  describe('showDelay', (): void => {
    beforeEach((): void => {
      jest.useFakeTimers();
    });
    afterEach((): void => {
      jest.useRealTimers();
    });

    it('should not show tooltip immediately when showDelay > 0', (): void => {
      TestBed.configureTestingModule({
        imports: [TooltipDelayHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<TooltipDelayHostComponent> =
        TestBed.createComponent(TooltipDelayHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
      const directive: Tooltip = debugEl.injector.get(Tooltip);
      const element: HTMLElement = debugEl.nativeElement as HTMLElement;

      dispatchMouseEnter(element);
      expect(getTooltipElement(directive.tooltipId)).toBeNull();

      jest.advanceTimersByTime(300);
      expect(getTooltipElement(directive.tooltipId)).not.toBeNull();
    });

    it('should cancel pending show if mouseleave fires before delay', (): void => {
      TestBed.configureTestingModule({
        imports: [TooltipDelayHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<TooltipDelayHostComponent> =
        TestBed.createComponent(TooltipDelayHostComponent);
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
      const directive: Tooltip = debugEl.injector.get(Tooltip);
      const element: HTMLElement = debugEl.nativeElement as HTMLElement;

      dispatchMouseEnter(element);
      dispatchMouseLeave(element);
      jest.advanceTimersByTime(300);

      expect(getTooltipElement(directive.tooltipId)).toBeNull();
    });
  });

  describe('destroy', (): void => {
    it('should remove the tooltip element from body on directive destroy', (): void => {
      const { fixture, element, directive } = setupHost();
      dispatchMouseEnter(element);
      expect(getTooltipElement(directive.tooltipId)).not.toBeNull();
      fixture.destroy();
      expect(getTooltipElement(directive.tooltipId)).toBeNull();
    });

    it('should not throw when destroyed without ever showing the tooltip', (): void => {
      const { fixture } = setupHost();
      expect((): void => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('inputs signal values', (): void => {
    it('uiLibTooltip signal should reflect bound value', (): void => {
      const { host, fixture, directive } = setupHost();
      host.textSignal.set('Updated text');
      fixture.detectChanges();
      expect(directive.uiLibTooltip()).toBe('Updated text');
    });

    it('tooltipPosition signal should default to top', (): void => {
      const { directive } = setupHost();
      expect(directive.tooltipPosition()).toBe('top');
    });

    it('tooltipDisabled signal should default to false', (): void => {
      const { directive } = setupHost();
      expect(directive.tooltipDisabled()).toBe(false);
    });

    it('showDelay signal should default to 0', (): void => {
      const { directive } = setupHost();
      expect(directive.showDelay()).toBe(0);
    });

    it('hideDelay signal should default to 0', (): void => {
      const { directive } = setupHost();
      expect(directive.hideDelay()).toBe(0);
    });
  });
});
