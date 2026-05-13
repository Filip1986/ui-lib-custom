import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { UiLibInput } from 'ui-lib-custom/input';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { KeyFilterDirective } from './key-filter.directive';
import type { KeyFilterPreset } from './key-filter.types';

const PASTE_FILTER_ANNOUNCEMENT: string =
  'Characters not matching the allowed pattern were removed.';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label for="native-key-filter-input">Access code</label>
    <input
      id="native-key-filter-input"
      [uilibKeyFilter]="filter()"
      [keyFilterBypass]="bypass()"
      [hintText]="hintText()"
      [pattern]="pattern()"
      [regex]="regexPattern()"
      [allowedChars]="allowedCharacters()"
    />
    <span id="existing-description">Existing description</span>
  `,
})
class NativeInputHostComponent {
  public readonly filter: WritableSignal<KeyFilterPreset | RegExp> = signal<
    KeyFilterPreset | RegExp
  >('alphanum');
  public readonly bypass: WritableSignal<boolean> = signal<boolean>(false);
  public readonly hintText: WritableSignal<string | null> = signal<string | null>(
    'Letters and digits only'
  );
  public readonly pattern: WritableSignal<KeyFilterPreset | null> = signal<KeyFilterPreset | null>(
    null
  );
  public readonly regexPattern: WritableSignal<RegExp | string | null> = signal<
    RegExp | string | null
  >(null);
  public readonly allowedCharacters: WritableSignal<string | null> = signal<string | null>(null);
}

@Component({
  standalone: true,
  imports: [KeyFilterDirective, UiLibInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ui-lib-input [uilibKeyFilter]="'alpha'" hintText="Letters only" /> `,
})
class UiLibInputHostComponent {}

@Component({
  standalone: true,
  imports: [KeyFilterDirective, InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <uilib-input-mask [uilibKeyFilter]="'pint'" hintText="Digits only" mask="9999" /> `,
})
class InputMaskHostComponent {}

function makeKeydownEvent(key: string, options: Partial<KeyboardEventInit> = {}): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options });
}

function makePasteEvent(text: string): ClipboardEvent {
  const EventConstructor: typeof ClipboardEvent =
    typeof ClipboardEvent !== 'undefined'
      ? ClipboardEvent
      : (Event as unknown as typeof ClipboardEvent);
  const event: ClipboardEvent = new EventConstructor('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', {
    value: { getData: (): string => text },
    writable: false,
  });
  return event;
}

async function createFixture<T>(
  hostType: new () => T,
  announceMock: jest.Mock = jest.fn().mockResolvedValue(undefined)
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostType],
    providers: [
      provideZonelessChangeDetection(),
      {
        provide: LiveAnnouncerService,
        useValue: {
          announce: announceMock,
        },
      },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function nativeInputElement(fixture: ComponentFixture<NativeInputHostComponent>): HTMLInputElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '#native-key-filter-input'
  ) as HTMLInputElement;
}

function keyFilterHintElement(fixture: ComponentFixture<unknown>): HTMLSpanElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '[data-uilib-key-filter-hint]'
  ) as HTMLSpanElement | null;
}

describe('KeyFilter Accessibility', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  it('has no accessibility violations for a labeled input with hint text', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('allows printable keys that match the active filter', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    const event: KeyboardEvent = makeKeydownEvent('a');
    inputElement.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('blocks printable keys that do not match the active filter', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    const event: KeyboardEvent = makeKeydownEvent('!');
    inputElement.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('does not block non-printable keys', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    const event: KeyboardEvent = makeKeydownEvent('Backspace');
    inputElement.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('creates a hint element and links it from aria-describedby', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    const hintElement: HTMLSpanElement | null = keyFilterHintElement(fixture);

    expect(hintElement).not.toBeNull();
    expect(inputElement.getAttribute('aria-describedby')).toBe(hintElement?.id ?? null);
  });

  it('preserves existing aria-describedby ids when adding the hint id', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    inputElement.setAttribute('aria-describedby', 'existing-description');
    fixture.componentInstance.hintText.set('Letters and digits only (updated)');
    TestBed.flushEffects();

    const hintElement: HTMLSpanElement | null = keyFilterHintElement(fixture);
    const describedBy: string = inputElement.getAttribute('aria-describedby') ?? '';

    expect(describedBy.includes('existing-description')).toBe(true);
    expect(describedBy.includes(hintElement?.id ?? '')).toBe(true);
  });

  it('removes the generated hint id when hintText is cleared', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    fixture.componentInstance.hintText.set(null);
    TestBed.flushEffects();
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    expect(keyFilterHintElement(fixture)).toBeNull();
    expect(inputElement.getAttribute('aria-describedby')).toBeNull();
  });

  it('updates the injected hint text when hintText changes', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    fixture.componentInstance.hintText.set('Numbers only');
    TestBed.flushEffects();
    fixture.detectChanges();

    const hintElement: HTMLSpanElement | null = keyFilterHintElement(fixture);
    expect((hintElement?.textContent ?? '').trim()).toBe('Numbers only');
  });

  it('filters pasted characters and prevents the default paste behavior', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    fixture.componentInstance.filter.set('alpha');
    TestBed.flushEffects();
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    const pasteEvent: ClipboardEvent = makePasteEvent('ab12cd');
    inputElement.dispatchEvent(pasteEvent);

    expect(pasteEvent.defaultPrevented).toBe(true);
    expect(inputElement.value).toBe('abcd');
  });

  it('announces paste filtering through the live announcer', async (): Promise<void> => {
    const announceMock: jest.Mock = jest.fn().mockResolvedValue(undefined);
    const fixture: ComponentFixture<NativeInputHostComponent> = await createFixture(
      NativeInputHostComponent,
      announceMock
    );
    fixture.componentInstance.filter.set('alpha');
    TestBed.flushEffects();
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    inputElement.dispatchEvent(makePasteEvent('ab12cd'));

    expect(announceMock).toHaveBeenCalledWith(PASTE_FILTER_ANNOUNCEMENT);
  });

  it('does not announce when pasted text already matches the filter', async (): Promise<void> => {
    const announceMock: jest.Mock = jest.fn().mockResolvedValue(undefined);
    const fixture: ComponentFixture<NativeInputHostComponent> = await createFixture(
      NativeInputHostComponent,
      announceMock
    );
    fixture.componentInstance.filter.set('alpha');
    TestBed.flushEffects();
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputElement(fixture);
    inputElement.dispatchEvent(makePasteEvent('abcd'));

    expect(announceMock).not.toHaveBeenCalled();
  });

  it('uses regex input when both pattern and regex are provided', async (): Promise<void> => {
    const warningSpy: jest.SpyInstance = jest
      .spyOn(console, 'warn')
      .mockImplementation((): void => {
        return;
      });
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    fixture.componentInstance.pattern.set('alpha');
    fixture.componentInstance.regexPattern.set('[0-9]');
    TestBed.flushEffects();
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputElement(fixture);

    const digitEvent: KeyboardEvent = makeKeydownEvent('5');
    inputElement.dispatchEvent(digitEvent);
    expect(digitEvent.defaultPrevented).toBe(false);

    const letterEvent: KeyboardEvent = makeKeydownEvent('a');
    inputElement.dispatchEvent(letterEvent);
    expect(letterEvent.defaultPrevented).toBe(true);
    warningSpy.mockRestore();
  });

  it('uses allowedChars as an explicit whitelist', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    fixture.componentInstance.allowedCharacters.set('XYZ');
    TestBed.flushEffects();
    fixture.detectChanges();

    const inputElement: HTMLInputElement = nativeInputElement(fixture);

    const allowedEvent: KeyboardEvent = makeKeydownEvent('X');
    inputElement.dispatchEvent(allowedEvent);
    expect(allowedEvent.defaultPrevented).toBe(false);

    const blockedEvent: KeyboardEvent = makeKeydownEvent('A');
    inputElement.dispatchEvent(blockedEvent);
    expect(blockedEvent.defaultPrevented).toBe(true);
  });

  it('works when attached to ui-lib-input by filtering the internal native input', async (): Promise<void> => {
    const fixture: ComponentFixture<UiLibInputHostComponent> =
      await createFixture(UiLibInputHostComponent);
    const inputElement: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-input input'
    ) as HTMLInputElement;

    const blockedEvent: KeyboardEvent = makeKeydownEvent('7');
    inputElement.dispatchEvent(blockedEvent);
    expect(blockedEvent.defaultPrevented).toBe(true);
  });

  it('works when attached to uilib-input-mask by filtering the internal native input', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskHostComponent> =
      await createFixture(InputMaskHostComponent);
    const inputElement: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector(
      'uilib-input-mask input'
    ) as HTMLInputElement;

    const blockedEvent: KeyboardEvent = makeKeydownEvent('a');
    inputElement.dispatchEvent(blockedEvent);
    expect(blockedEvent.defaultPrevented).toBe(true);
  });

  it('cleans up the injected hint element when the host fixture is destroyed', async (): Promise<void> => {
    const fixture: ComponentFixture<NativeInputHostComponent> =
      await createFixture(NativeInputHostComponent);
    const hintElement: HTMLSpanElement | null = keyFilterHintElement(fixture);
    expect(hintElement).not.toBeNull();

    fixture.destroy();
    expect(document.body.contains(hintElement as Node)).toBe(false);
  });
});
