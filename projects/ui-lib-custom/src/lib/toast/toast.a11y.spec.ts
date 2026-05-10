import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  bootstrapInfoCircle,
  bootstrapCheckCircle,
  bootstrapExclamationOctagon,
  bootstrapExclamationTriangle,
  bootstrapX,
} from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { Toast } from './toast';
import { ToastService } from './toast.service';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import type { ToastSeverity } from './toast.types';

// ── Host component ─────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Toast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-toast [position]="position()" />`,
})
class ToastA11yHostComponent {
  public readonly position: WritableSignal<'top-right' | 'bottom-left'> = signal<
    'top-right' | 'bottom-left'
  >('top-right');
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<ToastA11yHostComponent>): HTMLElement {
  const host: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-toast'
  );
  if (!host) throw new Error('Expected ui-lib-toast host to exist');
  return host;
}

function getItems(fixture: ComponentFixture<ToastA11yHostComponent>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-toast__item')
  );
}

function addMessage(
  fixture: ComponentFixture<ToastA11yHostComponent>,
  toastService: ToastService,
  severity: ToastSeverity = 'info',
  summary: string = 'Test notification',
  options: { closable?: boolean; sticky?: boolean } = {}
): void {
  toastService.add({ severity, summary, sticky: true, closable: options.closable, ...options });
  fixture.detectChanges();
}

// ── Suite ──────────────────────────────────────────────────────────────────────

describe('Toast Accessibility', (): void => {
  let fixture: ComponentFixture<ToastA11yHostComponent>;
  let toastService: ToastService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ToastA11yHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideIcons({
          bootstrapInfoCircle,
          bootstrapCheckCircle,
          bootstrapExclamationOctagon,
          bootstrapExclamationTriangle,
          bootstrapX,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastA11yHostComponent);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  afterEach((): void => {
    toastService.clear();
  });

  // ── Container ARIA ─────────────────────────────────────────────────────────

  describe('container ARIA', (): void => {
    it('has role="region" on the host', (): void => {
      const host: HTMLElement = getHost(fixture);
      expect(host.getAttribute('role')).toBe('region');
    });

    it('has aria-label="Notifications" on the host', (): void => {
      const host: HTMLElement = getHost(fixture);
      expect(host.getAttribute('aria-label')).toBe('Notifications');
    });

    it('does NOT have aria-live on the host (live regions are on items)', (): void => {
      const host: HTMLElement = getHost(fixture);
      expect(host.getAttribute('aria-live')).toBeNull();
    });

    it('does NOT have aria-atomic on the host', (): void => {
      const host: HTMLElement = getHost(fixture);
      expect(host.getAttribute('aria-atomic')).toBeNull();
    });
  });

  // ── Item roles per severity ────────────────────────────────────────────────

  describe('item role per severity', (): void => {
    it('error toast has role="alert" (assertive live region)', (): void => {
      addMessage(fixture, toastService, 'error', 'Error occurred');
      const items: HTMLElement[] = getItems(fixture);
      expect(items.length).toBe(1);
      expect(items[0]?.getAttribute('role')).toBe('alert');
    });

    it('success toast has role="status" (polite live region)', (): void => {
      addMessage(fixture, toastService, 'success', 'Saved successfully');
      const items: HTMLElement[] = getItems(fixture);
      expect(items[0]?.getAttribute('role')).toBe('status');
    });

    it('info toast has role="status"', (): void => {
      addMessage(fixture, toastService, 'info', 'Info message');
      const items: HTMLElement[] = getItems(fixture);
      expect(items[0]?.getAttribute('role')).toBe('status');
    });

    it('warn toast has role="status"', (): void => {
      addMessage(fixture, toastService, 'warn', 'Warning message');
      const items: HTMLElement[] = getItems(fixture);
      expect(items[0]?.getAttribute('role')).toBe('status');
    });

    it('items do NOT have a standalone aria-live attribute', (): void => {
      addMessage(fixture, toastService, 'error', 'Critical');
      addMessage(fixture, toastService, 'success', 'Done');
      const items: HTMLElement[] = getItems(fixture);
      for (const item of items) {
        expect(item.getAttribute('aria-live')).toBeNull();
      }
    });
  });

  // ── Close button ───────────────────────────────────────────────────────────

  describe('close button', (): void => {
    it('has a contextual aria-label including the summary', (): void => {
      addMessage(fixture, toastService, 'success', 'File uploaded');
      const closeBtn: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-toast__close');
      expect(closeBtn).not.toBeNull();
      expect(closeBtn?.getAttribute('aria-label')).toBe('Dismiss: File uploaded');
    });

    it('falls back to "Dismiss: notification" when summary is absent', (): void => {
      toastService.add({ detail: 'No summary here', sticky: true });
      fixture.detectChanges();
      const closeBtn: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-toast__close');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Dismiss: notification');
    });

    it('is not present when closable=false', (): void => {
      addMessage(fixture, toastService, 'info', 'Permanent', { closable: false });
      const closeBtn: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-toast__close');
      expect(closeBtn).toBeNull();
    });

    it('is a <button type="button">', (): void => {
      addMessage(fixture, toastService, 'info', 'Test');
      const closeBtn: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLButtonElement>('.ui-lib-toast__close');
      expect(closeBtn?.tagName).toBe('BUTTON');
      expect(closeBtn?.getAttribute('type')).toBe('button');
    });

    it('close button icon is aria-hidden', (): void => {
      addMessage(fixture, toastService, 'info', 'Test');
      const closeBtn: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-toast__close');
      const icon: HTMLElement | null = closeBtn?.querySelector('[aria-hidden]') ?? null;
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── Severity icon ──────────────────────────────────────────────────────────

  describe('severity icon', (): void => {
    it('severity icon is aria-hidden', (): void => {
      addMessage(fixture, toastService, 'success', 'Done');
      const icon: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-toast__icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── Multiple messages ──────────────────────────────────────────────────────

  describe('multiple messages', (): void => {
    it('each item has its own role based on severity', (): void => {
      addMessage(fixture, toastService, 'success', 'A');
      addMessage(fixture, toastService, 'error', 'B');
      addMessage(fixture, toastService, 'info', 'C');
      const items: HTMLElement[] = getItems(fixture);
      expect(items.length).toBe(3);
      expect(items[0]?.getAttribute('role')).toBe('status');
      expect(items[1]?.getAttribute('role')).toBe('alert');
      expect(items[2]?.getAttribute('role')).toBe('status');
    });

    it('each close button has a distinct aria-label', (): void => {
      addMessage(fixture, toastService, 'success', 'First');
      addMessage(fixture, toastService, 'error', 'Second');
      const closeBtns: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-toast__close')
      );
      expect(closeBtns.length).toBe(2);
      expect(closeBtns[0]?.getAttribute('aria-label')).toBe('Dismiss: First');
      expect(closeBtns[1]?.getAttribute('aria-label')).toBe('Dismiss: Second');
    });
  });

  // ── axe-core ──────────────────────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('passes axe with no visible toasts', async (): Promise<void> => {
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with a success toast', async (): Promise<void> => {
      addMessage(fixture, toastService, 'success', 'Changes saved');
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with an error toast', async (): Promise<void> => {
      addMessage(fixture, toastService, 'error', 'Request failed');
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with multiple toasts of mixed severity', async (): Promise<void> => {
      addMessage(fixture, toastService, 'success', 'Saved');
      addMessage(fixture, toastService, 'warn', 'Low disk space');
      addMessage(fixture, toastService, 'error', 'Network error');
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with a non-closable toast', async (): Promise<void> => {
      addMessage(fixture, toastService, 'info', 'Loading…', { closable: false });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
