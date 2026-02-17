import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SelectButton } from './select-button';

import { SelectButtonOption, SelectButtonSize, SelectButtonVariant } from './select-button.types';

@Component({
  standalone: true,
  imports: [SelectButton],
  template: `
    <ui-lib-select-button
      [options]="options()"
      [multiple]="multiple()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [allowEmpty]="allowEmpty()"
      [(value)]="value"
    />
  `,
})
class HostComponent {
  options = signal<SelectButtonOption[]>([
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two', disabled: true },
    { label: 'Three', value: 'three' },
  ]);
  multiple = signal<boolean>(false);
  variant = signal<SelectButtonVariant>('material');
  size = signal<SelectButtonSize>('medium');
  disabled = signal<boolean>(false);
  allowEmpty = signal<boolean>(false);
  value: any | any[] | null = null;
}

describe('SelectButton', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function buttons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('button'));
  }

  it('creates and renders options', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(buttons().length).toBe(3);
  });

  it('applies variant and size classes via host', () => {
    fixture.componentInstance.variant.set('bootstrap');
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement.querySelector('ui-lib-select-button');
    expect(host.className).toContain('ui-lib-select-button--bootstrap');
    expect(host.className).toContain('ui-lib-select-button--large');
  });

  it('marks selected options with aria-pressed', () => {
    buttons()[0].click();
    fixture.detectChanges();

    expect(buttons()[0].getAttribute('aria-pressed')).toBe('true');
  });

  it('updates value on click for single selection', () => {
    buttons()[0].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('one');
  });

  it('does not select disabled option', () => {
    buttons()[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBeNull();
  });

  it('supports multiple selection mode', () => {
    fixture.componentInstance.multiple.set(true);
    fixture.detectChanges();

    buttons()[0].click();
    buttons()[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toEqual(['one', 'three']);
  });

  it('allows clearing when allowEmpty is true', () => {
    fixture.componentInstance.allowEmpty.set(true);
    fixture.detectChanges();

    buttons()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('one');

    buttons()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBeNull();
  });
});
