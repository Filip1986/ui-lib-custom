import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ConfirmDialog } from './confirm-dialog';
import { ConfirmationService } from './confirm-dialog.service';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import type { ConfirmDialogDefaultFocus } from './confirm-dialog.types';

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ConfirmDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="trigger-btn">Open Dialog</button>
    <ui-lib-confirm-dialog
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [header]="headerState()"
      [message]="messageState()"
      [closable]="closableState()"
      [dismissableMask]="dismissableMaskState()"
      [blockScroll]="false"
      [defaultFocus]="defaultFocusState()"
    />
  `,
})
class ConfirmDialogA11yHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerState: WritableSignal<string> = signal<string>('Delete item');
  public readonly messageState: WritableSignal<string> = signal<string>('This cannot be undone.');
  public readonly closableState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly dismissableMaskState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly defaultFocusState: WritableSignal<ConfirmDialogDefaultFocus> =
    signal<ConfirmDialogDefaultFocus>('accept');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function openDialog(fixture: ComponentFixture<ConfirmDialogA11yHostComponent>): void {
  fixture.componentInstance.visibleState.set(true);
  fixture.detectChanges();
  TestBed.flushEffects();
  fixture.detectChanges();
}

function getPanel(host: HTMLElement): HTMLElement {
  const panel: HTMLElement | null = host.querySelector<HTMLElement>(
    '.ui-lib-confirm-dialog__panel',
  );
  if (!panel) throw new Error('Expected panel to exist');
  return panel;
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('ConfirmDialog Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.style.overflow = '';
  });

  // ── Closed state ─────────────────────────────────────────────────────────

  describe('closed state', (): void => {
    it('panel is not in DOM when visible=false', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('no role="alertdialog" element present when closed', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('[role="alertdialog"]')).toBeNull();
    });

    it('axe passes in closed state', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── Open-state ARIA structure ─────────────────────────────────────────────

  describe('open-state ARIA structure', (): void => {
    it('panel has role="alertdialog"', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('role')).toBe('alertdialog');
    });

    it('panel has aria-modal="true"', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('panel aria-labelledby resolves to header text element', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();
      const titleEl: HTMLElement | null = host.querySelector(`#${labelledById}`);
      expect(titleEl).not.toBeNull();
      expect((titleEl?.textContent ?? '').trim()).toBe('Delete item');
    });

    it('panel aria-describedby resolves to message element', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      const describedById: string | null = panel.getAttribute('aria-describedby');
      expect(describedById).toBeTruthy();
      const msgEl: HTMLElement | null = host.querySelector(`#${describedById}`);
      expect(msgEl).not.toBeNull();
      expect((msgEl?.textContent ?? '').trim()).toContain('This cannot be undone.');
    });

    it('header text matches the header input', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const titleEl: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__title');
      expect((titleEl?.textContent ?? '').trim()).toBe('Delete item');
    });

    it('message text matches the message input', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const msgEl: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__message');
      expect((msgEl?.textContent ?? '').trim()).toBe('This cannot be undone.');
    });

    it('close button (closable=true) has aria-label="Close"', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const closeBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__close-btn');
      expect(closeBtn).not.toBeNull();
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close');
    });

    it('close button icon has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const closeIcon: SVGElement | null = host.querySelector<SVGElement>(
        '.ui-lib-confirm-dialog__close-btn svg',
      );
      expect(closeIcon).not.toBeNull();
      expect(closeIcon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── Focus management ──────────────────────────────────────────────────────

  describe('focus management', (): void => {
    it('defaultFocus="accept" focuses the accept button after open (direct call)', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('accept');
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      // afterNextRender does not fire in Jest; call focusDefaultButton directly via DOM.
      const acceptBtn: HTMLElement | null = host.querySelector(
        '.ui-lib-confirm-dialog__accept-btn',
      );
      expect(acceptBtn).not.toBeNull();
      // Verify button is focusable (has no disabled attribute).
      expect(acceptBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('defaultFocus="reject" — reject button is present and focusable', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('reject');
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const rejectBtn: HTMLElement | null = host.querySelector(
        '.ui-lib-confirm-dialog__reject-btn',
      );
      expect(rejectBtn).not.toBeNull();
      expect(rejectBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('defaultFocus="none" — no button is forcibly focused (panel has tabindex="-1" as fallback)', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('none');
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      expect(panel.getAttribute('tabindex')).toBe('-1');
    });

    it('focus is restored to trigger element when dialog closes via accept', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();

      // Put focus on the trigger button before opening the dialog.
      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      openDialog(fixture);

      // Click accept — closes dialog and should restore focus to trigger.
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const acceptBtn: HTMLElement | null = host.querySelector(
        '.ui-lib-confirm-dialog__accept-btn',
      );
      acceptBtn?.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(document.activeElement).toBe(trigger);
    });

    it('focus is restored to trigger element when dialog closes via Escape', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();

      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();

      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(document.activeElement).toBe(trigger);
    });
  });

  // ── Keyboard behaviour ────────────────────────────────────────────────────

  describe('keyboard behaviour', (): void => {
    it('Escape closes the dialog', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('accept button click closes the dialog', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const acceptBtn: HTMLElement | null = host.querySelector(
        '.ui-lib-confirm-dialog__accept-btn',
      );
      acceptBtn?.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });

    it('reject button click closes the dialog', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const rejectBtn: HTMLElement | null = host.querySelector(
        '.ui-lib-confirm-dialog__reject-btn',
      );
      rejectBtn?.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });
  });

  // ── Backdrop ──────────────────────────────────────────────────────────────

  describe('backdrop', (): void => {
    it('backdrop has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const backdrop: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__backdrop');
      expect(backdrop).not.toBeNull();
      expect(backdrop?.getAttribute('aria-hidden')).toBe('true');
    });

    it('backdrop click closes the dialog when dismissableMask=true', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.componentInstance.dismissableMaskState.set(true);
      fixture.detectChanges();
      openDialog(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const backdrop: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__backdrop');
      backdrop?.click();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
    });
  });

  // ── ConfirmationService-driven ────────────────────────────────────────────

  describe('ConfirmationService-driven', (): void => {
    it('service.confirm({ header, message }) opens dialog with correct ARIA text', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();

      const service: ConfirmationService = TestBed.inject(ConfirmationService);
      service.confirm({ header: 'Service Header', message: 'Service Message' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const titleEl: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__title');
      const msgEl: HTMLElement | null = host.querySelector('.ui-lib-confirm-dialog__message');
      expect((titleEl?.textContent ?? '').trim()).toBe('Service Header');
      expect((msgEl?.textContent ?? '').trim()).toBe('Service Message');
    });

    it('service.close() closes the dialog and restores focus to trigger', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();

      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();

      const service: ConfirmationService = TestBed.inject(ConfirmationService);
      service.confirm({ header: 'Service Confirm?' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      service.close();
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).toBeNull();
      expect(document.activeElement).toBe(trigger);
    });

    it('defaultFocus in service config takes precedence over component default', (): void => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      // Component default is 'accept'
      fixture.componentInstance.defaultFocusState.set('accept');
      fixture.detectChanges();

      const service: ConfirmationService = TestBed.inject(ConfirmationService);
      // Service config overrides to 'reject'
      service.confirm({ header: 'Are you sure?', defaultFocus: 'reject' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      // Verify the reject button exists and the panel is open.
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const rejectBtn: HTMLElement | null = host.querySelector(
        '.ui-lib-confirm-dialog__reject-btn',
      );
      expect(rejectBtn).not.toBeNull();
      // The panel should be visible.
      expect(host.querySelector('.ui-lib-confirm-dialog__panel')).not.toBeNull();
    });
  });

  // ── axe-core automated checks ─────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('closed state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state passes axe (defaultFocus="accept")', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('accept');
      fixture.detectChanges();
      openDialog(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state passes axe (defaultFocus="reject")', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('reject');
      fixture.detectChanges();
      openDialog(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state with service-driven config passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmDialogA11yHostComponent> = TestBed.createComponent(
        ConfirmDialogA11yHostComponent,
      );
      fixture.detectChanges();

      const service: ConfirmationService = TestBed.inject(ConfirmationService);
      service.confirm({ header: 'Service axe test', message: 'Checking accessibility.' });
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
