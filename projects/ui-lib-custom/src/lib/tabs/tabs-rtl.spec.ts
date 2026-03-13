import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RtlScrollableTabsHostComponent {}

describe('Tabs RTL Support', (): void => {
  let fixture: ComponentFixture<RtlTabsHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [RtlTabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtlTabsHostComponent);
    fixture.detectChanges();
  });

  function tabButtons(): HTMLButtonElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button.ui-lib-tabs__trigger')
    );
  }

  function getRequiredButton(buttons: HTMLButtonElement[], index: number): HTMLButtonElement {
    const button: HTMLButtonElement | undefined = buttons[index];
    if (!button) {
      throw new Error(`Expected tab button at index ${index}.`);
    }
    return button;
  }

  it('should apply rtl class when dir is rtl', (): void => {
    const tabsEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-tabs'
    ) as HTMLElement;
    expect(tabsEl.classList.contains('ui-lib-tabs--rtl')).toBeTruthy();
  });

  it('should navigate to next tab with ArrowLeft in RTL', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    const first: HTMLButtonElement = getRequiredButton(buttons, 0);
    const second: HTMLButtonElement = getRequiredButton(buttons, 1);
    first.focus();
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(second);
  });

  it('should navigate to previous tab with ArrowRight in RTL', (): void => {
    const buttons: HTMLButtonElement[] = tabButtons();
    const first: HTMLButtonElement = getRequiredButton(buttons, 0);
    const second: HTMLButtonElement = getRequiredButton(buttons, 1);
    second.focus();
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(first);
  });
});

describe('Tabs RTL scroll icons', (): void => {
  let fixture: ComponentFixture<RtlScrollableTabsHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [RtlScrollableTabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtlScrollableTabsHostComponent);
    fixture.detectChanges();
  });

  it('should swap scroll icons in RTL for horizontal tabs', (): void => {
    const component: Tabs = fixture.debugElement.query(By.directive(Tabs))
      .componentInstance as Tabs;
    expect(component.scrollPrevIcon()).toBe('chevron-right');
    expect(component.scrollNextIcon()).toBe('chevron-left');
  });
});
