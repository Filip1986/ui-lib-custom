import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibInput } from './input';
import { checkA11y, A11Y_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: `
    <ui-lib-input label="Email" placeholder="you@example.com" />
    <ui-lib-input label="With error" [error]="error" />
  `,
})
class TestHostComponent {
  error = 'Required';
}

describe('Input Accessibility', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should have no accessibility violations', async () => {
    await checkA11y(fixture, { rules: A11Y_RULES.skipColorContrast });
  });
});
