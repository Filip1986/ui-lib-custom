import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Popover } from './popover';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ── Host component ─────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Popover],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="trigger-btn">Open Popover</button>
    <ui-lib-popover
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [header]="headerState()"
      [showCloseButton]="showCloseButtonState()"
      [dismissable]="dismissableState()"
      [closeOnEscape]="closeOnEscapeState()"
    >
      <button type="button" class="popover-action-btn">Action</button>
    </ui-lib-popover>
  `,
})
class PopoverA11yHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerState: WritableSignal<string | null> = signal<string | null>(null);
  public readonly showCloseButtonState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dismissableState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly closeOnEscapeState: WritableSignal<boolean> = signal<boolean>(true);
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getPopoverInstance(fixture: ComponentFixture<PopoverA11yHostComponent>): Popover {
  return fixture.debugElement.query(By.directive(Popover)).componentInstance as Popover;
}

function openPopover(fixture: ComponentFixture<PopoverA11yHostComponent>): void {
  fixture.componentInstance.visibleState.set(true);
  fixture.detectChanges();
  TestBed.flushEffects();
  fixture.detectChanges();
}

function getPanel(host: HTMLElement): HTMLElement {
  const panel: HTMLElement | null = host.querySelector<HTMLElement>('.ui-lib-popover__panel');
  if (!panel) throw new Error('Expected panel to exist');
  return panel;
}

function detectAndFlush(fixture: ComponentFixture<PopoverA11yHostComponent>): void {
  fixture.detectChanges();
  TestBed.flushEffects();
  fixture.detectChanges();
}

// ── Test suite ─────────────────────────────────────────────────────────────────

describe('Popover Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PopoverA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ── Closed state ──────────────────────────────────────────────────────────

  describe('closed state', (): void => {
    it('panel is not in DOM when visible=false', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('.ui-lib-popover__panel')).toBeNull();
    });

    it('no role="dialog" element present when closed', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('[role="dialog"]')).toBeNull();
    });

    it('axe passes in closed state', async (): Promise<void> => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── Open-state ARIA structure ─────────────────────────────────────────────

  describe('open-state ARIA structure', (): void => {
    it('panel has role="dialog"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('panel has aria-modal="false"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-modal')).toBe('false');
    });

    it('panel has tabindex="-1"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('tabindex')).toBe('-1');
    });

    it('panel has aria-label="Popover" when no header is set', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set(null);
      openPopover(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-label')).toBe('Popover');
    });

    it('panel has aria-labelledby pointing to title span when header is set', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set('My Title');
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      const labelledby: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledby).toBeTruthy();
      const titleEl: Element | null = host.querySelector(`#${labelledby}`);
      expect(titleEl).not.toBeNull();
    });

    it('title span id matches aria-labelledby value', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set('Details');
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      const labelledby: string | null = panel.getAttribute('aria-labelledby');
      const popover: Popover = getPopoverInstance(fixture);
      expect(labelledby).toBe(popover.titleId);
      const titleSpan: HTMLElement | null =
        host.querySelector<HTMLElement>('.ui-lib-popover__title');
      expect(titleSpan?.id).toBe(popover.titleId);
    });

    it('title span text matches the header input value', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set('My Popover');
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const titleSpan: HTMLElement | null =
        host.querySelector<HTMLElement>('.ui-lib-popover__title');
      expect(titleSpan?.textContent!.trim()).toBe('My Popover');
    });

    it('panel aria-label is null when header is set (mutual exclusion)', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set('Has Header');
      openPopover(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-label')).toBeNull();
    });

    it('overlay has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const overlay: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__overlay',
      );
      expect(overlay?.getAttribute('aria-hidden')).toBe('true');
    });

    it('arrow has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const arrow: HTMLElement | null = host.querySelector<HTMLElement>('.ui-lib-popover__arrow');
      expect(arrow?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── Close button ──────────────────────────────────────────────────────────

  describe('close button', (): void => {
    it('close button has aria-label="Close"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.showCloseButtonState.set(true);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const closeBtn: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__close-btn',
      );
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close');
    });

    it('close button icon has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.showCloseButtonState.set(true);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const icon: Element | null = host.querySelector('.ui-lib-popover__close-btn svg');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('close button click closes the popover', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.showCloseButtonState.set(true);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const closeBtn: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__close-btn',
      );
      closeBtn?.click();
      detectAndFlush(fixture);
      expect(host.querySelector('.ui-lib-popover__panel')).toBeNull();
    });
  });

  // ── Focus management ──────────────────────────────────────────────────────

  describe('focus management', (): void => {
    it('action button is present and focusable after open', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const actionBtn: HTMLElement | null = host.querySelector<HTMLElement>('.popover-action-btn');
      expect(actionBtn).not.toBeNull();
      expect(actionBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('focus is restored to trigger element when popover closes via close button', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.showCloseButtonState.set(true);
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const triggerBtn: HTMLElement | null = host.querySelector<HTMLElement>('.trigger-btn');
      if (!triggerBtn) throw new Error('trigger button not found');

      triggerBtn.focus();
      const popover: Popover = getPopoverInstance(fixture);
      popover.show(triggerBtn);
      detectAndFlush(fixture);

      const closeBtn: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__close-btn',
      );
      closeBtn?.click();
      detectAndFlush(fixture);

      expect(document.activeElement).toBe(triggerBtn);
    });

    it('focus is restored to trigger element when popover closes via Escape', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const triggerBtn: HTMLElement | null = host.querySelector<HTMLElement>('.trigger-btn');
      if (!triggerBtn) throw new Error('trigger button not found');

      triggerBtn.focus();
      const popover: Popover = getPopoverInstance(fixture);
      popover.show(triggerBtn);
      detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      detectAndFlush(fixture);

      expect(document.activeElement).toBe(triggerBtn);
    });

    it('focus is restored to trigger element when popover closes via overlay click', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const triggerBtn: HTMLElement | null = host.querySelector<HTMLElement>('.trigger-btn');
      if (!triggerBtn) throw new Error('trigger button not found');

      triggerBtn.focus();
      const popover: Popover = getPopoverInstance(fixture);
      popover.show(triggerBtn);
      detectAndFlush(fixture);

      const overlay: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__overlay',
      );
      overlay?.click();
      detectAndFlush(fixture);

      expect(document.activeElement).toBe(triggerBtn);
    });

    it('no focus restoration error when popover closed declaratively without prior show()', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.visibleState.set(true);
      detectAndFlush(fixture);

      // Close declaratively without calling show() first (previousFocusEl is null)
      expect((): void => {
        fixture.componentInstance.visibleState.set(false);
        detectAndFlush(fixture);
      }).not.toThrow();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(hostEl.querySelector('.ui-lib-popover__panel')).toBeNull();
    });
  });

  // ── Keyboard behaviour ────────────────────────────────────────────────────

  describe('keyboard behaviour', (): void => {
    it('Escape closes the popover when closeOnEscape=true', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.closeOnEscapeState.set(true);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      detectAndFlush(fixture);
      expect(host.querySelector('.ui-lib-popover__panel')).toBeNull();
    });

    it('Escape does NOT close when closeOnEscape=false', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.closeOnEscapeState.set(false);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      detectAndFlush(fixture);
      expect(host.querySelector('.ui-lib-popover__panel')).not.toBeNull();
    });

    it('overlay click closes when dismissable=true', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.dismissableState.set(true);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const overlay: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__overlay',
      );
      overlay?.click();
      detectAndFlush(fixture);
      expect(host.querySelector('.ui-lib-popover__panel')).toBeNull();
    });

    it('overlay click does NOT close when dismissable=false', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.dismissableState.set(false);
      openPopover(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const overlay: HTMLElement | null = host.querySelector<HTMLElement>(
        '.ui-lib-popover__overlay',
      );
      overlay?.click();
      detectAndFlush(fixture);
      expect(host.querySelector('.ui-lib-popover__panel')).not.toBeNull();
    });
  });

  // ── panelId ───────────────────────────────────────────────────────────────

  describe('panelId', (): void => {
    it('panel has an id attribute (non-empty string)', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      const idAttr: string | null = panel.getAttribute('id');
      expect(idAttr).toBeTruthy();
      expect(idAttr!.length).toBeGreaterThan(0);
    });

    it('panelId is a public string property on the component instance', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();
      const popover: Popover = getPopoverInstance(fixture);
      expect(typeof popover.panelId).toBe('string');
      expect(popover.panelId.length).toBeGreaterThan(0);
    });

    it('panel id attribute matches the panelId property value', (): void => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      openPopover(fixture);
      const popover: Popover = getPopoverInstance(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('id')).toBe(popover.panelId);
    });
  });

  // ── axe-core automated checks ─────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('closed state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state (no header) passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set(null);
      openPopover(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state (with header) passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set('Popover Title');
      openPopover(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state (with close button) passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<PopoverA11yHostComponent> =
        TestBed.createComponent(PopoverA11yHostComponent);
      fixture.componentInstance.headerState.set('With Close');
      fixture.componentInstance.showCloseButtonState.set(true);
      openPopover(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
