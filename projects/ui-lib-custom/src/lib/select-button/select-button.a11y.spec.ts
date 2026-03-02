import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectButton } from './select-button';
import { SelectButtonOption } from './select-button.types';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [SelectButton],
  template: ` <ui-lib-select-button [options]="options" [value]="value"></ui-lib-select-button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public options: SelectButtonOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right', disabled: true },
  ];
  public value = 'left';
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
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
