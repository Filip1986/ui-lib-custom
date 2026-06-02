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
import { FocusTrapDirective } from './focus-trap';

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <button id="trigger">Trigger</button>
    <div id="trap" role="dialog" aria-modal="true" aria-labelledby="trap-title" uiLibFocusTrap>
      <h2 id="trap-title">Focus trap title</h2>
      <button id="first">First</button>
      <button id="second">Second</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapA11yHostComponent {}

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <button id="trigger">Trigger</button>
    <div id="trap" [uiLibFocusTrap]="enabled()">
      <button id="first">First</button>
      <button id="second">Second</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapToggleHostComponent {
  public readonly enabled: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <div id="first-trap" uiLibFocusTrap>
      <button id="first-a">First A</button>
      <button id="first-b">First B</button>
    </div>
    <div id="second-trap" uiLibFocusTrap>
      <button id="second-a">Second A</button>
      <button id="second-b">Second B</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapMultiHostComponent {}

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `<div id="trap" uiLibFocusTrap><span>Static content</span></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapNoFocusableHostComponent {}

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <div
      id="trap"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trap-title"
      uiLibFocusTrap
      initialFocusSelector="#cancel"
    >
      <h2 id="trap-title">Confirm action</h2>
      <button id="confirm">Confirm</button>
      <button id="cancel">Cancel</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapInitialFocusHostComponent {}

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <button id="trigger">Open</button>
    <div
      id="trap"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trap-title"
      uiLibFocusTrap
      [restoreFocus]="false"
    >
      <h2 id="trap-title">Dialog</h2>
      <button id="inside">Inside</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapNoRestoreHostComponent {}

@Component({
  standalone: true,
  imports: [FocusTrapDirective],
  template: `
    <button id="trigger">Trigger</button>
    <div id="trap" [uiLibFocusTrap]="false">
      <button id="inside">Inside</button>
    </div>
    <button id="outside">Outside</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FocusTrapDisabledHostComponent {}

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
  TestBed.flushEffects();
  await fixture.whenStable();
  return fixture;
}

async function detectAndFlush(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  TestBed.flushEffects();
  await fixture.whenStable();
}

function dispatchTab(target: HTMLElement, shiftKey: boolean = false): boolean {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event.defaultPrevented;
}

function querySentinels(container: HTMLElement): { start: HTMLElement; end: HTMLElement } {
  const start: HTMLElement = container.previousElementSibling as HTMLElement;
  const end: HTMLElement = container.nextElementSibling as HTMLElement;
  return { start, end };
}

describe('FocusTrapDirective (a11y)', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  it('passes axe checks in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe checks in disabled state', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapDisabledHostComponent> =
      await createFixture<FocusTrapDisabledHostComponent>(FocusTrapDisabledHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('moves focus to the first focusable child when activated', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(document.activeElement).toBe(root.querySelector<HTMLElement>('#first'));
  });

  it('creates start and end sentinel nodes around the trap container', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const container: HTMLElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('#trap') as HTMLElement;
    const { start, end }: { start: HTMLElement; end: HTMLElement } = querySentinels(container);
    expect(start.dataset['uiLibFocusTrapSentinel']).toBe('start');
    expect(end.dataset['uiLibFocusTrapSentinel']).toBe('end');
  });

  it('marks sentinel nodes tabbable without aria-hidden (a focusable element must not be aria-hidden)', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const container: HTMLElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('#trap') as HTMLElement;
    const { start, end }: { start: HTMLElement; end: HTMLElement } = querySentinels(container);
    expect(start.getAttribute('tabindex')).toBe('0');
    expect(start.getAttribute('aria-hidden')).toBeNull();
    expect(end.getAttribute('tabindex')).toBe('0');
    expect(end.getAttribute('aria-hidden')).toBeNull();
  });

  it('assigns unique sentinel ids per focus trap instance', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapMultiHostComponent> =
      await createFixture<FocusTrapMultiHostComponent>(FocusTrapMultiHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const firstContainer: HTMLElement = root.querySelector<HTMLElement>(
      '#first-trap',
    ) as HTMLElement;
    const secondContainer: HTMLElement = root.querySelector<HTMLElement>(
      '#second-trap',
    ) as HTMLElement;
    const firstSentinels: { start: HTMLElement; end: HTMLElement } = querySentinels(firstContainer);
    const secondSentinels: { start: HTMLElement; end: HTMLElement } =
      querySentinels(secondContainer);
    expect(firstSentinels.start.id).not.toBe(secondSentinels.start.id);
    expect(firstSentinels.end.id).not.toBe(secondSentinels.end.id);
  });

  it('keeps Tab navigation trapped from last to first', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const first: HTMLElement = root.querySelector<HTMLElement>('#first') as HTMLElement;
    const second: HTMLElement = root.querySelector<HTMLElement>('#second') as HTMLElement;
    second.focus();
    const prevented: boolean = dispatchTab(second);
    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });

  it('keeps Shift+Tab navigation trapped from first to last', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const first: HTMLElement = root.querySelector<HTMLElement>('#first') as HTMLElement;
    const second: HTMLElement = root.querySelector<HTMLElement>('#second') as HTMLElement;
    first.focus();
    const prevented: boolean = dispatchTab(first, true);
    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(second);
  });

  it('routes focus from start sentinel to the last focusable element', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const container: HTMLElement = root.querySelector<HTMLElement>('#trap') as HTMLElement;
    const second: HTMLElement = root.querySelector<HTMLElement>('#second') as HTMLElement;
    const sentinels: { start: HTMLElement; end: HTMLElement } = querySentinels(container);
    sentinels.start.focus();
    expect(document.activeElement).toBe(second);
  });

  it('routes focus from end sentinel to the first focusable element', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapA11yHostComponent> =
      await createFixture<FocusTrapA11yHostComponent>(FocusTrapA11yHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const container: HTMLElement = root.querySelector<HTMLElement>('#trap') as HTMLElement;
    const first: HTMLElement = root.querySelector<HTMLElement>('#first') as HTMLElement;
    const sentinels: { start: HTMLElement; end: HTMLElement } = querySentinels(container);
    sentinels.end.focus();
    expect(document.activeElement).toBe(first);
  });

  it('focuses the trap container when no focusable descendants exist', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapNoFocusableHostComponent> =
      await createFixture<FocusTrapNoFocusableHostComponent>(FocusTrapNoFocusableHostComponent);
    const container: HTMLElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('#trap') as HTMLElement;
    expect(document.activeElement).toBe(container);
    expect(container.getAttribute('tabindex')).toBe('-1');
  });

  it('keeps focus on container when end sentinel is focused and no focusables exist', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapNoFocusableHostComponent> =
      await createFixture<FocusTrapNoFocusableHostComponent>(FocusTrapNoFocusableHostComponent);
    const container: HTMLElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('#trap') as HTMLElement;
    const sentinels: { start: HTMLElement; end: HTMLElement } = querySentinels(container);
    sentinels.end.focus();
    expect(document.activeElement).toBe(container);
  });

  it('restores focus to the trigger when trap is deactivated', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapToggleHostComponent> =
      await createFixture<FocusTrapToggleHostComponent>(FocusTrapToggleHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const trigger: HTMLElement = root.querySelector<HTMLElement>('#trigger') as HTMLElement;
    trigger.focus();
    fixture.componentInstance.enabled.set(false);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(trigger);
  });

  it('removes sentinel nodes when trap is deactivated', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapToggleHostComponent> =
      await createFixture<FocusTrapToggleHostComponent>(FocusTrapToggleHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const container: HTMLElement = root.querySelector<HTMLElement>('#trap') as HTMLElement;
    expect(container.previousElementSibling).not.toBeNull();
    expect(container.nextElementSibling).not.toBeNull();
    fixture.componentInstance.enabled.set(false);
    await detectAndFlush(fixture);
    expect(container.previousElementSibling).toBe(root.querySelector<HTMLElement>('#trigger'));
    expect(container.nextElementSibling).toBeNull();
  });

  it('does not create sentinel nodes when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapDisabledHostComponent> =
      await createFixture<FocusTrapDisabledHostComponent>(FocusTrapDisabledHostComponent);
    const container: HTMLElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('#trap') as HTMLElement;
    expect(container.previousElementSibling?.id).toBe('trigger');
    expect(container.nextElementSibling?.id).toBe('outside');
  });

  it('does not trap focus when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapDisabledHostComponent> =
      await createFixture<FocusTrapDisabledHostComponent>(FocusTrapDisabledHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const inside: HTMLElement = root.querySelector<HTMLElement>('#inside') as HTMLElement;
    inside.focus();
    const prevented: boolean = dispatchTab(inside);
    expect(prevented).toBe(false);
  });

  it('passes axe checks with initialFocusSelector', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapInitialFocusHostComponent> =
      await createFixture<FocusTrapInitialFocusHostComponent>(FocusTrapInitialFocusHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('focuses the element matching initialFocusSelector on activation', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapInitialFocusHostComponent> =
      await createFixture<FocusTrapInitialFocusHostComponent>(FocusTrapInitialFocusHostComponent);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const cancelButton: HTMLElement = root.querySelector<HTMLElement>('#cancel') as HTMLElement;
    expect(document.activeElement).toBe(cancelButton);
  });

  it('passes axe checks with restoreFocus=false', async (): Promise<void> => {
    const fixture: ComponentFixture<FocusTrapNoRestoreHostComponent> =
      await createFixture<FocusTrapNoRestoreHostComponent>(FocusTrapNoRestoreHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('applies sentinelClass to both sentinel nodes', async (): Promise<void> => {
    @Component({
      standalone: true,
      imports: [FocusTrapDirective],
      template: `<div id="trap" uiLibFocusTrap sentinelClass="test-sentinel">
        <button>A</button>
      </div>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class FocusTrapSentinelClassA11yHostComponent {}

    const fixture: ComponentFixture<FocusTrapSentinelClassA11yHostComponent> =
      await createFixture<FocusTrapSentinelClassA11yHostComponent>(
        FocusTrapSentinelClassA11yHostComponent,
      );
    const container: HTMLElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('#trap') as HTMLElement;
    const { start, end }: { start: HTMLElement; end: HTMLElement } = querySentinels(container);
    expect(start.classList.contains('test-sentinel')).toBe(true);
    expect(end.classList.contains('test-sentinel')).toBe(true);
  });
});
