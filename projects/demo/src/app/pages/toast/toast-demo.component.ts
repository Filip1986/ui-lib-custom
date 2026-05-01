import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Toast } from 'ui-lib-custom/toast';
import { ToastService } from 'ui-lib-custom/toast';
import type { ToastPosition, ToastSeverity, ToastVariant } from 'ui-lib-custom/toast';
import { Button } from 'ui-lib-custom/button';

/**
 * Demo page for the Toast component.
 */
@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [Toast, Button],
  templateUrl: './toast-demo.component.html',
  styleUrl: './toast-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemoComponent {
  private readonly toastService: ToastService = inject(ToastService);

  /** Currently selected position for interactive demos. */
  public selectedPosition: ToastPosition = 'top-right';

  /** Currently selected variant for interactive demos. */
  public selectedVariant: ToastVariant = 'bootstrap';

  /** Available positions for the position switcher. */
  public readonly positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  /** Available variants. */
  public readonly variants: ToastVariant[] = ['material', 'bootstrap', 'minimal'];

  /** Show a success toast. */
  public showSuccess(): void {
    this.toastService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'The operation completed successfully.',
      life: 4000,
    });
  }

  /** Show an info toast. */
  public showInfo(): void {
    this.toastService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'Here is something you should know about.',
      life: 4000,
    });
  }

  /** Show a warning toast. */
  public showWarn(): void {
    this.toastService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please review this before proceeding.',
      life: 4000,
    });
  }

  /** Show an error toast. */
  public showError(): void {
    this.toastService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong. Please try again.',
      life: 4000,
    });
  }

  /** Show multiple toasts at once. */
  public showMultiple(): void {
    this.toastService.add({
      severity: 'success',
      summary: 'Upload complete',
      detail: 'report.pdf',
    });
    this.toastService.add({ severity: 'info', summary: 'Processing', detail: '3 files queued.' });
    this.toastService.add({
      severity: 'warn',
      summary: 'Low storage',
      detail: 'Only 2 GB remaining.',
    });
  }

  /** Show a sticky toast that does not auto-dismiss. */
  public showSticky(): void {
    this.toastService.add({
      severity: 'warn',
      summary: 'Sticky notification',
      detail: 'This toast will not auto-dismiss. Close it manually.',
      sticky: true,
    });
  }

  /** Show a toast without a close button. */
  public showNonClosable(): void {
    this.toastService.add({
      severity: 'info',
      summary: 'Processing...',
      detail: 'This will dismiss automatically in 3 seconds.',
      closable: false,
      life: 3000,
    });
  }

  /** Show a toast with a short life for the quick-dismiss demo. */
  public showShortLife(): void {
    this.toastService.add({
      severity: 'success',
      summary: 'Quick',
      detail: 'Dismissed in 1.5 seconds.',
      life: 1500,
    });
  }

  /** Show a toast with a long life. */
  public showLongLife(): void {
    this.toastService.add({
      severity: 'info',
      summary: 'Persistent',
      detail: 'Dismissed in 8 seconds.',
      life: 8000,
    });
  }

  /** Show a toast routed to the secondary keyed container. */
  public showKeyed(): void {
    this.toastService.add({
      key: 'secondary',
      severity: 'info',
      summary: 'Keyed toast',
      detail: 'This appears in the secondary container (bottom-left).',
      sticky: true,
    });
  }

  /** Clear all toasts. */
  public clearAll(): void {
    this.toastService.clear();
  }

  /** Show a toast using the currently selected position and variant. */
  public showPositioned(severity: ToastSeverity): void {
    this.toastService.add({
      severity,
      summary: severity.charAt(0).toUpperCase() + severity.slice(1),
      detail: 'Showing at ' + this.selectedPosition + ' (' + this.selectedVariant + ').',
      life: 5000,
    });
  }
}
