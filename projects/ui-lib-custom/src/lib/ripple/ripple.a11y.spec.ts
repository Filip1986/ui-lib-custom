import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Ripple } from './ripple';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [Ripple],
  template: `<button type="button" uiLibRipple>Click me</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicRippleHost {}

@Component({
  standalone: true,
  imports: [Ripple],
  template: `<button type="button" uiLibRipple [disabled]="disabled()">Click me</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledRippleHost {
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  standalone: true,
  imports: [Ripple],
  template: `
    <button type="button" uiLibRipple>First</button>
    <button type="button" uiLibRipple>Second</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiRippleHost {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function createFixture<T>(
  componentType: Parameters<typeof TestBed.createComponent>[0],
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(
    componentType as Parameters<typeof TestBed.createComponent<T>>[0],
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function click(element: HTMLElement, x: number = 0, y: number = 0): void {
  element.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, clientX: x, clientY: y }),
  );
}

function mockReducedMotion(prefer: boolean): () => void {
  const original: typeof window.matchMedia = window.matchMedia;
  window.matchMedia = jest.fn().mockImplementation(
    (query: string): MediaQueryList =>
      ({
        matches: prefer && query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn().mockReturnValue(false),
      }) as MediaQueryList,
  );
  return (): void => {
    window.matchMedia = original;
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Ripple (a11y)', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  // ── 1. axe-core: basic state ────────────────────────────────────────────

  it('passes axe on a basic ripple host', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe on a disabled ripple host', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledRippleHost> =
      await createFixture<DisabledRippleHost>(DisabledRippleHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe after a ripple wave is spawned', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    click(btn);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  // ── 2. Decorative — no ARIA side effects ────────────────────────────────

  it('does not add any ARIA role to the host element', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    expect(btn.getAttribute('role')).toBeNull();
  });

  it('does not add aria-label or aria-labelledby to the host element', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    expect(btn.getAttribute('aria-label')).toBeNull();
    expect(btn.getAttribute('aria-labelledby')).toBeNull();
  });

  // ── 3. Wave element is purely decorative ────────────────────────────────

  it('spawned wave span contains no text content', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    click(btn);
    const wave: HTMLElement | null = btn.querySelector('.ui-lib-ripple-wave');
    expect(wave).not.toBeNull();
    expect((wave as HTMLElement).textContent).toBe('');
  });

  // ── 4. prefers-reduced-motion: wave must not fire at all ────────────────

  it('does NOT spawn a wave when prefers-reduced-motion is preferred', async (): Promise<void> => {
    const restore: () => void = mockReducedMotion(true);
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    click(btn);
    const wave: HTMLElement | null = btn.querySelector('.ui-lib-ripple-wave');
    expect(wave).toBeNull();
    restore();
  });

  it('DOES spawn a wave when prefers-reduced-motion is not preferred', async (): Promise<void> => {
    const restore: () => void = mockReducedMotion(false);
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    click(btn);
    const wave: HTMLElement | null = btn.querySelector('.ui-lib-ripple-wave');
    expect(wave).not.toBeNull();
    restore();
  });

  // ── 5. Keyboard (Enter/Space fire native click, ripple responds) ─────────

  it('spawns a wave on keyboard-activated click (Enter/Space on button)', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicRippleHost> =
      await createFixture<BasicRippleHost>(BasicRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    // Native <button> fires a click event on Enter/Space; simulate that here
    click(btn);
    const wave: HTMLElement | null = btn.querySelector('.ui-lib-ripple-wave');
    expect(wave).not.toBeNull();
  });

  // ── 6. Disabled host ────────────────────────────────────────────────────

  it('does not spawn a wave when the ripple is disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledRippleHost> =
      await createFixture<DisabledRippleHost>(DisabledRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const btn: HTMLElement = root.querySelector('button') as HTMLElement;
    click(btn);
    const wave: HTMLElement | null = btn.querySelector('.ui-lib-ripple-wave');
    expect(wave).toBeNull();
  });

  // ── 7. Multiple instances ────────────────────────────────────────────────

  it('passes axe with multiple ripple hosts on the same page', async (): Promise<void> => {
    const fixture: ComponentFixture<MultiRippleHost> =
      await createFixture<MultiRippleHost>(MultiRippleHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('each instance works independently — waves are confined to their own host', async (): Promise<void> => {
    const fixture: ComponentFixture<MultiRippleHost> =
      await createFixture<MultiRippleHost>(MultiRippleHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const buttons: HTMLElement[] = Array.from(root.querySelectorAll<HTMLElement>('button'));
    const btn1: HTMLElement = buttons[0] as HTMLElement;
    const btn2: HTMLElement = buttons[1] as HTMLElement;
    click(btn1);
    expect(btn1.querySelector('.ui-lib-ripple-wave')).not.toBeNull();
    expect(btn2.querySelector('.ui-lib-ripple-wave')).toBeNull();
  });
});
