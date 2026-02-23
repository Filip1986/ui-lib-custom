import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectButton } from './select-button';
import { SelectButtonOption } from './select-button.types';
import { checkA11y, A11Y_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [value]="value"></ui-lib-select-button> `,
})
class TestHostComponent {
  options: SelectButtonOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right', disabled: true },
  ];
  value = 'left';
}

describe('SelectButton Accessibility', () => {
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
