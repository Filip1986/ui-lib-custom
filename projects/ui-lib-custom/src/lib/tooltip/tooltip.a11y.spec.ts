import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { axe } from 'jest-axe';
import { SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

/** Axe rules to skip for tooltip axe checks.
 * - `color-contrast`: skipped globally (no CSS in jsdom).
 * - `region`: skipped because the tooltip is a dynamic overlay appended to `document.body`
 *   outside any landmark — this is intentional and correct ARIA overlay behaviour.
 */
const TOOLTIP_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  region: { enabled: false },
};
import { Tooltip } from './tooltip';
import type { TooltipEvent, TooltipPosition } from './tooltip.types';

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="host-btn"
      [uiLibTooltip]="tooltipText()"
      [tooltipEvent]="tooltipEvent()"
      [tooltipDisabled]="tooltipDisabled()"
      [tooltipPosition]="tooltipPosition()"
    >
      Hover or focus me
    </button>
  `,
})
class TooltipA11yHostComponent {
  public readonly tooltipText: WritableSignal<string> = signal<string>('Helpful hint');
  public readonly tooltipEvent: WritableSignal<TooltipEvent> = signal<TooltipEvent>('hover');
  public readonly tooltipDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tooltipPosition: WritableSignal<TooltipPosition> = signal<TooltipPosition>('top');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDirective(fixture: ComponentFixture<TooltipA11yHostComponent>): Tooltip {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Tooltip));
  return debugEl.injector.get(Tooltip);
}

function getHostEl(fixture: ComponentFixture<TooltipA11yHostComponent>): HTMLElement {
  return fixture.debugElement.query(By.directive(Tooltip)).nativeElement as HTMLElement;
}

function getTooltipEl(id: string): HTMLElement | null {
  return document.body.querySelector<HTMLElement>(`#${id}`);
}

function dispatchFocus(el: HTMLElement): void {
  el.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
}

function dispatchBlur(el: HTMLElement): void {
  el.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
}

function dispatchMouseEnter(el: HTMLElement): void {
  el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
}

function dispatchMouseLeave(el: HTMLElement): void {
  el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Tooltip Accessibility', (): void => {
  let currentFixture: ComponentFixture<TooltipA11yHostComponent> | null = null;

  function createFixture(): ComponentFixture<TooltipA11yHostComponent> {
    TestBed.configureTestingModule({
      imports: [TooltipA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    });
    currentFixture = TestBed.createComponent(TooltipA11yHostComponent);
    currentFixture.detectChanges();
    return currentFixture;
  }

  afterEach((): void => {
    if (currentFixture) {
      currentFixture.destroy();
      currentFixture = null;
    }
    document.querySelectorAll('.ui-lib-tooltip').forEach((el: Element): void => {
      el.remove();
    });
  });

  // -------------------------------------------------------------------------
  // Host-element ARIA attributes
  // -------------------------------------------------------------------------

  describe('host-element ARIA attributes', (): void => {
    it('aria-describedby is absent before any event', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is set to tooltipId on mouseenter', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      expect(hostEl.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });

    it('aria-describedby is set to tooltipId on keyboard focus (hover mode — WCAG 1.4.13)', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      // tooltipEvent defaults to 'hover' — must also bind focus per WCAG 1.4.13
      dispatchFocus(hostEl);
      expect(hostEl.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });

    it('aria-describedby is removed on mouseleave', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchMouseEnter(hostEl);
      dispatchMouseLeave(hostEl);
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is removed on blur', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchFocus(hostEl);
      dispatchBlur(hostEl);
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is set to tooltipId on focus when tooltipEvent="focus"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipEvent.set('focus');
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchFocus(hostEl);
      expect(hostEl.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });

    it('aria-describedby is set to tooltipId on mouseenter when tooltipEvent="both"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipEvent.set('both');
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      expect(hostEl.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });

    it('aria-describedby is set to tooltipId on focus when tooltipEvent="both"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipEvent.set('both');
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchFocus(hostEl);
      expect(hostEl.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });
  });

  // -------------------------------------------------------------------------
  // Tooltip element ARIA structure
  // -------------------------------------------------------------------------

  describe('tooltip element ARIA structure', (): void => {
    it('tooltip element has role="tooltip"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      const tooltipEl: HTMLElement | null = getTooltipEl(directive.tooltipId);
      expect(tooltipEl?.getAttribute('role')).toBe('tooltip');
    });

    it('tooltip element id matches tooltipId property', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      const tooltipEl: HTMLElement | null = getTooltipEl(directive.tooltipId);
      expect(tooltipEl?.id).toBe(directive.tooltipId);
    });

    it('tooltip text content matches uiLibTooltip input', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      const tooltipEl: HTMLElement | null = getTooltipEl(directive.tooltipId);
      const textEl: HTMLElement | null =
        tooltipEl?.querySelector<HTMLElement>('.ui-lib-tooltip__text') ?? null;
      expect(textEl?.textContent!.trim()).toBe('Helpful hint');
    });

    it('arrow element has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      const tooltipEl: HTMLElement | null = getTooltipEl(directive.tooltipId);
      const arrowEl: HTMLElement | null =
        tooltipEl?.querySelector<HTMLElement>('.ui-lib-tooltip__arrow') ?? null;
      expect(arrowEl?.getAttribute('aria-hidden')).toBe('true');
    });

    it('tooltip element exists in document.body (not in fixture nativeElement)', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      const inBody: HTMLElement | null = document.body.querySelector(`#${directive.tooltipId}`);
      const fixtureRoot: HTMLElement = fixture.nativeElement as HTMLElement;
      const inFixture: HTMLElement | null = fixtureRoot.querySelector<HTMLElement>(
        `#${directive.tooltipId}`,
      );
      expect(inBody).not.toBeNull();
      expect(inFixture).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // tooltipId
  // -------------------------------------------------------------------------

  describe('tooltipId', (): void => {
    it('tooltipId is a public string property (non-empty, starts with ui-lib-tooltip-)', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const directive: Tooltip = getDirective(fixture);
      expect(typeof directive.tooltipId).toBe('string');
      expect(directive.tooltipId.length).toBeGreaterThan(0);
      expect(directive.tooltipId).toMatch(/^ui-lib-tooltip-\d+$/);
    });

    it('aria-describedby on host matches tooltipId when visible', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      expect(hostEl.getAttribute('aria-describedby')).toBe(directive.tooltipId);
    });
  });

  // -------------------------------------------------------------------------
  // Keyboard accessibility (WCAG 1.4.13)
  // -------------------------------------------------------------------------

  describe('keyboard accessibility (WCAG 1.4.13)', (): void => {
    it('tooltip shows on keyboard focus when tooltipEvent="hover" (default — WCAG 1.4.13)', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchFocus(hostEl);
      expect(getTooltipEl(directive.tooltipId)).not.toBeNull();
    });

    it('tooltip hides on blur when tooltipEvent="hover" (default)', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchFocus(hostEl);
      dispatchBlur(hostEl);
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('tooltip shows on focus when tooltipEvent="focus"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipEvent.set('focus');
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchFocus(hostEl);
      expect(getTooltipEl(directive.tooltipId)).not.toBeNull();
    });

    it('tooltip shows on focus when tooltipEvent="both"', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipEvent.set('both');
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchFocus(hostEl);
      expect(getTooltipEl(directive.tooltipId)).not.toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Escape key dismissal
  // -------------------------------------------------------------------------

  describe('Escape key dismissal', (): void => {
    it('Escape key dismisses visible tooltip', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchMouseEnter(hostEl);
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is removed after Escape', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchMouseEnter(hostEl);
      expect(hostEl.hasAttribute('aria-describedby')).toBe(true);
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('Escape when tooltip not visible does not throw', (): void => {
      createFixture();
      expect((): void => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      }).not.toThrow();
    });
  });

  // -------------------------------------------------------------------------
  // tooltipDisabled
  // -------------------------------------------------------------------------

  describe('tooltipDisabled', (): void => {
    it('tooltip does not appear on mouseenter when tooltipDisabled=true', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipDisabled.set(true);
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      expect(getTooltipEl(directive.tooltipId)).toBeNull();
    });

    it('aria-describedby is NOT set when tooltipDisabled=true', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipDisabled.set(true);
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchMouseEnter(hostEl);
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('tooltip does NOT appear on focus when tooltipDisabled=true', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipDisabled.set(true);
      fixture.detectChanges();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchFocus(hostEl);
      expect(getTooltipEl(directive.tooltipId)).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Lifecycle and cleanup
  // -------------------------------------------------------------------------

  describe('lifecycle and cleanup', (): void => {
    it('tooltip element is removed from document.body when directive is destroyed', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      expect(getTooltipEl(directive.tooltipId)).not.toBeNull();
      fixture.destroy();
      expect(getTooltipEl(directive.tooltipId)).toBeNull();
    });

    it('aria-describedby is not present on host after directive destroy', (): void => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchMouseEnter(hostEl);
      fixture.destroy();
      expect(hostEl.hasAttribute('aria-describedby')).toBe(false);
    });

    it('tooltip element is absent from body when tooltip is hidden (after hide)', (): void => {
      jest.useFakeTimers();
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      const directive: Tooltip = getDirective(fixture);
      dispatchMouseEnter(hostEl);
      dispatchMouseLeave(hostEl);
      jest.advanceTimersByTime(300); // past TOOLTIP_CLEANUP_DELAY_MS=250
      expect(getTooltipEl(directive.tooltipId)).toBeNull();
      jest.useRealTimers();
    });
  });

  // -------------------------------------------------------------------------
  // axe-core automated checks
  // -------------------------------------------------------------------------

  describe('axe-core automated checks', (): void => {
    it('passes axe (document.body) — closed state, no tooltip visible', async (): Promise<void> => {
      createFixture();
      const results: Awaited<ReturnType<typeof axe>> = await axe(document.body, {
        rules: TOOLTIP_AXE_RULES,
      });
      expect(results.violations.length).toBe(0);
    });

    it('passes axe (document.body) when tooltip is visible via mouseenter', async (): Promise<void> => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchMouseEnter(hostEl);
      const results: Awaited<ReturnType<typeof axe>> = await axe(document.body, {
        rules: TOOLTIP_AXE_RULES,
      });
      expect(results.violations.length).toBe(0);
    });

    it('passes axe (document.body) when tooltip is visible via keyboard focus', async (): Promise<void> => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      const hostEl: HTMLElement = getHostEl(fixture);
      dispatchFocus(hostEl);
      const results: Awaited<ReturnType<typeof axe>> = await axe(document.body, {
        rules: TOOLTIP_AXE_RULES,
      });
      expect(results.violations.length).toBe(0);
    });

    it('passes axe (document.body) when tooltipDisabled=true', async (): Promise<void> => {
      const fixture: ComponentFixture<TooltipA11yHostComponent> = createFixture();
      fixture.componentInstance.tooltipDisabled.set(true);
      fixture.detectChanges();
      const results: Awaited<ReturnType<typeof axe>> = await axe(document.body, {
        rules: TOOLTIP_AXE_RULES,
      });
      expect(results.violations.length).toBe(0);
    });
  });
});
