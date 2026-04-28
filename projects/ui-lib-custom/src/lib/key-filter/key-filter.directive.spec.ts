import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { KeyFilterDirective } from './key-filter.directive';
import { KEY_FILTER_PRESET_PATTERNS, KEY_FILTER_DEFAULTS } from './key-filter.types';
import type { KeyFilterPreset } from './key-filter.types';

// ---------------------------------------------------------------------------
// Test host
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-key-filter-host',
  standalone: true,
  imports: [KeyFilterDirective],
  template: ` <input #testInput [uilibKeyFilter]="filter()" [keyFilterBypass]="bypass()" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class KeyFilterHostComponent {
  public readonly filter: WritableSignal<KeyFilterPreset | RegExp> = signal<
    KeyFilterPreset | RegExp
  >('alphanum');
  public readonly bypass: WritableSignal<boolean> = signal<boolean>(false);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeKeydownEvent(key: string, options: Partial<KeyboardEventInit> = {}): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options });
}

function makePasteEvent(text: string): ClipboardEvent {
  const EventCtor: typeof ClipboardEvent =
    typeof ClipboardEvent !== 'undefined'
      ? ClipboardEvent
      : (Event as unknown as typeof ClipboardEvent);
  const event: ClipboardEvent = new EventCtor('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', {
    value: { getData: (_type: string): string => text },
    writable: false,
  });
  return event;
}

function setup(): {
  host: KeyFilterHostComponent;
  inputEl: HTMLInputElement;
  directive: KeyFilterDirective;
} {
  TestBed.configureTestingModule({
    imports: [KeyFilterHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<KeyFilterHostComponent> =
    TestBed.createComponent(KeyFilterHostComponent);
  fixture.detectChanges();
  const host: KeyFilterHostComponent = fixture.componentInstance;
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(KeyFilterDirective));

  const inputEl: HTMLInputElement = debugEl.nativeElement as HTMLInputElement;

  const directive: KeyFilterDirective = debugEl.injector.get(KeyFilterDirective);
  return { host, inputEl, directive };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('KeyFilterDirective', (): void => {
  describe('exports', (): void => {
    it('should export KEY_FILTER_PRESET_PATTERNS with all presets', (): void => {
      const presets: KeyFilterPreset[] = [
        'pint',
        'int',
        'pnum',
        'num',
        'hex',
        'alpha',
        'alphanum',
        'money',
        'email',
      ];
      for (const preset of presets) {
        expect(KEY_FILTER_PRESET_PATTERNS[preset]).toBeInstanceOf(RegExp);
      }
    });

    it('should export KEY_FILTER_DEFAULTS with bypass=false', (): void => {
      expect(KEY_FILTER_DEFAULTS.bypass).toBe(false);
    });
  });

  describe('directive creation', (): void => {
    it('should create and attach to the host input', (): void => {
      const { directive } = setup();
      expect(directive).toBeTruthy();
    });
  });

  describe('alphanum preset (default)', (): void => {
    it('should allow alphanumeric keystrokes', (): void => {
      const { inputEl } = setup();
      for (const key of ['a', 'Z', '0', '9']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should block non-alphanumeric printable keystrokes', (): void => {
      const { inputEl } = setup();
      for (const key of ['!', '@', '#', ' ', '-', '.']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
      }
    });

    it('should always allow special (multi-char) keys', (): void => {
      const { inputEl } = setup();
      for (const key of [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
        'Enter',
        'Home',
        'End',
      ]) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should allow Ctrl+key combos', (): void => {
      const { inputEl } = setup();
      for (const key of ['a', 'c', 'v', 'x', 'z']) {
        const event: KeyboardEvent = makeKeydownEvent(key, { ctrlKey: true });
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should allow Meta+key combos', (): void => {
      const { inputEl } = setup();
      const event: KeyboardEvent = makeKeydownEvent('a', { metaKey: true });
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe('preset: pint', (): void => {
    it('should allow digits', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('pint');
      TestBed.flushEffects();
      const event: KeyboardEvent = makeKeydownEvent('5');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it('should block minus sign', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('pint');
      TestBed.flushEffects();
      const event: KeyboardEvent = makeKeydownEvent('-');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('should block letters', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('pint');
      TestBed.flushEffects();
      const event: KeyboardEvent = makeKeydownEvent('a');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('preset: int', (): void => {
    it('should allow digits and minus', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('int');
      TestBed.flushEffects();
      for (const key of ['3', '-']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should block decimal point', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('int');
      TestBed.flushEffects();
      const event: KeyboardEvent = makeKeydownEvent('.');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('preset: num', (): void => {
    it('should allow digits, minus, and decimal point', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('num');
      TestBed.flushEffects();
      for (const key of ['7', '-', '.']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });
  });

  describe('preset: hex', (): void => {
    it('should allow hex digits', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('hex');
      TestBed.flushEffects();
      for (const key of ['0', '9', 'a', 'f', 'A', 'F']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should block non-hex characters', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('hex');
      TestBed.flushEffects();
      for (const key of ['g', 'G', 'z', '-', '.']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
      }
    });
  });

  describe('preset: alpha', (): void => {
    it('should allow letters only', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('alpha');
      TestBed.flushEffects();
      for (const key of ['a', 'Z']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should block digits', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('alpha');
      TestBed.flushEffects();
      const event: KeyboardEvent = makeKeydownEvent('5');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('preset: money', (): void => {
    it('should allow digits, minus, dot, and comma', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('money');
      TestBed.flushEffects();
      for (const key of ['1', '-', '.', ',']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should block letters', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('money');
      TestBed.flushEffects();
      const event: KeyboardEvent = makeKeydownEvent('x');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('custom RegExp filter', (): void => {
    it('should allow characters matching the custom pattern', (): void => {
      const { host, inputEl } = setup();
      host.filter.set(/[aeiou]/i);
      TestBed.flushEffects();
      for (const key of ['a', 'e', 'i', 'o', 'u', 'A']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should block characters not matching the custom pattern', (): void => {
      const { host, inputEl } = setup();
      host.filter.set(/[aeiou]/i);
      TestBed.flushEffects();
      for (const key of ['b', 'c', 'd', '1', '-']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
      }
    });
  });

  describe('bypass mode', (): void => {
    it('should allow all keystrokes when bypass=true', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('pint');
      host.bypass.set(true);
      TestBed.flushEffects();
      for (const key of ['a', '-', '.', '!']) {
        const event: KeyboardEvent = makeKeydownEvent(key);
        inputEl.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
    });

    it('should re-engage filtering when bypass switches back to false', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('alpha');
      host.bypass.set(true);
      TestBed.flushEffects();
      let event: KeyboardEvent = makeKeydownEvent('5');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);

      host.bypass.set(false);
      TestBed.flushEffects();
      event = makeKeydownEvent('5');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('paste filtering', (): void => {
    it('should allow paste when all characters match', (): void => {
      const { inputEl } = setup();
      const event: ClipboardEvent = makePasteEvent('abc123');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it('should strip disallowed characters from paste', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('alpha');
      TestBed.flushEffects();
      inputEl.value = '';
      const event: ClipboardEvent = makePasteEvent('Hello123World');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      expect(inputEl.value).toBe('HelloWorld');
    });

    it('should allow full paste when bypass=true', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('pint');
      host.bypass.set(true);
      TestBed.flushEffects();
      const event: ClipboardEvent = makePasteEvent('abc!@#');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it('should produce an input event after stripping paste content', (): void => {
      const { host, inputEl } = setup();
      host.filter.set('alpha');
      TestBed.flushEffects();
      let inputEventFired: boolean = false;
      inputEl.addEventListener('input', (): void => {
        inputEventFired = true;
      });
      const event: ClipboardEvent = makePasteEvent('abc123');
      inputEl.dispatchEvent(event);
      expect(inputEventFired).toBe(true);
    });
  });
});
