import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tabs } from './tabs';
import { Tab } from './tab';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs dir="rtl">
      <ui-lib-tab label="Tab 1">One</ui-lib-tab>
      <ui-lib-tab label="Tab 2">Two</ui-lib-tab>
      <ui-lib-tab label="Tab 3">Three</ui-lib-tab>
    </ui-lib-tabs>
  `,
})
class RtlTabsHostComponent {}

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs dir="rtl" scrollBehavior="arrows">
      <ui-lib-tab label="Alpha">Alpha</ui-lib-tab>
      <ui-lib-tab label="Beta">Beta</ui-lib-tab>
      <ui-lib-tab label="Gamma">Gamma</ui-lib-tab>
    </ui-lib-tabs>
  `,
})
class RtlScrollableTabsHostComponent {}

describe('Tabs RTL Support', () => {
  let fixture: ComponentFixture<RtlTabsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RtlTabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtlTabsHostComponent);
    fixture.detectChanges();
  });

  function tabButtons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('button.tab-trigger'));
  }

  it('should apply rtl class when dir is rtl', () => {
    const tabsEl: HTMLElement = fixture.nativeElement.querySelector('ui-lib-tabs');
    expect(tabsEl.classList.contains('ui-tabs--rtl')).toBeTrue();
  });

  it('should navigate to next tab with ArrowLeft in RTL', () => {
    const buttons = tabButtons();
    buttons[0].focus();
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(buttons[1]);
  });

  it('should navigate to previous tab with ArrowRight in RTL', () => {
    const buttons = tabButtons();
    buttons[1].focus();
    buttons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(buttons[0]);
  });
});

describe('Tabs RTL scroll icons', () => {
  let fixture: ComponentFixture<RtlScrollableTabsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RtlScrollableTabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtlScrollableTabsHostComponent);
    fixture.detectChanges();
  });

  it('should swap scroll icons in RTL for horizontal tabs', () => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    expect(component.scrollPrevIcon()).toBe('chevron-right');
    expect(component.scrollNextIcon()).toBe('chevron-left');
  });
});
