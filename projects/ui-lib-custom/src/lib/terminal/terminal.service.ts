import { Injectable, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import type { TerminalCommand, TerminalHistoryItem } from './terminal.types';

/** Auto-incrementing counter for unique command IDs. */
let terminalCommandCounter: number = 0;

/**
 * TerminalService — communication bridge between the Terminal component and the consumer.
 *
 * The Terminal component calls `submitCommand()` when the user presses Enter.
 * The consumer watches the `command` signal (via `effect()`) and calls `sendResponse()`
 * with a response string to display in the terminal.
 *
 * @example
 * // In your component:
 * private readonly terminalService = inject(TerminalService);
 *
 * constructor() {
 *   effect(() => {
 *     const cmd = this.terminalService.command();
 *     if (cmd !== null) {
 *       this.terminalService.sendResponse(this.processCommand(cmd.text));
 *     }
 *   });
 * }
 *
 * private processCommand(text: string): string {
 *   if (text === 'help') return 'Available commands: help, date, clear';
 *   if (text === 'date') return new Date().toLocaleString();
 *   return `Unknown command: ${text}`;
 * }
 */
@Injectable({ providedIn: 'root' })
export class TerminalService {
  private readonly _history: WritableSignal<TerminalHistoryItem[]> = signal<TerminalHistoryItem[]>(
    []
  );
  private readonly _command: WritableSignal<TerminalCommand | null> =
    signal<TerminalCommand | null>(null);

  /** Read-only signal of the terminal command/response history. */
  public readonly history: Signal<TerminalHistoryItem[]> = this._history.asReadonly();

  /**
   * Read-only signal that emits a new TerminalCommand each time the user submits input.
   * The `id` is incremented for every submission so repeated commands still trigger effects.
   * Consumers should react to this with `effect()` and call `sendResponse()`.
   */
  public readonly command: Signal<TerminalCommand | null> = this._command.asReadonly();

  /**
   * Called by the Terminal component when the user submits a command.
   * Appends a history item (with `response: null`) and updates the command signal.
   * @internal — not intended for direct use outside the Terminal component.
   */
  public submitCommand(text: string): void {
    terminalCommandCounter++;
    this._history.update((items: TerminalHistoryItem[]): TerminalHistoryItem[] => [
      ...items,
      { command: text, response: null },
    ]);
    this._command.set({ id: terminalCommandCounter, text });
  }

  /**
   * Send a response to the most recent pending command.
   * Call this from your effect() after processing the command signal.
   * @param response — the text to display below the last command line.
   */
  public sendResponse(response: string): void {
    this._history.update((items: TerminalHistoryItem[]): TerminalHistoryItem[] => {
      const updated: TerminalHistoryItem[] = [...items];
      for (let index: number = updated.length - 1; index >= 0; index--) {
        const item: TerminalHistoryItem | undefined = updated[index];
        if (item !== undefined && item.response === null) {
          updated[index] = { ...item, response };
          break;
        }
      }
      return updated;
    });
  }

  /** Clear all terminal history and reset the pending command. */
  public clear(): void {
    this._history.set([]);
    this._command.set(null);
  }
}
