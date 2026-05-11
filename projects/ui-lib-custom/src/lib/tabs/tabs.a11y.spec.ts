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
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { Tab } from './tab';
import { Tabs } from './tabs';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs
      [orientation]="orientation()"
      [activation]="activation()"
      [ariaLabel]="ariaLabel()"
    >
      <ui-lib-tab label="One">One</ui-lib-tab>
      <ui-lib-tab label="Two" [disabled]="disableSecond()">Two</ui-lib-tab>
      <ui-lib-tab label="Three">Three</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly orientation: WritableSignal<'horizontal' | 'vertical'> = signal<
    'horizontal' | 'vertical'
  >('horizontal');
  public readonly activation: WritableSignal<'auto' | 'manual'> = signal<'auto' | 'manual'>('auto');
  public readonly disableSecond: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(
    'Project sections'
  );
}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs ariaLabel="Primary tabs">
      <ui-lib-tab label="A">A</ui-lib-tab>
      <ui-lib-tab label="B">B</ui-lib-tab>
    </ui-lib-tabs>
    <ui-lib-tabs ariaLabel="Secondary tabs">
      <ui-lib-tab label="C">C</ui-lib-tab>
      <ui-lib-tab label="D">D</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoInstancesHostComponent {}

function buildMockTheme(): {
  variant: WritableSignal<ThemeVariant>;
  setVariant: (value: ThemeVariant) => void;
  getPreset: () => ThemePreset;
  preset: () => ThemePreset;
} {
  const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
  const buildPreset: () => ThemePreset = (): ThemePreset => ({
    id: 'test-preset',
    name: 'Test Preset',
    variant: 'material',
    shape: 'rounded',
    density: 'default',
    darkMode: 'light',
    colors: {
      primary: '#000000',
      secondary: '#000000',
      success: '#000000',
      danger: '#000000',
      warning: '#000000',
      info: '#000000',
      surface: '#000000',
      background: '#000000',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'monospace',
    },
    icons: {
      defaultLibrary: 'lucide',
      defaultSize: 'md',
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
    createdAt: 0,
    updatedAt: 0,
  });

  return {
    variant,
    setVariant: (value: ThemeVariant): void => variant.set(value),
    getPreset: (): ThemePreset => buildPreset(),
    preset: (): ThemePreset => buildPreset(),
  };
}

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getTabList(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[role="tablist"]')!;
}

function getTabs(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]')
  );
}

function getPanels(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[role="tabpanel"]')
  );
}

function dispatchKey(element: HTMLElement, key: string, shiftKey: boolean = false): void {
  element.dispatchEvent(
    new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true })
  );
}

describe('Tabs Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
  });

  it('renders the tablist, tabs, and tabpanels with correct ARIA relationships', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    const tabList: HTMLElement = getTabList(fixture);
    const tabs: HTMLButtonElement[] = getTabs(fixture);
    const panels: HTMLElement[] = getPanels(fixture);

    expect(tabList.getAttribute('aria-label')).toBe('Project sections');
    expect(tabList.getAttribute('aria-orientation')).toBe('horizontal');
    expect(tabs).toHaveLength(3);
    expect(panels).toHaveLength(3);

    for (let index: number = 0; index < tabs.length; index += 1) {
      expect(tabs[index]!.id).toBeTruthy();
      expect(tabs[index]!.getAttribute('aria-controls')).toBe(panels[index]!.id);
      expect(panels[index]!.getAttribute('aria-labelledby')).toBe(tabs[index]!.id);
    }
  });

  it('uses aria-selected and roving tabindex on active and inactive tabs', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    const tabs: HTMLButtonElement[] = getTabs(fixture);

    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0]!.getAttribute('tabindex')).toBe('0');
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('false');
    expect(tabs[1]!.getAttribute('tabindex')).toBe('-1');
    expect(tabs[2]!.getAttribute('aria-selected')).toBe('false');
    expect(tabs[2]!.getAttribute('tabindex')).toBe('-1');
  });

  it('generates unique tab and panel ids for separate tabs instances', async (): Promise<void> => {
    const fixture: ComponentFixture<TwoInstancesHostComponent> =
      await createFixture(TwoInstancesHostComponent);
    const tabs: HTMLButtonElement[] = getTabs(fixture);
    const panels: HTMLElement[] = getPanels(fixture);
    const tabIds: string[] = tabs.map((tab: HTMLButtonElement): string => tab.id);
    const panelIds: string[] = panels.map((panel: HTMLElement): string => panel.id);

    expect(new Set(tabIds).size).toBe(tabIds.length);
    expect(new Set(panelIds).size).toBe(panelIds.length);
    expect(tabIds.every((id: string): boolean => /^ui-lib-tabs-\d+-tab-\d+$/.test(id))).toBe(true);
    expect(panelIds.every((id: string): boolean => /^ui-lib-tabs-\d+-panel-\d+$/.test(id))).toBe(
      true
    );
  });

  it('moves selection with horizontal arrow keys in automatic activation mode', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    const tabs: HTMLButtonElement[] = getTabs(fixture);
    const panels: HTMLElement[] = getPanels(fixture);

    tabs[0]!.focus();
    dispatchKey(tabs[0]!, KEYBOARD_KEYS.ArrowRight);
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
    expect(panels[1]!.hidden).toBe(false);
  });

  it('moves selection with vertical arrow keys in automatic activation mode', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();

    const tabs: HTMLButtonElement[] = getTabs(fixture);
    tabs[0]!.focus();
    dispatchKey(tabs[0]!, KEYBOARD_KEYS.ArrowDown);
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
    expect(getTabList(fixture).getAttribute('aria-orientation')).toBe('vertical');
  });

  it('supports manual activation until Enter or Space is pressed', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    fixture.componentInstance.activation.set('manual');
    fixture.detectChanges();

    const tabs: HTMLButtonElement[] = getTabs(fixture);
    tabs[0]!.focus();
    dispatchKey(tabs[0]!, KEYBOARD_KEYS.ArrowRight);
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true');
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('false');

    dispatchKey(tabs[1]!, KEYBOARD_KEYS.Enter);
    fixture.detectChanges();

    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
  });

  it('supports Home and End navigation across enabled tabs', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    const tabs: HTMLButtonElement[] = getTabs(fixture);

    tabs[0]!.focus();
    dispatchKey(tabs[0]!, KEYBOARD_KEYS.End);
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]!.getAttribute('aria-selected')).toBe('true');

    dispatchKey(tabs[2]!, KEYBOARD_KEYS.Home);
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true');
  });

  it('skips disabled tabs during arrow-key navigation and marks them aria-disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    fixture.componentInstance.disableSecond.set(true);
    fixture.detectChanges();

    const tabs: HTMLButtonElement[] = getTabs(fixture);
    expect(tabs[1]!.getAttribute('aria-disabled')).toBe('true');
    expect(tabs[1]!.getAttribute('tabindex')).toBe('-1');

    tabs[0]!.focus();
    dispatchKey(tabs[0]!, KEYBOARD_KEYS.ArrowRight);
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabs[2]);
    expect(tabs[2]!.getAttribute('aria-selected')).toBe('true');
  });

  it('moves focus into the active panel when Tab leaves the tablist', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    const tabs: HTMLButtonElement[] = getTabs(fixture);
    const panels: HTMLElement[] = getPanels(fixture);

    tabs[0]!.focus();
    dispatchKey(tabs[0]!, KEYBOARD_KEYS.Tab);
    await Promise.resolve();
    fixture.detectChanges();

    expect(document.activeElement).toBe(panels[0]);
  });

  it('should have no accessibility violations', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await createFixture(TestHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
