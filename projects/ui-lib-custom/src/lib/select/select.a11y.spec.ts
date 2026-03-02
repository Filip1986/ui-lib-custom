import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UiLibSelect, SelectOption } from './select';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: ` <ui-lib-select label="Select" [options]="options" [(ngModel)]="value" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ];
  public value: string | null = null;
}

describe('Select Accessibility', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should have no violations when closed', async () => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have no violations when open', async () => {
    const control = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-select-control'
    ) as HTMLElement;
    control.click();
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should have combobox role', () => {
    const select = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-select'
    ) as HTMLElement;
    expect(select.getAttribute('role')).toBe('combobox');
  });

  it('should have listbox role on dropdown', () => {
    const control = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-select-control'
    ) as HTMLElement;
    control.click();
    fixture.detectChanges();

    const listbox = (fixture.nativeElement as HTMLElement).querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
  });
});
