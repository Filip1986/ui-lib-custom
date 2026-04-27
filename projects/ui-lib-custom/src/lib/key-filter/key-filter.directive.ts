import { Directive, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { KEY_FILTER_DEFAULTS, KEY_FILTER_PRESET_PATTERNS } from './key-filter.types';
import type { KeyFilterPreset } from './key-filter.types';

/**
 * KeyFilter directive — restricts keyboard input on any `<input>` or
 * `<textarea>` to characters matching a preset or a custom RegExp.
 *
 * Usage:
 * ```html
 * <!-- Built-in preset -->
 * <input [uilibKeyFilter]="'alphanum'" />
 *
 * <!-- Custom regular expression -->
 * <input [uilibKeyFilter]="customPattern" />
 *
 * <!-- Bypass (disable filtering) -->
 * <input [uilibKeyFilter]="'alpha'" [keyFilterBypass]="true" />
 * ```
 */
@Directive({
  selector: '[uilibKeyFilter]',
  standalone: true,
  host: {
    '(keydown)': 'onKeydown($event)',
    '(paste)': 'onPaste($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class KeyFilterDirective {
  /**
   * The active filter: a preset name or a custom RegExp tested per character.
   * Defaults to `'alphanum'` when no value is bound.
   */
  public readonly uilibKeyFilter: InputSignal<KeyFilterPreset | RegExp> = input<
    KeyFilterPreset | RegExp
  >('alphanum');

  /**
   * When `true`, all filtering is suspended and every keystroke passes through.
   * Useful for toggling validation off at runtime.
   */
  public readonly keyFilterBypass: InputSignal<boolean> = input<boolean>(
    KEY_FILTER_DEFAULTS.bypass
  );

  // ---------------------------------------------------------------------------
  // Host event handlers
  // ---------------------------------------------------------------------------

  /** Block keystrokes that do not match the active pattern. */
  protected onKeydown(event: KeyboardEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    // Always allow modifier-key combos (Ctrl+A, Cmd+C, Alt+…, etc.).
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    // Non-printable keys have a key-name longer than one character
    // (e.g. 'Enter', 'Backspace', 'ArrowLeft').  Always allow them.
    if (event.key.length > 1) {
      return;
    }

    if (!this.resolvePattern().test(event.key)) {
      event.preventDefault();
    }
  }

  /** Strip disallowed characters from pasted text. */
  protected onPaste(event: ClipboardEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    const pasted: string = event.clipboardData?.getData('text') ?? '';
    const pattern: RegExp = this.resolvePattern();
    const filtered: string = pasted
      .split('')
      .filter((character: string): boolean => pattern.test(character))
      .join('');

    if (filtered === pasted) {
      return;
    }

    event.preventDefault();

    const target: HTMLInputElement = event.target as HTMLInputElement;
    const start: number = target.selectionStart ?? target.value.length;
    const end: number = target.selectionEnd ?? target.value.length;
    target.value = target.value.slice(0, start) + filtered + target.value.slice(end);
    target.setSelectionRange(start + filtered.length, start + filtered.length);
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }

  /** Strip disallowed characters from drag-and-dropped text. */
  protected onDrop(event: DragEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    const dropped: string = event.dataTransfer?.getData('text') ?? '';
    const pattern: RegExp = this.resolvePattern();
    const filtered: string = dropped
      .split('')
      .filter((character: string): boolean => pattern.test(character))
      .join('');

    if (filtered === dropped) {
      return;
    }

    event.preventDefault();
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const start: number = target.selectionStart ?? target.value.length;
    const end: number = target.selectionEnd ?? target.value.length;
    target.value = target.value.slice(0, start) + filtered + target.value.slice(end);
    target.setSelectionRange(start + filtered.length, start + filtered.length);
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Resolve the active filter to a RegExp instance. */
  private resolvePattern(): RegExp {
    const filter: KeyFilterPreset | RegExp = this.uilibKeyFilter();
    if (filter instanceof RegExp) {
      return filter;
    }
    return KEY_FILTER_PRESET_PATTERNS[filter];
  }
}
