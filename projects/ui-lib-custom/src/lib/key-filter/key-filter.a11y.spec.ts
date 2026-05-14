import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import type { AriaLivePoliteness } from 'ui-lib-custom/a11y';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { KeyFilterDirective } from './key-filter.directive';
import { makeKeydownEvent, makePasteEvent } from './key-filter.test-utils';
import type { KeyFilterPreset } from './key-filter.types';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label for="key-filter-input">Code</label>
    <p id="external-help">Use uppercase letters.</p>
    <input
      id="key-filter-input"
      aria-describedby="external-help"
      [uilibKeyFilter]="filter()"
      [keyFilterBypass]="bypass()"
      [hintText]="hintText()"
    />
  `,
})
class KeyFilterA11yHostComponent {
  public readonly filter: WritableSignal<KeyFilterPreset | RegExp> = signal<
    KeyFilterPreset | RegExp
  >('alpha');
  public readonly bypass: WritableSignal<boolean> = signal<boolean>(false);
  public readonly hintText: WritableSignal<string | null> = signal<string | null>('Letters only');
}

async function setup(): Promise<{
  fixture: ComponentFixture<KeyFilterA11yHostComponent>;
  host: KeyFilterA11yHostComponent;
  input: HTMLInputElement;
  liveAnnouncer: { announce: jest.Mock<Promise<void>, [string, AriaLivePoliteness?]> };
}> {
  const liveAnnouncer: {
    announce: jest.Mock<Promise<void>, [string, AriaLivePoliteness?]>;
  } = {
    announce: jest.fn<Promise<void>, [string, AriaLivePoliteness?]>(
      (): Promise<void> => Promise.resolve()
    ),
  };

  await TestBed.configureTestingModule({
    imports: [KeyFilterA11yHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: LiveAnnouncerService, useValue: liveAnnouncer },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<KeyFilterA11yHostComponent> = TestBed.createComponent(
    KeyFilterA11yHostComponent
  );
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    host: fixture.componentInstance,
    input: (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement,
    liveAnnouncer,
  };
}

describe('KeyFilter Accessibility', (): void => {
  it('axe: has no accessibility violations with label and hint', async (): Promise<void> => {
    const { fixture } = await setup();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('allows valid alphabetic keystrokes', async (): Promise<void> => {
    const { input } = await setup();
    const event: KeyboardEvent = makeKeydownEvent('A');
    input.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('blocks invalid keystrokes', async (): Promise<void> => {
    const { input } = await setup();
    const event: KeyboardEvent = makeKeydownEvent('7');
    input.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('allows special navigation keys', async (): Promise<void> => {
    const { input } = await setup();
    const event: KeyboardEvent = makeKeydownEvent('Tab');
    input.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('allows control key combinations', async (): Promise<void> => {
    const { input } = await setup();
    const event: KeyboardEvent = makeKeydownEvent('a', { ctrlKey: true });
    input.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('creates a hint element when hintText is set', async (): Promise<void> => {
    const { fixture } = await setup();
    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    const hint: HTMLElement | null = hostElement.querySelector('[id^="ui-lib-key-filter-hint-"]');
    expect(hint).toBeTruthy();
    expect((hint as HTMLElement).textContent).toBe('Letters only');
  });

  it('links the host input to the generated hint with aria-describedby', async (): Promise<void> => {
    const { fixture, input } = await setup();
    const hint: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[id^="ui-lib-key-filter-hint-"]'
    ) as HTMLElement;
    const describedBy: string = input.getAttribute('aria-describedby') ?? '';
    expect(describedBy).toContain(hint.id);
  });

  it('preserves existing aria-describedby ids when adding hint text', async (): Promise<void> => {
    const { input } = await setup();
    const describedBy: string = input.getAttribute('aria-describedby') ?? '';
    expect(describedBy).toContain('external-help');
  });

  it('removes generated hint linkage when hintText becomes null', async (): Promise<void> => {
    const { fixture, host, input } = await setup();
    host.hintText.set(null);
    TestBed.flushEffects();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[id^="ui-lib-key-filter-hint-"]')
    ).toBeNull();
    expect(input.getAttribute('aria-describedby')).toBe('external-help');
  });

  it('updates generated hint text when hintText changes', async (): Promise<void> => {
    const { fixture, host } = await setup();
    host.hintText.set('Uppercase letters only');
    TestBed.flushEffects();
    fixture.detectChanges();
    await fixture.whenStable();

    const hint: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[id^="ui-lib-key-filter-hint-"]'
    ) as HTMLElement;
    expect(hint.textContent).toBe('Uppercase letters only');
  });

  it('strips blocked characters on paste', async (): Promise<void> => {
    const { input } = await setup();
    input.value = '';
    const pasteEvent: ClipboardEvent = makePasteEvent('AB12CD');
    input.dispatchEvent(pasteEvent);

    expect(pasteEvent.defaultPrevented).toBe(true);
    expect(input.value).toBe('ABCD');
  });

  it('dispatches input event when paste filtering changes the value', async (): Promise<void> => {
    const { input } = await setup();
    let inputEventTriggered: boolean = false;
    input.addEventListener('input', (): void => {
      inputEventTriggered = true;
    });

    input.dispatchEvent(makePasteEvent('AB12'));
    expect(inputEventTriggered).toBe(true);
  });

  it('announces removed characters on filtered paste', async (): Promise<void> => {
    const { input, liveAnnouncer } = await setup();
    input.dispatchEvent(makePasteEvent('AB12'));

    expect(liveAnnouncer.announce).toHaveBeenCalledWith(
      'Characters not matching the allowed pattern were removed.',
      'polite'
    );
  });

  it('does not announce when pasted text already matches the pattern', async (): Promise<void> => {
    const { input, liveAnnouncer } = await setup();
    input.dispatchEvent(makePasteEvent('ABCD'));
    expect(liveAnnouncer.announce).not.toHaveBeenCalled();
  });

  it('does not strip or announce pasted text in bypass mode', async (): Promise<void> => {
    const { host, input, liveAnnouncer } = await setup();
    host.bypass.set(true);
    TestBed.flushEffects();

    const pasteEvent: ClipboardEvent = makePasteEvent('AB12');
    input.dispatchEvent(pasteEvent);
    expect(pasteEvent.defaultPrevented).toBe(false);
    expect(input.value).toBe('');
    expect(liveAnnouncer.announce).not.toHaveBeenCalled();
  });

  it('replaces selected text range with filtered paste content', async (): Promise<void> => {
    const { input } = await setup();
    input.value = 'WXYZ';
    input.setSelectionRange(1, 3);
    input.dispatchEvent(makePasteEvent('A1B2'));
    expect(input.value).toBe('WABZ');
  });
});
