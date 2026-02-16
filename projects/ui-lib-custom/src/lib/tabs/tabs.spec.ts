import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tabs } from './tabs';
import { Tab, TabContent } from './tab';

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
  imports: [Tabs, Tab, TabContent],
  template: `
    <ui-lib-tabs>
      <ui-lib-tab label="One">One content</ui-lib-tab>
      <ui-lib-tab label="Lazy" lazy="unmount">
        <ng-template uiLibTabContent>
          <div class="lazy-content">Lazy content</div>
        </ng-template>
      </ui-lib-tab>
      <ui-lib-tab label="Keep" lazy="keep-alive">
        <ng-template uiLibTabContent>
          <div class="keep-content">Keep content</div>
        </ng-template>
      </ui-lib-tab>
    </ui-lib-tabs>
  `,
})
class TabsLazyHostComponent {}

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

  it('should unmount lazy content when tab deactivates', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button.tab-trigger'));
    expect(buttons.length).toBe(3);

    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeNull();

    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeTruthy();

    buttons[0].nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.lazy-content'))).toBeNull();
  });

  it('should keep cached content for keep-alive tabs', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button.tab-trigger'));
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeNull();

    buttons[2].nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeTruthy();

    buttons[0].nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.keep-content'))).toBeTruthy();
  });
});
