import { Injectable, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import type { ToastMessage } from './toast.types';

/** Auto-incrementing counter for generating unique toast IDs. */
let toastMessageCounter: number = 0;

/** Generates a unique toast message ID. */
function generateToastId(): string {
  toastMessageCounter++;
  return `uilib-toast-${toastMessageCounter}`;
}

/**
 * ToastService — programmatic API for adding and removing toast notifications.
 *
 * Inject this service wherever you need to trigger toasts. The Toast component
 * subscribes to the message signal and renders all queued notifications.
 *
 * @example
 * constructor(private readonly toastService: ToastService) {}
 *
 * this.toastService.add({ severity: 'success', summary: 'Saved', detail: 'Your changes were saved.' });
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _messages: WritableSignal<ToastMessage[]> = signal<ToastMessage[]>([]);

  /** Read-only signal of the current toast message queue. */
  public readonly messages: Signal<ToastMessage[]> = this._messages.asReadonly();

  /**
   * Add a toast message to the queue.
   * The message receives a generated ID if one is not provided.
   * `closable` defaults to true when not specified.
   */
  public add(message: ToastMessage): void {
    const toastMessage: ToastMessage = {
      closable: true,
      severity: 'info',
      ...message,
      id: message.id ?? generateToastId(),
    };
    this._messages.update((current: ToastMessage[]): ToastMessage[] => [...current, toastMessage]);
  }

  /**
   * Remove a toast message by its ID.
   * Typically called by the Toast container after the exit animation completes.
   */
  public remove(messageId: string): void {
    this._messages.update((current: ToastMessage[]): ToastMessage[] =>
      current.filter((message: ToastMessage): boolean => message.id !== messageId)
    );
  }

  /**
   * Clear all messages, or only messages matching a specific container key.
   * @param key - When provided, only messages with this key are removed.
   */
  public clear(key?: string): void {
    if (key !== undefined) {
      this._messages.update((current: ToastMessage[]): ToastMessage[] =>
        current.filter((message: ToastMessage): boolean => message.key !== key)
      );
    } else {
      this._messages.set([]);
    }
  }
}
