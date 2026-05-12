import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { Toolbar } from './toolbar';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar [ariaLabel]="ariaLabel()">
      <div uiToolbarStart>
        <button type="button">Bold</button>
        <button type="button" [disabled]="disableSecond()">Italic</button>
        <button type="button">Underline</button>
      </div>
      <div uiToolbarCenter>
        <button type="button" aria-label="More formatting">
          <span aria-hidden="true">⋯</span>
        </button>
      </div>
      <div uiToolbarEnd>
        <button type="button">Settings</button>
      </div>
    </ui-lib-toolbar>

    <button type="button" data-testid="after-toolbar">After toolbar</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToolbarA11yHostComponent {
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly disableSecond: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="Formatting toolbar">
      <div uiToolbarStart>
        <button type="button">Bold</button>
      </div>
    </ui-lib-toolbar>
    <ui-lib-toolbar ariaLabel="Navigation toolbar">
      <div uiToolbarStart>
        <button type="button">Back</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoToolbarsHostComponent {}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="Search toolbar">
      <div uiToolbarStart>
        <input type="text" value="Angular" />
        <button type="button">Search</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToolbarWithInputHostComponent {}

async function setup<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getToolbar(fixture: ComponentFixture<unknown>, index: number = 0): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-toolbar')[index]!;
}

function getToolbarItems(toolbar: HTMLElement): HTMLButtonElement[] {
  return Array.from(toolbar.querySelectorAll<HTMLButtonElement>('[data-ui-lib-toolbar-item="true"]'));
}

function getAfterToolbarButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    '[data-testid="after-toolbar"]'
  )!;
}

function dispatchKey(element: HTMLElement, key: string): KeyboardEvent {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
  return event;
}

describe('Toolbar Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
  });

  it('renders toolbar role, default aria-label, and horizontal orientation', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const toolbar: HTMLElement = getToolbar(fixture);

    expect(toolbar.getAttribute('role')).toBe('toolbar');
    expect(toolbar.getAttribute('aria-label')).toBe('Toolbar');
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('applies a custom aria-label when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    fixture.componentInstance.ariaLabel.set('Document editing toolbar');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getToolbar(fixture).getAttribute('aria-label')).toBe('Document editing toolbar');
  });

  it('generates unique ids for separate toolbar instances', async (): Promise<void> => {
    const fixture: ComponentFixture<TwoToolbarsHostComponent> = await setup(TwoToolbarsHostComponent);
    const toolbars: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-toolbar')
    );
    const ids: string[] = toolbars.map((toolbar: HTMLElement): string => toolbar.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id: string): boolean => /^ui-lib-toolbar-\d+$/.test(id))).toBe(true);
  });

  it('uses roving tabindex so only the first toolbar item is tabbable initially', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    expect(items.map((item: HTMLButtonElement): string | null => item.getAttribute('tabindex'))).toEqual([
      '0',
      '-1',
      '-1',
      '-1',
      '-1',
    ]);
  });

  it('updates the active roving item when focus moves directly to another control', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[4]!.focus();

    expect(items[4]!.getAttribute('tabindex')).toBe('0');
    expect(items[0]!.getAttribute('tabindex')).toBe('-1');
  });

  it('moves focus to the next item with ArrowRight', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[0]!.focus();
    dispatchKey(items[0]!, KEYBOARD_KEYS.ArrowRight);

    expect(document.activeElement).toBe(items[1]);
    expect(items[1]!.getAttribute('tabindex')).toBe('0');
  });

  it('moves focus to the previous item with ArrowLeft', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[1]!.focus();
    dispatchKey(items[1]!, KEYBOARD_KEYS.ArrowLeft);

    expect(document.activeElement).toBe(items[0]);
    expect(items[0]!.getAttribute('tabindex')).toBe('0');
  });

  it('wraps from the last item to the first item with ArrowRight', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[4]!.focus();
    dispatchKey(items[4]!, KEYBOARD_KEYS.ArrowRight);

    expect(document.activeElement).toBe(items[0]);
    expect(items[0]!.getAttribute('tabindex')).toBe('0');
  });

  it('wraps from the first item to the last item with ArrowLeft', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[0]!.focus();
    dispatchKey(items[0]!, KEYBOARD_KEYS.ArrowLeft);

    expect(document.activeElement).toBe(items[4]);
    expect(items[4]!.getAttribute('tabindex')).toBe('0');
  });

  it('moves focus to the first item with Home', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[4]!.focus();
    dispatchKey(items[4]!, KEYBOARD_KEYS.Home);

    expect(document.activeElement).toBe(items[0]);
  });

  it('moves focus to the last item with End', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[0]!.focus();
    dispatchKey(items[0]!, KEYBOARD_KEYS.End);

    expect(document.activeElement).toBe(items[4]);
  });

  it('also advances focus with ArrowDown', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[0]!.focus();
    dispatchKey(items[0]!, KEYBOARD_KEYS.ArrowDown);

    expect(document.activeElement).toBe(items[1]);
  });

  it('also moves focus backward with ArrowUp', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[1]!.focus();
    dispatchKey(items[1]!, KEYBOARD_KEYS.ArrowUp);

    expect(document.activeElement).toBe(items[0]);
  });

  it('skips disabled toolbar items during keyboard navigation', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    fixture.componentInstance.disableSecond.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));
    items[0]!.focus();
    dispatchKey(items[0]!, KEYBOARD_KEYS.ArrowRight);

    expect(items.map((item: HTMLButtonElement): string => item.textContent.trim())).toEqual([
      'Bold',
      'Underline',
      '⋯',
      'Settings',
    ]);
    expect(document.activeElement).toBe(items[1]);
  });

  it('does not trap Tab so focus can leave the toolbar', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const toolbar: HTMLElement = getToolbar(fixture);
    const items: HTMLButtonElement[] = getToolbarItems(toolbar);
    const afterToolbarButton: HTMLButtonElement = getAfterToolbarButton(fixture);

    items[0]!.focus();
    const tabEvent: KeyboardEvent = dispatchKey(items[0]!, KEYBOARD_KEYS.Tab);

    expect(tabEvent.defaultPrevented).toBe(false);
    expect(afterToolbarButton.getAttribute('tabindex')).toBeNull();
  });

  it('preserves aria-labels on projected icon-only buttons', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const iconOnlyButton: HTMLButtonElement = getToolbarItems(getToolbar(fixture))[3]!;

    expect(iconOnlyButton.getAttribute('aria-label')).toBe('More formatting');
  });

  it('keeps decorative icon content hidden from assistive technology', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const decorativeIcon: HTMLElement = getToolbar(fixture).querySelector('span[aria-hidden="true"]')!;

    expect(decorativeIcon.textContent.trim()).toBe('⋯');
    expect(decorativeIcon.getAttribute('aria-hidden')).toBe('true');
  });

  it('does not hijack arrow keys for text inputs inside the toolbar', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarWithInputHostComponent> = await setup(
      ToolbarWithInputHostComponent
    );
    const input: HTMLInputElement = getToolbar(fixture).querySelector<HTMLInputElement>('input')!;

    input.focus();
    const event: KeyboardEvent = dispatchKey(input, KEYBOARD_KEYS.ArrowRight);

    expect(event.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(input);
  });

  it('passes axe-core checks by default', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe-core checks after keyboard navigation updates roving tabindex', async (): Promise<void> => {
    const fixture: ComponentFixture<ToolbarA11yHostComponent> = await setup(ToolbarA11yHostComponent);
    const items: HTMLButtonElement[] = getToolbarItems(getToolbar(fixture));

    items[0]!.focus();
    dispatchKey(items[0]!, KEYBOARD_KEYS.End);

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
