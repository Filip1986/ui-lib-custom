import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tabs } from './tabs';
import { Tab } from './tab';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs>
      <ui-lib-tab label="One">One</ui-lib-tab>
      <ui-lib-tab label="Two">Two</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe('Tabs Accessibility', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should have no accessibility violations', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
