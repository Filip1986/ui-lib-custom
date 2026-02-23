import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UiLibSelect, SelectOption } from './select';
import { checkA11y, A11Y_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: ` <ui-lib-select label="Select" [options]="options" [(ngModel)]="value" /> `,
})
class TestHostComponent {
  options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ];
  value: string | null = null;
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
    await checkA11y(fixture, { rules: A11Y_RULES.skipColorContrast });
  });

  it('should have no violations when open', async () => {
    const control = fixture.nativeElement.querySelector('.ui-select-control') as HTMLElement;
    control.click();
    fixture.detectChanges();

    await checkA11y(fixture, { rules: A11Y_RULES.skipColorContrast });
  });

  it('should have combobox role', () => {
    const select = fixture.nativeElement.querySelector('ui-lib-select');
    expect(select.getAttribute('role')).toBe('combobox');
  });

  it('should have listbox role on dropdown', () => {
    const control = fixture.nativeElement.querySelector('.ui-select-control') as HTMLElement;
    control.click();
    fixture.detectChanges();

    const listbox = fixture.nativeElement.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
  });
});
