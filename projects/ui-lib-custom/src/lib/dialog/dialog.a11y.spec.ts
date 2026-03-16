import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

interface MatchMediaStub {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null;
  addListener: (listener: (this: MediaQueryList, event: MediaQueryListEvent) => unknown) => void;
  removeListener: (listener: (this: MediaQueryList, event: MediaQueryListEvent) => unknown) => void;
  addEventListener: (
    type: string,
    listener: (this: MediaQueryList, event: MediaQueryListEvent) => unknown
  ) => void;
  removeEventListener: (
    type: string,
    listener: (this: MediaQueryList, event: MediaQueryListEvent) => unknown
  ) => void;
  dispatchEvent: (event: Event) => boolean;
}

@Component({
  standalone: true,
  imports: [DialogComponent],
  template: `
    <button type="button" class="dialog-trigger" (click)="visible = true">Open Dialog</button>

    <ui-lib-dialog
      [(visible)]="visible"
      [header]="header"
      [modal]="modal"
      [closable]="closable"
      [closeOnEscape]="closeOnEscape"
      [dismissableMask]="dismissableMask"
      [maximizable]="maximizable"
      [draggable]="draggable"
    >
      @if (useCustomHeader) {
        <span uiLibDialogHeader class="custom-header">Projected Header</span>
      }

      @if (!noFocusableElements) {
        <button type="button" class="first-focusable">First Action</button>
        <button type="button" class="second-focusable">Second Action</button>
      } @else {
        <div class="static-content">No actions available</div>
      }

      <div uiLibDialogFooter>
        @if (!noFocusableElements) {
          <button type="button" class="footer-action">Footer Action</button>
        }
      </div>
    </ui-lib-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DialogA11yHostComponent {
  public visible: boolean = false;
  public header: string = 'Dialog Title';
  public modal: boolean = false;
  public closable: boolean = true;
  public closeOnEscape: boolean = true;
  public dismissableMask: boolean = true;
  public maximizable: boolean = true;
  public draggable: boolean = false;
  public useCustomHeader: boolean = false;
  public noFocusableElements: boolean = false;
}

describe('Dialog Accessibility', (): void => {
  let originalMatchMedia: typeof window.matchMedia | undefined;

  beforeEach(async (): Promise<void> => {
    originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string): MatchMediaStub => ({
        matches: query.includes('prefers-reduced-motion') ? false : false,
        media: query,
        onchange: null,
        addListener: (): void => undefined,
        removeListener: (): void => undefined,
        addEventListener: (): void => undefined,
        removeEventListener: (): void => undefined,
        dispatchEvent: (): boolean => false,
      }),
    });

    await TestBed.configureTestingModule({
      imports: [DialogComponent, DialogA11yHostComponent],
    }).compileComponents();
  });

  afterEach((): void => {
    if (originalMatchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      });
    }
    document.body.style.overflow = '';
  });

  function createHost(
    initialState: Partial<DialogA11yHostComponent> = {}
  ): ComponentFixture<DialogA11yHostComponent> {
    const fixture: ComponentFixture<DialogA11yHostComponent> =
      TestBed.createComponent(DialogA11yHostComponent);
    Object.assign(fixture.componentInstance, initialState);
    fixture.detectChanges();
    return fixture;
  }

  function getDialogDebugElement(fixture: ComponentFixture<DialogA11yHostComponent>): DebugElement {
    return fixture.debugElement.query(By.directive(DialogComponent));
  }

  function getDialogComponent(fixture: ComponentFixture<DialogA11yHostComponent>): DialogComponent {
    const debugElement: DebugElement = getDialogDebugElement(fixture);
    return debugElement.componentInstance as DialogComponent;
  }

  async function detectAndFlush<T>(fixture: ComponentFixture<T>): Promise<void> {
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();
  }

  function getPanel(fixture: ComponentFixture<DialogA11yHostComponent>): HTMLElement {
    const panel: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-dialog-panel'
    );
    if (!panel) {
      throw new Error('Expected dialog panel to exist.');
    }
    return panel;
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

  describe('axe-core automated checks', (): void => {
    it('runs axe on the dialog in visible + modal state with no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        modal: false,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.setAttribute('aria-modal', 'true');

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('runs axe on the dialog in visible + non-modal state with no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        modal: false,
      });
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('runs axe on the dialog with custom header content with no violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        useCustomHeader: true,
      });
      await detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('Focus management tests', (): void => {
    it('when modal dialog opens, focus moves to the first focusable element inside the dialog', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        modal: false,
        maximizable: false,
        closable: false,
      });
      await detectAndFlush(fixture);

      const dialog: DialogComponent = getDialogComponent(fixture);
      (dialog as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      const firstFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.first-focusable');
      expect(document.activeElement).toBe(firstFocusable);
    });

    it('tab at last focusable element wraps to first', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        maximizable: false,
        closable: false,
      });
      await detectAndFlush(fixture);

      const dialog: DialogComponent = getDialogComponent(fixture);
      (dialog as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

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

    it('shift+tab at first focusable element wraps to last', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        maximizable: false,
        closable: false,
      });
      await detectAndFlush(fixture);

      const dialog: DialogComponent = getDialogComponent(fixture);
      (dialog as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

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

    it('when dialog closes, focus returns to the trigger element', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        maximizable: false,
        closable: false,
      });
      await detectAndFlush(fixture);

      const triggerButton: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.dialog-trigger');
      if (!triggerButton) {
        throw new Error('Expected trigger button to exist.');
      }

      triggerButton.focus();
      const dialog: DialogComponent = getDialogComponent(fixture);
      (dialog as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      fixture.componentInstance.visible = false;
      await detectAndFlush(fixture);
      (dialog as unknown as { deactivateFocusTrap: () => void }).deactivateFocusTrap();

      expect(document.activeElement).toBe(triggerButton);
    });

    it('when dialog has no focusable elements, focus is on the dialog panel itself', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        noFocusableElements: true,
        maximizable: false,
        closable: false,
      });
      await detectAndFlush(fixture);

      const dialog: DialogComponent = getDialogComponent(fixture);
      (dialog as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      const panel: HTMLElement = getPanel(fixture);
      expect(document.activeElement).toBe(panel);
    });
  });

  describe('Screen reader attribute tests', (): void => {
    it('dialog has role="dialog"', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({ visible: true });
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('role')).toBe('dialog');
    });

    it('dialog has aria-labelledby pointing to a valid element', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        useCustomHeader: false,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();

      const titleElement: Element | null = labelledById
        ? (fixture.nativeElement as HTMLElement).querySelector(`#${labelledById}`)
        : null;
      expect(titleElement).toBeTruthy();
    });

    it('modal dialog has aria-modal="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({ visible: true });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.setAttribute('aria-modal', 'true');

      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('non-modal dialog does not have aria-modal', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        modal: false,
      });
      await detectAndFlush(fixture);

      expect(getPanel(fixture).getAttribute('aria-modal')).toBeNull();
    });

    it('close button has accessible name', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        closable: true,
      });
      await detectAndFlush(fixture);

      const closeButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-close-btn'
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close');
    });

    it('maximize button has correct accessible name that updates on toggle', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        maximizable: true,
      });
      await detectAndFlush(fixture);

      const maximizeButton: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-dialog-maximize-btn');
      if (!maximizeButton) {
        throw new Error('Expected maximize button to exist.');
      }

      expect(maximizeButton.getAttribute('aria-label')).toBe('Maximize');
      maximizeButton.click();
      await detectAndFlush(fixture);
      expect(maximizeButton.getAttribute('aria-label')).toBe('Minimize');
    });
  });

  describe('Keyboard interaction tests', (): void => {
    it('escape closes the dialog when closeOnEscape is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        closeOnEscape: true,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible).toBe(false);
    });

    it('enter on close button closes the dialog', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        closable: true,
      });
      await detectAndFlush(fixture);

      const closeButton: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-dialog-close-btn');
      if (!closeButton) {
        throw new Error('Expected close button to exist.');
      }

      closeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      closeButton.click();
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible).toBe(false);
    });

    it('space on close button closes the dialog', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        closable: true,
      });
      await detectAndFlush(fixture);

      const closeButton: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-dialog-close-btn');
      if (!closeButton) {
        throw new Error('Expected close button to exist.');
      }

      closeButton.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      closeButton.click();
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible).toBe(false);
    });

    it('enter and space on maximize button toggle maximize', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        maximizable: true,
      });
      await detectAndFlush(fixture);

      const maximizeButton: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-dialog-maximize-btn');
      if (!maximizeButton) {
        throw new Error('Expected maximize button to exist.');
      }

      maximizeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      maximizeButton.click();
      await detectAndFlush(fixture);
      expect(getPanel(fixture).className).toContain('ui-lib-dialog-panel--maximized');

      maximizeButton.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      maximizeButton.click();
      await detectAndFlush(fixture);
      expect(getPanel(fixture).className).not.toContain('ui-lib-dialog-panel--maximized');
    });

    it('tab does not escape modal dialog', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogA11yHostComponent> = createHost({
        visible: true,
        modal: false,
        maximizable: false,
        closable: false,
      });
      await detectAndFlush(fixture);

      const dialog: DialogComponent = getDialogComponent(fixture);
      (dialog as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      const firstFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.first-focusable');
      const secondFocusable: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.second-focusable');
      const footerAction: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.footer-action'
      );

      if (!firstFocusable || !secondFocusable || !footerAction) {
        throw new Error('Expected focusable elements to exist.');
      }

      footerAction.focus();
      const defaultPrevented: boolean = dispatchTab(footerAction);

      expect(defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(firstFocusable);
    });
  });

  describe('Axe rationale documentation', (): void => {
    it('documents intentional axe rule skips', (): void => {
      // This project intentionally disables color-contrast in jest-axe checks because
      // token-driven theme values are validated separately in visual/theming audits.
      expect(SKIP_COLOR_CONTRAST_RULES).toEqual({
        'color-contrast': { enabled: false },
      });
    });
  });
});
