import { Directive, ElementRef, Renderer2, effect, inject, input, isDevMode } from '@angular/core';
import type { AfterViewInit, InputSignal, OnDestroy } from '@angular/core';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { KEY_FILTER_DEFAULTS, KEY_FILTER_PRESET_PATTERNS } from './key-filter.types';
import type { KeyFilterPreset } from './key-filter.types';

const PASTE_FILTER_ANNOUNCEMENT: string =
  'Characters not matching the allowed pattern were removed.';

const VISUALLY_HIDDEN_STYLES: Readonly<Record<string, string>> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  'white-space': 'nowrap',
  border: '0',
};

let nextKeyFilterHintId: number = 0;

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
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);

  private removeKeydownListener: (() => void) | null = null;
  private removePasteListener: (() => void) | null = null;
  private removeDropListener: (() => void) | null = null;
  private hintElement: HTMLSpanElement | null = null;
  private viewInitialized: boolean = false;
  private hasWarnedPatternConflict: boolean = false;
  private readonly patternCloneCache: WeakMap<RegExp, RegExp> = new WeakMap<RegExp, RegExp>();

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
  public readonly hintText: InputSignal<string | null> = input<string | null>(null);
  public readonly pattern: InputSignal<KeyFilterPreset | null> = input<KeyFilterPreset | null>(
    null
  );
  public readonly regex: InputSignal<RegExp | null> = input<RegExp | null>(null);

  constructor() {
    effect((): void => {
      this.pattern();
      this.regex();
      this.warnWhenPatternAndRegexAreBothSet();
    });

    effect((): void => {
      const hintText: string | null = this.hintText();
      if (!this.viewInitialized) {
        return;
      }
      this.syncHintElement(hintText);
    });
  }

  public ngAfterViewInit(): void {
    const hostElement: HTMLElement = this.elementRef.nativeElement;
    this.removeKeydownListener = this.renderer.listen(
      hostElement,
      'keydown',
      (event: KeyboardEvent): void => this.onKeydown(event)
    );
    this.removePasteListener = this.renderer.listen(
      hostElement,
      'paste',
      (event: ClipboardEvent): void => this.onPaste(event)
    );
    this.removeDropListener = this.renderer.listen(hostElement, 'drop', (event: DragEvent): void =>
      this.onDrop(event)
    );

    this.viewInitialized = true;
    this.syncHintElement(this.hintText());
  }

  public ngOnDestroy(): void {
    this.removeKeydownListener?.();
    this.removePasteListener?.();
    this.removeDropListener?.();
    this.removeKeydownListener = null;
    this.removePasteListener = null;
    this.removeDropListener = null;
    this.removeHintElement();
  }

  /** Block keystrokes that do not match the active pattern. */
  private onKeydown(event: KeyboardEvent): void {
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

    if (!this.matchesPattern(this.resolvePattern(), event.key)) {
      event.preventDefault();
    }
  }

  /** Strip disallowed characters from pasted text. */
  private onPaste(event: ClipboardEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    const pasted: string = event.clipboardData?.getData('text') ?? '';
    const pattern: RegExp = this.resolvePattern();
    const filtered: string = pasted
      .split('')
      .filter((character: string): boolean => this.matchesPattern(pattern, character))
      .join('');

    if (filtered === pasted) {
      return;
    }

    event.preventDefault();

    const target: HTMLInputElement | HTMLTextAreaElement | null = this.resolveTargetControl(
      event.target
    );
    if (!target) {
      return;
    }
    const start: number = target.selectionStart ?? target.value.length;
    const end: number = target.selectionEnd ?? target.value.length;
    target.value = target.value.slice(0, start) + filtered + target.value.slice(end);
    target.setSelectionRange(start + filtered.length, start + filtered.length);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    void this.liveAnnouncer.announce(PASTE_FILTER_ANNOUNCEMENT, 'polite');
  }

  /** Strip disallowed characters from drag-and-dropped text. */
  private onDrop(event: DragEvent): void {
    if (this.keyFilterBypass()) {
      return;
    }

    const dropped: string = event.dataTransfer?.getData('text') ?? '';
    const pattern: RegExp = this.resolvePattern();
    const filtered: string = dropped
      .split('')
      .filter((character: string): boolean => this.matchesPattern(pattern, character))
      .join('');

    if (filtered === dropped) {
      return;
    }

    event.preventDefault();
    const target: HTMLInputElement | HTMLTextAreaElement | null = this.resolveTargetControl(
      event.target
    );
    if (!target) {
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

  private matchesPattern(pattern: RegExp, value: string): boolean {
    if (pattern.global || pattern.sticky) {
      const safePattern: RegExp =
        this.patternCloneCache.get(pattern) ?? new RegExp(pattern.source, pattern.flags);
      this.patternCloneCache.set(pattern, safePattern);
      safePattern.lastIndex = 0;
      return safePattern.test(value);
    }

    return pattern.test(value);
  }

  /** Resolve the active filter to a RegExp instance. */
  private resolvePattern(): RegExp {
    const patternPreset: KeyFilterPreset | null = this.pattern();
    const customRegex: RegExp | null = this.regex();

    if (customRegex !== null) {
      return customRegex;
    }

    if (patternPreset !== null) {
      return KEY_FILTER_PRESET_PATTERNS[patternPreset];
    }

    const filter: KeyFilterPreset | RegExp = this.uilibKeyFilter();
    if (filter instanceof RegExp) {
      return filter;
    }
    return KEY_FILTER_PRESET_PATTERNS[filter];
  }

  private warnWhenPatternAndRegexAreBothSet(): void {
    const patternPreset: KeyFilterPreset | null = this.pattern();
    const customRegex: RegExp | null = this.regex();
    const hasConflict: boolean = patternPreset !== null && customRegex !== null;

    if (!hasConflict) {
      this.hasWarnedPatternConflict = false;
      return;
    }

    if (!isDevMode() || this.hasWarnedPatternConflict) {
      return;
    }

    this.hasWarnedPatternConflict = true;
    console.warn(
      '[uilibKeyFilter] Both pattern and regex are set. The regex input takes precedence.'
    );
  }

  private resolveTargetControl(
    target: EventTarget | null
  ): HTMLInputElement | HTMLTextAreaElement | null {
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      return target;
    }
    return this.resolveHostControl();
  }

  private resolveHostControl(): HTMLInputElement | HTMLTextAreaElement | null {
    const hostElement: HTMLElement = this.elementRef.nativeElement;
    if (hostElement instanceof HTMLInputElement || hostElement instanceof HTMLTextAreaElement) {
      return hostElement;
    }

    const nestedControl: Element | null = hostElement.querySelector('input, textarea');
    if (nestedControl instanceof HTMLInputElement || nestedControl instanceof HTMLTextAreaElement) {
      return nestedControl;
    }
    return null;
  }

  private syncHintElement(hintText: string | null): void {
    const normalizedHintText: string = hintText?.trim() ?? '';
    if (normalizedHintText.length === 0) {
      this.removeHintElement();
      return;
    }

    const hostElement: HTMLElement = this.elementRef.nativeElement;
    const parentElement: HTMLElement | null = hostElement.parentElement;
    const control: HTMLInputElement | HTMLTextAreaElement | null = this.resolveHostControl();
    if (!parentElement || !control) {
      return;
    }

    if (!this.hintElement) {
      const rawHintElement: unknown = this.renderer.createElement('span');
      if (!(rawHintElement instanceof HTMLSpanElement)) {
        return;
      }
      const hintElement: HTMLSpanElement = rawHintElement;
      const hintId: string = `ui-lib-key-filter-hint-${nextKeyFilterHintId++}`;
      this.renderer.setAttribute(hintElement, 'id', hintId);
      Object.entries(VISUALLY_HIDDEN_STYLES).forEach(
        ([styleName, styleValue]: [string, string]): void => {
          this.renderer.setStyle(hintElement, styleName, styleValue);
        }
      );

      const nextSibling: ChildNode | null = hostElement.nextSibling;
      if (nextSibling) {
        this.renderer.insertBefore(parentElement, hintElement, nextSibling);
      } else {
        this.renderer.appendChild(parentElement, hintElement);
      }
      this.hintElement = hintElement;
    }

    this.renderer.setProperty(this.hintElement, 'textContent', normalizedHintText);
    this.addDescribedById(control, this.hintElement.id);
  }

  private removeHintElement(): void {
    const hintId: string | null = this.hintElement?.id ?? null;
    if (hintId !== null) {
      const control: HTMLInputElement | HTMLTextAreaElement | null = this.resolveHostControl();
      if (control) {
        this.removeDescribedById(control, hintId);
      }
    }

    const parentNode: Node | null = this.hintElement?.parentNode ?? null;
    if (parentNode && this.hintElement) {
      this.renderer.removeChild(parentNode, this.hintElement);
    }
    this.hintElement = null;
  }

  private addDescribedById(control: HTMLInputElement | HTMLTextAreaElement, id: string): void {
    const existingIds: string[] = this.readAriaDescribedByIds(control).filter(
      (existingId: string): boolean => existingId !== id
    );
    existingIds.push(id);
    this.renderer.setAttribute(control, 'aria-describedby', existingIds.join(' '));
  }

  private removeDescribedById(control: HTMLInputElement | HTMLTextAreaElement, id: string): void {
    const remainingIds: string[] = this.readAriaDescribedByIds(control).filter(
      (existingId: string): boolean => existingId !== id
    );
    if (remainingIds.length === 0) {
      this.renderer.removeAttribute(control, 'aria-describedby');
      return;
    }
    this.renderer.setAttribute(control, 'aria-describedby', remainingIds.join(' '));
  }

  private readAriaDescribedByIds(control: HTMLInputElement | HTMLTextAreaElement): string[] {
    const value: string = control.getAttribute('aria-describedby') ?? '';
    return value
      .split(/\s+/)
      .map((entry: string): string => entry.trim())
      .filter((entry: string): boolean => entry.length > 0);
  }
}
