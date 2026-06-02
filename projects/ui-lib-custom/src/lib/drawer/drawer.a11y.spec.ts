import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { Drawer } from './drawer';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ── Host component for a11y tests ──

@Component({
  standalone: true,
  imports: [Drawer],
  template: `
    <button type="button" class="drawer-trigger" (click)="visible.set(true)">Open Drawer</button>

    <ui-lib-drawer
      [(visible)]="visible"
      [header]="header"
      [modal]="modal"
      [showCloseButton]="showCloseButton"
      [closeOnEscape]="closeOnEscape"
      [closeOnBackdrop]="closeOnBackdrop"
      [ariaDescribedby]="ariaDescribedby"
    >
      @if (!noFocusableElements) {
        <button type="button" class="first-focusable">First Action</button>
        <button type="button" class="second-focusable">Second Action</button>
      } @else {
        <div class="static-content">No actions available</div>
      }
      <div drawerFooter>
        @if (!noFocusableElements) {
          <button type="button" class="footer-action">Footer Action</button>
        }
      </div>
    </ui-lib-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DrawerA11yHostComponent {
  public readonly visible: WritableSignal<boolean> = signal<boolean>(false);
  public header: string = 'Drawer Title';
  public modal: boolean = true;
  public showCloseButton: boolean = true;
  public closeOnEscape: boolean = true;
  public closeOnBackdrop: boolean = true;
  public ariaDescribedby: string | undefined = undefined;
  public noFocusableElements: boolean = false;
}

// ── Helpers ──

describe('Drawer Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Drawer, DrawerA11yHostComponent],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.style.overflow = '';
    document.body.classList.remove('ui-lib-drawer-scroll-lock');
  });

  function createHost(
    initialState: Partial<DrawerA11yHostComponent> = {},
  ): ComponentFixture<DrawerA11yHostComponent> {
    const fixture: ComponentFixture<DrawerA11yHostComponent> =
      TestBed.createComponent(DrawerA11yHostComponent);
    Object.assign(fixture.componentInstance, initialState);
    fixture.detectChanges();
    return fixture;
  }

  function getDrawerComponent(fixture: ComponentFixture<DrawerA11yHostComponent>): Drawer {
    const debugElement: DebugElement = fixture.debugElement.query(By.directive(Drawer));
    return debugElement.componentInstance as Drawer;
  }

  function getPanel(fixture: ComponentFixture<DrawerA11yHostComponent>): HTMLElement {
    const panel: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-drawer__panel',
    );
    if (!panel) {
      throw new Error('Expected drawer panel to exist.');
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

  // ── axe-core automated checks ────────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe on drawer in visible + modal state with no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        modal: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe on drawer in visible + non-modal state with no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        modal: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe on drawer without header text (aria-label fallback)', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        header: '',
        showCloseButton: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── ARIA attribute tests ─────────────────────────────────────────────────────

  describe('ARIA attribute tests', (): void => {
    it('panel has role="dialog"', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('role')).toBe('dialog');
    });

    it('modal drawer has aria-modal="true" when open', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({ modal: true });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-modal')).toBe('true');
    });

    it('non-modal drawer does not have aria-modal when open', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({ modal: false });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-modal')).toBeNull();
    });

    it('panel has aria-labelledby pointing to the title element when header is set', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        header: 'My Drawer',
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
      expect((titleEl as HTMLElement).textContent!.trim()).toBe('My Drawer');
    });

    it('panel has aria-label="Drawer" fallback when no header text is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        header: '',
        showCloseButton: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      expect(panel.getAttribute('aria-label')).toBe('Drawer');
      expect(panel.getAttribute('aria-labelledby')).toBeNull();
    });

    it('panel has aria-describedby when ariaDescribedby input is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        ariaDescribedby: 'my-description-id',
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-describedby')).toBe('my-description-id');
    });

    it('panel does not have aria-describedby by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-describedby')).toBeNull();
    });

    it('host has aria-hidden="true" when drawer is closed', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost();
      await detectAndFlush(fixture);

      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-drawer',
      )!;
      expect(host.getAttribute('aria-hidden')).toBe('true');
    });

    it('host aria-hidden is removed when drawer is open', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-drawer',
      )!;
      expect(host.getAttribute('aria-hidden')).toBeNull();
    });

    it('panel does not have a redundant aria-hidden attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      // aria-hidden belongs only on the host, not the panel
      expect(getPanel(fixture).hasAttribute('aria-hidden')).toBe(false);
    });

    it('close button has an accessible name', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        showCloseButton: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const closeButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-drawer__close',
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close');
    });

    it('close button uses inline SVG, not PrimeNG pi icon class', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        showCloseButton: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const svgIcon: SVGElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-drawer__close svg',
      );
      expect(svgIcon).toBeTruthy();

      const piSpan: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-drawer__close .pi',
      );
      expect(piSpan).toBeNull();
    });
  });

  // ── Focus management tests ───────────────────────────────────────────────────

  describe('Focus management tests', (): void => {
    it('focus wraps at the last focusable element (Tab → first)', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        showCloseButton: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const drawer: Drawer = getDrawerComponent(fixture);
      (drawer as unknown as { focusTrap: { activate: () => void } | null }).focusTrap?.activate();

      const firstFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.first-focusable');
      const footerAction: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.footer-action',
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
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        showCloseButton: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const drawer: Drawer = getDrawerComponent(fixture);
      (drawer as unknown as { focusTrap: { activate: () => void } | null }).focusTrap?.activate();

      const firstFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.first-focusable');
      const footerAction: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.footer-action',
      );

      if (!firstFocusable || !footerAction) {
        throw new Error('Expected focusable elements to exist.');
      }

      firstFocusable.focus();
      const defaultPrevented: boolean = dispatchTab(firstFocusable, true);

      expect(defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(footerAction);
    });

    it('when drawer has no focusable elements, focus goes to the panel itself', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        noFocusableElements: true,
        showCloseButton: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const drawer: Drawer = getDrawerComponent(fixture);
      (drawer as unknown as { focusTrap: { activate: () => void } | null }).focusTrap?.activate();

      const panel: HTMLElement = getPanel(fixture);
      expect(document.activeElement).toBe(panel);
    });

    it('when the drawer closes, focus is restored to the trigger element', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        showCloseButton: false,
      });
      await detectAndFlush(fixture);

      // Focus the trigger button and open the drawer via it.
      const triggerButton: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.drawer-trigger');
      if (!triggerButton) {
        throw new Error('Expected trigger button to exist.');
      }
      triggerButton.focus();

      const triggerDebugEl: DebugElement = fixture.debugElement.query(By.css('.drawer-trigger'));
      triggerDebugEl.triggerEventHandler('click', new MouseEvent('click'));
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible()).toBe(true);

      // Close the drawer
      const drawer: Drawer = getDrawerComponent(fixture);
      drawer.close();
      await detectAndFlush(fixture);

      expect(document.activeElement).toBe(triggerButton);
    });
  });

  // ── Keyboard interaction tests ───────────────────────────────────────────────

  describe('Keyboard interaction tests', (): void => {
    it('Escape closes the drawer when closeOnEscape is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        closeOnEscape: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible()).toBe(false);
    });

    it('Escape does not close the drawer when closeOnEscape is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        closeOnEscape: false,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible()).toBe(true);
    });

    it('click on close button closes the drawer', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        showCloseButton: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const closeButton: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-drawer__close');
      if (!closeButton) {
        throw new Error('Expected close button to exist.');
      }

      closeButton.click();
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible()).toBe(false);
    });

    it('click on backdrop closes the drawer when closeOnBackdrop is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DrawerA11yHostComponent> = createHost({
        modal: true,
        closeOnBackdrop: true,
      });
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const backdrop: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-drawer__backdrop',
      );
      if (!backdrop) {
        throw new Error('Expected backdrop to exist.');
      }
      backdrop.click();
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible()).toBe(false);
    });
  });

  // ── Axe rationale documentation ──────────────────────────────────────────────

  describe('Axe rationale documentation', (): void => {
    it('documents intentional axe rule skips', (): void => {
      // Color-contrast checks are intentionally disabled in jest-axe runs because
      // token-driven theme values are validated separately in visual/theming audits.
      expect(SKIP_COLOR_CONTRAST_RULES).toEqual({
        'color-contrast': { enabled: false },
      });
    });
  });
});
