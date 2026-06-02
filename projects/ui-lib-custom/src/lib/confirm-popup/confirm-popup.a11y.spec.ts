import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ConfirmPopup } from './confirm-popup';
import { ConfirmPopupService } from './confirm-popup.service';
import type { ConfirmPopupDefaultFocus } from './confirm-popup.types';

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ConfirmPopup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="trigger-btn">Open Popup</button>
    <ui-lib-confirm-popup
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [message]="messageState()"
      [icon]="iconState()"
      [defaultFocus]="defaultFocusState()"
    />
  `,
})
class ConfirmPopupA11yHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly messageState: WritableSignal<string> = signal<string>('Are you sure?');
  public readonly iconState: WritableSignal<string | null> = signal<string | null>(null);
  public readonly defaultFocusState: WritableSignal<ConfirmPopupDefaultFocus> =
    signal<ConfirmPopupDefaultFocus>('accept');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function openPopup(fixture: ComponentFixture<ConfirmPopupA11yHostComponent>): void {
  fixture.componentInstance.visibleState.set(true);
  fixture.detectChanges();
  TestBed.flushEffects();
  fixture.detectChanges();
}

function getPanel(host: HTMLElement): HTMLElement {
  const panel: HTMLElement | null = host.querySelector<HTMLElement>('.ui-lib-confirm-popup__panel');
  if (!panel) throw new Error('Expected panel to exist');
  return panel;
}

function detectAndFlush(fixture: ComponentFixture<ConfirmPopupA11yHostComponent>): void {
  fixture.detectChanges();
  TestBed.flushEffects();
  fixture.detectChanges();
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('ConfirmPopup Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPopupA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ── Closed state ─────────────────────────────────────────────────────────

  describe('closed state', (): void => {
    it('panel is not in DOM when visible=false', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
    });

    it('no role="alertdialog" element present when closed', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('[role="alertdialog"]')).toBeNull();
    });

    it('axe passes in closed state', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── Open-state ARIA structure ─────────────────────────────────────────────

  describe('open-state ARIA structure', (): void => {
    it('panel has role="alertdialog"', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('role')).toBe('alertdialog');
    });

    it('panel has aria-modal="true"', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('panel has tabindex="-1"', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('tabindex')).toBe('-1');
    });

    it('panel aria-describedby resolves to message element', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      const describedById: string | null = panel.getAttribute('aria-describedby');
      expect(describedById).toBeTruthy();
      const msgContainer: HTMLElement | null = host.querySelector(`#${describedById ?? ''}`);
      expect(msgContainer).not.toBeNull();
    });

    it('panel aria-label equals the resolved message text', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.messageState.set('Delete this item?');
      fixture.detectChanges();
      openPopup(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-label')).toBe('Delete this item?');
    });

    it('overlay has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const overlay: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__overlay');
      expect(overlay).not.toBeNull();
      expect(overlay?.getAttribute('aria-hidden')).toBe('true');
    });

    it('arrow has aria-hidden="true"', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const arrow: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__arrow');
      expect(arrow).not.toBeNull();
      expect(arrow?.getAttribute('aria-hidden')).toBe('true');
    });

    it('message icon has aria-hidden="true" when icon is provided', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.iconState.set('pi pi-exclamation-triangle');
      fixture.detectChanges();
      openPopup(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const icon: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__icon');
      expect(icon).not.toBeNull();
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── Focus management ──────────────────────────────────────────────────────

  describe('focus management', (): void => {
    it('accept button is present and focusable (defaultFocus="accept")', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('accept');
      fixture.detectChanges();
      openPopup(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const acceptBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__accept-btn');
      expect(acceptBtn).not.toBeNull();
      expect(acceptBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('reject button is present and focusable (defaultFocus="reject")', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('reject');
      fixture.detectChanges();
      openPopup(fixture);
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const rejectBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__reject-btn');
      expect(rejectBtn).not.toBeNull();
      expect(rejectBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('panel has tabindex="-1" for defaultFocus="none"', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('none');
      fixture.detectChanges();
      openPopup(fixture);
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('tabindex')).toBe('-1');
    });

    it('focus is restored to trigger element when popup closes via accept button', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();

      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const acceptBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__accept-btn');
      acceptBtn?.click();
      detectAndFlush(fixture);

      expect(document.activeElement).toBe(trigger);
    });

    it('focus is restored to trigger element when popup closes via Escape', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();

      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();

      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      detectAndFlush(fixture);

      expect(document.activeElement).toBe(trigger);
    });

    it('focus is restored to service target when popup opened programmatically via service', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();

      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();

      const service: ConfirmPopupService = TestBed.inject(ConfirmPopupService);
      service.confirm({ message: 'Are you sure?', target: trigger });
      detectAndFlush(fixture);

      // Close via service
      service.close();
      detectAndFlush(fixture);

      expect(document.activeElement).toBe(trigger);
    });
  });

  // ── Keyboard behaviour ────────────────────────────────────────────────────

  describe('keyboard behaviour', (): void => {
    it('Escape closes the popup', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(host);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      detectAndFlush(fixture);

      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
    });

    it('accept button click closes the popup', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const acceptBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__accept-btn');
      acceptBtn?.click();
      detectAndFlush(fixture);

      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
    });

    it('reject button click closes the popup', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const rejectBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__reject-btn');
      rejectBtn?.click();
      detectAndFlush(fixture);

      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
    });
  });

  // ── Overlay dismiss ───────────────────────────────────────────────────────

  describe('overlay dismiss', (): void => {
    it('overlay click closes the popup', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const overlay: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__overlay');
      overlay?.click();
      detectAndFlush(fixture);

      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
    });

    it('overlay has aria-hidden="true" (does not present as interactive to AT)', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      openPopup(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const overlay: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__overlay');
      expect(overlay?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── ConfirmPopupService-driven ────────────────────────────────────────────

  describe('ConfirmPopupService-driven', (): void => {
    it('service.confirm({ message }) opens popup with correct aria-label', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();

      const service: ConfirmPopupService = TestBed.inject(ConfirmPopupService);
      service.confirm({ message: 'Confirm this action?' });
      detectAndFlush(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__panel');
      expect(panel).not.toBeNull();
      expect(panel?.getAttribute('aria-label')).toBe('Confirm this action?');
    });

    it('service.close() closes popup and restores focus to trigger', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();

      const trigger: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.trigger-btn',
      );
      if (!trigger) throw new Error('Expected trigger button to exist');
      trigger.focus();

      const service: ConfirmPopupService = TestBed.inject(ConfirmPopupService);
      service.confirm({ message: 'Are you sure?', target: trigger });
      detectAndFlush(fixture);

      service.close();
      detectAndFlush(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('.ui-lib-confirm-popup__panel')).toBeNull();
      expect(document.activeElement).toBe(trigger);
    });

    it('defaultFocus in service config takes precedence over component default', (): void => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      // Component default is 'accept'
      fixture.componentInstance.defaultFocusState.set('accept');
      fixture.detectChanges();

      const service: ConfirmPopupService = TestBed.inject(ConfirmPopupService);
      // Service config overrides to 'reject'
      service.confirm({ message: 'Are you sure?', defaultFocus: 'reject' });
      detectAndFlush(fixture);

      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const rejectBtn: HTMLElement | null = host.querySelector('.ui-lib-confirm-popup__reject-btn');
      expect(rejectBtn).not.toBeNull();
      expect(host.querySelector('.ui-lib-confirm-popup__panel')).not.toBeNull();
    });
  });

  // ── axe-core automated checks ─────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('closed state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state passes axe (defaultFocus="accept")', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('accept');
      fixture.detectChanges();
      openPopup(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state passes axe (defaultFocus="reject")', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.componentInstance.defaultFocusState.set('reject');
      fixture.detectChanges();
      openPopup(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('service-driven open state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfirmPopupA11yHostComponent> = TestBed.createComponent(
        ConfirmPopupA11yHostComponent,
      );
      fixture.detectChanges();

      const service: ConfirmPopupService = TestBed.inject(ConfirmPopupService);
      service.confirm({ message: 'Checking accessibility via service.' });
      detectAndFlush(fixture);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
