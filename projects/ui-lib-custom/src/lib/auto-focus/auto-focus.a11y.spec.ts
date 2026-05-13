import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { AutoFocus } from './auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input id="auto-focus-input" uiLibAutoFocus />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input id="auto-focus-input" uiLibAutoFocus [disabled]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusDisabledA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `
    <div id="selector-host" uiLibAutoFocus selector="[data-autofocus-target]">
      <button type="button" data-autofocus-target>Target</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusSelectorA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<div id="selector-host" uiLibAutoFocus selector="[data-missing]"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusMissingSelectorA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input id="auto-focus-input" uiLibAutoFocus [disabled]="disabled()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusRerenderA11yHostComponent {
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `
    <button id="existing-focus" type="button">Existing</button>
    @if (showAutoFocus()) {
      <input id="deferred-auto-focus" uiLibAutoFocus />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusExistingFocusHostComponent {
  public readonly showAutoFocus: WritableSignal<boolean> = signal<boolean>(false);
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

describe('AutoFocus (a11y)', (): void => {
  let requestAnimationFrameSpy: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach((): void => {
    requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback): number => {
        callback(performance.now());
        return 1;
      });
  });

  afterEach((): void => {
    requestAnimationFrameSpy.mockRestore();
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  it('passes axe checks in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusA11yHostComponent> =
      await createFixture<AutoFocusA11yHostComponent>(AutoFocusA11yHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe checks in disabled state', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusDisabledA11yHostComponent> =
      await createFixture<AutoFocusDisabledA11yHostComponent>(AutoFocusDisabledA11yHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('focuses the host element on mount', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusA11yHostComponent> =
      await createFixture<AutoFocusA11yHostComponent>(AutoFocusA11yHostComponent);
    const input: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#auto-focus-input'
    ) as HTMLElement;
    expect(document.activeElement).toBe(input);
  });

  it('does not focus when disabled is true', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusDisabledA11yHostComponent> =
      await createFixture<AutoFocusDisabledA11yHostComponent>(AutoFocusDisabledA11yHostComponent);
    const input: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#auto-focus-input'
    ) as HTMLElement;
    expect(document.activeElement).not.toBe(input);
  });

  it('uses requestAnimationFrame for deferred focus', async (): Promise<void> => {
    await createFixture<AutoFocusA11yHostComponent>(AutoFocusA11yHostComponent);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
  });

  it('focuses only once and does not re-run on subsequent re-renders', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusRerenderA11yHostComponent> =
      await createFixture<AutoFocusRerenderA11yHostComponent>(AutoFocusRerenderA11yHostComponent);
    const input: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#auto-focus-input'
    ) as HTMLElement;
    const focusSpy: jest.SpyInstance = jest.spyOn(input, 'focus');

    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    fixture.componentInstance.disabled.set(false);
    fixture.detectChanges();

    expect(focusSpy).not.toHaveBeenCalled();
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
  });

  it('focuses a selector-matched child element', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusSelectorA11yHostComponent> =
      await createFixture<AutoFocusSelectorA11yHostComponent>(AutoFocusSelectorA11yHostComponent);
    const childButton: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-autofocus-target]'
    ) as HTMLElement;
    expect(document.activeElement).toBe(childButton);
  });

  it('falls back to host focus when selector match is missing', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusMissingSelectorA11yHostComponent> =
      await createFixture<AutoFocusMissingSelectorA11yHostComponent>(
        AutoFocusMissingSelectorA11yHostComponent
      );
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#selector-host'
    ) as HTMLElement;
    expect(document.activeElement).toBe(host);
  });

  it('does not steal focus from an already focused external element', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusExistingFocusHostComponent> =
      await createFixture<AutoFocusExistingFocusHostComponent>(AutoFocusExistingFocusHostComponent);
    const existing: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#existing-focus'
    ) as HTMLElement;
    existing.focus();

    fixture.componentInstance.showAutoFocus.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(existing);
  });

  it('adds ui-lib-autofocus class on the host element', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusA11yHostComponent> =
      await createFixture<AutoFocusA11yHostComponent>(AutoFocusA11yHostComponent);
    const input: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#auto-focus-input'
    ) as HTMLElement;
    expect(input.classList.contains('ui-lib-autofocus')).toBe(true);
  });
});
