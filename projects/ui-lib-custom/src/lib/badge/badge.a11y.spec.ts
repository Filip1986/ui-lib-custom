import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <ui-lib-badge>New</ui-lib-badge>
    <ui-lib-badge color="success">Success</ui-lib-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe('Badge Accessibility', (): void => {
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
