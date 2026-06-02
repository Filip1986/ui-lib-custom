import type { WritableSignal } from '@angular/core';
import type { DebugElement } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import type { AriaLivePoliteness } from 'ui-lib-custom/a11y';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

import { KeyFilterDirective } from './key-filter.directive';
import { makeKeydownEvent, makePasteEvent } from './key-filter.test-utils';
import type { KeyFilterPreset } from './key-filter.types';
import { KEY_FILTER_DEFAULTS, KEY_FILTER_PRESET_PATTERNS } from './key-filter.types';

// ---------------------------------------------------------------------------
// Test host
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-key-filter-host',
  standalone: true,
  imports: [KeyFilterDirective],
  template: `
    <span id="existing-hint">Existing hint</span>
    <input
      #testInput
      aria-describedby="existing-hint"
      [uilibKeyFilter]="filter()"
      [keyFilterBypass]="bypass()"
      [hintText]="hintText()"
      [pattern]="pattern()"
      [regex]="regex()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class KeyFilterHostComponent {
  public readonly filter: WritableSignal<KeyFilterPreset | RegExp> = signal<
    KeyFilterPreset | RegExp
  >('alphanum');
  public readonly bypass: WritableSignal<boolean> = signal<boolean>(false);
  public readonly hintText: WritableSignal<string | null> = signal<string | null>(null);
  public readonly pattern: WritableSignal<KeyFilterPreset | null> = signal<KeyFilterPreset | null>(
    null,
  );
  public readonly regex: WritableSignal<RegExp | null> = signal<RegExp | null>(null);
}

function setup(): {
  host: KeyFilterHostComponent;
  inputEl: HTMLInputElement;
  directive: KeyFilterDirective;
  liveAnnouncer: {
    announce: jest.Mock<Promise<void>, [string, AriaLivePoliteness?]>;
  };
} {
  const liveAnnouncer: {
    announce: jest.Mock<Promise<void>, [string, AriaLivePoliteness?]>;
  } = {
    announce: jest.fn<Promise<void>, [string, AriaLivePoliteness?]>(
      (): Promise<void> => Promise.resolve(),
    ),
  };

  TestBed.configureTestingModule({
    imports: [KeyFilterHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: LiveAnnouncerService, useValue: liveAnnouncer },
    ],
  });
  const fixture: ComponentFixture<KeyFilterHostComponent> =
    TestBed.createComponent(KeyFilterHostComponent);
  fixture.detectChanges();
  const host: KeyFilterHostComponent = fixture.componentInstance;
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(KeyFilterDirective));

  const inputEl: HTMLInputElement = debugEl.nativeElement as HTMLInputElement;

  const directive: KeyFilterDirective = debugEl.injector.get(KeyFilterDirective);
  return { host, inputEl, directive, liveAnnouncer };
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
      const { host, inputEl, liveAnnouncer } = setup();
      host.filter.set('alpha');
      TestBed.flushEffects();
      inputEl.value = '';
      const event: ClipboardEvent = makePasteEvent('Hello123World');
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      expect(inputEl.value).toBe('HelloWorld');
      expect(liveAnnouncer.announce).toHaveBeenCalledWith(
        'Characters not matching the allowed pattern were removed.',
        'polite',
      );
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

  describe('a11y hint text', (): void => {
    it('should inject a hint element and link it via aria-describedby', (): void => {
      const { host, inputEl } = setup();
      host.hintText.set('Numbers only');
      TestBed.flushEffects();

      const parent: HTMLElement = inputEl.parentElement as HTMLElement;
      const hint: HTMLElement | null = parent.querySelector('[id^="ui-lib-key-filter-hint-"]');
      expect(hint).toBeTruthy();
      expect((hint as HTMLElement).textContent).toBe('Numbers only');
      expect(inputEl.getAttribute('aria-describedby')).toContain((hint as HTMLElement).id);
      expect(inputEl.getAttribute('aria-describedby')).toContain('existing-hint');
    });

    it('should remove the hint id from aria-describedby when hintText is cleared', (): void => {
      const { host, inputEl } = setup();
      host.hintText.set('Numbers only');
      TestBed.flushEffects();
      const parent: HTMLElement = inputEl.parentElement as HTMLElement;
      const hintId: string = (
        parent.querySelector('[id^="ui-lib-key-filter-hint-"]') as HTMLElement
      ).id;

      host.hintText.set(null);
      TestBed.flushEffects();

      expect(parent.querySelector(`#${hintId}`)).toBeNull();
      expect(inputEl.getAttribute('aria-describedby')).toBe('existing-hint');
    });
  });

  describe('pattern and regex precedence', (): void => {
    it('should prefer regex over pattern when both are set', (): void => {
      const consoleWarnSpy: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation();
      const { host, inputEl } = setup();
      host.pattern.set('alpha');
      host.regex.set(/[0-9]/);
      TestBed.flushEffects();

      const letterEvent: KeyboardEvent = makeKeydownEvent('a');
      inputEl.dispatchEvent(letterEvent);
      expect(letterEvent.defaultPrevented).toBe(true);

      const digitEvent: KeyboardEvent = makeKeydownEvent('5');
      inputEl.dispatchEvent(digitEvent);
      expect(digitEvent.defaultPrevented).toBe(false);
      consoleWarnSpy.mockRestore();
    });

    it('should warn in dev mode when pattern and regex are both set', (): void => {
      const consoleWarnSpy: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation();
      const { host } = setup();

      host.pattern.set('alpha');
      host.regex.set(/[0-9]/);
      TestBed.flushEffects();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[uilibKeyFilter] Both pattern and regex are set. The regex input takes precedence.',
      );

      consoleWarnSpy.mockRestore();
    });
  });
});
