import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { StyleClass } from './style-class';

const originalMatchMedia: typeof window.matchMedia = window.matchMedia;

@Component({
  standalone: true,
  imports: [StyleClass],
  template: `
    <button
      type="button"
      aria-controls="toggle-panel"
      [uiLibStyleClass]="'@next'"
      [toggleClass]="toggleClass()"
    >
      Toggle panel
    </button>
    <div id="toggle-panel">Toggle content</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToggleStyleClassA11yHostComponent {
  public readonly toggleClass: WritableSignal<string> = signal<string>('is-open');
}

@Component({
  standalone: true,
  imports: [StyleClass],
  template: `
    <button
      type="button"
      aria-controls="transition-panel"
      [uiLibStyleClass]="'@next'"
      [enterActiveClass]="enterActiveClass()"
      [leaveActiveClass]="leaveActiveClass()"
      [leaveToClass]="leaveToClass()"
    >
      Toggle transition panel
    </button>
    <div id="transition-panel" class="hidden">Transition content</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TransitionStyleClassA11yHostComponent {
  public readonly enterActiveClass: WritableSignal<string> = signal<string>('fade-in');
  public readonly leaveActiveClass: WritableSignal<string> = signal<string>('fade-out');
  public readonly leaveToClass: WritableSignal<string> = signal<string>('hidden');
}

function mockReducedMotion(preferReducedMotion: boolean): void {
  window.matchMedia = jest.fn().mockImplementation(
    (query: string): MediaQueryList =>
      ({
        matches: preferReducedMotion && query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn().mockReturnValue(false),
      }) as MediaQueryList
  );
}

async function createFixture<T>(
  componentType: Parameters<typeof TestBed.createComponent>[0]
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(
    componentType as Parameters<typeof TestBed.createComponent<T>>[0]
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getButton<T>(fixture: ComponentFixture<T>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement;
}

function getPanel<T>(fixture: ComponentFixture<T>, id: string): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(`#${id}`) as HTMLElement;
}

describe('StyleClass (a11y)', (): void => {
  beforeEach((): void => {
    mockReducedMotion(false);
  });

  afterEach((): void => {
    jest.useRealTimers();
    window.matchMedia = originalMatchMedia;
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
  });

  it('passes axe in the default closed toggle state', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe in the open toggle state', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    getButton(fixture).click();
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('sets aria-expanded=false on the trigger initially in toggle mode', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    expect(getButton(fixture).getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-hidden=true on the target initially in toggle mode', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    expect(getPanel(fixture, 'toggle-panel').getAttribute('aria-hidden')).toBe('true');
  });

  it('sets aria-expanded=true after opening in toggle mode', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    getButton(fixture).click();
    expect(getButton(fixture).getAttribute('aria-expanded')).toBe('true');
  });

  it('sets aria-hidden=false after opening in toggle mode', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    getButton(fixture).click();
    expect(getPanel(fixture, 'toggle-panel').getAttribute('aria-hidden')).toBe('false');
  });

  it('restores aria-expanded=false after closing in toggle mode', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    const button: HTMLButtonElement = getButton(fixture);
    button.click();
    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('restores aria-hidden=true after closing in toggle mode', async (): Promise<void> => {
    const fixture: ComponentFixture<ToggleStyleClassA11yHostComponent> =
      await createFixture<ToggleStyleClassA11yHostComponent>(ToggleStyleClassA11yHostComponent);
    const button: HTMLButtonElement = getButton(fixture);
    button.click();
    button.click();
    expect(getPanel(fixture, 'toggle-panel').getAttribute('aria-hidden')).toBe('true');
  });

  it('sets aria-expanded=false and aria-hidden=true initially in transition mode', async (): Promise<void> => {
    const fixture: ComponentFixture<TransitionStyleClassA11yHostComponent> =
      await createFixture<TransitionStyleClassA11yHostComponent>(
        TransitionStyleClassA11yHostComponent
      );
    expect(getButton(fixture).getAttribute('aria-expanded')).toBe('false');
    expect(getPanel(fixture, 'transition-panel').getAttribute('aria-hidden')).toBe('true');
  });

  it('updates aria-expanded=true and aria-hidden=false when entering in transition mode', async (): Promise<void> => {
    const fixture: ComponentFixture<TransitionStyleClassA11yHostComponent> =
      await createFixture<TransitionStyleClassA11yHostComponent>(
        TransitionStyleClassA11yHostComponent
      );
    jest.useFakeTimers();
    getButton(fixture).click();
    jest.advanceTimersByTime(20);
    expect(getButton(fixture).getAttribute('aria-expanded')).toBe('true');
    expect(getPanel(fixture, 'transition-panel').getAttribute('aria-hidden')).toBe('false');
  });

  it('updates aria-expanded=false and aria-hidden=true when leaving in transition mode', async (): Promise<void> => {
    const fixture: ComponentFixture<TransitionStyleClassA11yHostComponent> =
      await createFixture<TransitionStyleClassA11yHostComponent>(
        TransitionStyleClassA11yHostComponent
      );
    const button: HTMLButtonElement = getButton(fixture);
    jest.useFakeTimers();
    button.click();
    jest.advanceTimersByTime(600);
    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(getPanel(fixture, 'transition-panel').getAttribute('aria-hidden')).toBe('true');
  });

  it('does not add enter animation classes when prefers-reduced-motion is enabled', async (): Promise<void> => {
    mockReducedMotion(true);
    const fixture: ComponentFixture<TransitionStyleClassA11yHostComponent> =
      await createFixture<TransitionStyleClassA11yHostComponent>(
        TransitionStyleClassA11yHostComponent
      );
    const button: HTMLButtonElement = getButton(fixture);
    const panel: HTMLElement = getPanel(fixture, 'transition-panel');
    button.click();
    expect(panel.classList.contains('fade-in')).toBe(false);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(panel.getAttribute('aria-hidden')).toBe('false');
  });

  it('does not add leave animation classes when prefers-reduced-motion is enabled', async (): Promise<void> => {
    mockReducedMotion(true);
    const fixture: ComponentFixture<TransitionStyleClassA11yHostComponent> =
      await createFixture<TransitionStyleClassA11yHostComponent>(
        TransitionStyleClassA11yHostComponent
      );
    const button: HTMLButtonElement = getButton(fixture);
    const panel: HTMLElement = getPanel(fixture, 'transition-panel');
    button.click();
    button.click();
    expect(panel.classList.contains('fade-out')).toBe(false);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel.getAttribute('aria-hidden')).toBe('true');
  });
});
