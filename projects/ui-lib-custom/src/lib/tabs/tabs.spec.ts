import { Component } from '@angular/core';
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
