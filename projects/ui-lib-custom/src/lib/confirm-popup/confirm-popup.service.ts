import type { Signal, WritableSignal } from '@angular/core';
import { computed, Injectable, signal } from '@angular/core';

import type { ConfirmPopupConfig } from './confirm-popup.types';

/**
 * Service that drives ConfirmPopup components programmatically.
 *
 * Call `confirm()` with a ConfirmPopupConfig (including a `target` element) to show the popup,
 * and `close()` to hide it. Pair with a `<ui-lib-confirm-popup>` in your layout.
 *
 * @example
 * constructor(private readonly confirmPopupService: ConfirmPopupService) {}
 *
 * onDeleteClick(event: MouseEvent): void {
 *   this.confirmPopupService.confirm({
 *     target: event.currentTarget as HTMLElement,
 *     message: 'Are you sure you want to delete this item?',
 *     icon: 'pi pi-trash',
 *     accept: () => this.doDelete(),
 *   });
 * }
 */
@Injectable({ providedIn: 'root' })
export class ConfirmPopupService {
  private readonly activeConfig: WritableSignal<ConfirmPopupConfig | null> =
    signal<ConfirmPopupConfig | null>(null);

  /** Current active popup config, or null when no popup is pending. */
  public readonly confirmation: Signal<ConfirmPopupConfig | null> =
    computed<ConfirmPopupConfig | null>((): ConfirmPopupConfig | null => this.activeConfig());

  /**
   * Show a confirm popup anchored to the target element in the config.
   * Replaces any currently active popup.
   */
  public confirm(config: ConfirmPopupConfig): void {
    this.activeConfig.set(config);
  }

  /**
   * Programmatically close the active confirm popup.
   * If `key` is provided, only the popup whose key matches is closed.
   */
  public close(key?: string): void {
    const current: ConfirmPopupConfig | null = this.activeConfig();
    const currentKey: string = current?.key ?? '';
    const targetKey: string = key ?? '';

    if (targetKey && currentKey !== targetKey) {
      return;
    }

    this.activeConfig.set(null);
  }
}
