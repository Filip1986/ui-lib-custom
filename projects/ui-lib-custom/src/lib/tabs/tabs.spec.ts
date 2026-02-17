import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tabs } from './tabs';
import { Tab } from './tab';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs>
      <ui-lib-tab value="one" label="One">One</ui-lib-tab>
      <ui-lib-tab value="two" label="Two">Two</ui-lib-tab>
    </ui-lib-tabs>
  `,
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
})
class TabsNavigationHostComponent {
  navTabs: NavTabItem[] = [
    { value: '/dashboard', label: 'Dashboard' },
    { value: '/reports', label: 'Reports' },
    { value: '/settings', label: 'Settings' },
  ];
  lastNavigate: string | null = null;

  onNavigate(value: string | number | null): void {
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
})
class TabsPerTabOverrideHostComponent {}

let rafQueue: FrameRequestCallback[] = [];

function stubRaf(): jasmine.Spy {
  rafQueue = [];
  return spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback): number => {
    rafQueue.push(cb);
    return rafQueue.length;
  });
}

function flushRaf(): void {
  const queue: FrameRequestCallback[] = [...rafQueue];
  rafQueue = [];
  queue.forEach((cb: FrameRequestCallback): void => cb(0));
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

describe('Tabs', () => {
  let fixture: ComponentFixture<TabsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsHostComponent);
    fixture.detectChanges();
  });

  it('should create host component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render tablist with two tabs', () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('button.tab-trigger'));
    expect(tabButtons.length).toBe(2);
    expect(tabButtons[0].attributes['aria-selected']).toBe('true');
    expect(tabButtons[1].attributes['aria-selected']).toBe('false');
  });
});

describe('Tabs per-tab lazy', () => {
  let fixture: ComponentFixture<TabsLazyHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsLazyHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsLazyHostComponent);
    fixture.detectChanges();
  });

  it('should unmount lazy content when tab deactivates', async () => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const tabs = component.tabContexts();

    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeNull();

    const lazyTab = tabs[1];
    component.onSelect({ value: lazyTab.value, index: lazyTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeTruthy();

    const firstTab = tabs[0];
    component.onSelect({ value: firstTab.value, index: firstTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeNull();
  });

  it('should keep cached content for keep-alive tabs', async () => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const tabs = component.tabContexts();

    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeNull();

    const keepTab = tabs[2];
    component.onSelect({ value: keepTab.value, index: keepTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeTruthy();

    const firstTab = tabs[0];
    component.onSelect({ value: firstTab.value, index: firstTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeTruthy();
  });
});

describe('Scrollable Tabs', () => {
  let fixture: ComponentFixture<TabsScrollableHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsScrollableHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsScrollableHostComponent);
    fixture.detectChanges();
  });

  it('should show arrows when tabs overflow', () => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.tab-list')).nativeElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    stubRaf();
    setScrollMetrics(list, 500, 100, 0);

    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const arrows: DebugElement[] = fixture.debugElement.queryAll(By.css('button.tab-scroll'));
    expect(arrows.length).toBe(2);
  });

  it('should hide arrows when all tabs are visible', () => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.tab-list')).nativeElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    stubRaf();
    setScrollMetrics(list, 100, 100, 0);

    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const arrows: DebugElement[] = fixture.debugElement.queryAll(By.css('button.tab-scroll'));
    expect(arrows.length).toBe(0);
  });

  it('should disable prev at start and next at end', () => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.tab-list')).nativeElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    stubRaf();

    setScrollMetrics(list, 500, 100, 0);
    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const prev: HTMLButtonElement = fixture.debugElement.query(By.css('button.tab-scroll-prev'))
      .nativeElement as HTMLButtonElement;
    const next: HTMLButtonElement = fixture.debugElement.query(By.css('button.tab-scroll-next'))
      .nativeElement as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    expect(next.disabled).toBe(false);

    list.scrollLeft = 400;
    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();
    expect(next.disabled).toBe(true);
  });

  it('should scroll on arrow click', () => {
    const list: HTMLElement = fixture.debugElement.query(By.css('nav.tab-list')).nativeElement;
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const scrollToSpy: jasmine.Spy = spyOn(list, 'scrollTo');
    stubRaf();
    setScrollMetrics(list, 500, 100, 0);

    component.onTabListScrolled();
    flushRaf();
    fixture.detectChanges();

    const next: HTMLButtonElement = fixture.debugElement.query(By.css('button.tab-scroll-next'))
      .nativeElement as HTMLButtonElement;
    next.click();
    flushRaf();
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('should auto-scroll focused tab into view', () => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button.tab-trigger'));
    const target: HTMLButtonElement = buttons[4].nativeElement as HTMLButtonElement;
    const scrollIntoViewSpy: jasmine.Spy = spyOn(target, 'scrollIntoView');
    stubRaf();

    target.dispatchEvent(new Event('focus'));
    flushRaf();
    fixture.detectChanges();

    component.onTabListScrolled();
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });
});

describe('Tab Menu Mode', () => {
  let fixture: ComponentFixture<TabsNavigationHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsNavigationHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsNavigationHostComponent);
    fixture.detectChanges();
  });

  it('should render without panels in navigation mode', () => {
    const panels: DebugElement | null = fixture.debugElement.query(By.css('section.tab-panels'));
    expect(panels).toBeNull();
  });

  it('should emit value on tab click', () => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button.tab-trigger'));
    buttons[1].nativeElement.click();
    fixture.detectChanges();

    const component: TabsNavigationHostComponent = fixture.componentInstance;
    expect(component.lastNavigate).toBe('/reports');
  });

  it('should highlight the active tab', () => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button.tab-trigger'));
    buttons[2].nativeElement.click();
    fixture.detectChanges();

    expect(buttons[2].attributes['aria-selected']).toBe('true');
    expect(buttons[0].attributes['aria-selected']).toBe('false');
  });
});

describe('Per-Panel Lazy', () => {
  let fixture: ComponentFixture<TabsPerTabOverrideHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsPerTabOverrideHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPerTabOverrideHostComponent);
    fixture.detectChanges();
  });

  it('should respect per-tab lazy override', async () => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeNull();

    const tabs = component.tabContexts();
    const overrideTab = tabs[1];
    component.onSelect({ value: overrideTab.value, index: overrideTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeTruthy();

    const eagerTab = tabs[0];
    component.onSelect({ value: eagerTab.value, index: eagerTab.index, disabled: false });
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeNull();
  });

  it('should defer template rendering until active', async () => {
    await stabilizeFixture(fixture);
    expect(fixture.debugElement.query(By.css('.eager-content'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.override-content'))).toBeNull();
  });
});
