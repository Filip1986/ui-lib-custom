import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { checkA11y, A11Y_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <ui-lib-button>Click me</ui-lib-button>
    <ui-lib-button [disabled]="true">Disabled</ui-lib-button>
    <ui-lib-button color="primary">Primary</ui-lib-button>
  `,
})
class TestHostComponent {
  loading = false;
}

describe('Button Accessibility', () => {
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
