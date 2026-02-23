import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { UiLibInput } from './input';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibInput],
  template: `
    <form [formGroup]="form">
      <ui-lib-input label="Name" formControlName="name" />
    </form>
  `,
})
class ReactiveHostComponent {
  readonly form: FormGroup<{ name: FormControl<string> }> = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
  });
}

describe('UiLibInput Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  function inputEl(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('updates control value and dirty state', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    inputEl().value = 'Ada';
    inputEl().dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(control.value).toBe('Ada');
    expect(control.dirty).toBeTruthy();
  });

  it('marks control as touched on blur', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    inputEl().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(control.touched).toBeTruthy();
  });

  it('reflects disabled state from control', () => {
    const control: FormControl<string> = fixture.componentInstance.form.controls.name;

    control.disable();
    fixture.detectChanges();

    expect(inputEl().disabled).toBeTruthy();
  });
});
