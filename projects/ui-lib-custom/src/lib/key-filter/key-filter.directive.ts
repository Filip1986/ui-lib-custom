import {
  Directive,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  isDevMode,
  type InputSignal,
  type Signal,
} from '@angular/core';
import type { AfterViewInit, OnDestroy } from '@angular/core';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { KEY_FILTER_DEFAULTS, KEY_FILTER_PRESET_PATTERNS } from './key-filter.types';
import type { KeyFilterPreset } from './key-filter.types';

const PASTE_FILTER_ANNOUNCEMENT: string =
  'Characters not matching the allowed pattern were removed.';

let nextHintElementId: number = 0;

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
})
export class KeyFilterDirective implements AfterViewInit, OnDestroy {
  private readonly hostElementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);

  private eventTargetElement: HTMLInputElement | HTMLTextAreaElement | null = null;
  private hintElement: HTMLSpanElement | null = null;
  private hasWarnedForConflictingInputs: boolean = false;
  private hasWarnedForInvalidRegex: boolean = false;

  private readonly keydownHandler: EventListener = (event: Event): void => {
    this.onKeydown(event as KeyboardEvent);
  };
  private readonly pasteHandler: EventListener = (event: Event): void => {
    this.onPaste(event as ClipboardEvent);
  };
  private readonly dropHandler: EventListener = (event: Event): void => {
    this.onDrop(event as DragEvent);
  };

  private readonly activePattern: Signal<RegExp> = computed<RegExp>((): RegExp => {
    const regexValue: RegExp | string | null = this.regex();
    if (regexValue !== null) {
      const resolvedRegex: RegExp | null = this.resolveCustomRegex(regexValue);
      if (resolvedRegex !== null) {
        return resolvedRegex;
      }
    }

    const allowedCharacters: string | null = this.allowedChars();
    if (allowedCharacters !== null && allowedCharacters.length > 0) {
      return new RegExp(`[${this.escapeForCharacterClass(allowedCharacters)}]`);
    }

    const presetPattern: KeyFilterPreset | null = this.pattern();
    if (presetPattern !== null) {
      return KEY_FILTER_PRESET_PATTERNS[presetPattern];
    }

    const filter: KeyFilterPreset | RegExp = this.uilibKeyFilter();
    if (filter instanceof RegExp) {
      return filter;
    }

    return KEY_FILTER_PRESET_PATTERNS[filter];
  });

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
  /**
   * Accessible helper text linked through `aria-describedby`.
   */
  public readonly hintText: InputSignal<string | null> = input<string | null>(null);
  /**
   * Optional preset alias for `uilibKeyFilter`.
   */
  public readonly pattern: InputSignal<KeyFilterPreset | null> = input<KeyFilterPreset | null>(
    null
  );
  /**
   * Optional custom regex alias for `uilibKeyFilter`.
   */
  public readonly regex: InputSignal<RegExp | string | null> = input<RegExp | string | null>(null);
  /**
   * Optional character whitelist. Each character is escaped and allowed literally.
   */
  public readonly allowedChars: InputSignal<string | null> = input<string | null>(null);

  constructor() {
    effect((): void => {
      this.pattern();
      this.regex();
      this.warnIfPatternAndRegexAreBothProvided();
    });

    effect((): void => {
      this.hintText();
      this.syncHintElement();
    });
  }

  public ngAfterViewInit(): void {
    this.eventTargetElement = this.resolveEventTargetElement();
    if (this.eventTargetElement === null) {
      return;
    }

    this.eventTargetElement.addEventListener('keydown', this.keydownHandler);
    this.eventTargetElement.addEventListener('paste', this.pasteHandler);
    this.eventTargetElement.addEventListener('drop', this.dropHandler);
    this.syncHintElement();
  }

  public ngOnDestroy(): void {
    if (this.eventTargetElement !== null) {
      this.eventTargetElement.removeEventListener('keydown', this.keydownHandler);
      this.eventTargetElement.removeEventListener('paste', this.pasteHandler);
      this.eventTargetElement.removeEventListener('drop', this.dropHandler);
    }

    this.removeHintElement();
  }

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

    if (!this.activePattern().test(event.key)) {
      event.preventDefault();
    }
  }

  /** Strip disallowed characters from pasted text. */
  protected onPaste(event: ClipboardEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    const pasted: string = event.clipboardData?.getData('text') ?? '';
    const pattern: RegExp = this.activePattern();
    const filtered: string = pasted
      .split('')
      .filter((character: string): boolean => pattern.test(character))
      .join('');

    if (filtered === pasted) {
      return;
    }

    event.preventDefault();

    const target: HTMLInputElement | HTMLTextAreaElement | null =
      this.resolveActiveTextTarget(event);
    if (target === null) {
      return;
    }

    const start: number = target.selectionStart ?? target.value.length;
    const end: number = target.selectionEnd ?? target.value.length;
    target.value = target.value.slice(0, start) + filtered + target.value.slice(end);
    target.setSelectionRange(start + filtered.length, start + filtered.length);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    void this.liveAnnouncer.announce(PASTE_FILTER_ANNOUNCEMENT);
  }

  /** Strip disallowed characters from drag-and-dropped text. */
  protected onDrop(event: DragEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    const dropped: string = event.dataTransfer?.getData('text') ?? '';
    const pattern: RegExp = this.activePattern();
    const filtered: string = dropped
      .split('')
      .filter((character: string): boolean => pattern.test(character))
      .join('');

    if (filtered === dropped) {
      return;
    }

    event.preventDefault();
    const target: HTMLInputElement | HTMLTextAreaElement | null =
      this.resolveActiveTextTarget(event);
    if (target === null) {
      return;
    }

    const start: number = target.selectionStart ?? target.value.length;
    const end: number = target.selectionEnd ?? target.value.length;
    target.value = target.value.slice(0, start) + filtered + target.value.slice(end);
    target.setSelectionRange(start + filtered.length, start + filtered.length);
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private resolveEventTargetElement(): HTMLInputElement | HTMLTextAreaElement | null {
    const hostElement: HTMLElement = this.hostElementRef.nativeElement;

    if (this.isTextInputElement(hostElement)) {
      return hostElement;
    }

    const nestedInput: Element | null = hostElement.querySelector('input, textarea');
    if (nestedInput !== null && this.isTextInputElement(nestedInput)) {
      return nestedInput;
    }

    return null;
  }

  private resolveTextTargetFromEvent(event: Event): HTMLInputElement | HTMLTextAreaElement | null {
    const eventTarget: EventTarget | null = event.target;
    if (!(eventTarget instanceof Element)) {
      return null;
    }

    return this.isTextInputElement(eventTarget) ? eventTarget : null;
  }

  private resolveActiveTextTarget(event: Event): HTMLInputElement | HTMLTextAreaElement | null {
    const eventTarget: HTMLInputElement | HTMLTextAreaElement | null =
      this.resolveTextTargetFromEvent(event);
    if (eventTarget !== null) {
      return eventTarget;
    }

    return this.eventTargetElement;
  }

  private isTextInputElement(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
    const tagName: string = element.tagName.toLowerCase();
    return tagName === 'input' || tagName === 'textarea';
  }

  private syncHintElement(): void {
    if (this.eventTargetElement === null) {
      return;
    }

    const hintMessage: string = (this.hintText() ?? '').trim();
    if (hintMessage.length === 0) {
      this.removeHintElement();
      return;
    }

    if (this.hintElement === null) {
      this.hintElement = this.createHintElement();
      this.eventTargetElement.insertAdjacentElement('afterend', this.hintElement);
    }

    this.addDescribedByReference(this.eventTargetElement, this.hintElement.id);
    this.hintElement.textContent = hintMessage;
  }

  private createHintElement(): HTMLSpanElement {
    const hintElement: HTMLSpanElement = document.createElement('span');
    hintElement.id = `uilib-key-filter-hint-${nextHintElementId++}`;
    hintElement.setAttribute('data-uilib-key-filter-hint', '');
    hintElement.setAttribute('aria-live', 'polite');
    Object.assign(hintElement.style, {
      display: 'block',
      marginTop: '0.25rem',
      fontSize: '0.8125rem',
      color: 'var(--uilib-surface-600, #64748b)',
    });
    return hintElement;
  }

  private removeHintElement(): void {
    if (this.hintElement === null) {
      return;
    }

    if (this.eventTargetElement !== null) {
      this.removeDescribedByReference(this.eventTargetElement, this.hintElement.id);
    }

    this.hintElement.remove();
    this.hintElement = null;
  }

  private addDescribedByReference(element: Element, idToAdd: string): void {
    const existingDescribedBy: string = element.getAttribute('aria-describedby') ?? '';
    const tokens: string[] = existingDescribedBy
      .split(/\s+/)
      .map((token: string): string => token.trim())
      .filter((token: string): boolean => token.length > 0);

    if (!tokens.includes(idToAdd)) {
      tokens.push(idToAdd);
    }

    element.setAttribute('aria-describedby', tokens.join(' '));
  }

  private removeDescribedByReference(element: Element, idToRemove: string): void {
    const existingDescribedBy: string = element.getAttribute('aria-describedby') ?? '';
    const tokens: string[] = existingDescribedBy
      .split(/\s+/)
      .map((token: string): string => token.trim())
      .filter((token: string): boolean => token.length > 0 && token !== idToRemove);

    if (tokens.length === 0) {
      element.removeAttribute('aria-describedby');
      return;
    }

    element.setAttribute('aria-describedby', tokens.join(' '));
  }

  private warnIfPatternAndRegexAreBothProvided(): void {
    if (
      !isDevMode() ||
      this.pattern() === null ||
      this.regex() === null ||
      this.hasWarnedForConflictingInputs
    ) {
      if (this.pattern() === null || this.regex() === null) {
        this.hasWarnedForConflictingInputs = false;
      }
      return;
    }

    console.warn(
      '[uilibKeyFilter] Both "pattern" and "regex" were provided. The "regex" input takes precedence.'
    );
    this.hasWarnedForConflictingInputs = true;
  }

  private resolveCustomRegex(regexValue: RegExp | string): RegExp | null {
    if (regexValue instanceof RegExp) {
      return regexValue;
    }

    try {
      return new RegExp(regexValue);
    } catch (error: unknown) {
      if (isDevMode() && !this.hasWarnedForInvalidRegex) {
        console.warn('[uilibKeyFilter] Invalid "regex" input supplied.', error);
        this.hasWarnedForInvalidRegex = true;
      }
      return null;
    }
  }

  private escapeForCharacterClass(characters: string): string {
    return characters.replace(/[\\\-\]\[]/g, '\\$&');
  }
}
