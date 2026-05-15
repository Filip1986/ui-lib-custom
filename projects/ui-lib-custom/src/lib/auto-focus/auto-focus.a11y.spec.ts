import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  provideZonelessChangeDetection,
} from '@angular/core';
import type { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { AutoFocus } from './auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input id="auto-focus-input" aria-label="Auto focus input" uiLibAutoFocus />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input
    id="auto-focus-input"
    aria-label="Auto focus input"
    uiLibAutoFocus
    [disabled]="true"
  />`,
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
  template: `<div id="selector-host" tabindex="-1" uiLibAutoFocus selector="[data-missing]"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusMissingSelectorA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<div id="invalid-selector-host" tabindex="-1" uiLibAutoFocus selector=":not("></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusInvalidSelectorA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<div id="non-focusable-host" uiLibAutoFocus></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusNonFocusableA11yHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input
    id="auto-focus-input"
    aria-label="Auto focus input"
    uiLibAutoFocus
    [disabled]="disabled"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusRerenderA11yHostComponent {
  public disabled: boolean = false;
}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `
    <button id="existing-focus" type="button">Existing</button>
    @if (showAutoFocus) {
      <input id="deferred-auto-focus" uiLibAutoFocus />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusExistingFocusHostComponent {
  public showAutoFocus: boolean = false;
}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `
    <div id="nested-host" tabindex="-1" uiLibAutoFocus>
      <input id="nested-child" aria-label="Nested child input" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusNestedExistingFocusHostComponent {}

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input id="self-focused-target" aria-label="Self focused target" uiLibAutoFocus />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoFocusAlreadyFocusedTargetHostComponent {}

async function createFixture<T>(
  componentType: Type<T>,
  options?: {
    providers?: Provider[];
    waitForAnimationFrame?: boolean;
  }
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection(), ...(options?.providers ?? [])],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  if (options?.waitForAnimationFrame !== false) {
    await new Promise<void>((resolve: () => void): void => {
      window.requestAnimationFrame((): void => resolve());
    });
  }
  return fixture;
}

function requireElement(selector: string): HTMLElement {
  const element: HTMLElement | null = document.body.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Expected element matching "${selector}" to exist.`);
  }

  return element;
}

describe('AutoFocus (a11y)', (): void => {
  let requestAnimationFrameSpy: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach((): void => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
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
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('focuses only once and does not re-run on subsequent re-renders', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusRerenderA11yHostComponent> =
      await createFixture<AutoFocusRerenderA11yHostComponent>(AutoFocusRerenderA11yHostComponent);
    const input: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#auto-focus-input'
    ) as HTMLElement;
    const focusSpy: jest.SpyInstance = jest.spyOn(input, 'focus');

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(focusSpy).not.toHaveBeenCalled();
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('focuses a selector-matched child element', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusSelectorA11yHostComponent> =
      await createFixture<AutoFocusSelectorA11yHostComponent>(AutoFocusSelectorA11yHostComponent);
    const childButton: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-autofocus-target]'
    ) as HTMLElement;
    expect(document.activeElement).toBe(childButton);
  });

  it('falls back to the host and warns when selector is invalid', async (): Promise<void> => {
    const warnSpy: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation((): void => {
      return;
    });

    const fixture: ComponentFixture<AutoFocusInvalidSelectorA11yHostComponent> =
      await createFixture<AutoFocusInvalidSelectorA11yHostComponent>(
        AutoFocusInvalidSelectorA11yHostComponent
      );
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#invalid-selector-host'
    ) as HTMLElement;

    expect(document.activeElement).toBe(host);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid selector ":not(" on <div>. Falling back to host element.')
    );

    warnSpy.mockRestore();
  });

  it('does not focus when selector match is missing', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusMissingSelectorA11yHostComponent> =
      await createFixture<AutoFocusMissingSelectorA11yHostComponent>(
        AutoFocusMissingSelectorA11yHostComponent
      );
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#selector-host'
    ) as HTMLElement;
    expect(document.activeElement).not.toBe(host);
  });

  it('warns when the resolved host is not programmatically focusable', async (): Promise<void> => {
    const warnSpy: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation((): void => {
      return;
    });

    await createFixture<AutoFocusNonFocusableA11yHostComponent>(
      AutoFocusNonFocusableA11yHostComponent
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<div> host or selector target is not programmatically focusable')
    );

    warnSpy.mockRestore();
  });

  it('does not steal focus from an already focused external element', async (): Promise<void> => {
    const fixture: ComponentFixture<AutoFocusExistingFocusHostComponent> =
      await createFixture<AutoFocusExistingFocusHostComponent>(AutoFocusExistingFocusHostComponent);
    const existing: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#existing-focus'
    ) as HTMLElement;
    existing.focus();

    fixture.componentInstance.showAutoFocus = true;
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise<void>((resolve: () => void): void => {
      window.requestAnimationFrame((): void => resolve());
    });

    expect(document.activeElement).toBe(existing);
  });

  it('does not re-focus when a descendant inside the target already has focus', async (): Promise<void> => {
    let scheduledFrameCallback: FrameRequestCallback | null = null;
    requestAnimationFrameSpy.mockImplementation((callback: FrameRequestCallback): number => {
      scheduledFrameCallback = callback;
      return 1;
    });

    await TestBed.configureTestingModule({
      imports: [AutoFocusNestedExistingFocusHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<AutoFocusNestedExistingFocusHostComponent> =
      TestBed.createComponent(AutoFocusNestedExistingFocusHostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();

    const host: HTMLElement = requireElement('#nested-host');
    const child: HTMLElement = requireElement('#nested-child');
    const hostFocusSpy: jest.SpyInstance = jest.spyOn(host, 'focus');

    child.focus();
    scheduledFrameCallback?.(0);

    expect(document.activeElement).toBe(child);
    expect(hostFocusSpy).not.toHaveBeenCalled();
  });

  it('does not re-focus when the target is already active before the frame runs', async (): Promise<void> => {
    let scheduledFrameCallback: FrameRequestCallback | null = null;
    requestAnimationFrameSpy.mockImplementation((callback: FrameRequestCallback): number => {
      scheduledFrameCallback = callback;
      return 1;
    });

    await TestBed.configureTestingModule({
      imports: [AutoFocusAlreadyFocusedTargetHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<AutoFocusAlreadyFocusedTargetHostComponent> =
      TestBed.createComponent(AutoFocusAlreadyFocusedTargetHostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();

    const target: HTMLElement = requireElement('#self-focused-target');
    target.focus();
    const focusSpy: jest.SpyInstance = jest.spyOn(target, 'focus');
    scheduledFrameCallback?.(0);

    expect(document.activeElement).toBe(target);
    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('skips autofocus entirely when the directive is instantiated on the server platform', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AutoFocusA11yHostComponent],
      providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    const fixture: ComponentFixture<AutoFocusA11yHostComponent> = TestBed.createComponent(
      AutoFocusA11yHostComponent
    );
    document.body.appendChild(fixture.nativeElement);
    const focusSpy: jest.SpyInstance = jest.spyOn(HTMLElement.prototype, 'focus');

    fixture.detectChanges();
    await fixture.whenStable();

    const input: HTMLElement = requireElement('#auto-focus-input');

    expect(document.activeElement).not.toBe(input);
    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
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
