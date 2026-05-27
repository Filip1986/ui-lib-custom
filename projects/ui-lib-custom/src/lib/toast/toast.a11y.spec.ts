import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  bootstrapInfoCircle,
  bootstrapCheckCircle,
  bootstrapExclamationOctagon,
  bootstrapExclamationTriangle,
  bootstrapX,
} from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Toast } from './toast';
import { ToastService } from './toast.service';
import type { ToastMessage, ToastPosition } from './toast.types';

// ─── Typed query helpers ───────────────────────────────────────────────────────

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ─── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Toast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-toast [position]="position()" />`,
})
class ToastA11yHostComponent {
  public readonly position: WritableSignal<ToastPosition> = signal<ToastPosition>('top-right');
}

// ─── Setup helpers ─────────────────────────────────────────────────────────────

async function createFixture(): Promise<{
  fixture: ComponentFixture<ToastA11yHostComponent>;
  toastService: ToastService;
}> {
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

  const fixture: ComponentFixture<ToastA11yHostComponent> =
    TestBed.createComponent(ToastA11yHostComponent);
  const toastService: ToastService = TestBed.inject(ToastService);
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture, toastService };
}

async function addMessage(
  fixture: ComponentFixture<ToastA11yHostComponent>,
  toastService: ToastService,
  message: ToastMessage,
): Promise<void> {
  toastService.add(message);
  fixture.detectChanges();
  await fixture.whenStable();
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Toast Accessibility', (): void => {
  afterEach((): void => {
    TestBed.inject(ToastService).clear();
  });

  // ─── Container ARIA ─────────────────────────────────────────────────────────

  describe('container ARIA', (): void => {
    it('should have role="region" on the host element', async (): Promise<void> => {
      const { fixture } = await createFixture();
      const toastHost: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-toast') as HTMLElement;
      expect(toastHost.getAttribute('role')).toBe('region');
    });

    it('should have aria-label="Notifications" on the host element', async (): Promise<void> => {
      const { fixture } = await createFixture();
      const toastHost: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-toast') as HTMLElement;
      expect(toastHost.getAttribute('aria-label')).toBe('Notifications');
    });

    it('should NOT have aria-live attribute on the host element', async (): Promise<void> => {
      const { fixture } = await createFixture();
      const toastHost: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-toast') as HTMLElement;
      expect(toastHost.getAttribute('aria-live')).toBeNull();
    });

    it('should NOT have aria-atomic attribute on the host element', async (): Promise<void> => {
      const { fixture } = await createFixture();
      const toastHost: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-toast') as HTMLElement;
      expect(toastHost.getAttribute('aria-atomic')).toBeNull();
    });
  });

  // ─── Item ARIA roles ─────────────────────────────────────────────────────────

  describe('item ARIA roles', (): void => {
    it('should set role="alert" on an error severity item', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'error',
        summary: 'Upload failed',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('alert');
    });

    it('should set role="status" on a success severity item', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'success',
        summary: 'Saved',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('status');
    });

    it('should set role="status" on an info severity item', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'info',
        summary: 'Info notice',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('status');
    });

    it('should set role="status" on a warn severity item', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'warn',
        summary: 'Heads up',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('status');
    });

    it('should NOT have aria-live attribute on items (role drives announcement urgency)', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'error',
        summary: 'Critical error',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('aria-live')).toBeNull();
    });
  });

  // ─── Icon accessibility ──────────────────────────────────────────────────────

  describe('icon accessibility', (): void => {
    it('should have aria-hidden="true" on the severity icon inside each item', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'success',
        summary: 'Done',
        sticky: true,
      });
      const severityIcon: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__icon');
      expect(severityIcon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have aria-hidden="true" on the close button icon', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { summary: 'Test', sticky: true });
      const closeIcon: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__close ui-lib-icon');
      expect(closeIcon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ─── Close button accessibility ──────────────────────────────────────────────

  describe('close button accessibility', (): void => {
    it('should have type="button" on the close button', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { summary: 'Test', sticky: true });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton?.getAttribute('type')).toBe('button');
    });

    it('should include the message summary in the close button aria-label', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { summary: 'Changes saved', sticky: true });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close: Changes saved');
    });

    it('should use detail as fallback aria-label when summary is absent', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { detail: 'File upload failed', sticky: true });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close: File upload failed');
    });

    it('should fall back to generic close label when neither summary nor detail is set', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { severity: 'info', sticky: true });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close notification');
    });

    it('should not render the close button when closable=false', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        summary: 'Persistent',
        closable: false,
        sticky: true,
      });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton).toBeNull();
    });

    it('should have the close button focusable (no tabindex=-1 or disabled)', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { summary: 'Focusable', sticky: true });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton?.getAttribute('tabindex')).not.toBe('-1');
      expect(closeButton?.hasAttribute('disabled')).toBe(false);
    });
  });

  // ─── Keyboard accessibility ──────────────────────────────────────────────────

  describe('keyboard accessibility', (): void => {
    it('should dismiss the toast when the close button is activated via click (Enter/Space)', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { summary: 'Keyboard dismiss', sticky: true });

      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      closeButton?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.classList.contains('ui-lib-toast__item--closing')).toBe(true);
    });

    it('should give each close button a distinct aria-label when multiple toasts are visible', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      toastService.add({ severity: 'success', summary: 'File saved', sticky: true });
      toastService.add({ severity: 'error', summary: 'Upload failed', sticky: true });
      fixture.detectChanges();
      await fixture.whenStable();

      const closeButtons: HTMLButtonElement[] = queryAllEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      const labels: (string | null)[] = closeButtons.map((btn: HTMLButtonElement): string | null =>
        btn.getAttribute('aria-label'),
      );
      expect(labels[0]).toBe('Close: File saved');
      expect(labels[1]).toBe('Close: Upload failed');
      expect(new Set(labels).size).toBe(2);
    });

    it('should include summary in the close button aria-label for a sticky toast', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'warn',
        summary: 'Action required',
        sticky: true,
      });
      const closeButton: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        '.ui-lib-toast__close',
      );
      expect(closeButton?.getAttribute('aria-label')).toBe('Close: Action required');
    });
  });

  // ─── Live region announcement correctness ────────────────────────────────────

  describe('live region announcement correctness', (): void => {
    it('should use role="alert" for error toast (assertive — interrupts immediately)', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'error',
        summary: 'Error occurred',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('alert');
    });

    it('should use role="status" for success toast (polite — waits for idle)', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'success',
        summary: 'Saved',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('status');
    });

    it('should use role="status" for info toast', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, { severity: 'info', summary: 'FYI', sticky: true });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('status');
    });

    it('should use role="status" for warn toast', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'warn',
        summary: 'Caution',
        sticky: true,
      });
      const item: HTMLElement | null = queryEl(fixture, '.ui-lib-toast__item');
      expect(item?.getAttribute('role')).toBe('status');
    });
  });

  // ─── axe-core automated checks ───────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('should pass axe — empty state (no toasts)', async (): Promise<void> => {
      const { fixture } = await createFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('should pass axe — with error toast visible', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'error',
        summary: 'Upload failed',
        detail: 'The file exceeded the size limit.',
        sticky: true,
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('should pass axe — with success toast visible', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'success',
        summary: 'Changes saved',
        detail: 'Your profile has been updated.',
        sticky: true,
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('should pass axe — with multiple mixed-severity toasts visible', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      toastService.add({ severity: 'success', summary: 'Profile saved', sticky: true });
      toastService.add({ severity: 'error', summary: 'Network error', sticky: true });
      toastService.add({ severity: 'info', summary: 'New message', sticky: true });
      toastService.add({ severity: 'warn', summary: 'Low disk space', sticky: true });
      fixture.detectChanges();
      await fixture.whenStable();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('should pass axe — sticky toast with closable=false', async (): Promise<void> => {
      const { fixture, toastService } = await createFixture();
      await addMessage(fixture, toastService, {
        severity: 'warn',
        summary: 'Session expiring',
        detail: 'You will be logged out in 5 minutes.',
        sticky: true,
        closable: false,
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
