import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Drawer } from './drawer';
import type { DrawerPosition, DrawerVariant } from './drawer.types';

function getElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
}

function queryElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

@Component({
  standalone: true,
  imports: [Drawer],
  template: `
    <ui-lib-drawer
      [(visible)]="isVisible"
      [header]="headerText()"
      [position]="position()"
      [size]="size()"
      [modal]="modal()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [blockScroll]="blockScroll()"
      [showCloseButton]="showCloseButton()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      [ariaDescribedby]="ariaDescribedby()"
    >
      <p class="test-content">Drawer body</p>
      <div drawerFooter class="test-footer">Footer</div>
    </ui-lib-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly isVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerText: WritableSignal<string> = signal<string>('Test Header');
  public readonly position: WritableSignal<DrawerPosition> = signal<DrawerPosition>('right');
  public readonly size: WritableSignal<string> = signal<string>('300px');
  public readonly modal: WritableSignal<boolean> = signal<boolean>(true);
  public readonly closeOnBackdrop: WritableSignal<boolean> = signal<boolean>(true);
  public readonly closeOnEscape: WritableSignal<boolean> = signal<boolean>(true);
  public readonly blockScroll: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showCloseButton: WritableSignal<boolean> = signal<boolean>(true);
  public readonly variant: WritableSignal<DrawerVariant | null> = signal<DrawerVariant | null>(
    null
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaDescribedby: WritableSignal<string | undefined> = signal<string | undefined>(
    undefined
  );
}

describe('Drawer', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', (): void => {
    it('should create', (): void => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render the backdrop element', (): void => {
      const backdrop: HTMLElement = getElement(fixture, '.ui-lib-drawer__backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should render the panel element', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel).toBeTruthy();
    });

    it('should render projected content', (): void => {
      const content: HTMLElement = getElement(fixture, '.test-content');
      expect(content.textContent!.trim()).toBe('Drawer body');
    });

    it('should render the footer slot', (): void => {
      const footer: HTMLElement = getElement(fixture, '.test-footer');
      expect(footer.textContent!.trim()).toBe('Footer');
    });
  });

  describe('visibility', (): void => {
    it('should not have --open class when closed', (): void => {
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--open')).toBe(false);
    });

    it('should add --open class when visible is true', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--open')).toBe(true);
    });

    it('should add --open class to panel when visible', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.classList.contains('ui-lib-drawer__panel--open')).toBe(true);
    });

    it('should set aria-hidden="true" on host when closed', (): void => {
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove aria-hidden from host when open', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('backdrop', (): void => {
    it('should show backdrop when modal and visible', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const backdrop: HTMLElement = getElement(fixture, '.ui-lib-drawer__backdrop');
      expect(backdrop.classList.contains('ui-lib-drawer__backdrop--visible')).toBe(true);
    });

    it('should not show backdrop when modal is false', (): void => {
      host.modal.set(false);
      host.isVisible.set(true);
      fixture.detectChanges();
      const backdrop: HTMLElement = getElement(fixture, '.ui-lib-drawer__backdrop');
      expect(backdrop.classList.contains('ui-lib-drawer__backdrop--visible')).toBe(false);
    });

    it('should close on backdrop click when closeOnBackdrop is true', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const backdrop: HTMLElement = getElement(fixture, '.ui-lib-drawer__backdrop');
      backdrop.click();
      fixture.detectChanges();
      expect(host.isVisible()).toBe(false);
    });

    it('should not close on backdrop click when closeOnBackdrop is false', (): void => {
      host.closeOnBackdrop.set(false);
      host.isVisible.set(true);
      fixture.detectChanges();
      const backdrop: HTMLElement = getElement(fixture, '.ui-lib-drawer__backdrop');
      backdrop.click();
      fixture.detectChanges();
      expect(host.isVisible()).toBe(true);
    });
  });

  describe('header', (): void => {
    it('should render header text', (): void => {
      const title: HTMLElement = getElement(fixture, '.ui-lib-drawer__title');
      expect(title.textContent!.trim()).toBe('Test Header');
    });

    it('should render close button when showCloseButton is true', (): void => {
      const button: HTMLElement | null = queryElement(fixture, '.ui-lib-drawer__close');
      expect(button).toBeTruthy();
    });

    it('should not render close button when showCloseButton is false', (): void => {
      host.showCloseButton.set(false);
      host.headerText.set('');
      fixture.detectChanges();
      const button: HTMLElement | null = queryElement(fixture, '.ui-lib-drawer__close');
      expect(button).toBeNull();
    });

    it('should close when close button is clicked', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const button: HTMLElement = getElement(fixture, '.ui-lib-drawer__close');
      button.click();
      fixture.detectChanges();
      expect(host.isVisible()).toBe(false);
    });

    it('close button should use an inline SVG icon, not PrimeNG pi classes', (): void => {
      const svg: SVGElement | null = queryElement<SVGElement>(fixture, '.ui-lib-drawer__close svg');
      expect(svg).toBeTruthy();
      const piSpan: HTMLElement | null = queryElement(fixture, '.ui-lib-drawer__close .pi');
      expect(piSpan).toBeNull();
    });
  });

  describe('escape key', (): void => {
    it('should close on Escape key when closeOnEscape is true', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(host.isVisible()).toBe(false);
    });

    it('should not close on Escape key when closeOnEscape is false', (): void => {
      host.closeOnEscape.set(false);
      host.isVisible.set(true);
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(host.isVisible()).toBe(true);
    });
  });

  describe('position classes', (): void => {
    it('should apply --right class by default', (): void => {
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--right')).toBe(true);
    });

    it('should apply --left class', (): void => {
      host.position.set('left');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--left')).toBe(true);
    });

    it('should apply --top class', (): void => {
      host.position.set('top');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--top')).toBe(true);
    });

    it('should apply --bottom class', (): void => {
      host.position.set('bottom');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--bottom')).toBe(true);
    });
  });

  describe('variant classes', (): void => {
    it('should apply variant class from input', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--variant-bootstrap')).toBe(true);
    });

    it('should apply material variant class', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--variant-material')).toBe(true);
    });

    it('should apply minimal variant class', (): void => {
      host.variant.set('minimal');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('ui-lib-drawer--variant-minimal')).toBe(true);
    });
  });

  describe('styleClass', (): void => {
    it('should append extra CSS class to host', (): void => {
      host.styleClass.set('my-custom-class');
      fixture.detectChanges();
      const drawerHost: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      expect(drawerHost.classList.contains('my-custom-class')).toBe(true);
    });
  });

  describe('accessibility', (): void => {
    it('should have role="dialog" on the panel', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('should set aria-modal="true" when visible and modal=true', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('should not set aria-modal when closed', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('aria-modal')).toBeNull();
    });

    it('should not set aria-modal when visible but modal=false', (): void => {
      host.modal.set(false);
      host.isVisible.set(true);
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('aria-modal')).toBeNull();
    });

    it('should set aria-labelledby pointing to the title element when header is set', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();
      const titleEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        `#${labelledById}`
      );
      expect(titleEl).toBeTruthy();
      expect(titleEl?.textContent!.trim()).toBe('Test Header');
    });

    it('should use aria-label="Drawer" when no header text is set', (): void => {
      host.headerText.set('');
      host.showCloseButton.set(false);
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('aria-label')).toBe('Drawer');
      expect(panel.getAttribute('aria-labelledby')).toBeNull();
    });

    it('should set aria-describedby when ariaDescribedby is provided', (): void => {
      host.ariaDescribedby.set('my-description');
      fixture.detectChanges();
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('aria-describedby')).toBe('my-description');
    });

    it('should not set aria-describedby when ariaDescribedby is not provided', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('aria-describedby')).toBeNull();
    });

    it('should have tabindex="-1" on the panel', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      expect(panel.getAttribute('tabindex')).toBe('-1');
    });

    it('panel should not have a redundant aria-hidden attribute', (): void => {
      const panel: HTMLElement = getElement(fixture, '.ui-lib-drawer__panel');
      // aria-hidden is now on the host only; panel must not duplicate it
      expect(panel.hasAttribute('aria-hidden')).toBe(false);
    });
  });

  describe('outputs', (): void => {
    it('should emit shown when opened', (): void => {
      const drawerEl: HTMLElement = getElement(fixture, 'ui-lib-drawer');
      const drawer: Drawer = fixture.debugElement.children[0]!.componentInstance as Drawer;
      let emitted: boolean = false;
      drawer.shown.subscribe((): void => {
        emitted = true;
      });
      host.isVisible.set(true);
      fixture.detectChanges();
      void drawerEl;
      expect(emitted).toBe(true);
    });

    it('should emit hidden when closed after being open', (): void => {
      host.isVisible.set(true);
      fixture.detectChanges();
      const drawer: Drawer = fixture.debugElement.children[0]!.componentInstance as Drawer;
      let emitted: boolean = false;
      drawer.hidden.subscribe((): void => {
        emitted = true;
      });
      host.isVisible.set(false);
      fixture.detectChanges();
      expect(emitted).toBe(true);
    });
  });
});
