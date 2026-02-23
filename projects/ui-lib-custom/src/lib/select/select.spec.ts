import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { UiLibSelect, SelectOption } from './select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibSelect],
  template: ` <ui-lib-select [options]="options()" [label]="label()" [(ngModel)]="value" /> `,
})
class HostComponent {
  options = signal<SelectOption[]>([
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ]);
  label = signal<string>('Pick one');
  value: string | null = null;
}

describe('UiLibSelect accessibility', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function selectEl(): HTMLElement {
    return fixture.nativeElement.querySelector('ui-lib-select');
  }

  function controlEl(): HTMLElement {
    return fixture.nativeElement.querySelector('.ui-select-control');
  }

  function openSelect(): void {
    controlEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  it('should have combobox role', () => {
    expect(selectEl().getAttribute('role')).toBe('combobox');
  });

  it('should have aria-expanded', () => {
    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
    openSelect();
    expect(selectEl().getAttribute('aria-expanded')).toBe('true');
  });

  it('should update aria-activedescendant on arrow navigation', () => {
    openSelect();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    const activeId: string | null = selectEl().getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId as string)).toBeTruthy();
  });

  it('should have listbox role on dropdown', () => {
    openSelect();

    const listbox: HTMLElement | null = fixture.nativeElement.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
  });

  it('should have option role on each option', () => {
    openSelect();

    const options: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
  });

  it('should select option with Enter key', () => {
    openSelect();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBeTruthy();
  });

  it('should close with Escape key', () => {
    openSelect();
    expect(selectEl().getAttribute('aria-expanded')).toBe('true');

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibSelect],
  template: `
    <form [formGroup]="form">
      <ui-lib-select [options]="options" formControlName="choice" />
    </form>
  `,
})
class ReactiveHostComponent {
  readonly options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];
  readonly form: FormGroup<{ choice: FormControl<string | null> }> = new FormGroup({
    choice: new FormControl<string | null>(null),
  });
}

describe('UiLibSelect Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement.querySelector('ui-lib-select');
  }

  function controlEl(): HTMLElement {
    return fixture.nativeElement.querySelector('.ui-select-control');
  }

  function openSelect(): void {
    controlEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  function optionEls(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.ui-select-option'));
  }

  it('updates control value when option is selected', () => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    openSelect();
    optionEls()[0].click();
    fixture.detectChanges();

    expect(control.value).toBe('alpha');
  });

  it('marks control as touched when closed', () => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    openSelect();
    optionEls()[0].click();
    fixture.detectChanges();

    expect(control.touched).toBeTruthy();
  });

  it('reflects disabled state from control', () => {
    const control: FormControl<string | null> = fixture.componentInstance.form.controls.choice;

    control.disable();
    fixture.detectChanges();

    expect(hostEl().getAttribute('aria-disabled')).toBe('true');
  });
});
