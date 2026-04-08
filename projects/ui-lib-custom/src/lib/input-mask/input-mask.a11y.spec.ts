import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { InputMaskComponent } from './input-mask.component';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      Phone
      <uilib-input-mask mask="(999) 999-9999" />
    </label>
  `,
})
class InputMaskA11yHostComponent {}

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      Disabled
      <uilib-input-mask mask="99/99/9999" [disabled]="true" />
    </label>
    <label>
      Readonly
      <uilib-input-mask mask="99/99/9999" [readonly]="true" />
    </label>
  `,
})
class InputMaskStateHostComponent {}

describe('InputMask Accessibility', (): void => {
  let fixture: ComponentFixture<InputMaskA11yHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputMaskA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputMaskA11yHostComponent);
  });

  it('has no accessibility violations for a labeled default input mask', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});

describe('InputMask Accessibility semantics', (): void => {
  let fixture: ComponentFixture<InputMaskStateHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputMaskStateHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputMaskStateHostComponent);
    fixture.detectChanges();
  });

  function inputElements(): NodeListOf<HTMLInputElement> {
    return (fixture.nativeElement as HTMLElement).querySelectorAll('input');
  }

  it('reflects disabled and readonly states on the native input', (): void => {
    const elements: NodeListOf<HTMLInputElement> = inputElements();
    expect(elements).toHaveLength(2);

    expect(elements[0]?.disabled).toBeTruthy();
    expect(elements[1]?.readOnly).toBeTruthy();
  });
});
