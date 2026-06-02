import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ConfirmPopup } from './confirm-popup';
import { ConfirmPopupService } from './confirm-popup.service';
import type { ConfirmPopupButtonSeverity, ConfirmPopupVariant } from './confirm-popup.types';

function getElement(host: HTMLElement, selector: string): HTMLElement {
  const found: HTMLElement | null = host.querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`Element not found: ${selector}`);
  return found;
}

function getAllElements(host: HTMLElement, selector: string): NodeListOf<HTMLElement> {
  return host.querySelectorAll<HTMLElement>(selector);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ConfirmPopup],
  template: `
    <ui-lib-confirm-popup
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [message]="messageState()"
      [icon]="iconState()"
      [acceptLabel]="acceptLabelState()"
      [rejectLabel]="rejectLabelState()"
      [acceptSeverity]="acceptSeverityState()"
      [rejectSeverity]="rejectSeverityState()"
      [variant]="variantState()"
      [styleClass]="styleClassState()"
      (accepted)="onAccepted()"
      (rejected)="onRejected()"
    />
  `,
})
class TestHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly messageState: WritableSignal<string> = signal<string>('Are you sure?');
  public readonly iconState: WritableSignal<string | null> = signal<string | null>(null);
  public readonly acceptLabelState: WritableSignal<string> = signal<string>('Yes');
  public readonly rejectLabelState: WritableSignal<string> = signal<string>('No');
  public readonly acceptSeverityState: WritableSignal<ConfirmPopupButtonSeverity> =
    signal<ConfirmPopupButtonSeverity>('primary');
  public readonly rejectSeverityState: WritableSignal<ConfirmPopupButtonSeverity> =
    signal<ConfirmPopupButtonSeverity>('secondary');
  public readonly variantState: WritableSignal<ConfirmPopupVariant | null> =
    signal<ConfirmPopupVariant | null>(null);
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
  message?: string;
  icon?: string | null;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptSeverity?: ConfirmPopupButtonSeverity;
  rejectSeverity?: ConfirmPopupButtonSeverity;
  variant?: ConfirmPopupVariant | null;
  styleClass?: string | null;
}

describe('ConfirmPopup', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: BootstrapOptions): {
    fixture: ComponentFixture<TestHostComponent>;
    host: HTMLElement;
    component: TestHostComponent;
    service: ConfirmPopupService;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component: TestHostComponent = fixture.componentInstance;
    const service: ConfirmPopupService = TestBed.inject(ConfirmPopupService);

    if (initial?.visible !== undefined) component.visibleState.set(initial.visible);
    if (initial?.message !== undefined) component.messageState.set(initial.message);
    if (initial?.icon !== undefined) component.iconState.set(initial.icon);
    if (initial?.acceptLabel !== undefined) component.acceptLabelState.set(initial.acceptLabel);
    if (initial?.rejectLabel !== undefined) component.rejectLabelState.set(initial.rejectLabel);
    if (initial?.acceptSeverity !== undefined)
      component.acceptSeverityState.set(initial.acceptSeverity);
    if (initial?.rejectSeverity !== undefined)
      component.rejectSeverityState.set(initial.rejectSeverity);
    if (initial?.variant !== undefined) component.variantState.set(initial.variant);
    if (initial?.styleClass !== undefined) component.styleClassState.set(initial.styleClass);

    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();

    return { fixture, host: fixture.nativeElement as HTMLElement, component, service };
  }

  function detectAndFlush(fixture: ComponentFixture<TestHostComponent>): void {
    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();
  }

  describe('rendering', (): void => {
    it('should not render panel when not visible', (): void => {
      const { host } = bootstrap({ visible: false });
      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
      expect(host.querySelector('.ui-lib-confirm-popup__overlay')).toBeNull();
    });

    it('should render panel and overlay when visible', (): void => {
      const { host } = bootstrap({ visible: true });
      expect(host.querySelector('.ui-lib-confirm-popup__panel')).not.toBeNull();
      expect(host.querySelector('.ui-lib-confirm-popup__overlay')).not.toBeNull();
    });

    it('should render the message text', (): void => {
      const { host } = bootstrap({ visible: true, message: 'Confirm this?' });
      const message: HTMLElement = getElement(host, '.ui-lib-confirm-popup__message');
      expect(message.textContent!.trim()).toBe('Confirm this?');
    });

    it('should update message when signal changes', (): void => {
      const { fixture, host, component } = bootstrap({ visible: true, message: 'First' });
      component.messageState.set('Second');
      detectAndFlush(fixture);
      const message: HTMLElement = getElement(host, '.ui-lib-confirm-popup__message');
      expect(message.textContent!.trim()).toBe('Second');
    });

    it('should render accept and reject buttons', (): void => {
      const { host } = bootstrap({ visible: true });
      expect(host.querySelector('.ui-lib-confirm-popup__accept-btn')).not.toBeNull();
      expect(host.querySelector('.ui-lib-confirm-popup__reject-btn')).not.toBeNull();
    });

    it('should display accept and reject labels', (): void => {
      const { host } = bootstrap({ visible: true, acceptLabel: 'Confirm', rejectLabel: 'Cancel' });
      const accept: HTMLElement = getElement(host, '.ui-lib-confirm-popup__accept-btn');
      const reject: HTMLElement = getElement(host, '.ui-lib-confirm-popup__reject-btn');
      expect(accept.textContent!.trim()).toBe('Confirm');
      expect(reject.textContent!.trim()).toBe('Cancel');
    });

    it('should render icon when icon input is set', (): void => {
      const { host } = bootstrap({ visible: true, icon: 'pi pi-exclamation-triangle' });
      const icon: HTMLElement = getElement(host, '.ui-lib-confirm-popup__icon');
      expect(icon.classList.contains('pi')).toBe(true);
    });

    it('should not render icon element when icon is null', (): void => {
      const { host } = bootstrap({ visible: true, icon: null });
      expect(host.querySelector('.ui-lib-confirm-popup__icon')).toBeNull();
    });

    it('should render the arrow element when visible', (): void => {
      const { host } = bootstrap({ visible: true });
      expect(host.querySelector('.ui-lib-confirm-popup__arrow')).not.toBeNull();
    });
  });

  describe('host classes', (): void => {
    it('should apply ui-lib-confirm-popup--open when visible', (): void => {
      const { host } = bootstrap({ visible: true });
      const popup: HTMLElement = getElement(host, 'ui-lib-confirm-popup');
      expect(popup.classList.contains('ui-lib-confirm-popup--open')).toBe(true);
    });

    it('should not apply ui-lib-confirm-popup--open when hidden', (): void => {
      const { host } = bootstrap({ visible: false });
      const popup: HTMLElement = getElement(host, 'ui-lib-confirm-popup');
      expect(popup.classList.contains('ui-lib-confirm-popup--open')).toBe(false);
    });

    it('should apply styleClass to the host', (): void => {
      const { host } = bootstrap({ styleClass: 'my-popup' });
      const popup: HTMLElement = getElement(host, 'ui-lib-confirm-popup');
      expect(popup.classList.contains('my-popup')).toBe(true);
    });
  });

  describe('variant', (): void => {
    it('should apply variant class to panel', (): void => {
      const { host } = bootstrap({ visible: true, variant: 'bootstrap' });
      const panel: HTMLElement = getElement(host, '.ui-lib-confirm-popup__panel');
      expect(panel.classList.contains('ui-lib-confirm-popup--variant-bootstrap')).toBe(true);
    });

    it('should apply minimal variant class', (): void => {
      const { host } = bootstrap({ visible: true, variant: 'minimal' });
      const panel: HTMLElement = getElement(host, '.ui-lib-confirm-popup__panel');
      expect(panel.classList.contains('ui-lib-confirm-popup--variant-minimal')).toBe(true);
    });
  });

  describe('severity', (): void => {
    it('should apply severity class to accept button', (): void => {
      const { host } = bootstrap({ visible: true, acceptSeverity: 'danger' });
      const accept: HTMLElement = getElement(host, '.ui-lib-confirm-popup__accept-btn');
      expect(accept.classList.contains('ui-lib-confirm-popup__btn--danger')).toBe(true);
    });

    it('should apply severity class to reject button', (): void => {
      const { host } = bootstrap({ visible: true, rejectSeverity: 'secondary' });
      const reject: HTMLElement = getElement(host, '.ui-lib-confirm-popup__reject-btn');
      expect(reject.classList.contains('ui-lib-confirm-popup__btn--secondary')).toBe(true);
    });

    it('should render all severity variants', (): void => {
      const severities: ConfirmPopupButtonSeverity[] = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
      ];
      for (const severity of severities) {
        const { host, fixture, component } = bootstrap({ visible: true, acceptSeverity: severity });
        const buttons: NodeListOf<HTMLElement> = getAllElements(
          host,
          `.ui-lib-confirm-popup__btn--${severity}`,
        );
        expect(buttons.length).toBeGreaterThan(0);
        component.visibleState.set(false);
        detectAndFlush(fixture);
      }
    });
  });

  describe('interactions', (): void => {
    it('should close and emit rejected when overlay is clicked', (): void => {
      const { fixture, host, component } = bootstrap({ visible: true });
      expect(component.rejectedCount).toBe(0);
      getElement(host, '.ui-lib-confirm-popup__overlay').click();
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(false);
      expect(component.rejectedCount).toBe(1);
    });

    it('should close and emit accepted when accept button is clicked', (): void => {
      const { fixture, host, component } = bootstrap({ visible: true });
      expect(component.acceptedCount).toBe(0);
      getElement(host, '.ui-lib-confirm-popup__accept-btn').click();
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(false);
      expect(component.acceptedCount).toBe(1);
    });

    it('should close and emit rejected when reject button is clicked', (): void => {
      const { fixture, host, component } = bootstrap({ visible: true });
      expect(component.rejectedCount).toBe(0);
      getElement(host, '.ui-lib-confirm-popup__reject-btn').click();
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(false);
      expect(component.rejectedCount).toBe(1);
    });

    it('should close on Escape keydown', (): void => {
      const { fixture, host, component } = bootstrap({ visible: true });
      getElement(host, '.ui-lib-confirm-popup__panel').dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      );
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(false);
    });

    it('should not close on non-Escape keydown', (): void => {
      const { fixture, host, component } = bootstrap({ visible: true });
      getElement(host, '.ui-lib-confirm-popup__panel').dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(true);
    });
  });

  describe('accessibility', (): void => {
    it('should set role="alertdialog" on panel', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(host, '.ui-lib-confirm-popup__panel');
      expect(panel.getAttribute('role')).toBe('alertdialog');
    });

    it('should set aria-modal="true" on panel', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(host, '.ui-lib-confirm-popup__panel');
      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('should link panel aria-describedby to message element', (): void => {
      const { host } = bootstrap({ visible: true });
      const panel: HTMLElement = getElement(host, '.ui-lib-confirm-popup__panel');
      const messageId: string | null = panel.getAttribute('aria-describedby');
      expect(messageId).toBeTruthy();
      expect(host.querySelector(`#${messageId ?? ''}`)).not.toBeNull();
    });
  });

  describe('ConfirmPopupService integration', (): void => {
    it('should open when service.confirm() is called', (): void => {
      const { fixture, component, service } = bootstrap();
      service.confirm({ message: 'Delete?' });
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(true);
    });

    it('should display service-provided message', (): void => {
      const { fixture, host, service } = bootstrap();
      service.confirm({ message: 'Confirm action?' });
      detectAndFlush(fixture);
      const message: HTMLElement = getElement(host, '.ui-lib-confirm-popup__message');
      expect(message.textContent!.trim()).toBe('Confirm action?');
    });

    it('should override labels from service config', (): void => {
      const { fixture, host, service } = bootstrap();
      service.confirm({ message: 'Proceed?', acceptLabel: 'OK', rejectLabel: 'Cancel' });
      detectAndFlush(fixture);
      const accept: HTMLElement = getElement(host, '.ui-lib-confirm-popup__accept-btn');
      const reject: HTMLElement = getElement(host, '.ui-lib-confirm-popup__reject-btn');
      expect(accept.textContent!.trim()).toBe('OK');
      expect(reject.textContent!.trim()).toBe('Cancel');
    });

    it('should invoke accept callback when accept button is clicked', (): void => {
      const { fixture, host, service } = bootstrap();
      let callbackInvoked: boolean = false;
      service.confirm({
        message: 'Sure?',
        accept: (): void => {
          callbackInvoked = true;
        },
      });
      detectAndFlush(fixture);
      getElement(host, '.ui-lib-confirm-popup__accept-btn').click();
      detectAndFlush(fixture);
      expect(callbackInvoked).toBe(true);
    });

    it('should invoke reject callback when reject button is clicked', (): void => {
      const { fixture, host, service } = bootstrap();
      let callbackInvoked: boolean = false;
      service.confirm({
        message: 'Sure?',
        reject: (): void => {
          callbackInvoked = true;
        },
      });
      detectAndFlush(fixture);
      getElement(host, '.ui-lib-confirm-popup__reject-btn').click();
      detectAndFlush(fixture);
      expect(callbackInvoked).toBe(true);
    });

    it('should close when service.close() is called', (): void => {
      const { fixture, component, service } = bootstrap();
      service.confirm({ message: 'Sure?' });
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(true);

      service.close();
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(false);
    });

    it('should not open when service config key does not match', (): void => {
      const { fixture, component, service } = bootstrap();
      service.confirm({ key: 'other', message: 'Sure?' });
      detectAndFlush(fixture);
      expect(component.visibleState()).toBe(false);
    });
  });
});

describe('ConfirmPopupService', (): void => {
  let service: ConfirmPopupService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ConfirmPopupService],
    }).compileComponents();

    service = TestBed.inject(ConfirmPopupService);
  });

  it('should start with null confirmation', (): void => {
    expect(service.confirmation()).toBeNull();
  });

  it('should set active config on confirm()', (): void => {
    service.confirm({ message: 'Test' });
    expect(service.confirmation()?.message).toBe('Test');
  });

  it('should clear config on close()', (): void => {
    service.confirm({ message: 'Test' });
    service.close();
    expect(service.confirmation()).toBeNull();
  });

  it('should not close when key does not match', (): void => {
    service.confirm({ key: 'popup-a', message: 'Test' });
    service.close('popup-b');
    expect(service.confirmation()).not.toBeNull();
  });

  it('should close when key matches', (): void => {
    service.confirm({ key: 'popup-a', message: 'Test' });
    service.close('popup-a');
    expect(service.confirmation()).toBeNull();
  });
});
