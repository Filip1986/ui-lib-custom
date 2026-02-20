import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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

  it('should have combobox role', () => {
    expect(selectEl().getAttribute('role')).toBe('combobox');
  });

  it('should have aria-expanded', () => {
    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
    selectEl().dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(selectEl().getAttribute('aria-expanded')).toBe('true');
  });

  it('should update aria-activedescendant on arrow navigation', () => {
    selectEl().dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    const activeId = selectEl().getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId!)).toBeTruthy();
  });

  it('should have listbox role on dropdown', () => {
    selectEl().dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    const listbox = fixture.nativeElement.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
  });

  it('should have option role on each option', () => {
    selectEl().dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
  });

  it('should select option with Enter key', () => {
    selectEl().dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBeTruthy();
  });

  it('should close with Escape key', () => {
    selectEl().dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(selectEl().getAttribute('aria-expanded')).toBe('true');

    selectEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(selectEl().getAttribute('aria-expanded')).toBe('false');
  });
});
