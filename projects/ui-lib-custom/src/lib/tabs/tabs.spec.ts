import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { DebugElement } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tabs } from './tabs';
import { Tab } from './tab';
import type { TabsVariant } from './tabs.types';
import type { TabsContextItem } from './tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs>
      <ui-lib-tab value="one" label="One">One</ui-lib-tab>
      <ui-lib-tab value="two" label="Two">Two</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TabsHostComponent {}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs>
      <ui-lib-tab label="One">One content</ui-lib-tab>
      <ui-lib-tab label="Lazy" lazy="unmount">
        <div class="lazy-content">Lazy content</div>
      </ui-lib-tab>
      <ui-lib-tab label="Keep" lazy="keep-alive">
        <div class="keep-content">Keep content</div>
      </ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TabsLazyHostComponent {}

interface NavTabItem {
  value: string;
  label: string;
}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs scrollBehavior="arrows">
      <ui-lib-tab label="One">One</ui-lib-tab>
      <ui-lib-tab label="Two">Two</ui-lib-tab>
      <ui-lib-tab label="Three">Three</ui-lib-tab>
      <ui-lib-tab label="Four">Four</ui-lib-tab>
      <ui-lib-tab label="Five">Five</ui-lib-tab>
      <ui-lib-tab label="Six">Six</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TabsScrollableHostComponent {}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs mode="navigation" (navigate)="onNavigate($event.value)">
      @for (tab of navTabs; track tab.value) {
        <ui-lib-tab [value]="tab.value" [label]="tab.label" />
      }
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TabsNavigationHostComponent {
  public navTabs: NavTabItem[] = [
    { value: '/dashboard', label: 'Dashboard' },
    { value: '/reports', label: 'Reports' },
    { value: '/settings', label: 'Settings' },
  ];
  public lastNavigate: string | null = null;

  public onNavigate(value: string | number | null): void {
    this.lastNavigate = typeof value === 'string' ? value : null;
  }
}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs lazy="keep-alive">
      <ui-lib-tab label="Eager">
        <div class="eager-content">Eager content</div>
      </ui-lib-tab>
      <ui-lib-tab label="Override" lazy="unmount">
        <div class="override-content">Override content</div>
      </ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TabsPerTabOverrideHostComponent {}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs [variant]="variant">
      <ui-lib-tab label="First">First panel</ui-lib-tab>
      <ui-lib-tab label="Second">Second panel</ui-lib-tab>
      <ui-lib-tab label="Disabled" [disabled]="true">Disabled panel</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TabsInteractionHostComponent {
  public variant: TabsVariant = 'material';
}

let rafQueue: FrameRequestCallback[] = [];
let originalRaf: ((cb: FrameRequestCallback) => number) | null = null;

function stubRaf(): void {
  rafQueue = [];
  if (!originalRaf) {
    originalRaf = window.requestAnimationFrame;
  }
  window.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    rafQueue.push(cb);
    return rafQueue.length;
  };
}

function flushRaf(): void {
  const queue: FrameRequestCallback[] = [...rafQueue];
  rafQueue = [];
  queue.forEach((cb: FrameRequestCallback): void => cb(0));
}

function restoreRaf(): void {
  if (originalRaf) {
    window.requestAnimationFrame = originalRaf;
    originalRaf = null;
  }
}

function getRequiredItem<T>(items: T[], index: number, label: string): T {
  const item: T | undefined = items[index];
  if (!item) {
    throw new Error(`Expected ${label} at index ${index}.`);
  }
  return item;
}

async function stabilizeFixture(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function setScrollMetrics(
  list: HTMLElement,
  scrollWidth: number,
  clientWidth: number,
  scrollLeft: number
): void {
  Object.defineProperty(list, 'scrollWidth', { value: scrollWidth, configurable: true });
  Object.defineProperty(list, 'clientWidth', { value: clientWidth, configurable: true });
  Object.defineProperty(list, 'scrollLeft', {
    value: scrollLeft,
    configurable: true,
    writable: true,
  });
}

describe('Tabs', (): void => {
  let fixture: ComponentFixture<TabsHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    restoreRaf();
  });

  it('should create host component', (): void => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render tablist with two tabs', (): void => {
    const tabButtons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button.ui-lib-tabs__trigger')
    );
    expect(tabButtons.length).toBe(2);
    const first: DebugElement = getRequiredItem(tabButtons, 0, 'tab button');
    const second: DebugElement = getRequiredItem(tabButtons, 1, 'tab button');
    expect(first.attributes['aria-selected']).toBe('true');
    expect(second.attributes['aria-selected']).toBe('false');
  });

  it('applies dark theme variables', (): void => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.style.setProperty('--uilib-tabs-color', 'light-color');
    const light: string = getComputedStyle(root).getPropertyValue('--uilib-tabs-color').trim();

    root.setAttribute('data-theme', 'dark');
    root.style.setProperty('--uilib-tabs-color', 'dark-color');
    const dark: string = getComputedStyle(root).getPropertyValue('--uilib-tabs-color').trim();

    expect(dark).not.toBe(light);
    root.removeAttribute('data-theme');
  });
});

describe('Tabs per-tab lazy', (): void => {
  let fixture: ComponentFixture<TabsLazyHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TabsLazyHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsLazyHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    restoreRaf();
  });

  it('should unmount lazy content when tab deactivates', async (): Promise<void> => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const tabs: TabsContextItem[] = component.tabContexts();

    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeNull();

    const lazyTab: TabsContextItem = getRequiredItem<TabsContextItem>(tabs, 1, 'tab context');
    component.onSelect({ value: lazyTab.value, index: lazyTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeTruthy();

    const firstTab: TabsContextItem = getRequiredItem<TabsContextItem>(tabs, 0, 'tab context');
    component.onSelect({ value: firstTab.value, index: firstTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeNull();
  });

  it('should keep cached content for keep-alive tabs', async (): Promise<void> => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const tabs: TabsContextItem[] = component.tabContexts();

    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeNull();

    const keepTab: TabsContextItem = getRequiredItem<TabsContextItem>(tabs, 2, 'tab context');
    component.onSelect({ value: keepTab.value, index: keepTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeTruthy();

    const firstTab: TabsContextItem = getRequiredItem<TabsContextItem>(tabs, 0, 'tab context');
    component.onSelect({ value: firstTab.value, index: firstTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeTruthy();
  });
});

describe('Scrollable Tabs', (): void => {
  let fixture: ComponentFixture<TabsScrollableHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TabsScrollableHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsScrollableHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    restoreRaf();
  });

  it('should show arrows when tabs overflow', (): void => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.ui-lib-tabs__list'))
      .nativeElement as HTMLElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    stubRaf();
    setScrollMetrics(list, 500, 100, 0);

    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const arrows: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button.ui-lib-tabs__scroll')
    );
    expect(arrows.length).toBe(2);
  });

  it('should hide arrows when all tabs are visible', (): void => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.ui-lib-tabs__list'))
      .nativeElement as HTMLElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    stubRaf();
    setScrollMetrics(list, 100, 100, 0);

    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const arrows: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button.ui-lib-tabs__scroll')
    );
    expect(arrows.length).toBe(0);
  });

  it('should disable prev at start and next at end', (): void => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.ui-lib-tabs__list'))
      .nativeElement as HTMLElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    stubRaf();

    setScrollMetrics(list, 500, 100, 0);
    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const prev: HTMLButtonElement = fixture.debugElement.query(
      By.css('button.ui-lib-tabs__scroll--prev')
    ).nativeElement as HTMLButtonElement;
    const next: HTMLButtonElement = fixture.debugElement.query(
      By.css('button.ui-lib-tabs__scroll--next')
    ).nativeElement as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    expect(next.disabled).toBe(false);

    list.scrollLeft = 400;
    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();
    expect(next.disabled).toBe(true);
  });

  it('should scroll on arrow click', (): void => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.ui-lib-tabs__list'))
      .nativeElement as HTMLElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const scrollToSpy: jest.Mock = jest.fn();
    (list as HTMLElement & { scrollTo: jest.Mock }).scrollTo = scrollToSpy;
    stubRaf();
    setScrollMetrics(list, 500, 100, 0);

    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const next: HTMLButtonElement = fixture.debugElement.query(
      By.css('button.ui-lib-tabs__scroll--next')
    ).nativeElement as HTMLButtonElement;
    next.click();
    flushRaf();
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('should auto-scroll focused tab into view', (): void => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const buttons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button.ui-lib-tabs__trigger')
    );
    const target: HTMLButtonElement = getRequiredItem(buttons, 4, 'tab button')
      .nativeElement as HTMLButtonElement;
    const scrollIntoViewSpy: jest.SpyInstance = jest.spyOn(target, 'scrollIntoView');
    stubRaf();

    target.dispatchEvent(new Event('focus'));
    flushRaf();
    fixture.detectChanges();

    component.onTabListScrolled();
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });
});

describe('Tab Menu Mode', (): void => {
  let fixture: ComponentFixture<TabsNavigationHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TabsNavigationHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsNavigationHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    restoreRaf();
  });

  it('should render without panels in navigation mode', (): void => {
    const panels: DebugElement | null = fixture.debugElement.query(
      By.css('section.ui-lib-tabs__panels')
    );
    expect(panels).toBeNull();
  });

  it('should emit value on tab click', (): void => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button.ui-lib-tabs__trigger')
    );
    const target: HTMLButtonElement = getRequiredItem(buttons, 1, 'tab button')
      .nativeElement as HTMLButtonElement;
    target.click();
    fixture.detectChanges();

    const component: TabsNavigationHostComponent = fixture.componentInstance;
    expect(component.lastNavigate).toBe('/reports');
  });

  it('should highlight the active tab', (): void => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('button.ui-lib-tabs__trigger')
    );
    const target: HTMLButtonElement = getRequiredItem(buttons, 2, 'tab button')
      .nativeElement as HTMLButtonElement;
    target.click();
    fixture.detectChanges();

    expect(getRequiredItem(buttons, 2, 'tab button').attributes['aria-selected']).toBe('true');
    expect(getRequiredItem(buttons, 0, 'tab button').attributes['aria-selected']).toBe('false');
  });
});

describe('Per-Panel Lazy', (): void => {
  let fixture: ComponentFixture<TabsPerTabOverrideHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TabsPerTabOverrideHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPerTabOverrideHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    restoreRaf();
  });

  it('should respect per-tab lazy override', async (): Promise<void> => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeNull();

    const tabs: TabsContextItem[] = component.tabContexts();
    const overrideTab: TabsContextItem = getRequiredItem<TabsContextItem>(tabs, 1, 'tab context');
    component.onSelect({ value: overrideTab.value, index: overrideTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeTruthy();

    const eagerTab: TabsContextItem = getRequiredItem<TabsContextItem>(tabs, 0, 'tab context');
    component.onSelect({ value: eagerTab.value, index: eagerTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeNull();
  });

  it('should defer template rendering until active', async (): Promise<void> => {
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.eager-content'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeNull();
  });
});

describe('Tabs interactions', (): void => {
  let fixture: ComponentFixture<TabsInteractionHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TabsInteractionHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsInteractionHostComponent);
    fixture.detectChanges();
  });

  afterEach((): void => {
    restoreRaf();
  });

  function tabButtons(): HTMLButtonElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button.ui-lib-tabs__trigger')
    );
  }

  function tabPanels(): HTMLElement[] {
    return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-tab-panel'));
  }

  it('selects the first tab by default', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    const first: HTMLButtonElement = getRequiredItem(buttons, 0, 'tab button');
    const second: HTMLButtonElement = getRequiredItem(buttons, 1, 'tab button');
    expect(first.getAttribute('aria-selected')).toBe('true');
    expect(second.getAttribute('aria-selected')).toBe('false');
  });

  it('switches tabs on click', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    const first: HTMLButtonElement = getRequiredItem(buttons, 0, 'tab button');
    const second: HTMLButtonElement = getRequiredItem(buttons, 1, 'tab button');
    second.click();
    fixture.detectChanges();

    expect(second.getAttribute('aria-selected')).toBe('true');
    expect(first.getAttribute('aria-selected')).toBe('false');
  });

  it('switches tabs with ArrowRight key', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    const second: HTMLButtonElement = getRequiredItem(buttons, 1, 'tab button');
    getRequiredItem(buttons, 0, 'tab button').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );
    fixture.detectChanges();

    expect(second.getAttribute('aria-selected')).toBe('true');
  });

  it('does not select disabled tab', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    getRequiredItem(buttons, 2, 'tab button').click();
    fixture.detectChanges();

    expect(getRequiredItem(buttons, 2, 'tab button').getAttribute('aria-disabled')).toBe('true');
    expect(getRequiredItem(buttons, 0, 'tab button').getAttribute('aria-selected')).toBe('true');
  });

  it('shows and hides tab panels correctly', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    const panels: HTMLElement[] = tabPanels();
    const firstPanel: HTMLElement = getRequiredItem(panels, 0, 'tab panel');
    const secondPanel: HTMLElement = getRequiredItem(panels, 1, 'tab panel');

    expect(firstPanel.hasAttribute('hidden')).toBe(false);
    expect(secondPanel.hasAttribute('hidden')).toBe(true);

    getRequiredItem(buttons, 1, 'tab button').click();
    fixture.detectChanges();

    expect(firstPanel.hasAttribute('hidden')).toBe(true);
    expect(secondPanel.hasAttribute('hidden')).toBe(false);
  });

  it('applies variant classes on the tab list', (): void => {
    const createVariantFixture: (variant: TabsVariant) => HTMLElement = (
      variant: TabsVariant
    ): HTMLElement => {
      const freshFixture: ComponentFixture<TabsInteractionHostComponent> = TestBed.createComponent(
        TabsInteractionHostComponent
      );
      freshFixture.componentInstance.variant = variant;
      freshFixture.detectChanges();
      const list: HTMLElement | null = (freshFixture.nativeElement as HTMLElement).querySelector(
        'nav.ui-lib-tabs__list'
      );
      return list as HTMLElement;
    };

    const materialList: HTMLElement = createVariantFixture('material');
    expect(materialList.className).toContain('ui-lib-tabs--material');

    const bootstrapList: HTMLElement = createVariantFixture('bootstrap');
    expect(bootstrapList.className).toContain('ui-lib-tabs--bootstrap');

    const minimalList: HTMLElement = createVariantFixture('minimal');
    expect(minimalList.className).toContain('ui-lib-tabs--minimal');
  });

  it('exposes tablist, tab, and tabpanel roles with proper aria linkage', (): void => {
    const tabList: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'nav.ui-lib-tabs__list'
    );
    const buttons: HTMLButtonElement[] = tabButtons();
    const panels: HTMLElement[] = tabPanels();
    const firstButton: HTMLButtonElement = getRequiredItem(buttons, 0, 'tab button');
    const firstPanel: HTMLElement = getRequiredItem(panels, 0, 'tab panel');

    expect(tabList?.getAttribute('role')).toBe('tablist');
    expect(firstButton.getAttribute('role')).toBe('tab');
    expect(firstPanel.getAttribute('role')).toBe('tabpanel');

    const controlsId: string | null = firstButton.getAttribute('aria-controls');
    const panelId: string | null = firstPanel.getAttribute('id');
    expect(controlsId).toBe(panelId);

    const labelledBy: string | null = firstPanel.getAttribute('aria-labelledby');
    const tabId: string | null = firstButton.getAttribute('id');
    expect(labelledBy).toBe(tabId);
  });
});
