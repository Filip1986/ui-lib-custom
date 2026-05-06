import { Injectable, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import type { ConfirmationConfig } from './confirm-dialog.types';

/**
 * Service that drives ConfirmDialog components programmatically.
 *
 * Call `confirm()` with a ConfirmationConfig to show a dialog, and `close()` to hide it.
 * Pair with a `<ui-lib-confirm-dialog>` in your template; use the `key` input when multiple
 * confirm dialogs coexist on the page so each receives only its intended confirmation.
 *
 * @example
 * // In the component that triggers the confirmation:
 * constructor(private readonly confirmationService: ConfirmationService) {}
 *
 * deleteItem(): void {
 *   this.confirmationService.confirm({
 *     header: 'Delete item',
 *     message: 'Are you sure you want to delete this item?',
 *     icon: 'pi pi-trash',
 *     accept: () => this.doDelete(),
 *   });
 * }
 */
@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private readonly activeConfig: WritableSignal<ConfirmationConfig | null> =
    signal<ConfirmationConfig | null>(null);

  /** Current active confirmation config, or null when no dialog is pending. */
  public readonly confirmation: Signal<ConfirmationConfig | null> =
    computed<ConfirmationConfig | null>((): ConfirmationConfig | null => this.activeConfig());

  /**
   * Show a confirmation dialog with the provided configuration.
   * Replaces any currently active confirmation.
   */
  public confirm(config: ConfirmationConfig): void {
    this.activeConfig.set(config);
  }

  /**
   * Programmatically close the active confirmation dialog.
   * If `key` is provided, only the dialog whose key matches is closed.
   */
  public close(key?: string): void {
    const current: ConfirmationConfig | null = this.activeConfig();
    const currentKey: string = current?.key ?? '';
    const targetKey: string = key ?? '';

    if (targetKey && currentKey !== targetKey) {
      return;
    }

    this.activeConfig.set(null);
  }
}
