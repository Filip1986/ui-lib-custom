import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { BottomSheet } from './bottom-sheet';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ── Host component for a11y tests ─────────────────────────────────────────

@Component({
  standalone: true,
  imports: [BottomSheet],
  template: `
    <button type="button" class="sheet-trigger" (click)="visible.set(true)">Open Sheet</button>

    <ui-lib-bottom-sheet
      [(visible)]="visible"
      [header]="header"
      [showBackdrop]="showBackdrop"
      [closeOnEscape]="closeOnEscape"
    >
      @if (!noFocusableElements) {
        <button type="button" class="first-focusable">First Action</button>
        <button type="button" class="second-focusable">Second Action</button>
      } @else {
        <div class="static-content">No actions available</div>
      }
      <div bottomSheetFooter>
        @if (!noFocusableElements) {
          <button type="button" class="footer-action">Footer Action</button>
        }
      </div>
    </ui-lib-bottom-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BottomSheetA11yHostComponent {
  public readonly visible: WritableSignal<boolean> = signal<boolean>(false);
  public header: string = 'Sheet Title';
  public showBackdrop: boolean = true;
  public closeOnEscape: boolean = true;
  public noFocusableElements: boolean = false;
}

// ── Helpers ───────────────────────────────────────────────────────────────

describe('BottomSheet Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [BottomSheet, BottomSheetA11yHostComponent],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.classList.remove('ui-lib-bottom-sheet-scroll-lock');
  });

  function createHost(
    initialState: Partial<BottomSheetA11yHostComponent> = {}
  ): ComponentFixture<BottomSheetA11yHostComponent> {
    const fixture: ComponentFixture<BottomSheetA11yHostComponent> = TestBed.createComponent(
      BottomSheetA11yHostComponent
    );
    Object.assign(fixture.componentInstance, initialState);
    fixture.detectChanges();
    return fixture;
  }

  function getSheetComponent(fixture: ComponentFixture<BottomSheetA11yHostComponent>): BottomSheet {
    const debugElement: DebugElement = fixture.debugElement.query(By.directive(BottomSheet));
    return debugElement.componentInstance as BottomSheet;
  }

  function getPanel(fixture: ComponentFixture<BottomSheetA11yHostComponent>): HTMLElement {
    const panel: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-bottom-sheet__panel'
    );
    if (!panel) {
      throw new Error('Expected sheet panel to exist.');
    }
    return panel;
  }

  async function detectAndFlush<T>(fixture: ComponentFixture<T>): Promise<void> {
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();
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

  // ── axe-core automated checks ────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe on open sheet with header — no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Share Options',
      });
      document.body.appendChild(fixture.nativeElement);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe on closed sheet — no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Share Options',
      });
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe on open sheet with close button visible — no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Actions',
      });
      document.body.appendChild(fixture.nativeElement);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── ARIA attribute tests ─────────────────────────────────────────────────

  describe('ARIA attribute tests', (): void => {
    it('panel has role="dialog"', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('role')).toBe('dialog');
    });

    it('panel has aria-modal="true" when open', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-modal')).toBe('true');
    });

    it('panel does not have aria-modal when sheet is closed', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-modal')).toBeNull();
    });

    it('panel has aria-labelledby pointing to the title element when header is set', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'My Sheet',
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();

      const titleEl: Element | null = labelledById
        ? (fixture.nativeElement as HTMLElement).querySelector(`#${labelledById}`)
        : null;
      expect(titleEl).toBeTruthy();
      expect((titleEl as HTMLElement).textContent!.trim()).toBe('My Sheet');
    });

    it('panel has no aria-labelledby when header is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({ header: '' });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-labelledby')).toBeNull();
    });

    it('title element has an id matching panel aria-labelledby', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Test Header',
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      const titleEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-bottom-sheet__title'
      );
      expect(titleEl?.getAttribute('id')).toBe(labelledById);
    });

    it('host has aria-hidden="true" when sheet is closed', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      await detectAndFlush(fixture);

      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-bottom-sheet'
      )!;
      expect(host.getAttribute('aria-hidden')).toBe('true');
    });

    it('host does not hide content from screen readers when sheet is open', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-bottom-sheet'
      )!;
      expect(host.getAttribute('aria-hidden')).not.toBe('true');
    });

    it('backdrop has aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const backdrop: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-bottom-sheet__backdrop'
      );
      expect(backdrop?.getAttribute('aria-hidden')).toBe('true');
    });

    it('close button has an accessible name', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Sheet Title',
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const closeBtn: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-bottom-sheet__close'
      );
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close');
    });

    it('close button icon SVG is decorative (aria-hidden="true")', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Sheet Title',
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const icon: SVGElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-bottom-sheet__close svg'
      );
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('panel does not have a redundant aria-hidden attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      // aria-hidden belongs only on the host, not the panel itself
      expect(getPanel(fixture).hasAttribute('aria-hidden')).toBe(false);
    });
  });

  // ── Focus management tests ───────────────────────────────────────────────

  describe('Focus management tests', (): void => {
    it('focus wraps at the last focusable element (Tab → first)', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({ header: '' });
      document.body.appendChild(fixture.nativeElement);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const sheet: BottomSheet = getSheetComponent(fixture);
      (sheet as unknown as { focusTrap: { activate: () => void } | null }).focusTrap?.activate();

      const firstFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.first-focusable');
      const footerAction: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.footer-action'
      );
      if (!firstFocusable || !footerAction) {
        throw new Error('Expected focusable elements to exist.');
      }

      footerAction.focus();
      const defaultPrevented: boolean = dispatchTab(footerAction);

      expect(defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(firstFocusable);
    });

    it('focus wraps at the first focusable element (Shift+Tab → last)', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({ header: '' });
      document.body.appendChild(fixture.nativeElement);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const sheet: BottomSheet = getSheetComponent(fixture);
      (sheet as unknown as { focusTrap: { activate: () => void } | null }).focusTrap?.activate();

      const firstFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.first-focusable');
      const footerAction: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.footer-action'
      );
      if (!firstFocusable || !footerAction) {
        throw new Error('Expected focusable elements to exist.');
      }

      firstFocusable.focus();
      const defaultPrevented: boolean = dispatchTab(firstFocusable, true);

      expect(defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(footerAction);
    });

    it('when sheet has no focusable elements, focus falls back to the panel', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        noFocusableElements: true,
        header: '',
      });
      document.body.appendChild(fixture.nativeElement);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const sheet: BottomSheet = getSheetComponent(fixture);
      (sheet as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      expect(document.activeElement).toBe(getPanel(fixture));
    });

    it('focus returns to trigger element when sheet closes', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({ header: '' });
      document.body.appendChild(fixture.nativeElement);

      const trigger: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        '.sheet-trigger'
      )!;
      trigger.focus();

      const sheet: BottomSheet = getSheetComponent(fixture);
      (sheet as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      fixture.componentInstance.visible.set(false);
      await detectAndFlush(fixture);
      (sheet as unknown as { deactivateFocusTrap: () => void }).deactivateFocusTrap();

      expect(document.activeElement).toBe(trigger);
    });
  });

  // ── Keyboard interaction tests ───────────────────────────────────────────

  describe('Keyboard interaction tests', (): void => {
    it('Escape key closes the sheet when closeOnEscape is true', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        closeOnEscape: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.visible()).toBe(false);
    });

    it('Escape key does NOT close the sheet when closeOnEscape is false', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        closeOnEscape: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.visible()).toBe(true);
    });
  });

  // ── Unique instance ID tests ─────────────────────────────────────────────

  describe('Unique instance ID tests', (): void => {
    it('each BottomSheet instance has a unique titleId', async (): Promise<void> => {
      const fixture1: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Sheet One',
      });
      const fixture2: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Sheet Two',
      });
      fixture1.componentInstance.visible.set(true);
      fixture2.componentInstance.visible.set(true);
      await detectAndFlush(fixture1);
      await detectAndFlush(fixture2);

      const sheet1: BottomSheet = getSheetComponent(fixture1);
      const sheet2: BottomSheet = getSheetComponent(fixture2);

      expect((sheet1 as unknown as { titleId: string }).titleId).not.toBe(
        (sheet2 as unknown as { titleId: string }).titleId
      );
    });

    it('titleId follows the expected naming pattern', async (): Promise<void> => {
      const fixture: ComponentFixture<BottomSheetA11yHostComponent> = createHost({
        header: 'Test',
      });
      await detectAndFlush(fixture);

      const sheet: BottomSheet = getSheetComponent(fixture);
      const titleId: string = (sheet as unknown as { titleId: string }).titleId;
      expect(titleId).toMatch(/^ui-lib-bottom-sheet-\d+-title$/);
    });
  });
});
