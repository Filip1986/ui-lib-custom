import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibInput } from './input';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: `
    <ui-lib-input label="Email" placeholder="you@example.com" />
    <ui-lib-input label="With error" [error]="error" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public error = 'Required';
}

describe('Input Accessibility', (): void => {
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
