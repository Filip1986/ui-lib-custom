import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DIALOG_DEFAULTS } from './dialog.constants';
import type { DialogPosition } from './dialog.types';

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
    <ui-lib-dialog
      [(visible)]="visible"
      [header]="header"
      [modal]="modal"
      [closable]="closable"
      [closeOnEscape]="closeOnEscape"
      [dismissableMask]="dismissableMask"
      [draggable]="draggable"
      [maximizable]="maximizable"
      [blockScroll]="blockScroll"
      [position]="position"
      [breakpoints]="breakpoints"
      [ariaLabelledBy]="ariaLabelledBy"
      [headless]="headless"
      (show)="onShow()"
      (hide)="onHide()"
      (maximize)="onMaximize($event)"
    >
      @if (projectHeader) {
        <span uiLibDialogHeader class="projected-header">Projected Header</span>
      }
      <div class="projected-content">Projected Body Content</div>
      @if (projectFooter) {
        <div uiLibDialogFooter class="projected-footer">Projected Footer</div>
      }
      @if (projectHeadless) {
        <section uiLibDialogHeadless class="headless-content">Headless Content</section>
      }
    </ui-lib-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DialogHostComponent {
  public visible: boolean = false;
  public header: string = '';
  public modal: boolean = false;
  public closable: boolean = true;
  public closeOnEscape: boolean = true;
  public dismissableMask: boolean = false;
  public draggable: boolean = false;
  public maximizable: boolean = false;
  public blockScroll: boolean = true;
  public position: DialogPosition = 'center';
  public breakpoints: Record<string, string> = {};
  public ariaLabelledBy?: string;
  public headless: boolean = false;
  public projectHeader: boolean = true;
  public projectFooter: boolean = true;
  public projectHeadless: boolean = true;

  public showCount: number = 0;
  public hideCount: number = 0;
  public maximizePayloads: Array<{ maximized: boolean }> = [];

  public onShow(): void {
    this.showCount += 1;
  }

  public onHide(): void {
    this.hideCount += 1;
  }

  public onMaximize(event: { maximized: boolean }): void {
    this.maximizePayloads.push(event);
  }
}

describe('DialogComponent', (): void => {
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
      imports: [DialogComponent, DialogHostComponent],
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

  function createStandaloneDialog(): ComponentFixture<DialogComponent> {
    const fixture: ComponentFixture<DialogComponent> = TestBed.createComponent(DialogComponent);
    fixture.detectChanges();
    return fixture;
  }

  function createHostDialog(
    initial: Partial<DialogHostComponent> = {}
  ): ComponentFixture<DialogHostComponent> {
    const fixture: ComponentFixture<DialogHostComponent> =
      TestBed.createComponent(DialogHostComponent);
    Object.assign(fixture.componentInstance, initial);
    fixture.detectChanges();
    return fixture;
  }

  async function detectAndFlush<T>(fixture: ComponentFixture<T>): Promise<void> {
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();
  }

  function getHostElement(fixture: ComponentFixture<DialogHostComponent>): HTMLElement {
    const host: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-dialog'
    );
    if (!host) {
      throw new Error('Expected dialog host element to exist.');
    }
    return host;
  }

  function getPanelElement(fixture: ComponentFixture<DialogHostComponent>): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-dialog-panel');
  }

  function getRequiredPanelElement(fixture: ComponentFixture<DialogHostComponent>): HTMLElement {
    const panel: HTMLElement | null = getPanelElement(fixture);
    if (!panel) {
      throw new Error('Expected dialog panel to exist.');
    }
    return panel;
  }

  function createPointerEvent(type: string, options: Partial<PointerEventInit>): Event {
    const pointerId: number = options.pointerId ?? 1;
    const button: number = options.button ?? 0;
    const clientX: number = options.clientX ?? 0;
    const clientY: number = options.clientY ?? 0;

    if (typeof PointerEvent === 'function') {
      return new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId,
        button,
        clientX,
        clientY,
      });
    }

    const mouseEvent: MouseEvent = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      button,
      clientX,
      clientY,
    });

    Object.defineProperty(mouseEvent, 'pointerId', {
      configurable: true,
      value: pointerId,
    });

    return mouseEvent;
  }

  describe('Creation & Defaults', (): void => {
    it('should create the component', (): void => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should not render dialog panel when visible is false', (): void => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({ visible: false });
      expect(getPanelElement(fixture)).toBeNull();
    });

    it('should render dialog panel when visible is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({ visible: true });
      await detectAndFlush(fixture);

      expect(getPanelElement(fixture)).toBeTruthy();
    });

    it('should have correct default values for all inputs', (): void => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      const component: DialogComponent = fixture.componentInstance;

      expect(component.visible()).toBe(DIALOG_DEFAULTS.Visible);
      expect(component.header()).toBe(DIALOG_DEFAULTS.Header);
      expect(component.modal()).toBe(DIALOG_DEFAULTS.Modal);
      expect(component.closable()).toBe(DIALOG_DEFAULTS.Closable);
      expect(component.closeOnEscape()).toBe(DIALOG_DEFAULTS.CloseOnEscape);
      expect(component.dismissableMask()).toBe(DIALOG_DEFAULTS.DismissableMask);
      expect(component.draggable()).toBe(DIALOG_DEFAULTS.Draggable);
      expect(component.maximizable()).toBe(DIALOG_DEFAULTS.Maximizable);
      expect(component.blockScroll()).toBe(DIALOG_DEFAULTS.BlockScroll);
      expect(component.position()).toBe(DIALOG_DEFAULTS.Position);
      expect(component.breakpoints()).toEqual(DIALOG_DEFAULTS.Breakpoints);
      expect(component.variant()).toBeUndefined();
      expect(component.ariaLabelledBy()).toBeUndefined();
      expect(component.headless()).toBe(DIALOG_DEFAULTS.Headless);
    });
  });

  describe('Visibility', (): void => {
    it('should show dialog when visible is set to true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-panel'
      );
      expect(panel).toBeTruthy();
    });

    it('should hide dialog when visible is set to false', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      fixture.componentInstance.visible.set(false);
      await detectAndFlush(fixture);

      const panel: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-panel'
      );
      expect(panel).toBeNull();
    });

    it('should emit visibleChange when closing', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
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

      closeButton.click();
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible).toBe(false);
    });

    it('should emit onShow after opening', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      const showSpy: jest.Mock<void, []> = jest.fn<void, []>();
      fixture.componentInstance.show.subscribe((): void => showSpy());

      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);
      await Promise.resolve();

      expect(showSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit onHide after closing', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      const hideSpy: jest.Mock<void, []> = jest.fn<void, []>();
      fixture.componentInstance.hide.subscribe((): void => hideSpy());

      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);
      hideSpy.mockClear();

      fixture.componentInstance.visible.set(false);
      await detectAndFlush(fixture);
      await Promise.resolve();

      expect(hideSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modal & Backdrop', (): void => {
    it('should render backdrop when modal is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('modal', true);
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.hostClasses()).toContain('ui-lib-dialog--modal');
    });

    it('should not render backdrop when modal is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        modal: false,
      });
      await detectAndFlush(fixture);

      const backdrop: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-backdrop'
      );
      expect(backdrop).toBeNull();
    });

    it('should close on backdrop click when dismissableMask is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('dismissableMask', true);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      fixture.componentInstance.onBackdropClick();

      expect(fixture.componentInstance.visible()).toBe(false);
    });

    it('should not close on backdrop click when dismissableMask is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('dismissableMask', false);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      fixture.componentInstance.onBackdropClick();

      expect(fixture.componentInstance.visible()).toBe(true);
    });

    it('should add overflow hidden to body when modal + blockScroll', async (): Promise<void> => {
      document.body.style.overflow = 'auto';
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('modal', true);
      fixture.componentRef.setInput('blockScroll', true);
      await detectAndFlush(fixture);

      (fixture.componentInstance as unknown as { applyScrollLock: () => void }).applyScrollLock();

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should remove overflow hidden on close', async (): Promise<void> => {
      document.body.style.overflow = 'scroll';
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('modal', true);
      fixture.componentRef.setInput('blockScroll', true);
      await detectAndFlush(fixture);

      (fixture.componentInstance as unknown as { applyScrollLock: () => void }).applyScrollLock();
      (
        fixture.componentInstance as unknown as { releaseScrollLock: () => void }
      ).releaseScrollLock();

      expect(document.body.style.overflow).toBe('scroll');
    });

    it('should set aria-modal="true" when modal', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('modal', true);
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.modal()).toBe(true);
    });
  });

  describe('Close Behaviors', (): void => {
    it('should render close button when closable is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        closable: true,
      });
      await detectAndFlush(fixture);

      const closeButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-close-btn'
      );
      expect(closeButton).toBeTruthy();
    });

    it('should hide close button when closable is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        closable: false,
      });
      await detectAndFlush(fixture);

      const closeButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-close-btn'
      );
      expect(closeButton).toBeNull();
    });

    it('should close on Escape key when closeOnEscape is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        closeOnEscape: true,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible).toBe(false);
    });

    it('should not close on Escape when closeOnEscape is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        closeOnEscape: false,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.visible).toBe(true);
      expect(getPanelElement(fixture)).toBeTruthy();
    });
  });

  describe('Content Projection', (): void => {
    it('should project default content into dialog body', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({ visible: true });
      await detectAndFlush(fixture);

      const content: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.projected-content'
      );
      expect(content).toBeTruthy();
      expect((content as HTMLElement).textContent).toContain('Projected Body Content');
    });

    it('should project header content via uiLibDialogHeader', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        projectHeader: true,
      });
      await detectAndFlush(fixture);

      const title: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-title'
      );
      expect((title as HTMLElement).textContent.trim()).toContain('Projected Header');
    });

    it('should project footer content via uiLibDialogFooter', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        projectFooter: true,
      });
      await detectAndFlush(fixture);

      const footer: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.projected-footer'
      );
      expect(footer).toBeTruthy();
      expect((footer as HTMLElement).textContent.trim()).toBe('Projected Footer');
    });

    it('should display header text from header input when no projected header', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        header: 'Header From Input',
        projectHeader: false,
      });
      await detectAndFlush(fixture);

      const title: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-title'
      );
      expect((title as HTMLElement).textContent.trim()).toBe('Header From Input');
    });

    it('should render headless content when headless is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        headless: true,
        projectHeadless: true,
      });
      await detectAndFlush(fixture);

      const headlessContent: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.headless-content');
      expect(headlessContent).toBeTruthy();
      expect(getPanelElement(fixture)).toBeNull();
    });
  });

  describe('Positioning', (): void => {
    it('should apply center positioning by default', (): void => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog();
      const hostElement: HTMLElement = getHostElement(fixture);
      expect(hostElement.className).toContain('ui-lib-dialog--position-center');
    });

    it('should apply correct CSS classes for each of the 9 positions', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      const positions: DialogPosition[] = [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ];

      for (const position of positions) {
        fixture.componentRef.setInput('position', position);
        await detectAndFlush(fixture);
        expect(fixture.componentInstance.positionClass()).toBe(
          `ui-lib-dialog--position-${position}`
        );
      }
    });
  });

  describe('Maximizable', (): void => {
    it('should show maximize button when maximizable is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        maximizable: true,
      });
      await detectAndFlush(fixture);

      const maximizeButton: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-dialog-maximize-btn');
      expect(maximizeButton).toBeTruthy();
    });

    it('should toggle maximized state on button click', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
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

      maximizeButton.click();
      await detectAndFlush(fixture);
      expect(getRequiredPanelElement(fixture).className).toContain(
        'ui-lib-dialog-panel--maximized'
      );

      maximizeButton.click();
      await detectAndFlush(fixture);
      expect(getRequiredPanelElement(fixture).className).not.toContain(
        'ui-lib-dialog-panel--maximized'
      );
    });

    it('should emit onMaximize with correct payload', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
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

      maximizeButton.click();
      await detectAndFlush(fixture);
      maximizeButton.click();
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.maximizePayloads).toEqual([
        { maximized: true },
        { maximized: false },
      ]);
    });

    it('should apply maximized CSS class', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
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

      maximizeButton.click();
      await detectAndFlush(fixture);

      expect(getRequiredPanelElement(fixture).className).toContain(
        'ui-lib-dialog-panel--maximized'
      );
    });

    it('should restore size when un-maximized', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
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

      maximizeButton.click();
      await detectAndFlush(fixture);
      const panelWhenMaximized: HTMLElement = getRequiredPanelElement(fixture);
      expect(panelWhenMaximized.style.width).toBe('100vw');

      maximizeButton.click();
      await detectAndFlush(fixture);
      const panelWhenRestored: HTMLElement = getRequiredPanelElement(fixture);
      expect(panelWhenRestored.style.width).toBe('');
      expect(panelWhenRestored.style.transform).toBe('translate(0px, 0px)');
    });
  });

  describe('Draggable', (): void => {
    it('should allow dragging when draggable is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        draggable: true,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      const header: HTMLElement | null = panel.querySelector('.ui-lib-dialog-header');
      if (!header) {
        throw new Error('Expected dialog header to exist.');
      }

      jest.spyOn(panel, 'getBoundingClientRect').mockReturnValue({
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        top: 100,
        right: 400,
        bottom: 300,
        left: 100,
        toJSON: (): object => ({}),
      } as DOMRect);

      header.dispatchEvent(
        createPointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: 120, clientY: 130 })
      );
      window.dispatchEvent(
        createPointerEvent('pointermove', { pointerId: 1, clientX: 170, clientY: 180 })
      );
      window.dispatchEvent(createPointerEvent('pointerup', { pointerId: 1 }));
      await detectAndFlush(fixture);

      expect(getRequiredPanelElement(fixture).style.transform).toBe('translate(50px, 50px)');
    });

    it('should not allow dragging when draggable is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        draggable: false,
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      const header: HTMLElement | null = panel.querySelector('.ui-lib-dialog-header');
      if (!header) {
        throw new Error('Expected dialog header to exist.');
      }

      header.dispatchEvent(
        createPointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: 120, clientY: 130 })
      );
      window.dispatchEvent(
        createPointerEvent('pointermove', { pointerId: 1, clientX: 170, clientY: 180 })
      );
      await detectAndFlush(fixture);

      expect(getRequiredPanelElement(fixture).style.transform).toBe('translate(0px, 0px)');
    });

    it('should reset drag position when dialog closes', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('draggable', true);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      const panel: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-panel'
      );
      if (!panel) {
        throw new Error('Expected dialog panel to exist.');
      }
      const header: HTMLElement | null = panel.querySelector('.ui-lib-dialog-header');
      if (!header) {
        throw new Error('Expected dialog header to exist.');
      }

      jest.spyOn(panel, 'getBoundingClientRect').mockReturnValue({
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        top: 100,
        right: 400,
        bottom: 300,
        left: 100,
        toJSON: (): object => ({}),
      } as DOMRect);

      header.dispatchEvent(
        createPointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: 120, clientY: 130 })
      );
      window.dispatchEvent(
        createPointerEvent('pointermove', { pointerId: 1, clientX: 170, clientY: 180 })
      );
      window.dispatchEvent(createPointerEvent('pointerup', { pointerId: 1 }));
      await detectAndFlush(fixture);

      fixture.componentInstance.visible.set(false);
      await detectAndFlush(fixture);
      fixture.componentInstance.visible.set(true);
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.panelStyles()['transform']).toBe('translate(0px, 0px)');
    });

    it('should disable drag when maximized', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        draggable: true,
        maximizable: true,
      });
      await detectAndFlush(fixture);

      const maximizeButton: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-dialog-maximize-btn');
      if (!maximizeButton) {
        throw new Error('Expected maximize button to exist.');
      }
      maximizeButton.click();
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      const header: HTMLElement | null = panel.querySelector('.ui-lib-dialog-header');
      if (!header) {
        throw new Error('Expected dialog header to exist.');
      }

      header.dispatchEvent(
        createPointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: 120, clientY: 130 })
      );
      window.dispatchEvent(
        createPointerEvent('pointermove', { pointerId: 1, clientX: 170, clientY: 180 })
      );
      await detectAndFlush(fixture);

      expect(getRequiredPanelElement(fixture).style.transform).toBe('none');
    });
  });

  describe('Accessibility', (): void => {
    it('should have role="dialog" on the panel', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({ visible: true });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-labelledby pointing to the title element', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        projectHeader: false,
        header: 'Accessible Title',
      });
      await detectAndFlush(fixture);

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      const titleElement: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-title'
      );

      expect(titleElement).toBeTruthy();
      expect(panel.getAttribute('aria-labelledby')).toBe(titleElement?.id ?? null);
    });

    it('should have aria-modal when modal is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('modal', true);
      await detectAndFlush(fixture);

      expect(fixture.componentInstance.modal()).toBe(true);
    });

    it('close button should have aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        closable: true,
      });
      await detectAndFlush(fixture);

      const closeButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-dialog-close-btn'
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close');
    });

    it('maximize button should have correct aria-label (toggles)', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
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

  describe('Edge Cases', (): void => {
    it('should handle rapid open/close without errors', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog();

      await expect(
        (async (): Promise<void> => {
          for (let index: number = 0; index < 5; index += 1) {
            fixture.componentInstance.visible = true;
            await detectAndFlush(fixture);
            fixture.componentInstance.visible = false;
            await detectAndFlush(fixture);
          }
        })()
      ).resolves.not.toThrow();
    });

    it('should clean up scroll lock if component is destroyed while open', async (): Promise<void> => {
      document.body.style.overflow = 'auto';
      const fixture: ComponentFixture<DialogComponent> = createStandaloneDialog();
      fixture.componentRef.setInput('modal', true);
      fixture.componentRef.setInput('blockScroll', true);
      await detectAndFlush(fixture);

      (fixture.componentInstance as unknown as { applyScrollLock: () => void }).applyScrollLock();
      expect(document.body.style.overflow).toBe('hidden');

      fixture.destroy();

      expect(document.body.style.overflow).toBe('auto');
    });

    it('should handle empty breakpoints gracefully', async (): Promise<void> => {
      const fixture: ComponentFixture<DialogHostComponent> = createHostDialog({
        visible: true,
        breakpoints: {},
      });

      await expect(detectAndFlush(fixture)).resolves.toBeUndefined();

      const panel: HTMLElement = getRequiredPanelElement(fixture);
      expect(panel.style.width).toBe('');
    });
  });
});
