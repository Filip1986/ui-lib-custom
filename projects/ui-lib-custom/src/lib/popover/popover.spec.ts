import type { DebugElement, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Popover } from './popover';
import type { PopoverVariant } from './popover.types';

function getElement(host: HTMLElement, selector: string): HTMLElement {
  const found: HTMLElement | null = host.querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`Element not found: ${selector}`);
  return found;
}

function getPopoverInstance(fixture: ComponentFixture<TestHostComponent>): Popover {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(Popover));
  return debugEl.componentInstance as Popover;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Popover],
  template: `
    <ui-lib-popover
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [header]="headerState()"
      [showCloseButton]="showCloseButtonState()"
      [dismissable]="dismissableState()"
      [closeOnEscape]="closeOnEscapeState()"
      [variant]="variantState()"
      [styleClass]="styleClassState()"
      (shown)="onShown()"
      (hidden)="onHidden()"
    >
      <p class="test-content">Popover body</p>
    </ui-lib-popover>
  `,
})
class TestHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerState: WritableSignal<string | null> = signal<string | null>(null);
  public readonly showCloseButtonState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dismissableState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly closeOnEscapeState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly variantState: WritableSignal<PopoverVariant | null> =
    signal<PopoverVariant | null>(null);
  public readonly styleClassState: WritableSignal<string | null> = signal<string | null>(null);

  public shownCount: number = 0;
  public hiddenCount: number = 0;

  public onShown(): void {
    this.shownCount += 1;
  }

  public onHidden(): void {
    this.hiddenCount += 1;
  }
}

interface BootstrapOptions {
  visible?: boolean;
  header?: string | null;
  showCloseButton?: boolean;
  dismissable?: boolean;
  closeOnEscape?: boolean;
  variant?: PopoverVariant | null;
  styleClass?: string | null;
}

function createFixture(initial: BootstrapOptions = {}): ComponentFixture<TestHostComponent> {
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  const host: TestHostComponent = fixture.componentInstance;

  if (initial.visible !== undefined) host.visibleState.set(initial.visible);
  if (initial.header !== undefined) host.headerState.set(initial.header);
  if (initial.showCloseButton !== undefined) host.showCloseButtonState.set(initial.showCloseButton);
  if (initial.dismissable !== undefined) host.dismissableState.set(initial.dismissable);
  if (initial.closeOnEscape !== undefined) host.closeOnEscapeState.set(initial.closeOnEscape);
  if (initial.variant !== undefined) host.variantState.set(initial.variant);
  if (initial.styleClass !== undefined) host.styleClassState.set(initial.styleClass);

  fixture.detectChanges();
  return fixture;
}

describe('Popover', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  describe('default state (closed)', (): void => {
    it('should create without error', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should have host class ui-lib-popover', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture();
      const host: HTMLElement = getElement(fixture.nativeElement as HTMLElement, 'ui-lib-popover');
      expect(host.classList.contains('ui-lib-popover')).toBe(true);
    });

    it('should not have open class when visible is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: false });
      const host: HTMLElement = getElement(fixture.nativeElement as HTMLElement, 'ui-lib-popover');
      expect(host.classList.contains('ui-lib-popover--open')).toBe(false);
    });

    it('should not render the panel when not visible', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: false });
      const panel: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-popover__panel');
      expect(panel).toBeNull();
    });
  });

  describe('visible state', (): void => {
    it('should add open class when visible is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const host: HTMLElement = getElement(fixture.nativeElement as HTMLElement, 'ui-lib-popover');
      expect(host.classList.contains('ui-lib-popover--open')).toBe(true);
    });

    it('should render the panel when visible is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const panel: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-popover__panel');
      expect(panel).not.toBeNull();
    });

    it('should render projected content when visible', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const content: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.test-content');
      expect(content).not.toBeNull();
      expect(content!.textContent!.trim()).toBe('Popover body');
    });

    it('should toggle panel in DOM when visibleState changes', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: false });
      const nativeEl: HTMLElement = fixture.nativeElement as HTMLElement;

      expect(nativeEl.querySelector('.ui-lib-popover__panel')).toBeNull();

      fixture.componentInstance.visibleState.set(true);
      fixture.detectChanges();

      expect(nativeEl.querySelector('.ui-lib-popover__panel')).not.toBeNull();

      fixture.componentInstance.visibleState.set(false);
      fixture.detectChanges();

      expect(nativeEl.querySelector('.ui-lib-popover__panel')).toBeNull();
    });
  });

  describe('show / hide / toggle methods', (): void => {
    it('show() sets visible to true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: false });
      const popover: Popover = getPopoverInstance(fixture);

      popover.show(document.body);
      fixture.detectChanges();

      expect(popover.visible()).toBe(true);
    });

    it('hide() sets visible to false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const popover: Popover = getPopoverInstance(fixture);

      popover.hide();
      fixture.detectChanges();

      expect(popover.visible()).toBe(false);
    });

    it('toggle() opens when closed', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: false });
      const popover: Popover = getPopoverInstance(fixture);

      popover.toggle(document.body);
      fixture.detectChanges();

      expect(popover.visible()).toBe(true);
    });

    it('toggle() closes when open', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const popover: Popover = getPopoverInstance(fixture);

      popover.toggle(document.body);
      fixture.detectChanges();

      expect(popover.visible()).toBe(false);
    });
  });

  describe('header', (): void => {
    it('should not render header when header is null and showCloseButton is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        header: null,
        showCloseButton: false,
      });
      const header: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-popover__header');
      expect(header).toBeNull();
    });

    it('should render header title when header input is set', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        header: 'My Title',
      });
      const title: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__title',
      );
      expect(title.textContent!.trim()).toBe('My Title');
    });

    it('should render close button when showCloseButton is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        showCloseButton: true,
      });
      const closeBtn: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-popover__close-btn');
      expect(closeBtn).not.toBeNull();
    });

    it('should hide popover on close button click', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        showCloseButton: true,
      });
      const closeBtn: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__close-btn',
      );
      closeBtn.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.visibleState()).toBe(false);
    });
  });

  describe('dismissable', (): void => {
    it('should add active class to overlay when dismissable is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        dismissable: true,
      });
      const overlay: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__overlay',
      );
      expect(overlay.classList.contains('ui-lib-popover__overlay--active')).toBe(true);
    });

    it('should not add active class to overlay when dismissable is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        dismissable: false,
      });
      const overlay: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__overlay',
      );
      expect(overlay.classList.contains('ui-lib-popover__overlay--active')).toBe(false);
    });

    it('should close on overlay click when dismissable is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        dismissable: true,
      });
      const overlay: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__overlay',
      );
      overlay.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.visibleState()).toBe(false);
    });

    it('should not close on overlay click when dismissable is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        dismissable: false,
      });
      const overlay: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__overlay',
      );
      overlay.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.visibleState()).toBe(true);
    });
  });

  describe('closeOnEscape', (): void => {
    it('should close on Escape key when closeOnEscape is true', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        closeOnEscape: true,
      });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.visibleState()).toBe(false);
    });

    it('should not close on Escape when closeOnEscape is false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        closeOnEscape: false,
      });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(fixture.componentInstance.visibleState()).toBe(true);
    });
  });

  describe('variant', (): void => {
    it('should apply material variant class to panel', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        variant: 'material',
      });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      expect(panel.classList.contains('ui-lib-popover--variant-material')).toBe(true);
    });

    it('should apply bootstrap variant class to panel', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        variant: 'bootstrap',
      });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      expect(panel.classList.contains('ui-lib-popover--variant-bootstrap')).toBe(true);
    });

    it('should apply minimal variant class to panel', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        variant: 'minimal',
      });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      expect(panel.classList.contains('ui-lib-popover--variant-minimal')).toBe(true);
    });
  });

  describe('styleClass', (): void => {
    it('should add extra class to host', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        styleClass: 'my-custom-class',
      });
      const host: HTMLElement = getElement(fixture.nativeElement as HTMLElement, 'ui-lib-popover');
      expect(host.classList.contains('my-custom-class')).toBe(true);
    });
  });

  describe('outputs', (): void => {
    it('should emit hidden when visible changes from true to false', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      fixture.componentInstance.visibleState.set(false);
      fixture.detectChanges();

      expect(fixture.componentInstance.hiddenCount).toBe(1);
    });
  });

  describe('arrow', (): void => {
    it('should render the arrow element when panel is visible', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const arrow: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-popover__arrow');
      expect(arrow).not.toBeNull();
    });
  });

  describe('accessibility', (): void => {
    it('should have role="dialog" on panel', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal="false" on panel', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({ visible: true });
      const panel: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__panel',
      );
      expect(panel.getAttribute('aria-modal')).toBe('false');
    });

    it('should have aria-label="Close" on close button', (): void => {
      const fixture: ComponentFixture<TestHostComponent> = createFixture({
        visible: true,
        showCloseButton: true,
      });
      const closeBtn: HTMLElement = getElement(
        fixture.nativeElement as HTMLElement,
        '.ui-lib-popover__close-btn',
      );
      expect(closeBtn.getAttribute('aria-label')).toBe('Close');
    });
  });
});
