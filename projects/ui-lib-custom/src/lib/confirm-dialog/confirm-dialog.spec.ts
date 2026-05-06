import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ConfirmDialog } from './confirm-dialog';
import { ConfirmationService } from './confirm-dialog.service';
import type {
  ConfirmDialogButtonSeverity,
  ConfirmDialogDefaultFocus,
  ConfirmDialogPosition,
  ConfirmDialogVariant,
} from './confirm-dialog.types';

function getElement(fixture: ComponentFixture<unknown>, selector: string): HTMLElement {
  const found: HTMLElement | null = (
    fixture.nativeElement as HTMLElement
  ).querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`Element not found: ${selector}`);
  return found;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ConfirmDialog],
  template: `
    <ui-lib-confirm-dialog
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [header]="headerState()"
      [message]="messageState()"
      [icon]="iconState()"
      [acceptLabel]="acceptLabelState()"
      [rejectLabel]="rejectLabelState()"
      [acceptSeverity]="acceptSeverityState()"
      [rejectSeverity]="rejectSeverityState()"
      [closable]="closableState()"
      [dismissableMask]="dismissableMaskState()"
      [blockScroll]="blockScrollState()"
      [position]="positionState()"
      [defaultFocus]="defaultFocusState()"
      [variant]="variantState()"
      [styleClass]="styleClassState()"
      (accepted)="onAccepted()"
      (rejected)="onRejected()"
    />
  `,
})
class TestHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerState: WritableSignal<string> = signal<string>('Confirm');
  public readonly messageState: WritableSignal<string> = signal<string>('Are you sure?');
  public readonly iconState: WritableSignal<string | null> = signal<string | null>(null);
  public readonly acceptLabelState: WritableSignal<string> = signal<string>('Yes');
  public readonly rejectLabelState: WritableSignal<string> = signal<string>('No');
  public readonly acceptSeverityState: WritableSignal<ConfirmDialogButtonSeverity> =
    signal<ConfirmDialogButtonSeverity>('primary');
  public readonly rejectSeverityState: WritableSignal<ConfirmDialogButtonSeverity> =
    signal<ConfirmDialogButtonSeverity>('secondary');
  public readonly closableState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly dismissableMaskState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly blockScrollState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly positionState: WritableSignal<ConfirmDialogPosition> =
    signal<ConfirmDialogPosition>('center');
  public readonly defaultFocusState: WritableSignal<ConfirmDialogDefaultFocus> =
    signal<ConfirmDialogDefaultFocus>('accept');
  public readonly variantState: WritableSignal<ConfirmDialogVariant | null> =
    signal<ConfirmDialogVariant | null>('material');
  public readonly styleClassState: WritableSignal<string | null> = signal<string | null>(null);

  public acceptedCount: number = 0;
  public rejectedCount: number = 0;

  public onAccepted(): void {
    this.acceptedCount += 1;
  }

  public onRejected(): void {
    this.rejectedCount += 1;
  }
}

interface BootstrapOptions {
  visible?: boolean;
  header?: string;
  message?: string;
  icon?: string | null;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptSeverity?: ConfirmDialogButtonSeverity;
  rejectSeverity?: ConfirmDialogButtonSeverity;
  closable?: boolean;
  dismissableMask?: boolean;
  blockScroll?: boolean;
  position?: ConfirmDialogPosition;
  defaultFocus?: ConfirmDialogDefaultFocus;
  variant?: ConfirmDialogVariant | null;
  styleClass?: string | null;
}

describe('ConfirmDialog', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: BootstrapOptions): {
    fixture: ComponentFixture<TestHostComponent>;
    host: HTMLElement;
    service: ConfirmationService;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const service: ConfirmationService = TestBed.inject(ConfirmationService);

    if (initial?.visible !== undefined) fixture.componentInstance.visibleState.set(initial.visible);
    if (initial?.header !== undefined) fixture.componentInstance.headerState.set(initial.header);
    if (initial?.message !== undefined) fixture.componentInstance.messageState.set(initial.message);
    if (initial?.icon !== undefined) fixture.componentInstance.iconState.set(initial.icon);
    if (initial?.acceptLabel !== undefined)
      fixture.componentInstance.acceptLabelState.set(initial.acceptLabel);
    if (initial?.rejectLabel !== undefined)
      fixture.componentInstance.rejectLabelState.set(initial.rejectLabel);
    if (initial?.closable !== undefined)
      fixture.componentInstance.closableState.set(initial.closable);
    if (initial?.dismissableMask !== undefined)
      fixture.componentInstance.dismissableMaskState.set(initial.dismissableMask);
    if (initial?.position !== undefined)
      fixture.componentInstance.positionState.set(initial.position);
    if (initial?.variant !== undefined) fixture.componentInstance.variantState.set(initial.variant);
    if (initial?.styleClass !== undefined)
      fixture.componentInstance.styleClassState.set(initial.styleClass);

    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();

    return { fixture, host: fixture.nativeElement as HTMLElement, service };
  }

  describe('rendering', (): void => {
    it('should not render the panel when not visible', (): void => {
      const { host } = bootstrap({ visible: false });
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
      expect(host.querySelector('.ui-lib-confirm-dialog__backdrop')).toBeNull();
    });

    it('should render the panel and backdrop when visible', (): void => {
      const { host } = bootstrap({ visible: true });
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).not.toBeNull();
      expect(host.querySelector('.ui-lib-confirm-dialog__backdrop')).not.toBeNull();
    });

    it('should render header text', (): void => {
      const { host } = bootstrap({ visible: true, header: 'Delete File' });
      const title: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__title'
      );
      expect(title.textContent!.trim()).toBe('Delete File');
    });

    it('should render message text', (): void => {
      const { host } = bootstrap({ visible: true, message: 'This cannot be undone.' });
      const message: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__message'
      );
      expect(message.textContent!.trim()).toBe('This cannot be undone.');
    });

    it('should render accept and reject buttons', (): void => {
      const { host } = bootstrap({ visible: true });
      expect(host.querySelector('.ui-lib-confirm-dialog__accept-btn')).not.toBeNull();
      expect(host.querySelector('.ui-lib-confirm-dialog__reject-btn')).not.toBeNull();
    });

    it('should render custom accept and reject labels', (): void => {
      const { host } = bootstrap({ visible: true, acceptLabel: 'Confirm', rejectLabel: 'Cancel' });
      const acceptBtn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__accept-btn'
      );
      const rejectBtn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__reject-btn'
      );
      expect(acceptBtn.textContent!.trim()).toBe('Confirm');
      expect(rejectBtn.textContent!.trim()).toBe('Cancel');
    });

    it('should render icon element when icon is provided', (): void => {
      const { host } = bootstrap({ visible: true, icon: 'pi pi-trash' });
      const icon: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__icon');
      expect(icon).not.toBeNull();
      expect(icon!.classList.contains('pi')).toBe(true);
    });

    it('should not render icon element when icon is null', (): void => {
      const { host } = bootstrap({ visible: true, icon: null });
      expect(host.querySelector('.ui-lib-confirm-dialog__icon')).toBeNull();
    });

    it('should render close button when closable is true', (): void => {
      const { host } = bootstrap({ visible: true, closable: true });
      expect(host.querySelector('.ui-lib-confirm-dialog__close-btn')).not.toBeNull();
    });

    it('should not render close button when closable is false', (): void => {
      const { host } = bootstrap({ visible: true, closable: false });
      expect(host.querySelector('.ui-lib-confirm-dialog__close-btn')).toBeNull();
    });
  });

  describe('host classes', (): void => {
    it('should apply --visible class when visible', (): void => {
      const { host } = bootstrap({ visible: true });
      expect(
        (host.querySelector('ui-lib-confirm-dialog') as HTMLElement | null)?.classList.contains(
          'ui-lib-confirm-dialog--visible'
        )
      ).toBe(true);
    });

    it('should apply variant class to panel', (): void => {
      const { host } = bootstrap({ visible: true, variant: 'bootstrap' });
      const panel: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__panel'
      );
      expect(panel.classList.contains('ui-lib-confirm-dialog--variant-bootstrap')).toBe(true);
    });

    it('should apply position class to host', (): void => {
      const { host } = bootstrap({ visible: true, position: 'top' });
      const dialogHost: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        'ui-lib-confirm-dialog'
      );
      expect(dialogHost.classList.contains('ui-lib-confirm-dialog--top')).toBe(true);
    });

    it('should apply severity class to accept button', (): void => {
      const { host } = bootstrap({ visible: true });
      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__accept-btn'
      );
      expect(btn.classList.contains('ui-lib-confirm-dialog__btn--primary')).toBe(true);
    });

    it('should apply severity class to reject button', (): void => {
      const { host } = bootstrap({ visible: true });
      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__reject-btn'
      );
      expect(btn.classList.contains('ui-lib-confirm-dialog__btn--secondary')).toBe(true);
    });

    it('should apply styleClass to host', (): void => {
      const { host } = bootstrap({ visible: true, styleClass: 'custom-class' });
      const dialogHost: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        'ui-lib-confirm-dialog'
      );
      expect(dialogHost.classList.contains('custom-class')).toBe(true);
    });
  });

  describe('ARIA attributes', (): void => {
    it('should set role="alertdialog" on panel', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__panel'
      );
      expect(panel.getAttribute('role')).toBe('alertdialog');
    });

    it('should set aria-modal="true" on panel', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__panel'
      );
      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('should set aria-labelledby pointing to header id', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__panel'
      );
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();
      const titleEl: HTMLElement | null = host.querySelector(`#${labelledById}`);
      expect(titleEl).not.toBeNull();
    });

    it('should set aria-describedby pointing to message id', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__panel'
      );
      const describedById: string | null = panel.getAttribute('aria-describedby');
      expect(describedById).toBeTruthy();
      const msgEl: HTMLElement | null = host.querySelector(`#${describedById}`);
      expect(msgEl).not.toBeNull();
    });
  });

  describe('interaction', (): void => {
    it('should emit accepted and close when accept button is clicked', (): void => {
      const { fixture, host } = bootstrap({ visible: true });
      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__accept-btn'
      );
      btn.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(fixture.componentInstance.acceptedCount).toBe(1);
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('should emit rejected and close when reject button is clicked', (): void => {
      const { fixture, host } = bootstrap({ visible: true });
      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__reject-btn'
      );
      btn.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(fixture.componentInstance.rejectedCount).toBe(1);
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('should close when the close button is clicked', (): void => {
      const { fixture, host } = bootstrap({ visible: true, closable: true });
      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__close-btn'
      );
      btn.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('should close on Escape key', (): void => {
      const { fixture, host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__panel'
      );
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('should not close on backdrop click when dismissableMask is false', (): void => {
      const { fixture, host } = bootstrap({ visible: true, dismissableMask: false });
      const backdrop: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__backdrop'
      );
      backdrop.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).not.toBeNull();
    });

    it('should close on backdrop click when dismissableMask is true', (): void => {
      const { fixture, host } = bootstrap({ visible: true, dismissableMask: true });
      const backdrop: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__backdrop'
      );
      backdrop.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });
  });

  describe('ConfirmationService integration', (): void => {
    it('should show the dialog when ConfirmationService.confirm() is called', (): void => {
      const { fixture, host, service } = bootstrap({ visible: false });
      service.confirm({ header: 'Delete?', message: 'Sure?' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).not.toBeNull();
    });

    it('should display service-provided header and message', (): void => {
      const { fixture, host, service } = bootstrap({ visible: false });
      service.confirm({ header: 'Service Header', message: 'Service Message' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      const title: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__title'
      );
      const message: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__message'
      );

      expect(title.textContent!.trim()).toBe('Service Header');
      expect(message.textContent!.trim()).toBe('Service Message');
    });

    it('should invoke the accept callback when accept is clicked', (): void => {
      const { fixture, host, service } = bootstrap({ visible: false });
      let acceptCalled: boolean = false;
      service.confirm({
        accept: (): void => {
          acceptCalled = true;
        },
      });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__accept-btn'
      );
      btn.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(acceptCalled).toBe(true);
    });

    it('should invoke the reject callback when reject is clicked', (): void => {
      const { fixture, host, service } = bootstrap({ visible: false });
      let rejectCalled: boolean = false;
      service.confirm({
        reject: (): void => {
          rejectCalled = true;
        },
      });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      const btn: HTMLElement = getElement(
        { nativeElement: host } as ComponentFixture<unknown>,
        '.ui-lib-confirm-dialog__reject-btn'
      );
      btn.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(rejectCalled).toBe(true);
    });

    it('should close the dialog when ConfirmationService.close() is called', (): void => {
      const { fixture, host, service } = bootstrap({ visible: false });
      service.confirm({ header: 'Confirm?' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      service.close();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });
  });
});
